import { AssertExact } from "../types";
import { ComparatorInstance } from "./comparator-instance";

export interface ComparatorMeta {
  label: string;
}

export type EvaluateFn<TValue = unknown, TFilter = unknown> = (arg: {
  value: TValue;
  filter: TFilter;
}) => boolean;

export type AssertIsComparatorBuildable<
  TValue,
  TFilter,
  TId extends string | null = null,
  TEvaluateFn extends EvaluateFn<TValue, TFilter> | null = null,
  TMeta extends object = {}
> = TId extends string
  ? TEvaluateFn extends EvaluateFn<TValue, TFilter>
    ? AssertExact<TMeta, ComparatorMeta> extends true
      ? true
      : "Error: Meta shape does not match expected meta structure"
    : "Error: .evaluate() must be called before .build()"
  : "Error: .id() must be called before .build()";

export type ExtractComparatorIds<T> = T extends ComparatorInstance<
  any,
  any,
  infer TId
>[]
  ? TId
  : never;
