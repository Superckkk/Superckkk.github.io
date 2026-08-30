---
title: 一元函数积分学的应用（一）——几何应用
subject: 高等数学
chapter: 定积分的几何应用
date: 2026-08-30
tags: [定积分的几何应用]
excerpt: 平面图形面积、旋转体体积与侧面积、形心、弧长与考研常考曲线速查。
---

## 表达和计算平面图形的面积

- 平面直角坐标系：曲线 $y = y_1(x)$ 与 $y = y_2(x)$ 及 $x = a, x = b\ (a < b)$ 所围成的平面图形的面积可表示为：

$$S = \int_a^b \left|y_1(x) - y_2(x)\right|\mathrm{d}x$$

- 极坐标系：曲线 $r = r_1(\theta)$ 与 $r = r_2(\theta)$ 与两射线 $\theta = \alpha, \theta = \beta\ (0 < \beta - \alpha \le 2\pi)$ 所围成的曲边扇形的面积可表示为：

$$S = \frac{1}{2}\int_\alpha^\beta \left|r_1^2(\theta) - r_2^2(\theta)\right|\mathrm{d}\theta$$

典型例题见题库（摆线一拱的面积、$y = e^{-x}\sin x$ 与 $x$ 轴围成的面积）。

## 表达和计算旋转体的体积

1. 曲线 $y = y(x)$ 与 $x = a, x = b\ (a < b)$ 及 $x$ 轴围成的曲边梯形绕 $x$ 轴旋转一周所得到的旋转体的体积为：

$$V_x = \int_a^b \pi y^2(x)\,\mathrm{d}x$$

2. 曲线 $y = y(x)$ 与 $x = a, x = b\ (0 \le a < b)$ 及 $x$ 轴围成的曲边梯形绕 $y$ 轴旋转一周所得到的旋转体的体积为：

$$V_y = 2\pi \int_a^b x \left|y(x)\right|\mathrm{d}x$$

3. 平面直线 $L: y = f(x)\ (a \le x \le b)$（$f(x)$ 为可导函数）绕定直线 $L_0: Ax + By + C = 0$（且过 $L_0$ 的任一条垂线与 $L$ 至多有一个交点）旋转一周所得旋转体的体积有相应公式（见原文推导）。

典型例题见题库（绕直线 $x=1$ 旋转的旋转体体积）。

## 表达和计算函数的平均值

设 $x \in [a, b]$，函数 $y(x)$ 在 $[a, b]$ 上的平均值为

$$\bar{y} = \frac{1}{b-a}\int_a^b y(x)\,\mathrm{d}x \quad \Rightarrow \quad \bar{y} = y(\xi),\ \xi \in [a,b]$$

典型例题见题库（$f(x+2)-f(x)=x$ 型的平均值、变限积分函数的平均值）。

## 其他几何应用

1. **平面曲边梯形的形心坐标公式**：形心是一个几何图形的"重心"的等效点，将曲边梯形想象成一块薄板，若其厚度均匀、密度均匀，则形心与质心重合。形心的计算公式为：

$$\bar{x} = \frac{\int_a^b x f(x)\,\mathrm{d}x}{\int_a^b f(x)\,\mathrm{d}x}, \qquad \bar{y} = \frac{\dfrac{1}{2}\int_a^b \left[f(x)\right]^2\mathrm{d}x}{\int_a^b f(x)\,\mathrm{d}x}$$

   - $\bar{x}$：其为面积的加权平均位置。想象一下：将曲边梯形切成无数条竖直的细线，$\bar{x}$ 就是这些细线的 $x$ 坐标按长度加权平均的结果；
   - $\bar{y}$：其为高度的平均位置。对于一条竖直的细线，其形心在 $y = f(x)/2$ 处，$\bar{y}$ 就是这些点的 $y$ 坐标按长度加权平均的结果。

2. **平面光滑曲线的弧长**：
   - $y = y(x)\ (a \le x \le b)$：$s = \displaystyle\int_a^b \sqrt{1 + \left[y'(x)\right]^2}\,\mathrm{d}x$
   - $\begin{cases} x = x(t)\\ y = y(t)\end{cases}\ (\alpha \le t \le \beta)$：$s = \displaystyle\int_\alpha^\beta \sqrt{\left[x'(t)\right]^2 + \left[y'(t)\right]^2}\,\mathrm{d}t$
   - $r = r(\theta)\ (\alpha \le \theta \le \beta)$：$s = \displaystyle\int_\alpha^\beta \sqrt{\left[r(\theta)\right]^2 + \left[r'(\theta)\right]^2}\,\mathrm{d}\theta$

3. **旋转曲面的面积（侧面积）**：$S = 2\pi |y(x)|\, s$，其中 $s$ 为弧长。因此：
   - $y = y(x)\ (a \le x \le b)$：$S = 2\pi \displaystyle\int_a^b |y| \sqrt{1 + \left[y'(x)\right]^2}\,\mathrm{d}x$
   - $\begin{cases} x = x(t)\\ y = y(t)\end{cases}\ (\alpha \le t \le \beta,\ x'(t) \neq 0)$：$S = 2\pi \displaystyle\int_\alpha^\beta |y(t)| \sqrt{\left[x'(t)\right]^2 + \left[y'(t)\right]^2}\,\mathrm{d}t$
   - $r = r(\theta)\ (\alpha \le \theta \le \beta)$：$S = 2\pi \displaystyle\int_\alpha^\beta \left|r(\theta)\sin\theta\right| \sqrt{\left[r(\theta)\right]^2 + \left[r'(\theta)\right]^2}\,\mathrm{d}\theta$

## 考研常考曲线

> 〔原文此处为 Typst 矢量示意图集：心形线 $r = a(1+\cos\theta)$、星形线 $x^{2/3} + y^{2/3} = a^{2/3}$、伯努利双扭线 $r^2 = a^2\cos 2\theta$、阿基米德螺线 $r = a\theta$、摆线（两拱）、三叶玫瑰线 $r = a\sin 3\theta$、四叶玫瑰线 $r = a\sin 2\theta$ 的图像，以及六种常考曲线对比图〕

### 曲线公式速查表

| 曲线 | 方程 | 面积 | 弧长 |
|---|---|---|---|
| 心形线 | $r = a(1 + \cos\theta)$ | $\dfrac{3}{2}\pi a^2$ | $8a$ |
| 星形线 | $x^{2/3} + y^{2/3} = a^{2/3}$ | $\dfrac{3}{8}\pi a^2$ | $6a$ |
| 双扭线 | $r^2 = a^2\cos 2\theta$ | $a^2$ | — |
| 摆线（一拱） | $x = r(t - \sin t),\ y = r(1 - \cos t)$ | $3\pi r^2$ | $8r$ |
| 三叶玫瑰 | $r = a\sin 3\theta$ | $\dfrac{1}{4}\pi a^2$ | — |
| 四叶玫瑰 | $r = a\sin 2\theta$ | $\dfrac{1}{2}\pi a^2$ | — |
| 阿基米德螺线 | $r = a\theta$ | — | — |
