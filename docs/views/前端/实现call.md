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
    this(...args);
    return;
  }
  thisArg._func = this;
  thisArg._func(...args);
};

function test(arg) {
  console.log(this.name, arg);
}

const obj = { name: 'lasy' };
test.call(obj, 'arg');
test.myCall(obj, 'arg');

```

