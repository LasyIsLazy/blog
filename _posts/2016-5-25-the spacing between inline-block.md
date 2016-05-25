---
layout: post_layout
title: inline-block之间的间距问题
time: 2016年5月25日14:22:50
location: 江西南昌
---

将两个块级元素同行显示常用的一种方法就是将两个块级元素设置为displasy:inline-block，然而这种方法常常会在两个块级元素之间产生间距

    	

		.container
		{
			margin: 100px auto;

			width: 500px;
			height: 500px;

			font-size: 50px;

			background-color: black;
		}
		.a
		{
			width: 200px;
			height: 200px;

			display: inline-block;

			background-color: red;
		}
		.b
		{
			width: 300px;
			height: 300px;

			display: inline-block;
			
			background-color: green;
		}

		<div class="container">
			<div class="a">a</div>
			<div class="b">b</div>
		</div>



![](http://i.imgur.com/ike3YMh.png)
200+300=500，那为什么a与b不同行显示呢？这就是因为inline-block之间有间距。
现在把container的width增大，当增大到525px时（测试浏览器为chrome，不同浏览器这个值可能不一样，例如：Firefox为515px），a与b即可同行显示。
![](http://i.imgur.com/Gsqf8nd.png)
可见，inline-block之间有15px的间距。

那么，这个间距是怎么产生的呢？
这是因为html中div之间有空格（换行符），而这空格变成了我们看到的间距。

解决方案：

## 方法一： 删除掉空格。##


不管是什么结构，去除掉div之间的空格即可。例如，将之前的html改成：


		<div class="container">
			<div class="a">a</div><div class="b">b</div>
		</div>
![](http://i.imgur.com/tpDxth8.png)

可见，div之间的间距消失了。

##  方法二：设置设置父元素font-size:0 ##

    	.container
		{
			margin: 100px auto;

			width: 525px;
			height: 500px;

			font-size: 0;

			background-color: black;
		}
		.a
		{
			width: 200px;
			height: 200px;

			font-size: 50px;

			display: inline-block;

			background-color: red;
		}
		.b
		{
			width: 300px;
			height: 300px;

			font-size: 50px;

			display: inline-block;

			background-color: green;
		}


    <div class="container">
		<div class="a">a</div>
		<div class="b">b</div>
	</div>


![](http://i.imgur.com/tpDxth8.png)
## 方法三：jquery方法 ##

首先引入jQuery（此处省略），js代码如下：

	$('.container').contents().filter(function() {
    	return this.nodeType === 3;
	}).remove();

通过jQuery来改变“nodeType”的值，从而实现我们需要的效果。
![](http://i.imgur.com/tpDxth8.png)

## 其他方法 ##
还有其他方法如：使用负的margin、letter-spacing或者word-spacing来调整间距，但由于不同浏览器效果不同，因此要兼容所有浏览器不太容易，因此不推荐使用；也有通过改变HTML结构来解决这个问题的，但这种方法对于自动生成代码会造成很大麻烦，而且代码不规范，代码易读性会降低，因此也不推荐使用。



参考文章：[http://www.w3cplus.com/css/fighting-the-space-between-inline-block-elements](http://www.w3cplus.com/css/fighting-the-space-between-inline-block-elements "如何解决inline-block元素的空白间距")