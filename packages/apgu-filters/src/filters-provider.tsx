import React, { useCallback } from "react";
import { FiltersContext } from "./filters-context";
import { FilterExpression, PredicateInstances } from "./lib/types";
import { ComparatorInstance } from "./lib/comparators";
import { FilterRule } from "./lib/filter-rules/filter-rule";

export interface FiltersProviderProps<
  TRowType extends Record<string, any> = Record<string, any>
> {
  children: React.ReactNode;
  values?: TRowType[];
  predicates: PredicateInstances<TRowType>;
  defaultFilterExpression?: FilterExpression;
}

export const FiltersProvider = <
  TRowType extends Record<string, any> = Record<string, any>
>({
  values = [],
  children,
  predicates,
  defaultFilterExpression = []
}: FiltersProviderProps<TRowType>) => {
  const [filterExpression, setFilterExpression] =
    React.useState<FilterExpression>(defaultFilterExpression);

  const addRuleByField = useCallback(
    (field: keyof TRowType) => {
      const predicate = predicates.find((p) => p.field === field);
      if (!predicate) {
        console.warn(`No predicate found for field: ${String(field)}`);
        return;
      }

      setFilterExpression((prev) => [
        ...prev,
        new FilterRule(
          field as string,
          predicate.defaultComparatorId,
          predicate.defaultValue
        )
      ]);
    },
    [predicates]
  );

  const getRuleByIndex = useCallback(
    (index: number): FilterRule<any, any, any> | null => {
      return filterExpression[index] || null;
    },
    [filterExpression]
  );

  const getComparatorByRule = useCallback(
    (
      rule: FilterRule<any, any, any>
    ): ComparatorInstance<any, any, string> | null => {
      const predicate = predicates.find((p) => p.field === rule.field);
      if (!predicate) return null;

      const comparator = predicate.comparators.find(
        (c) => c.id === rule.comparator
      );
      return comparator || null;
    },
    [predicates]
  );

  const getPredicateByRule = useCallback(
    (
      rule: FilterRule<any, any, any>
    ): PredicateInstances<TRowType>[number] | null => {
      const predicate = predicates.find((p) => p.field === rule.field);
      return predicate || null;
    },
    [predicates]
  );

  const setComparatorByRule = useCallback(
    (rule: FilterRule<any, any, any>, comparatorId: string) => {
      setFilterExpression((prev) => {
        const newExpression = [...prev];
        const ruleIndex = newExpression.indexOf(rule);
        if (ruleIndex !== -1) {
          newExpression[ruleIndex].comparator = comparatorId;
        }
        return newExpression;
      });
    },
    []
  );

  const removeRuleByIndex = useCallback((index: number) => {
    setFilterExpression((prev) => {
      const newExpression = [...prev];
      newExpression.splice(index, 1);
      return newExpression;
    });
  }, []);

  const setRuleField = useCallback(
    (rule: FilterRule<any, any, any>, newField: keyof TRowType) => {
      setFilterExpression((prev) =>
        prev.map((r) => {
          if (r.field !== rule.field) return r;

          const predicate = predicates.find((p) => p.field === newField);
          if (!predicate) {
            console.warn(`No predicate found for field: ${String(newField)}`);
            return r;
          }
          return new FilterRule(
            newField as string,
            predicate.defaultComparatorId,
            predicate.defaultValue
          );
        })
      );
    },
    [predicates]
  );

  const setRuleValue = useCallback(
    (rule: FilterRule<any, any, any>, value: any) => {
      setFilterExpression((prev) => {
        const newExpression = [...prev];
        const ruleIndex = newExpression.indexOf(rule);
        if (ruleIndex !== -1) {
          newExpression[ruleIndex].value = value;
        }
        return newExpression;
      });
    },
    []
  );

  const filteredValues = React.useMemo(() => {
    return values.filter((item) => {
      return filterExpression.every((rule) => {
        const predicate = getPredicateByRule(rule);
        const comparator = getComparatorByRule(rule);
        if (!predicate || !comparator) return true;

        const itemValue = item[rule.field];
        return comparator.evaluate({
          filter: rule.value,
          value: itemValue
        });
      });
    });
  }, [values, filterExpression, getPredicateByRule, getComparatorByRule]);

  return (
    <FiltersContext.Provider
      value={{
        filterExpression,
        predicates,
        addRuleByField,
        removeRuleByIndex,
        getRuleByIndex,
        getComparatorByRule,
        getPredicateByRule,
        setComparatorByRule,
        setRuleField,
        setRuleValue,
        values,
        filteredValues
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
