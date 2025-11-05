# apgu-filters

Headless, type-safe filtering library for React.

## Installation

```bash
npm install apgu-filters
```

## Important

This package provides the **headless logic** only. For UI components, use the CLI tool:

```bash
npx @apgu-filters/cli add basic
```

See the [main README](../../README.md) for full documentation.

## What's Included

- `FiltersProvider` - Context provider for filter state
- `useFiltersContext` - Hook to access filter state and methods
- `createPredicate` - Utility to create predicate definitions
- `createComparator` - Utility to create comparator definitions
- TypeScript types

## Quick Start

```tsx
import { FiltersProvider, useFiltersContext } from "apgu-filters";

// Use with your own UI components
function MyApp() {
  return (
    <FiltersProvider values={data} predicates={predicates}>
      <YourFilterUI />
      <YourDataDisplay />
    </FiltersProvider>
  );
}
```

## License

MIT
