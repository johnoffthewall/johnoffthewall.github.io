window.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'theme';

  /**
   * Resolve the theme to use on load:
   * 1. A theme the user explicitly picked before (localStorage)
   * 2. Otherwise, the OS-level preference (prefers-color-scheme)
   * 3. Otherwise, light.
   * (This mirrors the inline <head> script that already set the
   * attribute before first paint — this just keeps everything in sync.)
   */
  function getStoredTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme, { persist = true } = {}) {
    root.setAttribute('data-theme', theme);
    if (persist) {
      localStorage.setItem(STORAGE_KEY, theme);
    }
    if (themeToggle) {
      const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      themeToggle.setAttribute('aria-label', label);
      themeToggle.title = label;
      themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  // Sync with whatever the head script already applied.
  applyTheme(getPreferredTheme(), { persist: false });

  if (themeToggle) {
    const toggleIcon = themeToggle.querySelector('.toggle-icon');
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');

      if (toggleIcon) {
        // Restart the rotate-and-return animation on every click, even
        // mid-spin, so rapid toggling still feels responsive.
        toggleIcon.classList.remove('flip');
        void toggleIcon.offsetWidth; // force reflow to reset the animation
        toggleIcon.classList.add('flip');
      }
    });
    if (toggleIcon) {
      toggleIcon.addEventListener('animationend', () => {
        toggleIcon.classList.remove('flip');
      });
    }
  }

  // If the user has never explicitly chosen a theme, keep following the
  // OS preference live (e.g. their system switches to dark mode at night).
  if (window.matchMedia) {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (event) => {
      if (!getStoredTheme()) {
        applyTheme(event.matches ? 'dark' : 'light', { persist: false });
      }
    };
    if (media.addEventListener) {
      media.addEventListener('change', handleSystemChange);
    } else if (media.addListener) {
      media.addListener(handleSystemChange);
    }
  }

  // Dock nav: highlight the icon for the section currently in view
  const dockItems = Array.from(document.querySelectorAll('.dock-item[href]'));
  const dockSections = dockItems
    .map((item) => document.querySelector(item.getAttribute('href')))
    .filter(Boolean);
  if (dockItems.length && dockSections.length && 'IntersectionObserver' in window) {
    const setActive = (id) => {
      dockItems.forEach((item) => {
        item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    dockSections.forEach((section) => observer.observe(section));
  }

  // Lightweight contact form handling (no backend wired up — just UX feedback)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      const submitButton = document.getElementById('submitButton');
      const originalLabel = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Message sent';
      form.reset();
      form.classList.remove('was-validated');
      setTimeout(() => {
        submitButton.disabled = false;
        submitButton.textContent = originalLabel;
      }, 2500);
    });
  }

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

const lightbox = GLightbox({
    touchNavigation: false,
    loop: false,
    autoplayVideos: true,
    descPosition: 'top',
    closeButton: true
});

// Portfolio images are placeholders until real project photos are added.
// If a slide's image 404s, swap in an inline placeholder frame instead of
// letting the browser show its default broken-image icon.
const PLACEHOLDER_FRAME =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E" +
  "%3Crect width='800' height='600' fill='%23e7e9eb'/%3E" +
  "%3Cg fill='none' stroke='%23a3abb3' stroke-width='6' stroke-linecap='round' stroke-linejoin='round'%3E" +
  "%3Crect x='150' y='130' width='500' height='340' rx='10'/%3E" +
  "%3Ccircle cx='262' cy='222' r='26' fill='%23a3abb3' stroke='none'/%3E" +
  "%3Cpath d='M170 410 L320 280 L430 370 L540 260 L630 400'/%3E" +
  "%3C/g%3E%3C/svg%3E";

document.addEventListener('error', (event) => {
  const img = event.target;
  if (!img.closest) return;

  // Lightbox slide image 404s — swap in an inline placeholder frame
  // instead of letting the browser show its default broken-image icon.
  if (img.closest('.gslide-image') && img.src !== PLACEHOLDER_FRAME) {
    img.src = PLACEHOLDER_FRAME;
    img.classList.add('placeholder-frame');
    return;
  }

  // Portfolio thumbnail photo hasn't been added yet — reveal the
  // "Image coming soon" fallback that's already sitting behind it.
  const thumb = img.closest('.portfolio-thumb.portfolio-photo');
  if (thumb) {
    thumb.classList.add('img-missing');
  }
}, true);