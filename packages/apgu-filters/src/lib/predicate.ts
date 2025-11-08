import React, { ReactNode } from "react";
import { ComparatorInstance } from "./comparator";
import { RenderFn } from "./types";

export class Predicate<
  // fundamental types
  TFiltered = unknown,
  TFilter = unknown,
  TExpectedInstanceMeta extends object = {},
  // internal tracking
  TMeta extends object = {},
  TComparatorsMeta extends object = {},
  TId extends string | null = null,
  TComparatorIds extends string = never
> {
  private constructor(
    private _id: TId = null as TId,
    private _comparators: ComparatorInstance<
      TFiltered,
      TFilter,
      TComparatorsMeta,
      TComparatorIds
    >[] = [],
    private _renderFn: RenderFn<
      TFilter,
      TMeta & TExpectedInstanceMeta
    > | null = null,
    private _meta: TMeta = {} as TMeta & Partial<TExpectedInstanceMeta>,
    private _defaultValue: TFilter | null = null,
    private _defaultComparatorId: TComparatorIds | null = null
  ) {}

  public static create<
    TNewFiltered = unknown,
    TNewFilter = unknown,
    TNewExpectedInstanceMeta extends object = {}
  >(): Predicate<TNewFiltered, TNewFilter, TNewExpectedInstanceMeta> {
    return new Predicate();
  }

  id<const TNewId extends string>(
    id: TNewId
  ): Predicate<
    TFiltered,
    TFilter,
    TExpectedInstanceMeta,
    TMeta,
    TComparatorsMeta,
    TNewId,
    TComparatorIds
  > {
    return new Predicate<
      TFiltered,
      TFilter,
      TExpectedInstanceMeta,
      TMeta,
      TComparatorsMeta,
      TNewId,
      TComparatorIds
    >(
      id,
      this._comparators,
      this._renderFn,
      this._meta,
      this._defaultValue,
      this._defaultComparatorId
    );
  }

  comparators<
    TComparators extends readonly ComparatorInstance<
      TFiltered,
      TFilter,
      any,
      any
    >[]
  >(
    ...comparators: [...TComparators]
  ): Predicate<
    TFiltered,
    TFilter,
    TExpectedInstanceMeta,
    TMeta,
    TComparators[number] extends ComparatorInstance<
      TFiltered,
      TFilter,
      infer TMeta,
      string
    >
      ? TMeta
      : never,
    TId,
    TComparators[number] extends ComparatorInstance<
      TFiltered,
      TFilter,
      TComparatorsMeta,
      infer TId
    >
      ? TId
      : never
  > {
    return new Predicate<
      TFiltered,
      TFilter,
      TExpectedInstanceMeta,
      TMeta,
      TComparators[number] extends ComparatorInstance<
        TFiltered,
        TFilter,
        infer TMeta,
        string
      >
        ? TMeta
        : never,
      TId,
      TComparators[number] extends ComparatorInstance<
        TFiltered,
        TFilter,
        TComparatorsMeta,
        infer TId
      >
        ? TId
        : never
    >(
      this._id,
      comparators,
      this._renderFn,
      this._meta,
      this._defaultValue,
      this._defaultComparatorId as any
    );
  }

  defaultValue(
    defaultValue: TFilter
  ): Predicate<
    TFiltered,
    TFilter,
    TExpectedInstanceMeta,
    TMeta,
    TComparatorsMeta,
    TId,
    TComparatorIds
  > {
    return new Predicate<
      TFiltered,
      TFilter,
      TExpectedInstanceMeta,
      TMeta,
      TComparatorsMeta,
      TId,
      TComparatorIds
    >(
      this._id,
      this._comparators,
      this._renderFn,
      this._meta,
      defaultValue,
      this._defaultComparatorId
    );
  }

  defaultComparatorId(
    defaultComparatorId: TComparatorIds
  ): Predicate<
    TFiltered,
    TFilter,
    TExpectedInstanceMeta,
    TMeta,
    TComparatorsMeta,
    TId,
    TComparatorIds
  > {
    return new Predicate<
      TFiltered,
      TFilter,
      TExpectedInstanceMeta,
      TMeta,
      TComparatorsMeta,
      TId,
      TComparatorIds
    >(
      this._id,
      this._comparators,
      this._renderFn,
      this._meta,
      this._defaultValue,
      defaultComparatorId
    );
  }

  render(
    renderFn: RenderFn<TFilter, TMeta & TExpectedInstanceMeta>
  ): Predicate<
    TFiltered,
    TFilter,
    TExpectedInstanceMeta,
    TMeta,
    TComparatorsMeta,
    TId,
    TComparatorIds
  > {
    return new Predicate<
      TFiltered,
      TFilter,
      TExpectedInstanceMeta,
      TMeta,
      TComparatorsMeta,
      TId,
      TComparatorIds
    >(
      this._id,
      this._comparators,
      renderFn,
      this._meta,
      this._defaultValue,
      this._defaultComparatorId
    );
  }

  meta<TAppendedMeta extends object>(
    meta: TAppendedMeta
  ): Predicate<
    TFiltered,
    TFilter,
    TExpectedInstanceMeta,
    TMeta & TAppendedMeta,
    TComparatorsMeta,
    TId,
    TComparatorIds
  > {
    return new Predicate<
      TFiltered,
      TFilter,
      TExpectedInstanceMeta,
      TMeta & TAppendedMeta,
      TComparatorsMeta,
      TId,
      TComparatorIds
    >(
      this._id,
      this._comparators,
      this._renderFn,
      { ...this._meta, ...meta },
      this._defaultValue,
      this._defaultComparatorId
    );
  }

  instantiate<TAppendedMeta extends TExpectedInstanceMeta>(
    field: string,
    meta: TAppendedMeta
  ): TId extends string
    ? PredicateInstance<
        TFiltered,
        TFilter,
        TMeta & TAppendedMeta,
        TComparatorsMeta,
        TId,
        TComparatorIds
      >
    : never {
    if (this._id === null) {
      throw new Error("Comparator id is not set.");
    }
    type TSafeId = Extract<TId, string>;

    if (this._renderFn === null) {
      throw new Error(
        "Predicate render function is not set. Use .render() to set it."
      );
    }

    if (this._defaultValue === null) {
      throw new Error(
        "Predicate default value is not set. Use .defaultValue()"
      );
    }

    if (this._defaultComparatorId === null) {
      throw new Error(
        "Predicate default comparator id is not set. Use .defaultComparatorId()"
      );
    }

    const finalMeta = meta
      ? ({ ...this._meta, ...meta } as TMeta & TAppendedMeta)
      : (this._meta as TMeta & TAppendedMeta);

    return new PredicateInstance<
      TFiltered,
      TFilter,
      TMeta & TAppendedMeta,
      TComparatorsMeta,
      TId,
      TComparatorIds
    >(
      this._id as TSafeId,
      this._comparators,
      this._renderFn,
      this._defaultValue as TFilter,
      this._defaultComparatorId,
      field,
      finalMeta
    ) as any;
  }
}

export class PredicateInstance<
  TFiltered,
  TFilter,
  TMeta,
  TComparatorsMeta extends object,
  TId,
  TComparatorIds extends string
> {
  constructor(
    private readonly _id: TId,
    private readonly _comparators: ComparatorInstance<
      TFiltered,
      TFilter,
      TComparatorsMeta,
      TComparatorIds
    >[],
    private readonly _render: RenderFn<TFilter, TMeta>,
    private readonly _defaultValue: TFilter,
    private readonly _defaultComparatorId: TComparatorIds,
    public readonly _field: string,
    private readonly _meta: TMeta
  ) {}

  get id(): TId {
    return this._id;
  }

  render({
    filterValue,
    onFilterValueChange
  }: {
    filterValue: TFilter;
    onFilterValueChange: React.Dispatch<React.SetStateAction<TFilter>>;
  }) {
    return this._render({
      filterValue,
      onFilterValueChange,
      meta: this._meta
    });
  }

  get field(): string {
    return this._field;
  }

  get defaultValue(): TFilter {
    return this._defaultValue;
  }

  get defaultComparatorId(): string {
    return this._defaultComparatorId;
  }

  get comparators(): ComparatorInstance<
    TFiltered,
    TFilter,
    TComparatorsMeta,
    string
  >[] {
    return this._comparators;
  }

  get meta(): TMeta {
    return this._meta;
  }
}
