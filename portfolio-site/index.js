<<<<<<< Updated upstream
(function () {
  var menuButton = document.querySelector('.menu-toggle');
  var mobileMenu = document.querySelector('#mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function () {
      var isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      mobileMenu.hidden = isOpen;
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      });
    });

    document.addEventListener('click', function (event) {
      if (!mobileMenu.hidden && !mobileMenu.contains(event.target) && !menuButton.contains(event.target)) {
        mobileMenu.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !mobileMenu.hidden) {
        mobileMenu.hidden = true;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        menuButton.focus();
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}());
=======
const storageKey = 'portfolio-index-profiles-v1';
const starterProfiles = [
  { id: 'meek', name: 'Meek', title: 'Independent creative', discipline: 'Design', location: 'Available worldwide', bio: 'A creative practice focused on thoughtful digital experiences and clear visual communication.', website: 'meek/meek.html', image: 'assets/meek-landscape.svg', featured: true, createdAt: 0, local: false },
  { id: 'amen', name: 'Amen', title: 'Creative portfolio', discipline: 'Design', location: 'iMarked member', bio: 'Digital ideas, visual systems, and ongoing creative explorations.', website: 'amen/amen.html', featured: true, createdAt: 0, local: false },
  { id: 'severien', name: 'Severien', title: 'Creative portfolio', discipline: 'Art direction', location: 'iMarked member', bio: 'A visual journal of observations, moments, and everyday places.', website: 'severien/severien.html', featured: true, createdAt: 0, local: false }
];

const grid = document.querySelector('#portfolio-grid');
const search = document.querySelector('#search');
const discipline = document.querySelector('#discipline');
const sort = document.querySelector('#sort');
const form = document.querySelector('#portfolio-form');
const message = document.querySelector('#form-message');
const bio = document.querySelector('#bio');
const bioCount = document.querySelector('#bio-count');

function loadProfiles() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return [...starterProfiles, ...(Array.isArray(saved) ? saved.filter(profile => profile && typeof profile.name === 'string') : [])];
  } catch {
    return [...starterProfiles];
  }
}

function initials(name) {
  return name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
}

function render() {
  const query = search.value.trim().toLowerCase();
  const chosenDiscipline = discipline.value;
  let profiles = loadProfiles().filter(profile => {
    const searchable = [profile.name, profile.title, profile.discipline, profile.location, profile.bio].join(' ').toLowerCase();
    return searchable.includes(query) && (!chosenDiscipline || profile.discipline === chosenDiscipline);
  });

  if (sort.value === 'name') profiles.sort((a, b) => a.name.localeCompare(b.name));
  if (sort.value === 'recent') profiles.sort((a, b) => b.createdAt - a.createdAt);
  if (sort.value === 'featured') profiles.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name));

  grid.replaceChildren(...profiles.map((profile, index) => {
    const card = document.createElement('a');
    card.className = 'portfolio-card';
    card.href = profile.website;
    if (profile.local) {
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }
    const top = document.createElement('div');
    top.className = 'card-top';
    const number = document.createElement('span');
    number.className = 'card-index';
    number.textContent = String(index + 1).padStart(2, '0');
    const category = document.createElement('span');
    category.className = 'card-discipline';
    category.textContent = profile.discipline;
    top.append(number, category);
    const avatar = document.createElement('span');
    avatar.className = 'card-avatar';
    if (profile.image) {
      const portrait = document.createElement('img');
      portrait.src = profile.image;
      portrait.alt = `${profile.name}'s profile`;
      avatar.append(portrait);
    } else {
      avatar.textContent = initials(profile.name);
    }
    const name = document.createElement('h3');
    name.className = 'card-name';
    name.textContent = profile.name;
    const title = document.createElement('p');
    title.className = 'card-title';
    title.textContent = profile.title;
    const bottom = document.createElement('div');
    bottom.className = 'card-bottom';
    const location = document.createElement('span');
    location.textContent = profile.location;
    bottom.append(location);
    card.append(top, avatar, name, title, bottom);
    return card;
  }));

  document.querySelector('#results-count').textContent = `${profiles.length} ${profiles.length === 1 ? 'PORTFOLIO' : 'PORTFOLIOS'} FOUND`;
  document.querySelector('#empty-state').hidden = profiles.length !== 0;
}

search.addEventListener('input', render);
discipline.addEventListener('change', render);
sort.addEventListener('change', render);
bio.addEventListener('input', () => { bioCount.textContent = bio.value.length; });

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  let website;
  try {
    website = new URL(String(data.get('website')).trim());
  } catch {
    message.textContent = 'Enter a complete website address, including https://.';
    return;
  }
  if (!['https:', 'http:'].includes(website.protocol)) {
    message.textContent = 'Use a website address that starts with http:// or https://.';
    return;
  }

  const profile = {
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(data.get('name')).trim(),
    title: String(data.get('title')).trim(),
    discipline: String(data.get('discipline')),
    location: String(data.get('location')).trim(),
    bio: String(data.get('bio')).trim(),
    website: website.href,
    featured: false,
    createdAt: Date.now(),
    local: true
  };

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
    localStorage.setItem(storageKey, JSON.stringify([...(Array.isArray(saved) ? saved : []), profile]));
  } catch {
    message.textContent = 'This browser could not save the profile. Check your browser storage settings and try again.';
    return;
  }

  form.reset();
  bioCount.textContent = '0';
  message.textContent = 'Your profile has been added to this browser’s directory.';
  render();
  document.querySelector('#directory').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#year').textContent = new Date().getFullYear();
render();
>>>>>>> Stashed changes
