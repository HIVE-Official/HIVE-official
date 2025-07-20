"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system';
import { ChevronDown, Check, Search, X, Plus } from 'lucide-react';

// HIVE Select System - Magnetic Dropdowns with Search and Multi-Select
// Sophisticated select components with magnetic interactions and liquid metal motion

const hiveSelectVariants = cva(
  // Base select styles - matte obsidian glass
  "relative w-full",
  {
    variants: {
      variant: {
        default: "",
        premium: "",
        minimal: "",
      },
      
      size: {
        sm: "",
        default: "",
        lg: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const selectTriggerVariants = cva(
  // Select trigger styles
  "flex items-center justify-between w-full px-4 py-3 bg-black/40 backdrop-blur-xl border rounded-xl transition-all cursor-pointer",
  {
    variants: {
      variant: {
        default: "border-white/20 hover:border-white/30 focus:border-yellow-500/50",
        premium: "border-yellow-500/30 hover:border-yellow-500/50 focus:border-yellow-500",
        minimal: "border-white/10 hover:border-white/20 focus:border-white/30",
      },
      
      size: {
        sm: "px-3 py-2 text-sm",
        default: "px-4 py-3",
        lg: "px-5 py-4 text-lg",
      },
      
      state: {
        default: "",
        open: "border-yellow-500/50",
        disabled: "opacity-50 cursor-not-allowed",
        error: "border-red-500/50",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

// Option animation variants
const optionVariants = {
  rest: {
    x: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  hover: {
    x: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  selected: {
    x: 6,
    backgroundColor: 'rgba(255, 212, 0, 0.15)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

// Dropdown animation
const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
      staggerChildren: cascadeTiming.stagger,
    }
  }
};

const optionStaggerVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
    }
  }
};

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  group?: string;
}

export interface HiveSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof hiveSelectVariants> {
  options: SelectOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  multiple?: boolean;
  clearable?: boolean;
  creatable?: boolean;
  disabled?: boolean;
  error?: boolean;
  loading?: boolean;
  maxHeight?: string;
  noOptionsMessage?: string;
  emptySearchMessage?: string;
  renderOption?: (option: SelectOption) => React.ReactNode;
  renderValue?: (value: string | string[], options: SelectOption[]) => React.ReactNode;
}

const HiveSelect = React.forwardRef<HTMLDivElement, HiveSelectProps>(
  ({ 
    className,
    variant,
    size,
    options,
    value,
    defaultValue,
    onValueChange,
    placeholder = "Select an option...",
    searchable = false,
    searchPlaceholder = "Search options...",
    multiple = false,
    clearable = false,
    creatable = false,
    disabled = false,
    error = false,
    loading = false,
    maxHeight = "300px",
    noOptionsMessage = "No options available",
    emptySearchMessage = "No options found",
    renderOption,
    renderValue,
    ...props 
  }, ref) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue || (multiple ? [] : '')
    );
    
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
        option.description?.toLowerCase().includes(query)
      );
    }, [options, searchQuery]);
    
    // Group options by group property
    const groupedOptions = useMemo(() => {
      const groups: Record<string, SelectOption[]> = {};
      
      filteredOptions.forEach(option => {
        const group = option.group || 'ungrouped';
        if (!groups[group]) groups[group] = [];
        groups[group].push(option);
      });
      
      return groups;
    }, [filteredOptions]);
    
    // Close dropdown on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setSearchQuery('');
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
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
              handleOptionSelect(filteredOptions[highlightedIndex]);
            }
            break;
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, highlightedIndex, filteredOptions]);
    
    // Reset highlighted index when filtered options change
    useEffect(() => {
      setHighlightedIndex(0);
    }, [filteredOptions]);
    
    // Focus search input when opening
    useEffect(() => {
      if (isOpen && searchable && searchRef.current) {
        setTimeout(() => searchRef.current?.focus(), 100);
      }
    }, [isOpen, searchable]);
    
    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) {
          setSearchQuery('');
        }
      }
    };
    
    const handleOptionSelect = (option: SelectOption) => {
      if (option.disabled) return;
      
      let newValue: string | string[];
      
      if (multiple) {
        const currentArray = Array.isArray(currentValue) ? currentValue : [];
        if (currentArray.includes(option.value)) {
          newValue = currentArray.filter(v => v !== option.value);
        } else {
          newValue = [...currentArray, option.value];
        }
      } else {
        newValue = option.value;
        setIsOpen(false);
        setSearchQuery('');
      }
      
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };
    
    const handleClear = () => {
      const newValue = multiple ? [] : '';
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };
    
    const handleCreateOption = () => {
      if (!creatable || !searchQuery) return;
      
      const newOption: SelectOption = {
        value: searchQuery,
        label: searchQuery,
      };
      
      handleOptionSelect(newOption);
      setSearchQuery('');
    };
    
    const isSelected = (option: SelectOption) => {
      if (multiple) {
        return Array.isArray(currentValue) && currentValue.includes(option.value);
      }
      return currentValue === option.value;
    };
    
    const getDisplayValue = () => {
      if (renderValue) {
        return renderValue(currentValue, options);
      }
      
      if (multiple) {
        const selectedOptions = options.filter(opt => 
          Array.isArray(currentValue) && currentValue.includes(opt.value)
        );
        
        if (selectedOptions.length === 0) return placeholder;
        if (selectedOptions.length === 1) return selectedOptions[0].label;
        return `${selectedOptions.length} items selected`;
      }
      
      const selectedOption = options.find(opt => opt.value === currentValue);
      return selectedOption ? selectedOption.label : placeholder;
    };
    
    const renderOptionContent = (option: SelectOption) => {
      if (renderOption) {
        return renderOption(option);
      }
      
      return (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {option.icon && (
              <div className="text-white/60 shrink-0">
                {option.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-white truncate">
                {option.label}
              </div>
              {option.description && (
                <div className="text-xs text-white/50 truncate">
                  {option.description}
                </div>
              )}
            </div>
          </div>
          
          {isSelected(option) && (
            <Check size={16} className="text-yellow-400 shrink-0" />
          )}
        </div>
      );
    };
    
    const shouldShowCreateOption = creatable && searchQuery && 
      !filteredOptions.some(opt => opt.label.toLowerCase() === searchQuery.toLowerCase());
    
    return (
      <div
        ref={selectRef}
        className={cn(hiveSelectVariants({ variant, size, className }))}
        {...props}
      >
        {/* Select Trigger */}
        <motion.div
          className={cn(selectTriggerVariants({ 
            variant, 
            size, 
            state: error ? 'error' : isOpen ? 'open' : disabled ? 'disabled' : 'default' 
          }))}
          onClick={handleToggle}
          whileHover={!disabled ? { scale: 1.01 } : {}}
          whileTap={!disabled ? { scale: 0.99 } : {}}
        >
          <span className={cn(
            "truncate",
            currentValue && (multiple ? Array.isArray(currentValue) && currentValue.length > 0 : currentValue !== '') 
              ? "text-white" 
              : "text-white/50"
          )}>
            {getDisplayValue()}
          </span>
          
          <div className="flex items-center space-x-2 shrink-0 ml-2">
            {clearable && currentValue && (multiple ? Array.isArray(currentValue) && currentValue.length > 0 : currentValue !== '') && (
              <motion.button
                className="text-white/60 hover:text-white/80 p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
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
              <ChevronDown size={16} className="text-white/60" />
            </motion.div>
          </div>
        </motion.div>
        
        {/* Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 z-50 mt-2 bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Search Input */}
              {searchable && (
                <div className="p-3 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
                    <input
                      ref={searchRef}
                      className="w-full bg-black/40 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-yellow-500/50"
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              )}
              
              {/* Options List */}
              <div className="max-h-60 overflow-y-auto py-2" style={{ maxHeight }}>
                {loading ? (
                  <div className="px-4 py-8 text-center text-white/60">
                    <div className="animate-spin w-5 h-5 border-2 border-white/20 border-t-yellow-400 rounded-full mx-auto mb-2" />
                    Loading options...
                  </div>
                ) : filteredOptions.length === 0 ? (
                  <div className="px-4 py-8 text-center text-white/60">
                    {searchQuery ? emptySearchMessage : noOptionsMessage}
                  </div>
                ) : (
                  <motion.div variants={dropdownVariants}>
                    {/* Create Option */}
                    {shouldShowCreateOption && (
                      <motion.button
                        className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-white/10 transition-colors"
                        variants={optionStaggerVariants}
                        onClick={handleCreateOption}
                      >
                        <Plus size={16} className="text-yellow-400" />
                        <span className="text-white">Create "{searchQuery}"</span>
                      </motion.button>
                    )}
                    
                    {/* Regular Options */}
                    {Object.entries(groupedOptions).map(([groupName, groupOptions]) => (
                      <div key={groupName}>
                        {groupName !== 'ungrouped' && (
                          <div className="px-4 py-2 text-xs font-medium text-white/40 uppercase tracking-wider">
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
                                option.disabled && "opacity-50 cursor-not-allowed"
                              )}
                              variants={optionVariants}
                              initial="rest"
                              animate={selected ? "selected" : isHighlighted ? "hover" : "rest"}
                              whileHover={!option.disabled ? "hover" : "rest"}
                              onClick={() => handleOptionSelect(option)}
                              onMouseEnter={() => setHighlightedIndex(globalIndex)}
                              disabled={option.disabled}
                            >
                              <motion.div variants={optionStaggerVariants}>
                                {renderOptionContent(option)}
                              </motion.div>
                            </motion.button>
                          );
                        })}
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

HiveSelect.displayName = "HiveSelect";

// Multi-select tag component for displaying selected values
export const HiveSelectTags: React.FC<{
  options: SelectOption[];
  value: string[];
  onRemove: (value: string) => void;
  maxDisplay?: number;
}> = ({ options, value, onRemove, maxDisplay = 3 }) => {
  const selectedOptions = options.filter(opt => value.includes(opt.value));
  const displayOptions = selectedOptions.slice(0, maxDisplay);
  const remainingCount = selectedOptions.length - maxDisplay;
  
  return (
    <div className="flex flex-wrap gap-2">
      {displayOptions.map(option => (
        <motion.div
          key={option.value}
          className="flex items-center space-x-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          {option.icon && <span>{option.icon}</span>}
          <span>{option.label}</span>
          <button
            onClick={() => onRemove(option.value)}
            className="text-yellow-400/60 hover:text-yellow-400 transition-colors"
          >
            <X size={12} />
          </button>
        </motion.div>
      ))}
      
      {remainingCount > 0 && (
        <div className="bg-white/10 text-white/60 px-3 py-1 rounded-full text-sm">
          +{remainingCount} more
        </div>
      )}
    </div>
  );
};

export { 
  HiveSelect,
  hiveSelectVariants
};