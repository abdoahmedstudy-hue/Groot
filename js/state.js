/* ============================================================
   Groot Workspace — Shared State (Syncs Admin ↔ Public Pages)
   All site data lives here. Admin writes, public pages read.
   ============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'groot-site-state';

  const defaultState = {
    /* ── Pricing ─────────────────────────────────────── */
    pricing: { first: 20, extra: 15, pkg8: 65, day: 160, fullDayStart: 9 },

    /* ── Spaces ──────────────────────────────────────── */
    spaces: [
      { id: 1, name: 'مساحة العمل المشتركة', nameEn: 'Shared Workspace', capacity: 18, visible: true, load: 58, use: 'عمل يومي', useEn: 'Daily Work', mood: 'متوسط', moodEn: 'Moderate', desc: 'مقاعد مرنة للمذاكرة والعمل اليومي وسط إضاءة هادئة وحركة مجتمع محسوسة.', descEn: 'Flexible seating for studying and daily work with calm lighting.', amenities: ['Wi‑Fi', 'بوفيه قريب', 'مخارج كهرباء', 'إضاءة مريحة'], amenitiesEn: ['Wi-Fi', 'Nearby Café', 'Power Outlets', 'Comfortable Lighting'], photos: ['assets/images/shared-1.jpg', 'assets/images/shared-2.jpg', 'assets/images/shared-3.jpg'] },
      { id: 2, name: 'قاعة الاجتماعات', nameEn: 'Meeting Room', capacity: 10, visible: true, load: 70, use: 'فرق وعروض', useEn: 'Teams & Presentations', mood: 'مركّز', moodEn: 'Focused', desc: 'طاولة مركزية وشاشة عرض للفرق الصغيرة ومراجعات العملاء.', descEn: 'Central table and display screen for small teams and client reviews.', amenities: ['شاشة عرض', 'سبورة', 'تكييف', 'جلسة مغلقة'], amenitiesEn: ['Display Screen', 'Whiteboard', 'A/C', 'Private Setting'], photos: ['assets/images/meeting-1.jpg', 'assets/images/meeting-2.jpg', 'assets/images/meeting-3.jpg'] },
      { id: 3, name: 'قاعة الكورسات', nameEn: 'Lecture Hall', capacity: 32, visible: true, load: 82, use: 'ورش ومحاضرات', useEn: 'Workshops & Lectures', mood: 'نشط', moodEn: 'Active', desc: 'تخطيط واسع للورش والكورسات والجلسات الجماعية مع تجهيزات عرض.', descEn: 'Wide layout for workshops, courses, and group sessions.', amenities: ['Projector', 'Whiteboard', 'صوت', 'صفوف مرنة'], amenitiesEn: ['Projector', 'Whiteboard', 'Sound System', 'Flexible Rows'], photos: ['assets/images/lecture.jpg', 'assets/images/shared-4.jpg', 'assets/images/coffee.jpg'] },
      { id: 4, name: 'ركن التركيز الفردي', nameEn: 'Focus Corner', capacity: 6, visible: true, load: 34, use: 'إنجاز هادئ', useEn: 'Quiet Focus', mood: 'هادئ', moodEn: 'Quiet', desc: 'زوايا هادئة للمهام الطويلة والمذاكرة العميقة بدون تشتيت.', descEn: 'Quiet corners for deep work and long study sessions.', amenities: ['هدوء', 'إضاءة فردية', '24/7', 'مقعد مريح'], amenitiesEn: ['Quiet', 'Personal Lighting', '24/7', 'Comfortable Seat'], photos: ['assets/images/private.jpg', 'assets/images/lounge.jpg', 'assets/images/prayer.jpg'] }
    ],

    /* ── Features / Amenities ────────────────────────── */
    features: [
      { name: 'Wi‑Fi فائق السرعة', nameEn: 'High-Speed Wi-Fi', visible: true, icon: 'wifi' },
      { name: 'تكييف', nameEn: 'Air Conditioning', visible: true, icon: 'ac' },
      { name: 'شاشات عرض', nameEn: 'Display Screens', visible: true, icon: 'screen' },
      { name: 'سبورات بيضاء', nameEn: 'Whiteboards', visible: true, icon: 'board' },
      { name: 'بوفيه داخلي', nameEn: 'In-house Café', visible: true, icon: 'cafe' },
      { name: 'مكان صلاة', nameEn: 'Prayer Room', visible: true, icon: 'prayer' },
      { name: 'مكان للراحة', nameEn: 'Rest Area', visible: true, icon: 'rest' }
    ],

    /* ── Content (Hero) ──────────────────────────────── */
    content: {
      heroTitle: 'مساحة تنمو فيها الفكرة.',
      heroTitleEn: 'A space where ideas grow.',
      heroLead: 'Groot مش بس مكان تشتغل فيه.. دي Community بتعيش الإبداع، وتؤمن إن النجاح أجمل لما بيحصل وسط ناس بتشبه حلمك.',
      heroLeadEn: "Groot is not just a place to work. It's a community that lives creativity and believes success is more beautiful when it happens together."
    },

    /* ── Contact Info ────────────────────────────────── */
    contact: {
      phone: '+201551107394',
      facebook: 'GrootWorkspace',
      facebookUrl: 'https://www.facebook.com/GrootWorkspace/',
      instagram: 'groot_workspace',
      instagramUrl: 'https://www.instagram.com/groot_workspace/',
      address: 'حي الجامعة، 57 شارع الصديق، متفرع من شارع أحمد ماهر، أمام بوابة القرية الأولمبية.',
      addressEn: 'University District, 57 El-Seddik St., off Ahmed Maher St., in front of the Olympic Village gate.',
      mapUrl: 'https://maps.app.goo.gl/AGRn68Qam7YCr4md6',
      whatsapp: '201551107394'
    },

    /* ── Operational Toggles ─────────────────────────── */
    toggles: {
      bookingOpen: true,
      always24: true,
      capacityAlerts: true,
      english: false
    },

    /* ── Bookings ────────────────────────────────────── */
    bookings: [
      { id: 1, name: 'فريق مشروع تخرج', space: 'قاعة الكورسات', time: '18:00', date: '2025-06-02', people: 14, value: 910, status: 'مؤكد', created: '2025-06-01T10:00:00Z' },
      { id: 2, name: 'جلسة مذاكرة', space: 'المشترك الهادئ', time: '21:00', date: '2025-06-02', people: 5, value: 325, status: 'معلق', created: '2025-06-01T11:00:00Z' },
      { id: 3, name: 'اجتماع عميل', space: 'قاعة الاجتماعات', time: '12:00', date: '2025-06-02', people: 7, value: 455, status: 'مؤكد', created: '2025-06-01T09:00:00Z' },
      { id: 4, name: 'حجز جماعي', space: 'قاعة الكورسات', time: '00:00', date: '2025-06-03', people: 32, value: 1600, status: 'يحتاج مراجعة', created: '2025-06-01T14:00:00Z' }
    ],

    /* ── Messages (from contact form) ────────────────── */
    messages: [],

    /* ── Meta ─────────────────────────────────────────── */
    lastPublished: null,
    nextBookingId: 5
  };

  /* ── Load / Save ───────────────────────────────────── */
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) {
        // Merge with defaults to handle new fields added later
        return deepMerge(JSON.parse(JSON.stringify(defaultState)), saved);
      }
    } catch (e) { console.warn('State load error:', e); }
    return JSON.parse(JSON.stringify(defaultState));
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      // Dispatch event so other open tabs can react
      window.dispatchEvent(new CustomEvent('groot-state-change', { detail: state }));
    } catch (e) { console.warn('State save error:', e); }
  }

  function deepMerge(target, source) {
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key]) && target[key]) {
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
    return target;
  }

  /* ── State Object ──────────────────────────────────── */
  let _state = load();

  const SiteState = {
    /** Get the full state (read-only copy) */
    get() { return _state; },

    /** Get a nested value: SiteState.read('pricing.first') */
    read(path) {
      return path.split('.').reduce((obj, key) => obj?.[key], _state);
    },

    /** Update state and save: SiteState.update('pricing.first', 25) */
    update(path, value) {
      const keys = path.split('.');
      const last = keys.pop();
      const target = keys.reduce((obj, key) => obj[key], _state);
      if (target) {
        target[last] = value;
        save(_state);
      }
    },

    /** Replace a top-level section: SiteState.set('bookings', [...]) */
    set(key, value) {
      _state[key] = value;
      save(_state);
    },

    /** Add a booking from public page */
    addBooking(booking) {
      booking.id = _state.nextBookingId++;
      booking.created = new Date().toISOString();
      booking.status = 'معلق';
      _state.bookings.push(booking);
      save(_state);
      return booking;
    },

    /** Add a contact message */
    addMessage(msg) {
      msg.date = new Date().toISOString();
      msg.read = false;
      _state.messages.push(msg);
      save(_state);
    },

    /** Get visible spaces only */
    getVisibleSpaces() {
      return _state.spaces.filter(s => s.visible);
    },

    /** Get visible features only */
    getVisibleFeatures() {
      return _state.features.filter(f => f.visible);
    },

    /** Calculate price for the daily system */
    calcPrice(hours, startHour) {
      const p = _state.pricing;
      const h = Math.max(1, Number(hours) || 1);
      const startsAtFullDay = startHour !== undefined && Number(startHour) >= Number(p.fullDayStart ?? 9);
      if (startsAtFullDay) return p.day;
      if (h === 1) return p.first;
      if (h === 2) return p.first + p.extra;
      if (h === 3) return p.first + (2 * p.extra);
      if (h <= 8) return p.pkg8;
      return p.day;
    },

    /** Get packages with current pricing */
    getPackages() {
      const p = _state.pricing;
      return [
        { name: '3 ساعات', nameEn: '3 Hours', price: p.first + (2 * p.extra), hours: 3 },
        { name: '8 ساعات', nameEn: '8 Hours', price: p.pkg8, hours: 8 },
        { name: 'يوم كامل', nameEn: 'Full Day', price: p.day, hours: 14 }
      ];
    },

    /** Check if booking is open */
    isBookingOpen() { return _state.toggles.bookingOpen; },

    /** Reset to defaults */
    reset() {
      _state = JSON.parse(JSON.stringify(defaultState));
      save(_state);
    },

    /** Full save (for admin bulk changes) */
    save() { save(_state); }
  };

  // Listen for changes from other tabs
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
      _state = load();
      window.dispatchEvent(new CustomEvent('groot-state-change', { detail: _state }));
    }
  });

  // Expose globally
  window.SiteState = SiteState;

})();
