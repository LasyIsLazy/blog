---
title: 一道面试题：map(parseInt)
date: 2018-09-03 15:11:47
tags:
- JavaScript
- map
- parseInt
---
## 题目

>`['1', '2', '3'].map(parseInt);`输出的是什么

第一反应很容易认为输出：`[1, 2, 3]`；

然而结果是：`[1, NaN, NaN]`。

## 原因

首先来看下`map`函数。

### Array.prototype.map()

`map`函数接受两个参数：

1. `callback`。`map`函数会给原数组中的每个元素都按顺序调用一次`callback`函数。
2. `thisArg`（可选）。如果`thisArg`参数有值，则每次`callback`函数被调用的时候，`this`都会指向`thisArg`参数上的这个对象。如果省略了`thisArg`参数,或者赋值为`null`或`undefined`，则`this`指向全局对象 。

重点来看下`callback`：

callback 函数会被自动传入三个参数：

1. `currentValue`：`callback` 数组中正在处理的当前元素。
1. `index`（可选）：`callback` 数组中正在处理的当前元素的索引。
1. `array`（可选）：`callback` `map` 方法被调用的数组。

`callback`中我们最常用到第一个参数，但是其实在执行回调函数的时候，三个参数都会被传入。
也就是说：`['1', '2', '3'].map(parseInt);`相当于对每个元素执行`parseInt(currentValue, index, array)`。
很多情况下，我们并不会对第二个和第三个参数做处理，然而不巧的是，`parseInt`接受两个参数。

### parseInt()

语法：`parseInt(string, radix);`
参数：

1. `string`：要被解析的值。如果参数不是一个字符串，则将其转换为字符串(使用 `ToString`抽象操作)。字符串开头的空白符将会被忽略。
1. `radix`：一个介于2和36之间的整数(数学系统的基础)，表示上述字符串的基数。比如参数"10"表示使用我们通常使用的十进制数值系统。始终指定此参数可以消除阅读该代码时的困惑并且保证转换结果可预测。当未指定基数时，不同的实现会产生不同的结果，通常将值默认为10。

在没有指定基数，或者基数为 0 的情况下，JavaScript 作如下处理：

如果字符串 `string` 以"0x"或者"0X"开头, 则基数是16 (16进制).
如果字符串 `string` 以"0"开头, 基数是8（八进制）或者10（十进制），那么具体是哪个基数由实现环境决定。ECMAScript 5 规定使用10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出radix参数的值。
如果字符串 `string` 以其它任何值开头，则基数是10 (十进制)。
如果第一个字符不能被转换成数字，`parseInt`返回`NaN`。

到这里其实应该已经明白题目的结果了，我们来理一下。

`['1', '2', '3'].map(parseInt);`执行过程：

1. `parseInt('1', 0, ['1', '2', '3'])`。`map`传入三个参数（当前元素，下标，数组本身）到回调函数中，但是`parseInt`只接受两个参数，即相当于`parseInt（'1', 0)`，基数为0，`string`以`1`开头，所以按十进制处理，结果为`1`。
1. `parseInt('2', 1, ['1', '2', '3'])`。基数为`1`，将`2`按一进制处理，而`2`并不是一进制数，不能转换，返回`NaN`。
1. `parseInt('3', 2, ['1', '2', '3'])`。基数为`2`，将`3`按二进制处理，而`3`并不是二进制数，不能转换，返回`NaN`。
1. 组成数组，所以最后结果为：`[1, NaN, NaN]`。

参考：

- [MDN - parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- [MDN - Array.prototype.map()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)