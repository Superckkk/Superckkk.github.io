---
id: level
title: 阶段定位测（K/P 自查）
intro: 自选阶段 · 约 10 分钟 · 判断能否进阶下一级
---

```json
{
  "_todo": "通过线/远超线阈值为占位数值，等正式 KET/PET 卷到位后按教研标准调整",
  "start": "screen-stage",
  "nodes": {
    "screen-stage": {
      "type": "screen",
      "question": "我现在在哪个阶段？",
      "options": [
        { "label": "KET 阶段", "goto": "test-ket" },
        { "label": "PET 阶段", "goto": "test-pet" }
      ]
    },
    "test-ket": { "type": "exam", "exam": "exams/level-ket.md", "then": "route-ket" },
    "route-ket": {
      "type": "router",
      "branches": [
        { "id": "beyond", "when": { "totalMin": 6.5 }, "goto": "result", "branch": "ket-beyond" },
        { "id": "pass", "when": { "totalMin": 4.5 }, "goto": "result", "branch": "ket-pass" },
        { "id": "below", "goto": "result", "branch": "ket-below" }
      ]
    },
    "test-pet": { "type": "exam", "exam": "exams/level-pet.md", "then": "route-pet" },
    "route-pet": {
      "type": "router",
      "branches": [
        { "id": "far", "when": { "totalMin": 7 }, "goto": "result", "branch": "pet-far" },
        { "id": "pass", "when": { "totalMin": 4.5 }, "goto": "result", "branch": "pet-pass" },
        { "id": "below", "goto": "result", "branch": "pet-below" }
      ]
    },
    "result": { "type": "result" }
  }
}
```

## branch:ket-below
level: 暂未达到 KET 通过水平
detail: 建议系统学习 KET 班，先补词汇与基础语法。
advice: 把结果页拿给顾问，确认开班时间。

## branch:ket-pass
congrats: Congratulations
level: 达到 KET 通过水平
detail: KET 阶段内容已能应付，可按计划备考 KET 正式考试。
advice: 考完 KET 后即可衔接 PET 班。

## branch:ket-beyond
congrats: 很棒！
level: 超过 KET 通过水平 —— 建议直接报 PET 班
detail: 停留在当前阶段会浪费时间，PET 班是更合适的起点。
advice: 顾问可安排一次口语抽查确认跳级。

## branch:pet-below
level: 暂未达到 PET 通过水平
detail: 建议报读 PET 班系统备考，重点补阅读与写作基础。
advice: 结果页可直接出示给课程顾问。

## branch:pet-pass
congrats: Congratulations
level: 达到 PET 通过水平 —— 建议报 FCE 班
detail: PET 阶段目标已达成，FCE 班是自然的下一步。
advice: 预约顾问确认 FCE 班学位。

## branch:pet-far
congrats: 非常出色！
level: 远超 PET 通过水平 —— 建议 FCE 班 + 雅思 & RE4 课程
detail: 学习空间大，可以并行规划雅思方向。
advice: 该组合方案需顾问定制，请添加微信。
