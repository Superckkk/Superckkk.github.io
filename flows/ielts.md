---
id: ielts
title: 雅思入学测
intro: 30 分钟 · Listening + Reading + Writing · 自动出分与班型建议
---

```json
{
  "start": "screen1",
  "bandTable": {
    "listening": { "below": 2.5, "steps": [[3, 3.0], [5, 3.5], [7, 4.0], [9, 4.5], [10, 5.0]] },
    "reading":   { "below": 2.5, "steps": [[3, 3.0], [4, 3.5], [6, 4.0], [7, 4.5], [8, 5.0]] },
    "writing":   { "below": 2.5, "steps": [[4, 3.0], [7, 3.5], [9, 4.0], [11, 4.5], [12, 5.0]] }
  },
  "cefrMap": { "3": "A1", "3.5": "A2", "4": "A2", "4.5": "B1", "5": "B2" },
  "nodes": {
    "screen1": {
      "type": "screen",
      "question": "孩子是否已通过以下考试？",
      "options": [
        { "label": "FCE 已通过", "goto": "result", "branch": "page1-exempt" },
        { "label": "PET 已通过", "goto": "screen2" },
        { "label": "无 PET 或 FCE 成绩", "goto": "test" }
      ]
    },
    "screen2": {
      "type": "screen",
      "question": "PET 成绩是？",
      "options": [
        { "label": "PET 优秀", "goto": "result", "branch": "page1-exempt" },
        { "label": "PET 通过", "goto": "test" }
      ]
    },
    "test": { "type": "exam", "exam": "exams/ielts-a.md", "then": "result" },
    "result": { "type": "result" }
  },
  "rules": [
    { "id": "page5", "when": { "totalMax": 3.49 } },
    { "id": "page2", "when": { "totalMax": 4.0 } },
    { "id": "page3", "when": { "totalMax": 4.5, "moduleMax": { "reading": 3.55 } } },
    { "id": "page4", "when": { "totalMin": 4.5, "moduleMin": { "listening": 4.0, "reading": 4.0, "writing": 4.0 } } },
    { "id": "page1-exempt", "when": { "totalMin": 5.5 } },
    { "id": "page2" }
  ]
}
```

## branch:page1-exempt
headline: Approx. IELTS level
congrats: 🎉 CONGRATULATIONS! 🎉
show-total: 5.0+
cefr: B2
recommend: LEVEL 1 雅思基础
recommend2: or LEVEL 2 雅思进阶
qr-action: 进行全面定级
detail: 免测直达：PET 优秀 / FCE 通过 / 定位 5.5+ 的学员可安排 L1 或更高起点。

## branch:page2
headline: Your Mock Test Results
recommend: Foundation 雅思预备
qr-action: 获取详细报告
note-listening: 辨音基础好，需要专项练习
note-reading: 读得懂、提炼稍弱，是预备级重点提升项目
note-writing: 基础语法零失误，复杂语法有待提升
detail: 建议 3–6 个月夯实听力与语法基础，衔接雅思正课体系。

## branch:page3
headline: Your Mock Test Results
recommend: Foundation 雅思预备
recommend2: + RE 2
qr-action: 获取详细报告
note-listening: 辨音基础非常好，关键词抓取准确
note-reading: 整体能力强，阅读拖后腿，急需专项提升
note-writing: 语法、词汇基础好，掌握牢固
detail: 阅读单项低于 4，直接进 L1 会明显吃力；先补阅读单项更划算。

## branch:page4
headline: Your Mock Test Results
congrats: 🎉 CONGRATULATIONS! 🎉
recommend: LEVEL 1 雅思基础
qr-action: 获取详细报告
note-listening: 辨音基础非常好，关键词抓取准确
note-reading: 关键信息理解准确，阅读能力强
note-writing: 语法、词汇基础好，掌握牢固
detail: 听、读、写三科均衡达标，建议预约口语人工测评后确认学位。

## branch:page5
headline: Your Mock Test Results
show-total: 3.0
recommend: RE 1
qr-action: 进行学习规划
detail: 当前阶段建议先做学习规划，从词汇与基础听力起步。
