export class FilterRule<
  TFilterValue,
  TFieldKey extends string,
  TComparatorKeys extends string
> {
  constructor(
    private _field: TFieldKey,
    private _comparator: TComparatorKeys,
    private _value: TFilterValue
  ) {}

  public get field(): TFieldKey {
    return this._field;
  }

  public get comparator(): TComparatorKeys {
    return this._comparator;
  }

  public get value(): TFilterValue {
    return this._value;
  }

  public set comparator(comparator: TComparatorKeys) {
    this._comparator = comparator;
  }

  public set value(value: TFilterValue) {
    this._value = value;
  }
}
