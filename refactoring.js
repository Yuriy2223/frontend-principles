const STEPS = [
  // ── STEP 0: Original bad code ──
  [
    {
      t: `<span class="kw">import</span> { useState, useEffect } <span class="kw">from</span> <span class="str">'react'</span>`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// Весь User — хоча потрібно лише 2 поля</span>`,
      c: 'n',
    },
    {
      t: `<span class="kw">interface</span> <span class="ty">User</span> {`,
      c: 'n',
    },
    {
      t: `  id: <span class="kw">string</span>; name: <span class="kw">string</span>; avatar: <span class="kw">string</span>`,
      c: 'n',
    },
    {
      t: `  role: <span class="kw">string</span>; email: <span class="kw">string</span>; phone: <span class="kw">string</span>`,
      c: 'n',
    },
    {
      t: `  department: <span class="kw">string</span>; createdAt: <span class="kw">string</span>`,
      c: 'n',
    },
    { t: `}`, c: 'n' },
    { t: ``, c: 'n' },
    {
      t: `<span class="kw">const</span> <span class="fn">UserCard</span> = ({ userId }: { userId: <span class="kw">string</span> }) => {`,
      c: 'n',
    },
    {
      t: `  <span class="cm">// Логіка даних прямо тут — порушення SRP</span>`,
      c: 'n',
    },
    {
      t: `  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>&lt;<span class="ty">User</span> | <span class="kw">null</span>&gt;(<span class="kw">null</span>)`,
      c: 'n',
    },
    {
      t: `  <span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">true</span>)`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `  <span class="cm">// fetch напряму — порушення DIP</span>`,
      c: 'n',
    },
    { t: `  <span class="fn">useEffect</span>(() => {`, c: 'n' },
    {
      t: `    <span class="fn">fetch</span>(<span class="str">\`/api/users/\${userId}\`</span>)`,
      c: 'n',
    },
    {
      t: `      .<span class="fn">then</span>(r => r.<span class="fn">json</span>())`,
      c: 'n',
    },
    { t: `      .<span class="fn">then</span>(setUser)`, c: 'n' },
    {
      t: `      .<span class="fn">finally</span>(() => <span class="fn">setLoading</span>(<span class="kw">false</span>))`,
      c: 'n',
    },
    { t: `  }, [userId])`, c: 'n' },
    { t: ``, c: 'n' },
    {
      t: `  <span class="cm">// Весь User у пропсі — порушення ISP</span>`,
      c: 'n',
    },
    {
      t: `  <span class="cm">// if/else по ролях — порушення OCP</span>`,
      c: 'n',
    },
    {
      t: `  <span class="kw">const</span> <span class="fn">getRoleLabel</span> = (role: <span class="kw">string</span>) => {`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'admin'</span>) <span class="kw">return</span> <span class="str">'Адмін'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'editor'</span>) <span class="kw">return</span> <span class="str">'Редактор'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'viewer'</span>) <span class="kw">return</span> <span class="str">'Глядач'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">return</span> <span class="str">'Невідомо'</span>`,
      c: 'n',
    },
    { t: `  }`, c: 'n' },
    { t: ``, c: 'n' },
    {
      t: `  <span class="kw">if</span> (loading) <span class="kw">return</span> &lt;<span class="ty">Skeleton</span> /&gt;`,
      c: 'n',
    },
    {
      t: `  <span class="kw">if</span> (!user) <span class="kw">return</span> <span class="kw">null</span>`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    { t: `  <span class="kw">return</span> (`, c: 'n' },
    {
      t: `    &lt;<span class="ty">div</span> className=<span class="str">"card"</span>&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">img</span> src={user.avatar} alt={user.name} /&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">h2</span>&gt;{user.name}&lt;/<span class="ty">h2</span>&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">span</span>&gt;{<span class="fn">getRoleLabel</span>(user.role)}&lt;/<span class="ty">span</span>&gt;`,
      c: 'n',
    },
    { t: `    &lt;/<span class="ty">div</span>&gt;`, c: 'n' },
    { t: `  )`, c: 'n' },
    { t: `}`, c: 'n' },
  ],

  // ── STEP 1: SRP — extract useUser hook ──
  [
    {
      t: `<span class="kw">import</span> { useState, useEffect } <span class="kw">from</span> <span class="str">'react'</span>`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// ✓ SRP: логіка даних — окремий хук</span>`,
      c: 'a',
    },
    {
      t: `<span class="kw">const</span> <span class="fn">useUser</span> = (id: <span class="kw">string</span>) => {`,
      c: 'a',
    },
    {
      t: `  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>(<span class="kw">null</span>)`,
      c: 'a',
    },
    {
      t: `  <span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">true</span>)`,
      c: 'a',
    },
    { t: `  <span class="fn">useEffect</span>(() => {`, c: 'a' },
    {
      t: `    <span class="fn">fetch</span>(<span class="str">\`/api/users/\${id}\`</span>)`,
      c: 'a',
    },
    {
      t: `      .<span class="fn">then</span>(r => r.<span class="fn">json</span>()).<span class="fn">then</span>(setUser)`,
      c: 'a',
    },
    {
      t: `      .<span class="fn">finally</span>(() => <span class="fn">setLoading</span>(<span class="kw">false</span>))`,
      c: 'a',
    },
    { t: `  }, [id])`, c: 'a' },
    { t: `  <span class="kw">return</span> { user, loading }`, c: 'a' },
    { t: `}`, c: 'a' },
    { t: ``, c: 'n' },
    {
      t: `<span class="kw">const</span> <span class="fn">UserCard</span> = ({ userId }: { userId: <span class="kw">string</span> }) => {`,
      c: 'n',
    },
    {
      t: `  <span class="cm">// ✓ Компонент тільки споживає хук</span>`,
      c: 'a',
    },
    {
      t: `  <span class="kw">const</span> { user, loading } = <span class="fn">useUser</span>(userId)`,
      c: 'a',
    },
    { t: ``, c: 'n' },
    {
      t: `  <span class="kw">const</span> <span class="fn">getRoleLabel</span> = (role: <span class="kw">string</span>) => {`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'admin'</span>) <span class="kw">return</span> <span class="str">'Адмін'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'editor'</span>) <span class="kw">return</span> <span class="str">'Редактор'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'viewer'</span>) <span class="kw">return</span> <span class="str">'Глядач'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">return</span> <span class="str">'Невідомо'</span>`,
      c: 'n',
    },
    { t: `  }`, c: 'n' },
    { t: ``, c: 'n' },
    {
      t: `  <span class="kw">if</span> (loading) <span class="kw">return</span> &lt;<span class="ty">Skeleton</span> /&gt;`,
      c: 'n',
    },
    {
      t: `  <span class="kw">if</span> (!user) <span class="kw">return</span> <span class="kw">null</span>`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    { t: `  <span class="kw">return</span> (`, c: 'n' },
    {
      t: `    &lt;<span class="ty">div</span> className=<span class="str">"card"</span>&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">img</span> src={user.avatar} alt={user.name} /&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">h2</span>&gt;{user.name}&lt;/<span class="ty">h2</span>&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">span</span>&gt;{<span class="fn">getRoleLabel</span>(user.role)}&lt;/<span class="ty">span</span>&gt;`,
      c: 'n',
    },
    { t: `    &lt;/<span class="ty">div</span>&gt;`, c: 'n' },
    { t: `  )`, c: 'n' },
    { t: `}`, c: 'n' },
  ],

  // ── STEP 2: DIP — inject httpClient ──
  [
    {
      t: `<span class="kw">import</span> { useState, useEffect } <span class="kw">from</span> <span class="str">'react'</span>`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// ✓ DIP: хук приймає httpClient як залежність</span>`,
      c: 'a',
    },
    {
      t: `<span class="ty">type</span> <span class="ty">HttpClient</span> = (url: <span class="kw">string</span>) => <span class="ty">Promise</span>&lt;<span class="kw">any</span>&gt;`,
      c: 'a',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="kw">const</span> <span class="fn">useUser</span> = (`,
      c: 'n',
    },
    { t: `  id: <span class="kw">string</span>,`, c: 'n' },
    {
      t: `  <span class="cm">// ✓ Абстракція замість конкретного fetch</span>`,
      c: 'a',
    },
    {
      t: `  httpClient: <span class="ty">HttpClient</span> = fetch`,
      c: 'a',
    },
    {
      t: `  <span class="cm">// можна передати axios, mock, тощо</span>`,
      c: 'a',
    },
    { t: `) => {`, c: 'n' },
    {
      t: `  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>(<span class="kw">null</span>)`,
      c: 'n',
    },
    {
      t: `  <span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">true</span>)`,
      c: 'n',
    },
    { t: `  <span class="fn">useEffect</span>(() => {`, c: 'n' },
    {
      t: `    <span class="fn">httpClient</span>(<span class="str">\`/api/users/\${id}\`</span>)`,
      c: 'a',
    },
    {
      t: `      .<span class="fn">then</span>(r => r.<span class="fn">json</span>()).<span class="fn">then</span>(setUser)`,
      c: 'n',
    },
    {
      t: `      .<span class="fn">finally</span>(() => <span class="fn">setLoading</span>(<span class="kw">false</span>))`,
      c: 'n',
    },
    { t: `  }, [id, httpClient])`, c: 'n' },
    { t: `  <span class="kw">return</span> { user, loading }`, c: 'n' },
    { t: `}`, c: 'n' },
    { t: ``, c: 'n' },
    {
      t: `<span class="kw">const</span> <span class="fn">UserCard</span> = ({ userId }: { userId: <span class="kw">string</span> }) => {`,
      c: 'n',
    },
    {
      t: `  <span class="kw">const</span> { user, loading } = <span class="fn">useUser</span>(userId)`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `  <span class="kw">const</span> <span class="fn">getRoleLabel</span> = (role: <span class="kw">string</span>) => {`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'admin'</span>) <span class="kw">return</span> <span class="str">'Адмін'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'editor'</span>) <span class="kw">return</span> <span class="str">'Редактор'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'viewer'</span>) <span class="kw">return</span> <span class="str">'Глядач'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">return</span> <span class="str">'Невідомо'</span>`,
      c: 'n',
    },
    { t: `  }`, c: 'n' },
    { t: ``, c: 'n' },
    {
      t: `  <span class="kw">if</span> (loading) <span class="kw">return</span> &lt;<span class="ty">Skeleton</span> /&gt;`,
      c: 'n',
    },
    {
      t: `  <span class="kw">if</span> (!user) <span class="kw">return</span> <span class="kw">null</span>`,
      c: 'n',
    },
    { t: `  <span class="kw">return</span> (`, c: 'n' },
    {
      t: `    &lt;<span class="ty">div</span> className=<span class="str">"card"</span>&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">img</span> src={user.avatar} alt={user.name} /&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">h2</span>&gt;{user.name}&lt;/<span class="ty">h2</span>&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">span</span>&gt;{<span class="fn">getRoleLabel</span>(user.role)}&lt;/<span class="ty">span</span>&gt;`,
      c: 'n',
    },
    { t: `    &lt;/<span class="ty">div</span>&gt;`, c: 'n' },
    { t: `  )`, c: 'n' },
    { t: `}`, c: 'n' },
  ],

  // ── STEP 3: ISP — narrow props interface ──
  [
    {
      t: `<span class="kw">import</span> { useState, useEffect } <span class="kw">from</span> <span class="str">'react'</span>`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="ty">type</span> <span class="ty">HttpClient</span> = (url: <span class="kw">string</span>) => <span class="ty">Promise</span>&lt;<span class="kw">any</span>&gt;`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// ✓ ISP: тільки поля, які реально потрібні</span>`,
      c: 'a',
    },
    {
      t: `<span class="kw">interface</span> <span class="ty">UserCardProps</span> {`,
      c: 'a',
    },
    { t: `  name: <span class="kw">string</span>`, c: 'a' },
    { t: `  avatar: <span class="kw">string</span>`, c: 'a' },
    { t: `  role: <span class="kw">string</span>`, c: 'a' },
    { t: `}`, c: 'a' },
    {
      t: `<span class="cm">// email, phone, department — нас не стосуються</span>`,
      c: 'a',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="kw">const</span> <span class="fn">useUser</span> = (id: <span class="kw">string</span>, httpClient: <span class="ty">HttpClient</span> = fetch) => {`,
      c: 'n',
    },
    {
      t: `  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>(<span class="kw">null</span>)`,
      c: 'n',
    },
    {
      t: `  <span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">true</span>)`,
      c: 'n',
    },
    { t: `  <span class="fn">useEffect</span>(() => {`, c: 'n' },
    {
      t: `    <span class="fn">httpClient</span>(<span class="str">\`/api/users/\${id}\`</span>)`,
      c: 'n',
    },
    {
      t: `      .<span class="fn">then</span>(r => r.<span class="fn">json</span>()).<span class="fn">then</span>(setUser)`,
      c: 'n',
    },
    {
      t: `      .<span class="fn">finally</span>(() => <span class="fn">setLoading</span>(<span class="kw">false</span>))`,
      c: 'n',
    },
    { t: `  }, [id, httpClient])`, c: 'n' },
    { t: `  <span class="kw">return</span> { user, loading }`, c: 'n' },
    { t: `}`, c: 'n' },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// ✓ Отримуємо тільки потрібні пропси</span>`,
      c: 'a',
    },
    {
      t: `<span class="kw">const</span> <span class="fn">UserCard</span> = ({ name, avatar, role }: <span class="ty">UserCardProps</span>) => {`,
      c: 'a',
    },
    { t: ``, c: 'n' },
    {
      t: `  <span class="kw">const</span> <span class="fn">getRoleLabel</span> = (role: <span class="kw">string</span>) => {`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'admin'</span>) <span class="kw">return</span> <span class="str">'Адмін'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'editor'</span>) <span class="kw">return</span> <span class="str">'Редактор'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">if</span> (role <span class="op">===</span> <span class="str">'viewer'</span>) <span class="kw">return</span> <span class="str">'Глядач'</span>`,
      c: 'n',
    },
    {
      t: `    <span class="kw">return</span> <span class="str">'Невідомо'</span>`,
      c: 'n',
    },
    { t: `  }`, c: 'n' },
    { t: ``, c: 'n' },
    { t: `  <span class="kw">return</span> (`, c: 'n' },
    {
      t: `    &lt;<span class="ty">div</span> className=<span class="str">"card"</span>&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">img</span> src={avatar} alt={name} /&gt;`,
      c: 'a',
    },
    {
      t: `      &lt;<span class="ty">h2</span>&gt;{name}&lt;/<span class="ty">h2</span>&gt;`,
      c: 'a',
    },
    {
      t: `      &lt;<span class="ty">span</span>&gt;{<span class="fn">getRoleLabel</span>(role)}&lt;/<span class="ty">span</span>&gt;`,
      c: 'a',
    },
    { t: `    &lt;/<span class="ty">div</span>&gt;`, c: 'n' },
    { t: `  )`, c: 'n' },
    { t: `}`, c: 'n' },
  ],

  // ── STEP 4: OCP — strategy object for roles ──
  [
    {
      t: `<span class="kw">import</span> { useState, useEffect } <span class="kw">from</span> <span class="str">'react'</span>`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="ty">type</span> <span class="ty">HttpClient</span> = (url: <span class="kw">string</span>) => <span class="ty">Promise</span>&lt;<span class="kw">any</span>&gt;`,
      c: 'n',
    },
    {
      t: `<span class="kw">interface</span> <span class="ty">UserCardProps</span> { name: <span class="kw">string</span>; avatar: <span class="kw">string</span>; role: <span class="kw">string</span> }`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// ✓ OCP: розширення без модифікації</span>`,
      c: 'a',
    },
    {
      t: `<span class="kw">const</span> ROLE_LABELS: <span class="ty">Record</span>&lt;<span class="kw">string</span>, <span class="kw">string</span>&gt; = {`,
      c: 'a',
    },
    { t: `  admin:  <span class="str">'Адмін'</span>,`, c: 'a' },
    { t: `  editor: <span class="str">'Редактор'</span>,`, c: 'a' },
    { t: `  viewer: <span class="str">'Глядач'</span>,`, c: 'a' },
    {
      t: `  <span class="cm">// нова роль = один рядок тут</span>`,
      c: 'a',
    },
    { t: `}`, c: 'a' },
    { t: ``, c: 'n' },
    {
      t: `<span class="kw">const</span> <span class="fn">useUser</span> = (id: <span class="kw">string</span>, httpClient: <span class="ty">HttpClient</span> = fetch) => {`,
      c: 'n',
    },
    {
      t: `  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>(<span class="kw">null</span>)`,
      c: 'n',
    },
    {
      t: `  <span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">true</span>)`,
      c: 'n',
    },
    { t: `  <span class="fn">useEffect</span>(() => {`, c: 'n' },
    {
      t: `    <span class="fn">httpClient</span>(<span class="str">\`/api/users/\${id}\`</span>)`,
      c: 'n',
    },
    {
      t: `      .<span class="fn">then</span>(r => r.<span class="fn">json</span>()).<span class="fn">then</span>(setUser)`,
      c: 'n',
    },
    {
      t: `      .<span class="fn">finally</span>(() => <span class="fn">setLoading</span>(<span class="kw">false</span>))`,
      c: 'n',
    },
    { t: `  }, [id, httpClient])`, c: 'n' },
    { t: `  <span class="kw">return</span> { user, loading }`, c: 'n' },
    { t: `}`, c: 'n' },
    { t: ``, c: 'n' },
    {
      t: `<span class="kw">const</span> <span class="fn">UserCard</span> = ({ name, avatar, role }: <span class="ty">UserCardProps</span>) => {`,
      c: 'n',
    },
    { t: ``, c: 'n' },
    {
      t: `  <span class="cm">// ✓ lookup замість if/else chain</span>`,
      c: 'a',
    },
    {
      t: `  <span class="kw">const</span> label = ROLE_LABELS[role] ?? <span class="str">'Невідомо'</span>`,
      c: 'a',
    },
    { t: ``, c: 'n' },
    { t: `  <span class="kw">return</span> (`, c: 'n' },
    {
      t: `    &lt;<span class="ty">div</span> className=<span class="str">"card"</span>&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">img</span> src={avatar} alt={name} /&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">h2</span>&gt;{name}&lt;/<span class="ty">h2</span>&gt;`,
      c: 'n',
    },
    {
      t: `      &lt;<span class="ty">span</span>&gt;{label}&lt;/<span class="ty">span</span>&gt;`,
      c: 'a',
    },
    { t: `    &lt;/<span class="ty">div</span>&gt;`, c: 'n' },
    { t: `  )`, c: 'n' },
    { t: `}`, c: 'n' },
  ],

  // ── STEP 5: Final clean code ──
  [
    {
      t: `<span class="kw">import</span> { useState, useEffect } <span class="kw">from</span> <span class="str">'react'</span>`,
      c: 'h',
    },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// ── Types ────────────────────────────────</span>`,
      c: 'h',
    },
    {
      t: `<span class="ty">type</span> <span class="ty">HttpClient</span> = (url: <span class="kw">string</span>) => <span class="ty">Promise</span>&lt;<span class="kw">any</span>&gt;`,
      c: 'h',
    },
    {
      t: `<span class="kw">interface</span> <span class="ty">UserCardProps</span> {`,
      c: 'h',
    },
    {
      t: `  name: <span class="kw">string</span>; avatar: <span class="kw">string</span>; role: <span class="kw">string</span>`,
      c: 'h',
    },
    { t: `}`, c: 'h' },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// ── OCP: розширення без модифікації ──────</span>`,
      c: 'h',
    },
    {
      t: `<span class="kw">const</span> ROLE_LABELS: <span class="ty">Record</span>&lt;<span class="kw">string</span>, <span class="kw">string</span>&gt; = {`,
      c: 'h',
    },
    {
      t: `  admin: <span class="str">'Адмін'</span>, editor: <span class="str">'Редактор'</span>, viewer: <span class="str">'Глядач'</span>`,
      c: 'h',
    },
    { t: `}`, c: 'h' },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// ── SRP + DIP: хук даних ─────────────────</span>`,
      c: 'h',
    },
    {
      t: `<span class="kw">const</span> <span class="fn">useUser</span> = (id: <span class="kw">string</span>, http: <span class="ty">HttpClient</span> = fetch) => {`,
      c: 'h',
    },
    {
      t: `  <span class="kw">const</span> [user, setUser] = <span class="fn">useState</span>(<span class="kw">null</span>)`,
      c: 'h',
    },
    {
      t: `  <span class="kw">const</span> [loading, setLoading] = <span class="fn">useState</span>(<span class="kw">true</span>)`,
      c: 'h',
    },
    { t: `  <span class="fn">useEffect</span>(() => {`, c: 'h' },
    {
      t: `    <span class="fn">http</span>(<span class="str">\`/api/users/\${id}\`</span>)`,
      c: 'h',
    },
    {
      t: `      .<span class="fn">then</span>(r => r.<span class="fn">json</span>()).<span class="fn">then</span>(setUser)`,
      c: 'h',
    },
    {
      t: `      .<span class="fn">finally</span>(() => <span class="fn">setLoading</span>(<span class="kw">false</span>))`,
      c: 'h',
    },
    { t: `  }, [id, http])`, c: 'h' },
    { t: `  <span class="kw">return</span> { user, loading }`, c: 'h' },
    { t: `}`, c: 'h' },
    { t: ``, c: 'n' },
    {
      t: `<span class="cm">// ── ISP: мінімальний інтерфейс ───────────</span>`,
      c: 'h',
    },
    {
      t: `<span class="kw">const</span> <span class="fn">UserCard</span> = ({ name, avatar, role }: <span class="ty">UserCardProps</span>) => {`,
      c: 'h',
    },
    {
      t: `  <span class="kw">const</span> label = ROLE_LABELS[role] ?? <span class="str">'Невідомо'</span>`,
      c: 'h',
    },
    { t: `  <span class="kw">return</span> (`, c: 'h' },
    {
      t: `    &lt;<span class="ty">div</span> className=<span class="str">"card"</span>&gt;`,
      c: 'h',
    },
    {
      t: `      &lt;<span class="ty">img</span> src={avatar} alt={name} /&gt;`,
      c: 'h',
    },
    {
      t: `      &lt;<span class="ty">h2</span>&gt;{name}&lt;/<span class="ty">h2</span>&gt;`,
      c: 'h',
    },
    {
      t: `      &lt;<span class="ty">span</span>&gt;{label}&lt;/<span class="ty">span</span>&gt;`,
      c: 'h',
    },
    { t: `    &lt;/<span class="ty">div</span>&gt;`, c: 'h' },
    { t: `  )`, c: 'h' },
    { t: `}`, c: 'h' },
  ],
];

// ─────────────────────────────────────────────
let currentStep = 0;

function renderCode(stepIdx, animate = false) {
  const lines = STEPS[stepIdx];
  const area = document.getElementById('code-area');
  area.innerHTML = '';

  let added = 0,
    removed = 0;

  lines.forEach((line, i) => {
    const row = document.createElement('div');
    row.className = 'ln';
    if (line.c === 'a') {
      row.classList.add('added');
      added++;
    }
    if (line.c === 'r') {
      row.classList.add('removed');
      removed++;
    }
    if (line.c === 'h') row.classList.add('highlight');

    if (animate && line.c !== 'n') {
      row.style.animationDelay = `${i * 18}ms`;
    }

    const numEl = document.createElement('span');
    numEl.className = 'ln-num';
    numEl.textContent = i + 1;

    const markerEl = document.createElement('span');
    if (line.c === 'a') {
      markerEl.className = 'marker-add';
      markerEl.textContent = '+';
    } else if (line.c === 'r') {
      markerEl.className = 'marker-rem';
      markerEl.textContent = '-';
    } else {
      markerEl.className = 'marker-neu';
      markerEl.textContent = ' ';
    }

    const codeEl = document.createElement('span');
    codeEl.style.flex = '1';
    codeEl.innerHTML = line.t || '&nbsp;';

    row.appendChild(numEl);
    row.appendChild(markerEl);
    row.appendChild(codeEl);
    area.appendChild(row);
  });

  // Stats
  const stats = document.getElementById('editor-stats');
  stats.innerHTML = added > 0 ? `<span class="stat add">+${added}</span>` : '';
  if (removed > 0)
    stats.innerHTML += `<span class="stat rem">-${removed}</span>`;
}

function updateNav(stepIdx) {
  document.querySelectorAll('.step-dot').forEach((dot, i) => {
    dot.classList.remove('active', 'done');
    if (i < stepIdx) dot.classList.add('done');
    if (i === stepIdx) dot.classList.add('active');
  });
}

function goStep(stepIdx) {
  // Hide current card
  document.getElementById(`card-${currentStep}`).classList.remove('active');

  currentStep = stepIdx;

  // Show new card
  document.getElementById(`card-${currentStep}`).classList.add('active');

  // Render code
  renderCode(currentStep, true);
  updateNav(currentStep);

  // Show final banner only on step 5
  const banner = document.getElementById('final-banner');
  if (currentStep === 5) {
    banner.classList.add('show');
    // Save refactoring as completed
    try {
      var saved = JSON.parse(localStorage.getItem('fp_progress_v1') || '{}');
      saved['refactoring'] = 2;
      localStorage.setItem('fp_progress_v1', JSON.stringify(saved));
    } catch (e) {}
  } else {
    banner.classList.remove('show');
  }

  // Scroll to top on mobile
  if (window.innerWidth < 900) {
    document
      .querySelector('.editor')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Nav dot clicks
document.querySelectorAll('.step-dot').forEach((dot) => {
  dot.addEventListener('click', () => {
    goStep(parseInt(dot.dataset.step));
  });
});

// Init
renderCode(0, false);

(function () {
  // Mark active page via data-current on body
  var page = document.body.dataset.current || 'refactoring';
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
