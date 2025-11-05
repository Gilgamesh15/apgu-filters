import { Comparator, PredicateDef, PredicateInstance } from "./types";

export const createPredicate = <
  TFieldType = any,
  TFilterValue = any,
  TRestProps extends object = {},
  TComparators extends readonly Comparator<
    TFieldType,
    TFilterValue
  >[] = Comparator<TFieldType, TFilterValue>[]
>(
  predicateDef: PredicateDef<TFieldType, TFilterValue, TComparators>
) => {
  return ({
    field,
    label,
    icon,
    description,
    ...restProps
  }: {
    field: string;
    label?: string;
    icon?: React.ReactNode;
    description?: string;
  } & TRestProps): PredicateInstance<
    TFieldType,
    TFilterValue,
    TComparators
  > => {
    return {
      field,
      label: label || predicateDef.label,
      icon: icon || predicateDef.icon,
      description: description || predicateDef.description,
      def: predicateDef,
      ...(restProps as TRestProps)
    };
  };
};
