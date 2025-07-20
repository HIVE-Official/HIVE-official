"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system';
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Filter, 
  Download, 
  RefreshCw,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';

// HIVE Table System - Advanced Data Display with Liquid Metal Motion
// Sophisticated table components with sorting, filtering, pagination, and magnetic interactions

export type SortDirection = 'asc' | 'desc' | null;

export type ColumnType = 'text' | 'number' | 'date' | 'boolean' | 'custom';

export interface TableColumn<T = any> {
  id: string;
  header: string;
  accessor?: keyof T | ((row: T) => any);
  type?: ColumnType;
  width?: string | number;
  minWidth?: string | number;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  headerRender?: () => React.ReactNode;
  filterRender?: (value: any, onChange: (value: any) => void) => React.ReactNode;
}

export interface TableFilter {
  column: string;
  value: any;
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan' | 'between';
}

export interface TableSort {
  column: string;
  direction: SortDirection;
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
  total: number;
}

const hiveTableVariants = cva(
  // Base table styles - matte obsidian glass
  "relative w-full bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        premium: "border-yellow-500/20",
        minimal: "border-white/5 bg-transparent",
      },
      
      density: {
        compact: "",
        default: "",
        spacious: "",
      }
    },
    defaultVariants: {
      variant: "default",
      density: "default",
    },
  }
);

// Row animation variants
const rowVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
    }
  },
  hover: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

// Header cell animation variants
const headerVariants = {
  rest: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  },
  hover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

export interface HiveTableProps<T = any>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof hiveTableVariants> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  empty?: React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  selectable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  onSort?: (sort: TableSort) => void;
  onFilter?: (filters: TableFilter[]) => void;
  onSearch?: (query: string) => void;
  onSelect?: (selectedRows: T[]) => void;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
  rowActions?: (row: T, index: number) => React.ReactNode;
  bulkActions?: React.ReactNode;
  toolbar?: React.ReactNode;
  stickyHeader?: boolean;
  virtualizeRows?: boolean;
  expandable?: boolean;
  expandedRowRender?: (row: T, index: number) => React.ReactNode;
}

const HiveTable = <T extends Record<string, any>>({
  className,
  variant,
  density,
  data,
  columns,
  loading = false,
  empty,
  sortable = true,
  filterable = true,
  searchable = true,
  selectable = false,
  pagination = true,
  pageSize = 10,
  onSort,
  onFilter,
  onSearch,
  onSelect,
  onRowClick,
  onRowDoubleClick,
  rowActions,
  bulkActions,
  toolbar,
  stickyHeader = true,
  virtualizeRows = false,
  expandable = false,
  expandedRowRender,
  ...props
}: HiveTableProps<T>) => {
  
  const [currentSort, setCurrentSort] = useState<TableSort>({ column: '', direction: null });
  const [filters, setFilters] = useState<TableFilter[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  
  // Process data with search, filter, and sort
  const processedData = useMemo(() => {
    let filtered = [...data];
    
    // Apply search
    if (searchQuery && searchable) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(row =>
        columns.some(column => {
          const value = column.accessor 
            ? typeof column.accessor === 'function'
              ? column.accessor(row)
              : row[column.accessor]
            : '';
          return String(value).toLowerCase().includes(query);
        })
      );
    }
    
    // Apply filters
    filters.forEach(filter => {
      filtered = filtered.filter(row => {
        const column = columns.find(col => col.id === filter.column);
        if (!column) return true;
        
        const value = column.accessor 
          ? typeof column.accessor === 'function'
            ? column.accessor(row)
            : row[column.accessor]
          : '';
        
        switch (filter.operator) {
          case 'equals':
            return value === filter.value;
          case 'contains':
            return String(value).toLowerCase().includes(String(filter.value).toLowerCase());
          case 'startsWith':
            return String(value).toLowerCase().startsWith(String(filter.value).toLowerCase());
          case 'endsWith':
            return String(value).toLowerCase().endsWith(String(filter.value).toLowerCase());
          case 'greaterThan':
            return Number(value) > Number(filter.value);
          case 'lessThan':
            return Number(value) < Number(filter.value);
          default:
            return true;
        }
      });
    });
    
    // Apply sort
    if (currentSort.column && currentSort.direction) {
      const column = columns.find(col => col.id === currentSort.column);
      if (column) {
        filtered.sort((a, b) => {
          const aValue = column.accessor 
            ? typeof column.accessor === 'function'
              ? column.accessor(a)
              : a[column.accessor]
            : '';
          const bValue = column.accessor 
            ? typeof column.accessor === 'function'
              ? column.accessor(b)
              : b[column.accessor]
            : '';
          
          let comparison = 0;
          
          if (column.type === 'number') {
            comparison = Number(aValue) - Number(bValue);
          } else if (column.type === 'date') {
            comparison = new Date(aValue).getTime() - new Date(bValue).getTime();
          } else {
            comparison = String(aValue).localeCompare(String(bValue));
          }
          
          return currentSort.direction === 'asc' ? comparison : -comparison;
        });
      }
    }
    
    return filtered;
  }, [data, columns, searchQuery, filters, currentSort, searchable]);
  
  // Pagination calculations
  const totalPages = Math.ceil(processedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = pagination ? processedData.slice(startIndex, endIndex) : processedData;
  
  // Handle sorting
  const handleSort = useCallback((columnId: string) => {
    const column = columns.find(col => col.id === columnId);
    if (!column?.sortable) return;
    
    let newDirection: SortDirection = 'asc';
    
    if (currentSort.column === columnId) {
      if (currentSort.direction === 'asc') {
        newDirection = 'desc';
      } else if (currentSort.direction === 'desc') {
        newDirection = null;
      }
    }
    
    const newSort = { column: columnId, direction: newDirection };
    setCurrentSort(newSort);
    onSort?.(newSort);
  }, [columns, currentSort, onSort]);
  
  // Handle filtering
  const handleFilter = useCallback((columnId: string, value: any, operator: TableFilter['operator'] = 'contains') => {
    const newFilters = filters.filter(f => f.column !== columnId);
    
    if (value !== '' && value !== null && value !== undefined) {
      newFilters.push({ column: columnId, value, operator });
    }
    
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page
    onFilter?.(newFilters);
  }, [filters, onFilter]);
  
  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page
    onSearch?.(query);
  }, [onSearch]);
  
  // Handle row selection
  const handleRowSelect = useCallback((index: number, selected: boolean) => {
    const newSelected = new Set(selectedRows);
    
    if (selected) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    
    setSelectedRows(newSelected);
    
    const selectedData = Array.from(newSelected).map(idx => paginatedData[idx]).filter(Boolean);
    onSelect?.(selectedData);
  }, [selectedRows, paginatedData, onSelect]);
  
  // Handle select all
  const handleSelectAll = useCallback((selected: boolean) => {
    if (selected) {
      const allIndices = new Set(paginatedData.map((_, idx) => idx));
      setSelectedRows(allIndices);
      onSelect?.(paginatedData);
    } else {
      setSelectedRows(new Set());
      onSelect?.([]);
    }
  }, [paginatedData, onSelect]);
  
  // Handle row expansion
  const handleRowExpand = useCallback((index: number) => {
    const newExpanded = new Set(expandedRows);
    
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    
    setExpandedRows(newExpanded);
  }, [expandedRows]);
  
  // Render cell content
  const renderCellContent = useCallback((column: TableColumn<T>, row: T, index: number) => {
    const value = column.accessor 
      ? typeof column.accessor === 'function'
        ? column.accessor(row)
        : row[column.accessor]
      : '';
    
    if (column.render) {
      return column.render(value, row, index);
    }
    
    // Default rendering based on type
    switch (column.type) {
      case 'boolean':
        return value ? '✓' : '✗';
      case 'date':
        return value ? new Date(value).toLocaleDateString() : '';
      case 'number':
        return typeof value === 'number' ? value.toLocaleString() : value;
      default:
        return String(value || '');
    }
  }, []);
  
  const allSelected = selectedRows.size === paginatedData.length && paginatedData.length > 0;
  const someSelected = selectedRows.size > 0 && selectedRows.size < paginatedData.length;
  
  return (
    <div className={cn(hiveTableVariants({ variant, density, className }))} {...props}>
      {/* Toolbar */}
      {(toolbar || searchable || bulkActions) && (
        <div className="p-4 border-b border-white/10 bg-black/10">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              {/* Search */}
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" size={16} />
                  <input
                    className="bg-black/40 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-yellow-500/50"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              )}
              
              {/* Bulk Actions */}
              {selectedRows.size > 0 && bulkActions && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center space-x-2"
                >
                  <span className="text-sm text-white/60">
                    {selectedRows.size} selected
                  </span>
                  {bulkActions}
                </motion.div>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {toolbar}
              
              {/* Refresh Button */}
              <motion.button
                className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw size={16} />
              </motion.button>
              
              {/* Export Button */}
              <motion.button
                className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      )}
      
      {/* Table */}
      <div className="overflow-auto">
        <table className="w-full">
          {/* Header */}
          <thead className={cn(
            "bg-black/20 backdrop-blur-sm",
            stickyHeader && "sticky top-0 z-10"
          )}>
            <tr>
              {/* Select All Checkbox */}
              {selectable && (
                <th className="w-12 p-4">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    ref={(input) => {
                      if (input) input.indeterminate = someSelected;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-white/20 bg-black/40 text-yellow-500 focus:ring-yellow-500"
                  />
                </th>
              )}
              
              {/* Expand Column */}
              {expandable && (
                <th className="w-12 p-4"></th>
              )}
              
              {/* Data Columns */}
              {columns.map((column) => (
                <motion.th
                  key={column.id}
                  className={cn(
                    "p-4 text-left font-semibold text-white border-b border-white/10",
                    column.sortable && "cursor-pointer select-none",
                    density === 'compact' && "p-2",
                    density === 'spacious' && "p-6"
                  )}
                  style={{ 
                    width: column.width,
                    minWidth: column.minWidth 
                  }}
                  variants={headerVariants}
                  initial="rest"
                  whileHover={column.sortable ? "hover" : "rest"}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center space-x-2">
                    {column.headerRender ? column.headerRender() : (
                      <span>{column.header}</span>
                    )}
                    
                    {/* Sort Indicator */}
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          size={12} 
                          className={cn(
                            "transition-colors",
                            currentSort.column === column.id && currentSort.direction === 'asc'
                              ? "text-yellow-400"
                              : "text-white/40"
                          )} 
                        />
                        <ChevronDown 
                          size={12} 
                          className={cn(
                            "transition-colors -mt-1",
                            currentSort.column === column.id && currentSort.direction === 'desc'
                              ? "text-yellow-400"
                              : "text-white/40"
                          )} 
                        />
                      </div>
                    )}
                  </div>
                </motion.th>
              ))}
              
              {/* Actions Column */}
              {rowActions && (
                <th className="w-20 p-4 text-center font-semibold text-white border-b border-white/10">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          
          {/* Body */}
          <tbody>
            <AnimatePresence mode="popLayout">
              {loading ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0)} className="p-8 text-center">
                    <div className="flex items-center justify-center space-x-2 text-white/60">
                      <RefreshCw size={20} className="animate-spin" />
                      <span>Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0)} className="p-8 text-center">
                    {empty || (
                      <div className="text-white/60">
                        <div className="text-4xl mb-2">📋</div>
                        <div>No data found</div>
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, index) => (
                  <React.Fragment key={index}>
                    <motion.tr
                      className={cn(
                        "border-b border-white/5 cursor-pointer",
                        selectedRows.has(index) && "bg-yellow-500/10"
                      )}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                      onClick={() => onRowClick?.(row, index)}
                      onDoubleClick={() => onRowDoubleClick?.(row, index)}
                      custom={index}
                    >
                      {/* Select Checkbox */}
                      {selectable && (
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedRows.has(index)}
                            onChange={(e) => handleRowSelect(index, e.target.checked)}
                            className="rounded border-white/20 bg-black/40 text-yellow-500 focus:ring-yellow-500"
                          />
                        </td>
                      )}
                      
                      {/* Expand Button */}
                      {expandable && (
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <motion.button
                            className="text-white/60 hover:text-white/80 transition-colors"
                            onClick={() => handleRowExpand(index)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <motion.div
                              animate={{ rotate: expandedRows.has(index) ? 90 : 0 }}
                              transition={{ duration: motionDurations.quick }}
                            >
                              <ChevronRight size={16} />
                            </motion.div>
                          </motion.button>
                        </td>
                      )}
                      
                      {/* Data Cells */}
                      {columns.map((column) => (
                        <td 
                          key={column.id} 
                          className={cn(
                            "p-4 text-white/80",
                            density === 'compact' && "p-2",
                            density === 'spacious' && "p-6"
                          )}
                        >
                          {renderCellContent(column, row, index)}
                        </td>
                      ))}
                      
                      {/* Actions Cell */}
                      {rowActions && (
                        <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                          {rowActions(row, index)}
                        </td>
                      )}
                    </motion.tr>
                    
                    {/* Expanded Row */}
                    {expandable && expandedRows.has(index) && expandedRowRender && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: motionDurations.smooth }}
                      >
                        <td colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (rowActions ? 1 : 0)}>
                          <div className="bg-black/10 p-4 border-l-4 border-yellow-500/30">
                            {expandedRowRender(row, index)}
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-white/60">
              Showing {startIndex + 1} to {Math.min(endIndex, processedData.length)} of {processedData.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              {/* First Page */}
              <motion.button
                className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronsLeft size={16} />
              </motion.button>
              
              {/* Previous Page */}
              <motion.button
                className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={16} />
              </motion.button>
              
              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  return (
                    <motion.button
                      key={pageNum}
                      className={cn(
                        "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
                        currentPage === pageNum
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "text-white/60 hover:text-white/80 hover:bg-white/10"
                      )}
                      onClick={() => setCurrentPage(pageNum)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {pageNum}
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Next Page */}
              <motion.button
                className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight size={16} />
              </motion.button>
              
              {/* Last Page */}
              <motion.button
                className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronsRight size={16} />
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Default row actions component
export const DefaultRowActions: React.FC<{
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}> = ({ onView, onEdit, onDelete }) => (
  <div className="flex items-center space-x-1">
    {onView && (
      <motion.button
        className="p-1 text-white/60 hover:text-blue-400 hover:bg-blue-400/10 rounded transition-colors"
        onClick={onView}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Eye size={14} />
      </motion.button>
    )}
    {onEdit && (
      <motion.button
        className="p-1 text-white/60 hover:text-yellow-400 hover:bg-yellow-400/10 rounded transition-colors"
        onClick={onEdit}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Edit size={14} />
      </motion.button>
    )}
    {onDelete && (
      <motion.button
        className="p-1 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
        onClick={onDelete}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Trash2 size={14} />
      </motion.button>
    )}
  </div>
);

export { 
  HiveTable,
  hiveTableVariants
};