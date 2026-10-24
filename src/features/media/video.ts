class ClickToLoadVideo extends HTMLElement {
  connectedCallback() {
    if (this.dataset.initialized) return;
    this.dataset.initialized = 'true';
    const button = this.querySelector<HTMLButtonElement>('[data-load-video]');
    const player = this.querySelector<HTMLElement>('[data-video-player]');
    const poster = this.querySelector<HTMLElement>('[data-video-poster]');
    const status = this.querySelector<HTMLElement>('[data-video-status]');
    button?.addEventListener('click', () => {
      if (!player || !poster || !status || player.querySelector('iframe')) return;
      const id = this.dataset.videoId;
      if (!id || !/^[a-zA-Z0-9_-]{11}$/.test(id)) return;
      const frame = document.createElement('iframe');
      frame.title = 'Robotic arm real-life testing - Oleh Savchenko';
      frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=0&controls=1&rel=0`;
      frame.allow = 'encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      status.textContent = 'Loading video…';
      frame.addEventListener('load', () => { status.textContent = 'Video ready.'; });
      frame.addEventListener('error', () => {
        status.textContent = 'Video unavailable. Watch on YouTube below.';
        status.classList.remove('sr-only');
      });
      poster.hidden = true;
      player.append(frame);
      this.dataset.loaded = 'true';
      frame.focus();
    });
  }
}
if (!customElements.get('click-to-load-video')) customElements.define('click-to-load-video', ClickToLoadVideo);
