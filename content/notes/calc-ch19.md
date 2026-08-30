---
title: 附录：积分技巧与专题
subject: 高等数学
chapter: 附录
date: 2026-08-30
tags: [附录]
excerpt: 欧拉替换法、古鲁金定理、倒代换、帮手理论、区间再现、点火公式与三角函数专题。
---

此章节用于记录一些技巧与定理。

## 欧拉替换法

当遇到形式为

$$\int G\left(x, \sqrt{ax^2 + bx + c}\right)\mathrm{d}x$$

的不定积分，若难以通过三角换元等操作化简其形式，则可以使用欧拉替换法。核心思路为：令 $\sqrt{ax^2 + bx + c} =$ 某个有关 $t$ 的有理式，然后两边平方，解出 $x$ 和 $\mathrm{d}x$。欧拉替换法分为三种情况：

### 第一种情况：$a > 0$

令 $\sqrt{ax^2 + bx + c} = t - \sqrt{a}\,x$，得到 $bx + c = t^2 - 2\sqrt{a}\,tx$，则：

$$x = \frac{t^2 - c}{2\sqrt{a}\,t + b}, \quad \sqrt{ax^2 + bx + c} = \frac{\sqrt{a}\,t^2 + bt + c\sqrt{a}}{2\sqrt{a}\,t + b}, \quad \mathrm{d}x = \frac{2\left(\sqrt{a}\,t^2 + bt + c\sqrt{a}\right)}{\left(2\sqrt{a}\,t + b\right)^2}\,\mathrm{d}t$$

例：计算 $\displaystyle\int \frac{1}{\sqrt{ax^2 + bx + c}}\,\mathrm{d}x$，将替换结果代入得：

$$\int \frac{1}{\sqrt{ax^2 + bx + c}}\,\mathrm{d}x = \int \frac{2}{2\sqrt{a}\,t + b}\,\mathrm{d}t = \frac{1}{\sqrt{a}}\ln\left[2\sqrt{a\left(ax^2 + bx + c\right)} + 2ax + b\right] + C$$

### 第二种情况：$c > 0$

令 $\sqrt{ax^2 + bx + c} = xt + \sqrt{c}$，得到 $ax + b = xt^2 + 2\sqrt{c}\,t$，则：

$$x = \frac{2\sqrt{c}\,t - b}{a - t^2}, \quad \sqrt{ax^2 + bx + c} = \frac{\sqrt{c}\,t^2 - bt + a\sqrt{c}}{a - t^2}, \quad \mathrm{d}x = \frac{2\left(\sqrt{c}\,t^2 - bt + a\sqrt{c}\right)}{\left(a - t^2\right)^2}\,\mathrm{d}t$$

例：计算 $\displaystyle\int \frac{1}{x + \sqrt{x^2 - x + 1}}\,\mathrm{d}x$。令 $\sqrt{x^2 - x + 1} = tx - 1$，得 $x = \dfrac{2t-1}{t^2 - 1}$，$\mathrm{d}x = -\dfrac{2(t^2 - t + 1)}{(t^2 - 1)^2}\,\mathrm{d}t$，$x + \sqrt{x^2 - x + 1} = \dfrac{t}{t-1}$。因此原积分变为：

$$\int \frac{-2t^2 + 2t - 2}{t(t-1)(t+1)^2}\,\mathrm{d}t = \int \left[\frac{2}{t} - \frac{1}{2}\cdot\frac{1}{t-1} - \frac{3}{2}\cdot\frac{1}{t+1} - \frac{3}{(t+1)^2}\right]\mathrm{d}t$$

$$= \frac{3}{t+1} + 2\ln|t| - \frac{1}{2}\ln|t-1| - \frac{3}{2}\ln|t+1| + C$$

将 $t = \dfrac{\sqrt{x^2 - x + 1} + 1}{x}$ 代回即得最终结果。

### 第三种情况：$ax^2 + bx + c = a(x - \lambda)(x - \mu)$

令 $\sqrt{ax^2 + bx + c} = t(x - \lambda)$，得 $t^2 = \dfrac{a(x - \mu)}{x - \lambda}$，则：

$$x = \frac{\lambda t^2 - a\mu}{t^2 - a}, \quad \sqrt{ax^2 + bx + c} = \frac{a(\lambda - \mu)t}{t^2 - a}, \quad \mathrm{d}x = \frac{2a(\lambda - \mu)t}{\left(t^2 - a\right)^2}\,\mathrm{d}t$$

例：计算 $\displaystyle\int \frac{1}{x + \sqrt{x^2 - 5x + 6}}\,\mathrm{d}x$。对应公式取 $a = 1, \lambda = 2, \mu = 3$，即 $t = \sqrt{\dfrac{x-3}{x-2}}$，代入后部分分式分解：

$$\int \frac{2t}{(t-1)(2t-3)(t+1)^2}\,\mathrm{d}t = \frac{2}{5}\cdot\frac{1}{t+1} + \frac{1}{50}\ln(t+1) - \frac{1}{2}\ln(t-1) + \frac{12}{25}\ln(2t-3) + C$$

将 $t$ 代回即得最终结果。

### 欧拉替换法的几何解释

欧拉替换的本质是对圆锥曲线 $y^2 = ax^2 + bx + c$ 进行有理参数化。曲线上通过一个已知点（或渐近方向）作直线族，直线与曲线的另一交点坐标即为 $t$ 的有理函数。

- **第一种情况 $a > 0$（利用渐近方向）**：双曲线 $y^2 = ax^2 + bx + c$ 有渐近线 $y = \pm\sqrt{a}\,x$。令 $y = t - \sqrt{a}\,x$，即作一族与渐近线平行的直线，每条直线与双曲线恰交于一点。

  > 〔原文此处为 Typst 矢量示意图：直线族平行于渐近线 $y = -\sqrt{a}\,x$〕

- **第二种情况 $c > 0$（利用 $y$ 轴上的定点）**：过曲线与 $y$ 轴交点 $(0, \sqrt{c})$ 作直线族 $y = tx + \sqrt{c}$。

  > 〔原文此处为 Typst 矢量示意图：过 $(0, \sqrt{c})$ 的直线族〕

- **第三种情况（有实根）**：判别式非负，过曲线与 $x$ 轴交点 $(\lambda, 0)$ 作直线族 $y = t(x - \lambda)$。

  > 〔原文此处为 Typst 矢量示意图：过 $(\lambda, 0)$ 的直线族〕

### 总结

三种欧拉替换的几何本质是统一的：在圆锥曲线 $y^2 = ax^2 + bx + c$ 上找到一个"已知点"（有理坐标点或无穷远渐近方向），然后过该点作直线族，利用*一条直线与二次曲线至多两个交点*的性质，由已知的一个交点推出另一个交点的有理参数表达式。

| 情况 | 已知点/方向 | 直线族 |
|---|---|---|
| 第一种：$a > 0$ | 渐近方向 $y \approx -\sqrt{a}\,x$ | $y = t - \sqrt{a}\,x$ |
| 第二种：$c > 0$ | $y$ 轴上的点 $(0, \sqrt{c})$ | $y = tx + \sqrt{c}$ |
| 第三种：有实根 | $x$ 轴上的点 $(\lambda, 0)$ | $y = t(x - \lambda)$ |

## 古鲁金定理

古鲁金定理常用来计算某些旋转体的体积和表面积。其核心思想是：

一个平面图形绕其所在平面的一条<mark>不穿过它的轴</mark>旋转，所扫过的体积，就等于这个图形的重心所走过的路程乘以它自身的面积；所形成的旋转体的表面积，就等于这个图形的重心所走过的路程乘以它自身的弧长。

### 形心

形心是指几何图形的分布中心，当物体密度为常数时，其质心与几何形状的形心重合，而在均匀重力场条件下，质心又与中心重合。

- 对于平面薄板：设区域 $D$ 的面积为 $A$，则其形心坐标 $(\bar{x}, \bar{y})$ 满足：

$$\bar{x} = \frac{1}{A}\iint_D x\,\mathrm{d}A, \qquad \bar{y} = \frac{1}{A}\iint_D y\,\mathrm{d}A$$

- 对于平面曲线：设曲线弧长为 $s$，其形心坐标 $(\bar{x}, \bar{y})$ 满足：

$$\bar{x} = \frac{1}{s}\int_L x\,\mathrm{d}s, \qquad \bar{y} = \frac{1}{s}\int_L y\,\mathrm{d}s$$

### 古鲁金第一定理

用于求旋转体体积：

$$V = A \cdot (2\pi r)$$

其中 $V$ 是旋转体的体积，$A$ 是旋转图形的面积，$r$ 是旋转图形的重心到旋转轴的距离。

### 古鲁金第二定理

用于求旋转体表面积：

$$S = L \cdot (2\pi r)$$

其中 $S$ 是旋转体的表面积，$L$ 是旋转图形的弧长，$r$ 是旋转图形的重心到旋转轴的距离。

## 微分方程与线性代数

看到"特征方程"这个概念，很容易联想到线性代数中的"特征值"和"特征向量"。事实上，微分方程与线性代数的联系十分紧密，了解其中的联系有助于理解各个方法、公式的内涵，避免死记硬背。

### 函数空间与微分算子

考虑所有光滑函数（无穷可微）构成的集合 $C^{(\infty)}(\mathbb{R})$，在普通加法和数乘下满足加法封闭、数乘封闭、有零元、加法交换律结合律，因此其是一个无限维的线性空间。在此空间上，定义**微分算子** $D$：

$$D = \frac{\mathrm{d}}{\mathrm{d}x}, \qquad D^n = \frac{\mathrm{d}^n}{\mathrm{d}x^n}$$

算子 $D$ 是一个线性算子：$D(c_1 f_1 + c_2 f_2) = c_1 D(f_1) + c_2 D(f_2)$。于是可以定义线性微分算子：

$$P(D) = a_n D^n + \cdots + a_1 D + a_0 I$$

其中 $I$ 为恒等算子，即 $I(f) = f$。

### 解空间

$D$ 和 $P(D)$ 都是线性算子，各自对应函数空间上的一个线性变换，自然也各自对应一个矩阵。例如 $y' + p(x)y = 0$ 的解为 $y = Ce^{-\int p(x)\,\mathrm{d}x}$；$y'' + p(x)y' + q(x)y = 0$（两不等实根 $\lambda_1, \lambda_2$）的解为 $y = C_1 e^{\lambda_1 x} + C_2 e^{\lambda_2 x}$。

事实上，有：**对于 $n$ 阶齐次线性微分方程 $P_n(D)y = 0$，所有解构成一个 $n$ 维线性子空间**。

### 特征多项式与指数函数

为什么解的形式总是 $e$ 的指数函数？由特征值的定义 $A\vec{x} = \lambda\vec{x} \iff D(f) = \lambda f \iff D(e^{\lambda x}) = \lambda e^{\lambda x}$，于是对于线性微分算子 $P(D)$，同样有 $P(D)\left[e^{\lambda x}\right] = P(\lambda)\left[e^{\lambda x}\right]$，因此 $e^{\lambda x}$ 是算子 $P(D)$ 的特征向量，特征值为 $\lambda$。

要使 $P(D)y = 0$，只需 $P(\lambda) = 0$，而 $P$ 正好就是微分方程对应的特征方程，因此特征方程的根 $\lambda$ 就对应了微分方程成立的解 $e^{\lambda x}$。当特征方程有 $n$ 个互异实根时，微分方程的解即为 $e^{\lambda_i x}\ (i = 1, 2, \cdots, n)$ 的线性组合。

更直观地，对于二阶常系数齐次微分方程 $y'' + py' + qy = 0$，令 $y_1 = y, y_2 = y'$，则原方程可写作：

$$\begin{pmatrix}y_1\\ y_2\end{pmatrix}' = \underbrace{\begin{pmatrix}0 & 1\\ -q & -p\end{pmatrix}}_{A}\begin{pmatrix}y_1\\ y_2\end{pmatrix}$$

矩阵 $A$ 的特征方程 $\det(A - rI) = r^2 + pr + q = 0$，这正是微分方程的特征方程。

当出现重根时，解中会出现 $xe^{\lambda x}$：

- **极限角度**：若 $r_1 \neq r_2$，当 $r_2 \to r_1$ 时
  $$\lim_{r_2 \to r_1} \frac{e^{r_2 x} - e^{r_1 x}}{r_2 - r_1} = \left.\frac{\partial}{\partial r}e^{rx}\right|_{r = r_1} = xe^{r_1 x}$$
  所以 $xe^{rx}$ 是第二个解的"自然极限"。
- **线性代数解释**：重根时特征值 $r$ 的代数重数为 2，但几何重数仅为 1——特征向量"不够用"。矩阵不能对角化，只能化为 Jordan 标准形，矩阵指数 $e^{At}$ 中出现 $te^{rt}$ 项，对应解中就多出了 $x$ 因子。

当特征方程出现共轭复根 $\lambda = \alpha \pm i\beta$（$\beta > 0$）时，$e^{(\alpha + i\beta)x}$ 与 $e^{(\alpha - i\beta)x}$ 是复值解。利用欧拉公式取实部与虚部可得两个线性无关的实解：$e^{\alpha x}\cos\beta x$ 与 $e^{\alpha x}\sin\beta x$，因此通解为 $y = e^{\alpha x}(C_1\cos\beta x + C_2\sin\beta x)$。

### 非齐次方程

非齐次微分方程 $P(D)y = f(x)$ 的通解 = 对应齐次方程的通解 + 非齐次方程的一个特解。考研只需掌握两种情况：

1. 多项式指数型右端 $f(x) = P_n(x)e^{\alpha x}$，设特解形式为 $y = e^{\alpha x}Q_n(x)x^k$；
2. 三角函数指数型右端 $f(x) = e^{\alpha x}\left[P_m(x)\cos\beta x + P_n(x)\sin\beta x\right]$，设特解形式为 $y = e^{\alpha x}\left[Q_l^{(1)}(x)\cos\beta x + Q_l^{(2)}(x)\sin\beta x\right]x^k$。

两种形式都出现了 $x^k$ 项。这是因为当右端函数本身已经是齐次方程的解时，必须乘上 $x$ 的幂次，才能得到非零的特解，此时 $k$ 等于特征根 $\lambda$（或复根 $\alpha + i\beta$）在特征多项式中的重数。

### 欧拉方程

一般的欧拉方程形式为：

$$x^n y^{(n)} + a_{n-1}x^{n-1}y^{(n-1)} + \cdots + a_1 xy' + a_0 y = f(x)$$

作变换 $x = e^t$，此时有 $xD_x = D_t,\ x^2\dfrac{\mathrm{d}^2}{\mathrm{d}x^2} = \dfrac{\mathrm{d}^2}{\mathrm{d}t^2} - D_t, \cdots$。这样原方程就变成了有关 $t$ 的常系数线性微分方程，本质上是将微分算子 $xD_x$ 映射为 $D_t$，利用了指数函数与幂函数的联系：$x^k = e^{kt}$。

## 倒代换

当积分式中出现一些特定形式的函数时，使用倒代换往往能取得不错的效果。具体表述为：

设 $I = \displaystyle\int_0^{+\infty} f(x)w(x)\,\mathrm{d}x$，当：

- $f(x)$ 满足**倒代换反演性质**：$f(x) + f(1/x) = c$，其中 $c$ 为常数；
- $w(x)$ 是**自反权函数**，即满足：$w(x) = \dfrac{1}{x^2}w(1/x)$。

此时有：

$$I = \int_0^{+\infty} f(x)w(x)\,\mathrm{d}x \overset{t = 1/x}{=} \int_0^{+\infty} \left(c - f(t)\right)w(t)\,\mathrm{d}t = \int_0^{+\infty} c\,w(t)\,\mathrm{d}t - I$$

因此：

$$I = \frac{c}{2}\int_0^{+\infty} w(x)\,\mathrm{d}x$$

常见的满足上述两个条件之一的具体为以下三种函数及其变式：

- 反正切函数：$\arctan x$
- 对数函数：$\ln x$
- 回文多项式函数的倒数：$\dfrac{1}{P(x)}$（回文多项式指 $P(x)$ 的系数序列首尾对称）

因为这三类函数具有以下优美的性质：

$$\arctan x + \arctan\frac{1}{x} = \frac{\pi}{2}\ (x > 0)\ \text{或}\ -\frac{\pi}{2}\ (x < 0); \qquad \ln x + \ln\frac{1}{x} = 0; \qquad \frac{1}{P(1/x)} = \frac{x^n}{P(x)}$$

典型例子（详见题库与原文推导）：

1. $\displaystyle\int_0^{+\infty} \frac{\ln x}{1 + x^2}\,\mathrm{d}x \overset{t = 1/x}{=} -I \Rightarrow I = 0$；
2. $\displaystyle\int_0^{+\infty} \frac{\arctan x}{1 + x + x^2}\,\mathrm{d}x = \dfrac{\sqrt{3}}{18}\pi^2$；
3. $\displaystyle\int_0^{+\infty} \frac{\arctan x}{x\left(1 + \ln^2 x\right)}\,\mathrm{d}x = \dfrac{\pi^2}{4}$。

## "帮手"理论、区间再现与构造对称区间

用于定积分比大小的"帮手"理论、区间再现与构造对称区间三大技巧，完整推导与例题见题库（calc-ch19-q1 至 calc-ch19-q4）。核心结论：

- **区间再现**：$I = \displaystyle\int_a^b f(x)\,\mathrm{d}x = \displaystyle\int_a^b f(a+b-x)\,\mathrm{d}x \Rightarrow I = \dfrac{1}{2}\int_a^b \left[f(x) + f(a+b-x)\right]\mathrm{d}x$；
- **构造对称区间**：$t = x - \dfrac{a+b}{2}$，$L = \dfrac{b-a}{2}$，则 $I = \displaystyle\int_0^L \left[g(t) + g(-t)\right]\mathrm{d}t$，$g(t) = f\left(t + \dfrac{a+b}{2}\right)$；两者经过变换可化为完全相同的式子；
- **"帮手"引理**：设 $f$ 在 $[a,b]$ 上关于中点 $m$ 中心反对称（$f(m+u) + f(m-u) = 0$），且 $f(x) \ge 0,\ x \in [a, m]$；设 $g$ 在 $[a,b]$ 上单调不增，则 $\displaystyle\int_a^b f(x)g(x)\,\mathrm{d}x \ge 0$。若 $f(x) \le 0,\ x \in [a, m]$，不等号取反。

## 微积分专题之三角函数

### 常用微分式与积分式

| 微分式 | 微分式 |
|---|---|
| $\mathrm{d}(\tan\theta) = \sec^2\theta\,\mathrm{d}\theta$ | $\mathrm{d}(-\cot\theta) = \csc^2\theta\,\mathrm{d}\theta$ |
| $\mathrm{d}(\sec\theta) = \tan\theta\sec\theta\,\mathrm{d}\theta$ | $\mathrm{d}(\csc\theta) = -\csc\theta\cot\theta\,\mathrm{d}\theta$ |
| $\mathrm{d}(\tan\theta - \theta) = \tan^2\theta\,\mathrm{d}\theta$ | $\mathrm{d}(\theta - \cot\theta) = \cot^2\theta\,\mathrm{d}\theta$ |
| $\mathrm{d}\left(\dfrac{\sin\theta}{\sin\theta + \cos\theta}\right) = \dfrac{\mathrm{d}\theta}{(\cos\theta + \sin\theta)^2}$ | $\mathrm{d}\left(\dfrac{-\cos\theta}{\sin\theta + \cos\theta}\right) = \dfrac{\mathrm{d}\theta}{(\cos\theta + \sin\theta)^2}$ |
| $\mathrm{d}\left(\dfrac{\sin\theta - \cos\theta}{\sin\theta + \cos\theta}\right) = \dfrac{2\,\mathrm{d}\theta}{(\cos\theta + \sin\theta)^2}$ | $\mathrm{d}(\ln(\sin\theta + \cos\theta)) = \dfrac{\cos\theta - \sin\theta}{\sin\theta + \cos\theta}\,\mathrm{d}\theta$ |
| $\mathrm{d}(\ln(a\sin\theta + b\cos\theta)) = \dfrac{a\cos\theta - b\sin\theta}{a\sin\theta + b\cos\theta}\,\mathrm{d}\theta$ | $\mathrm{d}\left(\tan\dfrac{\theta}{2}\right) = \dfrac{\mathrm{d}\theta}{1 + \cos\theta}$ |
| $\mathrm{d}\left(\cot\dfrac{\theta}{2}\right) = \dfrac{\mathrm{d}\theta}{\cos\theta - 1}$ | $\mathrm{d}\left(\tan\left(\dfrac{\pi}{4} + \dfrac{\theta}{2}\right)\right) = \sec\theta\,\mathrm{d}\theta$ |
| $\mathrm{d}(\ln(1 + \sin\theta)) = \dfrac{\cos\theta}{1 + \sin\theta}\,\mathrm{d}\theta$ | $\mathrm{d}(\ln(1 - \sin\theta)) = \dfrac{-\cos\theta}{1 - \sin\theta}\,\mathrm{d}\theta$ |
| $\mathrm{d}(\ln\tan\theta) = \dfrac{\mathrm{d}\theta}{\sin\theta\cos\theta}$ | $\mathrm{d}(\ln\sin\theta) = \cot\theta\,\mathrm{d}\theta,\ \ \mathrm{d}(\ln\cos\theta) = -\tan\theta\,\mathrm{d}\theta$ |

上述公式看着繁多，实际上依赖于下面几个方法：

- 同时出现 $\sin$ 和 $\cos$ 的平方，尝试分子分母同除 $\cos^2 x$：

$$\frac{1}{(\sin x + \cos x)^2} = \frac{1}{\cos^2 x}\cdot\frac{1}{(\tan x + 1)^2} = \sec^2 x \cdot \frac{1}{(\tan x + 1)^2}$$

  再利用 $\sec^2 x\,\mathrm{d}x = \mathrm{d}(\tan x)$ 即可。

- 分子是 $\sin$ 和 $\cos$ 的线性组合：设分子是"分母"和"分母导数"的线性组合：

$$\int \frac{\cos x}{\sin x + \cos x}\,\mathrm{d}x = \frac{1}{2}\int \frac{\sin x + \cos x}{\sin x + \cos x}\,\mathrm{d}x + \frac{1}{2}\int \frac{\cos x - \sin x}{\sin x + \cos x}\,\mathrm{d}x = \frac{1}{2}x + \frac{1}{2}\ln\left|\sin x + \cos x\right| + C$$

- 被积函数是三角有理式，尝试万能代换：

$$\text{Let } t = \tan\frac{x}{2},\quad \sin x = \frac{2t}{1+t^2},\quad \cos x = \frac{1-t^2}{1+t^2},\quad \mathrm{d}x = \frac{2}{1+t^2}\,\mathrm{d}t$$

将上式代入后，几乎可以百分百将三角有理式变为关于 $t$ 的有理函数积分，但是计算量大。

### 点火公式

也称 Wallis 公式、华里士公式。内容为：

> **定理（Wallis 公式）**
>
> $$\int_0^{\pi/2} \sin^n\theta\,\mathrm{d}\theta = \int_0^{\pi/2} \cos^n\theta\,\mathrm{d}\theta = \frac{(n-1)!!}{n!!} \cdot \left(\frac{\pi}{2}\right)^{(n+1) \bmod 2}$$

也即：$n$ 为偶数时，点火成功，需带上后面的 $\dfrac{\pi}{2}$，否则 $\dfrac{\pi}{2}$ 退化为 1。推导过程如下：

> **证明**
>
> $$\begin{aligned}
> I_n = \int_0^{\pi/2} \sin^n\theta\,\mathrm{d}\theta &= -\int_0^{\pi/2} \sin^{n-1}\theta\,\mathrm{d}(\cos\theta)\\
> &= -\cos\theta\sin^{n-1}\theta\Big|_0^{\pi/2} + \int_0^{\pi/2} \cos\theta \cdot (n-1)\sin^{n-2}\theta\cos\theta\,\mathrm{d}\theta\\
> &= (n-1)\int_0^{\pi/2} (1 - \sin^2\theta)\sin^{n-2}\theta\,\mathrm{d}\theta\\
> &= (n-1)\left(I_{n-2} - I_n\right)
> \end{aligned}$$
>
> $$I_n = \frac{n-1}{n}I_{n-2}, \quad I_0 = \frac{\pi}{2},\ I_1 = 1 \quad \Rightarrow \quad I_n = \frac{(n-1)!!}{n!!}\cdot\left(\frac{\pi}{2}\right)^{(n+1) \bmod 2} \quad \blacksquare$$

实际做题中，还可能碰见被积函数中同时出现 $\sin\theta$ 和 $\cos\theta$ 的形式 $\displaystyle\int_0^{\pi/2} \sin^m\theta\cos^n\theta\,\mathrm{d}\theta$，此时就需要用到下面的两个公式：

> **定理（Beta 公式）**
>
> - $\displaystyle\int_0^{\pi/2} \sin^m x\cos^n x\,\mathrm{d}x = \dfrac{(m-1)!!\,(n-1)!!}{(m+n)!!}\,K$。此为"点火公式"的推广：当 $m, n$ 均为偶数时，点火成功，$K = \dfrac{\pi}{2}$，否则 $K = 1$。
> - $\displaystyle\int_0^{\pi/2} \sin^m x\cos^n x\,\mathrm{d}x = \dfrac{\operatorname{Tau}\left(\frac{m+1}{2}\right)\operatorname{Tau}\left(\frac{n+1}{2}\right)}{2\operatorname{Tau}\left(\frac{m+n+2}{2}\right)}$，这是三角函数的 Beta 公式，其中 $\operatorname{Tau}$ 函数定义为：
>
> **推论（Tau 函数）**
>
> $$\operatorname{Tau}(\alpha) = \int_0^{+\infty} x^{\alpha-1} e^{-x}\,\mathrm{d}x, \qquad \operatorname{Tau}(1) = 1,\ \operatorname{Tau}\left(\tfrac{1}{2}\right) = \sqrt{\pi},\ \operatorname{Tau}(\alpha+1) = \alpha\operatorname{Tau}(\alpha)$$

> **证明**
>
> 推导很麻烦，只点出关键：令 $I_{m,n} = \displaystyle\int_0^{\pi/2} \sin^m x\cos^n x\,\mathrm{d}x$，则
>
> $$\text{Let } f(x) = \sin^{m-1}x\cos^{n+1}x, \quad f'(x) = (m-1)\sin^{m-2}x\cos^{n+2}x - (n+1)\sin^m x\cos^n x$$
>
> 由于 $f\left(\dfrac{\pi}{2}\right) - f(0) = 0$，$\displaystyle\int_0^{\pi/2} f'(x)\,\mathrm{d}x = (m-1)I_{m-2,n+2} - (n+1)I_{m,n}$。又 $\sin^{m-2}x\cos^{n+2}x = \sin^{m-2}x\cos^n x - \sin^m x\cos^n x$，即 $I_{m-2,n+2} = I_{m-2,n} - I_{m,n}$。接着不断递推就行了。

### 常用积分恒等式

- $\displaystyle\int_0^{\pi/2} f(\sin x)\,\mathrm{d}x = \int_0^{\pi/2} f(\cos x)\,\mathrm{d}x$

  > **证明**
  >
  > $$\int_0^{\pi/2} f(\sin x)\,\mathrm{d}x \overset{x = \frac{\pi}{2} - t}{=} \int_0^{\pi/2} f(\cos t)\,\mathrm{d}t$$

- $\displaystyle\int_0^{\pi} x f(\sin x)\,\mathrm{d}x = \pi\int_0^{\pi/2} f(\sin x)\,\mathrm{d}x = \dfrac{\pi}{2}\int_0^{\pi} f(\sin x)\,\mathrm{d}x$

  > **证明**
  >
  > $$\int_0^{\pi} xf(\sin x)\,\mathrm{d}x \overset{x = \pi - t}{=} \int_0^{\pi} \pi f(\sin t)\,\mathrm{d}t - \int_0^{\pi} tf(\sin t)\,\mathrm{d}t \Longrightarrow \int_0^{\pi} xf(\sin x)\,\mathrm{d}x = \frac{\pi}{2}\int_0^{\pi} f(\sin x)\,\mathrm{d}x$$
  >
  > 又
  > $$\int_0^{\pi} f(\sin x)\,\mathrm{d}x = \int_0^{\pi/2} \left(f(\sin x) + f(\cos x)\right)\mathrm{d}x = 2\int_0^{\pi/2} f(\sin x)\,\mathrm{d}x$$
  > 故 $\dfrac{\pi}{2}\displaystyle\int_0^{\pi} f(\sin x)\,\mathrm{d}x = \pi\int_0^{\pi/2} f(\sin x)\,\mathrm{d}x$。
