"use client";

import React from 'react';
import { cn } from '../../lib/utils';

export type NavigationStyle = 'auto' | 'sidebar' | 'tabs';

interface NavigationPreferencesProps {
  value: NavigationStyle;
  onChange: (value: NavigationStyle) => void;
  className?: string;
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
                ? "border-[#FFD700] bg-[rgba(255,215,0,0.05)]"
                : "border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.02)] hover:border-[rgba(255,255,255,0.2)]"
            )}
          >
            <input
              type="radio"
              name="navigation-preference"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-1 w-4 h-4 text-[#FFD700] bg-transparent border-[rgba(255,255,255,0.3)] focus:ring-[#FFD700] focus:ring-2"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-white">
                  {option.label}
                </span>
                {value === option.value && (
                  <span className="text-xs px-2 py-1 bg-[#FFD700] text-[#0A0A0A] rounded-full font-medium">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-[#A1A1AA] mt-1">
                {option.description}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}