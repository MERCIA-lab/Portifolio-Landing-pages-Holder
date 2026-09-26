# Project Structure

This repository contains a static portfolio website built with HTML, CSS,
and JavaScript. The main site lives in the `portfolio-site/` directory.

```text
portfolio-site/
├── index.html, index.css, index.js       # Landing page
├── about.html, about.css, about.js       # About page
├── projects.html, projects.css, projects.js
├── contact.html, contact.css, contact.js # Contact page
├── 404.html, 404.css, 404.js             # Not-found page
├── amen/                                 # Amen's portfolio
├── meek/                                 # Meek's portfolio
├── severien/                             # Severien's portfolio
├── shared/                               # Shared navigation and theme styles
└── assets/                               # Fonts, icons, and images
```

The top-level HTML files provide the shared navigation and pages that
connect the site. Each collaborator's folder contains their portfolio
page, page-specific stylesheet, and JavaScript. The `shared/` directory
holds styles used across pages, while `assets/` stores reusable visual
resources.
