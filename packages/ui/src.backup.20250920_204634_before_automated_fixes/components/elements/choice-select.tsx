"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, X, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { ChoiceSelectConfigSchema } from '@hive/core';
import { z } from 'zod';

// Extract the config type from the schema;
type ChoiceSelectConfig = z.infer<typeof ChoiceSelectConfigSchema>;

interface ChoiceSelectProps {config: ChoiceSelectConfig;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  error?: string;
  className?: string;}

interface Option {value: string;
  label: string;
  disabled?: boolean;}

export const ChoiceSelect: React.FC<ChoiceSelectProps> = ({
  config,
  value = config.multiple ? [] : '',
  onChange,
  onBlur,
  onFocus,
  disabled = false,
  error,
  className;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { label, options, multiple, required, placeholder } = config;

  // Filter options based on search query;
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get selected options;
  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
  const selectedOptions = options.filter(option => selectedValues.includes(option.value));

  // Handle option selection;
  const handleOptionSelect = (option: Option) => {
    if (option.disabled) return;

    let newValue: string | string[];
    
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      if (currentValues.includes(option.value)) {
        newValue = currentValues.filter(v => v !== option.value)
      } else {
        newValue = [...currentValues, option.value]
      }
    } else {
      newValue = option.value;
      setIsOpen(false)
    }

    onChange?.(newValue)
  };

  // Handle keyboard navigation;
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true)
        } else if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
          handleOptionSelect(filteredOptions[focusedIndex] as Option)
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          )
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      case 'Tab':
        setIsOpen(false);
        break;
    }
  };

  // Close dropdown when clicking outside;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery('');
        setFocusedIndex(-1)
      }}
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);

  // Reset search and focus when opening;
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setFocusedIndex(-1);
      // Focus search input if dropdown opens and has many options;
      if (options.length > 5) {
        setTimeout(() => searchInputRef.current?.focus(), 100)
      }}
    }
  }, [isOpen, options.length]);

  // Remove selected option (for multiple select)
  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) {
      const newValue = value.filter(v => v !== optionValue);
      onChange?.(newValue)
    }}
  };

  const hasError = !!error;
  const isEmpty = multiple ? selectedValues.length === 0 : !value;

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
          {label}
          {required && <span className="text-[var(--hive-status-error)] ml-1">*</span>}
        </label>
      )}

      {/* Select Container */}
      <div className="relative">
        <button;
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          className={cn(
            // Base styles using HIVE design tokens;
            "w-full min-h-11 px-4 py-2 bg-[var(--hive-background-secondary)]/50",
            "border border-[var(--hive-border-primary)] rounded-lg",
            "text-left text-[var(--hive-text-primary)]",
            "transition-all duration-200 ease-out",
            "focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30",
            "focus:border-[var(--hive-brand-primary)]",
            "backdrop-blur-sm",
            
            // Interactive states;
            !disabled && [
              "hover:bg-[var(--hive-background-secondary)]/70",
              "hover:border-[var(--hive-border-secondary)]",
              "cursor-pointer"
            ],
            
            // Error state;
            hasError && [
              "border-[var(--hive-status-error)]",
              "focus:ring-[var(--hive-status-error)]/30"
            ],
            
            // Disabled state;
            disabled && [
              "opacity-50 cursor-not-allowed",
              "bg-[var(--hive-background-secondary)]/20"
            ],
            
            // Open state;
            isOpen && [
              "ring-2 ring-[var(--hive-brand-primary)]/30",
              "border-[var(--hive-brand-primary)]"
            ]
          )}
        >
          {/* Selected Values Display */}
          <div className="flex items-center justify-between">
            <div className="flex-1 flex items-center gap-2 flex-wrap">
              {isEmpty ? (
                <span className="text-[var(--hive-text-secondary)]">
                  {placeholder || 'Select an option...'}
                </span>
              ) : multiple ? (
                // Multiple selection display;
                selectedOptions.map(option => (
                  <motion.span;
                    key={option.value}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1",
                      "bg-[var(--hive-brand-primary)]/10",
                      "border border-[var(--hive-brand-primary)]/20",
                      "rounded-md text-sm",
                      "text-[var(--hive-text-primary)]"
                    )}
                  >
                    {option.label}
                    {!disabled && (
                      <button;
                        type="button"
                        onClick={(e) => removeOption(option.value, e)}
                        className={cn(
                          "ml-1 p-0.5 rounded-full",
                          "hover:bg-[var(--hive-brand-primary)]/20",
                          "transition-colors duration-200"
                        )}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </motion.span>
                ))
              ) : (
                // Single selection display;
                <span className="text-[var(--hive-text-primary)]">
                  {selectedOptions[0]?.label}
                </span>
              )}
            </div>

            {/* Dropdown Arrow */}
            <motion.div;
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-[var(--hive-text-secondary)]" />
            </motion.div>
          </div>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div;
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={cn(
                "absolute z-50 w-full mt-2",
                "bg-[var(--hive-background-secondary)]/95 backdrop-blur-md",
                "border border-[var(--hive-border-primary)]",
                "rounded-lg shadow-xl",
                "max-h-60 overflow-hidden"
              )}
            >
              {/* Search Input (for large option lists) */}
              {options.length > 5 && (
                <div className="p-3 border-b border-[var(--hive-border-primary)]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--hive-text-secondary)]" />
                    <input;
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search options..."
                      className={cn(
                        "w-full pl-10 pr-4 py-2",
                        "bg-[var(--hive-background-tertiary)]/50",
                        "border border-[var(--hive-border-primary)]",
                        "rounded-md text-sm",
                        "text-[var(--hive-text-primary)]",
                        "placeholder:text-[var(--hive-text-secondary)]",
                        "focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-primary)]/30"
                      )}
                    />
                  </div>
                </div>
              )}

              {/* Options List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-6 text-center text-[var(--hive-text-secondary)]">
                    {searchQuery ? 'No options found' : 'No options available'}
                  </div>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = selectedValues.includes(option.value);
                    const isFocused = index === focusedIndex;
                    
                    return (
                      <motion.button;
                        key={option.value}}
                        type="button"
                        onClick={() => handleOptionSelect(option)}
                        disabled={option.disabled}
                        whileHover={{ scale: option.disabled ? 1 : 1.02 }}
                        whileTap={{ scale: option.disabled ? 1 : 0.98 }}
                        className={cn(
                          "w-full px-4 py-3 text-left",
                          "flex items-center justify-between",
                          "transition-all duration-150",
                          
                          // Default state;
                          "text-[var(--hive-text-primary)]",
                          
                          // Hover and focus states;
                          !option.disabled && [
                            "hover:bg-[var(--hive-background-tertiary)]/50",
                            isFocused && "bg-[var(--hive-background-tertiary)]/70"
                          ],
                          
                          // Selected state;
                          isSelected && [
                            "bg-[var(--hive-brand-primary)]/10",
                            "text-[var(--hive-brand-primary)]"
                          ],
                          
                          // Disabled state;
                          option.disabled && [
                            "opacity-50 cursor-not-allowed",
                            "text-[var(--hive-text-secondary)]"
                          ]
                        )}
                      >
                        <span className="flex-1">{option.label}</span>
                        {isSelected && (
                          <motion.div;
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                          >
                            <Check className="h-4 w-4 text-[var(--hive-brand-primary)]" />
                          </motion.div>
                        )}
                      </motion.button>
                    )
                  })}
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      {hasError && (
        <motion.p;
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 text-sm text-[var(--hive-status-error)]"
        >
          {error}
        </motion.p>
      )}

      {/* Helper Text */}
      {!hasError && multiple && selectedValues.length > 0 && (
        <p className="mt-2 text-sm text-[var(--hive-text-secondary)]">
          {selectedValues.length} option{selectedValues.length !== 1 ? 's' : ''} selected;
        </p>
      )}
    </div>
  )
};

export default ChoiceSelect;