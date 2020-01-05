---
title: get，post区别
date: 2018-07-07 17:58:48
tags:
- GET
- POST
---
# get/post区别

## 语义

- get获取资源。
- post处理资源。

## 长度限制

- get长度受限于url长度，url长度取决于浏览器和服务器配置参数。
- post无。

## 传输

### 发送方式

- get通过url发送。
- post通过请求头发送

### TCP数据包

- GET只发送一个TCP数据包。GET请求会把请求头和数据一起发送。
- POST发送两个TCP数据包。POST请求先发送请求头，服务器响应100（continue）；然后再发送数据。

## 可以保存

- GET可以保存，如，浏览器历史记录，书签等。
- get是可缓存的（Cacheable）。

## 幂等（Idempotent）

>一个幂等操作的特点是其任意多次执行所产生的影响均与一次执行的影响相同。

- GET是幂等的。多次重复发送相同的GET请求得到的结果是一样的。
- POST不是幂等的。多次重复发送相同的POST请求得到的结果可能是不一样的。

幂等的方法有：OPTIONS, GET, HEAD, PUT, DELETE。

## 安全（safe）

这里的安全并不是常规意义上我们理解的安全。
来看HTTP规范上的定义：
>Request methods are considered "safe" if their defined semantics are essentially read-only.
说一个HTTP方法是安全的，是说这个方法语义上是只读的。也就是说，这是一个不会修改服务器的状态的方法。

- GET方法是安全的。
- POST方法不是安全的。

说明：

- 虽然方法是安全的，但是这并不意味着服务器不会修改数据。安全的方法是指方法不要求服务器修改数据，相应的不是安全的方法则会要求服务器修改数据。
- 服务器有正确响应安全请求的义务，任何应用都不应该让GET请求修改服务器的数据。
- 安全的方法意义在于浏览器可以不用考虑请求方法对浏览器带来不好的影响。
- 所有安全的方法都是幂等的。
- 安全的方法有：GET, HEAD, OPTIONS。

参考：

- [知乎](https://www.zhihu.com/question/28586791)
- [MDN](https://developer.mozilla.org/zh-CN/docs/Glossary/safe)
- [HTTP 规范 RC 7231](https://tools.ietf.org/html/rfc7231#section-4.2.1)