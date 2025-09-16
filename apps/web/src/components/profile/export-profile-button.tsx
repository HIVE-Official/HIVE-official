"use client";

import React, { useState } from 'react';
import { logger } from '@/lib/logger';

import { Button } from '@hive/ui';
import { Download, FileJson, FileText, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ExportProfileButton({ className }: { className?: string }) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showOptions, setShowOptions] = useState(false);

  const handleExport = async (format: 'json' | 'pdf') => {
    setIsExporting(true);
    setExportStatus('idle');
    setShowOptions(false);

    try {
      const response = await fetch(`/api/profile/export?format=${format}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}`
        }
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Get the filename from the Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch ? fileNameMatch[1] : `profile-export.${format}`;

      // Create a blob from the response
      const blob = await response.blob();
      
      // Create a download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setExportStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setExportStatus('idle');
      }, 3000);
    } catch (error) {
      logger.error('Error exporting profile:', { error: String(error) });
      setExportStatus('error');
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setExportStatus('idle');
      }, 3000);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowOptions(!showOptions)}
        disabled={isExporting}
        className={cn(
          "gap-2",
          exportStatus === 'success' && "border-green-500 text-green-500",
          exportStatus === 'error' && "border-red-500 text-red-500",
          className
        )}
      >
        {isExporting ? (
          <>
            <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Exporting...
          </>
        ) : exportStatus === 'success' ? (
          <>
            <Check className="h-4 w-4" />
            Exported!
          </>
        ) : exportStatus === 'error' ? (
          <>
            <AlertCircle className="h-4 w-4" />
            Export Failed
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Export Profile
          </>
        )}
      </Button>

      {/* Export Options Dropdown */}
      {showOptions && !isExporting && (
        <div className="absolute top-full mt-2 right-0 bg-card border border-border rounded-lg shadow-lg p-2 min-w-[200px] z-10">
          <button
            onClick={() => handleExport('json')}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left"
          >
            <FileJson className="h-4 w-4 text-blue-400" />
            <div>
              <p className="font-medium">Export as JSON</p>
              <p className="text-xs text-muted-foreground">Machine-readable format</p>
            </div>
          </button>
          
          <button
            onClick={() => {
              alert('PDF export coming soon!');
              setShowOptions(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted rounded-md transition-colors text-left opacity-50 cursor-not-allowed"
          >
            <FileText className="h-4 w-4 text-red-400" />
            <div>
              <p className="font-medium">Export as PDF</p>
              <p className="text-xs text-muted-foreground">Coming soon</p>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}