// SOLID Tab switching
const nav = document.getElementById('solid-nav');
nav.addEventListener('click', (e) => {
  const btn = e.target.closest('.solid-btn');
  if (!btn) return;
  const target = btn.dataset.target;
  document
    .querySelectorAll('.solid-btn')
    .forEach((b) => b.classList.remove('active'));
  document
    .querySelectorAll('.solid-panel')
    .forEach((p) => p.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('panel-' + target).classList.add('active');
});

// Scroll-triggered fade-in
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

document
  .querySelectorAll('.why-card, .trio-card, .test-card, .tl-item, .cog-card')
  .forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    observer.observe(el);
  });

(function () {
  // Mark active page via data-current on body
  var page = document.body.dataset.current || 'index';
  var items = document.querySelectorAll('.gnav-item[data-page]');
  items.forEach(function (a) {
    if (a.dataset.page === page) a.classList.add('active');
  });
  // Show progress dot if any progress saved
  try {
    var p = JSON.parse(localStorage.getItem('fp_progress_v1') || '{}');
    if (Object.keys(p).length > 0) {
      var ti = document.querySelector('.gnav-item[data-page="tracker"]');
      if (ti) ti.classList.add('has-progress');
    }
  } catch (e) {}
})();

// JS smooth scroll — works inside iframes where CSS scroll-behavior may be ignored
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var id = this.getAttribute('href').slice(1);
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Reading time calculator
(function () {
  var text = document.body.innerText || '';
  var words = text.trim().split(/\s+/).length;
  var mins = Math.max(1, Math.round(words / 200));
  var el = document.getElementById('read-time-val');
  if (el) el.textContent = mins + ' хв читання';
})();
