/* ============================================================
   AUTH.JS — Lim Health Service
============================================================ */
(function () {
  'use strict';

  /* ── Tab switching ── */
  const tabLogin    = document.getElementById('tabLogin');
  const tabRegister = document.getElementById('tabRegister');
  const panelLogin  = document.getElementById('panelLogin');
  const panelReg    = document.getElementById('panelRegister');

  function showTab(tab) {
    if (tab === 'login') {
      tabLogin.classList.add('active');    tabLogin.setAttribute('aria-selected','true');
      tabRegister.classList.remove('active'); tabRegister.setAttribute('aria-selected','false');
      panelLogin.classList.add('active');  panelReg.classList.remove('active');
    } else {
      tabRegister.classList.add('active'); tabRegister.setAttribute('aria-selected','true');
      tabLogin.classList.remove('active'); tabLogin.setAttribute('aria-selected','false');
      panelReg.classList.add('active');    panelLogin.classList.remove('active');
    }
  }

  tabLogin.addEventListener('click',    () => showTab('login'));
  tabRegister.addEventListener('click', () => showTab('register'));

  // Support hash-based direct register link
  if (window.location.hash === '#register') showTab('register');

  /* ── Password visibility toggles ── */
  document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
      btn.textContent = input.type === 'password' ? '👁' : '🙈';
    });
  });

  /* ── Password strength ── */
  const regPass = document.getElementById('regPass');
  const psFill  = document.getElementById('psFill');
  const psLabel = document.getElementById('psLabel');

  if (regPass) {
    regPass.addEventListener('input', () => {
      const v = regPass.value;
      let score = 0;
      if (v.length >= 8) score++;
      if (/[A-Z]/.test(v)) score++;
      if (/[0-9]/.test(v)) score++;
      if (/[^A-Za-z0-9]/.test(v)) score++;

      const map = [
        { pct: 0,   color: '',          label: '' },
        { pct: 25,  color: '#ef4444',   label: 'Weak' },
        { pct: 50,  color: '#f59e0b',   label: 'Fair' },
        { pct: 75,  color: '#3b82f6',   label: 'Good' },
        { pct: 100, color: '#10B981',   label: 'Strong' },
      ];
      const s = map[score];
      psFill.style.width     = s.pct + '%';
      psFill.style.background = s.color;
      psLabel.textContent    = s.label;
    });
  }

  /* ── Helper: show error ── */
  function setErr(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErr(id) { setErr(id, ''); }

  /* ── Toast ── */
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg, type = 'success') {
    toast.textContent = msg;
    toast.className   = 'toast show' + (type === 'error' ? ' error' : '');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
  }

  /* ── Mark input error ── */
  function markInput(id, hasError) {
    const el = document.getElementById(id);
    if (!el) return;
    if (hasError) el.classList.add('error');
    else el.classList.remove('error');
  }

  /* ── LOGIN form ── */
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const email = document.getElementById('loginEmail').value.trim();
      const pass  = document.getElementById('loginPass').value;

      clearErr('loginEmailErr'); clearErr('loginPassErr');
      markInput('loginEmail', false); markInput('loginPass', false);

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErr('loginEmailErr', 'Please enter a valid email address.');
        markInput('loginEmail', true); valid = false;
      }
      if (!pass || pass.length < 6) {
        setErr('loginPassErr', 'Password must be at least 6 characters.');
        markInput('loginPass', true); valid = false;
      }

      if (valid) {
        const btn = loginForm.querySelector('.btn-auth');
        btn.disabled = true;
        btn.textContent = 'Signing in...';
        setTimeout(() => {
          showToast('✓ Login successful! Redirecting...');
          setTimeout(() => { window.location.href = 'profile.html'; }, 1200);
        }, 900);
      }
    });
  }

  /* ── REGISTER form ── */
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      const first   = document.getElementById('regFirst').value.trim();
      const email   = document.getElementById('regEmail').value.trim();
      const pass    = document.getElementById('regPass').value;
      const confirm = document.getElementById('regConfirm').value;
      const terms   = document.getElementById('regTerms').checked;

      clearErr('regFirstErr'); clearErr('regEmailErr'); clearErr('regPassErr'); clearErr('regConfirmErr');

      if (!first) { setErr('regFirstErr', 'First name is required.'); valid = false; }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setErr('regEmailErr', 'Enter a valid email.'); valid = false;
      }
      if (!pass || pass.length < 8) {
        setErr('regPassErr', 'Password must be at least 8 characters.'); valid = false;
      }
      if (pass !== confirm) {
        setErr('regConfirmErr', 'Passwords do not match.'); valid = false;
      }
      if (!terms) {
        showToast('Please accept the Terms & Conditions.', 'error'); valid = false;
      }

      if (valid) {
        const btn = registerForm.querySelector('.btn-auth');
        btn.disabled = true;
        btn.textContent = 'Creating account...';
        setTimeout(() => {
          showToast('✓ Account created! Welcome to Lim Health.');
          setTimeout(() => { window.location.href = 'profile.html'; }, 1400);
        }, 1000);
      }
    });
  }

})();
