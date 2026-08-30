---
title: 无穷级数
subject: 高等数学
chapter: 无穷级数
date: 2026-08-30
tags: [无穷级数]
excerpt: 正项级数判别法、交错级数、幂级数收敛域与和函数、函数展开、傅里叶级数。
---

## 级数敛散性的判别方法

### 收敛原则

### 比较判别法

> **重点**
>
> **$p$ 级数**：$\sum\limits_{n=1}^{\infty} \dfrac{1}{n^p}$ 叫做 $p$ 级数，有重要结论：$p \le 1$ 时发散；$p > 1$ 时收敛。与 $p$ 积分类似。

### 达朗贝尔判别法

给出一正项级数 $\sum\limits_{n=1}^{\infty} u_n$，如果 $\lim\limits_{n\to\infty} \dfrac{u_{n+1}}{u_n} = \rho$，那么：

- 若 $\rho < 1$，则 $\sum\limits_{n=1}^{\infty} u_n$ 收敛；
- 若 $\rho > 1$，则 $\sum\limits_{n=1}^{\infty} u_n$ 发散；
- 若 $\rho = 1$，则 $\sum\limits_{n=1}^{\infty} u_n$ 的敛散性无法判定，需要借助其他方法。

### 根值判别法

给出一正项级数 $\sum\limits_{n=1}^{\infty} u_n$，如果 $\lim\limits_{n\to\infty} \sqrt[n]{u_n} = \rho$，那么：

- 若 $\rho < 1$，则 $\sum\limits_{n=1}^{\infty} u_n$ 收敛；
- 若 $\rho > 1$，则 $\sum\limits_{n=1}^{\infty} u_n$ 发散；
- 若 $\rho = 1$，则 $\sum\limits_{n=1}^{\infty} u_n$ 的敛散性无法判定，需要借助其他方法。

### 积分判别法

设 $\sum\limits_{n=1}^{\infty} u_n$ 为正项级数，若存在 $[1, +\infty)$ 上单调减少的非负连续函数 $f(x)$，使得 $u_n = f(n)$，则级数 $\sum\limits_{n=1}^{\infty} u_n$ 与反常积分 $\displaystyle\int_1^{+\infty} f(x)\,\mathrm{d}x$ 的敛散性相同。

## 交错级数及其敛散性判别

莱布尼茨判别法：给出一交错级数 $\sum\limits_{n=1}^{\infty} (-1)^{n-1} u_n$，$u_n > 0, n = 1, 2, \cdots$，若 $\{u_n\}$ **单调不增**，且 $\lim\limits_{n\to\infty} u_n = 0$，则该级数收敛。

## 任意项级数及其敛散性判别

> **定义（绝对收敛与条件收敛）**
>
> 1. 设 $\sum\limits_{n=1}^{\infty} u_n$ 为任意项级数，若 $\sum\limits_{n=1}^{\infty} |u_n|$ 收敛，则称 $\sum\limits_{n=1}^{\infty} u_n$ **绝对收敛**；
> 2. 设 $\sum\limits_{n=1}^{\infty} u_n$ 为任意项级数，若 $\sum\limits_{n=1}^{\infty} u_n$ 收敛，但 $\sum\limits_{n=1}^{\infty} |u_n|$ 发散，则称 $\sum\limits_{n=1}^{\infty} u_n$ **条件收敛**。

> **推论（性质）**
>
> 1. 若 $\sum u_n, \sum v_n$ 均绝对收敛，则 $\sum (u_n \pm v_n)$ 绝对收敛；
> 2. 若 $\sum u_n$ 绝对收敛，$\sum v_n$ 条件收敛，则 $\sum (u_n \pm v_n)$ 条件收敛；
> 3. 若交错级数 $\sum (-1)^{n-1} u_n\ (u_n > 0)$ 条件收敛，则 $\sum u_{2n-1}$ 和 $\sum -u_{2n}$，即全体正项构成的级数和全体负项构成的级数都发散；
> 4. 交错 $p$ 级数 $\sum (-1)^{n-1}\dfrac{1}{n^p}$：$p > 1$ 绝对收敛，$0 < p \le 1$ 条件收敛。

## 幂级数及其收敛域

幂级数的一般形式为：

$$\sum_{n=0}^{\infty} a_n (x - x_0)^n = a_0 + a_1(x - x_0) + a_2(x - x_0)^2 + \cdots + a_n(x - x_0)^n + \cdots$$

### 阿贝尔定理

当幂级数 $\sum\limits_{n=0}^{\infty} a_n x^n$ 在点 $x = x_1\ (x_1 \neq 0)$ 处收敛时，对于满足条件 $|x| < |x_1|$ 的一切 $x$，幂级数绝对收敛；当幂级数在 $x = x_2\ (x_2 \neq 0)$ 处发散时，对于满足 $|x| > |x_2|$ 的一切 $x$，幂级数发散。

### 收敛半径

若 $R \ge 0$ 满足条件：$|x| < R$ 时 $\sum\limits_{n=0}^{\infty} a_n x^n$ 绝对收敛，$|x| > R$ 时发散，则称 $R$ 为幂级数的收敛半径，区间 $(-R, R)$ 称为其收敛区间。

> **提示**
>
> 对于一般函数项级数的收敛域，其可能不是对称区间，因此也没有收敛半径的概念。

> **重点**
>
> 若已知 $\sum\limits_{n=0}^{\infty} a_n (x - x_0)^n$ 在某点 $x_1\ (x_1 \neq x_0)$ 的敛散性，确定收敛半径可分为三种情况：
>
> 1. 若在 $x_1$ 处收敛，则收敛半径 $R \ge |x_1 - x_0|$；
> 2. 若在 $x_1$ 处发散，则收敛半径 $R \le |x_1 - x_0|$；
> 3. *若在 $x_1$ 处条件收敛，则收敛半径 $R = |x_1 - x_0|$*。

### 收敛域的求法

**(1) 对于不缺项幂级数 $\sum\limits_{n=0}^{\infty} a_n x^n$**：

若 $\lim\limits_{n\to\infty} \left|\dfrac{a_{n+1}}{a_n}\right| = \rho$ 或 $\lim\limits_{n\to\infty} \sqrt[n]{|a_n|} = \rho$，则收敛半径

$$R = \begin{cases} \dfrac{1}{\rho} & \rho \neq 0, \rho \neq +\infty\\ +\infty & \rho = 0\\ 0 & \rho = +\infty \end{cases}$$

区间 $(-R, R)$ 为收敛区间，单独考察其在 $x = \pm R$ 处的敛散性就可以确定完整的收敛域。

**(2) 对于缺项幂级数或一般函数项级数 $\sum u_n(x)$**：

1. 加绝对值，写成 $\sum |u_n(x)|$；
2. 使用正项级数的比值（或根值）判别法，令 $\lim\limits_{n\to\infty} \left|\dfrac{u_{n+1}(x)}{u_n(x)}\right|$ 或 $\lim\limits_{n\to\infty} \sqrt[n]{|u_n(x)|} < 1$，求出收敛区间 $(a, b)$；
3. 单独讨论 $x = a, x = b$ 时的收敛性，从而确定收敛域。

*上述两个办法是充分但非必要的*，即当 $\sum\limits_{n=0}^{\infty} a_n x^n$ 的收敛半径存在时，极限 $\lim\limits_{n\to\infty} \left|\dfrac{a_{n+1}}{a_n}\right|$ 或 $\lim\limits_{n\to\infty} \sqrt[n]{|a_n|}$ 可能不存在。

> **推论**
>
> - 对级数提出或乘以因式 $(x - x_0)^k$，或者作平移等，收敛半径不变。
> - 对级数逐项求导，收敛半径不变，收敛域可能缩小。
> - 对级数逐项积分，收敛半径不变，收敛域可能扩大。
>
> **说明**
>
> - 级数的收敛半径由其系数 $a_n$ 决定，级数整体乘以一个固定的多项式并不会改变系数的增长速度，因此收敛半径不变。
> - 求导会让系数 $a_n$ 变成 $n a_n$，增长速度略微加快，但根据根值判别法：
>   $$\lim_{n\to\infty} \sup\left((n a_n)^{1/n}\right) = \lim_{n\to\infty} \sup\left(n^{1/n} (a_n)^{1/n}\right) = \lim_{n\to\infty} \sup\left((a_n)^{1/n}\right) \quad \left(\lim_{n\to\infty} n^{1/n} = 1\right)$$
>   因此收敛半径不变，但在 $x = R$ 处，由于系数乘以 $n$，原本条件收敛的级数可能因此变得发散，如级数 $\sum \dfrac{x^n}{n^2}$ 在 $x = 1$ 处收敛，但求导后 $\sum \dfrac{x^{n-1}}{n}$ 在 $x = 1$ 处发散，因此收敛域缩小。
> - 积分是求导的逆运算，因此积分可能使级数的收敛域扩大。

## 幂级数求和函数

*在收敛域上*，记 $S(x) = \sum\limits_{n=1}^{\infty} u_n(x)$，并称 $S(x)$ 为 $\sum\limits_{n=1}^{\infty} u_n(x)$ 的**和函数**。

### 运算法则

- 线性乘加：$p\sum\limits_{n=0}^{\infty} a_n x^n \pm q\sum\limits_{n=0}^{\infty} b_n x^n = \sum\limits_{n=0}^{\infty} (p a_n \pm q b_n) x^n$，$|x| < R = \min\{R_a, R_b\}$；
- 乘积：$\sum\limits_{n=0}^{\infty} a_n x^n \cdot \sum\limits_{n=0}^{\infty} b_n x^n = \sum\limits_{n=0}^{\infty} \left(\sum\limits_{i=0}^{n} a_i b_{n-i}\right) x^n$，$|x| < R = \min\{R_a, R_b\}$。

### 性质

- **幂级数** $\sum\limits_{n=0}^{\infty} a_n x^n$ 的和函数 $S(x)$ 在其收敛域 $I$ 上必连续；
- 幂级数的和函数在其收敛域 $I$ 上可积，积分后的幂级数与原级数有相同的收敛半径，但收敛域可能扩大；
- 幂级数的和函数在其收敛区间 $(-R, R)$ 内可导，求导后的幂级数与原级数有相同的收敛半径，但收敛域可能缩小。

> **注意**
>
> 细心的同学可能会发现，前两条性质的适用范围都是收敛域 $I$，第三条的适用范围却是收敛区间 $(-R, R)$，这是因为即使原级数在端点处收敛，其和函数也可能不可导。

### 重要展开式

下给出一些重要的和函数及其对应的幂级数展开式，和前面的泰勒展开式（麦克劳林展开式）基本是一样的：

| 和函数 | 幂级数 | 收敛域 |
|---|---|---|
| $e^x$ | $\sum\limits_{n=0}^{\infty} \dfrac{x^n}{n!} = 1 + x + \dfrac{x^2}{2} + \cdots$ | $(-\infty, +\infty)$ |
| $\sin x$ | $\sum\limits_{n=0}^{\infty} (-1)^n \dfrac{x^{2n+1}}{(2n+1)!} = x - \dfrac{x^3}{3!} + \dfrac{x^5}{5!} - \cdots$ | $(-\infty, +\infty)$ |
| $\cos x$ | $\sum\limits_{n=0}^{\infty} (-1)^n \dfrac{x^{2n}}{(2n)!} = 1 - \dfrac{x^2}{2!} + \dfrac{x^4}{4!} - \cdots$ | $(-\infty, +\infty)$ |
| $\dfrac{1}{1-x}$ | $\sum\limits_{n=0}^{\infty} x^n = 1 + x + x^2 + \cdots$ | $(-1, 1)$ |
| $\dfrac{1}{1+x}$ | $\sum\limits_{n=0}^{\infty} (-1)^n x^n = 1 - x + x^2 - \cdots$ | $(-1, 1)$ |
| $\ln(1+x)$ | $\sum\limits_{n=1}^{\infty} (-1)^{n-1} \dfrac{x^n}{n} = x - \dfrac{x^2}{2} + \dfrac{x^3}{3} - \cdots$ | $(-1, 1]$ |
| $\arctan x$ | $\sum\limits_{n=0}^{\infty} (-1)^n \dfrac{x^{2n+1}}{2n+1} = x - \dfrac{x^3}{3} + \dfrac{x^5}{5} - \cdots$ | $[-1, 1]$ |
| $(1+x)^\alpha$ | $1 + \sum\limits_{n=1}^{\infty} \dfrac{\alpha(\alpha-1)\cdots(\alpha-n+1)}{n!}x^n$ | 视 $\alpha$ 而定 |
| $\dfrac{1}{(1+x)^2}$ | $\sum\limits_{n=0}^{\infty} (-1)^n (n+1)x^n = 1 - 2x + 3x^2 - \cdots$ | $(-1, 1)$ |

其中 $(1+x)^\alpha$ 的收敛域：$\alpha \le -1$ 时为 $(-1, 1)$；$-1 < \alpha < 0$ 时为 $(-1, 1]$；$\alpha > 0$ 且 $\alpha \notin \mathbb{N}_+$ 时为 $[-1, 1]$；$\alpha \in \mathbb{N}_+$ 时为 $(-\infty, +\infty)$。

幂级数求和函数与函数展开成幂级数的典型题目见题库。

## 函数展开成幂级数

利用泰勒展开式：

$$f(x) = f(x_0) + f'(x_0)(x - x_0) + \frac{f''(x_0)}{2!}(x - x_0)^2 + \cdots + \frac{f^{(n)}(x_0)}{n!}(x - x_0)^n + \cdots$$

实际做题时，可以通过已知的幂级数展开式，通过变量代换、四则运算、逐项求导、逐项积分、待定系数等方法得到函数的展开式，避免复杂的逐个计算高阶导数。

## 傅里叶级数

**傅里叶系数**：设函数 $f(x)$ 是周期为 $2l$ 的周期函数，且在 $[-l, l]$ 上可积，则称下面两式为 $f(x)$ 的以 $2l$ 为周期的傅里叶系数：

$$a_n = \frac{1}{l}\int_{-l}^{l} f(x)\cos\frac{n\pi}{l}x\,\mathrm{d}x \quad (n = 0, 1, 2, \cdots)$$

$$b_n = \frac{1}{l}\int_{-l}^{l} f(x)\sin\frac{n\pi}{l}x\,\mathrm{d}x \quad (n = 1, 2, \cdots)$$

称下式为 $f(x)$ 的以 $2l$ 为周期的傅里叶级数：

$$f(x) \sim \frac{a_0}{2} + \sum_{n=1}^{\infty}\left(a_n\cos\frac{n\pi}{l}x + b_n\sin\frac{n\pi}{l}x\right) = S(x)$$

### 狄利克雷收敛定理

设函数 $f(x)$ 是以 $2l$ 为周期的可积函数，如果在 $[-l, l]$ 上 $f(x)$ 满足：

1. 连续或只有有限个第一类间断点；
2. 至多只有有限个极值点。

则 $f(x)$ 的傅里叶级数在 $[-l, l]$ 上处处收敛。记其和函数为 $S(x)$，则：

$$S(x) = \begin{cases} f(x) & x\text{ 为连续点}\\ \dfrac{f(x-0) + f(x+0)}{2} & x\text{ 为间断点}\\ \dfrac{f(-l+0) + f(l-0)}{2} & x = \pm l \end{cases}$$

一言以蔽之：$S(x)$ 收敛于点的"（左极限 + 右极限）/2"。

### 正弦级数和余弦级数

- 当 $f(x)$ 为奇函数时，其展开式是正弦级数：
  $$f(x) \sim \sum_{n=1}^{\infty} b_n \sin\frac{n\pi}{l}x, \quad b_n = \frac{2}{l}\int_0^l f(x)\sin\frac{n\pi}{l}x\,\mathrm{d}x \quad (n = 1, 2, 3, \cdots)$$
- 当 $f(x)$ 为偶函数时，其展开式是余弦级数：
  $$f(x) \sim \frac{a_0}{2} + \sum_{n=1}^{\infty} a_n \cos\frac{n\pi}{l}x, \quad a_n = \frac{2}{l}\int_0^l f(x)\cos\frac{n\pi}{l}x\,\mathrm{d}x \quad (n = 0, 1, 2, \cdots)$$

### 周期奇延拓和周期偶延拓

若 $f(x)$ 是定义在 $[0, l]$ 上的函数，首先用周期延拓，使其扩展为定义在 $(-\infty, +\infty)$ 上的周期函数 $F(x)$，得到 $F(x)$ 的傅里叶展开式后，再将自变量限制在 $[0, l]$ 上，就得到 $f(x)$ 在 $[0, l]$ 上的傅里叶级数展开式。

- **周期奇延拓**：设 $f(x)$ 定义在 $[0, l]$ 上，令
  $$F(x) = \begin{cases} f(x) & 0 < x \le l\\ -f(-x) & -l \le x < 0\\ 0 & x = 0\end{cases}$$
  再令 $F(x)$ 为以 $2l$ 为周期的周期函数。
- **周期偶延拓**：设 $f(x)$ 定义在 $[0, l]$ 上，令
  $$F(x) = \begin{cases} f(x) & 0 \le x \le l\\ f(-x) & -l \le x < 0\end{cases}$$
  再令 $F(x)$ 为以 $2l$ 为周期的周期函数。
