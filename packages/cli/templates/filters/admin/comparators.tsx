import { createComparator } from "apgu-filters";

// Type constraints that express what operations are actually needed
type Equatable = unknown; // Anything can be compared with == or ===
type Comparable = number | string | Date | bigint; // Types that support >, <, >=, <=
type Stringlike = string | { toString(): string }; // Types that can be treated as strings
type Emptyable = unknown; // Anything can be checked for emptiness

// Equality comparators work on anything
export const WeakEquals = createComparator<Equatable, Equatable>({
  id: "equals",
  label: "Equals",
  evaluate: ({ filterValue, rowValue }) => {
    return filterValue == rowValue;
  }
});

export const Equals = createComparator<Equatable, Equatable>({
  id: "equals",
  label: "Equals",
  evaluate: ({ filterValue, rowValue }) => {
    return filterValue === rowValue;
  }
});

export const NotEquals = createComparator<Equatable, Equatable>({
  id: "not-equals",
  label: "Not Equals",
  evaluate: ({ filterValue, rowValue }) => {
    return filterValue !== rowValue;
  }
});

// Ordering comparators work on comparable types
export const GreaterThan = createComparator<Comparable, Comparable>({
  id: "greater-than",
  label: "Greater Than",
  evaluate: ({ filterValue, rowValue }) => {
    return rowValue > filterValue;
  }
});

export const LessThan = createComparator<Comparable, Comparable>({
  id: "less-than",
  label: "Less Than",
  evaluate: ({ filterValue, rowValue }) => {
    return rowValue < filterValue;
  }
});

export const GreaterThanOrEqual = createComparator<Comparable, Comparable>({
  id: "greater-than-or-equal",
  label: "Greater Than Or Equal",
  evaluate: ({ filterValue, rowValue }) => {
    return rowValue >= filterValue;
  }
});

export const LessThanOrEqual = createComparator<Comparable, Comparable>({
  id: "less-than-or-equal",
  label: "Less Than Or Equal",
  evaluate: ({ filterValue, rowValue }) => {
    return rowValue <= filterValue;
  }
});

export const IsBetween = createComparator<Comparable, [Comparable, Comparable]>({
  id: "is-between",
  label: "Is Between",
  evaluate: ({ filterValue, rowValue }) => {
    const [min, max] = filterValue;
    return rowValue >= min && rowValue <= max;
  }
});

// String-specific comparators
export const Contains = createComparator<Stringlike, Stringlike>({
  id: "contains",
  label: "Contains",
  evaluate: ({ filterValue, rowValue }) => {
    return String(rowValue).includes(String(filterValue));
  }
});

export const StartsWith = createComparator<Stringlike, Stringlike>({
  id: "starts-with",
  label: "Starts With",
  evaluate: ({ filterValue, rowValue }) => {
    return String(rowValue).startsWith(String(filterValue));
  }
});

export const EndsWith = createComparator<Stringlike, Stringlike>({
  id: "ends-with",
  label: "Ends With",
  evaluate: ({ filterValue, rowValue }) => {
    return String(rowValue).endsWith(String(filterValue));
  }
});

// Emptiness checks work on anything
export const IsEmpty = createComparator<Emptyable, null>({
  id: "is-empty",
  label: "Is Empty",
  evaluate: ({ rowValue }) => {
    return rowValue === null || rowValue === undefined || rowValue === "";
  }
});

export const IsNotEmpty = createComparator<Emptyable, null>({
  id: "is-not-empty",
  label: "Is Not Empty",
  evaluate: ({ rowValue }) => {
    return rowValue !== null && rowValue !== undefined && rowValue !== "";
  }
});
