# @innei/react-tweet

一个用于在 React 应用中嵌入 Twitter/X 推文的组件库，支持 Next.js、Vite 等框架。

本项目 fork 自 [vercel/react-tweet](https://github.com/vercel/react-tweet)，并在此基础上进行了独立开发，新增了多项实用功能。

## Fork 新增特性

相比上游仓库，本项目新增了以下功能：

- **Shadow DOM 样式隔离** - 完全隔离外部 CSS 干扰，解决全局样式污染问题
- **可点击卡片** - 整个推文卡片可点击跳转到 Twitter/X
- **自动主题跟随** - 自动检测页面主题（dark/light）并同步到组件
- **重新设计的 UI** - 更现代的视觉风格

## 安装

```bash
npm install @innei/react-tweet
# or
pnpm add @innei/react-tweet
# or
yarn add @innei/react-tweet
```

## 快速开始

```tsx
import { Tweet } from '@innei/react-tweet'
import '@innei/react-tweet/theme.css'

export default function App() {
  return <Tweet id="1628832338187636740" />
}
```

## Shadow DOM 样式隔离

在复杂应用中嵌入推文时，外部 CSS（如 `* { box-sizing }`、`a { color }`、`img { max-width }` 等）可能会影响组件外观。Shadow DOM 隔离功能提供了完整的样式封装。

### 使用 ShadowRoot

使用 `ShadowRoot` 包装组件以隔离外部样式：

```tsx
import { EmbeddedTweet, ShadowRoot } from '@innei/react-tweet'
import '@innei/react-tweet/theme.css'

export default function App() {
  return (
    <ShadowRoot theme="auto">
      <EmbeddedTweet tweet={tweetData} />
    </ShadowRoot>
  )
}
```

### 使用 IsolatedTweet

便捷组件，内置 Shadow DOM 隔离：

```tsx
import { IsolatedTweet } from '@innei/react-tweet'
import '@innei/react-tweet/theme.css'

export default function App() {
  return <IsolatedTweet id="1628832338187636740" theme="auto" />
}
```

### 主题选项

`theme` 属性支持三个值：

- `'auto'`（默认）- 自动跟随页面主题，通过监听 `<html>` 的 `data-theme` 属性、`.dark`/`.light` 类名以及 `prefers-color-scheme` 媒体查询
- `'light'` - 强制浅色主题
- `'dark'` - 强制深色主题

```tsx
// 自动检测页面主题
<ShadowRoot theme="auto">
  <Tweet id="..." />
</ShadowRoot>

// 强制深色主题
<ShadowRoot theme="dark">
  <Tweet id="..." />
</ShadowRoot>
```

### 工作原理

Shadow DOM 创建了一个具有独立样式作用域的隔离 DOM 子树。`ShadowRoot` 组件：

1. 使用 `attachShadow({ mode: 'open' })` 创建 Shadow DOM 边界
2. 通过 `adoptedStyleSheets` 将页面样式表克隆到 Shadow DOM 中
3. 监听 `document.documentElement` 的主题变化并同步到 Shadow DOM 宿主元素

### 浏览器兼容性

- `attachShadow`: 所有现代浏览器
- `adoptedStyleSheets`: Chrome 73+, Firefox 101+, Safari 16.4+

### 限制

- Shadow DOM 需要客户端 JavaScript（SSR 期间不可用）
- 首次渲染可能在 hydration 前短暂显示无样式内容

## API 参考

### Tweet

```tsx
<Tweet
  id="1628832338187636740"
  fallback={<Loading />}         // 可选：加载时显示
  components={customComponents}  // 可选：自定义子组件
/>
```

### IsolatedTweet

```tsx
<IsolatedTweet
  id="1628832338187636740"
  theme="auto"              // 'auto' | 'light' | 'dark'
  className="my-tweet"      // 可选：宿主元素类名
  style={{ maxWidth: 500 }} // 可选：宿主元素样式
/>
```

### ShadowRoot

```tsx
<ShadowRoot
  theme="auto"              // 'auto' | 'light' | 'dark'
  className="shadow-host"   // 可选：宿主元素类名
  style={{ margin: 20 }}    // 可选：宿主元素样式
>
  {children}
</ShadowRoot>
```

## 致谢

本项目基于 [vercel/react-tweet](https://github.com/vercel/react-tweet) 开发，感谢原作者的出色工作。

## License

MIT
