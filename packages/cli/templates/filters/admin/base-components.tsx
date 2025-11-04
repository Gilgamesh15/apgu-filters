import type {
  ComparatorCompDef,
  RemoveCompDef,
  RootCompDef,
  TargetCompDef
} from "apgu-filters";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";

export const Remove: RemoveCompDef = ({ onRemove }) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onRemove}
      aria-label="Remove filter"
    >
      <X className="h-4 w-4" />
    </Button>
  );
};

export const Comparator: ComparatorCompDef = ({
  comparator,
  onComparatorChange,
  comparators
}) => {
  return (
    <Select value={comparator} onValueChange={onComparatorChange}>
      <SelectTrigger className="w-[150px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {comparators.map((comp) => (
          <SelectItem key={comp.comparatorDef.id} value={comp.comparatorDef.id}>
            {comp.comparatorDef.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const Target: TargetCompDef = ({ field, onFieldChange, predicates }) => {
  return (
    <Select value={field} onValueChange={onFieldChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {predicates.map((pred) => (
          <SelectItem key={pred.field} value={pred.field}>
            {pred.label || pred.field}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export const Root: RootCompDef = ({
  renderTarget,
  renderComparator,
  renderInput,
  renderRemove
}) => {
  return (
    <div className="flex items-center gap-2 p-3 border rounded-lg bg-card">
      {renderTarget()}
      {renderComparator()}
      {renderInput()}
      {renderRemove()}
    </div>
  );
};
