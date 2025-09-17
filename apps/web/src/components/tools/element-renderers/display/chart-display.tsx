"use client";

import React from 'react';
import { BarChart3, PieChart, LineChart, TrendingUp } from 'lucide-react';
import { ElementRendererProps } from '../types';

export function ChartDisplayRenderer({
  element,
  elementDef,
  data,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const chartType = config.type || 'bar';
  const title = config.title || 'Chart';
  const chartData = data || [];

  if (isBuilder) {
    const IconMap = {
      bar: BarChart3,
      pie: PieChart,
      line: LineChart,
      area: TrendingUp
    };
    const Icon = IconMap[chartType as keyof typeof IconMap] || BarChart3;
    
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <Icon className="h-3 w-3" />
          {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
        </div>
        <div className="font-medium">{title}</div>
      </div>
    );
  }

  // Simplified chart rendering - in production, use a proper charting library
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <h3 className="font-medium mb-4">{title}</h3>
      
      {chartData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No data to display
        </div>
      ) : (
        <div className="space-y-2">
          {/* Simple bar chart visualization */}
          {chartType === 'bar' && chartData.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-sm w-20 truncate">{item.label || item.name || `Item ${index + 1}`}</span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded h-6">
                <div 
                  className="bg-blue-500 h-full rounded"
                  style={{ width: `${(item.value / Math.max(...chartData.map((d: any) => d.value))) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium">{item.value}</span>
            </div>
          ))}
          
          {/* Placeholder for other chart types */}
          {chartType !== 'bar' && (
            <div className="text-center py-4 text-gray-500">
              {chartType.charAt(0).toUpperCase() + chartType.slice(1)} chart visualization
            </div>
          )}
        </div>
      )}
      
      {config.xAxis && (
        <div className="text-xs text-gray-500 mt-4 text-center">
          {config.xAxis}
        </div>
      )}
    </div>
  );
}