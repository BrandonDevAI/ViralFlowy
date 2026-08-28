import type { FormData, ContentOutput } from '../types';

export function generateMockContent(form: FormData): ContentOutput {
  const { niche, product, audience, goal, style } = form;

  const goalPhrases: Record<string, string> = {
    'Obtener más vistas': 'volverse viral',
    'Aumentar seguidores': 'hacer crecer tu comunidad',
    'Vender un producto': 'impulsar las ventas',
  };
  const goalAction = goalPhrases[goal] || 'volverse viral';

  const hooks = [
    { id: 1, text: `POV: Acabas de descubrir el secreto de ${niche} del que nadie habla` },
    { id: 2, text: `Probé todos los trucos de ${niche} — solo ESTE funcionó` },
    { id: 3, text: `Si eres ${audience}, deja de scrollear. Esto lo cambia todo.` },
    { id: 4, text: `${product} es la razón por la que llegué a 1M de vistas en 30 días` },
    { id: 5, text: `La industria de ${niche} no quiere que sepas esto` },
    { id: 6, text: `Espera hasta el final — esto cambió por completo mi visión de ${niche}` },
    { id: 7, text: `Era escéptico sobre ${product} hasta que esto pasó…` },
    { id: 8, text: `Nadie en ${niche} habla de esto (pero deberían)` },
    { id: 9, text: `Cómo usé ${product} para ${goalAction} sin gastar un peso en ads` },
    { id: 10, text: `Este hack de ${niche} es tan simple que parece trampa` },
  ];

  const styleBodyMap: Record<string, string[]> = {
    'UGC (natural / estilo influencer)': [
      `Ok, hablemos en serio — llevo años en el mundo de ${niche} y NUNCA pensé que algo como ${product} realmente funcionaría. Pero esto es lo que pasó cuando lo probé solo una semana...`,
      `Estaba ahí, completamente frustrado con ${niche}, ¿verdad? Mis amigos ${audience} no paraban de decirme que probara ${product}. Finalmente lo hice. ¿Y honestamente? Me da vergüenza haber esperado tanto.`,
      `Pregunta genuina: ¿por qué nadie me habló de ${product} antes? He gastado tanto tiempo en otras cosas de ${niche} que no dieron resultados. ¿Este? Historia diferente.`,
    ],
    'Storytelling': [
      `Hace seis meses, era solo otra persona luchando en ${niche}. Sin tracción. Sin resultados. Luego encontré ${product} — y todo cambió. Aquí está la historia completa.`,
      `Empezó como un pequeño experimento. Quería ver si ${product} realmente podía ayudar a ${audience} a lograr resultados reales en ${niche}. Lo que encontré me voló la cabeza.`,
      `Casi abandono ${niche} por completo. Entonces una noche me topé con ${product}. ¿Qué pasó en los siguientes 30 días? Te lo muestro.`,
    ],
    'Problema → Solución': [
      `El problema con la mayoría del contenido de ${niche}? No convierte. ${audience} son inteligentes — pueden oler lo falso a kilómetros. ${product} resuelve eso dándote frameworks auténticos y probados que realmente funcionan.`,
      `La verdad dura: el 90% de las estrategias de ${niche} fallan porque ignoran lo que ${audience} realmente quieren. ${product} arregla exactamente eso — y los resultados hablan por sí solos.`,
      `Has probado todo en ${niche}. Nada funciona. El verdadero problema no es tu esfuerzo — es tu enfoque. ${product} te da el sistema exacto diseñado para ${audience}.`,
    ],
    'Tendencia Viral': [
      `Alerta de tendencia: ${niche} acaba de cambiar para siempre. ${audience} ya están usando ${product} para dominar sus feeds. ¿Estás dentro o fuera?`,
      `Todos en ${niche} están haciendo este reto — y con buena razón. ${product} es el arma secreta detrás de la tendencia. Así es como usarla.`,
      `Este formato de ${niche} se está volviendo viral ahora mismo. ${audience} no pueden parar de verlo. Usamos ${product} para descifrar el código. Copiarlo te tomará 10 minutos.`,
    ],
  };

  const bodies = styleBodyMap[style] || styleBodyMap['UGC (natural / estilo influencer)'];

  const scripts = [
    {
      id: 1,
      hook: hooks[0].text,
      body: bodies[0],
      cta: `Sígueme para más contenido de ${niche} que realmente funciona.`,
    },
    {
      id: 2,
      hook: hooks[3].text,
      body: bodies[1],
      cta: `Link en bio → Prueba ${product} gratis por 7 días.`,
    },
    {
      id: 3,
      hook: hooks[6].text,
      body: bodies[2],
      cta: `Comenta "${niche.toUpperCase()}" y te mando el desglose completo por DM.`,
    },
  ];

  const videoIdeas = [
    {
      id: 1,
      concept: `"Un día en mi vida" usando ${product} en una rutina de ${niche}`,
      howToRecord: `Grábate naturalmente durante tu día. Muestra ${product} en 3 momentos de uso real. Sin guión — habla directo a cámara. Mantén los clips de menos de 5 segundos. Agrega audio en tendencia.`,
    },
    {
      id: 2,
      concept: `Transformación Antes vs Después para ${audience}`,
      howToRecord: `Pantalla dividida o corte directo. Izquierda/antes: muestra la forma antigua de hacer ${niche}. Derecha/después: muestra resultados usando ${product}. Texto overlay con la diferencia. Termina en el "después" por 3 segundos.`,
    },
    {
      id: 3,
      concept: `"Probé 5 métodos de ${niche} para que tú no tengas que hacerlo"`,
      howToRecord: `Formato rápido. Clip de 3-5 segundos por método. Califica cada uno en pantalla (1-10). ${product} es el último — dale la calificación más alta. Genera suspenso con corte musical.`,
    },
    {
      id: 4,
      concept: `Opinión controversial: "Por qué la mayoría de ${audience} están haciendo ${niche} mal"`,
      howToRecord: `Cara a cámara, entrega segura. Menciona el enfoque incorrecto primero, luego revela el correcto usando ${product}. Mantén menos de 30 segundos. Señala la cámara en el CTA.`,
    },
    {
      id: 5,
      concept: `Haz stitch o duet de un video viral de ${niche} con tu opinión`,
      howToRecord: `Encuentra un video de ${niche} en tendencia. Haz stitch — muestra tu reacción o contra-argumento. Conecta con cómo ${product} da un mejor resultado. Aprovecha el tráfico existente.`,
    },
  ];

  const ctas = [
    `Deja un "${niche.toUpperCase()}" en los comentarios y te envío la guía completa — gratis.`,
    `Link en bio → Empieza tu prueba gratuita de ${product} hoy. Los primeros 100 obtienen acceso anticipado.`,
    `Sígueme + comparte esto con alguien que lo necesite. Podrías cambiarle la vida.`,
  ];

  return { hooks, scripts, videoIdeas, ctas };
}
