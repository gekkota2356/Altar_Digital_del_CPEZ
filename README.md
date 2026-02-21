# Altar Digital - Documentación del Proyecto

## Estructura del Proyecto

\`\`\`
FRONTEND/
├── altar-digital.html    # Estructura HTML principal
├── altar-digital.css     # Estilos y animaciones CSS
└── altar-digital.js      # Lógica e interactividad JavaScript
\`\`\`

## Descripción General

Proyecto de **Ofrenda Digital** interactiva que rinde homenaje a los pioneros de la tecnología con animaciones dinámicas, efectos visuales y controles de accesibilidad.

---

## 📄 altar-digital.html

### Estructura Principal

\`\`\`html
<body>
  <header>           <!-- Título y descripción -->
  <main>
    <section id="altar-container">
      <div id="velas-container">    <!-- Velas interactivas -->
      <div id="petalos-container">  <!-- Pétalos cayendo -->
      <div id="parallax-bg">        <!-- Fondo parallax -->
      <div id="altar-content">      <!-- Tarjetas de pioneros -->
    </section>
  </main>
  <aside id="controles">  <!-- Panel de controles -->
  <footer>
</body>
\`\`\`

### Secciones Clave

- **Header**: Título "Ofrenda Digital" con subtítulo
- **Velas Container**: Contenedor para 5 velas interactivas
- **Pétalos Container**: Canvas para animación de pétalos
- **Parallax Background**: Capas de fondo con efecto parallax
- **Altar Content**: Tarjetas de 7 pioneros tecnológicos
- **Controles**: Panel con botones de accesibilidad

### Pioneros Incluidos

1. Steve Jobs (1955-2011)
2. Alan Turing (1912-1954)
3. Grace Hopper (1906-1992)
4. Dennis Ritchie (1941-2011)
5. Ada Lovelace (1815-1852)
6. John von Neumann (1903-1957)
7. Katherine Johnson (1918-2020)

---

##  altar-digital.css

### Organización del CSS

\`\`\`css
/* 1. Variables CSS */
:root {
  --color-primary: #FF6B35;      /* Naranja cálido */
  --color-secondary: #F7931E;    /* Dorado */
  --color-accent: #8B4789;       /* Morado */
  --color-dark: #1a1a2e;         /* Fondo oscuro */
}

/* 2. Reset y Base */
/* 3. Layout Principal */
/* 4. Componentes */
/* 5. Animaciones */
/* 6. Responsive */
\`\`\`

### Componentes Principales

#### Velas
- `.vela`: Contenedor de vela
- `.vela-cuerpo`: Cuerpo cilíndrico con gradiente
- `.vela-mecha`: Mecha negra
- `.vela-llama`: Llama animada con parpadeo
- `.vela-luz`: Halo de luz radial
- `.vela-humo`: Efecto de humo al apagar

#### Tarjetas de Pioneros
- `.pioneer-card`: Tarjeta con foto y descripción
- `.pioneer-photo`: Imagen circular con borde dorado
- `.pioneer-info`: Información textual
- Efectos hover con elevación y brillo

#### Pétalos
- Canvas con partículas generadas por JS
- Colores: naranjas, amarillos, rojos

### Animaciones CSS

\`\`\`css
@keyframes flicker {
  /* Parpadeo orgánico de llama */
}

@keyframes float {
  /* Flotación suave de elementos */
}

@keyframes fadeInUp {
  /* Entrada de tarjetas */
}

@keyframes glow-pulse {
  /* Pulso de luz ambiental */
}
\`\`\`

### Paleta de Colores

- **Primarios**: Naranjas (#FF6B35, #F7931E)
- **Acentos**: Morados (#8B4789, #6A4C93)
- **Neutros**: Grises oscuros (#1a1a2e, #16213e)
- **Dorados**: #FFD700, #FFA500

---

##  altar-digital.js

### Arquitectura del JavaScript

\`\`\`javascript
// 1. Configuración Global
const CONFIG = {
  petalos: { cantidad, velocidad, tamaño },
  velas: { cantidad, intensidadLuz },
  parallax: { capas, velocidad },
  rendimiento: { fps, particulas }
}

// 2. Clases Principales
class VelaInteractiva { ... }
class PetaloParticula { ... }
class ParallaxManager { ... }
class AltarController { ... }

// 3. Inicialización
document.addEventListener('DOMContentLoaded', init)
\`\`\`

### Módulos Funcionales

#### 1. Sistema de Velas
\`\`\`javascript
class VelaInteractiva {
  constructor(elemento)
  encender()
  apagar()
  animarLlama()
  generarHumo()
  actualizarLuz()
}
\`\`\`

**Características**:
- Click para encender/apagar individual
- Animación de llama con variación orgánica
- Efecto de humo al apagar
- Luz ambiental dinámica
- Sonido opcional (activable)

#### 2. Sistema de Pétalos
\`\`\`javascript
class PetaloParticula {
  constructor(x, y)
  actualizar()
  dibujar(ctx)
  aplicarFisica()
  detectarColision()
}
\`\`\`

**Características**:
- Generación continua desde arriba
- Física realista (gravedad, viento, rotación)
- Colisión con elementos del altar
- Optimización con object pooling
- Ajuste automático según rendimiento

#### 3. Sistema Parallax
\`\`\`javascript
class ParallaxManager {
  constructor()
  actualizarScroll()
  actualizarMouse()
  moverCapas()
}
\`\`\`

**Capas**:
1. Fondo estrellado (movimiento lento)
2. Papel picado medio (movimiento medio)
3. Elementos altar (movimiento rápido)

#### 4. Controlador Principal
\`\`\`javascript
class AltarController {
  init()
  setupEventListeners()
  animationLoop()
  optimizarRendimiento()
  guardarPreferencias()
}
\`\`\`

### Controles de Accesibilidad

\`\`\`javascript
// Panel de controles
- Pausar/Reanudar animaciones
- Intensidad (Alta/Media/Baja)
- Encender/Apagar todas las velas
- Modo Día/Noche
- Activar/Desactivar sonido
\`\`\`

### Optimización de Rendimiento

\`\`\`javascript
// Detección automática
if (fps < 30) {
  reducirParticulas()
  desactivarEfectosSecundarios()
}

// Lazy loading
IntersectionObserver para cargar elementos visibles

// RequestAnimationFrame
Animaciones sincronizadas con refresh del navegador
\`\`\`

### LocalStorage

\`\`\`javascript
// Preferencias guardadas
{
  velasEncendidas: [true, false, true, ...],
  intensidad: 'media',
  modoNoche: false,
  sonidoActivo: false,
  animacionesPausadas: false
}
\`\`\`

---

##  Uso e Integración

### Instalación Básica

1. Coloca los tres archivos en la carpeta `FRONTEND/`
2. Abre `altar-digital.html` en un navegador moderno
3. No requiere servidor, funciona en local

### Integración en MVC

\`\`\`html
<!-- En tu Layout.cshtml -->
<link rel="stylesheet" href="~/FRONTEND/altar-digital.css" />
<script src="~/FRONTEND/altar-digital.js" defer></script>

<!-- En tu Vista -->
@{
    ViewData["Title"] = "Ofrenda Digital";
}
<!-- Contenido del body de altar-digital.html -->
\`\`\`

### Personalización

#### Cambiar Pioneros
\`\`\`javascript
// En altar-digital.js
const pioneros = [
  {
    nombre: "Nuevo Pionero",
    años: "1900-2000",
    descripcion: "...",
    imagen: "ruta/imagen.jpg"
  }
]
\`\`\`

#### Ajustar Colores
\`\`\`css
/* En altar-digital.css */
:root {
  --color-primary: #TU_COLOR;
  --color-secondary: #TU_COLOR;
}
\`\`\`

#### Modificar Cantidad de Pétalos
\`\`\`javascript
// En altar-digital.js
const CONFIG = {
  petalos: {
    cantidad: 50  // Cambiar según necesidad
  }
}
\`\`\`

---

##  Características Técnicas

### Tecnologías Utilizadas
- HTML5 (Canvas API, Semantic HTML)
- CSS3 (Animations, Transforms, Grid/Flexbox)
- JavaScript ES6+ (Classes, Modules, Async)

### Compatibilidad
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Rendimiento
- 60 FPS en desktop
- 30 FPS en móviles
- Ajuste automático de partículas
- Tamaño total: ~150KB

### Accesibilidad
- ARIA labels completos
- Navegación por teclado
- Contraste WCAG AA
- Reducción de movimiento (prefers-reduced-motion)

---

##  Funcionalidades Implementadas

### Core
-  Velas interactivas con llama animada
-  Pétalos de cempasúchil con física
-  Efecto parallax multicapa
-  Luz ambiental dinámica
-  Transiciones suaves entre secciones
-  Responsive design

### Interactividad
-  Click en velas para encender/apagar
-  Sonido opcional al interactuar
-  Hover effects en tarjetas
-  Scroll reveal animations

### Accesibilidad
-  Pausar animaciones
-  Control de intensidad
-  Modo día/noche
-  Preferencias guardadas

### Extras Opcionales
- Audio-reactividad (parcial)
- Captura de pantalla
- Modo día/noche completo

---

##  Solución de Problemas

### Las animaciones van lentas
\`\`\`javascript
// Reducir partículas manualmente
CONFIG.petalos.cantidad = 20
CONFIG.rendimiento.particulas = 'bajo'
\`\`\`

### Las velas no se encienden
- Verificar que el JavaScript esté cargado
- Revisar consola del navegador
- Comprobar que los IDs coincidan

### Los pétalos no aparecen
- Verificar que el canvas tenga dimensiones
- Comprobar z-index del canvas
- Revisar que requestAnimationFrame esté funcionando

---

##  Notas de Desarrollo

### Próximas Mejoras
- [ ] Agregar más efectos de partículas
- [ ] Implementar audio-reactividad completa
- [ ] Añadir más modos de visualización
- [ ] Optimizar para dispositivos de gama baja

### Créditos
Proyecto creado para honrar a los pioneros de la tecnología que construyeron el mundo digital que habitamos.

---

##  Soporte

Para dudas o problemas:
1. Revisar la consola del navegador
2. Verificar compatibilidad del navegador
3. Comprobar que todos los archivos estén en la misma carpeta

---

**Versión**: 1.0.0  
**Última actualización**: 2025  
**Licencia**: MIT
