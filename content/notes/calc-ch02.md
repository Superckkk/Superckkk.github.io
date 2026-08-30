---
title: 数列极限
subject: 高等数学
chapter: 数列极限
date: 2026-08-30
tags: [数列极限]
excerpt: 子列收敛、海涅定理、重要不等式、压缩映射与单调有界准则。
---

数列收敛与其子列收敛的关系：

- 若数列 $\{a_n\}$ 收敛，则其任何子列 $\{a_{n_k}\}$ 也收敛，且 $\lim\limits_{k\to\infty} a_{n_k} = \lim\limits_{n\to\infty} a_n$。但逆命题不成立。

收敛数列的性质：

- 唯一性
- 有界性：若数列 $\{x_n\}$ 极限存在，则数列 $\{x_n\}$ 有界
- 保号性：设 $\lim\limits_{n\to\infty} x_n = a > (<)\, b$，则存在 $N > 0$，当 $n > N$ 时，有 $x_n > (<)\, b$。若数列 $\{x_n\}$ 从某项起有 $x_n \ge (\le)\, b$，且 $\lim\limits_{n\to\infty} x_n = a$，则 $a \ge (\le)\, b$，其中 $b$ 为任意实数，常考 $b = 0$ 的情形

## 海涅定理（归结原则）

设 $f(x)$ 在 $\mathring{U}(x_0, \delta)$ 内有定义，则 $\lim\limits_{x\to x_0} f(x) = A$ 存在 $\Longleftrightarrow$ 对任何 $\mathring{U}(x_0, \delta)$ 内以 $x_0$ 为极限的数列 $\{x_n\}\ (x_n \neq x_0)$，极限 $\lim\limits_{n\to\infty} f(x_n) = A$ 存在。

> **定义（海涅定理）**
>
> $\lim\limits_{x\to x_0} f(x) = A \iff$ 对任何 $x_n \to x_0\ (x_n \neq x_0)$，都有 $\lim\limits_{n\to\infty} f(x_n) = A$

直观来讲，海涅定理表示，当函数 $f(x)$ 在 $x_0$ 处极限存在时，假设为 $A$，对于所有以 $x_0$ 为极限的数列 $\{a_n\}$，当 $n\to\infty$ 时 $f(a_n)$ 也以 $A$ 为极限。

海涅定理时常用于证明函数极限**不存在**（找两个子列趋于不同值，或一个子列发散）。

> 典型例题见题库（$x\to 0$ 时 $\dfrac{1}{x}\sin\dfrac{1}{x}$ 的类型判定）。

令 $f(x) = \begin{cases} x^2, & x \in \mathbb{Q}\\ 0, & x \in \mathbb{Q}^c \end{cases}$，事实上，$f(x) = x^2 D(x)$，其中 $D(x) = \begin{cases} 1, & x \in \mathbb{Q}\\ 0, & x \in \mathbb{Q}^c \end{cases}$ 为狄利克雷函数（Dirichlet function）。有如下结论：

- $f(x)$ 在 $x = 0$ 处连续。
- $f(x)$ 在 $x \neq 0$ 处不连续。

## 重要不等式

- $|a \pm b| \le |a| + |b|$；$\big||a| - |b|\big| \le |a - b|$
- $\sqrt{ab} \le \dfrac{a + b}{2} \le \sqrt{\dfrac{a^2 + b^2}{2}} \quad (a, b \ge 0)$
- $\sqrt[3]{abc} \le \dfrac{a + b + c}{3} \le \sqrt[3]{\dfrac{a^2 + b^2 + c^2}{3}} \quad (a, b, c \ge 0)$
- 若 $0 < a < x < b,\ 0 < c < y < d$，则 $\dfrac{c}{b} < \dfrac{y}{x} < \dfrac{d}{a}$
- $\dfrac{1}{1+x} < \ln\left(1 + \dfrac{1}{x}\right) < \dfrac{1}{x} \quad (x>0)$ 或 $\dfrac{x}{1+x} < \ln(1+x) < x \quad (x>0)$

## 压缩映射原理

- **原理一**：对数列 $\{x_n\}$，若存在常数 $k\ (0 < k < 1)$，使得 $|x_{n+1} - a| \le k|x_n - a|$，$n = 1, 2, \cdots$，则 $\{x_n\}$ 收敛于 $a$。
- **原理二**：对数列 $\{x_n\}$，若 $x_{n+1} = f(x_n),\ n = 1, 2, \cdots$，$f(x)$ 可导，$a$ 是 $f(x) = x$ 的唯一解，且对任意 $x \in \mathbb{R}$，有 $|f'(x)| \le k < 1$，则 $\{x_n\}$ 收敛于 $a$。

以上两原理需能写出证明。

一个常用结论：

- $\lim\limits_{n\to\infty} \sqrt[n]{a_1^n + a_2^n + \cdots + a_m^n} = \max(a_1, a_2, \cdots, a_m)$

## 单调有界准则

单调有界数列必有极限。

## $\{x_n\}$ 收敛于 $a$ 的速度问题

设数列 $\{x_n\}, \{y_n\}$ 在 $n\to\infty$ 的过程中同时趋于 $a$，记 $u_n = |x_n - a|,\ v_n = |y_n - a|$，$I = \lim\limits_{n\to\infty} \dfrac{u_n}{v_n}$，且当 $n \to \infty$ 时，$u_n$ 和 $v_n$ 都是无穷小量，则：

- 若 $I = 0$，则说明 $x_n$ 的收敛速度比 $y_n$ 的收敛速度快（高阶）
- 若 $I = b$，则说明 $x_n$ 的收敛速度是 $y_n$ 的 $\dfrac{1}{b}$ 倍（同阶）
- 若 $I = \infty$，则说明 $x_n$ 的收敛速度比 $y_n$ 的收敛速度慢（低阶）
