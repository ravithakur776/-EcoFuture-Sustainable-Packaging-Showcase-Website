document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(() => body.classList.add('page-ready'));

  const navbar = document.querySelector('.navbar');
  if (navbar) {
    setupNavbar(navbar);
    setupNavbarScroll(navbar);
    setupActiveNavLink(navbar);
  }

  setupPageTransitions(prefersReducedMotion);
  setupRevealAnimations(prefersReducedMotion);
});

function setupNavbar(navbar) {
  const nav = navbar.querySelector('nav');
  if (!nav) {
    return;
  }

  nav.classList.add('nav-links');

  const actions = document.createElement('div');
  actions.className = 'navbar-actions';

  const navToggle = document.createElement('button');
  navToggle.type = 'button';
  navToggle.className = 'nav-toggle';
  navToggle.setAttribute('aria-label', 'Toggle navigation menu');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.innerHTML = '<span></span><span></span><span></span>';

  navToggle.addEventListener('click', () => {
    const open = navbar.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navbar.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  actions.appendChild(navToggle);
  navbar.appendChild(actions);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      navbar.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}



function setupNavbarScroll(navbar) {
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateNavbar = () => {
    const currentY = window.scrollY;

    navbar.classList.toggle('navbar-scrolled', currentY > 20);

    const scrollingDown = currentY > lastScrollY;
    const menuOpen = navbar.classList.contains('nav-open');

    if (scrollingDown && currentY > 140 && !menuOpen) {
      navbar.classList.add('navbar-hidden');
    } else {
      navbar.classList.remove('navbar-hidden');
    }

    lastScrollY = currentY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });
}

function setupActiveNavLink(navbar) {
  const links = navbar.querySelectorAll('nav a[href]');
  const current = window.location.pathname.split('/').pop() || 'index.html';

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

function setupPageTransitions(prefersReducedMotion) {
  if (prefersReducedMotion) {
    return;
  }

  const internalLinks = document.querySelectorAll('a[href$=".html"]');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const href = link.getAttribute('href');
      const targetUrl = new URL(href, window.location.href);

      if (targetUrl.origin !== window.location.origin) {
        return;
      }

      event.preventDefault();
      document.body.classList.add('page-exit');

      window.setTimeout(() => {
        window.location.href = targetUrl.href;
      }, 280);
    });
  });
}

function setupRevealAnimations(prefersReducedMotion) {
  const animatedElements = document.querySelectorAll(
    '.fade-in, .fade-in-up, .fade-in-scale, .slide-in-left, .slide-in-right, .bounce-in'
  );

  if (!animatedElements.length) {
    return;
  }

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    animatedElements.forEach((element) => element.classList.add('in-view'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  animatedElements.forEach((element) => revealObserver.observe(element));
}
