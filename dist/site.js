(() => {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    root.classList.add('js-ready');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  }

  const track = document.getElementById('shop-slider');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.slide'));
  const mobile = window.matchMedia('(max-width: 699px)');
  let activeIndex = 0;
  let timer;
  let interrupted = false;

  function stop() {
    interrupted = true;
    clearTimeout(timer);
  }

  function goTo(index) {
    activeIndex = Math.max(0, Math.min(slides.length - 1, index));
    track.scrollTo({ left: slides[activeIndex].offsetLeft - slides[0].offsetLeft, behavior: 'smooth' });
  }

  function advance() {
    if (interrupted || !mobile.matches || activeIndex >= slides.length - 1) return;
    goTo(activeIndex + 1);
    if (activeIndex < slides.length - 1) timer = setTimeout(advance, 3300);
  }

  track.addEventListener('pointerdown', stop, { passive: true });
  track.addEventListener('touchstart', stop, { passive: true });
  track.addEventListener('wheel', stop, { passive: true });
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    stop();
    activeIndex = slides.reduce((nearest, slide, index) => {
      const offset = Math.abs(slide.offsetLeft - slides[0].offsetLeft - track.scrollLeft);
      return offset < nearest.offset ? { index, offset } : nearest;
    }, { index: 0, offset: Infinity }).index;
    goTo(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });

  if (!prefersReducedMotion.matches && 'IntersectionObserver' in window) {
    const starter = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || !mobile.matches) return;
      starter.disconnect();
      timer = setTimeout(advance, 1700);
    }, { threshold: 0.35 });
    starter.observe(track);
  }
})();
