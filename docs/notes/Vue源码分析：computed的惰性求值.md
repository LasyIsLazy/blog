---
title: Vue源码分析：computed 的惰性求值
date: 2019年04月03日14:53:36
tags:
- Vue
- computed
- 惰性求值
- lazy
- dirty
- evaluate
- update
---

## Watcher

每一个 vm 中都会有一个 _watcher 属性，这个属性值是一个对象，每一个 computed 属性都会在这个对象中保存一个 Watcher 实例。

`initComputed` 函数中的代码：

```JavaScript
watchers[key] = new Watcher(
  vm,
  getter || noop,
  noop,
  computedWatcherOptions
)
```

## lazy

```JavaScript
const computedWatcherOptions = { lazy: true }
```

构造 Watcher 传入options：`lazy` 为 `true`，代表惰性求值。

以上内容发生在 Vue 实例化过程中。

Watcher 的构造函数中有这么一步：

```JavaScript
this.value = this.lazy
  ? undefined
  : this.get()
```

判断 lazy 来决定是否求值。计算属性的 watcher 中 lazy 为 false，因此在构造计算属性 watcher 的过程中不会触发求值。

因此，我们在使用 computed 的时候，要注意 computed 的惰性求值。例如：我们在 computed 中定义了

## getter

computed 的 getter 中有这么一段代码：

```JavaScript
if (watcher.dirty) {
  watcher.evaluate()
}
if (Dep.target) {
  watcher.depend()
}
return watcher.value
```

先看前半部分：

根据 `watcher.dirty` 来判断是否调用 `watcher.evaluate()`；`watcher.evaluate()` 是用来进行求值的操作，也就是取得 copmuted 属性的值。也就是 `dirty` 为 `true` 则求值，`dirty` 为 `false` 就不进行求值，这里的 `dirty` 就是惰性求值的关键。

## dirty

Watcher 的构造函数中：

```JavaScript
this.dirty = this.lazy
```

`dirty` 默认为 `lazy` 参数，也就是说 computed 的 watcher 中 `dirty` 默认为 `true`，因此，第一次访问 computed 属性时会进行求值（调用 `watcher.evaluate()`）。


再来看 `watcher.evaluate()`：

## evaluate

`evaluate()` 会计算 watcher 的值，这个函数只有惰性求值的 watcher 才会调用。

```JavaScript
evaluate () {
  this.value = this.get()
  this.dirty = false
}
```

求值之后就会把 `dirty` 设置为 `false`，下次再次调用 computed 的 getter 时就不会再进行 `evaluate()` 了，而是直接返回之前计算出的 value，这就是惰性求值的体现。

## update

watcher 中有一个 `update()` 函数，当依赖改变时，`update()` 会被调用。

`update()` 中有这么一段代码：

```JavaScript
if (this.lazy) {
  this.dirty = true
} 
```

如果是惰性求值的 watcher，就把 `dirty` 设置为 `true`。这样的话，下次访问 `computed` 的 `getter` 就会重新求值。

## 总结

computed 的惰性求值是通过 watcher 的 `dirty` 属性控制的。`dirty` 属性受 watcher 的构造函数、`evaluate()`函数和 `update()` 函数影响。

- 构造函数在 Vue 实例化阶段被调用，给 `dirty` 默认值 `true`，使 computed 进行求值。
- `evaluate()`函数在求值时被调用， 让 `dirty` 为 `false`，使 computed 不再求值。
- `update()`函数在依赖变化时调用，让 `dirty` 为 `true`，使 computed 重新求值。