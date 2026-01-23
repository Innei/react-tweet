import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { TweetHeader } from '../src/twitter-theme/tweet-header'
import { TweetBody } from '../src/twitter-theme/tweet-body'
import { TweetContainer } from '../src/twitter-theme/tweet-container'
import type { EnrichedTweet } from '../src/utils'

const mockTweet = {
  id_str: '1234567890',
  url: 'https://twitter.com/vercel/status/1234567890',
  text: 'Just deployed to Vercel.',
  created_at: 'Tue Mar 21 20:50:14 +0000 2023',
  user: {
    name: 'Vercel',
    screen_name: 'vercel',
    profile_image_url_https: 'https://pbs.twimg.com/profile_images/123/avatar.jpg',
    profile_image_shape: 'Circle',
    verified: true,
    is_blue_verified: true,
    follow_url: 'https://twitter.com/intent/follow?screen_name=vercel',
  },
  favorite_count: 42,
  conversation_count: 5,
  news_action_type: 'conversation',
  entities: [
    { type: 'text', text: 'Just deployed to Vercel.' }
  ],
} as unknown as EnrichedTweet

describe('Tweet Component (Vercel Theme)', () => {
  it('renders the tweet container', () => {
    const { container } = render(<TweetContainer>Content</TweetContainer>)
    expect(container.firstChild).toHaveClass('react-tweet-theme')
  })

  it('renders the tweet header with user info', () => {
    render(<TweetHeader tweet={mockTweet} />)
    expect(screen.getByText('Vercel')).toBeInTheDocument()
    expect(screen.getByText('@vercel')).toBeInTheDocument()
    expect(screen.getByText('Follow')).toBeInTheDocument()
  })

  it('renders the tweet body', () => {
    render(<TweetBody tweet={mockTweet} />)
    expect(screen.getByText('Just deployed to Vercel.')).toBeInTheDocument()
  })
})