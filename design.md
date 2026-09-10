# VIRALFLOW — MASTER PROMPT

## Premium AI SaaS + Creative Frontend 3D + High-Conversion Landing

Actúa como un **Senior Full-Stack Engineer + Senior Product Designer + Creative Frontend Engineer**, especializado en:

* Next.js
* React
* TypeScript
* SaaS
* AI Products
* UI/UX
* Creative Development
* Three.js
* React Three Fiber
* WebGL / GLSL
* GSAP
* ScrollTrigger
* Performance
* Accessibility
* Conversion Rate Optimization

Estás trabajando sobre un proyecto existente llamado **ViralFlow**.

---

# 1. REGLAS ABSOLUTAS

Antes de modificar cualquier código:

1. Analiza la estructura actual del proyecto.
2. Identifica el framework y versión.
3. Identifica las dependencias existentes.
4. Identifica el sistema de estilos.
5. Identifica los componentes reutilizables.
6. Identifica las secciones actuales de la landing.
7. Identifica el sistema de animaciones existente.
8. Identifica cómo está organizado el estado.
9. Identifica qué funcionalidades son reales actualmente.
10. Identifica qué elementos pueden reutilizarse.

### NO HACER

* No reconstruir ViralFlow desde cero.
* No reemplazar la identidad visual existente.
* No eliminar componentes funcionales sin necesidad.
* No duplicar componentes.
* No crear una segunda arquitectura paralela.
* No introducir librerías que ya estén instaladas con otra tecnología equivalente.
* No agregar dependencias únicamente para conseguir efectos visuales simples.
* No inventar funcionalidades que el producto todavía no tiene.
* No inventar métricas, testimonios, usuarios o resultados.
* No sacrificar performance por animaciones.
* No convertir la landing en una demostración técnica excesiva.

### PRINCIPIO

**Modificar lo necesario. Reutilizar lo existente. Mejorar la experiencia.**

---

# 2. OBJETIVO DEL REDISEÑO

Transformar ViralFlow en una landing SaaS AI:

* Premium
* Moderna
* Creíble
* AI-first
* Visualmente memorable
* Orientada a conversión
* Rápida
* Responsive
* Accesible

La landing debe comunicar en pocos segundos:

1. Qué es ViralFlow.
2. Qué problema resuelve.
3. Cómo funciona.
4. Qué recibe el usuario.
5. Por qué es diferente de utilizar ChatGPT directamente.
6. Cuánto cuesta.
7. Qué debe hacer para comenzar.

La experiencia debe seguir este principio:

**INPUT → AI ANALYSIS → INSIGHT → CONTENT → VALUE**

El visitante debe poder comprender este flujo principalmente mediante la interfaz y las animaciones, no mediante grandes cantidades de texto.

---

# 3. IDENTIDAD VISUAL

Mantener la identidad actual de ViralFlow.

### Dirección visual

* Dark UI.
* Negro / morado oscuro como base.
* Morado como color primario.
* Azul como color secundario.
* Gradientes controlados.
* Glassmorphism únicamente cuando aporte profundidad.
* Bordes sutiles.
* Glow moderado.
* Tipografía grande y moderna.
* Mucho espacio negativo.
* Alto contraste.
* Sensación tecnológica premium.

No introducir colores arbitrarios.

Colores adicionales como:

* verde
* amarillo
* cyan
* naranja

solo pueden utilizarse cuando representen un estado, categoría o información concreta.

---

# 4. STACK TECNOLÓGICO

Utilizar el siguiente stack como arquitectura objetivo:

## Frontend

### Next.js

Responsabilidades:

* Routing.
* Server Components cuando sean apropiados.
* Client Components únicamente donde exista interactividad.
* SEO.
* Metadata.
* Optimización.
* Code splitting.
* Carga eficiente de recursos.
* Arquitectura de la aplicación.

No convertir toda la aplicación en Client Components innecesariamente.

---

### React

Responsabilidades:

* Componentización.
* Estado de UI.
* Interacciones.
* Control de componentes.
* Comunicación entre la UI 2D y la experiencia 3D.

Crear componentes reutilizables.

Ejemplo conceptual:

```text
Hero
├── HeroCopy
├── HeroCTA
├── HeroScene
├── FloatingStats
└── HeroDemo
```

---

### TypeScript

Todo código nuevo debe estar tipado.

Crear interfaces/types para:

* Feature
* ContentGeneration
* AnalysisResult
* Hook
* Script
* CTA
* PricingPlan
* AnimationState
* Product/UI state

Evitar:

```ts
any
```

salvo casos técnicamente justificados.

---

# 5. THREE.JS + REACT THREE FIBER

Esta será la tecnología responsable de introducir una experiencia 3D diferenciadora.

## Three.js

Utilizar Three.js para:

* Scene.
* Camera.
* Meshes.
* Geometry.
* Materials.
* Lights.
* 3D transformations.
* Render loop.
* Vector mathematics.
* Object positioning.

## React Three Fiber

Utilizar React Three Fiber para integrar Three.js con React.

La escena 3D debe comportarse como un componente React.

Conceptualmente:

```tsx
<HeroScene>
    <ViralFlowObject />
    <Camera />
    <Lights />
</HeroScene>
```

No crear una implementación Three.js independiente si puede integrarse correctamente mediante React Three Fiber.

---

# 6. CONCEPTO 3D DE VIRALFLOW

NO copiar literalmente el balón, branding o diseño de Slam Dunk.

Tomar únicamente como referencia su **lenguaje de interacción**:

* objeto 3D protagonista
* movimiento controlado por scroll
* cambios de escala
* rotación
* profundidad
* entrada/salida de escena
* transición entre estados
* integración entre mundo 3D y UI 2D
* storytelling visual

El objeto 3D debe representar conceptualmente el **motor de ViralFlow**.

Puede ser, dependiendo de la dirección visual actual del proyecto:

* núcleo de IA
* esfera energética
* nodo de contenido
* objeto abstracto tecnológico
* flujo de partículas
* estructura generativa

Debe sentirse relacionado con:

**AI + Content + Viral Patterns**

No utilizar un objeto 3D aleatorio únicamente porque se vea atractivo.

---

# 7. HERO — PRIORIDAD MÁXIMA

Mantener:

* fondo oscuro
* identidad morada/azul
* tipografía grande
* gradientes
* CTA
* composición premium

Mejorar el mensaje.

### BADGE

```text
IA para ingeniería de contenido viral
```

### HEADLINE

```text
Convierte contenido viral en ideas para tu marca.
```

### SUBHEADLINE

```text
Pega un TikTok, Reel o una idea. ViralFlow analiza su estructura y genera hooks, guiones y CTAs adaptados a tu audiencia.
```

### CTA PRINCIPAL

```text
Analizar mi primera idea →
```

### CTA SECUNDARIO

```text
Ver cómo funciona (30s)
```

El copy debe representar exactamente las capacidades reales del producto.

No afirmar que ViralFlow genera videos completos si actualmente genera:

* hooks
* guiones
* ideas
* estructuras
* CTAs

---

# 8. HERO — EXPERIENCIA 3D

El Hero debe convertirse en el principal elemento diferencial de la landing.

La experiencia debe combinar:

```text
COPY 2D
+
UI PRODUCT DEMO
+
3D OBJECT
+
SCROLL INTERACTION
```

El objeto 3D debe comenzar en una posición visual dominante.

Al cargar:

```text
opacity: 0 → 1
scale: 0.85 → 1
rotation: ligera
```

La entrada debe ser elegante.

No utilizar:

* explosiones
* bouncing excesivo
* rotaciones frenéticas
* efectos RGB exagerados
* partículas innecesarias

---

# 9. HERO — SCROLL STORYTELLING

Utilizar:

**GSAP + ScrollTrigger**

para transformar el scroll en una línea narrativa.

El usuario debe sentir que está avanzando dentro del producto.

### Estado 01 — INPUT

Mostrar visualmente:

```text
URL VIRAL

https://tiktok.com/...
```

El objeto 3D permanece estable.

---

### Estado 02 — ANALYSIS

Al avanzar:

```text
Analizando patrones virales...
```

El objeto 3D:

* aumenta ligeramente su actividad.
* rota lentamente.
* puede cambiar sutilmente su iluminación.
* puede activar una animación de partículas/nodos.

La UI muestra:

```text
HOOK
RETENTION
STRUCTURE
ANGLE
CTA
```

---

### Estado 03 — INSIGHT

El objeto 3D alcanza su punto de máxima interacción.

Mostrar:

```text
Contenido analizado ✓
```

Los elementos analizados aparecen progresivamente.

---

### Estado 04 — OUTPUT

Transformar visualmente el análisis en contenido:

```text
🔥 HOOK VIRAL

🎬 ESTRUCTURA

🎯 ÁNGULO

📣 CTA
```

El objeto 3D reduce su protagonismo.

La UI comienza a dominar la escena.

---

### Estado 05 — RESULT

Mostrar:

```text
✓ Contenido listo
```

El usuario debe entender:

```text
URL
 ↓
AI
 ↓
PATTERNS
 ↓
CONTENT
```

---

# 10. ANIMACIÓN 3D → UI

Implementar una transición inspirada técnicamente en experiencias 3D premium.

Cuando corresponda:

```text
3D OBJECT
    ↓
3D POSITION
    ↓
CAMERA PROJECTION
    ↓
SCREEN COORDINATES
    ↓
DOM ELEMENT
```

Esto permitirá que un elemento de la escena 3D pueda desplazarse visualmente hacia:

* CTA
* resultado
* card
* botón
* indicador
* carrito/demo

No utilizar hacks frágiles.

Utilizar matemáticas de proyección de Three.js para obtener coordenadas de pantalla cuando sea necesario.

---

# 11. GSAP + SCROLLTRIGGER

GSAP será el motor principal de motion complejo.

Utilizar GSAP para:

* timeline.
* transforms.
* opacity.
* scale.
* rotation.
* stagger.
* secuencias.
* transición entre estados.

Utilizar ScrollTrigger para:

* entrada de secciones.
* pinning únicamente cuando sea necesario.
* progreso de animaciones.
* sincronización del 3D con scroll.
* storytelling.

Ejemplo conceptual:

```text
Scroll progress
      ↓
GSAP timeline
      ↓
Hero state
      ↓
3D rotation
      ↓
UI transition
      ↓
Content reveal
```

No crear múltiples sistemas de animación que compitan entre sí.

---

# 12. WEBGL + GLSL

WebGL será utilizado para aprovechar la GPU.

GLSL se utilizará únicamente cuando un efecto realmente requiera procesamiento gráfico personalizado.

Posibles usos:

* shader de energía.
* distorsión.
* noise.
* glow.
* partículas.
* deformación sutil.
* generación procedural.
* transición visual.

No crear shaders innecesariamente complejos.

El shader debe tener un propósito visual concreto.

---

# 13. TEXTURAS PROCEDURALES + CANVAS

Cuando sea posible, generar elementos visuales mediante código en lugar de utilizar assets pesados.

Canvas puede utilizarse para:

* texturas.
* patrones.
* ruido.
* máscaras.
* elementos generativos.

Ventaja:

```text
Menos assets
↓
Menor transferencia
↓
Mayor flexibilidad
↓
Personalización en tiempo real
```

Pero evaluar siempre el coste de CPU/GPU.

No reemplazar una imagen simple y ligera por un algoritmo procedural innecesariamente costoso.

---

# 14. WEB AUDIO API

Utilizar Web Audio API únicamente para feedback sonoro cuando realmente mejore la experiencia.

Ejemplos:

* click del CTA.
* confirmación de análisis.
* finalización de generación.
* transición importante.

Los sonidos deben ser:

* cortos
* discretos
* premium
* opcionales

No reproducir audio automáticamente sin interacción del usuario.

Respetar preferencias del navegador y accesibilidad.

---

# 15. HERO — DEMO INTERACTIVA

Crear dentro del Hero una demostración del producto.

Flujo:

```text
1. URL / IDEA
       ↓
2. ANALYZING
       ↓
3. PATTERNS DETECTED
       ↓
4. AI OUTPUT
       ↓
5. READY
```

### Estado Input

```text
URL viral

https://tiktok.com/...
```

Simular typing únicamente si mejora la demostración.

### Estado Analysis

```text
Analizando patrones virales...
```

Mostrar progreso visual.

### Estado Output

```text
🔥 HOOK
🎯 ANGLE
🎬 STRUCTURE
📣 CTA
```

### Estado Final

```text
✓ Contenido listo
```

La demo debe ejecutarse automáticamente en loop.

Debe ser rápida.

No debe parecer una animación decorativa.

Debe explicar el producto.

---

# 16. ELEMENTOS FLOTANTES

Mantener elementos como:

```text
1.2M views
87K likes
Creado con IA
```

SOLO si son datos reales o claramente presentados como contenido demostrativo.

Utilizar:

* translateY
* opacity
* scale
* glow ligero

Movimiento:

```text
4–6 segundos
```

Cada elemento puede tener una fase ligeramente diferente.

Nunca interferir con el headline.

---

# 17. NAVBAR

Mantener:

* Logo.
* Características.
* Cómo funciona.
* Resultados.
* Precios.
* FAQ.
* Iniciar sesión.
* CTA.

CTA:

```text
Probar gratis
```

Navbar sticky.

Al hacer scroll:

```text
background → más opaco
backdrop-filter → blur
border-bottom → sutil
```

La transición debe ser gradual.

---

# 18. FEATURES

Mantener:

* Hooks Virales.
* Guiones UGC.
* Ideas de Video.
* CTAs Optimizados.
* Estructura de Video.
* Múltiples Estilos.

Utilizar copy específico.

### Hooks Virales

```text
Hooks que capturan atención en los primeros 3 segundos.

Genera múltiples variantes según nicho, audiencia, formato y objetivo.
```

### Guiones UGC

```text
Guiones UGC listos para grabar.

Hook → problema → historia → producto → CTA.
```

### Ideas de Video

```text
Convierte una idea en conceptos concretos de contenido.

Obtén formato, ángulo, estructura y dirección de grabación.
```

### CTAs

```text
CTAs diseñados según el objetivo de conversión.
```

### Estructura

```text
Construye videos con una estructura clara de principio a fin.
```

### Múltiples estilos

```text
Adapta una misma idea a UGC, storytelling, educativo, venta directa y tendencias.
```

---

# 19. FEATURE PRINCIPAL

Crear una sección protagonista:

```text
Analiza cualquier contenido viral
```

Headline:

```text
Deja de copiar videos.
Entiende qué los hizo funcionar.
```

Visual:

```text
TIKTOK / REEL
      ↓
     AI
      ↓
HOOK
RETENTION
STRUCTURE
ANGLE
CTA
      ↓
TU CONTENIDO
```

Utilizar una combinación de:

* UI 2D
* líneas animadas
* microanimaciones
* elementos 3D sutiles

Esta sección debe explicar el principal diferencial del producto.

---

# 20. CÓMO FUNCIONA

Tres pasos.

### 01 — ANALIZA

```text
Pega una URL viral o introduce una idea que quieras estudiar.
```

### 02 — ENCUENTRA EL PATRÓN

```text
ViralFlow identifica hooks, ángulos, estructura y CTAs que hacen funcionar el contenido.
```

### 03 — GENERA CONTENIDO

```text
Obtén hooks, guiones y variantes adaptadas a tu marca.
```

Visual:

```text
URL
 ↓
AI
 ↓
PATTERNS
 ↓
SCRIPT
 ↓
CTA
```

---

# 21. WORKFLOW ANIMADO

Crear una línea visual conectando:

```text
01 → 02 → 03
```

Con ScrollTrigger:

```text
Paso 01 aparece
      ↓
conexión se ilumina
      ↓
Paso 02 aparece
      ↓
conexión se ilumina
      ↓
Paso 03 aparece
```

Duración aproximada:

```text
1.2–1.8 segundos
```

Nunca bloquear el scroll.

---

# 22. PRODUCT DEMO

Crear una sección:

```text
Mira lo que ViralFlow puede hacer
```

Simular una aplicación SaaS real.

### Panel izquierdo

```text
URL viral

[ https://tiktok.com/... ]

[ Analizar contenido ]
```

### Panel derecho

```text
🔥 HOOK

🎯 ÁNGULO

🎬 ESTRUCTURA

📣 CTA
```

Animar:

```text
typing
↓
loading
↓
analysis
↓
generation
↓
results
```

Esta debe ser una de las secciones visuales principales.

---

# 23. CASOS DE USO

Crear:

### CREADORES

```text
Genera ideas y guiones sin pasar horas buscando qué publicar.
```

### MARCAS

```text
Convierte productos en conceptos de contenido listos para probar.
```

### AGENCIAS

```text
Crea múltiples variantes para diferentes clientes y campañas.
```

### E-COMMERCE

```text
Genera hooks y CTAs orientados a conversión.
```

Cada card:

* icon
* título
* descripción
* visual
* hover

---

# 24. RESULTADOS

No utilizar métricas falsas.

Preferir métricas funcionales si son reales:

```text
< 2 min
Tiempo para generar contenido

10+
Variaciones por generación

500+
Fórmulas disponibles

3
Formatos de contenido
```

Utilizar count-up únicamente cuando el número represente información real.

---

# 25. TESTIMONIOS

No inventar testimonios.

No utilizar:

```text
Pasé de 0 a 50K seguidores
```

si no existe evidencia.

Si todavía no existen testimonios reales:

utilizar una sección orientada al problema o evidencia del producto.

---

# 26. PRICING

Mantener estructura clara.

Ejemplo:

```text
FREE
$0

CREATOR
$10 / mes

PRO
$69 / año
```

Solo utilizar estos precios si corresponden al producto real.

Mostrar:

* generaciones
* análisis de URLs
* hooks
* guiones
* estilos
* historial
* exportación

El usuario debe poder comparar rápidamente.

Plan recomendado:

* border gradient
* glow sutil
* badge "Más popular"
* scale máximo 1.01
* contraste ligeramente superior

No utilizar animación permanente agresiva.

---

# 27. FAQ

Accordion.

Preguntas:

```text
¿En qué se diferencia ViralFlow de usar ChatGPT?

¿Puedo analizar un TikTok que no es mío?

¿Qué plataformas soporta ViralFlow?

¿La IA adapta el contenido a mi marca?

¿Puedo editar los guiones generados?

¿Qué incluye cada generación?

¿Puedo cancelar cuando quiera?

¿Puedo utilizar el contenido comercialmente?
```

Animación:

```text
height
opacity
```

Chevron:

```text
0deg → 180deg
```

Duración:

```text
250–300ms
```

---

# 28. CTA FINAL

Headline:

```text
Tu próxima idea viral empieza aquí.
```

Subheadline:

```text
Analiza contenido, encuentra el patrón y genera tu próximo guion en minutos.
```

CTA:

```text
Crear mi primer contenido →
```

Mostrar únicamente beneficios reales:

```text
✓ Sin tarjeta
✓ Resultados en minutos
✓ Cancela cuando quieras
```

---

# 29. MOTION SYSTEM

Crear un sistema de animación coherente.

## Scroll Reveal

```text
opacity: 0 → 1
translateY: 24px → 0
duration: 500–700ms
```

Easing:

```text
cubic-bezier(.22,1,.36,1)
```

## Stagger

```text
card 1: 0ms
card 2: 80ms
card 3: 160ms
card 4: 240ms
```

Aplicar principalmente a:

* Features
* Workflow
* Casos de uso
* Resultados
* Pricing
* FAQ

No animar cada elemento de texto individualmente.

---

# 30. MICROINTERACCIONES

Todos los botones:

### Hover

```text
translateY(-1px)
```

### Active

```text
scale(0.98)
```

### Transition

```text
150–200ms
```

CTA:

```text
hover → glow ligeramente mayor
```

No utilizar:

* bounce
* shake
* flashing
* scaling excesivo
* animaciones permanentes agresivas

---

# 31. PERFORMANCE

La experiencia 3D debe ser premium pero eficiente.

Priorizar:

```text
GPU
↓
transform
↓
opacity
```

Evitar animar constantemente:

```text
width
height
top
left
```

cuando sea posible utilizar:

```text
transform
opacity
```

Optimizar:

* geometrías
* materiales
* shaders
* partículas
* DPR
* render loop
* imágenes
* fuentes
* JavaScript
* componentes Client
* lazy loading

No ejecutar cálculos pesados cada frame si pueden ejecutarse una sola vez.

Evitar re-renders innecesarios de React.

La escena 3D no debe causar una degradación perceptible del rendimiento de la landing.

---

# 32. RESPONSIVE 3D

Desktop:

```text
3D experience completa
```

Tablet:

```text
escena 3D simplificada
```

Mobile:

```text
experiencia 3D optimizada
```

Si el dispositivo tiene bajo rendimiento:

```text
reducir partículas
reducir DPR
simplificar shaders
reducir geometría
```

Nunca permitir overflow horizontal.

En mobile:

```text
Hero
↓
CTA
↓
Demo
↓
3D
```

La experiencia debe seguir siendo comprensible aunque la escena 3D se reduzca.

---

# 33. ACCESSIBILITY

Implementar:

* contraste adecuado
* focus states
* navegación por teclado
* aria-label cuando corresponda
* semantic HTML
* reduced motion
* controles accesibles

Si:

```css
prefers-reduced-motion: reduce
```

desactivar o simplificar:

* parallax
* rotaciones
* scroll animations
* partículas
* transiciones no esenciales

La información debe seguir siendo completamente comprensible sin animaciones.

---

# 34. COPYWRITING

Eliminar marketing vacío.

Evitar:

```text
La IA definitiva
El futuro del contenido
Revoluciona tus redes
Domina el algoritmo
La herramienta más poderosa
```

si no aportan información concreta.

Preferir:

```text
PROBLEMA
↓
MECANISMO
↓
RESULTADO
```

Ejemplo:

### Incorrecto

```text
IA poderosa para contenido viral.
```

### Correcto

```text
Pega una URL viral y descubre qué hook, estructura y CTA hicieron funcionar el contenido.
```

Cada sección debe responder una pregunta concreta del usuario.

---

# 35. CREDIBILIDAD

Nunca inventar:

* usuarios
* clientes
* testimonios
* views
* engagement
* estadísticas
* países
* resultados
* porcentajes

Si un dato no puede verificarse:

eliminarlo o convertirlo en una afirmación neutral.

La landing debe transmitir:

```text
PRODUCTO REAL
```

no:

```text
LANDING DE MARKETING SIN PRODUCTO
```

---

# 36. ARQUITECTURA DE COMPONENTES

Mantener una arquitectura modular.

Conceptualmente:

```text
app/
│
├── page.tsx
│
components/
│
├── navbar/
├── hero/
│   ├── Hero.tsx
│   ├── HeroScene.tsx
│   ├── HeroDemo.tsx
│   └── HeroAnimations.ts
│
├── features/
├── workflow/
├── product-demo/
├── use-cases/
├── results/
├── pricing/
├── faq/
├── final-cta/
└── footer/
```

Adaptar esta estructura a la arquitectura real existente.

No crear carpetas duplicadas si el proyecto ya posee una estructura equivalente.

---

# 37. RESPONSABILIDAD DE CADA TECNOLOGÍA

## Next.js

Framework principal.

Responsable de:

```text
Routing
Rendering
SEO
Performance
Application architecture
```

## React

Responsable de:

```text
Components
State
UI
Interactions
```

## TypeScript

Responsable de:

```text
Type safety
Contracts
Maintainability
Developer experience
```

## Tailwind CSS

Responsable de:

```text
Layout
Responsive
Spacing
Typography
UI styling
```

## Three.js

Responsable de:

```text
3D rendering
Scene
Camera
Geometry
Materials
Lighting
```

## React Three Fiber

Responsable de:

```text
React ↔ Three.js integration
```

## GSAP

Responsable de:

```text
Complex animation
Timeline
Transitions
Motion
```

## ScrollTrigger

Responsable de:

```text
Scroll-driven animation
Scene progression
Section synchronization
```

## WebGL

Responsable de:

```text
GPU rendering
```

## GLSL

Responsable de:

```text
Custom shaders
Visual effects
Procedural graphics
```

## Canvas

Responsable de:

```text
Procedural textures
Generated graphics
Visual calculations
```

## Web Audio API

Responsable de:

```text
Procedural sound effects
Interaction feedback
```

---

# 38. REGLA FUNDAMENTAL DE LAS ANIMACIONES

NO agregar animaciones porque simplemente "se ven bonitas".

Cada animación debe tener al menos una función:

```text
EXPLICAR
GUIAR
CONFIRMAR
DEMOSTRAR
JERARQUIZAR
CONECTAR
```

Ejemplo:

### Mala animación

Objeto 3D girando constantemente sin propósito.

### Buena animación

Objeto 3D cambia cuando ViralFlow está analizando una URL.

Esto comunica:

```text
INPUT
→
PROCESSING
```

La animación tiene significado.

---

# 39. JERARQUÍA DE IMPLEMENTACIÓN

Implementar en este orden:

### FASE 1

Analizar arquitectura actual.

### FASE 2

Hero + sistema 3D.

### FASE 3

Hero Demo.

### FASE 4

GSAP + ScrollTrigger.

### FASE 5

Features.

### FASE 6

Workflow.

### FASE 7

Product Demo.

### FASE 8

Use Cases.

### FASE 9

Pricing.

### FASE 10

FAQ.

### FASE 11

CTA.

### FASE 12

Motion system global.

### FASE 13

Responsive.

### FASE 14

Accessibility.

### FASE 15

Performance.

---

# 40. CRITERIOS DE ACEPTACIÓN

El trabajo estará terminado únicamente cuando:

### Producto

El visitante entiende:

```text
Qué es ViralFlow
↓
Qué analiza
↓
Qué genera
↓
Qué valor obtiene
```

### Diseño

La landing se siente:

```text
Premium
Moderna
AI-first
Profesional
Creíble
```

### Motion

Las animaciones:

```text
explican
guían
demuestran
```

y no solamente decoran.

### 3D

La escena:

```text
no es decorativa
```

sino parte de la explicación del producto.

### Performance

La experiencia:

```text
mantiene buena fluidez
```

sin bloquear el contenido.

### Responsive

Desktop, tablet y mobile funcionan correctamente.

### Accessibility

La landing continúa siendo usable con:

```text
keyboard
screen reader
reduced motion
```

### Código

Debe existir:

```text
reutilización
tipado
separación de responsabilidades
componentización
mantenibilidad
```

---

# 41. PRINCIPIO FINAL

No conviertas ViralFlow en una copia visual de Slam Dunk.

Utiliza Slam Dunk únicamente como referencia de **Creative Frontend Engineering**:

```text
3D
+
Scroll Storytelling
+
Motion
+
Procedural Graphics
+
2D/3D Interaction
```

y aplícalo al concepto de ViralFlow:

```text
CONTENT
     ↓
AI ANALYSIS
     ↓
VIRAL PATTERNS
     ↓
HOOK
     ↓
SCRIPT
     ↓
CTA
     ↓
CONTENT READY
```

La tecnología debe estar al servicio del producto.

El usuario nunca debe pensar:

> "Qué buena animación."

Debe pensar:

> "Ahora entiendo cómo funciona ViralFlow."

### RESULTADO FINAL

Construir una landing que combine:

**SaaS + AI + Product Demo + Creative 3D + Conversion UX**

sin perder:

**claridad + velocidad + credibilidad + usabilidad.**
