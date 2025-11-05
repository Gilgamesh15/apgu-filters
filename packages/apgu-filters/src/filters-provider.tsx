import React from "react";
import { FiltersContext } from "./filters-context";
import { FilterExpression, PredicateInstances } from "./lib/types";

export interface FiltersProviderProps<TRowType extends object = any> {
  children: React.ReactNode;
  values?: TRowType[];
  predicates: PredicateInstances<TRowType>;
  defaultFilterExpression?: FilterExpression;
}

export const FiltersProvider = <TRowType extends object = any>({
  children,
  values = [],
  predicates,
  defaultFilterExpression = []
}: FiltersProviderProps<TRowType>) => {
  const [filterExpression, setFilterExpression] =
    React.useState<FilterExpression>(defaultFilterExpression);

  const addRule = (args: { field: string }) => {
    const predicate = predicates.find((p) => p.field === args.field);

    if (predicate) {
      setFilterExpression((prev) => [
        ...prev,
        {
          field: args.field,
          comparator: predicate.def.defaultComparator,
          value: predicate.def.defaultValue
        }
      ]);
    }
  };
  const clearRules = () => {
    setFilterExpression([]);
  };

  const getRuleTarget = ({ index }: { index: number }) => {
    const rule = filterExpression[index];
    return rule ? rule.field : "";
  };

  const setRuleTarget = ({
    index,
    field
  }: {
    index: number;
    field: string;
  }) => {
    const predicate = predicates.find((p) => p.field === field);

    if (predicate) {
      setFilterExpression((prev) =>
        prev.map((rule, i) =>
          i === index
            ? {
                ...rule,
                comparator: predicate.def.defaultComparator,
                value: predicate.def.defaultValue
              }
            : rule
        )
      );
    }
  };

  const getRuleComparator = ({ index }: { index: number }) => {
    const rule = filterExpression[index];
    return rule ? rule.comparator : "";
  };
  const setRuleComparator = ({
    index,
    comparator
  }: {
    index: number;
    comparator: string;
  }) => {
    setFilterExpression((prev) =>
      prev.map((rule, i) => (i === index ? { ...rule, comparator } : rule))
    );
  };

  const getRuleValue = <TFilterType,>({ index }: { index: number }) => {
    const rule = filterExpression[index];
    return rule.value as TFilterType;
  };
  const setRuleValue = <TFilterType,>({
    index,
    value
  }: {
    index: number;
    value: TFilterType;
  }) => {
    setFilterExpression((prev) =>
      prev.map((rule, i) => (i === index ? { ...rule, value } : rule))
    );
  };

  const removeRule = ({ index }: { index: number }) => {
    setFilterExpression((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredValues = React.useMemo(() => {
    return values.filter((row) => {
      return filterExpression.every((rule) => {
        const predicate = predicates.find((p) => p.field === rule.field);
        if (!predicate) return true;

        const comparatorDef = predicate.def.comparators.find(
          (c: any) => c.id === rule.comparator
        );

        if (!comparatorDef) return true;

        const rowValue = row[rule.field as keyof TRowType];

        return comparatorDef.evaluate({
          filterValue: rule.value,
          rowValue
        });
      });
    });
  }, [values, filterExpression, predicates]);

  return (
    <FiltersContext.Provider
      value={{
        values,
        filteredValues,
        predicates,
        filterExpression,

        addRule,
        clearRules,

        getRuleTarget,
        setRuleTarget,

        getRuleComparator,
        setRuleComparator,

        getRuleValue,
        setRuleValue,

        removeRule
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
