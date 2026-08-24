# John Off The Wall

A personal capstone website built with HTML5 and CSS3 to introduce myself, showcase my background, and share the projects and interests that make up my life outside of work.

## 🚀 Live Website

[![Website](https://img.shields.io/badge/Website-0070f3?style=for-the-badge&logo=googlechrome&logoColor=white)](https://johnoffthewall.github.io)

---

## 📖 Project Description

This project's goal was to build a personal website that showcases my skills, experience, and interests in a way that's visually appealing and easy to navigate. Rather than a straightforward resume site, "John Off The Wall" documents who I am outside of work - my tech curiosity, self-taught tinkering, and passions like motorcycles, music, dogs, and casual gaming - while still surfacing the relevant background info a visitor or recruiter would want to see.

---

## ✨ Features

* **Hero Section:** A brief introduction to me - "John Paul / Jampol" - with custom branding and quick links.
* **About Me (Off the Wall):** An interactive grid covering my interests and hobbies - Tech, Self-Taught Creative Work, Riding/Road Trips, Gaming, Music, and Dogs.
* **Contact Me:** A "Reach Out" section with a direct way to get in touch.
* **Light/Dark Theme:** Custom light and dark mode support using CSS variables, so the site is comfortable to browse in either setting.

---

## 🛠️ Tech Stack & Requirements

* **HTML5:** Semantic structural layout (`<header>`, `<nav>`, `<section>`, `<footer>`) for accessibility.
* **CSS3:** Custom stylesheets (`styles.css`, `theme.css`) with theme variables for the color palette, responsive layout, and component styling.
* **Bootstrap 5:** Utility classes for grid layout and responsive spacing.
* **Typography & Icons:** Font Awesome icon set and Google Fonts (`Space Grotesk`, `Fraunces`).
* **Media & Assets:** Compressed imagery with descriptive `alt` attributes for performance and screen-reader accessibility.
* **JavaScript:** A small amount of vanilla JS powers the theme toggle and a couple of interactive UI bits (like the quick-links popup and the "copy email" action). Everything else is built with plain HTML and CSS.

> Note: the original capstone brief calls for an HTML/CSS-only build. This site is HTML/CSS first, with a light layer of JS reserved for progressive-enhancement features (theme switching and clipboard copy) that don't affect the core content or navigation - the site is fully readable and usable with JS disabled.

---

## 📁 Repository Structure

```text
.
├── index.html        # Primary HTML structure of the personal site
├── css/
│   ├── styles.css    # Main layout, typography, and component styling
│   └── theme.css     # Theme variables (light/dark mode palettes)
├── js/
│   └── scripts.js    # Theme switching logic and UI interactions
├── assets/
│   └── img/          # Personal photos, icons, and thumbnails
└── README.md         # Project documentation
```