---
title: 二重积分
subject: 高等数学
chapter: 二重积分
date: 2026-08-30
tags: [二重积分]
excerpt: 二重积分性质、对称性与轮换对称性、换元法与雅可比行列式。
---

## 二重积分的性质

1. $\displaystyle\iint_D 1\,\mathrm{d}\sigma = A$，其中 $A$ 为区域 $D$ 的面积；
2. 可积函数必有界；
3. 线性；
4. 可加性；
5. 保号性；
6. 估值定理：

$$mA \le \iint_D f(x,y)\,\mathrm{d}\sigma \le MA$$

7. 中值定理：

$$\iint_D f(x,y)\,\mathrm{d}\sigma = f(\xi, \eta)\,A$$

## 普通对称性与轮换对称性

### 普通对称性

当被积函数 $f(x,y)$ 满足：

- $f(x,y) = \pm f(-x, y)$，则其关于 $y$ 轴对称；
- $f(x,y) = \pm f(x, -y)$，则其关于 $x$ 轴对称；
- $f(x,y) = \pm f(y, x)$，则其关于对角线对称；
- $f(x,y) = \pm f(-x, -y)$，则其关于原点对称。

如果 $f(x,y)$ 表现为上述几种对称性，我们就可以通过适当的操作将求整个区域 $D$ 上的积分变为只需求 $D$ 的部分区域上的积分，或直接让部分对应区域的积分抵消。

| 区域 D 关于… | 函数满足 | 结论 |
|---|---|---|
| $y$ 轴对称 | $f(-x,y) = -f(x,y)$ | $I = 0$ |
| $y$ 轴对称 | $f(-x,y) = f(x,y)$ | $I = 2\iint_{D_右} f$ |
| $x$ 轴对称 | $f(x,-y) = -f(x,y)$ | $I = 0$ |
| $x$ 轴对称 | $f(x,-y) = f(x,y)$ | $I = 2\iint_{D_上} f$ |
| $y=x$ 对称 | $f(y,x) = -f(x,y)$ | $I = 0$ |
| $y=x$ 对称 | $f(y,x) = f(x,y)$ | $I = 2\iint_{D_半} f$ |
| 原点对称 | $f(-x,-y) = -f(x,y)$ | $I = 0$ |
| 原点对称 | $f(-x,-y) = f(x,y)$ | $I = 2\iint_{D_半} f$ |

### 轮换对称性

在直角坐标系下，若把 $x$ 与 $y$ 对调后，<mark>区域 $D$</mark> 不变（即区域 $D$ 关于 $x = y$ 对称），则有：

$$\iint_D f(x,y)\,\mathrm{d}\sigma = \iint_D f(y,x)\,\mathrm{d}\sigma$$

此时我们可以将求解 $\displaystyle\iint_D f(x,y)\,\mathrm{d}\sigma$ 变为求解 $\dfrac{1}{2}\left(\displaystyle\iint_D f(y,x)\,\mathrm{d}\sigma + \iint_D f(x,y)\,\mathrm{d}\sigma\right)$。

## 换元法

令 $x = x(u,v),\ y = y(u,v)$，则有：

$$\iint_{D_{xy}} f(x,y)\,\mathrm{d}x\,\mathrm{d}y = \iint_{D_{uv}} f(x(u,v), y(u,v))\, |J|\,\mathrm{d}u\,\mathrm{d}v$$

其中：

$$|J| = \left|\frac{\partial(x,y)}{\partial(u,v)}\right| = \begin{vmatrix} \dfrac{\partial x}{\partial u} & \dfrac{\partial x}{\partial v}\\[2mm] \dfrac{\partial y}{\partial u} & \dfrac{\partial y}{\partial v}\end{vmatrix}$$

特别地，将直角坐标系转化为极坐标系时，令 $x = r\cos\theta,\ y = r\sin\theta$，有 $|J| = r$。
