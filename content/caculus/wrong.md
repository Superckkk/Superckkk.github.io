---
subject: 数学一
course: 高等数学
chapter: 高等数学错题本
source: notes/Math/Caculus/Wrong.typ
---

<!-- q {"id": "calc-w-001", "type": "错题", "tags": ["定积分的物理应用"], "reason": "思路缺失", "title": "平面曲线质心的下界证明", "chapter": "定积分的物理应用"} -->

<!-- stem -->
设函数 $y = f(x)$ 在区间 $[0,a]$ 上非负，$f''(x) > 0$，且 $f(0) = 0$。有一块质量均匀分布的平板 $D$，其占据的区域是曲线 $y = f(x)$ 与直线 $x = a$ 以及 $x$ 轴围成的平面图形。用 $\bar{x}$ 表示平板 $D$ 的质心的横坐标。证明：$\bar{x} > \dfrac{2}{3}a$。

![配图](assets/image.png)

<!-- answer -->
**法一：构造辅助函数**

$$\bar{x} = \frac{\int_a^b x f(x)\,\mathrm{d}x}{\int_a^b f(x)\,\mathrm{d}x} = \frac{\int_0^a x f(x)\,\mathrm{d}x}{\int_0^a f(x)\,\mathrm{d}x}$$

要证 $\bar{x} > \dfrac{2}{3}a$，即证

$$\int_0^a x f(x)\,\mathrm{d}x > \frac{2}{3}a\int_0^a f(x)\,\mathrm{d}x$$

将 $a$ 替换为 $x$ 后令 $F(x) = \int_0^x t f(t)\,\mathrm{d}t - \frac{2}{3}x\int_0^x f(t)\,\mathrm{d}t$，则

$$\begin{aligned}
F'(x) &= \frac{1}{3}x f(x) - \frac{2}{3}\int_0^x f(t)\,\mathrm{d}t\\
F''(x) &= \frac{1}{3}x f'(x) - \frac{1}{3}f(x)\\
F'''(x) &= \frac{1}{3}x f''(x) > 0
\end{aligned}$$

又 $F(0) = F'(0) = F''(0) = 0$，故 $F(a) > F(0) = 0$，原命题得证。

**法二**

**核心引理**。设 $f(0)=0$，$f''(x)>0$（严格凸），令 $h(x) = f(x)/x$（$x \in (0,a]$），则 $h(x)$ 严格单调递增。

证明：任取 $0 < x_1 < x_2 \le a$，记 $t = x_1/x_2 \in (0,1)$。由严格凸性：

$$f(x_1) = f(t x_2 + (1-t)\cdot 0) < t f(x_2) + (1-t) f(0) = \frac{x_1}{x_2} f(x_2)$$

两边除以 $x_1$ 即得 $f(x_1)/x_1 < f(x_2)/x_2$。∎

这条引理就是"凸性"最直观的物理翻译：从原点看曲线的割线斜率随 $x$ 增大而越来越陡，说明质量沿 $x$ 增大方向堆积得比线性情形更快，质心自然会被"推"向 $\dfrac{2}{3}a$ 的右侧。（$f$ 线性、即 $f'' \equiv 0$ 的临界情形下 $h$ 恰为常数，此时 $\bar{x} = \dfrac{2}{3}a$ 恰好取等。）

用引理完成证明：把 $f(x) = x h(x)$ 代入目标不等式：

$$\int_0^a x f(x)\,\mathrm{d}x - \frac{2}{3}a\int_0^a f(x)\,\mathrm{d}x = \int_0^a (x^2 - \tfrac{2}{3}a x)\, h(x)\,\mathrm{d}x$$

令 $\phi(x) = x(x - \tfrac{2}{3}a)$，注意到

$$\int_0^a \phi(x)\,\mathrm{d}x = \left[\frac{x^3}{3} - \frac{a}{3}x^2\right]_0^a = \frac{a^3}{3} - \frac{a^3}{3} = 0$$

且 $\phi(x)$ 在 $(0, \tfrac{2}{3}a)$ 上为负、$(\tfrac{2}{3}a, a)$ 上为正——恰在 $c := \tfrac{2}{3}a$ 处变号一次。由于积分值为零，减去常数 $h(c)$ 不改变积分：

$$\int_0^a \phi(x) h(x)\,\mathrm{d}x = \int_0^a \phi(x) \left[h(x) - h(c)\right]\mathrm{d}x$$

- 当 $x < c$：$\phi(x) < 0$ 且 $h(x) < h(c)$，乘积 $> 0$；
- 当 $x > c$：$\phi(x) > 0$ 且 $h(x) > h(c)$，乘积 $> 0$；
- 仅 $x = c$ 一点乘积为 $0$。

故被积函数几乎处处严格为正：

$$\int_0^a \phi(x) \left[h(x) - h(c)\right]\mathrm{d}x > 0 \quad \Longrightarrow \quad \int_0^a \phi(x) h(x)\,\mathrm{d}x > 0$$

即 $\bar{x} > \dfrac{2}{3}a$。

<!-- note -->
法二更"自然"，因为只用到两个可反复复用的想法：

1. **凸性 + 过原点 $\Longrightarrow$ $f(x)/x$ 单调**：处理"$f(0)=0$ 型"凸函数问题时最常见的转化，几乎是套路；
2. **零均值变号函数 $\times$ 单调函数 $\Longrightarrow$ 积分为正**：本质是切比雪夫积分不等式的标准技巧，遇到"证明某个矩/加权平均大于临界值"的题都可以往这个方向想。

切比雪夫积分不等式（连续形式）：若 $p(x)$ 与 $q(x)$ 在 $[a,b]$ 上同为单调，则协方差非负：

$$\frac{1}{b-a}\int_a^b p(x) q(x)\,\mathrm{d}x \ge \left(\frac{1}{b-a}\int_a^b p(x)\,\mathrm{d}x\right)\left(\frac{1}{b-a}\int_a^b q(x)\,\mathrm{d}x\right)$$

法二的收尾正是该思想在"权函数均值为零"特殊情形下的退化与加强：

> 当权函数具有"先负后正"的单一变号结构且总积分为零时，单调函数与该权函数的积分符号完全由单调性决定。

相比之下，"构造 $F(x)$ 三次求导"虽然经典，但需要先猜到 $F$ 的形式，两种方法都值得掌握。

<!-- q {"id": "calc-w-002", "type": "错题", "tags": ["函数与极限"], "title": "变上限积分的极限（分子含参）", "chapter": "函数与极限"} -->

<!-- stem -->
计算$\lim\limits_{x\to 0}\dfrac{\int_0^x \left[e^{(t-x)^2} - 1\right] \sin t\,\mathrm{d}t}{x^2 \left(e^{x^2} - 1\right)}$

<!-- answer -->
分子是积分限有关$x$的变上限积分,考虑使用洛必达法则消除积分符号,但被积函数同样包含$x$,因此需要换元消去被积函数中的$x$.因此，做以下变换:

$$\begin{aligned}
&\text{Define } u := t/x, \quad \text{Then } t = u x, \quad \mathrm{d}t = x\,\mathrm{d}u\\
&\int_0^x \left[e^{(t-x)^2} - 1\right] \sin t\,\mathrm{d}t = \int_0^1 \left[e^{x^2 (u-1)^2} - 1\right] \sin(u x)\, x\,\mathrm{d}u
\end{aligned}$$

$$\begin{aligned}
\lim_{x\to 0} \int_0^1 \left[e^{x^2 (u-1)^2} - 1\right] \sin(u x)\, x\,\mathrm{d}u &\sim \lim_{x\to 0} \int_0^1 x^2 (u-1)^2 \cdot u x \cdot x\,\mathrm{d}u\\
&= \lim_{x\to 0} x^4 \int_0^1 (u-1)^2 u\,\mathrm{d}u = \lim_{x\to 0} x^4 \int_0^1 (u^3 - 2 u^2 + u)\,\mathrm{d}u\\
&= \lim_{x\to 0} x^4 \cdot \left(\frac{1}{4} - \frac{2}{3} + \frac{1}{2}\right) = \lim_{x\to 0} \frac{1}{12} x^4
\end{aligned}$$

接下来对分母$x^2 (e^{x^2} - 1)$进行处理:

$$x^2 \left(e^{x^2} - 1\right) \sim x^2 \cdot x^2 = x^4$$

因此,原极限变为:$\lim\limits_{x\to 0} \dfrac{\frac{1}{12} x^4}{x^4} = \dfrac{1}{12}$

**【笔记】** 该解法中在积分符号内使用了等价无穷小,而这种替换是有严格的使用条件的.解释如下:

设我们要处理的是含参积分

$$I(x) = \int_a^b f(x,t)\,\mathrm{d}t$$

而我们想将$f(x,t)$替换为更简单的$g(x,t)$,得到:

$$I(x) \sim \int_a^b g(x,t)\,\mathrm{d}t \quad (x \to x_0)$$

那么常用的充分条件是一致等价,即:如果存在$\delta > 0$,当$x\to x_0$时,对$t \in [a,b]$**一致地**有:

$$f(x,t) = g(x,t) + o(g(x,t)) \quad (x \to x_0)$$

并且$\int_a^b g(x,t)\,\mathrm{d}t \neq 0$且存在,那么:

$$\frac{I(x)}{\int_a^b g} = 1 + \frac{\int_a^b o(g)}{\int_a^b g} \to 1$$

其中"一致地"指$o(g)$中的无穷小相对于$g$的比值对$t$一致趋于0.

当积分式具有以下特征时,等价无穷小替换通常会失效:

- 积分区间无界
- 奇点处一致性失效,比如$t\to 0$时等价的速度依赖$x$
- 替换后主项积分为0,此时需要保留高阶项

而当区间是紧的、函数是光滑的时,这种等价无穷小替换往往不会带来问题

<!-- answer -->
以下换元是更容易想到的思路,但计算过程十分繁琐,因此不推荐使用.当实在没有思路时可以尝试.

$$\begin{aligned}
&\text{Define } u := t - x, \quad \text{Then } t = u + x, \quad \mathrm{d}t = \mathrm{d}u\\
&\int_0^x \left[e^{(t-x)^2} - 1\right] \sin t\,\mathrm{d}t = \int_{-x}^0 \left[e^{u^2} - 1\right] \sin(u+x)\,\mathrm{d}u\\
&= \int_{-x}^0 \left[e^{u^2} - 1\right] (\sin u \cos x + \cos u \sin x)\,\mathrm{d}u
\end{aligned}$$

因此,原积分式记作$F(x)$,变成:

$$\begin{aligned}
&\quad \cos x \int_{-x}^0 \left[e^{u^2} - 1\right] \sin u\,\mathrm{d}u + \sin x \int_{-x}^0 \left[e^{u^2} - 1\right] \cos u\,\mathrm{d}u\\
&= - \cos x \int_0^{-x} \left[e^{u^2} - 1\right] \sin u\,\mathrm{d}u - \sin x \int_0^{-x} \left[e^{u^2} - 1\right] \cos u\,\mathrm{d}u\\
&= - \cos x \int_0^x \left[e^{u^2} - 1\right] \sin u\,\mathrm{d}u + \sin x \int_0^x \left[e^{u^2} - 1\right] \cos u\,\mathrm{d}u
\end{aligned}$$

则对$F(x)$求导,得:

$$\begin{aligned}
F'(x) &= \sin x \int_0^x \left[e^{u^2} - 1\right] \sin u\,\mathrm{d}u + \cos x \int_0^x \left[e^{u^2} - 1\right] \cos u\,\mathrm{d}u\\
&= \int_0^x \left[e^{u^2} - 1\right] (\sin u \sin x + \cos u \cos x)\,\mathrm{d}u\\
&= \int_0^x \left[e^{u^2} - 1\right] \cos(u - x)\,\mathrm{d}u\\
&= \cos(\xi - x) \int_0^x \left[e^{u^2} - 1\right] \mathrm{d}u, \quad \xi \in (0,x)
\end{aligned}$$

至此，我们完成了对分子的处理以及第一次求导,接下来对分母$x^2 (e^{x^2} - 1)$进行处理:

$$x^2 \left(e^{x^2} - 1\right) \sim x^2 \cdot x^2 = x^4$$

因此,原极限变为:

$$\begin{aligned}
\lim_{x\to 0} \frac{\int_0^x \left[e^{(t-x)^2} - 1\right] \sin t\,\mathrm{d}t}{x^2 \left(e^{x^2} - 1\right)} &= \lim_{x\to 0} \frac{F(x)}{x^4}\\
&= \lim_{x\to 0} \frac{F'(x)}{4 x^3}\\
&= \lim_{x\to 0} \frac{\cos(\xi - x) \int_0^x \left[e^{u^2} - 1\right] \mathrm{d}u}{4 x^3}\\
&= \lim_{x\to 0} \frac{1 \cdot \int_0^x \left[e^{u^2} - 1\right] \mathrm{d}u}{4 x^3}\\
&= \lim_{x\to 0} \frac{e^{x^2} - 1}{12 x^2} = \frac{1}{12}
\end{aligned}$$

> **积分第一中值定理**：设$f(x)$在$[a,b]$上连续，$g(x)$在$[a,b]$上可积且不变号，则存在$\xi \in [a,b]$，使得
> $$\int_a^b f(x) g(x)\,\mathrm{d}x = f(\xi) \int_a^b g(x)\,\mathrm{d}x$$

<!-- q {"id": "calc-w-003", "type": "错题", "tags": ["函数与极限"], "title": "等价无穷小确定参数 a 与 b", "chapter": "函数与极限"} -->

<!-- stem -->
设当$x \to 0$时,$\int_0^x \left(e^{t \cos t^2} - e^t\right) \mathrm{d}t$与$a x^b$是等价无穷小量,求 $a$与$b$.

<!-- answer -->
与上一题类似,对于含有积分符号的式子,我们先通过求导消去积分符号,然后再使用洛必达法则求极限.因此,依据题意,有:

$$\begin{aligned}
\lim_{x\to 0} \frac{\int_0^x \left(e^{t \cos t^2} - e^t\right) \mathrm{d}t}{a x^b} &= \lim_{x\to 0} \frac{e^{x \cos x^2} - e^x}{a b x^{b-1}}\\
&= \lim_{x\to 0} \frac{e^x \cdot \left(e^{x \cos x^2 - x} - 1\right)}{a b x^{b-1}}\\
&= \lim_{x\to 0} \frac{e^x \cdot (x \cos x^2 - x)}{a b x^{b-1}}\\
&= \lim_{x\to 0} \frac{x \cdot (1 - \frac{1}{2} x^4) - x}{a b x^{b-1}}\\
&= \lim_{x\to 0} \frac{-\frac{1}{2} x^5}{a b x^{b-1}} = 1
\end{aligned}$$

因此,我们有:$b - 1 = 5,\ a b = -\frac{1}{2}$,解得$b = 6,\ a = -\frac{1}{12}$

<!-- q {"id": "calc-w-004", "type": "错题", "tags": ["函数与极限"], "title": "n^x[(1+1/n)^n - e] 在 x=1 处的连续性", "chapter": "函数与极限"} -->

<!-- stem -->
$f(x) = \lim\limits_{n\to\infty} n^x \left[\left(1+\frac{1}{n}\right)^n - e\right]$在$x = 1$处（ ）

- (A) 左极限存在,右极限不存在
- (B) 左极限不存在,右极限存在
- (C) 左、右极限都存在,但不相等
- (D) 连续

<!-- answer -->
对于$f(x)^{g(x)}$这种形式,通常变形为$\exp\{g(x) \ln f(x)\}$的形式,本题同理:

$$\begin{aligned}
f(x) &= \lim_{n\to\infty} n^x \left[\left(1+\frac{1}{n}\right)^n - e\right]\\
&= \lim_{n\to\infty} n^x \left[e^{n \ln \left(1+\frac{1}{n}\right)} - e\right]\\
&= \lim_{n\to\infty} n^x \left[e \cdot \left(e^{n \ln \left(1+\frac{1}{n}\right) - 1} - 1\right)\right]\\
&= e \lim_{n\to\infty} n^x \cdot \left(n \ln \left(1+\frac{1}{n}\right) - 1\right)\\
&= e \lim_{n\to\infty} n^x \cdot \left(n \cdot \left(\frac{1}{n} - \frac{1}{2 n^2} + o\!\left(\frac{1}{n^2}\right)\right) - 1\right)\\
&= e \lim_{n\to\infty} n^x \cdot \left(-\frac{1}{2 n} + o\!\left(\frac{1}{n}\right)\right)
\end{aligned}$$

因此,当$x = 1$时:

$$f(x) = e \lim_{n\to\infty} n \cdot \left(-\frac{1}{2n} + o\!\left(\frac{1}{n}\right)\right) = e \lim_{n\to\infty} \left(-\frac{1}{2} + o(1)\right) = -\frac{e}{2}$$

当 $x < 1$时:

$$f(x) = e \lim_{n\to\infty} n^x \cdot \left(- \frac{1}{2n} + o\!\left(\frac{1}{n}\right)\right) = e \lim_{n\to\infty} \left(-\frac{1}{2} n^{x-1} + o\!\left(n^{x-1}\right)\right) = e \cdot 0 = 0$$

当 $x > 1$时:

$$f(x) = e \lim_{n\to\infty} \left(-\frac{1}{2} n^{x-1} + o\!\left(n^{x-1}\right)\right) = e \cdot -\infty = -\infty$$

综上:

$$f(x) = \begin{cases} 0 & x < 1\\ -\dfrac{e}{2} & x = 1\\ -\infty & x > 1 \end{cases}$$

因此,$f(x)$在$x = 1$处的左极限存在,右极限不存在

<!-- q {"id": "calc-w-005", "type": "错题", "tags": ["积分的计算"], "title": "arctan x / (x(1+x²)) 的反常积分", "chapter": "积分的计算"} -->

<!-- stem -->
$$\int_0^{+\infty} \frac{\arctan x}{x \left(1+x^2\right)} \,\mathrm{d}x$$

<!-- answer -->
第一眼应该能很自然地想到:$\int \frac{1}{1+x^2}\,\mathrm{d}x = \arctan x + C$,因此做出以下尝试:

$$\begin{aligned}
\int_0^{+\infty} \frac{\arctan x}{x \left(1+x^2\right)} \,\mathrm{d}x &= \int_0^{+\infty} \frac{\arctan x}{x}\, \mathrm{d}(\arctan x)\\
&= \frac{1}{2} \int_0^{+\infty} \frac{1}{x}\, \mathrm{d}\left(\arctan x\right)^2\\
&\overset{\text{Let } t = \arctan x}{=} \frac{1}{2} \int_0^{\pi/2} \cot t\,\mathrm{d}\left(t^2\right)\\
&= \int_0^{\pi/2} t \cot t\,\mathrm{d}t\\
&= \int_0^{\pi/2} t\, \mathrm{d}(\ln |\sin t|)\\
&= t \ln (\sin t) \Big|^{\pi/2}_0 - \int_0^{\pi/2} \ln (\sin t)\,\mathrm{d}t\\
&= - \int_0^{\pi/2} \ln (\sin t)\,\mathrm{d}t
\end{aligned}$$

等号右边即为大名鼎鼎的欧拉对数积分:$\int_0^{\pi/2} \ln \sin x\,\mathrm{d}x = -\frac{\pi}{2} \ln 2$,因此原式结果为:$\frac{\pi}{2} \ln 2$

下面推导欧拉对数积分的结果:

$$\int_0^{\pi/2} \ln \sin x\,\mathrm{d}x \overset{\text{Let } x = \pi/2 - t}{=} \int_{\pi/2}^0 \ln \cos x\, \mathrm{d}\!\left(\frac{\pi}{2} - t\right) = \int_0^{\pi/2} \ln \cos t\,\mathrm{d}t = I$$

则:

$$\begin{aligned}
2I &= \int_0^{\pi/2} \ln \sin x\,\mathrm{d}x + \int_0^{\pi/2} \ln \cos x\,\mathrm{d}x\\
&= \int_0^{\pi/2} \ln \frac{\sin 2x}{2}\,\mathrm{d}x\\
&= \int_0^{\pi/2} \ln \sin 2x\,\mathrm{d}x - \int_0^{\pi/2} \ln 2\,\mathrm{d}x\\
&\overset{\text{Let } t = 2x}{=} \frac{1}{2} \int_0^{\pi} \ln \sin t\,\mathrm{d}t - \frac{\pi}{2} \ln x\\
&= \frac{1}{2} \cdot 2 \cdot \int_0^{\pi/2} \ln \sin t\,\mathrm{d}t - \frac{\pi}{2} \ln 2 \quad \text{(According to the symmetry of sin on } (0,\pi))\\
&= I - \frac{\pi}{2} \ln 2
\end{aligned}$$

因此:$I = -\frac{\pi}{2} \ln 2$

<!-- answer -->
接下来介绍使用**费曼技巧**解决这题:

$$\begin{aligned}
&\text{Define } I(a) := \int_0^{+\infty} \frac{\arctan (a x)}{x \left(1+x^2\right)} \,\mathrm{d}x, \quad \text{Then } I(1) = \int_0^{+\infty} \frac{\arctan x}{x \left(1+x^2\right)} \,\mathrm{d}x
\end{aligned}$$

$$\begin{aligned}
\frac{\mathrm{d}(I(a))}{\mathrm{d}a} &= \int_0^{+\infty} \frac{1}{x\left(1+x^2\right)} \cdot \frac{x}{1+ (a x)^2}\,\mathrm{d}x\\
&= \int_0^{+\infty} \left[\frac{1}{1-a^2} \cdot \frac{1}{1+x^2} - \frac{a^2}{1-a^2} \cdot \frac{1}{1+(a x)^2}\right] \mathrm{d}x\\
&= \frac{1}{1-a^2} \int_0^{+\infty} \frac{1}{1+x^2}\,\mathrm{d}x - \frac{a}{1-a^2} \int_0^{+\infty} \frac{1}{1+(a x)^2}\, \mathrm{d}(a x)\\
&= \frac{1}{1-a^2} \cdot \arctan x \Big|_0^{+\infty} - \frac{a}{1-a^2} \cdot \arctan (a x) \Big|_0^{+\infty}\\
&= \frac{1}{1-a^2} \cdot \frac{\pi}{2} - \frac{a}{1-a^2} \cdot \frac{\pi}{2}\\
&= \frac{\pi}{2} \cdot \frac{1}{1+a}
\end{aligned}$$

注意,此时求出来的是$\dfrac{\mathrm{d}(I(a))}{\mathrm{d}a}$,因此需要对$a$积分,得到$I(a)$:

$$I(a) = \int \frac{\pi}{2} \frac{1}{1+a}\,\mathrm{d}a = \frac{\pi}{2} \ln(1+a) + C$$

代入$a = 0$可计算出$C = 0$,因此:$I(1) = \lim\limits_{a\to 1} I(a) = \frac{\pi}{2} \ln 2$，取极限是因为推导过程中$(1-a^2)$出现在了分母位置

**【笔记】** 费曼技巧来源于莱布尼茨积分求导公式,即:

$$\begin{aligned}
&F(x) = \int_{\psi(x)}^{\phi(x)} f(x,t)\,\mathrm{d}t\\
&F'(x) = f(x,\phi(x))\phi'(x) - f(x,\psi(x)) \psi'(x) + \int_{\psi(x)}^{\phi(x)} \frac{\partial f}{\partial x}(x,t)\,\mathrm{d}t
\end{aligned}$$

本题中,被积函数只有一个变量,但我们可以人为地引入一个参数$a$,使得被积函数变为$f(a,x)$,然后对$a$求导,从而消去积分符号,最后再对$a$积分得到原积分式的值.上述过程可能不太好看清其与莱布尼茨积分求导公式的关系，我们写成以下形式:

$$\begin{aligned}
&I(a) = \int_0^{+\infty} f(a,x)\,\mathrm{d}x = \int_0^{+\infty} \frac{\arctan (a x)}{x \left(1+x^2\right)} \,\mathrm{d}x\\
&I(x) = \int_0^{+\infty} f(x,t)\,\mathrm{d}t = \int_0^{+\infty} \frac{\arctan (x t)}{t \left(1+t^2\right)} \,\mathrm{d}t
\end{aligned}$$

对应到上面的莱布尼茨积分求导公式,由于积分上下限均不依赖$x$,因此$\phi'(x) = \psi'(x) = 0$,故:

$$I'(x) = \int_0^{+\infty} \frac{\partial f}{\partial x}(x,t)\,\mathrm{d}t = \int_0^{+\infty} \frac{1}{t\left(1+t^2\right)} \cdot \frac{t}{1+(x t)^2}\,\mathrm{d}t$$

<!-- q {"id": "calc-w-006", "type": "错题", "tags": ["积分等式与不等式"], "title": "∫f² 与 ∫(f′)² 的不等式证明", "chapter": "积分等式与不等式"} -->

<!-- stem -->
设$f(x)$ 在$[a,b]$上可导,且$f'(x)$连续,$f(a) = 0$.证明:$\int_a^b f^2(x)\,\mathrm{d}x \le \frac{(b-a)^2}{2} \int_a^b \left[f'(x)\right]^2 \mathrm{d}x$

<!-- answer -->
**【笔记】** 柯西-施瓦茨(Cauchy-Schwarz)不等式:若$f(x),g(x)$在$[a,b]$上连续,则有:

$$\left(\int_a^b f(x) g(x)\,\mathrm{d}x\right)^2 \le \int_a^b f^2(x)\,\mathrm{d}x \cdot \int_a^b g^2(x)\,\mathrm{d}x$$

等号成立的条件为$f(x)$与$g(x)$线性相关

对应到这一题,令$f(x) = f'(x), g(x) = 1$,则有:

$$\begin{aligned}
&\left(\int_a^t f'(x)\,\mathrm{d}x\right)^2 \le \int_a^t \left[f'(x)\right]^2 \mathrm{d}x \cdot \int_a^t 1\,\mathrm{d}x\\
&\left(f(t) - f(a)\right)^2 = f^2(t) \le (t-a)\int_a^t \left[f'(x)\right]^2 \mathrm{d}x \le (t-a)\int_a^b \left[f'(x)\right]^2 \mathrm{d}x
\end{aligned}$$

两边对$t$在$(a,b)$上积分,得:

$$\begin{aligned}
\int_a^b f^2(t)\,\mathrm{d}t &\le \int_a^b (t-a)\,\mathrm{d}t \int_a^b \left[f'(x)\right]^2 \mathrm{d}x\\
&= \frac{(b-a)^2}{2} \int_a^b \left[f'(x)\right]^2 \mathrm{d}x
\end{aligned}$$

<!-- q {"id": "calc-w-007", "type": "错题", "tags": ["积分等式与不等式"], "title": "f(0)=f(1)=1 时定积分的取值范围", "chapter": "积分等式与不等式"} -->

<!-- stem -->
设$f(x)$是$[0,1]$上的可导函数,$f(0) = f(1) = 1, \max\limits_{0\le x \le 1}\left\{\left|f'(x)\right|\right\} = 1,$则:

- (A) $\dfrac{1}{4} < \int_0^1 f(x)\,\mathrm{d}x < \dfrac{1}{2}$
- (B) $\dfrac{1}{2} < \int_0^1 f(x)\,\mathrm{d}x < \dfrac{3}{4}$
- (C) $\dfrac{3}{4} < \int_0^1 f(x)\,\mathrm{d}x < \dfrac{5}{4}$
- (D) $\dfrac{5}{4} < \int_0^1 f(x)\,\mathrm{d}x < \dfrac{7}{4}$

<!-- answer -->
由$\left|f'(x)\right| \le 1$可以推出:

$$\begin{aligned}
&\left|f(x) - f(0)\right| = \left|\int_0^x f'(x)\,\mathrm{d}x\right| \le \left|\int_0^x 1\,\mathrm{d}x\right| = x\\
&\left|f(x) - f(1)\right| = \left|\int_x^1 f'(x)\,\mathrm{d}x\right| \le \left|\int_x^1 1\,\mathrm{d}x\right| = 1 - x
\end{aligned}$$

又因为$f(0) = f(1) = 1$,综合两式可得:

$$\left|f(x) - 1\right| \le \min\left(x, 1-x\right)$$

因此:

$$1 - \min\left(x, 1-x\right) \le f(x) \le 1 + \min\left(x, 1-x\right)$$

不等式两边同时对$x \in [0,1]$积分,即可得到$\dfrac{3}{4} < \int_0^1 f(x) < \dfrac{5}{4}$

<!-- answer -->
- 令$F(x) = f(x) - (x + 1)$,则$F(0) = 0, F'(x) = f'(x) - 1 \le 0$,因此:$f(x) \le 1+x$
- 令$F(x) = f(x) - (2 - x)$,则$F(1) = 0, F'(x) = f'(x) + 1 \ge 0$,因此:$f(x) \le 2 - x$
- 令$F(x) = f(x) - (1 - x)$,则$F(0) = 0, F'(x) = f'(x) + 1 \ge 0$,因此:$f(x) \ge 1 - x$
- 令$F(x) = f(x) - x$,则$F(1) = 0, F'(x) = f'(x) - 1 \le 0$,因此:$f(x) \ge x$

综上可得:$f(x)$落在由直线:$y = 1+x,\ y = 2-x,\ y = 1-x,\ y = x$围成的正方形内.结合图形可知:

$$\begin{aligned}
&\int_0^1 f(x)\,\mathrm{d}x < \int_0^{1/2} (1+x)\,\mathrm{d}x + \int_{1/2}^1 (2 - x)\,\mathrm{d}x = \frac{5}{4}\\
&\int_0^1 f(x)\,\mathrm{d}x > \int_0^{1/2} (1-x)\,\mathrm{d}x + \int_{1/2}^1 x\,\mathrm{d}x = \frac{3}{4}
\end{aligned}$$

![配图](assets/image-1.png)

因此$\dfrac{3}{4} < \int_0^1 f(x)\,\mathrm{d}x < \dfrac{5}{4}$,答案为C

**【说明】** 为什么两个不等号不能取等?这是因为取等要求$f(x)$几乎处处等于包络线(即图中正方形的边界),而包络线在$x = 1/2$处不可导,与题干产生矛盾

<!-- q {"id": "calc-w-008", "type": "错题", "tags": ["积分等式与不等式"], "title": "∫₁ˣ (sin t)/t = ln x² 的实根个数", "chapter": "积分等式与不等式"} -->

<!-- stem -->
设$f(x)$在$[0, \frac{3\pi}{2}]$ 上连续,在$(0, \frac{3\pi}{2})$内是函数$\frac{\sin x}{x}$的一个原函数,$f(0) = 0$.求方程$\int_1^x \frac{\sin t}{t}\,\mathrm{d}t = \ln x^2$的实根个数

<!-- wrong -->
令$F(x) = \int_1^x \frac{\sin t}{t}\,\mathrm{d}t - \ln x^2$.则$F'(x) = \frac{\sin x}{x} - \frac{2}{x}$.当$x < 0$时,$F'(x) > 0$, $x > 0$时,$F'(x) < 0$

$x > 0$时:

$$\lim_{x\to 0^+} F(x) = \lim_{x\to 0^+} \int_1^x \frac{\sin t}{t}\,\mathrm{d}t - (-\infty) = +\infty, \quad F(1) = 0$$

而$x>0$时$F(x)$单调递减,因此在$x>0$时$F(x) = 0$有一个实根

$x<0$时:

$$\begin{aligned}
F(x) = \int_1^x \frac{\sin t}{t}\,\mathrm{d}t - \ln x^2 &= \int_1^x \frac{\sin t}{t}\,\mathrm{d}t - \int_1^x \frac{2}{|t|}\,\mathrm{d}t\\
&= \int_1^0 \frac{\sin t}{t}\,\mathrm{d}t + \int_0^x \frac{\sin t}{t}\,\mathrm{d}t - \left(\int_1^0 \frac{2}{t}\,\mathrm{d}t + \int_0^x \frac{2}{(-t)}\,\mathrm{d}t\right)\\
&= \int_0^1 \frac{2 - \sin t}{t}\,\mathrm{d}t + \int_x^0 \frac{\sin t + 2}{(-t)}\,\mathrm{d}t
\end{aligned}$$

$t \in (0,1)$时$\frac{2 - \sin t}{t} > 0$,$t \in (x,0)$时$\frac{\sin t + 2}{(-t)}>0$,因此$F(x) > 0$.

综上,$F(x) = 0$有且仅有一个实根

<!-- answer -->
$x > 0$的情况与上方相同,讨论$x < 0$的情况.

$$\lim_{x\to 0^-} F(x) = +\infty, \quad F\!\left(-\frac{3}{2}\pi\right) = \int_1^{-\frac{3}{2}\pi} \frac{\sin t}{t}\,\mathrm{d}t - 2\ln \frac{3}{2}\pi$$

其中:

$$\int_1^{\frac{3}{2}\pi} \frac{\sin t}{t}\,\mathrm{d}t \overset{t = -v}{=} - \int_{-1}^{\frac{3}{2}\pi} \frac{\sin v}{v}\,\mathrm{d}v = - \int_0^{\frac{3}{2}\pi} \frac{\sin v}{v}\,\mathrm{d}v - \int_{-1}^0 \frac{\sin v}{v}\,\mathrm{d}v < 0$$

因此$F(x) = 0$在$x < 0$是恰有一个实根.综上,$F(x) = 0$恰有两个实根

除了代入具体的函数值硬算之外,还可以直接判断$x \to -\infty$时$F(x)$的行为.根据Dirichlet判别法,$\int_1^{-\infty} \frac{\sin t}{t}\,\mathrm{d}t$收敛,而$\lim\limits_{x\to -\infty} \ln x^2 = +\infty$,因此$\lim\limits_{x\to -\infty} F(x) = -\infty$.故$F(x)$在$(-\infty, 0)$上有两个实根

**【笔记】**

Dirichlet判别法是用于判断反常积分是否收敛的重要工具.其表述为:

对于形如$\int_a^{+\infty} f(x) g(x)\,\mathrm{d}x$的反常积分,若满足:

1. $F(x) = \int_a^x f(x)$在$[a,+\infty)$上有界
2. $g(x)$在$[a,+\infty)$上单调趋于0

则反常积分$\int_a^{+\infty} f(x) g(x)\,\mathrm{d}x$必收敛.

<!-- q {"id": "calc-w-009", "type": "错题", "tags": ["积分等式与不等式"], "title": "f′+f²≥0 时的定积分不等式", "chapter": "积分等式与不等式"} -->

<!-- stem -->
设$f(x)$在$[0,1]$上可导,当$0 \le x \le 1$时,$f'(x) + f^2(x) \ge 0, f(0) > 0$,则（ ）

- (A) $\int_0^1 f(x)\,\mathrm{d}x \le \ln \frac{f(1)}{f(0)}$
- (B) $\int_0^1 f(x)\,\mathrm{d}x \ge \ln \frac{f(0)}{f(1)}$
- (C) $\int_0^1 f(x)\,\mathrm{d}x \le \ln f(1)$
- (D) $\int_0^1 f(x)\,\mathrm{d}x \ge \ln f(0)$

<!-- answer -->
本题的难点在于处理式子$f'(x) + f^2(x)$.在微分方程这一章,我们推导过:面对等式

$$y' + p y = q$$

我们的目标是通过操作让等式左边呈现为某个函数的导数的形式,即$\dfrac{\mathrm{d}f}{\mathrm{d}x}$.在方程两边同乘一个函数$u$,要让:

$$u y' + u p y = (u y)' = u y' + u' y$$

因此:$u' = u p \Rightarrow u = e^{\int p\,\mathrm{d}x}$.回到本题,要处理的式子$f'(x) + f^2(x)$可以看作是:$y = f(x), p = f(x)$.

因此:

$$\text{Let } F(x) = e^{\int_0^x f(t)\,\mathrm{d}t} \cdot f(x),\quad \text{Then } F'(x) = e^{\int_0^x f(t)\,\mathrm{d}t}\left(f'(x) + f^2(x)\right) \ge 0$$

因此:$F(1) \ge F(0)$,即:

$$f(1) \cdot e^{\int_0^1 f(t)\,\mathrm{d}t} \ge f(0)\cdot e^{\int_0^0 f(t)\,\mathrm{d}t} = f(0)$$

$f(0) > 0, e^{\int_0^1 f(t)\,\mathrm{d}t}> 0 \Longrightarrow f(1) > 0$,因此:

$$e^{\int_0^1 f(t)\,\mathrm{d}t} \ge \frac{f(0)}{f(1)} \overset{\text{Take the natural log}}{\Longrightarrow} \int_0^1 f(t)\,\mathrm{d}t \ge \ln \frac{f(0)}{f(1)}$$

<!-- q {"id": "calc-w-010", "type": "错题", "tags": ["积分等式与不等式"], "title": "单调函数与变上限积分的比较", "chapter": "积分等式与不等式"} -->

<!-- stem -->
设$f(x)$是$[0,1]$上单调增加的连续函数,则（ ）

- (A) $\int_0^{\int_0^1 e^{-t^2}\,\mathrm{d}t} f(x)\,\mathrm{d}x \ge \int_0^1 f(x) e^{-x^2}\,\mathrm{d}x$
- (B) $\int_0^{\int_0^1 e^{-t^2}\,\mathrm{d}t} f(x)\,\mathrm{d}x \le \int_0^1 f(x) e^{-x^2}\,\mathrm{d}x$
- (C) $\int_0^{\int_0^1 e^{-t^2}\,\mathrm{d}t} f(x)\,\mathrm{d}x \ge \int_0^1 f(x)\,\mathrm{d}x$
- (D) $\int_0^{\int_0^1 e^{-t^2}\,\mathrm{d}t} f(x)\,\mathrm{d}x \le \int_0^1 f(x)\,\mathrm{d}x$

<!-- answer -->
$$\text{Let } \phi(x) = \int_0^x e^{-t^2}\,\mathrm{d}t, \quad \phi(1) = c, \quad \phi'(x) = e^{-x^2}$$

$$\text{Then } \int_0^{\int_0^1 e^{-t^2}\,\mathrm{d}t} f(x)\,\mathrm{d}x = \int_0^c f(x)\,\mathrm{d}x \overset{\text{Let } x = \phi(t)}{=} \int_0^1 f(\phi(t)) \phi'(t)\,\mathrm{d}t$$

$$\begin{aligned}
\text{So } \int_0^{\int_0^1 e^{-t^2}\,\mathrm{d}t} f(x)\,\mathrm{d}x - \int_0^1 f(x) e^{-x^2}\,\mathrm{d}x &= \int_0^1 f(\phi(x)) \phi'(x)\,\mathrm{d}x - \int_0^1 f(x) e^{-x^2}\,\mathrm{d}x\\
&= \int_0^1 e^{-x^2}\left[f(\phi(x)) - f(x)\right]\mathrm{d}x
\end{aligned}$$

$\phi(x) = \int_0^x e^{-x^2}\,\mathrm{d}x < \int_0^x 1\,\mathrm{d}x = x$,又因为$f(x)$单调增加,所以:

$$\int_0^1 e^{-x^2}\left[f(\phi(x)) - f(x)\right]\mathrm{d}x < 0$$

因此答案为 B

<!-- answer -->
$$\text{Let } F(x) := \int_0^{\int_0^x e^{-t^2}\,\mathrm{d}t} f(t)\,\mathrm{d}t - \int_0^x f(t) e^{-t^2}\,\mathrm{d}t$$

$$\begin{aligned}
\text{Then } F'(x) &= f\!\left(\int_0^x e^{-t^2}\,\mathrm{d}t\right) e^{-x^2} - f(x) e^{-x^2}\\
&= e^{-x^2} \left[f\!\left(\int_0^x e^{-t^2}\,\mathrm{d}t\right) - f(x)\right]
\end{aligned}$$

$e^{-t^2} < 1, f(x)$在$[0,1]$上单调增加,因此:

$$f\!\left(\int_0^x e^{-t^2}\,\mathrm{d}t\right) - f(x) < f\!\left(\int_0^x 1\,\mathrm{d}t\right) - f(x) = 0$$

又因为$e^{-x^2} > 0$,因此$F'(x) < 0$,$F(x) \le F(0) = 0$,即:

$$\int_0^{\int_0^1 e^{-t^2}\,\mathrm{d}t} f(x)\,\mathrm{d}x \le \int_0^1 f(x) e^{-x^2}\,\mathrm{d}x$$

因此答案为 B

<!-- q {"id": "calc-w-011", "type": "错题", "tags": ["多元函数微分学"], "title": "由全微分 du 反求 f(x)", "chapter": "多元函数微分学"} -->

<!-- stem -->
设函数$u(x,y)$ 的全微分$\mathrm{d}u = \left[e^x + f'(x)\right] y\,\mathrm{d}x + f'(x)\,\mathrm{d}y$,其中$f(x)$在$(-\infty,+\infty)$内具有二阶连续的导数,且$f(0) = 4, f'(0) = 3$,求$f(x)$

<!-- wrong -->
依题意可知:

$$\begin{aligned}
\frac{\partial u}{\partial x} &= \left[e^x + f'(x)\right]y\\
\frac{\partial u}{\partial y} &= f'(x)
\end{aligned}$$

因此可设:

$$u(x,y) = \int \left[e^x + f'(x)\right]y\,\mathrm{d}x = \left[e^x + f(x)\right]y + g(y)$$

则:

$$\frac{\partial u}{\partial y} = e^x + f(x) + g'(y) = f'(x) \Rightarrow g'(y) = 0, \quad f(x) = e^x (x+c)$$

依题意:$f(0) = 4, f'(0) = 3$,则$x+c = 4, x+c+1 = 3$,矛盾

**【笔记】** 错误之处在于武断地认为$g'(y) = 0$.实际上,移项得到:

$$g'(y) = f'(x) - f(x) - e^x$$

左边是仅关于$y$的函数,右边是仅关于$x$的函数,因此只需两者等于同一个常数即可,并不强制要求都等于0.将$g'(y) = 0$改成$g'(y) = C$后解微分方程即可得到正确答案.

<!-- answer -->
$f(x)$在$(-\infty,+\infty)$上有二阶连续导数,则$u(x,y)$存在二阶偏微分,且$u'_{x y} = u'_{y x}$,即:

$$\begin{aligned}
&\frac{\partial^2 u}{\partial x \partial y} = e^x + f'(x)\\
&\frac{\partial^2 u}{\partial y \partial x} = f''(x)\\
&\Longrightarrow f''(x) = e^x + f'(x) \quad \Rightarrow \quad \left(e^{-x} f'(x)\right)' = 1
\end{aligned}$$

因此

$$f'(x) = e^x \left(x + C_1\right), \quad f(x) = e^x \left(x+C_1 - 1\right) + C_2$$

代入$f(0) = 4, f'(0) = 3$,解得:$C_1 = 3, C_2 = 2$,因此$f(x) = e^x (x+2) + 2$

<!-- q {"id": "calc-w-012", "type": "错题", "tags": ["数列极限"], "title": "x_n·y_n→∞ 的结论判定", "chapter": "数列极限"} -->

<!-- stem -->
若$\{x_n\}, \{y_n\}$满足$\lim\limits_{n\to\infty} x_n y_n = \infty$,则以下结论中正确的个数为:

① $\lim\limits_{n\to\infty} x_n = \infty$ or $\lim\limits_{n\to\infty} y_n = \infty$；

② $\lim\limits_{n\to\infty} x_n = \infty$ and $\lim\limits_{n\to\infty} y_n = \infty$；

③ $x_n$与$y_n$中一个是无穷大量,另一个是无界量

④ 当$x_n$是非零无穷小量时,$\lim\limits_{n\to\infty} y_n = \infty$

<!-- answer -->
对于①:令$x_n = n^{\frac{1+(-1)^n}{2}}, y_n = n^{\frac{1-(-1)^n}{2}}$,则:

- 当$n$为奇数时,$x_n = n^{0} = 1, y_n = n$
- 当$n$为偶数时,$x_n = n, y_n = n^0 = 1$

此时$x_n, y_n$均非无穷大量,而$x_n y_n = n$是无穷大量.因此其为①的一个反例,①错误

对于②, ③,令$x_n = 1, y_n = n$,则符合题干但不满足②, ③,故②, ③错误

对于④:$x_n$是非零无穷小量

- 反证法:

  假设$y_n$并非无穷大量,则:

  - $y_n$是有界量,此时$\lim\limits_{n\to\infty} x_n y_n = 0$显然,与题干矛盾
  - $y_n$是无界量但不是无穷大量,则

    $$\exists M > 0, \forall N_1 > 0, \exists n > N, \left|y_n\right| < M$$

    又因为$x_n$是非零无穷小量,因此:

    $$\forall \xi > 0, \exists N_2 > 0, \forall n > N_2, x_n < \xi$$

    因此:

    $$\forall \xi > 0, \exists N = \max\{N_1, N_2\}, \exists n > N, x_n y_n < \xi M.$$

    这说明:对于任意小的$\xi$,都能找到无穷多个$n$满足$x_n y_n < \xi M$,而$x_n y_n \to \infty$要求$n$充分大后恒大于任意给定的界,因此产生矛盾.

    故$y_n$是无穷大量

- 直接论证:

  $y_n = \dfrac{x_n y_n}{x_n}$,$x_n$是非零无穷小量,因此:

  $$\exists N_1 > 0, \forall n > N_1, x_n < 1$$

  $x_n y_n$是无穷大量,因此:

  $$\forall M > 0, \exists N_2 > 0, \forall n > N_2, x_n y_n > M$$

  结合两式可得:

  $$\forall M > 0, \exists N = \max\{N_1, N_2\}, y_n = \frac{x_n y_n}{x_n} > \frac{M}{1} = M$$

  因此$y_n$为无穷大量.

因此只有④正确.正确结论的个数为1.

<!-- q {"id": "calc-w-013", "type": "错题", "tags": ["数列极限"], "title": "x_{n+1}=f(x_n) 是 e^{-n/2} 的高阶无穷小", "chapter": "数列极限"} -->

<!-- stem -->
已知$f(x)$可导,且$\left|f'(x)\right| \le \dfrac{1}{e}$,方程$f(x) = x$有唯一解$x = 0$,又$x_{n+1} = f(x_n) \neq 0$,$n = 1,2,\cdots$.证明:当$n\to\infty$时,$x_n$是$e^{-n/2}$的高阶无穷小.

<!-- answer -->
$f(x) = x$有唯一解$x = 0,$即$f(0) = 0$.又因为$x_{n+1} = f(x_n)$故:

$$\begin{aligned}
\left|x_n - 0\right| = \left|f(x_{n-1}) - f(0)\right| = \left|f'(\xi)\right| \cdot \left|x_{n-1} - 0\right| &\le \frac{1}{e} \cdot \left|x_{n-1}\right|\\
&\le \frac{1}{e^2} \cdot \left|x_{n-2}\right|\\
&\le \cdots \le e^{-(n-1)} x_1
\end{aligned}$$

因此:

$$\lim_{n\to\infty} x_n \cdot e^{n/2} \le \lim_{n\to\infty} e^{-(n-1)} \cdot x_1 \cdot e^{n/2} = \lim_{n\to\infty} x_1 \cdot \left(e^{1- n/2}\right) = 0$$

故$n\to\infty$时,$x_n$是$e^{-n/2}$的高阶无穷小

<!-- wrong -->
依题意:

$$\begin{aligned}
\left|f'(x)\right| \le \frac{1}{e} &\Rightarrow \left|\int_0^x f'(t)\,\mathrm{d}t\right| \le \int_0^x \left|f'(t)\right| \mathrm{d}t \le \int_0^x \frac{1}{e}\,\mathrm{d}t\\
&\Rightarrow \left|f(x) - f(0)\right| \le \frac{x}{e}\\
&\Rightarrow \left|f(x_n)\right| \le \frac{x_n}{e}\\
&\Rightarrow \left|x_{n+1}\right| \le \frac{x_n}{e} \le \cdots \le \frac{x_1}{e^{n}}
\end{aligned}$$

因此:$\lim\limits_{n\to\infty} x_n \cdot e^{-n/2} \le \lim\limits_{n\to\infty} \dfrac{x_1}{e^{n-1}} \cdot e^{-n/2} = 0$

故$n\to\infty$时,$x_n$是$e^{-n/2}$的高阶无穷小

**【笔记】** 错误之处在于:$\left|\int_0^x f'(t)\,\mathrm{d}t\right| = \left|f(x) - f(0)\right|$,然而题目只给出了$f(x)$可导,并不能说明$f'(x)$一定黎曼可积,因此存在一处证明漏洞.

<!-- q {"id": "calc-w-014", "type": "错题", "tags": ["导数与微分"], "title": "f′(a) 与 lim f′(x) 的关系", "chapter": "导数与微分"} -->

<!-- stem -->
设$f(x)$在$x=a$的某邻域内有定义,在$x=a$的某去心邻域内可导,则下列论断正确的是:

- (A) 若$\lim\limits_{x\to a} f'(x) = A,$则$f'(a) = A$
- (B) 若$f'(a) = A$,则$\lim\limits_{x\to a} f'(x) = A$
- (C) 若$\lim\limits_{x\to a} f'(x) = \infty$,则$f'(a)$不存在
- (D) 若$f'(a)$不存在,则$\lim\limits_{x\to a} f'(x) = \infty$

<!-- answer -->
需要时刻记住的是:极限运算$\lim\limits_{x\to a} f(x)$,其只考虑$f(x)$在$x=a$的**去心邻域**上的行为,至于$f(a)$,其与极限运算并无关系.

对于(A)(D):若添加条件$f(x)$在$x=a$处连续,则它们都正确,否则仅需构造一个在$x=a$处断开,但两侧的导函数极限值相同的函数即可作为反例,如:

$$f(x) = \begin{cases} 1 & x\ge 0\\ 0 & x<0 \end{cases}$$

$\lim\limits_{x\to 0} f'(x) = 0$,但$f'(0)$不存在.因此(A)(D)错误

对于(B),构造函数:

$$f(x) = \begin{cases} x^2 \sin \dfrac{1}{x} & x\neq 0\\ 0 & x = 0 \end{cases}$$

$f'(0) = 0,$但$\lim\limits_{x\to 0} f'(x)$不存在

对于(C):假设$f'(a)$ 存在,则此时$f(x)$在$x=a$处连续且可导,有:

$$f'(a) = \lim_{x\to a} \frac{f(x) - f(a)}{x - a} \overset{\text{L'Hôpital's Rule}}{=} \lim_{x\to a} f'(x) = \infty$$

矛盾,故$f'(x)$不存在

<!-- q {"id": "calc-w-015", "type": "错题", "tags": ["导数与微分"], "title": "arctan((1+x)/(1-x)) 的高阶导数", "chapter": "导数与微分"} -->

<!-- stem -->
设$f(x) = \arctan \dfrac{1+x}{1-x}$,整数$n \ge 0,$则$f^{(2n+1)}(0) = ＿＿＿$

<!-- answer -->
$$\begin{aligned}
f'(x) &= \frac{1}{1+\left(\frac{1+x}{1-x}\right)^2} \cdot \frac{2}{(1-x)^2} = \frac{1}{1+x^2}\\
\frac{1}{1+x} &= 1 - x + x^2 - \cdots + (-1)^n x^{n}\\
f'(x) &= \sum_{n=0}^{\infty} (-1)^n x^{2n}
\end{aligned}$$

令$g(x) = f'(x)$,则:

$$f^{(2n+1)}(0) = g^{(2n)}(0) = \sum_{k=2n}^{+\infty} (-1)^n \cdot k!\, x^{k-2n} \Big|_{x=0} = (-1)^n \cdot (2n)!$$

<!-- q {"id": "calc-w-016", "type": "错题", "tags": ["中值定理、微分等式与不等式"], "title": "柯西中值定理形式的单调性条件", "chapter": "中值定理、微分等式与不等式"} -->

<!-- stem -->
设函数$f(x), g(x)$在$[a,b]$上连续,在$(a,b)$内可导,$g'(x) > 0$,则在$(a,b)$上,"$\dfrac{f'(x)}{g'(x)}$严格单调递增"是"$\dfrac{f(x) - f(a)}{g(x) - g(a)}$严格单调递增的"（ ）

- (A) 充分非必要条件
- (B) 必要非充分条件
- (C) 充要条件
- (D) 既不充分也不必要条件

<!-- answer -->
- 充分性:

  根据柯西中值定理,有:

  $$\frac{f(x) - f(a)}{g(x) - g(a)} = \frac{f'(\xi)}{g'(\xi)} \quad \xi \in (a,x)$$

  由于$\dfrac{f'(x)}{g'(x)}$严格单调递增,因此:

  $$\frac{f'(\xi)}{g'(\xi)} < \frac{f'(x)}{g'(x)}$$

  也即:

  $$\frac{f'(x)}{g'(x)} > \frac{f'(\xi)}{g'(\xi)} = \frac{f(x) - f(a)}{g(x) - g(a)} \overset{g'(x) > 0}{\Longrightarrow} f'(x) \cdot \left[g(x) - g(a)\right] > g'(x) \cdot \left[f(x) - f(a)\right]$$

  因此:

  $$\left[\frac{f(x) - f(a)}{g(x) - g(a)}\right]' = \frac{f'(x) \cdot \left[g(x) - g(a)\right] - g'(x) \cdot \left[f(x) - f(a)\right]}{\left(g(x) - g(a)\right)^2} > 0$$

  故$\dfrac{f(x) - f(a)}{g(x) - g(a)}$严格单调递增,充分性成立.

- 必要性:

  反例为:

  $$f(x) = \begin{cases} x^2 & -1 \le x < 0\\ 0 & 0\le x \le 1 \end{cases} \qquad g(x) = x$$

  因此必要性不成立.故"$\dfrac{f'(x)}{g'(x)}$严格单调递增"是"$\dfrac{f(x) - f(a)}{g(x) - g(a)}$严格单调递增"的充分非必要条件

**【笔记】**

**如何构造病态函数.**

构造病态函数前,先看需要反驳的命题是什么,然后从常用的病态函数模板中选取一个,并在其基础上修改,以达到"在特定点击穿原命题,而在其他点保持正常"的效果.常用的模板有:

- 分段拼接函数

  此类函数用于破坏拼接点处的性质,如可导、函数值存在、导函数连续等.例如:

  - $\lim\limits_{x\to a} f'(x)$ 存在,但$f'(a)$不存在:

    $$f(x) = \begin{cases} 0 & x \le 0\\ 1 & x > 0 \end{cases} \quad \lim_{x\to 0} f'(x) = 0,\ f'(0)\ \text{D.N.E}$$

  - $\lim\limits_{x\to a} f(x)$存在,但$f(a)$不存在或$f(a) \neq \lim\limits_{x\to a} f(x)$

    $$f(x) = \begin{cases} x & x\neq 0\\ a\ \text{or D.N.E} & x = 0 \end{cases} \quad a \neq 0$$

  - $\lim\limits_{x\to a} f(x) = f(a)$,但$f'(a)$不存在,如:

    $$f(x) = \left|x\right|$$

- 振荡函数

  此类函数用于破环某一点处导函数的连续性,比如:$f'(a)$存在,但$\lim\limits_{x\to a} f'(x)$不存在,如:

  $$f(x) = \begin{cases} x^k \sin \dfrac{1}{x} & x \neq 0\\ 0 & x = 0 \end{cases} \quad (k \ge 2)$$

  此时:

  $$f'(0) = \lim_{x\to 0} x^{k-1} \sin \frac{1}{x} = 0, \quad f'(x) = k x^{k-1} \sin \frac{1}{x} - x^{k-2} \cos \frac{1}{x}$$

  $k=2$时:$f'(x)$在$x = 0$附近振荡,没有极限,导函数振荡不连续.当$k$增大时,$f'(x)$的某个更高阶的导函数振荡不连续.

- 错位角标函数

  此类函数可以用于用两个非无穷大量合成一个无穷大量,如:

  $$x_n = n^{\frac{1+(-1)^n}{2}}, \quad y_n = n^{\frac{1-(-1)^n}{2}}$$

  $x_n, y_n$均为无界量而非无穷大量.而$x_n y_n$为无穷大量

- 局部躺平函数

  此类函数用于制造"导函数不单调但原函数单调"的情形.如让导函数的某一段退化为常数.

- 狄利克雷型函数:

  狄利克雷型函数定义为:

  $$D(x) = \begin{cases} 1 & x \in \mathbb{Q}\\ 0 & x \in \mathbb{R}-\mathbb{Q} \end{cases}$$

  该函数的特点为:处处不连续,从而处处不可导,任意点的极限不存在,任何区间上黎曼不可积.

  此外,还可以构造一个仅在单点处连续的函数:

  $$f(x) = \begin{cases} x & x \in \mathbb{Q}\\ 0 & x \in \mathbb{R}-\mathbb{Q} \end{cases}$$

  该函数仅在$x = 0$处连续

- 维尔斯特拉斯型函数:

  $$W(x) = \sum_{n=0}^{\infty} a^n \cos\left(b^n \pi x\right) \quad a \in (0,1),\ b = 2k+1\,(k\ge 0),\ a b > 1+ \frac{3}{2}\pi$$

  该函数的特点是:处处连续,但处处不可导

<!-- q {"id": "calc-w-017", "type": "错题", "tags": ["多元函数微分学"], "title": "由 f(xy, y/x)=y²(x²−1) 求 dz", "chapter": "多元函数微分学"} -->

<!-- stem -->
设函数$z = f(x,y)\ (x y \neq 0)$满足$f(x y, y/x) = y^2\left(x^2 - 1\right)$,求$\mathrm{d}z$

<!-- wrong -->
令$u = x y, v = y/x$,则$f(u,v) = u^2 - u v$

$$\mathrm{d}(f(u,v)) = (2u-v)\,\mathrm{d}u - u\,\mathrm{d}v$$

又因为:

$$\mathrm{d}u = y\,\mathrm{d}x + x\,\mathrm{d}y, \quad \mathrm{d}v = -\frac{y}{x^2}\,\mathrm{d}x + \frac{1}{x}\,\mathrm{d}y$$

代入上式可得:

$$\mathrm{d}(f(u,v)) = (2x y^2)\,\mathrm{d}x + 2y\left(x^2 - 1\right)\,\mathrm{d}y$$

故:

$$\mathrm{d}z = (2x y^2)\,\mathrm{d}x + 2y\left(x^2 - 1\right)\,\mathrm{d}y$$

**【笔记】** 错误之处在于最后多此一举的代换.将$\mathrm{d}u, \mathrm{d}v$代入到$\mathrm{d}(f(u,v))$的式子中,结果本质还是$f(u,v)$的微分,即$f(x y, y/x)$的微分,而题目需要求的是$f(x,y)$的微分

<!-- answer -->
求出$\mathrm{d}(f(u,v)) = (2u-v)\,\mathrm{d}u - u\,\mathrm{d}v$后,直接做变量替换即可,即:

$$\mathrm{d}(f(x,y)) = (2x-y)\,\mathrm{d}x - x\,\mathrm{d}y$$

<!-- q {"id": "calc-w-018", "type": "错题", "tags": ["多元函数微分学"], "title": "隐函数 f(z−x, z−y)=1 的混合偏导", "chapter": "多元函数微分学"} -->

<!-- stem -->
设$f(u,v)$存在二阶连续偏导数,$z = z(x,y)$是由方程$f(z-x, z-y) = 1$确定的隐函数,求$\dfrac{\partial^2 z}{\partial x \partial y}$

<!-- wrong -->
依题意可知:

$$f'_1(z-x, z-y) \cdot \left(\frac{\partial z}{\partial x} - 1\right) + f'_2(z-x, z-y)\, \frac{\partial z}{\partial x} = 0$$

$$\begin{aligned}
&\left[f'_{11}(z-x, z-y)\, \frac{\partial z}{\partial y} + f'_{12}(z-x, z-y)\left(\frac{\partial z}{\partial y} - 1\right)\right]\left(\frac{\partial z}{\partial x} - 1\right) + f'_1(z-x, z-y)\, \frac{\partial^2 z}{\partial x \partial y}\\
&+ \left[f'_{21}(z-x, z-y)\, \frac{\partial z}{\partial y} + f'_{22}(z-x, z-y)\left(\frac{\partial z}{\partial y} - 1\right)\right] \cdot \frac{\partial z}{\partial x} + f'_2(z-x, z-y)\, \frac{\partial^2 z}{\partial x \partial y} = 0
\end{aligned}$$

<!-- answer -->
上述步骤完全正确,但因为以下两点导致解答难以进行下去:

- 对$x$求偏导后未解出$\dfrac{\partial z}{\partial x}$.以及未对$y$做同样操作
- 未使用简记法,导致式子过于冗长,并且在草稿上运算、誊抄时极易出错

以下是标准解法:

$$f(z-x, z-y) = 1 \Rightarrow \frac{\partial z}{\partial y} f'_1 + \left(\frac{\partial z}{\partial y} - 1\right) f'_2 = 0 \Rightarrow \frac{\partial z}{\partial y} = \frac{f'_2}{f'_1 + f'_2}, \quad \text{Similarly } \frac{\partial z}{\partial x} = \frac{f'_1}{f'_1 + f'_2}$$

或者直接对方程两侧取全微分:

$$\begin{aligned}
&f'_1 \left(\mathrm{d}z - \mathrm{d}x\right) + f'_2 \left(\mathrm{d}z - \mathrm{d}y\right) = 0\\
&\left(f'_1 + f'_2\right) \mathrm{d}z = f'_1\,\mathrm{d}x + f'_2\,\mathrm{d}y\\
&\mathrm{d}z = \frac{f'_1}{f'_1 + f'_2}\,\mathrm{d}x + \frac{f'_2}{f'_1 + f'_2}\,\mathrm{d}y \quad \Longrightarrow \quad z_x = \frac{f'_1}{f'_1 + f'_2}, \ z_y = \frac{f'_2}{f'_1 + f'_2}
\end{aligned}$$

接着对$z_x$求$y$的偏导:

$$\begin{aligned}
\frac{\partial^2 z}{\partial x \partial y} &= \frac{\frac{\partial f'_1}{\partial y}\left(f'_1 + f'_2\right) - \frac{\partial\left(f'_1 + f'_2\right)}{\partial y} f'_1}{\left(f'_1 + f'_2\right)^2}\\
&= \frac{\left[f''_{11} \frac{\partial z}{\partial y} + f''_{12} \cdot \left(\frac{\partial z}{\partial y} - 1\right)\right]f'_2 - \left[f''_{21} \frac{\partial z}{\partial y} + f''_{22} \cdot \left(\frac{\partial z}{\partial y} - 1\right)\right] f'_1}{\left(f'_1 + f'_2\right)^2}\\
&= \frac{f''_{11} \left(f'_2\right)^2 - 2 f'_1 f'_2 f''_{12} + f''_{22} \left(f'_1\right)^2}{\left(f'_1 + f'_2\right)^3}
\end{aligned}$$

<!-- q {"id": "calc-w-019", "type": "错题", "tags": ["中值定理、微分等式与不等式"], "title": "单点导数值与区间单调性", "chapter": "中值定理、微分等式与不等式"} -->

<!-- stem -->
若函数$f(x)$在$x=0$的某邻域内有定义,则以下结论正确的是:

- (A) 若$f(0) = 0, f'(0) = 0$,则$x = 0$必不是极值点
- (B) 若$f'(0) = 0, f''(0) = 0$,则$x = 0$必是极值点
- (C) 若$f(0) = 0, f'(0) > 0,$则存在$\delta > 0$,使得$f(x)$在$(0, \delta)$内单调递增
- (D) 若$f'(0) = 0, f''(0) > 0,$则存在$\delta > 0$,使得$f(x)$在$(-\delta, 0)$内单调递减

<!-- answer -->
答案为D.

A, B较为简单,略过不讲.重点分析C, D

对于C,可举出经典反例:

$$f(x) = \begin{cases} x + 2x^2 \sin \dfrac{1}{x} & x \neq 0\\ 0 & x = 0 \end{cases}$$

该函数在$x = 0$处导数$f'(0) = 1 > 0$,但在右侧不存在一个区间使其保持单调.故C错误.

**【笔记】** 一个比较反直觉的事实是:单点的导数无法确定任何一个区间内的单调性.我们看$x = a$处的导数定义:

$$f'(a) = \lim_{x\to a} \frac{f(x) - f(a)}{x-a}$$

当$f'(a) > 0$时,结合极限操作的含义,其说明:

$$\exists \delta > 0, \ x \in (a-\delta, a+\delta), \quad f(x) - f(a) > 0 \ \text{and} \ f(x) - f(a) = o(x)$$

也就是:其只保证在$x = a$附近存在一个区间,对于其内的所有$x > a$,有$f(x) > f(a)$;所有$x < a$,有$f(x) < f(a)$.而如果要让$f(x)$在区间内单调递增的话,则需要保证:对于区间内的所有$x_1, x_2$,只要$x_1 < x_2$,则有$f(x_1) < f(x_2)$.其涉及到无穷个点对之间的比较,而单点的导数值信息无法提供这么强的条件.

而对于选项D,为什么单点导数为0的条件加上单点的二阶导数不为0的条件后,函数的单调性就可以在该点处确定了呢?原因如下:

$$f''(a) > 0 \Longleftrightarrow \lim_{x\to a} \frac{f'(x) - f'(a)}{x - a} = \lim_{x\to a} \frac{f'(x)}{x - a} > 0$$

我们都知道极限是具有保号性的,这意味着:

$$\exists \delta > 0, \ x \in (a-\delta, a + \delta), \quad \frac{f'(x)}{x - a} > 0$$

- $x \in (a - \delta, a), \quad f'(x) < 0$
- $x \in (a, a+\delta), \quad f'(x) > 0$

因此,我们得到的不仅是某一点的函数值信息,而是$x = a$处,附近一个极小邻域内的信息,这就足以让我们推出单调性:$x \in (a-\delta, a), f(x)$单调递减;$x \in (a, a+\delta), f(x)$单调递增.

<!-- q {"id": "calc-w-020", "type": "错题", "tags": ["导数与微分"], "title": "|f″|≤M 时 |f′| 的界", "chapter": "导数与微分"} -->

<!-- stem -->
设$f(x)$在$[0,1]$上二阶可导,$\left|f''(x)\right| \le M, \ x \in [0,1], \ M > 0, \ f(0) = f(1) = 0.$证明:

1. $\left|f'(x)\right| \le \dfrac{M}{2}, \ x \in [0,1]$
2. 若$f\!\left(\dfrac{1}{2}\right) = 0,$则$\left|f'(x)\right| < \dfrac{M}{2}, \ x \in [0,1]$

<!-- answer -->
1. $f(0) = f(1) = 0,$$x \in [0,1]$时,根据泰勒展开,有:

$$\begin{aligned}
&f(0) = f(x) + f'(x)(0-x) + \frac{f''(\xi_1)}{2} (0 - x)^2, \quad \xi_1 \in (0,x) \quad \text{①}\\
&f(1) = f(x) + f'(x)(1-x) + \frac{f''(\xi_2)}{2} (1 - x)^2, \quad \xi_2 \in (x,1) \quad \text{②}
\end{aligned}$$

① - ②得:

$$f'(x) = \frac{1}{2} \left[f''(\xi_1) x^2 - f''(\xi_2) (1-x)^2\right]$$

由$\left|f''(x)\right| \le M$,可得:

$$\begin{aligned}
\left|f'(x)\right| &\le \frac{1}{2} \left[\left|f''(\xi_1)\right| x^2 + \left|f''(\xi_2)\right| (1-x)^2\right]\\
&\le \frac{M}{2} \cdot \left[x^2 + (1-x)^2\right] \overset{*}{\le} \frac{M}{2} \cdot 1 = \frac{M}{2}
\end{aligned}$$

（$*$）处等号成立当且仅当$x \in \{0, 1\}$

2. 由第一问可知:$x \in (0,1)$时,$\left|f'(x)\right| < \dfrac{M}{2}$,因此只需研究$x \in \{0, 1\}$的情况.

若$\left|f'(0)\right| = \dfrac{M}{2}$,不妨设$f'(0) = \dfrac{M}{2}$,则:

$$f\!\left(\frac{1}{2}\right) = f(0) + f'(0)\left(\frac{1}{2} - 0\right) + \frac{f''(\xi)}{2} \left(\frac{1}{2} - 0\right)^2 = 0, \quad \xi \in \left(0, \frac{1}{2}\right)$$

化简得$\dfrac{M}{4} = -\dfrac{1}{8} f''(x) \Longleftrightarrow f''(\xi) = -2 M \Rightarrow \left|f''(\xi)\right| = 2M > M$,与题干矛盾.$f'(0) = -\dfrac{M}{2}$及$\left|f'(1)\right| = \dfrac{M}{2}$的情况同理,均产生矛盾,故$\left|f'(x)\right| < \dfrac{M}{2}, \ x \in [0,1]$

<!-- q {"id": "calc-w-021", "type": "错题", "tags": ["中值定理、微分等式与不等式"], "title": "中值定理中的 θ(x) 及其极限", "chapter": "中值定理、微分等式与不等式"} -->

<!-- stem -->
设$f(x) = \int_0^x e^{t^2}\,\mathrm{d}t, \ x \ge 0$.

1. 证明$\int_0^x e^{t^2}\,\mathrm{d}t = x f'[x \cdot \theta(x)]$,且$\theta(x)$唯一,其中$0 < \theta(x) < 1, \ x>0$;
2. 求$\lim\limits_{x\to 0^+} \theta(x)$.

<!-- answer -->
1.

$$\begin{aligned}
&f(x) - f(0) \overset{\text{Lagrange}}{=} f'[x \cdot \theta(x)] \cdot x, \quad 0 < \theta(x) < 1\\
&\Longleftrightarrow \int_0^x e^{t^2}\,\mathrm{d}t = x f'[x \cdot \theta(x)], \quad 0 < \theta(x) < 1
\end{aligned}$$

假设还存在一个$\theta^*(x)$,使得$f(x) - f(0) = f'[x \cdot \theta^*(x)] \cdot x$

则:

$$\begin{aligned}
x f'[x \cdot \theta(x)] - x f'[x \cdot \theta^*(x)] &= x \cdot \left\{f'[x \cdot \theta(x)] - f'[x \cdot \theta^*(x)]\right\}\\
&= x \cdot \left\{f''(\xi) \cdot \left[x \cdot \theta(x) - x \cdot \theta^*(x)\right]\right\}\\
&= x^2 \cdot f''(\xi) \cdot \left[\theta(x) - \theta^*(x)\right]\\
&= 0
\end{aligned}$$

其中$\xi \in \left(\min\left(x \cdot \theta(x), x \cdot \theta^*(x)\right), \max\left(x \cdot \theta(x), x \cdot \theta^*(x)\right)\right)$,而$f''(x) = 2x \cdot e^{x^2}$

因为$x > 0, \ \theta(x) \in (0,1) \Rightarrow x \cdot \theta(x) \neq 0 \Rightarrow f''(\xi) \neq 0$.故$\theta(x) - \theta^*(x) = 0$,因此$\theta(x)$唯一

**【说明】** 也可以:

$$\begin{aligned}
x f'[x \cdot \theta(x)] - x f'[x \cdot \theta^*(x)] = 0 &\overset{x > 0}{\Longrightarrow} f'(x \cdot \theta(x)) = f'(x \cdot \theta^*(x))\\
&\overset{f'(x) = e^{x^2}\ \text{is injection}}{\Longrightarrow} x \cdot \theta(x) = x \cdot \theta^*(x)\\
&\overset{x > 0}{\Longrightarrow} \theta(x) = \theta^*(x)
\end{aligned}$$

2. 由第一问可知:

$$\int_0^x e^{t^2}\,\mathrm{d}t = x \cdot e^{(x \cdot \theta(x))^2}$$

故:

$$\theta(x) = \frac{1}{x} \cdot \sqrt{\ln \frac{\int_0^x e^{t^2}\,\mathrm{d}t}{x}}$$

$$\begin{aligned}
\lim_{x\to 0^+} \theta(x) &= \lim_{x\to 0^+} \frac{1}{x} \sqrt{\ln \frac{\int_0^x e^{t^2}\,\mathrm{d}t}{x}}\\
&= \lim_{x\to 0^+} \frac{1}{x} \sqrt{\frac{\int_0^x e^{t^2}\,\mathrm{d}t}{x} - 1} \quad \left(\lim_{x\to 0^+} \frac{\int_0^x e^{t^2}\,\mathrm{d}t}{x} = 1\right)\\
&= \lim_{x\to 0^+} \sqrt{\frac{\int_0^x e^{t^2}\,\mathrm{d}t - x}{x^3}}\\
&= \sqrt{\lim_{x\to 0^+} \frac{e^{x^2} - 1}{3 x^2}} \quad \text{(L'Hôpital's Rule)}\\
&= \sqrt{\lim_{x\to 0^+} \frac{2x \cdot e^{x^2}}{6x}} \quad \text{(L'Hôpital's Rule)}\\
&= \sqrt{\lim_{x\to 0^+} \frac{1}{3} e^{x^2}}\\
&= \frac{\sqrt{3}}{3}
\end{aligned}$$

**【说明】** 也可以在$x = 0$附近泰勒展开:

$$e^{t^2} = 1 + t^2 + \frac{1}{2} t^4 + o\!\left(t^4\right) \Rightarrow \int_0^x e^{t^2}\,\mathrm{d}t = x + \frac{1}{3} x^3 + o\!\left(x^3\right)$$

$$\begin{aligned}
x \cdot e^{(x \theta(x))^2} &= x \cdot \left(1 + (x \theta(x))^2 + \frac{1}{2} (x \theta(x))^4 + o\!\left((x \theta(x))^4\right)\right)\\
&= x + x^3 \cdot \theta^2(x) + o\!\left(x^3 \theta^2(x)\right)
\end{aligned}$$

由泰勒展开的唯一性知$\lim\limits_{x\to 0^+} \theta^2(x) = \dfrac{1}{3}, \ \lim\limits_{x\to 0^+} \theta(x) = \dfrac{\sqrt{3}}{3}$

**【笔记】** 拉格朗日中值定理的几种形式:

- 标准形式

  $$f(b) - f(a) = f'(\xi) (b - a), \quad \xi \in (a,b)$$

- 有限增量形式

  $$f(x + \Delta x) - f(x) = f'(x + \theta \Delta x)\Delta x$$

- 微分形式

  $$\mathrm{d}y = f'(x + \theta \Delta x)\,\mathrm{d}x$$

- 几何形式

  区间$[a,b]$内,光滑曲线上至少存在一点$(\xi, f(\xi))$,该点处的切线平行于过端点$(a, f(a))$和$(b, f(b))$的割线

<!-- q {"id": "calc-w-022", "type": "错题", "tags": ["多元函数微分学"], "title": "约束曲线 (x−1)³=y² 下的最值", "chapter": "多元函数微分学"} -->

<!-- stem -->
分析函数$f(x,y) = x^2 + y^2$在约束条件$(x-1)^3 = y^2$下的最值情况.

<!-- answer -->
**法一：纯代数方法**

设拉格朗日函数$F(x,y,\lambda) = x^2 + y^2 + \lambda\left[(x-1)^3 - y^2\right]$,列方程组:

$$\begin{aligned}
F'_x &= 2x + 3\lambda(x-1)^2 \quad \text{①}\\
F'_y &= 2y - 2\lambda y \quad \text{②}\\
F'_\lambda &= (x-1)^3 - y^2 \quad \text{③}
\end{aligned}$$

由②可知: $y = 0$或$\lambda = 1$.

- $y = 0 \Rightarrow x = 1 \overset{\text{substitute ①}}{\Longrightarrow} 2 = 0$,产生矛盾
- $\lambda = 1 \overset{\text{substitute ①}}{\Longrightarrow} 3x^2 - 4x + 3 = 0$,无解.

**【笔记】** 拉格朗日常数法只能解决约束流形上梯度不为零的点，对于约束流形上的"奇异点"或"尖点",需要额外讨论

考虑约束曲线上的奇异点,即$\nabla g = 0$的点.梯度$\nabla g = \left(3(x-1)^2, -2y\right)$,令$\nabla g = 0,$得$x = 1, \ y = 0$

将$(1,0)$纳入候选点.分析其是最大值点、最小值点还是其他.令$t = x-1$,则$y = t^{3/2}$,则:

$$f(x,y) = x^2 + y^2 \Longleftrightarrow h(t) = (t+1)^2 + t^3$$

对该函数分析即可,可知$(1,0)$是最小值.即使在约束条件下,$x, y$都能趋向无穷,故$f(x,y)$显然无最大值

**【说明】** 其实,当我们用换元将$x, y$都换成关于$t$的式子后,$f(x,y)$就变成一个单变量函数,此时直接对$h(t)$求导分析,即可得到$f(x,y)$的最值情况

<!-- answer -->
**数形结合**

观察可得:$f(x,y)$实际表示曲线$(x-1)^3 = y^2$上的点到原点的距离的平方,而该曲线为开口向右的半立方抛物线.图像形状如下图所示,可以轻易看出$f(x,y)$在$(1,0)$处取得最小值,无最大值

![配图](assets/image-2.png)

<!-- q {"id": "calc-w-023", "type": "错题", "tags": ["多元函数微分学"], "title": "双约束下 u=√(x²+y²+z²) 的最值", "chapter": "多元函数微分学"} -->

<!-- stem -->
求函数$u = \sqrt{x^2 + y^2 + z^2}$在约束条件$x + 2y = 1$与$x^2 + 2y^2+z^2 = 1$下的最值

<!-- answer -->
**拉格朗日乘数法**

要求$u = \sqrt{x^2 + y^2 + z^2}$的最值,只需求$u^2 = x^2 + y^2 + z^2$的最值.

设拉格朗日函数$F(x,y,z,\lambda,\mu) = x^2 + y^2 + z^2 + \lambda(x + 2y-1) + \mu\left(x^2 + 2y^2 + z^2 - 1\right)$.解方程组

$$\begin{cases}
F'_x = 2x + \lambda + 2\mu x = 0\\
F'_y = 2y + 2\lambda + 4 \mu y = 0\\
F'_z = 2z + 2\mu z = 0\\
F'_\lambda = x + 2y-1 = 0\\
F'_\mu = x^2 + 2y^2 + z^2 - 1 = 0
\end{cases}$$

解方程组得候选点$\left(x_1, y_1, z_1\right) = \left(-\dfrac{1}{3}, \dfrac{2}{3}, 0\right)$和$\left(x_2, y_2, z_2\right) = (1, 0, 0)$,分别计算函数值,有:

$$u\left(-\frac{1}{3}, \frac{2}{3}, 0\right) = \frac{\sqrt{5}}{3}, \quad u(1,0,0) = 1$$

故所求最大值为1,最小值为$\dfrac{\sqrt{5}}{3}$

<!-- answer -->
**法二**

同样考虑求$u^2 = x^2 + y^2 + z^2$的最值,观察约束条件可得:$u^2 = 1-y^2$.因此本题转变为求$y$的取值范围.

将另一个约束条件$x = 1- 2y$代入$x^2 + 2y^2 + z^2 = 1$中,可得:

$$1 + 4y^2 - 4y + 2y^2 + z^2 = 1 \Longleftrightarrow z^2 = 4y - 6y^2 = 2y(2 - 3y)$$

由于$z^2 \ge 0$,因此$y \in \left[0, \dfrac{2}{3}\right]$,由于$u^2 = 1- y^2$在该区间内单调,因此将区间端点值分别代入即可得:

$$u_{\max} = 1, \quad u_{\min} = \frac{\sqrt{5}}{3}$$

<!-- q {"id": "calc-w-024", "type": "错题", "tags": ["多元函数微分学"], "title": "曲线切线与坐标轴围面积最小", "chapter": "多元函数微分学"} -->

<!-- stem -->
求曲线$x^2 - x y +y^2 = 1\ (x>0, y>0)$上的一点$P$,使该点处的切线与$x$轴,$y$轴在第一象限所围的图形的面积最小.

<!-- answer -->
方程$x^2 - x y + y^2 = 1$两边对$x$求导,得$y' = \dfrac{y-2x}{2y-x}$,因此曲线方程为:

$$Y - y = \frac{y-2x}{2y-x} (X - x)$$

分别令$X, Y=0$,可得切线在$x$轴、$y$轴上的截距分别为:$X = x-\dfrac{y(2y-x)}{y-2x}, \quad Y = y-\dfrac{x(y-2x)}{2y-x}$,故面积:

$$\begin{aligned}
S = \frac{1}{2} X Y &= 2 \cdot \frac{\left[x y - \left(x^2 + y^2\right)\right]\left(x^2+y^2 - x y\right)}{(y-2x)(x-2y)}\\
&= \frac{2}{(y-2x)(x-2y)} \quad \left(\text{since } x^2 - x y + y^2 = 1\right)
\end{aligned}$$

故题目变为求$(y-2x)(x-2y)$在约束条件$x^2 - x y + y^2 = 1, x>0, y>0$下的最值.构造拉格朗日函数后即可求得$S_{\min} = 2$,对应点$P$坐标为$(1,1)$

**【笔记】** 如果这是一道选择题或填空题,则可以考虑把答案猜出来:

约束方程$x^2 + y^2 - x y$关于$x, y$轮换对称,目标函数$S = \dfrac{2}{(2x-y)(2y-x)}$同样关于$x, y$轮换对称,因此可以猜测极值点出现在直线$x = y$上.代入可以得到候选点$(1,1)$,经验证其确实是最小值点.

<!-- q {"id": "calc-w-025", "type": "错题", "tags": ["多元函数微分学"], "title": "圆内切椭圆面积最小", "chapter": "多元函数微分学"} -->

<!-- stem -->
设曲线$L_1: x^2 + y^2 = 2y$内切于曲线$L_2: \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1\ (a, b>0),$求$a, b$的值,使$L_2$所围面积最小

<!-- answer -->
由对称性,$L_1$与$L_2$相切与关于$y$轴对称的两个点.且由图像易知:$b^2 \ge 2$.因此,由$\dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} = 1$,得:

$$x^2 = a^2 \left(1 - \frac{y^2}{b^2}\right)$$

代入$x^2 + y^2 = 2y$,则有:

$$\frac{a^2}{b^2}\left(b^2 - y^2\right) + y^2 - 2y = 0 \Longleftrightarrow \frac{b^2 - a^2}{b^2} y^2 - 2y + a^2 = 0$$

若$b^2 = a^2$,则$L_2$为圆,易知$a^2 = b^2 = 4, \ S = 4\pi$

$b^2 \neq a^2$时,此式为一个一元二次方程,令$\Delta = 0$,得$b^2 - a^2 b^2 + a^4 = 0$.而$S = \pi a b$,故题目变为求$a b$在约束条件$b^2 - a^2 b^2 + a^4 = 0$下的最小值.设拉格朗日函数可以解得$S_{\min}$对应$a = \dfrac{\sqrt{6}}{2}, \ b = \dfrac{3\sqrt{2}}{2}$.

**【说明】** 本体求出$\Delta = 0$后,其实可以直接将$b^2 = \dfrac{a^4}{a^2 - 1}$代入到目标函数$S = \pi a b$,等价于最小化

$$\left(a b\right)^2 = a^2 b^2 = \frac{a^6}{a^2 - 1}$$

换元,令$t = a^2$后得到$h(t) = \dfrac{t^3}{t-1}$,求导即可得最小值.

<!-- q {"id": "calc-w-026", "type": "错题", "tags": ["多元函数微分学"], "title": "u = xz + ay³ 的最大值", "chapter": "多元函数微分学"} -->

<!-- stem -->
设函数$u = x z + a y^3\ (z\ge 0),$且$x^2 + y^2 + z^2 = 1$.

(1)当$a = \dfrac{1}{3}$时,求$u$的最大值

(2)当$a = t$（$t$为变量）时,$u$是否有最大值,若有,求出最大值,若没有,说明理由

<!-- answer -->
第一问是常规的利用拉格朗日常数法求最值的题,略.第二问:取点$(0,1,0)$,此时$u = t. \ t\to+\infty, u\to+\infty \Longrightarrow u$无最大值.取点$(0,-1,0)$,此时$u = -t. \ t\to-\infty, u\to+\infty \Longrightarrow u$无最大值.

故$u$无最大值

<!-- q {"id": "calc-w-027", "type": "错题", "tags": ["多元函数微分学"], "title": "椭圆域上 u≥0 的证明", "chapter": "多元函数微分学"} -->

<!-- stem -->
设函数$u = u(x,y)$在区域$D = \left\{(x,y) \,\middle|\, 2x^2 + 3y^2 \le 4\right\}$上连续,在区域$D$的内部有二阶连续偏导数,且满足$-2 \dfrac{\partial^2 u}{\partial x^2} - 3 \dfrac{\partial^2 u}{\partial y^2} = u^2$.在区域$D$的边界$2x^2 + 3y^2 = 4$上$u(x,y) \ge 0$.

证明:当$2x^2 + 3y^2 \le 4$时,$u(x,y) \ge 0$.

<!-- answer -->
利用反证法:假设$u = u(x,y)$在区域$D$的内部有函数值小于0,则取$u(x,y)$在$D$内的最小值点$\left(x_0, y_0\right)$,则$\left(x_0, y_0\right)$必然也是极小值.因此有:

$$\frac{\partial u}{\partial x} \Big|_{\left(x_0, y_0\right)} = \frac{\partial u}{\partial y} \Big|_{\left(x_0, y_0\right)} = 0$$

$$\frac{\partial^2 u}{\partial x^2} \Big|_{\left(x_0, y_0\right)} \ge 0, \quad \frac{\partial^2 u}{\partial y^2} \Big|_{\left(x_0, y_0\right)} \ge 0$$

又有:$-2 \dfrac{\partial^2 u}{\partial x^2} - 3 \dfrac{\partial^2 u}{\partial y^2} = u^2$,故$u^2 \le 0,$则$u\left(x_0, y_0\right) = 0$,与假设矛盾,故假设不成立.因此:$2x^2 + 3y^2 \le 4$时,$u(x,y) \ge 0$.

<!-- q {"id": "calc-w-028", "type": "错题", "tags": ["多元函数微分学"], "title": "由偏微分方程与边界条件求 f(x,y) 的最值", "chapter": "多元函数微分学"} -->

<!-- stem -->
已知可微函数$f(u,v)$满足

$$\frac{\partial\left[f(u,v)\right]}{\partial u} + \frac{\partial\left[f(u,v)\right]}{\partial v} = 6(u+v) - 3u^2$$

且$f(u,0) = 3u^2 - u^3.$记$g(x,y) = f(x, x-y)$

(1)计算$\dfrac{\partial\left[g(x,y)\right]}{\partial x}$

(2)求$f(x,y)$在有界闭区域$D = \left\{(x,y) \,\middle|\, x^2 + y^2 \le 16\right\}$上的最值

<!-- answer -->
(1)

$$\begin{aligned}
\frac{\partial\left[g(x,y)\right]}{\partial x} &= \frac{\partial\left[f(u,v)\right]}{\partial u}\cdot \frac{\partial u}{\partial x} + \frac{\partial\left[f(u,v)\right]}{\partial v} \cdot \frac{\partial v}{\partial x}\\
&= \frac{\partial\left[f(u,v)\right]}{\partial u} + \frac{\partial\left[f(u,v)\right]}{\partial v}\\
&= 6(u+v) - 3u^2 = -3x^2 + 12 x - 6y
\end{aligned}$$

(2)由(1)可知:

$$g(x,y) = \int \left(-3x^2 + 12 x - 6y\right) \mathrm{d}x = 6x^2 - 6x y - x^3 + \phi(y)$$

又有$f(u,0) = 3u^2 - u^3, \ g(x,y) = f(x, x-y)$.令$x = y = u,$得:

$$g(u,u) = f(u,0) = 3u^2 - u^3 = -u^3 + \phi(u)$$

因此:$\phi(u) = 3u^2$

$$\begin{aligned}
g(x,y) = f(x, x-y) &= 6x^2 - 6x y - x^3 + 3y^2\\
&= 3x^2 - x^3 + 3(x-y)^2
\end{aligned}$$

故:

$$f(x,y) = 3x^2 - x^3 + 3y^2$$

之后便是常规操作.

<!-- q {"id": "calc-w-029", "type": "错题", "tags": ["多元函数微分学"], "title": "变量代换化简偏微分方程", "chapter": "多元函数微分学"} -->

<!-- stem -->
设$z = z(u,v)$具有二阶连续偏导数,且$z = z(x-y, x+2y)$满足:

$$2 \frac{\partial^2 z}{\partial x^2} + \frac{\partial^2 z}{\partial x \partial y} - \frac{\partial^2 z}{\partial y^2} = 2 \frac{\partial z}{\partial x} - \frac{\partial z}{\partial y}, \quad \frac{\mathrm{d}\left[z(0,v)\right]}{\mathrm{d}v} = \frac{1}{3} z(0,v) + e^{v/3}, \quad z(u,0) = \sin u$$

(1)证明$\dfrac{\partial^2 z}{\partial u \partial v} = \dfrac{1}{3} \cdot \dfrac{\partial z}{\partial u}$;

(2)求$z = z(u,v)$的表达式

<!-- answer -->
(1)

由$z = z(x-y, x+2y)$,有:

$$\frac{\partial z}{\partial x} = \frac{\partial z}{\partial u} + \frac{\partial z}{\partial v}, \quad \frac{\partial z}{\partial y} = -\frac{\partial z}{\partial u} + 2\frac{\partial z}{\partial v}$$

$$\begin{aligned}
\frac{\partial^2 z}{\partial x^2} &= \frac{\partial^2 z}{\partial u^2} + 2 \frac{\partial^2 z}{\partial u \partial v} + \frac{\partial^2 z}{\partial v^2}\\
\frac{\partial^2 z}{\partial y^2} &= \frac{\partial^2 z}{\partial u^2} - 4 \frac{\partial^2 z}{\partial u \partial v} + 4\frac{\partial^2 z}{\partial v^2}\\
\frac{\partial^2 z}{\partial x \partial y} &= - \frac{\partial^2 z}{\partial u^2} + \frac{\partial^2 z}{\partial u \partial v} + 2\frac{\partial^2 z}{\partial v^2}
\end{aligned}$$

代入原方程即可得$\dfrac{\partial^2 z}{\partial u \partial v} = \dfrac{1}{3} \cdot \left(\dfrac{\partial z}{\partial u}\right)$

(2)将(1)中得到的结论两边对$u$做积分,得:

$$\frac{\partial z}{\partial v} = \frac{1}{3} z + \phi_1(v)$$

依题意:$\dfrac{\mathrm{d}\left[z(0,v)\right]}{\mathrm{d}v} = \dfrac{1}{3} z(0,v) + e^{v/3}$,故$\phi_1(v) = e^{v/3}$,故:

$$z(u,v) = e^{v/3} \left[\int e^{v/3} \cdot e^{-v/3}\, \mathrm{d}v + C(u)\right] = e^{v/3} \cdot v + e^{v/3} \cdot C(u).$$

又因为$z(u,0) = 0 + C(u) = \sin u$.故

$$z(u,v) = e^{v/3} (v + \sin u)$$

<!-- q {"id": "calc-w-030", "type": "错题", "tags": ["二重积分"], "title": "积分方程中求常数 a", "chapter": "二重积分"} -->

<!-- stem -->
设$f(x)$是$[0,1]$上的连续函数且其在$[0,1]$上的平均值$\bar{f} = \dfrac{1}{2}$,满足$f(x) + a \int_1^x f(y) f(y-x)\,\mathrm{d}y = 1$,求常数$a$的值

<!-- answer -->
$\bar{f} = \dfrac{1}{2}$等价于告诉我们$\int_0^1 f(x)\,\mathrm{d}x = \dfrac{1}{2}$.因此直接对等式两边积分,得:

$$\begin{aligned}
\int_0^1 1\,\mathrm{d}x &= \int_0^1 \left(f(x) + a \int_1^x f(y) f(y-x)\,\mathrm{d}y\right) \mathrm{d}x\\
&= \int_0^1 f(x)\,\mathrm{d}x + a \int_0^1 \int_1^x f(y) f(y-x)\,\mathrm{d}y\, \mathrm{d}x\\
&= \frac{1}{2} - a \int_0^1 \mathrm{d}x \int_x^1 f(y) f(y-x)\,\mathrm{d}y\\
&= \frac{1}{2} - a \int_0^1 \mathrm{d}y \int_0^y f(y) f(y-x)\,\mathrm{d}x\\
&= \frac{1}{2} - a \int_0^1 f(y)\,\mathrm{d}y \int_0^y f(y-x)\,\mathrm{d}x
\end{aligned}$$

$$\text{Let } y - x = t \Rightarrow t \in (y,0), \quad \mathrm{d}x = -\mathrm{d}t \Rightarrow \int_0^y f(y-x)\,\mathrm{d}x = \int_0^y f(t)\,\mathrm{d}t$$

故原式为:

$$\begin{aligned}
\frac{1}{2} - a \int_0^1 f(y)\,\mathrm{d}y \int_0^y f(y-x)\,\mathrm{d}x &= \frac{1}{2} - a \int_0^1 \int_0^y f(t)\,\mathrm{d}t\, \mathrm{d}\!\left[\int_0^y f(t)\,\mathrm{d}t\right]\\
&= \frac{1}{2} - \frac{a}{2} \left[\int_0^y f(t)\,\mathrm{d}t\right]^2 \bigg|^1_0\\
&= \frac{1}{2} - \frac{a}{2} \left(\frac{1}{2}\right)^2 = 1
\end{aligned}$$

解得$a = -4$

**【说明】** 如果这是一道选择或填空题,许多人一定第一时间想到了"特殊值法".我们也来试一下:

$$\begin{aligned}
&\text{Let } f(x) = \frac{1}{2}, \quad \text{Then } \quad f(x) + a \int_1^x f(y) f(y-x)\,\mathrm{d}y = 1\\
&\Longleftrightarrow \frac{1}{2} + a \int_1^x \frac{1}{4}\,\mathrm{d}y = \frac{1}{2} + a \cdot \frac{x-1}{4} = 1 \Longleftrightarrow a(x-1) = 2
\end{aligned}$$

此时再对两边积分也可求得$a = -4$,但不禁让人疑惑:已经将等式化为最简的形势,为什么还要再做一步积分才能得到正确答案呢?

实际上,题干中的$f(x)$需要同时满足两个约束:

- $\int_0^1 f(x)\,\mathrm{d}x = \dfrac{1}{2}$
- $f(x) + a \int_1^x f(y) f(y-x)\,\mathrm{d}y = 1$

后面的函数方程是一个很强的约束,它要求$f(x)$在任意的$x$点都满足这个等式,说明其一定是一个具有特定形式的函数,而不是随意的满足$\int_0^1 f(x)\,\mathrm{d}x$的函数都可以.而特殊值法最后一步积分得到正确答案,也只是代数上恰好和正确解相等而已.

<!-- q {"id": "calc-w-031", "type": "错题", "tags": ["二重积分"], "title": "I₁ 与 I₂ 的大小比较", "chapter": "二重积分"} -->

<!-- stem -->
设$I_1 = \iint\limits_{0\le x \le 1,\ 0\le y\le 1} \left(\sin x^2 + \cos y^2\right) \mathrm{d}\sigma, \quad I_2 = \iint\limits_{\left|x\right| + \left|y\right| \le \frac{1}{2}} \left[2 + \ln\left(\sqrt{x^2 + y^2} + \frac{1}{2}\right)\right] \mathrm{d}\sigma$,则:

- (A) $1\le I_1\le I_2$
- (B) $I_1\le I_2\le 1$
- (C) $I_2 \le I_1 \le 1$
- (D) $I_2 \le 1 \le I_1$

<!-- answer -->
对于$I_1$,有:

$$\begin{aligned}
I_1 &= \iint\limits_{0\le x \le 1,\ 0\le y\le 1} \left(\sin x^2 + \cos y^2\right) \mathrm{d}\sigma\\
&= \int_0^1 \sin x^2\,\mathrm{d}x \int_0^1 \mathrm{d}y + \int_0^1 \cos y^2\,\mathrm{d}y \int_0^1 \mathrm{d}x\\
&= \int_0^1 \sin x^2\,\mathrm{d}x + \int_0^1 \cos y^2\,\mathrm{d}y\\
&= \int_0^1 \left(\sin t^2 + \cos t^2\right) \mathrm{d}t\\
&= \sqrt{2} \int_0^1 \sin\left(t^2 + \frac{\pi}{4}\right) \mathrm{d}t
\end{aligned}$$

$t \in [0,1] \Rightarrow t^2 + \dfrac{\pi}{4} \in \left[\dfrac{\pi}{4}, \dfrac{\pi}{4}+1\right] \Rightarrow \sin\left(t^2 + \dfrac{\pi}{4}\right) \in \left[\dfrac{\sqrt{2}}{2}, 1\right]$.因此:

$$I_1 \ge \sqrt{2} \cdot \frac{\sqrt{2}}{2} = 1$$

对于$I_2$:

$$x^2 + y^2 \le x^2 + 2 \left|x\right| \left|y\right| + y^2 = \left(\left|x\right| + \left|y\right|\right)^2 \le \left(\frac{1}{2}\right)^2 = \frac{1}{4}$$

故$2 + \ln\left(\sqrt{x^2 + y^2} + \dfrac{1}{2}\right) \le 2 + \ln\left(\dfrac{1}{2} + \dfrac{1}{2}\right) = 2$

$$I_2 = \iint\limits_{\left|x\right| + \left|y\right| \le \frac{1}{2}} \left[2 + \ln\left(\sqrt{x^2 + y^2} + \frac{1}{2}\right)\right] \mathrm{d}\sigma \le \frac{1}{2} \cdot 2 = 1$$

综上:$I_2 \le 1 \le I_1$

<!-- q {"id": "calc-w-032", "type": "错题", "tags": ["二重积分"], "title": "对称区域上的累次积分", "chapter": "二重积分"} -->

<!-- stem -->
$$\int_{-1}^0 \mathrm{d}x \int_{\left(1-x^{2/3}\right)^{3/2}}^{\left(1-x^2\right)^{1/2}} \left(1 - \sin x \cos y\right) \mathrm{d}y + \int_0^1 \mathrm{d}x \int_{\left(1-x^{2/3}\right)^{3/2}}^{\left(1-x^2\right)^{1/2}} \left(1 - \sin x \cos y\right) \mathrm{d}y = ＿＿＿$$

<!-- answer -->
设原式为$I$,则:

$$I = \int_{-1}^1 \mathrm{d}x \int_{\left(1-x^{2/3}\right)^{3/2}}^{\left(1-x^2\right)^{1/2}} \left(1 - \sin x \cos y\right) \mathrm{d}y$$

$\left(1-x^{2/3}\right)^{3/2}, \left(1-x^2\right)^{1/2}$均为关于$y$轴堆成的函数,故整个积分区域关于$y$轴对称,而被积函数的一部分$\sin x \cos y + \sin(-x) \cos y = 0$.故:

$$\begin{aligned}
I = \int_{-1}^1 \mathrm{d}x \int_{\left(1-x^{2/3}\right)^{3/2}}^{\left(1-x^2\right)^{1/2}} 1\,\mathrm{d}y &= 2\int_0^1 \left[\left(1-x^2\right)^{1/2} - \left(1-x^{2/3}\right)^{3/2}\right] \mathrm{d}x\\
&= 2 \int_0^1 \sqrt{1-x^2}\,\mathrm{d}x - 2 \int_0^1 \left(1-x^{2/3}\right)^{3/2} \mathrm{d}x
\end{aligned}$$

第一项是单位圆第一象限内面积的两倍,为$\dfrac{\pi}{2}$,第二项为:

$$\begin{aligned}
\text{Let } x = \sin^3 t, \quad \text{Then } 2 \int_0^1 \left(1-x^{2/3}\right)^{3/2} \mathrm{d}x &= 2 \int_0^{\pi/2} \left(1 - \sin^2 t\right)^{3/2} 3 \sin^2 t \cos t \,\mathrm{d}t\\
&= 6 \int_0^{\pi/2} \sin^2 t \cos^4 t \,\mathrm{d}t\\
&= 6 \int_0^{\pi/2} \left(\cos^4 t - \cos^6 t\right) \mathrm{d}t\\
&= 6 \cdot \left(\frac{3}{4} \cdot \frac{1}{2} \cdot \frac{\pi}{2} - \frac{5}{6} \cdot \frac{3}{4} \cdot \frac{1}{2} \cdot \frac{\pi}{2}\right)\\
&= \frac{3}{16} \pi
\end{aligned}$$

故$I = \dfrac{1}{2} \pi - \dfrac{3}{16} \pi = \dfrac{5}{16} \pi$

**【笔记】** 关于积分$\int_0^{\pi/2} \sin^m x \cos^n x\,\mathrm{d}x$,其实有公式可用,为:

- $\displaystyle\int_0^{\pi/2} \sin^m x \cos^n x\,\mathrm{d}x = \dfrac{(m-1)!!\,(n-1)!!}{(m+n)!!} K$.此为"点火公式"的推广.当$m, n$均为偶数时,点火成功,$K = \dfrac{\pi}{2}$,否则$K = 1$
- $\displaystyle\int_0^{\pi/2} \sin^m x \cos^n x\,\mathrm{d}x = \dfrac{\operatorname{Tau}\left(\frac{m+1}{2}\right) \operatorname{Tau}\left(\frac{n+1}{2}\right)}{2 \operatorname{Tau}\left(\frac{m+n+2}{2}\right)}$,这是三角函数的Beta公式,其中$\operatorname{Tau}$函数定义如下:

  > **推论（Tau 函数）**
  >
  > $$\operatorname{Tau}(\alpha) = \int_0^{+\infty} x^{\alpha-1} e^{-x}\,\mathrm{d}x$$
  >
  > 1. $\operatorname{Tau}(1) = 1$
  > 2. $\operatorname{Tau}\left(\dfrac{1}{2}\right) = \sqrt{\pi}$
  > 3. $\operatorname{Tau}(\alpha+1) = \alpha \operatorname{Tau}(\alpha)$

<!-- q {"id": "calc-w-033", "type": "错题", "tags": ["二重积分"], "title": "e^{(x+y)²}(x²−y²) 的二重积分", "chapter": "二重积分"} -->

<!-- stem -->
设有界区域$D$是由圆$x^2 + y^2 = 1$和直线$y = x$以及$x$轴所围成的在第一象限的图形,计算二重积分$\displaystyle\iint_D e^{(x+y)^2} \left(x^2 - y^2\right) \mathrm{d}x\, \mathrm{d}y$

<!-- answer -->
**法一**

积分区域为圆的一部分,考虑使用极坐标:

$$\text{Let } x = r \cos \theta, \quad y = r \sin \theta, \quad r \in [0,1], \quad \theta \in \left[0, \frac{\pi}{4}\right], \quad \det(J) = r$$

则原积分变为:

$$\begin{aligned}
I &= \iint_D e^{(x+y)^2} \left(x^2 - y^2\right) \mathrm{d}x\, \mathrm{d}y\\
&= \int_0^{\pi/4} \mathrm{d}\theta \int_0^1 e^{r^2\left(\sin \theta + \cos \theta\right)^2} r^3 \left(\cos^2 \theta - \sin^2 \theta\right) \mathrm{d}r\\
&= \int_0^1 r\, \mathrm{d}r \int_0^{\pi/4} e^{r^2\left(\sin \theta + \cos \theta\right)^2} r^2 \left(\cos^2 \theta - \sin^2 \theta\right) \mathrm{d}\theta\\
&= \frac{1}{2} \int_0^1 r\, \mathrm{d}r \int_0^{\pi/4} e^{r^2\left(\sin \theta + \cos \theta\right)^2} \mathrm{d}\left(r^2\left(\sin \theta + \cos \theta\right)^2\right)\\
&= \frac{1}{2} \int_0^1 r\, \mathrm{d}r \left. e^{r^2\left(\sin \theta + \cos \theta\right)^2} \right|^{\pi/4}_0\\
&= \frac{1}{2} \int_0^1 r\left(e^{2r^2} - e^{r^2}\right) \mathrm{d}r\\
&= \frac{(e-1)^2}{8}
\end{aligned}$$

<!-- answer -->
**法二**

积分式中,涉及到$x, y$的只有$x+y, x-y$两种形式,因此可以做换元:

$$\text{Let } u = x-y, \quad v = x+y, \quad D_{u,v} = \left\{(u,v) \,\middle|\, u^2 + v^2 \le 2, \ v\ge u\ge 0\right\}, \quad \det(J) = \frac{1}{2}$$

故原积分式为:

$$I = \iint_D e^{(x+y)^2} \left(x^2 - y^2\right) \mathrm{d}x\, \mathrm{d}y = \iint_{D_{u v}} \frac{1}{2} e^{v^2} u v \,\mathrm{d}u\, \mathrm{d}v = \frac{(e-1)^2}{8}$$

<!-- q {"id": "calc-w-034", "type": "错题", "tags": ["二重积分"], "title": "椭圆域上 (1−12x²−y²) 的积分", "chapter": "二重积分"} -->

<!-- stem -->
设$D = \left\{(x,y) \,\middle|\, 4x^2 + y^2 < 1, \ x\ge 0, \ y\ge 0\right\}$,则积分$I = \displaystyle\iint_D \left(1 - 12x^2 - y^2\right) \mathrm{d}x\, \mathrm{d}y = ＿＿＿$

<!-- answer -->
**法一：极坐标换元**

看到积分区域有$x^2 + y^2$的形式,自然而然地想到作极坐标:

$$\text{Let } x = r \cos \theta, \quad y = r \sin \theta, \quad \theta \in \left[0, \frac{\pi}{2}\right], \quad r \in \left[0, \sqrt{\frac{1}{3 \cos^2 \theta + 1}}\right), \quad \det(J) = r$$

则原积分变为:

$$\begin{aligned}
I &= \iint_D \left(1 - 12x^2 - y^2\right) \mathrm{d}x\, \mathrm{d}y\\
&= \int_0^{\pi/2} \mathrm{d}\theta \int_0^{\sqrt{1/\left(3 \cos^2 \theta + 1\right)}} \left(1 - r^2 - 11r^2 \cos^2 \theta\right) r \,\mathrm{d}r\\
&\overset{t = r^2}{=} \frac{1}{2} \int_0^{\pi/2} \mathrm{d}\theta \int_0^{1/\left(3 \cos^2 \theta + 1\right)} \left(1-t-11t \cos \theta\right) \mathrm{d}t\\
&= \frac{1}{2} \int_0^{\pi/2} \left[\frac{1}{3 \cos^2 \theta + 1} - \frac{1+11\cos^2 \theta}{2} \cdot \frac{1}{\left(3 \cos^2 \theta + 1\right)^2}\right] \mathrm{d}\theta\\
&= \frac{1}{4} \int_0^{\pi/2} \frac{1-5 \cos^2 \theta}{\left(3 \cos^2 \theta + 1\right)^2} \,\mathrm{d}\theta\\
&\overset{t = \tan \theta}{=} \int_0^{+\infty} \frac{t^2 - 4}{\left(t^2 + 4\right)^2}\, \mathrm{d}t\\
&= - \left. \frac{t}{t^2 + 4} \right|_0^{+\infty} = 0
\end{aligned}$$

实际做下来会发现计算量极大,而且最后一次换元也不容易想到.

<!-- answer -->
**法二：直接计算**

将重积分化为累次积分,根据题目所给的区域$D$,可得$x, y$的取值范围分别为:

$$0 \le x < \frac{\sqrt{1-y^2}}{2}, \quad 0\le y < 1$$

因此,原积分变为:

$$\begin{aligned}
I = \iint_D \left(1 - 12x^2 - y^2\right) \mathrm{d}x\, \mathrm{d}y &= \int_0^1 \mathrm{d}y \int_0^{\sqrt{1-y^2}/2} \left(1 - 12 x^2 - y^2\right) \mathrm{d}x\\
&= \int_0^1 \mathrm{d}y \left(x - 4x^3 - y^2 x\right) \Big|^{\sqrt{1-y^2}/2}_0\\
&= \int_0^1 \left(1-y^2\right) \cdot \frac{\sqrt{1-y^2}}{2} - 4 \cdot \frac{\left(1-y^2\right)\sqrt{1-y^2}}{8}\, \mathrm{d}y\\
&= \int_0^1 0\, \mathrm{d}y = 0
\end{aligned}$$

实际上手计算后发现,比第一种方法运算轻松得多.

**【笔记】** 关于本题积分为什么为0:

积分式$1 - 12 x^2 - y^2$恰好等于$\dfrac{\partial}{\partial x} \left[x\left(1-y^2 - 4x^2\right)\right]$,而$1-\left(y^2+4x^2\right)$恰好是椭圆边界方程的"亏量".在区域$D$的边界上,这一项恒等于0.因此对固定的$y \in [0,1)$,令$X(y) = \dfrac{\sqrt{1-y^2}}{2}$,有:

$$\int_0^{X(y)} \left(1 - 12 x^2 -y^2\right) \mathrm{d}x = \left[x\left(1-y^2-4x^2\right)\right]^{X(y)}_0 = 0$$

因为上标即为边界方程.因此其对每一个$y$都为0,故整个积分都为0.

<!-- answer -->
**法三：广义极坐标换元**

实际上,第一种方法复杂的原因很大一部分来自于使用了圆坐标去处理椭圆区域.如果我们用正规的椭圆三角换元,也会减少很大一部分计算量:

$$\text{Let } x = \frac{1}{2} r \cos \theta, \quad y = r \sin \theta, \quad \theta \in \left[0, \frac{\pi}{2}\right], \quad r \in [0,1), \quad \det(J) = \frac{r}{2}$$

原积分式变为:

$$\begin{aligned}
I &= \iint_D \left(1 - 12x^2 - y^2\right) \mathrm{d}x\, \mathrm{d}y\\
&= \int_0^{\pi/2} \mathrm{d}\theta \int_0^1 \left(1 - 3 r^2 \cos^2 \theta - r^2 \sin^2 \theta\right) \frac{r}{2}\, \mathrm{d}r\\
&= \frac{1}{4} \int_0^{\pi/2} \mathrm{d}\theta \cdot \left(r - \frac{3 \cos^2 \theta + \sin^2 \theta}{2} r^2\right) \Big|^1_0\\
&= \frac{1}{8} \int_0^{\pi/2} \left(2 - 3 \cos^2 \theta - \sin^2 \theta\right) \mathrm{d}\theta\\
&= \frac{1}{8} \left[\frac{\pi}{2} - 2 \int_0^{\pi/2} \cos^2 \theta\, \mathrm{d}\theta\right]\\
&= \frac{1}{8} \cdot \left(\frac{\pi}{2} - \frac{\pi}{2}\right) = 0
\end{aligned}$$

计算量同样不大.

<!-- q {"id": "calc-w-035", "type": "错题", "tags": ["二重积分"], "title": "椭圆域上 (x−1)²+(2y+3)² 的积分", "chapter": "二重积分"} -->

<!-- stem -->
设$D = \left\{(x,y) \,\middle|\, \dfrac{x^2}{a^2} + \dfrac{y^2}{b^2} \le 1\right\}$,常数$a > 0, \ b > 0, \ a\neq b,$计算$I = \displaystyle\iint_D \left[(x-1)^2 + (2y+3)^2\right] \mathrm{d}x\, \mathrm{d}y$

<!-- answer -->
**法一**

看到积分区域$D$的形式,自然地想到广义极坐标换元:

$$\text{Let } x = a r \cos \theta, \quad y = b r \sin \theta, \quad \det(J) = a b r$$

$$\begin{aligned}
\text{Then } I &= \iint_D\left[(x-1)^2 + (2y+3)^2\right] \mathrm{d}x\, \mathrm{d}y\\
&= \int_0^{2\pi} \mathrm{d}\theta \int_0^1 \left[\left(a r \cos \theta - 1\right)^2 + \left(2 b r \sin \theta + 3\right)^2\right] a b r \,\mathrm{d}r\\
&= a b \int_0^{2\pi} \mathrm{d}\theta \int_0^1 \left[\left(a^2 \cos^2 \theta + 4b^2 \sin^2 \theta\right)r^3 - \left(2a \cos \theta - 12 b \sin \theta\right)r^2 + 10r\right] \mathrm{d}r\\
&= a b \left[\frac{1}{4} \int_0^{2\pi} \left(a^2 \cos^2\theta + 4b^2 \sin^2\theta\right) \mathrm{d}\theta - \frac{1}{3} \int_0^{2\pi}\left(2a \cos \theta - 12 b \sin \theta\right) \mathrm{d}\theta + \frac{10}{2} \int_0^{2\pi} \mathrm{d}\theta\right]\\
&= a b \left(\frac{a^2}{4} + b^2 + 10\right) \pi \quad \left(\text{You should know that } \int_0^{2\pi} \left(2a \cos \theta - 12 b \sin \theta\right) \mathrm{d}\theta = 0\right)\\
&= 10 \pi a b + \frac{\pi}{4} a^3 b + \pi a b^3
\end{aligned}$$

<!-- answer -->
**法二**

积分区域$D$是椭圆,而椭圆在四个象限内是对称的.因此:

$$\begin{aligned}
I &= \iint_D \left[(x-1)^2 + (2y+3)^2\right] \mathrm{d}x\, \mathrm{d}y\\
&= \iint_D \left(x^2 + 4y^2 + 10 - 2x + 12 y\right) \mathrm{d}x\, \mathrm{d}y\\
&= \iint_D x^2\, \mathrm{d}x\, \mathrm{d}y + 4 \iint_D y^2\, \mathrm{d}x\, \mathrm{d}y + 10 \iint_D \mathrm{d}x\, \mathrm{d}y - \iint_D (2x - 12y)\, \mathrm{d}x\, \mathrm{d}y\\
&= 4 \int_0^a \mathrm{d}x \int_0^{\frac{b}{a}\sqrt{a^2 - x^2}} x^2 \,\mathrm{d}y + 16 \int_0^b \mathrm{d}y \int_0^{\frac{a}{b}\sqrt{b^2-y^2}} y^2 \,\mathrm{d}x + 10 a b \pi - 0\\
&= 10 a b \pi + \frac{\pi}{4} a^3 b + \pi a b^3
\end{aligned}$$

关键一步在于:由奇函数的性质得出在对称区间上$\displaystyle\iint_D (2x-12 y)\, \mathrm{d}x\, \mathrm{d}y = 0$以及由椭圆的面积公式得出:$\displaystyle\iint_D \mathrm{d}x\, \mathrm{d}y = a b \pi$

**【笔记】** 下面内容可以作为结论记住:

- $\displaystyle\iint_D x^2\, \mathrm{d}x\, \mathrm{d}y = \frac{\pi}{4} a^3 b$
- $\displaystyle\iint_D y^2\, \mathrm{d}x\, \mathrm{d}y = \frac{\pi}{4} b^3 a$

<!-- q {"id": "calc-w-036", "type": "错题", "tags": ["二重积分"], "title": "环形区域 (x²+y²)/(|x|+|y|) 的积分", "chapter": "二重积分"} -->

<!-- stem -->
计算二重积分$\displaystyle\iint_D \frac{x^2 + y^2}{\left|x\right| + \left|y\right|} \mathrm{d}x\, \mathrm{d}y$,其中$D = \left\{(x,y) \,\middle|\, 1 \le \left|x\right| + \left|y\right| \le 2\right\}$

<!-- wrong -->
积分区间$D$是一个对称区间,同时关于$x$轴和$y$轴对称.因此选取第一象限内的区域:

$$I = \iint_D \frac{x^2 + y^2}{\left|x\right| + \left|y\right|} \mathrm{d}x\, \mathrm{d}y = 4 \int_0^2 \mathrm{d}x \int_{1-x}^{2-x} \frac{x^2 + y^2}{x+y}\, \mathrm{d}y$$

$$\begin{aligned}
\int_{1-x}^{2-x} \frac{x^2 + y^2}{x + y}\,\mathrm{d}y &= \int_{1-x}^{2-x} \frac{(x+y)^2}{x+y}\, \mathrm{d}y - 2x \int_{1-x}^{2-x} \frac{y}{x+y}\, \mathrm{d}y\\
&= \int_{1-x}^{2-x} \frac{(x+y)^2}{x+y}\, \mathrm{d}y - 2x \left(\int_{1-x}^{2-x} \frac{x+y}{x+y}\, \mathrm{d}y - x \int_{1-x}^{2-x} \frac{1}{x+y}\, \mathrm{d}y\right)\\
&= \cdots = 2 \ln 2\, x^2 - 2x + \frac{3}{2}
\end{aligned}$$

代入到原积分式内得:$I = \dfrac{56}{3} \ln 2 - 6$

**【笔记】** 该解法的思路没有错,但是弄错了$y$的积分下限,最终导致结果错误.真正的积分下限并非$1-x$,而是$\max\left(1-x, 0\right)$,因此,第一象限内的积分还要分为两个部分讨论:

$$\int_0^1 \mathrm{d}x \int_{1-x}^{2-x} \frac{x^2 + y^2}{x+y}\, \mathrm{d}y + \int_1^2 \mathrm{d}x \int_0^{2-x} \frac{x^2 + y^2}{x+y}\, \mathrm{d}y$$

<!-- answer -->
作极坐标变换:

$$x = r \cos \theta , \quad y = r \sin \theta, \quad \det(J) = r$$

同样只计算第一象限内的积分:

$$\begin{aligned}
I &= 4 \iint_{D_1} \frac{r^2}{\cos \theta + \sin \theta}\, \mathrm{d}r\, \mathrm{d}\theta\\
&= 4 \int_0^{\pi/2} \mathrm{d}\theta \int_{1/\left(\cos \theta + \sin \theta\right)}^{2/\left(\cos \theta + \sin \theta\right)} \frac{r^2}{\cos \theta + \sin \theta}\, \mathrm{d}r\\
&= \frac{28}{3} \int_0^{\pi/2} \frac{1}{\left(\cos \theta + \sin \theta\right)^4}\, \mathrm{d}\theta\\
&= \frac{7}{3} \int_0^{\pi/2} \frac{1}{\sin^4\left(\theta + \frac{\pi}{4}\right)}\, \mathrm{d}\theta\\
&= \frac{56}{9}
\end{aligned}$$

<!-- q {"id": "calc-w-037", "type": "错题", "tags": ["二重积分"], "title": "∫∫ y√(1+x²−y²) 与 |x|³", "chapter": "二重积分"} -->

<!-- stem -->
计算$\displaystyle\int_{-1}^1 \mathrm{d}y \int_{-1}^{y} y \sqrt{1+x^2-y^2}\, \mathrm{d}x$

<!-- answer -->
$$\begin{aligned}
I = \int_{-1}^1 \mathrm{d}y \int_{-1}^{y} y \sqrt{1+x^2-y^2}\, \mathrm{d}x &= \frac{1}{2} \int_{-1}^1 \mathrm{d}x \int_{x}^{1} \sqrt{1+x^2 - y^2}\, \mathrm{d}\left(y^2\right)\\
&= \frac{1}{2} \int_{-1}^1 \mathrm{d}x \int_{x^2}^{1} \sqrt{1+x^2 - t}\, \mathrm{d}t\\
&= \frac{1}{2} \int_{-1}^1 \mathrm{d}x \left[- \frac{2}{3} \left(1+x^2 - t\right)^{3/2}\right]^1_{x^2}\\
&= \frac{1}{2} \int_{-1}^1 \left(- \frac{2}{3} \left|x\right|^3 + \frac{2}{3}\right) \mathrm{d}x\\
&= \frac{2}{3} \int_0^1 \left(1 - x^3\right) \mathrm{d}x = \frac{1}{2}
\end{aligned}$$

<!-- wrong -->
$$\begin{aligned}
I = \int_{-1}^1 \mathrm{d}y \int_{-1}^{y} y \sqrt{1+x^2-y^2}\, \mathrm{d}x &= \frac{1}{2} \int_{-1}^1 \mathrm{d}x \int_{x}^{1} \sqrt{1+x^2 - y^2}\, \mathrm{d}\left(y^2\right)\\
&= \frac{1}{2} \int_{-1}^1 \mathrm{d}x \int_{x^2}^{1} \sqrt{1+x^2 - t}\, \mathrm{d}t\\
&= \frac{1}{2} \int_{-1}^1 \mathrm{d}x \left[- \frac{2}{3} \left(1+x^2 - t\right)^{3/2}\right]^1_{x^2}\\
&= \frac{1}{2} \int_{-1}^1 \left(- \frac{2}{3} x^3 + \frac{2}{3}\right) \mathrm{d}x\\
&= \frac{2}{3}
\end{aligned}$$

**【笔记】** 错误之处在于:

$$- \frac{2}{3} \left(1+x^2 - t\right)^{3/2} \Big|^1_{x^2} = - \frac{2}{3} \left(x^2\right)^{3/2} + \frac{2}{3} \neq - \frac{2}{3} x^3 + \frac{2}{3}$$

更精确的定位:$\left(x^2\right)^{3/2} = \left|x\right|^3$,而非$x^3$,错误解法正是没意识到这一步导致出错

<!-- q {"id": "calc-w-038", "type": "错题", "tags": ["二重积分"], "title": "圆域上的绝对值积分", "chapter": "二重积分"} -->

<!-- stem -->
计算二重积分$\displaystyle\iint_D \left|x^2 + y^2 - \sqrt{2} (x+y)\right| \mathrm{d}x\, \mathrm{d}y,$其中$D = \left\{(x,y) \,\middle|\, x^2 + y^2 \le 4\right\}$

<!-- answer -->
本题的难点在于如何去除绝对值.可以看到积分区域$D$本身是一个圆心位于原点的圆.而积分项绝对值内部可以化为:

$$x^2 + y^2 - \sqrt{2}(x+y) = \left(x - \frac{\sqrt{2}}{2}\right)^2 + \left(y-\frac{\sqrt{2}}{2}\right)^2 - 1$$

因此,我们可以作一个圆心在$\left(\dfrac{\sqrt{2}}{2}, \dfrac{\sqrt{2}}{2}\right)$,半径为$1$的圆$\odot_1$,则$\odot_1$将积分区域$D$划分为$D_1, D_2$两个区域,$D_1$在$\odot_1$里面,对应$x^2 + y^2 - \sqrt{2}(x+y) < 0$的区域,$D_2$则是剩下的部分,对应$x^2 + y^2 - \sqrt{2}(x+y) > 0$的部分.因此:

$$\begin{aligned}
I &= \iint_D \left|x^2 + y^2 - \sqrt{2} (x+y)\right| \mathrm{d}x\, \mathrm{d}y\\
&= - \iint_{D_1} \left[x^2 + y^2 - \sqrt{2} (x+y)\right] \mathrm{d}x\, \mathrm{d}y + \iint_{D_2} \left[x^2 + y^2 - \sqrt{2} (x+y)\right] \mathrm{d}x\, \mathrm{d}y\\
&= - \iint_{D_1} \left[x^2 + y^2 - \sqrt{2} (x+y)\right] \mathrm{d}x\, \mathrm{d}y + \iint_{D-D_1} \left[x^2 + y^2 - \sqrt{2} (x+y)\right] \mathrm{d}x\, \mathrm{d}y\\
&= - 2 \iint_{D_1} \left[x^2 + y^2 - \sqrt{2} (x+y)\right] \mathrm{d}x\, \mathrm{d}y + \iint_D \left[x^2 + y^2 - \sqrt{2} (x+y)\right] \mathrm{d}x\, \mathrm{d}y\\
&= -4 \int_{-\pi/4}^{\pi/4} \mathrm{d}\theta \int_0^{\sqrt{2} (\cos \theta + \sin \theta)} \left[r^3 - \sqrt{2} r^2 (\cos \theta + \sin \theta)\right] \mathrm{d}r + \iint_D \left(x^2 + y^2\right) \mathrm{d}x\, \mathrm{d}y\\
&= 9\pi
\end{aligned}$$

其中倒数第二步利用了小圆$\odot_1$关于直线$y = x$的对称性.

另外,对于在$D_1$上的积分,其实可以平移坐标原点,将其移至$\odot_1$的圆心,这样计算会简便不少:

$$\text{Let } x' = x - \frac{\sqrt{2}}{2}, \quad y' = y - \frac{\sqrt{2}}{2}$$

$$\begin{aligned}
\iint_{D_1} \left(x^2 + y^2 - \sqrt{2}(x+y)\right) \mathrm{d}x\, \mathrm{d}y &= \iint_{x'^2 + y'^2 \le 1} \left(x'^2 + y'^2 - 1\right) \mathrm{d}x' \, \mathrm{d}y'\\
&= \int_0^{2\pi} \mathrm{d}\theta \int_0^1 \left(r^2-1\right) r \,\mathrm{d}r = -\frac{\pi}{2}
\end{aligned}$$

<!-- q {"id": "calc-w-039", "type": "错题", "tags": ["二重积分"], "title": "sin(max{x²,y²}) 的积分", "chapter": "二重积分"} -->

<!-- stem -->
设$D = \left\{(x,y) \,\middle|\, 0\le x\le \sqrt{\pi}, \ 0\le y\le \sqrt{\pi}\right\},$计算二重积分$\displaystyle\iint_D \sin\left(\max\left\{x^2, y^2\right\}\right) \mathrm{d}\sigma$

<!-- wrong -->
积分区域$D$关于直线$y = x$对称的区域,取直线上面部分作为$D_1$,可得:

$$\begin{aligned}
\iint_D \sin\left(\max\left\{x^2, y^2\right\}\right) \mathrm{d}\sigma &= 2\iint_{D_1} \sin y^2 \,\mathrm{d}\sigma\\
&= 2 \int_0^{\sqrt{\pi}} \mathrm{d}x \int_x^{\sqrt{\pi}} \sin y^2 \,\mathrm{d}y
\end{aligned}$$

而:$\int \sin x^2\, \mathrm{d}x$没有可用初等函数表示的原函数,也无法通过换元积得结果。解题陷入僵局

<!-- answer -->
得到:$\int_0^{\sqrt{\pi}} \mathrm{d}x \int_x^{\sqrt{\pi}} \sin y^2 \,\mathrm{d}y$后,交换积分次序,得到:

$$\begin{aligned}
I &= 2 \int_0^{\sqrt{\pi}} \mathrm{d}y \int_0^{y} \sin y^2 \,\mathrm{d}x\\
&= 2 \int_0^{\sqrt{\pi}} \sin y^2 \cdot y \,\mathrm{d}y\\
&= \int_0^{\sqrt{\pi}} \sin y^2 \,\mathrm{d}\left(y^2\right)\\
&= \int_0^{\pi} \sin t \,\mathrm{d}t = 2
\end{aligned}$$

<!-- q {"id": "calc-w-040", "type": "错题", "tags": ["二重积分"], "title": "菱形区域上 e^{|y|/(|x|+|y|)} 的积分", "chapter": "二重积分"} -->

<!-- stem -->
设平面区域$D = \left\{(x,y) \,\middle|\, \left|x\right| + \left|y\right| \le 1\right\},$求$\displaystyle\iint_D e^{\frac{\left|y\right|}{\left|x\right| + \left|y\right|}} \mathrm{d}\sigma$

<!-- answer -->
积分区域$D$是一个关于原点对称的菱形区域,被积函数同样即关于$x$轴对称又关于$y$轴对称,因此取区域$D_1 = \left\{(x,y) \,\middle|\, x+y\le 1, \ x\ge 0, \ y\ge 0\right\}$,则:

$$I = 4 \iint_{D_1} e^{\frac{y}{x+y}} \,\mathrm{d}\sigma$$

做极坐标换元:

$$x = r \cos \theta, \quad y = r \sin \theta, \quad \det(J) = r, \quad \theta \in \left[0, \frac{\pi}{2}\right], \quad r \in \left[0, \frac{1}{\sin \theta + \cos \theta}\right]$$

则:

$$\begin{aligned}
\iint_{D_1} e^{\frac{y}{x+y}} \,\mathrm{d}\sigma &= \int_0^{\pi/2} \mathrm{d}\theta \int_0^{1/\left(\sin \theta + \cos \theta\right)} \exp\left(\frac{\sin \theta}{\sin \theta + \cos \theta}\right) r \,\mathrm{d}r\\
&= \int_0^{\pi/2} \exp\left(\frac{\sin \theta}{\sin \theta + \cos \theta}\right) \mathrm{d}\theta \cdot \frac{1}{2} r^2 \bigg|^{\frac{1}{\cos \theta + \sin \theta}}_0\\
&= \frac{1}{2} \int_0^{\pi/2} \exp\left(\frac{\sin \theta}{\sin \theta + \cos \theta}\right) \frac{1}{\left(\cos \theta + \sin \theta\right)^2}\, \mathrm{d}\theta\\
&= \frac{1}{2} \int_0^{\pi/2} \exp\left(\frac{\sin \theta}{\sin \theta + \cos \theta}\right) \mathrm{d}\left(\frac{\sin \theta}{\sin \theta + \cos \theta}\right)\\
&= \frac{1}{2} \exp\left(\frac{\sin \theta}{\sin \theta + \cos \theta}\right) \bigg|^{\pi/2}_0\\
&= \frac{1}{2} \left(e - 1\right)
\end{aligned}$$

因此$I = 4 \iint_{D_1} e^{\frac{y}{x+y}} \,\mathrm{d}\sigma = 2\left(e-1\right)$

**【笔记】** 本题的关键在于看出:

$$\frac{1}{\left(\cos \theta + \sin \theta\right)^2}\, \mathrm{d}\theta = \mathrm{d}\left(\frac{\sin \theta}{\sin \theta + \cos \theta}\right)$$

**【说明】** 这题没有出现诸如$x^2+y^2$这样的形式,为什么使用极坐标换元是自然的?我们可以看到:

$$\frac{y}{x+y} = \frac{\lambda y}{\lambda x + \lambda y}$$

这说明$\dfrac{y}{x+y}$的值完全不受$(x,y)$到原点的距离影响,只受向量$(x,y)$与$x$轴的夹角大小影响.这就表明使用极坐标换元后,其会变成一个只含$\theta$的表达式,最终有关$r$的积分变为一个简单的$r\,\mathrm{d}r$.而这类函数被称之为"零次齐次函数"

<!-- q {"id": "calc-w-041", "type": "错题", "tags": ["二重积分"], "title": "含待定常数的积分方程", "chapter": "二重积分"} -->

<!-- stem -->
设$f(x,y)$在$D = \left\{(x,y) \,\middle|\, x^2+y^2 \le 1\right\}$上连续,$f(x,y) = e^{x^2 + y^2} - \displaystyle\iint_D \frac{\left(2x^2+1\right)f(x,y)}{x^2+y^2+1} \,\mathrm{d}x\, \mathrm{d}y,$求$\displaystyle\iint_D f(x,y)\, \mathrm{d}x\, \mathrm{d}y$

<!-- answer -->
令$a = \displaystyle\iint_D \frac{\left(2x^2+1\right)f(x,y)}{x^2+y^2+1} \,\mathrm{d}x\, \mathrm{d}y$,由于积分区域$D$是一个确定的区域,被积函数$f(x,y)$是一个确定的函数,因此$a$也是一个确定的数,所以:

$$f(x,y) = e^{x^2 + y^2} - a = f(y,x)$$

因此$f(x,y)$具有轮换对称性.于是:

$$\begin{aligned}
a = \iint_D \frac{\left(2x^2+1\right)f(x,y)}{x^2+y^2+1} \,\mathrm{d}x\, \mathrm{d}y &= \iint_D \frac{\left(2y^2+1\right)f(x,y)}{x^2+y^2+1} \,\mathrm{d}x\, \mathrm{d}y\\
&= \frac{1}{2} \iint_D \frac{\left(2x^2+2y^2+2\right)f(x,y)}{x^2 + y^2 + 1} \,\mathrm{d}x \,\mathrm{d}y\\
&= \iint_D f(x,y)\, \mathrm{d}x\, \mathrm{d}y \quad \text{Important!!!}\\
&= \iint_D \left(e^{x^2+y^2} - a\right) \mathrm{d}x\, \mathrm{d}y\\
&= \int_0^{2\pi} \mathrm{d}\theta \int_0^1 \left(e^{r^2} - a\right) r \,\mathrm{d}r\\
&= (e-a-1)\pi
\end{aligned}$$

解得$a = \dfrac{(e-1)\pi}{\pi+1}$,故$\displaystyle\iint_D f(x,y)\, \mathrm{d}x\, \mathrm{d}y = \dfrac{(e-1)\pi}{\pi+1}$

<!-- q {"id": "calc-w-042", "type": "错题", "tags": ["二重积分"], "title": "挖去半圆区域的二重积分", "chapter": "二重积分"} -->

<!-- stem -->
计算$I = \displaystyle\iint_D x^2 y^2 \,\mathrm{d}x\, \mathrm{d}y,$其中$D$是由直线$y = 2, \ x = 0, \ x = -2$及曲线$x = -\sqrt{2y - y^2}$所围成的区域

<!-- answer -->
积分区域$D$是一个正方形内部挖去了一个半圆.因此,令:

$$D_1 = \left\{(x,y) \,\middle|\, -2\le x\le 0, \ 0\le y\le 2\right\}, \quad D_2 = \left\{(x,y) \,\middle|\, x^2+(y-1)^2 \le 1, \ x \le 0\right\}$$

则:

$$I = \iint_{D_1} x^2 y^2 \,\mathrm{d}x\, \mathrm{d}y - \iint_{D_2} x^2 y^2 \,\mathrm{d}x\, \mathrm{d}y$$

$$\begin{aligned}
I_1 &= \iint_{D_1} x^2 y^2 \,\mathrm{d}x\, \mathrm{d}y\\
&= \int_{-2}^0 x^2 \,\mathrm{d}x \int_0^2 y^2 \,\mathrm{d}y\\
&= \left. \frac{1}{3} x^3 \right|^0_{-2} \cdot \left. \frac{1}{3} y^3 \right|^2_0 = \frac{64}{9}
\end{aligned}$$

$$\begin{aligned}
I_2 &= \iint_{D_2} x^2 y^2 \,\mathrm{d}x\, \mathrm{d}y\\
&= \int_{\pi/2}^{\pi} \mathrm{d}\theta \int_0^{2 \sin \theta} r^5 \sin^2 \theta \cos^2 \theta \,\mathrm{d}r\\
&= \int_{\pi/2}^{\pi} \frac{32}{3} \sin^8 \theta \left(1 - \sin^2 \theta\right) \mathrm{d}\theta\\
&= \frac{32}{3} \int_0^{\pi/2} \left(\cos^8 \theta - \cos^{10} \theta\right) \mathrm{d}\theta\\
&= \frac{32}{3} \cdot \left(\frac{7}{8} \cdot \frac{5}{6} \cdot \frac{3}{4} \cdot \frac{1}{2} - \frac{9}{10} \cdot \frac{7}{8} \cdot \frac{5}{6} \cdot \frac{3}{4} \cdot \frac{1}{2}\right) \cdot \frac{\pi}{2}\\
&= \frac{7}{48} \pi
\end{aligned}$$

因此:$I = \dfrac{64}{9} - \dfrac{7}{48} \pi$

**【笔记】** 对于这种积分区域含圆,但圆心不在原点的情况,需要注意的是,例如本题的积分区域$D_2 = \left\{(x,y) \,\middle|\, x^2 + (y-1)^2 \le 1, \ x\le 0\right\}$,对应的极坐标变换应该是:

$$x = r \cos \theta, \quad y = r \sin \theta, \quad \theta \in \left[\frac{\pi}{2}, \pi\right], \quad r \in [0, 2 \sin \theta]$$

或:

$$x = r \cos \theta, \quad y = 1 + r \sin \theta, \quad \theta \in \left[\frac{\pi}{2}, \frac{3\pi}{2}\right], \quad r \in [0, 1]$$

如果变换后极点不在直角坐标系的原点,则平移过程应体现在换元中.

<!-- q {"id": "calc-w-043", "type": "错题", "tags": ["微分方程"], "title": "所有解都趋于 0 的微分方程", "chapter": "微分方程"} -->

<!-- stem -->
每一个解$y = y(x)$都满足$\lim\limits_{x\to +\infty} y(x) = 0$的微分方程是（ ）

- (A) $y' + \dfrac{y}{\sqrt{1+x^3}} = 0$
- (B) $y' - \dfrac{y}{\sqrt{1+x^3}} = 0$
- (C) $y' + \dfrac{y}{\sqrt[4]{1+x^3}} = 0$
- (D) $y' - \dfrac{y}{\sqrt[4]{1+x^3}} = 0$

<!-- answer -->
四个选项的方程都是一阶线性齐次方程的形式:$y' + p(x) y = 0$,其通解可以表示为:

$$y = C e^{- \int p(x)\,\mathrm{d}x} \quad \text{or} \quad y = C e^{-\int_{x_0}^x p(t)\,\mathrm{d}t}$$

**【笔记】** $e^{-\int p(x)\,\mathrm{d}x}$和$e^{-\int_{x_0}^x p(t)\,\mathrm{d}t}$是完全等价的两种写法,但适用场景不同.前者适合求通解的题目,后者适合带初始条件$y(x_0) = y_0$的特解问题,可以直接令$C = y_0$

对于本题$\lim\limits_{x\to +\infty} y(x) = 0$的条件,使用第二种写法$y = C e^{- \int_{x_0}^x p(t)\,\mathrm{d}t}$比较合适,则此时当且仅当$\int_{x_0}^{+\infty} p(x)\,\mathrm{d}x$发散于$+\infty$时,$\lim\limits_{x\to +\infty} y(x) = C e^{-\lim\limits_{x\to +\infty} \int_{x_0}^x p(t)\,\mathrm{d}t} = 0$

因此,题目转变成判断四个选项中$p(x)$部分的敛散性,下面的部分等号表示"敛散性相同":

- $\displaystyle\int_{x_0}^{+\infty} \frac{1}{\sqrt{1+x^3}}\,\mathrm{d}x = \int_{x_0}^{+\infty} x^{-3/2}\, \mathrm{d}x = -2 x^{-1/2} \Big|^{+\infty}_{x_0} = \frac{2}{\sqrt{x_0}}$ 收敛
- $\displaystyle\int_{x_0}^{+\infty} - \frac{1}{\sqrt{1+x^3}}\,\mathrm{d}x = \int_{x_0}^{+\infty} x^{-3/2}\, \mathrm{d}x$ 收敛
- $\displaystyle\int_{x_0}^{+\infty} \frac{1}{\sqrt[4]{1+x^3}}\,\mathrm{d}x = \int_{x_0}^{+\infty} x^{-3/4}\, \mathrm{d}x = 4 x^{1/4} \Big|^{+\infty}_{x_0} = +\infty$ 符合题义
- $\displaystyle\int_{x_0}^{+\infty} - \frac{1}{\sqrt[4]{1+x^3}}\,\mathrm{d}x = -\infty$ 不符合题义

综上,只有方程$y'+ \dfrac{y}{\sqrt[4]{1+x^3}} = 0$符合题义

<!-- q {"id": "calc-w-044", "type": "错题", "tags": ["微分方程"], "title": "y = e^{-2x}f(x,x) 的表达式", "chapter": "微分方程"} -->

<!-- stem -->
设$f(u,v)$具有连续偏导数,且满足$f'_u (u,v)+f'_v (u,v) = u v$,则函数$y = e^{-2x} f(x,x)$满足条件$y \big|_{x = 0} = 1$的表达式为＿＿＿

<!-- answer -->
$$\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}}{\mathrm{d}x}\left(e^{-2x} f(x,x)\right) = -2 e^{-2x} f(x,x) + e^{-2x}\left(f'_1(x,x) + f'_2(x,x)\right)= -2y + x^2 e^{-2x}$$

因此原条件变为微分方程:

$$y' + 2y = x^2 e^{-2x}$$

通解为:

$$y = \left(\frac{x^3}{3} + C\right) e^{-2x}$$

由$y \big|_{x=0} = 1$得$C = 1$,所以$y = \left(\dfrac{x^3}{3} + 1\right) e^{-2x}$

<!-- q {"id": "calc-w-045", "type": "错题", "tags": ["微分方程"], "title": "反常积分均收敛时 k 的范围", "chapter": "微分方程"} -->

<!-- stem -->
如果对于微分方程$y'' - (2k-4)y' + k y = 0$的任一解$y(x)$,反常积分$\int_0^{+\infty} y(x)\,\mathrm{d}x$均收敛,则$k$的取值范围为:

- (A) $(-\infty,1)$
- (B) $(0,1]$
- (C) $(-\infty,2)$
- (D) $(0,2)$

<!-- wrong -->
对于二阶常系数齐次微分方程,设其特征方程为:

$$r^2 + p r + q = 0$$

- 若有两不同实根$r_1, r_2$,则通解为$C_1 e^{r_1 x} + C_2 e^{r_2 x}$
- 若有两相同实根$r$,则通解为$\left(C_1 + C_2 x\right)e^{r x}$
- 若有复根$\alpha \pm \beta i$,则通解为$e^{\alpha x} \left(C_1 \cos \beta x + C_2 \sin \beta x\right)$

要使$\int_0^{+\infty} y(x)\,\mathrm{d}x$收敛,则考虑:

$$r_1 < 0, \quad r_2 < 0 \Longrightarrow \int_0^{+\infty} C_1 e^{r_1 x} + C_2 e^{r_2 x}\, \mathrm{d}x \quad \text{Convergence}$$

下解特征方程$r^2 - (2k-4)r + k = 0$:

$$\Delta = (2k-4)^2 - 4k = 4k^2 + 16 - 20k = 4(k-1)(k-4)$$

考虑有两相异实根的情况,则$k \in (-\infty,1) \cup (4, +\infty)$,要收敛,则$r_1 < 0, r_2 < 0$,即:

$$\frac{(2k-4) + \sqrt{\Delta}}{2} = \frac{2k - 4 + 2 \sqrt{(k-1)(k-4)}}{2} = k - 2 + \sqrt{(k-1)(k-4)} < 0$$

解得$k > 0$,因此$k \in (0,1)$

有两复根的情况难以着手

<!-- answer -->
接上面的讨论,其实有复根的情况并不复杂,我们只需知道:$\alpha < 0$时,$\int_0^{+\infty} e^{\alpha x} \left(C_1 \cos \beta x + C_2 \sin \beta x\right) \mathrm{d}x$必定收敛,下证这个结论,不失一般性,我们讨论$\int_0^{+\infty} e^{\alpha x} \cos \beta x\, \mathrm{d}x$这个积分:

$$\begin{aligned}
\int_0^{+\infty} e^{\alpha x} \cos \beta x\, \mathrm{d}x &= \frac{1}{\beta} \left(\int_0^{+\infty} e^{\alpha x}\, \mathrm{d}\left(\sin \beta x\right)\right)\\
&= \frac{1}{\beta} \left(e^{\alpha x} \sin \beta x \Big|_0^{+\infty} - \alpha \int_0^{+\infty} e^{\alpha x} \sin \beta x\, \mathrm{d}x\right)\\
&= \frac{1}{\beta} \cdot \frac{\alpha}{\beta} \int_0^{+\infty} e^{\alpha x}\, \mathrm{d}\left(\cos \beta x\right)\\
&= \frac{\alpha}{\beta^2} \left(e^{\alpha x} \cos \beta x \Big|_0^{+\infty} - \alpha \int_0^{+\infty} e^{\alpha x} \cos \beta x\, \mathrm{d}x\right)\\
&= - \frac{\alpha}{\beta^2} - \frac{\alpha^2}{\beta^2} \int_0^{+\infty} e^{\alpha x} \cos \beta x\, \mathrm{d}x
\end{aligned}$$

移项可得$\int_0^{+\infty} e^{\alpha x} \cos \beta x\, \mathrm{d}x = - \dfrac{\alpha}{\alpha^2 + \beta^2}$,自然收敛

因此除了上面讨论过的$k \in (0,1)$外,若$k$能满足有复根且$\alpha < 0$的话,也是符合题义的.方程解为:$k-2 \pm \sqrt{- (k-1)(k-4)}\,i$,实部$\alpha$来自$k-2$这一部分,因此若要$\alpha < 0$,则只需$k < 2$

$k=1$的情况经验算也符合题义,而$k = 4$的情况不符合,因此最终答案为:

$$k \in (0,2)$$

<!-- q {"id": "calc-w-046", "type": "错题", "tags": ["微分方程"], "title": "积分方程化二阶微分方程", "chapter": "微分方程"} -->

<!-- stem -->
设当$x \ge 0$时,$f(x)$有连续的一阶导数,并且满足$f(x) = -1 + x + 2 \int_0^x (x-t) f(t) f'(t)\, \mathrm{d}t$,则$f(x) = ＿＿＿$

<!-- wrong -->
$$\begin{aligned}
f(x) &= -1 + x + 2x \int_0^x f(t)\, f'(t)\, \mathrm{d}t - 2 \int_0^x t f(t)\, f'(t)\, \mathrm{d}t\\
f'(x) &= 1 + 2 \int_0^x f(t)\, f'(t)\, \mathrm{d}t + 2x f(x) f'(x) - 2 x f(x) f'(x)\\
&= 1 + 2 \int_0^x f(t)\, f'(t)\, \mathrm{d}t\\
f''(x) &= 2f(x)f'(x)
\end{aligned}$$

且由$f(x), f'(x)$的表达式可以得知:$f(0) = -1, f'(0) = 1$,下解微分方程:

$$y'' = 2y' y$$

$$\begin{aligned}
&\text{Let } p = \frac{\mathrm{d}y}{\mathrm{d}x}, \quad \text{Then } y'' = \frac{\mathrm{d}p}{\mathrm{d}x} = \frac{\mathrm{d}p}{\mathrm{d}y} \cdot p\\
&\text{So} \quad \frac{\mathrm{d}p}{\mathrm{d}y}p = 2 p y \Rightarrow \frac{\mathrm{d}p}{\mathrm{d}y} = 2 y, \quad p = y^2 + C_1
\end{aligned}$$

$$\begin{aligned}
&\text{In another word } \frac{\mathrm{d}y}{\mathrm{d}x} = y^2 + C_1, \quad \frac{1}{C_1 + y^2}\, \mathrm{d}y = \mathrm{d}x\\
&\text{It means } \frac{1}{\sqrt{C_1}} \cdot \arctan\left(\frac{y}{\sqrt{C_1}}\right) = x + C_2, \quad \frac{1}{C_1 + y^2} \cdot \frac{\mathrm{d}y}{\mathrm{d}x} = C_2
\end{aligned}$$

$$\text{With } f(0) = -1, f'(0) = 1, \ \text{We get } \quad \frac{1}{C_1 + 1} = C_2, \quad 1 = 1 + C_1 \Rightarrow C_1 = 0, \ C_2 = 1$$

而$C_1$处于分母位置,不能为0,解题陷入僵局

<!-- answer -->
实际上,有:

$$f'(x) = 1 + 2 \int_0^x f(t)\, f'(t)\, \mathrm{d}t = 1 + \int_0^x 2 f(t)\, \mathrm{d}\left(f(t)\right) = 1 + f^2(x) - f^2(0)$$

代入$f(0) = -1,$得$f'(x) = f^2(x),$解得$f(x) = - \dfrac{1}{x+C}$,代入$f(0) = -1$解得$C = 1$,因此:

$$f(x) = - \frac{1}{x+1}$$

**【笔记】** 错误解法犯了两个错误:

1. 草率得约去了因式$p$,正确的做法是提取公因式,得到:$p\left(\dfrac{\mathrm{d}p}{\mathrm{d}y} - 2y\right) = 0$,再对$p$是否为0进行分类讨论
2. 盲目套用公式$\dfrac{1}{C_1 + y^2}\, \mathrm{d}y = \dfrac{1}{\sqrt{C_1}} \cdot \arctan\left(\dfrac{y}{\sqrt{C_1}}\right)$,实际上这一步要求$C_1 > 0$

<!-- q {"id": "calc-w-047", "type": "错题", "tags": ["微分方程"], "title": "dy = cos(y−x)dx 的特解", "chapter": "微分方程"} -->

<!-- stem -->
微分方程$\mathrm{d}y = \cos(y-x)\, \mathrm{d}x$满足$y(0) = \dfrac{\pi}{2}$的解为

<!-- answer -->
令$u = y - x$,则$\dfrac{\mathrm{d}y}{\mathrm{d}x} = \dfrac{\mathrm{d}u}{\mathrm{d}x} + 1$,原式变为:

$$\frac{\mathrm{d}u}{\mathrm{d}x} + 1 = \cos u \Longleftrightarrow \frac{\mathrm{d}u}{\cos u - 1} = \mathrm{d}x$$

<!-- q {"id": "calc-w-048", "type": "错题", "tags": ["微分方程"], "title": "x′ − √(x+y²) = −2y 的特解", "chapter": "微分方程"} -->

<!-- stem -->
设$y\ge -2,$则微分方程$x' - \sqrt{x+y^2} = -2y$满足$x(0) = 1$的特解为

<!-- answer -->
令$x + y^2 = u,$则$\dfrac{\mathrm{d}x}{\mathrm{d}y} + 2 y = \dfrac{\mathrm{d}u}{\mathrm{d}y}$,原方程变为:

$$\frac{\mathrm{d}u}{\mathrm{d}y} - 2y - \sqrt{u} = -2y \Longleftrightarrow \frac{\mathrm{d}u}{\mathrm{d}y} = \sqrt{u} \Longleftrightarrow \frac{1}{\sqrt{u}}\, \mathrm{d}u = \mathrm{d}y$$

得:

$$2 \sqrt{u} = y + C \Longleftrightarrow u = \left(\frac{y+C}{2}\right)^2 \Longleftrightarrow x+y^2 = \left(\frac{y+C}{2}\right)^2$$

代入$x(0) = 1$,解得:

$$x = - \frac{3}{4} y^2 + y+1, \quad y\ge -2$$

<!-- q {"id": "calc-w-049", "type": "错题", "tags": ["微分方程"], "title": "y″−3y′+2y=xeˣ 的特解形式", "chapter": "微分方程"} -->

<!-- stem -->
微分方程$y'' - 3y' + 2y = x e^x$的特解为

<!-- wrong -->
对于齐次方程$y'' - 3y'+2y = 0$:

$$r^2 - 3r + 2 = 0 \Longrightarrow r_1 = 1, \quad r_2 = 2$$

因此解为:$C_1 e^x + C_2 e^{2x}$

对于非齐次方程$y'' - 3y' + 2y = x e^x$,自由项的形式为$P_n (x) e^{\alpha x}$,则特解应设为:$y = e^x Q_n (x) x^k$,即$C x^2 e^x \quad \left(Q_n (x) = C x, \ k = 1\right)$,因此:

$$\begin{aligned}
y' &= 2C x e^x + C x^2 e^x\\
y'' &= 2 C e^x + 2C x e^x + 2C x e^x + C x^2 e^x\\
&= 2C e^x + 4C x e^x + C x^2 e^x
\end{aligned}$$

代入原方程,得:

$$2C e^x + 4C x e^x + C x^2 e^x - 6C x e^x - 3C x^2 e^x + 2C x^2 e^x = 2C e^x - 2C x e^x = x e^x$$

即$2C - 2C x = x$.看起来似乎无解

<!-- answer -->
注意:$Q_1 (x) = A x + B$,即:$x$的一阶多项式需要带上常数项

<!-- q {"id": "calc-w-050", "type": "错题", "tags": ["微分方程"], "title": "y′ − 1/x = e^{−y} 的通解", "chapter": "微分方程"} -->

<!-- stem -->
微分方程$\dfrac{\mathrm{d}y}{\mathrm{d}x} - \dfrac{1}{x} = e^{-y}$的通解为

<!-- answer -->
两边同时乘$e^y$,得:$e^y \dfrac{\mathrm{d}y}{\mathrm{d}x} - \dfrac{1}{x} e^y = 1$,即:

$$\frac{\mathrm{d}\left(e^y\right)}{\mathrm{d}x} - \frac{1}{x} e^y = 1 \Longleftrightarrow \frac{1}{x}\, \frac{\mathrm{d}\left(e^y\right)}{\mathrm{d}x} - \frac{1}{x^2} e^y = \frac{1}{x} \Longleftrightarrow \left(\frac{1}{x} \cdot e^y\right)' = \frac{1}{x}$$

由此:

$$\frac{1}{x} \cdot e^y = \ln \left|x\right| + C$$

故:

$$y = \ln\left[x \left(\ln \left|x\right| + C\right)\right]$$

<!-- q {"id": "calc-w-051", "type": "错题", "tags": ["微分方程"], "title": "互换未知函数与自变量求解", "chapter": "微分方程"} -->

<!-- stem -->
将以$y = y(x)$为未知函数的微分方程$y'' + \left(x + e^y + \sin y\right) \left(y'\right)^3 = 0$化为以$x = x(y)$为未知函数的形式,并求其通解.

<!-- answer -->
$$\begin{aligned}
y' &= \frac{\mathrm{d}y}{\mathrm{d}x} = \frac{1}{\frac{\mathrm{d}x}{\mathrm{d}y}} = \frac{1}{x'(y)}\\
y'' &= \frac{\mathrm{d}}{\mathrm{d}x} \frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}}{\mathrm{d}x} \frac{1}{x'(y)} = - \frac{1}{\left(x'(y)\right)^2} \cdot \frac{\mathrm{d}x'(y)}{\mathrm{d}x}\\
&= - \frac{1}{\left(x'(y)\right)^2} \cdot \frac{\mathrm{d}}{\mathrm{d}y} \cdot \frac{\mathrm{d}x}{\mathrm{d}y} \cdot \frac{\mathrm{d}y}{\mathrm{d}x}\\
&= - \frac{1}{\left(x'(y)\right)^3} \cdot \frac{\mathrm{d}^2 x}{\mathrm{d}y^2}
\end{aligned}$$

因此,原方程可化为:

$$- \frac{1}{\left(x'(y)\right)^3} \cdot \frac{\mathrm{d}^2 x}{\mathrm{d}y^2} + \left(x + e^y + \sin y\right) \frac{1}{\left(x'(y)\right)^3} = 0 \quad \Longleftrightarrow \quad \frac{\mathrm{d}^2 x}{\mathrm{d}y^2} - x = e^y + \sin y$$

此为二阶常系数非齐次线性方程,对应的齐次线性方程的特征方程的根为$r = \pm 1$,因此通解为:

$$X = C_1 e^y + C_2 e^{-y}$$

设非齐次线性方程的特解为:

$$X^* = A y e^y + B \cos y + C \sin y$$

最终可以解得:

$$x = C_1 e^y + C_2 e^{-y} + \frac{1}{2} y e^y - \frac{1}{2} \sin y$$

其中$C_1, C_2$为常数.

<!-- q {"id": "calc-w-052", "type": "错题", "tags": ["微分方程"], "title": "u = f(x)+g(y) 型偏微分方程", "chapter": "微分方程"} -->

<!-- stem -->
设$u(x,y) = f(x) + g(y)$具有二阶连续偏导数,且满足$\left[1 + \left(\dfrac{\partial u}{\partial y}\right)^2\right] \dfrac{\partial^2 u}{\partial x^2} - 2 \dfrac{\partial u}{\partial x}\dfrac{\partial u}{\partial y}\dfrac{\partial^2 u}{\partial x \partial y} + \left[1 + \left(\dfrac{\partial u}{\partial x}\right)^2\right]\dfrac{\partial^2 u}{\partial y^2} = 0$.又已知$f''(x) \neq 0$,求$u = u(x,y)$的表达式

<!-- wrong -->
由$u(x,y) = f(x) + g(y)$可知:

$$\frac{\partial u}{\partial x} = \frac{\mathrm{d}f(x)}{\mathrm{d}x}, \quad \frac{\partial u}{\partial y} = \frac{\mathrm{d}g(y)}{\mathrm{d}y}, \quad \frac{\partial^2 u}{\partial x \partial y} = \frac{\partial^2 u}{\partial y \partial x} = 0$$

因此原式变为:

$$\left[1 + \left(\frac{\mathrm{d}g}{\mathrm{d}y}\right)^2\right] \frac{\mathrm{d}^2 f}{\mathrm{d}x^2} + \left[1 + \left(\frac{\mathrm{d}f}{\mathrm{d}x}\right)^2\right] \frac{\mathrm{d}^2 g}{\mathrm{d}y^2} = 0$$

推断$f, g$是对称形式,同时注意到$f'' \neq 0$,考虑两边同时除$f''$,得:

$$\left[1+\left(g'\right)^2\right] + \frac{\left[1+\left(f'\right)^2\right]}{f''} g'' = 0$$

<!-- answer -->
上面的推导没有错误,但是,$f''$放在分母的位置,无法让后续求解变得更简单,因此考虑将$f'', g''$放在分子的位置,得:

$$\frac{f''}{1+\left(f'\right)^2} = - \frac{g''}{1+\left(g'\right)^2} \overset{\text{Assume}}{=} C_1$$

因为$f'' \neq 0$,故可以判断$C_1 \neq 0$.因此,对于式子$\dfrac{f''}{1+\left(f'\right)^2} = C_1$,两边对$f'$积分,得:

$$\int \frac{f''}{1+\left(f'\right)^2}\, \mathrm{d}x = \int \frac{1}{1+\left(f'\right)^2}\, \mathrm{d}\left(f'\right) = \arctan\left(f'\right) = C_1 x + C_2$$

因此$f'(x) = \tan\left(C_1 x + C_2\right)$,两边再对$x$积分,积得:

$$f(x) = - \frac{1}{C_1} \ln \left|\cos\left(C_1 x + C_2\right)\right| + C_3$$

同理可得:

$$g(y) = \frac{1}{C_1} \ln \left|\cos\left(C_1 y + C_4\right)\right| + C_5$$

因此:

$$u(x,y) = f(x) + g(y) = \frac{1}{C_1} \ln \left|\frac{\cos\left(C_1 y + C_4\right)}{\cos\left(C_1 x + C_2\right)}\right| + C$$

<!-- q {"id": "calc-w-053", "type": "错题", "tags": ["微分方程"], "title": "含参变限积分的函数方程", "chapter": "微分方程"} -->

<!-- stem -->
设函数$f(x)$在$(0, +\infty)$内可导,对任意的$s > 0, \ t>0$,均有:

$$\int_1^{s t} f(x)\, \mathrm{d}x + \ln t^s + \ln s^t = \int_1^{t}\left[s f(x) + \frac{1}{x}\right] \mathrm{d}x + \int_1^{s} \left[t f(x) + \frac{1}{x}\right] \mathrm{d}x$$

成立,且$f(1) = 2$,求$f(x)$的表达式

<!-- wrong -->
关于上式,对$x$求导,得:

$$f(x) = s f(x) + \frac{1}{x} + t f(x) + \frac{1}{x}$$

原式可变为:

$$\int_1^{s t} f(x)\, \mathrm{d}x + s \ln t + t \ln s = s \int_1^{t} f(x)\, \mathrm{d}x + \ln t + t \int_1^{s} f(x)\, \mathrm{d}x + \ln s$$

两边对$x$求导,得:

$$f(x) = s f(x) + t f(x)$$

两次求导结果不同,且通过$f(x) = (s+t) f(x)$,似乎只能推出$f(x) = 0$?

**【笔记】** 值得注意的是:原式中$x$仅在被积函数中存在,积分后$x$会消失,因此其是一个"哑变量"(同样的,求和符号内的变量也是哑变量).原式两边并不是关于$x$的函数,自然不能对$x$求导

<!-- answer -->
将原式改写为:

$$\int_1^{s t} f(x)\, \mathrm{d}x + s \ln t + t \ln s = s \int_1^{t} f(x)\, \mathrm{d}x + \ln t + t \int_1^{s} f(x)\, \mathrm{d}x + \ln s$$

等式两端对$s$求偏导:

$$t f(s t) + \ln t + \frac{t}{s} = \int_1^{t} f(x)\, \mathrm{d}x + t f(s) + \frac{1}{s}$$

令$s = 1$,得:

$$t f(t) + \ln t + t = \int_1^{t} f(x)\, \mathrm{d}x + t f(1) + 1$$

等号两端再对$t$求导,得:

$$f(t) + t f'(t) + \frac{1}{t} + 1 = f(t) + f(1)$$

$f(1) = 2$,因此$f'(t) = \dfrac{1}{t} - \dfrac{1}{t^2} \Rightarrow f(t) = \ln t + \dfrac{1}{t} + C$,代入$f(1) = 2$,得$C = 1$,故$f(x) = \ln x + \dfrac{1}{x} + 1$

<!-- q {"id": "calc-w-054", "type": "错题", "tags": ["微分方程"], "title": "切线倾角变化率等于斜率", "chapter": "微分方程"} -->

<!-- stem -->
设函数$y(x)$具有二阶导数,曲线$l: y = y(x)$与直线$y = x$相切于原点,且曲线$l$在点$(x,y)$处切线的倾角$\theta$关于$x$的变化率与曲线$l$在该点的切线斜率相等,求$y(x)$的表达式

<!-- wrong -->
由曲线$l: y = y(x)$与直线$y = x$相切于原点可知:$y'(0) = 1, y(0) = 0$,同时,切线倾角$\theta$有以下关系:

$$\tan \theta = y'(x) \Rightarrow \theta = \arctan y'(x), \quad \frac{\mathrm{d}\theta}{\mathrm{d}x} = \frac{1}{1+\left(y'(x)\right)^2} \cdot y''(x) = y'(x)$$

$$y'' = y' + \left(y'\right)^3, \quad \text{Let } y' = p, \ \text{Then } y'' = \frac{\mathrm{d}p}{\mathrm{d}y} \cdot p, \quad \text{So } \frac{\mathrm{d}p}{\mathrm{d}y} p = p + p^3$$

因此:

$$\frac{\mathrm{d}p}{\mathrm{d}y} = 1 + p^2 \Longleftrightarrow \frac{1}{1+p^2}\, \mathrm{d}p = \mathrm{d}y \Longleftrightarrow \arctan(p) = y + C$$

代入$y(0)=0, y'(0) = 1$求得$C = \dfrac{\pi}{4}$,因此:

$$y' = \tan\left(y + \frac{\pi}{4}\right) = \frac{\tan y + 1}{1 - \tan y} \Longleftrightarrow \frac{\cos y - \sin y}{\cos y + \sin y}\, \mathrm{d}y = \mathrm{d}x$$

最终解得$\dfrac{1}{2} \ln \left|\dfrac{1+\tan y}{1 - \tan y}\right| - \dfrac{\sqrt{2}}{2} \ln \left|\dfrac{1+\sqrt{2} \cos y}{1 - \sqrt{2} \cos y}\right| = x - \sqrt{2} \ln \left(1+\sqrt{2}\right)$

**【笔记】** 实际上,当看到式子:

$$\frac{\cos y - \sin y}{\cos y + \sin y}\, \mathrm{d}y = \mathrm{d}x$$

时,我们应该立马意识到:$\left(\cos y - \sin y\right)\, \mathrm{d}y = \mathrm{d}\left(\sin y + \cos y\right)$.因此:

$$\int \frac{\cos y - \sin y}{\cos y + \sin y}\, \mathrm{d}y = \int \frac{1}{\cos y + \sin y}\, \mathrm{d}\left(\cos y + \sin y\right) = \ln\left(\cos y + \sin y\right) = X + C$$

<!-- answer -->
$$y'' = y'\left(1 + \left(y'\right)^2\right)$$

令$y' = p, y'' = p'$,代入可得:

$$p' = p\left(1+p^2\right)$$

可以解得:

$$\ln \frac{p^2}{1+p^2} = 2x + C_1$$

代入$y'(0) = 1$可得$C_1 = - \ln 2$,因此$\dfrac{p^2}{1+p^2} = \exp\left(2x - \ln 2\right) = \dfrac{e^{2x}}{2}$

$$p^2 = \frac{e^{2x}}{2} \cdot \left(1+p^2\right) \Rightarrow y' = p = \frac{e^x}{\sqrt{2 - e^{2x}}} = \frac{e^x/\sqrt{2}}{\sqrt{1 - \left(e^x/\sqrt{2}\right)^2}}$$

$$y = \int \frac{e^x/\sqrt{2}}{\sqrt{1 - \left(e^x/\sqrt{2}\right)^2}}\, \mathrm{d}x = \arcsin \frac{e^x}{\sqrt{2}} + C_2$$

代入$y(0) = 0$可以解得$C_2 = - \dfrac{\pi}{4}$,因此$y = \arcsin \dfrac{e^x}{\sqrt{2}} - \dfrac{\pi}{4}$

<!-- q {"id": "calc-w-055", "type": "错题", "tags": ["微分方程"], "title": "弧长等于斜率的曲线与形心", "chapter": "微分方程"} -->

<!-- stem -->
设平面曲线$y = y(x)$满足$y(0) = 1, y'(0) = 0$,且对曲线上任意点$P(x,y)\ (x>0),$沿曲线从点$(0,1)$到点$P(x,y)$的弧长等于该曲线在点$P(x,y)$的切线斜率.

(1)求$y(x)\ (x>0)$

(2)求$y(x)$与$x - \ln 2$及坐标轴所围平面区域$D$的形心

<!-- wrong -->
依题意:

$$\int_0^x \sqrt{\left(y'(t)\right)^2 + 1}\, \mathrm{d}t = y'(x)$$

两边求导可得:

$$\sqrt{\left(y'(x)\right)^2 + 1} = y''(x). \quad \text{Let } p = y', \ \text{Then } y'' = \frac{\mathrm{d}p}{\mathrm{d}y}\, p, \ \text{So } \frac{\mathrm{d}p}{\mathrm{d}y} = \sqrt{1 + \frac{1}{p^2}}$$

因此:

$$\frac{p}{\sqrt{p^2 + 1}}\, \mathrm{d}p = \mathrm{d}y$$

最终解得$y + \sqrt{y^2 - 1} = e^x$

<!-- answer -->
(1)

有:$y'' = \sqrt{\left(y'\right)^2 + 1},$令$p = y', p' = y''$,则:

$$p' = \sqrt{p^2+1} \Longrightarrow \int \frac{1}{\sqrt{p^2+1}}\, \mathrm{d}p = \int \mathrm{d}x \Rightarrow x = \ln\left(\sqrt{1+p^2} + p\right) + C_1 = \ln \left[e^{C_1}\left(\sqrt{1+p^2} + p\right)\right]$$

因此:

$$\begin{aligned}
e^x = e^{C_1} \left(\sqrt{1+p^2} + p\right) &\Longleftrightarrow C_2 e^x = \sqrt{1+p^2} + p\\
&\Longleftrightarrow \frac{1}{C_2} e^{-x} = \sqrt{1+p^2} - p
\end{aligned}$$

两式相减得:

$$2p = 2 y' = C_2 e^x - \frac{1}{C_2} e^{-x}$$

代入$y'(0) = 0$,得$C_2 = \pm 1$.因为$\int_0^x \sqrt{\left(y'(t)\right)^2 + 1}\, \mathrm{d}t = y'(x)$,因此$y' > 0$,取$C_2 = 1.$因此

$$y'(x) = \frac{1}{2} \left(e^x - e^{-x}\right)$$

积分得$y(x) = \dfrac{1}{2} \left(e^x + e^{-x}\right) + C_3$,代入$y(0) = 1$,解得$C_3 = 0$,因此$y(x) = \dfrac{1}{2} \left(e^x + e^{-x}\right) \ (x>0)$

(2)

$$\begin{aligned}
\bar{x} &= \frac{\int_0^{\ln 2} x y\, \mathrm{d}x}{\int_0^{\ln 2} y\, \mathrm{d}x} = \ln 2 - \frac{1}{3}\\
\bar{y} &= \frac{\frac{1}{2} \int_0^{\ln 2} y^2\, \mathrm{d}x}{\int_0^{\ln 2} y\, \mathrm{d}x} = \frac{1}{3} \ln 2 + \frac{5}{16}
\end{aligned}$$

**【笔记】** 本题与上题一样,都是将辅助函数$p$设为$x$的函数时,可以解出答案,而将$p$设为$y$的函数时,推导难以进行,原因在于:

比如这一题的情况,$\sqrt{\left(y'(x)\right)^2 + 1} = y''(x).$,将$p$设为$y$的函数时,会得到:

$$p\, \frac{\mathrm{d}p}{\mathrm{d}y} = \sqrt{p^2 + 1}$$

代入$p(0) = 0$,则等号左边为0,右边为1,而推导过程却没有任何问题,这就导致了一个尖锐的矛盾.为了使等式成立,这就要求$\lim\limits_{y\to 1} \dfrac{\mathrm{d}p}{\mathrm{d}y} = \infty$,这是一个奇异点.更一般的情况:

- 设$p(x)$时,解得的是关于$x$的显式解,再积分一次就能得到$y$与$x$的关系式
- 设$p(y)$时,解得的是关于$y$的隐式解,需要在隐式方程中解出$y$,而这个方程可能很难解

因此:

- 当原微分方程中不显含$y$时,应设$p(x)$
- 原微分方程不显含$x$时,应设$p(y)$.

<!-- q {"id": "calc-w-056", "type": "错题", "tags": ["无穷级数"], "title": "e^{aₙ}−e^{−aₙ} = aₙ(e^{bₙ}+e^{−bₙ}) 的级数证明", "chapter": "无穷级数"} -->

<!-- stem -->
设数列$\{a_n\}, \{b_n\}$满足$e^{a_n} - e^{- a_n} = a_n \left(e^{b_n} + e^{-b_n}\right), \ 0 < a_n < 1, \ 0< b_n < 1, \ n = 1,2, \cdots,$且$\sum\limits_{n=1}^{\infty} b_n$收敛.

证明:(1)$a_n > b_n, \ n = 1,2,3 \cdots$;

(2)$\sum\limits_{n=1}^{\infty} \left(b_n - a_n\right)$收敛

<!-- answer -->
(1)

令$f(x) = e^x - e^{-x}$,$f'(x) = e^x + e^{-x}, \ f''(x) = e^x - e^{-x}$,在$[0, a_n]$区间上使用拉格朗日中值定理,得:

$$e^{a_n} - e^{-a_n} = a_n \cdot \left(e^{\xi_n} + e^{- \xi_n}\right)$$

由$f''(x)$在$(0,1)$上大于0可知$f'(x)$在$(0,1)$上单调递增,因此:

$$e^{a_n} - e^{-a_n} = a_n \cdot \left(e^{\xi_n} + e^{- \xi_n}\right) = a_n \left(e^{b_n} + e^{-b_n}\right) \Longrightarrow b_n = \xi_n$$

因为$\xi \in (0, a_n)$,因此$b_n < a_n$

(2)

$x \in (0,1)$时,$e^x + e^{-x} > 2$,因此:

$$\int_0^x \left(e^t + e^{-t}\right) \mathrm{d}t > \int_0^x 2\, \mathrm{d}t \Longleftrightarrow e^x - e^{-x} > 2x \Longrightarrow e^{x/2} - e^{- x/2} > x$$

因此:

$$\left(e^{x/2} + e^{- x/2}\right) \cdot \left(e^{x/2} - e^{- x/2}\right) = e^x - e^{-x} > x \cdot \left(e^{x/2} + e^{- x/2}\right)$$

又因为:$e^{a_n} - e^{- a_n} = a_n \left(e^{b_n} + e^{-b_n}\right)$,因此$e^{b_n} + e^{- b_n} > e^{a_n/2} + e^{- a_n/2} \Longrightarrow b_n > \dfrac{a_n}{2}$.因此,结合(1)有:

$$b_n < a_n < 2 b_n \Longrightarrow a_n - b_n < b_n$$

因为$\sum\limits_{n=1}^{\infty} b_n$收敛,因此$\sum\limits_{n=1}^{\infty} \left(b_n - a_n\right)$收敛.

<!-- q {"id": "calc-w-057", "type": "错题", "tags": ["无穷级数"], "title": "展开式系数 aₙ 的确定", "chapter": "无穷级数"} -->

<!-- stem -->
已知$\ln \left|\dfrac{x+2}{x-1}\right| - \dfrac{1}{(1+x)^2} + 1 = \sum\limits_{n=0}^{\infty} a_n x^n\ (-1 < x < 1),$求$a_n$.

<!-- answer -->
$$\begin{aligned}
\ln \left|\frac{x+2}{x-1}\right| = \ln (x+2) - \ln(1-x) &= \ln 2 + \ln\left(\frac{x}{2} + 1\right) - \ln(1-x)\\
&= \ln 2 + \sum_{n=1}^{\infty} (-1)^{n+1} \frac{1}{n} \cdot \left(\frac{x}{2}\right)^n - \sum_{n=1}^{\infty} (-1)^{n+1} \frac{1}{n} \cdot (-x)^n\\
&= \ln 2 - \sum_{n=1}^{\infty} \left(-\frac{1}{2}\right)^n \frac{1}{n} \cdot x^n + \sum_{n=1}^{\infty} \frac{1}{n} x^n
\end{aligned}$$

$$\begin{aligned}
- \frac{1}{(1+x)^2} = \left(\frac{1}{1+x}\right)' = \left(\sum_{n=0}^{\infty} (-1)^n x^n\right)' &= \sum_{n=1}^{\infty} (-1)^n n x^{n-1}\\
&= \sum_{n=1}^{\infty} (-1)^{n+1} (n+1) x^n - 1
\end{aligned}$$

因此

$$\begin{aligned}
\sum_{n=0}^{\infty} a_n x^n &= \ln 2 - \sum_{n=1}^{\infty} \left(-\frac{1}{2}\right)^n \frac{1}{n} \cdot x^n + \sum_{n=1}^{\infty} \frac{1}{n} x^n + \sum_{n=1}^{\infty} (-1)^{n+1} (n+1) x^{n} - 1 + 1\\
&= \ln 2 + \sum_{n=1}^{\infty} \left(\frac{1}{n} + \frac{(-1)^{n+1}}{2^n} \cdot \frac{1}{n} + (-1)^{n+1} (n+1)\right) x^n
\end{aligned}$$

因此:

$$a_0 = \ln 2, \quad a_n = \frac{1}{n} \left[1 + \frac{(-1)^{n+1}}{2^n}\right] + (-1)^{n+1} (n+1) \quad (n\ge 1)$$

**【笔记】** 对于$\ln \left|\dfrac{x+2}{x-1}\right|$的处理,还可以:

$$\text{Let } f(x) = \ln \frac{x+2}{1-x}, \quad f'(x) = \frac{1-x}{x+2} \cdot \frac{3}{(1-x)^2} = \frac{3}{(x+2)(1-x)} = \frac{1}{2} \cdot \frac{1}{x/2+1} + \frac{1}{1-x}$$

<!-- q {"id": "calc-w-058", "type": "错题", "tags": ["无穷级数"], "title": "yₙ(x) 级数的收敛域与和函数", "chapter": "无穷级数"} -->

<!-- stem -->
设$n$为正整数,$y = y_n (x)$是微分方程$x y' - n y = 0$满足条件$y_n (1) = (n+1)(n+3)$的解.

(1)求$y_n (x)$

(2)求级数$\sum\limits_{n=1}^{\infty} y_n (x)$的收敛域及和函数

<!-- wrong -->
(1)$y_n (x) = (n+1)(n+3) x^n$

(2)收敛域为$(-1,1)$.设和函数为$f(x)$,即:$f(x) = \sum\limits_{n=1}^{\infty} (n+1)(n+3) x^n$,则:

$$\begin{aligned}
\text{Let } g(x) &= \int f(x)\, \mathrm{d}x = \sum_{n=1}^{\infty} (n+3) x^{n+1}\\
\text{Let } h(x) &= \int g(x)\, \mathrm{d}x = \sum_{n=1}^{\infty} \frac{n+3}{n+2} x^{n+2} = \sum_{n=1}^{\infty} x^{n+2} + \sum_{n=1}^{\infty} \frac{1}{n+2} x^{n+2}
\end{aligned}$$

因此:

$$\sum_{n=1}^{\infty} x^{n+2} = x^3 \sum_{n=1}^{\infty} x^{n-1} = x^3 \cdot \frac{1}{1-x}$$

$$\sum_{n=1}^{\infty} \frac{1}{n+2} x^{n+2} = \int \left(\sum_{n=1}^{\infty} x^{n+1}\right) \mathrm{d}x = \int x^2 \cdot \frac{1}{1-x}\, \mathrm{d}x = - \frac{x^2}{2} - x - \ln(1-x)$$

因此:

$$\begin{aligned}
h(x) &= \frac{x^3}{1-x} - \frac{x^2}{2} - x - \ln(1-x)\\
g(x) &= h'(x) = \frac{3x^2}{1-x} + \frac{x^3}{(1-x)^2} - x - 1 + \frac{1}{1-x}\\
f(x) &= \frac{6x}{1-x} + \frac{3x^2 + 1}{(1-x)^2} + \frac{6x^2}{(1-x)^3} - 1
\end{aligned}$$

<!-- answer -->
$$\text{Let } S(x) = \sum_{n=1}^{\infty} (n+1)(n+3) x^n = \sum_{n=1}^{\infty} (n+1)(n+2) x^n + \sum_{n=1}^{\infty} (n+1) x^n$$

令$h(x) = \sum\limits_{n=1}^{\infty} (n+1)(n+2) x^n, \ g(x) = \sum\limits_{n=1}^{\infty} (n+1) x^n$,则:

$$\int_0^x h(x)\, \mathrm{d}x = \sum_{n=1}^{\infty} (n+2) x^{n+1}, \quad \int_0^x \int_0^x h(x)\, \mathrm{d}x\, \mathrm{d}x = \sum_{n=1}^{\infty} x^{n+2} = x^3 \sum_{n=0}^{\infty} x^n = \frac{x^3}{1-x}$$

对$\dfrac{x^3}{1-x}$求两次导可得:$h(x) = 2(1-x)^{-3} - 2$.同理可得$g(x) = (1-x)^{-2} - 1$.因此:

$$S(x) = 2(1-x)^{-3} + (1-x)^{-2} - 3$$

<!-- q {"id": "calc-w-059", "type": "错题", "tags": ["无穷级数"], "title": "迭代数列 x_{n+1}=(a+xₙ)/(1+xₙ)", "chapter": "无穷级数"} -->

<!-- stem -->
设数列$\{x_n\}$满足$x_{n+1} = \dfrac{a + x_n}{1+x_n}, \ 0 < a < 1, \ x_1 \ge 0.$

(1)证明$\sum\limits_{n=1}^{\infty} \left(x_{n+1} - x_n\right)$绝对收敛

(2)求$\lim\limits_{n\to\infty} \sum\limits_{i=1}^{n} \left(x_{i+1} - x_i\right)$

<!-- wrong -->
$$\text{Let } u_n = x_{n+1} - x_n = \frac{a+x_n - x_n - x^2_n}{1+x_n} = \frac{a - x^2_n}{1+x_n}$$

<!-- answer -->
(1)

$x_2 = \dfrac{a+x_1}{1+x_1} = a + \dfrac{(1-a)x_1}{1+x_1} \ge a$.设$x_{n-1} \ge a,$同理可推出$x_n \ge a$.综上,$x_n \ge a$.

$$\begin{aligned}
\left|x_{n+1} - x_n\right| = \left|\frac{a+x_n}{1+x_n} - \frac{a+x_{n-1}}{1+x_{n-1}}\right| = \left|\frac{(a-1)\left(x_{n-1} - x_n\right)}{\left(1+x_n\right)\left(1+x_{n-1}\right)}\right| &\le \frac{1-a}{1+x_n} \left|x_n - x_{n-1}\right|\\
&\le \frac{1-a}{1+a} \left|x_n - x_{n-1}\right|
\end{aligned}$$

令$\dfrac{1-a}{1+a} = k < 1$,可得:$\left|x_{n+1} - x_n\right| < k^{n-1} \left|x_2 - x_1\right|$由正项级数的比较判别法可知,$\sum\limits_{n=1}^{\infty} \left(x_{n+1} - x_n\right)$绝对收敛.

(2)

$$\text{Let } S_n = \sum_{i=1}^{n} \left(x_{i+1} - x_i\right) = x_{n+1} - x_1$$

由$\lim\limits_{n\to\infty} S_n$存在可知$\lim\limits_{n\to\infty} x_{n+1}$存在,设$\lim\limits_{n\to\infty} x_n = A > 0$,又因为$x_{n+1} = \dfrac{a+x_n}{1+x_n}$,因此:

$$A = \frac{a+A}{1+A} \Rightarrow A = \sqrt{a}$$

故$\lim\limits_{n\to\infty} S_n = \lim\limits_{n\to\infty} x_{n+1} - x_1 = \sqrt{a} - x_1$

<!-- q {"id": "calc-w-060", "type": "错题", "tags": ["无穷级数"], "title": "f″+f′=0 与级数敛散性求 a 范围", "chapter": "无穷级数"} -->

<!-- stem -->
已知函数$f(x)$满足$f''(x) + f'(x) = 0$及$f''(x) + 2f'(x) + f(x) = -1,$且$f(0) = 0$.

(1)求$f(x)$的表达式

(2)设$a>0$,级数$\sum\limits_{n=2}^{\infty} f\left(n^{-a} \ln n\right)$收敛,求$a$的取值范围.

<!-- wrong -->
(1)易得$f(x) = e^{-x} - 1$

(2)$f\left(n^{-a} \ln n\right) = \exp\left\{-n^{-a} \ln n\right\} - 1$

$$\exp\left\{-n^{-a} \ln n\right\} - 1 = \frac{1}{e^{\frac{\ln n}{n^a}}} - 1$$

若$\sum\limits_{n=2}^{\infty} f\left(n^{-a} \ln n\right)$收敛,则$\lim\limits_{n\to\infty} f\left(n^{-a} \ln n\right) = 0 \Longrightarrow \lim\limits_{n\to\infty} \dfrac{\ln n}{n^a} = 0$

故$a \ge 1$

<!-- answer -->
(2)

$$\lim_{n\to\infty} \frac{\exp\left(-n^{-a} \ln n\right) - 1}{- n^{-a} \ln n} = 1$$

因此$\sum\limits_{n=2}^{\infty} f\left(n^{-a} \ln n\right)$的敛散性与$-\sum\limits_{n=2}^{\infty} \dfrac{\ln n}{n^a}$的敛散性相同.

- $a \in (0,1]$时,当$n$充分大,有$\dfrac{\ln n}{n^a} > \dfrac{1}{n^a}$,而$\sum\limits_{n=2}^{\infty} \dfrac{1}{n^a}$发散,因此$\sum\limits_{n=2}^{\infty} \dfrac{\ln n}{n^a}$发散,原级数发散.
- $a \in (1, +\infty)$时,

  $$\exists \epsilon, \ a-\epsilon > 1, \quad \lim_{n\to\infty} \frac{\frac{\ln n}{n^a}}{\frac{1}{n^{\epsilon}}} = \lim_{n\to\infty} \frac{\ln n}{n^{\epsilon}} = 0.$$

  由于$\sum\limits_{n=2}^{\infty} \dfrac{1}{n^{a-\epsilon}}$收敛,故原级数收敛
