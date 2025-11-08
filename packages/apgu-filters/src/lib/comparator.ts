type EvaluateFn<TFiltered = unknown, TFilter = unknown> = (arg: {
  value: TFiltered;
  filter: TFilter;
}) => boolean;

export class Comparator<
  TFiltered = unknown,
  TFilter = unknown,
  TMeta extends object = {},
  const TId extends string | null = null
> {
  private constructor(
    private _id: TId = null as TId,
    private _evaluateFn: EvaluateFn<TFiltered, TFilter> | null = null,
    private _meta: TMeta = {} as TMeta
  ) {}

  public static create<
    TNewFiltered = unknown,
    TNewFilter = unknown,
    TNewMeta extends object = {}
  >(): Comparator<TNewFiltered, TNewFilter, TNewMeta, null> {
    return new Comparator();
  }

  id<const TNewId extends string>(
    id: TNewId
  ): Comparator<TFiltered, TFilter, TMeta, TNewId> {
    return new Comparator<TFiltered, TFilter, TMeta, TNewId>(
      id,
      this._evaluateFn,
      this._meta
    );
  }

  evaluate(
    evaluateFn: EvaluateFn<TFiltered, TFilter>
  ): Comparator<TFiltered, TFilter, TMeta, TId> {
    return new Comparator<TFiltered, TFilter, TMeta, TId>(
      this._id,
      evaluateFn,
      this._meta
    );
  }

  meta<TAppendedMeta extends object>(
    meta: TAppendedMeta
  ): Comparator<TFiltered, TFilter, TMeta & TAppendedMeta, TId> {
    return new Comparator<TFiltered, TFilter, TMeta & TAppendedMeta, TId>(
      this._id,
      this._evaluateFn,
      { ...this._meta, ...meta } as TMeta & TAppendedMeta
    );
  }

  instantiate<TAppendedMeta extends object = {}>(
    meta: TAppendedMeta = {} as TAppendedMeta
  ): TId extends string
    ? ComparatorInstance<TFiltered, TFilter, TMeta & TAppendedMeta, TId>
    : never {
    if (this._id === null) {
      throw new Error("Comparator id is not set.");
    }

    type TNonNullId = Extract<TId, string>;

    if (this._evaluateFn === null) {
      throw new Error("Comparator evaluate function is not set.");
    }
    const finalMeta = { ...this._meta, ...meta } as TMeta & TAppendedMeta;

    return new ComparatorInstance<
      TFiltered,
      TFilter,
      TMeta & TAppendedMeta,
      TNonNullId
    >(this._id as unknown as TNonNullId, this._evaluateFn, finalMeta) as any;
  }
}

export class ComparatorInstance<
  TFiltered,
  TFilter,
  TMeta extends object,
  TId extends string
> {
  constructor(
    private readonly _id: TId,
    private readonly _evaluateFn: EvaluateFn<TFiltered, TFilter>,
    private readonly _meta: TMeta
  ) {}

  get id(): TId {
    return this._id;
  }

  evaluate(arg: { value: TFiltered; filter: TFilter }): boolean {
    return this._evaluateFn(arg);
  }

  get meta(): TMeta {
    return this._meta;
  }
}
