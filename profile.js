/* ============================================================
   PROFILE.JS — Lim Health Service
============================================================ */
(function () {
  'use strict';

  /* ── Tab navigation ── */
  const navLinks  = document.querySelectorAll('.snav-link');
  const tabPanels = document.querySelectorAll('.tab-panel');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const tab = link.dataset.tab;

      navLinks.forEach(l => l.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      link.classList.add('active');
      const panel = document.getElementById('tab-' + tab);
      if (panel) panel.classList.add('active');
    });
  });

  /* ── Hash-based deep linking ── */
  function activateFromHash() {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const link = document.querySelector(`.snav-link[data-tab="${hash}"]`);
      if (link) link.click();
    }
  }
  activateFromHash();
  window.addEventListener('hashchange', activateFromHash);

  /* ── Animated stat counters ── */
  const statNums = document.querySelectorAll('.psn');
  const counterObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + 1, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(timer);
      }, 60);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  statNums.forEach(n => counterObs.observe(n));

  /* ── Appointment filter ── */
  const afBtns   = document.querySelectorAll('.af-btn');
  const apptItems = document.querySelectorAll('.appt-item');

  afBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      afBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.af;
      apptItems.forEach(item => {
        item.classList.toggle('hidden', filter !== 'all' && item.dataset.status !== filter);
      });
    });
  });

  // Default: show only upcoming
  document.querySelector('.af-btn[data-af="upcoming"]')?.click();

  /* ── Animate metric bars on tab open ── */
  function animateMetrics() {
    document.querySelectorAll('.metric-fill').forEach(bar => {
      const target = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => { bar.style.width = target; }, 100);
    });
  }

  const overviewLink = document.querySelector('.snav-link[data-tab="overview"]');
  if (overviewLink) {
    overviewLink.addEventListener('click', () => setTimeout(animateMetrics, 150));
  }
  // Animate on initial load
  setTimeout(animateMetrics, 600);

  /* ── Settings form ── */
  document.getElementById('settingsForm')?.addEventListener('submit', e => {
    e.preventDefault();

    // Update sidebar name and email live
    const firstName = document.getElementById('sFirst')?.value.trim();
    const lastName  = document.getElementById('sLast')?.value.trim();
    const email     = document.getElementById('sEmail')?.value.trim();

    const sidebarName  = document.getElementById('sidebarName');
    const sidebarEmail = document.getElementById('sidebarEmail');

    if (sidebarName && (firstName || lastName)) {
      sidebarName.textContent = [firstName, lastName].filter(Boolean).join(' ');
    }
    if (sidebarEmail && email) {
      sidebarEmail.textContent = email;
    }

    const btn = e.target.querySelector('.btn-primary');
    const original = btn.textContent;
    btn.textContent = '✓ Saved!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 2200);
  });

  /* ── Logout ── */
  document.getElementById('logoutBtn')?.addEventListener('click', () => {
    if (confirm('Are you sure you want to log out?')) {
      window.location.href = 'main.html';
    }
  });

  /* ── Appointment action buttons ── */
  document.querySelectorAll('.appt-btns .btn-danger-ghost').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.appt-item');
      if (confirm('Cancel this appointment?')) {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all .35s ease';
        setTimeout(() => item.remove(), 350);
      }
    });
  });

})();
