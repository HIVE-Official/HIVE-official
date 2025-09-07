"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Check, Home, MapPin, Building2, Car, Plane, Heart } from 'lucide-react';
import { useState } from 'react';

interface IdentityOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  vibe?: string; // The emotional context
  color?: string; // Accent color for this identity
}

interface IdentitySelectorProps {
  title: string;
  subtitle?: string;
  options: IdentityOption[];
  selected: string | string[];
  onChange: (value: string | string[]) => void;
  multiSelect?: boolean;
  maxSelections?: number;
  minSelections?: number;
  layout?: 'cards' | 'chips' | 'list';
}

export function IdentitySelector({
  title,
  subtitle,
  options,
  selected,
  onChange,
  multiSelect = false,
  maxSelections,
  minSelections,
  layout = 'cards'
}: IdentitySelectorProps) {
  const selectedArray = Array.isArray(selected) ? selected : (selected ? [selected] : []);
  
  const handleSelect = (optionId: string) => {
    if (multiSelect) {
      if (selectedArray.includes(optionId)) {
        const newSelection = selectedArray.filter(id => id !== optionId);
        onChange(newSelection);
      } else if (!maxSelections || selectedArray.length < maxSelections) {
        onChange([...selectedArray, optionId]);
      }
    } else {
      onChange(optionId);
    }
  };

  if (layout === 'chips') {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
        </div>
        
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                relative px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-200 transform
                ${selectedArray.includes(option.id) 
                  ? 'bg-[#FFD700] text-black scale-105 shadow-lg shadow-[#FFD700]/20' 
                  : 'bg-[#1A1A1B] text-white/80 hover:bg-[#2A2A2B] hover:text-white border border-[#2A2A2B]'
                }
              `}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence>
                {selectedArray.includes(option.id) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="inline-flex mr-1"
                  >
                    <Check className="h-3 w-3" />
                  </motion.span>
                )}
              </AnimatePresence>
              {option.label}
              {option.vibe && (
                <span className="ml-1 opacity-60">
                  {option.vibe}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    );
  }

  if (layout === 'list') {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
        </div>
        
        <div className="space-y-2">
          {options.map((option, index) => (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              className={`
                w-full text-left p-4 rounded-xl
                transition-all duration-200 transform
                ${selectedArray.includes(option.id) 
                  ? 'bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 border-[#FFD700]' 
                  : 'bg-[#1A1A1B] hover:bg-[#2A2A2B] border-[#2A2A2B]'
                }
                border
              `}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {option.icon && (
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${selectedArray.includes(option.id)
                        ? 'bg-[#FFD700]/20 text-[#FFD700]'
                        : 'bg-white/5 text-white/40'
                      }
                    `}>
                      {option.icon}
                    </div>
                  )}
                  <div>
                    <div className={`font-medium ${
                      selectedArray.includes(option.id) ? 'text-[#FFD700]' : 'text-white'
                    }`}>
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-xs text-white/60 mt-0.5">
                        {option.description}
                      </div>
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {selectedArray.includes(option.id) && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className="w-6 h-6 rounded-full bg-[#FFD700] flex items-center justify-center"
                    >
                      <Check className="h-4 w-4 text-black" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Default cards layout
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-white/60">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`
              relative p-6 rounded-2xl text-left
              transition-all duration-300 transform
              ${selectedArray.includes(option.id) 
                ? 'bg-gradient-to-br from-[#FFD700]/20 to-[#FFD700]/10 border-[#FFD700] shadow-lg shadow-[#FFD700]/10' 
                : 'bg-[#1A1A1B] hover:bg-[#2A2A2B] border-[#2A2A2B]'
              }
              border
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence>
              {selectedArray.includes(option.id) && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#FFD700] flex items-center justify-center"
                >
                  <Check className="h-5 w-5 text-black" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {option.icon && (
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center mb-3
                ${selectedArray.includes(option.id)
                  ? 'bg-[#FFD700]/20 text-[#FFD700]'
                  : 'bg-white/5 text-white/40'
                }
              `}>
                {option.icon}
              </div>
            )}
            
            <div>
              <div className={`font-semibold mb-1 ${
                selectedArray.includes(option.id) ? 'text-[#FFD700]' : 'text-white'
              }`}>
                {option.label}
              </div>
              {option.description && (
                <div className="text-xs text-white/60">
                  {option.description}
                </div>
              )}
              {option.vibe && (
                <div className="text-xs text-white/40 mt-2 italic">
                  {option.vibe}
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Living situation selector with personality
export function LivingSituationSelector({ value, onChange }: { 
  value: string; 
  onChange: (value: string) => void;
}) {
  const options: IdentityOption[] = [
    {
      id: 'ellicott',
      label: 'Ellicott Complex',
      description: 'The freshman experience™',
      icon: <Building2 className="h-5 w-5" />,
      vibe: 'Maze runner survivor'
    },
    {
      id: 'governors',
      label: 'Governors',
      description: 'Actually has AC',
      icon: <Building2 className="h-5 w-5" />,
      vibe: 'Living in luxury (by UB standards)'
    },
    {
      id: 'south_campus',
      label: 'South Campus',
      description: 'The forgotten realm',
      icon: <MapPin className="h-5 w-5" />,
      vibe: 'Bus schedule memorizer'
    },
    {
      id: 'off_campus_walking',
      label: 'Off Campus (Walking)',
      description: 'Sweet spot location',
      icon: <Home className="h-5 w-5" />,
      vibe: 'No meal plan freedom'
    },
    {
      id: 'off_campus_driving',
      label: 'Off Campus (Driving)',
      description: 'Parking permit warrior',
      icon: <Car className="h-5 w-5" />,
      vibe: 'Always late because "couldn\'t find parking"'
    },
    {
      id: 'commuter',
      label: 'Commuter',
      description: 'Home every night',
      icon: <Car className="h-5 w-5" />,
      vibe: 'Missing all the drama'
    },
    {
      id: 'online',
      label: 'Remote/Online',
      description: 'Zoom university',
      icon: <Plane className="h-5 w-5" />,
      vibe: 'Camera definitely broken'
    }
  ];

  return (
    <IdentitySelector
      title="Where's your UB home base?"
      subtitle="This helps us connect you with neighbors and local happenings"
      options={options}
      selected={value}
      onChange={onChange as any}
      layout="list"
    />
  );
}