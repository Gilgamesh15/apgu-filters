import React from "react";
import { FiltersContext, FiltersContextType } from "../filters-context";

export const useFiltersContext = <TRowType>(): FiltersContextType<TRowType> => {
  const context = React.useContext(FiltersContext);
  if (!context) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }
  return context as FiltersContextType<TRowType>;
};
