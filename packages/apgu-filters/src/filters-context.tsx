import React from "react";
import { PredicateInstances, FilterExpression } from "./lib/types";
import { ComparatorInstance } from "./lib/comparators";
import { FilterRule } from "./lib/filter-rules/filter-rule";

export type FiltersContextType<
  TRowType extends Record<string, any> = Record<string, any>
> = {
  filterExpression: FilterExpression;
  predicates: PredicateInstances<TRowType>;
  values: TRowType[];
  filteredValues: TRowType[];

  addRuleByField: (field: keyof TRowType) => void;

  //getComparatorByIndex: (
  //  index: number
  //) => ComparatorInstance<any, any, string> | null;
  //
  //setComparatorByIndex: (index: number, comparatorId: string) => void;
  //
  //getPredicateByIndex: (
  //  index: number
  //) => PredicateInstances<TRowType>[number] | null;
  getRuleByIndex: (index: number) => FilterRule<any, any, any> | null;

  getComparatorByRule: (
    rule: FilterRule<any, any, any>
  ) => ComparatorInstance<any, any, string> | null;

  getPredicateByRule: (
    rule: FilterRule<any, any, any>
  ) => PredicateInstances<TRowType>[number] | null;

  removeRuleByIndex: (index: number) => void;

  setComparatorByRule: (
    rule: FilterRule<any, any, any>,
    comparatorId: string
  ) => void;

  setRuleField: (
    rule: FilterRule<any, any, any>,
    field: keyof TRowType
  ) => void;

  setRuleValue: (rule: FilterRule<any, any, any>, value: any) => void;
};

export const FiltersContext = React.createContext<FiltersContextType | null>(
  null
);
