import { ReactNode } from "react";

declare module "apgu-filters";

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
export type Comparator<
  TFieldType = any,
  TFilterValue = any,
  TComparatorExtraProps extends object = {
    label: string;
  }
> = {
  id: string;
  evaluate: (args: {
    filterValue: TFilterValue;
    rowValue: TFieldType;
  }) => boolean;
} & TComparatorExtraProps;

// ============================================================================
// 3. PREDICATE DEFINITION - What is a predicate
// ============================================================================

/** Predicate definition - the general "schema" for a type of field */
export type PredicateDef<
  TFieldType = any,
  TFilterValue = any,
  TComparatorExtraProps extends object = {
    label: string;
  },
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

/**
 * Predicate instance - a configured predicate for a specific field
 * Contains field-specific information
 */
export type PredicateInstance<
  TFieldType = any,
  TFilterValue = any,
  TComparatorExtraProps extends object = {
    label: string;
  },
  TComparators extends Comparator<
    TFieldType,
    TFilterValue,
    TComparatorExtraProps
  >[] = Comparator<TFieldType, TFilterValue, TComparatorExtraProps>[],
  TRestProps extends object = {}
> = {
  def: PredicateDef<
    TFieldType,
    TFilterValue,
    TComparatorExtraProps,
    TComparators
  >;

  // Field-specific configuration
  field: string;
} & TRestProps;

// ============================================================================
// 4. COMPARATOR UTILS
// ============================================================================

export type Comparable = string | number | boolean | Date;
export type Ordered = string | number | Date;
export type StringLike = string;
export type Numeric = number;
