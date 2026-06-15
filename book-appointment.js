/* ============================================================
   BOOK-APPOINTMENT.JS — Lim Health Service
============================================================ */
(function () {
  'use strict';

  /* ── State ── */
  const state = {
    step: 1,
    selectedTime: '',
    firstName: '', lastName: '', email: '', phone: '',
    service: '', doctor: '', date: '', visitType: 'in-person',
    notes: ''
  };

  /* ── DOM refs ── */
  const stepNodes  = document.querySelectorAll('.step-node');
  const stepLines  = document.querySelectorAll('.step-line');
  const formSteps  = document.querySelectorAll('.form-step');
  const timeSlots  = document.querySelectorAll('.time-slot');
  const successModal = document.getElementById('successModal');

  /* ── Pre-fill from URL params ── */
  const params = new URLSearchParams(window.location.search);
  if (params.get('doctor'))  { const el = document.getElementById('bDoctor');  if (el) { for (let i=0;i<el.options.length;i++) { if (el.options[i].text.startsWith(params.get('doctor'))) { el.selectedIndex=i; break; } } } }
  if (params.get('service')) { const el = document.getElementById('bService'); if (el) { for (let i=0;i<el.options.length;i++) { if (el.options[i].text === params.get('service')) { el.selectedIndex=i; break; } } } }
  if (params.get('date'))    { const el = document.getElementById('bDate');    if (el) el.value = params.get('date'); }

  /* ── Step navigation ── */
  function showStep(n) {
    state.step = n;
    formSteps.forEach((s, i) => s.classList.toggle('active', i + 1 === n));
    stepNodes.forEach((node, i) => {
      node.classList.toggle('active', i + 1 === n);
      node.classList.toggle('done',   i + 1 < n);
    });
    stepLines.forEach((line, i) => line.classList.toggle('done', i + 1 < n));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ── Validation helpers ── */
  function setErr(id, msg) { const el = document.getElementById(id); if (el) el.textContent = msg; }
  function clearErr(id)    { setErr(id, ''); }
  function markErr(id, has) { const el = document.getElementById(id); if (el) el.classList.toggle('error', has); }

  /* ── Step 1 → 2 ── */
  document.getElementById('toStep2Btn')?.addEventListener('click', () => {
    let ok = true;
    const first = document.getElementById('bFirstName').value.trim();
    const last  = document.getElementById('bLastName').value.trim();
    const email = document.getElementById('bEmail').value.trim();
    const phone = document.getElementById('bPhone').value.trim();

    clearErr('errFirstName'); clearErr('errEmail');
    markErr('bFirstName', false); markErr('bEmail', false);

    if (!first) { setErr('errFirstName', 'First name is required.'); markErr('bFirstName', true); ok = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setErr('errEmail', 'Valid email required.'); markErr('bEmail', true); ok = false; }
    if (!phone) { ok = false; }

    if (ok) {
      state.firstName = first; state.lastName = last;
      state.email = email; state.phone = phone;
      state.notes = document.getElementById('bNotes')?.value || '';
      showStep(2);
    }
  });

  /* ── Time slot selection ── */
  timeSlots.forEach(slot => {
    if (slot.disabled) return;
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      state.selectedTime = slot.dataset.time;
      clearErr('errTime');
    });
  });

  /* ── Step 2 → 3 ── */
  document.getElementById('toStep3Btn')?.addEventListener('click', () => {
    let ok = true;
    const service = document.getElementById('bService').value;
    const doctor  = document.getElementById('bDoctor').value;
    const date    = document.getElementById('bDate').value;

    clearErr('errService'); clearErr('errDoctor'); clearErr('errDate'); clearErr('errTime');

    if (!service) { setErr('errService', 'Please select a service.'); ok = false; }
    if (!doctor)  { setErr('errDoctor', 'Please select a doctor.');  ok = false; }
    if (!date)    { setErr('errDate', 'Please select a date.');      ok = false; }
    if (!state.selectedTime) { setErr('errTime', 'Please select a time slot.'); ok = false; }

    if (ok) {
      state.service = service;
      state.doctor  = doctor;
      state.date    = date;
      state.visitType = document.querySelector('input[name="visitType"]:checked')?.value || 'in-person';
      buildConfirmSummary();
      showStep(3);
    }
  });

  /* ── Back buttons ── */
  document.getElementById('backToStep1Btn')?.addEventListener('click', () => showStep(1));
  document.getElementById('backToStep2Btn')?.addEventListener('click', () => showStep(2));

  /* ── Build confirm summary ── */
  function buildConfirmSummary() {
    const box = document.getElementById('confirmSummary');
    if (!box) return;
    const rows = [
      ['Patient',      `${state.firstName} ${state.lastName}`],
      ['Email',        state.email],
      ['Phone',        state.phone],
      ['Service',      state.service],
      ['Doctor',       state.doctor],
      ['Date',         formatDate(state.date)],
      ['Time',         state.selectedTime, 'cs-highlight'],
      ['Visit Type',   state.visitType === 'virtual' ? '💻 Virtual' : '🏥 In-Person'],
    ];
    box.innerHTML = rows.map(([label, value, cls='']) =>
      `<div class="cs-row"><span class="cs-label">${label}</span><span class="cs-value ${cls}">${value || '—'}</span></div>`
    ).join('');
  }

  function formatDate(d) {
    if (!d) return '—';
    const date = new Date(d + 'T12:00:00');
    return date.toLocaleDateString('en-US', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  }

  /* ── Form submit ── */
  document.getElementById('bookingForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const consent = document.getElementById('consentCheck');
    if (!consent?.checked) {
      consent.parentElement.style.color = '#ef4444';
      setTimeout(() => consent.parentElement.style.color = '', 2000);
      return;
    }

    const btn = document.getElementById('submitBtn');
    btn.disabled = true;
    btn.textContent = 'Processing...';

    setTimeout(() => {
      // Update modal summary
      const mText = document.getElementById('modalSummaryText');
      if (mText) {
        mText.textContent = `Your ${state.service} appointment with ${state.doctor} is confirmed for ${formatDate(state.date)} at ${state.selectedTime}. A confirmation has been sent to ${state.email}.`;
      }
      successModal.hidden = false;
    }, 1200);
  });

  /* ── Close modal on overlay click ── */
  successModal?.addEventListener('click', e => {
    if (e.target === successModal) successModal.hidden = true;
  });

})();
