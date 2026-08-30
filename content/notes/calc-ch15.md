---
title: 微分方程
subject: 高等数学
chapter: 微分方程
date: 2026-08-30
tags: [微分方程]
excerpt: 一阶方程五种类型、可降阶方程、高阶常系数线性方程、特解设法与欧拉方程。
---

## 微分方程的概念

> **定义（微分方程相关概念）**
>
> 1. **通解**：微分方程的解中含有的独立常数的个数等于微分方程的阶数。
> 2. **阶数**：微分方程中未知函数导数的最高阶数。
> 3. **线性与非线性**：
>    - 线性：方程中未知函数及其各阶导数都是一次幂，且没有乘积、复合等项，标准形式为 $a_n(x)y^{(n)} + a_{n-1}(x)y^{(n-1)} + \cdots + a_0 y = f(x)$；
>    - 非线性：例如 $y' + y^2 = 0,\ yy' = 1,\ \sin y = x$ 等。
> 4. **齐次与非齐次**（仅对线性方程有意义）：齐次——自由项 $f(x) = 0$；非齐次——自由项 $f(x) \neq 0$。
> 5. **常系数与变系数**（仅对线性方程有意义）：常系数——所有系数都为常数；变系数——至少有一个系数依赖于 $x$。

## 微分方程的求解

### 可分离变量型微分方程

1. 直接可分离：

$$\frac{\mathrm{d}y}{\mathrm{d}x} = f(x)g(y) \Longrightarrow \frac{1}{g(y)}\,\mathrm{d}y = f(x)\,\mathrm{d}x \Longrightarrow \int \frac{1}{g(y)}\,\mathrm{d}y = \int f(x)\,\mathrm{d}x$$

2. 换元后可分离：

$$\frac{\mathrm{d}y}{\mathrm{d}x} = f(ax + by + c) \Longrightarrow \frac{\mathrm{d}u}{\mathrm{d}x} = a + b\frac{\mathrm{d}y}{\mathrm{d}x} = a + b f(u), \quad u = ax + by + c$$

### 齐次型微分方程

$$\frac{\mathrm{d}y}{\mathrm{d}x} = \varphi\left(\frac{y}{x}\right) \Longrightarrow \frac{\mathrm{d}u}{\varphi(u) - u} = \frac{\mathrm{d}x}{x}, \quad u = \frac{y}{x}$$

### 一阶线性微分方程

形如 $y' + p(x)y = q(x)$ 的方程叫做一阶线性微分方程，其中 $p(x)$ 和 $q(x)$ 是已知的连续函数，其通解公式为：

$$y = e^{-\int p(x)\,\mathrm{d}x} \cdot \left[\int e^{\int p(x)\,\mathrm{d}x} \cdot q(x)\,\mathrm{d}x + C\right]$$

> **证明**
>
> 方程两边同时乘以 $e^{\int p(x)\,\mathrm{d}x}$，得到：
>
> $$e^{\int p(x)\,\mathrm{d}x} \cdot y' + e^{\int p(x)\,\mathrm{d}x} \cdot p(x) \cdot y = e^{\int p(x)\,\mathrm{d}x} \cdot q(x)$$
>
> $$\left[e^{\int p(x)\,\mathrm{d}x} \cdot y\right]' = e^{\int p(x)\,\mathrm{d}x} \cdot q(x)$$
>
> $$e^{\int p(x)\,\mathrm{d}x} \cdot y = \int e^{\int p(x)\,\mathrm{d}x} \cdot q(x)\,\mathrm{d}x + C$$
>
> $$y = e^{-\int p(x)\,\mathrm{d}x} \cdot \left[\int e^{\int p(x)\,\mathrm{d}x} \cdot q(x)\,\mathrm{d}x + C\right]$$

> **提示**
>
> 第一步似乎让人一头雾水：为什么要平白无故地乘以 $e^{\int p(x)\,\mathrm{d}x}$ 呢？事实上，这个想法来源于**积分因子法**：我们希望将方程两边乘上一个适当的函数 $\mu(x)$，使得左端成为 $(\mu y)'$ 的形式。顺着这个思路：
>
> $$(\mu y)' = \mu y' + \mu' y = \mu (y' + py) \Longrightarrow \mu' = \mu p$$

这个方程 $\mu' = \mu p$ 的一个特解为 $\mu(x) = e^{\int p(x)\,\mathrm{d}x}$。这就是待补全的积分因子。本质上是构造一个恰当的积分因子，将非恰当微分方程转化为恰当微分方程。

### 伯努利方程

形如

$$y' + p(x)y = q(x)y^n \quad (n \neq 0, 1)$$

的微分方程叫做伯努利方程。解法为：

$$\begin{aligned}
y' + p(x)y &= q(x)y^n\\
y^{-n}y' + p(x)y^{1-n} &= q(x)\\
\frac{\mathrm{d}z}{\mathrm{d}x} &= (1-n)y^{-n}\frac{\mathrm{d}y}{\mathrm{d}x} \quad (z = y^{1-n})\\
\frac{1}{1-n}\frac{\mathrm{d}z}{\mathrm{d}x} + p(x)z &= q(x)
\end{aligned}$$

### 二阶可降阶微分方程

1. **$y'' = f(x, y')$ 型**（方程中不显含未知函数 $y$）：令 $y' = p,\ y'' = p'$，则原方程变为 $\dfrac{\mathrm{d}p}{\mathrm{d}x} = f(x, p)$。若求得通解为 $p = \varphi(x, C_1)$，则原方程的通解为 $y = \displaystyle\int \varphi(x, C_1)\,\mathrm{d}x + C_2$。
2. **$y'' = f(y, y')$ 型**（方程中不显含自变量 $x$）：令 $y' = p,\ y'' = \dfrac{\mathrm{d}p}{\mathrm{d}x} = \dfrac{\mathrm{d}p}{\mathrm{d}y}\cdot p$，则原方程变为一阶方程 $p\dfrac{\mathrm{d}p}{\mathrm{d}y} = f(y, p)$。若求得其通解为 $p = \varphi(y, C_1)$，则 $\dfrac{\mathrm{d}y}{\mathrm{d}x} = \varphi(y, C_1)$，得 $\displaystyle\int \frac{\mathrm{d}y}{\varphi(y, C_1)} = x + C_2$。
3. **$y'' = f(y')$ 型**（既不显含 $x$ 也不显含 $y$）：按第一种情况处理。

### 全微分方程

若函数 $P(x,y), Q(x,y)$ 在单连通区域 $D$ 上有一阶连续偏导数，且在 $D$ 内满足 $\dfrac{\partial Q}{\partial x} = \dfrac{\partial P}{\partial y}$，则 $P\,\mathrm{d}x + Q\,\mathrm{d}y$ 是某二元函数的全微分。若一阶微分方程写成

$$P(x,y)\,\mathrm{d}x + Q(x,y)\,\mathrm{d}y = 0$$

则称该式为全微分方程。求解全微分方程时，根据定义逆推即可。

> **说明**
>
> 从 $\dfrac{\partial Q}{\partial x} = \dfrac{\partial P}{\partial y}$ 到 $P\,\mathrm{d}x + Q\,\mathrm{d}y = 0$ 的原因是：若 $P\,\mathrm{d}x + Q\,\mathrm{d}y$ 是某二元函数 $u_{xy}$ 的全微分，则 $\mathrm{d}u_{xy} = u_x\,\mathrm{d}x + u_y\,\mathrm{d}y = P\,\mathrm{d}x + Q\,\mathrm{d}y \Longrightarrow P = u_x, Q = u_y$；若 $u$ 具有二阶连续偏导数，由混合偏导数与求导次序无关得 $\dfrac{\partial P}{\partial y} = \dfrac{\partial u_x}{\partial y} = \dfrac{\partial u_y}{\partial x} = \dfrac{\partial Q}{\partial x}$。

## 高阶线性微分方程的求解

### 二阶常系数齐次线性微分方程

$$y'' + py' + qy = 0$$

若 $y_1(x), y_2(x)$ 是该方程的两个解，且 $\dfrac{y_1(x)}{y_2(x)} \neq C$，则称其为该方程的两个线性无关的解，且 $y = C_1 y_1 + C_2 y_2$ 为该方程的通解。

> **重点**
>
> 对于 $y'' + py' + qy = 0$，其对应的特征方程为 $r^2 + pr + q = 0$：
>
> 1. 若 $p^2 - 4q > 0$，设 $r_1, r_2$ 为两个不等实根，则通解为 $y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$；
> 2. 若 $p^2 - 4q = 0$，则 $r_1 = r_2 = r$，通解为 $y = (C_1 + C_2 x)e^{rx}$；
> 3. 若 $p^2 - 4q < 0$，设 $\alpha \pm \beta i$ 为一对共轭复根，则通解为 $y = e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$。

### 二阶常系数非齐次线性微分方程

$$y'' + py' + qy = f(x)$$

$f(x)$ 为已知的连续函数，叫做**自由项**。

- 若 $y_1(x)$ 是 $y'' + py' + qy = f_1(x)$ 的解，$y_2(x)$ 是 $y'' + py' + qy = f_2(x)$ 的解，则 $y_1(x) + y_2(x)$ 是 $y'' + py' + qy = f_1(x) + f_2(x)$ 的解；
- 若 $y_1, y_2$ 都是 $y'' + py' + qy = f(x)$ 的特解，则 $y_1 - y_2$ 是对应齐次方程的解。

对于考研，需要掌握两种情况下的解法（设 $P_n(x)$ 为 $x$ 的 $n$ 次多项式）：

1. 当自由项 $f(x) = P_n(x)e^{\alpha x}$ 时，特解要设为 $y = e^{\alpha x}Q_n(x)x^k$，其中 $Q_n(x)$ 为 $x$ 的 $n$ 次多项式，
   $$k = \begin{cases} 0 & \alpha\text{ 不是特征根}\\ 1 & \alpha\text{ 是特征根}\\ 2 & \alpha\text{ 是二重特征根}\end{cases}$$
2. 当自由项 $f(x) = e^{\alpha x}\left[P_m(x)\cos\beta x + P_n(x)\sin\beta x\right]$ 时，特解要设为
   $$y = e^{\alpha x}\left[Q_l^{(1)}(x)\cos\beta x + Q_l^{(2)}(x)\sin\beta x\right]x^k$$
   其中 $l = \max(m,n)$，$Q_l^{(1)}, Q_l^{(2)}$ 分别为 $x$ 的两个不同的 $l$ 次多项式，
   $$k = \begin{cases} 0 & \alpha \pm \beta i\text{ 不是特征根}\\ 1 & \alpha \pm \beta i\text{ 是特征根}\end{cases}$$

若 $y(x) = C_1 y_1(x) + C_2 y_2(x)$ 是 $y'' + py' + qy = 0$ 的通解，$y^*(x)$ 是 $y'' + py' + qy = f(x)$ 的一个特解，则 $y(x) + y^*(x)$ 是 $y'' + py' + qy = f(x)$ 的通解。

### $n\ (n>2)$ 阶常系数齐次线性微分方程

- 若 $r$ 为单实根，写 $Ce^{rx}$；
- 若 $r$ 为 $k$ 重实根，写 $(C_1 + C_2 x + \cdots + C_k x^{k-1})e^{rx}$；
- 若 $r$ 为单复根 $\alpha \pm \beta i$，写 $e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$；
- 若 $r$ 为二重复根 $\alpha \pm \beta i$，写 $e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x + C_3 x\cos\beta x + C_4 x\sin\beta x)$。

### 欧拉方程

形如 $x^2y'' + pxy' + qy = f(x)$ 的方程称为欧拉方程，其中 $p, q$ 为常数，$f(x)$ 为已知的连续函数。解法为：

1. 当 $x > 0$ 时，令 $x = e^t$，则 $t = \ln x,\ \dfrac{\mathrm{d}t}{\mathrm{d}x} = \dfrac{1}{x}$，于是
   $$\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{1}{x}\frac{\mathrm{d}y}{\mathrm{d}t}, \qquad \frac{\mathrm{d}^2y}{\mathrm{d}x^2} = -\frac{1}{x^2}\frac{\mathrm{d}y}{\mathrm{d}t} + \frac{1}{x^2}\frac{\mathrm{d}^2y}{\mathrm{d}t^2}$$
   方程化为 $\dfrac{\mathrm{d}^2y}{\mathrm{d}t^2} + (p-1)\dfrac{\mathrm{d}y}{\mathrm{d}t} + qy = f(e^t)$；
2. 当 $x < 0$ 时，令 $x = -e^t$，同理。

## 微分方程的应用

微分方程的几何应用与物理应用见题库（切线法线截距、注水旋转曲面、弧长等于斜率的曲线等）与 1000 题错题整理。
