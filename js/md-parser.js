// 题库 Markdown 解析器。约定见 README.md。
// 无第三方依赖，纯函数，浏览器与 node 通用。

// 解析 front-matter（--- 包围的 key: value 块），返回 {meta, body}
export function parseFrontMatter(text) {
  const meta = {};
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta, body: text };
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (/^".*"$/.test(val)) val = val.slice(1, -1);
    if (val !== "" && !isNaN(Number(val))) val = Number(val);
    meta[key] = val;
  }
  return { meta, body: text.slice(m[0].length) };
}

// 解析 {key: value, key2: "带, 逗号的值"} 形式的行内属性串
export function parseAttrs(str) {
  const attrs = {};
  if (!str) return attrs;
  const parts = [];
  let cur = "", inQuote = false;
  for (const ch of str) {
    if (ch === '"') { inQuote = !inQuote; cur += ch; }
    else if (ch === "," && !inQuote) { parts.push(cur); cur = ""; }
    else cur += ch;
  }
  if (cur.trim()) parts.push(cur);
  for (const part of parts) {
    const i = part.indexOf(":");
    if (i === -1) continue;
    const key = part.slice(0, i).trim();
    let val = part.slice(i + 1).trim();
    if (/^".*"$/.test(val)) val = val.slice(1, -1);
    else if (val !== "" && !isNaN(Number(val))) val = Number(val);
    attrs[key] = val;
  }
  return attrs;
}

// 从标题行尾部提取 {…} 属性： "Listening · Part 1 {audio: a.mp3, plays: 2}"
function splitHeaderAttrs(line) {
  const m = line.match(/^(.*?)\s*\{(.*)\}\s*$/);
  if (!m) return { title: line.trim(), attrs: {} };
  return { title: m[1].trim(), attrs: parseAttrs(m[2]) };
}

// 极简 Markdown 渲染（仅标题用到的子集）：粗体/斜体/转义。
// 换行：空行分段，连续非空行间用 <br> 保持卷面排版。
export function mdToHtml(md) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) =>
    esc(s)
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/____+/g, '<span class="blank">______</span>');
  const paras = [];
  let buf = [];
  for (const raw of md.split(/\r?\n/)) {
    if (raw.trim() === "") { if (buf.length) { paras.push(buf.join("<br>")); buf = []; } }
    else buf.push(inline(raw));
  }
  if (buf.length) paras.push(buf.join("<br>"));
  return paras.map((p) => `<p>${p}</p>`).join("");
}

// 解析一份试卷 Markdown → exam 对象
export function parseExam(text) {
  const { meta, body } = parseFrontMatter(text);
  const modules = {};
  if (meta.modules) {
    for (const pair of String(meta.modules).split(/\s+/)) {
      const [id, name] = pair.split("=");
      if (id) modules[id] = name || id;
    }
  }
  const exam = {
    id: meta.id || "unnamed",
    title: meta.title || "",
    timeLimit: Number(meta.timeLimit) > 0 ? Number(meta.timeLimit) : null,
    modules,
    sections: [],
    questions: [],
  };
  let section = null;
  let question = null;
  let qLines = [];
  const flushQuestion = () => {
    if (!question) return;
    question.stemHtml = mdToHtml(qLines.join("\n"));
    exam.questions.push(question);
    question = null;
    qLines = [];
  };
  const flushSection = () => {
    flushQuestion();
    if (section) exam.sections.push(section);
    section = null;
  };
  for (const line of body.split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(?!\s|#)(.*)$/);
    const h3 = line.match(/^###\s+(.*)$/);
    if (h2) {
      flushSection();
      const { title, attrs } = splitHeaderAttrs(h2[1]);
      section = {
        title,
        module: attrs.module || "general",
        audio: attrs.audio || null,
        plays: Number(attrs.plays) > 0 ? Number(attrs.plays) : 1,
        instructions: "",
        questions: [],
      };
      continue;
    }
    if (h3) {
      flushQuestion();
      const { title, attrs } = splitHeaderAttrs(h3[1]);
      const qid = attrs.id || title.replace(/[^A-Za-z0-9_-]/g, "") || `q${exam.questions.length + 1}`;
      const rawAns = attrs.answer;
      question = {
        id: qid,
        module: section ? section.module : "general",
        type: attrs.type || "choice",
        answer: rawAns,
        pending: rawAns === "???",
        options: attrs.options ? String(attrs.options).split("|").map((s) => s.trim()) : null,
        maxWords: Number(attrs.maxWords) > 0 ? Number(attrs.maxWords) : null,
        display: title,
        stem: "",
      };
      if (section) section.questions.push(question);
      continue;
    }
    if (/^-{3,}\s*$/.test(line)) continue; // 卷内分隔线
    if (question) qLines.push(line);
    else if (section) section.instructions += line + "\n";
  }
  flushSection();
  return exam;
}

// 解析 flow md：front-matter + ```json 路由块 + ## branch:<id> 文案段
export function parseFlow(text) {
  const { meta, body } = parseFrontMatter(text);
  const jm = body.match(/```json\r?\n([\s\S]*?)```/);
  if (!jm) throw new Error(`flow ${meta.id || "?"} 缺少 \`\`\`json 路由块`);
  const graph = JSON.parse(jm[1]);
  const branchCopy = {};
  {
    let cur = null;
    for (const line of body.split(/\r?\n/)) {
      const h = line.match(/^##\s+branch:([\w-]+)\s*$/);
      if (h) { cur = { lines: {}, body: "" }; branchCopy[h[1]] = cur; continue; }
      if (/^##\s/.test(line)) { cur = null; continue; }
      if (!cur) continue;
      const kv = line.match(/^(congrats|level|detail|advice|action|todo):\s*(.*)$/);
      if (kv) cur.lines[kv[1]] = kv[2];
      else cur.body += line + "\n";
    }
  }
  return { id: meta.id, title: meta.title || "", intro: meta.intro || "", graph, branchCopy };
}

// 相对路径解析（题库/音频路径都相对站点根）
export function resolveAsset(path, base = "") {
  if (/^(https?:|\/)/.test(path)) return path;
  return "/" + [base, path].filter(Boolean).join("/").replace(/\/+/g, "/");
}
