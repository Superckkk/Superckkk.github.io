---
subject: 数学一
course: 线性代数
chapter: 线性代数错题本
source: notes/Math/LinearAlgebra/Wrong.typ
---

<!-- q {"id": "la-w-001", "type": "错题", "tags": ["线性方程组"], "title": "ααᵀ 与同解方程组", "chapter": "线性方程组"} -->

<!-- stem -->
设 $n$维实列向量$\alpha$满足$\alpha^T \alpha = 2$,$A, B$均为$n$阶矩阵,$E$为$n$阶单位矩阵,且$A(E - 2 \alpha \alpha^T) = B$,则:

- (A) 方程组$B X = 0$ 与方程组$(E - 2 \alpha \alpha^T)X = 0$同解
- (B) 方程组$B^T X = 0$ 与方程组$(E - 2 \alpha \alpha^T)X = 0$同解
- (C) 方程组$B X = 0$ 与方程组$A X = 0$同解
- (D) 方程组$B^T X = 0$ 与方程组$A^T X = 0$同解

<!-- answer -->
**【笔记】** 设$\alpha$是一个$n$维列向量,计算矩阵$\alpha \cdot \alpha^T$的特征值,设$\alpha^T \cdot \alpha = \lambda$,则:

- $(\alpha \alpha^T) \cdot \alpha = \alpha \cdot \lambda = \lambda \alpha \Rightarrow$矩阵$\alpha \cdot \alpha^T$有一个特征值为$\lambda$
- $\alpha$是一个$n$维列向量,则其所属的$n$维线性空间内,与$\alpha$正交的线性子空间的维数为$n-1$,则: $\exists n-1$个线性无关的向量与$\alpha$正交,设为$x_i$,即:$(\alpha \cdot \alpha^T) \cdot x_i = \alpha \cdot (\alpha^T \cdot x_i) = 0$,因此零特征值的重数为$n-1$

因此,$\alpha \alpha^T$的特征值为:$\lambda, 0$,其中$0$的重数为$n-1$

$r(\alpha \alpha^T) = 2$,又因为:$A x = \lambda x \Rightarrow f(A) x = f(\lambda) x$,故:$(E - 2 \alpha \alpha^T)$的特征值为:$-3, 1$,其中$1$的重数为$n-1$.因此$\det(E-2\alpha \alpha^T) = -3 \neq 0$,矩阵可逆.又因为:

$$A(E-2\alpha \alpha^T) = B \Rightarrow (E-2\alpha \alpha^T) A^T = B^T$$

故$A^T, B^T$的行向量组等价,因此$A^T X = 0$与$B^T X = 0$同解

对于D选项的验证,还可以:

$$A (E - 2 \alpha \alpha^T) = B \Rightarrow (E - 2 \alpha \alpha^T) A^T = B^T$$

则$B^T X = 0 \Longleftrightarrow (E - 2 \alpha \alpha^T) A^T X = 0$.因为$r(E - 2 \alpha \alpha^T) = n \Longrightarrow \dim\operatorname{Ker}(E - 2 \alpha \alpha^T) = 0$.故$(E - 2 \alpha \alpha^T) A^T X = 0 \Longleftrightarrow A^T X = 0$.因此$A^T X = 0$与$B^T X = 0$同解

因此选项D正确

**【笔记】**

$$A = M B \ \text{and}\ M \ \text{is invertible} \Longrightarrow A X = 0,\ B X = 0 \ \text{have the same solution}$$

$$\begin{aligned}
&B X = 0 \Longrightarrow A X = M B X = 0\\
&A X = 0 \Rightarrow M^{-1} A X = B X = 0
\end{aligned}$$

<!-- q {"id": "la-w-002", "type": "错题", "tags": ["线性方程组"], "title": "αᵀ(AB+BᵀA)α > 0 与解的判定", "chapter": "线性方程组"} -->

<!-- stem -->
设$A$是$n$阶实对称矩阵,$B$是$n$阶实矩阵,若对任意$n$维非零列向量$\alpha$,都有$\alpha^T (A B + B^T A) \alpha > 0$,则下列选项中正确的是:

- (A) 方程组$A B X = \alpha$有无穷多解
- (B) 方程组$A B X = \alpha$无解
- (C) 方程组$A X = \alpha$有唯一解
- (D) 方程组$A X = \alpha$无解

<!-- answer -->
$$\begin{aligned}
\forall \alpha, \quad \alpha^T (A B + B^T A) \alpha &= \alpha^T A B \alpha + \alpha^T B^T A \alpha\\
&= (A \alpha)^T (B \alpha) + (B \alpha)^T (A \alpha)\\
&= 2 (A \alpha)^T (B \alpha) \quad \left(\text{Since } (A \alpha)^T (B \alpha) = c\right)\\
&> 0
\end{aligned}$$

由此可得:$\forall \alpha, \ A \alpha \neq 0, \ B \alpha \neq 0 \Longrightarrow r(A) = r(B) = n$.因此$A X = \alpha, \ B X = \alpha, \ A B X = \alpha$均有唯一解

<!-- q {"id": "la-w-003", "type": "错题", "tags": ["线性方程组"], "title": "线性表示与秩的关系", "chapter": "线性方程组"} -->

<!-- stem -->
设$A, B$均为$n$阶矩阵,$\alpha, \beta$均为$n$维列向量.若$\alpha$可由$A$的列向量线性表示,$(\alpha^T, \beta^T)$不能由$(A^T, B^T)$的行向量线性表示,则下列结论中正确的是

- (A) $r(B, \beta) = r(B)$
- (B) $r(B, \beta) = r(B) + 1$
- (C) $r\begin{pmatrix}A^T & B^T\\ \alpha^T & \beta^T\end{pmatrix} = r(A^T, B^T) + 1$
- (D) $r\left[\left(A, \alpha\right), B^T\right] = r\left[\left(A^T, B^T\right)\begin{pmatrix}A\\B\end{pmatrix}\right]$

<!-- wrong -->
$\alpha$可由$A$的列向量表示$\Longrightarrow \alpha \in \operatorname{Im}(A)$

$(\alpha^T, \beta^T)$不能由$(A^T, B^T)$的行向量线性表示$\Longrightarrow \begin{pmatrix}\alpha\\\beta\end{pmatrix}$不能由$\begin{pmatrix}A\\B\end{pmatrix}$的列向量表示.

因此$\beta$不可以由$B$的列向量表示,方程组$B X = \beta$无解.故$r(B, \beta) = r(B)+1$

**【笔记】** $\begin{pmatrix}\alpha\\\beta\end{pmatrix}$不能由$\begin{pmatrix}A\\B\end{pmatrix}$的列向量表示只能说明方程组$A X = \alpha$与方程组$B X = \beta$不同解,不能说明$B X = \beta$无解

<!-- answer -->
接上面的推导:$\begin{pmatrix}\alpha\\\beta\end{pmatrix}$不能由$\begin{pmatrix}A\\B\end{pmatrix}$的列向量表示$\Longrightarrow$方程组$\begin{pmatrix}A\\B\end{pmatrix} X = \begin{pmatrix}\alpha\\\beta\end{pmatrix}$无解,因此:

$$r\begin{pmatrix}A & \alpha\\B & \beta\end{pmatrix} = r\begin{pmatrix}A\\B\end{pmatrix}+1 \Longleftrightarrow r\begin{pmatrix}A^T & B^T\\ \alpha^T & \beta^T\end{pmatrix} = r\left(A^T, B^T\right) + 1$$

故C正确.

**【笔记】**

- 向量$\beta$可以由矩阵$M$的列向量线性表示$\Longleftrightarrow r(M, b) = r(M)$
- 向量$\beta$不可以由矩阵$M$的列向量线性表示$\Longleftrightarrow r(M, b) = r(M)+1$

<!-- q {"id": "la-w-004", "type": "错题", "tags": ["线性方程组"], "title": "三个平面的位置关系", "chapter": "线性方程组"} -->

<!-- stem -->
设$f(x)$二阶可导,$f''(x) \neq 0, \ (a, f(a)), (b, f(b)), (c, f(c))$为曲线$y = f(x)$上三个不同的点,$H_1: x + a y + f(a) z = f(b), \ H_2: x + b y + f(b) z = f(c), \ H_3 = x + c y + f(c) z = f(a)$为三个平面,则:

- (A) 三个平面交于一点
- (B) 三个平面交于一条直线
- (C) 三个平面相互平行
- (D) 三个平面两两相交,且交线互相平行

<!-- answer -->
不妨设$a < b < c$,设三个平面构成的系数矩阵为$A$,则:

$$\begin{aligned}
\det(A) = \begin{vmatrix}1 & a & f(a)\\ 1 & b & f(b)\\ 1 & c & f(c)\end{vmatrix} &= b f(c) + a f(b) + c f(a) - b f(a) - a f(c) - c f(b)\\
&=(b-a)\left[f(c) - f(b)\right] - (c -b)\left[f(b) - f(a)\right]\\
&= (b-a)(c - b)f'(\xi_1) - (c-b)(b-a)f'(\xi_2) \quad \text{(Lagrange Theorem)}\\
&= (b-a)(c-b)\left[f'(\xi_1) - f'(\xi_2)\right] \quad \xi_1 \in (b,c), \ \xi_2 \in (a,b)
\end{aligned}$$

由于:$f(x)$二阶可导且$f''(x) \neq 0$,又易知$\xi_1 \neq \xi_2$,故$f'(x)$单调递增或单调递减.因此$f'(\xi_1) - f'(\xi_2) \neq 0$.又因为取的是曲线上三个不同的点,故$(b-a)(c-b) \neq 0$.因此$\det(A) \neq 0, \ r(A) = 3 \Rightarrow $方程组有唯一解,故三个平面交于一点,选项C正确.

**【笔记】** 对于平面上的三个点$(x_1,y_1), (x_2,y_2), (x_3,y_3)$,其组成的三角形的面积可以表示为:

$$S = \frac{1}{2} \left| \begin{vmatrix}x_1 & y_1 & 1\\ x_2 & y_2 & 1\\ x_3 & y_3 & 1\end{vmatrix} \right|$$

因此回到此题:行列式$\begin{vmatrix}1 & a & f(a)\\ 1 & b & f(b)\\ 1 & c & f(c)\end{vmatrix}$是否为零等价于三点$(a, f(a)), (b, f(b)), (c, f(c))$是否共线.而这三点位于曲线$y = f(x)$上,而$f''(x) \neq 0$表明$f(x)$为凸函数或凹函数,而在凸(凹)函数上三点不可能共线,故行列式的值不为0.

<!-- q {"id": "la-w-005", "type": "错题", "tags": ["线性方程组"], "title": "代数余子式构成的方程组", "chapter": "线性方程组"} -->

<!-- stem -->
设$\mathbf{A} = \left(a_{ij}\right)_{3\times 3}$为实矩阵,且$A_{ij} = a_{ij}\ (i, j = 1,2,3),$其中$A_{ij}$为$a_{ij}$的代数余子式,$a_{33} = 1, \det(\mathbf{A}) = 1,$则方程组$\mathbf{A} \begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix} = \begin{pmatrix}0\\0\\1\end{pmatrix}$的解为?

<!-- answer -->
$A_{ij} = a_{ij} \Rightarrow \mathbf{A}^* = \mathbf{A}^T$,因为:

$$\mathbf{A}^* = \begin{pmatrix}A_{11} & A_{21} & A_{31}\\ A_{12} & A_{22} & A_{32}\\ A_{13} & A_{23} & A_{33}\end{pmatrix} = \begin{pmatrix}a_{11} & a_{21} & a_{31}\\ a_{12} & a_{22} & a_{32}\\ a_{13} & a_{23} & a_{33}\end{pmatrix} = \mathbf{A}^T$$

$\det(\mathbf{A}) = 1 \Rightarrow \mathbf{A}$可逆.因此:

$$\begin{aligned}
\mathbf{A} \begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix} = \begin{pmatrix}0\\0\\1\end{pmatrix} &\Longleftrightarrow \begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix} = \mathbf{A}^{-1} \begin{pmatrix}0\\0\\1\end{pmatrix}\\
&\Longleftrightarrow \begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix} = \frac{\mathbf{A}^*}{\det(\mathbf{A})} \begin{pmatrix}0\\0\\1\end{pmatrix}\\
&\Longleftrightarrow \begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix} = \mathbf{A}^T \begin{pmatrix}0\\0\\1\end{pmatrix}\\
&\Longleftrightarrow \begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix} = \begin{pmatrix}a_{31}\\a_{32}\\a_{33}\end{pmatrix}
\end{aligned}$$

又因为$\det(\mathbf{A}) = a_{31} A_{31} + a_{32} A_{32} + a_{33} A_{33} = \left(a_{31}\right)^2 + \left(a_{32}\right)^2 + 1 = 1$,故$a_{31} = a_{32} = 0$.因此:

$$\begin{pmatrix}x_1\\x_2\\x_3\end{pmatrix} = \begin{pmatrix}0\\0\\1\end{pmatrix}$$

**【说明】** 其实可以在第一步就得出$a_{31} = a_{32} = 0$,推导如下:

$$\mathbf{A}^* = \det(\mathbf{A}) \cdot \mathbf{A}^{-1} = \mathbf{A}^{-1} = \mathbf{A}^T$$

这说明$\mathbf{A}$是一个正交矩阵,因此其每一行、每一列均为单位向量,因此:

$$\left(a_{31}\right)^2 + \left(a_{32}\right)^2 + \left(a_{33}\right)^2 = 1 = \left(a_{33}\right)^2 \Longrightarrow a_{31} = a_{32} = 0$$

<!-- q {"id": "la-w-006", "type": "错题", "tags": ["线性方程组"], "title": "伴随矩阵与线性方程组的解", "chapter": "线性方程组"} -->

<!-- stem -->
设$\mathbf{A}$是3阶方阵,$\mathbf{A} = \left(a_{ij}\right)_{3\times 3}$,且$a_{ij} = A_{ij}, \ i, j = 1,2,3$,其中$A_{ij}$为$a_{ij}$的代数余子式,$a_{33} \neq 0$,$\mathbf{b} = \left(a_{13}, a_{23}, a_{33}\right)^T$,求非齐次线性方程组$\mathbf{A}\mathbf{x} = \mathbf{b}$的解

<!-- answer -->
$$\det(\mathbf{A}) = a_{13} A_{13} + a_{23} A_{23} + a_{33} A_{33} = \left(a_{13}\right)^2 + \left(a_{23}\right)^2 + \left(a_{33}\right)^2 > 0$$

因此$r(\mathbf{A}) = 3$,$\mathbf{A}\mathbf{x} = \mathbf{b}$有且仅有一个解.易知该解为$(0,0,1)^T$.不易知:

$$\begin{aligned}
\mathbf{x} = \mathbf{A}^{-1} \mathbf{b} &= \frac{\mathbf{A}^*}{\det(\mathbf{A})} \mathbf{b}\\
&= \frac{1}{\det(\mathbf{A})} \cdot \begin{pmatrix}A_{11} & A_{21} & A_{31}\\ A_{12} & A_{22} & A_{32}\\ A_{13} & A_{23} & A_{33}\end{pmatrix} \begin{pmatrix}a_{13}\\a_{23}\\a_{33}\end{pmatrix}\\
&= \frac{1}{\det(\mathbf{A})} \begin{pmatrix}a_{11} & a_{21} & a_{31}\\ a_{12} & a_{22} & a_{32}\\ a_{13} & a_{23} & a_{33}\end{pmatrix} \cdot \begin{pmatrix}a_{13}\\a_{23}\\a_{33}\end{pmatrix}\\
&= \frac{1}{\det(\mathbf{A})} \cdot \begin{pmatrix}0\\0\\\det(\mathbf{A})\end{pmatrix}\\
&= \begin{pmatrix}0\\0\\1\end{pmatrix}
\end{aligned}$$

**【说明】** 倒数第二个等号利用了$\mathbf{A}$的列向量之间相互正交的性质

<!-- q {"id": "la-w-007", "type": "错题", "tags": ["线性方程组"], "title": "相似对角化求 a, b 与 P", "chapter": "线性方程组"} -->

<!-- stem -->
设矩阵$\mathbf{A} = \begin{pmatrix}a & 1 & 1\\ 0 & a-1 & 0\\ 1 & 1 & a\end{pmatrix}$不可逆,$\boldsymbol{\beta} = \begin{pmatrix}b\\1\\1\end{pmatrix}$.已知方程组$\mathbf{A}^T \mathbf{X} = \mathbf{0}$的解均是$\boldsymbol{\beta}^T \mathbf{X} = 0$的解

（I）求$a, b$的值;

（II）求可逆矩阵$\mathbf{P},$使得$\mathbf{P}^{-1} \mathbf{A} \mathbf{P} = \Lambda$.

<!-- answer -->
（I）$a = -1, b = -2$

（II） 由（I）可知$\mathbf{A} = \begin{pmatrix}-1 & 1 & 1\\ 0 & -2 & 0\\ 1 & 1 & -1\end{pmatrix}$.则:

$$\left|\lambda \mathbf{E} - \mathbf{A}\right| = \begin{vmatrix}\lambda + 1 & -1 & -1\\ 0 & \lambda+2 & 0\\ -1 & -1 & \lambda+1\end{vmatrix} = \lambda (\lambda+2)^2$$

- 对$\lambda = 0$,解$\mathbf{A}\mathbf{x} = 0$,得基础解系:$\mathbf{p}_1 = (1,0,1)^T$
- 对$\lambda = -2$,解$(\mathbf{A} - 2I)\mathbf{x} = 0$,得基础解系$\mathbf{p}_2 = (1,-1,0)^T, \ \mathbf{p}_3 = (1,0,-1)^T$

因此可取:

$$\mathbf{P} = \begin{pmatrix}1 & 1 & 1\\ 0 & -1 & 0\\ 1 & 0 & -1\end{pmatrix}, \quad \Lambda = \begin{pmatrix}0 & 0 & 0\\ 0 & -2 & 0\\ 0 & 0 & -2\end{pmatrix}$$

<!-- q {"id": "la-w-008", "type": "错题", "tags": ["线性方程组"], "title": "AᵀAx = Aᵀb 必有解的证明", "chapter": "线性方程组"} -->

<!-- stem -->
设$\mathbf{A}$是$m \times n$矩阵,$\mathbf{b}$为$m$维列向量,证明:线性方程组$\mathbf{A}^T \mathbf{A}\mathbf{x} = \mathbf{A}^T \mathbf{b}$必有解

<!-- answer -->
要证明线性方程组$\mathbf{A}^T \mathbf{A}\mathbf{x} = \mathbf{A}^T \mathbf{b}$必有解,即证:

$$r\left(\mathbf{A}^T \mathbf{A}\right) = r\left(\mathbf{A}^T \mathbf{A} \mid \mathbf{A}^T \mathbf{b}\right)$$

令$\mathbf{A} = \left(\boldsymbol{\alpha}_1, \boldsymbol{\alpha}_2, \cdots, \boldsymbol{\alpha}_n\right)$,则:

$$\begin{aligned}
r\left(\mathbf{A}^T \mathbf{A} \mid \mathbf{A}^T \mathbf{b}\right) &= r\left(\mathbf{A}^T \left(\boldsymbol{\alpha}_1, \boldsymbol{\alpha}_2, \cdots, \boldsymbol{\alpha}_n\right) \mid \mathbf{A}^T \mathbf{b}\right)\\
&= r\left(\mathbf{A}^T \left(\boldsymbol{\alpha}_1, \boldsymbol{\alpha}_2, \cdots, \boldsymbol{\alpha}_n, \mathbf{b}\right)\right)\\
&\le r\left(\mathbf{A}^T\right) = r\left(\mathbf{A}^T \mathbf{A}\right)
\end{aligned}$$

又因为$r\left(\mathbf{A}^T \mathbf{A} \mid \mathbf{A}^T \mathbf{b}\right) \ge r\left(\mathbf{A}^T \mathbf{A}\right)$,故:

$$r\left(\mathbf{A}^T \mathbf{A}\right) = r\left(\mathbf{A}^T \mathbf{A} \mid \mathbf{A}^T \mathbf{b}\right)$$

因此方程组$\mathbf{A}^T \mathbf{A}\mathbf{x} = \mathbf{A}^T \mathbf{b}$必有解

<!-- q {"id": "la-w-009", "type": "错题", "tags": ["线性方程组"], "title": "AB = E 的构造证明", "chapter": "线性方程组"} -->

<!-- stem -->
设实矩阵$\mathbf{A}_{m \times n}$的秩为$m$,证明:存在实矩阵$\mathbf{B}_{n \times m}$且$r(\mathbf{B}) = m,$使得$\mathbf{A B} = \mathbf{E}$,其中$\mathbf{E}$为$m$阶单位矩阵

<!-- answer -->
$r(\mathbf{A}) = m \Longrightarrow \mathbf{A}$中存在$m$列是线性无关的.因此,可以通过列变换将$\mathbf{A}$变成:

$$\mathbf{A P} = \left(\mathbf{A}_1 \ \ \mathbf{A}_2\right)$$

其中$\mathbf{A}_1$是$m$阶可逆方阵,因此令$\mathbf{B} = \mathbf{P} \begin{pmatrix}\mathbf{A}_1^{-1}\\\mathbf{O}\end{pmatrix}$,则$r(\mathbf{B}) = m$,且:

$$\mathbf{A B} = \mathbf{A P} \begin{pmatrix}A_1^{-1}\\O\end{pmatrix} = \left(\mathbf{A}_1, \ \mathbf{A}_2\right) \cdot \begin{pmatrix}\mathbf{A}_1^{-1}\\\mathbf{O}\end{pmatrix} = \mathbf{E}$$

**【笔记】** 还有一种解法:$\mathbf{A}\, \mathbf{A}^T$是$m$阶正定矩阵,从而可逆,因此可取$\mathbf{B} = \mathbf{A}^T \left(\mathbf{A} \mathbf{A}^T\right)^{-1}$,此时有:

$$\mathbf{A}\, \mathbf{B} = \mathbf{A}\mathbf{A}^T \left(A A^T\right)^{-1} = \mathbf{E}$$

<!-- q {"id": "la-w-010", "type": "错题", "tags": ["相似矩阵"], "title": "与 diag(1,2,2) 相似的判定", "chapter": "相似矩阵"} -->

<!-- stem -->
设$\mathbf{C} = \operatorname{diag}(1,2,2), \ \mathbf{A} = \begin{pmatrix}2 & 0 & 0\\ 0 & 2 & 1\\ 0 & 0 & 1\end{pmatrix}, \ \mathbf{B} = \begin{pmatrix}2 & 1 & 0\\ 0 & 2 & 0\\ 0 & 0 & 1\end{pmatrix}$,则

- (A) $A$与$C$相似,$B$与$C$不相似
- (B) $A$与$C$相似,$B$与$C$相似
- (C) $A$与$C$不相似,$B$与$C$相似
- (D) $A$与$C$不相似,$B$与$C$不相似

<!-- answer -->
若矩阵与$C$相似,则需要有1, 2两个特征值,且特征值2的几何重数为2.

- 对$A$:

  $$2E - A = \begin{pmatrix}0 & 0 & 0\\ 0 & 0 & -1\\ 0 & 0 & 1\end{pmatrix}, \quad r(2E-A) = 1 \Rightarrow \dim \operatorname{Ker}(2E-A) = 2$$

  因此对应的特征值为2的特征向量有两个,因此$A \sim C$

- 对$B$:

  $$2E-B = \begin{pmatrix}0 & -1 & 0\\ 0 & 0 & 0\\ 0 & 0 & -1\end{pmatrix}, \quad r(2E-B) = 2 \Rightarrow \dim \operatorname{Ker}(2E-B) = 1$$

  因此$2E-B$对应的特征值为2的特征向量只有一个,几何重数为1,因此$B$与$C$不相似

<!-- q {"id": "la-w-011", "type": "错题", "tags": ["相似矩阵"], "title": "特征值 1,1,2 的特征向量", "chapter": "相似矩阵"} -->

<!-- stem -->
设A为3阶方阵,A的三个特征值为1,1,2,$\alpha_1, \alpha_2, \alpha_3$分别为对应的三个特征向量,则

- (A) $\alpha_1, \alpha_2, \alpha_3$必为$2E-A$的特征向量
- (B) $\alpha_1 + \alpha_3$必为$2E-A$的特征向量
- (C) $\alpha_1 - \alpha_2$必为$2E-A$的特征向量
- (D) $\alpha_1, \alpha_2$必为$2E-A$的特征向量,$\alpha_3$不是$2E-A$的特征向量

<!-- answer -->
- $(2E-A)\alpha_1 = 2 \alpha_1 - A \alpha_1 = \alpha_1$
- $(2E-A)\alpha_2 = 2 \alpha_2 - A \alpha_2 = \alpha_2$
- $(2E-A)\alpha_3 = 2 \alpha_3 - A \alpha_3 = 0$
- $(2E-A)(\alpha_1+\alpha_3) = 2(\alpha_1+\alpha_3) - A(\alpha_1 + \alpha_3) = \alpha_1$
- $(2E-A)(\alpha_1 - \alpha_2) = 2(\alpha_1 - \alpha_2) - A(\alpha_1 - \alpha_2) = \alpha_1 - \alpha_2$,但是题目并没有说$\alpha_1$和$\alpha_2$一定不同,所以C是错误的(阴成啥了)

从上面的计算可知:A正确

<!-- q {"id": "la-w-012", "type": "错题", "tags": ["相似矩阵"], "title": "(A*−2E)X=0 的通解", "chapter": "相似矩阵"} -->

<!-- stem -->
设3阶实对称矩阵$A$的特征值为1, 2, -1,特征值1与2的特征向量分别是$\alpha_1 = (2,3,-1)^T$与$\alpha_2 = (1,a,2a)^T$, $A^*$是$A$的伴随矩阵,则方程组$(A^* - 2E)X = 0$的通解是

<!-- answer -->
$A$的特征值为$1, 2, -1 \Rightarrow \det(A) = -2$,因此$A^*$的特征值为$\dfrac{\det(A)}{1} = -2, \ \dfrac{\det(A)}{2} = -1, \ \dfrac{\det(A)}{-1} = 2.$因此:

$$A^* \sim \operatorname{diag}(-2, -1, 2), \quad A^* - 2E \sim \operatorname{diag}(-4, -3, 0)$$

$\operatorname{rank}\left(\operatorname{diag}(-4, -3, 0)\right) = 2$,因此方程组$(A^* - 2E) X = 0$的解空间维数为1.而$A$的特征值$-1$对应的特征向量即为$A^*$的特征值2对应的特征向量,也即为$(A^* - 2E)$的特征值0对应的特征向量.因此为待求的基础解系.设该特征向量为$\alpha_3 = (x_1, x_2, x_3)^T$.则有:

$$\begin{cases} \alpha_1^T \alpha_2 = 0\\ \alpha_1^T \alpha_3 = 0\\ \alpha_2^T \alpha_3 = 0 \end{cases} \Longrightarrow a = -2, \quad \alpha_3 = (2,-1,1)^T$$

因此所求通解为$k(2,-1,1)^T$,$k$为任意常数.

<!-- q {"id": "la-w-013", "type": "错题", "tags": ["相似矩阵"], "title": "相似对角化求 P 与 det(A−2E)", "chapter": "相似矩阵"} -->

<!-- stem -->
设$A$是3阶矩阵,$\alpha_1, \alpha_2, \alpha_3$是线性无关的三维列向量,且$A \alpha_1 = \alpha_1 + \alpha_2 + \alpha_3, \ A \alpha_2 = 2 \alpha_2+\alpha_3, \ A \alpha_3 = 2 \alpha_2 + 3 \alpha_3$.求:

(1)$A$的全部特征值

(2)可逆矩阵$P$及$\Lambda,$使得$P^{-1} A P = \Lambda,$并计算$\det(A - 2E)$

<!-- wrong -->
(1)

依题意可知:

$$A \cdot (\alpha_1, \alpha_2, \alpha_3) = (\alpha_1, \alpha_2, \alpha_3) \cdot \begin{pmatrix}1 & 0 & 0\\ 1 & 2 & 2\\ 1 & 1 & 3\end{pmatrix}$$

因为$\alpha_i$线性无关,因此$(\alpha_1, \alpha_2, \alpha_3)$是可逆矩阵,因此:

$$A \sim \begin{pmatrix}1 & 0 & 0\\ 1 & 2 & 2\\ 1 & 1 & 3\end{pmatrix} = B, \quad \det(B - \lambda E) = (1-\lambda)(\lambda-1)(\lambda-4)$$

因此$A$的特征值为:$\lambda_1 = \lambda_2 = 1, \lambda_3 = 4$

(2)

由(1)已知:$A = M B M^{-1}$,$r(B - E) = 1, r(B - 4E) = 2 \Rightarrow B = R^{-1} \Lambda_B R$,其中$R$是可逆矩阵,$\Lambda_B = \operatorname{diag}(1,1,4)$.而$R$是容易求得的.

<!-- answer -->
(2). 可以求得:$(E - B) X = 0$的基础解系为:$\eta_1 = (-1,1,0)^T, \ \eta_2 = (-2,0,1)^T$,$(4E - B)X = 0$的基础解系为:$\eta_3 = (0,1,1)^T$.令$P_1 = (\eta_1, \eta_2, \eta_3),$则:

$$P_1^{-1} B P_1 = \operatorname{diag}(1,1,4).$$

而$B = C^{-1} A C$,其中$C = (\alpha_1, \alpha_2, \alpha_3)$.因此:

$$P_1^{-1} C^{-1} A C P_1 = \operatorname{diag}(1,1,4).$$

因此$P = C P_1 = (\alpha_1, \alpha_2, \alpha_3) \cdot (\eta_1, \eta_2, \eta_3) = (-\alpha_1+\alpha_2, \ -2\alpha_1+\alpha_3, \ \alpha_2+\alpha_3)$.

$A \sim \Lambda \Rightarrow A - 2E \sim \Lambda - 2E \Rightarrow \det(A - 2E) = \det(\Lambda - 2E) = 2$

<!-- q {"id": "la-w-014", "type": "错题", "tags": ["相似矩阵"], "title": "实对称矩阵的特征值与特征向量", "chapter": "相似矩阵"} -->

<!-- stem -->
设$A$是3阶实对称矩阵,$A \sim B, \ B = \begin{pmatrix}1 & 2 & 3\\ 2 & 4 & 6\\ 3 & 6 & 9\end{pmatrix}, \ A$的二重特征值对应的特征向量为$\alpha_1 = (1,1,0)^T, \ \alpha_2 = (0,2,1)^T$.求:

(1)$A$的特征值与特征向量

(2)可逆矩阵$P$,使得$P^{-1} A P = \Lambda$

<!-- wrong -->
(1)

容易求得$\lambda_1 = \lambda_2 = 0, \lambda_3 = 14$

<!-- answer -->
(1)

由已知:二重特征值$0$对应的特征向量为:$\alpha_1, \alpha_2$,设特征值14对应的特征向量为$\alpha_3 = (x_1, x_2, x_3)^T$,因为$A$是实对称矩阵,因此$\begin{cases} \alpha_3^T \alpha_1 = 0\\ \alpha_3^T \alpha_2 = 0\end{cases}$,解得$\alpha_3 = (1,-1,2)^T$

(2) $P = (\alpha_1, \alpha_2, \alpha_3)$

**【笔记】**

- 对于秩为1的$n$阶方阵$A$,其特征值为:$0, 0, \cdots, 0, \operatorname{tr}(A)$原因如下:

  $$\operatorname{rank}(A) = 1 \Rightarrow \dim \operatorname{Ker}(A) = n-1$$

  因此:$A x = 0$有$n-1$个线性无关的解,因此$0$是$A$的$n-1$重特征值.又因为$\sum \lambda_i = \operatorname{tr}(A)$,因此:

  $$\lambda_i = 0 \quad (i = 1, 2, \cdots, n-1), \quad \lambda_n = \operatorname{tr}(A)$$

- 对于实对称矩阵$A$,其不同特征值对应的特征向量正交,原因如下:

  **【证明】** 设$\lambda_i, \lambda_j$是$A$的两个不同的特征值,对应的特征向量分别为$\alpha_i, \alpha_j$,则有:

  $$\begin{cases} A \alpha_i = \lambda_i \alpha_i\\ A \alpha_j = \lambda_j \alpha_j \end{cases} \quad (A \alpha_i)^T = \alpha_i^T A^T = \alpha_i^T A = \lambda_i \alpha_i^T$$

  $$\alpha_i^T A \alpha_j = \alpha_i^T \lambda_j \alpha_j = \lambda_j \alpha_i^T \alpha_j = \lambda_i \alpha_i^T \alpha_j. \ \text{So } (\lambda_i - \lambda_j) \alpha_i^T \alpha_j = 0$$

  $$\text{Since } \lambda_i - \lambda_j \neq 0, \quad \alpha_i^T \alpha_j = 0$$

<!-- q {"id": "la-w-015", "type": "错题", "tags": ["相似矩阵"], "title": "由相似求 a, b, c", "chapter": "相似矩阵"} -->

<!-- stem -->
已知$A \sim B, \ A = \begin{pmatrix}1 & a & -1\\ 1 & 5 & 1\\ 4 & 12 & 6\end{pmatrix}, \ B = \begin{pmatrix}b & & \\ b & & \\ & & c\end{pmatrix},$求$a, b, c$的值

<!-- wrong -->
$$A \sim B \Longleftrightarrow \det(A - \lambda E) = \det(B - \lambda E)$$

则易知:$A$的特征值为:$\lambda_1 = \lambda_2 = b, \lambda_3 = c$.

$$\det(A - \lambda E) = \begin{vmatrix}1-\lambda & a & -1\\ 1 & 5-\lambda & 1\\ 4 & 12 & 6-\lambda\end{vmatrix} = -\lambda^3 + 12 \lambda^2 + (a - 33)\lambda + 26 - 2a$$

由于方程的解为$b, b, c$,因此:

$$\det(A - \lambda E) = - (\lambda-b)^2 (\lambda-c)$$

根据各阶系数对应可得:

$$\begin{cases} 2b + c = 12\\ b^2 + b c = 33 - a\\ b^2 c = 26 - 2 a \end{cases}$$

难以求解

<!-- answer -->
注意到:$\lambda = 2$是方程$\det(A - \lambda E) = 0$的一个解.对原方程进行因式分解,得:

$$\det(A - \lambda E) = -(\lambda-2)\left(\lambda^2 - 10 \lambda + 13 - a\right)$$

因此:

- $\lambda = 2$是二重根,$b = 2$,则$\lambda^2 - 10\lambda + 13 - a = 0$的其中一个解为$\lambda = 2,$代入可得:$a = -3$,进一步解得$c = 8$

  此时$A = \begin{pmatrix}1 & -3 & -1\\ 1 & 5 & 1\\ 4 & 12 & 6\end{pmatrix}$,$\operatorname{rank}(A - 2E) = 1, \operatorname{rank}(A - 8E) = 2,$符合题义

- $\lambda = 2$是单根,$c = 2,$此时方程$\lambda^2 - 10 \lambda + 13 - a = 0$应当有两相同的解,因此$\Delta = 100 - 52 + 4a = 48 + 4a = 0 \Rightarrow a = -12$,此时$b = 5$. $A = \begin{pmatrix}1 & -12 & -1\\ 1 & 5 & 1\\ 4 & 12 & 6\end{pmatrix}$,$\operatorname{rank}(A - 5E) = 2$,不符合题义.

因此$a = -3, b = 2, c = 8$

<!-- q {"id": "la-w-016", "type": "错题", "tags": ["相似矩阵"], "title": "正交矩阵 Q 与 AB=P²", "chapter": "相似矩阵"} -->

<!-- stem -->
设$A = \begin{pmatrix}a & 0 & 1\\ 0 & -a & 0\\ 1 & 0 & a\end{pmatrix}$与$B = \begin{pmatrix}-1 & 1 & 0\\ 1 & -1 & 0\\ 0 & 0 & a^2\end{pmatrix}\ (a \neq 0)$相似.

(1)求$a$的值

(2)求正交矩阵$Q$,使得$Q^{-1} A Q = B$

(3)求一个3阶矩阵$P$,使得$A B = P^2$.

<!-- wrong -->
$$A \sim B \Longrightarrow \det(A - \lambda E) = \det(B - \lambda E)$$

解得$a = -1$.或者:

$$A \sim B, \ \operatorname{rank}(B) = 2 \Longrightarrow \det(A) = 0 \Rightarrow a = \pm 1.$$

$a = 1$时,$\operatorname{tr}(A) = 1, \operatorname{tr}(B) = -1$,不符合题义,故$a = -1$

<!-- answer -->
(2)

先分别计算出$Q_1, Q_2$,其中:

$$Q_1^{-1} A Q_1 = \operatorname{diag}(0,1,-2), \quad Q_2^{-1} B Q_2 = \operatorname{diag}(0,1,-2)$$

因此:

$$Q_1^{-1} A Q_1 = Q_2^{-1} B Q_2 \Longleftrightarrow \left(Q_1 Q_2^{-1}\right)^{-1} A Q_1 Q_2^{-1} = B$$

因此,可令$Q = Q_1 Q_2^{-1}$.求得$Q = \begin{pmatrix}1 & 0 & 0\\ 0 & 0 & 1\\ 0 & 1 & 0\end{pmatrix}$

(3)

由(2)可知:$Q^{-1} A Q = B$,则$A Q = Q B$,假设$A Q = Q B = P$,则:

$$A = P Q^{-1}, \quad B = Q^{-1} P \Longrightarrow A B = P \left(Q^{-1}\right)^2 P$$

由于$Q$是正交矩阵,因此$\left(Q^{-1}\right)^2 = \left(Q^T\right)^2 = E$,因此$A B = P^2$

**【笔记】** $Q_1, Q_2$是正交矩阵,则$Q = Q_1 Q_2^{-1} = Q_1 Q_2^T$也是正交矩阵,原因如下:

$$Q \cdot Q^T = \left(Q_1 Q_2^T\right) \cdot \left(Q_2 Q_1^T\right) = Q_1 \cdot \left(Q_2^T Q_2\right) \cdot Q_1^T = E$$
