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
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
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

  // Navbar shrink on scroll
  const navbarShrink = () => {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    nav.classList.toggle('navbar-shrink', window.scrollY > 0);
  };
  navbarShrink();
  document.addEventListener('scroll', navbarShrink);

  // Bootstrap collapse: close the mobile menu after a nav link is clicked
  document.querySelectorAll('#navbarSupportedContent .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('navbarSupportedContent');
      if (nav && nav.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(nav).hide();
      }
    });
  });

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