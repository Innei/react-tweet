import { EmbeddedTweet } from 'react-tweet'
import type { Tweet } from 'react-tweet/api'

const user = {
  id_str: '123',
  name: 'Vercel',
  screen_name: 'vercel',
  profile_image_url_https:
    'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png',
  is_blue_verified: true,
  verified: true,
  verified_type: 'Business',
}

const baseTweet = {
  __typename: 'Tweet' as const,
  lang: 'en',
  created_at: new Date().toISOString(),
  display_text_range: [0, 100],
  entities: {
    hashtags: [],
    urls: [],
    user_mentions: [],
    symbols: [],
  },
  id_str: '1',
  text: 'This is a test tweet',
  user,
  edit_control: {
    edit_tweet_ids: ['1'],
    editable_until_msecs: '0',
    is_edit_eligible: false,
    edits_remaining: '0',
  },
  isEdited: false,
  isStaleEdit: false,
  favorite_count: 100,
  conversation_count: 10,
  news_action_type: 'conversation' as const,
}

const standardTweet: Tweet = {
  ...baseTweet,
  id_str: 'standard',
  text: 'Just deployed to Vercel. This is a standard tweet showing the new Vercel-inspired UI theme in the Vite app.',
}

const replyTweet: Tweet = {
  ...baseTweet,
  id_str: 'reply',
  text: 'Replying to ourselves! This tweet demonstrates the "Replying to @vercel" indicator with the new styles.',
  in_reply_to_screen_name: 'vercel',
  in_reply_to_status_id_str: 'standard',
  in_reply_to_user_id_str: '123',
}

const quotedTweet: Tweet = {
  ...baseTweet,
  id_str: 'quote',
  text: 'This tweet quotes another tweet. Notice the quoted container style and clean borders.',
  quoted_tweet: {
    ...baseTweet,
    id_str: 'quoted-inner',
    text: 'I am the quoted tweet! I should appear inside a box with the Geist design language.',
    user: {
      ...user,
      name: 'Next.js',
      screen_name: 'nextjs',
    },
    reply_count: 50,
    retweet_count: 20,
    self_thread: {
      id_str: 'quoted-inner',
    },
  },
}

const longTweet: Tweet = {
  ...baseTweet,
  id_str: 'long',
  text: 'This is a much longer tweet to test how the text wraps and how the layout handles larger blocks of content in the Vite demo. We want to ensure that the typography remains readable and the spacing is consistent with the Vercel design system.  Testing line breaks and Geist Sans font stack.',
}

export const DemoPage = () => {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: '40px 20px',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      <h1
        style={{
          marginBottom: 12,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        Vercel Theme Gallery
      </h1>
      <p style={{ marginBottom: 40, color: '#666', fontSize: 16 }}>
        Interactive demo of the redesigned tweet components.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
        <section>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: 16,
              letterSpacing: '0.05em',
            }}
          >
            Standard
          </h2>
          <EmbeddedTweet tweet={standardTweet} />
        </section>

        <section>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: 16,
              letterSpacing: '0.05em',
            }}
          >
            Reply / Conversation
          </h2>
          <EmbeddedTweet tweet={replyTweet} />
        </section>

        <section>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: 16,
              letterSpacing: '0.05em',
            }}
          >
            Quoted Tweet
          </h2>
          <EmbeddedTweet tweet={quotedTweet} />
        </section>

        <section>
          <h2
            style={{
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'uppercase',
              color: '#888',
              marginBottom: 16,
              letterSpacing: '0.05em',
            }}
          >
            Multi-line Text
          </h2>
          <EmbeddedTweet tweet={longTweet} />
        </section>
      </div>
    </div>
  )
}
