---
title: export和export default导出的值的不同
date: 2019-03-28 15:09:09
tags:
- JavaScript
- ES6
categories: 
 - 前端
---

`export` 导出的是变量标识符，`export default` 导出的是引用。

举例：

test.js

```JavaScript
let test = { a: 1 }
export function  add() { test = { b: 2 } }
export default test
export { test, add }
```

`export` 导出的值：

```JavaScript
import defaultTest, { test as expTest, add } from 'test.js'
console.log(expTest) // { a: 1 }
console.log(defaultTest) // { a: 1 }
add()
console.log(expTest) // { b: 2 }
console.log(defaultTest) // { a: 1 }
```