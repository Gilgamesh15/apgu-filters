import * as Comparators from "./comparators";
import { createPredicate } from "../lib/utils";

// ============================================================================
// String Predicates
// ============================================================================

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

// ============================================================================
// Number Predicates
// ============================================================================

export const NumberPredicate = createPredicate<number, number>({
  comparators: [
    Comparators.Equals,
    Comparators.NotEquals,
    Comparators.GreaterThan,
    Comparators.GreaterOrEqual,
    Comparators.LessThan,
    Comparators.LessOrEqual
  ],
  defaultComparator: "equals",
  defaultValue: 0
});

export const NumberRangePredicate = createPredicate<
  number,
  { min: number; max: number }
>({
  comparators: [
    Comparators.Between,
    Comparators.BetweenExclusive,
    Comparators.Outside
  ],
  defaultComparator: "between",
  defaultValue: { min: 0, max: 100 }
});

// ============================================================================
// Date Predicates
// ============================================================================

export const DatePredicate = createPredicate<Date, Date>({
  comparators: [
    Comparators.Equals,
    Comparators.NotEquals,
    Comparators.IsBefore,
    Comparators.IsAfter,
    Comparators.IsOnOrBefore,
    Comparators.IsOnOrAfter
  ],
  defaultComparator: "equals",
  defaultValue: new Date()
});

export const DateRangePredicate = createPredicate<
  Date,
  { min: Date; max: Date }
>({
  comparators: [
    Comparators.Between,
    Comparators.BetweenExclusive,
    Comparators.Outside
  ],
  defaultComparator: "between",
  defaultValue: {
    min: new Date(),
    max: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  }
});

export const DateRelativePredicate = createPredicate<Date, Date | never>({
  comparators: [Comparators.IsBefore, Comparators.IsAfter],
  defaultComparator: "isToday",
  defaultValue: new Date()
});

// ============================================================================
// Boolean Predicate
// ============================================================================

export const BooleanPredicate = createPredicate<boolean, boolean>({
  comparators: [Comparators.Equals, Comparators.NotEquals],
  defaultComparator: "equals",
  defaultValue: true
});

// ============================================================================
// Select Predicates (Single & Multi)
// ============================================================================

export const Select = createPredicate<
  string,
  string[],
  { options: { value: string; label: string }[] }
>({
  comparators: [Comparators.IsOneOf, Comparators.IsNoneOf],
  defaultComparator: "isOneOf",
  defaultValue: []
});

export const MultiSelect = createPredicate<
  string[],
  string[],
  { options: { value: string; label: string }[] }
>({
  comparators: [
    Comparators.ArrayContainsAny,
    Comparators.ArrayContainsAll,
    Comparators.ArrayNotContainsAll,
    Comparators.ArrayNotContainsAny
  ],
  defaultComparator: "containsAny",
  defaultValue: []
});
