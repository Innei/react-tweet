# react-tweet

react-tweet allows you to embed tweets in your React application when using Next.js, Vite, and more.

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

When embedding tweets in complex applications, external CSS (like `* { box-sizing }`, `a { color }`, `img { max-width }`) may affect the tweet's appearance. The Shadow DOM isolation feature provides complete style encapsulation.

### Using ShadowRoot

Wrap any tweet component with `ShadowRoot` to isolate it from external styles:

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

For convenience, use `IsolatedTweet` which combines `Tweet` with `ShadowRoot`:

```tsx
import { IsolatedTweet } from '@innei/react-tweet'
import '@innei/react-tweet/theme.css'

export default function App() {
  return <IsolatedTweet id="1628832338187636740" theme="auto" />
}
```

### Theme Options

The `theme` prop supports three values:

- `'auto'` (default) - Automatically follows the page theme by observing `data-theme` attribute or `.dark`/`.light` classes on `<html>`, and `prefers-color-scheme` media query
- `'light'` - Forces light theme
- `'dark'` - Forces dark theme

```tsx
// Auto-detect theme from page
<ShadowRoot theme="auto">
  <Tweet id="..." />
</ShadowRoot>

// Force dark theme
<ShadowRoot theme="dark">
  <Tweet id="..." />
</ShadowRoot>
```

### How It Works

The Shadow DOM creates an isolated DOM subtree with its own styling scope. The `ShadowRoot` component:

1. Creates a Shadow DOM boundary using `attachShadow({ mode: 'open' })`
2. Clones all page stylesheets into the Shadow DOM using `adoptedStyleSheets`
3. Observes theme changes on `document.documentElement` and syncs them to the Shadow DOM host

### Browser Compatibility

- `attachShadow`: All modern browsers
- `adoptedStyleSheets`: Chrome 73+, Firefox 101+, Safari 16.4+

### Limitations

- Shadow DOM requires client-side JavaScript (not available during SSR)
- First render may show unstyled content briefly before hydration

## API Reference

### Tweet

```tsx
<Tweet
  id="1628832338187636740"
  fallback={<Loading />}    // Optional: shown while loading
  components={customComponents}  // Optional: custom sub-components
/>
```

### IsolatedTweet

```tsx
<IsolatedTweet
  id="1628832338187636740"
  theme="auto"              // 'auto' | 'light' | 'dark'
  className="my-tweet"      // Optional: class for host element
  style={{ maxWidth: 500 }} // Optional: style for host element
/>
```

### ShadowRoot

```tsx
<ShadowRoot
  theme="auto"              // 'auto' | 'light' | 'dark'
  className="shadow-host"   // Optional: class for host element
  style={{ margin: 20 }}    // Optional: style for host element
>
  {children}
</ShadowRoot>
```

## Documentation

For full documentation visit [react-tweet.vercel.app](https://react-tweet.vercel.app).

## Contributing

Visit our [contributing docs](https://react-tweet.vercel.app/contributing).
