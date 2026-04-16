/* ========================================
   MENU MOBILE
======================================== */
const navMenu   = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.querySelectorAll('.nav-links a');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');

        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('show-menu')) {
            icon.classList.replace('bx-menu', 'bx-x');
        } else {
            icon.classList.replace('bx-x', 'bx-menu');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        const icon = navToggle.querySelector('i');
        icon.classList.replace('bx-x', 'bx-menu');
    });
});

/* ========================================
   ALTERNÂNCIA DE TEMA (CLARO / ESCURO)
======================================== */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon   = document.getElementById('theme-icon');
const html        = document.documentElement;

// Recupera tema salvo no localStorage (ou usa escuro como padrão)
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        // Tema escuro → mostra ícone de sol (para ir ao claro)
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    } else {
        // Tema claro → mostra ícone de lua (para ir ao escuro)
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    }
}

/* ========================================
   SCROLL REVEAL (IntersectionObserver)
======================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Desconecta após revelar para não re-animar ao rolar para cima
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.12,   // dispara quando 12% do elemento é visível
    rootMargin: '0px 0px -40px 0px' // antecipa um pouco antes do fundo da viewport
});

revealElements.forEach(el => revealObserver.observe(el));

/* ========================================
   NAVBAR: efeito de sombra ao rolar
======================================== */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.top = '0.5rem';
    } else {
        header.style.top = '1rem';
    }
});
