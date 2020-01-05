---
title: 外边距折叠 - clearance对外边距折叠的影响
date: 2018-09-26 15:35:34
tags:
- JavaScript
categories: 
 - 前端
---
在我的另一篇文章 [外边距折叠（margin collapse）](http://www.lasy.site/2018/09/14/%E5%A4%96%E8%BE%B9%E8%B7%9D%E6%8A%98%E5%8F%A0%EF%BC%88margin-collapse%EF%BC%89/) 中介绍了外边距折叠相关的内容，其中产生外边距折叠有这么一个条件：
> 没有 line boxes、clearance、内边距（padding）或者边框（border）将它们分开。

其中提到了 clearance，但是并没有展开讨论，这篇文章就是来具体讨论 clearance 对外边距折叠的影响。

## clearance

clearance 就是浮动后产生的间隙。

直接看示例：

```CSS
.div1 {
    width: 200px;
    height: 50px;
    background-color: darkcyan;
    /* clear: left; */
}

.float {
    float: left;
    width: 300px;
    height: 20px;
}
```

```HTML
<div class="float"></div>
<div class="div1"></div>
```

![clearance_001](https://s1.ax1x.com/2018/09/26/iMed41.png)

float 与 div1 重叠。

接下来设置 div1 `clear: left`。

![clearance_002](https://s1.ax1x.com/2018/09/26/iMe09x.png)

本来在最顶端的 div1 在清除浮动后跑到了 float 的下方，而它向下移动的这段距离就是清除浮动后产生的间隙，也就是* clearance*。clearance 其实就是清除浮动后为了让元素到达应该到达的位置而产生的间隙。

接下来看一下 clearance 对外边距折叠的影响。

还是直接上代码：

```HTML
<div class="div1">1</div>
<div class="float"></div>
<div class="div2">2</div>
<div class="line"></div>
```

```CSS
div {
    width: 200px;
    height: 50px;
    border: 1px solid;
    box-sizing: border-box;
}

.div1 {
    margin-bottom: 10px;
    background-color: darkcyan;
}

.div2 {
    margin-top: 50px;
    background-color: darkgreen;
}

.float {
    float: left;
    height: 20px;
}

.line {
    border-top: 1px solid crimson;
    width: 100%;
    height: 0;
    position: absolute;
    top: 100px;
}
```

![外边距折叠 clearance 对外边距折叠的影响 - 3](https://s1.ax1x.com/2018/09/26/iMev80.png)

这里我们用 line 来确定 div2 的位置，可以看到 div1 与 div2 产生外边距折叠，div1 `margin-bottom` 为 10px，div2 `margin-top` 为 50px，叠加后两者相距 50px。可以看出，float 并未对 div1 和 div2 外边距折叠产生任何影响。

接下来我们对 div2 设置清除浮动 `clear: left`。结果并没有产生任何变化，div1 与 div2 还是产生了外边距折叠。难道 clearance 不会影响外边距折叠？

当然不是。原因是并没有产生 clearance。div2 清除浮动后应该要移动到 float 的下方，而 div2 本身已经在 float 下方了，所以并没有产生 clearance，也就不会有 clearance 将 div1 与 div2 的外边距隔开。

要产生 clearance，div2 便不能完全在 float 下方。

div2 距离 div1 距离必须小于 div1 的 `margin-bottom` 加上 float 的高度。现在两者的距离是 50px，div1 的 `margin-bottom` 加上 float 的高度为 30px。我们可以给 float 增加 20px 以上的高度，也可以给 div2 减少 20px 以上的 `margin-top`。这里我们增大 float 的高度。

设置 float：`height: 50px`

![外边距折叠 clearance 对外边距折叠的影响 - 4](https://s1.ax1x.com/2018/09/26/iM3D29.png)

此时 div2 距离 div1 为 60px，两个外边距没有发生折叠。div2 相对于未清除浮动的位置下移了 10px，所以 clearance 的高度便是 10px。这 10px 高的 clearance 隔开了两个外边距，因此不会发生折叠。

但是，此时由于清除浮动，div2 的 `margin-top` 其实已经没有作用了（至少视觉上没有影响），除非将 `margin-top` 的值调整到 60px 以上，这个时候就又回到了之前的情况（没有产生 clearance，发生外边距叠加）。

## 结论

- 两个边距之间有 clearance 存在的时候不会发生外边距叠加。
- `clear` 不一定产生 clearance。
- 通过clearance阻止外边距叠加不是一个好的方案，因为处于后面的外边距会失去作用。但是我们有必要了解clearance对外边距叠加的影响。

本文中的代码可以从我的 [github](https://github.com/LasyIsLazy/code-collections/tree/master/front-end/demos/margin-collapse/clearance) 中找到。