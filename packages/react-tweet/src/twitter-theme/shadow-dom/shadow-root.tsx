'use client'

import React, {
  useRef,
  useEffect,
  useState,
  type ReactNode,
  type FC,
  type CSSProperties,
} from 'react'
import { createPortal } from 'react-dom'
import { useThemeObserver, type ThemeMode } from './use-theme-observer.js'

export type ShadowRootProps = {
  children: ReactNode
  theme?: ThemeMode
  className?: string
  style?: CSSProperties
}

function cloneStyleSheetsToShadow(shadow: ShadowRoot) {
  const sheets: CSSStyleSheet[] = []

  for (const sheet of document.styleSheets) {
    try {
      if (sheet.cssRules) {
        const newSheet = new CSSStyleSheet()
        const cssText = Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join('\n')
        newSheet.replaceSync(cssText)
        sheets.push(newSheet)
      }
    } catch {
      // Cross-origin stylesheets will throw, skip them
    }
  }

  if ('adoptedStyleSheets' in shadow) {
    shadow.adoptedStyleSheets = sheets
  }
}

export const TweetShadowRoot: FC<ShadowRootProps> = ({
  children,
  theme = 'auto',
  className,
  style,
}) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const shadowRootRef = useRef<ShadowRoot | null>(null)
  const [shadowContainer, setShadowContainer] = useState<Element | null>(null)

  useThemeObserver(theme, hostRef)

  useEffect(() => {
    const host = hostRef.current
    if (!host || shadowRootRef.current) return

    const shadow = host.attachShadow({ mode: 'open' })
    shadowRootRef.current = shadow

    cloneStyleSheetsToShadow(shadow)

    const container = document.createElement('div')
    shadow.appendChild(container)
    setShadowContainer(container)
  }, [])

  return (
    <div ref={hostRef} className={className} style={style}>
      {shadowContainer
        ? (createPortal(children, shadowContainer) as React.ReactNode)
        : null}
    </div>
  )
}

export { TweetShadowRoot as ShadowRoot }
