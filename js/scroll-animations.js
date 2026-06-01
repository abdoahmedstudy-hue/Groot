/* ============================================================
   Groot Workspace — Scroll Animations
   IntersectionObserver-based reveals & counter animations
   ============================================================ */

(function () {
  'use strict';

  if (window.prefersReducedMotion) return;

  /* ── Scroll Reveal ────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-scale').forEach(el => {
      revealObserver.observe(el);
    });
  });

  /* ── Counter Animation ────────────────────────────────── */
  window.animateCounter = function (element, target, duration = 1200, suffix = '') {
    if (!element || window.prefersReducedMotion) {
      if (element) element.textContent = target + suffix;
      return;
    }

    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(start + (target - start) * eased);

      element.textContent = current.toLocaleString('en-US') + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  };

  /* ── Counter Observer ─────────────────────────────────── */
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.countSuffix || '';
          animateCounter(el, target, 1200, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-count]').forEach(el => {
      counterObserver.observe(el);
    });
  });

  /* ── Parallax ─────────────────────────────────────────── */
  const parallaxElements = [];

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      parallaxElements.push({
        el,
        speed: parseFloat(el.dataset.parallax) || 0.3
      });
    });

    if (parallaxElements.length) {
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            parallaxElements.forEach(({ el, speed }) => {
              const offset = scrollY * speed;
              el.style.transform = `translateY(${offset}px)`;
            });
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  });

})();
