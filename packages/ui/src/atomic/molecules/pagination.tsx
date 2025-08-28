'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../atoms/button-enhanced';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'compact' | 'minimal';
  className?: string;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  maxVisiblePages = 5,
  size = 'md',
  variant = 'default',
  className,
  showFirstLast = true,
  showPrevNext = true
}: PaginationProps) {
  const getVisiblePages = (): (number | 'ellipsis')[] => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      endPage = maxVisiblePages;
    }
    if (currentPage + halfVisible >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
    }

    const pages: (number | 'ellipsis')[] = [];

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('ellipsis');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const sizeClasses = {
    sm: 'h-8 min-w-8 text-sm',
    md: 'h-9 min-w-9 text-sm',
    lg: 'h-10 min-w-10 text-base'
  };

  const buttonSize = {
    sm: 'sm' as const,
    md: 'default' as const,
    lg: 'lg' as const
  };

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center space-x-2', className)}>
        <Button
          variant="ghost"
          size={buttonSize[size]}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-[var(--hive-text-secondary)] px-2">
          {currentPage} of {totalPages}
        </span>
        <Button
          variant="ghost"
          size={buttonSize[size]}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center space-x-1', className)}>
        {showPrevNext && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}
        <span className="text-sm text-[var(--hive-text-secondary)] px-3">
          {currentPage} / {totalPages}
        </span>
        {showPrevNext && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return (
    <nav className={cn('flex items-center space-x-1', className)} role="navigation" aria-label="Pagination">
      {showFirstLast && (
        <Button
          variant="ghost"
          size={buttonSize[size]}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2"
        >
          First
        </Button>
      )}

      {showPrevNext && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {showPageNumbers && getVisiblePages().map((page, index) => (
        page === 'ellipsis' ? (
          <div
            key={`ellipsis-${index}`}
            className={cn(
              'flex items-center justify-center',
              sizeClasses[size]
            )}
          >
            <MoreHorizontal className="h-4 w-4 text-[var(--hive-text-secondary)]" />
          </div>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "primary" : "ghost"}
            size={buttonSize[size]}
            onClick={() => onPageChange(page)}
            className={cn(
              sizeClasses[size],
              page === currentPage && "pointer-events-none"
            )}
          >
            {page}
          </Button>
        )
      ))}

      {showPrevNext && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}

      {showFirstLast && (
        <Button
          variant="ghost"
          size={buttonSize[size]}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-2"
        >
          Last
        </Button>
      )}
    </nav>
  );
}

// Pagination info component
export interface PaginationInfoProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export function PaginationInfo({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  className
}: PaginationInfoProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={cn('text-sm text-[var(--hive-text-secondary)]', className)}>
      Showing {startItem} to {endItem} of {totalItems} results
    </div>
  );
}

// Preset configurations
export const PaginationPresets = {
  // Default table pagination
  Table: (props: Omit<PaginationProps, 'variant' | 'size'>) => (
    <Pagination variant="primary" size="md" {...props} />
  ),
  
  // Feed/list pagination
  Feed: (props: Omit<PaginationProps, 'variant' | 'showPageNumbers'>) => (
    <Pagination variant="minimal" showPageNumbers={false} {...props} />
  ),
  
  // Mobile-optimized pagination
  Mobile: (props: Omit<PaginationProps, 'variant' | 'size' | 'maxVisiblePages'>) => (
    <Pagination variant="compact" size="sm" maxVisiblePages={3} {...props} />
  ),
  
  // Search results pagination
  Search: (props: Omit<PaginationProps, 'variant' | 'showFirstLast'>) => (
    <Pagination variant="primary" showFirstLast={false} {...props} />
  )
};

// Types already exported inline above