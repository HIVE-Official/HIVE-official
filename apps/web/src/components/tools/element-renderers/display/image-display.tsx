"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { ElementRendererProps } from '../index';

export function ImageDisplayRenderer({
  element,
  elementDef,
  data,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const src = data || config.src;
  const alt = config.alt || 'Image';
  const width = config.width || 300;
  const height = config.height || 200;
  const objectFit = config.objectFit || 'cover';
  
  const [imageError, setImageError] = useState(false);

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <ImageIcon className="h-3 w-3" />
          Image Display
        </div>
        <div className="font-medium text-xs truncate">{src || 'No image'}</div>
      </div>
    );
  }

  if (!src || imageError) {
    return (
      <div 
        className="bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center"
        style={{ width, height }}
      >
        <ImageIcon className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="relative" style={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: objectFit as any }}
        className="rounded-lg"
        onError={() => setImageError(true)}
      />
    </div>
  );
}