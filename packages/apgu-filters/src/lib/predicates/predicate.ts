import merge from "lodash.merge";
import { ComparatorInstance } from "../comparators";
import { ExtractComparatorIds } from "../comparators/types";
import {
  AssertIsPredicateBuildable,
  BasePredicateMeta,
  RenderInputFn
} from "./types";
import { BuildError } from "../types";
import { PredicateInstance } from "./predicate-instance";

export class Predicate<
  TValue,
  TFilter,
  TAdditionalExpectedMeta extends object,
  TId extends string | null = null,
  TComparators extends
    | readonly ComparatorInstance<TValue, TFilter, string>[]
    | null = null,
  TRenderInputFn extends RenderInputFn<
    TFilter,
    TAdditionalExpectedMeta & BasePredicateMeta
  > | null = null,
  TMeta extends object = {},
  TDefaultValue extends TFilter | null = null,
  TDefaultComparatorId extends string | null = null
> {
  private constructor(
    private _id: TId = null as TId,
    private _comparators: TComparators = null as TComparators,
    private _renderFn: TRenderInputFn = null as TRenderInputFn,
    private _meta: TMeta = {} as TMeta,
    private _defaultValue: TFilter | null = null,
    private _defaultComparatorId: TDefaultComparatorId = null as TDefaultComparatorId
  ) {}

  public static create<
    TNewValue,
    TNewFilter,
    TNewExpectedMeta extends object = {}
  >(): Predicate<
    TNewValue,
    TNewFilter,
    TNewExpectedMeta,
    null,
    null,
    null,
    {},
    null,
    null
  > {
    return new Predicate();
  }

  id<const TNewId extends string>(
    id: TNewId
  ): Predicate<
    TValue,
    TFilter,
    TAdditionalExpectedMeta,
    TNewId,
    TComparators,
    TRenderInputFn,
    TMeta,
    TDefaultValue,
    TDefaultComparatorId
  > {
    return new Predicate(
      id,
      this._comparators,
      this._renderFn,
      this._meta,
      this._defaultValue,
      this._defaultComparatorId
    );
  }

  comparators<
    TNewComparators extends readonly ComparatorInstance<
      TValue,
      TFilter,
      string
    >[]
  >(
    ...comparators: TNewComparators
  ): Predicate<
    TValue,
    TFilter,
    TAdditionalExpectedMeta,
    TId,
    TNewComparators,
    TRenderInputFn,
    TMeta,
    TDefaultValue,
    TDefaultComparatorId
  > {
    return new Predicate(
      this._id,
      comparators,
      this._renderFn,
      this._meta,
      this._defaultValue,
      this._defaultComparatorId
    );
  }

  defaultValue(
    defaultValue: TFilter
  ): Predicate<
    TValue,
    TFilter,
    TAdditionalExpectedMeta,
    TId,
    TComparators,
    TRenderInputFn,
    TMeta,
    Extract<TDefaultValue, TFilter>,
    TDefaultComparatorId
  > {
    return new Predicate(
      this._id,
      this._comparators,
      this._renderFn,
      this._meta,
      defaultValue,
      this._defaultComparatorId
    );
  }

  defaultComparatorId<
    TNewDefaultComparatorId extends ExtractComparatorIds<TComparators>
  >(
    defaultComparatorId: TNewDefaultComparatorId
  ): Predicate<
    TValue,
    TFilter,
    TAdditionalExpectedMeta,
    TId,
    TComparators,
    TRenderInputFn,
    TMeta,
    TFilter,
    TNewDefaultComparatorId
  > {
    return new Predicate(
      this._id,
      this._comparators,
      this._renderFn,
      this._meta,
      this._defaultValue,
      defaultComparatorId
    );
  }

  render<
    TNewRenderInputFn extends RenderInputFn<
      TFilter,
      TAdditionalExpectedMeta & BasePredicateMeta
    >
  >(
    renderFn: TNewRenderInputFn
  ): Predicate<
    TValue,
    TFilter,
    TAdditionalExpectedMeta,
    TId,
    TComparators,
    TNewRenderInputFn,
    TMeta,
    TFilter,
    TDefaultComparatorId
  > {
    return new Predicate(
      this._id,
      this._comparators,
      renderFn,
      this._meta,
      this._defaultValue,
      this._defaultComparatorId
    );
  }

  meta<
    TAppendedMeta extends Partial<TAdditionalExpectedMeta & BasePredicateMeta>
  >(
    meta: TAppendedMeta
  ): Predicate<
    TValue,
    TFilter,
    TAdditionalExpectedMeta,
    TId,
    TComparators,
    TRenderInputFn,
    TMeta & TAppendedMeta,
    TFilter,
    TDefaultComparatorId
  > {
    return new Predicate(
      this._id,
      this._comparators,
      this._renderFn,
      merge(this._meta, meta),
      this._defaultValue,
      this._defaultComparatorId
    );
  }

  build<const TFieldId extends string>(
    field: TFieldId
  ): BuildError<
    PredicateInstance<
      TValue,
      TFilter,
      TFieldId,
      TMeta & BasePredicateMeta,
      Extract<TId, string>
    >,
    AssertIsPredicateBuildable<
      TValue,
      TFilter,
      TAdditionalExpectedMeta,
      TId,
      TComparators,
      TRenderInputFn,
      TMeta,
      TDefaultValue,
      TDefaultComparatorId
    >
  > {
    if (this._id === null) {
      throw new Error("Predicate id is not set.");
    }
    if (this._comparators === null) {
      throw new Error("Predicate comparators are not set.");
    }
    if (this._renderFn === null) {
      throw new Error("Predicate render function is not set.");
    }
    if (this._defaultValue === null) {
      throw new Error("Predicate default value is not set.");
    }
    if (this._defaultComparatorId === null) {
      throw new Error("Predicate default comparator id is not set.");
    }

    return new PredicateInstance(
      this._id,
      this._comparators,
      this._renderFn as unknown as RenderInputFn<
        TFilter,
        TMeta & BasePredicateMeta
      >,
      this._defaultValue,
      this._defaultComparatorId,
      field,
      this._meta as TMeta & BasePredicateMeta
    ) as BuildError<
      PredicateInstance<
        TValue,
        TFilter,
        TFieldId,
        TMeta & BasePredicateMeta,
        Extract<TId, string>
      >,
      AssertIsPredicateBuildable<
        TValue,
        TFilter,
        TAdditionalExpectedMeta,
        TId,
        TComparators,
        TRenderInputFn,
        TMeta,
        TDefaultValue,
        TDefaultComparatorId
      >
    >;
  }
}
