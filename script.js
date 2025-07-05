// Language translations
const translations = {
    en: {
        title: "Student in Computer Systems and Networks",
        greeting: "Hi, I'm",
        aboutTitle: "About Me",
        projectsTitle: "Featured Projects",
        skillsTitle: "Technical Skills",
        certificatesTitle: "Professional Certificates",
        downloadCV: "Download CV",
        viewProjects: "View Projects",
        aboutMe: "About Me",
        phone: "Phone",
        contactInfo: "Contact Information",
        phoneLabel: "Phone Number:",
        copyright: "© 2025 Hamza Erziki. All rights reserved.",
        tagline: "Systems & Network Engineer"
    },
    fr: {
        title: "Étudiant en Systèmes et Réseaux Informatiques", 
        greeting: "Bonjour, je suis",
        aboutTitle: "À propos de moi",
        projectsTitle: "Projets Présentés",
        skillsTitle: "Compétences Techniques", 
        certificatesTitle: "Certificats Professionnels",
        downloadCV: "Télécharger CV",
        viewProjects: "Voir Projets",
        aboutMe: "À propos",
        phone: "Téléphone",
        contactInfo: "Informations de Contact",
        phoneLabel: "Numéro de Téléphone:",
        copyright: "© 2025 Hamza Erziki. Tous droits réservés.",
        tagline: "Ingénieur Systèmes & Réseaux"
    }
};

// Global variables
let currentLanguage = 'en';
let typewriterIndex = 0;
let typewriterText = '';
let isDeleting = false;
let typewriterTimeout;

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const languageToggle = document.getElementById('languageToggle');
const typewriterElement = document.getElementById('typewriter');
const navbar = document.getElementById('navbar');
const phoneModal = document.getElementById('phoneModal');
const footerPhone = document.getElementById('footerPhone');
const phoneModalContainer = document.getElementById('phoneModalContainer');
const closeModal = document.getElementById('closeModal');
const downloadCV = document.getElementById('downloadCV');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    startTypewriter();
    setupScrollAnimations();
    setupNavbarScroll();
}

function setupEventListeners() {
    // Hamburger menu
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Language toggle
    languageToggle.addEventListener('click', toggleLanguage);
    
    // Phone modal
    phoneModal.addEventListener('click', openPhoneModal);
    footerPhone.addEventListener('click', openPhoneModal);  
    closeModal.addEventListener('click', closePhoneModal);
    phoneModalContainer.addEventListener('click', function(e) {
        if (e.target === phoneModalContainer) {
            closePhoneModal();
        }
    });
    
    // Navigation links smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Download CV
    downloadCV.addEventListener('click', downloadCVFile);
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
    updateLanguage();
    restartTypewriter();
}

function updateLanguage() {
    // Update elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        const enText = element.getAttribute('data-en');
        const frText = element.getAttribute('data-fr');
        element.textContent = currentLanguage === 'en' ? enText : frText;
    });
    
    // Show/hide language-specific content
    document.querySelectorAll('[data-lang]').forEach(element => {
        const lang = element.getAttribute('data-lang');
        element.style.display = lang === currentLanguage ? 'block' : 'none';
    });
    
    // Update language toggle appearance
    languageToggle.innerHTML = currentLanguage === 'en' 
        ? '<span class="flag">🇫🇷</span> FR'
        : '<span class="flag">🇬🇧</span> EN';
}

function startTypewriter() {
    const texts = [
        translations[currentLanguage].title
    ];
    
    function type() {
        const currentText = texts[0];
        
        if (isDeleting) {
            typewriterText = currentText.substring(0, typewriterText.length - 1);
        } else {
            typewriterText = currentText.substring(0, typewriterText.length + 1);
        }
        
        typewriterElement.textContent = typewriterText;
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && typewriterText === currentText) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && typewriterText === '') {
            isDeleting = false;
            typeSpeed = 500;
        }
        
        typewriterTimeout = setTimeout(type, typeSpeed);
    }
    
    type();
}

function restartTypewriter() {
    clearTimeout(typewriterTimeout);
    typewriterText = '';
    isDeleting = false;
    startTypewriter();
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add animation classes and observe elements
    document.querySelectorAll('.project-card, .skill-category, .certificate-card').forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    document.querySelectorAll('.about-image').forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });
    
    document.querySelectorAll('.about-text').forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
}

function setupNavbarScroll() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
    
    closeMobileMenu();
}

function openPhoneModal() {
    phoneModalContainer.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePhoneModal() {
    phoneModalContainer.classList.remove('active');
    document.body.style.overflow = '';
}

function downloadCVFile() {
    // Use the uploaded CV image
    const link = document.createElement('a');
    link.href = '/lovable-uploads/67651a44-1d5e-44bc-b784-fa1d736f0d32.png';
    link.download = 'Hamza_Erziki_CV.png';
    link.click();
}

function scrollToCertificates() {
    const certificatesSection = document.getElementById('certificates');
    if (certificatesSection) {
        const offsetTop = certificatesSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePhoneModal();
        closeMobileMenu();
    }
});

// Performance optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Additional scroll-based functionality can be added here
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Console welcome message
console.log(`
🚀 Welcome to Hamza Erziki's Portfolio!
👨‍💻 Systems & Network Engineer
🔧 Specialized in: Network Security, Virtualization, Monitoring
📫 Contact: hamzaerziki@outlook.com
🔗 LinkedIn: linkedin.com/in/hamza-erziki

Built with ❤️ using HTML, CSS, and JavaScript
`);
