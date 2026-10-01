# iMarked

A responsive creative portfolio directory built with plain HTML, CSS, and JavaScript.

## Run locally

Open `index.html` in a browser, or serve the `portfolio-site` folder with any static file server. No framework or build step is required.

## Directory profiles

The directory features Meek, Amen, and Severien, and lets visitors add their own details, search by name or discipline, and sort the results. Added profiles are stored in the browser's local storage on the current device. They are not uploaded, shared with other visitors, or backed up by a server. Clearing browser storage removes those locally saved profiles.

The profile form accepts a name, professional title, discipline, location, short introduction, and an HTTP or HTTPS portfolio URL. The URL opens from the profile card.

## Project structure

```text
portfolio-site/
├── index.html
├── index.css
├── index.js
├── assets/
│   └── meek-landscape.svg
├── about/                   # About iMarked
├── 404/                     # Not-found page
├── meek/
│   ├── meek.html
│   ├── style.css
│   └── script.js
├── amen/                    # Amen's portfolio
├── severien/                # Severien's portfolio
└── shared/                  # Shared styles
```

Meek's landscape artwork appears on both the directory card and Meek's portfolio page. Amen's and Severien's pages use illustrative concept layouts; replace the sample copy and visuals with their approved details and work when available.
