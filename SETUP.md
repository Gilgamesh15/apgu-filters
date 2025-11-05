# Setup Guide

## Initial Setup

### 1. Install Dependencies

From the root of the monorepo:

```bash
npm install
```

This will install dependencies for all packages in the workspace.

### 2. Build the Packages

```bash
# Build both packages
npm run build

# Or build individually
npm run build:core   # Build apgu-filters
npm run build:cli    # Build CLI
```

## Development Workflow

### Working on Core Library

```bash
# Run in watch mode
npm run dev:core

# In another terminal, test your changes
cd packages/apgu-filters
npm link

# In your test project
npm link apgu-filters
```

### Working on CLI

```bash
# Run in watch mode
npm run dev:cli

# Test the CLI locally
cd packages/cli
npm link

# Now you can use it globally
apgu-filters add basic
```

### Testing Templates

1. Build the CLI:
   ```bash
   npm run build:cli
   ```

2. Create a test project:
   ```bash
   mkdir test-project
   cd test-project
   npm init -y
   npm install react react-dom
   npx shadcn@latest init
   ```

3. Run your local CLI:
   ```bash
   npx /path/to/apgu-filters/packages/cli/dist/index.js add basic
   ```

## Project Structure

```
apgu-filters/
├── packages/
│   ├── apgu-filters/      # Core library
│   │   ├── src/           # Source code
│   │   ├── dist/          # Built output (gitignored)
│   │   └── package.json
│   │
│   └── cli/               # CLI tool
│       ├── src/           # CLI source
│       ├── templates/     # Component templates
│       ├── dist/          # Built output (gitignored)
│       └── package.json
│
├── package.json           # Workspace root
└── README.md
```

## Common Tasks

### Add a New Template

1. Create template files in `packages/cli/templates/filters/[name]/`
2. Update `AVAILABLE_COMPONENTS` in `packages/cli/src/commands/add.ts`
3. Rebuild CLI: `npm run build:cli`
4. Test with: `apgu-filters add [name]`

### Add a New Comparator

1. Add to `packages/cli/templates/filters/admin/comparators.tsx`
2. Users will get it when they run `apgu-filters add admin`

### Update Core API

1. Make changes in `packages/apgu-filters/src/`
2. Update exports in `packages/apgu-filters/src/index.ts`
3. Rebuild: `npm run build:core`
4. Update version in `packages/apgu-filters/package.json`

## Publishing

### Prerequisites

1. Login to npm:
   ```bash
   npm login
   ```

2. Ensure you have access to publish:
   - `apgu-filters` (core package)
   - `@apgu-filters/cli` (CLI package)

### Publish Core Library

```bash
cd packages/apgu-filters
npm version patch  # or minor, major
npm publish
```

### Publish CLI

```bash
cd packages/cli
npm version patch  # or minor, major
npm publish
```

### Publish Both

```bash
# From root
npm run build
cd packages/apgu-filters && npm version patch && npm publish && cd ../..
cd packages/cli && npm version patch && npm publish && cd ../..
```

## Troubleshooting

### "Cannot find module" errors

Make sure you've built the packages:
```bash
npm run build
```

### CLI not finding templates

Templates should be in `packages/cli/templates/` and included in the build. Check `packages/cli/package.json` files array includes "templates".

### Type errors in templates

Templates use `@/components/ui/*` imports which won't resolve in the monorepo. This is expected - they're meant to be copied into user projects where these paths exist.

### Workspace issues

Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
rm -rf packages/*/node_modules
npm install
```

## Best Practices

### For Core Library
- Keep it headless (no UI)
- No dependencies on UI libraries
- Focus on filter logic and state management
- Export clear, documented APIs
- Use TypeScript for type safety

### For Templates
- Always import shadcn components from `@/components/ui/*`
- Use Tailwind classes (user's config)
- Import logic from `apgu-filters`
- Keep them customizable
- Document required shadcn components

### For CLI
- Clear, helpful error messages
- Interactive prompts for better UX
- Check for conflicts before overwriting
- Show next steps after scaffolding
- Keep dependencies minimal

## Testing Checklist

Before publishing:

- [ ] Core library builds without errors
- [ ] CLI builds without errors
- [ ] Templates scaffold correctly
- [ ] Scaffolded components work in a real project
- [ ] Required shadcn components are documented
- [ ] README is up to date
- [ ] Version numbers are bumped
- [ ] Git tags are created

## Resources

- [npm workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [tsup documentation](https://tsup.egoist.dev/)
- [Commander.js](https://github.com/tj/commander.js)
- [shadcn/ui](https://ui.shadcn.com/)
