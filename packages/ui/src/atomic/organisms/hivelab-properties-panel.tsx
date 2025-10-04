"use client"

import * as React from "react"
import { cn } from "../../lib/utils"
import { Card } from "../atoms/card"
import { Input } from "../atoms/input"
import { Label } from "../atoms/label"
import { Textarea } from "../atoms/textarea"
import { Switch } from "../atoms/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../atoms/select"
import { Button } from "../atoms/button"
import { Settings, Trash2 } from "lucide-react"
import type { CanvasElement } from "./hivelab-builder-canvas"

export interface HiveLabPropertiesPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Selected element */
  selectedElement?: CanvasElement | null

  /** Property change handler */
  onPropertyChange?: (property: string, value: any) => void

  /** Delete element handler */
  onDeleteElement?: () => void
}

const HiveLabPropertiesPanel = React.forwardRef<HTMLDivElement, HiveLabPropertiesPanelProps>(
  (
    {
      className,
      selectedElement,
      onPropertyChange,
      onDeleteElement,
      ...props
    },
    ref
  ) => {
    if (!selectedElement) {
      return (
        <Card ref={ref} className={cn("flex flex-col h-full", className)} {...props}>
          <div className="p-4 border-b border-white/8">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-white/70" />
              <h3 className="text-sm font-semibold text-white">Properties</h3>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center text-center p-8">
            <div>
              <div className="text-4xl mb-3">⚙️</div>
              <p className="text-sm font-medium text-white mb-1">No Element Selected</p>
              <p className="text-xs text-white/70">
                Click an element on the canvas to configure its properties
              </p>
            </div>
          </div>
        </Card>
      )
    }

    return (
      <Card ref={ref} className={cn("flex flex-col h-full", className)} {...props}>
        {/* Header */}
        <div className="p-4 border-b border-white/8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedElement.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-white">{selectedElement.name}</h3>
                <p className="text-xs text-white/70">{selectedElement.category}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 text-red-500 hover:text-red-500"
              onClick={onDeleteElement}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-white/70">{selectedElement.description}</p>
        </div>

        {/* Properties Form */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Common Properties */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="label" className="text-xs">
                Label
              </Label>
              <Input
                id="label"
                placeholder="Enter label..."
                defaultValue={selectedElement.name}
                className="h-8 text-sm"
                onChange={(e: React.ChangeEvent) => onPropertyChange?.("label", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-xs">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Add description..."
                defaultValue={selectedElement.description}
                className="text-sm resize-none"
                rows={2}
                onChange={(e: React.ChangeEvent) => onPropertyChange?.("description", e.target.value)}
              />
            </div>
          </div>

          {/* Category-Specific Properties */}
          {selectedElement.category === "interaction" && (
            <div className="space-y-3 pt-3 border-t border-white/8">
              <h4 className="text-xs font-semibold text-white">Interaction Settings</h4>

              <div className="space-y-1.5">
                <Label htmlFor="placeholder" className="text-xs">
                  Placeholder Text
                </Label>
                <Input
                  id="placeholder"
                  placeholder="Enter placeholder..."
                  className="h-8 text-sm"
                  onChange={(e: React.ChangeEvent) => onPropertyChange?.("placeholder", e.target.value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="required" className="text-xs">
                  Required Field
                </Label>
                <Switch
                  id="required"
                  onCheckedChange={(checked) => onPropertyChange?.("required", checked)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="validation" className="text-xs">
                  Validation Rule
                </Label>
                <Select onValueChange={(value) => onPropertyChange?.("validation", value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select validation..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {selectedElement.category === "logic" && (
            <div className="space-y-3 pt-3 border-t border-white/8">
              <h4 className="text-xs font-semibold text-white">Logic Settings</h4>

              <div className="space-y-1.5">
                <Label htmlFor="condition" className="text-xs">
                  Condition
                </Label>
                <Select onValueChange={(value) => onPropertyChange?.("condition", value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select condition..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equals">Equals</SelectItem>
                    <SelectItem value="not-equals">Not Equals</SelectItem>
                    <SelectItem value="contains">Contains</SelectItem>
                    <SelectItem value="greater-than">Greater Than</SelectItem>
                    <SelectItem value="less-than">Less Than</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="value" className="text-xs">
                  Compare Value
                </Label>
                <Input
                  id="value"
                  placeholder="Enter value..."
                  className="h-8 text-sm"
                  onChange={(e: React.ChangeEvent) => onPropertyChange?.("compareValue", e.target.value)}
                />
              </div>
            </div>
          )}

          {selectedElement.category === "display" && (
            <div className="space-y-3 pt-3 border-t border-white/8">
              <h4 className="text-xs font-semibold text-white">Display Settings</h4>

              <div className="space-y-1.5">
                <Label htmlFor="format" className="text-xs">
                  Display Format
                </Label>
                <Select onValueChange={(value) => onPropertyChange?.("format", value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select format..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="chart">Chart</SelectItem>
                    <SelectItem value="table">Table</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-icon" className="text-xs">
                  Show Icon
                </Label>
                <Switch
                  id="show-icon"
                  defaultChecked
                  onCheckedChange={(checked) => onPropertyChange?.("showIcon", checked)}
                />
              </div>
            </div>
          )}

          {selectedElement.category === "action" && (
            <div className="space-y-3 pt-3 border-t border-white/8">
              <h4 className="text-xs font-semibold text-white">Action Settings</h4>

              <div className="space-y-1.5">
                <Label htmlFor="action-type" className="text-xs">
                  Action Type
                </Label>
                <Select onValueChange={(value) => onPropertyChange?.("actionType", value)}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select action..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Post to Feed</SelectItem>
                    <SelectItem value="notify">Send Notification</SelectItem>
                    <SelectItem value="email">Send Email</SelectItem>
                    <SelectItem value="calendar">Create Event</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="auto-trigger" className="text-xs">
                  Auto Trigger
                </Label>
                <Switch
                  id="auto-trigger"
                  onCheckedChange={(checked) => onPropertyChange?.("autoTrigger", checked)}
                />
              </div>
            </div>
          )}

          {/* Advanced Settings */}
          <div className="space-y-3 pt-3 border-t border-white/8">
            <h4 className="text-xs font-semibold text-white">Advanced</h4>

            <div className="space-y-1.5">
              <Label htmlFor="custom-id" className="text-xs">
                Custom ID
              </Label>
              <Input
                id="custom-id"
                placeholder="element-id"
                defaultValue={selectedElement.canvasId}
                className="h-8 text-sm font-mono"
                disabled
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="visible" className="text-xs">
                Visible
              </Label>
              <Switch
                id="visible"
                defaultChecked
                onCheckedChange={(checked) => onPropertyChange?.("visible", checked)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/8 bg-white/5">
          <p className="text-[10px] text-white/70 text-center">
            Changes are saved automatically
          </p>
        </div>
      </Card>
    )
  }
)

HiveLabPropertiesPanel.displayName = "HiveLabPropertiesPanel"

export { HiveLabPropertiesPanel }
