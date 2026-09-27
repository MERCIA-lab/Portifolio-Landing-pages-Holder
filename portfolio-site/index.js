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
