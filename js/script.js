// ==================== PROFILE IMAGE FLOATING ANIMATION ====================
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.querySelector('.profile-img');

    if (profileImg) {
        // Ensure the floating animation is applied
        profileImg.style.animation = 'floatProfile 4s ease-in-out infinite';

        // Add hover effect to pause animation
        profileImg.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
        });

        profileImg.addEventListener('mouseleave', function() {
            this.style.animation = 'floatProfile 4s ease-in-out infinite';
        });
    }

    // Also animate the wrapper background
    const profileWrapper = document.querySelector('.profile-wrapper');
    if (profileWrapper) {
        const beforeElement = profileWrapper.querySelector('::before');
        profileWrapper.style.setProperty('--float-animation', 'floatProfile 4s ease-in-out infinite');
    }
});

// ==================== CURSOR GLOW EFFECT ====================
const body = document.body;
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Move the glow effect with cursor
    body.style.setProperty('--mouse-x', mouseX + 'px');
    body.style.setProperty('--mouse-y', mouseY + 'px');
});

// Add glow effect when mouse is over the page
document.addEventListener('mouseenter', () => {
    body.classList.add('show-glow');
});

document.addEventListener('mouseleave', () => {
    body.classList.remove('show-glow');
});

// Update glow position using CSS custom properties
const style = document.createElement('style');
style.textContent = `
    body::before {
        left: var(--mouse-x, 0);
        top: var(--mouse-y, 0);
        transform: translate(-50%, -50%);
    }

    /* Ensure floating animation is always active */
    .profile-img {
        animation: floatProfile 4s ease-in-out infinite !important;
    }

    .profile-wrapper::before {
        animation: floatProfile 4s ease-in-out infinite !important;
    }

    /* Stop animation on hover */
    .profile-img:hover {
        animation: none !important;
    }
`;
document.head.appendChild(style);

// ==================== SECTION GLOW EFFECT ====================
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, {
    threshold: 0.3
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ==================== SCROLL REVEAL ANIMATIONS ====================
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements that should animate
    const reveals = document.querySelectorAll(
        '.section-title, .section-subtitle, .skill-card, .project-card, ' +
        '.more-card, .contact-card, .contact-item, .language-item, .interest-tags span'
    );

    const reveal = () => {
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const elementVisible = 150;

            // When element comes into view
            if (elementTop < windowHeight - elementVisible && elementBottom > 0) {
                element.classList.add('active');
            }
            // When element leaves view (remove and re-add for animation replay)
            else if (elementTop > windowHeight || elementBottom < 0) {
                element.classList.remove('active');
            }
        });
    };

    // Run reveal on load and scroll
    reveal();
    window.addEventListener('scroll', reveal);

    // Add reveal class for animation
    reveals.forEach(el => {
        el.classList.add('reveal');
    });
});

// ==================== SMOOTH SCROLL NAVIGATION ====================
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

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 3px 20px rgba(0,0,0,0.04)';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ==================== ACTIVE NAVBAR LINK ====================
const navLinks = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('section');

function updateActiveNav() {
    let current = '';
    let maxOffset = -1;

    allSections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');

        // If section is above current scroll position, consider it
        if (window.pageYOffset >= sectionTop - 100) {
            if (sectionTop > maxOffset) {
                maxOffset = sectionTop;
                current = sectionId;
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Set active link
    if (current) {
        const activeLink = document.querySelector(`.nav-link[href="#${current}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Update frequently on scroll for smooth transitions
window.addEventListener('scroll', updateActiveNav, { passive: true });

// Update on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateActiveNav);
} else {
    updateActiveNav();
}

// ==================== BUTTON HOVER EFFECTS ====================
const buttons = document.querySelectorAll('.download-btn');

buttons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.style.setProperty('--ripple-x', `${x}px`);
        this.style.setProperty('--ripple-y', `${y}px`);
    });
});

// ==================== PARALLAX EFFECT ====================
const parallaxSections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    parallaxSections.forEach(section => {
        let scrollPosition = window.pageYOffset;
        let elementPosition = section.offsetTop;
        let parallax = (scrollPosition - elementPosition) * 0.5;

        if (scrollPosition < elementPosition + window.innerHeight) {
            section.style.backgroundPosition = `0 ${parallax}px`;
        }
    });
});

// ==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ==================== COUNTER ANIMATION ====================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count')) || 0;
    const duration = 2000;
    const start = Date.now();

    function update() {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = value;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    update();
}

// Run counter animations when elements come into view
document.querySelectorAll('[data-count]').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animateCounter(entry.target);
                entry.target.dataset.animated = 'true';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    observer.observe(el);
});

// ==================== MOBILE MENU ANIMATION ====================
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarMenu = document.querySelector('#navbarMenu');

if (navbarToggler && navbarMenu) {
    navbarToggler.addEventListener('click', () => {
        if (navbarMenu.classList.contains('show')) {
            navbarMenu.style.animation = 'slideDown 0.4s ease-out reverse';
        } else {
            navbarMenu.style.animation = 'slideDown 0.4s ease-out';
        }
    });
}

// ==================== LAZY LOAD IMAGES ====================
const images = document.querySelectorAll('img');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.animation = 'fadeInUp 0.6s ease-out';
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== SKILL TAG INTERACTIONS ====================
const skillTags = document.querySelectorAll('.skill-tags span');

skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ==================== PROJECT TAG INTERACTIONS ====================
const projectTags = document.querySelectorAll('.project-tags span');

projectTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ==================== INTEREST TAG INTERACTIONS ====================
const interestTags = document.querySelectorAll('.interest-tags span');

interestTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) translateY(-3px)';
    });

    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// ==================== FORM VALIDATION ====================
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                input.style.animation = 'shake 0.5s ease-in-out';
                isValid = false;
            } else {
                input.style.borderColor = '#2563eb';
            }
        });

        if (isValid) {
            console.log('Form submitted successfully');
        }
    });
}

// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== SMOOTH TRANSITION ON PAGE LOAD ====================
window.addEventListener('load', function() {
    document.body.style.animation = 'fadeInUp 0.6s ease-out';
});

// ==================== CUSTOMIZE ANIMATION SPEEDS ====================
// You can modify these variables to adjust animation speeds
const animationConfig = {
    duration: {
        fast: '0.3s',
        normal: '0.6s',
        slow: '1s'
    },
    ease: {
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out'
    }
};

// Export for use in other scripts
window.animationConfig = animationConfig;

// ==================== SMOOTH SCROLL TRANSITION GLOW ====================
let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    body.classList.add('scrolling');

    scrollTimeout = setTimeout(() => {
        body.classList.remove('scrolling');
    }, 300);
});

// Add scrolling class style
const scrollStyle = document.createElement('style');
scrollStyle.textContent = `
    body.scrolling::before {
        opacity: 1.2 !important;
        filter: blur(50px) brightness(1.1) !important;
    }
`;
document.head.appendChild(scrollStyle);

// ==================== SCROLL PROGRESS INDICATOR ====================
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #1d4ed8);
        width: 0%;
        z-index: 1000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
    `;

    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ==================== SECTION TRANSITION INDICATOR ====================
function createSectionIndicator() {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        right: 0;
        top: 50%;
        width: 3px;
        height: 100px;
        background: linear-gradient(180deg, transparent, rgba(37, 99, 235, 0.6), transparent);
        transform: translateY(-50%);
        pointer-events: none;
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

    document.body.appendChild(indicator);

    window.addEventListener('scroll', () => {
        indicator.style.opacity = '1';
        setTimeout(() => {
            indicator.style.opacity = '0';
        }, 500);
    });
}

// ==================== SCROLL TO TOP BUTTON ====================
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="bi bi-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function() {
        this.style.background = '#1d4ed8';
        this.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.background = '#2563eb';
        this.style.transform = 'scale(1)';
    });
}

// Initialize all features on page load
window.addEventListener('load', () => {
    createScrollToTopButton();
    createScrollProgressBar();
    createSectionIndicator();
});
