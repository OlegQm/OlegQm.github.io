export {};

const copyButton = document.querySelector<HTMLButtonElement>('[data-copy-email]');
const copyStatusRegion = document.querySelector<HTMLElement>('[data-copy-status]');

copyButton?.addEventListener('click', async () => {
  const email = copyButton.dataset.copyEmail;
  if (!email || !copyStatusRegion) return;

  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
    await navigator.clipboard.writeText(email);
    copyStatusRegion.textContent = 'Email address copied.';
  } catch {
    copyStatusRegion.textContent = 'Could not copy the address. Use the email link instead.';
  }
});
