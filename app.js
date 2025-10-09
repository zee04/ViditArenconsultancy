class SmoothSlideshow {
    constructor(selector, options = {}) {
        this.slides = document.querySelectorAll(selector);
        if (this.slides.length === 0) return;

        this.options = {
            interval: 5000,
            fadeDuration: 1500,
            ...options
        };
        this.currentIndex = 0;
        this.lastTimestamp = 0;
        this.rafId = null;
        this.isRunning = false;
    }

    init() {
        this.slides.forEach((slide, index) => {
            slide.style.position = 'absolute';
            slide.style.top = '0';
            slide.style.left = '0';
            slide.style.width = '100%';
            slide.style.height = '100%';
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.zIndex = index === 0 ? '1' : '0';
            slide.style.transition = `opacity ${this.options.fadeDuration}ms ease-in-out`;
        });
        this.start();
        this.bindEvents();
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.rafId = requestAnimationFrame(this.animate.bind(this));
    }

    stop() {
        if (!this.isRunning) return;
        this.isRunning = false;
        cancelAnimationFrame(this.rafId);
    }

    animate(now) {
        if (!this.lastTimestamp) {
            this.lastTimestamp = now;
        }
        const elapsed = now - this.lastTimestamp;
        if (elapsed > this.options.interval) {
            this.lastTimestamp = now;
            this.next();
        }
        this.rafId = requestAnimationFrame(this.animate.bind(this));
    }

    showSlide(index) {
        if (index === this.currentIndex) return;
        const currentSlide = this.slides[this.currentIndex];
        const nextSlide = this.slides[index];

        nextSlide.style.zIndex = '1';
        nextSlide.style.opacity = '1';
        currentSlide.style.zIndex = '0';

        this.currentIndex = index;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.showSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.showSlide(prevIndex);
    }

    bindEvents() {
        const prevButton = document.querySelector('.slideshow-arrow.prev');
        const nextButton = document.querySelector('.slideshow-arrow.next');

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                this.stop();
                this.prev();
                this.start();
            });
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                this.stop();
                this.next();
                this.start();
            });
        }
    }
}


// ===============================================================
// === FINAL CAROUSEL CLASS - WITH LOOPING & ALL FIXES         ===
// ===============================================================
class FlippingCoverFlow {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;

        this.carousel = this.container.querySelector('.logo-carousel');
        this.prevButton = this.container.querySelector('.carousel-arrow.prev');
        this.nextButton = this.container.querySelector('.carousel-arrow.next');
        this.flipContainer = document.querySelector('.project-flip-container');
        this.flipContent = this.flipContainer.querySelector('.flip-back');

        this.projects = [
            { title: 'VANTARA NIWAS - MACHAAN Launch', type: '', description: "Launched the MACHAAN restaurant inside Vantara Niwas, a seven-star hotel owned by Anant Ambani, hosting an exclusive dinner for Mr. Ambani and other special guests.", logo: 'images/project-images/vantara.png' },
            { title: 'Little Food Co.', type: 'Culinary Consultancy', description: "Enhanced catering and delivery for this premier Mumbai brand, servicing clients like Spotify and Nykaa by elevating dishes, optimizing workflows, and implementing data tracking.", logo: 'images/project-images/little foods.png' },
            { title: 'META - WhatsApp Privacy Ad Film', type: '', description: 'Provided comprehensive food styling and kitchen design consultation for the ad film, ensuring authentic culinary scene portrayal.', logo: 'images/project-images/whatsapp.png' },
            { title: 'Moonshine', type: 'Brand Positioning & Strategy', description: "Developed the brand identity and 'Be Better' tagline, creating a social media strategy focused on sustainability for this unique mead brand.", logo: 'images/project-images/moonshine.png' },
            { title: 'VIRAASAT - Aaverina Hospitality', type: 'Contemporary Indian Restaurant', description: 'Collaborated on a 300-seat restaurant in Mysore focusing on Northern Frontier Cuisine, blending traditional flavors with modern techniques.', logo: 'images/project-images/virasata.png' },
            { title: 'Basque by Breve', type: 'Concept Development', description: 'Developed a concept café in Bandra inspired by St. Sebastian cheesecake, featuring unique varieties and a gourmet sandwich shop.', logo: 'images/project-images/basque.png' },
            { title: 'Phat Fillings', type: 'Premium Pie Delivery', description: 'Led the creation of a premium delivery brand for pies with Indian and Australian flavors, featured in Vogue and Upper Crust.', logo: 'images/project-images/phat logo.png' },
            { title: 'ZEKI', type: 'Upscale Casual Bistro', description: 'Developed an upscale bistro in Andheri West focused on global cuisine, designing the kitchen, curating crockery, and crafting an international menu.', logo: 'images/project-images/zeki.png' },
            { title: 'Doppler', type: '', description: "Conceptualized a café for Boomerang Hospitality in a historic Jaipur haveli, redefining the experience as the city's premier slow bar destination.", logo: 'images/project-images/doppler.png' },
            { title: 'Sarabi', type: 'Modern Indian Restaurant', description: "An upscale 12,000 sqft space offering contemporary progressive Indian food, designed for a discerning clientele.", logo: 'images/project-images/saarbai.png' },
            { title: 'Sunny Da Dhaba', type: '', description: 'Evolved a 30+ year legacy brand into a dual-floor destination with a Mediterranean café and a modern-Indian restaurant with playful tapas.', logo: 'images/project-images/sunnyy.png' }
        ];

        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.populateCarousel();
        this.cards = this.carousel.querySelectorAll('.logo-card');
        this.updateCarouselPositions(true); // Initial setup without transition
        this.bindEvents();
    }

    populateCarousel() {
        this.carousel.innerHTML = this.projects.map((project, index) => `
            <div class="logo-card" data-index="${index}">
                <img src="${project.logo}" alt="${project.title}">
            </div>
        `).join('');
    }

    updateCarouselPositions(isInitial = false) {
        const total = this.projects.length;

        // Loop through all cards to set their position
        for (let i = 0; i < total; i++) {
            const card = this.cards[i];
            const offset = i - this.currentIndex;

            let transform, zIndex, filter, opacity;

            // This creates the circular distance for the loop
            const circularOffset = (offset + total) % total;
            const rightOffset = (this.currentIndex - i + total) % total;
            const distance = Math.min(circularOffset, rightOffset);
            
            // Disable transition for the very first load
            if (isInitial) card.style.transition = 'none';
            else card.style.transition = 'transform 0.5s ease, opacity 0.5s ease, filter 0.5s ease';

            if (distance === 0) { // Center card
                transform = 'translateX(0) scale(1)';
                zIndex = 10;
                filter = 'none';
                opacity = 1;
            } else if (distance === 1) { // Adjacent cards
                // Check if it's the left or right card
                if (circularOffset === 1 || circularOffset < total / 2 && circularOffset !== 0) {
                    transform = 'translateX(150px) scale(0.7)'; // Right
                } else {
                    transform = 'translateX(-150px) scale(0.7)'; // Left
                }
                zIndex = 5;
                filter = 'blur(2px)';
                opacity = 0.5;
            } else { // Hidden cards
                transform = `translateX(${offset * 75}px) scale(0.5)`;
                opacity = 0;
                zIndex = 1;
            }

            card.style.transform = transform;
            card.style.zIndex = zIndex;
            card.style.filter = filter;
            card.style.opacity = opacity;
        }
    }
    
   showFlipModal(index) {
    const project = this.projects[index];
    
    // FORCE the content to be visible immediately
    this.flipContent.innerHTML = `
        <button class="modal-close-btn">&times;</button>
        <h3 style="color: #FFFFFF !important; margin-bottom: 15px;">${project.title}</h3>
        ${project.type ? `<p class="project-type" style="color: #CCCCCC !important; font-style: italic; margin-bottom: 15px;">${project.type}</p>` : ''}
        <p style="color: #FFFFFF !important; line-height: 1.6;">${project.description}</p>
    `;
    
    // FORCE the flip-back to have the right colors
    this.flipContent.style.backgroundColor = '#1f2121';
    this.flipContent.style.color = '#FFFFFF';
    
    this.flipContainer.classList.add('active');
    
    // Add the close event
    const closeBtn = this.flipContainer.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => this.hideFlipModal(), { once: true });
    }
}


    hideFlipModal() {
        this.flipContainer.classList.remove('active');
    }

   bindEvents() {
    this.nextButton.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex + 1) % this.projects.length;
        this.updateCarouselPositions();
    });

    this.prevButton.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex - 1 + this.projects.length) % this.projects.length;
        this.updateCarouselPositions();
    });

    // FIXED: Separate touch and click handling for mobile vs desktop
    let touchStartTime = 0;
    let touchEndTime = 0;

    // Handle touch events for mobile
    this.carousel.addEventListener('touchstart', (e) => {
        touchStartTime = Date.now();
    });

    this.carousel.addEventListener('touchend', (e) => {
        touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;
        
        // Only trigger if it's a quick tap (not a scroll)
        if (touchDuration < 200) {
            const card = e.target.closest('.logo-card');
            if (card && parseInt(card.dataset.index) === this.currentIndex) {
                e.preventDefault();
                e.stopPropagation();
                this.showFlipModal(this.currentIndex);
            }
        }
    });

    // Handle click events for desktop (but not mobile)
    this.carousel.addEventListener('click', (e) => {
        // Skip if this is a mobile touch device
        if ('ontouchstart' in window) return;
        
        const card = e.target.closest('.logo-card');
        if (card && parseInt(card.dataset.index) === this.currentIndex) {
            this.showFlipModal(this.currentIndex);
        }
    });

    // FIXED: Only close modal when clicking the background, not anywhere
    this.flipContainer.addEventListener('click', (e) => {
        if (e.target === this.flipContainer) {
            this.hideFlipModal();
        }
    });
}

}



       
   




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
    
// REPLACE your current bindEvents() method with this one.

bindEvents() {
    // --- 1. MOBILE MENU TOGGLE (This part is working for you) ---
    this.mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents other clicks from interfering
        this.toggleMobileMenu();
    });

    // --- 2. NEW DROPDOWN LOGIC (This is the new part) ---
    this.dropdowns.forEach(dropdown => {
        const toggleLink = dropdown.querySelector('.dropdown-toggle');
        
        // Dynamically create and add the arrow icon using JavaScript
        const arrow = document.createElement('span');
        arrow.className = 'dropdown-arrow';
        arrow.innerHTML = '&gt;';
        toggleLink.appendChild(arrow);

        // Create a specific click listener just FOR THE ARROW
        arrow.addEventListener('click', (e) => {
            // On mobile, tapping the ARROW toggles the dropdown
            if (window.innerWidth <= 768) {
                e.preventDefault();  // STOPS the browser from following the parent link
                e.stopPropagation(); // STOPS the click from bubbling up to the parent link
                
                // Toggle the 'active' class on the parent .dropdown element
                dropdown.classList.toggle('active');
            }
        });
    });

    // --- 3. YOUR EXISTING EVENT LISTENERS (PRESERVED) ---
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
    const heroSlideshow = new SmoothSlideshow('.slide');
    if (heroSlideshow.slides.length > 0) {
        heroSlideshow.init();
    }
    const coverFlow = new FlippingCoverFlow('.logo-carousel-container');
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





