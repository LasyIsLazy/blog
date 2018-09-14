## 定义

[W3C的定义](https://www.w3.org/TR/CSS2/box.html#collapsing-margins)：
>In CSS, the adjoining margins of two or more boxes (which might or might not be siblings) can combine to form a single margin. Margins that combine this way are said to collapse, and the resulting combined margin is called a collapsed margin.

大意是：
>两个或多个盒子 **邻接的外边距**会结合成一个外边距。这种情况就是*外边距折叠*。

重点是：邻接的外边距

## 折叠/合并后的外边距计算规则

- 两者都是正数或者都是负数或者存在0，取绝对值较大的一个。
- 两者一正一负，取两者之和。

## 产生条件

条件：**邻接的外边距**

根据W3C，两个外边距*邻接（adjoining）*的条件是：
>Two margins are adjoining if and only if:

- both belong to in-flow block-level boxes that participate in the same block formatting context
- no line boxes, no clearance, no padding and no border separate them (Note that certain zero-height line boxes (see 9.4.2) are ignored for this purpose.)
- both belong to vertically-adjacent box edges, i.e. form one of the following pairs:
  - top margin of a box and top margin of its first in-flow child
  - bottom margin of box and top margin of its next in-flow following sibling
  - bottom margin of a last in-flow child and bottom margin of its parent if the parent has 'auto' computed height
  - top and bottom margins of a box that does not establish a new block formatting context and that has zero computed 'min-height', zero or 'auto' computed 'height', and no in-flow children

1.两个边距都属于 **流内(in-flow)**的 **同一BFC（块级格式化上下文）**中的块级元素。
1.没有line boxes、清除浮动、内边距（padding）或者边框（border）将它们分开。
1.两个边距都是垂直相邻的外边距。包括以下几种类型：
  1.一个盒子的`top margin`和其第一个流内的 **子元素**的`top margin`。
  1.一个盒子的`bottom margin`和其第一个流内的 **兄弟元素**的`top margin`。
  1.一个`height: auto`的元素的`bottom margin`和其最后一个流内的 **子元素**的`bottom margin`。
  1.没有新建BFC、`min-height: 0`、`height: auto`并且没有在流内的子元素的盒子的`top margin`和`bottom margin`。

所以说，发生外边距折叠的外边距要满足以上三个条件。
在满足前两个条件的基础上，可以将产生条件总结成三种情况：

### 1. 相邻元素之间

```CSS
div {
    height: 50px;
    border: 1px solid;
    box-sizing: border-box;
}

div:first-of-type {
    margin-bottom: 10px;
    background-color: darkcyan;
}

div:last-of-type {
    margin-top: 15px;
    background-color: darkgreen;
}
```

```HTML
<div>div1</div>
<div>div2</div>
```

结果是`div1`和`div2`之间的距离为15px（都是正数，15>10）。

如果改成：

```CSS
div:first-of-type {
    margin-bottom: -10px;
}
div:last-of-type {
    margin-top: -15px;
}
```

结果是`div1`和`div2`之间的距离为-15px（都是负数，15>10）。

如果改成：

```CSS
div:first-of-type {
    margin-bottom: -10px;
}
div:last-of-type {
    margin-top: 15px;
}
```

结果是`div1`和`div2`之间的距离为5px（一正一负，-10+15=5）。

### 2. 嵌套元素

```CSS
.container {
    margin-top: 10px;
    background-color: darkcyan;
}

.item {
    margin-top: 50px;
    background-color: darkgreen;
}
```

```HTML
<div class="container">
    <div class="item">item</div>
</div>
```

结果是`container`和`item`的实际上边距为50px。

### 3. 空的块级元素

```CSS
.collapse {
    margin-top: 10px;
    margin-bottom: 20px;
}

.next {
    width: 200px;
    height: 50px;
    background-color: cyan;
}
```

```HTML
<div class="collapse"></div>
<div class="next"></div>
```

通过`next`的位置可以看出，`next`距离顶端20px，所以结果是`collapse`的实际上（下）边距为20px。

（在我的[github](https://github.com/LasyIsLazy/code-collections/tree/master/front-end/demoms/margin-collapse)上有上述demo的完整代码。）

## 避免外边距折叠

也就是破坏外边距折叠产生的条件，破坏以下任一都可以避免外边距折叠：

- 流内
- 同一BFC
- 块级元素
- 没有line boxes、清除浮动、内边距（padding）或者边框（border）将它们分开。
- 垂直相邻

需要先解释几个概念：流、BFC

### 流

>An element is called out of flow if it is floated, absolutely positioned, or is the root element. An element is called in-flow if it is not out-of-flow. The flow of an element A is the set consisting of A and all in-flow elements whose nearest out-of-flow ancestor is A.

翻译一下：
>如果元素设置了浮动的、绝对定位或者是根元素，那么就说这个元素在*流外（out-of-flow）*。
不是流外的元素就是*流内（in-flow）*
元素A的*流（flow）*指的是A和所有最近流外祖先元素是A的元素组成的集合。

值得注意的是，根元素是流外元素，所以，所有元素都不会和根元素发生外边距折叠。

### BFC（块级格式化上下文）

BFC:
>Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

也就是说，以下设置会形成新的BFC

- 浮动、绝对定位的元素
- 不是块级盒子的块级容器（如：inline-blocks，table-cells，table-captions）。
- `overflow:`属性不是`visible`的块级盒子。

只有在同一BFC内的两个块级元素才会发生外边距折叠。

### 方案

#### 1. 设置浮动、绝对定位

适应类型：

- 相邻元素
- 嵌套元素
- 空的块级元素

相邻元素、嵌套元素：对任何一个元素设置`float: left`、`float: right`或`position: absolute`，但是要注意浮动可能会影响位置；
空的块级元素：对该元素设置`float: left`、`float: right`或`position: absolute`。

破坏条件：

- 流内：浮动或绝对定位使元素成为流外元素。流外元素不发生外边距折叠。

#### 2. 嵌套父级元素并使之产生新的BFC

给其中一个元素外层嵌套一个父级元素，并给该父级元素设置`overflow:visible`以外的值或者`display: inline-block`、`display: table-cell`、`display: table-caption`或设置浮动、绝对定位。

适应类型：

- 相邻元素
- 嵌套元素

破坏条件：

- 同一BFC。该元素新增的父级元素产生了新的BFC，该元素属于新增的父元素产生的BFC。

这个方案并不是一个好方案，因为我们增加了不必要的元素，会带来一些其他麻烦。

#### 3. 设置display为block、list-item、table以外的值

带来影响最小的是设置成`display: inline-block`。

适用类型：

- 相邻元素
- 嵌套元素
- 空的块级元素

相邻元素、嵌套元素：对任何一个元素设置`display: inline-block`；
空的块级元素：对该元素设置`display: inline-block`。

破坏条件：

- 块级元素。只有块级元素才会发生外边距折叠。

#### 4. 设置边框border或者内边距padding

适用类型：

- 嵌套元素
- 空的块级元素

嵌套元素：只需设置发生外边距折叠的任何一个`border`为正值即可。或者设置父元素的`padding`为正值。
空的块级元素：设置上下任一`border`为正值。或者设置上下任一`padding`为正值。

破坏条件：

- 没有line boxes、清除浮动、内边距（padding）或者边框（border）将它们分开。边框和内边距将发生折叠的外边距分开，使两者不再邻接。

待填坑：line boxes，clearance

参考：

- [W3C](https://www.w3.org/TR/CSS2/box.html#collapsing-margins)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)
- [segmentfault](https://segmentfault.com/a/1190000010346113)