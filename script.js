// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active nav link based on scroll position
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.skill-item, .project-card, .info-item');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on page load

// Form submission
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Mensaje enviado con éxito!');
                this.reset();
            } else {
                throw new Error('Error al enviar el mensaje');
            }
        })
        .catch(error => {
            alert('Hubo un error al enviar el mensaje. Por favor inténtalo de nuevo.');
            console.error(error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        });
    });
}