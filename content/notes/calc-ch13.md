---
title: 多元函数微分学
subject: 高等数学
chapter: 多元函数微分学
date: 2026-08-30
tags: [多元函数微分学]
excerpt: 二重极限、偏导数、可微性判别、全微分形式不变性、隐函数定理与极值判别。
---

## 二重极限

> **提示**
>
> 判断多元函数极限 $\lim\limits_{\substack{x\to 0\\ y\to 0}} \dfrac{P(x,y)}{Q(x,y)}$ 是否存在：
>
> 1. **看齐次性**。先判断分子分母的阶数：分子 $\sim r^m$、分母 $\sim r^n$，其中 $r = \sqrt{x^2+y^2}$：
>    - $m > n \Longrightarrow$ 极限大概率存在且为 0
>    - $m = n \Longrightarrow$ 极限可能存在
>    - $m < n \Longrightarrow$ 极限大概率不存在
> 2. **看是否能联系角度**。尝试将极限写成 $f(x,y) = r^k \cdot g(\theta)$ 的形式：
>    - 若 $k > 0$，$g(\theta)$ 有界 $\Longrightarrow f(x,y) = 0$
>    - 若 $k = 0 \Longrightarrow$ 看 $g(\theta)$ 是否为常数
>    - 若 $k < 0 \Longrightarrow$ 极限大概率不存在
> 3. **选择路径**。当怀疑极限<mark>不存在</mark>时，可以优先尝试几类路径：$y = kx$、$y = x^2$、$x = 0$ 或 $y = 0$。需要注意：哪怕选择的路径都给出相同的值，也不能说明极限存在。
> 4. **累次极限法**。累次极限 $\lim\limits_{x\to 0}\lim\limits_{y\to 0} f(x,y)$ 与 $\lim\limits_{y\to 0}\lim\limits_{x\to 0} f(x,y)$：累次极限存在且相等是重极限存在的必要条件。
>
> 例：对 $I_2 = \lim\limits_{\substack{x\to 0\\ y\to 0}} \dfrac{x|y|}{x^2+y^2}$（分子分母同阶），作极坐标 $x = r\cos\theta,\ y = r\sin\theta$，则 $\dfrac{x|y|}{x^2+y^2} = \cos\theta\,|\sin\theta|$ 与 $\theta$ 有关，故极限不存在。

**偏导数**：

$$\left.\frac{\partial f}{\partial x}\right|_{\substack{x=x_0\\ y=y_0}} = f'_x(x_0, y_0) = \lim_{\Delta x\to 0} \frac{f(x_0 + \Delta x, y_0) - f(x_0, y_0)}{\Delta x}$$

$$\left.\frac{\partial f}{\partial y}\right|_{\substack{x=x_0\\ y=y_0}} = f'_y(x_0, y_0) = \lim_{\Delta y\to 0} \frac{f(x_0, y_0 + \Delta y) - f(x_0, y_0)}{\Delta y}$$

$$\frac{\partial^2 z}{\partial x \partial y} = \frac{\partial}{\partial y}\left(\frac{\partial z}{\partial x}\right) = f''_{xy}(x,y), \qquad \frac{\partial^2 z}{\partial y \partial x} = \frac{\partial}{\partial x}\left(\frac{\partial z}{\partial y}\right) = f''_{yx}(x,y)$$

> **说明**
>
> 二阶偏导的顺序至今仍不统一：分析学上习惯规定 $\dfrac{\partial^2 z}{\partial x \partial y} = \dfrac{\partial}{\partial y}\left(\dfrac{\partial z}{\partial x}\right)$；工程学上习惯规定 $\dfrac{\partial^2 z}{\partial x \partial y} = \dfrac{\partial}{\partial x}\left(\dfrac{\partial z}{\partial y}\right)$。直接展开成算子形式 $\dfrac{\partial}{\partial x}\left(\dfrac{\partial z}{\partial y}\right)$ 可以避免歧义。

## 可微

设函数 $z = f(x,y)$ 在点 $(x,y)$ 的某邻域内有定义，若全增量

$$\Delta z = f(x + \Delta x, y + \Delta y) - f(x,y)$$

可表示为

$$\Delta z = A\Delta x + B\Delta y + o(\rho), \quad \rho = \sqrt{(\Delta x)^2 + (\Delta y)^2}$$

其中 $A, B$ 仅与点 $(x,y)$ 有关，而与 $\Delta x, \Delta y$ 无关，且当 $\Delta x \to 0, \Delta y \to 0$ 时 $o(\rho)$ 为 $\rho$ 的高阶无穷小，则称函数在点 $(x,y)$ 处**可微**，并称 $A\Delta x + B\Delta y$ 为全微分，记为

$$\mathrm{d}z = A\,\mathrm{d}x + B\,\mathrm{d}y$$

可微 $\Longrightarrow$ 偏导数存在，且 $A = \dfrac{\partial z}{\partial x}, B = \dfrac{\partial z}{\partial y}$；某点偏导数存在且连续 $\Longrightarrow$ 函数在该点可微。

> **提示**
>
> 可微的判别步骤：
> 1. 写出全增量 $\Delta z = f(x_0+\Delta x, y_0+\Delta y) - f(x_0, y_0)$；
> 2. 写出线性增量 $A\Delta x + B\Delta y = f'_x(x_0,y_0)\Delta x + f'_y(x_0,y_0)\Delta y$；
> 3. 作极限 $\lim\limits_{\substack{\Delta x\to 0\\ \Delta y\to 0}} \dfrac{\Delta z - (A\Delta x + B\Delta y)}{\sqrt{(\Delta x)^2 + (\Delta y)^2}}$。若极限等于 0，则 $z = f(x,y)$ 在该点可微，否则不可微。

> **重点**
>
> - 偏导数存在 $\not\Rightarrow$ 连续，因为偏导数只看 $x$ 和 $y$ 两个方向，而连续要看所有方向；
> - 偏导数存在 $\not\Rightarrow$ 可微，偏导数存在，还需判断误差和距离的极限是否为零；
> - 连续 $\not\Rightarrow$ 偏导数存在，正如一元函数中连续不能推出导数存在；
> - <mark>只有可微是真正的"强条件"，可以推出其他一切性质</mark>。

## 多元函数微分法则

### 链式法则

见题库（$z = f(e^x\sin y, x^2+y^2)$ 的混合偏导、由 $f(x, e^x) = x + e^x$ 求 $f'_y$）。

### 一阶全微分的形式不变性

本段总假设讨论的函数满足对应的可微条件。

设 $z = f(x,y)$ 为二元函数，当 $x$ 和 $y$ 为自变量时，有：

$$\mathrm{d}z = \frac{\partial z}{\partial x}\,\mathrm{d}x + \frac{\partial z}{\partial y}\,\mathrm{d}y$$

而当 $x, y$ 为中间变量，如 $x = x(u,v), y = y(u,v)$ 时，有 $\mathrm{d}x = \dfrac{\partial x}{\partial u}\mathrm{d}u + \dfrac{\partial x}{\partial v}\mathrm{d}v$ 等，代入可以验证：

$$\mathrm{d}z = \frac{\partial z}{\partial u}\,\mathrm{d}u + \frac{\partial z}{\partial v}\,\mathrm{d}v = \frac{\partial z}{\partial x}\,\mathrm{d}x + \frac{\partial z}{\partial y}\,\mathrm{d}y$$

这便是**一阶全微分的形式不变性**。需要注意的是：<mark>高阶全微分不具备这个性质</mark>。

### 隐函数存在定理

以下内容来自陈纪修版《数学分析》第三版下册。

> **定理（隐函数存在定理）**
>
> 若 $n+1$ 元函数 $F(x_1, x_2, \cdots, x_n, y)$ 满足条件：
>
> 1. $F(x_1^0, x_2^0, \cdots, x_n^0, y^0) = 0$；
> 2. 在闭长方体 $D = \{(x,y) \mid |y - y^0| \le b,\ |x_i - x_i^0| \le a_i,\ i = 1,2,\cdots,n\}$ 上函数 $F$ 连续，且具有连续偏导数 $F_y, F_{x_i}\ (i = 1,2,\cdots,n)$；
> 3. $F_y(x_1^0, x_2^0, \cdots, x_n^0, y^0) \neq 0$。
>
> 那么：
>
> 1. 在点 $(x_1^0, \cdots, x_n^0, y^0)$ 附近可以从函数方程 $F(x_1, \cdots, x_n, y) = 0$ 唯一确定隐函数 $y = f(x_1, \cdots, x_n)$，满足 $F \equiv 0$ 以及 $y^0 = f(x_1^0, \cdots, x_n^0)$；
> 2. 隐函数在该邻域上连续；
> 3. 隐函数在该邻域上有连续的偏导数，且
>
> $$\frac{\partial y}{\partial x_i} = - \frac{F_{x_i}(x_1, \cdots, x_n, y)}{F_y(x_1, \cdots, x_n, y)}, \quad i = 1, 2, \cdots, n$$

具体计算中，对于由方程 $F(x,y) = 0$ 确定的隐函数，有 $\dfrac{\mathrm{d}y}{\mathrm{d}x} = - \dfrac{F'_x(x,y)}{F'_y(x,y)}$；对于由方程 $F(x,y,z) = 0$ 确定的隐函数，有 $\dfrac{\partial z}{\partial x} = - \dfrac{F'_x(x,y,z)}{F'_z(x,y,z)}$。

### 中值定理

> **说明**
>
> 这节原本内容为二元函数的拉格朗日定理，在此扩展为中值定理。

> **定理（中值定理）**
>
> 设二元函数 $f(x,y)$ 在凸区域 $D \subset \mathbb{R}^2$ 上可微，则对于 $D$ 内任意两点 $(x_0, y_0)$ 和 $(x_0+\Delta x, y_0+\Delta y)$，至少存在一个 $\theta \in (0,1)$，使得：
>
> $$f(x_0 + \Delta x, y_0 + \Delta y) = f(x_0, y_0) + \Delta x\, f'_x(x_0 + \theta\Delta x, y_0 + \theta\Delta y) + \Delta y\, f'_y(x_0 + \theta\Delta x, y_0 + \theta\Delta y)$$

## 多元函数的极值与最值

### 无条件极值

1. **二元函数取极值的必要条件**：设 $z = f(x,y)$ 在点 $(x_0, y_0)$ 处取极值，且一阶偏导数存在，则 $f'_x(x_0,y_0) = 0,\ f'_y(x_0,y_0) = 0$。另：偏导数不存在的点也有可能是极值点，类比一元函数中的绝对值函数。
2. **二元函数取极值的充分条件**：设 $f(x,y)$ 在 $(x_0,y_0)$ 的某邻域内连续且有一阶及二阶连续偏导数，且 $f'_x = f'_y = 0$。记

$$A = f''_{xx}(x_0,y_0), \quad B = f''_{xy}(x_0,y_0), \quad C = f''_{yy}(x_0,y_0), \quad \Delta = AC - B^2$$

   则：

   - $\Delta > 0$：$A < 0 \Longrightarrow$ 极大值；$A > 0 \Longrightarrow$ 极小值
   - $\Delta < 0 \Longrightarrow$ 非极值
   - $\Delta = 0 \Longrightarrow$ 另谋他法

> **提示**
>
> 不难发现：$\Delta = \begin{vmatrix} A & B\\ B & C\end{vmatrix}$，其正是 Hessian 矩阵的行列式。考虑 $f(x,y)$ 在 $(x_0,y_0)$ 处的二阶泰勒展开：
>
> $$f(x_0+h, y_0+k) - f(x_0,y_0) \approx \frac{1}{2}(Ah^2 + 2Bhk + Ck^2) = \frac{1}{2}\begin{pmatrix}h & k\end{pmatrix}\begin{pmatrix}A & B\\ B & C\end{pmatrix}\begin{pmatrix}h\\ k\end{pmatrix}$$
>
> 最右端是关于增量 $(h,k)$ 的二次型：若二次型恒正，则 $(x_0,y_0)$ 为极小值点；恒负则为极大值点；可正可负即为鞍点；恒为零或半正半负则需进一步分析。
> - 正定：各阶顺序主子式 $> 0$，即 $A > 0$，$\det H = AC - B^2 > 0$
> - 负定：奇数阶顺序主子式 $< 0$，偶数阶 $> 0$，即 $A < 0$，$\det H > 0$
> - 不定：$\det H < 0$

### 条件最值与拉格朗日乘数法

求目标函数 $u = f(x,y,z)$ 在约束条件 $\begin{cases} \phi(x,y,z) = 0\\ \psi(x,y,z) = 0 \end{cases}$ 下的最值：

1. 构造辅助函数 $F(x,y,z,\lambda,\mu) = u + \lambda\phi + \mu\psi$；
2. 令：
   $$\begin{cases}
   F'_x = f'_x + \lambda\phi'_x + \mu\psi'_x\\
   F'_y = f'_y + \lambda\phi'_y + \mu\psi'_y\\
   F'_z = f'_z + \lambda\phi'_z + \mu\psi'_z\\
   F'_\lambda = \phi\\
   F'_\mu = \psi
   \end{cases}$$
3. 解上述方程组，得到备选点 $P_i$，求 $f(P_i)$，取其最大值为 $u_{\max}$，最小值为 $u_{\min}$。

> **注意**
>
> 对不封闭曲线使用拉格朗日乘数法时需要比较验证端点处的函数值。

### 最远（近）点的垂线原理

如果 $\Gamma$ 是光滑闭曲线，点 $Q$ 是 $\Gamma$ 外的一点，点 $P_1, P_2$ 分别是 $Q$ 到 $\Gamma$ 的最远点及最近点，则：$P_1Q, P_2Q$ 分别与点 $P_1, P_2$ 的切线垂直。

若光滑闭曲线 $\Gamma_1, \Gamma_2$ 不相交，点 $P_1, P_2$ 分别是它们之间的最远点及最近点，则：$P_1P_2$ 同时垂直于 $\Gamma_1, \Gamma_2$ 在这两个点处的切线。

### 有界闭区域上连续函数的最值问题

有界闭区域 $D$ 上的多元连续函数在 $D$ 上必有最大值和最小值：

1. 根据 $f'_x(x,y) = 0, f'_y(x,y) = 0$ 或不存在，求出 $D$ 内部的所有可疑点；
2. 用拉格朗日乘数法求出 $D$ 边界上的可疑点；
3. 比较可疑点的值，得到最大值和最小值。
