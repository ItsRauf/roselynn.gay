# Personal Portfolio

A modern, performant personal portfolio built with React, TanStack Start, and Tailwind CSS. Features a bento-grid layout with real-time Discord status, Spotify integration, and GitHub activity.

## Features

- **Real-time Updates**: Live Discord status and Spotify playback via Lanyard API
- **GitHub Activity**: Contribution graph from the past 3 months
- **Interactive Terminal**: Built-in terminal emulator page
- **Performance Optimized**: 60fps mouse tracking, React.memo, retry logic
- **Accessible**: WCAG AA compliant with ARIA labels and reduced motion support
- **Responsive**: Mobile-first design with adaptive layouts
- **Type-safe**: Full TypeScript with Zod validation
- **Modern Stack**: TanStack Router, TanStack Query, Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm serve
```

The dev server runs on `http://localhost:3000`

## Configuration

All personal information is centralized in `src/config/site.config.ts`. Update this file with your own:

- Personal details (name, pronouns, tagline, avatar)
- Social links (GitHub, Twitter, email, Discord)
- Location and timezone
- Theme colors
- Feature flags

```typescript
export const siteConfig = {
  personal: {
    name: "your name",
    displayName: "Your Display Name",
    pronouns: "they/them",
    // ...
  },
  social: {
    github: "yourusername",
    twitter: "yourusername",
    email: "you@example.com",
    discordUserId: "your-discord-id",
  },
  // ...
}
```

## Project Structure

```
src/
├── components/
│   ├── bento/          # Bento grid card components
│   ├── terminal/       # Terminal emulator
│   └── ui/             # shadcn/ui components
├── config/             # Centralized configuration
├── content/            # MDX content (projects, work)
├── lib/                # Utilities and API clients
├── routes/             # File-based routing
└── styles.css          # Global styles and themes
```

## Content Management

Add projects and work experience by creating MDX files:

**Projects**: `src/content/projects/your-project.mdx`
```mdx
---
name: Project Name
description: Brief description
url: https://example.com
---

# Project Details
Your detailed content here...
```

**Work**: `src/content/work/your-company.mdx`
```mdx
---
company: Company Name
role: Your Role
startDate: 2024-01-01
endDate: 2024-12-31
---

# Work Experience
Your detailed content here...
```

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm serve` - Preview production build
- `pnpm lint` - Lint code with Biome
- `pnpm format` - Format code with Biome
- `pnpm check` - Run Biome checks
- `pnpm test` - Run tests with Vitest

## Tech Stack

### Core
- **React 19** - UI framework
- **TanStack Start** - Full-stack React framework
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **TypeScript** - Type safety
- **Vite** - Build tool

### Styling
- **Tailwind CSS v4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Radix UI** - Headless UI primitives

### APIs & Data
- **Lanyard** - Discord presence and Spotify status
- **GitHub API** - Contribution data
- **Content Collections** - MDX content management

### Tooling
- **Biome** - Linting and formatting
- **Vitest** - Unit testing
- **pnpm** - Package management

## Performance

This portfolio is optimized for performance:
- **Mouse tracking throttled to 60fps** (16ms intervals)
- **getBoundingClientRect() results cached** and updated only on resize/scroll
- **All cards memoized** with React.memo to prevent unnecessary re-renders
- **API queries** use exponential backoff retry logic
- **Prefers-reduced-motion** support for accessibility
- **3D transforms disabled** on mobile/touch devices

## Accessibility

- WCAG AA compliant
- Full keyboard navigation
- Screen reader friendly with ARIA labels
- Respects prefers-reduced-motion
- Semantic HTML throughout

## License

MIT License - feel free to use this as a template for your own portfolio!

## Credits

Built by [roselyn](https://github.com/ItsRauf)
