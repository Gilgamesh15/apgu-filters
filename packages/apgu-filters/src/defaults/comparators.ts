import { Comparable, Comparator, Ordered, StringLike } from "../lib/types";

export const WeakEquals: Comparator<Comparable, Comparable> = {
  id: "weak-equals",
  label: "Equals (loose)",
  evaluate: ({ filterValue, rowValue }) => rowValue == filterValue
};

export const Equals: Comparator<Comparable, Comparable> = {
  id: "equals",
  label: "Equals",
  evaluate: ({ filterValue, rowValue }) => rowValue === filterValue
};

export const NotWeakEquals: Comparator<Comparable, Comparable> = {
  id: "not-weak-equals",
  label: "Not equals (loose)",
  evaluate: ({ filterValue, rowValue }) => rowValue != filterValue
};

export const NotEquals: Comparator<Comparable, Comparable> = {
  id: "not-equals",
  label: "Not equals",
  evaluate: ({ filterValue, rowValue }) => rowValue !== filterValue
};

export const GreaterThanOrEqual: Comparator<Ordered, Ordered> = {
  id: "greater-than-or-equal",
  label: "Greater than or equal to",
  evaluate: ({ filterValue, rowValue }) => rowValue >= filterValue
};

export const LessThanOrEqual: Comparator<Ordered, Ordered> = {
  id: "less-than-or-equal",
  label: "Less than or equal to",
  evaluate: ({ filterValue, rowValue }) => rowValue <= filterValue
};

export const GreaterThan: Comparator<Ordered, Ordered> = {
  id: "greater-than",
  label: "Greater than",
  evaluate: ({ filterValue, rowValue }) => rowValue > filterValue
};

export const LessThan: Comparator<Ordered, Ordered> = {
  id: "less-than",
  label: "Less than",
  evaluate: ({ filterValue, rowValue }) => rowValue < filterValue
};

export const Includes: Comparator<Comparable, Comparable[]> = {
  id: "includes",
  label: "Is one of",
  evaluate: ({ filterValue, rowValue }) => filterValue.includes(rowValue)
};

export const IncludesAll: Comparator<Comparable[], Comparable[]> = {
  id: "includes-all",
  label: "Contains all of",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.every((item) => rowValue.includes(item))
};

export const NotIncludesAll: Comparator<Comparable[], Comparable[]> = {
  id: "not-includes-all",
  label: "Does not contain all of",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.every((item) => rowValue.includes(item))
};

export const NotIncludes: Comparator<Comparable, Comparable[]> = {
  id: "not-includes",
  label: "Is none of",
  evaluate: ({ filterValue, rowValue }) => !filterValue.includes(rowValue)
};

export const IncludesAny: Comparator<Comparable[], Comparable[]> = {
  id: "includes-any",
  label: "Contains any of",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.some((val) => rowValue.includes(val))
};

export const NotIncludesAny: Comparator<Comparable[], Comparable[]> = {
  id: "not-includes-any",
  label: "Contains none of",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.some((val) => rowValue.includes(val))
};

export const InRangeInclusive: Comparator<
  Ordered,
  { min: Ordered; max: Ordered }
> = {
  id: "in-range-inclusive",
  label: "Between (inclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue >= filterValue.min && rowValue <= filterValue.max
};

export const InRangeExclusive: Comparator<
  Ordered,
  { min: Ordered; max: Ordered }
> = {
  id: "in-range-exclusive",
  label: "Between (exclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue > filterValue.min && rowValue < filterValue.max
};

export const NotInRangeInclusive: Comparator<
  Ordered,
  { min: Ordered; max: Ordered }
> = {
  id: "not-in-range-inclusive",
  label: "Outside of (inclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue < filterValue.min || rowValue > filterValue.max
};

export const NotInRangeExclusive: Comparator<
  Ordered,
  { min: Ordered; max: Ordered }
> = {
  id: "not-in-range-exclusive",
  label: "Outside of (exclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue <= filterValue.min || rowValue >= filterValue.max
};

export const InAnyRangesInclusive: Comparator<
  Ordered,
  [min: Ordered, max: Ordered][]
> = {
  id: "in-any-ranges-inclusive",
  label: "In any range (inclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.some((range) => rowValue >= range[0] && rowValue <= range[1])
};

export const InAnyRangesExclusive: Comparator<
  Ordered,
  [min: Ordered, max: Ordered][]
> = {
  id: "in-any-ranges-exclusive",
  label: "In any range (exclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.some((range) => rowValue > range[0] && rowValue < range[1])
};

export const NotInAnyRangesInclusive: Comparator<
  Ordered,
  [min: Ordered, max: Ordered][]
> = {
  id: "not-in-any-ranges-inclusive",
  label: "Not in any range (inclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.some((range) => rowValue >= range[0] && rowValue <= range[1])
};

export const NotInAnyRangesExclusive: Comparator<
  Ordered,
  [min: Ordered, max: Ordered][]
> = {
  id: "not-in-any-ranges-exclusive",
  label: "Not in any range (exclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.some((range) => rowValue > range[0] && rowValue < range[1])
};

export const InAllRangesInclusive: Comparator<
  Ordered,
  [min: Ordered, max: Ordered][]
> = {
  id: "in-all-ranges-inclusive",
  label: "In all ranges (inclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.every((range) => rowValue >= range[0] && rowValue <= range[1])
};

export const InAllRangesExclusive: Comparator<
  Ordered,
  [min: Ordered, max: Ordered][]
> = {
  id: "in-all-ranges-exclusive",
  label: "In all ranges (exclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.every((range) => rowValue > range[0] && rowValue < range[1])
};

export const NotInAllRangesInclusive: Comparator<
  Ordered,
  [min: Ordered, max: Ordered][]
> = {
  id: "not-in-all-ranges-inclusive",
  label: "Not in all ranges (inclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.every((range) => rowValue >= range[0] && rowValue <= range[1])
};

export const NotInAllRangesExclusive: Comparator<
  Ordered,
  [min: Ordered, max: Ordered][]
> = {
  id: "not-in-all-ranges-exclusive",
  label: "Not in all ranges (exclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    !filterValue.every((range) => rowValue > range[0] && rowValue < range[1])
};

export const StartsWithCaseInsensitive: Comparator<StringLike, string> = {
  id: "starts-with-case-insensitive",
  label: "Starts with",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().startsWith(filterValue.toLowerCase())
};

export const NotStartsWithCaseInsensitive: Comparator<StringLike, string> = {
  id: "not-starts-with-case-insensitive",
  label: "Does not start with",
  evaluate: ({ filterValue, rowValue }) =>
    !rowValue.toLowerCase().startsWith(filterValue.toLowerCase())
};

export const StartsWithCaseSensitive: Comparator<StringLike, string> = {
  id: "starts-with-case-sensitive",
  label: "Starts with (case sensitive)",
  evaluate: ({ filterValue, rowValue }) => rowValue.startsWith(filterValue)
};

export const NotStartsWithCaseSensitive: Comparator<StringLike, string> = {
  id: "not-starts-with-case-sensitive",
  label: "Does not start with (case sensitive)",
  evaluate: ({ filterValue, rowValue }) => !rowValue.startsWith(filterValue)
};

export const EndsWithCaseInsensitive: Comparator<StringLike, string> = {
  id: "ends-with-case-insensitive",
  label: "Ends with",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().endsWith(filterValue.toLowerCase())
};

export const NotEndsWithCaseInsensitive: Comparator<StringLike, string> = {
  id: "not-ends-with-case-insensitive",
  label: "Does not end with",
  evaluate: ({ filterValue, rowValue }) =>
    !rowValue.toLowerCase().endsWith(filterValue.toLowerCase())
};

export const EndsWithCaseSensitive: Comparator<StringLike, string> = {
  id: "ends-with-case-sensitive",
  label: "Ends with (case sensitive)",
  evaluate: ({ filterValue, rowValue }) => rowValue.endsWith(filterValue)
};

export const NotEndsWithCaseSensitive: Comparator<StringLike, string> = {
  id: "not-ends-with-case-sensitive",
  label: "Does not end with (case sensitive)",
  evaluate: ({ filterValue, rowValue }) => !rowValue.endsWith(filterValue)
};

export const ContainsCaseSensitive: Comparator<StringLike, string> = {
  id: "contains-case-sensitive",
  label: "Contains (case sensitive)",
  evaluate: ({ filterValue, rowValue }) => rowValue.includes(filterValue)
};

export const NotContainsCaseSensitive: Comparator<StringLike, string> = {
  id: "not-contains-case-sensitive",
  label: "Does not contain (case sensitive)",
  evaluate: ({ filterValue, rowValue }) => !rowValue.includes(filterValue)
};

export const ContainsCaseInsensitive: Comparator<StringLike, string> = {
  id: "contains-case-insensitive",
  label: "Contains",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().includes(filterValue.toLowerCase())
};

export const NotContainsCaseInsensitive: Comparator<StringLike, string> = {
  id: "not-contains-case-insensitive",
  label: "Does not contain",
  evaluate: ({ filterValue, rowValue }) =>
    !rowValue.toLowerCase().includes(filterValue.toLowerCase())
};

const Matches: Comparator<StringLike, RegExp> = {
  id: "matches",
  label: "Matches regex",
  evaluate: ({ filterValue, rowValue }) => filterValue.test(rowValue)
};

const NotMatches: Comparator<StringLike, RegExp> = {
  id: "not-matches",
  label: "Does not match regex",
  evaluate: ({ filterValue, rowValue }) => !filterValue.test(rowValue)
};

export const IsTrue: Comparator<boolean, never> = {
  id: "is-true",
  label: "Is true",
  evaluate: ({ rowValue }) => rowValue === true
};

export const IsFalse: Comparator<boolean, never> = {
  id: "is-false",
  label: "Is false",
  evaluate: ({ rowValue }) => rowValue === false
};
