import type { ReactNode } from 'react'
import clsx from 'clsx'
import s from './tweet-container.module.css'
import './theme.css'

type Props = {
  className?: string
  children: ReactNode
  href?: string
}

export const TweetContainer = ({ className, children, href }: Props) => (
  <div className={clsx('react-tweet-theme', s.root, href && s.clickable, className)}>
    {href && (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={s.overlay}
        aria-label="View tweet on X"
      />
    )}
    <article className={s.article}>{children}</article>
  </div>
)
