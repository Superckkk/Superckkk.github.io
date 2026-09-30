# Hippo 英语入学测 · 站点操作手册

纯静态网站，**零构建工具**：所有题目、流程分支、结果文案都是 Markdown 文件，
改完文件刷新页面即生效。部署 = 把整个文件夹原样上传到任意静态托管（公众号菜单需要 HTTPS 域名）。

## 目录速览

```
index.html      入口（手机优先，适配微信内置浏览器）
exams/          题库：一份 .md = 一张卷子
flows/          流程：一份 .md = 一套测评（入口路由 + 分支规则 + 结果文案）
media/audio/    听力音频槽位（mp3）
assets/         顾问二维码等图片
js/ css/        引擎与样式（一般不用动）
test/           自检脚本（node test/run-tests.mjs）
```

三个公众号入口链接：

| 链接 | 测评 |
|---|---|
| `…/#/ielts` | 雅思入学测（样卷 A 已就绪） |
| `…/#/pu` | 新生入学测 PU2/PU3（占位样题） |
| `…/#/level` | 阶段定位测 K/P 自查（占位样题） |

## 怎么换题 / 加题

打开 `exams/` 下对应卷子的 .md，照已有格式改即可：

```markdown
---
id: ielts-a                    ← 卷子编号，别动
title: 雅思水平测 · 卷 A
timeLimit: 30                  ← 分钟；留空则不限时
modules: listening=听力 reading=阅读 grammar=语言运用
---

## 节标题 {module: listening, audio: media/audio/xxx.mp3, plays: 2}
这一节共用的题头说明（录音指令、阅读文章等）写在这里。

### q1 {id: l1, type: fill, answer: "Miller|Smith", maxWords: 3}
1. Family name: ______
```

每题一行"机器读"的元数据（`### … {…}`），下面是给学生看的题干：

- `type`：`choice` 单选 / `tf` 判断 / `fill` 填空
- `answer`：
  - choice：答案字母 A/B/C（选项写在 `options: "项1|项2|项3"`，用 `|` 分隔）
  - tf：`T` 或 `F`
  - fill：`|` 分隔多个可接受答案；`/` 表示"不填"也算对
- `maxWords`：填空允许的最大词数（超了判错）
- `id`：题目唯一号，换题时保持不冲突即可
- **答案写 `???` = 该题暂不计分**（等录音稿时用），会在结果页自动提示"暂未计分"

判分宽容度（已内置，不用配置）：大小写不敏感、全角转半角、自动忽略 £ 等货币符号
与首尾标点、拼写多写少写一点的前缀容忍。

**听力补步骤**：① 把 mp3 放进 `media/audio/`，文件名对上节标题里的 `audio:`；
② 把该节各题 `answer: ???` 改成真答案。两步都做完听力才计分。

## 怎么改分支和结果页文案

打开 `flows/` 下对应文件。三部分：

1. **json 路由块**——流程怎么走。节点类型：
   `screen`（选择题筛选）→ `exam`（做某张卷）→ `router`（按分数跳转/续卷）→ `result`（出结果）。
   例：新生测 PU2 考了 7 分以上自动接 PU3 附加卷，就是 `route-pu2` 里的
   `{ "when": { "totalMin": 7 }, "goto": "test-pu3" }`。
2. **分支条件**——`when` 支持：`totalMin/totalMax`（定位分）、
   `moduleMin/moduleMax`（单项级分，如阅读）、多条同时满足才算。按顺序取第一条命中，
   最后放一条不带 `when` 的兜底。
3. **结果文案**——`## branch:分支名` 下面的行：
   ```
   congrats: 恭喜！            ← 可删，低分档不写
   level: 已达到 PU2 班入学水平  ← 大字结论
   detail: 一句说明
   advice: 学习建议
   action: 自定义引导语（不写则用默认"添加顾问微信…"）
   ```

分数口径（2026-09 按教师版试标表 + 结果页设计稿确定）：

- 模块分：按**换算表查表**（`flows/ielts.md` json 块 `bandTable`，来源《教师版·模块分换算》），低于表内下限按 2.5 计；
- 总分 = 三模块均分，按**雅思规则四舍五入到 0.5**（roundMode: "round"，2026-09-29 教研实测后确认——
  此前进位制 ceil 会抬档，导致 3.5/4.0 档学员测不出对应结果；已实测 1331 种分数组合全部命中教师版档位）。
  设计稿"页面3"（4.5+RE 2）在 round 口径下由"听9 读5 写10"等组合触发；
- CEFR 按 `cefrMap` 查表（3.0→A1 / 3.5,4.0→A2 / 4.5→B1 / 5.0+→B2）；设计稿"页面3"标 A2 为个例，现按 B1 显示；
- 分支：`<3.5 → 页面5（显示 3.0）`、`3.5/4.0 → 页面2 Foundation`、`4.5 且阅读≤3.5 → 页面3 +RE 2`、
  `4.5–5.0 三科≥4 → 页面4 LEVEL 1`、`PET 优秀 / FCE 通过 / 5.5+ → 页面1`。

## 二维码与素材

- 顾问二维码：已接入真图 `assets/cambridge-examiner.jpg`（换图直接覆盖同名文件）。
- PU 欢乐测儿童字体：**站酷快乐体**（OFL 免费商用，`assets/fonts/zcool-kuaile.woff2`，仅 PU 流程加载）。
  更换字体时替换该文件并同步 `css/app.css` 里 @font-face 的 src 与 family 名。
- 现在显示的是 `assets/qr-placeholder.svg` 灰框占位。

## 已知边界（设计决定）

- 纯前端：判分与分支全在浏览器内完成，**成绩不上传服务器**；线索靠结果页二维码引导家长找顾问。
- 题库文件里含答案，技术上可被查看源码读到——所以正式题保持"可随时更换"策略。
- 支付报名、成绩收集、口语/写作人工测不在本版范围（需求文档原话"大坑待填"）。

## 本地预览 / 自检

```bash
cd C:\Hippo\Site
python server.py 8017           # 本地预览（多线程+防文件锁抖动），浏览器开 http://127.0.0.1:8017
node test/run-tests.mjs         # 24 项断言：解析、判分、分支、路由
```

改完任何 exams/flows 文件后跑一遍 `node test/run-tests.mjs`，
全绿再把文件夹部署上线。

**改了 `css/` 或 `js/` 后**，把 `index.html` 里引用的 `?v=2` 版本号 +1
（如 `app.css?v=3`），否则微信/浏览器会用旧缓存，用户看不到更新。

## 部署（GitHub Pages）

当前部署方式：`Superckkk.github.io` 仓库的 **`hippo-quiz` 分支**（仅含站点运行文件，
不含需求文档/样卷原稿/test）。注意 Pages 只服务一个分支——

- 要上线本站：仓库 Settings → Pages → Source 选 `hippo-quiz` 分支（原笔记站会下线）；
- 恢复笔记站：Source 切回 `main` 即可；
- 更新本站内容：

```bash
cd /tmp/pages-check && git checkout hippo-quiz
# 把 C:\Hippo\Site 的 index.html、css/、js/、exams/、flows/、assets/ 覆盖进来
git add -A && git commit -m "update" && git push origin hippo-quiz
```

## 待办（等业务投喂）

- [x] ~~听力录音稿 + 音频~~（2026-09-29 已接入 media/audio/ielts-part1/2.mp3，答案已按教师版录入）
- [x] ~~真实顾问二维码~~（assets/cambridge-examiner.jpg）
- [x] ~~级分映射表~~（已按教师版试标表配置在 flows/ielts.md 的 bandTable）
- [ ] 教研确认：总分进位取整口径（当前 ceil，见"分数口径"节）与页面 3 的 CEFR 显示
- [ ] 新生测/阶段测正式卷替换占位样题 + 重定 totalMin 阈值
- [ ] KPF 科普文章链接（结果页行动入口目前为占位文案）
