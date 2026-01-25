'use client'

import type { ReactNode, CSSProperties } from 'react'
import {
  TweetShadowRoot,
  type ThemeMode,
} from './twitter-theme/shadow-dom/index.js'
import { Tweet } from './swr.js'
import type { TweetProps } from './swr.js'

type IsolatedTweetBaseProps = {
  theme?: ThemeMode
  className?: string
  style?: CSSProperties
  fallback?: ReactNode
}

export type IsolatedTweetProps = IsolatedTweetBaseProps & TweetProps

export const IsolatedTweet = ({
  theme = 'auto',
  className,
  style,
  ...tweetProps
}: IsolatedTweetProps) => {
  return (
    <TweetShadowRoot theme={theme} className={className} style={style}>
      <Tweet {...tweetProps} />
    </TweetShadowRoot>
  )
}
