<<<<<<< HEAD
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
=======
# Team Portfolio Website

A collaborative portfolio for Meek, Amen, and Severien. The site is organized with one folder per page and uses plain HTML, CSS, and JavaScript.

## Project structure

```text
portfolio-site/
├── index.html              # Homepage
├── index.css               # Homepage styles
├── index.js                # Homepage interactions
├── about/
│   ├── index.html           # About page
│   ├── style.css
│   └── script.js
├── 404/
│   ├── index.html           # Not-found page
│   ├── style.css
│   └── script.js
├── meek/                    # Meek's portfolio page and assets
├── amen/                    # Amen's portfolio page and assets
├── severien/                # Severien's portfolio page and assets
├── shared/                  # Styles shared between pages
└── assets/                  # Images, icons, and fonts
```

The Contact and Projects pages have been removed. The homepage remains at the root of `portfolio-site`; the About and not-found pages live in their own folders. Member portfolios are kept in each member's folder.

## Technologies

- HTML
- CSS
- JavaScript
>>>>>>> origin/main
