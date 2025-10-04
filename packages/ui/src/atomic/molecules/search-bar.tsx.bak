"use client"

import * as React from "react"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { Input } from "../atoms/input"
import { cn } from "../../lib/utils"

export interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void
  isLoading?: boolean
  showShortcut?: boolean
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, onSearch, isLoading, showShortcut = false, ...props }, ref) => {
    const [value, setValue] = React.useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      onSearch?.(newValue)
    }

    return (
      <div className={cn("relative w-full", className)}>
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-smooth ease-liquid" />
        <Input
          ref={ref}
          type="text"
          value={value}
          onChange={handleChange}
          className={cn(
            "pl-9 transition-all duration-smooth ease-liquid",
            showShortcut && "pr-16",
            className
          )}
          {...props}
        />
        {showShortcut && (
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex transition-smooth ease-liquid">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
        {isLoading && (
          <div className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin rounded-full border-2 border-primary border-t-transparent transition-smooth ease-liquid" />
        )}
      </div>
    )
  }
)

SearchBar.displayName = "SearchBar"

export { SearchBar }
