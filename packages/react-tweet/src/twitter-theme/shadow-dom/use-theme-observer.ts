'use client'

import { useEffect, useCallback, useState } from 'react'

export type ThemeMode = 'light' | 'dark' | 'auto'

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getDocumentTheme(): 'light' | 'dark' | null {
  if (typeof document === 'undefined') return null

  const root = document.documentElement

  if (
    root.dataset.theme === 'dark' ||
    root.classList.contains('dark')
  ) {
    return 'dark'
  }

  if (
    root.dataset.theme === 'light' ||
    root.classList.contains('light')
  ) {
    return 'light'
  }

  return null
}

export function useThemeObserver(
  mode: ThemeMode,
  hostRef: React.RefObject<HTMLElement | null>
) {
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  const updateTheme = useCallback(() => {
    if (!hostRef.current) return

    let theme: 'light' | 'dark'

    if (mode === 'auto') {
      const docTheme = getDocumentTheme()
      theme = docTheme ?? getSystemTheme()
    } else {
      theme = mode
    }

    setResolvedTheme(theme)
    hostRef.current.setAttribute('data-theme', theme)
  }, [mode, hostRef])

  useEffect(() => {
    updateTheme()

    if (mode !== 'auto') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleMediaChange = () => updateTheme()
    mediaQuery.addEventListener('change', handleMediaChange)

    const observer = new MutationObserver(() => updateTheme())
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
      observer.disconnect()
    }
  }, [mode, updateTheme])

  return resolvedTheme
}
