import * as Comparators from "./comparators";
import { createPredicate as cp } from "../lib/utils";

// ============================================================================
// String Predicates
// ============================================================================

/**
 * ! ISSUE:
 * Typescript expects that all predicates share string | RegExp
 * instead of being either a string or a RegExp
 */

export const StringPredicate = cp({
  id: "string",
  comparators: [
    Comparators.ContainsCaseInsensitive(),
    Comparators.NotContainsCaseInsensitive(),
    Comparators.EndsWithCaseInsensitive(),
    Comparators.NotEndsWithCaseInsensitive(),
    Comparators.StartsWithCaseInsensitive(),
    Comparators.Equals(),
    Comparators.NotEquals()
  ] as const,
  defaultComparator: "contains-case-insensitive",
  defaultValue: ""
})({});

// ============================================================================
// Number Predicates
// ============================================================================

export const NumberPredicate = cp<number, number>({
  id: "number",
  comparators: [
    Comparators.Equals(),
    Comparators.NotEquals(),
    Comparators.GreaterThan(),
    Comparators.GreaterThanOrEqual(),
    Comparators.LessThan(),
    Comparators.LessThanOrEqual()
  ] as const,
  defaultComparator: "equals",
  defaultValue: 0
})({});

export const NumberRangePredicate = cp<
  number,
  { min: number; max: number }
>({
  id: "number-range",
  comparators: [
    Comparators.InRangeInclusive(),
    Comparators.InRangeExclusive(),
    Comparators.NotInRangeInclusive()
  ] as const,
  defaultComparator: "in-range-inclusive",
  defaultValue: { min: 0, max: 100 }
})({});

// ============================================================================
// Date Predicates
// ============================================================================

export const DatePredicate = cp<Date, Date>({
  id: "date",
  comparators: [
    Comparators.Equals(),
    Comparators.NotEquals(),
    Comparators.LessThan(),
    Comparators.GreaterThan(),
    Comparators.LessThanOrEqual(),
    Comparators.GreaterThanOrEqual()
  ] as const,
  defaultComparator: "equals",
  defaultValue: new Date()
})({});

export const DateRangePredicate = cp<
  Date,
  { min: Date; max: Date }
>({
  id: "date-range",
  comparators: [
    Comparators.InRangeInclusive(),
    Comparators.InRangeExclusive(),
    Comparators.NotInRangeInclusive()
  ] as const,
  defaultComparator: "in-range-inclusive",
  defaultValue: {
    min: new Date(),
    max: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  }
})({});

export const DateRelativePredicate = cp<Date, Date | never>({
  id: "date-relative",
  comparators: [
    Comparators.LessThan(),
    Comparators.GreaterThan()
  ] as const,
  defaultComparator: "less-than",
  defaultValue: new Date()
})({});

// ============================================================================
// Boolean Predicate
// ============================================================================

export const BooleanPredicate = cp<boolean, boolean>({
  id: "boolean",
  comparators: [
    Comparators.Equals(),
    Comparators.NotEquals()
  ] as const,
  defaultComparator: "equals",
  defaultValue: true
})({});

// ============================================================================
// Select Predicates (Single & Multi)
// ============================================================================

export const SelectPredicate = cp<
  string,
  string[],
  { options: { value: string; label: string }[] }
>({
  id: "select",
  comparators: [
    Comparators.Includes(),
    Comparators.NotIncludes()
  ] as const,
  defaultComparator: "includes",
  defaultValue: []
})({});

export const MultiSelectPredicate = cp<
  string[],
  string[],
  { options: { value: string; label: string }[] }
>({
  id: "multi-select",
  comparators: [
    Comparators.IncludesAny(),
    Comparators.IncludesAll(),
    Comparators.NotIncludesAll(),
    Comparators.NotIncludesAny()
  ] as const,
  defaultComparator: "includes-any",
  defaultValue: []
})({});
