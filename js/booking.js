/* ============================================================
   Groot Workspace — Booking System (Synced with Admin State)
   ============================================================ */
(function () {
  'use strict';

  let activeSpace = 0;
  let activePhoto = 0;

  let activePkg = 1;
  let people = 1;
  let selectedTime = '09:00';

  function isEn() { return window.i18n && window.i18n.getLang() === 'en'; }

  function getSpaces() {
    return window.SiteState ? window.SiteState.getVisibleSpaces() : [];
  }

  function getPackages() {
    return window.SiteState ? window.SiteState.getPackages() : [];
  }

  // DOM
  const tabsContainer = document.getElementById('spaceTabs');
  const mainImg = document.getElementById('showcaseImg');
  const overlayName = document.getElementById('showcaseName');
  const overlayDesc = document.getElementById('showcaseDesc');
  const thumbsContainer = document.getElementById('showcaseThumbs');
  const metricCapacity = document.getElementById('metricCapacity');
  const metricUse = document.getElementById('metricUse');
  const metricMood = document.getElementById('metricMood');
  const amenitiesList = document.getElementById('amenitiesList');

  const pkgContainer = document.getElementById('packageOptions');
  const peopleDisplay = document.getElementById('peopleValue');
  const capacityWarn = document.getElementById('capacityWarn');
  const quoteSpace = document.getElementById('quoteSpace');
  const quotePrice = document.getElementById('quotePrice');
  const bookingClosed = document.getElementById('bookingClosed');
  const timeInput = document.getElementById('timeInput');
  const timeDisplay = document.getElementById('timeDisplay');
  const timePeriod = document.getElementById('timePeriod');
  const timeQuick = document.getElementById('timeQuick');
  const timePrev = document.getElementById('timePrev');
  const timeNext = document.getElementById('timeNext');

  function renderTabs() {
    const spaces = getSpaces();
    if (!spaces.length || !tabsContainer) return;
    if (activeSpace >= spaces.length) activeSpace = 0;

    tabsContainer.innerHTML = spaces.map((s, i) => `
      <div class="space-tab ${i === activeSpace ? 'active' : ''}" data-idx="${i}">
        <div class="space-tab__name">${isEn() ? s.nameEn : s.name}</div>
        <div class="space-tab__meta">${s.capacity} ${isEn() ? 'people' : 'شخص'} · ${isEn() ? s.useEn : s.use}</div>
      </div>
    `).join('');

    tabsContainer.querySelectorAll('.space-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        activeSpace = Number(tab.dataset.idx);
        activePhoto = 0;
        render();
      });
    });
  }

  function renderShowcase() {
    const spaces = getSpaces();
    if (!spaces.length || !mainImg) return;
    const s = spaces[activeSpace];
    mainImg.src = s.photos[activePhoto];
    mainImg.alt = isEn() ? s.nameEn : s.name;
    overlayName.textContent = isEn() ? s.nameEn : s.name;
    overlayDesc.textContent = isEn() ? s.descEn : s.desc;

    thumbsContainer.innerHTML = s.photos.map((p, i) => `
      <div class="showcase__thumb ${i === activePhoto ? 'active' : ''}" data-idx="${i}">
        <img src="${p}" alt="" loading="lazy">
      </div>
    `).join('');

    thumbsContainer.querySelectorAll('.showcase__thumb').forEach(th => {
      th.addEventListener('click', () => {
        activePhoto = Number(th.dataset.idx);
        renderShowcase();
      });
    });
  }

  function renderDetails() {
    const spaces = getSpaces();
    if (!spaces.length || !metricCapacity) return;
    const s = spaces[activeSpace];
    metricCapacity.textContent = s.capacity;
    metricUse.textContent = isEn() ? s.useEn : s.use;
    metricMood.textContent = isEn() ? s.moodEn : s.mood;

    const amList = isEn() ? s.amenitiesEn : s.amenities;
    amenitiesList.innerHTML = amList.map(a => `<li>${a}</li>`).join('');
  }

  function getStartHour() {
    return Number((selectedTime || '09:00').split(':')[0]);
  }

  function formatHour(hour) {
    return String((hour + 24) % 24).padStart(2, '0') + ':00';
  }

  function getPeriodLabel(hour) {
    if (hour < 6) return isEn() ? 'Late night' : 'بعد منتصف الليل';
    if (hour < 12) return isEn() ? 'Morning' : 'صباحًا';
    if (hour < 17) return isEn() ? 'Afternoon' : 'ظهرًا';
    if (hour < 21) return isEn() ? 'Evening' : 'مساءً';
    return isEn() ? 'Night' : 'ليلًا';
  }

  function setSelectedHour(hour) {
    selectedTime = formatHour(hour);
    renderTimeSlots();
    renderPackages();
    updateQuote();
  }

  function renderTimeSlots() {
    const hour = getStartHour();
    if (timeInput) timeInput.value = selectedTime;
    if (timeDisplay) timeDisplay.textContent = selectedTime;
    if (timePeriod) timePeriod.textContent = getPeriodLabel(hour);
    if (!timeQuick) return;

    const quickHours = [9, 12, 15, 18, 21, 0];
    timeQuick.innerHTML = quickHours.map(item => {
      const time = formatHour(item);
      return `<button type="button" class="time-picker__chip ${time === selectedTime ? 'active' : ''}" data-hour="${item}">${time}</button>`;
    }).join('');

    timeQuick.querySelectorAll('.time-picker__chip').forEach(chip => {
      chip.addEventListener('click', () => setSelectedHour(Number(chip.dataset.hour)));
    });
  }

  function renderPackages() {
    const packages = getPackages();
    if (!pkgContainer) return;
    pkgContainer.innerHTML = packages.map((p, i) => `
      <div class="package-opt ${i === activePkg ? 'active' : ''}" data-idx="${i}">
        <span class="package-opt__name">${isEn() ? p.nameEn : p.name}</span>
        <span class="package-opt__price">${window.SiteState ? window.SiteState.calcPrice(p.hours, getStartHour()) : p.price} EGP</span>
      </div>
    `).join('');

    pkgContainer.querySelectorAll('.package-opt').forEach(opt => {
      opt.addEventListener('click', () => {
        activePkg = Number(opt.dataset.idx);
        renderPackages();
        updateQuote();
      });
    });
  }

  function updateQuote() {
    const spaces = getSpaces();
    const packages = getPackages();
    if (!spaces.length || !packages.length) return;
    const s = spaces[activeSpace];
    const pkg = packages[activePkg];
    const unitPrice = window.SiteState ? window.SiteState.calcPrice(pkg.hours, getStartHour()) : pkg.price;
    if (quoteSpace) quoteSpace.textContent = isEn() ? s.nameEn : s.name;
    if (quotePrice) quotePrice.textContent = (unitPrice * Math.max(1, Math.ceil(people / s.capacity))) + ' EGP';

    if (capacityWarn) {
      if (people > s.capacity) {
        capacityWarn.textContent = isEn() ? 'Exceeds capacity (' + s.capacity + ')' : 'العدد أكبر من السعة المريحة (' + s.capacity + ')';
        capacityWarn.classList.add('show');
      } else {
        capacityWarn.classList.remove('show');
      }
    }
  }

  function checkBookingStatus() {
    if (!window.SiteState) return;
    const closed = document.getElementById('bookingClosed');
    if (!window.SiteState.isBookingOpen()) {
      if (closed) closed.style.display = 'block';
    } else {
      if (closed) closed.style.display = 'none';
    }
  }

  function render() {
    renderTabs();
    renderShowcase();
    renderDetails();
    renderTimeSlots();
    renderPackages();
    updateQuote();
    checkBookingStatus();
  }

  // People stepper
  document.getElementById('peopleMinus')?.addEventListener('click', () => {
    people = Math.max(1, people - 1);
    if (peopleDisplay) peopleDisplay.textContent = people;
    updateQuote();
  });

  document.getElementById('peoplePlus')?.addEventListener('click', () => {
    people = Math.min(50, people + 1);
    if (peopleDisplay) peopleDisplay.textContent = people;
    updateQuote();
  });

  timePrev?.addEventListener('click', () => setSelectedHour(getStartHour() - 1));
  timeNext?.addEventListener('click', () => setSelectedHour(getStartHour() + 1));

  // Date default
  const dateInput = document.getElementById('bookDate');
  if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

  // WhatsApp
  document.getElementById('bookWhatsApp')?.addEventListener('click', () => {
    const spaces = getSpaces();
    const packages = getPackages();
    const s = spaces[activeSpace];
    const pkg = packages[activePkg];
    const state = window.SiteState?.get();
    const phone = state?.contact?.whatsapp || '201551107394';

    const msg = isEn()
      ? `Hello, I'd like to book at Groot Workspace:\n• Space: ${s.nameEn}\n• Date: ${dateInput.value}\n• Time: ${selectedTime}\n• Package: ${pkg.nameEn}\n• People: ${people}`
      : `مرحبًا، أريد حجز في Groot Workspace:\n• المساحة: ${s.name}\n• التاريخ: ${dateInput.value}\n• الوقت: ${selectedTime}\n• الباقة: ${pkg.name}\n• عدد الأشخاص: ${people}`;
    window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(msg), '_blank');
  });

  // Listen for state changes (from admin in another tab)
  window.addEventListener('groot-state-change', render);
  document.addEventListener('langchange', render);
  document.addEventListener('DOMContentLoaded', render);
})();
