import { Comparable, Ordered, StringLike } from "../lib/types";
import { createComparator as cc } from "../lib/utils";

export const WeakEquals = cc<Comparable, Comparable>({
  id: "weak-equals",
  evaluate: ({ filterValue, rowValue }) => rowValue == filterValue
})({ label: "Equals (loose)" });

export const Equals = cc<Comparable, Comparable>({
  id: "equals",
  evaluate: ({ filterValue, rowValue }) => rowValue === filterValue
})({ label: "Equals" });

export const NotWeakEquals = cc<Comparable, Comparable>({
  id: "not-weak-equals",
  evaluate: ({ filterValue, rowValue }) => rowValue != filterValue
})({ label: "Not equals (loose)" });

export const NotEquals = cc<Comparable, Comparable>({
  id: "not-equals",
  evaluate: ({ filterValue, rowValue }) => rowValue !== filterValue
})({ label: "Not equals" });

export const GreaterThanOrEqual = cc<Ordered, Ordered>({
  id: "greater-than-or-equal",
  evaluate: ({ filterValue, rowValue }) => rowValue >= filterValue
})({ label: "Greater than or equal to" });

export const LessThanOrEqual = cc<Ordered, Ordered>({
  id: "less-than-or-equal",
  evaluate: ({ filterValue, rowValue }) => rowValue <= filterValue
})({ label: "Less than or equal to" });

export const GreaterThan = cc<Ordered, Ordered>({
  id: "greater-than",
  evaluate: ({ filterValue, rowValue }) => rowValue > filterValue
})({ label: "Greater than" });

export const LessThan = cc<Ordered, Ordered>({
  id: "less-than",
  evaluate: ({ filterValue, rowValue }) => rowValue < filterValue
})({ label: "Less than" });

export const Includes = cc<Comparable, Comparable[]>({
  id: "includes",
  evaluate: ({ filterValue, rowValue }) => filterValue.includes(rowValue)
})({ label: "Is one of" });

export const IncludesAll = cc<Comparable[], Comparable[]>({
  id: "includes-all",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.every((item) => rowValue.includes(item))
})({ label: "Contains all of" });

export const NotIncludesAll = cc<Comparable[], Comparable[]>({
  id: "not-includes-all",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.every((item) => rowValue.includes(item))
})({ label: "Does not contain all of" });

export const NotIncludes = cc<Comparable, Comparable[]>({
  id: "not-includes",
  evaluate: ({ filterValue, rowValue }) => !filterValue.includes(rowValue)
})({ label: "Is none of" });

export const IncludesAny = cc<Comparable[], Comparable[]>({
  id: "includes-any",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.some((val) => rowValue.includes(val))
})({ label: "Contains any of" });

export const NotIncludesAny = cc<Comparable[], Comparable[]>({
  id: "not-includes-any",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.some((val) => rowValue.includes(val))
})({ label: "Contains none of" });

export const InRangeInclusive = cc<Ordered, { min: Ordered; max: Ordered }>({
  id: "in-range-inclusive",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue >= filterValue.min && rowValue <= filterValue.max
})({ label: "Between (inclusive)" });

export const InRangeExclusive = cc<Ordered, { min: Ordered; max: Ordered }>({
  id: "in-range-exclusive",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue > filterValue.min && rowValue < filterValue.max
})({ label: "Between (exclusive)" });

export const NotInRangeInclusive = cc<Ordered, { min: Ordered; max: Ordered }>({
  id: "not-in-range-inclusive",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue < filterValue.min || rowValue > filterValue.max
})({ label: "Outside of (inclusive)" });

export const NotInRangeExclusive = cc<Ordered, { min: Ordered; max: Ordered }>({
  id: "not-in-range-exclusive",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue <= filterValue.min || rowValue >= filterValue.max
})({ label: "Outside of (exclusive)" });

export const InAnyRangesInclusive = cc<Ordered, [min: Ordered, max: Ordered][]>(
  {
    id: "in-any-ranges-inclusive",
    evaluate: ({ filterValue, rowValue }) =>
      filterValue.some((range) => rowValue >= range[0] && rowValue <= range[1])
  }
)({ label: "In any range (inclusive)" });

export const InAnyRangesExclusive = cc<Ordered, [min: Ordered, max: Ordered][]>(
  {
    id: "in-any-ranges-exclusive",
    evaluate: ({ filterValue, rowValue }) =>
      filterValue.some((range) => rowValue > range[0] && rowValue < range[1])
  }
)({ label: "In any range (exclusive)" });

export const NotInAnyRangesInclusive = cc<
  Ordered,
  [min: Ordered, max: Ordered][]
>({
  id: "not-in-any-ranges-inclusive",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.some((range) => rowValue >= range[0] && rowValue <= range[1])
})({ label: "Not in any range (inclusive)" });

export const NotInAnyRangesExclusive = cc<
  Ordered,
  [min: Ordered, max: Ordered][]
>({
  id: "not-in-any-ranges-exclusive",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.some((range) => rowValue > range[0] && rowValue < range[1])
})({ label: "Not in any range (exclusive)" });

export const InAllRangesInclusive = cc<Ordered, [min: Ordered, max: Ordered][]>(
  {
    id: "in-all-ranges-inclusive",
    evaluate: ({ filterValue, rowValue }) =>
      filterValue.every((range) => rowValue >= range[0] && rowValue <= range[1])
  }
)({ label: "In all ranges (inclusive)" });

export const InAllRangesExclusive = cc<Ordered, [min: Ordered, max: Ordered][]>(
  {
    id: "in-all-ranges-exclusive",
    evaluate: ({ filterValue, rowValue }) =>
      filterValue.every((range) => rowValue > range[0] && rowValue < range[1])
  }
)({ label: "In all ranges (exclusive)" });

export const NotInAllRangesInclusive = cc<
  Ordered,
  [min: Ordered, max: Ordered][]
>({
  id: "not-in-all-ranges-inclusive",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.every((range) => rowValue >= range[0] && rowValue <= range[1])
})({ label: "Not in all ranges (inclusive)" });

export const NotInAllRangesExclusive = cc<
  Ordered,
  [min: Ordered, max: Ordered][]
>({
  id: "not-in-all-ranges-exclusive",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.every((range) => rowValue > range[0] && rowValue < range[1])
})({ label: "Not in all ranges (exclusive)" });

export const StartsWithCaseInsensitive = cc<StringLike, string>({
  id: "starts-with-case-insensitive",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().startsWith(filterValue.toLowerCase())
})({ label: "Starts with" });

export const NotStartsWithCaseInsensitive = cc<StringLike, string>({
  id: "not-starts-with-case-insensitive",
  evaluate: ({ filterValue, rowValue }) =>
    !rowValue.toLowerCase().startsWith(filterValue.toLowerCase())
})({ label: "Does not start with" });

export const StartsWithCaseSensitive = cc<StringLike, string>({
  id: "starts-with-case-sensitive",
  evaluate: ({ filterValue, rowValue }) => rowValue.startsWith(filterValue)
})({ label: "Starts with (case sensitive)" });

export const NotStartsWithCaseSensitive = cc<StringLike, string>({
  id: "not-starts-with-case-sensitive",
  evaluate: ({ filterValue, rowValue }) => !rowValue.startsWith(filterValue)
})({ label: "Does not start with (case sensitive)" });

export const EndsWithCaseInsensitive = cc<StringLike, string>({
  id: "ends-with-case-insensitive",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().endsWith(filterValue.toLowerCase())
})({ label: "Ends with" });

export const NotEndsWithCaseInsensitive = cc<StringLike, string>({
  id: "not-ends-with-case-insensitive",
  evaluate: ({ filterValue, rowValue }) =>
    !rowValue.toLowerCase().endsWith(filterValue.toLowerCase())
})({ label: "Does not end with" });

export const EndsWithCaseSensitive = cc<StringLike, string>({
  id: "ends-with-case-sensitive",
  evaluate: ({ filterValue, rowValue }) => rowValue.endsWith(filterValue)
})({ label: "Ends with (case sensitive)" });

export const NotEndsWithCaseSensitive = cc<StringLike, string>({
  id: "not-ends-with-case-sensitive",
  evaluate: ({ filterValue, rowValue }) => !rowValue.endsWith(filterValue)
})({ label: "Does not end with (case sensitive)" });

export const ContainsCaseSensitive = cc<StringLike, string>({
  id: "contains-case-sensitive",
  evaluate: ({ filterValue, rowValue }) => rowValue.includes(filterValue)
})({ label: "Contains (case sensitive)" });

export const NotContainsCaseSensitive = cc<StringLike, string>({
  id: "not-contains-case-sensitive",
  evaluate: ({ filterValue, rowValue }) => !rowValue.includes(filterValue)
})({ label: "Does not contain (case sensitive)" });

export const ContainsCaseInsensitive = cc<StringLike, string>({
  id: "contains-case-insensitive",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().includes(filterValue.toLowerCase())
})({ label: "Contains" });

export const NotContainsCaseInsensitive = cc<StringLike, string>({
  id: "not-contains-case-insensitive",
  evaluate: ({ filterValue, rowValue }) =>
    !rowValue.toLowerCase().includes(filterValue.toLowerCase())
})({ label: "Does not contain" });

export const Matches = cc<StringLike, RegExp>({
  id: "matches",
  evaluate: ({ filterValue, rowValue }) => filterValue.test(rowValue)
})({ label: "Matches regex" });

export const NotMatches = cc<StringLike, RegExp>({
  id: "not-matches",
  evaluate: ({ filterValue, rowValue }) => !filterValue.test(rowValue)
})({ label: "Does not match regex" });

export const IsTrue = cc<boolean, never>({
  id: "is-true",
  evaluate: ({ rowValue }) => rowValue === true
})({ label: "Is true" });

export const IsFalse = cc<boolean, never>({
  id: "is-false",
  evaluate: ({ rowValue }) => rowValue === false
})({ label: "Is false" });
