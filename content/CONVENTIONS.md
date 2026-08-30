# 转换规范：Typst → Markdown（考研错题本网站）

本目录下的 `.md` 文件全部由模型从 `notes/` 下的 Typst 源文件**手工转换**而来（未用 pandoc，未改动原文）。
`../build.mjs` 依据本规范将 md 解析打包为 `../data.js`。

## 1. 文件组织

每个含题目内容的 `.typ` 源文件对应一份 md：

| 源文件 | 输出 |
|---|---|
| `notes/Math/Caculus/Wrong.typ` | `caculus/wrong.md` |
| `notes/Math/LinearAlgebra/Wrong.typ` | `linear-algebra/wrong.md` |
| `notes/408/DS/Chapter*.typ` 等 | `data-structure/chXX.md` |
| `notes/Math/Caculus/ChapterXX_*.typ` | `caculus/chXX.md` |

空文件/存根/模板演示（cheatsheet.typ、math_cheatsheet.typ、cetz/、temp.typ、1.typ）不转换。
章节文件中**非题目的笔记正文**（定理、定义框等）不收录；题干或解析内嵌的提示框内容保留。

## 2. md 文件结构

```markdown
---
subject: 数学一            # 数学一 | 408
course: 高等数学           # 高等数学 | 线性代数 | 数据结构 | 计算机组成 | 计算机网络
source: notes/Math/Caculus/Wrong.typ
---

<!-- q {"id":"calc-w-001","type":"错题","chapter":"定积分应用","tags":["定积分应用 · 质心"],"reason":"思路缺失","date":"2026-07-30","rounds":0,"mastered":false,"title":"平面曲线质心的下界证明"} -->

<!-- stem -->
题干 markdown……

<!-- wrong -->
（可选）当时的错误做法……

<!-- answer -->
（可选，错题必有）正确解答……

<!-- note -->
（可选）点评 / 笔记……
```

- 一份 md 内依出现顺序写多个 `<!-- q {...} -->` 块；build.mjs 按 JSON 注释切块，按
  `<!-- stem --> / <!-- wrong --> / <!-- answer --> / <!-- note -->` 分节。
- 元数据字段：`id` 全库唯一；`type` = `错题`（mistake/mistake-record）或 `练习`（章节 #question）；
  `chapter` 取源文件一级标题；`tags` 取 `mistake(tag:)`，章节练习题由所在小节标题归纳；
  `date/rounds/mastered` 仅错题有（缺省 null/0/false）；`title` 简短题名，无则省略。
- ID 规则：`calc-w-001`、`la-w-003`、`calc-ch09-q05`、`ds-ch02-q2`。

## 3. 组件转写

| Typst | Markdown |
|---|---|
| `#choices(A,B,C,D)` / `-inline` / `-fourline` | 无序列表：`- (A) …` 四行 |
| `#blank()` | `＿＿＿` |
| `#image("../../assets/x.png")` | `![配图](assets/x.png)`（相对 index.html） |
| cetz 矢量图 `#figure(cetz.canvas…, caption)` | `> 〔原文此处为 Typst 矢量示意图：caption〕` |
| `#grid(…)` 图文混排 | 图文按阅读顺序顺序排布 |
| `#highlight[x]` | `<mark>x</mark>` |
| `#keyword[x]` / `#concept[x]` | `**x**` |
| `#thm("t")[b]` `#def` `#tip` `#warn` `#info` `#note-box` 等提示框 | `> **标题**：b`（blockquote） |
| `#proof[…]` | `> **证明**：…`（末尾 ∎ 保留） |
| `#numbering("I",1)` | `（I）` `（II）` |
| `#link/@ref/chaplink` | 转为纯文字（网站无对应锚点） |
| `#v()/#h()/#align/#text(...)` 等排版指令 | 按语义取舍，不保留 |
| `#qa-box(q, a)` | stem=q，answer=a |
| `#formula-table` 等表格 | 标准 markdown 表格 |

## 4. 数学宏映射表（template.typ 定义 → KaTeX/LaTeX）

| Typst 宏 | LaTeX |
|---|---|
| `dd(x)` | `\mathrm{d}x` |
| `ddd(y,x)` | `\frac{\mathrm{d}^2 y}{\mathrm{d}x^2}` |
| `pd(y,x)` / `p2d(y,x)` / `pdd(z,x,y)` | `\frac{\partial y}{\partial x}` / `\frac{\partial^2 y}{\partial x^2}` / `\frac{\partial^2 z}{\partial x \partial y}` |
| `int` / `iint` / `iiint` / `oint` | `\int` / `\iint` / `\iiint` / `\oint` |
| `intab(a,b)` | `\int_a^b` |
| `limn` / `limxinf` | `\lim_{n\to\infty}` / `\lim_{x\to\infty}` |
| `limx(a)` / `limxy(a,b)` | `\lim_{x\to a}` / `\lim_{\substack{x\to a\\ y\to b}}` |
| `sumn` / `sumnzero` | `\sum_{n=1}^{\infty}` / `\sum_{n=0}^{\infty}` |
| `sumk(a,b)` / `sumab(a,b)` | `\sum_{k=a}^{b}` / `\sum_{n=a}^{b}` |
| `summ(s1,s2)` / `prodd(s1,s2)` | `\sum_{s1}^{s2}` / `\prod_{s1}^{s2}` |
| `supm/infm/maxm/minm(sub)` | `\sup_{sub}` / `\inf_{sub}` / `\max_{sub}` / `\min_{sub}` |
| `va(x)` / `vec(x)` | `\mathbf{x}` / `\vec{x}` |
| `EE(x)` / `VV(x)` / `Var(x)` / `Cov(x,y)` / `PP(x)` | `\mathrm{E}(x)` / `\mathrm{D}(x)` / `\operatorname{Var}(x)` / `\operatorname{Cov}(x,y)` / `\mathrm{P}(x)` |
| `RR/NN/ZZ/QQ/CC` | `\mathbb{R}` 等 |
| `norm(x)` / `abs(x)` | `\left\| x \right\|` / `\left\| x \right\|`→`\lvert` |
| `tr/rank/Ker(x)`、`diag(..)` | `\operatorname{tr}` 等 |
| `sh/ch/arsinh/arcosh` | `\operatorname{sh}` 等 |

## 5. Typst 数学语法 → LaTeX 常用对照

`1/2`→`\frac{1}{2}`；`x_(n+1)`→`x_{n+1}`；`sqrt(n)`→`\sqrt{n}`；`root(3,x)`→`\sqrt[3]{x}`；
`oo`→`\infty`；`dot`→`\cdot`；`dot.c`→`\cdots`；`dot.v`→`\vdots`；`times`→`\times`；
`<=`/`>=`/`!=`→`\le`/`\ge`/`\ne`；`->`→`\to`；`=>`→`\Rightarrow`；`<->`→`\leftrightarrow`；
`arrow.r.long`/`arrow.double.long`→`\longrightarrow`/`\Longrightarrow`；`in`/`!in`→`\in`/`\notin`；
`union`/`sect`→`\cup`/`\cap`；`subset`/`subset.eq`→`\subset`/`\subseteq`；
`tilde.op`→`\sim`；`eq.eq`/`equiv`→`\equiv`；`plus.circle`→`\oplus`；`dots.h`→`\ldots`；
`alt`→`\mid`；`star`→`\star`；`cases(...)`→`\begin{cases}…\end{cases}`；
`mat(a,b;c,d)`→`\begin{pmatrix}`；`mat(delim:"|",…)`→`\begin{vmatrix}`；
`lr(...)`→`\left…\right`；`"文字"`→`\text{文字}`；`bold(x)`→`\mathbf{x}`；`upright(d)`→`\mathrm{d}`；
`limits(stretch(=))^("Let" …)`→`\overset{\text{Let } …}{=}`；
块公式 `&` 对齐 + `\` 换行 → `aligned` 环境：`$$\begin{aligned} a &= b \\ c &= d \end{aligned}$$`。

行内公式定界符 `$…$`，块公式独立行 `$$…$$`；Typst 原文的 `$ … $` 块公式按语义判断行内/块级。

## 6. 保真原则

- 只做**语法等价转写**，不改写、不增删任何语义内容（含原文中的逗号/顿号等标点风格）。
- 原文图片未占位说明的、无法转写的内容，以 `〔原文为 …〕` 注记如实标示，不静默丢弃。
- 转换后每文件抽查原文比对。
