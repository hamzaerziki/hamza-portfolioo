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
    // Create a simple CV image download
    const link = document.createElement('a');
    link.href = 'data:image/svg+xml;base64,' + btoa(`
        <svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%" fill="#0A0A0A"/>
            <text x="400" y="100" text-anchor="middle" fill="#1EAEDB" font-size="40" font-family="Arial">Hamza Erziki</text>
            <text x="400" y="140" text-anchor="middle" fill="#9B87F5" font-size="20" font-family="Arial">Systems &amp; Network Engineer</text>
            <text x="50" y="200" fill="#FFFFFF" font-size="16" font-family="Arial">Email: hamzaerziki@outlook.com</text>
            <text x="50" y="230" fill="#FFFFFF" font-size="16" font-family="Arial">LinkedIn: linkedin.com/in/hamza-erziki</text>
            <text x="50" y="280" fill="#1EAEDB" font-size="18" font-family="Arial">Skills:</text>
            <text x="50" y="310" fill="#FFFFFF" font-size="14" font-family="Arial">• Network Security (F5, FortiGate, pfSense)</text>
            <text x="50" y="330" fill="#FFFFFF" font-size="14" font-family="Arial">• Virtualization (VMware, Docker)</text>
            <text x="50" y="350" fill="#FFFFFF" font-size="14" font-family="Arial">• Monitoring (Zabbix, Grafana)</text>
            <text x="50" y="370" fill="#FFFFFF" font-size="14" font-family="Arial">• System Administration</text>
            <text x="50" y="420" fill="#1EAEDB" font-size="18" font-family="Arial">Education:</text>
            <text x="50" y="450" fill="#FFFFFF" font-size="14" font-family="Arial">Student in Computer Systems and Networks</text>
            <text x="50" y="470" fill="#FFFFFF" font-size="14" font-family="Arial">OFPPT Morocco</text>
        </svg>
    `);
    link.download = 'Hamza_Erziki_CV.svg';
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
