---
title: JavaScript 限制文本行数
date: 2019-5-18 11:08:14
tags:
- JavaScript
- CSS
- clamp
---

# JavaScript 限制文本行数

JavaScript有很多方法限制文本字数，但是最近我却遇到了一个限制行数的需求：文本超过三行以后隐藏并展示“查看全部”按钮。

这个需求的难点在于如何判断文本超过了三行，JavaScript没有提供相关的 API。同时，由于不同浏览器、不同分辨率、不同字体等原因，相同长度的文本会表现出不同的行数。

## 解决方案

在浏览器中设置一个三行的文本，获取其高度，将其与要设置的文本的高度进行比较，从而得出是否超过三行。

```CSS
.container {
    width: 200px;
    border: 1px solid red;
    overflow: hidden;
}

.lineClamp3 {
    border: 1px solid;
}

#btn {
    display: none;
}
```

```HTML
<div class="lineClamp3">
    1<br />
    2<br />
    3<br />
</div>
<p class="container">
    文本文本文本文本文本文1本文本文本文本文本文本2文本文本文本文本文本文3本文本文本文本
</p>
<button id="btn">展开</button>
```

```JavaScript
window.onload = () => {
    const lineClamp3 = document.querySelector('.lineClamp3')
    const container = document.querySelector('.container')
    const containerHeight = container.scrollHeight
    const line3Height = lineClamp3.clientHeight
    if (containerHeight > line3Height) {
        document.getElementById('btn').style.display = 'block'
    }
}
```

效果示意：

![效果示意](https://s2.ax1x.com/2019/05/18/EOmgWF.png)

## 其他方案探索

### 1. line-height

用 `height` / `line-height` 获取行数。这个方案在设置了 `line-height` 的情况下可行，但是未设置的情况下，`line-height` 为 `normal`。

目前没有找到更好的方案，欢迎提出其他方案。