---
title: 积分
subject: 高等数学
chapter: 积分
date: 2026-08-30
tags: [积分]
excerpt: 原函数与定积分的存在性、定积分性质、变限积分求导、反常积分敛散性判别。
---

## 不定积分

> 典型例题见题库（分段函数的原函数）。

### 原函数（不定积分）存在定理

1. 连续函数 $f(x)$ 必有原函数 $F(x)$。
2. 含有第一类间断点和无穷间断点的函数 $f(x)$ 在包含该间断点的区间内必没有原函数 $F(x)$。
   - 由此也可以得出：可导函数 $F(x)$ 求导后的函数 $F'(x) = f(x)$ 不一定是连续函数，也可能有振荡间断点。

## 定积分

定积分可用求和的形式表示：

$$\int_a^b f(x)\,\mathrm{d}x = \lim_{n\to\infty} \sum_{i=1}^n f\left(a + \frac{b-a}{n}i\right) \frac{b-a}{n}$$

另外比较常见的是在区间 $[0,1]$ 内积分：

$$\int_0^1 f(x)\,\mathrm{d}x = \lim_{n\to\infty} \sum_{i=1}^n f\left(\frac{i}{n}\right) \frac{1}{n}$$

### 定积分存在定理

**定积分存在的充分条件**：

- 若 $f(x)$ 在 $[a,b]$ 上连续，则 $\displaystyle\int_a^b f(x)\,\mathrm{d}x$ 存在；
- 若 $f(x)$ 在 $[a,b]$ 上单调，则 $\displaystyle\int_a^b f(x)\,\mathrm{d}x$ 存在；
- 若 $f(x)$ 在 $[a,b]$ 上有界，且只有有限个间断点，则 $\displaystyle\int_a^b f(x)\,\mathrm{d}x$ 存在；
- 若 $f(x)$ 在 $[a,b]$ 上有有限个第一类间断点，则 $\displaystyle\int_a^b f(x)\,\mathrm{d}x$ 存在。

**定积分存在的必要条件**：

可积函数必有界，即若定积分 $\displaystyle\int_a^b f(x)\,\mathrm{d}x$ 存在，则 $f(x)$ 在 $[a,b]$ 上必有界。

> **重点**
>
> 总结：一个函数具备什么条件才有原函数？具备什么条件才可积？它们的关系是什么？
>
> | $f(x)$ 在 $[a,b]$ 上的性质 | 是否有原函数？ | 是否可积？ | 原因/反例 |
> |---|---|---|---|
> | 连续 | 是 | 是 | 基本定理 |
> | 有界且只有有限个第一类间断点 | 否 | 是 | 原函数若存在且可导，则其在每一点的左右导数必定相等而不会间断，而定积分是面积，有限个间断点不影响面积 |
> | 有无穷间断点 | 否 | 否 | 定积分要求函数必须有界 |
> | 有振荡间断点 | 可能有也可能没有 | 取决于是有界振荡还是无界振荡 | 如 $f(x)=\begin{cases}2x\cos\frac1x+\sin\frac1x & x\neq0\\ 0 & x=0\end{cases}$ 有原函数 $F(x)=x^2\cos\frac1x$，而 $g(x)=\begin{cases}\frac1x\sin\frac1x & x\neq0\\ 0 & x=0\end{cases}$ 无原函数 |

### 定积分的性质

1. 对 1 积分即为求区间长度
2. 线性
3. 区间可加（拆）性
4. 保号性
5. 估值定理：$m(b-a) \le \displaystyle\int_a^b f(x)\,\mathrm{d}x \le M(b-a)$
6. 中值定理：设 $f(x)$ 在区间 $[a,b]$ 上连续，则在 $[a,b]$ 上至少存在一点 $\xi$，使得

$$\int_a^b f(x)\,\mathrm{d}x = f(\xi)(b-a)$$

## 变限积分

### 变限积分的性质

1. **连续性**：函数 $f(x)$ 在 $I$ 上可积，则函数 $F(x) = \displaystyle\int_a^x f(t)\,\mathrm{d}t$ 在 $I$ 上连续。$F(x)$ 若存在，则其一定连续，而 $f(x)$ 存在，其不一定连续。
2. **可导性**：函数 $f(x)$ 在 $I$ 上连续，则函数 $F(x) = \displaystyle\int_a^x f(t)\,\mathrm{d}t$ 在 $I$ 上可导且 $F'(x) = f(x)$。
3. **间断点情况**：
   - 若 $x = x_0 \in I$ 是 $f(x)$ 唯一的跳跃间断点，则 $F(x) = \displaystyle\int_a^x f(t)\,\mathrm{d}t$ 在 $x_0$ 处不可导，且 $\begin{cases} F'_-(x_0) = \lim\limits_{x\to x_0^-} f(x)\\ F'_+(x_0) = \lim\limits_{x\to x_0^+} f(x) \end{cases}$
   - 若 $x = x_0 \in I$ 是 $f(x)$ 唯一的可去间断点，则 $F(x)$ 在 $x_0$ 处可导，且 $F'(x_0) = \lim\limits_{x\to x_0} f(x) \neq f(x_0)$。因为积分表示的是函数图像下的面积，单点的取值不影响面积，故积分会"自动填补可去间断"。

> **推论（变限积分的求导）**
>
> 1. 当积分下限为变量时，导函数的符号会发生改变：若 $F(x) = \displaystyle\int_x^a f(t)\,\mathrm{d}t$，则 $F'(x) = -f(x)$。
>
>    考虑较复杂的情况 $F(x) = \displaystyle\int_a^{\phi(x)} f(t)\,\mathrm{d}t$，根据导数的定义：
>
>    $$\begin{aligned}
>    F'(x) &= \lim_{\Delta x\to 0^+} \frac{F(x + \Delta x) - F(x)}{\Delta x}\\
>    &= \lim_{\Delta x\to 0^+} \frac{\int_a^{\phi(x+\Delta x)} f(t)\,\mathrm{d}t - \int_a^{\phi(x)} f(t)\,\mathrm{d}t}{\Delta x}\\
>    &= \lim_{\Delta x\to 0^+} \frac{\int_{\phi(x)}^{\phi(x+\Delta x)} f(t)\,\mathrm{d}t}{\Delta x}\\
>    &= f(\phi(x)) \cdot \lim_{\Delta x\to 0^+}\frac{\phi(x+\Delta x) - \phi(x)}{\Delta x}\\
>    &= f(\phi(x))\,\phi'(x)
>    \end{aligned}$$
>
> 2. 考虑更一般的情况 $F(x) = \displaystyle\int_{\psi(x)}^{\phi(x)} f(t)\,\mathrm{d}t$，与上面的推导一样，可以得到：
>
>    $$F'(x) = f(\phi(x))\phi'(x) - f(\psi(x))\,\psi'(x)$$
>
> 3. 微分形式：$\mathrm{d}\left(\displaystyle\int_a^x f(t)\,\mathrm{d}t\right) = f(x)\,\mathrm{d}x$。

## 反常积分

> **定义（反常积分）**
>
> 定积分存在有两个必要条件：一是积分区间有界，二是被积函数有界。如果破坏了积分区间的有限性，就引出无穷区间上的反常积分；如果破坏了被积函数的有界性，就引出无界函数的反常积分。

**无穷区间上的反常积分的概念与敛散性**（设 $F(x)$ 是 $f(x)$ 在相应区间上的一个原函数）：

- $\displaystyle\int_a^{+\infty} f(x)\,\mathrm{d}x = \lim_{x\to+\infty} F(x) - F(a)$
- $\displaystyle\int_{-\infty}^{b} f(x)\,\mathrm{d}x = F(b) - \lim_{x\to-\infty} F(x)$
- $\displaystyle\int_{-\infty}^{+\infty} f(x)\,\mathrm{d}x = \int_{-\infty}^{x_0} f(x)\,\mathrm{d}x + \int_{x_0}^{+\infty} f(x)\,\mathrm{d}x$，当右侧两个积分都收敛时，称反常积分收敛，否则称反常积分发散。

**无界函数的反常积分的概念与敛散性**（$x_0$ 为 $f(x)$ 的瑕点）：

- 若 $x = a$ 是唯一瑕点，则 $\displaystyle\int_a^b f(x)\,\mathrm{d}x = F(b) - \lim_{x\to a^+} F(x)$
- 若 $x = b$ 是唯一瑕点，则 $\displaystyle\int_a^b f(x)\,\mathrm{d}x = \lim_{x\to b^-} F(x) - F(a)$
- 若 $x = c \in (a,b)$ 是唯一瑕点，则 $\displaystyle\int_a^b f(x)\,\mathrm{d}x = \int_a^c f(x)\,\mathrm{d}x + \int_c^b f(x)\,\mathrm{d}x$，当右侧两个积分都收敛时，称反常积分收敛，否则称反常积分发散。

> **重点**
>
> 反常积分中，一般把 $\infty$ 和瑕点统称为奇点，在判别积分敛散性时，一个积分中只能有一个奇点，<mark>若出现两个及以上的奇点，需要拆分</mark>，对应上面的第三种情况。

### 反常积分敛散性的判别法

**无穷区间上的反常积分**——比较判别法：当 $0 \le f(x) \le g(x)$ 时，

- $\displaystyle\int_a^{+\infty} g(x)\,\mathrm{d}x$ 收敛 $\Longrightarrow \displaystyle\int_a^{+\infty} f(x)\,\mathrm{d}x$ 收敛；
- $\displaystyle\int_a^{+\infty} f(x)\,\mathrm{d}x$ 发散 $\Longrightarrow \displaystyle\int_a^{+\infty} g(x)\,\mathrm{d}x$ 发散。

更为常用的是比较判别法的极限形式：若 $\lim\limits_{x\to+\infty} \dfrac{f(x)}{g(x)} = \lambda$，则：

- 当 $\lambda \neq 0$ 且 $\lambda \neq \infty$ 时，$\displaystyle\int_a^{+\infty} f(x)\,\mathrm{d}x$ 与 $\displaystyle\int_a^{+\infty} g(x)\,\mathrm{d}x$ 有同样的敛散性；
- 当 $\lambda = 0$ 时，若 $\displaystyle\int_a^{+\infty} g(x)\,\mathrm{d}x$ 收敛，则 $\displaystyle\int_a^{+\infty} f(x)\,\mathrm{d}x$ 收敛；
- 当 $\lambda = \infty$ 时，若 $\displaystyle\int_a^{+\infty} g(x)\,\mathrm{d}x$ 发散，则 $\displaystyle\int_a^{+\infty} f(x)\,\mathrm{d}x$ 发散。

**无界函数的反常积分**：同样是比较判别法，且内容也几乎完全相同。

> **推论（重要结论）**
>
> 1. $\displaystyle\int_0^1 \frac{1}{x^p}\,\mathrm{d}x$：$p \ge 1$ 发散，$0 < p < 1$ 收敛。
> 2. $\displaystyle\int_a^{+\infty} \frac{1}{x^p}\,\mathrm{d}x$（$a > 0$）：$p > 1$ 收敛，$p \le 1$ 发散。
> 3. $\displaystyle\int_a^b \frac{1}{(x-a)^q}\,\mathrm{d}x$、$\displaystyle\int_a^b \frac{1}{(b-x)^q}\,\mathrm{d}x$：$q < 1$ 收敛，$q \ge 1$ 发散。
> 4. $\displaystyle\int_a^{+\infty} \frac{1}{x^\alpha \ln^\beta x}\,\mathrm{d}x$（$a > 1$）：$\alpha > 1$ 收敛；$\alpha < 1$ 发散；$\alpha = 1$ 时，$\beta > 1$ 收敛，$\beta \le 1$ 发散。
> 5. $\displaystyle\int_0^1 \frac{\ln^\beta x}{x^\alpha}\,\mathrm{d}x$（$\beta > 0$）：$\alpha < 1$ 收敛，$\alpha \ge 1$ 发散。
