import * as Comparators from "./comparators";
import { Predicate } from "../lib/predicate";
import { ComparatorInstance } from "../lib/comparator";

// ============================================================================
// String Predicates
// ============================================================================

/**
 * ! ISSUE:
 * Typescript expects that all predicates share string | RegExp
 * instead of being either a string or a RegExp
 */

export const StringPredicate = Predicate.create<string, string>()
  .id("string")
  .comparators(
    Comparators.ContainsCaseInsensitive.instantiate(),
    Comparators.NotContainsCaseInsensitive.instantiate(),
    Comparators.EndsWithCaseInsensitive.instantiate(),
    Comparators.NotEndsWithCaseInsensitive.instantiate(),
    Comparators.StartsWithCaseInsensitive.instantiate(),
    Comparators.Equals.instantiate(),
    Comparators.NotEquals.instantiate()
  )
  .defaultComparatorId("contains-case-insensitive")
  .defaultValue("");

// ============================================================================
// Number Predicates
// ============================================================================

export const NumberPredicate = Predicate.create<number, number>()
  .id("number")
  .comparators(
    Comparators.Equals.instantiate(),
    Comparators.NotEquals.instantiate(),
    Comparators.GreaterThan.instantiate(),
    Comparators.GreaterThanOrEqual.instantiate(),
    Comparators.LessThan.instantiate(),
    Comparators.LessThanOrEqual.instantiate()
  )
  .defaultComparatorId("equals")
  .defaultValue(0);

export const NumberRangePredicate = Predicate.create<
  number,
  { min: number; max: number }
>()
  .id("number-range")
  .comparators(
    Comparators.InRangeInclusive.instantiate(),
    Comparators.InRangeExclusive.instantiate(),
    Comparators.NotInRangeInclusive.instantiate()
  )
  .defaultComparatorId("in-range-inclusive")
  .defaultValue({ min: 0, max: 100 });

export const DatePredicate = Predicate.create<Date, Date>()
  .id("date")
  .comparators(
    Comparators.Equals.instantiate(),
    Comparators.NotEquals.instantiate(),
    Comparators.LessThan.instantiate(),
    Comparators.GreaterThan.instantiate(),
    Comparators.LessThanOrEqual.instantiate(),
    Comparators.GreaterThanOrEqual.instantiate()
  )
  .defaultComparatorId("equals")
  .defaultValue(new Date())
  .meta({ format: "yyyy-MM-dd" });

export const DateRangePredicate = Predicate.create<
  Date,
  {
    min: Date;
    max: Date;
  }
>()
  .id("date-range")
  .comparators(
    Comparators.InRangeInclusive.instantiate(),
    Comparators.InRangeExclusive.instantiate(),
    Comparators.NotInRangeInclusive.instantiate()
  )
  .defaultComparatorId("in-range-inclusive")
  .defaultValue({
    min: new Date(),
    max: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  });

export const DateRelativePredicate = Predicate.create<Date, Date>()
  .id("date-relative")
  .comparators(
    Comparators.LessThan.instantiate(),
    Comparators.GreaterThan.instantiate()
  )
  .defaultComparatorId("less-than")
  .defaultValue(new Date());

// ============================================================================
// Boolean Predicate
// ============================================================================

export const BooleanPredicate = Predicate.create<boolean, boolean>()
  .id("boolean")
  .comparators(
    Comparators.Equals.instantiate(),
    Comparators.NotEquals.instantiate()
  )
  .defaultComparatorId("equals")
  .defaultValue(true);

// ============================================================================
// Select Predicates (Single & Multi)
// ============================================================================

export const SelectPredicate = Predicate.create<
  string,
  string[],
  {
    options: { value: string; label: string }[];
  }
>()
  .id("select")
  .comparators(
    Comparators.Includes.instantiate(),
    Comparators.NotIncludes.instantiate()
  )
  .defaultComparatorId("includes")
  .defaultValue([]);

export const MultiSelectPredicate = Predicate.create<
  string[],
  string[],
  {
    options: { value: string; label: string }[];
  }
>()
  .id("multi-select")
  .comparators(
    Comparators.IncludesAny.instantiate(),
    Comparators.IncludesAll.instantiate(),
    Comparators.NotIncludesAll.instantiate(),
    Comparators.NotIncludesAny.instantiate()
  )
  .defaultComparatorId("includes-any")
  .defaultValue([]);
