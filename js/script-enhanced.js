// Enhanced UX/UI Script for Quiet Craft Solutions
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all UX enhancements
    initPageLoader();
    initScrollProgressBar();
    initEnhancedNavigation();
    initEnhancedScrollEffects();
    initEnhancedForms();
    initEnhancedSmoothScrolling();
    initEnhancedMobileMenu();
    initEnhancedScrollToTop();
    initEnhancedLoadingAnimations();
    initAdvancedFormValidation();
    initNotificationSystem();
    initEnhancedInteractions();
    initPerformanceOptimizations();
    initQuickCalculator();
    initClickToCall();
    initAnalytics();
    
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        once: true,
        offset: 100,
        delay: 100
    });
});

// Enhanced Page Loader
function initPageLoader() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.prepend(progressBar);
    
    // Create loading overlay if not exists
    if (!document.querySelector('.loading-overlay')) {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
        document.body.appendChild(loadingOverlay);
    }
}

// Enhanced Scroll Progress Bar
function initScrollProgressBar() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', function() {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
}

// Enhanced Navigation with better interactions
function initEnhancedNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Enhanced scroll effect for navbar
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll direction
        if (scrollY > lastScrollY && scrollY > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Enhanced active link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
    
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
}

// Enhanced Scroll Effects with better performance
function initEnhancedScrollEffects() {
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background img');
    
    if (hero && heroBackground) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
    
    // Enhanced intersection observer for animations
    const animatedElements = document.querySelectorAll('.loading, [data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                // Add stagger effect for multiple elements
                const siblings = Array.from(entry.target.parentNode.children);
                const index = siblings.indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhanced Form Handling with real-time validation
function initEnhancedForms() {
    const quoteForm = document.getElementById('quote-form');
    const contactForm = document.getElementById('contact-form');
    
    if (quoteForm) {
        initFormProgress(quoteForm);
        quoteForm.addEventListener('submit', handleEnhancedQuoteSubmission);
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleEnhancedContactSubmission);
    }
}

// Enhanced form progress indicator
function initFormProgress(form) {
    const progressContainer = document.createElement('div');
    progressContainer.className = 'form-progress';
    progressContainer.innerHTML = '<div class="form-progress-bar"></div>';
    form.insertBefore(progressContainer, form.firstChild);
    
    const progressBar = form.querySelector('.form-progress-bar');
    const formFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    function updateProgress() {
        let filledFields = 0;
        formFields.forEach(field => {
            if (field.value.trim() !== '') {
                filledFields++;
            }
        });
        
        const progress = (filledFields / formFields.length) * 100;
        progressBar.style.width = progress + '%';
    }
    
    formFields.forEach(field => {
        field.addEventListener('input', updateProgress);
        field.addEventListener('change', updateProgress);
    });
}

// Enhanced form submission with loading states
function handleEnhancedQuoteSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const formObj = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        if (formObj[key]) {
            if (Array.isArray(formObj[key])) {
                formObj[key].push(value);
            } else {
                formObj[key] = [formObj[key], value];
            }
        } else {
            formObj[key] = value;
        }
    }
    
    // Get selected services
    const services = [];
    const serviceCheckboxes = form.querySelectorAll('input[name="services"]:checked');
    serviceCheckboxes.forEach(checkbox => {
        services.push(checkbox.value);
    });
    formObj.services = services;
    
    // Enhanced loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Show loading overlay
    showLoadingOverlay();
    
    // Simulate enhanced form submission
    setTimeout(() => {
        hideLoadingOverlay();
        showEnhancedNotification('Quote request submitted successfully! We\'ll contact you within 2 hours.', 'success');
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Reset form progress
        const progressBar = form.querySelector('.form-progress-bar');
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        // Clear all form validation states
        clearAllFormStates(form);
        
        // Log form data (for demo purposes)
        console.log('Enhanced Quote Form Submission:', formObj);
    }, 2000);
}

// Enhanced contact form submission
function handleEnhancedContactSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData);
    
    // Enhanced loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Show loading overlay
    showLoadingOverlay();
    
    // Simulate enhanced form submission
    setTimeout(() => {
        hideLoadingOverlay();
        showEnhancedNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Clear all form validation states
        clearAllFormStates(form);
        
        // Log form data (for demo purposes)
        console.log('Enhanced Contact Form Submission:', formObj);
    }, 1500);
}

// Enhanced Notification System
function initNotificationSystem() {
    // Create notification container if it doesn't exist
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

// Enhanced notification with better UX
function showEnhancedNotification(message, type = 'info', duration = 5000) {
    const container = document.querySelector('.notification-container');
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const iconMap = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
            <i class="${iconMap[type]}" style="font-size: 1.25rem;"></i>
            <span style="flex: 1;">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: inherit; cursor: pointer; padding: 0; font-size: 1.25rem;">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to container
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
}

// Enhanced smooth scrolling
function initEnhancedSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                // Enhanced smooth scroll with easing
                smoothScrollTo(offsetPosition, 800);
                
                // Close mobile menu if open
                const navMenu = document.getElementById('nav-menu');
                const navToggle = document.getElementById('nav-toggle');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;
    
    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, start + distance * ease);
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Enhanced Mobile Menu
function initEnhancedMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Enhanced click outside to close
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Enhanced Scroll to Top
function initEnhancedScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        let lastScrollY = 0;
        let ticking = false;
        
        function updateScrollButton() {
            const scrollY = window.pageYOffset;
            
            if (scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
            
            lastScrollY = scrollY;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrollButton);
                ticking = true;
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            smoothScrollTo(0, 800);
        });
    }
}

// Enhanced Loading Animations
function initEnhancedLoadingAnimations() {
    const animateElements = document.querySelectorAll('.prop-card, .service-card, .step, .testimonial-card');
    animateElements.forEach(element => {
        element.classList.add('loading');
    });
    
    // Enhanced intersection observer with better performance
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('loaded');
                }, Math.random() * 200); // Random delay for natural feel
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Advanced Form Validation with real-time feedback
function initAdvancedFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add feedback containers
            if (!input.parentNode.querySelector('.field-feedback')) {
                const feedback = document.createElement('div');
                feedback.className = 'field-feedback';
                input.parentNode.appendChild(feedback);
            }
            
            // Real-time validation
            input.addEventListener('input', function() {
                validateFieldRealTime(this);
            });
            
            input.addEventListener('blur', function() {
                validateFieldRealTime(this);
            });
            
            input.addEventListener('focus', function() {
                clearFieldState(this);
            });
        });
    });
}

// Real-time field validation
function validateFieldRealTime(field) {
    const formGroup = field.closest('.form-group');
    const feedback = formGroup.querySelector('.field-feedback');
    const value = field.value.trim();
    
    // Clear previous states
    formGroup.classList.remove('success', 'error');
    
    // Skip validation for non-required empty fields
    if (!field.required && !value) {
        return;
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
            
            // Auto-format phone number
            if (cleanPhone.length >= 10) {
                const formatted = cleanPhone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                field.value = formatted;
            }
        }
    }
    
    // Date validation
    else if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            errorMessage = 'Event date must be in the future';
        }
    }
    
    // Apply validation state
    if (isValid && value) {
        formGroup.classList.add('success');
        feedback.className = 'field-feedback success';
    } else if (!isValid) {
        formGroup.classList.add('error');
        feedback.className = 'field-feedback error';
        
        // Show error message
        let errorElement = formGroup.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            formGroup.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            animation: shake 0.5s ease-in-out;
        `;
    }
}

// Clear field validation state
function clearFieldState(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear all form states
function clearAllFormStates(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('success', 'error');
        const errorElement = group.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    });
}

// Enhanced Interactions
function initEnhancedInteractions() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Enhanced hover effects for cards
    const cards = document.querySelectorAll('.prop-card, .service-card, .testimonial-card, .step');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.willChange = 'auto';
        });
    });
    
    // Add loading states to form buttons
    const formButtons = document.querySelectorAll('form button[type="submit"]');
    formButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.style.minWidth = this.offsetWidth + 'px';
            }
        });
    });
}

// Create ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
    `;
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'images/cityscape_hero.jpg',
        'images/logistics_truck.jpg'
    ];
    
    criticalResources.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Loading overlay functions
function showLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function hideLoadingOverlay() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Enhanced JavaScript Error:', e.error);
    showEnhancedNotification('An unexpected error occurred. Please refresh the page.', 'error');
});

// Enhanced network status handling
window.addEventListener('online', function() {
    showEnhancedNotification('Connection restored', 'success', 3000);
});

window.addEventListener('offline', function() {
    showEnhancedNotification('You are currently offline', 'warning', 10000);
});

// Utility functions for enhanced UX
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
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
};

// Enhanced accessibility features
document.addEventListener('keydown', function(e) {
    // Enhanced keyboard navigation
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Auto-resize textareas with enhanced UX
document.addEventListener('input', function(e) {
    if (e.target.tagName === 'TEXTAREA') {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
    }
});

// Initialize enhanced features when page is ready
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Add enhanced classes to elements
    const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, input, select, textarea');
    interactiveElements.forEach(element => {
        element.classList.add('enhanced-focus');
    });
    
    // Enhanced loading complete
    setTimeout(() => {
        document.body.classList.add('loaded');
        showEnhancedNotification('Welcome to Quiet Craft Solutions! 🚀', 'success', 3000);
    }, 500);
});

// Enhanced UX/UI: Quick Calculator Feature
function initQuickCalculator() {
    const calcBtn = document.getElementById('calc-btn');
    const calcResult = document.getElementById('calc-result');
    
    if (calcBtn && calcResult) {
        calcBtn.addEventListener('click', function() {
            calculateQuote();
        });
        
        // Auto-calculate on input change
        const inputs = document.querySelectorAll('.calc-input');
        inputs.forEach(input => {
            input.addEventListener('change', function() {
                if (isCalculatorComplete()) {
                    calculateQuote();
                }
            });
        });
    }
}

function calculateQuote() {
    const service = document.getElementById('calc-service').value;
    const weight = parseFloat(document.getElementById('calc-weight').value) || 0;
    const distance = parseFloat(document.getElementById('calc-distance').value) || 0;
    const result = document.getElementById('calc-result');
    const priceValue = result.querySelector('.price-value');
    
    if (!service || weight <= 0 || distance <= 0) {
        showEnhancedNotification('Please fill all calculator fields', 'warning', 3000);
        return;
    }
    
    // Enhanced pricing logic
    let baseRate = 0;
    let weightMultiplier = 0;
    let distanceMultiplier = 0;
    
    switch(service) {
        case 'standard':
            baseRate = 25;
            weightMultiplier = 0.75;
            distanceMultiplier = 1.5;
            break;
        case 'express':
            baseRate = 50;
            weightMultiplier = 1.0;
            distanceMultiplier = 2.0;
            break;
        case 'same-day':
            baseRate = 100;
            weightMultiplier = 1.5;
            distanceMultiplier = 3.0;
            break;
        case 'storage':
            baseRate = 75;
            weightMultiplier = 1.25;
            distanceMultiplier = 1.75;
            break;
        default:
            return;
    }
    
    const totalCost = baseRate + (weight * weightMultiplier) + (distance * distanceMultiplier);
    const finalPrice = Math.round(totalCost * 100) / 100;
    
    // Animate price calculation
    animatePrice(priceValue, finalPrice);
    result.classList.add('show');
    
    // Show success notification
    showEnhancedNotification(`Quote calculated: $${finalPrice.toFixed(2)}`, 'success', 4000);
    
    // Track calculation event (analytics)
    trackEvent('Calculator', 'Quote Calculated', service, finalPrice);
}

function animatePrice(element, targetPrice) {
    let currentPrice = 0;
    const increment = targetPrice / 20;
    const duration = 1000;
    const stepTime = duration / 20;
    
    const timer = setInterval(() => {
        currentPrice += increment;
        if (currentPrice >= targetPrice) {
            currentPrice = targetPrice;
            clearInterval(timer);
        }
        element.textContent = `$${currentPrice.toFixed(2)}`;
    }, stepTime);
}

function isCalculatorComplete() {
    const service = document.getElementById('calc-service').value;
    const weight = document.getElementById('calc-weight').value;
    const distance = document.getElementById('calc-distance').value;
    
    return service && weight && distance;
}

// Enhanced Click-to-Call Feature
function initClickToCall() {
    // Add click-to-call buttons
    const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
    
    phoneNumbers.forEach(phone => {
        phone.addEventListener('click', function(e) {
            const number = this.href.replace('tel:', '');
            trackEvent('Contact', 'Phone Call Initiated', number);
            
            // Show feedback notification
            showEnhancedNotification('Initiating call...', 'info', 2000);
        });
    });
    
    // Auto-detect phone numbers and make them clickable
    const textNodes = getTextNodes(document.body);
    const phoneRegex = /(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/g;
    
    textNodes.forEach(node => {
        const text = node.textContent;
        if (phoneRegex.test(text)) {
            const newText = text.replace(phoneRegex, '<a href="tel:$1" class="auto-phone-link">$1</a>');
            if (newText !== text) {
                const wrapper = document.createElement('span');
                wrapper.innerHTML = newText;
                node.parentNode.replaceChild(wrapper, node);
            }
        }
    });
}

function getTextNodes(node) {
    const textNodes = [];
    const walker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let currentNode;
    while (currentNode = walker.nextNode()) {
        if (currentNode.textContent.trim()) {
            textNodes.push(currentNode);
        }
    }
    
    return textNodes;
}

// Enhanced Analytics Integration
function initAnalytics() {
    // Google Analytics 4 Integration (structure for implementation)
    window.dataLayer = window.dataLayer || [];
    
    function gtag() {
        dataLayer.push(arguments);
    }
    
    // Track page view
    trackEvent('Page', 'View', 'Homepage');
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Track scroll milestones
            if (maxScroll >= 25 && maxScroll < 50) {
                trackEvent('Engagement', 'Scroll', '25%');
            } else if (maxScroll >= 50 && maxScroll < 75) {
                trackEvent('Engagement', 'Scroll', '50%');
            } else if (maxScroll >= 75 && maxScroll < 90) {
                trackEvent('Engagement', 'Scroll', '75%');
            } else if (maxScroll >= 90) {
                trackEvent('Engagement', 'Scroll', '90%');
            }
        }
    }, 1000));
    
    // Track form interactions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const formType = this.id === 'quote-form' ? 'Quote Form' : 'Contact Form';
            trackEvent('Form', 'Submit', formType);
        });
        
        // Track form start
        const firstInput = form.querySelector('input, select, textarea');
        if (firstInput) {
            firstInput.addEventListener('focus', function() {
                const formType = form.id === 'quote-form' ? 'Quote Form' : 'Contact Form';
                trackEvent('Form', 'Start', formType);
            }, { once: true });
        }
    });
    
    // Track button clicks
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonType = this.classList.contains('btn-primary') ? 'Primary CTA' : 'Secondary Button';
            trackEvent('Button', 'Click', `${buttonType}: ${buttonText}`);
        });
    });
    
    // Track navigation usage
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const linkText = this.textContent.trim();
            trackEvent('Navigation', 'Click', linkText);
        });
    });
}

// Enhanced event tracking function
function trackEvent(category, action, label, value) {
    // Console logging for development (replace with actual analytics in production)
    console.log('Analytics Event:', {
        category: category,
        action: action,
        label: label,
        value: value,
        timestamp: new Date().toISOString()
    });
    
    // Google Analytics 4 tracking structure
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
    
    // Additional analytics platforms can be added here
}

// Enhanced Performance Monitoring
function initPerformanceMonitoring() {
    // Track page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            const loadTime = perfData.loadEventEnd - perfData.fetchStart;
            
            trackEvent('Performance', 'Page Load Time', 'Homepage', Math.round(loadTime));
            
            // Track Core Web Vitals (simplified)
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                        if (entry.entryType === 'largest-contentful-paint') {
                            trackEvent('Performance', 'LCP', 'Homepage', Math.round(entry.startTime));
                        }
                        if (entry.entryType === 'first-input') {
                            trackEvent('Performance', 'FID', 'Homepage', Math.round(entry.processingStart - entry.startTime));
                        }
                    });
                });
                
                observer.observe({entryTypes: ['largest-contentful-paint', 'first-input']});
            }
        }, 0);
    });
}

// Enhanced Error Tracking
window.addEventListener('error', function(e) {
    trackEvent('Error', 'JavaScript Error', e.message, e.lineno);
    console.error('Enhanced Error Tracking:', e);
});

// Enhanced User Experience Tracking
function trackUserBehavior() {
    let interactionCount = 0;
    let sessionStartTime = Date.now();
    
    // Track user interactions
    document.addEventListener('click', function() {
        interactionCount++;
    });
    
    document.addEventListener('scroll', function() {
        interactionCount++;
    });
    
    // Track session data before user leaves
    window.addEventListener('beforeunload', function() {
        const sessionDuration = Date.now() - sessionStartTime;
        trackEvent('Session', 'Duration', 'Homepage', Math.round(sessionDuration / 1000));
        trackEvent('Session', 'Interactions', 'Homepage', interactionCount);
    });
}

// Initialize enhanced monitoring
document.addEventListener('DOMContentLoaded', function() {
    initPerformanceMonitoring();
    trackUserBehavior();
});

// Enhanced Accessibility Features
function initEnhancedAccessibility() {
    // Add skip navigation link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2563eb;
        color: white;
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const mainContent = document.querySelector('.hero') || document.querySelector('main') || document.querySelector('#home');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    // Enhanced focus management
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', function(e) {
        // Enhanced keyboard navigation
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.focus();
            }
        }
    });
}

// Initialize enhanced accessibility
document.addEventListener('DOMContentLoaded', initEnhancedAccessibility);
