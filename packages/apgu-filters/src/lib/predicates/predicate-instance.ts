import { ComparatorInstance } from "../comparators";
import { BasePredicateMeta, RenderInputFn } from "./types";

export class PredicateInstance<
  TValue,
  TFilter,
  TFieldId extends string,
  TMeta extends BasePredicateMeta,
  TId extends string
> {
  constructor(
    private readonly _id: TId,
    private readonly _comparators: readonly ComparatorInstance<
      TValue,
      TFilter,
      string
    >[],
    private readonly _renderInput: RenderInputFn<TFilter, TMeta>,
    private readonly _defaultValue: TFilter,
    private readonly _defaultComparatorId: string,
    public readonly _field: TFieldId,
    private readonly _meta: TMeta
  ) {}

  get id(): TId {
    return this._id;
  }

  renderInput({
    filterValue,
    onFilterValueChange
  }: {
    filterValue: TFilter;
    onFilterValueChange: React.Dispatch<React.SetStateAction<TFilter>>;
  }) {
    return this._renderInput({
      filterValue,
      onFilterValueChange,
      meta: this._meta
    });
  }

  get field(): TFieldId {
    return this._field;
  }

  get defaultValue(): TFilter {
    return this._defaultValue;
  }

  get defaultComparatorId(): string {
    return this._defaultComparatorId;
  }

  get comparators() {
    return this._comparators;
  }

  get meta(): TMeta {
    return this._meta;
  }
}
