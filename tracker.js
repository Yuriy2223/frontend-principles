const PRINCIPLES = [
  // SOLID
  {
    id: 'srp',
    group: 'solid',
    letter: 'S',
    name: 'SRP',
    full: 'Single Responsibility Principle',
    color: '#00d4ff',
    desc: "Один модуль — одна причина для зміни. Висока зв'язність всередині, низьке зачеплення між модулями.",
    links: [
      { l: 'Гайд', h: 'index.html' },
      { l: 'Квіз', h: 'quiz.html' },
      { l: 'Рефакторинг', h: 'refactoring.html' },
    ],
  },
  {
    id: 'ocp',
    group: 'solid',
    letter: 'O',
    name: 'OCP',
    full: 'Open/Closed Principle',
    color: '#7c3aed',
    desc: 'Відкритий для розширення, закритий для модифікації. Нова фіча — без зміни старого робочого коду.',
    links: [
      { l: 'Гайд', h: 'index.html' },
      { l: 'Квіз', h: 'quiz.html' },
      { l: 'Антипатерни', h: 'antipatterns.html' },
    ],
  },
  {
    id: 'lsp',
    group: 'solid',
    letter: 'L',
    name: 'LSP',
    full: 'Liskov Substitution Principle',
    color: '#f59e0b',
    desc: 'Підкласи замінні базовим класом. Компоненти-обгортки не ламають контракт базових компонентів.',
    links: [
      { l: 'Гайд', h: 'index.html' },
      { l: 'Квіз', h: 'quiz.html' },
    ],
  },
  {
    id: 'isp',
    group: 'solid',
    letter: 'I',
    name: 'ISP',
    full: 'Interface Segregation Principle',
    color: '#10b981',
    desc: 'Багато маленьких інтерфейсів краще одного великого. Залежи тільки від того, що використовуєш.',
    links: [
      { l: 'Гайд', h: 'index.html' },
      { l: 'Квіз', h: 'quiz.html' },
      { l: 'Антипатерни', h: 'antipatterns.html' },
    ],
  },
  {
    id: 'dip',
    group: 'solid',
    letter: 'D',
    name: 'DIP',
    full: 'Dependency Inversion Principle',
    color: '#ef4444',
    desc: 'Залежи від абстракцій, а не від конкретних реалізацій. Не імпортуй axios прямо в бізнес-логіку.',
    links: [
      { l: 'Гайд', h: 'index.html' },
      { l: 'Квіз', h: 'quiz.html' },
      { l: 'Рефакторинг', h: 'refactoring.html' },
    ],
  },
  // Trio
  {
    id: 'dry',
    group: 'trio',
    letter: 'D',
    name: 'DRY',
    full: "Don't Repeat Yourself",
    color: '#00d4ff',
    desc: 'Кожне знання має єдине, однозначне і авторитетне представлення. Це про знання, а не про текст.',
    links: [
      { l: 'Гайд', h: 'index.html' },
      { l: 'Квіз', h: 'quiz.html' },
      { l: 'Антипатерни', h: 'antipatterns.html' },
    ],
  },
  {
    id: 'kiss',
    group: 'trio',
    letter: 'K',
    name: 'KISS',
    full: 'Keep It Simple, Stupid',
    color: '#7c3aed',
    desc: 'Найкращий код зрозуміє джуніор. Якщо можна через if/else — не треба useReducer і машину станів.',
    links: [
      { l: 'Гайд', h: 'index.html' },
      { l: 'Квіз', h: 'quiz.html' },
      { l: 'Антипатерни', h: 'antipatterns.html' },
    ],
  },
  {
    id: 'yagni',
    group: 'trio',
    letter: 'Y',
    name: 'YAGNI',
    full: "You Ain't Gonna Need It",
    color: '#f59e0b',
    desc: 'Не пиши код "на виріст". Коли знадобиться — тоді й додаси. Зараз це лише технічний борг.',
    links: [
      { l: 'Гайд', h: 'index.html' },
      { l: 'Квіз', h: 'quiz.html' },
      { l: 'Антипатерни', h: 'antipatterns.html' },
    ],
  },
  // Tools
  {
    id: 'quiz',
    group: 'tools',
    letter: '?',
    name: 'Квіз',
    full: '10 запитань на знання принципів',
    color: '#10b981',
    desc: 'Пройди тест з реальними кодовими прикладами. Вгадай який принцип порушено і отримай пояснення.',
    links: [{ l: 'Відкрити квіз →', h: 'quiz.html' }],
  },
  {
    id: 'antipatterns',
    group: 'tools',
    letter: '!',
    name: 'Антипатерни',
    full: '6 класичних помилок',
    color: '#ef4444',
    desc: 'God Component, Prop Drilling, Magic Numbers, Shotgun Surgery, Dead Code, Premature Optimization.',
    links: [{ l: 'Відкрити →', h: 'antipatterns.html' }],
  },
  {
    id: 'cheatsheet',
    group: 'tools',
    letter: '📋',
    name: 'Шпаргалка',
    full: 'Всі принципи на одній сторінці',
    color: '#f59e0b',
    desc: 'Швидкий довідник: кожен принцип — одне речення, одне правило, один тест. Ідеально для Code Review.',
    links: [{ l: 'Відкрити →', h: 'cheatsheet.html' }],
  },
  {
    id: 'refactoring',
    group: 'tools',
    letter: '→',
    name: 'Рефакторинг',
    full: 'Живий animated diff',
    color: '#f472b6',
    desc: 'Дивись як один поганий компонент перетворюється кроком за кроком через SRP → DIP → ISP → OCP.',
    links: [{ l: 'Відкрити →', h: 'refactoring.html' }],
  },
];

const STORAGE_KEY = 'fp_progress_v1';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveProgress(p) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

let progress = loadProgress();

function getStatus(id) {
  return progress[id] ?? 0;
}

function setStatus(id, s) {
  progress[id] = s;
  saveProgress(progress);
  renderCard(id);
  updateMaster();
}

// ─── RENDER CARD ───
function renderQuizScore() {
  try {
    var saved = JSON.parse(localStorage.getItem('fp_progress_v1') || '{}');
    if (saved._quiz_score !== undefined) {
      return `<div style="display:flex;align-items:center;gap:.5rem;margin-top:.4rem;padding:.4rem .7rem;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.2);border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:.65rem;color:#10b981;">
        <span>🏆</span>
        <span>Найкращий результат: <strong>${saved._quiz_score}/10</strong> (${saved._quiz_pct}%) · ${saved._quiz_date || ''}</span>
      </div>`;
    }
  } catch (e) {}
  return '';
}

function renderCard(id) {
  const p = PRINCIPLES.find((x) => x.id === id);
  const el = document.getElementById('pcard-' + id);
  if (!el) return;
  const s = getStatus(id);

  el.className = `pcard status-${s}`;
  el.style.setProperty('--pc-color', p.color);

  const labels = ['Не читав', 'Читав', 'Засвоїв ✓'];
  const icons = ['○', '◑', '●'];

  el.innerHTML = `
    <div class="pcard-strip"></div>
    <div class="pcard-body">
      <div class="pcard-top">
        <div class="pcard-letter">${p.letter}</div>
        <div class="status-badge">${icons[s]} ${labels[s]}</div>
      </div>
      <div class="pcard-name">${p.name}</div>
      <div class="pcard-full">${p.full}</div>
      <div class="pcard-desc">${p.desc}</div>
      ${p.id === 'quiz' ? renderQuizScore() : ''}
      <div class="pcard-actions">
        <button class="status-btn ${s === 0 ? 'active-0' : ''}" onclick="setStatus('${id}',0)">○ Не читав</button>
        <button class="status-btn ${s === 1 ? 'active-1' : ''}" onclick="setStatus('${id}',1)">◑ Читав</button>
        <button class="status-btn ${s === 2 ? 'active-2' : ''}" onclick="setStatus('${id}',2)">● Засвоїв</button>
      </div>
    </div>
    <div class="pcard-links">
      ${p.links.map((lk) => `<a href="${lk.h}" class="pcard-link">${lk.l}</a>`).join('')}
    </div>
  `;

  // re-attach event stops
  el.querySelectorAll('.status-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => e.stopPropagation());
  });
  el.querySelectorAll('.pcard-link').forEach((a) => {
    a.addEventListener('click', (e) => e.stopPropagation());
  });
}

// ─── BUILD GRIDS ───
function buildGrids() {
  ['solid', 'trio', 'tools'].forEach((g) => {
    const grid = document.getElementById('grid-' + g);
    grid.innerHTML = '';
    PRINCIPLES.filter((p) => p.group === g).forEach((p) => {
      const div = document.createElement('div');
      div.id = 'pcard-' + p.id;
      grid.appendChild(div);
      renderCard(p.id);
    });
  });
}

// ─── UPDATE MASTER ───
const VERDICTS = [
  [0, '🌱', 'Починаємо'],
  [20, '📖', 'Читаєш'],
  [40, '🧠', 'Вникаєш'],
  [60, '💪', 'Добре розумієш'],
  [80, '🔥', 'Майже експерт'],
  [100, '🏆', 'Майстер коду'],
];

function updateMaster() {
  const total = PRINCIPLES.length;
  const mastered = PRINCIPLES.filter((p) => getStatus(p.id) === 2).length;
  const read = PRINCIPLES.filter((p) => getStatus(p.id) === 1).length;
  const none = total - mastered - read;

  // weighted score: read=0.5, mastered=1
  const score = Math.round(((read * 0.5 + mastered) / total) * 100);

  document.getElementById('master-pct').textContent = score + '%';
  document.getElementById('big-fill').style.width = score + '%';
  document.getElementById('s0-count').textContent = none;
  document.getElementById('s1-count').textContent = read;
  document.getElementById('s2-count').textContent = mastered;
  document.getElementById('master-sub').textContent =
    `${mastered} засвоїв · ${read} читав · ${none} ще попереду`;

  const v = [...VERDICTS].reverse().find(([pct]) => score >= pct);
  document.getElementById('verdict-emoji').textContent = v[1];
  document.getElementById('verdict-text').textContent = v[2];

  // group counts — only SOLID and trio, tools = mastered only
  const solidDone = PRINCIPLES.filter(
    (p) => p.group === 'solid' && getStatus(p.id) === 2
  ).length;
  const trioDone = PRINCIPLES.filter(
    (p) => p.group === 'trio' && getStatus(p.id) === 2
  ).length;
  const toolsDone = PRINCIPLES.filter(
    (p) => p.group === 'tools' && getStatus(p.id) === 2
  ).length;
  document.getElementById('solid-count').textContent = `${solidDone} / 5`;
  document.getElementById('trio-count').textContent = `${trioDone} / 3`;
  document.getElementById('tools-count').textContent = `${toolsDone} / 4`;

  // celebration
  if (mastered === total && total > 0 && !sessionAlreadyCelebrated) {
    sessionAlreadyCelebrated = true;
    setTimeout(
      () => document.getElementById('celebrate').classList.add('show'),
      600
    );
  }
}

let sessionAlreadyCelebrated = false;

function confirmReset() {
  if (confirm('Скинути весь прогрес? Це незворотньо.')) {
    progress = {};
    saveProgress(progress);
    sessionAlreadyCelebrated = false;
    buildGrids();
    updateMaster();
  }
}

// ─── INIT ───
buildGrids();
updateMaster();

// animate big-fill on load
setTimeout(() => {
  const total = PRINCIPLES.length;
  const mastered = PRINCIPLES.filter((p) => getStatus(p.id) === 2).length;
  const read = PRINCIPLES.filter((p) => getStatus(p.id) === 1).length;
  const score = Math.round(((read * 0.5 + mastered) / total) * 100);
  document.getElementById('big-fill').style.width = score + '%';
}, 200);

(function () {
  // Mark active page via data-current on body
  var page = document.body.dataset.current || 'tracker';
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
