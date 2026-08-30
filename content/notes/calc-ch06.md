---
title: 一元函数微分学的应用（二）：中值定理、微分等式与微分不等式
subject: 高等数学
chapter: 中值定理、微分等式与不等式
date: 2026-08-30
tags: [中值定理、微分等式与不等式]
excerpt: 闭区间连续函数定理、费马/罗尔/拉格朗日/柯西/泰勒定理与辅助函数构造。
---

> **定理（有界与最值定理）**
>
> 设 $f(x)$ 在 $[a,b]$ 上连续，则 $m \le f(x) \le M$，其中 $m, M$ 为 $f(x)$ 在 $[a,b]$ 上的最小值和最大值。

> **定理（介值定理）**
>
> 设 $f(x)$ 在 $[a,b]$ 上连续，则当 $m \le \mu \le M$ 时，存在 $\xi \in [a,b]$，使得 $f(\xi) = \mu$。

> **定理（平均值定理）**
>
> 设 $f(x)$ 在 $[a,b]$ 上连续，当 $a < x_1 < x_2 < \cdots < x_n < b$ 时，在 $[x_1, x_n]$ 内至少存在一点 $\xi$，使得：
>
> $$f(\xi) = \frac{f(x_1) + f(x_2) + \cdots + f(x_n)}{n}$$

> **定理（零点定理）**
>
> 设 $f(x)$ 在 $[a,b]$ 上连续，当 $f(a) \cdot f(b) < 0$ 时，存在 $\xi \in (a,b)$ 使得 $f(\xi) = 0$。

> **定理（费马定理）**
>
> 设 $f(x)$ 在点 $x_0$ 处取极值且在该点可导，则 $f'(x_0) = 0$。

> **定理（罗尔定理）**
>
> 设 $f(x)$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导，且 $f(a) = f(b)$，则存在 $\xi \in (a,b)$，使得 $f'(\xi) = 0$。

罗尔定理的使用往往需要构造辅助函数：

- 乘积求导公式 $(uv)' = u'v + uv'$ 的逆用：
  - $\left[f^2(x)\right]' = 2f(x)f'(x)$，故见到 $f(x)f'(x)$，令 $F(x) = f^2(x)$
  - $\left[f(x) \cdot f'(x)\right]' = \left[f'(x)\right]^2 + f(x)f''(x)$，故见到 $\left[f'(x)\right]^2 + f(x)f''(x)$，令 $F(x) = f(x) \cdot f'(x)$
  - $\left[f(x)e^{\varphi(x)}\right]' = \left[f'(x) + f(x)\varphi'(x)\right]e^{\varphi(x)}$，故见到 $f'(x) + f(x)\varphi'(x)$，令 $F(x) = f(x)e^{\varphi(x)}$
- 商的求导公式 $(u/v)' = \dfrac{u'v - uv'}{v^2}$ 的逆用：
  - $\left[\dfrac{f(x)}{x}\right]' = \dfrac{f'(x)x - f(x)}{x^2}$，故见到 $f'(x)x - f(x)\ (x \neq 0)$，令 $F(x) = \dfrac{f(x)}{x}$
  - $\left[\dfrac{f'(x)}{f(x)}\right]' = \dfrac{f''(x)f(x) - \left[f'(x)\right]^2}{f(x)^2}$，故见到 $f''(x)f(x) - \left[f'(x)\right]^2$，令 $F(x) = \dfrac{f'(x)}{f(x)}$
  - $\left[\ln(f(x))\right]' = \dfrac{f'(x)}{f(x)}$，故 $\left[\ln(f(x))\right]'' = \left[\dfrac{f'(x)}{f(x)}\right]'$，故见到 $f''(x)f(x) - \left[f'(x)\right]^2\ (f(x) > 0)$，亦可考虑令 $F(x) = \ln(f(x))$

> **定理（拉格朗日中值定理）**
>
> 设 $f(x)$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导，则存在 $\xi \in (a,b)$，使得 $f'(\xi) = \dfrac{f(b) - f(a)}{b - a}$。

> **定理（柯西中值定理）**
>
> 设 $f(x), g(x)$ 在 $[a,b]$ 上连续，在 $(a,b)$ 内可导，且 $g'(x) \neq 0$，则存在 $\xi \in (a,b)$，使得：
>
> $$\frac{f(b) - f(a)}{g(b) - g(a)} = \frac{f'(\xi)}{g'(\xi)}$$

> **定理（泰勒公式）**
>
> 带拉格朗日余项的 $n$ 阶泰勒公式：设 $f(x)$ 在点 $x_0$ 的某邻域内 $n+1$ 阶导数存在，则对该邻域内的任意点 $x$，有：
>
> $$f(x) = f(x_0) + f'(x_0)(x - x_0) + \cdots + \frac{1}{n!}f^{(n)}(x_0)(x - x_0)^n + \frac{1}{(n+1)!}f^{(n+1)}(\xi)(x - x_0)^{n+1}$$
>
> 其中 $\xi$ 介于 $x_0$ 与 $x$ 之间。

> **定理（罗尔定理的推论）**
>
> - 若 $f(x)$ 在区间 $I$ 上 $n$ 阶可导，且 $f^{(n)}(x) \neq 0$，即 $f^{(n)}(x) = 0$ 无实根，则 $f(x) = 0$ 至多有 $n$ 个根；
> - 若 $f(x)$ 在区间 $I$ 上 $n$ 阶可导，且 $f^{(n)}(x) = 0$ 至多有 $k$ 个实根，则 $f(x) = 0$ 至多有 $k+n$ 个根。
