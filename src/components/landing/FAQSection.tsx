import { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

const faqs = [
  {
    question: '¿En qué se diferencia ViralFlowy de usar ChatGPT?',
    answer: 'ChatGPT es un modelo genérico. ViralFlowy está entrenado específicamente con fórmulas virales probadas de TikTok, Reels y YouTube. No es un prompt genérico — analizamos la estructura de videos virales reales y replicamos su fórmula adaptada a tu marca. El resultado es contenido optimizado para engagement, no texto genérico.',
  },
  {
    question: '¿Cómo funciona la generación desde URL viral?',
    answer: 'Pegas la URL de cualquier video viral de TikTok, Instagram o YouTube. Nuestra IA analiza la estructura, hook, formato y tono del video original. Luego genera un hook, guión completo, CTA, título y descripción adaptados a tu marca con la misma fórmula que hizo viral al original. Tú eliges qué tipo de contenido quieres crear a partir de ese video.',
  },
  {
    question: '¿Los contenidos suenan robóticos o a IA?',
    answer: 'No. Generamos en estilo UGC natural — el contenido suena como si un creador real lo hubiera escrito. Puedes elegir entre varios estilos (storytelling, educativo, entretenimiento, etc.) y el tono se adapta automáticamente. Tus seguidores no notarán la diferencia.',
  },
  {
    question: '¿Funciona para cualquier nicho?',
    answer: 'Sí. ViralFlowy funciona para cualquier nicho porque analizamos fórmulas virales universales (hooks de curiosidad, controversia, revelación, etc.) y las adaptamos a tu contexto específico. Ya sea fitness, belleza, ecommerce, educación, finanzas o cualquier otro — solo ingresa tu tema y la IA se encarga.',
  },
  {
    question: '¿Qué incluye el plan Pro que no tienen los demás?',
    answer: 'El plan Pro ($69/año) incluye generaciones ilimitadas, 500+ fórmulas virales listas para usar, +100 hooks visuales, guardar hasta 5 marcas o clientes, historial completo de todo tu contenido, acceso anticipado a nuevas funciones (miniaturas con IA, carruseles de video), licencia comercial y soporte 24/7. Es el único plan sin límites.',
  },
  {
    question: '¿Puedo cancelar en cualquier momento?',
    answer: 'Sí, puedes cancelar desde tu panel de configuración sin penalizaciones ni preguntas. Si cancelas, mantendrás acceso hasta el final de tu período pagado. Además, todos los planes tienen 30 días de garantía de devolución — si no estás satisfecho, te devolvemos el 100% de tu dinero.',
  },
  {
    question: '¿Puedo usar el contenido para anuncios pagados?',
    answer: 'Absolutamente. De hecho, muchas marcas y agencias usan nuestros guiones directamente para campañas de Facebook Ads, TikTok Ads e Instagram Ads. Los CTAs están optimizados para conversión. Con el plan Pro tienes licencia de uso comercial incluida.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/[0.08] text-cyan-300 text-xs font-medium mb-6">
            <HelpCircle className="w-3 h-3" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            ¿Tienes{' '}
            <span className="virales-gradient">dudas</span>?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Respondemos las preguntas que más nos hacen antes de comprar.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-purple-500/20 bg-white/[0.04]'
                    : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.03] hover:border-white/[0.1]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className={`text-sm font-semibold transition-colors duration-200 pr-4 ${isOpen ? 'text-white' : 'text-gray-300'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-180 text-purple-400' : 'text-gray-500'
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 text-sm">
            <MessageCircle className="w-4 h-4 text-purple-400" />
            <span>¿Otra pregunta?</span>
            <a href="mailto:soporte@viralflowy.com" className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
              Escríbenos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
