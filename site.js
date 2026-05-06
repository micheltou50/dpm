// DPM site — shared scripts

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
    const headline = document.querySelector('h1.headline');
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
