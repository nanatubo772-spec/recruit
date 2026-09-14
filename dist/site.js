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
  const dots = Array.from(document.querySelectorAll('.slider-dots button'));
  const count = document.getElementById('slide-count');
  const previous = document.getElementById('slide-prev');
  const next = document.getElementById('slide-next');
  let activeIndex = 0;
  let scrollTimer;

  function update(index) {
    activeIndex = Math.max(0, Math.min(slides.length - 1, index));
    count.textContent = `${activeIndex + 1} / ${slides.length}`;
    dots.forEach((dot, dotIndex) => dot.setAttribute('aria-pressed', String(dotIndex === activeIndex)));
    previous.disabled = activeIndex === 0;
    next.disabled = activeIndex === slides.length - 1;
  }

  function goTo(index) {
    const target = slides[Math.max(0, Math.min(slides.length - 1, index))];
    track.scrollTo({ left: target.offsetLeft - slides[0].offsetLeft, behavior: 'auto' });
    update(index);
  }

  previous.addEventListener('click', () => goTo(activeIndex - 1));
  next.addEventListener('click', () => goTo(activeIndex + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    goTo(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  track.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const left = track.scrollLeft;
      const maxScroll = track.scrollWidth - track.clientWidth;
      if (left >= maxScroll - 3) {
        update(slides.length - 1);
        return;
      }
      const nearest = slides.reduce((winner, slide, index) => {
        const distance = Math.abs(slide.offsetLeft - slides[0].offsetLeft - left);
        return distance < winner.distance ? { index, distance } : winner;
      }, { index: 0, distance: Infinity });
      update(nearest.index);
    }, 80);
  }, { passive: true });
  update(0);
})();
