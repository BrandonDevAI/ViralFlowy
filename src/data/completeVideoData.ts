import type { CompleteVideoOutput } from '../types';
import { env } from '../lib/env';

const OPENAI_API_KEY = env.OPENAI_API_KEY;

// ─────────────────────────────────────────────
//  SYSTEM PROMPT — Expert Viral Content Engine
// ─────────────────────────────────────────────
const SYSTEM_PROMPT = `Eres un experto en contenido viral para TikTok, Instagram Reels y YouTube Shorts. Has estudiado a Alex Hormozi, MrBeast y los mayores creadores hispanos.

REGLAS CLAVE:

🎯 HOOK (0-3s): Para el scroll en 2 segundos. NUNCA empieces con "Hola". Usa tensión inmediata:
- "Nadie te dijo que [verdad incómoda]"
- "El X% hace [error] y no lo saben"
- "Hace [tiempo] estaba [situación mala]. Hoy [resultado increíble]"
- "Para de [acción] si quieres [resultado]"
Máx 2 oraciones. Funciona leído en pantalla.

📝 GUIÓN: Frases cortas (máx 12 palabras). Una idea por línea. Párrafos de 2 líneas. Habla de "tú" directo. Coloquial, como a un amigo. Incluye pausas "..." y preguntas retóricas. 120-150 palabras exactas.

📣 CTA: Específico con reciprocidad. "Comenta X y te mando Y" > "Sígueme".

✍️ CAPTION: Primeras 125 chars = gancho antes del "ver más". Termina con pregunta.

#️⃣ HASHTAGS: 7-8 tags. Mix de masivos + nicho medio + específicos.

Responde ÚNICAMENTE JSON válido. Sin markdown. Sin texto extra.`;

// ─────────────────────────────────────────────
//  USER PROMPT BUILDER
// ─────────────────────────────────────────────
function buildPrompt(userIdea: string): string {
  return `Crea 3 videos virales de alta conversión basados en esta idea:

"${userIdea}"

CONTEXTO IMPORTANTE:
- Plataformas objetivo: TikTok, Instagram Reels, YouTube Shorts
- Idioma: Español latinoamericano (natural, coloquial, sin ser vulgar)
- Formato de video: vertical, 30-60 segundos, cámara al frente hablando directo
- Objetivo del creador: crecer rápido y monetizar

INSTRUCCIONES ESPECÍFICAS:
1. Detecta el nicho exacto de esta idea y adapta el vocabulario y referencias
2. El HOOK debe ser diferente en los 3 videos — no repitas la misma apertura
3. El GUIÓN debe tener ritmo: mezcla frases muy cortas con frases medias
4. Incluye al menos 1 "pattern interrupt" por guión (dato sorprendente, pregunta retórica o pausa dramática marcada con "...")
5. Los 3 CTAs deben ser distintos entre sí
6. Los HASHTAGS deben ser relevantes al nicho específico detectado, no genéricos
7. El CAPTION debe cortar con gancho antes del "ver más" (máx 125 chars antes del salto)

Usa estos 3 ángulos exactamente en este orden:
- Video 1: 📖 Storytelling (historia personal + emoción)
- Video 2: 🔥 Polémica (opinión fuerte que genera debate)
- Video 3: 🤔 Curiosidad (secreto o dato que crea loop abierto)

Responde con este JSON exacto:
{
  "inferredNiche": "nicho específico detectado",
  "inferredAudience": "descripción detallada de la audiencia ideal (edad, intereses, dolor principal)",
  "inferredGoal": "objetivo de negocio/crecimiento principal",
  "videos": [
    {
      "id": 1,
      "angle": "📖 Storytelling",
      "title": "título del video que funcione como thumbnail text (máx 70 chars, mayúsculas en palabras clave)",
      "hook": "la frase de apertura exacta — debe parar el scroll en 2 segundos — máx 2 oraciones potentes",
      "script": "guión completo listo para grabar — párrafos separados por \\n\\n — entre 180 y 250 palabras — coloquial y con ritmo",
      "structure": [
        { "time": "0–3s", "description": "qué dice y hace el creador exactamente (hook en pantalla)" },
        { "time": "3–12s", "description": "desarrollo: contexto y agitación del problema" },
        { "time": "12–25s", "description": "solución / revelación / historia central" },
        { "time": "25–35s", "description": "cierre con lección + transición al CTA" }
      ],
      "cta": "llamada a la acción específica con reciprocidad y emoji",
      "caption": "descripción completa del post — las primeras 125 chars deben ser el gancho — incluye saltos de línea con \\n — termina con pregunta o provocación",
      "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6", "#hashtag7", "#hashtag8"]
    },
    {
      "id": 2,
      "angle": "🔥 Polémica",
      ...misma estructura
    },
    {
      "id": 3,
      "angle": "🤔 Curiosidad",
      ...misma estructura
    }
  ]
}`;
}

// ─────────────────────────────────────────────
//  MAIN FUNCTION
// ─────────────────────────────────────────────
export async function generateCompleteVideos(userIdea: string): Promise<CompleteVideoOutput> {
  if (!OPENAI_API_KEY) {
    console.warn('[ViralFlowy] No OpenAI key — using mock data. Add VITE_OPENAI_API_KEY to .env');
    return generateMockVideos(userIdea);
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.85,
        max_tokens: 2200,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildPrompt(userIdea) },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('[ViralFlowy] OpenAI API error:', err);
      return generateMockVideos(userIdea);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content;

    if (!raw) {
      console.error('[ViralFlowy] Empty response from OpenAI');
      return generateMockVideos(userIdea);
    }

    const parsed = JSON.parse(raw) as CompleteVideoOutput;

    if (!Array.isArray(parsed.videos) || parsed.videos.length === 0) {
      console.error('[ViralFlowy] Invalid structure from OpenAI:', parsed);
      return generateMockVideos(userIdea);
    }

    return parsed;
  } catch (err) {
    console.error('[ViralFlowy] Failed to generate with OpenAI, falling back to mock:', err);
    return generateMockVideos(userIdea);
  }
}

// ─────────────────────────────────────────────
//  FALLBACK MOCK (always works without API)
// ─────────────────────────────────────────────
function generateMockVideos(userIdea: string): CompleteVideoOutput {
  const idea = userIdea.trim();
  const niche = inferNiche(idea);

  return {
    inferredNiche: niche,
    inferredAudience: 'Jóvenes de 18-35 años interesados en crecer en redes sociales y monetizar su contenido',
    inferredGoal: 'Maximizar viralidad y conversión',
    videos: [
      {
        id: 1,
        recommended: true,
        angle: '📖 Storytelling',
        title: `Cómo ${idea} cambió mi vida en 30 días (historia REAL)`,
        hook: `Hace exactamente 30 días no tenía ni idea de cómo hacer ${idea}. Hoy cambia todo lo que pensabas que sabías.`,
        script: `Hace 30 días me senté frente a la cámara por primera vez.\n\nManos temblorosas. Sudando. Sin saber qué decir.\n\nPensé: "esto de ${idea} no es para mí".\n\nY me equivoqué completamente.\n\nPorque lo que nadie te dice es que el truco no está en tener talento.\n\nEstá en entender cómo funciona el algoritmo y darte exactamente lo que pide.\n\nEn 30 días apliqué una sola estrategia diferente.\n\n¿El resultado?\n\nCambió por completo cómo el algoritmo distribuye mi contenido.\n\nY puedo probarlo.\n\nSi quieres saber exactamente qué hice, quédate que en 30 segundos te lo cuento todo.`,
        structure: [
          { time: '0–3s', description: 'Hook de apertura con contraste temporal (hace 30 días vs hoy)' },
          { time: '3–12s', description: 'Contexto emocional: miedo, duda, punto de quiebre' },
          { time: '12–25s', description: 'La revelación: la estrategia única que funcionó' },
          { time: '25–35s', description: 'Prueba + CTA para ver más contenido o comentar' },
        ],
        cta: `Comenta "30 DÍAS" y te mando la estrategia completa en DM 👇`,
        caption: `En 30 días hice esto con ${idea} y cambió todo 🔥\n\n¿Cuánto tiempo llevas intentándolo sin resultados?\n\nTe cuento exactamente qué hice diferente 👆`,
        hashtags: [`#${niche}`, '#contenidoviral', '#crecimientoenredes', '#estrategiadigital', '#creadores', '#tiktoktips', '#marketingdigital', '#emprendimiento'],
      },
      {
        id: 2,
        angle: '🔥 Polémica',
        title: `DEJA de hacer ${niche} así. Estás perdiendo el tiempo`,
        hook: `Nadie te va a decir esto porque les conviene que sigas cometiendo este error con ${niche}. Pero yo sí te lo digo.`,
        script: `Hay una industria completa ganando dinero con tu ignorancia sobre ${idea}.\n\nY lo sé porque yo también caí.\n\nGasté meses haciendo lo que "los expertos" dicen.\n\nResultado: cero.\n\nLuego entendí algo que nadie quiere admitir:\n\nEl 90% del consejo sobre ${niche} que hay en internet está desactualizado o directamente es falso.\n\nLas reglas cambiaron.\n\nLo que funcionaba en 2022 hoy te hunde.\n\nY mientras tú sigues con las técnicas viejas...\n\n...otros están usando lo que realmente mueve el algoritmo ahora.\n\nSé que esto va a molestar a muchos.\n\nPero prefiero que te molestes y crezcas a que sigas igual.\n\n¿Cuál crees que es el error más común? Dime abajo.`,
        structure: [
          { time: '0–3s', description: 'Acusación directa — crear tensión inmediata' },
          { time: '3–12s', description: 'Establecer credibilidad: "yo también caí en esto"' },
          { time: '12–25s', description: 'El argumento central: las reglas cambiaron' },
          { time: '25–35s', description: 'Posición firme + apertura al debate en comentarios' },
        ],
        cta: `¿De acuerdo o no? Dime exactamente por qué en los comentarios 💬`,
        caption: `Lo que nadie del nicho de ${niche} te quiere decir 👀\n\nSigue haciéndolo mal o úsalo a tu favor.\n\n¿Cuál es el peor consejo que te han dado?`,
        hashtags: [`#${niche}`, '#opinioncontrovertida', '#mercadodigital', '#emprendedores', '#marketingreality', '#crecer2024', '#estrategia', '#verdadincómoda'],
      },
      {
        id: 3,
        angle: '🤔 Curiosidad',
        title: `El truco de ${niche} que los grandes NO enseñan (y funciona)`,
        hook: `Hay algo en ${idea} que los creadores con millones de seguidores hacen y nunca hablan de ello. Hoy lo revelo.`,
        script: `Analicé los últimos 200 videos virales de ${niche}.\n\nBuscaba el patrón.\n\nEl "algo" que tienen en común que no es ni la calidad de cámara ni el presupuesto.\n\nY lo encontré.\n\nEstá escondido en los primeros 3 segundos de cada video que explota.\n\nTodos — sin excepción — hacen esto:\n\nCrían una tensión que el cerebro no puede ignorar.\n\nNo es un truco de edición.\n\nNo es un sonido trending.\n\nEs algo en la psicología básica de cómo procesamos información.\n\n¿Lo más impactante?\n\nPuedes aplicarlo en tu próximo video sin cambiar absolutamente nada más.\n\nTe lo muestro en el siguiente video.\n\nGuarda este para que no se te pierda.`,
        structure: [
          { time: '0–3s', description: 'Promesa de revelar un secreto exclusivo de los grandes' },
          { time: '3–12s', description: 'Establecer el misterio: "analicé 200 videos, encontré algo"' },
          { time: '12–25s', description: 'Revelar parcialmente — mantener el loop abierto' },
          { time: '25–35s', description: 'Segundo loop + CTA de guardar para no perderlo' },
        ],
        cta: `Guarda este video. Lo que viene en el siguiente te va a cambiar la estrategia 📌`,
        caption: `Lo que los grandes de ${niche} hacen y nunca enseñan 🤫\n\nAnalicé 200 videos virales y encontré el patrón.\n\n¿Ya lo sabías o te sorprende? 👇`,
        hashtags: [`#${niche}`, '#secretosviral', '#crecimientoorgánico', '#algoritmotiktok', '#contenidoviral', '#creadordecontenido', '#tipsviral', '#marketingsecreto'],
      },
    ],
  };
}

function inferNiche(idea: string): string {
  const lower = idea.toLowerCase();
  if (lower.includes('fitness') || lower.includes('gym') || lower.includes('ejercicio') || lower.includes('músculo')) return 'fitness';
  if (lower.includes('belleza') || lower.includes('skincare') || lower.includes('maquillaje') || lower.includes('piel')) return 'belleza';
  if (lower.includes('negocio') || lower.includes('emprendimiento') || lower.includes('dinero') || lower.includes('vender') || lower.includes('ventas')) return 'negocios';
  if (lower.includes('cocina') || lower.includes('receta') || lower.includes('comida') || lower.includes('chef')) return 'gastronomía';
  if (lower.includes('tech') || lower.includes('tecnología') || lower.includes('app') || lower.includes('software') || lower.includes('ia')) return 'tecnología';
  if (lower.includes('moda') || lower.includes('ropa') || lower.includes('outfit') || lower.includes('estilo')) return 'moda';
  if (lower.includes('viaje') || lower.includes('travel') || lower.includes('destino') || lower.includes('turismo')) return 'viajes';
  if (lower.includes('finanzas') || lower.includes('inversión') || lower.includes('ahorro') || lower.includes('cripto')) return 'finanzas';
  if (lower.includes('tiktok') || lower.includes('reels') || lower.includes('contenido') || lower.includes('creador') || lower.includes('seguidores')) return 'creacióndecontenido';
  return 'marketingdigital';
}
