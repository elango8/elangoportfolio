// Professional Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 50
    });

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // ...existing code...
const stat = document.querySelector('.stat-numbers');
if (stat) {
    const target = parseFloat(stat.getAttribute('data-count'));
    let count = 0;

    const updateCount = () => {
        count += 0.1;
        if (count >= target) {
            stat.textContent = target.toFixed(2);
        } else {
            stat.textContent = count.toFixed(2);
            requestAnimationFrame(updateCount);
        }
    };

    updateCount();
}


    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', updateNavbar);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Only smooth scroll for same-page section links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
         // Close mobile menu
                const navbarCollapse = document.querySelector('.navbar-collapse');
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }

                // Update active nav link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);

    // Typing animation for hero subtitle
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const textArray = [
            'UI/UX Designer',
            'Frontend Developer',
            'Creative Problem Solver',
            'python Programmer'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentText = textArray[textIndex];
            
            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typingSpeed = 500; // Pause before typing next
            }

            setTimeout(typeText, typingSpeed);
        }

        setTimeout(typeText, 1000);
    }

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 50;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounters();

    // Skills animation
    function animateSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const progress = skillBar.getAttribute('data-progress');
                    
                    setTimeout(() => {
                        skillBar.style.width = progress + '%';
                    }, 200);

                    observer.unobserve(skillBar);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => observer.observe(bar));
    }

    animateSkills();

    // Portfolio filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Portfolio item hover effects
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-20px) rotateX(5deg)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form submission logic)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 2000);
        });
    }

    // Form label animation
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });

    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Ripple effect for buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    const rippleButtons = document.querySelectorAll('.ripple-effect');
    rippleButtons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Parallax effect for hero section
    function parallaxScroll() {
        const scrolled = window.pageYOffset;
        const heroSection = document.getElementById('hero');
        const shapes = document.querySelectorAll('.shape');
        
        if (heroSection) {
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.02}deg)`;
            });
        }
    }

    window.addEventListener('scroll', parallaxScroll);

    // Smooth reveal animations for timeline items
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-50px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            observer.observe(item);
        });
    }

    animateTimeline();

    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Mobile menu improvements
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });

    // Prevent body scroll when mobile menu is open
    navbarToggler.addEventListener('click', function() {
        setTimeout(() => {
            if (navbarCollapse.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }, 300);
    });

    // Performance optimization: Throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll-heavy functions
    window.addEventListener('scroll', throttle(function() {
        updateNavbar();
        updateActiveNavLink();
        toggleBackToTop();
        parallaxScroll();
    }, 16)); // ~60fps

    // Intersection Observer for animations
    const animateElements = document.querySelectorAll('[data-aos]');
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Custom cursor effect (optional)
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let cursorX = 0;
    let cursorY = 0;
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }

    // Only show custom cursor on desktop
    if (window.innerWidth > 768) {
        animateCursor();
        
        // Add cursor styles
        const cursorStyle = document.createElement('style');
        cursorStyle.textContent = `
            .custom-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                background: rgba(59, 130, 246, 0.5);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.2s ease;
            }
            
            .custom-cursor.hover {
                transform: scale(2);
            }
        `;
        document.head.appendChild(cursorStyle);

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .portfolio-card');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Console message for developers
    console.log(`
    ╔══════════════════════════════════════╗
    ║              Welcome!                ║
    ║                                      ║
    ║  Portfolio by Elango                 ║
    ║  UI/UX Designer & Web Developer      ║
    ║                                      ║
    ║  Interested in collaboration?        ║
    ║  Let's connect!                      ║
    ╚══════════════════════════════════════╝
    `);

    // Service Worker registration for PWA (optional)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(error) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }

    // Dark mode toggle (optional feature)
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);

        darkModeToggle.addEventListener('click', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Initialize tooltips (if using Bootstrap tooltips)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Error handling for missing elements
    function handleMissingElements() {
        const requiredElements = [
            '#navbar',
            '.hero-section',
            '#contact'
        ];

        requiredElements.forEach(selector => {
            const element = document.querySelector(selector);
            if (!element) {
                console.warn(`Element ${selector} not found`);
            }
        });
    }

    handleMissingElements();

    // Portfolio lightbox functionality
    function initPortfolioLightbox() {
        const portfolioImages = document.querySelectorAll('.portfolio-image');
        
        portfolioImages.forEach(image => {
            image.addEventListener('click', function() {
                const lightbox = document.createElement('div');
                lightbox.className = 'portfolio-lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <button class="lightbox-close">&times;</button>
                        <div class="lightbox-body">
                            <h3>Project Details</h3>
                            <p>This is where project details would be displayed.</p>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                // Close lightbox
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = '';
                    }
                });
            });
        });
    }

    // initPortfolioLightbox();

    // Smooth page transitions
    function initPageTransitions() {
        const body = document.body;
        
        // Add page loaded class
        setTimeout(() => {
            body.classList.add('page-loaded');
        }, 100);
        
        // Handle page unload
        window.addEventListener('beforeunload', function() {
            body.classList.add('page-leaving');
        });
    }

    initPageTransitions();

    // Keyboard navigation support
    function initKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            // Handle escape key
            if (e.key === 'Escape') {
                // Close any open modals or menus
                const openModal = document.querySelector('.modal.show');
                const openMenu = document.querySelector('.navbar-collapse.show');
                
                if (openModal) {
                    const modal = bootstrap.Modal.getInstance(openModal);
                    if (modal) modal.hide();
                }
                
                if (openMenu) {
                    const collapse = bootstrap.Collapse.getInstance(openMenu);
                    if (collapse) collapse.hide();
                }
            }
            
            // Handle tab navigation enhancement
            if (e.key === 'Tab') {
                body.classList.add('keyboard-navigation');
            }
        });
        
        // Remove keyboard navigation class on mouse use
        document.addEventListener('mousedown', function() {
            body.classList.remove('keyboard-navigation');
        });
    }

    initKeyboardNavigation();

    // Progressive enhancement for older browsers
    function checkBrowserSupport() {
        const features = {
            intersectionObserver: 'IntersectionObserver' in window,
            customProperties: CSS.supports('color', 'var(--fake-var)'),
            grid: CSS.supports('display', 'grid'),
            backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)')
        };
        
        // Add fallbacks for unsupported features
        if (!features.intersectionObserver) {
            // Fallback for IntersectionObserver
            const script = document.createElement('script');
            script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
            document.head.appendChild(script);
        }
        
        if (!features.backdropFilter) {
            document.documentElement.classList.add('no-backdrop-filter');
        }
        
        console.log('Browser support:', features);
    }

    checkBrowserSupport();

    // Analytics tracking (placeholder)
    function trackPageView() {
        // Replace with your analytics tracking code
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    trackPageView();

    // Performance monitoring
    function monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(() => {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    
                    console.log('Page Load Time:', pageLoadTime + 'ms');
                    
                    // Track performance if analytics is available
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'page_load_time', {
                            value: pageLoadTime
                        });
                    }
                }, 0);
            });
        }
    }

    monitorPerformance();

    // Accessibility improvements
    function improveAccessibility() {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.className = 'skip-link';
        skipLink.textContent = 'Skip to main content';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-blue);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
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
        
        // Add main content landmark
        const mainContent = document.querySelector('#hero');
        if (mainContent) {
            mainContent.setAttribute('id', 'main-content');
            mainContent.setAttribute('role', 'main');
        }
        
        // Improve focus indicators
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--accent-blue)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }

    improveAccessibility();

    // Clean up function
    function cleanup() {
        // Remove event listeners to prevent memory leaks
        window.removeEventListener('scroll', updateNavbar);
        window.removeEventListener('scroll', updateActiveNavLink);
        window.removeEventListener('scroll', toggleBackToTop);
        window.removeEventListener('scroll', parallaxScroll);
        window.removeEventListener('resize', handleResize);
    }

    // Handle page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Page is hidden, pause animations or heavy operations
            document.body.classList.add('page-hidden');
        } else {
            // Page is visible, resume animations
            document.body.classList.remove('page-hidden');
        }
    });

    // Handle window resize
    function handleResize() {
        // Recalculate positions and sizes on resize
        const heroImage = document.querySelector('.hero-image');
        if (heroImage && window.innerWidth <= 768) {
            heroImage.style.width = '200px';
            heroImage.style.height = '200px';
        }
        
        // Update AOS on resize
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    }

    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });

    // Initialize everything when DOM is fully loaded
    console.log('Portfolio initialized successfully! 🚀');
    
    // Add custom styles for animations
    const customStyles = document.createElement('style');
    customStyles.textContent = `
        .page-loaded {
            opacity: 1;
        }
        
        .page-leaving {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .keyboard-navigation *:focus {
            outline: 2px solid var(--accent-blue) !important;
            outline-offset: 2px !important;
        }
        
        .no-backdrop-filter .navbar {
            background: rgba(30, 58, 138, 0.95) !important;
        }
        
        .portfolio-lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        }
        
        .lightbox-content {
            background: white;
            padding: 2rem;
            border-radius: var(--border-radius);
            max-width: 80%;
            max-height: 80%;
            position: relative;
        }
        
        .lightbox-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
        }
        
        @media (prefers-reduced-motion: reduce) {
            .custom-cursor {
                display: none;
            }
            
            .floating-shapes {
                display: none;
            }
        }
    `;
    document.head.appendChild(customStyles);

    // Expose cleanup function globally for potential use
    window.portfolioCleanup = cleanup;
});

document.addEventListener('DOMContentLoaded', function() {
    
    // Certificate card animations
    function animateCertificates() {
        const certificateCards = document.querySelectorAll('.certificate-card');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        certificateCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Initialize certificate animations
    animateCertificates();

    // Certificate modal functionality
    const certificateModals = document.querySelectorAll('[id^="certificateModal"]');
    certificateModals.forEach(modal => {
        modal.addEventListener('show.bs.modal', function() {
            const img = this.querySelector('.modal-body img');
            if (img) {
                img.style.transform = 'scale(0.8)';
                img.style.opacity = '0';
                
                setTimeout(() => {
                    img.style.transition = 'all 0.3s ease';
                    img.style.transform = 'scale(1)';
                    img.style.opacity = '1';
                }, 150);
            }
        });
    });

    // Certificate hover effects
    const certificateCards = document.querySelectorAll('.certificate-card');
    certificateCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.certificate-badge i');
            if (badge) {
                badge.style.transform = 'rotate(360deg) scale(1.1)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.certificate-badge i');
            if (badge) {
                badge.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });

    navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        // Only smooth scroll for same-page section links
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        }
    });
});



    // Certificate download tracking
    const downloadButtons = document.querySelectorAll('[download]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function() {
            const certificateName = this.closest('.modal-content').querySelector('.modal-title').textContent;
            console.log(`Certificate downloaded: ${certificateName}`);
            
            // Show download success message
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check me-2"></i>Downloaded!';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
            }, 2000);
        });
    });

    // Certificate search functionality (if you want to add search)
    function addCertificateSearch() {
        const searchInput = document.createElement('div');
        searchInput.innerHTML = `
            <div class="row justify-content-center mb-4">
                <div class="col-lg-6">
                    <div class="input-group">
                        <input type="text" class="form-control" id="certificateSearch" placeholder="Search certificates...">
                        <button class="btn btn-outline-primary" type="button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const certificatesSection = document.getElementById('certificates');
        const sectionHeader = certificatesSection.querySelector('.section-header');
        sectionHeader.insertAdjacentElement('afterend', searchInput);
        
        // Search functionality
        const searchField = document.getElementById('certificateSearch');
        if (searchField) {
            searchField.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const certificates = document.querySelectorAll('.certificate-card');
                
                certificates.forEach(cert => {
                    const title = cert.querySelector('.card-title').textContent.toLowerCase();
                    const issuer = cert.querySelector('.card-text').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || issuer.includes(searchTerm)) {
                        cert.style.display = 'block';
                        cert.style.opacity = '1';
                        cert.style.transform = 'scale(1)';
                    } else {
                        cert.style.opacity = '0.3';
                        cert.style.transform = 'scale(0.9)';
                    }
                });
            });
        }
    }

    // Uncomment the line below if you want to add search functionality
    // addCertificateSearch();

    // Certificate statistics counter
    function addCertificateStats() {
        const certificateCards = document.querySelectorAll('.certificate-card');
        const totalCertificates = certificateCards.length;
        
        // Add stats to section header
        const sectionSubtitle = document.querySelector('#certificates .section-subtitle');
        if (sectionSubtitle) {
            sectionSubtitle.innerHTML = `Professional certifications and achievements • ${totalCertificates} certificates earned`;
        }
    }

    addCertificateStats();

    // Lazy loading for certificate images
    function lazyLoadCertificateImages() {
        const certificateImages = document.querySelectorAll('.certificate-image img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    img.onload = () => {
                        img.style.opacity = '1';
                        img.style.filter = 'blur(0)';
                    };
                    observer.unobserve(img);
                }
            });
        });

        certificateImages.forEach(img => {
            img.style.opacity = '0';
            img.style.filter = 'blur(5px)';
            img.style.transition = 'opacity 0.3s, filter 0.3s';
            imageObserver.observe(img);
        });
    }

    // Initialize lazy loading (if you add data-src attributes to your images)
    lazyLoadCertificateImages();

    // Certificate verification links
    function addVerificationLinks() {
        const certificates = [
            {
                modal: 'certificateModal1',
                verifyLink: 'https://coursera.org/verify/professional-cert/your-cert-id'
            },
            {
                modal: 'certificateModal2',
                verifyLink: 'https://freecodecamp.org/certification/your-username/responsive-web-design'
            },
            {
                modal: 'certificateModal3',
                verifyLink: 'https://aws.amazon.com/verification'
            }
            // Add more verification links as needed
        ];

        certificates.forEach(cert => {
            const modal = document.getElementById(cert.modal);
            if (modal && cert.verifyLink) {
                const footer = modal.querySelector('.modal-footer');
                const verifyButton = document.createElement('a');
                verifyButton.href = cert.verifyLink;
                verifyButton.target = '_blank';
                verifyButton.className = 'btn btn-outline-primary';
                verifyButton.innerHTML = '<i class="fas fa-external-link-alt me-2"></i>Verify Certificate';
                footer.insertBefore(verifyButton, footer.firstChild);
            }
        });
    }

    // Add verification links
    addVerificationLinks();

    // Certificate sharing functionality
    function addSocialSharing() {
        certificateModals.forEach(modal => {
            const modalBody = modal.querySelector('.modal-body');
            const shareDiv = document.createElement('div');
            shareDiv.className = 'mt-3';
            shareDiv.innerHTML = `
                <div class="d-flex justify-content-center gap-2">
                    <button class="btn btn-sm btn-outline-primary share-linkedin" title="Share on LinkedIn">
                        <i class="fab fa-linkedin"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-primary share-twitter" title="Share on Twitter">
                        <i class="fab fa-twitter"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-primary copy-link" title="Copy Link">
                        <i class="fas fa-link"></i>
                    </button>
                </div>
            `;
            modalBody.appendChild(shareDiv);

            // Add click handlers for sharing
            const linkedinBtn = shareDiv.querySelector('.share-linkedin');
            const twitterBtn = shareDiv.querySelector('.share-twitter');
            const copyBtn = shareDiv.querySelector('.copy-link');

            if (linkedinBtn) {
                linkedinBtn.addEventListener('click', function() {
                    const title = modal.querySelector('.modal-title').textContent;
                    const url = encodeURIComponent(window.location.href);
                    const text = encodeURIComponent(`I just earned: ${title}`);
                    window.open(`https://linkedin.com/sharing/share-offsite/?url=${url}&summary=${text}`, '_blank');
                });
            }

            if (twitterBtn) {
                twitterBtn.addEventListener('click', function() {
                    const title = modal.querySelector('.modal-title').textContent;
                    const text = encodeURIComponent(`I just earned: ${title} 🎉`);
                    const url = encodeURIComponent(window.location.href);
                    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
                });
            }

            if (copyBtn) {
                copyBtn.addEventListener('click', async function() {
                    try {
                        await navigator.clipboard.writeText(window.location.href);
                        this.innerHTML = '<i class="fas fa-check"></i>';
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-link"></i>';
                        }, 2000);
                    } catch (err) {
                        console.error('Failed to copy: ', err);
                    }
                });
            }
        });
    }

    addSocialSharing();

    // Certificate timeline view
    function createCertificateTimeline() {
        const timelineBtn = document.createElement('button');
        timelineBtn.className = 'btn btn-outline-secondary me-3';
        timelineBtn.innerHTML = '<i class="fas fa-timeline me-2"></i>Timeline View';
        
        const viewAllBtn = document.querySelector('[data-bs-target="#allCertificatesModal"]');
        if (viewAllBtn) {
            viewAllBtn.parentNode.insertBefore(timelineBtn, viewAllBtn);
        }

        timelineBtn.addEventListener('click', function() {
            // Create timeline modal
            const timelineModal = document.createElement('div');
            timelineModal.className = 'modal fade';
            timelineModal.id = 'certificateTimelineModal';
            timelineModal.innerHTML = `
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Certificate Timeline</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="timeline">
                                <div class="timeline-item">
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <h6>Google UX Design Professional Certificate</h6>
                                        <small class="text-muted">January 2024</small>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <h6>Adobe Certified Expert (ACE)</h6>
                                        <small class="text-muted">November 2023</small>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <h6>Advanced React Development</h6>
                                        <small class="text-muted">September 2023</small>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <h6>JavaScript Algorithms and Data Structures</h6>
                                        <small class="text-muted">August 2023</small>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <h6>AWS Cloud Practitioner</h6>
                                        <small class="text-muted">June 2023</small>
                                    </div>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-marker"></div>
                                    <div class="timeline-content">
                                        <h6>Responsive Web Design</h6>
                                        <small class="text-muted">March 2023</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(timelineModal);
            const modal = new bootstrap.Modal(timelineModal);
            modal.show();

            // Remove modal after hiding
            timelineModal.addEventListener('hidden.bs.modal', function() {
                document.body.removeChild(timelineModal);
            });
        });
    }

    createCertificateTimeline();

    console.log('Certificate section initialized successfully! 📜');
});