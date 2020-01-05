---
title: border-radius 原理
date: 2019-04-16 16:41:18
tags:
  - border-radius
  - 圆角
categories: 
 - 前端
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

完整用法：`border-radius: tl1 tr1 br1 bl1 / tl2 tr2 br2 bl2;`

如 `border-radius: 1px 2px 3px 4px / 5px 6px 7px 8px;`

其中，各个值分别代表：

- `tl1`：`border-top-left-radius` 横轴半径（左上角圆角横轴半径）
- `tr1`：`border-top-right-radius` 横轴半径（右上角圆角横轴半径）
- `br1`：`border-bottom-right-radius` 横轴半径（右下角圆角横轴半径）
- `bl1`：`border-bottom-left-radius` 横轴半径（左下角圆角横轴半径）
- `tl2`：`border-top-left-radius` 纵轴半径（左上角圆角纵轴半径）
- `tr2`：`border-top-right-radius` 纵轴半径（右上角圆角纵轴半径）
- `br2`：`border-bottom-right-radius` 纵轴半径（右下角圆角纵轴半径）
- `bl2`：`border-bottom-left-radius` 纵轴半径（左下角圆角纵轴半径）

也就是说 `/` 左边的代表的是横坐标半径，右边代表的是纵轴半径，顺序是从左上角顺时针到左下角。

`/` 左右可以看成两个不同的部分，他们并不会互相影响。但是当出现缩写的时候，每个部分之间就会出现影响。

## 缩写

`border-radius` 是一个缩写，当它的值没有 `/` 时，其四个值先后分别代表了四个属性的值：

- `border-top-left-radius`：左上角圆角
- `border-top-right-radius`：右上角圆角
- `border-bottom-right-radius`：右下角圆角
- `border-bottom-left-radius`：左下角圆角

当有 `/` 时，相当于分别把上面四个属性的长轴半径放到了 `/` 左边，短轴半径放到了 `/` 右边。

缩写时被省略的属性会取对角的属性的值，如果缩写后只有一个值，那么所有属性都是这个值。

例如：`border-radius: 1px 2px 3px;` 等同于 `border-radius: 1px 2px 3px 2px;`（省略了左下，因此左下的值会取右上的值，即 `2px`）。

再比如：`border-radius: 2em 1em 4em / 0.5em 3em;` 等同于 `border-radius: 2em 1em 4em 1em / 0.5em 3em 0.5em 3em;`（以 `/` 为届分成两部分来看。左边：`2em 1em 4em` 缺少左下，取右上的值 `1em`；右边：`0.5em 3em`，省略了右下，取左上 `0.5em`，省略了左下，取右上 `3em`）。

如果只有一个值 `border-radius: 1px / 2px;`，那么所有属性都会是这个值，即等同于 `border-radius: 1px 1px 1px 1px / 2px 2px 2px 2px;`

下面的表格列举了缩写的所有基本情况及其对应的各个半径：


| 缩写                                        | tl1 | tl2 | tr1 | tr2 | br1 | br2 | bl1 | bl2 |
| ------------------------------------------- | --- | --- | --- | --- | --- | --- | --- | --- |
| `border-radius: 1;`                         | 1   | 1   | 1   | 1   | 1   | 1   | 1   | 1   |
| `border-radius: 1 2;`                       | 1   | 1   | 2   | 2   | 1   | 1   | 2   | 2   |
| `border-radius: 1 2 3;`                     | 1   | 1   | 2   | 2   | 3   | 3   | 2   | 2   |
| `border-radius: 1 2 3 4;`                   | 1   | 1   | 2   | 2   | 3   | 3   | 4   | 4   |
| `border-radius: 11 / 21;`                   | 11  | 21  | 11  | 21  | 11  | 21  | 11  | 21  |
| `border-radius: 11 12 / 21;`                | 11  | 21  | 12  | 21  | 11  | 21  | 12  | 21  |
| `border-radius: 11 12 13 / 21 22;`          | 11  | 21  | 12  | 21  | 13  | 21  | 12  | 22  |
| `border-radius: 11 12 13 14 / 21 22 23 24;` | 11  | 21  | 12  | 22  | 13  | 23  | 14  | 24  |

说明：

- 省略了单位
- 各列的含义：
  - tl1：左上角圆角横轴半径
  - tl2：左上角圆角纵轴半径
  - tr1：右上角圆角横轴半径
  - tr2：右上角圆角纵轴半径
  - br1：右下角圆角横轴半径
  - br2：右下角圆角纵轴半径
  - bl1：左下角圆角横轴半径
  - bl2：左下角圆角纵轴半径

## 百分比

半径的形式可以使数值也可以是百分比，其中，横轴半径百分比相对于元素 `width`，纵轴半径百分比相对于元素 `height`。

我写了一个可以预览 border-radius 效果的简单网页，可以通过设置各个半径查看效果：[https://lasyislazy.github.io/border-radius/](https://lasyislazy.github.io/border-radius/)（当然，你也可以直接用控制台）

参考：

- [w3.org](https://www.w3.org/TR/css-backgrounds-3/#corners)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius)
