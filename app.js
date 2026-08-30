/* CKKK · 个人主页（学习记录）— 路由与渲染 */
(function () {
  "use strict";

  const DATA = window.KAODATA || { questions: [], posts: [] };
  const SITE = window.KAOSITE || {};
  const Q = DATA.questions || [];
  const NOTES = DATA.notes || [];
  const CURVE = [1, 3, 7, 15, 30];
  const LS = { mastered: "kd-mastered", theme: "kd-theme" };
  const SUBJECT_COLOR = { "数学一": "var(--sienna)", "408": "var(--teal)" };

  const $ = (s, el) => (el || document).querySelector(s);
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const stripHtml = (h) => h.replace(/<[^>]*>/g, " ").replace(/&[a-z]+;/g, " ");
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");

  // ---------- 已掌握 / 遗忘曲线 ----------
  let overrides = {};
  try { overrides = JSON.parse(localStorage.getItem(LS.mastered) || "{}"); } catch {}
  const saveOverrides = () => localStorage.setItem(LS.mastered, JSON.stringify(overrides));
  const isMastered = (q) =>
    Object.prototype.hasOwnProperty.call(overrides, q.id) ? overrides[q.id] : !!q.mastered;
  const dueDate = (q) => {
    if (q.type !== "错题" || !q.date) return null;
    const d = new Date(q.date + "T00:00:00");
    if (isNaN(d)) return null;
    d.setDate(d.getDate() + CURVE[Math.min(q.rounds ?? 0, CURVE.length - 1)]);
    return d;
  };
  const isDue = (q) => {
    if (isMastered(q)) return false;
    const d = dueDate(q);
    return d ? d <= new Date() : false;
  };

  const textCache = new Map();
  const qText = (q) => {
    if (!textCache.has(q.id)) {
      textCache.set(q.id, [q.title, q.chapter, q.course, q.subject, q.tags.join(" "),
        stripHtml(q.stem), ...q.sections.map((s) => stripHtml(s.html))].join("\n").toLowerCase());
    }
    return textCache.get(q.id);
  };

  // ---------- 题库筛选状态 ----------
  const filters = {
    text: "", subjects: new Set(), courses: new Set(), tags: new Set(),
  };
  function presetFromQuery(query) {
    filters.text = ""; filters.subjects.clear(); filters.courses.clear();
    filters.tags.clear();
    if (!query) return;
    const p = new URLSearchParams(query);
    if (p.get("q")) filters.text = p.get("q");
    if (p.get("subject")) filters.subjects.add(p.get("subject"));
    if (p.get("course")) filters.courses.add(p.get("course"));
    if (p.get("tag")) filters.tags.add(p.get("tag"));
  }
  function filtered() {
    const kw = filters.text.trim().toLowerCase();
    return Q.filter((q) => {
      if (filters.subjects.size && !filters.subjects.has(q.subject)) return false;
      if (filters.courses.size && !filters.courses.has(q.course)) return false;
      if (filters.tags.size && ![...filters.tags].some((t) => q.tags.includes(t))) return false;
      if (kw && !qText(q).includes(kw)) return false;
      return true;
    });
  }
  function syncQuesHash() {
    const p = new URLSearchParams();
    if (filters.text.trim()) p.set("q", filters.text.trim());
    for (const s of filters.subjects) p.set("subject", s);
    for (const c of filters.courses) p.set("course", c);
    for (const t of filters.tags) p.set("tag", t);
    const qs = p.toString();
    const h = "#/ques" + (qs ? "?" + qs : "");
    if (location.hash !== h) history.replaceState(null, "", h);
  }

  // ---------- 公共渲染 ----------
  const subjectColor = (q) => SUBJECT_COLOR[q.subject] || "var(--ink)";

  function qcard(q) {
    const card = el("article", "qcard");
    const tags = q.tags.filter(Boolean).map((t) => `<a class="qtag" data-tag="${t}">${t}</a>`).join(" ");
    let due = "";
    if (isMastered(q)) due = `<span class="badge-done">✓ 已掌握</span>`;
    else {
      const d = dueDate(q);
      if (d && isDue(q)) due = `<span class="badge-due" title="1/3/7/15/30 遗忘曲线到期">待复习 ${d.getMonth() + 1}/${d.getDate()}</span>`;
    }
    const secs = q.sections.map((s) => {
      let label = "";
      if (s.kind === "wrong") {
        label = stripHtml(s.html).trim().length > 36 ? "错误解法" : "错误重现";
      } else if (s.kind === "answer") {
        label = q.type === "错题" ? "正确解答" : "解析";
      } else if (s.kind === "note") {
        label = "笔记";
      }
      return `<div class="q-sec ${s.kind}">${label ? `<div class="q-sec-label">${label}</div>` : ""}${s.html}</div>`;
    }).join("");
    card.innerHTML = `
      <div class="qmeta">
        <span class="qtype ${q.type === "练习" ? "gray" : ""}">${q.type}</span>
        <span>${q.subject}</span>
        ${tags}
        ${q.reason ? `<span>错因：${q.reason}</span>` : ""}
        ${q.date ? `<span>记录 ${q.date}</span>` : ""}
        ${due}
      </div>
      <div class="q-stem">${q.stem}</div>
      ${q.sections.length ? `<details class="q-details"><summary>答案与解析</summary>${secs}</details>` : ""}`;
    card.querySelectorAll(".qtag").forEach((a) =>
      a.addEventListener("click", () => { filters.tags.add(a.dataset.tag); rerenderQues(); }));
    return card;
  }

  // ---------- 路由 ----------
  const ROUTES = ["home", "notes", "ques", "tags", "projects", "about"];

  function parseHash() {
    const h = location.hash.replace(/^#/, "") || "/";
    const [pathPart, query] = h.split("?");
    const seg = pathPart.split("/").filter(Boolean);
    return { seg, query: query || "" };
  }

  function route() {
    const { seg, query } = parseHash();
    const top = seg[0] || "";
    setNav(top === "q" ? "ques" : top || "home");
    if (top === "" || top === "home") return renderHome();
    if (top === "notes") return renderNotes(query);
    if (top === "ques") return renderQues(query);
    if (top === "q") return renderSingle(seg[1]);
    if (top === "tags") return renderTags();
    if (top === "projects") return renderProjects();
    if (top === "about") return renderAbout();
    renderHome();
  }

  function setNav(name) {
    document.querySelectorAll("#nav a").forEach((a) =>
      a.classList.toggle("on", a.dataset.route === name));
  }

  function head(title, sub) {
    return `<div class="page-head"><h1>${title}</h1><div class="sub">${sub || ""}</div></div>`;
  }

  // ---------- 首页 ----------
  function renderHome() {
    document.title = SITE.name + " · 学习记录";
    const chips = (SITE.chips || []).map((c) => `<span class="chip">${c}</span>`).join("");
    const links = (SITE.links || []).map((l) => `<a href="${l.url}">${l.label}</a>`).join("");
    $("#view").innerHTML = `
      <div class="home-hero">
        <div class="avatar">${SITE.avatarText || "C"}</div>
        <h1>${SITE.name || "CKKK"}<small>${SITE.subtitle || ""}</small></h1>
        <p class="bio">${SITE.bio || ""}</p>
        <div class="home-chips">${chips}</div>
        <div class="home-links">${links}</div>
      </div>`;
  }

  // ---------- 笔记（mkdocs 式：左栏 7 科目手风琴 · 右栏小节目录） ----------
  const NOTE_SUBJECTS = ["高等数学", "线性代数", "概率论", "数据结构", "计算机组成原理", "操作系统", "计算机网络"];
  const collapsedSubjects = new Set();

  function renderNotes(query) {
    const p = new URLSearchParams(query || "");
    const s = p.get("s");
    const subject = NOTE_SUBJECTS.includes(s) ? s : NOTE_SUBJECTS[0];
    const list = NOTES.filter((n) => n.subject === subject);
    const note = list.find((n) => n.slug === p.get("n")) || list[0] || null;
    document.title = SITE.name + " · 笔记 · " + subject;

    const groups = NOTE_SUBJECTS.map((sub) => {
      const items = NOTES.filter((n) => n.subject === sub);
      const open = sub === subject && !collapsedSubjects.has(sub);
      const itemsHTML = items.map((n) =>
        `<a class="ns-item ${note && note.slug === n.slug ? "on" : ""}" href="#/notes?s=${encodeURIComponent(sub)}&n=${encodeURIComponent(n.slug)}">${n.chapter}</a>`).join("");
      const empty = open && !items.length ? `<div class="ns-empty">暂无笔记</div>` : "";
      return `<div class="ns-group ${open ? "open" : ""}">
        <a class="ns-head" data-s="${sub}" href="javascript:void 0"><span class="tri"></span>${sub}<i>${items.length || ""}</i></a>
        <div class="ns-items">${itemsHTML}${empty}</div>
      </div>`;
    }).join("");

    const toc = note ? note.toc || [] : [];
    const tocHTML = toc.length
      ? toc.map((t) => `<a class="toc-${t.level === 2 ? "h2" : "h3"}" data-h="${t.id}">${t.text}</a>`).join("")
      : `<div class="ns-empty">本文无小节</div>`;

    const noteWords = note ? stripHtml(note.html).replace(/\s/g, "").length : 0;
    const noteMin = note ? Math.max(1, Math.ceil(noteWords / 300)) : 0;

    let center;
    if (!note) {
      center = `<div class="empty"><span class="mk">空</span>${subject} 下还没有笔记。</div>`;
    } else {
      center = `<article class="article">
        <h1>${note.title}${note.sample ? '<span class="badge-sample">示例</span>' : ""}</h1>
        <div class="meta"><span>${note.subject} > ${note.chapter}</span><span>${note.date || ""}</span><span>${noteWords} 字</span><span>约 ${noteMin} 分钟</span></div>
        <div class="prose">${note.html}</div></article>`;
    }

    $("#view").innerHTML = `<div class="panel notes-panel"><div class="notes-layout">
      <aside class="notes-side">${groups}</aside>
      <div class="notes-main">${center}</div>
      <aside class="notes-side right">
        <div class="ns-title">小章节</div>
        ${note ? `<div class="ns-note">${note.title}</div>` : ""}
        ${tocHTML}
      </aside>
    </div></div>`;

    // 科目头：未展开 → 展开并进入第一篇；已展开 → 折叠
    document.querySelectorAll(".ns-head").forEach((a) =>
      a.addEventListener("click", () => {
        const sub = a.dataset.s;
        if (sub === subject && !collapsedSubjects.has(subject)) {
          collapsedSubjects.add(subject);
          renderNotes("s=" + encodeURIComponent(subject) + (p.get("n") ? "&n=" + encodeURIComponent(p.get("n")) : ""));
        } else {
          collapsedSubjects.delete(sub);
          const first = NOTES.find((n) => n.subject === sub);
          location.hash = "#/notes?s=" + encodeURIComponent(sub) + (first ? "&n=" + encodeURIComponent(first.slug) : "");
        }
      }));
    // 小节目录 → 滚动定位
    document.querySelectorAll(".notes-side.right [data-h]").forEach((a) =>
      a.addEventListener("click", () => {
        const h = document.getElementById(a.dataset.h);
        if (h) h.scrollIntoView({ block: "start" });
      }));
    // 正文标签 → 题库
    document.querySelectorAll(".article .qtag").forEach((a) =>
      a.addEventListener("click", () => {
        location.hash = "#/ques?tag=" + encodeURIComponent(a.dataset.tag);
      }));
  }

  // ---------- 题库 ----------
  function topTags(n) {
    const cnt = new Map();
    for (const q of Q) for (const t of q.tags) cnt.set(t, (cnt.get(t) || 0) + 1);
    return [...cnt.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
  }

  function chipBtn(label, pressed, onClick, count) {
    const b = el("button", "pill" + (pressed ? " on" : ""));
    b.type = "button";
    b.innerHTML = label + (count != null ? `<i>${count}</i>` : "");
    b.addEventListener("click", onClick);
    return b;
  }

  function renderQues(query) {
    presetFromQuery(query);
    document.title = SITE.name + " · 题库";
    const view = $("#view");
    view.innerHTML = `<div class="panel">${head("题库", `学习档案 · ${Q.length} 道题（错题与章节练习）`)}
      <div class="ques-toolbar">
        <input class="search" id="q-search" type="search" placeholder="搜索题干、答案、笔记……（/）" value="${esc(filters.text)}">
        <div class="seg" id="q-subject"></div>
        <select class="select" id="q-course"></select>
        <button class="ghost-btn" id="q-reset">重置</button>
      </div>
      <div class="tagbar" id="q-tags"></div>
      <div id="q-list"></div></div>`;

    // 科目分段
    const seg = $("#q-subject");
    const mkSeg = (label, val) => {
      const b = el("button", val === "" && filters.subjects.size === 0 ? "on" :
        (filters.subjects.has(val) ? "on" : ""), label);
      b.addEventListener("click", () => {
        if (val === "") filters.subjects.clear();
        else filters.subjects.has(val) ? filters.subjects.delete(val) : filters.subjects.add(val);
        rerenderQues();
      });
      return b;
    };
    seg.append(mkSeg("全部", ""));
    for (const s of DATA.subjects || []) seg.append(mkSeg(s, s));

    // 课程 / 状态 / 错因
    const courseSel = $("#q-course");
    courseSel.innerHTML = `<option value="">全部课程</option>` +
      (DATA.courses || []).map((c) =>
        `<option ${filters.courses.has(c) ? "selected" : ""}>${c}</option>`).join("");
    courseSel.addEventListener("change", () => {
      filters.courses.clear();
      if (courseSel.value) filters.courses.add(courseSel.value);
      rerenderQues();
    });

    $("#q-search").addEventListener("input", (e) => { filters.text = e.target.value; rerenderQues(); });
    $("#q-reset").addEventListener("click", () => {
      presetFromQuery(""); rerenderQues();
    });

    renderToolbarState();
    renderQuesList();
  }

  function renderToolbarState() {
    // 标签行（高频 8 个 + 已选但不在高频榜的 + 全部标签入口）
    const bar = $("#q-tags");
    if (!bar) return;
    bar.innerHTML = "";
    const top = topTags(8);
    for (const [t, n] of top) {
      bar.append(chipBtn(t, filters.tags.has(t), () => {
        filters.tags.has(t) ? filters.tags.delete(t) : filters.tags.add(t);
        rerenderQues();
      }, n));
    }
    for (const t of filters.tags) {
      if (top.some(([tt]) => tt === t)) continue;
      bar.append(chipBtn(t, true, () => {
        filters.tags.delete(t); rerenderQues();
      }));
    }
    const all = el("a", "pill link", "标签索引 →");
    all.href = "#/tags";
    bar.append(all);
    // 搜索框值保持
    const s = $("#q-search");
    if (s && document.activeElement !== s) s.value = filters.text;
  }

  function rerenderQues() {
    renderToolbarState();
    renderQuesList();
    syncQuesHash();
  }

  function renderQuesList() {
    const list = filtered();
    const box = $("#q-list");
    if (!box) return;
    box.innerHTML = "";
    if (!list.length) {
      box.appendChild(el("div", "empty", `<span class="mk">空</span>没有符合条件的题目。`));
      return;
    }
    const groups = new Map();
    for (const q of list) {
      if (!groups.has(q.course)) groups.set(q.course, new Map());
      const ch = groups.get(q.course);
      if (!ch.has(q.chapter)) ch.set(q.chapter, []);
      ch.get(q.chapter).push(q);
    }
    for (const [course, chapters] of groups) {
      const subj = list.find((q) => q.course === course)?.subject || "";
      const h = el("div", "course-head" + (subj === "408" ? " teal" : ""));
      h.innerHTML = `${course} <span class="n">${[...chapters.values()].reduce((n, v) => n + v.length, 0)} 题</span>`;
      box.appendChild(h);
      for (const [chapter, qs] of chapters) {
        if (chapter) box.appendChild(el("div", "chapter-head", chapter));
        for (const q of qs) box.appendChild(qcard(q));
      }
    }
    document.title = SITE.name + " · 题库 " + list.length + " 题";
  }

  function renderSingle(id) {
    const list = filtered();
    let idx = list.findIndex((q) => q.id === id);
    if (idx === -1 && list.length) idx = 0;
    if (!list.length) {
      $("#view").innerHTML = `<div class="panel"><div class="empty"><span class="mk">空</span>没有符合条件的题目。</div></div>`;
      return;
    }
    const q = list[idx];
    document.title = SITE.name + " · 题库";
    const view = $("#view");
    view.innerHTML = `<div class="panel" style="max-width:760px">
      <div class="single-progress">
        <span>${idx + 1} / ${list.length}</span>
        <div class="p-track"><div class="p-fill" style="width:${((idx + 1) / list.length) * 100}%"></div></div>
        <span>${q.subject}</span>
      </div>
      <div id="single-holder"></div>
      <div class="single-nav" id="single-nav"></div></div>`;
    const card = qcard(q);
    card.classList.add("card-in");
    card.querySelector(".q-details")?.setAttribute("open", "");
    $("#single-holder").appendChild(card);

    const nav = $("#single-nav");
    const prev = el("button", "nav-btn", "← 上一题");
    const rnd = el("button", "nav-btn", "随机");
    const mark = el("button", "nav-btn" + (isMastered(q) ? " done" : ""), isMastered(q) ? "已掌握" : "标记掌握");
    const next = el("button", "nav-btn primary", "下一题 →");
    prev.disabled = idx === 0;
    next.disabled = idx === list.length - 1;
    prev.addEventListener("click", () => stepSingle(-1));
    next.addEventListener("click", () => stepSingle(1));
    rnd.addEventListener("click", () => {
      let r; do { r = Math.floor(Math.random() * list.length); } while (list.length > 1 && r === idx);
      history.replaceState(null, "", "#/q/" + list[r].id);
      renderSingle(list[r].id);
    });
    mark.addEventListener("click", () => {
      overrides[q.id] = !isMastered(q); saveOverrides(); renderSingle(q.id);
    });
    nav.append(prev, rnd, mark, next);
    window.scrollTo({ top: 0 });
  }

  function stepSingle(dir) {
    const list = filtered();
    const idx = list.findIndex((q) => q.id === currentSingleId());
    const n = idx + dir;
    if (n < 0 || n >= list.length) return;
    history.replaceState(null, "", "#/q/" + list[n].id);
    renderSingle(list[n].id);
  }
  const currentSingleId = () => (parseHash().seg[0] === "q" ? parseHash().seg[1] : null);

  // ---------- 标签页 ----------
  function renderTags() {
    document.title = SITE.name + " · 标签";
    const qCnt = new Map(), nCnt = new Map();
    for (const q of Q) for (const t of q.tags) qCnt.set(t, (qCnt.get(t) || 0) + 1);
    for (const n of NOTES) for (const t of n.tags) nCnt.set(t, (nCnt.get(t) || 0) + 1);
    const all = new Set([...qCnt.keys(), ...nCnt.keys()].filter(Boolean));
    const total = (t) => (qCnt.get(t) || 0) + (nCnt.get(t) || 0);

    // 分组：科目→课程（题目）+ 文章
    const groupHTML = (title, cls, entries) => {
      if (!entries.length) return "";
      const rows = entries.sort((a, b) => total(b) - total(a)).map((t) => `
        <div class="irow" data-tag="${t}"><span class="nm">${t}</span>
        <span class="l"></span><span class="n">${total(t)}</span></div>`).join("");
      return `<div class="idxg"><h3 class="${cls}">${title}</h3>${rows}</div>`;
    };
    const bySubject = {};
    for (const q of Q) for (const t of q.tags) {
      const key = q.subject + " · " + q.course;
      (bySubject[key] = bySubject[key] || new Set()).add(t);
    }
    let groupsHTML = "";
    const subjKeys = Object.keys(bySubject).sort((a, b) => {
      const sa = Q.find((q) => q.subject + " · " + q.course === a)?.subject || "";
      const sb = Q.find((q) => q.subject + " · " + q.course === b)?.subject || "";
      return sa === sb ? a.localeCompare(b) : (sa === "数学一" ? -1 : 1);
    });
    let first = true;
    for (const k of subjKeys) {
      const subj = k.split(" · ")[0];
      groupsHTML += groupHTML(subj + " · " + k.split(" · ")[1], first ? "" : "t", [...bySubject[k]]);
      first = false;
    }
    const postTags = [...all].filter((t) => nCnt.has(t) && !qCnt.has(t));
    groupsHTML += groupHTML("笔记", "m", postTags);

    $("#view").innerHTML = `<div class="panel">${head("标签", `${all.size} 个标签 · 覆盖笔记与题目 · 点入即筛选题库`)}
      <div class="idx-cols" id="tag-index">${groupsHTML}</div></div>`;
    document.querySelectorAll("#tag-index .irow").forEach((r) =>
      r.addEventListener("click", () => {
        location.hash = "#/ques?tag=" + encodeURIComponent(r.dataset.tag);
      }));
  }

  // ---------- 项目 / 关于 ----------
  function renderProjects() {
    document.title = SITE.name + " · 项目";
    const cards = (SITE.projects || []).map((p) => `
      <a class="pj-card" href="${p.url || "#"}">
        <div class="nm">${p.name}<span>${p.tag || ""}</span></div><p>${p.desc || ""}</p>
      </a>`).join("");
    $("#view").innerHTML = `<div class="panel">${head("项目", "小工具与作品")}
      <div class="pj-grid">${cards || '<div class="empty"><span class="mk">空</span>还没有项目。</div>'}</div></div>`;
  }

  function renderAbout() {
    document.title = SITE.name + " · 关于";
    const ps = (SITE.about || []).map((t) => `<p>${t}</p>`).join("");
    const links = (SITE.links || []).map((l) => `<a href="${l.url}">${l.label}</a>`).join(" · ");
    $("#view").innerHTML = `<div class="panel">${head("关于", "关于本站与我")}
      <div class="about-body prose">${ps}
      <p style="color:var(--soft)">${links}</p></div></div>`;
  }

  // ---------- 主题 / 键盘 / 启动 ----------
  function initTheme() {
    const saved = localStorage.getItem(LS.theme);
    const dark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }
  function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(LS.theme, next);
  }
  function onKey(e) {
    const tag = document.activeElement?.tagName;
    if (["INPUT", "SELECT", "TEXTAREA"].includes(tag)) {
      if (e.key === "Escape") document.activeElement.blur();
      return;
    }
    if (e.key === "/") { e.preventDefault(); $("#q-search")?.focus(); return; }
    if (e.key === "t" || e.key === "T") { toggleTheme(); return; }
    if (parseHash().seg[0] !== "q") return;
    if (e.key === "ArrowLeft") { e.preventDefault(); stepSingle(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); stepSingle(1); }
    else if (e.key === " ") {
      const d = $("#single-holder .q-details");
      if (d) { e.preventDefault(); d.open = !d.open; }
    }
    else if (e.key === "m" || e.key === "M") {
      const q = Q.find((x) => x.id === currentSingleId());
      if (q) { overrides[q.id] = !isMastered(q); saveOverrides(); renderSingle(q.id); }
    }
  }

  function initBackTop() {
    const btn = $("#back-top");
    if (!btn) return;
    const onScroll = () => btn.classList.toggle("show", window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    btn.addEventListener("click", () => window.scrollTo({ top: 0 }));
  }

  function init() {
    initTheme();
    initBackTop();
    $("#theme-toggle").addEventListener("click", toggleTheme);
    $("#site-foot").innerHTML =
      `<span>${SITE.footer || ""}</span><span>RSS · GITHUB · EMAIL</span>`;
    window.addEventListener("hashchange", route);
    document.addEventListener("keydown", onKey);
    route();
  }
  init();
})();
