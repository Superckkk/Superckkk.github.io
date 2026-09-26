// 判分与分支求值。纯函数，浏览器与 node 通用。
// 规则来源：需求文档 + 样卷 A（听力10 + 阅读8 + 语言运用12）。

// 答案归一化：小写、全角转半角、去货币符号、压缩空白、去首尾标点
export function normalizeText(s) {
  if (s == null) return "";
  let t = String(s);
  t = t.replace(/[\uFF01-\uFF5E]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));
  t = t.toLowerCase();
  t = t.replace(/[£$€￥]/g, "");
  t = t.replace(/[_＿]/g, " ");
  t = t.replace(/\s+/g, " ").trim();
  t = t.replace(/^[.,;:!?。，；：！？]+/, "").replace(/[.,;:!?。，；：！？]+$/, "");
  return t.trim();
}

export function wordCount(s) {
  const t = normalizeText(s);
  return t ? t.split(" ").length : 0;
}

function stripOptionLetter(s) {
  return normalizeText(String(s).replace(/^\s*[A-Za-z]\s*[.)、]\s*/, ""));
}

// 单选题：接受 "B" / "b." / "B. 9:00" / 选项原文
export function checkChoice(user, spec) {
  if (spec.pending || user == null || user === "") return false;
  const letterOf = (v) => {
    const m = String(v).trim().toUpperCase().match(/^[A-Z](?![a-z])/);
    return m ? m[0] : null;
  };
  const ansLetter = letterOf(spec.answer);
  const userLetter = letterOf(user);
  if (ansLetter && userLetter && ansLetter === userLetter) return true;
  const uNorm = normalizeText(user);
  if (uNorm === normalizeText(spec.answer)) return true;
  if (ansLetter && spec.options) {
    const idx = ansLetter.charCodeAt(0) - 65;
    if (idx >= 0 && idx < spec.options.length && uNorm === stripOptionLetter(spec.options[idx])) return true;
  }
  return false;
}

// 判断题：T/F 与常见中文/布尔表达互通
export function checkTF(user, spec) {
  if (spec.pending || user == null || user === "") return false;
  const map = { t: "T", true: "T", 正确: "T", 对: "T", 是: "T", f: "F", false: "F", 错误: "F", 错: "F", 否: "F" };
  const norm = (v) => map[normalizeText(v)] || null;
  const a = norm(spec.answer), u = norm(user);
  return a != null && u === a;
}

// 填空题：别名（| 分隔）、词数上限（maxWords）、"不填"选项（/）、前缀容忍（拼写小误差）
export function checkFill(user, spec) {
  if (spec.pending) return null; // 不可判
  if (user == null || normalizeText(user) === "") return false;
  if (spec.maxWords && wordCount(user) > spec.maxWords) return false;
  const alts = String(spec.answer).split("|").map((s) => s.trim()).filter((s) => s !== "");
  const u = normalizeText(user);
  for (const alt of alts) {
    const a = normalizeText(alt);
    if (a === "" || a === "/") {
      if (u === "/" || u === "") return true; // 允许"不填"的答案位
      continue;
    }
    if (u === a) return true;
    if (u.length >= 4 && a.startsWith(u)) return true; // 少写结尾容忍
    if (a.length >= 4 && u.startsWith(a)) return true;
  }
  return false;
}

// 单题判分：true/false/null（null=待定题，不计入）
export function gradeQuestion(q, userAnswer) {
  if (q.pending) return null;
  switch (q.type) {
    case "choice": return checkChoice(userAnswer, q);
    case "tf": return checkTF(userAnswer, q);
    case "fill": return checkFill(userAnswer, q);
    default: return false;
  }
}

// 雅思 0.5 分段取整：.25→.5，.75→进整（Math.round 对 .5 向上取）
export function ieltsRound(x) {
  return Math.round(x * 2) / 2;
}

// 整卷判分 → {modules: {id: {name, correct, gradable, total, raw, shown}}, total|null, pending[]}
export function gradeExam(exam, answers) {
  const mods = {};
  for (const q of exam.questions) {
    const id = q.module;
    mods[id] = mods[id] || {
      id,
      name: exam.modules[id] || id,
      correct: 0, gradable: 0, total: 0,
    };
    const m = mods[id];
    m.total++;
    const r = gradeQuestion(q, answers[q.id]);
    if (r === null) continue;
    m.gradable++;
    if (r === true) m.correct++;
  }
  const bands = [];
  for (const m of Object.values(mods)) {
    m.raw = m.gradable > 0 ? (m.correct / m.gradable) * 9 : null; // 默认线性换算 0-9，可被覆盖
    m.shown = m.raw == null ? null : ieltsRound(m.raw);
    if (m.raw != null) bands.push(m.raw);
  }
  const total = bands.length ? ieltsRound(bands.reduce((a, b) => a + b, 0) / bands.length) : null;
  const pending = exam.questions.filter((q) => q.pending).map((q) => q.id);
  return { modules: mods, total, pending };
}

// 分支条件求值（AND 语义）。first-match-wins 由调用方保证顺序。
// conds: {totalMin, totalMax, moduleMin:{id:x}, moduleMax:{id:x}, screen:{key:val|[vals]}}
export function matchBranch(conds, ctx) {
  if (!conds || Object.keys(conds).length === 0) return true; // else 分支
  const { total, modules = {}, screen = {} } = ctx;
  if (conds.totalMin != null && !(total != null && total >= conds.totalMin - 1e-9)) return false;
  if (conds.totalMax != null && !(total != null && total <= conds.totalMax + 1e-9)) return false;
  for (const [id, v] of Object.entries(conds.moduleMin || {})) {
    const raw = modules[id] && modules[id].raw;
    if (!(raw != null && raw >= v - 1e-9)) return false;
  }
  for (const [id, v] of Object.entries(conds.moduleMax || {})) {
    const raw = modules[id] && modules[id].raw;
    if (!(raw != null && raw <= v + 1e-9)) return false;
  }
  for (const [k, v] of Object.entries(conds.screen || {})) {
    const vals = Array.isArray(v) ? v : [v];
    if (!vals.includes(screen[k])) return false;
  }
  return true;
}

export function evaluateBranches(branches, ctx) {
  for (const b of branches) if (matchBranch(b.when, ctx)) return b;
  return branches[branches.length - 1] || null;
}
