// 站点配置 — 改这里即可全站生效（站名、简介、链接、项目、栏目开关）
window.KAOSITE = {
  name: "CKKK",
  subtitle: "STUDY LOG · 2026",
  avatarText: "C",
  bio: "26 考研备考中，考数学一与 408。这里是个人主页：把做过的题、读过的书、冒出的想法都记录成文章与档案，慢一点，但一直在写。",
  chips: ["数学一", "408", "数据结构", "线性代数", "阅读", "方法论"],
  links: [
    { label: "GitHub", url: "https://github.com/" },
    { label: "Email", url: "mailto:me@example.com" },
    { label: "RSS", url: "#" },
  ],
  projects: [
    {
      name: "错题本网站",
      tag: "WEB · 本站",
      desc: "把 Typst 笔记里的 210 道错题与练习，做成可检索、可复习的静态题库。",
      url: "#/ques",
    },
    {
      name: "项目占位",
      tag: "WIP",
      desc: "下一个想做的小工具 / 读书笔记合集 / 友链待补……",
      url: "#",
    },
  ],
  about: [
    "这里是 CKKK 的个人主页，记录备考数学一与 408 的过程：笔记、题库、项目与一些想法。",
    "题库来自我的 Typst 学习笔记——目前收录 210 道错题与练习，支持按标签、科目、错因检索，并带有 1/3/7/15/30 天遗忘曲线复习提醒。",
    "本站为纯静态单页应用：内容以 Markdown 撰写，构建后无任何运行时依赖，离线可用。",
  ],
  footer: "© 2026 CKKK · 由 Typst 笔记与 Markdown 驱动",
};
