"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system';
import { ChevronDown, Check, Search, X, Plus, Tag, Users, Hash } from 'lucide-react';

// HIVE Multi-Select System - Advanced tagging with search and creation
// Campus-focused multi-select with intelligent tagging and space management

const hiveMultiSelectVariants = cva(
  "relative w-full",
  {
    variants: {
      variant: {
        default: "",
        premium: "",
        elevated: "",
        minimal: "",
      },
      
      size: {
        sm: "",
        default: "",
        lg: "",
        xl: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const triggerVariants = cva(
  "flex flex-wrap items-center gap-2 w-full px-4 py-3 bg-[var(--hive-background-secondary)] backdrop-blur-xl border rounded-xl transition-all cursor-pointer min-h-[12.5]",
  {
    variants: {
      variant: {
        default: "border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] focus:border-[var(--hive-border-gold)]",
        premium: "border-[var(--hive-brand-secondary)] hover:border-[var(--hive-brand-secondary)] focus:border-[var(--hive-brand-secondary)] bg-transparent",
        elevated: "border-[var(--hive-border-primary)] hover:border-[var(--hive-border-secondary)] focus:border-[var(--hive-border-gold)] bg-[var(--hive-background-tertiary)]",
        minimal: "border-[var(--hive-border-subtle)] hover:border-[var(--hive-border-primary)] focus:border-[var(--hive-border-gold)] bg-transparent",
      },
      
      size: {
        sm: "px-3 py-2 text-sm min-h-10",
        default: "px-4 py-3 min-h-[12.5]",
        lg: "px-5 py-4 text-lg min-h-[15]",
        xl: "px-6 py-5 text-xl min-h-[70px]",
      },
      
      state: {
        default: "",
        open: "border-[var(--hive-brand-secondary)] bg-transparent",
        disabled: "opacity-50 cursor-not-allowed",
        error: "border-[var(--hive-status-error)]/50 bg-[var(--hive-status-error)]/5",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

const tagVariants = cva(
  "flex items-center space-x-2 px-3 py-1 rounded-xl text-sm font-medium transition-all",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-overlay-glass)] text-[var(--hive-text-primary)] border border-[var(--hive-border-subtle)]",
        premium: "bg-transparent text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]",
        elevated: "bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)] border border-[var(--hive-border-primary)]",
        minimal: "bg-transparent text-[var(--hive-text-secondary)] border border-[var(--hive-border-subtle)]",
      },
      
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-3 py-1 text-sm",
        lg: "px-4 py-2 text-base",
        xl: "px-5 py-2.5 text-lg",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  group?: string;
  variant?: 'default' | 'premium' | 'elevated' | 'minimal';
  metadata?: Record<string, any>
}

export interface HiveMultiSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof hiveMultiSelectVariants> {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  maxTags?: number;
  maxHeight?: string;
  creatable?: boolean;
  clearable?: boolean;
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
  noOptionsMessage?: string;
  emptySearchMessage?: string;
  createOptionMessage?: string;
  tagLimit?: number;
  showCount?: boolean;
  groupBy?: string;
  renderTag?: (option: MultiSelectOption, onRemove: () => void) => React.ReactNode;
  renderOption?: (option: MultiSelectOption) => React.ReactNode;
  renderCreateOption?: (query: string) => React.ReactNode;
  onCreateOption?: (query: string) => MultiSelectOption;
  validateNewOption?: (query: string) => boolean
}

const HiveMultiSelect = React.forwardRef<HTMLDivElement, HiveMultiSelectProps>(
  ({ 
    className,
    variant,
    size,
    options,
    value,
    defaultValue = [],
    onValueChange,
    placeholder = "Select options...",
    searchPlaceholder = "Search or create new...",
    maxTags = 5,
    maxHeight = "300px",
    creatable = true,
    clearable = true,
    disabled = false,
    error = false,
    loading = false,
    noOptionsMessage = "No options available",
    emptySearchMessage = "No options found",
    createOptionMessage = "Create new option",
    tagLimit = 10,
    showCount = true,
    groupBy,
    renderTag,
    renderOption,
    renderCreateOption,
    onCreateOption,
    validateNewOption,
    ...props 
  }, ref) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    
    const selectRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    
    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : internalValue;
    
    // Filter options based on search query
    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;
      
      const query = searchQuery.toLowerCase();
      return options.filter(option => 
        option.label.toLowerCase().includes(query) ||
        option.description?.toLowerCase().includes(query) ||
        option.group?.toLowerCase().includes(query)
      )
    }, [options, searchQuery]);
    
    // Group options by specified property
    const groupedOptions = useMemo(() => {
      if (!groupBy) return { ungrouped: filteredOptions };
      
      const groups: Record<string, MultiSelectOption[]> = {};
      
      filteredOptions.forEach(option => {
        const groupKey = option[groupBy as keyof MultiSelectOption] as string || 'ungrouped';
        if (!groups[groupKey]) groups[groupKey] = [];
        groups[groupKey].push(option)
      })};
      
      return groups
    }, [filteredOptions, groupBy]);
    
    // Selected options for display
    const selectedOptions = useMemo(() => {
      return options.filter(option => currentValue.includes(option.value))
    }, [options, currentValue]);
    
    // Close dropdown on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchQuery('')
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, []);
    
    // Keyboard navigation
    useEffect(() => {
      if (!isOpen) return;
      
      const handleKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
          case 'Escape':
            setIsOpen(false);
            setSearchQuery('');
            break;
          case 'ArrowDown':
            e.preventDefault();
            setHighlightedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
            break;
          case 'ArrowUp':
            e.preventDefault();
            setHighlightedIndex(prev => Math.max(prev - 1, 0));
            break;
          case 'Enter':
            e.preventDefault();
            if (filteredOptions[highlightedIndex]) {
              handleOptionSelect(filteredOptions[highlightedIndex])
            } else if (shouldShowCreateOption && creatable) {
              handleCreateOption()
            }
            break;
          case 'Backspace':
            if (searchQuery === '' && currentValue.length > 0) {
              // Remove last tag when backspace is pressed with empty search
              const newValue = currentValue.slice(0, -1);
              updateValue(newValue)
            }
            break
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, highlightedIndex, filteredOptions, searchQuery, currentValue]);
    
    // Reset highlighted index when filtered options change
    useEffect(() => {
      setHighlightedIndex(0)
    }, [filteredOptions]);
    
    // Focus search input when opening
    useEffect(() => {
      if (isOpen && searchRef.current) {
        setTimeout(() => searchRef.current?.focus(), 100)
      }
    }, [isOpen]);
    
    const updateValue = (newValue: string[]) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    };
    
    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) {
          setSearchQuery('')
        }
      }
    };
    
    const handleOptionSelect = (option: MultiSelectOption) => {
      if (option.disabled) return;
      
      const newValue = currentValue.includes(option.value)
        ? currentValue.filter(v => v !== option.value)
        : [...currentValue, option.value];
      
      if (tagLimit && newValue.length > tagLimit) {
        return; // Don't allow exceeding tag limit
      }
      
      updateValue(newValue);
      setSearchQuery('');
      
      // Keep dropdown open for multi-select
      if (searchRef.current) {
        searchRef.current.focus()
      }
    };
    
    const handleRemoveTag = (optionValue: string) => {
      const newValue = currentValue.filter(v => v !== optionValue);
      updateValue(newValue)
    };
    
    const handleClear = () => {
      updateValue([])
    };
    
    const handleCreateOption = () => {
      if (!creatable || !searchQuery) return;
      
      // Validate new option if validator provided
      if (validateNewOption && !validateNewOption(searchQuery)) {
        return
      }
      
      let newOption: MultiSelectOption;
      
      if (onCreateOption) {
        newOption = onCreateOption(searchQuery)
      } else {
        // Default option creation
        newOption = {
          value: searchQuery.toLowerCase().replace(/\s+/g, '-'),
          label: searchQuery,
          variant: 'default',
          metadata: { created: true, timestamp: Date.now() }
        }
      }
      
      // Add to options and select
      options.push(newOption);
      handleOptionSelect(newOption);
      setSearchQuery('')
    };
    
    const isSelected = (option: MultiSelectOption) => {
      return currentValue.includes(option.value)
    };
    
    const shouldShowCreateOption = creatable && searchQuery && 
      !filteredOptions.some(opt => opt.label.toLowerCase() === searchQuery.toLowerCase());
    
    const displayTags = selectedOptions.slice(0, maxTags);
    const remainingCount = selectedOptions.length - maxTags;
    
    const renderTagComponent = (option: MultiSelectOption, onRemove: () => void) => {
      if (renderTag) {
        return renderTag(option, onRemove)
      }
      
      return (
        <motion.div
          key={option.value}
          className={cn(tagVariants({ variant: option.variant, size }))}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {option.icon && <span className="shrink-0">{option.icon}</span>}
          <span className="truncate max-w-[30]">{option.label}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove()
          }}
            className="shrink-0 hover:bg-[var(--hive-text-primary)]/10 rounded-full p-0.5 transition-colors"
          >
            <X size={12} />
          </button>
        </motion.div>
      )
    };
    
    const renderOptionComponent = (option: MultiSelectOption) => {
      if (renderOption) {
        return renderOption(option)
      }
      
      return (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {option.icon && (
              <div className="text-[var(--hive-text-secondary)] shrink-0">
                {option.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-[var(--hive-text-primary)] truncate">
                {option.label}
              </div>
              {option.description && (
                <div className="text-xs text-[var(--hive-text-secondary)] truncate">
                  {option.description}
                </div>
              )}
            </div>
          </div>
          
          {isSelected(option) && (
            <Check size={16} className="text-[var(--hive-brand-primary)] shrink-0" />
          )}
        </div>
      )
    };
    
    return (
      <div
        ref={selectRef}
        className={cn(hiveMultiSelectVariants({ variant, size, className }))}
        {...props}
      >
        {/* Multi-Select Trigger */}
        <motion.div
          className={cn(triggerVariants({ 
            variant, 
            size, 
            state: error ? 'error' : isOpen ? 'open' : disabled ? 'disabled' : 'default' 
          }))}
          onClick={handleToggle}
          whileHover={!disabled ? { scale: 1.01 } : {}}
          whileTap={!disabled ? { scale: 0.99 } : {}}
        >
          {/* Selected Tags */}
          <AnimatePresence>
            {displayTags.map((option) => 
              renderTagComponent(option, () => handleRemoveTag(option.value))
            )}
          </AnimatePresence>
          
          {/* Remaining Count */}
          {remainingCount > 0 && (
            <motion.div
              className="bg-[var(--hive-overlay-glass)] text-[var(--hive-text-secondary)] px-2 py-1 rounded-full text-xs"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              +{remainingCount}
            </motion.div>
          )}
          
          {/* Placeholder */}
          {currentValue.length === 0 && (
            <span className="text-[var(--hive-text-muted)] flex-1">
              {placeholder}
            </span>
          )}
          
          {/* Controls */}
          <div className="flex items-center space-x-2 shrink-0 ml-auto">
            {showCount && currentValue.length > 0 && (
              <span className="text-xs text-[var(--hive-text-muted)]">
                {currentValue.length}{tagLimit ? `/${tagLimit}` : ''}
              </span>
            )}
            
            {clearable && currentValue.length > 0 && (
              <motion.button
                className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] p-1 rounded-full hover:bg-[var(--hive-overlay-glass)]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear()
          }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={14} />
              </motion.button>
            )}
            
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: motionDurations.quick }}
            >
              <ChevronDown size={16} className="text-[var(--hive-text-secondary)]" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 z-50 mt-2 bg-[var(--hive-background-secondary)] backdrop-blur-2xl border border-[var(--hive-border-primary)] rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: motionDurations.smooth, ease: liquidMetal.easing as any }}
            >
              {/* Search Input */}
              <div className="p-3 border-b border-[var(--hive-border-subtle)]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-muted)]" size={16} />
                  <input
                    ref={searchRef}
                    className="w-full bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-subtle)] rounded-xl pl-10 pr-4 py-2 text-[var(--hive-text-primary)] placeholder-[var(--hive-text-muted)] focus:outline-none focus:border-[var(--hive-brand-secondary)]"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Options List */}
              <div className="max-h-60 overflow-y-auto py-2" style={{ maxHeight }}>
                {loading ? (
                  <div className="px-4 py-8 text-center text-[var(--hive-text-secondary)]">
                    <div className="animate-spin w-5 h-5 border-2 border-[var(--hive-border-subtle)] border-t-[var(--hive-brand-primary)] rounded-full mx-auto mb-2" />
                    Loading options...
                  </div>
                ) : filteredOptions.length === 0 && !shouldShowCreateOption ? (
                  <div className="px-4 py-8 text-center text-[var(--hive-text-secondary)]">
                    <Tag className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    {searchQuery ? emptySearchMessage : noOptionsMessage}
                  </div>
                ) : (
                  <div>
                    {/* Create Option */}
                    {shouldShowCreateOption && (
                      <motion.button
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-[var(--hive-overlay-glass)] transition-colors border-b border-[var(--hive-border-subtle)]"
                        onClick={handleCreateOption}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plus size={16} className="text-[var(--hive-brand-primary)]" />
                        <div>
                          <div className="text-[var(--hive-text-primary)] font-medium">
                            {renderCreateOption ? renderCreateOption(searchQuery) : `Create "${searchQuery}"`}
                          </div>
                          <div className="text-xs text-[var(--hive-text-secondary)]">
                            {createOptionMessage}
                          </div>
                        </div>
                      </motion.button>
                    )}
                    
                    {/* Regular Options */}
                    {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                      <div key={groupName}>
                        {groupName !== 'ungrouped' && (
                          <div className="px-4 py-2 text-xs font-medium text-[var(--hive-text-muted)] uppercase tracking-wider border-b border-[var(--hive-border-subtle)]">
                            {groupName}
                          </div>
                        )}
                        
                        {groupOptions.map((option, index) => {
                          const globalIndex = filteredOptions.indexOf(option);
                          const isHighlighted = globalIndex === highlightedIndex;
                          const selected = isSelected(option);
                          
                          return (
                            <motion.button
                              key={option.value}
                              className={cn(
                                "w-full px-4 py-3 text-left transition-colors",
                                option.disabled && "opacity-50 cursor-not-allowed",
                                selected && "bg-[var(--hive-background-tertiary)] border-[var(--hive-brand-secondary)]",
                                isHighlighted && "bg-[var(--hive-overlay-glass)]"
                              )}
                              onClick={() => handleOptionSelect(option)}
                              onMouseEnter={() => setHighlightedIndex(globalIndex)}
                              disabled={option.disabled}
                              whileHover={!option.disabled ? { x: 4 } : {}}
                              whileTap={!option.disabled ? { scale: 0.98 } : {}}
                            >
                              {renderOptionComponent(option)}
                            </motion.button>
                          )
          })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
);

HiveMultiSelect.displayName = "HiveMultiSelect";

export { HiveMultiSelect, hiveMultiSelectVariants };