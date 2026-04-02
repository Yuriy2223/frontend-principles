const QUESTIONS = [
  {
    principle: 'SRP',
    color: '#00d4ff',
    q: 'Який принцип порушено в цьому хуку?',
    code: `<span class="kw">const</span> <span class="fn">useProfile</span> = () => {
  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>(<span class="kw">null</span>);

  <span class="cm">// Завантаження даних</span>
  <span class="kw">const</span> <span class="fn">fetchUser</span> = <span class="kw">async</span> () => {
    <span class="kw">const</span> res = <span class="kw">await</span> <span class="fn">fetch</span>(<span class="str">'/api/me'</span>);
    <span class="fn">setUser</span>(<span class="kw">await</span> res.<span class="fn">json</span>());
  };

  <span class="cm">// Валідація форми</span>
  <span class="kw">const</span> <span class="fn">validate</span> = (data) =>
    data.name.length > <span class="num">2</span> && data.email.<span class="fn">includes</span>(<span class="str">'@'</span>);

  <span class="cm">// Аналітика</span>
  <span class="kw">const</span> <span class="fn">trackView</span> = () =>
    analytics.<span class="fn">track</span>(<span class="str">'profile_viewed'</span>);

  <span class="kw">return</span> { user, fetchUser, validate, trackView };
};`,
    options: [
      {
        key: 'A',
        text: 'SRP — у хука кілька несумісних причин для зміни',
      },
      {
        key: 'B',
        text: 'DIP — хук напряму використовує fetch і analytics',
      },
      { key: 'C', text: 'OCP — неможливо розширити без модифікації' },
      { key: 'D', text: 'ISP — хук повертає забагато методів' },
    ],
    correct: 0,
    explanation: {
      good: '<strong>SRP (Single Responsibility Principle)</strong> — у хука три зовсім різні причини для зміни: логіка мережі, правила валідації і аналітика. Вони мають жити у трьох окремих хуках: <code>useUserApi</code>, <code>useProfileForm</code>, <code>useProfileTracking</code>.',
      bad: 'Тут також порушено DIP (напряму залежить від fetch і analytics), але <strong>першопричина — SRP</strong>. Спочатку поділіть відповідальності, а потім інвертуйте залежності.',
    },
  },
  {
    principle: 'OCP',
    color: '#7c3aed',
    q: 'Що не так з цим підходом до рендерингу іконок?',
    code: `<span class="kw">const</span> <span class="fn">Icon</span> = ({ type }: { type: <span class="kw">string</span> }) => {
  <span class="kw">if</span> (type <span class="op">===</span> <span class="str">'home'</span>)
    <span class="kw">return</span> &lt;<span class="ty">HomeIcon</span> /&gt;;
  <span class="kw">if</span> (type <span class="op">===</span> <span class="str">'user'</span>)
    <span class="kw">return</span> &lt;<span class="ty">UserIcon</span> /&gt;;
  <span class="kw">if</span> (type <span class="op">===</span> <span class="str">'settings'</span>)
    <span class="kw">return</span> &lt;<span class="ty">SettingsIcon</span> /&gt;;
  <span class="cm">// Кожна нова іконка — нова умова</span>
  <span class="kw">return</span> <span class="kw">null</span>;
};`,
    options: [
      {
        key: 'A',
        text: 'LSP — компонент Icon не сумісний зі своїми дочірніми компонентами',
      },
      {
        key: 'B',
        text: 'OCP — кожна нова іконка вимагає редагування цього файлу',
      },
      {
        key: 'C',
        text: "ISP — компонент отримує тип як рядок замість конкретного об'єкта",
      },
      { key: 'D', text: 'DRY — код іконок дублюється у кількох місцях' },
    ],
    correct: 1,
    explanation: {
      good: "<strong>OCP (Open/Closed Principle)</strong> — щоразу, коли додається нова іконка, треба лізти в середину цієї функції. Рішення: <code>const ICONS = { home: HomeIcon, user: UserIcon };</code> і просто <code>const C = ICONS[type]; return C ? &lt;C /&gt; : null;</code>. Нова іконка = лише нове поле в об'єкті.",
      bad: 'Компонент відкритий для розширення (можна додати іконку) але не закритий для модифікації — кожне розширення вимагає зміни коду.',
    },
  },
  {
    principle: 'DIP',
    color: '#ef4444',
    q: 'Де прихована проблема в цьому сервісі авторизації?',
    code: `<span class="cm">// authService.ts</span>
<span class="kw">import</span> axios <span class="kw">from</span> <span class="str">'axios'</span>;

<span class="kw">export const</span> <span class="fn">login</span> = <span class="kw">async</span> (
  email: <span class="kw">string</span>,
  password: <span class="kw">string</span>
) => {
  <span class="kw">const</span> { data } = <span class="kw">await</span> axios.<span class="fn">post</span>(
    <span class="str">'/auth/login'</span>,
    { email, password }
  );
  localStorage.<span class="fn">setItem</span>(<span class="str">'token'</span>, data.token);
  <span class="kw">return</span> data;
};`,
    options: [
      {
        key: 'A',
        text: 'SRP — функція і робить запит, і зберігає токен',
      },
      {
        key: 'B',
        text: 'YAGNI — тут зайвий імпорт axios який поки не потрібен',
      },
      {
        key: 'C',
        text: "DIP — бізнес-логіка жорстко прив'язана до axios і localStorage",
      },
      { key: 'D', text: 'DRY — цей код дублює логіку з інших сервісів' },
    ],
    correct: 2,
    explanation: {
      good: "<strong>DIP (Dependency Inversion Principle)</strong> — бізнес-логіка напряму залежить від конкретних реалізацій: <code>axios</code> і <code>localStorage</code>. Якщо завтра перейти на <code>fetch</code> або <code>sessionStorage</code> — треба лізти в бізнес-код. Рішення: передавати http-клієнт і storage як параметри або через ін'єкцію залежностей.",
      bad: "Тут ще й порушено SRP (дві причини змінитися), але основна причина проблем — жорстка прив'язка до конкретних технологій замість абстракцій.",
    },
  },
  {
    principle: 'ISP',
    color: '#10b981',
    q: 'Що порушує цей компонент відображення ціни?',
    code: `<span class="kw">interface</span> <span class="ty">Product</span> {
  id: <span class="kw">string</span>;
  name: <span class="kw">string</span>;
  price: <span class="kw">number</span>;
  stock: <span class="kw">number</span>;
  category: <span class="ty">Category</span>;
  reviews: <span class="ty">Review</span>[];
  seller: <span class="ty">Seller</span>;
}

<span class="cm">// Компоненту потрібна лише ціна!</span>
<span class="kw">const</span> <span class="fn">PriceTag</span> = (
  { product }: { product: <span class="ty">Product</span> }
) => (
  &lt;<span class="ty">span</span>&gt;{product.price} ₴&lt;/<span class="ty">span</span>&gt;
);`,
    options: [
      {
        key: 'A',
        text: 'OCP — компонент не можна розширити без модифікації',
      },
      {
        key: 'B',
        text: 'SRP — компонент PriceTag відповідає за забагато речей',
      },
      {
        key: 'C',
        text: 'ISP — компонент залежить від інтерфейсу, який майже не використовує',
      },
      { key: 'D', text: 'LSP — PriceTag порушує контракт Product' },
    ],
    correct: 2,
    explanation: {
      good: '<strong>ISP (Interface Segregation Principle)</strong> — <code>PriceTag</code> отримує весь <code>Product</code> з 7 полями, але використовує лише <code>price</code>. Це зайве зачеплення: якщо структура <code>Product</code> зміниться — <code>PriceTag</code> може поламатись без жодної причини. Рішення: <code>PriceTag({ price }: { price: number })</code>.',
      bad: 'Краще залежати від маленького, точного інтерфейсу ніж від великого загального. "Клієнти не повинні залежати від інтерфейсів, які вони не використовують."',
    },
  },
  {
    principle: 'LSP',
    color: '#f59e0b',
    q: 'Яке порушення допущено в цьому компоненті-обгортці?',
    code: `<span class="kw">interface</span> <span class="ty">InputProps</span> {
  value: <span class="kw">string</span>;
  onChange: (v: <span class="kw">string</span>) => <span class="kw">void</span>;
  placeholder?: <span class="kw">string</span>;
}

<span class="cm">// "Розширений" інпут для пошуку</span>
<span class="kw">const</span> <span class="fn">SearchInput</span> = ({
  onSearch <span class="cm">/* onChange зник! */</span>
}: { onSearch: () => <span class="kw">void</span> }) => {
  <span class="kw">return</span> (
    &lt;<span class="ty">input</span>
      onKeyDown={(e) =>
        e.key <span class="op">===</span> <span class="str">'Enter'</span> && <span class="fn">onSearch</span>()
      }
    /&gt;
  );
};`,
    options: [
      {
        key: 'A',
        text: 'DRY — SearchInput повторює логіку звичайного Input',
      },
      {
        key: 'B',
        text: 'LSP — SearchInput не є замінником InputProps, він ламає контракт',
      },
      {
        key: 'C',
        text: 'OCP — SearchInput закритий для розширення через onSearch',
      },
      {
        key: 'D',
        text: 'YAGNI — onSearch додано завчасно, до того як знадобиться',
      },
    ],
    correct: 1,
    explanation: {
      good: '<strong>LSP (Liskov Substitution Principle)</strong> — <code>SearchInput</code> позиціонується як варіант <code>Input</code>, але змінив контракт: прибрав <code>onChange</code> і <code>value</code>, і замінив на власний <code>onSearch</code>. Тепер замінити <code>Input</code> на <code>SearchInput</code> неможливо без зміни всіх споживачів.',
      bad: 'Правило: якщо компонент-нащадок не може замінити батьківський без змін у коді споживача — це порушення LSP. Рішення: прийняти всі пропси через <code>...props</code> і додати свої зверху.',
    },
  },
  {
    principle: 'DRY',
    color: '#00d4ff',
    q: 'Що демонструє цей код і яка проблема?',
    code: `<span class="cm">// checkout.ts</span>
<span class="kw">const</span> tax = price * <span class="num">0.2</span>;
<span class="kw">const</span> total = price + tax;

<span class="cm">// cart.ts</span>
<span class="kw">const</span> itemTax = basePrice * <span class="num">0.2</span>;
<span class="kw">const</span> finalPrice = basePrice + itemTax;

<span class="cm">// invoice.ts</span>
<span class="kw">const</span> taxAmount = subtotal * <span class="num">0.2</span>;
<span class="kw">const</span> grandTotal = subtotal + taxAmount;`,
    options: [
      {
        key: 'A',
        text: 'YAGNI — ставка 0.2 додана "про всяк випадок" і поки не використовується',
      },
      { key: 'B', text: 'KISS — логіка надто складна, можна спростити' },
      {
        key: 'C',
        text: 'DRY — одна й та сама бізнес-логіка розрахунку ПДВ дублюється в трьох місцях',
      },
      {
        key: 'D',
        text: 'SRP — кожен файл відповідає за забагато дій з ціною',
      },
    ],
    correct: 2,
    explanation: {
      good: "<strong>DRY (Don't Repeat Yourself)</strong> — логіка розрахунку ПДВ (20%) задублена в трьох місцях. Якщо ставка зміниться — треба оновити три файли і легко щось пропустити. Рішення: <code>const calculateTax = (price: number) => price * TAX_RATE;</code> в одному місці.",
      bad: 'DRY — це не про схожий текст, а про <strong>знання</strong>. Правило розрахунку ПДВ — це одне знання, яке має жити в одному місці.',
    },
  },
  {
    principle: 'KISS',
    color: '#7c3aed',
    q: 'Яким принципом знехтували при реалізації перемикача теми?',
    code: `<span class="cm">// Завдання: перемикати light/dark тему</span>
<span class="kw">type</span> <span class="ty">ThemeState</span> = <span class="str">'light'</span> | <span class="str">'dark'</span>;
<span class="kw">type</span> <span class="ty">ThemeAction</span> =
  | { type: <span class="str">'TOGGLE'</span> }
  | { type: <span class="str">'SET'</span>; payload: <span class="ty">ThemeState</span> }
  | { type: <span class="str">'RESET'</span> };

<span class="kw">const</span> <span class="fn">themeReducer</span> = (
  state: <span class="ty">ThemeState</span>,
  action: <span class="ty">ThemeAction</span>
): <span class="ty">ThemeState</span> => {
  <span class="kw">switch</span>(action.type) {
    <span class="kw">case</span> <span class="str">'TOGGLE'</span>:
      <span class="kw">return</span> state <span class="op">===</span> <span class="str">'light'</span> ? <span class="str">'dark'</span> : <span class="str">'light'</span>;
    <span class="kw">case</span> <span class="str">'SET'</span>: <span class="kw">return</span> action.payload;
    <span class="kw">case</span> <span class="str">'RESET'</span>: <span class="kw">return</span> <span class="str">'light'</span>;
    <span class="kw">default</span>: <span class="kw">return</span> state;
  }
};`,
    options: [
      {
        key: 'A',
        text: 'DRY — логіка toggle повторюється в кількох редюсерах',
      },
      {
        key: 'B',
        text: 'YAGNI — дії SET і RESET додані "на виріст" без реальної потреби',
      },
      {
        key: 'C',
        text: 'KISS — для простого boolean-перемикача використали складну машину станів',
      },
      {
        key: 'D',
        text: 'OCP — reducer не можна розширити новими темами',
      },
    ],
    correct: 2,
    explanation: {
      good: '<strong>KISS (Keep It Simple, Stupid)</strong> — для перемикання між двома значеннями написано reducer з трьома action-типами, власним type, 20+ рядків коду. Рішення: <code>const [isDark, setIsDark] = useState(false);</code> — одна строчка замість двадцяти.',
      bad: 'Складність має бути виправданою. <code>useReducer</code> доречний коли стан складний і залежний. Для boolean-toggle це overengineering.',
    },
  },
  {
    principle: 'YAGNI',
    color: '#f59e0b',
    q: 'Що зайве в цій функції форматування дати?',
    code: `<span class="kw">const</span> <span class="fn">formatDate</span> = (
  date: <span class="ty">Date</span>,
  locale: <span class="kw">string</span> = <span class="str">'uk-UA'</span>,
  timezone: <span class="kw">string</span> = <span class="str">'Europe/Kyiv'</span>,
  format: <span class="str">'short'</span> | <span class="str">'long'</span> | <span class="str">'iso'</span> | <span class="str">'unix'</span> = <span class="str">'short'</span>,
  includeTime: <span class="kw">boolean</span> = <span class="kw">false</span>,
  use12Hour: <span class="kw">boolean</span> = <span class="kw">false</span>
) => {
  <span class="cm">// ... 60 рядків логіки</span>
  <span class="cm">// Реально використовується тільки:</span>
  <span class="cm">// formatDate(someDate) → "12.03.2025"</span>
};`,
    options: [
      {
        key: 'A',
        text: 'DRY — функція дублює вбудований Intl.DateTimeFormat',
      },
      {
        key: 'B',
        text: 'SRP — форматування і часовий пояс — різні відповідальності',
      },
      {
        key: 'C',
        text: 'LSP — функція не сумісна зі стандартним Date API',
      },
      {
        key: 'D',
        text: 'YAGNI — 5 параметрів з 6 не використовуються, додані "про всяк випадок"',
      },
    ],
    correct: 3,
    explanation: {
      good: "<strong>YAGNI (You Ain't Gonna Need It)</strong> — функція написана з розрахунком на майбутнє: timezone, 12/24h, iso/unix формати. Але реально скрізь викликається без параметрів. Це мертвий код, який треба підтримувати і тестувати. Почніть з простого: <code>const formatDate = (d: Date) => d.toLocaleDateString('uk-UA')</code>.",
      bad: '"Можливо, колись знадобиться" — найдорожча фраза в розробці. Коли знадобиться — додасте. Зараз це технічний борг.',
    },
  },
  {
    principle: 'SRP',
    color: '#00d4ff',
    q: 'Скільки причин для зміни має цей компонент?',
    code: `<span class="kw">const</span> <span class="fn">UserCard</span> = ({ userId }: { userId: <span class="kw">string</span> }) => {
  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>(<span class="kw">null</span>);
  <span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">true</span>);

  <span class="fn">useEffect</span>(() => {
    <span class="fn">fetch</span>(<span class="str">\`/api/users/\${userId}\`</span>)
      .<span class="fn">then</span>(r => r.<span class="fn">json</span>())
      .<span class="fn">then</span>(setUser)
      .<span class="fn">finally</span>(() => <span class="fn">setLoading</span>(<span class="kw">false</span>));
  }, [userId]);

  <span class="kw">if</span> (loading) <span class="kw">return</span> &lt;<span class="ty">Skeleton</span> /&gt;;

  <span class="kw">return</span> (
    &lt;<span class="ty">div</span> className=<span class="str">"card"</span>&gt;
      &lt;<span class="ty">img</span> src={user.avatar} /&gt;
      &lt;<span class="ty">h2</span>&gt;{user.name}&lt;/<span class="ty">h2</span>&gt;
      &lt;<span class="ty">p</span>&gt;{user.email}&lt;/<span class="ty">p</span>&gt;
    &lt;/<span class="ty">div</span>&gt;
  );
};`,
    options: [
      {
        key: 'A',
        text: 'Одна — компонент просто показує дані користувача',
      },
      {
        key: 'B',
        text: 'Дві — отримання даних і відображення (SRP порушено)',
      },
      {
        key: 'C',
        text: 'Три — отримання, відображення та управління станом завантаження',
      },
      {
        key: 'D',
        text: 'Чотири — також відповідає за роутинг і авторизацію',
      },
    ],
    correct: 1,
    explanation: {
      good: '<strong>SRP</strong> — у компонента дві причини для зміни: <strong>1)</strong> змінився API (інший endpoint, GraphQL) — треба лізти в компонент; <strong>2)</strong> змінився вигляд картки — теж лізеш сюди. Рішення: виділити <code>useUser(userId)</code> хук для даних, залишити <code>UserCard</code> лише для відображення.',
      bad: 'Управління станом завантаження — це деталь реалізації, а не окрема відповідальність. Головний поділ: отримання даних vs відображення.',
    },
  },
  {
    principle: 'OCP',
    color: '#7c3aed',
    q: 'Який принцип порушено в системі сповіщень?',
    code: `<span class="kw">const</span> <span class="fn">sendNotification</span> = (
  user: <span class="ty">User</span>,
  message: <span class="kw">string</span>,
  channel: <span class="kw">string</span>
) => {
  <span class="kw">if</span> (channel <span class="op">===</span> <span class="str">'email'</span>) {
    emailService.<span class="fn">send</span>(user.email, message);
  } <span class="kw">else if</span> (channel <span class="op">===</span> <span class="str">'sms'</span>) {
    smsService.<span class="fn">send</span>(user.phone, message);
  } <span class="kw">else if</span> (channel <span class="op">===</span> <span class="str">'push'</span>) {
    pushService.<span class="fn">send</span>(user.deviceId, message);
  }
  <span class="cm">// Новий канал = редагуємо цю функцію</span>
};`,
    options: [
      { key: 'A', text: 'DRY — виклики сервісів мають схожу структуру' },
      {
        key: 'B',
        text: 'ISP — функція залежить від трьох різних сервісів',
      },
      { key: 'C', text: 'LSP — різні сервіси мають різні інтерфейси' },
      {
        key: 'D',
        text: 'OCP — додавання нового каналу вимагає модифікації функції',
      },
    ],
    correct: 3,
    explanation: {
      good: "<strong>OCP (Open/Closed Principle)</strong> — кожен новий канал сповіщень вимагає зміни цієї функції. Рішення: <code>const channels = { email: (u,m) => emailService.send(u.email, m), sms: ..., push: ... };</code> і викликати <code>channels[channel]?.(user, message)</code>. Новий канал — тільки нове поле в об'єкті.",
      bad: "Паттерн if/else для вибору стратегії — майже завжди сигнал порушення OCP. Замінюйте на об'єкт-словник або Map.",
    },
  },
];

// ── STATE ──
let current = 0;
let score = 0;
let answered = false;
const breakdown = {
  SRP: 0,
  OCP: 0,
  DIP: 0,
  ISP: 0,
  LSP: 0,
  DRY: 0,
  KISS: 0,
  YAGNI: 0,
};
const breakdownTotal = {
  SRP: 0,
  OCP: 0,
  DIP: 0,
  ISP: 0,
  LSP: 0,
  DRY: 0,
  KISS: 0,
  YAGNI: 0,
};
const reviewLog = [];

QUESTIONS.forEach(
  (q) => (breakdownTotal[q.principle] = (breakdownTotal[q.principle] || 0) + 1)
);

// ── RENDER QUESTION ──
function renderQuestion() {
  const q = QUESTIONS[current];
  answered = false;

  // progress
  const pct = Math.round(((current + 1) / QUESTIONS.length) * 100);
  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-frac').textContent =
    `${current + 1} / ${QUESTIONS.length}`;

  const area = document.getElementById('question-area');
  area.innerHTML = `
    <div class="q-card">
      <div class="principle-badge" style="--pb-color:${q.color}">
        <span>${q.principle}</span>
      </div>
      <div class="q-number">ПИТАННЯ ${current + 1} З ${QUESTIONS.length}</div>
      <div class="q-text">${q.q}</div>
      ${
        q.code
          ? `
      <div class="q-code">
        <div class="q-code-header">
          <div class="q-code-dot" style="background:#ef4444"></div>
          <div class="q-code-dot" style="background:#f59e0b"></div>
          <div class="q-code-dot" style="background:#10b981"></div>
        </div>
        <div class="q-code-body">${q.code}</div>
      </div>`
          : ''
      }
      <div class="options">
        ${q.options
          .map(
            (opt, i) => `
          <button class="opt" data-idx="${i}" onclick="handleAnswer(${i})">
            <span class="opt-key">${opt.key}</span>
            <span class="opt-text">${opt.text}</span>
          </button>
        `
          )
          .join('')}
      </div>
      <div class="explanation" id="explanation"></div>
      <button class="next-btn" id="next-btn" onclick="nextQuestion()">
        ${current < QUESTIONS.length - 1 ? 'Наступне питання →' : 'Переглянути результати →'}
      </button>
    </div>
  `;
}

function handleAnswer(idx) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[current];
  const isCorrect = idx === q.correct;
  const opts = document.querySelectorAll('.opt');
  const expl = document.getElementById('explanation');
  const nextBtn = document.getElementById('next-btn');

  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add('correct');
    else if (i === idx && !isCorrect) btn.classList.add('wrong');
    else btn.classList.add('dimmed');
  });

  expl.className = `explanation show ${isCorrect ? 'good' : 'bad'}`;
  expl.innerHTML = `
    <div class="explanation-title">${isCorrect ? '✓ Правильно!' : '✗ Не зовсім...'}</div>
    <p>${isCorrect ? q.explanation.good : q.explanation.bad}</p>
  `;

  nextBtn.classList.add('show');

  if (isCorrect) {
    score++;
    breakdown[q.principle] = (breakdown[q.principle] || 0) + 1;
  }

  reviewLog.push({
    q: q.q,
    principle: q.principle,
    correct: isCorrect,
    color: q.color,
  });
}

function nextQuestion() {
  current++;
  if (current >= QUESTIONS.length) {
    showResults();
  } else {
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function showResults() {
  document.getElementById('question-area').innerHTML = '';
  document.getElementById('progress-wrap').style.display = 'none';
  document.getElementById('quiz-header').style.display = 'none';

  const pct = Math.round((score / QUESTIONS.length) * 100);

  // Save quiz result to localStorage for tracker
  try {
    var saved = JSON.parse(localStorage.getItem('fp_progress_v1') || '{}');
    saved['quiz'] = 2; // mark as mastered
    saved['_quiz_score'] = score;
    saved['_quiz_pct'] = pct;
    saved['_quiz_date'] = new Date().toLocaleDateString('uk-UA');
    localStorage.setItem('fp_progress_v1', JSON.stringify(saved));
  } catch (e) {}
  let emoji = '😬',
    verdict = 'Є куди рости';
  if (pct >= 90) {
    emoji = '🏆';
    verdict = 'Архітектурний геній!';
  } else if (pct >= 70) {
    emoji = '🔥';
    verdict = 'Дуже добре знаєш принципи';
  } else if (pct >= 50) {
    emoji = '💪';
    verdict = 'Хороша база, читай далі';
  }

  const principles = Object.keys(breakdown).filter(
    (k) => breakdownTotal[k] > 0
  );

  const res = document.getElementById('results');
  res.className = 'results show';
  res.innerHTML = `
    <div class="results-hero">
      <span class="results-emoji">${emoji}</span>
      <div class="results-score">${score}/${QUESTIONS.length}</div>
      <div class="results-label">${pct}% правильних відповідей</div>
      <div class="results-verdict">${verdict}</div>
    </div>

    <div class="breakdown">
      <div class="breakdown-title">BREAKDOWN ПО ПРИНЦИПАХ</div>
      ${principles
        .map((p) => {
          const got = breakdown[p] || 0;
          const total = breakdownTotal[p];
          const fill = total > 0 ? Math.round((got / total) * 100) : 0;
          const colors = {
            SRP: '#00d4ff',
            OCP: '#7c3aed',
            LSP: '#f59e0b',
            ISP: '#10b981',
            DIP: '#ef4444',
            DRY: '#00d4ff',
            KISS: '#7c3aed',
            YAGNI: '#f59e0b',
          };
          return `
          <div class="bd-row">
            <div class="bd-name">${p}</div>
            <div class="bd-bar-track">
              <div class="bd-bar-fill" style="width:${fill}%;background:${colors[p] || '#00d4ff'}"></div>
            </div>
            <div class="bd-frac">${got}/${total}</div>
          </div>
        `;
        })
        .join('')}
    </div>

    <div class="breakdown review-list">
      <div class="breakdown-title">ВІДПОВІДІ ПО ПИТАННЯХ</div>
      ${reviewLog
        .map(
          (r, i) => `
        <div class="review-item ${r.correct ? 'r-ok' : 'r-bad'}">
          <div class="review-icon">${r.correct ? '✓' : '✗'}</div>
          <div>
            <div class="review-q">Питання ${i + 1}: ${r.q.substring(0, 55)}...</div>
            <div class="review-p" style="color:${r.color}">${r.principle}</div>
          </div>
        </div>
      `
        )
        .join('')}
    </div>

    <div class="results-actions">
      <button class="btn-primary" onclick="restartQuiz()">🔄 Пройти ще раз</button>
      <a href="index.html" class="btn-secondary">📖 До гайду</a>
    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  // animate bars after render
  setTimeout(() => {
    document.querySelectorAll('.bd-bar-fill').forEach((el) => {
      const w = el.style.width;
      el.style.width = '0';
      requestAnimationFrame(() => {
        el.style.width = w;
      });
    });
  }, 100);
}

function restartQuiz() {
  current = 0;
  score = 0;
  answered = false;
  Object.keys(breakdown).forEach((k) => (breakdown[k] = 0));
  reviewLog.length = 0;

  document.getElementById('results').className = 'results';
  document.getElementById('progress-wrap').style.display = '';
  document.getElementById('quiz-header').style.display = '';

  renderQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// init
renderQuestion();

(function () {
  // Mark active page via data-current on body
  var page = document.body.dataset.current || 'quiz';
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
