---
id: ielts
title: 雅思入学测
intro: 30 分钟 · 听力 10 + 阅读 8 + 语言运用 12 · 自动出分
---

```json
{
  "start": "screen1",
  "nodes": {
    "screen1": {
      "type": "screen",
      "question": "孩子是否已通过以下考试？",
      "options": [
        { "label": "FCE 已通过", "goto": "result", "branch": "fce-exempt" },
        { "label": "PET 已通过", "goto": "screen2" },
        { "label": "暂无 PET/FCE 成绩", "goto": "test" }
      ]
    },
    "screen2": {
      "type": "screen",
      "question": "PET 成绩是？",
      "options": [
        { "label": "PET 优秀", "goto": "result", "branch": "pet-excellent" },
        { "label": "PET 通过", "goto": "test" }
      ]
    },
    "test": { "type": "exam", "exam": "exams/ielts-a.md", "then": "result" },
    "result": { "type": "result" }
  },
  "rules": [
    { "id": "foundation", "when": { "totalMax": 4 } },
    { "id": "foundation-re", "when": { "totalMin": 4.5, "totalMax": 4.5, "moduleMax": { "reading": 3.5 } } },
    { "id": "l1", "when": { "totalMin": 4.5, "totalMax": 5, "moduleMin": { "listening": 4, "reading": 4, "grammar": 4 } } },
    { "id": "wechat", "when": { "totalMin": 5.5 } },
    { "id": "consult" }
  ]
}
```

## branch:fce-exempt
congrats: 恭喜！
level: FCE 已通过，免测直通 L1 进阶班
detail: 按入学测规则，FCE 通过者可免于作答本卷。
advice: 建议尽快与课程顾问确认班型与开课时间。

## branch:pet-excellent
congrats: 恭喜！
level: PET 优秀，免测直通 L1 进阶班
detail: 按入学测规则，PET 优秀成绩可替代入学测试。
advice: 建议与顾问老师预约口语人工测评，完善分班信息。

## branch:foundation
level: 当前定位：雅思 3.5–4.0 水平
detail: 建议报读 FOUNDATION 预备班，先夯实听力与语法基础。
advice: 预备班衔接 KET/PET 体系，3–6 个月可达雅思 4.5 入口水平。

## branch:foundation-re
level: 当前定位：总分 4.5，但阅读单项偏弱
detail: 建议报读 FOUNDATION 预备班，并同步搭配 RE 阅读课程。
advice: 阅读单项低于 4 时直接进 L1 会明显吃力，先补单项更划算。

## branch:l1
congrats: 恭喜！
level: 达到 L1 进阶班入学水平（4.5–5.0）
detail: 听、读、写（语言运用）三科均衡达标。
advice: 建议预约口语人工测评后确认学位。

## branch:wechat
congrats: 恭喜！
level: 定位分 5.5，超出本系统常规分班范围
detail: 该分数段班型安排需顾问老师单独评估。
advice: 请添加顾问微信，获取个性化课程方案。

## branch:consult
level: 成绩处于班型交界区间
detail: 自动判分结果需要结合口语水平综合判断。
advice: 请将本页结果出示给课程顾问，获取人工复核。
