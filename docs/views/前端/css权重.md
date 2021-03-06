---
title: css 权重（CSS 优先级）
date: 2018-05-25 9:04:09
tags:
- CSS
categories: 
 - 前端
---
很多时候，我们发现自己设置的CSS样式并没有生效，当我们用浏览器调试窗口查看的时候，发现它被其他样式覆盖了，这便是CSS权重搞的鬼。理解CSS权重，可以帮助我们更好地选择要应用的样式。

## 概念

> 优先级就是分配给指定的CSS声明的一个权重，它由 匹配的选择器中的 每一种选择器类型的 数值 决定。

## 优先级的判断

关于优先级，有这么几条规则，判断时依照以下顺序（优先级由高到低）：

1. !importan的优先级永远最高（但是不要随便使用）。
2. 行内样式的优先级仅此于!important。
3. 选择器拥有不同的优先级（详细内容见下文）。
4. 内联的CSS（也就是style标签中的CSS）优先级大于外联的CSS（也就是CSS文件）中相同优先级的选择器。
5. 后出现的选择器比先出现的同优先级的选择器优先级高。
6. 通配符的优先级最低。

## CSS选择器优先级

CSS一共有6种选择器：

1. 类型选择器（type selectors）
2. 伪元素（pseudo-elements）
3. 类选择器（class selectors）
4. 属性选择器（attributes selectors）
5. 伪类（pseudo-classes）
6. ID选择器（id-selectors)

而它们的优先级分为三种，优先级从高到低排序分别为：

1. ID选择器
1. 类选择器，伪类，属性选择器。
1. 类型选择器，伪元素

每一类的优先级相同。当样式中含有多个选择器的时候，比较两者中优先级最高的选择器，如若相同，则比较一优先级最高的选择器，以此类推，到最后若其中一方已无选择器可以比较，而另一方还有剩余选择器（即两者选择器数量不一致，而选择器数量较多的一方含有所有另一方的选择器类型，且含有的数量相等），则选择器数量较多的一方优先级高。

## 举例说明：

```CSS
#aa{}
cc:before{}
```

这里 #aa 是id选择器，后者优先级最高的是类选择器，优先级小于id选择器，所以 #aa{} 优先级大于 .bb>cc:before{}。 

```CSS
body #aa .bb p {}
html .cc #dd {}
```

两者以此比较id选择器，类选择器均得到相同优先级，但比较到类型选择器时，前者有 body 和 p 两个类型选择器，而后者只有 html 一个类型选择器，故前者优先级大于后者。

参考链接：

- [w3cplus](http://www.w3cplus.com/css/css-specificity-things-you-should-know.html)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)