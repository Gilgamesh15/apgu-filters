import React from "react";
import { PredicateInstance } from "./lib/types";

export type FiltersContextType<TRowType = any> = {
  values: TRowType[];
  filteredValues: TRowType[];
  predicates: PredicateInstance<TRowType>[];

  addRule: (args: { field: string }) => void;
  clearRules: () => void;

  getRuleTarget: (args: { index: number }) => string;
  setRuleTarget: (args: { index: number; field: string }) => void;

  getRuleComparator: (args: { index: number }) => string;
  setRuleComparator: (args: { index: number; comparator: string }) => void;

  getRuleValue: <TFilterType = any>(args: { index: number }) => TFilterType;
  setRuleValue: <TFilterType = any>(args: {
    index: number;
    value: TFilterType;
  }) => void;

  removeRule: (args: { index: number }) => void;
};

export const FiltersContext = React.createContext<FiltersContextType | null>(
  null
);
