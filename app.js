// Smooth scrolling and momentum effects
class SmoothScroll {
    constructor() {
        this.current = 0;
        this.target = 0;
        this.ease = 0.1;
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.setBodyHeight();
        this.bindEvents();
        this.render();
    }

    setBodyHeight() {
        document.body.style.height = `${document.documentElement.scrollHeight}px`;
    }

    bindEvents() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    handleScroll() {
        this.target = window.scrollY;
        this.isScrolling = true;
    }

    handleResize() {
        this.setBodyHeight();
    }

    render() {
        if (this.isScrolling) {
            this.current += (this.target - this.current) * this.ease;
            
            if (Math.abs(this.target - this.current) < 0.1) {
                this.current = this.target;
                this.isScrolling = false;
            }

            // Apply smooth transform to elements that need it
            const elements = document.querySelectorAll('.smooth-scroll-element');
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const speed = element.dataset.speed || 0.5;
                const yPos = -(this.current * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }

        requestAnimationFrame(this.render.bind(this));
    }
}

// Navigation functionality
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileToggle = document.getElementById('mobile-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.dropdowns = document.querySelectorAll('.dropdown');
        this.isOpen = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }



   // The new, corrected bindEvents() method
bindEvents() {
  // Mobile menu toggle
  this.mobileToggle.addEventListener('click', this.toggleMobileMenu.bind(this));

  // Close the main mobile menu ONLY when clicking a link that should navigate away.
  // This now includes standard links, the new arrow links, and links inside the dropdowns.
  const linksThatCloseMenu = this.navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-arrow-link, .dropdown-menu a');
  linksThatCloseMenu.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && this.isOpen) {
        this.closeMobileMenu();
      }
    });
  });

  // Handle toggling the dropdowns on mobile (when tapping the text).
  this.dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault(); // Prevents any default action.
          dropdown.classList.toggle('active'); // Simply opens or closes the dropdown.
        }
      });
    }
  });

 
/* --- END: FINAL JAVASCRIPT FOR MOBILE NAVIGATION --- */

        // Scroll behavior
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Close mobile menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMobileMenu();
            }
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', this.handleAnchorClick.bind(this));
        });
    }

    toggleMobileMenu() {
        this.isOpen = !this.isOpen;
        this.mobileToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.isOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.isOpen = false;
        this.mobileToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    toggleDropdown(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        const isActive = dropdown.classList.contains('active');
        
        // Close all dropdowns
        this.dropdowns.forEach(d => d.classList.remove('active'));
        
        // Toggle current dropdown
        if (!isActive) {
            dropdown.classList.add('active');
        }
    }

    handleScroll() {
        const scrolled = window.scrollY > 50;
        this.navbar.classList.toggle('scrolled', scrolled);

        // Update active nav link based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    handleAnchorClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// Intersection Observer for animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), options);
        this.observeElements();
    }

    observeElements() {
        const elements = document.querySelectorAll('.glass-card, .service-card, .project-card, .hero-content');
        elements.forEach(el => {
            el.classList.add('loading');
            this.observer.observe(el);
        });
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                entry.target.classList.remove('loading');
            }
        });
    }
}

// Form handling
class FormHandler {
    constructor() {
        this.form = document.querySelector('form[action*="formspree"]');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        try {
            const formData = new FormData(this.form);
            const response = await fetch(this.form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                this.showSuccess();
                this.form.reset();
            } else {
                this.showError();
            }
        } catch (error) {
            this.showError();
        } finally {
            // Reset button state
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    }

    showSuccess() {
        this.showMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
    }

    showError() {
        this.showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    }

    showMessage(text, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const message = document.createElement('div');
        message.className = `form-message form-message--${type}`;
        message.textContent = text;
        
        // Insert after form
        this.form.parentNode.insertBefore(message, this.form.nextSibling);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (message.parentNode) {
                message.remove();
            }
        }, 5000);
    }
}

// Parallax effects
class ParallaxEffects {
    constructor() {
        this.elements = document.querySelectorAll('[data-parallax]');
        this.init();
    }

    init() {
        if (this.elements.length > 0) {
            this.bindEvents();
        }
    }

    bindEvents() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        
        this.elements.forEach(element => {
            const rate = scrolled * (element.dataset.parallax || 0.5);
            element.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Smooth card hover effects
class CardEffects {
    constructor() {
        this.cards = document.querySelectorAll('.glass-card, .service-card, .project-card');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
            card.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
            card.addEventListener('mousemove', this.handleMouseMove.bind(this));
        });
    }

    handleMouseEnter(e) {
        e.currentTarget.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    handleMouseLeave(e) {
        e.currentTarget.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        e.currentTarget.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    }

    handleMouseMove(e) {
    // Skip this effect on mobile devices
    if (window.innerWidth <= 768) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Check if the element has the 'large-card' class
    const isLargeCard = card.classList.contains('large-card');

    // Use a divisor of 20 for large cards (less rotation) and 10 for others
    const rotationDivisor = isLargeCard ? 20 : 10;

    const rotateX = (y - centerY) / rotationDivisor;
    const rotateY = (centerX - x) / rotationDivisor;

    card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}
}

// Loading screen (optional enhancement)
class LoadingScreen {
    constructor() {
        this.init();
    }

    init() {
        // Hide loading screen when page is fully loaded
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Trigger initial animations after a short delay
            setTimeout(() => {
                const initialElements = document.querySelectorAll('.hero-content, .about-preview .glass-card');
                initialElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('loaded');
                        el.classList.remove('loading');
                    }, index * 100);
                });
            }, 300);
        });
    }
}

// Utility functions
const Utils = {
    // Debounce function for scroll events
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const navigation = new Navigation();
    const animationObserver = new AnimationObserver();
    const formHandler = new FormHandler();
    const cardEffects = new CardEffects();
    const loadingScreen = new LoadingScreen();
    
    // Initialize parallax only on desktop
    if (window.innerWidth > 768) {
        const parallaxEffects = new ParallaxEffects();
    }

    // Add smooth scrolling class to specific elements
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.classList.add('smooth-scroll-element');
        heroSection.dataset.speed = '0.3';
    }

    // Add stagger animation delays to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add stagger animation delays to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    // Smooth scroll polyfill for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScrollPolyfill = document.createElement('script');
        smoothScrollPolyfill.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
        document.head.appendChild(smoothScrollPolyfill);
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page is visible
        document.body.classList.remove('page-hidden');
    }
});

// Add CSS for form messages
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    .form-message {
        padding: var(--space-16);
        margin-top: var(--space-16);
        border-radius: var(--radius-base);
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    }
    
    .form-message--success {
        background: rgba(33, 128, 141, 0.15);
        color: var(--color-success);
        border: 1px solid rgba(33, 128, 141, 0.25);
    }
    
    .form-message--error {
        background: rgba(192, 21, 47, 0.15);
        color: var(--color-error);
        border: 1px solid rgba(192, 21, 47, 0.25);
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .btn.loading {
        position: relative;
        color: transparent;
    }
    
    .btn.loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 16px;
        height: 16px;
        border: 2px solid currentColor;
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        to {
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
`;
document.head.appendChild(messageStyles);
