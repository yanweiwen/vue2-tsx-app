# Vue + TypeScript  + tsx

## 主要的依赖包以及版本：
1. `vue@2.6.12`
2. `vuex@3.0.1`
3. `vue-router@3.1.3`
4. `vue-class-component@7.2.6`
5. `vue-property-decorator@9.0.2`
6. `vue-tsx-support@3.0.2`

## 环境配置
### 1. 确保全局安装`yarn`、`nodejs` 12+ 、`@vue/cli`4.x
```bash
yarn global add @vue/cli

yarn global add typescript
```
### 2. 使用脚手架创建vue项目
```bash
vue create <project-name>

cd <project-name>
```
### 3. 安装核心依赖
在package.json的devDependencies添加：
```js
{
    // ...
    "devDependencies": {
        // ...
        "vue-class-component": "^7.2.6",
        "vue-property-decorator": "^9.0.2",
        "vue-tsx-support": "^3.0.2",
        "typescript": "~3.5.3",
        "@vue/cli-plugin-typescript": "^4.0.0"
    }
    // ...
}
```

### 4. 项目编译相关==重要==配置

#### 4.1 项目根目录添加vue.config.js文件，配置：
```js
module.exports = {
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      // 全局的less变量
      less: {
        prependData: `@import "@/assets/style/var.less";`
      }
    }
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json", ".ts", ".tsx"] // 加入ts 和 tsx
    },
  },
  devServer: {
    port: 5212
  }
};
```
#### 4.2 项目根目录添加tsconfig.json
```
{
  "compilerOptions": {
    "typeRoots": [
      "node_modules/@types"
    ],
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "jsxFactory": "VueTsxSupport",
    "importHelpers": true,
    "moduleResolution": "node",
    "experimentalDecorators": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env",
      "jest"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "node_modules/vue-tsx-support/enable-check.d.ts",
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [

  ]
}
```
#### 4.3 项目根目录.eslintrc.js
```
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ]
    }
  ]
}

```
#### 4.4 其他配置（可选）

src目录添加`shims-tsx.d.ts`文件
```ts
// 可以使用cssmodule
declare module '*.less' {
  const content: any;
  export default content;
}
```

src目录添加`shims-vue.d.ts`文件
```
// 已经没有vue文件了所以这个也不太需要
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
```
cssmodule使用方法：
页面或组件目录下添加index.module.less，tsx文件里引入：
button.tsx:
```
import { Component } from 'vue-property-decorator'
import * as tsx from 'vue-tsx-support'
import cssModule from './index.module.less'

export enum ButtonType {
  default = 'default',
  primary = 'primary'
}

export interface IButtonProps {
  type?: ButtonType;
}

@Component
export default class Button extends tsx.Component<IButtonProps> {
    @Prop() public type!: ButtonType;
    
    protected render() {
    return (
      <div class={cssModule.button}>
        { this.type && <p>type: {this.type}</p> }
      </div>
    )
  }
}
```

