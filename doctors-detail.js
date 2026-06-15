/* ============================================================
   DOCTORS-DETAIL.JS — Lim Health Service
============================================================ */
(function () {
  'use strict';

  /* ── Toggle profile expanded section ── */
  window.toggleBio = function (btn) {
    const card     = btn.closest('.doc-card');
    const expanded = card.querySelector('.doc-expanded');
    if (!expanded) return;
    const isHidden = expanded.hidden;
    expanded.hidden = !isHidden;
    btn.textContent = isHidden ? 'Hide Profile' : 'View Profile';
  };

  /* ── Specialty filter ── */
  const specBtns  = document.querySelectorAll('.spec-btn');
  const docCards  = document.querySelectorAll('.doc-card');
  const noResults = document.getElementById('noResults');

  function applyFilters() {
    const activeSpec  = document.querySelector('.spec-btn.active')?.dataset.spec || 'all';
    const searchQuery = document.getElementById('docSearch')?.value.toLowerCase().trim() || '';
    let visible = 0;

    docCards.forEach(card => {
      const matchSpec  = activeSpec === 'all' || card.dataset.spec === activeSpec;
      const matchSearch = !searchQuery || card.dataset.name.includes(searchQuery) ||
                          card.querySelector('.doc-spec-tag')?.textContent.toLowerCase().includes(searchQuery);
      if (matchSpec && matchSearch) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noResults) noResults.hidden = visible > 0;
  }

  specBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      specBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
    });
  });

  const searchInput = document.getElementById('docSearch');
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  /* ── Fade-in cards ── */
  const obs = new IntersectionObserver(entries => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.opacity = '1';
        el.target.style.transform = 'translateY(0)';
        obs.unobserve(el.target);
      }
    });
  }, { threshold: 0.1 });

  docCards.forEach((c, i) => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(22px)';
    c.style.transition = `opacity .45s ease ${i * 0.08}s, transform .45s ease ${i * 0.08}s`;
    obs.observe(c);
  });

  /* ── Pre-filter from URL ── */
  const urlParams = new URLSearchParams(window.location.search);
  const preSpec   = urlParams.get('specialty');
  if (preSpec) {
    const matchBtn = Array.from(specBtns).find(b => b.dataset.spec === preSpec.toLowerCase());
    if (matchBtn) { matchBtn.click(); }
  }

})();
