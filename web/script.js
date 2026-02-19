// STARFIELD PARALLAX CON MOUSE - ESTILO "THE LAST ECONOMY"
(function() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) {
        console.error('Canvas no encontrado');
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('No se pudo obtener contexto 2D del canvas');
        return;
    }

    let width, height;
    let stars = [];
    let mouseX = 0;
    let mouseY = 0;

    // Configuración del efecto parallax
    const PARALLAX_FACTOR = 0.15; // Aumentado de 0.05 para más movimiento
    const MOUSE_DAMPING = 0.1;
    let offsetX = 0;
    let offsetY = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;

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
        ctx.clearRect(0, 0, width, height);
        
        // Suavizar el movimiento del parallax
        offsetX += (targetOffsetX - offsetX) * MOUSE_DAMPING;
        offsetY += (targetOffsetY - offsetY) * MOUSE_DAMPING;

        // Actualizar y dibujar estrellas
        stars.forEach(star => {
            star.update(offsetX, offsetY);
            
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

    window.addEventListener('resize', init);
    
    // Iniciar cuando el documento esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            init();
            animate();
        });
    } else {
        init();
        animate();
    }
})();
