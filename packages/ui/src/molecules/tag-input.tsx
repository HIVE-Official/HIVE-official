"use client";
// Bounded Context Owner: Identity & Access Management Guild
import { useMemo, useState } from "react";
import type { KeyboardEvent, ReactNode, ChangeEvent } from "react";
import { X, Plus } from "lucide-react";
import { cn } from "../utils/cn";

export interface TagOption {
  readonly value: string;
  readonly label?: string;
  readonly description?: string;
}

export interface TagInputProps {
  readonly value: readonly string[];
  readonly onChange: (tags: string[]) => void;
  readonly placeholder?: string;
  readonly suggestions?: readonly TagOption[];
  readonly maxTags?: number;
  readonly disabled?: boolean;
  readonly label?: ReactNode;
  readonly description?: ReactNode;
  readonly allowNew?: boolean;
}

const normalizeTag = (tag: string) => tag.trim().replace(/\s+/g, " ");

export const TagInput = ({
  value,
  onChange,
  placeholder,
  suggestions = [],
  maxTags,
  disabled,
  label,
  description,
  allowNew = true
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [announcement, setAnnouncement] = useState<string>("");

  const remainingSuggestions = useMemo(() => {
    const normalized = inputValue.trim().toLowerCase();
    return suggestions.filter((option) => {
      const alreadySelected = value.includes(option.value);
      if (alreadySelected) return false;
      if (!normalized) return true;
      return (
        option.value.toLowerCase().includes(normalized) ||
        option.label?.toLowerCase().includes(normalized)
      );
    });
  }, [inputValue, suggestions, value]);

  const addTag = (raw: string) => {
    const next = normalizeTag(raw);
    if (!next) return;
    if (value.includes(next)) return;
    if (maxTags && value.length >= maxTags) return;
    const isFromSuggestions = suggestions.some((option) => option.value === next);
    if (!allowNew && !isFromSuggestions) return;
    onChange([...value, next]);
    setInputValue("");
    setAnnouncement(`Added tag ${next}`);
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((existing) => existing !== tag));
    setAnnouncement(`Removed tag ${tag}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === "," || event.key === "Tab") {
      if (inputValue.trim().length === 0) return;
      event.preventDefault();
      addTag(inputValue);
    } else if (event.key === "Backspace" && inputValue.length === 0 && value.length > 0) {
      event.preventDefault();
      removeTag(value[value.length - 1]);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const allowMore = !maxTags || value.length < maxTags;

  return (
    <div className={cn("flex flex-col gap-2", disabled && "opacity-60")}>
      {/* SR-only live region for add/remove announcements */}
      <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
      {label ? <span className="text-body font-body text-foreground">{label}</span> : null}
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 rounded-card border border-input bg-background/95 px-3 py-2",
          "focus-within:border-primary focus-within:ring-1 focus-within:ring-ring"
        )}
        aria-disabled={disabled}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full border border-transparent bg-muted/60 px-2 py-1 text-caption font-caption text-muted-foreground"
          >
            {tag}
            <button
              type="button"
              className="rounded-full p-1 text-muted-foreground transition hover:text-foreground"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {allowMore && (
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={value.length === 0 ? placeholder : undefined}
            className="min-w-[120px] flex-1 bg-transparent text-body-sm font-body-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        )}
        {!allowMore && maxTags ? (
          <span className="text-caption font-caption text-muted-foreground">Max {maxTags} tags</span>
        ) : null}
      </div>
      {description ? <span className="text-caption font-caption text-muted-foreground">{description}</span> : null}
      {remainingSuggestions.length > 0 && allowMore ? (
        <div className="flex flex-wrap gap-2">
          {remainingSuggestions.slice(0, 6).map((option) => (
            <button
              key={option.value}
              type="button"
              className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 text-caption font-caption text-muted-foreground transition hover:border-primary hover:text-foreground"
              onClick={() => addTag(option.value)}
              disabled={disabled}
            >
              <Plus className="h-3 w-3" />
              {option.label ?? option.value}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
