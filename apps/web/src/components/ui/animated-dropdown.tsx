"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface AnimatedDropdownProps {
  options: DropdownOption[];
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
  error?: string;
  clearable?: boolean;
  maxHeight?: string;
}

export function AnimatedDropdown({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  multiple = false,
  searchable = false,
  disabled = false,
  className,
  label,
  required = false,
  error,
  clearable = false,
  maxHeight = "240px"
}: AnimatedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus search input when dropdown opens
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, searchable]);

  // Filter options based on search
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  // Get display value
  const getDisplayValue = () => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return placeholder;
    }

    if (multiple && Array.isArray(value)) {
      if (value.length === 1) {
        const option = options.find(opt => opt.value === value[0]);
        return option?.label || value[0];
      }
      return `${value.length} selected`;
    }

    const option = options.find(opt => opt.value === value);
    return option?.label || value;
  };

  // Handle selection
  const handleSelect = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      const newValue = value.includes(optionValue)
        ? value.filter(v => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    } else {
      onChange(optionValue);
      setIsOpen(false);
    }
    setSearchQuery("");
  };

  // Handle clear
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(multiple ? [] : "");
  };

  // Check if option is selected
  const isSelected = (optionValue: string) => {
    if (multiple && Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return value === optionValue;
  };

  const hasValue = multiple 
    ? Array.isArray(value) && value.length > 0
    : !!value;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Trigger */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full px-4 py-3 text-left bg-input/50 backdrop-blur-sm",
            "border rounded-xl transition-all duration-200",
            "flex items-center justify-between",
            isOpen 
              ? "border-accent ring-2 ring-accent/20" 
              : "border-border hover:border-accent/50",
            hasValue ? "text-foreground" : "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-destructive"
          )}
        >
          <span className="truncate">{getDisplayValue()}</span>
          <div className="flex items-center gap-2">
            {clearable && hasValue && !disabled && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClear}
                className="p-0.5 hover:bg-accent/10 rounded"
                type="button"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            )}
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          </div>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.95 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ originY: 0 }}
              className="absolute z-50 w-full mt-2"
            >
              <div className="bg-card border-2 border-accent/30 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden">
                {/* Search Input */}
                {searchable && (
                  <div className="p-2 border-b border-border">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full px-3 py-2 bg-input/50 border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}

                {/* Options List */}
                <div className="overflow-y-auto" style={{ maxHeight }}>
                  {filteredOptions.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                      No options found
                    </div>
                  ) : (
                    filteredOptions.map((option, index) => {
                      const selected = isSelected(option.value);
                      return (
                        <motion.button
                          key={option.value}
                          type="button"
                          onClick={() => !option.disabled && handleSelect(option.value)}
                          disabled={option.disabled}
                          className={cn(
                            "w-full text-left px-4 py-3 transition-all duration-200",
                            "border-b border-border/20 last:border-b-0",
                            "flex items-center justify-between gap-2",
                            selected
                              ? "bg-accent/20 text-accent"
                              : "hover:bg-accent/10 text-foreground",
                            option.disabled && "opacity-50 cursor-not-allowed"
                          )}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          whileHover={!option.disabled ? { x: 4 } : {}}
                        >
                          <div className="flex items-center gap-3">
                            {option.icon && (
                              <span className="text-lg">{option.icon}</span>
                            )}
                            <span className="font-medium">{option.label}</span>
                          </div>
                          {selected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Check className="w-4 h-4 text-accent" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })
                  )}
                </div>

                {/* Multi-select Tags */}
                {multiple && Array.isArray(value) && value.length > 0 && (
                  <div className="p-2 border-t border-border">
                    <div className="flex flex-wrap gap-1">
                      {value.map(val => {
                        const option = options.find(opt => opt.value === val);
                        return (
                          <motion.span
                            key={val}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
                          >
                            {option?.label || val}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(val);
                              }}
                              className="hover:bg-accent/30 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-destructive text-xs mt-1"
          >
            {error}
          </motion.p>
        )}
      </div>
    </div>
  );
}