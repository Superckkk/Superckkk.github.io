// 流程引擎 + UI。hash 路由：#/ielts #/pu #/level，#/ 为首页。
import { parseExam, parseFlow, mdToHtml } from "./md-parser.js";
import { gradeExam, evaluateBranches, cefrFor, wordCount } from "./scoring.js";

const app = document.getElementById("app");
const timerEl = document.getElementById("timer");

const state = {
  flow: null, node: null, exam: null, score: null,
  answers: {}, forcedBranch: null, timerId: null, deadline: 0,
};

const FLOWS = {
  ielts: { name: "雅思水平测" },
  pu: { name: "PU 欢乐测" },
  level: { name: "KP 定位测" },
};

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

async function fetchText(url) {
  let r = await fetch(url, { cache: "no-store" }).catch(() => null);
  if (!r || !r.ok) {
    await new Promise((res) => setTimeout(res, 400)); // 瞬时网络/服务抖动自动重试一次
    r = await fetch(url, { cache: "no-store" }).catch(() => null);
  }
  if (!r || !r.ok) throw new Error(`文件不存在或读取失败：${esc(url)}（${r ? "HTTP " + r.status : "网络连接失败"}）`);
  return r.text();
}

// ---------- 路由 ----------
function route() {
  stopTimer();
  document.body.classList.remove("has-submitbar");
  document.body.classList.remove("font-kids");
  const h = location.hash.replace(/^#\/?/, "").split("?")[0];
  if (!h) return renderHome();
  if (FLOWS[h]) return startFlow(h);
  renderError(`未知页面：#/${esc(h)}`);
}
window.addEventListener("hashchange", route);

async function startFlow(id) {
  document.body.classList.toggle("font-kids", id === "pu"); // 仅 PU 欢乐测用儿童字体
  try {
    const flow = parseFlow(await fetchText(`flows/${id}.md`));
    state.flow = flow;
    state.score = null;
    state.forcedBranch = null;
    enterNode(flow.graph.start);
  } catch (e) { renderError(e.message); }
}

function enterNode(nodeId) {
  document.body.classList.remove("has-submitbar");
  const node = state.flow.graph.nodes[nodeId];
  if (!node) return renderError(`流程缺少节点：${esc(nodeId)}`);
  state.node = node;
  if (node.type === "screen") return renderScreen(node);
  if (node.type === "exam") return loadExam(node);
  if (node.type === "router") {
    const hit = evaluateBranches(node.branches, ctxForRules());
    if (!hit) return renderError("分支路由未命中任何规则");
    state.forcedBranch = hit.branch || null;
    return enterNode(hit.goto);
  }
  if (node.type === "result") return renderResult();
  renderError(`未知节点类型：${esc(node.type)}`);
}

function ctxForRules() {
  return state.score || { total: null, modules: {} };
}

// ---------- 首页 ----------
function renderHome() {
  let last = {};
  try { last = JSON.parse(localStorage.getItem("hippo-results") || "{}"); } catch { /* 忽略 */ }
  app.innerHTML = `
    <h1 class="home-title">Test your English</h1>
    <div class="entry-list">
      ${Object.entries(FLOWS).map(([id, f]) => `
        <a class="entry-card" href="#/${id}">
          <h2>${esc(f.name)}</h2>
          ${last[id] ? `<p class="last-line">上次结果 ${esc(String(last[id].total ?? "—"))} · ${esc(last[id].date)}</p>` : ""}
        </a>`).join("")}
    </div>
    <p class="home-note">测评结果仅供课程顾问参考，不构成正式入学承诺。</p>`;
}

function renderError(msg) {
  stopTimer();
  document.body.classList.remove("has-submitbar");
  app.innerHTML = `<div class="notice">出错了：${msg}</div>
    <button class="btn-secondary" id="retry-btn">重试</button>
    <a class="btn-secondary" href="#/" style="text-align:center;text-decoration:none">返回首页</a>`;
  document.getElementById("retry-btn").onclick = route;
}

// ---------- 筛选节点 ----------
function renderScreen(node) {
  app.innerHTML = `
    <div class="screen-q">
      <h2>${esc(node.question)}</h2>
      ${node.options.map((o, i) => `<button class="option-btn" data-i="${i}">${esc(o.label)}</button>`).join("")}
    </div>`;
  app.querySelectorAll(".option-btn").forEach((btn) => {
    btn.onclick = () => {
      const opt = node.options[Number(btn.dataset.i)];
      state.forcedBranch = opt.branch || null;
      enterNode(opt.goto);
    };
  });
}

// ---------- 答题节点 ----------
async function loadExam(node) {
  try {
    state.exam = parseExam(await fetchText(node.exam));
    state.answers = {};
    renderExam(node);
  } catch (e) { renderError(e.message); }
}

function renderExam(node) {
  const exam = state.exam;
  // flat 卷（如 PU 欢乐测）：不显示题型分节，题目平铺；判分仍按各题 module 统计
  const secs = exam.flat
    ? [{ title: "", module: "flat", audio: null, plays: 1, instructions: "", questions: exam.questions }]
    : exam.sections;
  app.innerHTML = `
    <h1 class="home-title">${esc(exam.title)}</h1>
    ${exam.hint ? `<p class="progress-note">${esc(exam.hint)}</p>` : exam.timeLimit ? `<p class="progress-note">限时 ${exam.timeLimit} 分钟，到时自动交卷。</p>` : ""}
    ${secs.map((sec, si) => `
      <section class="module" data-section="${si}">
        ${sec.title ? `<h2><span class="sec-no">${String(si + 1).padStart(2, "0")}</span>${esc(sec.title)}</h2>` : ""}
        ${sec.instructions.trim() ? `<div class="instructions">${mdToHtml(sec.instructions.trim())}</div>` : ""}
        ${sec.audio ? audioBlockHtml(sec, si) : ""}
        ${sec.questions.map((q) => questionHtml(q)).join("")}
      </section>`).join("")}
    <div class="submit-bar">
      <div class="bar-inner">
        <p class="progress-note" id="answered-note"></p>
        <button class="btn-primary" id="submit-btn">交卷</button>
      </div>
    </div>`;
  document.body.classList.add("has-submitbar");
  app.querySelectorAll(".q input").forEach((el) => {
    el.addEventListener("change", () => {
      if (el.type === "radio") el.closest(".q").querySelectorAll("label.opt").forEach((l) => l.classList.toggle("checked", l.querySelector("input").checked));
      updateAnsweredNote();
    });
    el.addEventListener("input", updateAnsweredNote);
  });
  app.querySelectorAll("textarea.write-box").forEach((ta) => {
    const countEl = app.querySelector(`.word-count[data-for="${CSS.escape(ta.dataset.q)}"]`);
    const min = Number(ta.dataset.min), max = Number(ta.dataset.max);
    const update = () => {
      const n = wordCount(ta.value);
      if (countEl) {
        countEl.textContent = `${n} 词 · 目标 ${min}–${max} 词` + (n > max ? ` · 已超过 ${max} 词上限，请精简` : "");
        countEl.classList.toggle("over", n > max);
      }
    };
    ta.addEventListener("input", update);
    update();
  });
  document.getElementById("submit-btn").onclick = submitExam;
  updateAnsweredNote();
  if (exam.timeLimit) startTimer(exam.timeLimit * 60, submitExam);
  bindAudio();
}

async function bindAudio() {
  const exam = state.exam;
  const boxes = [...app.querySelectorAll(".audio-box")];
  for (const box of boxes) {
    const sec = exam.sections[Number(box.dataset.section)];
    // 先探测音频是否存在（占位阶段文件常缺），缺失直接显示待上传提示
    try {
      const head = await fetch(sec.audio, { method: "HEAD", cache: "no-store" });
      if (!head.ok) throw new Error();
    } catch {
      box.innerHTML = `<div class="audio-missing">听力音频待上传：${esc(sec.audio)}（该模块暂不计分，补齐后自动参与）</div>`;
      continue;
    }
    const audio = box.querySelector("audio");
    const left = box.querySelector(".plays-left");
    if (!audio) continue;
    let used = 0;
    const max = sec.plays || 1;
    audio.addEventListener("error", () => {
      box.innerHTML = `<div class="audio-missing">音频加载失败：${esc(sec.audio)}</div>`;
    });
    audio.addEventListener("play", () => {
      used++;
      left.textContent = `剩余 ${Math.max(0, max - used)} 遍`;
      if (used > max) { audio.pause(); audio.removeAttribute("src"); box.insertAdjacentHTML("beforeend", `<div class="audio-missing">播放次数已用完</div>`); }
    });
  }
}

function audioBlockHtml(sec, si) {
  return `<div class="audio-row audio-box" data-section="${si}">
    <audio controls preload="none" src="${esc(sec.audio)}"></audio>
    <span class="plays-left">可播 ${sec.plays} 遍</span>
  </div>`;
}

function questionHtml(q) {
  const stem = `<div class="stem">${q.stemHtml || mdToHtml(q.display)}</div>`;
  if (q.type === "choice") {
    const letters = "ABCDEFGH";
    return `<div class="q" data-q="${esc(q.id)}">${stem}<div class="opts">
      ${q.options.map((o, i) => `
        <label class="opt"><input type="radio" name="ans-${esc(q.id)}" value="${letters[i]}"><span>${letters[i]}. ${esc(o || "/")}</span></label>`).join("")}
    </div></div>`;
  }
  if (q.type === "tf") {
    return `<div class="q" data-q="${esc(q.id)}">${stem}<div class="opts">
      <label class="opt"><input type="radio" name="ans-${esc(q.id)}" value="T"><span>T · 正确</span></label>
      <label class="opt"><input type="radio" name="ans-${esc(q.id)}" value="F"><span>F · 错误</span></label>
    </div></div>`;
  }
  // fill / writing
  if (q.type === "writing") {
    return `<div class="q" data-q="${esc(q.id)}">${stem}
    <textarea class="write-box" data-min="${q.minWords || 60}" data-max="${q.maxWords || 100}" rows="7" placeholder="Write here…"></textarea>
    <p class="word-count" data-for="${esc(q.id)}">0 词 · 目标 ${q.minWords || 60}–${q.maxWords || 100} 词</p>
  </div>`;
  }
  const hint = q.maxWords ? `（不超过 ${q.maxWords} 个词）` : "";
  return `<div class="q" data-q="${esc(q.id)}">${stem}
    <input type="text" name="ans-${esc(q.id)}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="输入答案${hint}">
  </div>`;
}

function collectAnswers() {
  const out = {};
  for (const q of state.exam.questions) {
    const box = app.querySelector(`.q[data-q="${CSS.escape(q.id)}"]`);
    if (!box) continue;
    const el = box.querySelector("input");
    if (!el) continue;
    const ta = box.querySelector("textarea");
    if (ta) { out[q.id] = ta.value; continue; }
    if (el.type === "radio") {
      const checked = box.querySelector("input:checked");
      out[q.id] = checked ? checked.value : "";
    } else {
      out[q.id] = el.value;
    }
  }
  return out;
}

function updateAnsweredNote() {
  state.answers = collectAnswers();
  const total = state.exam.questions.length;
  const done = Object.values(state.answers).filter((v) => v !== "").length;
  const note = document.getElementById("answered-note");
  if (note) note.textContent = `已作答 ${done} / ${total} 题`;
}

function submitExam() {
  state.answers = collectAnswers();
  // roundMode "round" = 雅思四舍五入（需求文档口径，教研实测确认：ceil 会抬档导致 3.5/4.0 测不出）
  state.score = gradeExam(state.exam, state.answers, { bandTable: state.flow.graph.bandTable, roundMode: "round" });
  stopTimer();
  enterNode(state.node.then);
}

// ---------- 计时 ----------
function startTimer(seconds, onEnd) {
  stopTimer();
  state.deadline = Date.now() + seconds * 1000;
  timerEl.hidden = false;
  const tick = () => {
    const left = Math.max(0, Math.round((state.deadline - Date.now()) / 1000));
    timerEl.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
    timerEl.classList.toggle("hurry", left <= 300);
    if (left <= 0) { stopTimer(); onEnd(); }
  };
  tick();
  state.timerId = setInterval(tick, 500);
}
function stopTimer() {
  if (state.timerId) clearInterval(state.timerId);
  state.timerId = null;
  timerEl.hidden = true;
  timerEl.classList.remove("hurry");
}

// ---------- 结果页 ----------
// 纯色模块图标（Material 风格路径，颜色随 --brand 品牌紫）
const modIcon = (d) => `<svg class="mod-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="${d}"/></svg>`;
const MOD_ICONS = {
  listening: modIcon("M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"),
  reading: modIcon("M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"),
  writing: modIcon("M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"),
  vocab: modIcon("M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"),
  grammar: modIcon("M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"),
};
const MOD_NAMES = { listening: "Listening", reading: "Reading", writing: "Writing", vocab: "词汇", grammar: "语法" };
const bandText = (v) => (v == null ? "—" : v >= 5 ? v.toFixed(1) + "+" : v.toFixed(1));

// 半圆仪表盘 SVG（比例 = 分值/9，弧角 ≤180°，large-arc 恒为 0）
function gaugeSvg(ratio) {
  const r = 80, cx = 100, cy = 100;
  const th = Math.PI * (1 - Math.min(Math.max(ratio, 0.02), 1));
  const x = cx + r * Math.cos(th), y = cy - r * Math.sin(th);
  return `<svg viewBox="0 0 200 108" class="gauge-svg" aria-hidden="true">
    <path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}" fill="none" stroke="#e4e2ee" stroke-width="18" stroke-linecap="round"/>
    <path d="M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}" fill="none" stroke="var(--brand)" stroke-width="18" stroke-linecap="round"/>
  </svg>`;
}

// 模块圆环 SVG
function ringSvg(ratio) {
  const C = 2 * Math.PI * 30;
  const on = Math.min(Math.max(ratio, 0.03), 1) * C;
  return `<svg viewBox="0 0 80 80" class="ring-svg" aria-hidden="true">
    <circle cx="40" cy="40" r="30" fill="none" stroke="#e4e2ee" stroke-width="11"/>
    <circle cx="40" cy="40" r="30" fill="none" stroke="var(--brand)" stroke-width="11"
      stroke-dasharray="${on.toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 40 40)"/>
  </svg>`;
}

function renderResult() {
  const flow = state.flow;
  const ctx = ctxForRules();
  const branchId = state.forcedBranch
    || (evaluateBranches(flow.graph.rules || [], ctx) || {}).id;
  const copy = flow.branchCopy[branchId] || { lines: {}, body: "" };
  const L = copy.lines;
  const modules = ctx.modules || {};
  const pendingCount = (ctx.pending || []).length;
  const qrAction = L["qr-action"] || "添加课程顾问微信";

  if (ctx.total != null) {
    try {
      const all = JSON.parse(localStorage.getItem("hippo-results") || "{}");
      all[flow.id] = { date: new Date().toLocaleDateString("zh-CN"), total: ctx.total, branch: branchId };
      localStorage.setItem("hippo-results", JSON.stringify(all));
    } catch { /* 忽略 */ }
  }

  if (!L.recommend) return renderResultLegacy(flow, branchId, copy, ctx, qrAction);

  // 新版式（结果页设计稿）
  const totalText = L["show-total"] || bandText(ctx.total);
  const totalNum = parseFloat(L["show-total"] || ctx.total) || 0;
  const cefr = L.cefr || cefrFor(ctx.total, flow.graph.cefrMap);
  // 实考模块分；免测等无实考分支可由文案 mod-<id>: 值 指定展示分
  let modList = Object.values(modules).filter((m) => m.raw != null);
  if (!modList.length) {
    modList = Object.keys(MOD_NAMES)
      .map((id) => {
        const v = parseFloat(L[`mod-${id}`]);
        return isNaN(v) ? null : { id, name: MOD_NAMES[id], raw: v, shown: v };
      })
      .filter(Boolean);
  }
  const rv = reviewBlocks();
  const notes = modList
    .map((m) => (L[`note-${m.id}`] ? `<p><b>${MOD_ICONS[m.id] || ""} ${esc(m.name)}</b>${esc(L[`note-${m.id}`])}</p>` : ""))
    .join("");

  // 副推荐：or 型双班型——两行左对齐，or 独占一行居中；+ 型保持同行小字号
  const reco2Raw = String(L.recommend2 || "");
  const c2 = reco2Raw.match(/^([A-Za-z+＋]{1,3})\s+(.+)$/);
  let reco2Html = "";
  let dualLevels = false;
  if (reco2Raw) {
    if (c2 && /^or$/i.test(c2[1])) {
      dualLevels = true;
      reco2Html = `<p class="reco-conn-line">${esc(c2[1])}</p><p class="reco-main reco-alt">${esc(c2[2])}</p>`;
    } else if (c2) {
      reco2Html = `<p class="reco-main reco-alt"><span class="reco-conn">${esc(c2[1])}</span>${esc(c2[2])}</p>`;
    } else {
      reco2Html = `<p class="reco-main reco-alt">${esc(reco2Raw)}</p>`;
    }
  }

  app.innerHTML = `
    <div class="rpt-head">
      ${L.congrats ? `<p class="rpt-congrats">${esc(L.congrats)}</p>` : ""}
      <h1 class="rpt-title">${esc(L.headline || "Your Mock Test Results")}</h1>
      <p class="rpt-sub">Overall Score</p>
      <div class="gauge">${gaugeSvg(totalNum / 9)}
        <div class="gauge-mid"><b>${esc(totalText)}</b>${cefr ? `<span>CEFR: ${esc(cefr)}</span>` : ""}</div>
      </div>
    </div>
    <p class="rpt-note">说明：本报告分数为 Hippo 定级换算值（对标雅思分数段），非雅思官方考试成绩。</p>
    ${modList.length ? `<section class="rpt-mods">
      ${modList.map((m) => `
        <div class="mod-card">
          <p class="mod-name">${MOD_ICONS[m.id] || ""} ${esc(m.name)}</p>
          ${ringSvg(m.raw / 9)}
          <b class="mod-score">${bandText(m.shown)}</b>
        </div>`).join("")}
    </section>` : ""}
    <section class="rpt-reco">
      <p class="rpt-sub">Recommendation</p>
      <div class="reco-lines${dualLevels ? " dual" : ""}">
        <p class="reco-main">${esc(L.recommend)}</p>
        ${reco2Html}
      </div>
    </section>
    ${notes ? `<section class="rpt-notes"><h3>各模块能力分析</h3>${notes}</section>` : ""}
    ${L.detail ? `<p class="rpt-detail">${esc(L.detail)}</p>` : ""}
    ${pendingCount ? `<p class="pending-note">注：${pendingCount} 道听力题因音频未上传暂未计分，当前分数按其余模块折算。</p>` : ""}
    <section class="qr-cta" id="qr-open">
      <p>添加老师微信<br><b>${esc(qrAction)}</b></p>
      <img src="assets/cambridge-examiner.jpg" alt="课程顾问微信二维码">
    </section>
    ${rv.chips ? `<section class="rpt-review"><h3>逐题情况</h3>${rv.chips}${rv.wrong}</section>` : ""}
    ${rv.writing}
    <button class="btn-secondary" id="export-btn">保存 / 分享成绩单图片</button>
    <button class="btn-secondary" id="again-btn">重新测一次</button>
    <a class="btn-secondary" href="#/" style="text-align:center;text-decoration:none;display:block;box-sizing:border-box">返回首页</a>
    <div class="qr-overlay" id="qr-overlay" hidden>
      <p class="qr-title">添加老师微信</p>
      <div class="qr-duo">
        <div class="qr-item">
          <p class="qr-name">Rita 老师</p>
          <img src="assets/qr-placeholder.svg" alt="Rita 老师微信二维码">
          <p class="qr-use">获取成绩分析</p>
        </div>
        <div class="qr-item">
          <p class="qr-name">剑桥考官</p>
          <img src="assets/cambridge-examiner.jpg" alt="剑桥考官微信二维码">
          <p class="qr-use">获取详细报告</p>
        </div>
      </div>
      <p class="cta-hint">长按识别二维码添加对应老师<br>将测评结果拿给老师做进一步分析</p>
      <button class="btn-secondary" id="qr-back" style="margin-top:6px">返回结果</button>
    </div>
    <div class="qr-overlay" id="img-overlay" hidden>
      <p class="qr-title">成绩单图片</p>
      <img id="exported-img" alt="成绩单图片">
      <p class="cta-hint">长按图片保存，发给顾问老师</p>
      <button class="btn-secondary" id="img-back" style="margin-top:6px">返回结果</button>
    </div>`;
  document.getElementById("again-btn").onclick = () => { location.hash = `#/${flow.id}`; route(); };
  const overlay = document.getElementById("qr-overlay");
  document.getElementById("qr-open").onclick = () => { overlay.hidden = false; window.scrollTo(0, 0); };
  document.getElementById("qr-back").onclick = () => { overlay.hidden = true; };
  document.getElementById("export-btn").onclick = () => exportScoreCard();
  document.getElementById("img-back").onclick = () => { document.getElementById("img-overlay").hidden = true; };
}

// 旧版式（新生测 / 阶段测，未接设计稿的流程）
function renderResultLegacy(flow, branchId, copy, ctx, qrAction) {
  const L = copy.lines;
  const modules = ctx.modules || {};
  const pendingCount = (ctx.pending || []).length;
  const rv = reviewBlocks();
  app.innerHTML = `
    <div class="result-head">
      ${L.congrats ? `<p class="congrats">${esc(L.congrats)}</p>` : ""}
      <p class="result-level">${esc(L.level || "测评完成")}</p>
      ${ctx.total != null ? `<p class="total-band">定位分 <b>${ctx.total.toFixed(1)}</b> / 9.0</p>` : ""}
    </div>
    ${Object.values(modules).some((m) => m.raw != null) ? `
      <div class="bars-card"><h3>分项得分（0–9 级分）</h3>
        ${Object.values(modules).map((m) => m.raw == null ? "" : `
          <div class="bar-row">
            <span>${esc(m.name)}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${(m.shown / 9 * 100).toFixed(1)}%"></div></div>
            <span class="bar-val">${m.shown.toFixed(1)}</span>
          </div>`).join("")}
      </div>` : ""}
    <div class="copy-card">
      ${L.detail ? `<p>${esc(L.detail)}</p>` : ""}
      ${L.advice ? `<p><strong>建议：</strong>${esc(L.advice)}</p>` : ""}
      ${copy.body.trim() ? mdToHtml(copy.body.trim()) : ""}
    </div>
    ${pendingCount ? `<p class="pending-note">注：${pendingCount} 道题因音频/答案未上传暂未计分，当前分数按其余模块折算。</p>` : ""}
    <section class="qr-cta" id="qr-open">
      <p>添加老师微信<br><b>${esc(L.action || qrAction)}</b></p>
      <img src="assets/cambridge-examiner.jpg" alt="课程顾问微信二维码">
    </section>
    ${rv.chips ? `<section class="rpt-review"><h3>逐题情况</h3>${rv.chips}${rv.wrong}</section>` : ""}
    ${rv.writing}
    <button class="btn-secondary" id="export-btn">保存 / 分享成绩单图片</button>
    <button class="btn-secondary" id="again-btn">重新测一次</button>
    <a class="btn-secondary" href="#/" style="text-align:center;text-decoration:none;display:block;box-sizing:border-box">返回首页</a>
    <div class="qr-overlay" id="qr-overlay" hidden>
      <p class="qr-title">添加老师微信</p>
      <div class="qr-duo">
        <div class="qr-item">
          <p class="qr-name">Rita 老师</p>
          <img src="assets/qr-placeholder.svg" alt="Rita 老师微信二维码">
          <p class="qr-use">获取成绩分析</p>
        </div>
        <div class="qr-item">
          <p class="qr-name">剑桥考官</p>
          <img src="assets/cambridge-examiner.jpg" alt="剑桥考官微信二维码">
          <p class="qr-use">获取详细报告</p>
        </div>
      </div>
      <p class="cta-hint">长按识别二维码添加对应老师<br>将测评结果拿给老师做进一步分析</p>
      <button class="btn-secondary" id="qr-back" style="margin-top:6px">返回结果</button>
    </div>
    <div class="qr-overlay" id="img-overlay" hidden>
      <p class="qr-title">成绩单图片</p>
      <img id="exported-img" alt="成绩单图片">
      <p class="cta-hint">长按图片保存，发给顾问老师</p>
      <button class="btn-secondary" id="img-back" style="margin-top:6px">返回结果</button>
    </div>`;
  document.getElementById("again-btn").onclick = () => { location.hash = `#/${flow.id}`; route(); };
  const overlay = document.getElementById("qr-overlay");
  document.getElementById("qr-open").onclick = () => { overlay.hidden = false; window.scrollTo(0, 0); };
  document.getElementById("qr-back").onclick = () => { overlay.hidden = true; };
  document.getElementById("export-btn").onclick = () => exportScoreCard();
  document.getElementById("img-back").onclick = () => { document.getElementById("img-overlay").hidden = true; };
}

// ---------- 逐题明细 ----------
function reviewBlocks() {
  const exam = state.exam;
  const review = (state.score && state.score.review) || [];
  const answers = state.answers || {};
  if (!review.length) return { chips: "", wrong: "", writing: "" };
  const mods = [...new Set(review.map((r) => r.module))];
  const chips = mods.map((mid) => {
    const items = review.filter((r) => r.module === mid);
    return `<p class="rv-mod">${esc(exam.modules[mid] || mid)}</p><div class="chips">${items.map((r) => {
      const cls = r.correct === true ? "ok" : r.correct === false ? "bad" : "na";
      const mark = r.correct === true ? "✓" : r.correct === false ? "✗" : "–";
      return `<span class="chip ${cls}"><b>${esc(r.id.replace(/^[a-z]+/i, ""))}</b>${mark}</span>`;
    }).join("")}</div>`;
  }).join("");
  const wrongs = review.filter((r) => r.correct === false);
  const wrong = wrongs.length
    ? `<p class="rv-wrong-title">答错题目的正确答案</p>` + wrongs.map((r) => `<p class="rv-wrong">${esc(r.id)} → <b>${esc(r.answer || "")}</b></p>`).join("")
    : "";
  const w = review.filter((r) => r.type === "writing" && String(answers[r.id] || "").trim());
  const writing = w.map((r) => `<section class="rpt-writing"><h3>写作（顾问人工批改）</h3><p class="rw-text">${esc(answers[r.id])}</p><p class="wc-line">${wordCount(answers[r.id])} 词</p></section>`).join("");
  return { chips, wrong, writing };
}

// ---------- 成绩单图片导出 ----------
function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
const CN_FONT = '"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif';

async function exportScoreCard() {
  const flow = state.flow;
  const ctx = ctxForRules();
  const branchId = state.forcedBranch || (evaluateBranches(flow.graph.rules || [], ctx) || {}).id;
  const L = (flow.branchCopy[branchId] || { lines: {} }).lines;
  const exam = state.exam;
  const review = (state.score && state.score.review) || [];
  const W = 750, PAD = 40, scale = 2;
  const measure = document.createElement("canvas").getContext("2d");
  const wrap = (text, maxW, font) => {
    measure.font = font;
    const lines = [];
    for (const para of String(text).split(/\r?\n/)) {
      let line = "";
      for (const ch of para) {
        if (measure.measureText(line + ch).width > maxW) { lines.push(line); line = ch; }
        else line += ch;
      }
      lines.push(line);
    }
    return lines;
  };
  const answers = state.answers || {};
  const wrongs = review.filter((r) => r.correct === false);
  const perMod = [...new Set(review.map((r) => r.module))];
  const writing = review.filter((r) => r.type === "writing" && String(answers[r.id] || "").trim());
  const writingLines = writing.length ? wrap(answers[writing[0].id], W - PAD * 2, `400 19px ${CN_FONT}`).length : 0;

  let H = PAD + 44 + 60 + 104 + perMod.length * 64 + 16;
  H += wrongs.length * 30 + (wrongs.length ? 46 : 0);
  H += writing.length ? 44 + writingLines * 30 + 24 : 0;
  H += 170 + PAD;

  const canvas = document.createElement("canvas");
  canvas.width = W * scale; canvas.height = H * scale;
  const g = canvas.getContext("2d");
  g.scale(scale, scale);
  g.textBaseline = "top";
  g.fillStyle = "#f2f1f6"; g.fillRect(0, 0, W, H);
  g.fillStyle = "#ffffff"; g.fillRect(12, 12, W - 24, H - 24);

  let y = PAD;
  g.fillStyle = "#191a1c"; g.font = `700 30px ${CN_FONT}`;
  g.fillText("Hippo 英语测评 · 成绩单", PAD, y); y += 44;
  const flowName = (FLOWS[flow.id] || {}).name || flow.title || flow.id;
  g.fillStyle = "#74777d"; g.font = `400 20px ${CN_FONT}`;
  g.fillText(`${flowName} · ${new Date().toLocaleDateString("zh-CN")}`, PAD, y); y += 60;
  g.fillStyle = "#5b4bc4"; g.font = `800 72px ${CN_FONT}`;
  g.fillText(L["show-total"] || (ctx.total != null ? bandText(ctx.total) : "—"), PAD, y);
  const cefr = L.cefr || cefrFor(ctx.total, flow.graph.cefrMap);
  if (cefr) { g.fillStyle = "#191a1c"; g.font = `600 24px ${CN_FONT}`; g.fillText(`CEFR: ${cefr}`, PAD + 250, y + 30); }
  y += 104;

  for (const mid of perMod) {
    const items = review.filter((r) => r.module === mid);
    g.fillStyle = "#191a1c"; g.font = `700 22px ${CN_FONT}`;
    g.fillText(exam.modules[mid] || mid, PAD, y + 8);
    let x = PAD + 190;
    for (const r of items) {
      g.fillStyle = r.correct === true ? "#e7f6ee" : r.correct === false ? "#fdecea" : "#ececf0";
      roundRect(g, x, y, 46, 40, 8); g.fill();
      g.fillStyle = r.correct === true ? "#129d5f" : r.correct === false ? "#d92d20" : "#74777d";
      g.font = `700 18px ${CN_FONT}`;
      g.fillText(r.id.replace(/^[a-z]+/i, ""), x + 10, y + 10);
      x += 54;
    }
    y += 64;
  }
  y += 8;
  if (wrongs.length) {
    g.fillStyle = "#191a1c"; g.font = `600 20px ${CN_FONT}`;
    g.fillText("答错题目的正确答案", PAD, y); y += 34;
    for (const r of wrongs) {
      g.fillStyle = "#5b4bc4"; g.font = `400 19px ${CN_FONT}`;
      g.fillText(`${r.id} → ${r.answer || ""}`, PAD + 10, y); y += 30;
    }
    y += 16;
  }
  for (const w of writing) {
    g.fillStyle = "#191a1c"; g.font = `600 20px ${CN_FONT}`;
    g.fillText("写作（顾问人工批改）", PAD, y); y += 34;
    g.fillStyle = "#333333"; g.font = `400 19px ${CN_FONT}`;
    for (const line of wrap(answers[w.id], W - PAD * 2, `400 19px ${CN_FONT}`)) {
      g.fillText(line, PAD, y); y += 30;
    }
    y += 20;
  }
  const loadImg = (src) => new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img); img.onerror = () => res(null);
    img.src = src;
  });
  const [qrRita, qrExaminer] = await Promise.all([
    loadImg("assets/qr-placeholder.svg"),
    loadImg("assets/cambridge-examiner.jpg"),
  ]);
  const colW = (W - PAD * 2 - 40) / 2;
  g.textAlign = "center";
  g.fillStyle = "#191a1c"; g.font = `700 20px ${CN_FONT}`;
  g.fillText("Rita 老师", PAD + colW / 2, y);
  g.fillText("剑桥考官", W - PAD - colW / 2, y);
  g.fillStyle = "#74777d"; g.font = `400 17px ${CN_FONT}`;
  g.fillText("获取成绩分析", PAD + colW / 2, y + 28);
  g.fillText("获取详细报告", W - PAD - colW / 2, y + 28);
  if (qrRita) g.drawImage(qrRita, PAD + (colW - 120) / 2, y + 44, 120, 120);
  if (qrExaminer) g.drawImage(qrExaminer, W - PAD - colW + (colW - 120) / 2, y + 44, 120, 120);
  g.textAlign = "left";
  y += 180;

  const url = canvas.toDataURL("image/png");
  document.getElementById("exported-img").src = url;
  const dl = document.getElementById("img-download");
  if (dl) { dl.href = url; dl.download = `hippo-${flow.id}-${new Date().toISOString().slice(0, 10)}.png`; }
  document.getElementById("img-overlay").hidden = false;
  window.scrollTo(0, 0);
}

route();
