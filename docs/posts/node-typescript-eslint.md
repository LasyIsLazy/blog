---
title: 如何在 node 项目中使用 TypeScript + ESLint
date: 2019-5-24 14:33:23
tags:
- TypeScript
- node
- Node.js
- ESLint
- VSCode
- Visual Studio Code
---

# 如何在 node 项目中使用 TypeScript + ESLint

为什么用 ESLint 不用 TSLint 呢？

- TSLint 功能比 ESlint 少很多
- TypeScript 官方不再维护 TSLint 转而支持 ESLint，ESLint 是大势所趋

## 1. 创建项目

```shell
yarn  init
# 本项目使用 yarn，npm 同理。
```

配置 git、.gitignore 等等项目相关的配置，因项目而异。

## 2. 安装 TypeScript 和 ESLint

```shell
yarn add -D typescript
yarn add -D eslint
yarn add -D @types/node
yarn add -D @typescript-eslint/parser
yarn add -D @typescript-eslint/eslint-plugin
```

下面介绍下这几个包的作用：

### typescript

- 编译 ts 文件为 js 文件
- 检查代码错误
- 配合 VSCode 插件进行代码错误检查提示、IntelliSense（语法高亮、代码补全和接口提示等）、快速修复（Quick Fix）和调试

### eslint

- 进行代码风格检查，确保项目代码风格一致
- 配合 VSCode 插件进行代码风格提示

### @types/node

当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。

Node.js 的原生库是没有声明文件的，`@types/node` 就是自动创建 Node.js 声明文件的包。

### @typescript-eslint/parser

ESLint 使用解析器（parser）将 JavaScript 代码解析成 AST（抽象语法树），然后根据 AST 进行代码分析。

ESLint 使用 Espree 作为它的默认解析器，然而 TypeScript 是 JavaScript 的超集，包含很多 JavaScript 没有的特性，Espree 并不能解析。

`@typescript-eslint/parser` 是 TypeScript 团队创建的解析器，用来替换 Espree 来解析 TypeScript 代码。

### @typescript-eslint/eslint-plugin

`@typescript-eslint/eslint-plugin` 是一个 ESLint plugin。

ESLint 提供的配置项是针对 JavaScript 的，`@typescript-eslint/eslint-plugin` 是对 TypeScript 相关的配置进行补充。

**Note**：需要确保 `@typescript-eslint/parser` 和 `@typescript-eslint/eslint-plugin` 版本保持一致。

## 3. 配置 TypeScript

### 3.1 创建配置文件

如果你全局安装了 typescript，运行

```shell
tsc --init
```

如果没有全局安装，运行

```shell
./node_modules/.bin/tsc --init
```

该命令会在项目根目录创建 tsconfig.json 文件。

### 3.2 配置文件

打开 tsconfig.json 文件。

- `target` 为编译后 JavaScript 的版本
- `module` 为编译后 JavaScript 的模块化方案，node 模块使用 `commonjs`
- `outDir` 为编译后 JavaScript 文件存放的文件夹，路径相对于项目根目录，例如可以配置为：`./dist`
- `rootDir` 为需要编译的文件所在文件夹，例如可以配置为：`./src`

测试一下：

创建 `src/index.ts` 文件，输入 TypeScript 代码，如

```TypeScript
const foo: string = 'test'
```

运行

```shell
tsc
```

可以发现在 `dist` 文件夹下生成了 `index.js` 文件，打开内容为

```JavaScript
"use strict";
var foo = 'test';
```

如果将代码改为

```TypeScript
const foo: string = 1
```

再运行 tsc，会得到以下错误提示：

```shell
src/index.ts:1:7 - error TS2322: Type '1' is not assignable to type 'string'.
```

至此，TypeScript 已经配置完成。

## 4. 配置 ESLint

### 4.1 创建配置文件

运行

```shell
eslint --init
# 或者
./node_modules/.bin/eslint --init
```

按照自己的需求并根据命令提示进行选择。

该命令会在项目根文件夹生成 ESLint 的配置文件 `.eslintrc.js` 或者 `.eslintrc.json`。

### 4.2 配置

添加以下配置以支持 TypeScript

```JavaScript
'parser': '@typescript-eslint/parser',
'plugins': ['@typescript-eslint'],
```

这一步很重要，否则 ESLint 是没有办法检测 TypeScript 代码的。

添加自己需要的配置，如

```JavaScript
'no-unused-vars': [
    'error',
]
```

该配置会使 ESLint 检测到未使用的变量报错。

运行

```shell
./node_modules/.bin/eslint --ext ts src/
```

- `ext ts` 指定需要 lint 的扩展名为 `ts`
- `src/` 指定需要 lint `src/` 文件夹下的文件

得到报错信息：

```shell
 1:7  error  'foo' is assigned a value but never used  no-unused-vars
```

证明 ESLint 运行正常。至此，ESLint 配置完成。

**Note**：这里运行 ESLint 时需要使用项目安装的 ESLint 运行（即 `./node_modules/.bin/eslint`），因为 ESLint 配置的 `parser` 和 `plugins` 依赖项目中安装的包。

### 4.3 添加 .eslintignore

对于项目中不需要 lint 的文件可以进行配置忽略。

在项目根目录添加 `.eslintignore` 文件，添加配置，例如

```.eslintignore
**/*.js
dist
```

将会忽略对所有 js 文件的 lint 和对 dist 文件夹中文件的 lint

## 5. 配置脚本

打开 `package.json` 文件，增加 `scripts` 配置

```JSON
"scripts": {
"build": "eslint --ext ts src/",
"lint": "tsc"
},
```

这里可以根据项目需要配合其他工具进行配置。

之后可以通过运行 `yarn run build` 进行编译，运行 `yarn run lint` 进行 lint。

## 6. 配置 VSCode

### 6.1 VSCode + TypeScript

**Note**：VSCode 支持 TypeScript 语言，但是依赖于全局或者项目中的 `typescript`，确保已经安装了 `typescript`。

VSCode 对 TypeScript 提供了以下支持：

- 语法高亮（Syntax highlighting）
- 花括号匹配（Bracket matching）
- 智能补全（Smart code completions）
- 代码提示（Suggestion）
- 代码错误检查（Error checking）
- 快速修复（Quick fixs）
- 调试（Debugging）
……

除了需要安装 `typescript` 外，调试功能还需要额外的配置：在 `tsconfig.json` 文件中设置  `"sourceMap": true` 以启用 sourceMap。

### 6.2 VSCode + TypeScript + ESLint

用 `yarn run lint` 进行提交前的代码风格检查，但是开发过程中的代码风格检查用这个命令就显得太麻烦。VSCode 提供了 ESLint 扩展来帮助我们完成开发中的代码风格检查和提示，但是需要一些配置。

首先安装 ESLint 扩展。

ESLint 扩展默认不会 lint TypeScript 文件，修改 VSCode 中 `eslint.validate` 配置，增加 `typescript`：

```JSON
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript"
],
```

此时，打开项目的 TypeScript 文件，就可以看到 VSCode 对代码风格的提示了：

- 红色波浪线标示出 `error`
- 绿色波浪线标示出 `warn`
- 鼠标移动上去会显示出详细信息以及 `quick fix` 等操作。

**Note**：ESLint 扩展依赖于 eslint 包和 ESLint 配置文件，因此需要确保项目安装了 `eslint` 并且配置了 `.eslintrc.js` 或 `.eslintrc.json`，ESLint 扩展才能正常运行

至此，我们已经可以在项目中使用 TypeScript + ESLint 了。

参考链接：

- [TypeScript tutorial in Visual Studio Code](https://code.visualstudio.com/docs/typescript/typescript-tutorial)