/* ============================================================
   Groot Workspace — Contact Page (Synced with Admin State)
   ============================================================ */
(function () {
  'use strict';

  function isEn() { return window.i18n && window.i18n.getLang() === 'en'; }

  function getContact() {
    return window.SiteState ? window.SiteState.read('contact') : {};
  }

  /** Sync contact info from admin state into the page */
  function syncContactInfo() {
    const c = getContact();
    if (!c.phone) return;

    // Update phone display
    const phoneVal = document.getElementById('phoneValue');
    if (phoneVal) phoneVal.textContent = c.phone;

    // Update Facebook
    const fbVal = document.getElementById('fbValue');
    const fbLink = document.getElementById('fbLink');
    if (fbVal) fbVal.textContent = c.facebook;
    if (fbLink) fbLink.href = c.facebookUrl;

    // Update Instagram
    const igVal = document.getElementById('igValue');
    const igLink = document.getElementById('igLink');
    if (igVal) igVal.textContent = '@' + c.instagram;
    if (igLink) igLink.href = c.instagramUrl;

    // Update address
    const addrText = document.getElementById('addressText');
    if (addrText) addrText.textContent = isEn() ? c.addressEn : c.address;

    // Update map link
    const mapLink = document.getElementById('mapLink');
    if (mapLink) mapLink.href = c.mapUrl;
  }

  // Copy phone
  const copyBtn = document.getElementById('copyPhone');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const c = getContact();
      await copyToClipboard(c.phone || '+201551107394');
      showToast(isEn() ? 'Phone number copied.' : 'تم نسخ رقم الهاتف.');
    });
  }

  // WhatsApp
  const waBtn = document.getElementById('contactWA');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      const c = getContact();
      const phone = c.whatsapp || '201551107394';
      const msg = isEn()
        ? 'Hello, I would like to inquire about workspaces at Groot Workspace.'
        : 'مرحبًا، أود الاستفسار عن مساحات العمل في Groot Workspace.';
      window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  // Call
  const callBtn = document.getElementById('contactCall');
  if (callBtn) {
    callBtn.addEventListener('click', () => {
      const c = getContact();
      window.location.href = 'tel:' + (c.phone || '+201551107394');
    });
  }

  // Contact Form — saves to SHARED STATE (appears in admin)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const msg = document.getElementById('formMsg').value.trim();

      if (!name || !email || !msg) {
        showToast(isEn() ? 'Please fill all fields.' : 'الرجاء ملء جميع الحقول.');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast(isEn() ? 'Please enter a valid email.' : 'الرجاء إدخال بريد إلكتروني صحيح.');
        return;
      }

      // Save to shared state so admin can see it
      if (window.SiteState) {
        window.SiteState.addMessage({ name, email, msg });
      }

      showToast(isEn() ? 'Your message has been sent!' : 'تم إرسال رسالتك بنجاح!');
      form.reset();
    });
  }

  // Listen for state changes
  window.addEventListener('groot-state-change', syncContactInfo);
  document.addEventListener('langchange', syncContactInfo);
  document.addEventListener('DOMContentLoaded', syncContactInfo);
})();
