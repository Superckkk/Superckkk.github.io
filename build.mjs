// build.mjs — 将 content/*.md 打包为 data.js（构建期渲染 markdown 与 KaTeX 数学）
// 用法：node build.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";
import katex from "katex";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(__dirname, "content");

marked.setOptions({ gfm: true, breaks: false });

// ---------- 数学占位渲染 ----------
// 先把 $...$ / $$...$$ 抽出渲染成 KaTeX HTML，避免 markdown 解析器破坏公式
function renderMarkdown(src) {
  const mathSpans = [];
  // 顺序扫描：$$ 块公式优先
  let out = "";
  let i = 0;
  const n = src.length;
  while (i < n) {
    if (src.startsWith("$$", i)) {
      const end = src.indexOf("$$", i + 2);
      if (end === -1) { out += src[i]; i++; continue; }
      const tex = src.slice(i + 2, end).trim();
      mathSpans.push({ tex, display: true });
      out += `\u0000M${mathSpans.length - 1}\u0000`;
      i = end + 2;
      continue;
    }
    if (src[i] === "$") {
      // 行内公式：到下一个未被空格紧跟开头的 $（简单策略：找到下一个 $）
      const end = src.indexOf("$", i + 1);
      if (end === -1 || end === i + 1) { out += src[i]; i++; continue; }
      const tex = src.slice(i + 1, end).trim();
      mathSpans.push({ tex, display: false });
      out += `\u0000M${mathSpans.length - 1}\u0000`;
      i = end + 1;
      continue;
    }
    if (src[i] === "`") {
      // 代码块/行内代码原样跳过
      const end = src.indexOf("`", i + 1);
      if (end === -1) { out += src[i]; i++; continue; }
      out += src.slice(i, end + 1);
      i = end + 1;
      continue;
    }
    out += src[i]; i++;
  }

  let html = marked.parse(out);

  html = html.replace(/\u0000M(\d+)\u0000/g, (_, idx) => {
    const { tex, display } = mathSpans[Number(idx)];
    try {
      return katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
        strict: false,
        trust: true,
        macros: { "\\dfrac": "\\frac" },
      });
    } catch (e) {
      return `<code class="math-error">${escapeHtml(tex)}</code>`;
    }
  });
  return html;
}

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------- frontmatter ----------
function parseFrontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return { meta, body: text.slice(m[0].length) };
}

// ---------- 题块解析 ----------
const SECTION_KINDS = ["stem", "wrong", "answer", "note"];

function parseQuestions(body, fileMeta) {
  const questions = [];
  const blocks = body.split(/<!--\s*q\s+(\{[\s\S]*?\})\s*-->/);
  // split 产生的奇数位为 JSON，其后跟内容
  for (let b = 1; b < blocks.length; b += 2) {
    let qmeta;
    try { qmeta = JSON.parse(blocks[b]); } catch (e) {
      console.error(`[build] JSON 解析失败 @ ${fileMeta.source}: ${e.message}`);
      continue;
    }
    const content = blocks[b + 1] || "";
    const sections = [];
    const parts = content.split(/<!--\s*(stem|wrong|answer|note)\s*-->/);
    // parts[0] 为第一个 section 标记前的杂项（应为空）
    for (let p = 1; p < parts.length; p += 2) {
      const kind = parts[p];
      if (!SECTION_KINDS.includes(kind)) continue;
      const md = parts[p + 1] || "";
      sections.push({ kind, html: applyClues(renderMarkdown(md)).trim() });
    }
    const stem = sections.find((s) => s.kind === "stem");
    if (!stem) {
      console.error(`[build] 缺少 stem @ ${qmeta.id}`);
      continue;
    }
    questions.push({
      id: qmeta.id,
      type: qmeta.type || "练习",
      subject: fileMeta.subject,
      course: fileMeta.course,
      chapter: qmeta.chapter || fileMeta.chapter || "",
      title: qmeta.title || "",
      tags: qmeta.tags || [],
      reason: qmeta.reason || "",
      date: qmeta.date || null,
      rounds: qmeta.rounds ?? null,
      mastered: qmeta.mastered ?? false,
      source: fileMeta.source,
      stem: stem.html,
      sections: sections.filter((s) => s.kind !== "stem"),
    });
  }
  return questions;
}

// ---------- 目录遍历 ----------
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (name.endsWith(".md")) out.push(p);
  }
  return out;
}

// 提取 h2/h3 作为小节目录，并为标题写入锚点 id
function extractToc(html) {
  const toc = [];
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (m, lvl, inner) => {
    const id = "sec-" + (toc.length + 1);
    toc.push({ id, level: Number(lvl), text: inner.replace(/<[^>]*>/g, "").trim() });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

// ---------- clue 体系（对应 typst gentle-clues） ----------
const CLUE_MAP = [
  ["错误解法", "wrongsol"], ["错误重现", "wrong"], ["正确解答", "correct"], ["正确解法", "correct"],
  ["定义", "def"], ["定理", "thm"], ["引理", "lemma"], ["推论", "corollary"],
  ["性质", "property"], ["提示", "tip"], ["注意", "warn"], ["重点", "important"],
  ["说明", "info"], ["背景", "info"], ["证明", "proof"], ["例题", "example"],
  ["问答", "question"], ["笔记", "note"],
];
function clueType(label) {
  for (const [k, v] of CLUE_MAP) if (label.startsWith(k)) return v;
  return null;
}
// 引用块（> **标签** …）与段内标签段（**【标签】** …）→ 彩色 clue 盒
function applyClues(html) {
  html = html.replace(
    /<blockquote>\s*<p><strong>([^<]{1,60})<\/strong>([\s\S]*?)<\/blockquote>/g,
    (m, label, rest) => {
      const type = clueType(label.trim());
      if (!type) return m;
      const body = rest.trim();
      return `<div class="clue clue-${type}"><div class="clue-title">${label.trim()}</div>` +
        (body ? `<div class="clue-body">${body}</div>` : "") + `</div>`;
    });
  const re = /<p><strong>【([^】]{1,60})】<\/strong>/g;
  const starts = [];
  let m;
  while ((m = re.exec(html))) starts.push({ label: m[1], start: m.index, contentStart: m.index + m[0].length });
  if (starts.length) {
    const out = [];
    let last = 0;
    for (let i = 0; i < starts.length; i++) {
      const s = starts[i];
      const end = i + 1 < starts.length ? starts[i + 1].start : html.length;
      const type = clueType(s.label.trim());
      const body = html.slice(s.contentStart, end).replace(/<\/p>\s*$/, "");
      out.push(html.slice(last, s.start));
      if (type) {
        out.push(`<div class="clue clue-${type}"><div class="clue-title">${s.label.trim()}</div>` +
          (body.trim() ? `<div class="clue-body">${body}</div>` : "") + `</div>`);
      } else {
        out.push(html.slice(s.start, end));
      }
      last = end;
    }
    out.push(html.slice(last));
    html = out.join("");
  }
  return html;
}

// ---------- 笔记（content/notes/*.md） ----------
function buildNotes() {
  const dir = join(CONTENT, "notes");
  let files = [];
  try { files = walk(dir); } catch { return []; }
  const notes = [];
  for (const file of files) {
    const raw = readFileSync(file, "utf8");
    const { meta, body } = parseFrontmatter(raw);
    if (!meta.title) { console.error(`[build] 笔记缺 title: ${file}`); continue; }
    const slug = file.split(/[\\/]/).pop().replace(/\.md$/, "");
    const { html: withToc, toc } = extractToc(applyClues(renderMarkdown(body)));
    notes.push({
      slug,
      title: meta.title,
      subject: meta.subject || "未分类",
      chapter: meta.chapter || "未分组",
      date: meta.date || null,
      tags: meta.tags ? meta.tags.replace(/^\[|\]$/g, "").split(",").map((s) => s.trim()).filter(Boolean) : [],
      excerpt: meta.excerpt || "",
      sample: meta.sample === "true",
      toc,
      html: withToc,
    });
  }
  notes.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return notes;
}

// ---------- 主流程 ----------
const files = walk(CONTENT).filter((p) =>
  !p.endsWith("CONVENTIONS.md") && relative(CONTENT, p).split(/[\\/]/)[0] !== "notes"
).sort();
const all = [];
for (const file of files) {
  const raw = readFileSync(file, "utf8");
  const { meta, body } = parseFrontmatter(raw);
  const rel = relative(CONTENT, file).replace(/\\/g, "/");
  if (!meta.subject || !meta.course) {
    console.error(`[build] 缺少 subject/course frontmatter: ${rel}`);
    continue;
  }
  const qs = parseQuestions(body, meta);
  all.push(...qs);
  console.log(`[build] ${rel}: ${qs.length} 题`);
}

// 校验 id 唯一
const ids = new Set();
for (const q of all) {
  if (ids.has(q.id)) console.error(`[build] 重复 id: ${q.id}`);
  ids.add(q.id);
}

const tags = [...new Set(all.flatMap((q) => q.tags).filter(Boolean))].sort();
const subjects = [...new Set(all.map((q) => q.subject))];
const courses = [...new Set(all.map((q) => q.course))];
const reasons = [...new Set(all.map((q) => q.reason).filter(Boolean))];
const notes = buildNotes();

const payload = {
  generatedAt: new Date().toISOString(),
  count: all.length,
  subjects, courses, tags, reasons,
  notes,
  questions: all,
};

const js = `// 由 build.mjs 生成 — 请勿手改（内容源：content/*.md）\nwindow.KAODATA = ${JSON.stringify(payload, null, 0)};\n`;
writeFileSync(join(__dirname, "data.js"), js);
console.log(`\n[build] 完成：${all.length} 题 + ${notes.length} 篇笔记 → data.js (${(js.length / 1024).toFixed(0)} KB)`);
console.log(`[build] subjects=${subjects.join(",")} courses=${courses.length} tags=${tags.length} reasons=${reasons.length}`);
