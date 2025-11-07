import * as React from 'react';

import { VisualToolComposer, type VisualToolComposerProps } from '../../components/hivelab/visual-tool-composer';
import type { ToolComposition } from '../../lib/hivelab/element-system';

export interface ToolEditPageProps {
  userId: string;
  initialComposition?: ToolComposition;
  onSave: VisualToolComposerProps['onSave'];
  onPreview: VisualToolComposerProps['onPreview'];
  onCancel: VisualToolComposerProps['onCancel'];
}

export function ToolEditPage({ userId, initialComposition, onSave, onPreview, onCancel }: ToolEditPageProps) {
  return (
    <VisualToolComposer
      userId={userId}
      initialComposition={initialComposition}
      onSave={onSave}
      onPreview={onPreview}
      onCancel={onCancel}
    />
  );
}

ToolEditPage.displayName = 'ToolEditPage';

