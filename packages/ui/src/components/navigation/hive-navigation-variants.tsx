"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, Search, Bell, User, Settings, Command, 
  ChevronDown, ChevronRight, Plus, X,
  Home, Users, Zap, Calendar, BookOpen, MoreHorizontal
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { colors, semantic, shadows, gradients } from '@hive/tokens';
import { Button } from '../../atomic/atoms/button-enhanced';
import { 
  useNavigation, 
  NavigationContainer, 
  NavigationBrand, 
  type NavigationItem,
  type NavigationSection 
} from './hive-navigation-system';
import { HiveLogo, HiveGlyphOnly } from '../hive-logo';
import { 
  HiveNavigationItem, 
  HiveNavigationSection, 
  HiveNavigationCreateButton 
} from './hive-navigation-item';
import { 
  HiveNavigationInput, 
  HiveCommandResult, 
  HiveCommandSection 
} from './hive-navigation-input';

export function SidebarNavigation() {
  const { config, sections, isCollapsed, setCollapsed, navigate } = useNavigation();
  
  const sidebarWidth = {
    compact: isCollapsed ? 'w-16' : 'w-48',
    standard: isCollapsed ? 'w-16' : 'w-64',
    expanded: isCollapsed ? 'w-20' : 'w-80'
  };

  return (
    <NavigationContainer
      className={cn(
        "fixed left-0 top-0 h-full backdrop-blur-xl z-40",
        "transition-all duration-300 ease-out",
        sidebarWidth[config.size],
        "flex flex-col"
      )}
      style={{
        backgroundColor: 'var(--hive-background-primary)',
        backdropFilter: 'blur(3) saturate(180%)',
        borderRight: `1px solid var(--hive-border-primary)`,
      }}
    >
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 border-b" 
        style={{ borderColor: 'var(--hive-border-primary)' }}
      >
        {config.showBranding && (
          <NavigationBrand
            logo={isCollapsed ? <HiveGlyphOnly size="md" variant="gold" /> : <HiveLogo size="md" variant="gold" />}
            title={!isCollapsed ? "HIVE" : undefined}
            subtitle={!isCollapsed ? "Campus Platform" : undefined}
            href="/"
          />
        )}
        
        {config.collapsible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto py-4">
        {sections.map((section) => (
          <div key={section.id} className="mb-6">
            <HiveNavigationSection 
              label={section.label} 
              collapsed={isCollapsed} 
            />
            
            <div className="space-y-1 px-2">
              {section.items.map((item) => (
                <HiveNavigationItem
                  key={item.id}
                  item={item}
                  isActive={item.isActive}
                  isCollapsed={isCollapsed}
                  onNavigate={navigate}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div 
        className="p-4 border-t space-y-2" 
        style={{ borderColor: 'var(--hive-border-primary)' }}
      >
        <HiveNavigationCreateButton 
          collapsed={isCollapsed} 
          onClick={() => navigate({ id: 'create', label: 'Create' })}
        />
      </div>
    </NavigationContainer>
  );
}

// ============================================================================
// TOPBAR NAVIGATION VARIANT
// ============================================================================

export function TopbarNavigation() {
  const { config, sections, user, searchOpen, setSearchOpen, navigate } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Flatten sections for topbar display
  const allItems = sections.flatMap(section => section.items);
  const primaryItems = allItems.slice(0, 5); // Show first 5 items
  const secondaryItems = allItems.slice(5);

  return (
    <NavigationContainer
      className={cn(
        "sticky top-0 z-50 backdrop-blur-xl",
        config.position === 'fixed' && "fixed top-0 left-0 right-0"
      )}
      style={{
        backgroundColor: 'var(--hive-background-primary)',
        backdropFilter: 'blur(3) saturate(180%)',
        borderBottom: `1px solid var(--hive-border-primary)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Primary Navigation */}
          <div className="flex items-center">
            {config.showBranding && (
              <NavigationBrand
                logo={<HiveLogo size="md" variant="gold" />}
                href="/"
                className="mr-8"
              />
            )}
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {primaryItems.map((item) => (
                <HiveNavigationItem
                  key={item.id}
                  item={item}
                  isActive={item.isActive}
                  onNavigate={navigate}
                  size="sm"
                  className="rounded-2xl"
                />
              ))}
              
              {secondaryItems.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-2 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Center: Search */}
          {config.showSearch && (
            <div className="flex-1 max-w-lg mx-8 hidden lg:block">
              <div className="relative">
                <Search 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" 
                  style={{ color: 'var(--hive-text-muted)' }} 
                />
                <input
                  type="text"
                  placeholder="Search spaces, people, tools..."
                  onClick={() => setSearchOpen(true)}
                  readOnly
                  className="w-full h-9 pl-10 pr-16 rounded-full border transition-all duration-200 cursor-pointer backdrop-blur-sm"
                  style={{
                    backgroundColor: 'var(--hive-background-secondary)',
                    borderColor: 'var(--hive-border-primary)',
                    color: 'var(--hive-text-primary)',
                  }}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <kbd 
                    className="inline-flex items-center px-2 py-1 rounded text-xs border"
                    style={{
                      backgroundColor: 'var(--hive-background-primary)',
                      borderColor: 'var(--hive-border-subtle)',
                      color: 'var(--hive-text-muted)'
                    }}
                  >
                    <Command className="w-3 h-3 mr-1" />
                    K
                  </kbd>
                </div>
              </div>
            </div>
          )}

          {/* Right: Actions */}
          <div className="flex items-center space-x-4">
            {config.showNotifications && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
              >
                <Bell className="w-5 h-5" />
                <span 
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: 'var(--hive-status-error)' }}
                />
              </Button>
            )}
            
            {config.showUserMenu && user && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-2 text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--hive-background-secondary)' }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <span className="hidden sm:block text-sm">{user.name.split(' ')[0]}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-hover)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden border-t" 
          style={{ borderColor: 'var(--hive-border-primary)' }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {allItems.map((item) => (
              <HiveNavigationItem
                key={item.id}
                item={item}
                isActive={item.isActive}
                onNavigate={(navItem) => {
                  navigate(navItem);
                  setMobileMenuOpen(false);
                }}
                size="sm"
                className="w-full justify-start"
              />
            ))}
          </div>
        </div>
      )}
    </NavigationContainer>
  );
}

// ============================================================================
// COMMAND NAVIGATION VARIANT
// ============================================================================

export function CommandNavigation() {
  const { config, sections, user, searchOpen, setSearchOpen, navigate } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Flatten and prepare items for command palette
  const allItems = sections.flatMap(section => 
    section.items.map(item => ({
      ...item,
      category: section.label,
      keywords: item.keywords || []
    }))
  );

  const filteredItems = searchQuery.length > 0
    ? allItems.filter(item =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : allItems;

  return (
    <NavigationContainer
      className="min-h-screen"
      style={{ backgroundColor: semantic.background.primary }}
    >
      {/* Minimal Top Bar */}
      <div className="border-b" style={{ borderColor: semantic.border.primary }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-12">
            {config.showBranding && (
              <NavigationBrand
                logo={<HiveLogo size="sm" variant="gold" />}
                href="/"
              />
            )}

            {/* Command Trigger */}
            <Button
              onClick={() => setSearchOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 border transition-colors"
              style={{
                backgroundColor: semantic.background.secondary,
                borderColor: semantic.border.primary,
                color: semantic.text.muted,
              }}
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:block">Search or jump to...</span>
              <kbd className="hidden sm:inline-flex items-center px-2 py-1 border rounded text-xs">
                <Command className="w-3 h-3 mr-1" />
                K
              </kbd>
            </Button>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              {config.showNotifications && (
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </Button>
              )}
              
              {user && (
                <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full" />
                  ) : (
                    <User className="w-3 h-3" />
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Command Palette Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 pt-16">
            <div 
              className="fixed inset-0 backdrop-blur-sm"
              style={{ backgroundColor: 'color-mix(in_srgb,var(--hive-background-primary)_50%,transparent)' }}
              onClick={() => setSearchOpen(false)}
            />
            
            <div 
              className="relative w-full max-w-2xl rounded-lg border shadow-xl"
              style={{
                backgroundColor: semantic.background.primary,
                borderColor: semantic.border.primary,
              }}
            >
              {/* Search Input */}
              <div className="flex items-center border-b px-4" style={{ borderColor: semantic.border.primary }}>
                <Search className="w-5 h-5 mr-3" style={{ color: semantic.text.muted }} />
                <input
                  type="text"
                  placeholder="Search commands, tools, spaces..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="w-full py-4 bg-transparent focus:outline-none"
                  style={{ color: semantic.text.primary }}
                  autoFocus
                />
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto p-2">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => {
                    const Icon = item.icon;
                    const isSelected = index === selectedIndex;
                    
                    return (
                      <Button
                        key={item.id}
                        variant="ghost"
                        onClick={() => {
                          navigate(item);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className={cn(
                          "w-full justify-start p-3 h-auto",
                          isSelected && "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)]"
                        )}
                        style={{
                          backgroundColor: isSelected ? semantic.brand.primary : undefined,
                          color: isSelected ? semantic.text.inverse : semantic.text.primary,
                        }}
                      >
                        {Icon && <Icon className="w-4 h-4 mr-3 flex-shrink-0" />}
                        <div className="flex-1 min-w-0 text-left">
                          <div className="font-medium truncate">{item.label}</div>
                          {item.description && (
                            <div 
                              className="text-xs truncate mt-1"
                              style={{ 
                                color: isSelected ? semantic.text.inverse : semantic.text.muted,
                                opacity: isSelected ? 0.8 : 1
                              }}
                            >
                              {item.description}
                            </div>
                          )}
                        </div>
                      </Button>
                    );
                  })
                ) : (
                  <div className="px-3 py-8 text-center" style={{ color: semantic.text.muted }}>
                    <Search className="w-8 h-8 mx-auto mb-3" />
                    <p>No results found</p>
                    <p className="text-sm mt-1">Try searching for something else</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div 
                className="border-t px-4 py-3 text-xs flex items-center justify-between"
                style={{ 
                  borderColor: semantic.border.primary,
                  color: semantic.text.muted 
                }}
              >
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>ESC Close</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="px-2 py-1 border rounded text-xs">⌘</kbd>
                  <kbd className="px-2 py-1 border rounded text-xs">K</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </NavigationContainer>
  );
}

// ============================================================================
// MINIMAL NAVIGATION VARIANT
// ============================================================================

export function MinimalNavigation() {
  const { config, user } = useNavigation();
  
  return (
    <NavigationContainer
      className="fixed top-4 left-4 right-4 z-50 rounded-full border backdrop-blur-xl"
      style={{
        backgroundColor: `${semantic.background.primary}CC`,
        borderColor: semantic.border.primary,
      }}
    >
      <div className="flex items-center justify-between px-6 py-3">
        {config.showBranding && (
          <NavigationBrand
            logo={<HiveGlyphOnly size="sm" variant="gold" />}
            href="/"
          />
        )}
        
        <div className="flex items-center space-x-4">
          {config.showSearch && (
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          )}
          
          {config.showNotifications && (
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
          )}
          
          {user && (
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </div>
    </NavigationContainer>
  );
}