---
title: call, apply, bind
date: 2018-07-16 00:00:00
tags:
- JavaScript
categories: 
 - 前端
---
# call, apply, bind

## call

MDN上的解释：
>`call()` 方法调用一个函数, 其具有一个指定的`this`值和分别地提供的参数(参数的列表)。
简单理解就是call改变了函数内部的this指向。
语法：

```JavaScript
fun.call(thisArg, arg1, arg2, ...)
```

`thisArg`：在fun函数运行时指定的`this`值。（如果传入的是`null`或者`undefined`，在非严格模式下，`this`会指向全局对象；如果传入的是原始数据类型的值，`this`会指向该值的自动包装类型。）
`arg1, arg2, ...`：参数列表。

示例：

```JavaScript
var obj = {
    a: 1,
    getA: function (param1, param2) {
        console.log('this.a:' + this.a + '; param1:' + param1 + '; param2:' + param2);
    }
}
obj.getA(2, 3); // this.a:1; param1:2; param2:3
newObj = {
    a: 2
}
obj.getA.call(newObj, 2, 3); // this.a:2; param1:2; param2:3
```

`obj.getA(...)`中`this`指向`obj`，所以`this.a` === `obj.a` === 1；
`obj.getA.call(newObj,...)`将`this`指向`newObj`，所以`this.a` === `newObj.a` ===2；

## apply

MDN上的解释：
>apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个数组（或类数组的对象）提供的参数。

```JavaScript
func.apply(thisArg, argsArray)
```

`thisArg`：可选。在fun函数运行时指定的this值。（如果传入的是`null`或者`undefined`，在非严格模式下，`this`会指向全局对象；如果传入的是原始数据类型的值，`this`会指向该值的自动包装类型。）
`argsArray`：可选。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给`func`函数。如果该参数的值为`null`或`undefined`，则表示不需要传入任何参数。

`apply`与`call`函数具有相同的功能，唯一的不同是传入参数的方式：`call`方法中参数是以参数列表的形式（也就是多个参数）传入；`apply`方法中参数是以数据的形式传入。
示例：

```JavaScript
var obj = {
    a: 1,
    getA: function (param1, param2) {
        console.log('this.a:' + this.a + '; param1:' + param1 + '; param2:' + param2);
    }
}
obj.getA(2, 3); // this.a:1; param1:2; param2:3
newObj = {
    a: 2
}
obj.getA.call(newObj, 2, 3); // this.a:2; param1:2; param2:3
obj.getA.apply(newObj, [2, 3]); // this.a:2; param1:2; param2:3
```

`obj.getA(...)`中`this`指向`obj`，所以`this.a` === `obj.a` === 1；
`obj.getA.apply(newObj,...)`将`this`指向`newObj`，所以`this.a` === `newObj.a` ===2；

## bind

MDN上的解释：
>bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。

```JavaScript
func.bind(thisArg, arg1, arg2, ...)
```

`thisArg`：可选。当`func`函数被调用时，该参数会作为原函数运行时的`this`指向。当使用`new`操作符调用绑定函数时，该参数无效。
`arg1, arg2, ...`：可选。参数列表

`bind`与`call`函数具有类似的功能，不同的是`bind`不会立即执行函数，而是将函数返回（该函数包含了新的this指向和给定的参数）。
示例：

```JavaScript
var obj = {
    a: 1,
    getA: function (param1, param2) {
        console.log('this.a:' + this.a + '; param1:' + param1 + '; param2:' + param2);
    }
}
obj.getA(2, 3); // this.a:1; param1:2; param2:3
newObj = {
    a: 2
}
var bindGetA=obj.getA.bind(newObj, 2, 3);
bindGetA(); // this.a:2; param1:2; param2
```

`bind`与`call/apply`另一个不同在于`bind`中绑定的`thisArg`并不总是有效，正如前文介绍`thisArg`时提到的：
>当使用`new`操作符调用绑定函数时，该参数无效。
来看一个示例：

```JavaScript
function test() {
    this.a = 1;
}
let t = new test();
console.log(t.a); // 1
const obj = {
    a: 2
}
let bindTest = test.bind(obj);
let t2 = new bindTest();
console.log(t2.a); // 1
```

`bindTest`中绑定了obj，然而在用`new`生成实例的过程中，`this`的指向依然是`t2`，所以，在使用`new`生成实例时，`thisarg`参数无效。
