(() => {
  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function setLines(element, lines) {
    if (!element || !Array.isArray(lines)) return;
    element.replaceChildren();
    lines.forEach((line, index) => {
      if (index) element.append(document.createElement('br'));
      element.append(document.createTextNode(line));
    });
  }

  function phoneHref(phone) {
    return `tel:${String(phone).replace(/[^0-9+]/g, '')}`;
  }

  function applyContentConfig() {
    const config = window.NANATSUBO_CONTENT;
    if (!config) return;
    root.dataset.contentConfig = 'loaded';

    const section01 = document.querySelector('#appeal');
    if (section01 && config.section01) {
      setLines(section01.querySelector('.section-intro h2'), config.section01.heading);
      section01.querySelector('.section-intro > p:last-child').textContent = config.section01.description;
      const cards = section01.querySelectorAll('.benefit');
      config.section01.cards?.forEach((card, index) => {
        const element = cards[index];
        if (!element) return;
        element.querySelector('.benefit-number').textContent = card.number;
        element.querySelector('.benefit-label').textContent = card.label;
        element.querySelector('h3').textContent = card.title;
        element.querySelector('.benefit-body p').textContent = card.body;
      });
    }

    const section02 = document.querySelector('.photos');
    if (section02 && config.section02) {
      section02.querySelector('h2').textContent = config.section02.heading;
      section02.querySelector('.photos-heading > p:last-child').textContent = config.section02.description;
      const photos = section02.querySelectorAll('.slide');
      config.section02.photos?.forEach((photo, index) => {
        const figure = photos[index];
        if (!figure) return;
        const image = figure.querySelector('img');
        image.src = photo.src;
        image.alt = photo.alt;
        figure.querySelector('figcaption').textContent = photo.caption;
      });
    }

    const section03 = document.querySelector('#recruit');
    if (section03 && config.section03) {
      setLines(section03.querySelector('.section-intro h2'), config.section03.heading);
      section03.querySelector('.section-intro > p:last-child').textContent = config.section03.description;
      section03.querySelector('.panel-top strong').textContent = config.section03.shopName;
      section03.querySelector('.panel-top span').textContent = config.section03.status;

      const list = section03.querySelector('.recruit-panel dl');
      list.replaceChildren();
      config.section03.conditions?.forEach((condition) => {
        const row = document.createElement('div');
        const term = document.createElement('dt');
        const description = document.createElement('dd');
        const value = condition.highlight ? document.createElement('strong') : document.createTextNode(condition.value);
        term.textContent = condition.label;
        if (condition.highlight) {
          value.className = 'salary';
          value.textContent = condition.value;
        }
        description.append(value);
        if (condition.note) {
          description.append(document.createElement('br'));
          const note = document.createElement('small');
          note.textContent = condition.note;
          description.append(note);
        }
        row.append(term, description);
        list.append(row);
      });

      const contact = config.section03.contact;
      const box = section03.querySelector('.contact-box');
      box.querySelector('.contact-label').textContent = contact.heading;
      box.querySelector(':scope > p:not(.contact-label)').textContent = contact.description;
      const primary = box.querySelector('.contact-call');
      primary.href = phoneHref(contact.applicationPhone);
      primary.setAttribute('aria-label', `${contact.applicationLabel}に電話する ${contact.applicationPhone}`);
      primary.querySelector('span:first-child').textContent = contact.applicationLabel;
      primary.querySelector('strong').textContent = contact.applicationPhone;
      const secondary = box.querySelector('.contact-sub');
      secondary.href = phoneHref(contact.shopPhone);
      secondary.textContent = `${contact.shopLabel}　${contact.shopPhone}`;
      box.querySelector(':scope > small').textContent = contact.note;
    }
  }

  applyContentConfig();

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
