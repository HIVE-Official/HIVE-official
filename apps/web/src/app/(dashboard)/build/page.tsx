"use client";

import React from 'react';
import { useToolBuilderVariant } from '@hive/hooks';
import { VisualToolBuilder } from './variants/visual-builder';
import { WizardToolBuilder } from './variants/wizard-builder';
import { TemplateToolBuilder } from './variants/template-builder';

export default function BuildPage() {
  const { variant, trackEvent } = useToolBuilderVariant();

  // Track page view
  React.useEffect(() => {
    trackEvent('view', { page: 'build' });
  }, [trackEvent]);

  // Render variant based on feature flag
  switch (variant) {
    case 'visual':
      return <VisualToolBuilder />;
    case 'wizard':
      return <WizardToolBuilder />;
    case 'template':
      return <TemplateToolBuilder />;
    case 'code':
      // TODO: Implement code-first builder
      return <VisualToolBuilder />;
    default:
      return <TemplateToolBuilder />;
  }
}