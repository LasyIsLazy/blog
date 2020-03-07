---
title: var, let, const的区别
date: 2018-09-10
tags:
- JavaScript
categories: 
 - 前端
---
- `var`函数作用域；`let`, `const`块级作用域。
- `var`有变量提升；`let`,`const`没有变量提升，但是有暂时性死区（TDZ）。
- `var`可以重复声明；`let`,`const`不允许重复声明。
- `const`声明的变量值不可更改。
- `let`,`const`声明的变量不属于顶层对象。

本文只做了总结，详细解释可以参考[阮一峰的博客](http://es6.ruanyifeng.com/#docs/let)