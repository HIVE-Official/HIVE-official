"use client";

import React, { useState } from 'react';
import { Tabs as TabsIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hive/ui';
import { ElementRendererProps } from '../index';

export function TabsRenderer({
  element,
  elementDef,
  onChange,
  onAction,
  isPreview,
  isBuilder,
  renderElement
}: ElementRendererProps) {
  const config = element.config;
  const tabs = config.tabs || [];
  const defaultTab = config.defaultTab || (tabs[0]?.id ?? '');
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (onChange && !isPreview) {
      onChange(element.instanceId, value);
    }
    
    if (onAction && !isPreview) {
      onAction(element.instanceId, 'onTabChange', value);
    }
  };
  
  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <TabsIcon className="h-3 w-3" />
          Tabs Layout
        </div>
        <div className="font-medium">{tabs.length} tabs</div>
        {tabs.length > 0 && (
          <div className="text-xs text-gray-500">
            {tabs.map((t: any) => t.label).join(', ')}
          </div>
        )}
      </div>
    );
  }
  
  if (tabs.length === 0) {
    return (
      <div className="text-sm text-gray-500 italic">No tabs configured</div>
    );
  }
  
  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map((tab: any) => (
          <TabsTrigger 
            key={tab.id} 
            value={tab.id}
            disabled={tab.disabled}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab: any) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-4">
          {tab.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {tab.description}
            </p>
          )}
          
          <div className="space-y-3">
            {tab.children && tab.children.length > 0 ? (
              renderElement ? (
                tab.children.map((childElement: any) => (
                  <div key={childElement.instanceId}>
                    {renderElement(childElement)}
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">Tab content</div>
              )
            ) : (
              <div className="text-sm text-gray-500 italic">Empty tab</div>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}