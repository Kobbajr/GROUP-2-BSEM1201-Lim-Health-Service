/* ============================================================
   MAIN.JS — Lim Health Service
============================================================ */
(function () {
  'use strict';

  /* ── Mobile burger menu ── */
  const burger    = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
    });
  }

  /* ── Active nav on scroll ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.main-nav a');
  const observer  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.remove('active');
          if (a.getAttribute('href') === '#' + entry.target.id ||
              a.getAttribute('href') === entry.target.id) {
            a.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-38% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));

  /* ── Header scroll shadow ── */
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) header.style.boxShadow = '0 4px 30px rgba(0,0,0,.5)';
    else header.style.boxShadow = 'none';
  }, { passive: true });

  /* ── Testimonial slider ── */
  const slides   = document.querySelectorAll('.rv-slide');
  const dots     = document.querySelectorAll('.rv-dot');
  let current    = 0;
  let autoTimer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  function startAuto() { autoTimer = setInterval(() => goTo(current + 1), 5200); }
  function resetAuto()  { clearInterval(autoTimer); startAuto(); }

  const rvNext = document.getElementById('rvNext');
  const rvPrev = document.getElementById('rvPrev');
  if (rvNext) rvNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  if (rvPrev) rvPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetAuto(); }));
  if (slides.length) startAuto();

  /* ── Quick booking redirect with params ── */
  const quickBookBtn = document.getElementById('quickBookBtn');
  if (quickBookBtn) {
    quickBookBtn.addEventListener('click', function (e) {
      const date    = document.getElementById('a-date')?.value;
      const doctor  = document.getElementById('a-doctor')?.value;
      const service = document.getElementById('a-service')?.value;
      if (date || doctor || service) {
        e.preventDefault();
        const params = new URLSearchParams({ date, doctor, service });
        window.location.href = 'book-appointment.html?' + params.toString();
      }
    });
  }

  /* ── Fade-in on scroll ── */
  const fadeEls = document.querySelectorAll('.doc-card, .svc-card, .reviews-box, .support-box');
  const fadeObs = new IntersectionObserver(entries => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.opacity = '1';
        el.target.style.transform = 'translateY(0)';
        fadeObs.unobserve(el.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    fadeObs.observe(el);
  });

})();
