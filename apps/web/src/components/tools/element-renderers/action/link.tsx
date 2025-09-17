"use client";

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { ElementRendererProps } from '../types';

export function LinkRenderer({
  element,
  elementDef,
  data,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const href = data || config.href || '#';
  const text = config.text || 'Click here';
  const target = config.target || '_self';

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <ExternalLink className="h-3 w-3" />
          Link
        </div>
        <div className="font-medium text-blue-600">{text}</div>
      </div>
    );
  }

  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline inline-flex items-center gap-1"
      >
        {text}
        {target === '_blank' && (
          <ExternalLink className="h-3 w-3" />
        )}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
    >
      {text}
    </Link>
  );
}