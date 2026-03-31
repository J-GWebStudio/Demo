// ============================================
// 🌊 CEVICHERÍA EL CARAJITO - MODERN JS
// ============================================

// Custom Cursor (solo desktop)
if (window.innerWidth > 768) {
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Efecto en elementos interactivos
    const interactives = document.querySelectorAll('a, button, .bento-item');
    interactives.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        item.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// Nav Dots - Active on Scroll
const sections = document.querySelectorAll('section[id]');
const navDots = document.querySelectorAll('.nav-dot');

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 200;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('href') === `#${sectionId}`) {
                    dot.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// 📋 SUBMENÚ DE PLATOS - Interacción
// ============================================

// Soporte táctil y clic para el submenú
const hasSubmenu = document.querySelector('.has-submenu');
const submenuCarta = document.querySelector('.submenu-carta');

if (hasSubmenu && submenuCarta) {
    // Toggle submenu en dispositivos táctiles
    const navDotPlatos = hasSubmenu.querySelector('.nav-dot');
    let submenuOpen = false;

    // Para dispositivos táctiles/móviles
    navDotPlatos.addEventListener('click', (e) => {
        if (window.innerWidth <= 1200) return; // No hacer nada en móvil
        
        // En desktop, toggle el menú al hacer clic
        e.preventDefault();
        submenuOpen = !submenuOpen;
        
        if (submenuOpen) {
            submenuCarta.style.opacity = '1';
            submenuCarta.style.visibility = 'visible';
            submenuCarta.style.pointerEvents = 'auto';
            submenuCarta.style.left = '50px';
        } else {
            submenuCarta.style.opacity = '0';
            submenuCarta.style.visibility = 'hidden';
            submenuCarta.style.pointerEvents = 'none';
            submenuCarta.style.left = '40px';
        }
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!hasSubmenu.contains(e.target) && submenuOpen) {
            submenuOpen = false;
            submenuCarta.style.opacity = '0';
            submenuCarta.style.visibility = 'hidden';
            submenuCarta.style.pointerEvents = 'none';
            submenuCarta.style.left = '40px';
        }
    });

    // Cerrar al presionar Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && submenuOpen) {
            submenuOpen = false;
            submenuCarta.style.opacity = '0';
            submenuCarta.style.visibility = 'hidden';
            submenuCarta.style.pointerEvents = 'none';
            submenuCarta.style.left = '40px';
        }
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animations - Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elementos a animar
const animatedElements = document.querySelectorAll(
    '.bento-item, .review-card-modern, .info-card-modern, .feat'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stats Counter Animation
const stats = document.querySelectorAll('.stat h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseInt(text);
            
            if (!isNaN(number)) {
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        target.textContent = text;
                        clearInterval(timer);
                    } else {
                        target.textContent = Math.floor(current) + text.replace(/[0-9]/g, '');
                    }
                }, 30);
            }
            statsObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// Contact Form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value || '';
        const message = document.getElementById('message').value;
        
        let whatsappMsg = `Hola, soy ${name}.\n\n${message}`;
        if (phone) {
            whatsappMsg += `\n\nMi teléfono: ${phone}`;
        }
        
        const encodedMsg = encodeURIComponent(whatsappMsg);
        window.open(`https://wa.me/51947469343?text=${encodedMsg}`, '_blank');
        
        contactForm.reset();
    });
}

// Bento Grid Hover Effect
const bentoItems = document.querySelectorAll('.bento-item');
bentoItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        bentoItems.forEach(other => {
            if (other !== this) {
                other.style.opacity = '0.7';
                other.style.filter = 'grayscale(0.3)';
            }
        });
    });
    
    item.addEventListener('mouseleave', function() {
        bentoItems.forEach(other => {
            other.style.opacity = '1';
            other.style.filter = 'grayscale(0)';
        });
    });
});

// Hide Scroll Indicator on Scroll
const scrollHint = document.querySelector('.scroll-hint');
if (scrollHint) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 200) {
            scrollHint.style.opacity = '0';
            scrollHint.style.pointerEvents = 'none';
        } else {
            scrollHint.style.opacity = '1';
            scrollHint.style.pointerEvents = 'auto';
        }
    });
}

// Performance: Debounce Function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

// Console Branding
console.log('%c🐟 Cevichería El Carajito', 'font-size: 24px; font-weight: bold; color: #06b6d4;');
console.log('%cMi Rico Sabor Caracino 🌊', 'font-size: 14px; color: #64748b;');

// ============================================
// 🎠 CAROUSEL HORIZONTAL - REVIEWS
// ============================================

class Carousel3D {
    constructor() {
        this.container = document.querySelector('.reviews-carousel-3d');
        this.track = document.querySelector('.carousel-track');
        this.cards = Array.from(document.querySelectorAll('.review-card-modern'));
        this.prevBtn = document.querySelector('.carousel-nav.prev');
        this.nextBtn = document.querySelector('.carousel-nav.next');
        this.indicators = Array.from(document.querySelectorAll('.indicator'));
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (!this.cards.length) return;
        
        this.updateCarousel();
        this.setupEventListeners();
        this.startAutoplay();
        
        // Actualizar en resize con debounce
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.updateCarousel(), 150);
        });
    }
    
    getCardWidth() {
        // Calcular el ancho real de la tarjeta + gap
        const card = this.cards[0];
        if (!card) return 632; // fallback
        
        const cardRect = card.getBoundingClientRect();
        const style = window.getComputedStyle(this.track);
        const gap = parseInt(style.gap) || 32;
        
        return cardRect.width + gap;
    }
    
    updateCarousel() {
        // Calcular el desplazamiento
        const cardWidth = this.getCardWidth();
        const offset = -this.currentIndex * cardWidth;
        this.track.style.transform = `translateX(${offset}px)`;
        
        // Actualizar clases de tarjetas
        this.cards.forEach((card, index) => {
            card.classList.toggle('active', index === this.currentIndex);
        });
        
        // Actualizar indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    goToSlide(index) {
        if (this.isTransitioning) return;
        if (index < 0 || index >= this.cards.length) return;
        
        this.isTransitioning = true;
        this.currentIndex = index;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
        
        this.resetAutoplay();
    }
    
    next() {
        const nextIndex = this.currentIndex < this.cards.length - 1 
            ? this.currentIndex + 1 
            : 0;
        this.goToSlide(nextIndex);
    }
    
    prev() {
        const prevIndex = this.currentIndex > 0 
            ? this.currentIndex - 1 
            : this.cards.length - 1;
        this.goToSlide(prevIndex);
    }
    
    setupEventListeners() {
        // Botones de navegación
        this.nextBtn?.addEventListener('click', () => this.next());
        this.prevBtn?.addEventListener('click', () => this.prev());
        
        // Indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        
        // Touch swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.container?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
        
        // Pausar autoplay en hover
        this.container?.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container?.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        }
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => this.next(), 5000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Inicializar carrusel cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Carousel3D();
    });
} else {
    new Carousel3D();
}
