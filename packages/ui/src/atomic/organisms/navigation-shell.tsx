"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { TopBarNav } from "../atoms/top-bar-nav"
import { HiveLogo } from "../atoms/hive-logo"
import { Button } from "../atoms/button"
import { Input } from "../atoms/input"
import {
  Search,
  Bell,
  MessageCircle,
  Menu,
  Home,
  Users,
  User,
  Wrench,
  Calendar,
  Sparkles,
  X,
  Plus
} from "lucide-react"

const navigationShellVariants = cva(
  [
    "fixed top-0 left-0 right-0 z-50",
    "bg-background/80 backdrop-blur-lg border-b border-border/50",
    "supports-[backdrop-filter]:bg-background/60",
    "transition-all duration-300"
  ],
  {
    variants: {
      variant: {
        default: "bg-background/80 rounded-b-lg",
        glass: "bg-background/40 backdrop-blur-xl rounded-b-lg",
        solid: "bg-background border-b rounded-b-lg",
        floating: [
          "top-4 left-4 right-4 rounded-2xl border",
          "bg-background/90 backdrop-blur-xl shadow-xl shadow-black/10"
        ]
      },
      blur: {
        none: "backdrop-blur-none",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
        xl: "backdrop-blur-xl"
      }
    },
    defaultVariants: {
      variant: "glass",
      blur: "xl"
    }
  }
)

const navigationContentVariants = cva(
  "flex items-center justify-between px-4 py-3 mx-auto min-h-[56px]",
  {
    variants: {
      maxWidth: {
        sm: "max-w-screen-sm",
        md: "max-w-screen-md",
        lg: "max-w-screen-lg",
        xl: "max-w-screen-xl",
        "2xl": "max-w-screen-2xl",
        full: "max-w-full"
      },
      spacing: {
        tight: "gap-2",
        normal: "gap-4",
        loose: "gap-6"
      }
    },
    defaultVariants: {
      maxWidth: "xl",
      spacing: "normal"
    }
  }
)

// Mobile bottom navigation styles
const mobileBottomNavVariants = cva(
  [
    "fixed bottom-0 left-0 right-0 z-50 md:hidden",
    "bg-background/95 backdrop-blur-xl border-t border-border/50",
    "supports-[backdrop-filter]:bg-background/80",
    "transition-all duration-300",
    "safe-area-pb"
  ]
)

export interface NavigationItem {
  id: string
  label: string
  icon: React.ReactNode
  href: string
  isActive?: boolean
  badge?: string | number
  tier: 1 | 2 | 3  // Navigation tier for responsive behavior
}

export interface NavigationShellProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navigationShellVariants> {
  items: NavigationItem[]
  currentPath?: string
  onSearch?: (query: string) => void
  searchPlaceholder?: string
  maxWidth?: VariantProps<typeof navigationContentVariants>["maxWidth"]
  spacing?: VariantProps<typeof navigationContentVariants>["spacing"]
  showSearch?: boolean
  showNotifications?: boolean
  showMessages?: boolean
  notificationCount?: number
  messageCount?: number
  onNotificationsClick?: () => void
  onMessagesClick?: () => void
  logoVariant?: "default" | "white" | "dark" | "gradient" | "monochrome"
  logoSize?: "sm" | "default" | "lg" | "xl" | "2xl"
  showLogoText?: boolean
  showLogoIcon?: boolean
}

const NavigationShell = React.forwardRef<HTMLElement, NavigationShellProps>(
  ({
    className,
    variant,
    blur,
    items,
    currentPath,
    onSearch,
    searchPlaceholder = "Search everything...",
    maxWidth,
    spacing,
    showSearch = true,
    showNotifications = true,
    showMessages = true,
    notificationCount,
    messageCount,
    onNotificationsClick,
    onMessagesClick,
    logoVariant = "default",
    logoSize = "default",
    showLogoText = true,
    showLogoIcon = true,
    ...props
  }, ref) => {
    const [isSearchExpanded, setIsSearchExpanded] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")

    // Tier 1 items (primary navigation - always visible)
    const tier1Items = items.filter(item => item.tier === 1)
    // Tier 2 items (action zone)
    const tier2Items = items.filter(item => item.tier === 2)
    // Tier 3 items (menu/overflow)
    const tier3Items = items.filter(item => item.tier === 3)

    const handleSearchSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (onSearch && searchQuery.trim()) {
        onSearch(searchQuery.trim())
      }
    }

    const handleSearchToggle = () => {
      setIsSearchExpanded(!isSearchExpanded)
      if (isSearchExpanded) {
        setSearchQuery("")
      }
    }

    return (
      <>
        {/* Desktop/Tablet Top Navigation */}
        <nav
          ref={ref}
          className={cn(navigationShellVariants({ variant, blur }), className)}
          role="navigation"
          aria-label="Main navigation"
          {...props}
        >
          <div className={cn(navigationContentVariants({ maxWidth, spacing }))}>
            {/* Left Section: Logo */}
            <div className="flex items-center gap-4">
              <HiveLogo
                variant={logoVariant}
                size={logoSize}
                showIcon={showLogoIcon}
                showText={showLogoText}
                href="/"
                className="h-8"
              />
            </div>

            {/* Center Section: Search (Desktop Only) */}
            {showSearch && (
              <div className="flex-1 max-w-md mx-4 hidden lg:block">
                <form onSubmit={handleSearchSubmit} className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <Input
                    type="search"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      "pl-10 pr-4 bg-accent/50 border-accent",
                      "focus:bg-background focus:border-primary/50",
                      "transition-all duration-200",
                      "min-h-[48px]" // Accessibility: minimum touch target
                    )}
                    aria-label={searchPlaceholder}
                  />
                </form>
              </div>
            )}

            {/* Right Section: Actions */}
            <div className="flex items-center gap-2">
              {/* Search Toggle - Mobile/Tablet */}
              {showSearch && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSearchToggle}
                  className="lg:hidden min-w-[48px] min-h-[48px]"
                  aria-label={isSearchExpanded ? "Close search" : "Open search"}
                  aria-expanded={isSearchExpanded}
                >
                  {isSearchExpanded ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                </Button>
              )}

              {/* Notifications */}
              {showNotifications && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onNotificationsClick}
                  className="relative min-w-[48px] min-h-[48px] hidden sm:inline-flex"
                  aria-label={`Notifications${notificationCount ? ` (${notificationCount} unread)` : ''}`}
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount && notificationCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                      aria-hidden="true"
                    >
                      {notificationCount > 99 ? '99+' : notificationCount}
                    </span>
                  )}
                </Button>
              )}

              {/* Messages */}
              {showMessages && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMessagesClick}
                  className="relative min-w-[48px] min-h-[48px] hidden sm:inline-flex"
                  aria-label={`Messages${messageCount ? ` (${messageCount} unread)` : ''}`}
                >
                  <MessageCircle className="h-5 w-5" />
                  {messageCount && messageCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                      aria-hidden="true"
                    >
                      {messageCount > 99 ? '99+' : messageCount}
                    </span>
                  )}
                </Button>
              )}

              {/* Desktop Navigation Items */}
              <div className="hidden md:flex items-center gap-1 ml-2">
                {tier1Items.map((item) => (
                  <TopBarNav
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    isActive={currentPath === item.href || item.isActive}
                    badge={item.badge}
                    className="min-w-[48px] min-h-[48px]"
                    labelVisibility="always"
                    aria-current={currentPath === item.href ? "page" : undefined}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Expanded Search - Mobile/Tablet */}
          {isSearchExpanded && (
            <div className="lg:hidden border-t border-border/50 p-4 bg-background/90 backdrop-blur-lg">
              <form onSubmit={handleSearchSubmit}>
                <Input
                  type="search"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full min-h-[48px]"
                  autoFocus
                  aria-label={searchPlaceholder}
                />
              </form>
            </div>
          )}
        </nav>

        {/* Mobile Bottom Navigation */}
        <nav
          className={cn(mobileBottomNavVariants())}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="flex justify-around items-center py-2 px-4 min-h-[72px]">
            {tier1Items.map((item, index) => (
              <TopBarNav
                key={item.id}
                icon={item.icon}
                label={item.label}
                href={item.href}
                isActive={currentPath === item.href || item.isActive}
                badge={item.badge}
                className={cn(
                  "flex-1 flex-col min-w-[48px] min-h-[48px] max-w-[80px]",
                  "text-xs gap-1"
                )}
                labelVisibility="always"
                size="sm"
                aria-current={currentPath === item.href ? "page" : undefined}
              />
            ))}

            {/* Quick Action Button (Plus/Create) */}
            <Button
              variant="default"
              size="icon"
              className="min-w-[48px] min-h-[48px] rounded-full bg-primary hover:bg-primary/90"
              aria-label="Create new post"
            >
              <Plus className="h-5 w-5" />
            </Button>

            {/* Notifications & Messages for Mobile */}
            <div className="flex flex-col items-center gap-1 min-w-[48px]">
              <div className="flex gap-1">
                {showNotifications && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onNotificationsClick}
                    className="relative min-w- min-h- p-1"
                    aria-label={`Notifications${notificationCount ? ` (${notificationCount} unread)` : ''}`}
                  >
                    <Bell className="h-4 w-4" />
                    {notificationCount && notificationCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w- h- flex items-center justify-center text-[10px]"
                        aria-hidden="true"
                      >
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </span>
                    )}
                  </Button>
                )}

                {showMessages && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMessagesClick}
                    className="relative min-w- min-h- p-1"
                    aria-label={`Messages${messageCount ? ` (${messageCount} unread)` : ''}`}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {messageCount && messageCount > 0 && (
                      <span
                        className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w- h- flex items-center justify-center text-[10px]"
                        aria-hidden="true"
                      >
                        {messageCount > 9 ? '9+' : messageCount}
                      </span>
                    )}
                  </Button>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground">More</span>
            </div>
          </div>
        </nav>

        {/* Spacer to prevent content from hiding under fixed nav */}
        <div className="h-16" />
        {/* Bottom spacer for mobile */}
        <div className="h-[72px] md:hidden" />
      </>
    )
  }
)

NavigationShell.displayName = "NavigationShell"

export { NavigationShell, navigationShellVariants, navigationContentVariants }