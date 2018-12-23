---
title: mouseover, mouseenter, mouseout, mouseleave区别
date: 2018-07-12 20:00:25
tags:
- JavaScript
- mouseenter
- mouseleave
- mouseout
- mouseover
---
# mouseover, mouseenter, mouseout, mouseleave区别

## 触发顺序

- `mouseover`, `mouseenter`都表示鼠标进入，但是`mouseover`比`mouseenter`先触发；
- `mouseout`, `mouseleave`都表示鼠标离开，但是`mouseout`比`mouseleave`先触发；

## 冒泡

- `mouseover`, `mouseenter`都会冒泡，也就是说，进入和离开元素会触发其父元素的`mouseover`, `mouseenter`。

## 对离开和进入子元素的处理

- 从其本身进入子元素时会触发`mouseover`，而不会触发`mouseout`。
- 离开子元素进入其本身时会触发`mouseover`，而不会触发`mouseenter`。

总结一下：

- `mouseover`和`mouseout`是一对，`mouseenter`和`mouseleave`是一对，拥有相同的处理方式，一个表示进入，一个表示离开；
- `mouseover`和`mouseout`会触发冒泡；
- `mouseover`和`mouseout`比`mouseenter`和`mouseleave`先触发。