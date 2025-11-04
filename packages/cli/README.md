# @apgu-filters/cli

CLI tool to scaffold apgu-filters components into your project.

## Usage

### Initialize

```bash
npx @apgu-filters/cli init
```

Guides you through installing the core `apgu-filters` package.

### Add Components

```bash
npx @apgu-filters/cli add basic
npx @apgu-filters/cli add admin
```

Copies component templates into your project.

### Custom Path

```bash
npx @apgu-filters/cli add basic --path ./src/features/filters
```

## Available Components

### basic

Simple filter component with basic styling.

**Required shadcn components:**
- button
- select

### admin

Advanced filter components with predicates and comparators.

**Required shadcn components:**
- button
- select
- input

## How It Works

The CLI copies template files into your project. These templates:
- Import hooks from `apgu-filters` (core package)
- Import UI components from `@/components/ui/*` (YOUR shadcn components)
- Use YOUR Tailwind classes

This means you have full control and ownership of the components.

## License

MIT
