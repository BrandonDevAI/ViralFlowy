import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Manejar solicitudes preflight (CORS)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { adsDescription, hasProductImage, hasRefImage, productImageBase64 } = await req.json()

    // Validar API Key de OpenAI
    const openAiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAiKey) {
      throw new Error('OPENAI_API_KEY no está configurada en Supabase Secrets')
    }

    // 1. Usar GPT-4o-mini para redactar el Copy y crear el prompt de DALL-E
    // Nota: Si pasáramos productImageBase64 aquí, usaríamos gpt-4o para visión.
    // Para mantener este ejemplo rápido y económico, usamos el texto.
    const textPrompt = `
      Eres un experto en marketing digital y copywriting.
      El cliente quiere crear un anuncio para su producto.
      Descripción del producto/oferta: "${adsDescription}"
      
      Genera una respuesta en formato JSON estrictamente con esta estructura:
      {
        "headlines": ["titular 1", "titular 2", "titular 3"],
        "primaryTexts": ["copy 1 (con emojis y persuasivo)", "copy 2 (con emojis y persuasivo)"],
        "cta": "texto corto del botón",
        "targetAudience": "descripción de la audiencia objetivo ideal",
        "imagePrompt": "Un prompt en INGLÉS súper detallado para DALL-E 3 para generar una imagen publicitaria estilo estudio profesional de este producto. NO incluyas ningún texto ni letras en la imagen generada. Solo el producto en un fondo o entorno espectacular y limpio que venda."
      }
    `;

    const textResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: textPrompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    const textData = await textResponse.json();
    if (textData.error) throw new Error(textData.error.message);
    
    let generatedContent;
    try {
      generatedContent = JSON.parse(textData.choices[0].message.content);
    } catch (e) {
      throw new Error('Error al parsear la respuesta de OpenAI GPT');
    }

    // 2. Usar DALL-E 3 para generar el Flyer visual
    let flyerUrl = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'; // fallback
    
    try {
      const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: generatedContent.imagePrompt || `Professional studio product advertisement for: ${adsDescription}. Clean, elegant style. No text in the image.`,
          n: 1,
          size: '1024x1024',
          quality: 'standard'
        }),
      });

      const imageData = await imageResponse.json();
      if (imageData.error) {
        console.error('DALL-E API Error:', imageData.error);
      } else if (imageData.data && imageData.data[0]) {
        flyerUrl = imageData.data[0].url;
      }
    } catch (e) {
      console.error('Error in DALL-E fetch:', e);
      // Fallback url se mantiene en caso de error
    }

    // Retornar al frontend
    return new Response(
      JSON.stringify({
        id: Math.random().toString(36).substring(2, 11),
        flyerUrl,
        headlines: generatedContent.headlines || [],
        primaryTexts: generatedContent.primaryTexts || [],
        cta: generatedContent.cta || 'Comprar Ahora',
        targetAudience: generatedContent.targetAudience || 'Público general',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
