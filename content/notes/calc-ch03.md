---
title: 一元函数微分学的概念
subject: 高等数学
chapter: 导数与微分
date: 2026-08-30
tags: [导数与微分]
excerpt: dy/dx 的两重性、奇偶性与导数、|f(x)| 的可导性、微分概念。
---

## 符号 dy/dx 的两重性

> **提示**
>
> 1. **一阶导数**：具有"商"的性质。
>    - 链式法则：$\dfrac{\mathrm{d}y}{\mathrm{d}x} = \dfrac{\mathrm{d}y}{\mathrm{d}u} \cdot \dfrac{\mathrm{d}u}{\mathrm{d}x}$（类似约分）
>    - 反函数：$\dfrac{\mathrm{d}x}{\mathrm{d}y} = \dfrac{1}{\dfrac{\mathrm{d}y}{\mathrm{d}x}}$
>    - 微分方程分离变量：可将 $\mathrm{d}x$ 乘到等式另一端。
> 2. **高阶导数**：**不**具备"商"的性质！
>    - $\dfrac{\mathrm{d}^2 y}{\mathrm{d}x^2} \neq \left(\dfrac{\mathrm{d}y}{\mathrm{d}x}\right)^2$
>    - 参数方程二阶导：$\dfrac{\mathrm{d}^2 y}{\mathrm{d}x^2} = \dfrac{\mathrm{d}}{\mathrm{d}x}(y'_x) = \dfrac{\mathrm{d}(y'_x)/\mathrm{d}t}{\mathrm{d}x/\mathrm{d}t}$，千万不能写成 $y''(t)/x''(t)$。

> **提示**
>
> **奇偶性与导数**：
> - 奇函数的导数是偶函数。
> - 偶函数的导数是奇函数。
> - **周期性**：周期函数的导数仍是周期函数（周期不变）。

> 典型例题见题库（$f(a)=0$ 与 $F(x)=f(x)|x-a|$ 的可导性）。

该题的结论应当记住。

## f(x) 与 |f(x)| 连续、可导的关系总结

- 设 $f(x)$ 在 $x_0$ 处连续，则 $|f(x)|$ 在 $x_0$ 处连续，反之不真。
- 设 $f(x)$ 在 $x_0$ 处可导，则：
  - $f(x_0) \neq 0 \Rightarrow |f(x)|$ 在 $x_0$ 处可导且 $\left.[|f(x)|']\right|_{x = x_0} = \begin{cases} f'(x_0) & f(x_0) > 0\\ -f'(x_0) & f(x_0) < 0 \end{cases}$
  - $f(x_0) = 0$，且：
    - $f'(x_0) = 0 \Rightarrow |f(x)|$ 在 $x_0$ 处可导且 $\left.[|f(x)|']\right|_{x = x_0} = 0$
    - $f'(x_0) \neq 0 \Rightarrow |f(x)|$ 在 $x_0$ 处不可导
- $f(x)$ 在 $x_0$ 处连续 $\Rightarrow$ $|f(x)|$ 在 $x_0$ 处连续，反之不真。
- $f(x)$ 在 $x_0$ 处可导 $\not\Rightarrow$ $|f(x)|$ 在 $x_0$ 处可导，反之亦不真。

## 导数的几何意义

- $f'_+(x_0) \neq f'_-(x_0)$，出现角点，则 $f(x)$ 在 $x_0$ 处不可导，没有切线；
- $f(x)$ 在点 $x_0$ 的导数是无穷导数时，在该点有切线但无导数。

## 微分的概念

设函数 $y = f(x)$ 在点 $x_0$ 的某邻域内有定义，且 $x_0 + \Delta x$ 在该邻域内，对于函数增量

$$\Delta y = f(x_0 + \Delta x) - f(x_0)$$

若存在与 $\Delta x$ 无关的常数 $A$，使得

$$\Delta y = A\Delta x + o(\Delta x)$$

则称函数 $f(x)$ 在点 $x_0$ 处可微，称 $A\Delta x$ 为函数 $f(x)$ 在点 $x_0$ 处的微分，也叫线性主部，记作 $\left.\mathrm{d}y\right|_{x = x_0} = A\,\mathrm{d}x$，其中 $A = f'(x_0)$。

$\mathrm{d}y$ 与 $\Delta y$、$\mathrm{d}x$ 与 $\Delta x$ 的比较关系：

- $\mathrm{d}y = A\,\mathrm{d}x = f'(x)\,\mathrm{d}x$
- $\Delta y = f(x + \Delta x) - f(x)$

几何上来看，$\mathrm{d}y$ 是切线段在 $y$ 方向的增量，而 $\Delta y$ 是函数的实际增量。
