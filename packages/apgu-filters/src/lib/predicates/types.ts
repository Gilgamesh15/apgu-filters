import { ComparatorInstance } from "../comparators";
import { AssertExact } from "../types";
import { Predicate } from "./predicate";

export type RenderInputFn<TFilter, TMeta> = ({
  filterValue,
  onFilterValueChange,
  meta
}: {
  filterValue: TFilter;
  onFilterValueChange: React.Dispatch<React.SetStateAction<TFilter>>;
  meta: TMeta;
}) => React.ReactNode;

export type BasePredicateMeta = {
  label: string;
};

export type AssertIsPredicateBuildable<
  TValue,
  TFilter,
  TAdditionalExpectedMeta extends object,
  TId extends string | null,
  TComparators extends
    | readonly ComparatorInstance<TValue, TFilter, string>[]
    | null,
  TRenderFn extends RenderInputFn<
    TFilter,
    TAdditionalExpectedMeta & BasePredicateMeta
  > | null,
  TMeta extends object,
  TDefaultValue extends TFilter | null,
  TDefaultComparatorId extends string | null
> = TId extends string
  ? TComparators extends readonly ComparatorInstance<TValue, TFilter, string>[]
    ? TRenderFn extends RenderInputFn<
        TFilter,
        TAdditionalExpectedMeta & BasePredicateMeta
      >
      ? TDefaultValue extends TFilter
        ? TDefaultComparatorId extends string
          ? AssertExact<
              TMeta,
              TAdditionalExpectedMeta & BasePredicateMeta
            > extends true
            ? true
            : "Error: Meta shape does not match expected meta structure"
          : "Error: .defaultComparatorId() must be called before .build()"
        : "Error: .defaultValue() must be called before .build()"
      : "Error: .render() must be called before .build()"
    : "Error: .comparators() must be called before .build()"
  : "Error: .id() must be called before .build()";
