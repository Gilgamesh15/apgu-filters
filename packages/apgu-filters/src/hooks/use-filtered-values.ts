import React from "react";
import { FiltersContext } from "../filters-context";

export const useFilteredValues = <
  TRowType extends object = any
>(): TRowType[] => {
  const context = React.useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilteredValues must be used within a FiltersProvider");
  }

  return context.filteredValues as TRowType[];
};
