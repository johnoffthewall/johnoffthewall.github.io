window.addEventListener('DOMContentLoaded', event => {
    // PS1 face-button accent rotation: Red, Yellow, Blue, Green
    const ps1Accents = [
        { name: 'Red', varName: '--ps-red', textColor: '#FFFFFF' },
        { name: 'Yellow', varName: '--ps-yellow', textColor: '#1A1A1A' },
        { name: 'Blue', varName: '--ps-blue', textColor: '#FFFFFF' },
        { name: 'Green', varName: '--ps-green', textColor: '#FFFFFF' }
    ];

    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');

    function applyAccent(index) {
        const accent = ps1Accents[index];
        root.style.setProperty('--ps1-accent', `var(${accent.varName})`);
        root.style.setProperty('--ps1-accent-text', accent.textColor);

        if (themeToggle) {
            themeToggle.title = `Toggle theme (accent: ${accent.name})`;
            themeToggle.setAttribute('aria-label', `Toggle theme, current accent ${accent.name}`);
        }

        localStorage.setItem('accentIndex', String(index));
    }

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Restore accent from last visit (or default to Red)
    const savedAccentIndex = parseInt(localStorage.getItem('accentIndex'), 10);
    let accentIndex = Number.isInteger(savedAccentIndex) ? savedAccentIndex % ps1Accents.length : 0;
    applyAccent(accentIndex);

    // Theme (light/dark) was already set on <html> before first paint
    // by the inline script in <head>; nothing to do here on load.

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Flip light/dark
            const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);

            // Rotate to the next PS1 accent color
            accentIndex = (accentIndex + 1) % ps1Accents.length;
            applyAccent(accentIndex);
        });
    }

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) return;

        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    navbarShrink();
    document.addEventListener('scroll', navbarShrink);
});