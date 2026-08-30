---
title: 函数极限与连续
subject: 高等数学
chapter: 函数与极限
date: 2026-08-30
tags: [函数与极限]
excerpt: 双曲函数、周期性、泰勒公式、无穷小比较与间断点分类。
---

## 重要函数性质

反双曲函数与双曲函数：

1. **反双曲正弦函数**：

$$f(x) = \operatorname{arsinh} x = \ln\left(x + \sqrt{x^2 + 1}\right)$$

   其导数为：$\left(\operatorname{arsinh} x\right)' = \dfrac{1}{\sqrt{x^2 + 1}}$

2. **双曲函数**：
   - 双曲正弦：$sh\, x = \dfrac{e^x - e^{-x}}{2}$
   - 双曲余弦：$ch\, x = \dfrac{e^x + e^{-x}}{2}$

   **重要恒等式**（类似三角函数）：

$$ch^2 x - sh^2 x = 1$$

> 〔原文此处为 Typst 矢量示意图：双曲正弦 $sh x$、双曲余弦 $ch x$、反双曲正弦 $arsinh x$ 的函数图像〕

## 周期性

- 若 $f(x)$ 以 $T$ 为周期，则 $f(ax + b)$ 以 $\dfrac{T}{|a|}$ 为周期。
- 若 $g(x)$ 是周期函数，则复合函数 $f[g(x)]$ 也是周期函数。
- **积分周期性**：若 $f(x)$ 是以 $T$ 为周期的连续函数，则：

$$F(x) = \int_0^x f(t)\,\mathrm{d}t$$

   以 $T$ 为周期的充要条件是 $\displaystyle\int_0^T f(x)\,\mathrm{d}x = 0$。

> **提示**
>
> **概念辨析**：最大值"点"指的是横坐标 $x_0$，而最大"值"指的是 $f(x_0)$。

## 反三角函数的主值区间

在解方程或做代换时，必须注意值域：

- $y = \arcsin x$：主值区间 $\left[-\dfrac{\pi}{2}, \dfrac{\pi}{2}\right]$
- $y = \arccos x$：主值区间 $[0, \pi]$

**重要恒等式**：

- $\sin(\arcsin x) = \cos(\arccos x) = x \quad (x \in [-1, 1])$
- $\cos(\arcsin x) = \sin(\arccos x) = \sqrt{1 - x^2} \quad (x \in [-1, 1])$
- $\arcsin x + \arccos x = \dfrac{\pi}{2} \quad (x \in [-1, 1])$

## 极限计算核心工具

### 泰勒公式（Taylor Series）

> **定义（佩亚诺余项泰勒公式）**
>
> 设 $f(x)$ 在点 $x = 0$ 处 $n$ 阶可导，则：
>
> $$f(x) = f(0) + f'(0)x + \frac{f''(0)}{2!}x^2 + \cdots + \frac{f^{(n)}(0)}{n!}x^n + o(x^n)$$

**常用函数的泰勒展开**：

- $\sin x = x - \dfrac{1}{3!}x^3 + \dfrac{1}{5!}x^5 + o(x^5)$
- $\cos x = 1 - \dfrac{1}{2!}x^2 + \dfrac{1}{4!}x^4 + o(x^4)$
- $\arcsin x = x + \dfrac{1}{6}x^3 + \dfrac{3}{40}x^5 + o(x^5)$
- $\tan x = x + \dfrac{1}{3}x^3 + \dfrac{2}{15}x^5 + o(x^5)$
- $\arctan x = x - \dfrac{1}{3}x^3 + \dfrac{1}{5}x^5 + o(x^5)$
- $\ln(1+x) = x - \dfrac{1}{2}x^2 + \dfrac{1}{3}x^3 + o(x^3)$
- $e^x = 1 + x + \dfrac{1}{2!}x^2 + \dfrac{1}{3!}x^3 + o(x^3)$
- $(1+x)^\alpha = 1 + \alpha x + \dfrac{\alpha(\alpha-1)}{2}x^2 + o(x^2)$

## 无穷小的比较与运算

- $o(x^m) \pm o(x^n) = o(x^l), \quad l = \min(m, n)$
- $o(x^m) \cdot o(x^n) = o(x^{m+n})$
- $o(x^m) = o(kx^m) = k \cdot o(x^m), \quad k \neq 0$

> **提示**
>
> **幂指函数 $1^\infty$ 型秒杀结论**：
> 不仅要知道极限是 $e$，还要知道误差项（用于阶数比较题）：
>
> $$(1 + x)^{1/x} - e \sim -\frac{e}{2}x \quad (x \to 0)$$
>
> $$\left(1 + \frac{1}{x}\right)^x - e \sim -\frac{e}{2x} \quad (x \to \infty)$$

典型例题见题库（泰勒公式反求参数）。

## 函数的连续性与间断点

间断点分类。设 $x_0$ 是间断点：

1. **第一类间断点**（左右极限都存在）：
   - **可去间断点**：$f(x_0^-) = f(x_0^+) \neq f(x_0)$（或无定义）。
   - **跳跃间断点**：$f(x_0^-) \neq f(x_0^+)$。
2. **第二类间断点**（左右极限至少一个不存在）：
   - **无穷间断点**：单侧极限为 $\infty$。
   - **振荡间断点**：极限振荡不存在（如 $\sin\dfrac{1}{x}$）。

闭区间上连续函数的性质。设 $f(x) \in C[a, b]$：

1. **有界性与最值定理**：必有最大值 $M$ 和最小值 $m$。
2. **零点定理**：若 $f(a) \cdot f(b) < 0$，则 $\exists\, \xi \in (a, b)$，使 $f(\xi) = 0$。
3. **介值定理**：对于 $m < \mu < M$，必存在 $\xi$，使 $f(\xi) = \mu$。
