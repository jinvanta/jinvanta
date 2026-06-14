/* ============================================================
   Jinvanta — Interaction & Animation Script
   ============================================================ */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Mobile Navigation ---------- */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function closeMenu() {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    }

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });

      // Close on link click
      navMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });

      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('open') &&
            !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
          closeMenu();
        }
      });
    }

    /* ---------- Header shadow on scroll ---------- */
    const header = document.getElementById('siteHeader');
    const backToTop = document.getElementById('backToTop');

    function onScroll() {
      const y = window.scrollY;
      if (header) header.classList.toggle('scrolled', y > 20);
      if (backToTop) backToTop.classList.toggle('show', y > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Back to top ---------- */
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ---------- Scroll Reveal (IntersectionObserver) ---------- */
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      const observer = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            // small stagger for siblings entering together
            entry.target.style.transitionDelay = (i % 6) * 70 + 'ms';
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

      reveals.forEach(function (el) { observer.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ---------- Inspirational Quotes Rotator ---------- */
    const quotes = Array.prototype.slice.call(document.querySelectorAll('.quote'));
    const dotsWrap = document.getElementById('quoteDots');
    let current = 0;
    let timer = null;

    if (quotes.length && dotsWrap) {
      // build dots
      quotes.forEach(function (_, idx) {
        const dot = document.createElement('button');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', 'Quote ' + (idx + 1));
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', function () { goTo(idx); resetTimer(); });
        dotsWrap.appendChild(dot);
      });
      const dots = Array.prototype.slice.call(dotsWrap.children);

      function goTo(idx) {
        quotes[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (idx + quotes.length) % quotes.length;
        quotes[current].classList.add('active');
        dots[current].classList.add('active');
      }
      function next() { goTo(current + 1); }
      function resetTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(next, 6000);
      }
      resetTimer();

      // pause on hover
      const track = document.getElementById('quotesTrack');
      if (track) {
        track.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
        track.addEventListener('mouseleave', resetTimer);
      }
    }

    /* ---------- Contact Form (Formspree-compatible AJAX) ---------- */
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        status.textContent = '';
        status.className = 'form-status';

        // basic validation
        if (!form.checkValidity()) {
          status.textContent = 'Please fill in all required fields correctly.';
          status.classList.add('error');
          form.reportValidity();
          return;
        }

        const action = form.getAttribute('action') || '';
        // If Formspree endpoint not yet configured, show a friendly message.
        if (action.indexOf('YOUR_FORM_ID') !== -1) {
          status.textContent = 'Thank you! (Demo mode — connect your Formspree ID to receive messages.)';
          status.classList.add('success');
          form.reset();
          return;
        }

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn ? btn.textContent : '';
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

        fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        }).then(function (res) {
          if (res.ok) {
            status.textContent = 'Thank you! Your message has been sent. 🙏';
            status.classList.add('success');
            form.reset();
          } else {
            return res.json().then(function (data) {
              const msg = data && data.errors ? data.errors.map(function (x) { return x.message; }).join(', ')
                                               : 'Something went wrong. Please try again.';
              throw new Error(msg);
            });
          }
        }).catch(function (err) {
          status.textContent = err.message || 'Network error. Please try again later.';
          status.classList.add('error');
        }).finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = originalText; }
        });
      });
    }

    /* ---------- Current Year in Footer ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Active nav link on scroll (scroll-spy) ---------- */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    if ('IntersectionObserver' in window && sections.length) {
      const spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(function (l) {
              l.classList.toggle('active', l.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
    }

  });
})();
