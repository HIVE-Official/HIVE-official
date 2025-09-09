"use client";

import React, { useState } from 'react';
import { Table } from 'lucide-react';
import { ElementRendererProps } from '../index';

export function TableDisplayRenderer({
  element,
  elementDef,
  data,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const columns = config.columns || [];
  const tableData = data || [];
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <Table className="h-3 w-3" />
          Table Display
        </div>
        <div className="font-medium">{columns.length} columns</div>
      </div>
    );
  }

  // Filter data based on search
  let filteredData = tableData;
  if (config.searchable && searchTerm) {
    filteredData = tableData.filter((row: any) =>
      Object.values(row).some((value: any) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  // Sort data
  if (config.sortable && sortBy) {
    filteredData = [...filteredData].sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (column: string) => {
    if (!config.sortable) return;
    
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Auto-detect columns if not specified
  const displayColumns = columns.length > 0 
    ? columns 
    : tableData.length > 0 
      ? Object.keys(tableData[0])
      : [];

  return (
    <div className="space-y-2">
      {config.searchable && (
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700">
              {displayColumns.map((col: any) => {
                const colName = typeof col === 'string' ? col : col.key;
                const colLabel = typeof col === 'string' ? col : col.label;
                
                return (
                  <th
                    key={colName}
                    className={`text-left p-2 font-medium ${
                      config.sortable ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800' : ''
                    }`}
                    onClick={() => handleSort(colName)}
                  >
                    <div className="flex items-center gap-1">
                      {colLabel}
                      {config.sortable && sortBy === colName && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td 
                  colSpan={displayColumns.length} 
                  className="text-center py-8 text-gray-500"
                >
                  No data to display
                </td>
              </tr>
            ) : (
              filteredData.map((row: any, index: number) => (
                <tr 
                  key={index}
                  className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  {displayColumns.map((col: any) => {
                    const colName = typeof col === 'string' ? col : col.key;
                    return (
                      <td key={colName} className="p-2">
                        {row[colName] ?? '-'}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}