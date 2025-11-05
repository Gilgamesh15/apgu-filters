import { ReactNode } from "react";
// ============================================================================
// 1. LANGUAGE DEFINITION - What is a filter expression
// ============================================================================
export type FilterRule<
  TFieldKey extends string = string,
  TComparatorKey extends string = string,
  TFilterValue = any
> = {
  field: TFieldKey;
  comparator: TComparatorKey;
  value: TFilterValue;
};
export type FilterExpression = FilterRule[];
// ============================================================================
// 2. COMPARATOR DEFINITION - What is a comparator
// ============================================================================
/** Core comparator logic - the "blueprint" */
export type Comparator<TFieldType = any, TFilterValue = any> = {
  id: string;
  evaluate: (args: {
    filterValue: TFilterValue;
    rowValue: TFieldType;
  }) => boolean;
  label?: string;
  icon?: ReactNode;
  description?: string;
};
// ============================================================================
// 3. PREDICATE DEFINITION - What is a predicate
// ============================================================================
/** Predicate definition - the general "schema" for a type of field */
export type PredicateDef<
  TFieldType = any,
  TFilterValue = any,
  // NOTE: We catch TComparators to then be able to call TComparators[number]["id"]
  // instead of just string
  TComparators extends readonly Comparator<
    TFieldType,
    TFilterValue
  >[] = Comparator<TFieldType, TFilterValue>[]
> = {
  id: string;
  // Available comparators for this predicate type
  comparators: TComparators;
  // Default configuration
  defaultComparator: TComparators[number]["id"]; // ID of the default comparator
  defaultValue: TFilterValue;
  label?: string;
  icon?: ReactNode;
  description?: string;
};
/**
 * Predicate instance - a configured predicate for a specific field
 * Contains field-specific information
 */
export type PredicateInstance<
  TFieldType = any,
  TFilterValue = any,
  TComparators extends readonly Comparator<
    TFieldType,
    TFilterValue
  >[] = Comparator<TFieldType, TFilterValue>[]
> = {
  def: PredicateDef<TFieldType, TFilterValue, TComparators>;
  // Field-specific configuration
  field: string;
  label?: string;
  icon?: ReactNode;
  description?: string;
};
export type PredicateInstances<TRowType extends object = any> = {
  [K in keyof TRowType]: PredicateInstance<TRowType[K], any, any>;
}[keyof TRowType][];
// ============================================================================
// 4. COMPARATOR UTILS
// ============================================================================
export type Comparable = string | number | boolean | Date;
export type Ordered = string | number | Date;
export type StringLike = string;
export type Numeric = number;
