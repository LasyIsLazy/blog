---
title: 包管理器的管理器corepack

date: 2023-01-18

tags:

- corepack

categories:

 - 前端


---

# 包管理器的管理器corepack

## 目录

- [包管理器的管理器corepack](#包管理器的管理器corepack)
  - [目录](#目录)
  - [基本介绍](#基本介绍)
  - [安装启用](#安装启用)
  - [项目配置](#项目配置)
  - [基本使用](#基本使用)
      - [项目内](#项目内)
    - [全局（项目外）](#全局项目外)
    - [示例](#示例)
  - [原理解析](#原理解析)
    - [基本原理](#基本原理)
  - [总结](#总结)

在不同的项目切换时，难免会遇到使用不同的包管理器或者不同的包管理器版本的情况。如果团队中每个人都是用不同的包管理器或者不同版本，可能会导致：

-   新版本的包管理的breaking change导致安装失败
-   安装的依赖版本不一致导致构建或运行失败，亦或是产生不同的构建结果，导致运行结果不一致
-   在没有对依赖进行变更的情况下更新了lock文件

corepack就是为了解决这些问题而诞生的。

## 基本介绍

corepack是一款npm官方推出的，用来管理包管理器版本的工具。可以读取项目配置，在不同的项目中安装使用不同的包管理器版本。

<https://nodejs.org/api/corepack.html>

支持的包管理器：`pnpm`、`yarn`

## 安装启用

在以下npm 版本之后已经默认安装：v16.9.0, v14.19.0

较低版本可以通过`npm i -g corepack` 来安装。

由于该特性目前处于实验阶段，所以需要手动启用

```bash
# 启用
corepack enable
# 关闭
corepack disable

```

npm的支持默认没有启用，可以使用以下命令启用或关闭

```bash
# 启用
corepack enable npm
# 关闭
corepack disable npm

```

## 项目配置

在`pakage.json`文件中配置`packageManager`属性，值为`<包管理器名称>@<版本>+<哈希>`

```json
// ...
"packageManager": "yarn@3.2.3+sha224.953c8233f7a92884eee2de69a1b92d1f2ec1655e66d08071ba9a02fa"
// ...
```

包管理器名称和版本是必须得，哈希值是可选项。

需要注意这里的版本必须是精确并且是存在的版本，不支持SemVer。

## 基本使用

包管理器按照正常方式使用即可，corepack会自动选择对应版本来使用。

#### 项目内

直接运行对应的包管理器命令即可，corepack会解析`package.json`中的`packageManager`来选择对应的包管理器版本。如果corepack没有安装过该版本，第一次运行则会静默下载并安装；如果安装过，则会直接从缓存中读取并切换。

如果项目没有配置`packageManager`，则使用全局的默认配置。

### 全局（项目外）

在项目外使用时，会使用默认的包管理器版本。

corepack默认集成了pnpm和yarn，所以无需单独安装。

如果想切换版本，可以在项目外通过`corepack prepare`命令来安装，如

```bash
corepack prepare pnpm@latest --activate
```

`prepare`命令会去下载对应版本的包管理器并存入缓存，`--activate`命令表示激活使用该版本。

其他更详细的API使用可以查看其[Github主页](https://github.com/nodejs/corepack "Github主页")。

### 示例


![version](https://s1.ax1x.com/2023/01/18/pS3BjXT.png)

在我启用corepack时，最新的pnpm版本为7.23.0，所以全局运行`pnpm -v` 得到的版本为`7.23.0`。

进入项目目录，查看项目配置，项目配置了`"packageManager": "pnpm@6.0.0"` 。

此时运行`pnpm -v` 得到的版本是`6.0.0`，corepack自动切换到了对应版本，符合项目预期。

如果我在项目中运行的是`npm` 获`yarn`，会得到错误提示：`Usage Error: This project is configured to use pnpm`&#x20;

## 原理解析

### 基本原理

corepack通过软连接的形式，对`pnpm` 、`yarn` 、`npm` 等命令进行代理，当你执行这些命令的时候，实际上执行的是`corepack.js` ，如下图

![soft link](https://s1.ax1x.com/2023/01/18/pS3BXcV.png)

pnpm在执行的时候，调用corepack，并传入其他的参数进去，corepack对执行环境进行判断，选择该使用的版本。

## 总结

corepack主要带来以下几点好处：

-   通过技术手段统一团队包管理器版本
-   降低不同项目之间的切换成本
-   省去包管理器的安装，降低项目上手成本
