const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface AdsOutput {
  id: string;
  flyerUrl: string;
  headlines: string[];
  primaryTexts: string[];
  cta: string;
  targetAudience: string;
}

export const generateAds = async (
  productDescription: string,
  hasProductImage: boolean,
  hasRefImage: boolean,
  generateVisual: boolean = true
): Promise<AdsOutput> => {
  if (!OPENAI_API_KEY) {
    throw new Error('Falta la API Key de OpenAI en tu archivo .env');
  }

  try {
    const textPrompt = `
      Eres un Trafficker Digital y Director de Arte experto en Meta Ads y TikTok Ads.
      El cliente quiere crear un anuncio de ALTA CONVERSIÓN para su producto.
      Descripción del producto/oferta: "${productDescription}"
      
      Genera una respuesta en formato JSON estrictamente con esta estructura:
      {
        "headlines": ["titular 1 (gancho agresivo)", "titular 2 (beneficio principal)", "titular 3 (urgencia/escasez)"],
        "primaryTexts": ["copy 1 (storytelling/dolor-solución, con emojis)", "copy 2 (directo al grano, oferta irresistible)"],
        "cta": "texto corto del botón",
        "targetAudience": "descripción detallada de la audiencia objetivo ideal",
        "imagePrompt": "Un prompt en INGLÉS ultra-detallado para DALL-E 3. Tu objetivo es generar una imagen publicitaria INCREÍBLEMENTE ATRACTIVA y orientada a VENTAS. Usa términos como 'high-end commercial photography, dramatic studio lighting, hyper-realistic, premium aesthetic, 8k resolution, highly engaging'. Describe el producto en un entorno aspiracional o de estilo de vida que despierte un deseo incontrolable de compra. IMPORTANTE: Exige que NO haya ningún texto, palabras ni letras en la imagen (DALL-E comete errores ortográficos)."
      }
    `;

    const textResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: textPrompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      }),
    });

    if (!textResponse.ok) {
      throw new Error(`OpenAI Text API Error: ${textResponse.status}`);
    }

    const textData = await textResponse.json();
    const generatedContent = JSON.parse(textData.choices[0].message.content);

    let flyerUrl = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'; // fallback
    
    if (generateVisual) {
      try {
        const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt: generatedContent.imagePrompt + ", award-winning commercial photography, highly engaging, sales-driven advertisement, perfectly composed, NO TEXT, NO WORDS, NO LETTERS.",
            n: 1,
            size: '1024x1024',
            quality: 'standard'
          }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          if (imageData.data && imageData.data[0]) {
            flyerUrl = imageData.data[0].url;
          }
        }
      } catch (e) {
        console.error('Error generating DALL-E image:', e);
      }
    } else {
      // Return a blank or placeholder when image generation is disabled
      flyerUrl = '';
    }

    return {
      id: Math.random().toString(36).substring(2, 11),
      flyerUrl,
      headlines: generatedContent.headlines || [],
      primaryTexts: generatedContent.primaryTexts || [],
      cta: generatedContent.cta || 'Comprar Ahora',
      targetAudience: generatedContent.targetAudience || 'Público general',
    };
  } catch (error: any) {
    console.error('Error en generateAds:', error);
    throw new Error(error.message || 'Error al generar el Ad');
  }
};
