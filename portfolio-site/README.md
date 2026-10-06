# iMarked portfolio directory

A static, frontend-only directory for the Meek, Amen, and Severien portfolios. It uses HTML, CSS, and vanilla JavaScript; no build step, framework, server, database, or external font is required.

## Run locally

Open `index.html` in a browser, or serve the `portfolio-site` folder with any simple static file server. Profile links and styles use relative paths, so the project also works from a nested hosting path.

## Main files

- `index.html`, `index.css`, `index.js`: directory, search, filters, sort, profile modal, FAQ, and local profile storage.
- `shared/theme.css`, `shared/nav.css`, `shared/portfolio.css`: design tokens, shared navigation, and portfolio page layout.
- `meek/meek.html`: Meek’s portfolio, with the experience, education, and project details supplied in the resume reference.
- `amen/amen.html`, `severien/severien.html`: distinct creative and design portfolio pages with clearly general introductory project examples.
- `about/`: explains the directory and localStorage behavior.
- `404/`: standalone not-found page. Configure the host to use `404/index.html` if needed.

Profiles created with the homepage form are saved under the `portfolioProfiles` localStorage key in the current browser only. They are not sent to a server or shared between visitors. Clearing browser storage removes locally created profiles.

## Included interactions

- Responsive navigation with keyboard Escape support.
- Combined search and discipline filtering, plus featured, name, and newest sorting.
- Validated profile creation with locally persisted data and an empty search state.
- Single-open native FAQ accordion and an accessible modal dialog.
- Responsive directory, About, 404, and individual portfolio pages.
