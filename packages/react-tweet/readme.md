# @innei/react-tweet

A component library for embedding Twitter/X tweets in React applications, supporting frameworks like Next.js, Vite, and more.

This project is forked from [vercel/react-tweet](https://github.com/vercel/react-tweet) and has been independently developed with several new practical features.

## New Features in Fork

Compared to the upstream repository, this project adds the following features:

- **Shadow DOM Style Isolation** - Complete isolation from external CSS interference, solving global style pollution issues
- **Clickable Card** - The entire tweet card is clickable and navigates to Twitter/X
- **Automatic Theme Following** - Automatically detects page theme (dark/light) and syncs to components
- **Redesigned UI** - More modern visual style

## Installation

```bash
npm install @innei/react-tweet
# or
pnpm add @innei/react-tweet
# or
yarn add @innei/react-tweet
```

## Quick Start

```tsx
import { Tweet } from '@innei/react-tweet'
import '@innei/react-tweet/theme.css'

export default function App() {
  return <Tweet id="1628832338187636740" />
}
```

## Shadow DOM Style Isolation

When embedding tweets in complex applications, external CSS (such as `* { box-sizing }`, `a { color }`, `img { max-width }`, etc.) may affect component appearance. Shadow DOM isolation provides complete style encapsulation.

### Using ShadowRoot

Wrap components with `ShadowRoot` to isolate external styles:

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

### Using IsolatedTweet

Convenient component with built-in Shadow DOM isolation:

```tsx
import { IsolatedTweet } from '@innei/react-tweet'
import '@innei/react-tweet/theme.css'

export default function App() {
  return <IsolatedTweet id="1628832338187636740" theme="auto" />
}
```

### Theme Options

The `theme` prop supports three values:

- `'auto'` (default) - Automatically follows page theme by listening to `<html>` `data-theme` attribute, `.dark`/`.light` class names, and `prefers-color-scheme` media query
- `'light'` - Force light theme
- `'dark'` - Force dark theme

```tsx
// Automatically detect page theme
<ShadowRoot theme="auto">
  <Tweet id="..." />
</ShadowRoot>

// Force dark theme
<ShadowRoot theme="dark">
  <Tweet id="..." />
</ShadowRoot>
```

### How It Works

Shadow DOM creates an isolated DOM subtree with independent style scope. The `ShadowRoot` component:

1. Creates Shadow DOM boundary using `attachShadow({ mode: 'open' })`
2. Clones page stylesheets into Shadow DOM via `adoptedStyleSheets`
3. Listens to theme changes on `document.documentElement` and syncs to Shadow DOM host element

### Browser Compatibility

- `attachShadow`: All modern browsers
- `adoptedStyleSheets`: Chrome 73+, Firefox 101+, Safari 16.4+

### Limitations

- Shadow DOM requires client-side JavaScript (not available during SSR)
- Initial render may briefly show unstyled content before hydration

## API Reference

### Tweet

```tsx
<Tweet
  id="1628832338187636740"
  fallback={<Loading />}         // Optional: display during loading
  components={customComponents}  // Optional: custom sub-components
/>
```

### IsolatedTweet

```tsx
<IsolatedTweet
  id="1628832338187636740"
  theme="auto"              // 'auto' | 'light' | 'dark'
  className="my-tweet"      // Optional: host element class name
  style={{ maxWidth: 500 }} // Optional: host element styles
/>
```

### ShadowRoot

```tsx
<ShadowRoot
  theme="auto"              // 'auto' | 'light' | 'dark'
  className="shadow-host"   // Optional: host element class name
  style={{ margin: 20 }}    // Optional: host element styles
>
  {children}
</ShadowRoot>
```

## Acknowledgments

This project is based on [vercel/react-tweet](https://github.com/vercel/react-tweet). Thanks to the original authors for their excellent work.

## License

MIT
