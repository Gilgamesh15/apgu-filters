import { FilterRule } from "./filter-rules/filter-rule";
import { BasePredicateMeta, PredicateInstance } from "./predicates";

export type AssertExact<A, B> = [A] extends [B]
  ? [B] extends [A]
    ? true
    : false
  : false;

export type BuildError<
  TOnSuccess,
  TAssertion extends string | true
> = TAssertion extends true ? TOnSuccess : TAssertion;

export type FilterExpression = FilterRule<any, any, any>[];

// ============================================================================
// 4. COMPARATOR UTILS
// ============================================================================
export type Comparable = string | number | boolean | Date;
export type Ordered = string | number | Date;
export type StringLike = string;
export type Numeric = number;

export type PredicateInstances<T extends Record<string, any>> = {
  [K in keyof T]: PredicateInstance<
    T[K], // TValue - the type of the field
    any, // TFilter
    K & string, // TFieldId - the field name as string
    BasePredicateMeta, // TMeta
    string // TId
  >;
}[keyof T][];
