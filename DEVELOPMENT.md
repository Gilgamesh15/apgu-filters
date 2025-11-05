# Development & Testing Guide

## Initial Setup

```bash
# Install dependencies for all packages
npm install

# Build all packages
npm run build
```

## Development Workflow

### Option 1: Using npm link (Recommended for local testing)

#### Test Core Library (`apgu-filters`)

1. **Link the core package:**
   ```bash
   cd packages/apgu-filters
   npm link
   ```

2. **Create a test project:**
   ```bash
   cd ~
   mkdir test-apgu-filters
   cd test-apgu-filters

   # Initialize Next.js or Vite project
   npx create-next-app@latest . --typescript --tailwind
   # or
   npm create vite@latest . -- --template react-ts

   npm install
   ```

3. **Install shadcn/ui:**
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button select input
   ```

4. **Link your local apgu-filters:**
   ```bash
   npm link apgu-filters
   ```

5. **Run core package in watch mode:**
   ```bash
   # In your apgu-filters monorepo
   npm run dev:core
   ```

6. **Now you can import and use it:**
   ```tsx
   // In your test project
   import { FiltersProvider, useFiltersContext } from "apgu-filters";
   ```

7. **Run your test project:**
   ```bash
   npm run dev
   ```

Changes to `packages/apgu-filters/src/` will automatically rebuild and be available in your test project!

#### Test CLI Tool

1. **Build CLI:**
   ```bash
   cd packages/cli
   npm link
   ```

2. **In your test project:**
   ```bash
   apgu-filters add basic
   # or
   apgu-filters add admin
   ```

3. **For CLI changes, rebuild:**
   ```bash
   # In monorepo root
   npm run dev:cli  # Watch mode
   # or
   npm run build:cli  # One-time build
   ```

### Option 2: Using Workspace Dependencies

Create a test app inside the monorepo:

1. **Create test directory:**
   ```bash
   mkdir -p test-app
   cd test-app
   npx create-next-app@latest . --typescript --tailwind
   ```

2. **Update test-app/package.json:**
   ```json
   {
     "dependencies": {
       "apgu-filters": "file:../packages/apgu-filters"
     }
   }
   ```

3. **Install:**
   ```bash
   cd test-app
   npm install
   npx shadcn@latest init
   npx shadcn@latest add button select input
   ```

4. **Copy templates manually or test CLI:**
   ```bash
   # Copy template files from packages/cli/templates/ to test-app/src/components/
   ```

### Option 3: Using Verdaccio (Local npm registry)

For testing the full publish/install flow:

1. **Install Verdaccio:**
   ```bash
   npm install -g verdaccio
   ```

2. **Run Verdaccio:**
   ```bash
   verdaccio
   # Runs on http://localhost:4873
   ```

3. **Publish to local registry:**
   ```bash
   # Core package
   cd packages/apgu-filters
   npm publish --registry http://localhost:4873

   # CLI package
   cd ../cli
   npm publish --registry http://localhost:4873
   ```

4. **Install from local registry:**
   ```bash
   cd your-test-project
   npm install apgu-filters --registry http://localhost:4873
   npx @apgu-filters/cli@latest add basic --registry http://localhost:4873
   ```

## Testing Checklist

### Core Library Testing

- [ ] **Build succeeds:**
  ```bash
  npm run build:core
  ```

- [ ] **Types are generated:**
  ```bash
  ls packages/apgu-filters/dist/index.d.ts
  ```

- [ ] **Can import in test project:**
  ```tsx
  import { FiltersProvider, useFiltersContext, createPredicate } from "apgu-filters";
  ```

- [ ] **Context provides correct values:**
  ```tsx
  const { filteredValues, addFilterRule, predicates } = useFiltersContext();
  ```

- [ ] **Filtering works correctly:**
  - Add filter rules
  - Check filteredValues updates
  - Test different comparators
  - Test different predicates

### CLI Testing

- [ ] **CLI builds:**
  ```bash
  npm run build:cli
  ls packages/cli/dist/index.js
  ```

- [ ] **CLI is executable:**
  ```bash
  node packages/cli/dist/index.js --help
  ```

- [ ] **Init command works:**
  ```bash
  apgu-filters init
  ```

- [ ] **Add command works:**
  ```bash
  apgu-filters add basic
  apgu-filters add admin
  ```

- [ ] **Templates copy correctly:**
  ```bash
  # Check files exist in target directory
  ls -la src/components/filters/
  ```

- [ ] **Templates have correct imports:**
  ```tsx
  // Should import from user's shadcn
  import { Button } from "@/components/ui/button"
  // Should import from core library
  import { useFiltersContext } from "apgu-filters"
  ```

### Integration Testing

Create a complete test scenario:

1. **Create test project:**
   ```bash
   npx create-next-app@latest test-integration --typescript --tailwind
   cd test-integration
   ```

2. **Setup shadcn:**
   ```bash
   npx shadcn@latest init
   npx shadcn@latest add button select input
   ```

3. **Install core library:**
   ```bash
   npm link ../apgu-filters/packages/apgu-filters
   ```

4. **Add components:**
   ```bash
   apgu-filters add admin
   ```

5. **Create test data and predicates:**
   ```tsx
   // src/lib/predicates.ts
   import { StringPredicate } from "@/components/filters/string-predicate";

   export const USER_PREDICATES = [
     StringPredicate({ field: "name", label: "Name" }),
     StringPredicate({ field: "email", label: "Email" }),
   ];
   ```

6. **Create test page:**
   ```tsx
   // src/app/page.tsx
   "use client";

   import { FiltersProvider, useFiltersContext } from "apgu-filters";
   import { USER_PREDICATES } from "@/lib/predicates";

   const users = [
     { name: "John", email: "john@test.com" },
     { name: "Jane", email: "jane@test.com" },
   ];

   export default function Page() {
     return (
       <FiltersProvider values={users} predicates={USER_PREDICATES}>
         <TestFilters />
       </FiltersProvider>
     );
   }

   function TestFilters() {
     const { filteredValues, addFilterRule } = useFiltersContext();

     return (
       <div>
         <button onClick={() => addFilterRule({ field: "name" })}>
           Add Name Filter
         </button>
         <pre>{JSON.stringify(filteredValues, null, 2)}</pre>
       </div>
     );
   }
   ```

7. **Run and test:**
   ```bash
   npm run dev
   ```

8. **Manual test cases:**
   - [ ] Add a filter
   - [ ] Change comparator
   - [ ] Enter filter value
   - [ ] Verify filtered results
   - [ ] Remove filter
   - [ ] Add multiple filters
   - [ ] Change filter target
   - [ ] Clear all filters

## Common Issues

### "Cannot find module 'apgu-filters'"

**Solution:**
```bash
# Rebuild core package
cd packages/apgu-filters
npm run build

# Re-link if using npm link
npm link

# In test project
npm link apgu-filters
```

### "Types not found"

**Solution:**
```bash
# Make sure TypeScript declarations are generated
cd packages/apgu-filters
npm run build

# Check dist/index.d.ts exists
ls dist/index.d.ts
```

### CLI not finding templates

**Solution:**
```bash
# Make sure templates are included in build
cd packages/cli
ls templates/  # Should show filters/

# Check package.json includes templates
cat package.json | grep -A 3 '"files"'
# Should include "templates"

# If using npm link, make sure to link after building
npm run build
npm link
```

### "Cannot find '@/components/ui/button'"

This is expected in the monorepo! The templates are meant to be copied into a user's project that has shadcn set up. In the monorepo, these imports won't resolve.

**Solution:** Only test templates in an actual project with shadcn installed.

### Changes not reflecting

**Solution:**
```bash
# Make sure watch mode is running
npm run dev:core
# or
npm run dev:cli

# If not using watch mode, rebuild after changes
npm run build
```

## Quick Test Script

Create `test.sh` in root:

```bash
#!/bin/bash

echo "🧪 Testing apgu-filters..."

# Build packages
echo "📦 Building packages..."
npm run build

# Check core build
if [ ! -f "packages/apgu-filters/dist/index.js" ]; then
  echo "❌ Core build failed"
  exit 1
fi
echo "✅ Core package built"

# Check CLI build
if [ ! -f "packages/cli/dist/index.js" ]; then
  echo "❌ CLI build failed"
  exit 1
fi
echo "✅ CLI package built"

# Check templates exist
if [ ! -d "packages/cli/templates/filters/basic" ]; then
  echo "❌ Basic template missing"
  exit 1
fi
echo "✅ Templates present"

echo "✨ All checks passed!"
```

Run it:
```bash
chmod +x test.sh
./test.sh
```

## Debugging Tips

### Debug Core Library

Add console.logs in your hooks:

```tsx
// packages/apgu-filters/src/hooks/use-filters-context.ts
export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  console.log("🔍 Context:", context);
  return context;
};
```

### Debug CLI

Add console.logs in CLI commands:

```tsx
// packages/cli/src/commands/add.ts
export async function add(component?: string) {
  console.log("🔍 Component:", component);
  console.log("🔍 Templates dir:", templatesDir);
  // ...
}
```

### Debug Templates

In your test project, add logs to scaffolded components:

```tsx
// src/components/filters/filters.tsx
export function Filters() {
  const context = useFiltersContext();
  console.log("🔍 Predicates:", context.predicates);
  // ...
}
```

## Next Steps

Once everything works locally:

1. Update version numbers
2. Write CHANGELOG.md
3. Test with Verdaccio (local npm registry)
4. Publish to npm:
   ```bash
   cd packages/apgu-filters
   npm publish

   cd ../cli
   npm publish
   ```
