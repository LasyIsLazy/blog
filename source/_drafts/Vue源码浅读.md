# Vue 源码浅读

每一个 Vue 组件都是一个 Vue 实例（下直接称作 vm）。

## 几个重要的对象（类）

### Watcher

Watcher 是观察者，用来管理视图更新的时机。

```JavaScript
class Watcher {
    constructor (vm, expOrFn, cb, options) {
        this.cb = cb; // 用来进行视图更新的函数
        this.vm = vm; // Vue 实例
        this.cb.call(this.vm); // 触发渲视图更新
    }

    run () { // 更新时触发视图更新
        this.cb.call(this.vm);
    }
}
```

Watcher 在实例化和调用 `run()` 的时候会触发视图更新。实例化发生在 Vue 实例初始化的阶段（即页面或组件的第一次渲染）；`run()` 的调用则是在依赖变动的时候，比如 `data` 中的某个被依赖的属性发生了变化，这个变化最终会触发相关的观察者的 `run()`。

这里有几个可能会有疑问的地方会在下文讨论

- 如何管理依赖
- 如何管理观察者

### Dep

Dep 是管理依赖（dependency）的。

```JavaScript
class Dep {
    constructor () {
        this.subs = []; // 订阅者列表
    }

    addSub (sub: Watcher) { // 添加订阅者
    }

    removeSub (sub: Watcher) { // 移除订阅者
    }

    notify () { // 通知订阅者，即执行每个订阅者的 run 函数
        subs.each(sub => sub.run())
    }
}
```

每一个实例上都会存有一个 Dep 的实例 `dep = new Dep()`（通过闭包）

dep 中会有一个订阅者列表 `subs`，其中存放观察者（Watcher）的实例，此时观察者也是订阅者。

#### 如何管理依赖

当有新的依赖时，会调用 `dep.addSub()` 将相关的 Watcher 实例添加到 `dep.subs` 中；同理，某些依赖不再被需要，就会调用 `dep.removeSub()` 将相关的 Watcher 实例从 `dep.subs` 中移除。

当依赖变化时，会调用 `dep.notify()` 执行 `subs` 中每个订阅者的 `run()` 也就是前面提到的更新视图的操作。