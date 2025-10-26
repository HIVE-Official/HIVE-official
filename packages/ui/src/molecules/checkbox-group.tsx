"use client";
// Bounded Context Owner: Identity & Access Management Guild
import { useId, useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { Checkbox } from "../atoms/checkbox";
import { cn } from "../utils/cn";

export interface CheckboxOption {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
  readonly group?: string;
}

export interface CheckboxGroupProps {
  readonly values: readonly string[];
  readonly onChange: (values: string[]) => void;
  readonly options: readonly CheckboxOption[];
  readonly searchPlaceholder?: string;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly maxSelections?: number;
  readonly ariaLabel?: string;
  readonly ariaLabelledby?: string;
  readonly legend?: string;
}

export const CheckboxGroup = ({
  values,
  onChange,
  options,
  className,
  disabled,
  maxSelections,
  searchPlaceholder = "Search",
  ariaLabel,
  ariaLabelledby,
  legend
}: CheckboxGroupProps) => {
  const [search, setSearch] = useState("");
  const groupId = useId();

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    if (!normalized) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(normalized) ||
      option.description?.toLowerCase().includes(normalized) ||
      option.group?.toLowerCase().includes(normalized)
    );
  }, [options, search]);

  const toggleValue = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((existing) => existing !== value));
      return;
    }
    if (maxSelections && values.length >= maxSelections) {
      return;
    }
    onChange([...values, value]);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const grouped = useMemo(() => {
    const map = new Map<string, CheckboxOption[]>();
    for (const option of filtered) {
      const key = option.group ?? "__ungrouped";
      const bucket = map.get(key) ?? [];
      bucket.push(option);
      map.set(key, bucket);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const canSelectMore = !maxSelections || values.length < maxSelections;

  return (
    <div className={cn("flex flex-col gap-4", className)} aria-disabled={disabled}>
      <div className="flex items-center justify-between gap-3">
        <input
          type="search"
          value={search}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          disabled={disabled}
          className="w-full rounded-card border border-input bg-background/95 px-3 py-2 text-body-sm font-body-sm text-foreground shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
        {maxSelections ? (
          <span className="hidden text-caption font-caption text-muted-foreground sm:block">
            {values.length}/{maxSelections} selected
          </span>
        ) : null}
      </div>

      <fieldset className="space-y-4" aria-label={ariaLabel} aria-labelledby={ariaLabelledby ?? groupId} disabled={disabled}>
        {legend ? (
          <legend id={ariaLabelledby ?? groupId} className="sr-only">{legend}</legend>
        ) : null}
        {grouped.map(([groupName, groupOptions]) => (
          <div key={groupName} className="space-y-2">
            {groupName !== "__ungrouped" ? (
              <h4 className="text-label font-label uppercase text-muted-foreground" id={`${groupId}-${groupName}`}>
                {groupName}
              </h4>
            ) : null}
            <div className="grid gap-2">
              {groupOptions.map((option) => {
                const selected = values.includes(option.value);
                const disableOption = disabled || (!selected && !canSelectMore);
                return (
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    checked={selected}
                    onChange={() => toggleValue(option.value)}
                    disabled={disableOption}
                  />
                );
              })}
            </div>
          </div>
        ))}
        {filtered.length === 0 ? (
          <p className="text-body-sm font-body-sm text-muted-foreground">No matches found.</p>
        ) : null}
      </fieldset>
    </div>
  );
};
