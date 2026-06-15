/* ============================================================
   ABOUT-US.JS — Lim Health Service
============================================================ */
(function () {
  'use strict';

  /* ── Fade-in cards on scroll ── */
  const cards = document.querySelectorAll('.mv-card, .team-card, .award-item, .story-text');
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
    c.style.transform = 'translateY(24px)';
    c.style.transition = `opacity .5s ease ${i * 0.08}s, transform .5s ease ${i * 0.08}s`;
    obs.observe(c);
  });

  /* ── Animated counters in story stats ── */
  const statNums = document.querySelectorAll('.sn');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const raw = el.textContent.replace(/[^0-9]/g, '');
      const suffix = el.textContent.replace(/[0-9]/g, '');
      const target = parseInt(raw, 10);
      if (isNaN(target)) return;

      let start = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = start + suffix;
        if (start >= target) clearInterval(timer);
      }, 40);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(n => counterObs.observe(n));

})();
