'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, MessageCircle, Sparkles } from 'lucide-react';
import { sounds } from '../../lib/soundFeedback';

const faqs = [
  {
    question: '¿En qué se diferencia ViralFlow de usar ChatGPT?',
    answer:
      'ChatGPT es un modelo de texto genérico. ViralFlow está entrenado y estructurado específicamente sobre el algoritmo y la psicología de retención de TikTok, Reels y YouTube Shorts. En lugar de darte respuestas vagas, ViralFlow desglosa hooks de 0-3 segundos, estructuras narrativas segundo a segundo, ángulos probados y llamadas a la acción que aumentan la conversión.',
  },
  {
    question: '¿Puedo analizar un TikTok o Reel que no es mío?',
    answer:
      'Sí. Puedes pegar la URL de cualquier video viral público. Nuestro motor analiza su estructura, ritmo narrativo y tipo de gancho, y genera una versión adaptada a tu producto o nicho sin plagiar el contenido original.',
  },
  {
    question: '¿Qué plataformas soporta ViralFlow?',
    answer:
      'ViralFlow genera contenido optimizado para TikTok, Instagram Reels, YouTube Shorts, anuncios de video (TikTok Ads / Meta Ads) y carruseles educativos de Instagram/LinkedIn.',
  },
  {
    question: '¿La IA adapta el contenido a mi marca?',
    answer:
      'Totalmente. Puedes definir tu nicho, producto, audiencia objetivo y el estilo (UGC natural, storytelling, educativo, venta directa o tendencias) para que el tono suene 100% auténtico.',
  },
  {
    question: '¿Puedo editar los guiones generados?',
    answer:
      'Sí. Todos los ganchos, guiones e indicaciones son editables y puedes copiarlos con un solo clic para llevarlos a tu teleprompter, editor o Notion.',
  },
  {
    question: '¿Qué incluye cada generación?',
    answer:
      'Cada generación te entrega el gancho principal (hook), variaciones alternativas, desglose segundo a segundo (qué decir y qué mostrar en cámara), llamadas a la acción (CTAs) y sugerencias de hashtags.',
  },
  {
    question: '¿Puedo cancelar cuando quiera?',
    answer:
      'Sí, no hay compromisos ni permanencias. Puedes cancelar tu suscripción en cualquier momento desde tu panel o PayPal con un solo clic.',
  },
  {
    question: '¿Puedo utilizar el contenido comercialmente?',
    answer:
      'Sí. Todo el contenido generado con ViralFlow te pertenece completamente y puedes usarlo para cuentas personales, marcas o campañas de clientes en agencias.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    sounds.playClick();
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/[0.08] text-purple-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Respuestas a tus <span className="virales-gradient">dudas</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
            Todo lo que necesitas saber antes de empezar a crear con ViralFlow.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-purple-500/30 bg-[#0c0c16]/90 shadow-lg shadow-purple-500/5'
                    : 'border-white/[0.06] bg-[#07070c]/70 hover:bg-white/[0.03] hover:border-white/[0.1]'
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer gap-4"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`text-sm sm:text-base font-semibold transition-colors duration-200 ${
                      isOpen ? 'text-white' : 'text-gray-300'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-purple-400' : 'text-gray-500'
                    }`}
                  />
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-5 sm:px-6 pb-6 text-sm text-gray-300 leading-relaxed border-t border-white/[0.04] pt-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact help */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-gray-400 text-sm">
            <MessageCircle className="w-4 h-4 text-purple-400" />
            <span>¿Tienes otra pregunta?</span>
            <a
              href="mailto:soporte@viralflowy.com"
              className="text-purple-400 font-semibold hover:text-purple-300 transition-colors"
            >
              Escríbenos a soporte
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
