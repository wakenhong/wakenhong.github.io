---
layout: 前端
title: vite vue3 ts初体验
date: 2021-10-11 22:29:54 
top: true
cover: false
toc: true
categories: 前端
tags: vite vue3 ts
author: 潇潇暮雨
img: https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110151601465.png
summary: 体验vite + vue3 + ts搭建项目的全过程
keywords: vite vue3 ts
---

# 体验vite + vue3 + ts搭建项目的全过程！

## 1.环境准备

```bash
Node.js版本 >= 12
# 查看Node版本：
node -v
复制代码
建议将Node.js升级到最新的稳定版本
# 使用 nvm 安装最新稳定版 Node.js
nvm install stable
复制代码
```

![截屏2021-06-12 下午12.29.41.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/8bc394e6736a42f0849f6ccfed4ad1b2~tplv-k3u1fbpfcp-watermark.awebp) 

关于 nvm 的使用请查阅 [链接](https://juejin.cn/post/6935008264413413413)

### 使用 Vite 快速搭建

- 使用 Npm

  `npm init @vitejs/app`

- Yarn

  `yarn create @vitejs/app`

按照提示完成如下步骤

1. 输入项目名称

   ![截屏2021-06-12 下午12.34.01.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/c2fcc23335f343e4aed97df30af64297~tplv-k3u1fbpfcp-watermark.awebp)

2. 选择 Framework + 模板

   ![截屏2021-06-12 下午12.40.24.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/929e3d20753e48798913cbbe0ebcfb58~tplv-k3u1fbpfcp-watermark.awebp)

   ![截屏2021-06-12 下午12.41.39.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/c3bab2e77e04481a86658eda07d328ec~tplv-k3u1fbpfcp-watermark.awebp)

或者可以用命令行直接操作

```js
# npm 6.x
npm init @vitejs/app vite-vue3 --template vue-ts

# npm 7+ (需要额外的双横线)
npm init @vitejs/app vite-vue3 -- --template vue-ts

# yarn
yarn create @vitejs/app vite-vue3 --template vue-ts
复制代码
```

3. 安装依赖

`npm install`

4. 启动项目

`npm run dev`

![截屏2021-06-12 下午1.17.43.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/77f9a603a058432cbc526ad4b65ac13f~tplv-k3u1fbpfcp-watermark.awebp)

如果想要打印出 `IP + port` ，use `--host`

```js
"scripts": {
    "dev": "vite --host",
    ...
  },
复制代码
```

接下来集成 Vue Router、Vuex、Axios、Stylus/Sass/Less

### 修改 Vite 配置文件

![截屏2021-06-12 下午1.14.58.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/69ec88bcbad943cb87511dc9d58e82b4~tplv-k3u1fbpfcp-watermark.awebp) 

Vite配置文件 `vite.config.ts` 位于项目的根路径，项目的全局配置文件，启动时会自动读取该文件。 本次咱们就配置 `@` 指向 `src` 目录、服务端口、打包路径、代理等。 如果要了解更多关于vite的配置请查阅 [官网](https://link.juejin.cn/?target=https%3A%2F%2Fvitejs.dev%2Fconfig%2F)

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  },
  base: './', // 打包路径
  server: {
    port: 4000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true // 允许跨域
  }
})
复制代码
```

### 集成路由

1. 安装支持vue3的路由（`vue-router@4`）

   `npm i vue-router@4`

2. 创建 `src/router/index.ts` 文件

```js
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "Home" */ '@/views/home.vue')
  },
  { path: '/', redirect: { name: 'Home' } }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
复制代码
```

1. main.ts 文件中挂载

```js
import { createApp } from 'vue'
import App from '@/App.vue'

import router from '@/router/index'

createApp(App).use(router).mount('#app')
复制代码
```

### 集成Vuex

1. 安装支持Vue3的状态管理工具 `vuex@next`

   `npm i vuex@next`

2. 创建 `src/store/index.ts` 文件

```js
import { createStore } from 'vuex'

const defaultState = {
  count: 0
}

// Create a new store instance.
export default createStore({
  state() {
    return defaultState
  },
  mutations: {
    increment(state: typeof defaultState) {
      state.count += 1
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  },
  getters: {
    double(state: typeof defaultState) {
      return 2 * state.count
    }
  }
})
复制代码
```

1. main.ts 文件挂载

```js
import { createApp } from 'vue'
import App from '@/App.vue'

import router from '@/router/index'
import store from '@/store/index'

createApp(App).use(router).use(store).mount('#app')
复制代码
```

### 集成HTTP工具 Axios

1. 安装 `Axios` (跟vue版本无关，安装最新即可)

   `npm i axios`

2. 配置 `Axios`

```javascript
根据常规规范，axios封装的方法放在 src/utils/http.ts
/*
 * @Descripttion:
 * @version:
 * @Author: zoucw (326359613@qq.com)
 * @Date: 2021-03-29 16:59:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-28 17:56:07
 */
import axios from 'axios'
import { Message } from 'element-plus'
// 创建axios实例
// 创建请求时可以用的配置选项

const instance = axios.create({
  withCredentials: true,
  timeout: 1000,
  baseURL: ''
})
// axios的全局配置
instance.defaults.headers.post = {
  'Content-Type': 'application/x-www-form-urlencoded'
}
instance.defaults.headers.common = {
  'Auth-Type': 'company-web',
  'X-Requested-With': 'XMLHttpRequest',
  token: 'sdfjlsdfjlsdjflsjflsfjlskd'
}

// 添加请求拦截器(post只能接受字符串类型数据)
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

const errorHandle = (status, other) => {
  switch (status) {
    case 400:
      Message.error('信息校验失败')
      break
    case 401:
      Message.error('认证失败')
      break
    case 403:
      Message.error('token校验失败')
      break
    case 404:
      Message.error('请求的资源不存在')
      break
    default:
      Message.error(other)
      break
  }
}

// 添加响应拦截器
instance.interceptors.response.use(
  // 响应包含以下信息data,status,statusText,headers,config
  (res) => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  (err) => {
    Message.error(err)
    const { response } = err
    if (response) {
      errorHandle(response.status, response.data)
      return Promise.reject(response)
    }
    Message.error('请求失败')
    return true
  }
)

export default instance
复制代码
```

1. 使用 `Axios`

在需要使用的地方引入`http.ts`文件

```js
import Http from '@/utils/http'
export default defineComponent({
  setup() {
    const store = useStore()
    const getData = () => {
      Http.get('url').then((res: Object) => {
        console.log(res)
      })
    }
    return {
      store,
      getData
    }
  }
})
复制代码
```

### 集成CSS预编译器

本项目以sass为例，相关的loader Vite 已经集成好了，无需额外配置

1. 安装

   `npm i sass -D`

   安装其他的亦可

2.使用

```css
<style lang="scss"></style>
复制代码
```

### 代码规范

随着前端发展愈发的规范后，项目的规模也会越来越庞大，涉及到的开发人员也越来越多，一个项目多人协作的场景也越来越多，代码的规范就是一个大问题了，光靠口头的强调远远不够，需要有一套规范来约束，节省人工成本，效率还高。

下面我们介绍一套规范组合以及相关的配置（`EditorConfig + Prettier + ESlint`）

- 解决团队之间代码不规范导致的可读性差、可维护性差的问题
- 解决团队成员使用不同编辑器导致代码规范不统一的问题
- 提前发下代码风格问题，给出相应提示，及时修复
- 减少代码审查过程中反反复复的修改，节约时间
- 自动格式化，统一代码风格

##### 集成 EditorConfig 配置

EditorConfig 有助于为不同 IDE 编辑器上处理同一项目的多个开发人员维护一致的代码风格。

官网：[editorconfig.org](https://link.juejin.cn/?target=http%3A%2F%2Feditorconfig.org)

在项目的根目录下创建 `.editorconfig` 文件：

```javascript
# Editor configuration, see http://editorconfig.org

# 表示是最顶层的 EditorConfig 配置文件
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
复制代码
```

注意：

- VSCode 使用 EditorConfig 需要去插件市场下载插件 `EditorConfig VS Code`

![截屏2021-06-13 下午9.25.52.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112244408.webp)

- JetBrains 系列 （WebStorm、IntelliJ IDEA）则不用额外安装插件，可直接使用 EditorConfig 配置。

##### 集成 Prettier 配置

Prettier 是一款强大的代码格式化工具，支持JavaScript、Typescript、Css、Scss、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown等，基本上前端能用到的文件格式都可以搞定，是当下最流行的格式化工具。

官网：[prettier.io/](https://link.juejin.cn/?target=https%3A%2F%2Fprettier.io%2F)

1. 安装Prettier

   `npm i prettier -D`

2. 创建 Prettier 配置文件

   Prettier 支持多种格式的配置文件，比如 .json、.yml、yaml、.js等。 在根目录下创建 .prettierrc 文件

3. 配置 `.prettierrc`

在本项目中，我们进行如下简单配置，关于更多的配置项信息，[查阅官网](https://link.juejin.cn/?target=https%3A%2F%2Fprettier.io%2Fdocs%2Fen%2Fconfiguration.html)

```js
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": true,
  "semi": false
}
复制代码
```

1. Prettier安装配置好之后，就能使用命令来格式化代码

```js
# 格式化所有文件 （. 表示所有文件）
npx prettier --write .
复制代码
```

注意：

- VSCode 编辑器使用 Prettier 配置需要下载插件 Prettier - Code formatter

![截屏2021-06-13 下午9.43.35.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/787f5e0cba7545dba73f5e3966e67c1c~tplv-k3u1fbpfcp-watermark.awebp)

- JetBrains 系列 （WebStorm、IntelliJ IDEA）则不用额外安装插件，可直接使用 EditorConfig 配置。

Prettier 配置好以后，在使用 VSCode 或 WebStorm 等编辑器的格式化功能时，编辑器就会按照 Prettier 配置文件的规则来进行格式化，避免了因为大家编辑器配置不一样而导致格式化后的代码风格不统一的问题。

##### 集成 ESlint 配置

ESLint 是一款用于查找并报告代码中问题的工具，并且支持部分问题自动修复。其核心是通过对代码解析得到的 AST（Abstract Syntax Tree 抽象语法树）进行模式匹配，来分析代码达到检查代码质量和风格问题的能力。

正如前面我们提到的因团队成员之间编程能力和编码习惯不同所造成的代码质量问题，我们使用 ESLint 来解决，一边写代码一边查找问题，如果发现错误，就给出规则提示，并且自动修复，长期下去，可以促使团队成员往同一种编码风格靠拢。

1. 安装 ESLint

   可以全局或者本地安装，作者推荐本地安装（只在当前项目中安装）。

   `npm i eslint -D`

2. 配置ESLint

   ESLint 安装成功后，执行 npx eslint --init，然后按照终端操作提示完成一系列设置来创建配置文件。

   | 插件                                                         |
   | ------------------------------------------------------------ |
   | [`Airbnb JavaScript Style Guide`](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Faribnb%2Fjavascript) |
   | [`JavaScript Standard Style`](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fstandard%2Fstandard) |
   | [`Google JavaScript Style Guide`](https://link.juejin.cn/?target=https%3A%2F%2Fgoole.github.io%2Fstyleguide%2Fjsguide.html) |

操作：

- How would you like to use ESLint? （你想如何使用 ESLint?）

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112245870.webp) 我们这里选择 To check syntax, find problems, and enforce code style（检查语法、发现问题并强制执行代码风格）

- What type of modules does your project use?（你的项目使用哪种类型的模块?）

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/a2f0df2b028542109f515ec042eb73e0~tplv-k3u1fbpfcp-watermark.awebp)

我们这里选择 JavaScript modules (import/export)

- Which framework does your project use? （你的项目使用哪种框架?）

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112245920.webp)

我们这里选择 Vue.js

- Does your project use TypeScript?（你的项目是否使用 TypeScript？）

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/230f6abc1a714e448b3683c10e0e7584~tplv-k3u1fbpfcp-watermark.awebp)

我们这里选择 Yes

- Where does your code run?（你的代码在哪里运行?）

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/071336e0e2bc4f969cf2cb772c5a4a1d~tplv-k3u1fbpfcp-watermark.awebp) 我们这里选择 Browser 和 Node（按空格键进行选择，选完按回车键确定）

- How would you like to define a style for your project?（你想怎样为你的项目定义风格？）

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/956094a6495e45608afd0cd985e906b2~tplv-k3u1fbpfcp-watermark.awebp)

我们这里选择 Use a popular style guide（使用一种流行的风格指南）

- Which style guide do you want to follow?（你想遵循哪一种风格指南?）

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/90bfc373359048788e15243f939b3494~tplv-k3u1fbpfcp-watermark.awebp)

我们这里选择 Airbnb: [github.com/airbnb/java…](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fairbnb%2Fjavascript)

ESLint 为我们列出了三种社区流行的 JavaScript 风格指南，分别是 Airbnb、Standard、Google。

这三份风格指南都是由众多大佬根据多年开发经验编写，足够优秀，全球很多大小公司都在使用。我们选用 GitHub 上 star 最多的 Airbnb，免去繁琐的配置 ESLint 规则时间，然后让团队成员去学习 Airbnb JavaScript 风格指南即可。

此时，我们在 ESLint 配置了 Airbnb JavaScript 规则，在编码时，所有不符合 Airbnb 风格的代码，编辑器都会给出提示，并且可以自动修复。

这里作者不建议大家去自由配置 ESLint 规则，相信我，这三份 JavaScript 代码风格指南值得我们反复学习，掌握后，编程能力能上一大台阶。

- 这里作者不建议大家去自由配置 ESLint 规则，相信我，这三份 JavaScript 代码风格指南值得我们反复学习，掌握后，编程能力能上一大台阶。

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112247462.webp) 我们这里选择 JavaScript

- Would you like to install them now with npm?（你想现在就用 NPM 安装它们吗?）

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/c119ab3e5653425c9a59e075c4d56d94~tplv-k3u1fbpfcp-watermark.awebp)

根据上面的选择，ESLint 会自动去查找缺失的依赖，我们这里选择 Yes，使用 NPM 下载安装这些依赖包。

注意：如果自动安装依赖失败，那么需要手动安装

```js
npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-airbnb-base eslint-plugin-import eslint-plugin-vue -D
复制代码
```

1. ESlint 配置文件 `.eslintrc.js`

在上一步操作完成后，会在项目根目录下自动生成 .eslintrc.js 配置文件：

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:vue/essential", "airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
};
复制代码
```

根据项目实际情况，如果我们有额外的 ESLint 规则，也在此文件中追加。

注意：

- VSCode 使用 ESLint 配置文件需要去插件市场下载插件 ESLint 。

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/6e5599e3862d4a7e91df8e2bca2c6eb5~tplv-k3u1fbpfcp-watermark.awebp)

- JetBrains 系列（WebStorm、IntelliJ IDEA 等）则不用额外安装插件。

配置好以后，我们在 VSCode 或 WebStorm 等编辑器中开启 ESLin，写代码时，ESLint 就会按照我们配置的规则来进行实时代码检查，发现问题会给出对应错误提示和修复方案。

如图：

- VScode

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112247713.webp)

- WebStorm

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/dab0eac95a9a451b8431ed15b6ff369e~tplv-k3u1fbpfcp-watermark.awebp)

虽然，现在编辑器已经给出错误提示和修复方案，但需要我们一个一个去点击修复，还是挺麻烦的。很简单，我们只需设置编辑器保存文件时自动执行 eslint --fix 命令进行代码风格修复。

- VSCode 在 settings.json 设置文件中，增加以下代码：

```js
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
 }
复制代码
```

- WebStorm 打开设置窗口，按如下操作，最后点击 Apply -> OK。

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112247833.webp)

##### 解决 Prettier 和 ESLint 的冲突

通常大家会在项目中根据实际情况添加一些额外的 ESLint 和 Prettier 配置规则，难免会存在规则冲突情况。

本项目中的 ESLint 配置中使用了 Airbnb JavaScript 风格指南校验，其规则之一是代码结束后面要加分号，而我们在 Prettier 配置文件中加了代码结束后面不加分号的配置项，这样就有冲突了，会出现用 Prettier 格式化后的代码，ESLint 检测到格式有问题的，从而抛出错误提示。 解决两者冲突问题，需要用到 eslint-plugin-prettier 和 eslint-config-prettier。

- `eslint-plugin-prettier` 将 Prettier 的规则设置到 ESLint 的规则中。
- `eslint-config-prettier` 关闭 ESLint 中与 Prettier 中会发生冲突的规则。

最后形成优先级：Prettier 配置规则 > ESLint 配置规则。

- 安装插件

```js
npm i eslint-plugin-prettier eslint-config-prettier -D
复制代码
```

- 在 .eslintrc.js 添加 prettier 插件

```js
module.exports = {
  ...
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  ...
}
复制代码
```

这样，我们在执行 eslint --fix 命令时，ESLint 就会按照 Prettier 的配置规则来格式化代码，轻松解决二者冲突问题。

### 集成 husky 和 lint-staged

我们在项目中已集成 ESLint 和 Prettier，在编码时，这些工具可以对我们写的代码进行实时校验，在一定程度上能有效规范我们写的代码，但团队可能会有些人觉得这些条条框框的限制很麻烦，选择视“提示”而不见，依旧按自己的一套风格来写代码，或者干脆禁用掉这些工具，开发完成就直接把代码提交到了仓库，日积月累，ESLint 也就形同虚设。

所以，我们还需要做一些限制，让没通过 ESLint 检测和修复的代码禁止提交，从而保证仓库代码都是符合规范的。

为了解决这个问题，我们需要用到 Git Hook，在本地执行 git commit 的时候，就对所提交的代码进行 ESLint 检测和修复（即执行 eslint --fix），如果这些代码没通过 ESLint 规则校验，则禁止提交。

实现这一功能，我们借助 `husky + lint-staged` 。

> husky —— Git Hook 工具，可以设置在 git 各个阶段（pre-commit、commit-msg、pre-push 等）触发我们的命令。

> lint-staged —— 在 git 暂存的文件上运行 linters。

##### 配置 husky

- 自动配置（推荐）

使用 husky-init 命令快速在项目初始化一个 husky 配置。

```bash
npx husky-init && npm install
```

这行命令做了四件事：

1. 安装 `husky` 到开发依赖

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/81a00d5a9a3a4fcc81f9f2ed4b49ad81~tplv-k3u1fbpfcp-watermark.awebp) 

2. 在项目根目录下创建 `.husky` 目录

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112248730.webp) 3. 在 `.husky` 目录创建 `pre-commit hook`，并初始化 `pre-commit` 命令为 `npm test`

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/74b4aa8d553c4cfd85c15a5f3eac5be3~tplv-k3u1fbpfcp-watermark.awebp) 4. 修改 `package.json` 的 scripts，增加 `"prepare": "husky install"`

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/8b5ccf022ef04ac88c911647fe51426f~tplv-k3u1fbpfcp-watermark.awebp) 到这里，husky 配置完毕，现在我们来使用它：

`husky` 包含很多 hook（钩子），常用有：`pre-commit、commit-msg、pre-push`。这里，我们使用 `pre-commit` 来触发 ESLint 命令。

修改 `.husky/pre-commit` hook 文件的触发命令：

```js
eslint --fix ./src --ext .vue,.js,.ts
复制代码
```

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/b6d6a41cde2646abb789b4c4e5973626~tplv-k3u1fbpfcp-watermark.awebp)

上面这个 `pre-commit` hook 文件的作用是：当我们执行 `git commit -m "xxx"` 时，会先对 `src` 目录下所有的 `.vue、.js、.ts` 文件执行 `eslint --fix` 命令，如果 `ESLint` 通过，成功 `commit`，否则终止 `commit`。

但是又存在一个问题：有时候我们明明只改动了一两个文件，却要对所有的文件执行 `eslint --fix`。假如这是一个历史项目，我们在中途配置了 ESLint 规则，那么在提交代码时，也会对其他未修改的“历史”文件都进行检查，可能会造成大量文件出现 ESLint 错误，显然不是我们想要的结果。

我们要做到只用 ESLint 修复自己此次写的代码，而不去影响其他的代码。所以我们还需借助一个神奇的工具 lint-staged 。

##### 配置 lint-staged

`lint-staged` 这个工具一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 `git add` 那些文件（即 git 暂存区的文件），而不会影响到其他文件。

接下来，我们使用 `lint-staged` 继续优化项目。

1. 安装 lint-staged

```js
npm i lint-staged -D
复制代码
```

1. 在 `package.json`里增加 `lint-staged` 配置项

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112248241.webp)

```js
"lint-staged": {
  "*.{vue,js,ts}": "eslint --fix"
},
复制代码
```

这行命令表示：只对 git 暂存区的 .vue、.js、.ts 文件执行 eslint --fix。

1. 修改 `.husky/pre-commit` hook 的触发命令为：`npx lint-staged`

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112248115.webp) 至此，husky 和 lint-staged 组合配置完成。

现在我们提交代码时就会变成这样：

假如我们修改了 scr 目录下的 `test-1.js`、`test-2.ts` 和 `test-3.md` 文件，然后 `git add ./src/`，最后 `git commit -m "test..."`，这时候就会只对 `test-1.js、test-2.ts` 这两个文件执行 `eslint --fix`。如果 ESLint 通过，成功提交，否则终止提交。从而保证了我们提交到 Git 仓库的代码都是规范的。

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112248394.webp)

- 提交前 `test-1.js`、`test-2.ts`

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/202110112249227.webp)

- 提交后 `test-1.js`、`test-2.ts` 自动修复代码格式

![image.png](https://cdn.jsdelivr.net/gh/wakenhong/cdn/images/2021/6c5f354adf684947ad2d631cd06c38e0~tplv-k3u1fbpfcp-watermark.awebp)

无论写代码还是做其他事情，都应该用长远的眼光来看，刚开始使用 ESint 的时候可能会有很多问题，改起来也很费时费力，只要坚持下去，代码质量和开发效率都会得到提升，前期的付出都是值得的。

这些工具并不是必须的，没有它们你同样可以可以完成功能开发，但是利用好这些工具，你可以写出更高质量的代码。特别是一些刚刚接触的人，可能会觉得麻烦而放弃使用这些工具，失去了一次提升编程能力的好机会。

