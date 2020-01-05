---
title: box-sizing
date: 2018-05-25 9:04:09
tags:
- CSS
- box-sizing
- 盒模型
categories: 
 - 前端
---
box-sizing是我们布局的时候经常要设置的一个CSS属性，影响CSS的盒模型

box-sizing有两个值： content-box 和 border-box

我们都知道CSS盒模型是有四部分组成的：content edge, padding edge, border edge, margin edge。

content 是实际上显示内容的区域； padding 是内边距； border 是边框； margin 是外边距。

### content-box

content-box 是 box-sizing 的默认值。content-box 是指我们设置的 width, height 就是 content 的大小。也就是说，我们设置的 padding, border, margin 都不会影响内容的显示，content 区域大小不会改变，而相对应地，元素实际大小就会增加。

### border-box

border-box 是指我们设置的 width, height a包含border以及border以内的东西。也就是说，我们设置的padding, border 会影响内容的显示，content 区域会减小，但是相应地，元素实际大小不会改变。

我个人推荐更多地使用border-box，使用border-box设置的width, height 即为实际宽度高度，无须考虑padding, border对布局的影响。

参考链接：

[MDN](https://developer.mozilla.org/en-US/docs/Web/API)