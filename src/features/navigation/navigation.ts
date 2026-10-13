const button = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const nav = document.querySelector<HTMLElement>('#primary-navigation');
if (button && nav) {
  const setOpen = (open: boolean) => {
    nav.dataset.open = String(open);
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  };
  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener('click', event => {
    if (event.target instanceof Node && !nav.contains(event.target) && !button.contains(event.target)) setOpen(false);
  });
  nav.addEventListener('click', event => {
    if (event.target instanceof Element && event.target.closest('a')) setOpen(false);
  });
  const desktop = window.matchMedia('(min-width: 48rem)');
  desktop.addEventListener('change', () => setOpen(false));
}
