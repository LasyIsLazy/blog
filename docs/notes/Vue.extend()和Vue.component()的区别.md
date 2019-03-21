## Vue.extend( options )

> 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象

也就是说，`Vue.extend()` 返回一个构造器，这个构造器集成子 `Vue` 构造器，同时预设了一些 `options`，使用方法与 `Vue` 构造器相同

```JavaScript
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```

## Vue.component( id, [definition] )

> 注册或获取全局组件。注册还会自动使用给定的id设置组件的名称

```JavaScript
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
```

## 对比

从上面的代码可以看出，注册组件有两种方式：

- 传入一个扩展过的构造器：`Vue.component('my-component', Vue.extend({ /* ... */ }))`
- 传入一个选项对象：`Vue.component('my-component', { /* ... */ })`

`Vue.extend()` 只是创建一个构造器，注册组件还是需要调用 `Vue.component()`

传入选项对象注册组件时（`Vue.component('my-component', options)`），Vue 内部还是会调用 `Vue.extentd()` 函数，Vue 会将 `options` 通过 `Vue.extend` 创建一个扩展过的构造器，然后再作为参数传递给 `Vue.component()`
