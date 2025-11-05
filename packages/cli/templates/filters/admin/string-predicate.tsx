import { createPredicate } from "apgu-filters";
import { Input } from "@/components/ui/input";
import { Comparator, Remove, Root, Target } from "./base-components";
import { Equals, NotEquals, Contains, StartsWith, EndsWith } from "./comparators";
import { useFiltersContext } from "../../../../apgu-filters/dist/index.cjs";

const {p}=useFiltersContext();



export const StringPredicate = createPredicate<string, string>({
  comparators: [
    Equals(),
    NotEquals(),
    Contains(),
    StartsWith(),
    EndsWith()
  ],
  defaultComparator: "equals",
  defaultValue: "",
  components: {
    Root,
    Target,
    Comparator,
    Remove,
    Input: ({ filterValue, onFilterValueChange }) => {
      return (
        <Input
          type="text"
          value={filterValue}
          onChange={(e) => onFilterValueChange(e.target.value)}
          placeholder="Enter value..."
          className="w-[200px]"
        />
      );
    }
  }
});
