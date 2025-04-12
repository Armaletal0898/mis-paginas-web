
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

const contactForm = document.getElementById('contactForm');
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');

formInputs.forEach(input => {
    
    if (input.value.trim() !== '') {
        input.classList.add('has-content');
    }
    
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.add('has-content');
        } else {
            this.classList.remove('has-content');
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    
    let isValid = true;
    let errorMessage = '';
    
    if (!nombre) {
        isValid = false;
        errorMessage += '- Debes ingresar tu nombre\n';
        document.getElementById('nombre').classList.add('error');
    } else {
        document.getElementById('nombre').classList.remove('error');
    }
    
    if (!email) {
        isValid = false;
        errorMessage += '- Debes ingresar tu email\n';
        document.getElementById('email').classList.add('error');
    } else if (!isValidEmail(email)) {
        isValid = false;
        errorMessage += '- Email inválido\n';
        document.getElementById('email').classList.add('error');
    } else {
        document.getElementById('email').classList.remove('error');
    }
    
    if (!mensaje) {
        isValid = false;
        errorMessage += '- Debes ingresar un mensaje';
        document.getElementById('mensaje').classList.add('error');
    } else {
        document.getElementById('mensaje').classList.remove('error');
    }
    
    if (!isValid) {
        alert('Por favor, corrige los siguientes errores:\n' + errorMessage);
        return;
    }
    
    alert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.');
    contactForm.reset();
    formInputs.forEach(input => input.classList.remove('has-content'));
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
