// STARFIELD PARALLAX CON MOUSE - ESTILO "THE LAST ECONOMY"
(function() {
    function initActiveNav() {
        const navLinks = Array.from(document.querySelectorAll('header nav a[href^="#"]'));
        if (!navLinks.length) return;

        const sectionByLink = navLinks
            .map((link) => {
                const sectionId = link.getAttribute('href');
                if (!sectionId) return null;
                const section = document.querySelector(sectionId);
                return section ? { link, section } : null;
            })
            .filter(Boolean);

        if (!sectionByLink.length) return;

        let activeLink = null;

        function setActiveLink(nextLink) {
            if (activeLink === nextLink) return;
            if (activeLink) activeLink.classList.remove('nav-link-active');
            activeLink = nextLink || null;
            if (activeLink) activeLink.classList.add('nav-link-active');
        }

        const observer = new IntersectionObserver((entries) => {
            const visibleEntries = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (!visibleEntries.length) {
                return;
            }

            const mostVisible = visibleEntries[0].target;
            const pair = sectionByLink.find((item) => item.section === mostVisible);
            setActiveLink(pair ? pair.link : null);
        }, {
            root: null,
            rootMargin: "-20% 0px -55% 0px",
            threshold: [0.15, 0.35, 0.6]
        });

        sectionByLink.forEach(({ section }) => observer.observe(section));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initActiveNav, { once: true });
        return;
    }

    initActiveNav();
})();

(function() {
    let canvas = null;
    let ctx = null;

    let width, height;
    let stars = [];
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    // Configuración del efecto parallax
    const PARALLAX_FACTOR = 0.15; // Aumentado de 0.05 para más movimiento
    const MOUSE_DAMPING = 0.1;
    let offsetX = 0;
    let offsetY = 0;
    let scrollOffsetY = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let targetScrollOffsetY = 0;

    class Star {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z; // Profundidad (0-1): 0 = lejos (pequeño), 1 = cerca (grande)
            this.originX = x;
            this.originY = y;
            this.glowing = false;
            this.glowIntensity = 0;
            this.glowDuration = 0;
            this.nextGlowTime = Math.random() * 8000; // Tiempo hasta el próximo brillo (0-8 segundos)
        }

        update(scrollX, scrollY) {
            // Efecto parallax basado en la profundidad
            const parallax = this.z * PARALLAX_FACTOR;
            this.x = this.originX + scrollX * parallax;
            this.y = this.originY + scrollY * parallax;
            
            // Actualizar efecto de brillo
            this.nextGlowTime -= 16; // ~60fps
            
            // Activar brillo aleatoriamente
            if (this.nextGlowTime <= 0 && !this.glowing && Math.random() < 0.05) {
                this.glowing = true;
                this.glowDuration = 1500 + Math.random() * 1500; // Duración aleatoria 1.5-3 segundos
                this.glowIntensity = 0;
            }
            
            // Animar intensidad de brillo
            if (this.glowing) {
                const maxDuration = 1500 + 1500;
                const progress = 1 - (this.glowDuration / maxDuration);
                // Curva de brillo: sube y baja
                this.glowIntensity = Math.sin(progress * Math.PI);
                
                this.glowDuration -= 16;
                if (this.glowDuration <= 0) {
                    this.glowing = false;
                    this.glowIntensity = 0;
                    this.nextGlowTime = 5000 + Math.random() * 8000; // Espera antes del próximo brillo (5-13 segundos)
                }
            }
        }

        draw(ctx) {
            const radius = this.z * 3.5; // Aumentado de 2 para puntos más grandes
            let opacity = 0.3 + (this.z * 0.7); // Más opacas las estrellas cercanas
            
            // Aumentar opacidad si está brillando
            if (this.glowing) {
                opacity = Math.min(1, opacity + (this.glowIntensity * 0.7));
            }

            // Color verde claro con variación de tonos según profundidad
            const greenValue = Math.round(229 - (this.z * 50)); // Más oscuro cuanto más lejos
            const color = `rgb(127, ${greenValue}, 184)`; // Verde claro variado

            ctx.globalAlpha = opacity;
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Dibujar halo si está brillando
            if (this.glowing && this.glowIntensity > 0.3) {
                ctx.globalAlpha = opacity * this.glowIntensity * 0.5;
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, radius + (this.glowIntensity * 5), 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }

    function init() {
        if (!canvas || !ctx) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        
        stars = [];
        // Crear estrellas con diferentes profundidades
        const starCount = 80;
        for (let i = 0; i < starCount; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const z = Math.random(); // Profundidad aleatoria
            stars.push(new Star(x, y, z));
        }
        console.log('Starfield inicializado con ' + starCount + ' estrellas');
    }

    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        
        // Suavizar el movimiento del parallax
        offsetX += (targetOffsetX - offsetX) * MOUSE_DAMPING;
        offsetY += (targetOffsetY - offsetY) * MOUSE_DAMPING;
        scrollOffsetY += (targetScrollOffsetY - scrollOffsetY) * MOUSE_DAMPING;

        // Actualizar y dibujar estrellas
        stars.forEach(star => {
            star.update(offsetX, offsetY + scrollOffsetY);
            
            // Wrapping: las estrellas se repiten si salen del canvas
            if (star.x < 0) star.x += width;
            if (star.x > width) star.x -= width;
            if (star.y < 0) star.y += height;
            if (star.y > height) star.y -= height;
            
            star.draw(ctx);
        });

        requestAnimationFrame(animate);
    }
    // Event listeners para el movimiento del ratón
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Convertir posición del mouse a offset de parallax
        const centerX = width / 2;
        const centerY = height / 2;
        targetOffsetX = (mouseX - centerX) * 0.5;
        targetOffsetY = (mouseY - centerY) * 0.5;
    });

    window.addEventListener('scroll', () => {
        scrollY = window.scrollY || window.pageYOffset || 0;
        targetScrollOffsetY = -scrollY * 0.15;
    });

    function startStarfield() {
        canvas = document.getElementById('bgCanvas');
        if (!canvas) {
            console.error('Canvas no encontrado');
            return;
        }

        ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('No se pudo obtener contexto 2D del canvas');
            return;
        }

        window.addEventListener('resize', init);
        scrollY = window.scrollY || window.pageYOffset || 0;
        targetScrollOffsetY = -scrollY * 0.15;
        scrollOffsetY = targetScrollOffsetY;
        init();
        animate();
    }

    // Iniciar cuando el documento esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startStarfield, { once: true });
    } else {
        startStarfield();
    }
})();

// Manejo del formulari de contacte
(function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const messageInput = document.getElementById('contact-message');
    const feedbackEl = document.getElementById('contact-feedback');

    function setFeedback(message, type) {
        if (!feedbackEl) return;
        feedbackEl.textContent = message;
        feedbackEl.style.color = type === 'error' ? '#e74c3c' : '#2ecc71';
    }

    function tr(key, fallback) {
        if (typeof window.t === 'function') return window.t(key, fallback);
        return fallback;
    }

    function openMailto(url) {
        const link = document.createElement('a');
        link.href = url;
        link.rel = 'noopener';
        document.body.appendChild(link);
        link.click();
        link.remove();
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = nameInput ? nameInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (!name || !message) {
            setFeedback(tr('msg-contact-error-required', 'Please fill in your name and message.'), 'error');
            return;
        }

        const subject = tr('contact-mailto-subject', 'Request - Bosc de Dades');
        const intro = tr('contact-mailto-intro', 'Hello,');
        const fromLabel = tr('contact-mailto-from-label', 'Name:');
        const body = [intro, '', message, '', '---', `${fromLabel} ${name}`].join('\n');
        const mailtoUrl = `mailto:boscdedades@tecnocampus.cat?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        openMailto(mailtoUrl);
        setFeedback(tr('msg-contact-mailto-opened', "Your email client has opened. Review the message and send it."), 'success');
        form.reset();
    });
})();

// SESSIONS CAROUSEL
(function () {
    function initSessionsCarousel() {
        const track = document.getElementById('sessions-track');
        const wrapper = document.querySelector('.sessions-scroll-wrapper');
        const prevBtn = document.getElementById('sessions-prev');
        const nextBtn = document.getElementById('sessions-next');
        const dotsContainer = document.getElementById('sessions-dots');
        if (!track || !wrapper) return;

        const cards = Array.from(track.children);
        if (!cards.length) return;

        const initialIndex = Math.min(4, cards.length - 1);
        let currentIndex = initialIndex;
        let startX = 0;
        let isDragging = false;
        let dragDelta = 0;

        // Build dots
        cards.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'sessions-dot' + (i === initialIndex ? ' is-active' : '');
            dot.setAttribute('aria-label', 'Sessió ' + (i + 1));
            dot.addEventListener('click', () => goTo(i));
            dotsContainer && dotsContainer.appendChild(dot);
        });

        function getCardWidth() {
            return cards[0] ? cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || '24') : 300;
        }

        function updateDots() {
            const dots = dotsContainer ? dotsContainer.querySelectorAll('.sessions-dot') : [];
            dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIndex));
        }

        function updateArrows() {
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex >= cards.length - 1;
        }

        function goTo(index) {
            currentIndex = Math.max(0, Math.min(index, cards.length - 1));
            const step = getCardWidth();
            const cardWidth = cards[currentIndex] ? cards[currentIndex].offsetWidth : step;
            const wrapperWidth = wrapper.clientWidth || 0;
            const cardStart = currentIndex * step;
            const offset = cardStart - ((wrapperWidth - cardWidth) / 2);
            track.style.transform = 'translateX(-' + offset + 'px)';
            updateDots();
            updateArrows();
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

        // Drag / swipe
        wrapper.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            dragDelta = 0;
        });
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            dragDelta = e.clientX - startX;
        });
        window.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            if (dragDelta < -50) goTo(currentIndex + 1);
            else if (dragDelta > 50) goTo(currentIndex - 1);
        });

        wrapper.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
        wrapper.addEventListener('touchend', (e) => {
            const delta = e.changedTouches[0].clientX - startX;
            if (delta < -40) goTo(currentIndex + 1);
            else if (delta > 40) goTo(currentIndex - 1);
        });

        goTo(initialIndex);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSessionsCarousel, { once: true });
    } else {
        initSessionsCarousel();
    }
})();