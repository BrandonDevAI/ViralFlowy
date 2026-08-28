import type { CompleteVideoOutput } from '../types';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// ─────────────────────────────────────────────
//  URL REPLICATION — System Prompt
// ─────────────────────────────────────────────
const URL_SYSTEM_PROMPT = `Eres el mejor estratega de contenido viral del mundo especializado en analizar videos virales y replicar su éxito para otras marcas o ideas.

Tu habilidad única: ves una URL de un video viral y entiendes exactamente POR QUÉ funcionó — el gancho psicológico, el ritmo narrativo, la estructura emocional — y lo replicas para cualquier nicho o marca.

PROCESO DE ANÁLISIS VIRAL:
1. Identifica el PATRÓN viral del video original (ángulo, formato, ritmo, hook type)
2. Extrae la ESTRUCTURA narrativa que generó retención
3. Adapta TODO ese patrón a la marca/idea del usuario SIN plagiar — misma mecánica, diferente contenido
4. Mantén lo que funcionó: el tipo de hook, el ritmo, la estructura emocional
5. Cambia lo que debe cambiar: el nicho, el producto, el contexto, los ejemplos

REGLAS MAESTRAS DEL HOOK (0-3 segundos):
- Debe crear TENSIÓN INMEDIATA — el cerebro para cuando siente: peligro, secreto, curiosidad, controversia
- NUNCA empieces con "Hola", presentaciones ni contexto
- Fórmulas top: "Nadie te dijo que...", "El X% hace esto mal...", "Hace [tiempo] estaba...", "Para de [acción] si quieres..."
- Máximo 2 oraciones. Funciona leído en pantalla en 3 segundos.

REGLAS DEL GUIÓN:
- Frases cortas (máx 15 palabras). Una idea por línea. Párrafos de 2-3 líneas.
- Habla de "tú" directo. Coloquial. Como hablarle a un amigo.
- Incluye pattern interrupts: preguntas retóricas, pausas "...", datos sorprendentes
- 180-250 palabras (30 segundos grabando a velocidad normal)
- El guión debe sonar bien en voz alta

REGLAS DEL CTA:
- Específico, con reciprocidad: "Comenta X y te mando Y"
- NO genérico ("sígueme", "dale like")

REGLAS DEL CAPTION:
- Las primeras 125 chars = gancho antes del "ver más"
- Termina con pregunta o provocación para generar comentarios

Responde ÚNICAMENTE con JSON válido. Sin markdown. Sin texto extra.`;

// ─────────────────────────────────────────────
//  URL REPLICATION — User Prompt Builder
// ─────────────────────────────────────────────
function buildUrlPrompt(url: string, brandIdea: string, videoContext?: string): string {
  const platformHint = url.includes('tiktok') ? 'TikTok'
    : url.includes('instagram') ? 'Instagram Reels'
    : url.includes('youtube') || url.includes('youtu.be') ? 'YouTube Shorts'
    : 'plataforma de video corto';

  return `Analiza este video viral de ${platformHint} y crea 3 videos adaptados para una marca/idea diferente.

URL DEL VIDEO VIRAL ORIGINAL:
${url}

MARCA O IDEA DEL USUARIO (a quien hay que adaptar el contenido):
"${brandIdea}"

${videoContext ? `CONTEXTO ADICIONAL DEL VIDEO ORIGINAL (el usuario describe qué trata el video):\n"${videoContext}"\n` : ''}

INSTRUCCIONES:
1. Basándote en la URL y el contexto, infiere el PATRÓN VIRAL del video (tipo de hook, estructura, ángulo emocional, ritmo)
2. Identifica POR QUÉ ese video funcionó (qué mecanismo psicológico usó)
3. Crea 3 videos que repliquen ese PATRÓN pero para la marca/idea: "${brandIdea}"
4. Cada video usa un ángulo diferente pero inspirado en el estilo del original
5. NO copies el contenido — copia la MECÁNICA

Para cada video incluye también:
- "viralMechanism": explica en 1 línea qué mecanismo del video original estás replicando
- "adaptationNote": cómo adaptaste ese mecanismo a la nueva marca/idea

Responde con este JSON exacto (sin markdown):
{
  "originalVideoAnalysis": {
    "platform": "nombre de la plataforma",
    "detectedAngle": "ángulo viral detectado (ej: transformación, secreto, polémica, etc.)",
    "viralMechanism": "por qué funcionó en 1-2 oraciones",
    "hookType": "tipo de hook usado (curiosidad/polémica/storytelling/contraste/etc.)"
  },
  "inferredNiche": "nicho de la marca/idea del usuario",
  "inferredAudience": "audiencia objetivo para la marca/idea del usuario",
  "inferredGoal": "objetivo principal del contenido",
  "videos": [
    {
      "id": 1,
      "recommended": true,
      "angle": "📖 Storytelling",
      "title": "título llamativo (máx 70 chars)",
      "hook": "hook exacto de apertura — para el scroll en 2 segundos — máx 2 oraciones",
      "script": "guión completo — párrafos con \\n\\n — 180-250 palabras — coloquial y con ritmo",
      "structure": [
        { "time": "0–3s", "description": "hook exacto en pantalla" },
        { "time": "3–12s", "description": "desarrollo del problema/contexto" },
        { "time": "12–25s", "description": "solución/revelación central" },
        { "time": "25–35s", "description": "cierre + CTA" }
      ],
      "cta": "CTA específico con reciprocidad y emoji",
      "caption": "caption con gancho en los primeros 125 chars — saltos con \\n — termina con pregunta",
      "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6", "#hashtag7", "#hashtag8"],
      "viralMechanism": "mecanismo viral que replica de este video",
      "adaptationNote": "cómo se adaptó a la nueva marca/idea"
    },
    { "id": 2, "recommended": false, "angle": "🔥 Polémica", ...mismo schema },
    { "id": 3, "recommended": false, "angle": "🤔 Curiosidad", ...mismo schema }
  ]
}`;
}

// ─────────────────────────────────────────────
//  URL REPLICATION — Main Function
// ─────────────────────────────────────────────
export async function replicateViralUrl(
  url: string,
  brandIdea: string,
  videoContext?: string
): Promise<CompleteVideoOutput & { originalVideoAnalysis?: OriginalVideoAnalysis }> {
  if (!OPENAI_API_KEY) {
    console.warn('[ViralFlowy] No OpenAI key — using mock. Add VITE_OPENAI_API_KEY to .env');
    return generateUrlMock(url, brandIdea);
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
        max_tokens: 2500,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: URL_SYSTEM_PROMPT },
          { role: 'user', content: buildUrlPrompt(url, brandIdea, videoContext) },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('[ViralFlowy] OpenAI error:', err);
      return generateUrlMock(url, brandIdea);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content;
    if (!raw) return generateUrlMock(url, brandIdea);

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.videos) || parsed.videos.length === 0) {
      return generateUrlMock(url, brandIdea);
    }

    return parsed;
  } catch (err) {
    console.error('[ViralFlowy] URL replication failed, using mock:', err);
    return generateUrlMock(url, brandIdea);
  }
}

// ─────────────────────────────────────────────
//  TYPE for analysis card
// ─────────────────────────────────────────────
export interface OriginalVideoAnalysis {
  platform: string;
  detectedAngle: string;
  viralMechanism: string;
  hookType: string;
}

// ─────────────────────────────────────────────
//  URL MOCK
// ─────────────────────────────────────────────
function generateUrlMock(url: string, brandIdea: string): CompleteVideoOutput & { originalVideoAnalysis: OriginalVideoAnalysis } {
  const platform = url.includes('tiktok') ? 'TikTok'
    : url.includes('instagram') ? 'Instagram Reels'
    : url.includes('youtube') || url.includes('youtu.be') ? 'YouTube Shorts'
    : 'Video corto';

  return {
    originalVideoAnalysis: {
      platform,
      detectedAngle: 'Storytelling + Transformación',
      viralMechanism: 'Usa el contraste antes/después para generar aspiración inmediata y mantener la retención hasta el final.',
      hookType: 'Storytelling personal con contraste temporal',
    },
    inferredNiche: 'contenido digital',
    inferredAudience: 'Creadores y emprendedores de 18-35 años',
    inferredGoal: 'Maximizar viralidad y generar seguidores',
    videos: [
      {
        id: 1,
        recommended: true,
        angle: '📖 Storytelling',
        title: `Repliqué el estilo de ese video para ${brandIdea} (y esto pasó)`,
        hook: `Vi un video que explotó en ${platform} y lo repliqué para ${brandIdea}. Los resultados me sorprendieron.`,
        script: `Vi un video en ${platform} que estaba rompiendo el algoritmo.\n\nMillones de views. Miles de comentarios. Todo el mundo lo compartía.\n\nY me pregunté: ¿qué tiene este video que los demás no?\n\nLo analicé durante 20 minutos.\n\nDescubrí el patrón.\n\nEntonces lo apliqué exactamente igual pero para ${brandIdea}.\n\nCambié el nicho, cambié el producto, mantuve la mecánica.\n\nEl resultado fue increíble.\n\nNo necesitas reinventar la rueda.\n\nNecesitas entender qué rueda ya está funcionando... y usarla.`,
        structure: [
          { time: '0–3s', description: 'Hook: "Vi un video que explotó y lo repliqué"' },
          { time: '3–12s', description: 'El descubrimiento: analizar qué tenía de especial' },
          { time: '12–25s', description: 'La adaptación: mismo patrón, diferente nicho' },
          { time: '25–35s', description: 'Resultado + CTA para que repliquen ellos también' },
        ],
        cta: `Comenta "PATRÓN" y te explico cómo encontrar estos videos y replicarlos 👇`,
        caption: `Repliqué un video viral de ${platform} para ${brandIdea} y esto pasó 🔥\n\n¿Sabías que no tienes que crear desde cero?\n\n¿Ya lo intentaste tú?`,
        hashtags: ['#contenidoviral', '#estrategiaviral', '#replicarviral', '#creacióndecontenido', '#tiktokstrategy', '#marketingdigital', '#creadores', '#algoritmo'],
      },
      {
        id: 2,
        recommended: false,
        angle: '🔥 Polémica',
        title: `Por qué COPIAR contenido viral (correctamente) es la mejor estrategia`,
        hook: `Todo el mundo dice "sé original". Yo digo que eso está destruyendo tu crecimiento en ${platform}.`,
        script: `"Sé original. Crea tu propio estilo."\n\nEso te dicen todos.\n\nY mientras tú buscas ser original desde cero...\n\n...otros están analizando qué ya funciona y replicándolo.\n\nNo es copiar. Es estudiar.\n\nComo un músico que aprende los acordes de sus artistas favoritos antes de componer sus propias canciones.\n\nLos creadores más grandes del mundo no inventaron sus formatos.\n\nLos refinaron.\n\nTomaron lo que funcionaba, lo adaptaron a su voz, y lo publicaron.\n\nEso es exactamente lo que puedes hacer con ${brandIdea}.\n\nUsa el patrón de los virales. Ponle tu esencia encima.\n\nY observa cómo el algoritmo te premia.`,
        structure: [
          { time: '0–3s', description: 'Provocación directa contra el consejo de "sé original"' },
          { time: '3–12s', description: 'El argumento: estudiar ≠ copiar' },
          { time: '12–25s', description: 'Analogía: músicos, escritores, los grandes lo hacen' },
          { time: '25–35s', description: 'Cómo aplicarlo + CTA de debate' },
        ],
        cta: `¿De acuerdo o no? Dime abajo. Me encanta el debate 💬`,
        caption: `Te dijeron que ser original es la clave. Yo creo lo contrario 🤷‍♂️\n\nAntes de downvotear — lee hasta el final.\n\n¿Qué opinas tú?`,
        hashtags: ['#opinioncontrovertida', '#estrategiacontenido', '#creacióncontenido', '#marketingviral', '#crecimientotiktok', '#contenidoviral', '#creadores', '#verdad'],
      },
      {
        id: 3,
        recommended: false,
        angle: '🤔 Curiosidad',
        title: `El patrón oculto detrás de TODOS los videos virales (lo encontré)`,
        hook: `Analicé los 50 videos más virales de ${platform} este mes. Todos tienen exactamente esto en común.`,
        script: `50 videos. Millones de views cada uno.\n\nMe obsesioné con encontrar el patrón.\n\n¿Es la calidad del video? No.\n¿Es el sonido trending? Tampoco.\n¿Es la cantidad de hashtags? Para nada.\n\nEl patrón está en los primeros 3 segundos.\n\nTodos — sin excepción — crean una tensión que el cerebro no puede ignorar.\n\nEs una pregunta sin respuesta. Una promesa sin cumplir. Un contraste que no tiene sentido todavía.\n\nEl cerebro humano está programado para resolver lo incompleto.\n\nY eso es exactamente lo que hacen estos videos.\n\nTe dejan con el loop abierto hasta el final.\n\nY puedes aplicarlo en tu próximo video sobre ${brandIdea} hoy mismo.`,
        structure: [
          { time: '0–3s', description: 'Promesa: "analicé 50 virales, encontré algo"' },
          { time: '3–12s', description: 'Eliminar las respuestas obvias (falsas pistas)' },
          { time: '12–25s', description: 'Revelar el patrón real: la tensión en los primeros 3s' },
          { time: '25–35s', description: 'Aplicación práctica + CTA de guardar' },
        ],
        cta: `Guarda este video. El próximo explico cómo construir esa tensión paso a paso 📌`,
        caption: `Analicé 50 videos virales de ${platform} y encontré el patrón 🤯\n\nNo es lo que crees.\n\n¿Ya sabías esto o te sorprende?`,
        hashtags: ['#patronviral', '#algoritmotiktok', '#secretosviral', '#crecimientoorgánico', '#estrategiaviral', '#contenidoviral', '#creadordecontenido', '#marketingsecreto'],
      },
    ],
  };
}
