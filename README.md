# CKKK · 个人主页（学习记录）

由 `notes/` 下的 Typst 笔记转换而来的**个人主页**静态网站：笔记（mkdocs 式双导航）、
210 道题目的题库、站点级标签索引、项目与关于页。
原始 `.typ` 文件一律未改动；typst → markdown 转换全部由模型手工完成（未用 pandoc）。

## 使用

- **直接双击 `index.html`** 即可使用（数据内联，无网络、无服务器依赖）。
- 或任意静态托管（GitHub Pages 等），全相对路径开箱即用。

## 栏目

| 路由 | 内容 |
|---|---|
| `#/` 首页 | 极简个人介绍（站名、一句话简介、关键词、链接） |
| `#/notes` 笔记 | mkdocs 式三栏：**左栏 7 个科目一级导航（点击展开该科目的章节）**，中间正文，**右栏为当前笔记内的小章节目录**（点击跳转）。内容源 `content/notes/*.md` |
| `#/ques` 题库 | 210 道题：科目/课程/**章节级标签**/全文组合检索，整页·单题两种模式，答案折叠，1/3/7/15/30 遗忘曲线，已掌握标记（localStorage），`#/q/<id>` 深链。题卡只展示 科目 / 标签 / 题干 / 解析 |
| `#/tags` 标签索引 | 不在顶部导航，从题库「标签索引 →」进入：按 数学一/408/笔记 分组（tag 即章节名，与笔记章节一致），点入即筛选题库 |
| `#/projects` 项目 | 项目卡片（配置于 `site.config.js`） |
| `#/about` 关于 | 站点与个人说明（配置于 `site.config.js`） |

键盘（题库内）：`←/→` 切题 · `空格` 展开答案 · `M` 标记已掌握 · `/` 搜索 · `T` 切换深浅色。

## 修改与重建

1. **写笔记**：在 `content/notes/` 新建 md，frontmatter 写
   `title / subject（七科目之一：高等数学、线性代数、概率论、数据结构、计算机组成原理、操作系统、计算机网络）/ chapter（章节）/ date / tags / excerpt / sample`；
2. **改站点信息**：`site.config.js`（站名、简介、关键词、链接、项目、关于、页脚）；
3. **改题目内容**：`content/<course>/*.md`（格式见 `content/CONVENTIONS.md`）；
4. 运行 `node build.mjs`（构建期渲染 markdown 与 KaTeX 数学），刷新即见。

## 目录结构

```
site/
├── index.html / style.css / app.js   # 前端（原生，零运行时依赖）
├── site.config.js                    # ★ 站点配置（站名/简介/链接/项目/关于）
├── data.js                           # 打包产物（build.mjs 生成，勿手改）
├── build.mjs                         # 打包：content/*.md → data.js
├── content/
│   ├── CONVENTIONS.md                # 题目转换规范与宏映射表
│   ├── notes/                        # ★ 笔记（markdown；高数 16 章 + 附录已由 Typst 转入，另有示例）
│   ├── caculus/ linear-algebra/ data-structure/   # 题目（210 题）
├── assets/                           # 笔记配图
├── vendor/                           # 离线资源：LXGW 文楷 + KaTeX
└── design/                           # 改版过程的设计稿（可删）
```

## 说明

- `content/notes/` 里的三篇为**示例笔记**（页面上有"示例"徽标），删除 md 并重新 build 即可移除；
- 26 道章节练习在原笔记中就没有解析，题库中相应不显示答案折叠块（非转换丢失）；
- 约 20 处 cetz 矢量图以「〔原文此处为 Typst 矢量示意图〕」占位。
