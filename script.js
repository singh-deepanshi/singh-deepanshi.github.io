(() => {
  const root = document.documentElement;
  const themeButton = document.getElementById('theme-toggle');
  const menuButton = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const year = document.getElementById('current-year');

  if (year) year.textContent = String(new Date().getFullYear());

  const savedTheme = (() => {
    try { return localStorage.getItem('deepanshi-theme'); } catch { return null; }
  })();
  if (savedTheme === 'dark' || savedTheme === 'light') root.dataset.theme = savedTheme;

  const updateThemeLabel = () => {
    const dark = root.dataset.theme === 'dark';
    themeButton?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeButton?.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
  };
  updateThemeLabel();

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('deepanshi-theme', next); } catch { /* storage may be disabled */ }
    updateThemeLabel();
  });

  const closeMenu = () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    nav?.classList.remove('is-open');
  };
  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav?.classList.toggle('is-open', open);
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  const revealItems = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }
})();
