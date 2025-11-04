import {
  Comparable,
  Comparator,
  Ordered,
  StringLike,
  Numeric
} from "../lib/types";

export const Equals: Comparator<Comparable, Comparable> = {
  id: "equals",
  label: "Equals",
  evaluate: ({ filterValue, rowValue }) => rowValue === filterValue
};

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

export const NotEquals: Comparator<Comparable, Comparable> = {
  id: "notEquals",
  label: "Not Equals",
  evaluate: ({ filterValue, rowValue }) => rowValue !== filterValue
};

export const IsOneOf: Comparator<Comparable, Comparable[]> = {
  id: "isOneOf",
  label: "Is One Of",
  evaluate: ({ filterValue, rowValue }) => filterValue.includes(rowValue)
};

export const IsNoneOf: Comparator<Comparable, Comparable[]> = {
  id: "isNoneOf",
  label: "Is None Of",
  evaluate: ({ filterValue, rowValue }) => !filterValue.includes(rowValue)
};

// ============================================================================
// Ordering & Range Comparators
// ============================================================================

export const GreaterThan: Comparator<Ordered, Ordered> = {
  id: "greaterThan",
  label: "Greater Than",
  evaluate: ({ filterValue, rowValue }) => rowValue > filterValue
};

export const GreaterOrEqual: Comparator<Ordered, Ordered> = {
  id: "greaterOrEqual",
  label: "Greater or Equal",
  evaluate: ({ filterValue, rowValue }) => rowValue >= filterValue
};

export const LessThan: Comparator<Ordered, Ordered> = {
  id: "lessThan",
  label: "Less Than",
  evaluate: ({ filterValue, rowValue }) => rowValue < filterValue
};

export const LessOrEqual: Comparator<Ordered, Ordered> = {
  id: "lessOrEqual",
  label: "Less or Equal",
  evaluate: ({ filterValue, rowValue }) => rowValue <= filterValue
};

export const Between: Comparator<Ordered, { min: Ordered; max: Ordered }> = {
  id: "between",
  label: "Between",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue >= filterValue.min && rowValue <= filterValue.max
};

export const BetweenExclusive: Comparator<
  Ordered,
  { min: Ordered; max: Ordered }
> = {
  id: "betweenExclusive",
  label: "Between (Exclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue > filterValue.min && rowValue < filterValue.max
};

export const Outside: Comparator<Ordered, { min: Ordered; max: Ordered }> = {
  id: "outside",
  label: "Outside",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue < filterValue.min || rowValue > filterValue.max
};

const OutsideExclusive: Comparator<Ordered, { min: Ordered; max: Ordered }> = {
  id: "outsideExclusive",
  label: "Outside (Exclusive)",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue < filterValue.min || rowValue > filterValue.max
};

// ============================================================================
// String Comparators
// ============================================================================

export const StartsWith: Comparator<StringLike, string> = {
  id: "startsWith",
  label: "Starts With",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().startsWith(filterValue.toLowerCase())
};

export const EndsWith: Comparator<StringLike, string> = {
  id: "endsWith",
  label: "Ends With",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().endsWith(filterValue.toLowerCase())
};

export const Contains: Comparator<StringLike, string> = {
  id: "contains",
  label: "Contains",
  evaluate: ({ filterValue, rowValue }) =>
    rowValue.toLowerCase().includes(filterValue.toLowerCase())
};

export const NotContains: Comparator<StringLike, string> = {
  id: "notContains",
  label: "Does Not Contain",
  evaluate: ({ filterValue, rowValue }) =>
    !rowValue.toLowerCase().includes(filterValue.toLowerCase())
};

// ============================================================================
// Numeric Comparators
// ============================================================================

export const IsWithinTolerance: Comparator<
  Numeric,
  { target: number; tolerance: number }
> = {
  id: "isWithinTolerance",
  label: "Within Tolerance",
  evaluate: ({ filterValue, rowValue }) =>
    Math.abs(rowValue - filterValue.target) <= filterValue.tolerance
};

// ============================================================================
// Date Comparators
// ============================================================================

export const IsBefore: Comparator<Date, Date> = {
  id: "isBefore",
  label: "Is Before",
  evaluate: ({ filterValue, rowValue }) => rowValue < filterValue
};

export const IsAfter: Comparator<Date, Date> = {
  id: "isAfter",
  label: "Is After",
  evaluate: ({ filterValue, rowValue }) => rowValue > filterValue
};

export const IsOnOrBefore: Comparator<Date, Date> = {
  id: "isOnOrBefore",
  label: "Is On or Before",
  evaluate: ({ filterValue, rowValue }) => rowValue <= filterValue
};

export const IsOnOrAfter: Comparator<Date, Date> = {
  id: "isOnOrAfter",
  label: "Is On or After",
  evaluate: ({ filterValue, rowValue }) => rowValue >= filterValue
};

export const IsWithinDays: Comparator<Date, number> = {
  id: "isWithinDays",
  label: "Within Days",
  evaluate: ({ filterValue, rowValue }) => {
    const diff = Math.abs(rowValue.getTime() - new Date().getTime());
    const days = diff / (1000 * 60 * 60 * 24);
    return days <= filterValue;
  }
};

// ============================================================================
// Array Comparators
// ============================================================================

export const ArrayContainsAny: Comparator<any[], any[]> = {
  id: "arrayContainsAny",
  label: "Array Contains Any",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.some((val) => rowValue.includes(val))
};

export const ArrayNotContainsAny: Comparator<any[], any[]> = {
  id: "arrayNotContainsAny",
  label: "Array Not Contains Any",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.every((val) => !rowValue.includes(val))
};

export const ArrayContainsAll: Comparator<any[], any[]> = {
  id: "arrayContainsAll",
  label: "Array Contains All",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.every((val) => rowValue.includes(val))
};

export const ArrayNotContainsAll: Comparator<any[], any[]> = {
  id: "arrayNotContainsAll",
  label: "Array Not Contains All",
  evaluate: ({ filterValue, rowValue }) =>
    filterValue.every((val) => !rowValue.includes(val))
};
