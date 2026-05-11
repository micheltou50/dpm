// MWorx Group site — shared scripts

// Reveal-on-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal, .stagger').forEach(el => io.observe(el));

// Hero headline reveal on load
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    const headline = document.querySelector('h1.hero-headline');
    if (headline) headline.classList.add('in');
    document.querySelectorAll('.hero .stagger, .page-hero .stagger').forEach(el => el.classList.add('in'));
  });
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav.primary');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.textContent = nav.classList.contains('open') ? 'Close' : 'Menu';
  });
}

// Nav dropdown — desktop hover with close-delay + mobile tap
document.querySelectorAll('.nav-item-dropdown').forEach((item) => {
  let closeTimer;
  const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

  const open = () => {
    clearTimeout(closeTimer);
    item.classList.add('open');
    const subToggle = item.querySelector('.nav-sub-toggle');
    if (subToggle) subToggle.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    item.classList.remove('open');
    const subToggle = item.querySelector('.nav-sub-toggle');
    if (subToggle) subToggle.setAttribute('aria-expanded', 'false');
  };
  const scheduleClose = () => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(close, 220);
  };

  item.addEventListener('mouseenter', () => { if (isDesktop()) open(); });
  item.addEventListener('mouseleave', () => { if (isDesktop()) scheduleClose(); });
  item.addEventListener('focusin', () => { if (isDesktop()) open(); });
  item.addEventListener('focusout', (e) => {
    if (isDesktop() && !item.contains(e.relatedTarget)) scheduleClose();
  });

  const subToggle = item.querySelector('.nav-sub-toggle');
  if (subToggle) {
    subToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      item.classList.toggle('open');
      subToggle.setAttribute('aria-expanded', item.classList.contains('open'));
    });
  }
});
