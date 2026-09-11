(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Preloader ---------- */
  var preloader = document.getElementById('preloader');
  function hidePreloader() {
    if (!preloader) return;
    preloader.classList.add('is-hidden');
  }
  if (document.readyState === 'complete') {
    setTimeout(hidePreloader, 250);
  } else {
    window.addEventListener('load', function () { setTimeout(hidePreloader, 250); });
  }
  // Safety net so the site never gets stuck behind the preloader.
  setTimeout(hidePreloader, 2500);

  /* ---------- Header reveal ----------
     On the cinematic hero page, hold the nav back for 2s so the
     opening media reads uninterrupted, then bring it in softly.
     Other pages (no full-bleed hero) reveal it right away. */
  var siteHeader = document.getElementById('siteHeader');
  if (siteHeader) {
    var hasCinematicHero = !!document.querySelector('.hero');
    var headerDelay = hasCinematicHero && !reducedMotion ? 2000 : 150;
    setTimeout(function () { siteHeader.classList.add('is-in'); }, headerDelay);
  }

  /* ---------- Scroll progress bar + nav solidify ---------- */
  var progress = document.getElementById('scrollProgress');
  var nav = document.querySelector('.pill-nav');
  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var ratio = max > 0 ? window.scrollY / max : 0;
    if (progress) progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, ratio)) + ')';
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }
  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Active nav link = current page ---------- */
  var navLinks = document.querySelectorAll('.pill-nav__links a, .mobile-menu__links a');
  var currentPage = (window.location.pathname.split('/').pop() || 'index.html');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    link.classList.toggle('is-active', href === currentPage || (currentPage === '' && href === 'index.html'));
  });

  /* ---------- Smooth scroll for data-scroll-to ---------- */
  document.querySelectorAll('[data-scroll-to]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-scroll-to'));
      if (target) target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = Array.prototype.indexOf.call(el.parentElement.children, el) * 60;
          setTimeout(function () { el.classList.add('is-visible'); }, Math.min(delay, 360));
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Philosophy crossfade ---------- */
  var beats = document.querySelectorAll('.philosophy__beat');
  var philoImgs = document.querySelectorAll('.philosophy__img');
  function activateBeat(index) {
    beats.forEach(function (b) { b.classList.toggle('is-active', b.getAttribute('data-beat') === String(index)); });
    philoImgs.forEach(function (img) { img.classList.toggle('is-active', img.getAttribute('data-beat') === String(index)); });
  }
  beats.forEach(function (beat) {
    var idx = beat.getAttribute('data-beat');
    beat.addEventListener('mouseenter', function () { activateBeat(idx); });
    beat.addEventListener('focus', function () { activateBeat(idx); });
  });
  if (beats.length) {
    var autoIdx = 0;
    var philoTimer = reducedMotion ? null : setInterval(function () {
      autoIdx = (autoIdx + 1) % beats.length;
      activateBeat(autoIdx);
    }, 3200);
    var philoSection = document.getElementById('philosophy');
    if (philoSection && philoTimer) {
      philoSection.addEventListener('mouseenter', function () { clearInterval(philoTimer); });
    }
  }

  /* ---------- Portfolio filter ---------- */
  var filterChips = document.querySelectorAll('.chip');
  var portfolioItems = document.querySelectorAll('#portfolioGrid [data-industry]');
  filterChips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      filterChips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var filter = chip.getAttribute('data-filter');
      portfolioItems.forEach(function (item) {
        var match = filter === 'all' || item.getAttribute('data-industry') === filter;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------- Highlight linked work item ---------- */
  if (window.location.hash) {
    var targetWork = document.querySelector('.work-item' + window.location.hash);
    if (targetWork) {
      targetWork.classList.add('is-target');
      setTimeout(function () { targetWork.classList.remove('is-target'); }, 2600);
    }
  }

  /* ---------- Testimonial carousel controls ---------- */
  var testiViewport = document.getElementById('testiViewport');
  var testiPrev = document.getElementById('testiPrev');
  var testiNext = document.getElementById('testiNext');
  function testiScrollBy(dir) {
    if (!testiViewport) return;
    var card = testiViewport.querySelector('.testi-card');
    var step = card ? card.getBoundingClientRect().width + 20 : 360;
    testiViewport.scrollBy({ left: dir * step, behavior: reducedMotion ? 'auto' : 'smooth' });
  }
  if (testiPrev) testiPrev.addEventListener('click', function () { testiScrollBy(-1); });
  if (testiNext) testiNext.addEventListener('click', function () { testiScrollBy(1); });

  /* ---------- Map load-on-click ---------- */
  var mapBtn = document.getElementById('mapLoadBtn');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Building No. 92-G, 2nd Floor, G-Block, Sector G, DHA Phase 1, Lahore'), '_blank', 'noopener');
    });
  }

  /* ---------- Contact form (client-side only) ---------- */
  var form = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        formStatus.textContent = 'Please fill in your name, a valid email, and your brief.';
        formStatus.className = 'form-status is-error';
        return;
      }

      formStatus.textContent = 'Thanks — your brief has been received. We typically respond within an hour.';
      formStatus.className = 'form-status is-success';
      form.reset();
    });
  }
})();
