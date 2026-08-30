---
title: 一元函数积分学的计算
subject: 高等数学
chapter: 积分的计算
date: 2026-08-30
tags: [积分的计算]
excerpt: 基本积分公式、凑微分/换元/分部/有理函数积分、变限积分与反常积分的计算。
---

## 基本积分公式

| 积分式 | 结果 | 积分式 | 结果 |
|---|---|---|---|
| $\int x^k\,\mathrm{d}x$ | $\dfrac{1}{k+1}x^k + C\ (k \neq -1)$ | $\int \dfrac{1}{x}\,\mathrm{d}x$ | $\ln\|x\| + C$ |
| $\int e^x\,\mathrm{d}x$ | $e^x + C$ | $\int a^x\,\mathrm{d}x$ | $\dfrac{a^x}{\ln a} + C$ |
| $\int \sin x\,\mathrm{d}x$ | $-\cos x + C$ | $\int \cos x\,\mathrm{d}x$ | $\sin x + C$ |
| $\int \tan x\,\mathrm{d}x$ | $-\ln\|\cos x\| + C$ | $\int \cot x\,\mathrm{d}x$ | $\ln\|\sin x\| + C$ |
| $\int \sec x\,\mathrm{d}x$ | $\ln\|\sec x + \tan x\| + C$ | $\int \csc x\,\mathrm{d}x$ | $\ln\|\csc x - \cot x\| + C$ |
| $\int \sec^2 x\,\mathrm{d}x$ | $\tan x + C$ | $\int \csc^2 x\,\mathrm{d}x$ | $-\cot x + C$ |
| $\int \sec x \tan x\,\mathrm{d}x$ | $\sec x + C$ | $\int \csc x \cot x\,\mathrm{d}x$ | $-\csc x + C$ |
| $\int \dfrac{1}{1+x^2}\,\mathrm{d}x$ | $\arctan x + C$ | $\int \dfrac{1}{a^2 + x^2}\,\mathrm{d}x$ | $\dfrac{1}{a}\arctan\dfrac{x}{a} + C\ (a>0)$ |
| $\int \dfrac{1}{\sqrt{1-x^2}}\,\mathrm{d}x$ | $\arcsin x + C$ | $\int \dfrac{1}{\sqrt{a^2-x^2}}\,\mathrm{d}x$ | $\arcsin\dfrac{x}{a} + C\ (a>0)$ |
| $\int \dfrac{1}{\sqrt{x^2 + a^2}}\,\mathrm{d}x$ | $\ln\left(x + \sqrt{x^2 + a^2}\right) + C$ | $\int \dfrac{1}{\sqrt{x^2 - a^2}}\,\mathrm{d}x$ | $\ln\left\|x + \sqrt{x^2 - a^2}\right\| + C$ |
| $\int \dfrac{1}{x^2 - a^2}\,\mathrm{d}x$ | $\dfrac{1}{2a}\ln\left\|\dfrac{x-a}{x+a}\right\| + C$ | $\int \sqrt{a^2 - x^2}\,\mathrm{d}x$ | $\dfrac{1}{2}\left(a^2\arcsin\dfrac{x}{a} + x\sqrt{a^2 - x^2}\right) + C$ |
| $\int \sin^2 x\,\mathrm{d}x$ | $\dfrac{1}{2}\left(x - \dfrac{1}{2}\sin 2x\right) + C$ | $\int \cos^2 x\,\mathrm{d}x$ | $\dfrac{1}{2}\left(x + \dfrac{1}{2}\sin 2x\right) + C$ |
| $\int \tan^2 x\,\mathrm{d}x$ | $\tan x - x + C$ | $\int \cot^2 x\,\mathrm{d}x$ | $-\cot x - x + C$ |

几个形式较为复杂的积分式推导：

> **重点**
>
> 1. $$\int \sec x\,\mathrm{d}x = \int \frac{\cos x}{\cos^2 x}\,\mathrm{d}x = \int \frac{\mathrm{d}(\sin x)}{1-\sin^2 x} = \frac{1}{2}\ln\frac{1+\sin x}{1-\sin x} + C = \ln\|\sec x + \tan x\| + C$$
> 2. $\displaystyle\int \frac{1}{\sqrt{x^2 + a^2}}\,\mathrm{d}x$：令 $x = a\tan t$，则
>    $$\int \frac{1}{\sqrt{x^2 + a^2}}\,\mathrm{d}x = \int \sec t\,\mathrm{d}t = \ln|\sec t + \tan t| + C = \ln\left|x + \sqrt{x^2+a^2}\right| + C$$
> 3. $$\int \frac{1}{x^2 - a^2}\,\mathrm{d}x = \frac{1}{2a}\int\left(\frac{1}{x-a} - \frac{1}{x+a}\right)\mathrm{d}x = \frac{1}{2a}\ln\left\|\frac{x-a}{x+a}\right\| + C$$
> 4. $\displaystyle\int \sqrt{a^2 - x^2}\,\mathrm{d}x$：三角代换 $x = a\sin t$；或分部积分：
>    $$I = x\sqrt{a^2 - x^2} + \int \frac{x^2}{\sqrt{a^2 - x^2}}\,\mathrm{d}x = x\sqrt{a^2 - x^2} + a^2\arcsin\frac{x}{a} + I + C$$
>    因此 $I = \dfrac{1}{2}\left(x\sqrt{a^2 - x^2} + a^2\arcsin\dfrac{x}{a}\right) + C$。

## 不定积分的积分法

> **注意**
>
> 不定积分结果一定要加 C！！！

### 凑微分法

$$\int f[g(x)]\, g'(x)\,\mathrm{d}x = \int f[g(x)]\,\mathrm{d}[g(x)] = \int f(t)\,\mathrm{d}t, \quad t = g(x)$$

凑微分时，主要是要注意 $f(g(t))$ 中的 $g(t)$ 是什么形式，再将其他部分的式子往 $g'(t)$ 方向凑。

### 换元法

相当于是凑微分法的逆方法：

$$\int f(x)\,\mathrm{d}x = \int f(g(u))\, g'(u)\,\mathrm{d}u$$

> **注意**
>
> $x = g(u)$ 须是单调可导函数，且计算结束后务必使用反函数 $u = g^{-1}(x)$ 回代。

常用的换元有：

- 三角代换：
  - $\sqrt{a^2 - x^2} \to$ 令 $x = a\sin t,\ |t| < \dfrac{\pi}{2}$
  - $\sqrt{a^2 + x^2} \to$ 令 $x = a\tan t,\ |t| < \dfrac{\pi}{2}$
  - $\sqrt{x^2 - a^2} \to$ 令 $x = a\sec t$（$x>0 \Rightarrow 0<t<\dfrac{\pi}{2}$；$x<0 \Rightarrow \dfrac{\pi}{2}<t<\pi$）
- 根式代换：一般直接令根式 $\sqrt[n]{*} = t$；若同时含 $\sqrt[n]{ax+b}$ 与 $\sqrt[m]{ax+b}$，取最小公倍数 $l$，令 $\sqrt[l]{ax+b} = t$
- 倒代换：令 $x = \dfrac{1}{t}$
- 复杂函数的直接代换

### 分部积分法

$$\int u\,\mathrm{d}v = uv - \int v\,\mathrm{d}u$$

若函数 $u = u(x)$ 与 $v = v(x)$ 具有直到第 $n+1$ 阶的连续导数，则有

$$\int u\, v^{(n+1)}\,\mathrm{d}x = u\,v^{(n)} - u' v^{(n-1)} + u'' v^{(n-2)} - \cdots + (-1)^n u^{(n)} v + (-1)^{n+1} \int u^{(n+1)} v\,\mathrm{d}x$$

### 有理函数的积分

形如 $\displaystyle\int \dfrac{P_n(x)}{Q_m(x)}\,\mathrm{d}x\ (n < m)$ 的积分称为有理函数的积分。主要思想是将有理式拆分成最简有理分式之和，最简有理分式为 $\dfrac{A}{ax+b},\ \dfrac{A_k}{(ax+b)^k},\ \dfrac{Ax+B}{px^2+qx+r},\ \dfrac{A_kx+B_k}{(px^2+qx+r)^k}$。拆分方法：

1. $Q_m(x)$ 的一次单因式 $ax+b$ 产生一项 $\dfrac{A}{ax+b}$；
2. $k$ 重一次因式 $(ax+b)^k$ 产生 $k$ 项：$\dfrac{A_1}{ax+b}, \dfrac{A_2}{(ax+b)^2}, \cdots, \dfrac{A_k}{(ax+b)^k}$；
3. 二次单因式 $px^2+qx+r$ 产生一项 $\dfrac{Ax+B}{px^2+qx+r}$；
4. $k$ 重二次单因式 $(px^2+qx+r)^k$ 产生 $k$ 项：$\dfrac{A_1x+B_1}{px^2+qx+r}, \cdots, \dfrac{A_kx+B_k}{(px^2+qx+r)^k}$。

### 欧拉替换法

欧拉替换法（Euler Substitutions）是求解含二次根式的不定积分 $\displaystyle\int R\left(x, \sqrt{ax^2+bx+c}\right)\mathrm{d}x$ 的一种普适技巧，核心思想是通过变量代换，将无理函数的积分转化为有理函数的积分。

## 定积分的计算

若 $F(x)$ 是连续函数 $f(x)$ 在 $[a,b]$ 上的一个原函数，则

$$\int_a^b f(x)\,\mathrm{d}x = F(x)\Big|_a^b = F(b) - F(a)$$

一些常用结论：

1. 若 $f(x)$ 是连续的偶函数，则 $\displaystyle\int_{-a}^{a} f(x)\,\mathrm{d}x = 2\int_0^a f(x)\,\mathrm{d}x$；
2. 若 $f(x)$ 是连续的奇函数，则 $\displaystyle\int_{-a}^{a} f(x)\,\mathrm{d}x = 0$；
3. 若 $f(x)$ 是以 $T$ 为周期的连续函数，则对任意实数 $a$，都有 $\displaystyle\int_a^{a+T} f(x)\,\mathrm{d}x = \int_0^T f(x)\,\mathrm{d}x$；
4. <mark>区间再现公式</mark>：$\displaystyle\int_a^b f(x)\,\mathrm{d}x = \int_a^b f(a+b-x)\,\mathrm{d}x$；
5. <mark>沃里斯公式（华莱士公式、点火公式）</mark>：
   $$\int_0^{\pi/2} \sin^n x\,\mathrm{d}x = \int_0^{\pi/2} \cos^n x\,\mathrm{d}x = \begin{cases} \dfrac{n-1}{n}\cdot\dfrac{n-3}{n-2}\cdots\dfrac{2}{3}\cdot 1 & n\text{ 为大于 1 的奇数}\\[2mm] \dfrac{n-1}{n}\cdot\dfrac{n-3}{n-2}\cdots\dfrac{1}{2}\cdot\dfrac{\pi}{2} & n\text{ 为正偶数} \end{cases}$$
   $$\int_0^{\pi} \sin^n x\,\mathrm{d}x = 2\int_0^{\pi/2} \sin^n x\,\mathrm{d}x, \qquad \int_0^{\pi} \cos^n x\,\mathrm{d}x = \begin{cases} 0 & n\text{ 为正奇数}\\ 2\int_0^{\pi/2}\cos^n x\,\mathrm{d}x & n\text{ 为正偶数}\end{cases}$$
   $$\int_0^{2\pi} \cos^n x\,\mathrm{d}x = \int_0^{2\pi} \sin^n x\,\mathrm{d}x = \begin{cases} 0 & n\text{ 为正奇数}\\ 4\int_0^{\pi/2}\sin^n x\,\mathrm{d}x & n\text{ 为正偶数}\end{cases}$$

## 变限积分的计算

### 求导公式

变限积分的求导公式（推导见第八章）：

$$F(x) = \int_{\psi(x)}^{\phi(x)} f(t)\,\mathrm{d}t, \qquad F'(x) = f(\phi(x))\phi'(x) - f(\psi(x))\,\psi'(x)$$

> **注意**
>
> 上式中的 $x$ 称为"求导变量"，$t$ 称为"积分变量"，只有当被积函数中只包含"积分变量"时，才能使用上面的变限积分的求导公式求导。一般情形请使用莱布尼茨积分求导公式（见题库 calc-ch09-q11 的推论）。

### 重要结论

1. $f(x)$ 为可积的奇函数：$\displaystyle\int_a^x f(-t)\,\mathrm{d}t$ 为偶函数。
2. $f(x)$ 为可积的偶函数：$\displaystyle\int_a^x f(t)\,\mathrm{d}t$——若它等于 $\displaystyle\int_0^x f(t)\,\mathrm{d}t$，为奇函数；否则为非奇非偶函数。
3. $f(x)$ 是可积的且以 $T$ 为周期的周期函数，则 $\displaystyle\int_0^x f(t)\,\mathrm{d}t$ 是以 $T$ 为周期的周期函数 $\iff \displaystyle\int_0^T f(x)\,\mathrm{d}x = 0$。

> **证明**
>
> 1. $f(x)$ 为可积的奇函数：记 $I_1 = \displaystyle\int_a^x f(t)\,\mathrm{d}t$，$I_2 = \displaystyle\int_a^{-x} f(t)\,\mathrm{d}t = -\int_{-x}^{a} f(t)\,\mathrm{d}t$，则
>    $$I_1 - I_2 = \int_a^x f(t)\,\mathrm{d}t + \int_{-x}^{a} f(t)\,\mathrm{d}t = \int_{-x}^{x} f(t)\,\mathrm{d}t = 0$$
> 2. $f(x)$ 为可积的偶函数：$I_1 + I_2 = \displaystyle\int_0^x f(t)\,\mathrm{d}t - \int_{-x}^{0} f(t)\,\mathrm{d}t + 2\int_a^0 f(t)\,\mathrm{d}t$。
>    因此 $\displaystyle\int_a^x f(t)\,\mathrm{d}t$ 是否为奇函数取决于 $\displaystyle\int_a^0 f(t)\,\mathrm{d}t$ 是否为 0：为 0 时为奇函数，否则为非奇非偶函数。

## 反常积分的计算

> **重点**
>
> 计算反常积分时，需要注意：积分区间内存在被积函数的奇点时，需要将积分区间按照奇点进行切分，并分别计算积分。当被积函数存在绝对值时，也可以通过拆分积分区间的方式去掉绝对值。

> **推论（Tau 函数）**
>
> $$\operatorname{Tau}(\alpha) = \int_0^{+\infty} x^{\alpha-1} e^{-x}\,\mathrm{d}x$$
>
> 1. $\operatorname{Tau}(1) = 1$
> 2. $\operatorname{Tau}\left(\dfrac{1}{2}\right) = \sqrt{\pi}$
> 3. $\operatorname{Tau}(\alpha+1) = \alpha \operatorname{Tau}(\alpha)$

章节习题与 1000 题错题整理见题库。
