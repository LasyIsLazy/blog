## 定义

> `for...in`语句以任意顺序遍历一个对象的可枚举属性。对于每个不同的属性，语句都会被执行。
> `for...of`语句在可迭代对象（包括 `Array`，`Map`，`Set`，`String`，`TypedArray`，`arguments` 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

## 区别

1. `for...in`遍历的是属性；`for...of`遍历的是值（一般来讲）。
1. `for...in`可以遍历所有对象；`for...of`只能遍历 **可迭代对象**。
1. `for...in`语句以 **原始插入顺序** 遍历对象的 **可枚举属性**；`for...of`语句不能保证遍历顺序，但是可以遍历到不可枚举属性。

## 可迭代对象

遍历可迭代对象：

```JavaScript
const array = ["a", "b", "c"];
for (const value of array) {
    console.log(value); // a, b, c
}
for (const key in array) {
    console.log(key); // 0, 1, 2
}
```

`for...of`遍历值，`for...in`遍历属性。

遍历不可迭代对象：

```JavaScript
const obj = {
    a: 1,
    b: 2
};
for (const value of obj) {
    console.log(value); // TypeError: obj is not iterable
}
for (const key in obj) {
    console.log(key); // a, b
}
```

我们自己定义的`obj`没有遍历接口，是不可迭代对象，使用`for...of`会报错；
但是使用`for...in`可以遍历到`obj`的可枚举属性。

接下来我们给`obj`增加遍历接口：

```JavaScript
const obj = {
    a: 1,
    b: 2
};
obj[Symbol.iterator] = function*() {
    yield 11;
    yield 22;
};
for (const value of obj) {
    console.log(value); // 11, 22
}
for (const key in obj) {
    console.log(key); // a, b
}
```

可以看到，现在使用`for...of`也可以遍历`obj`了。
你应该已经注意到，`for...of`遍历到的并不是`obj`的值，`for...of`遍历结果取决于遍历接口如何定义，也就是`obj[Symbol.iterator]`。`Array`，`Map`，`Set`，`String`，`TypedArray`，`arguments` 对象等等已经原生定义了遍历接口。
`obj[Symbol.iterator]`执行后返回一个迭代器，`for...of`遍历的原理就是对这个迭代器的遍历。
`for (const value of obj) {...}`相当于`for (const value of obj[Symbol.iterator]()) {...}`。

可迭代对象本身就具备遍历器接口，遍历器接口定义了`for...of`如何遍历。

```JavaScript
let array = [4, 5, 6];
for (let iter of array) {
    console.log(iter); // 4, 5, 6
}
array[Symbol.iterator] = function*() { // 修改数组的遍历器接口
    yield 1;
    yield 2;
};
for (let iter of array) {
    console.log(iter); // 1, 2
}
```

例子中，我们修改了数组的遍历器接口，因此使用`for...of`时按照我们定义的方式遍历了数组。

### 可枚举属性

`for...in`只能遍历可枚举属性。
> 可枚举属性是指那些内部 “可枚举” 标志设置为 `true` 的属性，对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 `true`，对于通过 `Object.defineProperty` 等定义的属性，该标识值默认为 `false`。

判断方法：`Object.prototype.propertyIsEnumerable()`；`Object.keys()`中含有。

```JavaScript
const obj = {
    a: 1,
    b: 2
};
Object.defineProperty(obj, "unenumerableProp", {}); // 默认不可枚举
Object.defineProperty(obj, "enumerableProp", {
    enumerable: true // 设置为可枚举
});
console.log(obj.propertyIsEnumerable("unenumerableProp")); // false
console.log(obj.propertyIsEnumerable("enumerableProp")); // true
console.log(Object.getOwnPropertyNames(obj)); // [ 'a', 'b', 'unenumerableProp', 'enumerableProp' ]
console.log(Object.keys(obj)); // [ 'a', 'b', 'enumerableProp' ]
for (let i in obj) {
    console.log(i); // a, b, enumerableProp
}
```

可以看到，对于不可枚举的属性`unenumerable`，`Object.keys()`中并不存在，`for..in`也不能遍历。