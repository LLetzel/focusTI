/* ════════════════════════════════════════
   NAVBAR SCROLL EFFECT
════════════════════════════════════════ */
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ════════════════════════════════════════
   MOBILE MENU TOGGLE
════════════════════════════════════════ */
function toggleMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
}

hamburger.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu();
});

// Close menu when link is clicked
document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  const isMenuOpen = navMenu.classList.contains('active');
  const isClickInsideNav = e.target.closest('.navbar');

  if (isMenuOpen && !isClickInsideNav) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  }
});

/* ════════════════════════════════════════
   SMOOTH SCROLL FOR ANCHOR LINKS
════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
    }
  });
});

/* ════════════════════════════════════════
   FORM SUBMISSION
════════════════════════════════════════ */
const contatoForm = document.getElementById('contatoForm');

if (contatoForm) {
  contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const empresa = document.getElementById('empresa').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    // Validation
    if (!nome || !email || !empresa || !mensagem) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, insira um email válido');
      return;
    }

    // Simulate form submission
    const btn = contatoForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    setTimeout(() => {
      alert(`Obrigado ${nome}! Sua mensagem foi enviada com sucesso.\nEntraremos em contato em breve.`);
      contatoForm.reset();
      btn.textContent = originalText;
      btn.disabled = false;
    }, 800);
  });
}

/* ════════════════════════════════════════
   INTERSECTION OBSERVER - REVEAL ANIMATIONS
════════════════════════════════════════ */
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 50);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.servico-card, .stat-box, .info-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
  observer.observe(el);
});

/* ════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
════════════════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-link:not(.btn-contact)');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent)';
    } else {
      link.style.color = 'rgba(255, 255, 255, 0.8)';
    }
  });
});

/* ════════════════════════════════════════
   PARALLAX EFFECT FOR IMAGES
════════════════════════════════════════ */
window.addEventListener('scroll', () => {
  const images = document.querySelectorAll('.bg-img, .sobre-image img');
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const offset = (window.innerHeight - rect.top) * 0.08;
      img.style.transform = `translateY(${offset}px)`;
    }
  });
});

/* ════════════════════════════════════════
   BUTTON INTERACTIONS
════════════════════════════════════════ */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px)';
  });

  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

/* ════════════════════════════════════════
   FORM INPUT FOCUS EFFECTS
════════════════════════════════════════ */
document.querySelectorAll('.form-input').forEach(input => {
  input.addEventListener('focus', function() {
    this.style.boxShadow = '0 0 0 4px rgba(0, 212, 255, 0.15)';
  });

  input.addEventListener('blur', function() {
    this.style.boxShadow = 'none';
  });
});

/* ════════════════════════════════════════
   PAGE LOAD ANIMATIONS
════════════════════════════════════════ */
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Add initial opacity styles
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
  });
}
