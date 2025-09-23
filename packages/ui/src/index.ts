// Export atomic design system
export * from "./atomic"

// Export universal components
export { UniversalShell, useShell } from "./shells/UniversalShell"
export * from "./atomic/atoms/universal-atoms"
export * from "./navigation/UniversalNav"
export * from "./systems/modal-toast-system"
export * from "./providers/HiveProvider"

// Export hooks
export * from "./hooks"

// Export utilities
export { cn } from "./lib/utils"

// Re-export common types
export type { ButtonProps } from "./atomic/atoms/button"

// Export types
export type { Event, Comment } from "./types/event"
export type { SearchableItem, SearchResult, SearchFilters } from "./types/search"