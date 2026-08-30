---
title: 一元函数微分学的计算
subject: 高等数学
chapter: 导数的计算
date: 2026-08-30
tags: [导数的计算]
excerpt: 基本求导公式、常用高阶导数、反函数与参数方程求导、莱布尼茨公式。
---

## 基本求导公式

- $(x^\alpha)' = \alpha x^{\alpha - 1}$
- $(a^x)' = a^{x} \ln a$
- $(\log_a x)' = \dfrac{1}{x \ln a}$
- $(\ln |x|)' = \dfrac{1}{x}$
- $(\sin x)' = \cos x$
- $(\cos x)' = - \sin x$
- $(\tan x)' = \sec^2 x$
- $(\cot x)' = - \csc^2 x$
- $(\sec x)' = \sec x \tan x$
- $(\csc x)' = - \csc x \cot x$
- $(\arcsin x)' = \dfrac{1}{\sqrt{1 - x^2}}$
- $(\arccos x)' = -\dfrac{1}{\sqrt{1 - x^2}}$
- $(\arctan x)' = \dfrac{1}{1 + x^2}$
- $\left[\ln\left(x + \sqrt{x^2+1}\right)\right]' = \dfrac{1}{\sqrt{x^2 + 1}}$
- $\left[\ln\left(x + \sqrt{x^2-1}\right)\right]' = \dfrac{1}{\sqrt{x^2 - 1}}$

## 常用高阶导数

- $\left(e^{a x + b}\right)^{(n)} = a^n e^{a x + b}$
- $\left[\sin(a x + b)\right]^{(n)} = a^n \sin\left(a x + b + \dfrac{n\pi}{2}\right)$
- $\left[\cos(a x + b)\right]^{(n)} = a^n \cos\left(a x + b + \dfrac{n\pi}{2}\right)$
- $\left[\ln(a x + b)\right]^{(n)} = (-1)^{n-1}\, a^n \dfrac{(n-1)!}{(a x + b)^n}$
- $\left(\dfrac{1}{a x + b}\right)^{(n)} = (-1)^n a^n \dfrac{n!}{(a x + b)^{n+1}}$

> 典型例题见题库（100 项乘积函数在 x=1 处的导数）。

微分形式的不变性指：无论 $u$ 是中间变量还是自变量，$\mathrm{d}y = f'(u)\,\mathrm{d}u$ 都成立。

## 反函数的导数

设 $y = f(x)$ 为**单调、可导**函数，且 $f'(x) \neq 0$，则存在反函数 $x = \varphi(y)$，且

$$\frac{\mathrm{d}x}{\mathrm{d}y} = \frac{1}{\dfrac{\mathrm{d}y}{\mathrm{d}x}}$$

即 $\varphi'(y) = \dfrac{1}{f'(x)}$。

二阶导数类似：

$$y''_{xx} = \frac{\mathrm{d}^2 y}{\mathrm{d}x^2} = \frac{\mathrm{d}\left(\dfrac{\mathrm{d}y}{\mathrm{d}x}\right)}{\mathrm{d}x} = \frac{\mathrm{d}\left(\dfrac{1}{x'_y}\right)}{\mathrm{d}x} = \frac{\mathrm{d}\left(\dfrac{1}{x'_y}\right)}{\mathrm{d}y} \cdot \frac{1}{x'_y} = - \frac{x''_{yy}}{\left(x'_y\right)^3}$$

## 参数方程求导

设函数 $y = y(x)$ 由参数方程 $\begin{cases} x = \varphi(t)\\ y = \psi(t) \end{cases}$ 确定，其中 $t$ 是参数，且 $\varphi(t), \psi(t)$ 均可导，$\varphi'(t) \neq 0$，则

$$\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{\mathrm{d}y/\mathrm{d}t}{\mathrm{d}x/\mathrm{d}t} = \frac{\psi'(t)}{\varphi'(t)}$$

二阶导数类似：

$$\frac{\mathrm{d}^2 y}{\mathrm{d}x^2} = \frac{\psi''(t)\varphi'(t) - \psi'(t)\varphi''(t)}{\left[\varphi'(t)\right]^3}$$

## 莱布尼茨公式

设 $u = u(x), v = v(x)$ 均 $n$ 阶可导，则：

$$(u \pm v)^{(n)} = u^{(n)} \pm v^{(n)}$$

$$(u v)^{(n)} = \sum_{k=0}^{n} \binom{n}{k} u^{(n-k)} v^{(k)} \qquad (*)$$

（$*$）式称为求函数乘积的高阶导数的**莱布尼茨公式**，其中 $u^{(0)} = u, v^{(0)} = v$，其常与泰勒公式配合使用以确定系数，泰勒展开式为：

$$y = f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(x_0)}{n!} \left(x - x_0\right)^n$$
