/* ============================================================
   SPLASH.JS — Lim Health Service
============================================================ */
(function () {
  'use strict';

  const REDIRECT_DELAY = 3800; // ms total
  const bar     = document.getElementById('progressBar');
  const label   = document.getElementById('loadingText');
  const container = document.getElementById('splashContainer');

  const stages = [
    { pct: 20,  text: 'Loading resources...' },
    { pct: 45,  text: 'Connecting to services...' },
    { pct: 68,  text: 'Verifying clinic data...' },
    { pct: 88,  text: 'Almost ready...' },
    { pct: 100, text: 'Welcome to Lim Health!' },
  ];

  let stageIndex = 0;
  const interval = setInterval(() => {
    if (stageIndex >= stages.length) {
      clearInterval(interval);
      return;
    }
    const stage = stages[stageIndex];
    bar.style.width = stage.pct + '%';
    label.textContent = stage.text;

    // Update aria
    const progressWrap = bar.parentElement;
    progressWrap.setAttribute('aria-valuenow', stage.pct);

    stageIndex++;
  }, REDIRECT_DELAY / stages.length);

  // Redirect after delay
  setTimeout(() => {
    container.classList.add('fade-out');
    setTimeout(() => {
      window.location.href = 'main.html';
    }, 650);
  }, REDIRECT_DELAY);

})();
