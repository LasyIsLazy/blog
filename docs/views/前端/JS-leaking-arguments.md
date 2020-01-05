---
title: JS leaking arguments
date: 2019-03-12
tags:
- JavaScript
- leaking arguments
categories: 
 - 前端
---
# JavaScript leaking arguments

在看 `Vue` 源码时，遇到这么一段代码：

```JavaScript
// avoid leaking arguments:
// http://jsperf.com/closure-with-arguments
let i = arguments.length
const args = new Array(i)
while (i--) {
    args[i] = arguments[i]
}
const result = original.apply(this, args)

```

于是研究了一番。

## Leaking arguments 是什么

*Leaking arguments* 是指传递 `arguments` 作为另一个函数的参数。

## 影响

这会导致性能问题，V8 引擎会跳过对 leaking arguments 的优化。

## 解决方案

将 `arguments` 中需要的参数取出来，赋值给新的数组，并将该数组作为另一个函数的参数。也就是上面 Vue 源码中的方案。

相关文章

- [http://www.jstips.co/zh_cn/javascript/avoid-modifying-or-passing-arguments-into-other-functions-it-kills-optimization/](http://www.jstips.co/zh_cn/javascript/avoid-modifying-or-passing-arguments-into-other-functions-it-kills-optimization/)
- [JavaScript arguments 对象全面介绍——知乎专栏](https://zhuanlan.zhihu.com/p/23007032)