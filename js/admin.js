/* ============================================================
   Groot Workspace — Admin Dashboard Logic (Synced with SiteState)
   Secure Login + Price & Workspace Control
   ============================================================ */
(function () {
  'use strict';

  /* ================================================================
     SECTION 1: AUTHENTICATION SYSTEM
     ================================================================ */

  async function sha256(text) {
    const data = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  let passwordHash = localStorage.getItem('groot-admin-hash') || null;

  async function initHash() {
    if (!passwordHash) {
      passwordHash = await sha256('groot2015');
      localStorage.setItem('groot-admin-hash', passwordHash);
    }
  }

  function generateToken() {
    return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  function getSession() {
    try {
      const session = JSON.parse(localStorage.getItem('groot-admin-session'));
      if (session && session.token && session.expiry > Date.now()) return session;
    } catch {}
    return null;
  }

  function createSession() {
    const session = {
      token: generateToken(),
      expiry: Date.now() + 24 * 60 * 60 * 1000,
      created: Date.now()
    };
    localStorage.setItem('groot-admin-session', JSON.stringify(session));
    return session;
  }

  function destroySession() {
    localStorage.removeItem('groot-admin-session');
  }

  function getAttempts() {
    try {
      const data = JSON.parse(localStorage.getItem('groot-admin-attempts'));
      if (data && data.lockUntil && data.lockUntil > Date.now()) return data;
      if (data && data.lockUntil && data.lockUntil <= Date.now()) {
        localStorage.removeItem('groot-admin-attempts');
        return { count: 0, lockUntil: 0 };
      }
      return data || { count: 0, lockUntil: 0 };
    } catch { return { count: 0, lockUntil: 0 }; }
  }

  function recordFailedAttempt() {
    const attempts = getAttempts();
    attempts.count++;
    if (attempts.count >= 5) {
      attempts.lockUntil = Date.now() + 5 * 60 * 1000;
    }
    localStorage.setItem('groot-admin-attempts', JSON.stringify(attempts));
    return attempts;
  }

  function clearAttempts() {
    localStorage.removeItem('groot-admin-attempts');
  }

  const loginOverlay = document.getElementById('loginOverlay');
  const adminShell = document.getElementById('adminShell');
  const loginForm = document.getElementById('loginForm');
  const loginPassword = document.getElementById('loginPassword');
  const loginError = document.getElementById('loginError');
  const loginLockout = document.getElementById('loginLockout');
  const loginBtn = document.getElementById('loginBtn');

  function showLogin() {
    if (loginOverlay) loginOverlay.classList.remove('hidden');
    if (adminShell) adminShell.classList.add('locked');
  }

  function hideLogin() {
    if (loginOverlay) loginOverlay.classList.add('hidden');
    if (adminShell) adminShell.classList.remove('locked');
  }

  function updateLockoutDisplay() {
    const attempts = getAttempts();
    if (attempts.lockUntil > Date.now()) {
      const remaining = Math.ceil((attempts.lockUntil - Date.now()) / 1000);
      const min = Math.floor(remaining / 60);
      const sec = remaining % 60;
      if (loginLockout) {
        loginLockout.textContent = `محاولات كثيرة. انتظر ${min}:${sec.toString().padStart(2, '0')}`;
        loginLockout.classList.add('show');
      }
      if (loginBtn) loginBtn.disabled = true;
      if (loginPassword) loginPassword.disabled = true;
      setTimeout(updateLockoutDisplay, 1000);
    } else {
      if (loginLockout) loginLockout.classList.remove('show');
      if (loginBtn) loginBtn.disabled = false;
      if (loginPassword) loginPassword.disabled = false;
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    const attempts = getAttempts();
    if (attempts.lockUntil > Date.now()) { updateLockoutDisplay(); return; }
    const pwd = loginPassword.value;
    if (!pwd) return;
    await initHash();
    const hash = await sha256(pwd);
    if (hash === passwordHash) {
      createSession(); clearAttempts(); hideLogin();
      loginError.classList.remove('show');
      loginPassword.value = '';
      if(window.showToast) showToast('تم تسجيل الدخول بنجاح');
      renderSection(activeSection);
    } else {
      const att = recordFailedAttempt();
      const remaining = 5 - att.count;
      if (remaining > 0) {
        loginError.textContent = `كلمة المرور غير صحيحة. ${remaining} محاولات متبقية.`;
        loginError.classList.add('show');
      } else { loginError.classList.remove('show'); updateLockoutDisplay(); }
      loginPassword.value = '';
    }
  }

  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      destroySession(); showLogin();
      if(window.showToast) showToast('تم تسجيل الخروج');
    });
  }

  async function checkAuth() {
    await initHash();
    if (getSession()) { hideLogin(); } else { showLogin(); }
  }

  /* ================================================================
     SECTION 2: DASHBOARD LOGIC
     ================================================================ */

  let state = window.SiteState ? window.SiteState.get() : {};

  function saveState() {
    if (window.SiteState) { window.SiteState.save(); state = window.SiteState.get(); }
  }

  window.addEventListener('groot-state-change', () => {
    state = window.SiteState.get();
    renderSection(activeSection);
  });

  let activeSection = 'pricing';
  const sidebarBtns = document.querySelectorAll('.sidebar-nav button[data-section]');
  const sections = document.querySelectorAll('.admin-section');

  function switchSection(id) {
    activeSection = id;
    sidebarBtns.forEach(b => b.classList.toggle('active', b.dataset.section === id));
    sections.forEach(s => s.classList.toggle('active', s.id === 'section-' + id));
    renderSection(id);
  }

  sidebarBtns.forEach(btn => {
    btn.addEventListener('click', () => switchSection(btn.dataset.section));
  });

  function renderPricing() {
    if (!state.pricing) return;
    const pf = document.getElementById('priceFirst');
    const pe = document.getElementById('priceExtra');
    const p8 = document.getElementById('price8h');
    const pd = document.getElementById('priceDay');
    const pfs = document.getElementById('priceFullDayStart');
    if (pf) pf.value = state.pricing.first;
    if (pe) pe.value = state.pricing.extra;
    if (p8) p8.value = state.pricing.pkg8;
    if (pd) pd.value = state.pricing.day;
    if (pfs) pfs.value = state.pricing.fullDayStart ?? 9;

    // Toggles
    if (state.toggles) {
      const tBook = document.getElementById('toggleBooking');
      const t24 = document.getElementById('toggle247');
      const tAlerts = document.getElementById('toggleAlerts');
      const tEng = document.getElementById('toggleEnglish');
      if (tBook) tBook.checked = state.toggles.bookingOpen;
      if (t24) t24.checked = state.toggles.always24;
      if (tAlerts) tAlerts.checked = state.toggles.capacityAlerts;
      if (tEng) tEng.checked = state.toggles.english;
    }
  }

  function renderSpaces() {
    const container = document.getElementById('spacesList');
    if (!container || !state.spaces) return;
    container.innerHTML = state.spaces.map((s, i) => `
      <article class="workspace-editor" data-index="${i}">
        <div class="workspace-editor__head">
          <div>
            <h4>${s.name}</h4>
            <p>تحكم كامل في الاسم والسعة والوصف والاستخدام والظهور.</p>
          </div>
          <label class="switch" title="إظهار المساحة"><input type="checkbox" data-field="visible" ${s.visible ? 'checked' : ''}><span class="switch__track"></span></label>
        </div>
        <div class="grid-2" style="gap:var(--sp-3)">
          <div><label class="form-label">الاسم العربي</label><input class="form-input" data-field="name" value="${escapeAttr(s.name)}"></div>
          <div><label class="form-label">English Name</label><input class="form-input" data-field="nameEn" value="${escapeAttr(s.nameEn)}"></div>
          <div><label class="form-label">السعة</label><input type="number" min="1" class="form-input" data-field="capacity" value="${s.capacity}"></div>
          <div><label class="form-label">نسبة الإشغال</label><input type="number" min="0" max="100" class="form-input" data-field="load" value="${s.load}"></div>
          <div><label class="form-label">أفضل استخدام</label><input class="form-input" data-field="use" value="${escapeAttr(s.use)}"></div>
          <div><label class="form-label">Best Use</label><input class="form-input" data-field="useEn" value="${escapeAttr(s.useEn)}"></div>
          <div><label class="form-label">الهدوء</label><input class="form-input" data-field="mood" value="${escapeAttr(s.mood)}"></div>
          <div><label class="form-label">Mood</label><input class="form-input" data-field="moodEn" value="${escapeAttr(s.moodEn)}"></div>
        </div>
        <label class="form-label">الوصف العربي</label>
        <textarea class="form-textarea" rows="2" data-field="desc">${escapeText(s.desc)}</textarea>
        <label class="form-label">English Description</label>
        <textarea class="form-textarea" rows="2" data-field="descEn">${escapeText(s.descEn)}</textarea>
        <label class="form-label">المزايا العربية (افصل بينها بفاصلة)</label>
        <input class="form-input" data-field="amenities" value="${escapeAttr(s.amenities.join(', '))}">
        <label class="form-label">English Amenities (comma separated)</label>
        <input class="form-input" data-field="amenitiesEn" value="${escapeAttr(s.amenitiesEn.join(', '))}">
        <button class="btn btn--primary btn--sm save-space" data-save="${i}" style="margin-top:var(--sp-3)">حفظ هذه المساحة</button>
      </article>
    `).join('');
    container.querySelectorAll('.save-space').forEach(button => {
      button.addEventListener('click', () => saveSpace(Number(button.dataset.save)));
    });
  }

  function escapeAttr(value) {
    return String(value ?? '').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  function escapeText(value) {
    return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  function csv(value) {
    return String(value || '').split(',').map(item => item.trim()).filter(Boolean);
  }

  function saveSpace(index) {
    const editor = document.querySelector(`.workspace-editor[data-index="${index}"]`);
    if (!editor || !state.spaces[index]) return;
    editor.querySelectorAll('[data-field]').forEach(input => {
      const field = input.dataset.field;
      if (field === 'visible') {
        state.spaces[index][field] = input.checked;
      } else if (field === 'capacity' || field === 'load') {
        state.spaces[index][field] = Number(input.value);
      } else if (field === 'amenities' || field === 'amenitiesEn') {
        state.spaces[index][field] = csv(input.value);
      } else {
        state.spaces[index][field] = input.value.trim();
      }
    });
    saveState();
    renderSpaces();
    if(window.showToast) showToast('تم حفظ إعدادات المساحة');
  }

  function renderSection(id) {
    switch (id) {
      case 'pricing': renderPricing(); break;
      case 'spaces': renderSpaces(); break;
    }
  }

  ['toggleBooking', 'toggle247', 'toggleAlerts', 'toggleEnglish'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        const key = { toggleBooking: 'bookingOpen', toggle247: 'always24', toggleAlerts: 'capacityAlerts', toggleEnglish: 'english' }[id];
        state.toggles[key] = el.checked;
        saveState();
        if(window.showToast) showToast('تم تحديث الإعدادات');
      });
    }
  });

  const savePricing = document.getElementById('savePricing');
  if (savePricing) {
    savePricing.addEventListener('click', () => {
      state.pricing.first = Number(document.getElementById('priceFirst').value);
      state.pricing.extra = Number(document.getElementById('priceExtra').value);
      state.pricing.pkg8 = Number(document.getElementById('price8h').value);
      state.pricing.day = Number(document.getElementById('priceDay').value);
      state.pricing.fullDayStart = Number(document.getElementById('priceFullDayStart').value || 9);
      saveState();
      if(window.showToast) showToast('تم حفظ الأسعار ونشرها على الموقع');
    });
  }

  const calcTestSlider = document.getElementById('calcTestSlider');
  const calcTestResult = document.getElementById('calcTestResult');
  const calcTestHours = document.getElementById('calcTestHours');
  if (calcTestSlider) {
    calcTestSlider.addEventListener('input', () => {
      const h = Number(calcTestSlider.value);
      if (calcTestHours) calcTestHours.textContent = h;
      if (calcTestResult) calcTestResult.textContent = window.SiteState.calcPrice(h) + ' EGP';
    });
  }

  const changePwdBtn = document.getElementById('changePassword');
  if (changePwdBtn) {
    changePwdBtn.addEventListener('click', async () => {
      const newPwd = prompt('أدخل كلمة المرور الجديدة:');
      if (newPwd && newPwd.length >= 4) {
        passwordHash = await sha256(newPwd);
        localStorage.setItem('groot-admin-hash', passwordHash);
        if(window.showToast) showToast('تم تغيير كلمة المرور بنجاح');
      } else if (newPwd) {
        if(window.showToast) showToast('كلمة المرور يجب أن تكون 4 أحرف على الأقل');
      }
    });
  }

  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    switchSection('pricing');
  });

})();
