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

// Export notification system
export { NotificationBell } from "./atomic/atoms/notification-bell"
export { NotificationItem } from "./atomic/atoms/notification-item"
export { NotificationDropdown } from "./atomic/molecules/notification-dropdown"
export { NotificationToastManager, useNotificationToasts } from "./atomic/molecules/notification-toast-manager"
export { NotificationSystem, useNotificationSystem } from "./atomic/organisms/notification-system"

// Export types
export type { Event, Comment } from "./types/event"
export type { SearchableItem, SearchResult, SearchFilters } from "./types/search"
export type { PresenceStatus, PresenceIndicatorProps } from "./atomic/atoms/presence-indicator"
export type { PrivacyLevel } from "./atomic/molecules/privacy-control"
export type { HiveNotification, ToastNotificationData } from "./types/notifications"