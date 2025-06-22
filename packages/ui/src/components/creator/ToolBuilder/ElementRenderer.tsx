"use client";

import React from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Checkbox } from "../../ui/checkbox";
import { Badge } from "../../ui/badge";
import type { Element, ElementInstance } from "@hive/core";
import { Clock, Star, Image as ImageIcon } from "lucide-react";

// Type definitions for element configurations
interface ElementStyle {
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: "left" | "center" | "right" | "justify";
  width?: string;
  height?: string;
}

interface ChoiceOption {
  label: string;
  value: string;
}

interface ElementConfig {
  style?: ElementStyle;
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
  thickness?: number;
  color?: string;
  margin?: number;
  variant?: string;
  size?: string;
  disabled?: boolean;
  label?: string;
  options?: ChoiceOption[];
  multiple?: boolean;
  type?: string;
  placeholder?: string;
  required?: boolean;
  format?: string;
  maxRating?: number;
  value?: number;
  max?: number;
  showPercentage?: boolean;
  direction?: string;
  alignment?: string;
  spacing?: number;
  wrap?: boolean;
}

interface ElementRendererProps {
  elementInstance: ElementInstance;
  elementDefinition: Element;
  isSelected?: boolean;
  isPreview?: boolean;
  onSelect?: () => void;
  onUpdate?: (updates: Partial<ElementInstance>) => void;
  className?: string;
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
  elementInstance,
  elementDefinition,
  isSelected = false,
  isPreview = false,
  onSelect,
  onUpdate: _onUpdate,
  className,
}) => {
  const config = (elementInstance.config as ElementConfig) || {};
  const style = config.style || {};

  // Common wrapper styles
  const wrapperStyles = {
    padding: style.padding || 16,
    margin: style.margin || 0,
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    borderRadius: style.borderRadius || 4,
    borderWidth: style.borderWidth || 0,
    borderColor: style.borderColor || "transparent",
    borderStyle: "solid" as const,
  };

  const handleClick = () => {
    if (!isPreview && onSelect) {
      onSelect();
    }
  };

  const renderElement = () => {
    switch (elementInstance.elementId) {
      case "textBlock-v1": {
        return (
          <div
            className="prose prose-sm max-w-none"
            style={{
              fontSize: style.fontSize || "16px",
              fontWeight: style.fontWeight || "normal",
              textAlign: style.textAlign || "left",
            }}
          >
            {config.text || "Sample text content"}
          </div>
        );
      }

      case "imageBlock-v1": {
        return (
          <div className="relative">
            {config.src ? (
              <img
                src={config.src}
                alt={config.alt || ""}
                className="max-w-full h-auto rounded"
                style={{
                  width: style.width || "auto",
                  height: style.height || "auto",
                }}
              />
            ) : (
              <div className="flex items-center justify-center bg-muted rounded h-32 w-full">
                <ImageIcon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            {config.caption && (
              <p className="text-sm text-muted-foreground mt-2">
                {config.caption}
              </p>
            )}
          </div>
        );
      }

      case "divider-v1": {
        return (
          <hr
            className="border-0"
            style={{
              height: config.thickness || 1,
              backgroundColor: config.color || "#e5e7eb",
              borderStyle: "solid" as const,
              margin: `${config.margin || 16}px 0`,
            }}
          />
        );
      }

      case "button-v1": {
        return (
          <Button
            variant={
              config.variant as "primary" | "secondary" | "outline" | undefined
            }
            size={
              config.size === "md"
                ? "default"
                : (config.size as "sm" | "lg" | "default" | undefined)
            }
            disabled={!isPreview ? true : config.disabled}
            className={cn(!isPreview && "pointer-events-none")}
          >
            {config.text || "Button"}
          </Button>
        );
      }

      case "choiceSelect-v1": {
        const options = config.options || [];
        const multiple = config.multiple;

        return (
          <div className="space-y-3">
            {config.label && (
              <Label className="text-sm font-medium">{config.label}</Label>
            )}
            <div className="space-y-2">
              {multiple ? (
                // Checkbox group for multiple selection
                options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox id={`option-${index}`} disabled={!isPreview} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {option.label || `Option ${index + 1}`}
                    </Label>
                  </div>
                ))
              ) : (
                // Radio group for single selection
                <RadioGroup disabled={!isPreview}>
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option.value || `option-${index}`}
                        id={`option-${index}`}
                      />
                      <Label
                        htmlFor={`option-${index}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {option.label || `Option ${index + 1}`}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </div>
        );
      }

      case "textInput-v1": {
        return (
          <div className="space-y-2">
            {config.label && (
              <Label className="text-sm font-medium">{config.label}</Label>
            )}
            <Input
              type={config.type || "text"}
              placeholder={config.placeholder || "Enter text..."}
              disabled={!isPreview}
              required={config.required}
            />
          </div>
        );
      }

      case "countdownTimer-v1": {
        return (
          <div className="text-center space-y-2">
            {config.label && (
              <Label className="text-sm font-medium block">
                {config.label}
              </Label>
            )}
            <div className="flex items-center justify-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="font-mono text-lg">
                {isPreview ? "00:00:00" : "Preview Mode"}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Format: {config.format || "dhms"}
            </div>
          </div>
        );
      }

      case "ratingStars-v1": {
        const maxRating = config.maxRating || 5;
        return (
          <div className="space-y-2">
            {config.label && (
              <Label className="text-sm font-medium">{config.label}</Label>
            )}
            <div className="flex space-x-1">
              {Array.from({ length: maxRating }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5 cursor-pointer",
                    isPreview
                      ? "text-yellow-400 fill-current"
                      : "text-muted-foreground"
                  )}
                />
              ))}
            </div>
          </div>
        );
      }

      case "progressBar-v1": {
        const value = config.value || 0;
        const max = config.max || 100;
        const percentage = Math.min((value / max) * 100, 100);

        return (
          <div className="space-y-2">
            {config.label && (
              <Label className="text-sm font-medium">{config.label}</Label>
            )}
            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>
            {config.showPercentage && (
              <div className="text-xs text-muted-foreground text-center">
                {Math.round(percentage)}%
              </div>
            )}
          </div>
        );
      }

      case "stack-v1": {
        return (
          <div
            className={cn(
              "flex",
              config.direction === "horizontal" ? "flex-row" : "flex-col",
              {
                "items-start": config.alignment === "start",
                "items-center": config.alignment === "center",
                "items-end": config.alignment === "end",
                "items-stretch": config.alignment === "stretch",
              },
              config.wrap && "flex-wrap"
            )}
            style={{
              gap: config.spacing || 8,
            }}
          >
            <div className="p-4 border-2 border-dashed border-muted-foreground/30 rounded text-sm text-muted-foreground text-center">
              Drop elements here
            </div>
          </div>
        );
      }

      default: {
        return (
          <div className="p-4 border border-dashed border-muted-foreground/50 rounded text-center">
            <Badge variant="secondary" className="mb-2">
              {elementInstance.elementId}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Unknown element type
            </p>
          </div>
        );
      }
    }
  };

  return (
    <div
      className={cn(
        "relative group",
        !elementInstance.isVisible && "opacity-50",
        elementInstance.isLocked && "pointer-events-none",
        isSelected && "ring-2 ring-primary ring-offset-2",
        !isPreview && "cursor-pointer hover:ring-1 hover:ring-primary/50",
        className
      )}
      style={wrapperStyles}
      onClick={handleClick}
    >
      {/* Selection indicator */}
      {!isPreview && isSelected && (
        <div className="absolute -top-6 left-0 z-10">
          <Badge variant="default" className="text-xs">
            {elementDefinition.name}
          </Badge>
        </div>
      )}

      {/* Element content */}
      <div className="relative">{renderElement()}</div>

      {/* Locked indicator */}
      {!isPreview && elementInstance.isLocked && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="text-xs">
            Locked
          </Badge>
        </div>
      )}

      {/* Hidden indicator */}
      {!isPreview && !elementInstance.isVisible && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="outline" className="text-xs">
            Hidden
          </Badge>
        </div>
      )}
    </div>
  );
};
