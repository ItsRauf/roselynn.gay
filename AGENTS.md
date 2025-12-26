# Agent Guidelines for Personal Portfolio

This document provides guidelines for AI coding agents working in this repository.

## Build/Lint/Test Commands

```bash
# Development
pnpm dev                 # Start dev server on port 3000
pnpm build              # Production build
pnpm serve              # Preview production build

# Code Quality
pnpm check              # Run Biome check (format + lint)
pnpm format             # Format code with Biome
pnpm lint               # Lint code with Biome

# Testing
pnpm test               # Run all tests with Vitest
# No single test command - tests are not the primary focus
```

## Technology Stack

- **Framework**: React 19 with TanStack Start (file-based routing)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 (no className order conventions)
- **UI Components**: shadcn/ui + Radix UI primitives
- **Content**: MDX via content-collections
- **Code Quality**: Biome (replaces ESLint + Prettier)
- **Deployment**: Cloudflare (via Nitro preset)
- **Package Manager**: pnpm (v10.18.3)

## Project Structure

```
src/
  components/        # React components
    bento/          # Bento grid cards
    terminal/       # Terminal UI components
    ui/             # shadcn/ui components
  content/          # MDX content (projects, work)
  routes/           # TanStack Router file-based routes
  lib/              # Utility functions
  config/           # Site configuration
```

## Code Style & Conventions

### Formatting & Linting

- **Formatter**: Biome handles ALL formatting - never manually organize imports
- **Indentation**: Tabs (not spaces)
- **Quotes**: Double quotes for strings
- **Line endings**: Auto-handled by Biome
- **Import organization**: Automatic via Biome (do NOT touch manually)

### TypeScript

- **Strict mode enabled**: All strict TypeScript checks are on
- **No unused variables**: noUnusedLocals and noUnusedParameters enforced
- **No explicit any**: Allowed (suspicious.noExplicitAny is off)
- **Path aliases**: Use `@/*` for `src/*`
- **File extensions**: `.tsx` for components, `.ts` for utilities
- **Type imports**: Use standard imports (verbatimModuleSyntax is false)

### React Components

- **File naming**: kebab-case for files (`profile-card.tsx`)
- **Component naming**: PascalCase matching functionality
- **Exports**: Named exports from index files, direct exports from components
- **Memoization**: Use `memo()` for cards/expensive components
- **Function declarations**: Use `function ComponentName()` pattern
- **Props**: Inline TypeScript types, no separate Props interfaces unless complex

Example component structure:
```tsx
import { memo } from "react";
import { GlowCard } from "../glow-card";

export const ProfileCard = memo(function ProfileCard() {
	return (
		<GlowCard className="...">
			{/* content */}
		</GlowCard>
	);
});
```

### Routing (TanStack Router)

- **File-based routing**: Routes in `src/routes/`
- **Route files**: Use `{-$slug}.tsx` for dynamic params (projects), `$slug.tsx` for work
- **Route exports**: Export `Route` object from `createFileRoute()`
- **Loaders**: Use for data fetching, return promises
- **Preloading**: Enable with `preload: true` for critical routes

Example route:
```tsx
export const Route = createFileRoute("/")({
	component: Index,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(queryOptions());
	},
	preload: true,
	wrapInSuspense: true,
});
```

### Styling

- **CSS Framework**: Tailwind CSS 4 (new CSS-first architecture)
- **Class merging**: Use `cn()` utility from `@/lib/utils`
- **Responsive**: Mobile-first breakpoints (sm:, md:, lg:)
- **Colors**: Semantic color system via siteConfig.theme.colors
- **Animations**: Use tw-animate-css or Tailwind animations

### Content (MDX)

- **Location**: `src/content/projects/` and `src/content/work/`
- **Schema**: Defined in content-collections.ts with Zod
- **Syntax highlighting**: rehype-starry-night for code blocks
- **Custom components**: Defined in `src/components/mdx-components.tsx`
- **Frontmatter**: YAML frontmatter for metadata

### Error Handling

- **Fail-fast approach**: Don't wrap everything in try/catch
- **Let real errors crash**: Only handle intentional cases where context matters
- **Validation**: Validate and reject invalid user input
- **Critical failures**: For missing credentials/config, fail and exit
- **Error boundaries**: Use React error boundaries for component failures

### Functions & Code Organization

- **Module-level constants**: Use SCREAMING_SNAKE_CASE for constants
- **Small functions**: Break up based on mental complexity and usefulness
- **Early returns**: Prefer `if (!condition) return;` over nested ifs
- **No main() wrappers**: Code runs top-to-bottom from imports to output
- **Return values**: Functions should return values, not modify state directly
- **Comments**: Only when logic is non-obvious (complex algorithms, regex, encoding)
- **No docstrings**: Code should be self-explanatory through clear naming

### Naming Conventions

- **Variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE (module-level)
- **Components**: PascalCase
- **Files**: kebab-case
- **Types**: PascalCase with descriptive names
- **Clear names**: Prioritize readability over conciseness

### Configuration

- **Environment variables**: Use for configuration, auto-parse env files
- **Site config**: Centralized in `src/config/site.config.ts`
- **Standard defaults**: Use unless explicitly specified
- **Platform-specific**: Handle explicitly when needed

### UI Components (shadcn/ui)

- **Installation**: Use `pnpx shadcn@latest add <component>`
- **Location**: `src/components/ui/`
- **Customization**: Modify directly in component files
- **Theming**: CSS variables in styles.css
- **Variants**: Use class-variance-authority (cva)

## Common Patterns

### Query Options Pattern
```tsx
export function dataQueryOptions() {
	return queryOptions({
		queryKey: ["data"],
		queryFn: async () => fetchData(),
	});
}
```

### Constant Data Pattern
```tsx
const ITEMS = [
	{ id: 1, name: "Item" },
	{ id: 2, name: "Other" },
] as const;
```

### Utility Functions
```tsx
export function utilityName(param: Type) {
	if (!param) return;
	// happy path at main indentation
	return result;
}
```

## Testing

- Tests are not required or expected
- Vitest is configured but minimal test coverage
- Use `pnpm test` to run tests if they exist
- No specific test patterns enforced

## Common Gotchas

- Route tree is auto-generated at `src/routeTree.gen.ts` - never edit manually
- Biome config ignores `src/routeTree.gen.ts`, `src/styles.css`, and `src/components/ui` (shadcn/ui vendor code)
- Use tabs for indentation (Biome enforces this)
- Don't organize imports manually - Biome handles it
- React Compiler is enabled via Babel plugin
- Content collections generate types at `.content-collections/generated`

## Output Style

- Plain text, no emojis (avoid "cringe" output)
- Console logs for progress at sensible intervals
- Use project logger if available (console might be muted)
- Clear, explicit error messages

## Don't

- Don't use `any` unnecessarily (but it's allowed when needed)
- Don't create unnecessary abstractions or over-modularize
- Don't wrap everything in try/catch (fail-fast approach)
- Don't write docstrings, pydoc comments, or verbose docs
- Don't touch import organization (formatter handles it)
- Don't use spaces for indentation (tabs only)
- Don't add emojis to output or code
