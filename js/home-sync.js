/* ============================================================
   Groot Workspace — Home Page Sync Logic
   ============================================================ */
(function () {
  'use strict';

  function isEn() { return window.i18n && window.i18n.getLang() === 'en'; }

  function syncHome() {
    if (!window.SiteState) return;
    const state = window.SiteState.get();
    if (!state) return;

    // 1. Hero Content Sync
    const heroTitle = document.querySelector('[data-i18n="heroTitle"]');
    const heroLead = document.querySelector('[data-i18n="heroLead"]');
    
    if (heroTitle && state.content) {
      heroTitle.textContent = isEn() ? state.content.heroTitleEn : state.content.heroTitle;
    }
    if (heroLead && state.content) {
      heroLead.textContent = isEn() ? state.content.heroLeadEn : state.content.heroLead;
    }

    // 2. Pricing Updates
    const priceFirst = document.querySelector('[data-price-id="first"]');
    const priceExtra = document.querySelector('[data-price-id="extra"]');
    const pricePkg8 = document.querySelector('[data-price-id="pkg8"]');
    const priceDay = document.querySelector('[data-price-id="day"]');

    if (state.pricing) {
      if (priceFirst) priceFirst.textContent = state.pricing.first;
      if (priceExtra) priceExtra.textContent = state.pricing.extra;
      if (pricePkg8) pricePkg8.textContent = state.pricing.pkg8;
      if (priceDay) priceDay.textContent = state.pricing.day;
    }

    // Interactive Calculator
    const calcSlider = document.getElementById('priceSlider');
    const calcHours = document.getElementById('calcHours');
    const calcResult = document.getElementById('calcPrice');

    if (calcSlider && calcHours && calcResult) {
      // Re-evaluate current slider value with new prices
      const hours = Number(calcSlider.value);
      let price = window.SiteState.calcPrice(hours);
      calcHours.textContent = hours;
      calcResult.textContent = price + ' EGP';
    }
  }

  // Hook into interactive calculator changes natively as well
  const calcSlider = document.getElementById('priceSlider');
  if (calcSlider) {
    calcSlider.addEventListener('input', () => {
      syncHome();
    });
  }

  const featured = document.querySelector('.about-gallery__featured');
  const featuredImg = featured?.querySelector('img');
  const galleryButtons = document.querySelectorAll('.photo-strip__item[data-full]');
  galleryButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (!featuredImg || button.classList.contains('active')) return;
      galleryButtons.forEach(item => item.classList.remove('active'));
      button.classList.add('active');
      featured.classList.add('is-changing');
      window.setTimeout(() => {
        featuredImg.src = button.dataset.full;
        featuredImg.alt = button.dataset.alt || '';
        featured.classList.remove('is-changing');
      }, 160);
    });
  });

  window.addEventListener('groot-state-change', syncHome);
  document.addEventListener('langchange', syncHome);
  document.addEventListener('DOMContentLoaded', syncHome);
})();
