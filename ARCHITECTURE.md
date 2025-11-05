# Architecture Overview

## Philosophy

`apgu-filters` follows the **shadcn/ui** philosophy:

> "Components are NOT installed as dependencies. They are copied into your project."

This gives users:
- ✅ **Full ownership** of UI code
- ✅ **Complete customization** freedom
- ✅ **No dependency lock-in**
- ✅ **Use their own design system** (shadcn + Tailwind)

## Two-Package Architecture

### 1. Core Package: `apgu-filters`

**What it is:**
- Headless filter logic library
- Published to npm
- Installed as a dependency: `npm install apgu-filters`

**What it contains:**
- React hooks (`useFiltersContext`, `useFilteredValues`)
- Context providers (`FiltersProvider`)
- Utilities (`createPredicate`, `createComparator`)
- TypeScript types
- **NO UI components**
- **NO shadcn dependencies**
- **NO Tailwind config**

**What users import from it:**
```tsx
import {
  FiltersProvider,
  useFiltersContext,
  createPredicate,
  createComparator
} from "apgu-filters";
```

### 2. CLI Package: `@apgu-filters/cli`

**What it is:**
- Command-line tool for scaffolding components
- Published to npm (separate from core)
- Used with: `npx @apgu-filters/cli add basic`

**What it does:**
- Copies template files into user's project
- Interactive prompts for configuration
- Manages component variants (basic, admin, etc.)

**What it contains:**
- CLI commands (`init`, `add`)
- Template files (in `templates/` directory)
- File copying logic

## Template Files

Templates are React components that:

1. **Import from core library:**
   ```tsx
   import { useFiltersContext, createPredicate } from "apgu-filters";
   ```

2. **Import from USER's shadcn components:**
   ```tsx
   import { Button } from "@/components/ui/button";
   import { Select } from "@/components/ui/select";
   ```

3. **Use USER's Tailwind classes:**
   ```tsx
   <div className="space-y-4"> {/* User's Tailwind config */}
   ```

This means:
- Templates adapt to user's design system
- No bundled CSS or components
- Users can modify templates freely after scaffolding

## Directory Structure

```
apgu-filters/
├── packages/
│   ├── apgu-filters/              # Core headless library
│   │   ├── src/
│   │   │   ├── hooks/
│   │   │   │   ├── use-filters-context.ts
│   │   │   │   └── use-filtered-values.ts
│   │   │   ├── filters-context.tsx
│   │   │   ├── filters-provider.tsx
│   │   │   ├── lib/
│   │   │   │   ├── types.ts       # All TypeScript types
│   │   │   │   └── utils.tsx      # createPredicate, createComparator
│   │   │   └── index.ts           # Public API exports
│   │   ├── package.json           # Published as "apgu-filters"
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   │
│   └── cli/                       # CLI tool
│       ├── src/
│       │   ├── commands/
│       │   │   ├── init.ts        # npx ... init
│       │   │   └── add.ts         # npx ... add [component]
│       │   └── index.ts           # CLI entry point
│       ├── templates/             # Component templates
│       │   └── filters/
│       │       ├── basic/         # Basic filter variant
│       │       │   └── filters.tsx
│       │       └── admin/         # Admin filter variant
│       │           ├── base-components.tsx
│       │           ├── comparators.tsx
│       │           └── string-predicate.tsx
│       ├── package.json           # Published as "@apgu-filters/cli"
│       ├── tsconfig.json
│       └── tsup.config.ts
│
├── package.json                   # Monorepo root (private)
└── README.md
```

## User's Project Structure (After Scaffolding)

```
user-project/
├── src/
│   ├── components/
│   │   ├── ui/                    # Their shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── select.tsx
│   │   │   └── input.tsx
│   │   │
│   │   └── filters/               # Scaffolded by CLI
│   │       ├── filters.tsx        # Uses Button, Select from ui/
│   │       ├── base-components.tsx
│   │       ├── comparators.tsx
│   │       └── string-predicate.tsx
│   │
│   ├── lib/
│   │   └── predicates.ts          # User defines their predicates
│   │
│   └── app/
│       └── page.tsx               # Uses FiltersProvider
│
├── tailwind.config.js             # User's Tailwind config
└── package.json
    └── dependencies:
        └── apgu-filters: "^1.0.0" # Core library only
```

## Data Flow

```
User's Data
    ↓
FiltersProvider (from apgu-filters)
    ↓
Filter State & Methods
    ↓
useFiltersContext() (from apgu-filters)
    ↓
UI Components (from user's project - scaffolded by CLI)
    ├── Uses: User's shadcn components
    ├── Styles: User's Tailwind classes
    └── Logic: apgu-filters hooks
    ↓
Filtered Data
    ↓
User's Components
```

## Why This Works

### For Users:
1. **No Lock-in**: UI components live in their codebase
2. **Customizable**: Can modify any component
3. **Design System**: Uses their shadcn + Tailwind setup
4. **Type-Safe**: Full TypeScript support
5. **Lightweight**: Only install what they need

### For Library:
1. **Focused**: Core library stays small and focused
2. **Maintainable**: UI templates separate from logic
3. **Flexible**: Can add new templates easily
4. **Compatible**: Works with any React + shadcn + Tailwind setup

## Key Differences from Traditional Libraries

| Traditional Library | apgu-filters |
|---|---|
| Install UI components | Install headless logic only |
| Import pre-built components | Scaffold components into project |
| Override styles with CSS | Own the components, modify freely |
| Library's design system | Your design system (shadcn) |
| Bundle size concerns | Only logic in bundle |
| Locked to library versions | Full control over UI code |

## Publishing Strategy

### Core Library (`apgu-filters`)
- Published to npm
- Semantic versioning
- Breaking changes in major versions
- Users install as dependency

### CLI Tool (`@apgu-filters/cli`)
- Published to npm (separate package)
- Used via `npx` (no installation needed)
- Templates bundled with CLI
- Can update templates independently

### Template Updates
- New templates: Add to CLI, publish new version
- Template fixes: Users can apply manually or re-scaffold
- Users own templates: No forced updates

## Development Workflow

1. **Develop Core**: Work in `packages/apgu-filters/`
2. **Test Core**: Build and test headless logic
3. **Create Templates**: Add to `packages/cli/templates/`
4. **Test Templates**: Scaffold into test project, verify
5. **Build All**: `npm run build`
6. **Publish**: Publish both packages separately

## Future Extensibility

Easy to add:
- ✅ New template variants
- ✅ New predicate types
- ✅ New CLI commands
- ✅ Advanced features (saved filters, filter presets, etc.)

All while maintaining:
- ✅ Core library stays focused
- ✅ Users keep full control
- ✅ No breaking changes to existing setups
