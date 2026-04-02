const obs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.ap-card').forEach((el) => obs.observe(el));

(function () {
  // Mark active page via data-current on body
  var page = document.body.dataset.current || 'antipatterns';
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

// Reading time calculator
(function () {
  var text = document.body.innerText || '';
  var words = text.trim().split(/\s+/).length;
  var mins = Math.max(1, Math.round(words / 200));
  var el = document.getElementById('read-time-val');
  if (el) el.textContent = mins + ' хв читання';
})();
