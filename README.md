# UGC Content Generator

Aplicación web para crear contenido de marketing y videos cortos orientados a redes sociales. UGC ayuda a creadores, marcas y equipos de marketing a convertir una idea, un video viral o la descripción de un producto en contenido listo para adaptar y publicar.

## ¿Para qué sirve?

La aplicación centraliza la creación de contenido UGC en un único espacio de trabajo y ofrece cuatro modos:

- **Video desde una idea:** genera una propuesta completa de video con estructura, guion, escenas y elementos de publicación.
- **Replicar un video viral:** analiza una URL y adapta su estructura a una marca, producto o idea diferente.
- **Carruseles:** crea contenido para Instagram u otras plataformas, con un número configurable de diapositivas y vista previa.
- **Anuncios:** genera titulares, textos principales, llamada a la acción, audiencia objetivo y un flyer visual para un producto u oferta.

La plataforma también incluye autenticación con Google, control de generaciones mediante monedas o planes, historial de uso diario, suscripciones y pagos con PayPal.

## Tecnologías utilizadas

- **React 18** para la interfaz y los componentes reutilizables.
- **TypeScript** para tipado estático y mayor seguridad en el código.
- **Vite** como herramienta de desarrollo y build.
- **Tailwind CSS** para los estilos y el diseño responsive.
- **React Router** para la navegación entre la landing page y la aplicación.
- **Lucide React** para los iconos de la interfaz.
- **Supabase** para autenticación, perfiles, suscripciones y registros de generaciones.
- **Supabase Edge Functions con Deno** para la lógica backend del generador de anuncios.
- **OpenAI GPT-4o-mini** para generar copy e instrucciones de imágenes.
- **OpenAI DALL-E 3** para generar flyers publicitarios.
- **PayPal React SDK** para el checkout de los planes.
- **html-to-image** y **html2canvas** para exportar contenido visual.


## Estructura principal

```text
src/
├── components/   # Componentes de landing, formularios, resultados y modales
├── context/      # Estado global de autenticación y suscripción
├── data/         # Generadores de videos, carruseles, anuncios y replicación
├── lib/          # Cliente de Supabase
├── pages/        # Landing page y panel principal
└── types/        # Tipos compartidos de la aplicación
supabase/
└── functions/    # Supabase Edge Functions
```