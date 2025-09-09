"use client";

import React, { useState, useRef } from 'react';
import { Label, Button } from '@hive/ui';
import { Upload, X, File } from 'lucide-react';
import { ElementRendererProps } from '../index';

export function FileUploadRenderer({
  element,
  elementDef,
  data,
  onChange,
  onAction,
  isPreview,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const [files, setFiles] = useState<File[]>(data || []);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    // Validation
    if (config.maxSize) {
      const maxSizeBytes = config.maxSize * 1024 * 1024; // Convert MB to bytes
      const oversizedFiles = selectedFiles.filter(f => f.size > maxSizeBytes);
      
      if (oversizedFiles.length > 0) {
        setError(`Files exceed maximum size of ${config.maxSize}MB`);
        return;
      }
    }
    
    setError(null);
    
    const newFiles = config.multiple 
      ? [...files, ...selectedFiles]
      : selectedFiles;
    
    setFiles(newFiles);
    
    if (onChange) {
      onChange(element.instanceId, newFiles);
    }
    
    if (onAction) {
      onAction(element.instanceId, 'onUpload', newFiles);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    
    if (onChange) {
      onChange(element.instanceId, newFiles);
    }
  };

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <Upload className="h-3 w-3" />
          File Upload
        </div>
        <div className="font-medium">{config.label || 'Upload File'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {config.label && (
        <Label>
          {config.label}
          {config.required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      
      <div className="space-y-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPreview}
          className="w-full"
        >
          <Upload className="h-4 w-4 mr-2" />
          {config.multiple ? 'Choose Files' : 'Choose File'}
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept={config.accept}
          multiple={config.multiple}
          onChange={handleFileSelect}
          className="hidden"
        />
        
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded"
              >
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-gray-500" />
                  <span className="text-sm truncate max-w-[200px]">
                    {file.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024).toFixed(1)}KB)
                  </span>
                </div>
                {!isPreview && (
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}