/* ============================================
   PILLAR PHARMACY — script.js
============================================ */

// ---- LOADER ----
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 700);
  }
});

// ---- STICKY NAVBAR ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('open'));
  });
}

// ---- BACK TO TOP ----
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---- FADE-UP SCROLL ANIMATION ----
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

// ---- ANIMATED COUNTERS ----
const counters = document.querySelectorAll('.counter');
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute('data-target');
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target >= 1000 ? (target / 1000).toFixed(0) + 'K' : target;
          clearInterval(timer);
        } else {
          el.textContent = target >= 1000
            ? (current / 1000).toFixed(1).replace('.0', '')
            : Math.floor(current);
        }
      }, 16);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => countObserver.observe(c));

// ---- FAQ ACCORDION ----
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

// ---- CONTACT FORM (prevent default + show success) ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // We let the mailto action proceed, but show a confirmation
    const btn = contactForm.querySelector('.submit-btn');
    btn.textContent = 'Message Sent! ✔';
    btn.style.background = '#0a7c6a';
    btn.disabled = true;
  });
}

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
