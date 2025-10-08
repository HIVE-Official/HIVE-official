"use client"

import * as React from "react"
import { MotionNav } from "../../shells/motion-safe"
import { transitions } from "../../lib/animations"
import { Button } from "../atoms/button"
import { Badge } from "../atoms/badge"
import { HiveLogo } from "../atoms/hive-logo"
import { SearchBar } from "../molecules/search-bar"
import { NotificationItem } from "../molecules/notification-item"
import { cn } from "../../lib/utils"

export interface NavigationLink {
  label: string
  href: string
  isActive?: boolean
  badge?: number
}

export interface NavigationShellProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUserName?: string
  currentUserAvatar?: string
  currentUserHandle?: string
  links?: NavigationLink[]
  notificationCount?: number
  notifications?: React.ComponentProps<typeof NotificationItem>[]
  onSearch?: (query: string) => void
  onNotificationClick?: (notification: React.ComponentProps<typeof NotificationItem>) => void
  onProfileClick?: () => void
  onSettingsClick?: () => void
  onSignOutClick?: () => void
  showSearch?: boolean
  /** Layout mode: header or sidebar */
  layout?: "header" | "sidebar"
  /** Whether sidebar is collapsed */
  isCollapsed?: boolean
  /** Callback to toggle layout */
  onToggleLayout?: () => void
}

const NavigationShell = React.forwardRef<HTMLDivElement, NavigationShellProps>(
  (
    {
      className,
      children,
      currentUserName = "Guest",
      currentUserAvatar,
      currentUserHandle = "@guest",
      links = [],
      notificationCount = 0,
      notifications = [],
      onSearch,
      onNotificationClick,
      onProfileClick,
      onSettingsClick,
      onSignOutClick,
      showSearch = true,
      layout = "header",
      isCollapsed = false,
      onToggleLayout,
      ...props
    },
    ref
  ) => {
    const [showNotifications, setShowNotifications] = React.useState(false)
    const [showUserMenu, setShowUserMenu] = React.useState(false)
    const notificationRef = React.useRef<HTMLDivElement>(null)
    const userMenuRef = React.useRef<HTMLDivElement>(null)

    const isSidebar = layout === "sidebar"

    // Generate initials from name
    const initials = currentUserName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

    // Close dropdowns when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
          setShowNotifications(false)
        }
        if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
          setShowUserMenu(false)
        }
      }

      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
      <div ref={ref} className={cn("flex", isSidebar ? "flex-row min-h-screen" : "flex-col min-h-screen", className)} {...props}>
        {/* Navigation - Header or Sidebar */}
        <MotionNav
          layout
          initial={false}
          animate={{
            width: isSidebar ? (isCollapsed ? 64 : 240) : "100%",
            height: isSidebar ? "100vh" : "auto"
          }}
          transition={transitions.slow}
          className={cn(
            "z-50 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            isSidebar ? "sticky top-0 h-screen border-r flex flex-col" : "sticky top-0 w-full border-b"
          )}
        >
          {isSidebar ? (
            /* Sidebar Layout */
            <>
              {/* Logo & Brand */}
              <div className={cn("flex items-center gap-2 p-4 border-b border-border", isCollapsed && "justify-center")}>
                <HiveLogo
                  variant="currentColor"
                  size={isCollapsed ? 24 : 32}
                  className="text-primary shrink-0"
                />
                {!isCollapsed && (
                  <span className="text-base font-bold text-foreground">
                    HIVE
                  </span>
                )}
              </div>

              {/* Navigation Links */}
              {links.length > 0 && (
                <nav className="flex-1 flex flex-col gap-1 p-2 overflow-y-auto">
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={cn(
                        "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-smooth ease-liquid",
                        link.isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                        isCollapsed && "justify-center px-0"
                      )}
                      title={isCollapsed ? link.label : undefined}
                    >
                      {isCollapsed ? (
                        <span className="text-base">{link.label.charAt(0)}</span>
                      ) : (
                        <>
                          <span>{link.label}</span>
                          {link.badge !== undefined && link.badge > 0 && (
                            <Badge
                              variant="freshman"
                              className="ml-auto h-5 min-w-5 px-1 text-xs transition-smooth ease-liquid"
                            >
                              {link.badge > 99 ? "99+" : link.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </a>
                  ))}
                </nav>
              )}

              {/* Bottom Section: Notifications & User */}
              <div className="mt-auto border-t border-border p-2">
                {/* Notifications */}
                <div ref={notificationRef} className="relative mb-1">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={cn(
                      "relative flex h-9 items-center gap-3 rounded-md text-muted-foreground transition-smooth ease-liquid hover:bg-accent hover:text-foreground",
                      isCollapsed ? "w-9 justify-center" : "w-full px-3"
                    )}
                    title={isCollapsed ? "Notifications" : undefined}
                  >
                    <svg className="h-5 w-5 shrink-0" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    {!isCollapsed && <span className="text-sm font-medium">Notifications</span>}
                    {notificationCount > 0 && (
                      <div className={cn(
                        "flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground",
                        isCollapsed ? "absolute -right-1 -top-1" : "ml-auto"
                      )}>
                        {notificationCount > 99 ? "99+" : notificationCount}
                      </div>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className={cn(
                      "absolute bottom-0 w-[400px] rounded-lg border border-border bg-card shadow-lg transition-all duration-smooth ease-liquid",
                      isCollapsed ? "left-16" : "left-full ml-2"
                    )}>
                      <div className="flex items-center justify-between border-b border-border p-4">
                        <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                        {notificationCount > 0 && (
                          <Badge variant="sophomore">{notificationCount} new</Badge>
                        )}
                      </div>
                      <div className="max-h-[400px] overflow-y-auto p-2">
                        {notifications.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {notifications.map((notification, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  onNotificationClick?.(notification)
                                  setShowNotifications(false)
                                }}
                              >
                                <NotificationItem {...notification} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8">
                            <svg className="h-12 w-12 text-muted-foreground/30" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            <p className="mt-2 text-sm text-muted-foreground">No notifications yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className={cn(
                      "flex items-center gap-3 rounded-md transition-smooth ease-liquid hover:bg-accent",
                      isCollapsed ? "h-9 w-9 justify-center p-0" : "w-full p-2"
                    )}
                    title={isCollapsed ? currentUserName : undefined}
                  >
                    <div className={cn("overflow-hidden rounded border border-border bg-muted", isCollapsed ? "h-7 w-7" : "h-8 w-7 shrink-0")}>
                      {currentUserAvatar ? (
                        <img src={currentUserAvatar} alt={currentUserName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-[10px] font-semibold text-primary">
                          {initials}
                        </div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div className="flex flex-1 flex-col items-start min-w-0">
                        <span className="truncate text-xs font-semibold text-foreground max-w-full">
                          {currentUserName}
                        </span>
                        <span className="truncate text-[10px] text-muted-foreground max-w-full">
                          {currentUserHandle}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* User Menu Dropdown */}
                  {showUserMenu && (
                    <div className={cn(
                      "absolute bottom-0 w-[280px] rounded-lg border border-border bg-card shadow-lg transition-all duration-smooth ease-liquid",
                      isCollapsed ? "left-16" : "left-full ml-2"
                    )}>
                      <div className="border-b border-border p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-10 overflow-hidden rounded-md border border-border bg-muted">
                            {currentUserAvatar ? (
                              <img src={currentUserAvatar} alt={currentUserName} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-semibold text-primary">
                                {initials}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col min-w-0">
                            <span className="truncate text-sm font-semibold text-foreground">
                              {currentUserName}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                              {currentUserHandle}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => {
                            onProfileClick?.()
                            setShowUserMenu(false)
                          }}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-smooth ease-liquid hover:bg-accent"
                        >
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-foreground">View Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            onSettingsClick?.()
                            setShowUserMenu(false)
                          }}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-smooth ease-liquid hover:bg-accent"
                        >
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-foreground">Settings</span>
                        </button>

                        <div className="my-2 border-t border-border" />

                        <button
                          onClick={() => {
                            onSignOutClick?.()
                            setShowUserMenu(false)
                          }}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-smooth ease-liquid hover:bg-destructive/10"
                        >
                          <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Header Layout */
            <div className="flex items-center gap-4 container h-16 px-4">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <HiveLogo
                  variant="currentColor"
                  size={32}
                  className="text-primary"
                />
              </div>

              {/* Navigation Links */}
              {links.length > 0 && (
                <nav className="hidden md:flex items-center gap-1">
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={cn(
                        "relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-smooth ease-liquid",
                        link.isActive
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      )}
                    >
                      {link.label}
                      {link.badge !== undefined && link.badge > 0 && (
                        <Badge
                          variant="freshman"
                          className="h-5 min-w-5 px-1 text-xs transition-smooth ease-liquid"
                        >
                          {link.badge > 99 ? "99+" : link.badge}
                        </Badge>
                      )}
                    </a>
                  ))}
                </nav>
              )}

              {/* Search Bar */}
              {showSearch && (
                <div className="hidden md:block flex-1 max-w-md">
                  <SearchBar
                    placeholder="Search HIVE..."
                    onSearch={onSearch}
                    showShortcut
                  />
                </div>
              )}

              <div className="flex flex-1 items-center justify-end gap-2">
                {/* Notifications */}
                <div ref={notificationRef} className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-smooth ease-liquid hover:bg-accent hover:text-foreground"
                  >
                    <svg className="h-5 w-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                    </svg>
                    {notificationCount > 0 && (
                      <div className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                        {notificationCount > 99 ? "99+" : notificationCount}
                      </div>
                    )}
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 top-12 w-[400px] rounded-lg border border-border bg-card shadow-lg transition-all duration-smooth ease-liquid">
                      <div className="flex items-center justify-between border-b border-border p-4">
                        <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
                        {notificationCount > 0 && (
                          <Badge variant="sophomore">{notificationCount} new</Badge>
                        )}
                      </div>
                      <div className="max-h-[400px] overflow-y-auto p-2">
                        {notifications.length > 0 ? (
                          <div className="flex flex-col gap-1">
                            {notifications.map((notification, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  onNotificationClick?.(notification)
                                  setShowNotifications(false)
                                }}
                              >
                                <NotificationItem {...notification} />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-8">
                            <svg className="h-12 w-12 text-muted-foreground/30" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                            </svg>
                            <p className="mt-2 text-sm text-muted-foreground">No notifications yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 rounded-md p-1 transition-smooth ease-liquid hover:bg-accent"
                  >
                    <div className="h-8 w-7 overflow-hidden rounded border border-border bg-muted">
                      {currentUserAvatar ? (
                        <img src={currentUserAvatar} alt={currentUserName} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-[10px] font-semibold text-primary">
                          {initials}
                        </div>
                      )}
                    </div>
                    <svg className="hidden h-4 w-4 text-muted-foreground sm:block" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* User Menu Dropdown */}
                  {showUserMenu && (
                    <div className="absolute right-0 top-12 w-[280px] rounded-lg border border-border bg-card shadow-lg transition-all duration-smooth ease-liquid">
                      <div className="border-b border-border p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-10 overflow-hidden rounded-md border border-border bg-muted">
                            {currentUserAvatar ? (
                              <img src={currentUserAvatar} alt={currentUserName} className="h-full w-full object-cover" />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs font-semibold text-primary">
                                {initials}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col min-w-0">
                            <span className="truncate text-sm font-semibold text-foreground">
                              {currentUserName}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                              {currentUserHandle}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => {
                            onProfileClick?.()
                            setShowUserMenu(false)
                          }}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-smooth ease-liquid hover:bg-accent"
                        >
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-foreground">View Profile</span>
                        </button>

                        <button
                          onClick={() => {
                            onSettingsClick?.()
                            setShowUserMenu(false)
                          }}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm transition-smooth ease-liquid hover:bg-accent"
                        >
                          <svg className="h-4 w-4 text-muted-foreground" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-foreground">Settings</span>
                        </button>

                        <div className="my-2 border-t border-border" />

                        <button
                          onClick={() => {
                            onSignOutClick?.()
                            setShowUserMenu(false)
                          }}
                          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-smooth ease-liquid hover:bg-destructive/10"
                        >
                          <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </MotionNav>

        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    )
  }
)

NavigationShell.displayName = "NavigationShell"

export { NavigationShell }
