"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Switch } from "./switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Label } from "./label"

export interface NavigationPreference {
  id: string
  label: string
  description?: string
  value: boolean | string
  type: 'boolean' | 'select'
  options?: Array<{ value: string; label: string }>
}

export interface NavigationPreferencesProps {
  preferences: NavigationPreference[]
  onPreferenceChange: (id: string, value: boolean | string) => void
  className?: string
}

const NavigationPreferences = React.forwardRef<HTMLDivElement, NavigationPreferencesProps>(
  ({ preferences, onPreferenceChange, className, ...props }, ref) => {
    return (
      <Card ref={ref} className={cn("w-full", className)} {...props}>
        <CardHeader>
          <CardTitle>Navigation Preferences</CardTitle>
          <CardDescription>
            Customize how you navigate through HIVE
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {preferences.map((preference) => (
            <div key={preference.id} className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label htmlFor={preference.id} className="text-sm font-medium">
                  {preference.label}
                </Label>
                {preference.description && (
                  <p className="text-xs text-[var(--hive-text-secondary)]">
                    {preference.description}
                  </p>
                )}
              </div>

              <div className="flex-shrink-0">
                {preference.type === 'boolean' ? (
                  <Switch
                    id={preference.id}
                    checked={preference.value as boolean}
                    onCheckedChange={(checked) => onPreferenceChange(preference.id, checked)}
                  />
                ) : (
                  <Select
                    value={preference.value as string}
                    onValueChange={(value) => onPreferenceChange(preference.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      {preference.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    )
  }
)

NavigationPreferences.displayName = "NavigationPreferences"

export { NavigationPreferences }