import { Comparator, PredicateDef, PredicateInstance } from "./types";

export const createPredicate = <
  TFieldType = any,
  TFilterValue = any,
  TRestProps extends object = {},
  TComparatorExtraProps extends object = { label: string },
  TComparators extends Comparator<
    TFieldType,
    TFilterValue,
    TComparatorExtraProps
  >[] = Comparator<TFieldType, TFilterValue, TComparatorExtraProps>[]
>(
  predicateDef: PredicateDef<
    TFieldType,
    TFilterValue,
    TComparatorExtraProps,
    TComparators
  >
) => {
  return ({
    field,
    ...restProps
  }: {
    field: string;
  } & TRestProps): PredicateInstance<
    TFieldType,
    TFilterValue,
    TComparatorExtraProps,
    TComparators
  > => {
    return {
      field,
      def: predicateDef,
      ...(restProps as TRestProps)
    };
  };
};
