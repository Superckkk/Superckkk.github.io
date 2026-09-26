---
id: pu
title: 新生入学测（PU2/PU3）
intro: 约 10 分钟 · 词汇 / 语法 / 阅读 · 达标自动续附加卷
---

```json
{
  "_todo": "阈值 7/4 为占位数值：正式卷未到位，等教研按真题实测后修改当堂数值即可",
  "start": "test-pu2",
  "nodes": {
    "test-pu2": { "type": "exam", "exam": "exams/pu2.md", "then": "route-pu2" },
    "route-pu2": {
      "type": "router",
      "branches": [
        { "id": "far", "when": { "totalMin": 7 }, "goto": "test-pu3" },
        { "id": "ok", "when": { "totalMin": 4 }, "goto": "result", "branch": "pu2-ok" },
        { "id": "below", "goto": "result", "branch": "pu2-below" }
      ]
    },
    "test-pu3": { "type": "exam", "exam": "exams/pu3-extra.md", "then": "route-pu3" },
    "route-pu3": {
      "type": "router",
      "branches": [
        { "id": "ket", "when": { "totalMin": 7 }, "goto": "result", "branch": "pu3-ket" },
        { "id": "keep-pu2", "goto": "result", "branch": "pu2-ok" }
      ]
    },
    "result": { "type": "result" }
  }
}
```

## branch:pu2-below
level: 建议预约线下评估
detail: 本次为自助初筛，6–7 岁孩子的听口水平需要老师面对面确认。
advice: 添加课程顾问微信，预约一次免费线下评估。

## branch:pu2-ok
congrats: 恭喜！
level: 已达到 PU2 班入学水平
detail: 可以直接开始 PU2（Yr1 起点）系统学习。
advice: 顾问可协助确认开班时间与预约试听。

## branch:pu3-ket
congrats: 太棒了！
level: 远超 PU2，附加卷同样达标 —— 建议 KET 预备班
detail: PU3 附加卷通过，基础显著优于同龄起点。
advice: 请直接联系顾问锁定 KET 预备班学位。
