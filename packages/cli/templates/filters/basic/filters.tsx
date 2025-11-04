import { useFiltersContext } from "apgu-filters";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function Filters() {
  const {
    predicates,
    removeFilterRule,
    addFilterRule,
    setFilterRuleComparator,
    setFilterRuleTarget,
    setFilterRuleValue,
    getComparator,
    getFilterValue
  } = useFiltersContext();

  return (
    <div className="space-y-4">
      <FiltersAddPredicateButton />

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Active Filters</h2>

        {predicates.length === 0 ? (
          <p className="text-sm text-muted-foreground">No filters applied</p>
        ) : (
          <div className="space-y-2">
            {predicates.map((pred, index) => {
              const Root = pred.predicateDef.components.Root;
              const Target = pred.predicateDef.components.Target;
              const Comparator = pred.predicateDef.components.Comparator;
              const Input = pred.predicateDef.components.Input;
              const Remove = pred.predicateDef.components.Remove;

              return (
                <Root
                  key={index}
                  renderTarget={() => (
                    <Target
                      field={pred.field}
                      onFieldChange={(field) =>
                        setFilterRuleTarget({ index, field })
                      }
                      predicates={predicates}
                    />
                  )}
                  renderComparator={() => (
                    <Comparator
                      comparator={getComparator({ index })}
                      onComparatorChange={(comparator) =>
                        setFilterRuleComparator({ index, comparator })
                      }
                      comparators={pred.predicateDef.comparators}
                    />
                  )}
                  renderInput={() => (
                    <Input
                      filterValue={getFilterValue({ index })}
                      onFilterValueChange={(value) =>
                        setFilterRuleValue({ index, value })
                      }
                    />
                  )}
                  renderRemove={() => (
                    <Remove onRemove={() => removeFilterRule({ index })} />
                  )}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function FiltersAddPredicateButton() {
  const { addFilterRule, predicates } = useFiltersContext();

  return (
    <Select onValueChange={(field) => addFilterRule({ field })}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Add filter" />
      </SelectTrigger>
      <SelectContent>
        {predicates.map((pred, index) => (
          <SelectItem key={index} value={pred.field}>
            {pred.label || pred.field}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
