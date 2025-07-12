"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CampusCard, CampusCardProps } from './campus-card';
import { SearchInput } from './search-input';
import { cn } from '@/lib/utils';

export type Campus = Omit<CampusCardProps, 'selected' | 'onClick' | 'className'>;

export interface CampusSelectorProps {
  campuses: Campus[];
  selectedCampusId?: string;
  onSelect: (campus: Campus) => void;
  className?: string;
}

export const CampusSelector = ({
  campuses,
  selectedCampusId,
  onSelect,
  className
}: CampusSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCampuses = useMemo(() => {
    if (!searchQuery) return campuses;
    
    const query = searchQuery.toLowerCase();
    return campuses.filter(campus => 
      campus.name.toLowerCase().includes(query) ||
      campus.domain.toLowerCase().includes(query)
    );
  }, [campuses, searchQuery]);

  // Prioritize UB and active campuses
  const sortedCampuses = useMemo(() => {
    return [...filteredCampuses].sort((a, b) => {
      // UB always first
      if (a.domain.includes('buffalo.edu')) return -1;
      if (b.domain.includes('buffalo.edu')) return 1;
      
      // Then active campuses
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (a.status !== 'active' && b.status === 'active') return 1;
      
      // Then alphabetically
      return a.name.localeCompare(b.name);
    });
  }, [filteredCampuses]);

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        className="w-full"
      />
      
      <motion.div 
        className="grid gap-4"
        layout
      >
        {sortedCampuses.map((campus) => (
          <motion.div
            key={campus.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CampusCard
              {...campus}
              selected={campus.id === selectedCampusId}
              onClick={() => onSelect(campus)}
            />
          </motion.div>
        ))}
        
        {sortedCampuses.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground"
          >
            No schools found matching "{searchQuery}"
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}; 