import type { PlanName } from '../types';

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
export type SlideType = 'hook' | 'content' | 'cta';
export type CarouselPlatform = 'instagram' | 'linkedin' | 'tiktok';

export interface CarouselSlide {
  id: number;
  type: SlideType;
  emoji: string;
  headline: string;    // Main big text on the slide
  body: string;        // Supporting copy (1-2 sentences max)
  highlightWord?: string; // Optional word to highlight in design
}

export interface CarouselOutput {
  topic: string;
  platform: CarouselPlatform;
  totalSlides: number;
  slides: CarouselSlide[];
  caption: string;
  hashtags: string[];
  designTip: string;  // Tip for Canva
  colorSuggestion: string; // Color palette suggestion
}

// ─────────────────────────────────────────────
//  SYSTEM PROMPT
// ─────────────────────────────────────────────
const CAROUSEL_SYSTEM_PROMPT = `Eres experto en crear carruseles virales para Instagram y LinkedIn que generan muchos guardados y compartidos.

REGLAS DEL CARRUSEL VIRAL:

📌 SLIDE 1 — HOOK (el más importante):
- Debe hacer que el usuario deslice. La frase debe crear curiosidad o tensión inmediata.
- Formatos: "X cosas que...", "El error que...", "Por qué [algo común] no funciona", "La guía definitiva de..."
- Headline: máx 8 palabras, impactante. Body: 1 oración que refuerza y promete valor.
- Emoji grande y relevante.

📋 SLIDES 2-6 — CONTENIDO (el valor):
- UN punto por slide. Enfocado. Sin texto de relleno.
- Headline: el titular del punto (máx 6 palabras). Body: la explicación en 1-2 oraciones claras.
- Cada slide debe poder leerse en 5 segundos.
- Progresión lógica: de problema → causa → solución → implementación → resultado.

🎯 SLIDE FINAL — CTA:
- Una sola acción clara. Nunca pedir varias cosas.
- Mejores CTAs para guardar: "Guarda esto para cuando lo necesites 📌"
- Para comentarios: "¿Cuál de estos aplicas? Dime en comentarios 👇"
- Para seguidores: "Sígueme para más como este 🔔"

DISEÑO:
- colorSuggestion: sugiere una paleta (ej: "Fondo oscuro #1a1a2e, texto blanco, acento púrpura #7c3aed")
- designTip: un consejo específico para hacer el carrusel visualmente atractivo en Canva

Responde ÚNICAMENTE JSON válido. Sin markdown.`;

// ─────────────────────────────────────────────
//  PROMPT BUILDER
// ─────────────────────────────────────────────
function buildCarouselPrompt(topic: string, platform: CarouselPlatform, slideCount: number): string {
  const platformContext = {
    instagram: 'Instagram (formato cuadrado 1080x1080, audiencia amplia, tono cercano)',
    linkedin: 'LinkedIn (formato cuadrado 1080x1080, audiencia profesional, tono más formal pero directo)',
    tiktok: 'TikTok (formato vertical 1080x1920, audiencia joven, tono casual y directo)',
  }[platform];

  return `Crea un carrusel viral de ${slideCount} slides para ${platformContext}.

TEMA: "${topic}"

Genera exactamente ${slideCount} slides: 1 hook + ${slideCount - 2} de contenido + 1 CTA final.

JSON de respuesta:
{
  "topic": "${topic}",
  "platform": "${platform}",
  "totalSlides": ${slideCount},
  "slides": [
    {
      "id": 1,
      "type": "hook",
      "emoji": "emoji grande relevante",
      "headline": "titular del slide (máx 8 palabras)",
      "body": "una oración que complementa y promete valor",
      "highlightWord": "palabra clave a resaltar visualmente (opcional)"
    },
    ...slides de contenido con type: "content"...
    {
      "id": ${slideCount},
      "type": "cta",
      "emoji": "📌 o 👇 o 🔔",
      "headline": "acción clara y directa",
      "body": "refuerzo breve del valor que acaban de recibir"
    }
  ],
  "caption": "descripción del post: gancho en primeras 125 chars, incluye saltos con \\n, termina con pregunta",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7"],
  "designTip": "consejo específico y accionable para diseñar esto en Canva",
  "colorSuggestion": "paleta de colores concreta con hex codes"
}`;
}

// ─────────────────────────────────────────────
//  MAIN FUNCTION
// ─────────────────────────────────────────────
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function generateCarousel(
  topic: string,
  platform: CarouselPlatform,
  slideCount: number = 7
): Promise<CarouselOutput> {
  if (!OPENAI_API_KEY) {
    console.warn('[ViralFlowy] No OpenAI key — using carousel mock');
    return generateCarouselMock(topic, platform, slideCount);
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
        temperature: 0.82,
        max_tokens: 2000,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: CAROUSEL_SYSTEM_PROMPT },
          { role: 'user', content: buildCarouselPrompt(topic, platform, slideCount) },
        ],
      }),
    });

    if (!response.ok) {
      console.error('[ViralFlowy] OpenAI carousel error');
      return generateCarouselMock(topic, platform, slideCount);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content;
    if (!raw) return generateCarouselMock(topic, platform, slideCount);

    const parsed = JSON.parse(raw) as CarouselOutput;
    if (!Array.isArray(parsed.slides) || parsed.slides.length === 0) {
      return generateCarouselMock(topic, platform, slideCount);
    }

    return parsed;
  } catch (err) {
    console.error('[ViralFlowy] Carousel generation failed:', err);
    return generateCarouselMock(topic, platform, slideCount);
  }
}

// ─────────────────────────────────────────────
//  MOCK
// ─────────────────────────────────────────────
function generateCarouselMock(topic: string, platform: CarouselPlatform, slideCount: number): CarouselOutput {
  const slides: CarouselSlide[] = [
    {
      id: 1,
      type: 'hook',
      emoji: '🔥',
      headline: `${slideCount - 1} cosas sobre ${topic} que nadie te dice`,
      body: 'Desliza para aprender lo que los expertos aplican cada día.',
      highlightWord: 'nadie',
    },
    {
      id: 2,
      type: 'content',
      emoji: '❌',
      headline: 'El error más común',
      body: `La mayoría empieza con ${topic} sin entender el principio básico. Resultado: tiempo y esfuerzo desperdiciados.`,
    },
    {
      id: 3,
      type: 'content',
      emoji: '🧠',
      headline: 'La mentalidad correcta',
      body: `Antes de hacer, entiende el "por qué". Cada acción en ${topic} debe tener un propósito claro.`,
    },
    {
      id: 4,
      type: 'content',
      emoji: '⚡',
      headline: 'El atajo que funciona',
      body: 'No necesitas hacerlo perfecto desde el inicio. Empieza simple, itera rápido, mejora con datos reales.',
    },
    {
      id: 5,
      type: 'content',
      emoji: '📊',
      headline: 'Mide lo que importa',
      body: `En ${topic}, hay 1 métrica que predice el éxito. Todo lo demás es ruido. Enfócate en esa.`,
    },
    {
      id: 6,
      type: 'content',
      emoji: '🚀',
      headline: 'El siguiente nivel',
      body: 'Una vez que domines lo básico, este paso te separa del 90% de personas en tu nicho.',
      highlightWord: '90%',
    },
    {
      id: 7,
      type: 'cta',
      emoji: '📌',
      headline: 'Guarda esto para cuando lo necesites',
      body: `Aplica uno de estos puntos esta semana y cuéntame cómo te fue con ${topic}.`,
    },
  ];

  return {
    topic,
    platform,
    totalSlides: slideCount,
    slides: slides.slice(0, slideCount),
    caption: `${slideCount - 1} cosas sobre ${topic} que nadie te dice 🔥\n\nLa mayoría lo está haciendo mal. Desliza y descubre qué estás pasando por alto.\n\n¿Cuál de estos puntos te pareció más útil? 👇`,
    hashtags: ['#contenidoviral', '#carruselinstagram', '#aprendeconmigo', '#marketingdigital', '#creadordecontenido', '#crecimiento', '#estrategia'],
    designTip: 'Usa Canva con una plantilla de carrusel cuadrado. Mantén el mismo fondo en todos los slides para coherencia visual. El headline en grande (60-80pt) y el body en texto secundario más pequeño.',
    colorSuggestion: 'Fondo: #0f0f1a (negro azulado) · Texto principal: #ffffff · Acento: #7c3aed (púrpura) · Texto secundario: #a78bfa',
  };
}
