import * as React from "react";
import { cn } from "../../../lib/utils";
import { Badge } from "../../atoms/badge";

type IconComponent = React.ComponentType<{ className?: string }>;

export interface AdminNavItem {
  id: string;
  label: string;
  href?: string;
  description?: string;
  icon?: IconComponent;
  badge?: React.ReactNode;
  active?: boolean;
}

export interface AdminShellProps {
  title: string;
  subtitle?: string;
  campusName: string;
  navItems: AdminNavItem[];
  actions?: React.ReactNode;
  children: React.ReactNode;
  banner?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  navFooter?: React.ReactNode;
  onSelectNavItem?: (item: AdminNavItem) => void;
}

export function AdminShell({
  title,
  subtitle,
  campusName,
  navItems,
  actions,
  children,
  banner,
  footer,
  className,
  navFooter,
  onSelectNavItem,
}: AdminShellProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]",
        className,
      )}
    >
      <AdminNavRail
        campusName={campusName}
        items={navItems}
        footer={navFooter}
        onSelect={onSelectNavItem}
      />
      <div className="relative flex min-h-screen flex-1 flex-col bg-[linear-gradient(135deg,rgba(10,10,10,0.92)_0%,rgba(20,20,25,0.88)_50%,rgba(10,10,10,0.92)_100%)]">
        <AdminTopBar
          title={title}
          subtitle={subtitle}
          campusName={campusName}
          actions={actions}
        />
        <AdminMobileNav
          items={navItems}
          onSelect={onSelectNavItem}
        />
        {banner && (
          <div className="border-b border-white/10 bg-white/[0.03] px-4 py-3 md:px-8">
            {banner}
          </div>
        )}
        <main className="flex-1 px-4 pb-16 pt-8 md:px-8">{children}</main>
        {footer && (
          <footer className="border-t border-white/10 bg-black/40 px-4 py-6 md:px-8">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

export interface AdminTopBarProps {
  title: string;
  subtitle?: string;
  campusName: string;
  actions?: React.ReactNode;
}

export function AdminTopBar({
  title,
  subtitle,
  campusName,
  actions,
}: AdminTopBarProps) {
  return (
    <header className="border-b border-white/10 bg-black/60 px-4 py-4 backdrop-blur-lg md:px-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
              {title}
            </h1>
            <Badge
              variant="outline"
              className="border-white/20 bg-white/5 text-[10px] uppercase tracking-wider text-white/70"
            >
              {campusName}
            </Badge>
          </div>
          {subtitle && (
            <p className="mt-1 text-sm text-white/60 md:text-base">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex flex-wrap items-center gap-2">{actions}</div>
        )}
      </div>
    </header>
  );
}

export interface AdminNavRailProps {
  campusName: string;
  items: AdminNavItem[];
  footer?: React.ReactNode;
  onSelect?: (item: AdminNavItem) => void;
}

export function AdminNavRail({
  campusName,
  items,
  footer,
  onSelect,
}: AdminNavRailProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="hidden w-64 flex-none border-r border-white/10 bg-black/75 px-3 py-6 backdrop-blur lg:flex">
      <div className="flex h-full w-full flex-col">
        <div className="px-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-white/40">
            Hive Admin
          </div>
          <div className="text-sm text-white/60">{campusName}</div>
        </div>
        <nav className="mt-6 flex-1 space-y-1 text-sm" aria-label="Admin primary navigation">
          {items.map((item) => {
            const Icon = item.icon;
            const content = (
              <div
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[var(--hive-brand-primary)]/70",
                  item.active
                    ? "bg-[var(--hive-brand-primary)]/15 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                )}
              >
                {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
                <div className="flex flex-1 flex-col">
                  <span className="font-medium">{item.label}</span>
                  {item.description && (
                    <span className="text-xs text-white/40">
                      {item.description}
                    </span>
                  )}
                </div>
                {typeof item.badge === "number" ? (
                  <span className="ml-auto inline-flex min-w-[1.6rem] items-center justify-center rounded-full bg-white/10 px-2 py-0.5 text-xs font-semibold text-white/80">
                    {item.badge}
                  </span>
                ) : (
                  item.badge
                )}
              </div>
            );

            if (item.href) {
              return (
                <a
                  key={item.id}
                  href={item.href}
                  className="block"
                  onClick={() => onSelect?.(item)}
                >
                  {content}
                </a>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                className="block w-full border-0 bg-transparent p-0 text-left"
                onClick={() => onSelect?.(item)}
              >
                {content}
              </button>
            );
          })}
        </nav>
        {footer && (
          <div className="mt-6 border-t border-white/10 pt-4 text-xs text-white/50">
            {footer}
          </div>
        )}
      </div>
    </aside>
  );
}

interface AdminMobileNavProps {
  items: AdminNavItem[];
  onSelect?: (item: AdminNavItem) => void;
}

function AdminMobileNav({ items, onSelect }: AdminMobileNavProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="border-b border-white/10 bg-black/40 px-4 py-2 md:hidden">
      <nav
        className="flex gap-2 overflow-x-auto text-sm"
        aria-label="Mobile admin navigation"
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black focus-visible:ring-[var(--hive-brand-primary)]/70",
              item.active
                ? "bg-[var(--hive-brand-primary)]/20 text-white"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white",
            )}
            onClick={() => onSelect?.(item)}
          >
            {item.icon && <item.icon className="h-3.5 w-3.5" aria-hidden="true" />}
            <span className="whitespace-nowrap">{item.label}</span>
            {typeof item.badge === "number" && item.badge > 0 && (
              <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white/20 px-2 text-[10px] font-semibold text-white/90">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
