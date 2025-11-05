# Usage Example

This document shows how a user would integrate apgu-filters into their Next.js + shadcn project.

## Step 1: Install Core Library

```bash
npm install apgu-filters
```

## Step 2: Add shadcn Components

```bash
npx shadcn@latest add button select input
```

## Step 3: Scaffold Filter Components

```bash
npx @apgu-filters/cli add admin
```

This creates:
```
src/components/filters/
├── base-components.tsx
├── comparators.tsx
└── string-predicate.tsx
```

## Step 4: Define Your Predicates

Create `src/lib/predicates.ts`:

```tsx
import { StringPredicate } from "@/components/filters/string-predicate";

export const USER_FILTER_PREDICATES = [
  StringPredicate({ field: "name", label: "Name" }),
  StringPredicate({ field: "email", label: "Email" }),
  StringPredicate({ field: "role", label: "Role" }),
];
```

## Step 5: Create Filter UI Component

Create `src/components/user-filters.tsx`:

```tsx
"use client";

import { useFiltersContext } from "apgu-filters";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UserFilters() {
  const {
    predicates,
    removeFilterRule,
    addFilterRule,
    setFilterRuleComparator,
    setFilterRuleTarget,
    setFilterRuleValue,
    getComparator,
    getFilterValue,
    clearFilterRules
  } = useFiltersContext();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {predicates.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilterRules}>
            Clear all
          </Button>
        )}
      </div>

      {/* Add filter button */}
      <Select onValueChange={(field) => addFilterRule({ field })}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Add filter" />
        </SelectTrigger>
        <SelectContent>
          {predicates.map((pred, index) => (
            <SelectItem key={index} value={pred.field}>
              {pred.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Active filters */}
      <div className="space-y-2">
        {predicates.map((pred, index) => {
          const Root = pred.predicateDef.components.Root;
          const Target = pred.predicateDef.components.Target;
          const Comparator = pred.predicateDef.components.Comparator;
          const Input = pred.predicateDef.components.Input;
          const Remove = pred.predicateDef.components.Remove;

          return (
            <Root
              key={index}
              renderTarget={() => (
                <Target
                  field={pred.field}
                  onFieldChange={(field) => setFilterRuleTarget({ index, field })}
                  predicates={predicates}
                />
              )}
              renderComparator={() => (
                <Comparator
                  comparator={getComparator({ index })}
                  onComparatorChange={(comparator) =>
                    setFilterRuleComparator({ index, comparator })
                  }
                  comparators={pred.predicateDef.comparators}
                />
              )}
              renderInput={() => (
                <Input
                  filterValue={getFilterValue({ index })}
                  onFilterValueChange={(value) =>
                    setFilterRuleValue({ index, value })
                  }
                />
              )}
              renderRemove={() => (
                <Remove onRemove={() => removeFilterRule({ index })} />
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
```

## Step 6: Use in Your Page

Create `src/app/users/page.tsx`:

```tsx
"use client";

import { FiltersProvider, useFiltersContext } from "apgu-filters";
import { USER_FILTER_PREDICATES } from "@/lib/predicates";
import { UserFilters } from "@/components/user-filters";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const SAMPLE_USERS: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "admin" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "user" },
  { id: "4", name: "Alice Williams", email: "alice@example.com", role: "admin" },
];

export default function UsersPage() {
  return (
    <FiltersProvider values={SAMPLE_USERS} predicates={USER_FILTER_PREDICATES}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Users</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <aside className="md:col-span-1">
            <UserFilters />
          </aside>

          {/* User list */}
          <main className="md:col-span-3">
            <UserList />
          </main>
        </div>
      </div>
    </FiltersProvider>
  );
}

function UserList() {
  const { filteredValues, values } = useFiltersContext<User>();

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">
        Showing {filteredValues.length} of {values.length} users
      </div>

      <div className="grid gap-4">
        {filteredValues.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-4 hover:bg-accent transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                {user.role}
              </span>
            </div>
          </div>
        ))}

        {filteredValues.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No users match your filters
          </div>
        )}
      </div>
    </div>
  );
}
```

## Advanced: Custom Number Predicate

Create `src/components/filters/number-predicate.tsx`:

```tsx
import { createPredicate } from "apgu-filters";
import { Input } from "@/components/ui/input";
import { Root, Target, Comparator, Remove } from "./base-components";
import {
  Equals,
  NotEquals,
  GreaterThan,
  LessThan,
  GreaterThanOrEqual,
  LessThanOrEqual
} from "./comparators";

export const NumberPredicate = createPredicate<number, number>({
  comparators: [
    Equals(),
    NotEquals(),
    GreaterThan(),
    LessThan(),
    GreaterThanOrEqual(),
    LessThanOrEqual()
  ],
  defaultComparator: "equals",
  defaultValue: 0,
  components: {
    Root,
    Target,
    Comparator,
    Remove,
    Input: ({ filterValue, onFilterValueChange }) => {
      return (
        <Input
          type="number"
          value={filterValue}
          onChange={(e) => onFilterValueChange(Number(e.target.value))}
          placeholder="Enter number..."
          className="w-[200px]"
        />
      );
    }
  }
});
```

Use it:

```tsx
import { StringPredicate } from "@/components/filters/string-predicate";
import { NumberPredicate } from "@/components/filters/number-predicate";

export const PRODUCT_PREDICATES = [
  StringPredicate({ field: "name", label: "Product Name" }),
  NumberPredicate({ field: "price", label: "Price" }),
  NumberPredicate({ field: "stock", label: "Stock" }),
];
```

## Advanced: Date Predicate

Create `src/components/filters/date-predicate.tsx`:

```tsx
import { createPredicate } from "apgu-filters";
import { Input } from "@/components/ui/input";
import { Root, Target, Comparator, Remove } from "./base-components";
import { Equals, GreaterThan, LessThan } from "./comparators";

export const DatePredicate = createPredicate<Date, string>({
  comparators: [
    Equals(),
    GreaterThan(),
    LessThan()
  ],
  defaultComparator: "equals",
  defaultValue: new Date().toISOString().split('T')[0],
  components: {
    Root,
    Target,
    Comparator,
    Remove,
    Input: ({ filterValue, onFilterValueChange }) => {
      return (
        <Input
          type="date"
          value={filterValue}
          onChange={(e) => onFilterValueChange(e.target.value)}
          className="w-[200px]"
        />
      );
    }
  }
});
```

## Complete Feature Example: E-commerce Product Filters

```tsx
// src/lib/product-predicates.ts
import { StringPredicate } from "@/components/filters/string-predicate";
import { NumberPredicate } from "@/components/filters/number-predicate";

export const PRODUCT_PREDICATES = [
  StringPredicate({ field: "name", label: "Product Name" }),
  StringPredicate({ field: "category", label: "Category" }),
  StringPredicate({ field: "brand", label: "Brand" }),
  NumberPredicate({ field: "price", label: "Price ($)" }),
  NumberPredicate({ field: "rating", label: "Rating" }),
];

// src/app/products/page.tsx
"use client";

import { FiltersProvider } from "apgu-filters";
import { PRODUCT_PREDICATES } from "@/lib/product-predicates";
import { ProductFilters } from "@/components/product-filters";
import { ProductGrid } from "@/components/product-grid";

export default function ProductsPage() {
  const products = /* fetch your products */;

  return (
    <FiltersProvider values={products} predicates={PRODUCT_PREDICATES}>
      <div className="container">
        <ProductFilters />
        <ProductGrid />
      </div>
    </FiltersProvider>
  );
}
```

## Key Takeaways

1. **Install once**: `npm install apgu-filters`
2. **Scaffold once**: `npx @apgu-filters/cli add admin`
3. **Customize freely**: Edit the scaffolded components
4. **Use your design**: Components use YOUR shadcn + Tailwind
5. **Full control**: All code lives in your project
