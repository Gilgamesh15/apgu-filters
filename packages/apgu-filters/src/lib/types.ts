import React, { ReactNode } from "react";
import { StringPredicate } from "../defaults/predicates";
import { createPredicate } from "./utils";
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
export type ComparatorDefaultPayload = {
  label: string;
};

/** Core comparator logic - the "blueprint" */
export type ComparatorDef<TFieldType = any, TFilterValue = any> = {
  id: string;
  evaluate: (args: {
    filterValue: TFilterValue;
    rowValue: TFieldType;
  }) => boolean;
};

export type ComparatorInstance<
  TFieldType = any,
  TFilterValue = any,
  TComparatorPayload extends object = ComparatorDefaultPayload
> = {
  def: ComparatorDef<TFieldType, TFilterValue>;
  payload: TComparatorPayload;
};
// ============================================================================
// 3. PREDICATE DEFINITION - What is a predicate
// ============================================================================

/** Predicate definition - the general "schema" for a type of field */
export type PredicateDefaultPayload = {
  label: string;
  icon: ReactNode;
};

export type PredicateDef<
  TFieldType = any,
  TFilterValue = any,
  TComparators extends readonly ComparatorInstance<
    TFieldType,
    TFilterValue
  >[] = ComparatorInstance<TFieldType, TFilterValue>[]
> = {
  id: string;
  // Available comparators for this predicate type
  comparators: TComparators;
  // Default configuration
  defaultComparator: TComparators[number]["def"]["id"]; // ID of the default comparator
  defaultValue: TFilterValue;
};
/**
 * Predicate instance - a configured predicate for a specific field
 * Contains field-specific information
 */
export type PredicateInstance<
  TFieldType = any,
  TFilterValue = any,
  TComparators extends readonly ComparatorInstance<
    TFieldType,
    TFilterValue
  >[] = ComparatorInstance<TFieldType, TFilterValue>[],
  TPredicatePayload extends object = PredicateDefaultPayload
> = {
  def: PredicateDef<TFieldType, TFilterValue, TComparators>;
  // Field-specific configuration
  field: string;
  payload: TPredicatePayload;
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

// Helper to extract TFilterValue from a predicate function
type ExtractPredicateFilterValue<T> = T extends (
  ...args: any[]
) => PredicateInstance<any, infer TFilterValue, any, any>
  ? TFilterValue
  : never;

type ExtractPredicatePayload<T> = T extends (
  ...args: any[]
) => PredicateInstance<any, any, any, infer TPredicatePayload>
  ? TPredicatePayload
  : never;

type ExtractPredicateId<T> = T extends (
  ...args: any[]
) => PredicateInstance<any, any, any, infer TPredicatePayload>
  ? TPredicatePayload
  : never;

export type PredicateCompDef<
  TPredicateFn extends (...args: any[]) => PredicateInstance<any, any, any, any>
> = (
  props: {
    filterValue: ExtractPredicateFilterValue<TPredicateFn>;
    onFilterValueChange: (
      value: ExtractPredicateFilterValue<TPredicateFn>
    ) => void;
  } & ExtractPredicatePayload<TPredicateFn>
) => React.JSX.Element;
