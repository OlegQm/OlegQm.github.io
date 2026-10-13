const root = document.documentElement;
const toggle = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const preference = window.matchMedia('(prefers-color-scheme: dark)');
const storageKey = 'oleh-portfolio-theme';
let manual: string | null = null;
try { manual = localStorage.getItem(storageKey); } catch { /* The theme works with storage unavailable. */ }
const updateButton = () => {
  const dark = root.dataset.theme === 'dark';
  toggle?.setAttribute('aria-pressed', String(dark));
  toggle?.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
};
updateButton();
toggle?.addEventListener('click', () => {
  manual = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = manual;
  try { localStorage.setItem(storageKey, manual); } catch { /* No persistence when storage is blocked. */ }
  updateButton();
});
preference.addEventListener('change', event => {
  if (manual !== 'light' && manual !== 'dark') {
    root.dataset.theme = event.matches ? 'dark' : 'light';
    updateButton();
  }
});
