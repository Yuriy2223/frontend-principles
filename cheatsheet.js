// Filter
function filter(group, btn) {
  document
    .querySelectorAll('.filter-btn')
    .forEach((b) => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.cs-section').forEach((s) => {
    s.classList.toggle('hidden', group !== 'all' && s.dataset.group !== group);
  });
  document.querySelectorAll('.term').forEach((t) => {
    t.classList.toggle('hidden', group !== 'all' && t.dataset.group !== group);
  });
  // Show/hide empty sections
  document.querySelectorAll('.cs-section:not(.hidden)').forEach((s) => {
    const visible = s.querySelectorAll('.term:not(.hidden)').length;
    s.classList.toggle('hidden', visible === 0);
  });
  // Always show table
  document.getElementById('sec-table').classList.remove('hidden');
}

// Progress dot
try {
  var p = JSON.parse(localStorage.getItem('fp_progress_v1') || '{}');
  if (Object.keys(p).length > 0) {
    var ti = document.querySelector('.gnav-item[data-page="tracker"]');
    if (ti) ti.classList.add('has-progress');
  }
} catch (e) {}

// Reading time calculator
(function () {
  var text = document.body.innerText || '';
  var words = text.trim().split(/\s+/).length;
  var mins = Math.max(1, Math.round(words / 200));
  var el = document.getElementById('read-time-val');
  if (el) el.textContent = mins + ' хв читання';
})();
