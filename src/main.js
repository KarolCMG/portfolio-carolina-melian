// Inicializar EmailJS - Configuración para producción
emailjs.init("Ak2VMRgCVLCpSiZTF")

// Sistema de notificaciones Toastify
class ToastManager {
  static showSuccess(message) {
    this.showToast(message, 'success')
  }

  static showError(message) {
    this.showToast(message, 'error')
  }

  static showToast(message, type) {
    // Crear elemento toast
    const toast = document.createElement('div')
    toast.className = `toast toast-${type}`
    toast.innerHTML = `
      <div class="toast-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
    `
    
    // Agregar al DOM
    document.body.appendChild(toast)
    
    // Animar entrada
    setTimeout(() => toast.classList.add('show'), 100)
    
    // Remover después de 4 segundos
    setTimeout(() => {
      toast.classList.remove('show')
      setTimeout(() => document.body.removeChild(toast), 300)
    }, 4000)
  }
}

// Validaciones del formulario
class FormValidator {
  static validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  static validateName(name) {
    return name.trim().length >= 2
  }

  static validateMessage(message) {
    return message.trim().length >= 10
  }

  static validateForm(formData) {
    const errors = []
    
    if (!this.validateName(formData.name)) {
      errors.push('El nombre debe tener al menos 2 caracteres')
    }
    
    if (!this.validateEmail(formData.email)) {
      errors.push('Por favor ingresa un email válido')
    }
    
    if (!this.validateMessage(formData.message)) {
      errors.push('El mensaje debe tener al menos 10 caracteres')
    }
    
    return errors
  }
}

// Manejo del formulario de contacto
class ContactForm {
  constructor() {
    this.isModalOpen = false
    this.csrfToken = null
    this.init()
  }

  init() {
    this.createModal()
    this.bindEvents()
    this.getCSRFToken()
  }

  createModal() {
    const modalHTML = `
      <div id="contact-modal" class="modal">
        <div class="modal-overlay"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h3><i class="fas fa-envelope"></i> Enviar Mensaje</h3>
            <button class="modal-close" id="close-modal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <form id="contact-form" class="contact-form">
            <div class="form-group">
              <label for="name">Nombre *</label>
              <input type="text" id="name" name="name" required>
              <span class="error-message" id="name-error"></span>
            </div>
            
            <div class="form-group">
              <label for="email">Email *</label>
              <input type="email" id="email" name="email" required>
              <span class="error-message" id="email-error"></span>
            </div>
            
            <div class="form-group">
              <label for="subject">Asunto</label>
              <input type="text" id="subject" name="subject" placeholder="¿En qué puedo ayudarte?">
            </div>
            
            <div class="form-group">
              <label for="message">Mensaje *</label>
              <textarea id="message" name="message" rows="5" required placeholder="Cuéntame sobre tu proyecto..."></textarea>
              <span class="error-message" id="message-error"></span>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" id="cancel-form">Cancelar</button>
              <button type="submit" class="btn btn-primary" id="submit-form">
                <i class="fas fa-paper-plane"></i> Enviar Mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    `
    
    document.body.insertAdjacentHTML('beforeend', modalHTML)
  }

  async getCSRFToken() {
    try {
      // Para desarrollo local, generar token directamente
      // En producción, usar endpoint PHP
      this.csrfToken = 'dev-token-' + Math.random().toString(36).substr(2, 9)
      console.log('Token CSRF generado para desarrollo:', this.csrfToken)
      
      // Código para producción (descomentar cuando tengas servidor PHP):
      /*
      const response = await fetch('/get_csrf_token.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        this.csrfToken = data.csrf_token
      } else {
        console.warn('No se pudo obtener el token CSRF')
      }
      */
    } catch (error) {
      console.warn('Error al obtener token CSRF:', error)
    }
  }

  bindEvents() {
    console.log('ContactForm: Inicializando eventos...')
    
    // Abrir modal
    document.addEventListener('click', (e) => {
      console.log('Click detectado:', e.target)
      // Verificar si es el enlace de email
      if (e.target.closest('a[href^="mailto:"]') && e.target.closest('a').classList.contains('contact-link')) {
        console.log('Enlace de email detectado, abriendo modal...')
        e.preventDefault()
        this.openModal()
      }
    })

    // Cerrar modal
    document.getElementById('close-modal').addEventListener('click', () => this.closeModal())
    document.getElementById('cancel-form').addEventListener('click', () => this.closeModal())
    document.querySelector('.modal-overlay').addEventListener('click', () => this.closeModal())

    // Enviar formulario
    document.getElementById('contact-form').addEventListener('submit', (e) => {
      e.preventDefault()
      this.handleSubmit()
    })

    // Validación en tiempo real
    this.addRealTimeValidation()
  }

  addRealTimeValidation() {
    const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea')
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input))
      input.addEventListener('input', () => this.clearFieldError(input))
    })
  }

  validateField(field) {
    const value = field.value.trim()
    const fieldName = field.name
    const errorElement = document.getElementById(`${fieldName}-error`)
    
    let isValid = true
    let errorMessage = ''

    switch (fieldName) {
      case 'name':
        isValid = FormValidator.validateName(value)
        errorMessage = isValid ? '' : 'El nombre debe tener al menos 2 caracteres'
        break
      case 'email':
        isValid = FormValidator.validateEmail(value)
        errorMessage = isValid ? '' : 'Por favor ingresa un email válido'
        break
      case 'message':
        isValid = FormValidator.validateMessage(value)
        errorMessage = isValid ? '' : 'El mensaje debe tener al menos 10 caracteres'
        break
    }

    if (!isValid) {
      field.classList.add('error')
      if (errorElement) {
        errorElement.textContent = errorMessage
      }
    } else {
      field.classList.remove('error')
      if (errorElement) {
        errorElement.textContent = ''
      }
    }

    return isValid
  }

  clearFieldError(field) {
    field.classList.remove('error')
    const errorElement = document.getElementById(`${field.name}-error`)
    if (errorElement) {
      errorElement.textContent = ''
    }
  }

  openModal() {
    console.log('ContactForm: Abriendo modal...')
    const modal = document.getElementById('contact-modal')
    if (!modal) {
      console.error('Modal no encontrado!')
      return
    }
    modal.classList.add('show')
    document.body.style.overflow = 'hidden'
    this.isModalOpen = true
    
    // Focus en el primer campo
    setTimeout(() => {
      document.getElementById('name').focus()
    }, 300)
  }

  closeModal() {
    const modal = document.getElementById('contact-modal')
    modal.classList.remove('show')
    document.body.style.overflow = ''
    this.isModalOpen = false
    
    // Limpiar formulario
    this.resetForm()
  }

  resetForm() {
    document.getElementById('contact-form').reset()
    document.querySelectorAll('.error-message').forEach(error => {
      error.textContent = ''
    })
    document.querySelectorAll('.error').forEach(field => {
      field.classList.remove('error')
    })
  }

  async handleSubmit() {
    const form = document.getElementById('contact-form')
    const formData = new FormData(form)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject') || 'Mensaje desde Portfolio',
      message: formData.get('message'),
      csrf_token: this.csrfToken
    }

    // Validar formulario
    const errors = FormValidator.validateForm(data)
    if (errors.length > 0) {
      errors.forEach(error => {
        ToastManager.showError(error)
      })
      return
    }

    // Mostrar loading
    const submitBtn = document.getElementById('submit-form')
    const originalText = submitBtn.innerHTML
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...'
    submitBtn.disabled = true

        try {
          // Configuración EmailJS - Reemplaza con tus claves reales
          const EMAILJS_CONFIG = {
            PUBLIC_KEY: 'Ak2VMRgCVLCpSiZTF', // Tu Public Key real
            SERVICE_ID: 'service_go50l25', // Tu Service ID real
            TEMPLATE_ID: 'template_xxs3ewe', // Tu Template ID real
            TO_EMAIL: 'cmg7775@gmail.com' // Tu email de destino
          }

          // EmailJS está configurado - usar envío real
          console.log('Enviando email real con EmailJS...')
          console.log('Datos del formulario:', data)
          
          // Enviar con EmailJS
          const result = await emailjs.send(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            {
              from_name: data.name,
              from_email: data.email,
              subject: data.subject,
              message: data.message,
              to_email: EMAILJS_CONFIG.TO_EMAIL
            }
          )

          if (result.status === 200) {
            ToastManager.showSuccess('¡Mensaje enviado correctamente! Te responderé pronto.')
            this.closeModal()
            console.log('Email enviado exitosamente:', result)
          } else {
            throw new Error('Error al enviar el mensaje')
          }
    } catch (error) {
      console.error('Error:', error)
      ToastManager.showError(error.message || 'Hubo un error al enviar el mensaje. Por favor intenta nuevamente.')
    } finally {
      // Restaurar botón
      submitBtn.innerHTML = originalText
      submitBtn.disabled = false
    }
  }
}

// Datos del portfolio - Actualizado con GitHub Pages
const portfolioData = {
  name: "Carolina Melián",
  title: "Desarrolladora Full Stack",
  subtitle: "Apasionada por crear experiencias digitales excepcionales",
  description: "Desarrolladora Full Stack con más de 6 meses de práctica diaria, especializada en tecnologías modernas y metodologías ágiles.",
  
  skills: {
    frontend: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Angular", level: 80 },
      { name: "React", level: 75 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 }
    ],
    libraries: [
      { name: "Cloudinary", level: 70 },
      { name: "Toastify", level: 80 },
      { name: "Vite", level: 85 },
      { name: "Node.js", level: 70 }
    ],
    tools: [
      { name: "Figma", level: 85 },
      { name: "Trello", level: 90 },
      { name: "Git", level: 80 },
      { name: "Metodologías Ágiles", level: 85 }
    ],
    backend: [
      { name: "SQL", level: 75 },
      { name: "PHP", level: 80 }
    ],
    systems: [
      { name: "Administración de Sistemas", level: 65 }
    ],
    learning: [
      "Fullstack Development",
      "Aplicaciones Multiplataforma",
      "Python",
      "Máquinas Virtuales",
      "Servidores",
      "Advanced TypeScript",
      "Microservices"
    ]
  },

  projects: [
    {
      name: "🌐 TAGAMA",
      description: "Plataforma web que conecta personas en Tenerife con experiencias creativas reales, cercanas y accesibles. Encuentra tu tribu y desarrolla nuevas habilidades en un entorno comunitario.",
      tech: ["HTML5", "CSS3", "JavaScript", "Vercel", "Responsive Design"],
      github: "https://github.com/KarolCMG/final-project",
      demo: "https://tagama.vercel.app/",
      featured: true,
      screenshot: "/project-screenshots-real/tagama-screenshot.png"
    },
    {
      name: "🔥 TechTrend Innovations",
      description: "Agencia creativa especializada en diseño web y desarrollo de marcas. Portfolio interactivo con animaciones fluidas, galería de proyectos y formulario de contacto integrado.",
      tech: ["HTML5", "CSS3", "CSS Animations", "Smooth Scrolling", "Contact Forms"],
      github: "https://github.com/KarolCMG/trabajo-final-html-css",
      demo: "https://techtrend-innovations.netlify.app/",
      featured: true,
      screenshot: "/project-screenshots-real/creative-portfolio-screenshot.png"
    },
    {
      name: "💼 LICATA ADVENTURES",
      description: "Aplicación de productividad personal con gestión inteligente de tareas, recordatorios automáticos y análisis de productividad. Diseñada para maximizar la eficiencia personal y profesional.",
      tech: ["JavaScript", "ES6+", "LocalStorage", "Drag & Drop", "Priority System"],
      github: "https://github.com/KarolCMG/proyecto-javaScript-cmg",
      demo: "https://licata-adventures.netlify.app/",
      featured: true,
      screenshot: "/project-screenshots-real/taskmaster-screenshot.png"
    }
  ],

  experience: {
    practice: "6+ meses",
    dailyCoding: "Práctica diaria de programación",
    projects: "3 proyectos destacados",
    learning: "Continuo aprendizaje de nuevas tecnologías"
  },

  contact: {
    github: "https://github.com/KarolCMG",
    email: "carolina.melian@email.com",
    linkedin: "https://www.linkedin.com/in/carolina-melian-40a7332a8"
  }
}

// Crear el HTML del portfolio
function createPortfolio() {
  return `
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <span class="logo-text">CM</span>
        </div>
        <ul class="nav-menu">
          <li><a href="#home" class="nav-link">Inicio</a></li>
          <li><a href="#about" class="nav-link">Sobre mí</a></li>
          <li><a href="#skills" class="nav-link">Habilidades</a></li>
          <li><a href="#projects" class="nav-link">Proyectos</a></li>
          <li><a href="#contact" class="nav-link">Contacto</a></li>
        </ul>
        <div class="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
      <div class="hero-container">
        <div class="hero-content">
          <div class="hero-text">
            <h1 class="hero-title">
              Hola, soy <span class="highlight">${portfolioData.name}</span>
            </h1>
            <h2 class="hero-subtitle">${portfolioData.title}</h2>
            <p class="hero-description">${portfolioData.description}</p>
            <div class="hero-buttons">
              <a href="#projects" class="btn btn-primary">Ver Proyectos</a>
              <a href="#contact" class="btn btn-secondary">Contactar</a>
            </div>
          </div>
          <div class="hero-image">
            <div class="developer-portrait">
              <img src="/carolina-avatar-animated.svg" alt="Carolina Melián programando" class="portrait-image">
              <div class="coding-badge">
                <i class="fas fa-code"></i>
                <span>Coding</span>
              </div>
            </div>
            <div class="floating-elements">
              <div class="floating-code">const</div>
              <div class="floating-code">function</div>
              <div class="floating-code">return</div>
              <div class="floating-code">export</div>
            </div>
          </div>
        </div>
        <div class="scroll-indicator">
          <div class="scroll-arrow"></div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
      <div class="container">
        <h2 class="section-title">Sobre mí</h2>
        <div class="about-content">
          <div class="about-text">
            <p>Soy una desarrolladora Full Stack apasionada por la tecnología y el aprendizaje continuo. Con más de <strong>6 meses de práctica diaria</strong>, he desarrollado una sólida base en tecnologías modernas.</p>
            <p>Mi enfoque se centra en crear experiencias de usuario excepcionales utilizando las mejores prácticas de desarrollo y metodologías ágiles. Actualmente estoy expandiendo mis conocimientos hacia el desarrollo fullstack y tecnologías relacionadas con aplicaciones multiplataforma con los sistemas Android e iOS.</p>
            <div class="stats">
              <div class="stat">
                <span class="stat-number">${portfolioData.experience.practice}</span>
                <span class="stat-label">de práctica</span>
              </div>
              <div class="stat">
                <span class="stat-number">${portfolioData.experience.projects}</span>
                <span class="stat-label">proyectos</span>
              </div>
              <div class="stat">
                <span class="stat-number">100%</span>
                <span class="stat-label">dedicación</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="skills">
      <div class="container">
        <h2 class="section-title">Habilidades</h2>
        
        <div class="skills-grid">
          <div class="skill-category">
            <h3><i class="fas fa-code"></i> Frontend</h3>
            <div class="skill-items">
              ${portfolioData.skills.frontend.map(skill => `
                <div class="skill-item">
                  <span class="skill-name">${skill.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                  </div>
                  <span class="skill-percentage">${skill.level}%</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="skill-category">
            <h3><i class="fas fa-puzzle-piece"></i> Librerías & Frameworks</h3>
            <div class="skill-items">
              ${portfolioData.skills.libraries.map(skill => `
                <div class="skill-item">
                  <span class="skill-name">${skill.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                  </div>
                  <span class="skill-percentage">${skill.level}%</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="skill-category">
            <h3><i class="fas fa-tools"></i> Herramientas & Metodologías</h3>
            <div class="skill-items">
              ${portfolioData.skills.tools.map(skill => `
                <div class="skill-item">
                  <span class="skill-name">${skill.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                  </div>
                  <span class="skill-percentage">${skill.level}%</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="skill-category">
            <h3><i class="fas fa-server"></i> Backend & Bases de Datos</h3>
            <div class="skill-items">
              ${portfolioData.skills.backend.map(skill => `
                <div class="skill-item">
                  <span class="skill-name">${skill.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                  </div>
                  <span class="skill-percentage">${skill.level}%</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="skill-category">
            <h3><i class="fas fa-cloud"></i> Sistemas & Infraestructura</h3>
            <div class="skill-items">
              ${portfolioData.skills.systems.map(skill => `
                <div class="skill-item">
                  <span class="skill-name">${skill.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${skill.level}%"></div>
                  </div>
                  <span class="skill-percentage">${skill.level}%</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="learning-section">
          <h3><i class="fas fa-graduation-cap"></i> Tecnologías en Curso</h3>
          <div class="learning-tags">
            ${portfolioData.skills.learning.map(tech => `
              <span class="learning-tag">${tech}</span>
            `).join('')}
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
      <div class="container">
        <h2 class="section-title">Proyectos</h2>
        
        <!-- Proyectos Destacados -->
        <div class="featured-projects">
          <h3 class="subsection-title">
            <i class="fas fa-star"></i> 🚀 MIS PROYECTOS DESPLEGADOS 🚀
          </h3>
          <div class="projects-grid featured-grid">
            ${portfolioData.projects.map(project => `
              <div class="project-card featured-card">
                <div class="project-info">
                  <h3 class="project-title">${project.name}</h3>
                  <p class="project-description">${project.description}</p>
                  <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                  </div>
                  <div class="project-links">
                    ${project.demo ? `
                      <a href="${project.demo}" target="_blank" class="project-link demo-link">
                        <i class="fas fa-external-link-alt"></i> Ver Demo
                      </a>
                    ` : `
                      <a href="${project.github}" target="_blank" class="project-link">
                        <i class="fab fa-github"></i> Ver Código
                      </a>
                    `}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="github-cta">
          <p>¿Quieres ver todos mis proyectos?</p>
          <a href="${portfolioData.contact.github}" target="_blank" class="btn btn-primary">
            <i class="fab fa-github"></i> Ver en GitHub
          </a>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
      <div class="container">
        <h2 class="section-title">Contacto</h2>
        <div class="contact-content">
          <div class="contact-info">
            <h3>¡Trabajemos juntos!</h3>
            <p>Estoy siempre abierta a nuevas oportunidades y proyectos emocionantes. No dudes en contactarme.</p>
            <div class="contact-links">
              <a href="${portfolioData.contact.github}" target="_blank" class="contact-link">
                <i class="fab fa-github"></i>
                <span>GitHub</span>
              </a>
              <a href="mailto:${portfolioData.contact.email}" class="contact-link">
                <i class="fas fa-envelope"></i>
                <span>Email</span>
              </a>
              <a href="${portfolioData.contact.linkedin}" class="contact-link">
                <i class="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
    </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 Carolina Melián. Desarrollado con ❤️ y mucho café.</p>
  </div>
    </footer>
  `
}

// Inicializar el portfolio cuando el DOM esté listo - FIXED
document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.querySelector('#app')
  if (appElement) {
    appElement.innerHTML = createPortfolio()
  } else {
    console.error('Elemento #app no encontrado')
  }

  // Funcionalidad del menú hamburguesa
  const hamburger = document.querySelector('.hamburger')
  const navMenu = document.querySelector('.nav-menu')

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active')
      navMenu.classList.toggle('active')
    })

    // Smooth scrolling para los enlaces del menú
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const targetId = link.getAttribute('href')
        const targetSection = document.querySelector(targetId)
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
        
        // Cerrar menú móvil
        hamburger.classList.remove('active')
        navMenu.classList.remove('active')
      })
    })
  }
})

// Animación de las barras de habilidades cuando son visibles
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
}

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skill-progress')
      skillBars.forEach(bar => {
        bar.style.transition = 'width 1.5s ease-in-out'
      })
    }
  })
}, observerOptions)

// Observar las secciones de habilidades
document.addEventListener('DOMContentLoaded', () => {
  const skillCategories = document.querySelectorAll('.skill-category')
  skillCategories.forEach(category => {
    skillObserver.observe(category)
  })
  
  // Inicializar sistema de contacto después de generar el HTML
  setTimeout(() => {
    new ContactForm()
  }, 100)
})
