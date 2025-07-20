"use client";

import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ElementType;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function BreadcrumbNavigation({ items, className }: BreadcrumbNavigationProps) {
  return (
    <nav 
      className={cn(
        "flex items-center space-x-1 text-sm text-[#A1A1AA]",
        className
      )} 
      aria-label="Breadcrumb"
    >
      {/* Home Link */}
      <Button
        variant="ghost"
        size="sm"
        className="h-6 px-1 hover:bg-[rgba(255,255,255,0.08)] hover:text-white"
      >
        <Home className="h-3 w-3" />
      </Button>

      {items.length > 0 && (
        <ChevronRight className="h-3 w-3 text-[#3F3F46]" />
      )}

      {/* Breadcrumb Items */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const Icon = item.icon;

        return (
          <React.Fragment key={index}>
            <div className="flex items-center space-x-1">
              {Icon && <Icon className="h-3 w-3" />}
              {item.href ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-6 px-1 font-normal",
                    "hover:bg-[rgba(255,255,255,0.08)] hover:text-white",
                    "text-[#A1A1AA]"
                  )}
                >
                  {item.label}
                </Button>
              ) : (
                <span 
                  className={cn(
                    "px-1 font-medium",
                    isLast ? "text-white" : "text-[#A1A1AA]"
                  )}
                >
                  {item.label}
                </span>
              )}
            </div>
            
            {!isLast && (
              <ChevronRight className="h-3 w-3 text-[#3F3F46]" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}