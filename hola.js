/**
 * Altar Digital - Sistema de Animaciones Interactivas
 * Implementa velas, pétalos, parallax, luz ambiental y controles de accesibilidad
 */

class AltarDigital {
  constructor() {
    this.config = {
      particleIntensity: "alto", // alto, medio, bajo
      animationsEnabled: true,
      soundEnabled: false,
      mode: "noche", // noche, dia
    }

    this.candles = []
    this.petals = []
    this.canvas = null
    this.ctx = null
    this.animationFrame = null
    this.mouseX = 0
    this.mouseY = 0
    this.scrollY = 0

    this.init()
  }

  init() {
    this.createCanvas()
    this.createControls()
    this.initCandles()
    this.initParallax()
    this.initAmbientLight()
    this.initSectionTransitions()
    this.setupEventListeners()
    this.startAnimation()
    this.checkPerformance()
  }

  createCanvas() {
    // Crear canvas para partículas y efectos
    this.canvas = document.createElement("canvas")
    this.canvas.id = "altar-canvas"
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `
    document.body.insertBefore(this.canvas, document.body.firstChild)
    this.ctx = this.canvas.getContext("2d")
    this.resizeCanvas()
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  createControls() {
    const controlPanel = document.createElement("div")
    controlPanel.id = "altar-controls"
    controlPanel.setAttribute("role", "region")
    controlPanel.setAttribute("aria-label", "Controles de animación del altar")
    controlPanel.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      padding: 15px;
      border-radius: 10px;
      z-index: 1000;
      color: #ff9800;
      font-family: Arial, sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(255, 152, 0, 0.3);
    `

    controlPanel.innerHTML = `
      <h3 style="margin: 0 0 10px 0; font-size: 16px;">Controles</h3>
      
      <label style="display: block; margin-bottom: 8px;">
        <input type="checkbox" id="toggle-animations" checked aria-label="Activar o desactivar animaciones">
        Animaciones
      </label>
      
      <label style="display: block; margin-bottom: 8px;">
        <input type="checkbox" id="toggle-sound" aria-label="Activar o desactivar sonido">
        Sonido
      </label>
      
      <label style="display: block; margin-bottom: 8px;">
        Intensidad:
        <select id="particle-intensity" aria-label="Seleccionar intensidad de partículas" style="margin-left: 5px; background: #333; color: #ff9800; border: 1px solid #ff9800; padding: 2px;">
          <option value="alto">Alta</option>
          <option value="medio">Media</option>
          <option value="bajo">Baja</option>
        </select>
      </label>
      
      <label style="display: block; margin-bottom: 8px;">
        <input type="checkbox" id="toggle-mode" aria-label="Cambiar entre modo día y noche">
        Modo Día
      </label>
      
      <button id="capture-altar" style="
        width: 100%;
        padding: 8px;
        margin-top: 10px;
        background: #ff9800;
        color: #000;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
      " aria-label="Capturar imagen del altar">
        📸 Capturar
      </button>
    `

    document.body.appendChild(controlPanel)
    this.bindControls()
  }

  bindControls() {
    document.getElementById("toggle-animations").addEventListener("change", (e) => {
      this.config.animationsEnabled = e.target.checked
      if (!e.target.checked) {
        this.stopAnimation()
      } else {
        this.startAnimation()
      }
    })

    document.getElementById("toggle-sound").addEventListener("change", (e) => {
      this.config.soundEnabled = e.target.checked
    })

    document.getElementById("particle-intensity").addEventListener("change", (e) => {
      this.config.particleIntensity = e.target.value
      this.adjustParticleCount()
    })

    document.getElementById("toggle-mode").addEventListener("change", (e) => {
      this.config.mode = e.target.checked ? "dia" : "noche"
      this.toggleDayNightMode()
    })

    document.getElementById("capture-altar").addEventListener("click", () => {
      this.captureAltar()
    })
  }

  initCandles() {
    // Crear velas virtuales en posiciones estratégicas
    const candlePositions = [
      { x: 0.15, y: 0.3 },
      { x: 0.85, y: 0.3 },
      { x: 0.15, y: 0.7 },
      { x: 0.85, y: 0.7 },
      { x: 0.5, y: 0.5 },
    ]

    candlePositions.forEach((pos, index) => {
      const candle = {
        x: window.innerWidth * pos.x,
        y: window.innerHeight * pos.y,
        lit: true,
        flameSize: 20,
        flamePhase: Math.random() * Math.PI * 2,
        smokeParticles: [],
        element: this.createCandleElement(pos, index),
      }
      this.candles.push(candle)
    })
  }

  createCandleElement(pos, index) {
    const candleDiv = document.createElement("div")
    candleDiv.className = "candle-interactive"
    candleDiv.setAttribute("role", "button")
    candleDiv.setAttribute("aria-label", `Vela ${index + 1}, click para encender o apagar`)
    candleDiv.setAttribute("tabindex", "0")
    candleDiv.style.cssText = `
      position: fixed;
      left: ${pos.x * 100}%;
      top: ${pos.y * 100}%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 60px;
      cursor: pointer;
      z-index: 10;
    `

    candleDiv.innerHTML = `
      <div class="candle-body" style="
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #f5e6d3 0%, #d4a574 100%);
        border-radius: 5px 5px 0 0;
        position: relative;
      ">
        <div class="flame" style="
          position: absolute;
          top: -25px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 30px;
          background: radial-gradient(ellipse at center, #fff 0%, #ffeb3b 20%, #ff9800 60%, transparent 100%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          filter: blur(2px);
          animation: flicker 0.3s infinite alternate;
        "></div>
      </div>
    `

    // Agregar estilos de animación
    if (!document.getElementById("candle-styles")) {
      const style = document.createElement("style")
      style.id = "candle-styles"
      style.textContent = `
        @keyframes flicker {
          0% { transform: translateX(-50%) scale(1) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) scale(1.05) translateY(-2px); opacity: 0.9; }
          100% { transform: translateX(-50%) scale(0.95) translateY(2px); opacity: 1; }
        }
      `
      document.head.appendChild(style)
    }

    candleDiv.addEventListener("click", () => this.toggleCandle(index))
    candleDiv.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        this.toggleCandle(index)
      }
    })

    document.body.appendChild(candleDiv)
    return candleDiv
  }

  toggleCandle(index) {
    const candle = this.candles[index]
    candle.lit = !candle.lit

    const flame = candle.element.querySelector(".flame")
    if (candle.lit) {
      flame.style.display = "block"
      if (this.config.soundEnabled) {
        this.playSound("light")
      }
    } else {
      flame.style.display = "none"
      if (this.config.soundEnabled) {
        this.playSound("extinguish")
      }
    }
  }

  playSound(type) {
    // Simulación de sonido (en producción usar Web Audio API o archivos de audio)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === "light") {
      oscillator.frequency.value = 800
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
    } else {
      oscillator.frequency.value = 200
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)
    }

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.2)
  }

  initParallax() {
    // Crear capas de parallax
    const layers = [
      { id: "stars", speed: 0.1, content: this.createStars() },
      { id: "papel-picado", speed: 0.3, content: this.createPapelPicado() },
    ]

    layers.forEach((layer) => {
      const layerDiv = document.createElement("div")
      layerDiv.id = `parallax-${layer.id}`
      layerDiv.className = "parallax-layer"
      layerDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: ${layer.id === "stars" ? 0 : 2};
      `
      layerDiv.innerHTML = layer.content
      layerDiv.dataset.speed = layer.speed
      document.body.insertBefore(layerDiv, document.body.firstChild)
    })
  }

  createStars() {
    let stars = ""
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const size = Math.random() * 2 + 1
      const opacity = Math.random() * 0.5 + 0.3
      stars += `<div style="
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        opacity: ${opacity};
        animation: twinkle ${Math.random() * 3 + 2}s infinite alternate;
      "></div>`
    }

    if (!document.getElementById("star-styles")) {
      const style = document.createElement("style")
      style.id = "star-styles"
      style.textContent = `
        @keyframes twinkle {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      `
      document.head.appendChild(style)
    }

    return stars
  }

  createPapelPicado() {
    let papel = ""
    const colors = ["#ff9800", "#9c27b0", "#e91e63", "#00bcd4", "#4caf50"]

    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 100
      const y = Math.random() * 100
      const color = colors[Math.floor(Math.random() * colors.length)]
      const rotation = Math.random() * 360

      papel += `<div style="
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: 40px;
        height: 30px;
        background: ${color};
        opacity: 0.7;
        transform: rotate(${rotation}deg);
        clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        animation: sway ${Math.random() * 3 + 2}s infinite alternate ease-in-out;
      "></div>`
    }

    if (!document.getElementById("papel-styles")) {
      const style = document.createElement("style")
      style.id = "papel-styles"
      style.textContent = `
        @keyframes sway {
          0% { transform: translateX(-10px) rotate(0deg); }
          100% { transform: translateX(10px) rotate(10deg); }
        }
      `
      document.head.appendChild(style)
    }

    return papel
  }

  initAmbientLight() {
    const lightOverlay = document.createElement("div")
    lightOverlay.id = "ambient-light"
    lightOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 3;
      background: radial-gradient(circle at 50% 50%, rgba(255, 152, 0, 0.1) 0%, transparent 70%);
      animation: pulse-light 4s infinite alternate ease-in-out;
    `

    if (!document.getElementById("light-styles")) {
      const style = document.createElement("style")
      style.id = "light-styles"
      style.textContent = `
        @keyframes pulse-light {
          0% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `
      document.head.appendChild(style)
    }

    document.body.appendChild(lightOverlay)
  }

  initSectionTransitions() {
    const articles = document.querySelectorAll("article")

    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = "fadeInUp 0.8s ease-out forwards"
        }
      })
    }, observerOptions)

    articles.forEach((article, index) => {
      article.style.opacity = "0"
      article.style.transform = "translateY(30px)"
      article.style.animationDelay = `${index * 0.1}s`
      observer.observe(article)
    })

    if (!document.getElementById("transition-styles")) {
      const style = document.createElement("style")
      style.id = "transition-styles"
      style.textContent = `
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
            filter: blur(5px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `
      document.head.appendChild(style)
    }
  }

  setupEventListeners() {
    window.addEventListener("resize", () => {
      this.resizeCanvas()
      this.updateCandlePositions()
    })

    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      this.updateParallax()
    })

    window.addEventListener("scroll", () => {
      this.scrollY = window.scrollY
      this.updateParallax()
    })

    // Touch support
    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        this.mouseX = e.touches[0].clientX
        this.mouseY = e.touches[0].clientY
        this.updateParallax()
      }
    })
  }

  updateCandlePositions() {
    const candlePositions = [
      { x: 0.15, y: 0.3 },
      { x: 0.85, y: 0.3 },
      { x: 0.15, y: 0.7 },
      { x: 0.85, y: 0.7 },
      { x: 0.5, y: 0.5 },
    ]

    this.candles.forEach((candle, index) => {
      candle.x = window.innerWidth * candlePositions[index].x
      candle.y = window.innerHeight * candlePositions[index].y
      candle.element.style.left = `${candlePositions[index].x * 100}%`
      candle.element.style.top = `${candlePositions[index].y * 100}%`
    })
  }

  updateParallax() {
    const layers = document.querySelectorAll(".parallax-layer")
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    layers.forEach((layer) => {
      const speed = Number.parseFloat(layer.dataset.speed)
      const moveX = (this.mouseX - centerX) * speed
      const moveY = (this.mouseY - centerY) * speed + this.scrollY * speed * 0.5
      layer.style.transform = `translate(${moveX}px, ${moveY}px)`
    })
  }

  startAnimation() {
    if (!this.config.animationsEnabled) return

    const animate = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

      this.updateCandles()
      this.updatePetals()
      this.drawCandles()
      this.drawPetals()

      this.animationFrame = requestAnimationFrame(animate)
    }

    animate()
  }

  stopAnimation() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
      this.animationFrame = null
    }
  }

  updateCandles() {
    this.candles.forEach((candle) => {
      if (!candle.lit) return

      // Actualizar fase de la llama
      candle.flamePhase += 0.1

      // Reacción al cursor
      const dx = this.mouseX - candle.x
      const dy = this.mouseY - candle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 200) {
        candle.flameSize = 20 + (200 - distance) / 20
      } else {
        candle.flameSize = 20
      }

      // Generar partículas de humo
      if (Math.random() < 0.1) {
        candle.smokeParticles.push({
          x: candle.x,
          y: candle.y - 30,
          vx: (Math.random() - 0.5) * 0.5,
          vy: -1 - Math.random(),
          size: Math.random() * 3 + 2,
          opacity: 0.3,
          life: 1,
        })
      }

      // Actualizar partículas de humo
      candle.smokeParticles = candle.smokeParticles.filter((particle) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.opacity *= 0.98
        particle.life -= 0.01
        particle.size += 0.1
        return particle.life > 0
      })
    })
  }

  updatePetals() {
    const maxPetals = this.getMaxPetals()

    // Generar nuevos pétalos
    if (this.petals.length < maxPetals && Math.random() < 0.1) {
      this.petals.push({
        x: Math.random() * this.canvas.width,
        y: -20,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2 + 1,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        size: Math.random() * 15 + 10,
        color: `hsl(${Math.random() * 30 + 30}, 100%, ${Math.random() * 20 + 50}%)`,
        opacity: Math.random() * 0.5 + 0.5,
      })
    }

    // Actualizar pétalos existentes
    this.petals = this.petals.filter((petal) => {
      petal.x += petal.vx + Math.sin(Date.now() / 1000 + petal.y) * 0.5
      petal.y += petal.vy
      petal.rotation += petal.rotationSpeed

      // Colisión con el suelo
      if (petal.y > this.canvas.height - 50) {
        petal.vy *= -0.3
        petal.y = this.canvas.height - 50
        petal.vx *= 0.8
      }

      return petal.y < this.canvas.height + 20 && petal.x > -50 && petal.x < this.canvas.width + 50
    })
  }

  drawCandles() {
    this.candles.forEach((candle) => {
      if (!candle.lit) return

      // Dibujar humo
      candle.smokeParticles.forEach((particle) => {
        this.ctx.beginPath()
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        this.ctx.fillStyle = `rgba(200, 200, 200, ${particle.opacity})`
        this.ctx.fill()
      })
    })
  }

  drawPetals() {
    this.petals.forEach((petal) => {
      this.ctx.save()
      this.ctx.translate(petal.x, petal.y)
      this.ctx.rotate((petal.rotation * Math.PI) / 180)

      // Dibujar pétalo (forma de hoja)
      this.ctx.beginPath()
      this.ctx.ellipse(0, 0, petal.size, petal.size * 1.5, 0, 0, Math.PI * 2)
      this.ctx.fillStyle = petal.color
      this.ctx.globalAlpha = petal.opacity
      this.ctx.fill()

      this.ctx.restore()
    })
  }

  getMaxPetals() {
    switch (this.config.particleIntensity) {
      case "alto":
        return 100
      case "medio":
        return 50
      case "bajo":
        return 25
      default:
        return 50
    }
  }

  adjustParticleCount() {
    const maxPetals = this.getMaxPetals()
    if (this.petals.length > maxPetals) {
      this.petals = this.petals.slice(0, maxPetals)
    }
  }

  toggleDayNightMode() {
    const body = document.body
    if (this.config.mode === "dia") {
      body.style.background = "linear-gradient(to bottom, #87CEEB 0%, #f0e68c 100%)"
      document.getElementById("ambient-light").style.background =
        "radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0.2) 0%, transparent 70%)"
    } else {
      body.style.background = "linear-gradient(to bottom, #0a0a0a 0%, #1a0a2e 100%)"
      document.getElementById("ambient-light").style.background =
        "radial-gradient(circle at 50% 50%, rgba(255, 152, 0, 0.1) 0%, transparent 70%)"
    }
  }

  captureAltar() {
    // Ocultar controles temporalmente
    const controls = document.getElementById("altar-controls")
    controls.style.display = "none"

    // Usar html2canvas o similar (aquí simulado)
    setTimeout(() => {
      alert("Captura simulada. En producción, usar html2canvas o similar para exportar a PNG/WebP")
      controls.style.display = "block"
    }, 100)
  }

  checkPerformance() {
    // Detectar dispositivos lentos y ajustar automáticamente
    let frameCount = 0
    let lastTime = performance.now()

    const checkFPS = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount
        frameCount = 0
        lastTime = currentTime

        // Si FPS < 30, reducir intensidad automáticamente
        if (fps < 30 && this.config.particleIntensity === "alto") {
          console.log("[v0] Rendimiento bajo detectado, reduciendo intensidad de partículas")
          this.config.particleIntensity = "medio"
          document.getElementById("particle-intensity").value = "medio"
          this.adjustParticleCount()
        }
      }

      if (this.config.animationsEnabled) {
        requestAnimationFrame(checkFPS)
      }
    }

    checkFPS()
  }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.altarDigital = new AltarDigital()
  })
} else {
  window.altarDigital = new AltarDigital()
}

// Exportar para uso externo
if (typeof module !== "undefined" && module.exports) {
  module.exports = AltarDigital
}
