# Vercel Theme Design Documentation (Modern Card)

This package implements a custom "Modern Card" layout, diverging from the standard Twitter/X design to align with Vercel's (Geist) design system.

## Design Philosophy

- **Structure**: A structured "Header - Body - Footer" card layout.
- **Hierarchy**: Content is king. User info is clearly separated in a header. Actions are grounded in a footer.
- **Palette**: High-contrast monochrome (Geist).

## Component Breakdown

### Container (`tweet-container`)
- **Layout**: Flex column.
- **Style**:
    - **No padding** on the container itself (allows full-bleed header/footer).
    - **Border**: `1px solid #e5e5e5` (Light) / `#262626` (Dark).
    - **Radius**: `12px` (Soft, modern feel).
    - **Hover**: Transforms up slightly (`-1px`) with a deeper shadow (`0 8px 24px`), mimicking Vercel's interactive cards.

### Header (`tweet-header`)
- **Background**: Subtle gray (`#fafafa` / `#121212`) to differentiate from the content body.
- **Border Bottom**: Separates user info from the tweet content.
- **Layout**: Avatar left, Name/Handle stacked, Follow button right.
- **Visuals**: Clean, spaced out (`20px` padding).

### Body (`tweet-body`)
- **Layout**: Full width (no indentation). Aligned with header padding (`20px`).
- **Typography**: `1rem` size, `1.625` line-height for maximum readability.

### Footer (`tweet-actions`)
- **Background**: Same subtle gray as header.
- **Border Top**: Anchors the card.
- **Layout**: Horizontal toolbar.
- **Interactions**: Buttons have subtle background tints on hover, no distracting colors until interaction.
- **Position**: Likes/Replies left-aligned, Share/Copy right-aligned.

## Color Palette

### Light Mode
- **Bg**: `#ffffff` (Card), `#fafafa` (Header/Footer).
- **Text**: `#171717` (Primary), `#737373` (Secondary).
- **Border**: `#e5e5e5`.

### Dark Mode
- **Bg**: `#0a0a0a` (Card), `#121212` (Header/Footer).
- **Text**: `#ededed` (Primary), `#a3a3a3` (Secondary).
- **Border**: `#262626`.

## Usage
The theme handles its own layout structure via CSS. Ensure you are not overriding `padding` on the container externally, as the inner components expect to manage their own spacing relative to the card edges.
