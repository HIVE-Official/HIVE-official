"use client";

import React from 'react';
import { cn } from '../../lib/utils';

export type NavigationStyle = 'auto' | 'sidebar' | 'tabs';

interface NavigationPreferencesProps {
  value: NavigationStyle;
  onChange: (value: NavigationStyle) => void;
  className?: string
}

const options: { value: NavigationStyle; label: string; description: string }[] = [
  {
    value: 'auto',
    label: 'Automatic',
    description: 'Adapts to your screen size and usage patterns'
  },
  {
    value: 'sidebar',
    label: 'Sidebar',
    description: 'Always show navigation in a side panel'
  },
  {
    value: 'tabs',
    label: 'Top Tabs',
    description: 'Show navigation as tabs at the top'
  }
];

export function NavigationPreferences({ value, onChange, className }: NavigationPreferencesProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-colors",
              value === option.value
                ? "border-[var(--hive-brand-gold)] bg-[var(--hive-brand-gold)]/5"
                : "border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] hover:border-[var(--hive-border-interactive)]"
            )}
          >
            <input
              type="radio"
              name="navigation-preference"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-1 w-4 h-4 text-[var(--hive-brand-gold)] bg-transparent border-[var(--hive-border-primary)] focus:ring-[var(--hive-brand-gold)] focus:ring-2"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-[var(--hive-text-primary)]">
                  {option.label}
                </span>
                {value === option.value && (
                  <span className="text-xs px-2 py-1 bg-[var(--hive-brand-gold)] text-[var(--hive-text-inverse)] rounded-full font-medium">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--hive-text-secondary)] mt-1">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}