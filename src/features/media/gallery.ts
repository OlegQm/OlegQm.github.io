interface Slide { src: string; alt: string; caption: string; }
class ImageGallery extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized) return;
    this.dataset.initialized = 'true';
    const dialog = this.querySelector<HTMLDialogElement>('dialog');
    const image = this.querySelector<HTMLImageElement>('[data-full-image]');
    const caption = this.querySelector<HTMLElement>('[data-caption]');
    const counter = this.querySelector<HTMLElement>('[data-counter]');
    if (!dialog || !image || !caption || !counter || typeof dialog.showModal !== 'function') return;
    const slides: Slide[] = JSON.parse(this.dataset.slides || '[]');
    if (!slides.length) return;
    let index = 0;
    let trigger: HTMLElement | null = null;
    const render = (next: number) => {
      index = (next + slides.length) % slides.length;
      image.src = slides[index].src;
      image.alt = slides[index].alt;
      caption.textContent = slides[index].caption;
      counter.textContent = `${index + 1} / ${slides.length}`;
    };
    this.querySelectorAll<HTMLElement>('[data-slide]').forEach(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        trigger = item;
        render(Number(item.dataset.slide));
        dialog.showModal();
        document.body.classList.add('dialog-open');
        this.querySelector<HTMLButtonElement>('[data-close]')?.focus();
      });
    });
    this.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
    this.querySelector('[data-previous]')?.addEventListener('click', () => render(index - 1));
    this.querySelector('[data-next]')?.addEventListener('click', () => render(index + 1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        render(index + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    dialog.addEventListener('click', event => {
      if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
      }
    });
    dialog.addEventListener('close', () => {
      document.body.classList.remove('dialog-open');
      trigger?.focus();
    });
  }
}
if (!customElements.get('image-gallery')) customElements.define('image-gallery', ImageGallery);
