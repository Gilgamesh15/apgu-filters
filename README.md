Here we capture the type to ensure type safety of the id

```ts
export type PredicateDef<
  TFieldType = any,
  TFilterValue = any,
  TComparatorExtraProps extends object = {
    label: string;
  },
  // NOTE: We catch TComparators to then be able to call TComparators[number]["id"]
  // instead of just string
  TComparators extends Comparator<
    TFieldType,
    TFilterValue,
    TComparatorExtraProps
  >[] = Comparator<TFieldType, TFilterValue, TComparatorExtraProps>[]
> = {
  // Available comparators for this predicate type
  comparators: TComparators;

  // Default configuration
  defaultComparator: TComparators[number]["id"]; // ID of the default comparator
  defaultValue: TFilterValue;
};
```

We use this util for predicate creation

Util:

```ts
import { Comparator, PredicateDef, PredicateInstance } from "./types";

export const createPredicate = <
  TFieldType = any,
  TFilterValue = any,
  TRestProps extends object = {},
  TComparatorExtraProps extends object = { label: string },
  TComparators extends Comparator<
    TFieldType,
    TFilterValue,
    TComparatorExtraProps
  >[] = Comparator<TFieldType, TFilterValue, TComparatorExtraProps>[]
>(
  predicateDef: PredicateDef<
    TFieldType,
    TFilterValue,
    TComparatorExtraProps,
    TComparators
  >
) => {
  return ({
    field,
    ...restProps
  }: {
    field: string;
  } & TRestProps): PredicateInstance<
    TFieldType,
    TFilterValue,
    TComparatorExtraProps,
    TComparators
  > => {
    return {
      field,
      def: predicateDef,
      ...(restProps as TRestProps)
    };
  };
};
```

It allows later to append additional runtime data during usage of the pedicate instead of expecting specifics to be defined during definiton

```ts
 SelectPredicate({
          fieldId: "status",
          label: "Status",
          options: [
            { label: "Pending", value: "pending" },
            { label: "Shipped", value: "shipped" },
            { label: "Delivered", value: "delivered" },
            { label: "Cancelled", value: "cancelled" }
          ]
        }),
```

However when we define two comparators of different types

```ts
/// string to string
export const StartsWith: Comparator<string, string> = {
  id: "startsWith",
  label: "Starts With",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().startsWith(filterValue.toLowerCase())
};

// string to regex
export const Matches: Comparator<string, RegExp> = {
  id: "matches",
  label: "Matches",
  evaluate: ({ filterValue, rowValue }) => {
    if (typeof filterValue === "string") {
      const regex = new RegExp(filterValue, "i");
      return regex.test(rowValue);
    }
    return false;
  }
};
```

It will produce the following issue:
**Typescript expects that all predicates share string | RegExp
instead of being either a string or a RegExp**

```ts
/**
 * Type 'Comparator<string, string>' is not assignable to type 'Comparator<string, string | RegExp, { label: string; }>'.
 *  Type 'Comparator<string, string>' is not assignable to type '{ id: string; evaluate: (args: { filterValue: string | RegExp; rowValue: string; }) => boolean; }'.
 *    Types of property 'evaluate' are incompatible.
 *      Type '(args: { filterValue: string; rowValue: string; }) => boolean' is not assignable to type '(args: { filterValue: string | RegExp; rowValue: string; }) => boolean'.
 *        Types of parameters 'args' and 'args' are incompatible.
 *          Type '{ filterValue: string | RegExp; rowValue: string; }' is not assignable to type '{ filterValue: string; rowValue: string; }'.
 *            Types of property 'filterValue' are incompatible.
 *              Type 'string | RegExp' is not assignable to type 'string'.
 *                Type 'RegExp' is not assignable to type 'string'.ts(2322)
 * */
export const StringPredicate = createPredicate<string, string | RegExp>({
  comparators: [
    Comparators.Contains,
    Comparators.NotContains,
    Comparators.EndsWith,
    Comparators.StartsWith,
    Comparators.Equals,
    Comparators.NotEquals,
    Comparators.Matches
  ],
  defaultComparator: "contains",
  defaultValue: ""
});
```
