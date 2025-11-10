import merge from "lodash.merge";
import {
  AssertIsComparatorBuildable,
  ComparatorMeta,
  EvaluateFn
} from "./types";
import { BuildError } from "../types";
import { ComparatorInstance } from "./comparator-instance";

export class Comparator<
  // generics
  TValue,
  TFilter,
  // internal tracking
  const TId extends string | null = null,
  TEvaluateFn extends EvaluateFn<TValue, TFilter> | null = null,
  TMeta extends object = {}
> {
  private constructor(
    private _id: TId = null as TId,
    private _evaluateFn: TEvaluateFn = null as TEvaluateFn,
    private _meta: TMeta = {} as TMeta
  ) {}

  public static create<TNewFiltered, TNewFilter>(): Comparator<
    TNewFiltered,
    TNewFilter,
    null,
    null,
    {}
  > {
    return new Comparator();
  }

  public id<const TNewId extends string>(
    id: TNewId
  ): Comparator<TValue, TFilter, TNewId, TEvaluateFn, TMeta> {
    return new Comparator(id, this._evaluateFn, this._meta);
  }

  evaluate<TNewEvaluateFn extends EvaluateFn<TValue, TFilter>>(
    evaluateFn: TNewEvaluateFn
  ): Comparator<TValue, TFilter, TId, TNewEvaluateFn, TMeta> {
    return new Comparator(this._id, evaluateFn, this._meta);
  }

  public meta<TAppendedMeta extends Partial<ComparatorMeta>>(
    meta: TAppendedMeta
  ): Comparator<TValue, TFilter, TId, TEvaluateFn, TMeta & TAppendedMeta> {
    return new Comparator(this._id, this._evaluateFn, merge(this._meta, meta));
  }

  public build(): BuildError<
    ComparatorInstance<TValue, TFilter, Extract<TId, string>>,
    AssertIsComparatorBuildable<TValue, TFilter, TId, TEvaluateFn, TMeta>
  > {
    if (this._id === null) {
      throw new Error("Comparator id is not set.");
    }

    if (this._evaluateFn === null) {
      throw new Error("Comparator evaluate function is not set.");
    }

    return new ComparatorInstance<TValue, TFilter, Extract<TId, string>>(
      this._id as Extract<TId, string>,
      this._evaluateFn,
      this._meta as ComparatorMeta
    ) as BuildError<
      ComparatorInstance<TValue, TFilter, Extract<TId, string>>,
      AssertIsComparatorBuildable<TValue, TFilter, TId, TEvaluateFn, TMeta>
    >;
  }
}
