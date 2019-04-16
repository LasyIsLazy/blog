---
title: border-radius 原理
tags:
  - border-radius
  - 圆角
---

# border-radius 原理

> `border-radius` 允许你设置元素的外边框圆角

其原理就是用给出的半径确定一个椭圆，椭圆与边框相切，椭圆与边框相切的两点之间的椭圆部分作为边框圆角。

原理示意：

<div class="border-radius-container">
  <div class="rec"></div>
  <div class="round"></div>
  <div class="ellipse">border-radius</div>
  <div class="line"></div>
</div>
<style lang="stylus">
.border-radius-container {
  position: relative;
  width: 200px;
  height: 200px;
}
.border-radius-container .rec {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px dotted #000;
}
.border-radius-container .round {
  position: absolute;
  width: 200px;
  height: 200px;
  border: 2px solid #00ff00;
  border-radius: 50px
}
.border-radius-container .ellipse {
  position: absolute;
  width: 100px;
  height: 100px;
  line-height: 100px;
  font-size: 14px;
  border: 2px dotted #ff0000;
  border-radius: 100px
}
.border-radius-container .line {
  position: absolute;
  width: 2px;
  height: 50px;
  left: 49px;
  background-color: #ff0000;
  line-height: 100px;
  font-size: 14px;
  border-radius: 100px
}
</style>

## 使用

完整用法：`border-radius: r1/r2 r1/r2 r1/r2 r1/r2;`

如 `border-radius: 1px/2px 1px/2px 1px/2px 1px/2px;`

`border-radius` 是一个缩写，其四个值先后分别代表了四个属性的值：

- `border-top-left-radius`：左上角圆角
- `border-top-right-radius`：右上角圆角
- `border-bottom-right-radius`：右下角圆角
- `border-bottom-left-radius`：左下角圆角

这四个属性每一个属性的值都是 `r1/r2` 的形式。其中，r1 代表椭圆的横轴半径长度， r2 代表椭圆的纵轴半径长度；当 r1 和 r2 相等的时候，椭圆就成了圆形，这个时候 `r1/r2` 可以缩写成 `r`（r === r1 === r2）。半径的形式可以使数值也可以是百分比，其中，横轴半径百分比相对于元素 `width`，纵轴半径百分比相对于元素 `height`。

除了上面提到的缩写，`border-radius` 的值也可以缩写。我将所有的缩写列了一个表格：

| 缩写                                              | top-left-r1(px) | top-left-r2(px) | top-right-r1(px) | top-right-r2(px) | bottom-right-r1(px) | bottom-right-r2(px) | bottom-left-r1(px) | bottom-left-r2(px) |
| ------------------------------------------------- | --------------- | --------------- | ---------------- | ---------------- | ------------------- | ------------------- | ------------------ | ------------------ |
| `border-radius: 1px/2px 3px/4px 5px/6px 7px/8px;` | 1               | 2               | 3                | 4                | 5                   | 6                   | 7                  | 8                  |
| `border-radius: 1px/2px 3px/4px 5px/6px;`         | 1               | 2               | 3                | 4                | 5                   | 6                   | 3                  | 4                  |
| `border-radius: 1px/2px 3px/4px;`                 | 1               | 2               | 3                | 4                | 1                   | 2                   | 3                  | 4                  |
| `border-radius: 1px/2px;`                         | 1               | 2               | 1                | 2                | 1                   | 2                   | 1                  | 2                  |
| `border-radius: 1px 3px 5px 7px;`                 | 1               | 1               | 3                | 3                | 5                   | 5                   | 7                  | 7                  |
| `border-radius: 1px 3px 5px;`                     | 1               | 1               | 3                | 3                | 5                   | 5                   | 5                  | 5                  |
| `border-radius: 1px 3px;`                         | 1               | 1               | 3                | 3                | 1                   | 1                   | 3                  | 3                  |
| `border-radius: 1px;`                             | 1               | 1               | 1                | 1                | 1                   | 1                   | 1                  | 1                  |

被省略的属性会取和对角相同的值。

参考：

- [w3.org](https://www.w3.org/TR/css-backgrounds-3/#corners)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius)
