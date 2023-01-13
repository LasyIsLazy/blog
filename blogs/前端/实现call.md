---
title: 实现 call
date: 2020-05-18
tags:
- JavaScript
categories: 
- 前端
---

```javascript
Function.prototype.myCall = function (thisArg, ...args) {
  if (typeof thisArg !== 'object') {
    // 异常情况直接调用(undefined 和 null 在不同环境下处理不同，这里不作处理，直接调用）
    this(...args);
    return;
  }
  const func = Symbol('func'); // 使用 Symbol 避免命名冲突
  thisArg[func] = this;
  const returnVal = thisArg[func](...args);
  delete thisArg[func]; // 清理变量
  return returnVal;
};

function test(arg) {
  console.log(this.name, arg);
}

const obj = { name: 'lasy' };
test.call(obj, 'arg'); // lasy arg
test.myCall(obj, 'arg'); // lasy arg

```

