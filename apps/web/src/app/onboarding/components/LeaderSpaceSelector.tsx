// Bounded Context Owner: Identity & Access Management Guild
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Button,
  Badge,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  Spinner
} from "@hive/ui";
import { X, ChevronsUpDown } from "lucide-react";
interface LeaderSpaceSelectorProps {
  readonly selected: readonly SelectedSpace[];
  readonly onSelect: (space: SelectedSpace) => void;
  readonly onRemove: (spaceId: string) => void;
  readonly campusId?: string;
  readonly maxSelections?: number;
  readonly disabled?: boolean;
}

interface SpaceResult {
  readonly id: string;
  readonly name: string;
  readonly campusId?: string;
  readonly description?: string;
  readonly type?: string;
}

export interface SelectedSpace {
  readonly id: string;
  readonly name: string;
  readonly campusId?: string;
}

export function LeaderSpaceSelector({
  selected,
  onSelect,
  onRemove,
  campusId,
  maxSelections = 3,
  disabled
}: LeaderSpaceSelectorProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SpaceResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);

  const canAddMore = selected.length < maxSelections;

  useEffect(() => {
    return () => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
      setResults([]);
      setIsSearching(false);
      return;
    }

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      if (abortRef.current) {
        abortRef.current.abort();
      }

      const controller = new AbortController();
      abortRef.current = controller;
      setIsSearching(true);

      const params = new URLSearchParams({
        q: query.trim(),
        campusId: campusId ?? "ub-buffalo",
        limit: String(maxSelections * 3)
      });

      fetch(`/api/spaces/search?${params.toString()}`, {
        signal: controller.signal,
        cache: "no-store"
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("Search failed");
          }
          const payload = (await response.json()) as {
            success?: boolean;
            data?: SpaceResult[];
          };
          setResults(Array.isArray(payload.data) ? payload.data : []);
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setResults([]);
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setIsSearching(false);
          }
        });
    }, 250);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }
    };
  }, [campusId, maxSelections, query]);

  const filteredResults = useMemo(() => {
    const selectedIds = new Set(selected.map((space) => space.id));
    return results.filter((result) => !selectedIds.has(result.id));
  }, [results, selected]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {selected.map((space) => (
          <Badge key={space.id} variant="outline" className="gap-1">
            {space.name}
            <button
              type="button"
              className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full border border-border/60 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => onRemove(space.id)}
              aria-label={`Remove ${space.name}`}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-between"
            disabled={!canAddMore || disabled}
          >
            <span className="text-sm">
              {canAddMore ? "Search campus spaces" : "Maximum spaces selected"}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="start">
          <Command>
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder="Search by space name"
            />
            <CommandList>
              <CommandEmpty>
                {isSearching ? (
                  <div className="flex items-center justify-center gap-2 py-6 text-sm text-muted-foreground">
                    <Spinner className="h-4 w-4" />
                    Searching…
                  </div>
                ) : (
                  <span className="py-6 text-sm text-muted-foreground">No matches yet. Try another name.</span>
                )}
              </CommandEmpty>
              {filteredResults.length > 0 ? (
                <CommandGroup heading="Spaces">
                  {filteredResults.map((result) => (
                    <CommandItem
                      key={result.id}
                      value={result.id}
                      onSelect={() => {
                        onSelect({
                          id: result.id,
                          name: result.name,
                          campusId: result.campusId
                        });
                        setOpen(false);
                        setQuery("");
                      }}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-foreground">{result.name}</span>
                        {result.description ? (
                          <span className="text-xs text-muted-foreground line-clamp-2">{result.description}</span>
                        ) : null}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <p className="text-xs text-muted-foreground">
        {canAddMore
          ? "Add up to three spaces you organize."
          : "Remove a space to select a different one."}
      </p>
    </div>
  );
}
