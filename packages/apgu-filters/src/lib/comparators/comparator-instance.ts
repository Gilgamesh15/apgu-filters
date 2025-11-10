import { ComparatorMeta, EvaluateFn } from "./types";

export class ComparatorInstance<TValue, TFilter, TId extends string> {
  constructor(
    private readonly _id: TId,
    private readonly _evaluateFn: EvaluateFn<TValue, TFilter>,
    private readonly _meta: ComparatorMeta
  ) {}

  get id(): TId {
    return this._id;
  }

  evaluate(arg: { value: TValue; filter: TFilter }): boolean {
    return this._evaluateFn(arg);
  }

  get meta(): ComparatorMeta {
    return this._meta;
  }
}
