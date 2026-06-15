/* ============================================================
   SERVICES.JS — Lim Health Service
============================================================ */
(function () {
  'use strict';

  /* ── Filter functionality ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const svcCards   = document.querySelectorAll('.svc-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      svcCards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn .35s ease both';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── Fade-in on scroll ── */
  const cards = document.querySelectorAll('.svc-card, .step-item');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.opacity = '1';
        el.target.style.transform = 'translateY(0)';
        obs.unobserve(el.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(22px)';
    c.style.transition = `opacity .45s ease ${i * 0.07}s, transform .45s ease ${i * 0.07}s`;
    obs.observe(c);
  });

  /* ── Pre-select service from URL param ── */
  const urlParams = new URLSearchParams(window.location.search);
  const preService = urlParams.get('service');
  if (preService) {
    const matchCard = Array.from(svcCards).find(c =>
      c.querySelector('.svc-title')?.textContent.toLowerCase().includes(preService.toLowerCase())
    );
    if (matchCard) {
      setTimeout(() => matchCard.scrollIntoView({ behavior: 'smooth', block: 'center' }), 500);
    }
  }

})();
