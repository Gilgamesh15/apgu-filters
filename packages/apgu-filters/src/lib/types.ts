// ============================================================================
// 1. LANGUAGE DEFINITION - What is a filter expression

import { ReactNode } from "react";
import { Predicate, PredicateInstance } from "./predicate";

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

export type PredicateInstances<TRowType extends object = any> = {
  [K in keyof TRowType]: PredicateInstance<
    TRowType[K],
    any,
    any,
    any,
    any,
    any
  >;
}[keyof TRowType][];

// ============================================================================
// 4. COMPARATOR UTILS
// ============================================================================
export type Comparable = string | number | boolean | Date;
export type Ordered = string | number | Date;
export type StringLike = string;
export type Numeric = number;

export type RenderFn<TFilter, TMeta> = (arg: {
  filterValue: TFilter;
  onFilterValueChange: React.Dispatch<React.SetStateAction<TFilter>>;
  meta: TMeta;
}) => ReactNode;

type ExtractFilterValue<T> = T extends Predicate<
  any,
  infer TFilter,
  any,
  any,
  any,
  any,
  any
>
  ? TFilter
  : never;

type ExtractMeta<T> = T extends Predicate<
  any,
  any,
  infer ExpectedInstanceMeta,
  infer TMeta,
  any,
  any,
  any
>
  ? TMeta & ExpectedInstanceMeta
  : never;

export type PredicateRenderer<
  TPredicate extends Predicate<any, any, any, any, any, any, any>
> = RenderFn<ExtractFilterValue<TPredicate>, ExtractMeta<TPredicate>>;

