(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(o){if(o.ep)return;o.ep=!0;const t=s(o);fetch(o.href,t)}})();emailjs.init("Ak2VMRgCVLCpSiZTF");class d{static showSuccess(e){this.showToast(e,"success")}static showError(e){this.showToast(e,"error")}static showToast(e,s){const i=document.createElement("div");i.className=`toast toast-${s}`,i.innerHTML=`
      <div class="toast-content">
        <i class="fas fa-${s==="success"?"check-circle":"exclamation-circle"}"></i>
        <span>${e}</span>
      </div>
    `,document.body.appendChild(i),setTimeout(()=>i.classList.add("show"),100),setTimeout(()=>{i.classList.remove("show"),setTimeout(()=>document.body.removeChild(i),300)},4e3)}}class c{static validateEmail(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}static validateName(e){return e.trim().length>=2}static validateMessage(e){return e.trim().length>=10}static validateForm(e){const s=[];return this.validateName(e.name)||s.push("El nombre debe tener al menos 2 caracteres"),this.validateEmail(e.email)||s.push("Por favor ingresa un email válido"),this.validateMessage(e.message)||s.push("El mensaje debe tener al menos 10 caracteres"),s}}class u{constructor(){this.isModalOpen=!1,this.csrfToken=null,this.init()}init(){this.createModal(),this.bindEvents(),this.getCSRFToken()}createModal(){document.body.insertAdjacentHTML("beforeend",`
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
    `)}async getCSRFToken(){try{this.csrfToken="dev-token-"+Math.random().toString(36).substr(2,9),console.log("Token CSRF generado para desarrollo:",this.csrfToken)}catch(e){console.warn("Error al obtener token CSRF:",e)}}bindEvents(){console.log("ContactForm: Inicializando eventos..."),document.addEventListener("click",e=>{console.log("Click detectado:",e.target),e.target.closest('a[href^="mailto:"]')&&e.target.closest("a").classList.contains("contact-link")&&(console.log("Enlace de email detectado, abriendo modal..."),e.preventDefault(),this.openModal())}),document.getElementById("close-modal").addEventListener("click",()=>this.closeModal()),document.getElementById("cancel-form").addEventListener("click",()=>this.closeModal()),document.querySelector(".modal-overlay").addEventListener("click",()=>this.closeModal()),document.getElementById("contact-form").addEventListener("submit",e=>{e.preventDefault(),this.handleSubmit()}),this.addRealTimeValidation()}addRealTimeValidation(){document.querySelectorAll("#contact-form input, #contact-form textarea").forEach(s=>{s.addEventListener("blur",()=>this.validateField(s)),s.addEventListener("input",()=>this.clearFieldError(s))})}validateField(e){const s=e.value.trim(),i=e.name,o=document.getElementById(`${i}-error`);let t=!0,n="";switch(i){case"name":t=c.validateName(s),n=t?"":"El nombre debe tener al menos 2 caracteres";break;case"email":t=c.validateEmail(s),n=t?"":"Por favor ingresa un email válido";break;case"message":t=c.validateMessage(s),n=t?"":"El mensaje debe tener al menos 10 caracteres";break}return t?(e.classList.remove("error"),o&&(o.textContent="")):(e.classList.add("error"),o&&(o.textContent=n)),t}clearFieldError(e){e.classList.remove("error");const s=document.getElementById(`${e.name}-error`);s&&(s.textContent="")}openModal(){console.log("ContactForm: Abriendo modal...");const e=document.getElementById("contact-modal");if(!e){console.error("Modal no encontrado!");return}e.classList.add("show"),document.body.style.overflow="hidden",this.isModalOpen=!0,setTimeout(()=>{document.getElementById("name").focus()},300)}closeModal(){document.getElementById("contact-modal").classList.remove("show"),document.body.style.overflow="",this.isModalOpen=!1,this.resetForm()}resetForm(){document.getElementById("contact-form").reset(),document.querySelectorAll(".error-message").forEach(e=>{e.textContent=""}),document.querySelectorAll(".error").forEach(e=>{e.classList.remove("error")})}async handleSubmit(){const e=document.getElementById("contact-form"),s=new FormData(e),i={name:s.get("name"),email:s.get("email"),subject:s.get("subject")||"Mensaje desde Portfolio",message:s.get("message"),csrf_token:this.csrfToken},o=c.validateForm(i);if(o.length>0){o.forEach(r=>{d.showError(r)});return}const t=document.getElementById("submit-form"),n=t.innerHTML;t.innerHTML='<i class="fas fa-spinner fa-spin"></i> Enviando...',t.disabled=!0;try{const r={PUBLIC_KEY:"Ak2VMRgCVLCpSiZTF",SERVICE_ID:"service_go50l25",TEMPLATE_ID:"template_xxs3ewe",TO_EMAIL:"cmg7775@gmail.com"};console.log("Enviando email real con EmailJS..."),console.log("Datos del formulario:",i);const v=await emailjs.send(r.SERVICE_ID,r.TEMPLATE_ID,{from_name:i.name,from_email:i.email,subject:i.subject,message:i.message,to_email:r.TO_EMAIL});if(v.status===200)d.showSuccess("¡Mensaje enviado correctamente! Te responderé pronto."),this.closeModal(),console.log("Email enviado exitosamente:",v);else throw new Error("Error al enviar el mensaje")}catch(r){console.error("Error:",r),d.showError(r.message||"Hubo un error al enviar el mensaje. Por favor intenta nuevamente.")}finally{t.innerHTML=n,t.disabled=!1}}}const l={name:"Carolina Melián",title:"Desarrolladora Full Stack",description:"Desarrolladora Full Stack con más de 6 meses de práctica diaria, especializada en tecnologías modernas y metodologías ágiles.",skills:{frontend:[{name:"JavaScript",level:90},{name:"TypeScript",level:85},{name:"Angular",level:80},{name:"React",level:75},{name:"HTML5",level:95},{name:"CSS3",level:90}],libraries:[{name:"Cloudinary",level:70},{name:"Toastify",level:80},{name:"Vite",level:85},{name:"Node.js",level:70}],tools:[{name:"Figma",level:85},{name:"Trello",level:90},{name:"Git",level:80},{name:"Metodologías Ágiles",level:85}],backend:[{name:"SQL",level:75},{name:"PHP",level:80}],systems:[{name:"Administración de Sistemas",level:65}],learning:["Fullstack Development","Aplicaciones Multiplataforma","Python","Máquinas Virtuales","Servidores","Advanced TypeScript","Microservices"]},projects:[{name:"Proyecto Final Módulo 4",description:"Proyecto avanzado con integración de múltiples tecnologías y arquitectura moderna. Aplicación web completa con funcionalidades dinámicas y diseño responsivo.",tech:["HTML5","CSS3","JavaScript","Responsive Design"],github:"https://github.com/KarolCMG/proyecto-finalmod4",demo:null,featured:!0},{name:"Trabajo Final HTML/CSS",description:"Proyecto final enfocado en HTML y CSS con diseño moderno, animaciones y mejores prácticas de desarrollo frontend.",tech:["HTML5","CSS3","Animations","Responsive Design"],github:"https://github.com/KarolCMG/trabajo-final-html-css",demo:null,featured:!0},{name:"Final Project",description:"Proyecto final integrador que demuestra el dominio completo de tecnologías web modernas y metodologías de desarrollo.",tech:["HTML5","CSS3","JavaScript","Modern Web"],github:"https://github.com/KarolCMG/final-project",demo:null,featured:!0},{name:"Proyecto JavaScript CMG",description:"Proyecto especializado en JavaScript con funcionalidades avanzadas, manejo de datos y programación orientada a objetos.",tech:["JavaScript","ES6+","DOM Manipulation","Data Handling"],github:"https://github.com/KarolCMG/proyecto-javaScript-cmg",demo:null,featured:!0}],experience:{practice:"6+ meses",projects:"4 proyectos destacados"},contact:{github:"https://github.com/KarolCMG",email:"carolina.melian@email.com",linkedin:"https://www.linkedin.com/in/carolina-melian-40a7332a8"}};function g(){return`
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
              Hola, soy <span class="highlight">${l.name}</span>
            </h1>
            <h2 class="hero-subtitle">${l.title}</h2>
            <p class="hero-description">${l.description}</p>
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
                <span class="stat-number">${l.experience.practice}</span>
                <span class="stat-label">de práctica</span>
              </div>
              <div class="stat">
                <span class="stat-number">${l.experience.projects}</span>
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
              ${l.skills.frontend.map(a=>`
                <div class="skill-item">
                  <span class="skill-name">${a.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${a.level}%"></div>
                  </div>
                  <span class="skill-percentage">${a.level}%</span>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="skill-category">
            <h3><i class="fas fa-puzzle-piece"></i> Librerías & Frameworks</h3>
            <div class="skill-items">
              ${l.skills.libraries.map(a=>`
                <div class="skill-item">
                  <span class="skill-name">${a.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${a.level}%"></div>
                  </div>
                  <span class="skill-percentage">${a.level}%</span>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="skill-category">
            <h3><i class="fas fa-tools"></i> Herramientas & Metodologías</h3>
            <div class="skill-items">
              ${l.skills.tools.map(a=>`
                <div class="skill-item">
                  <span class="skill-name">${a.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${a.level}%"></div>
                  </div>
                  <span class="skill-percentage">${a.level}%</span>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="skill-category">
            <h3><i class="fas fa-server"></i> Backend & Bases de Datos</h3>
            <div class="skill-items">
              ${l.skills.backend.map(a=>`
                <div class="skill-item">
                  <span class="skill-name">${a.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${a.level}%"></div>
                  </div>
                  <span class="skill-percentage">${a.level}%</span>
                </div>
              `).join("")}
            </div>
          </div>

          <div class="skill-category">
            <h3><i class="fas fa-cloud"></i> Sistemas & Infraestructura</h3>
            <div class="skill-items">
              ${l.skills.systems.map(a=>`
                <div class="skill-item">
                  <span class="skill-name">${a.name}</span>
                  <div class="skill-bar">
                    <div class="skill-progress" style="width: ${a.level}%"></div>
                  </div>
                  <span class="skill-percentage">${a.level}%</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <div class="learning-section">
          <h3><i class="fas fa-graduation-cap"></i> Tecnologías en Curso</h3>
          <div class="learning-tags">
            ${l.skills.learning.map(a=>`
              <span class="learning-tag">${a}</span>
            `).join("")}
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
            <i class="fas fa-star"></i> Proyectos Destacados
          </h3>
          <div class="projects-grid featured-grid">
            ${l.projects.map(a=>`
              <div class="project-card featured-card">
                <div class="project-badge">
                  <i class="fas fa-trophy"></i> Proyecto Final
                </div>
                <div class="project-header">
                  <h3 class="project-title">${a.name}</h3>
                  <div class="project-tech">
                    ${a.tech.map(e=>`<span class="tech-tag">${e}</span>`).join("")}
                  </div>
                </div>
                <p class="project-description">${a.description}</p>
                <div class="project-links">
                  <a href="${a.github}" target="_blank" class="project-link">
                    <i class="fab fa-github"></i> Ver Código
                  </a>
                  ${a.demo?`
                    <a href="${a.demo}" target="_blank" class="project-link">
                      <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                  `:""}
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="github-cta">
          <p>¿Quieres ver todos mis proyectos?</p>
          <a href="${l.contact.github}" target="_blank" class="btn btn-primary">
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
              <a href="${l.contact.github}" target="_blank" class="contact-link">
                <i class="fab fa-github"></i>
                <span>GitHub</span>
              </a>
              <a href="mailto:${l.contact.email}" class="contact-link">
                <i class="fas fa-envelope"></i>
                <span>Email</span>
              </a>
              <a href="${l.contact.linkedin}" class="contact-link">
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
  `}document.querySelector("#app").innerHTML=g();const m=document.querySelector(".hamburger"),p=document.querySelector(".nav-menu");m.addEventListener("click",()=>{m.classList.toggle("active"),p.classList.toggle("active")});document.querySelectorAll(".nav-link").forEach(a=>{a.addEventListener("click",e=>{e.preventDefault();const s=a.getAttribute("href"),i=document.querySelector(s);i&&i.scrollIntoView({behavior:"smooth",block:"start"}),m.classList.remove("active"),p.classList.remove("active")})});const h={threshold:.5,rootMargin:"0px 0px -100px 0px"},f=new IntersectionObserver(a=>{a.forEach(e=>{e.isIntersecting&&e.target.querySelectorAll(".skill-progress").forEach(i=>{i.style.transition="width 1.5s ease-in-out"})})},h);document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".skill-category").forEach(e=>{f.observe(e)}),setTimeout(()=>{new u},100)});
