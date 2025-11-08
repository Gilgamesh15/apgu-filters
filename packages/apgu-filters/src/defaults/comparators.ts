import { Comparator } from "../lib/comparator";
import { Comparable, Ordered, StringLike } from "../lib/types";

export const WeakEquals = Comparator.create<Comparable, Comparable>()
  .id("weak-equals")
  .evaluate(({ filter, value }) => value == filter)
  .meta({ label: "Equals (loose)" });

export const Equals = Comparator.create<Comparable, Comparable>()
  .id("equals")
  .evaluate(({ filter, value }) => value === filter)
  .meta({ label: "Equals" });

export const NotWeakEquals = Comparator.create<Comparable, Comparable>()
  .id("not-weak-equals")
  .evaluate(({ filter, value }) => value != filter)
  .meta({ label: "Not equals (loose)" });

export const NotEquals = Comparator.create<Comparable, Comparable>()
  .id("not-equals")
  .evaluate(({ filter, value }) => value !== filter)
  .meta({ label: "Not equals" });

export const GreaterThanOrEqual = Comparator.create<Ordered, Ordered>()
  .id("greater-than-or-equal")
  .evaluate(({ filter, value }) => value >= filter)
  .meta({ label: "Greater than or equal to" });

export const LessThanOrEqual = Comparator.create<Ordered, Ordered>()
  .id("less-than-or-equal")
  .evaluate(({ filter, value }) => value <= filter)
  .meta({ label: "Less than or equal to" });

export const GreaterThan = Comparator.create<Ordered, Ordered>()
  .id("greater-than")
  .evaluate(({ filter, value }) => value > filter)
  .meta({ label: "Greater than" });

export const LessThan = Comparator.create<Ordered, Ordered>()
  .id("less-than")
  .evaluate(({ filter, value }) => value < filter)
  .meta({ label: "Less than" });

export const Includes = Comparator.create<Comparable, Comparable[]>()
  .id("includes")
  .evaluate(({ filter, value }) => filter.includes(value))
  .meta({ label: "Is one of" });

export const IncludesAll = Comparator.create<Comparable[], Comparable[]>()
  .id("includes-all")
  .evaluate(({ filter, value }) => filter.every((item) => value.includes(item)))
  .meta({ label: "Contains all of" });

export const NotIncludesAll = Comparator.create<Comparable[], Comparable[]>()
  .id("not-includes-all")
  .evaluate(
    ({ filter, value }) => !filter.every((item) => value.includes(item))
  )
  .meta({ label: "Does not contain all of" });

export const NotIncludes = Comparator.create<Comparable, Comparable[]>()
  .id("not-includes")
  .evaluate(({ filter, value }) => !filter.includes(value))
  .meta({ label: "Is none of" });

export const IncludesAny = Comparator.create<Comparable[], Comparable[]>()
  .id("includes-any")
  .evaluate(({ filter, value }) => filter.some((val) => value.includes(val)))
  .meta({ label: "Contains any of" });

export const NotIncludesAny = Comparator.create<Comparable[], Comparable[]>()
  .id("not-includes-any")
  .evaluate(({ filter, value }) => !filter.some((val) => value.includes(val)))
  .meta({ label: "Contains none of" });

export const InRangeInclusive = Comparator.create<
  Ordered,
  { min: Ordered; max: Ordered }
>()
  .id("in-range-inclusive")
  .evaluate(({ filter, value }) => value >= filter.min && value <= filter.max)
  .meta({ label: "Between (inclusive)" });

export const InRangeExclusive = Comparator.create<
  Ordered,
  { min: Ordered; max: Ordered }
>()
  .id("in-range-exclusive")
  .evaluate(({ filter, value }) => value > filter.min && value < filter.max)
  .meta({ label: "Between (exclusive)" });

export const NotInRangeInclusive = Comparator.create<
  Ordered,
  { min: Ordered; max: Ordered }
>()
  .id("not-in-range-inclusive")
  .evaluate(({ filter, value }) => value < filter.min || value > filter.max)
  .meta({ label: "Outside of (inclusive)" });

export const NotInRangeExclusive = Comparator.create<
  Ordered,
  { min: Ordered; max: Ordered }
>()
  .id("not-in-range-exclusive")
  .evaluate(({ filter, value }) => value <= filter.min || value >= filter.max)
  .meta({ label: "Outside of (exclusive)" });

export const InAnyRangesInclusive = Comparator.create<
  Ordered,
  [min: Ordered, max: Ordered][]
>()
  .id("in-any-ranges-inclusive")
  .evaluate(({ filter, value }) =>
    filter.some((range) => value >= range[0] && value <= range[1])
  )
  .meta({ label: "In any range (inclusive)" });

export const InAnyRangesExclusive = Comparator.create<
  Ordered,
  [min: Ordered, max: Ordered][]
>()
  .id("in-any-ranges-exclusive")
  .evaluate(({ filter, value }) =>
    filter.some((range) => value > range[0] && value < range[1])
  )
  .meta({ label: "In any range (exclusive)" });

export const NotInAnyRangesInclusive = Comparator.create<
  Ordered,
  [min: Ordered, max: Ordered][]
>()
  .id("not-in-any-ranges-inclusive")
  .evaluate(
    ({ filter, value }) =>
      !filter.some((range) => value >= range[0] && value <= range[1])
  )
  .meta({ label: "Not in any range (inclusive)" });

export const NotInAnyRangesExclusive = Comparator.create<
  Ordered,
  [min: Ordered, max: Ordered][]
>()
  .id("not-in-any-ranges-exclusive")
  .evaluate(
    ({ filter, value }) =>
      !filter.some((range) => value > range[0] && value < range[1])
  )
  .meta({ label: "Not in any range (exclusive)" });

export const InAllRangesInclusive = Comparator.create<
  Ordered,
  [min: Ordered, max: Ordered][]
>()
  .id("in-all-ranges-inclusive")
  .evaluate(({ filter, value }) =>
    filter.every((range) => value >= range[0] && value <= range[1])
  )
  .meta({ label: "In all ranges (inclusive)" });

export const InAllRangesExclusive = Comparator.create<
  Ordered,
  [min: Ordered, max: Ordered][]
>()
  .id("in-all-ranges-exclusive")
  .evaluate(({ filter, value }) =>
    filter.every((range) => value > range[0] && value < range[1])
  )
  .meta({ label: "In all ranges (exclusive)" });

export const NotInAllRangesInclusive = Comparator.create<
  Ordered,
  [min: Ordered, max: Ordered][]
>()
  .id("not-in-all-ranges-inclusive")
  .evaluate(
    ({ filter, value }) =>
      !filter.every((range) => value >= range[0] && value <= range[1])
  )
  .meta({ label: "Not in all ranges (inclusive)" });

export const NotInAllRangesExclusive = Comparator.create<
  Ordered,
  [min: Ordered, max: Ordered][]
>()
  .id("not-in-all-ranges-exclusive")
  .evaluate(
    ({ filter, value }) =>
      !filter.every((range) => value > range[0] && value < range[1])
  )
  .meta({ label: "Not in all ranges (exclusive)" });

export const StartsWithCaseInsensitive = Comparator.create<StringLike, string>()
  .id("starts-with-case-insensitive")
  .evaluate(({ filter, value }) =>
    value.toLowerCase().startsWith(filter.toLowerCase())
  )
  .meta({ label: "Starts with" });

export const NotStartsWithCaseInsensitive = Comparator.create<
  StringLike,
  string
>()
  .id("not-starts-with-case-insensitive")
  .evaluate(
    ({ filter, value }) => !value.toLowerCase().startsWith(filter.toLowerCase())
  )
  .meta({ label: "Does not start with" });

export const StartsWithCaseSensitive = Comparator.create<StringLike, string>()
  .id("starts-with-case-sensitive")
  .evaluate(({ filter, value }) => value.startsWith(filter))
  .meta({ label: "Starts with (case sensitive)" });

export const NotStartsWithCaseSensitive = Comparator.create<
  StringLike,
  string
>()
  .id("not-starts-with-case-sensitive")
  .evaluate(({ filter, value }) => !value.startsWith(filter))
  .meta({ label: "Does not start with (case sensitive)" });

export const EndsWithCaseInsensitive = Comparator.create<StringLike, string>()
  .id("ends-with-case-insensitive")
  .evaluate(({ filter, value }) =>
    value.toLowerCase().endsWith(filter.toLowerCase())
  )
  .meta({ label: "Ends with" });

export const NotEndsWithCaseInsensitive = Comparator.create<
  StringLike,
  string
>()
  .id("not-ends-with-case-insensitive")
  .evaluate(
    ({ filter, value }) => !value.toLowerCase().endsWith(filter.toLowerCase())
  )
  .meta({ label: "Does not end with" });

export const EndsWithCaseSensitive = Comparator.create<StringLike, string>()
  .id("ends-with-case-sensitive")
  .evaluate(({ filter, value }) => value.endsWith(filter))
  .meta({ label: "Ends with (case sensitive)" });

export const NotEndsWithCaseSensitive = Comparator.create<StringLike, string>()
  .id("not-ends-with-case-sensitive")
  .evaluate(({ filter, value }) => !value.endsWith(filter))
  .meta({ label: "Does not end with (case sensitive)" });

export const ContainsCaseSensitive = Comparator.create<StringLike, string>()
  .id("contains-case-sensitive")
  .evaluate(({ filter, value }) => value.includes(filter))
  .meta({ label: "Contains (case sensitive)" });

export const NotContainsCaseSensitive = Comparator.create<StringLike, string>()
  .id("not-contains-case-sensitive")
  .evaluate(({ filter, value }) => !value.includes(filter))
  .meta({ label: "Does not contain (case sensitive)" });

export const ContainsCaseInsensitive = Comparator.create<StringLike, string>()
  .id("contains-case-insensitive")
  .evaluate(({ filter, value }) =>
    value.toLowerCase().includes(filter.toLowerCase())
  )
  .meta({ label: "Contains" });

export const NotContainsCaseInsensitive = Comparator.create<
  StringLike,
  string
>()
  .id("not-contains-case-insensitive")
  .evaluate(
    ({ filter, value }) => !value.toLowerCase().includes(filter.toLowerCase())
  )
  .meta({ label: "Does not contain" });

export const Matches = Comparator.create<StringLike, RegExp>()
  .id("matches")
  .evaluate(({ filter, value }) => filter.test(value))
  .meta({ label: "Matches regex" });

export const NotMatches = Comparator.create<StringLike, RegExp>()
  .id("not-matches")
  .evaluate(({ filter, value }) => !filter.test(value))
  .meta({ label: "Does not match regex" });

export const IsTrue = Comparator.create<boolean, never>()
  .id("is-true")
  .evaluate(({ value }) => value === true)
  .meta({ label: "Is true" });

export const IsFalse = Comparator.create<boolean, never>()
  .id("is-false")
  .evaluate(({ value }) => value === false)
  .meta({ label: "Is false" });
