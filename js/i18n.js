/* ============================================================
   Groot Workspace — Internationalization (AR / EN)
   ============================================================ */

(function () {
  'use strict';

  const dictionary = {
    ar: {
      // Navigation
      navSpaces: 'المساحات والحجز',
      navContact: 'التواصل والموقع',
      navAdmin: 'لوحة التحكم',
      navHome: 'الرئيسية',
      navPrototype: 'النماذج',

      // Home Hero
      heroEyebrow: 'مساحة عمل مشتركة في المنصورة',
      heroTitle: 'مساحة تنمو فيها الفكرة.',
      heroLead: 'Groot مش بس مكان تشتغل فيه.. دي Community بتعيش الإبداع، وتؤمن إن النجاح أجمل لما بيحصل وسط ناس بتشبه حلمك.',
      heroCta1: 'استعرض المساحات',
      heroCta2: 'ابدأ الحجز',
      heroCta3: 'العنوان والتواصل',
      heroGlassTitle: 'Groot مش مجرد مكان للعمل.',
      heroGlassText: 'مجتمع يعيش الإبداع ويؤمن أن النجاح أجمل، مع مساحات مرنة للمذاكرة، الاجتماعات، الكورسات، والتركيز الفردي.',

      // Stats
      stat247: 'تشغيل دائم',
      stat45: 'أقصى سعة',
      stat2015: 'بداية الرحلة',
      stat65: 'باقة 8 ساعات',

      // About
      aboutTitle: 'عن Groot Workspace',
      aboutHeading: 'من 2015 واحنا مجتمع عمل في المنصورة بيكبر مع أصحابه.',
      aboutText: 'من 2015 واحنا مجتمع عمل في المنصورة بيكبر مع أصحابه. كل زاوية شهدت بداية مشروع، حلم، أو فكرة اتولدت واتحققت.',
      aboutYears: 'سنوات من الإبداع',

      // Spaces
      spacesTitle: 'المساحات',
      spacesSubtitle: 'اختر المساحة المناسبة لاحتياجاتك',
      exploreMore: 'اكتشف المزيد',
      previewSharedName: 'مساحة العمل المشتركة',
      previewSharedText: 'مقاعد مرنة للمذاكرة والعمل اليومي',
      previewSharedCapacity: '18 شخص',
      previewSharedUse: 'عمل يومي',
      previewMeetingName: 'قاعة الاجتماعات',
      previewMeetingText: 'طاولة مركزية وشاشة عرض للفرق',
      previewMeetingCapacity: '10 شخص',
      previewMeetingUse: 'فرق وعروض',
      previewLectureName: 'قاعة الكورسات',
      previewLectureText: 'تخطيط واسع للورش والمحاضرات',
      previewLectureCapacity: '32 شخص',
      previewLectureUse: 'ورش ومحاضرات',
      previewFocusName: 'ركن التركيز الفردي',
      previewFocusText: 'زوايا هادئة للمهام الطويلة',
      previewFocusCapacity: '6 شخص',
      previewFocusUse: 'إنجاز هادئ',

      // Amenities
      amenitiesTitle: 'المميزات',
      amenWifi: 'إنترنت فائق السرعة',
      amenAC: 'تكييف هواء',
      amenProjector: 'شاشات عرض',
      amenWhiteboard: 'سبورات بيضاء',
      amenCafe: 'كافيه داخلي',
      amenPrayer: 'مكان للصلاة',
      amenRest: 'مكان للراحة',

      // Pricing
      pricingTitle: 'الأسعار',
      pricingSubtitle: 'أسعار مرنة تناسب احتياجاتك',
      priceFirstHour: 'أول ساعة',
      priceExtraHour: 'كل ساعة إضافية',
      price8h: 'باقة 8 ساعات',
      priceDay: 'يوم كامل',
      calcTitle: 'حاسبة الأسعار',
      calcHours: 'عدد الساعات',
      calcResult: 'السعر المتوقع',
      bestValue: 'الأفضل قيمة',

      // CTA
      ctaTitle: 'ابدأ يومك في Groot',
      ctaText: 'مساحة مرنة للمذاكرة، الاجتماعات، الكورسات، والتركيز الفردي.',
      ctaBtn: 'احجز الآن',

      // FAQ
      faqEyebrow: 'أسئلة سريعة',
      faqTitle: 'معلومات مباشرة عن Groot Workspace',
      faqQ1: 'ما هو Groot Workspace؟',
      faqA1: 'Groot Workspace هو مساحة عمل ومذاكرة مشتركة في المنصورة، مصر، مناسبة للطلاب، الفريلانسرز، الفرق، الاجتماعات، الورش، والكورسات.',
      faqQ2: 'أين يقع Groot Workspace؟',
      faqA2: 'يقع Groot Workspace في 57 شارع الصديق، متفرع من شارع أحمد ماهر، حي الجامعة، المنصورة، أمام بوابة القرية الأولمبية.',
      faqQ3: 'ما أسعار Groot Workspace؟',
      faqA3: 'تبدأ الأسعار من 20 EGP لأول ساعة، 35 EGP لساعتين، 50 EGP لثلاث ساعات، 65 EGP من 4 إلى 8 ساعات، و160 EGP لليوم الكامل.',
      faqQ4: 'ما المساحات المتاحة داخل Groot Workspace؟',
      faqA4: 'تشمل المساحات المتاحة مساحة عمل مشتركة، قاعة اجتماعات، قاعة كورسات ومحاضرات، وركن تركيز فردي للمهام الطويلة.',

      // Footer
      footerDesc: 'مساحة عمل مشتركة في المنصورة، مصر. مجتمع يعيش الإبداع منذ 2015.',
      footerLinks: 'روابط سريعة',
      footerContact: 'تواصل معنا',
      footerRights: '© 2025 Groot Workspace. جميع الحقوق محفوظة.',

      // Booking
      bookTitle: 'المساحات واضحة قبل ما تحجز.',
      bookLead: 'اختر المساحة، شاهد صورها وتفاصيلها وسعتها ومزاياها، ثم أكمل الحجز عبر واتساب.',
      bookTagCapacity: 'حتى 45 شخص',
      bookTagLocation: 'حي الجامعة، المنصورة',
      bookDate: 'التاريخ',
      bookTime: 'الوقت',
      bookPackage: 'الباقة',
      bookPeople: 'عدد الأشخاص',
      bookCapacity: 'السعة المريحة',
      bookBestUse: 'أفضل استخدام',
      bookMood: 'الهدوء',
      bookAmenities: 'المزايا داخل المساحة',
      bookDetails: 'تفاصيل الحجز',
      bookWhatsApp: 'حجز عبر واتساب',
      bookFit: 'مناسب حتى',
      bookOver: 'العدد أكبر من السعة المريحة',
      pkg3h: '3 ساعات',
      pkg8h: '8 ساعات',
      pkgDay: 'يوم كامل',
      bookingClosed: 'الحجز مغلق حاليًا',

      // Contact
      contactTitle: 'الوصول إلى Groot سهل.',
      contactDesc: 'حي الجامعة، 57 شارع الصديق، متفرع من شارع أحمد ماهر، أمام بوابة القرية الأولمبية.',
      contactPhone: 'الهاتف',
      contactCopy: 'نسخ',
      contactCopied: 'تم نسخ رقم الهاتف.',
      contactMap: 'فتح خرائط Google',
      contactMapAddress: 'حي الجامعة، 57 شارع الصديق — المنصورة، الدقهلية',
      contactLandmarks: 'علامات الوصول',
      contactLandmark1: 'صيدلية محمد عطية أحمد (أو مكتبة عماد الدين)',
      contactLandmark2: 'بالقرب من محل كراميل للعصير',
      contactLandmark3: 'أمام بوابة القرية الأولمبية',
      contactForm: 'أرسل لنا رسالة',
      contactName: 'الاسم',
      contactEmail: 'البريد الإلكتروني',
      contactMsg: 'الرسالة',
      contactSend: 'إرسال',
      contactSent: 'تم إرسال رسالتك بنجاح!',
      contactWhatsApp: 'تواصل عبر واتساب',
      contactCall: 'اتصل الآن',

      // Prototype
      protoKicker: 'نموذج واجهة متجاوب',
      protoTitle: 'مساحة تنمو فيها الفكرة.',
      protoLead: 'Groot ليست مجرد مكان للعمل، بل مجتمع يعيش الإبداع ويؤمن أن النجاح أجمل عندما يحدث وسط ناس تشبه حلمك.',
      protoOpen: 'افتح الموقع',
      protoBook: 'جرّب الحجز',
      protoNote: 'كل شاشة ملف مستقل وجاهزة للتحويل إلى مكونات.',
    },

    en: {
      navSpaces: 'Spaces & Booking',
      navContact: 'Contact & Location',
      navAdmin: 'Dashboard',
      navHome: 'Home',
      navPrototype: 'Prototypes',

      heroEyebrow: 'Co-working Space in Mansoura',
      heroTitle: 'A space where ideas grow.',
      heroLead: 'Groot is not just a place to work. It\'s a community that lives creativity and believes success is more beautiful when it happens together.',
      heroCta1: 'Explore Spaces',
      heroCta2: 'Start Booking',
      heroCta3: 'Contact & Location',
      heroGlassTitle: 'Groot is more than a workplace.',
      heroGlassText: 'A creative community with flexible spaces for study, meetings, courses, and focused individual work.',

      stat247: 'Always Open',
      stat45: 'Max Capacity',
      stat2015: 'Est. Year',
      stat65: '8-Hour Package',

      aboutTitle: 'About Groot Workspace',
      aboutHeading: 'Since 2015 we have been a growing work community in Mansoura.',
      aboutText: 'Since 2015 we\'ve been a growing work community in Mansoura. Every corner has witnessed the start of a project, dream, or idea that was born and achieved.',
      aboutYears: 'Years of Creativity',

      spacesTitle: 'Spaces',
      spacesSubtitle: 'Choose the perfect space for your needs',
      exploreMore: 'Explore More',
      previewSharedName: 'Shared Workspace',
      previewSharedText: 'Flexible seats for studying and daily work',
      previewSharedCapacity: '18 people',
      previewSharedUse: 'Daily work',
      previewMeetingName: 'Meeting Room',
      previewMeetingText: 'Central table and display screen for teams',
      previewMeetingCapacity: '10 people',
      previewMeetingUse: 'Teams & demos',
      previewLectureName: 'Lecture Hall',
      previewLectureText: 'Wide layout for workshops and lectures',
      previewLectureCapacity: '32 people',
      previewLectureUse: 'Workshops',
      previewFocusName: 'Focus Corner',
      previewFocusText: 'Quiet corners for long tasks',
      previewFocusCapacity: '6 people',
      previewFocusUse: 'Quiet focus',

      amenitiesTitle: 'Amenities',
      amenWifi: 'High-Speed Wi-Fi',
      amenAC: 'Air Conditioning',
      amenProjector: 'Display Screens',
      amenWhiteboard: 'Whiteboards',
      amenCafe: 'In-house Café',
      amenPrayer: 'Prayer Room',
      amenRest: 'Rest Area',

      pricingTitle: 'Pricing',
      pricingSubtitle: 'Flexible prices to suit your needs',
      priceFirstHour: 'First Hour',
      priceExtraHour: 'Each Extra Hour',
      price8h: '8-Hour Package',
      priceDay: 'Full Day',
      calcTitle: 'Price Calculator',
      calcHours: 'Number of Hours',
      calcResult: 'Estimated Price',
      bestValue: 'Best value',

      ctaTitle: 'Start Your Day at Groot',
      ctaText: 'Flexible spaces for studying, meetings, courses, and focused work.',
      ctaBtn: 'Book Now',

      // FAQ
      faqEyebrow: 'Quick Answers',
      faqTitle: 'Direct Information About Groot Workspace',
      faqQ1: 'What is Groot Workspace?',
      faqA1: 'Groot Workspace is a co-working and study space in Mansoura, Egypt, for students, freelancers, teams, meetings, workshops, and courses.',
      faqQ2: 'Where is Groot Workspace located?',
      faqA2: 'Groot Workspace is located at 57 El-Seddik Street, off Ahmed Maher Street, University District, Mansoura, in front of the Olympic Village gate.',
      faqQ3: 'How much does Groot Workspace cost?',
      faqA3: 'Pricing starts at 20 EGP for the first hour, 35 EGP for two hours, 50 EGP for three hours, 65 EGP for four to eight hours, and 160 EGP for a full day.',
      faqQ4: 'What spaces are available at Groot Workspace?',
      faqA4: 'Groot Workspace offers a shared workspace, meeting room, lecture hall for courses and workshops, and a quiet focus corner for individual work.',

      footerDesc: 'Co-working space in Mansoura, Egypt. A creative community since 2015.',
      footerLinks: 'Quick Links',
      footerContact: 'Contact Us',
      footerRights: '© 2025 Groot Workspace. All rights reserved.',

      bookTitle: 'Spaces are clear before you book.',
      bookLead: 'Choose a space, view its photos and details, then complete booking through WhatsApp.',
      bookTagCapacity: 'Up to 45 people',
      bookTagLocation: 'University District, Mansoura',
      bookDate: 'Date',
      bookTime: 'Time',
      bookPackage: 'Package',
      bookPeople: 'Number of People',
      bookCapacity: 'Comfortable Capacity',
      bookBestUse: 'Best Use',
      bookMood: 'Noise Level',
      bookAmenities: 'Space Amenities',
      bookDetails: 'Booking Details',
      bookWhatsApp: 'Book via WhatsApp',
      bookFit: 'Fits up to',
      bookOver: 'Exceeds comfortable capacity',
      pkg3h: '3 Hours',
      pkg8h: '8 Hours',
      pkgDay: 'Full Day',
      bookingClosed: 'Booking is currently closed',

      contactTitle: 'Getting to Groot is easy.',
      contactDesc: 'University District, 57 El-Seddik St., off Ahmed Maher St., in front of the Olympic Village gate.',
      contactPhone: 'Phone',
      contactCopy: 'Copy',
      contactCopied: 'Phone number copied.',
      contactMap: 'Open Google Maps',
      contactMapAddress: 'University District, 57 El-Seddik St. — Mansoura, Dakahlia',
      contactLandmarks: 'Landmarks',
      contactLandmark1: 'Mohamed Atia Ahmed Pharmacy (or Emad El-Din Library)',
      contactLandmark2: 'Near Caramel Juice shop',
      contactLandmark3: 'In front of the Olympic Village gate',
      contactForm: 'Send us a message',
      contactName: 'Name',
      contactEmail: 'Email',
      contactMsg: 'Message',
      contactSend: 'Send',
      contactSent: 'Your message has been sent successfully!',
      contactWhatsApp: 'Contact via WhatsApp',
      contactCall: 'Call Now',

      protoKicker: 'Responsive Website Prototype',
      protoTitle: 'A space where ideas grow.',
      protoLead: 'Groot is not just a place to work. It\'s a community that lives creativity and believes success is more beautiful when it happens together.',
      protoOpen: 'Open Website',
      protoBook: 'Try Booking',
      protoNote: 'Each screen is a separate file ready to map into components.',
    }
  };

  let currentLang = localStorage.getItem('groot-lang') || 'ar';

  /**
   * Apply language to all [data-i18n] elements
   */
  function applyLanguage(lang) {
    currentLang = lang;
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const dict = dictionary[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        if (el.tagName === 'INPUT' && el.type !== 'submit') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Update lang toggle buttons
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    localStorage.setItem('groot-lang', lang);
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  }

  /**
   * Get a translation key
   */
  function t(key) {
    return dictionary[currentLang]?.[key] || dictionary.ar[key] || key;
  }

  /**
   * Get current language
   */
  function getLang() {
    return currentLang;
  }

  // Bind language toggle buttons
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
    });

    // Apply saved language
    applyLanguage(currentLang);
  });

  // Expose globally
  window.i18n = { applyLanguage, t, getLang, dictionary };

})();
