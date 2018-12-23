---
title: JavaScript深拷贝浅拷贝
date: 2018-07-06 10:19:23
tags:
- JavaScript
- 浅克隆
- 浅拷贝
- 深克隆
- 深拷贝
---
# 深克隆和浅克隆

先来看一段代码

```JavaScript
let obj = {
    a: 1,
}
```

有一个对象`obj`，我们要复制其中所有属性到另一个对象中去。

```JavaScript
cloneObj = obj;
cloneObj.a = 3;
console.log(obj.a); // 3
console.log(cloneObj.a); // 3
```

显然，直接赋值并不能做到复制。因为`obj`保存的是对象的地址，这么做只是将地址赋值给`cloneObj`而已，`obj`与`cloneObj`指向同一对象。赋值只是将引用复制过去了而已。

## 浅克隆（shallow copy）

浅克隆会复制对象中的所有属性和值。

同样以前面的`obj`作为示例，浅克隆实现方法有如下几种：

### for循环遍历属性

```JavaScript
        function shallowClone(object) {
            let copy = {};
            if (object === null || typeof object !== 'object') {
                // 对于非Object类型（null, undefined, string, number, Boolean），直接返回。
                return object;
            }
            if (object instanceof Date) {
                // Date类型
                copy = new Date();
                copy.setTime(object.getTime());
                return copy;
            }
            if (object instanceof Array) {
                // 数组类型
                copy = [];
            }
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    const element = object[key];
                    copy[key] = element;
                }
            }
            return copy;
        }
```

### Object.assign

`Object.assign`是`ES6`的方法，用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，并返回目标对象。

```JavaScript
function shallowClone(object) {
    return Object.assign({},object);
}
```

测试：

```JavaScript
let copy = shallowClone(obj);
obj.a = 3;
console.log(obj.a); // 3
console.log(copy.a); // 1
```

可见，`obj`与`copy`已经指向两个不同的对象了。浅克隆复制的不再是引用，而是对象的所有可遍历属性和值。

## 深克隆（deep copy）

浅克隆之所以叫浅克隆就是因为复制的层次太浅（只有一层）。

当出现嵌套对象时，也就是对象的属性的值中出现对象的时候，浅克隆复制的对象中比第一层更深层的对象只会被复制引用。

测试：

```JavaScript
obj = {
    a: 1,
    b: {
        value: 2
    }
}
let copy = shallowClone(obj);
obj.b.value = 3;
console.log(obj.b.value); // 3
console.log(copy.b.value); // 3
```

虽然`obj`与`copy`指向的不是同一个对象，但是`obj.b`与`copy.b`指向的却是同一对象。也就是说，浅克隆只复制了深层对象的引用。

要实现深层对象的复制，就要用到深克隆。

深克隆会将对象中存在的所有对象全部复制。

### 递归

深克隆的实现方法之一就是在浅克隆的基础上当遇到值为对象的时候，再对对象进行浅克隆，可以说，深克隆就是递归的浅克隆。

实现：

```JavaScript
function deepClone1(object) {
    let copy = {};
    if (object === null || typeof object !== 'object') {
        // 对于非Object类型（null, undefined, string, number, Boolean），直接返回。
        return object;
    }
    if (object instanceof Date) {
        // Date类型
        copy = new Date();
        copy.setTime(object.getTime());
        return copy;
    }
    if (object instanceof Array) {
        // 数组类型
        copy = [];
    }
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const element = object[key];
            copy[key] = deepClone(element); // 递归
        }
    }
    return copy;
}
```

### JSON

通过`stringify()`方法将对象转换为字符串，再通过`parse()`方法解析为对象。

在`stringify()`过程中，嵌套对象也同样进行了转换，因此可以进行深克隆。

兼容性：IE8+

```JavaScript
function deepClone(object) {
    return JSON.parse(JSON.stringify(object));
}
```

相较于第一种遍历的方法，我更推荐JSON方法进行深克隆，一方面JSON的方法简单容易实现，另一方面JSON方法的性能更好。

关于性能的说明：
很多人会觉得JSON方法不如自己实现的深克隆性能好。首先说明这是一个错误的认识。

实际上，JSON方法是目前最快的深克隆方法，在时间和内存方面，它都是最优的深克隆方案。

其性能更好的原因：

- JavaScript引擎对`for...in`循环的优化很差，检查`hasOwnProperty`也相当耗时。
- 在大多数浏览器中，JSON对象由浏览器原生实现，所以会比任何基于JavaScript的深度克隆要快，有时候甚至比基于JavaScript的浅克隆还要快。
- **在Chrome65中**，完全不推荐使用基于JavaScript的深度克隆，根据[JSPerf](https://jsperf.com/efficient-deep-cloning-teqniques)的测试，基于JavaScript的深度克隆要比JSON方法慢将近 **800** 倍，而JSON方法一直很快。

缺点：

- JSON方法不会复制JSON不支持的值的属性，例如，值为函数的属性。JSON支持的值：`string`, `number`, `true` `false` `null`, `object`, `array`。参考[JSON规范](http://json.org/)。
- 不支持`Date`类型。`Date`类型会被转换为字符串。

测试：

```JavaScript
let copy = deepClone(obj);
obj.b.value = 3;
console.log(obj.b.value); // 3
console.log(copy.b.value); // 2
```

## 关于深克隆的说明

- 以上关于深克隆的代码均不是最优代码，因为还有许多问题没有考虑到：环引用、原型属性、Object子类，不可遍历属性……
- 由于深克隆的各种各样的问题以及性能，不建议使用深克隆。

## 总结

- 浅克隆的最优方案为：`copy = Object.assign({},object)`，对于不支持的浏览器可以使用相关polyfill进行兼容。
- 不建议使用深克隆。大多数场景下，浅克隆已经可以满足。
- 对已知结构的对象克隆嵌套对象时，使用自己编写的代码去克隆已知部分，而不是使用自动化的递归的深克隆。
- 如果一定要使用到深克隆，建议优先使用`JSON`的方案，`JSON`方案不满足时，再考虑使用基于JavaScript的深度克隆方案。

参考链接：

- [What is the most efficient way to deep clone an object in JavaScript?](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript)
- [How do I correctly clone a JavaScript object?](https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object/30042948)
- [JSON Spec](https://www.json.org/)