import * as React from 'react';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from '../../00-Global/atoms';
import { HiveLabElementPalette } from '../molecules/hivelab-element-palette';
import { HiveLabInspectorPanel } from '../molecules/hivelab-inspector-panel';
import { HiveLabLintPanel, type LintIssue } from '../molecules/hivelab-lint-panel';
import { VisualToolComposer } from '../../../components/hivelab/visual-tool-composer';
import type { ToolComposition, ElementDefinition } from '../../../lib/hivelab/element-system';

export interface HiveLabStudioProps {
  userId: string;
  initialComposition?: ToolComposition;
  onSave: (composition: ToolComposition) => Promise<void> | void;
  onPreview: (composition: ToolComposition) => void;
  onCancel?: () => void;
}

export function HiveLabStudio({ userId, initialComposition, onSave, onPreview, onCancel }: HiveLabStudioProps) {
  const [selectedName, setSelectedName] = React.useState<string | undefined>(undefined);
  const [selectedConfig, setSelectedConfig] = React.useState<Record<string, any> | undefined>(undefined);
  const [issues, setIssues] = React.useState<LintIssue[]>([]);

  const handleInsert = (_el: ElementDefinition) => {
    // Minimal: show a lint reminder when many elements are added (placeholder behavior)
    setIssues((prev) => prev.length === 0 ? [{ level: 'warning', message: 'Consider setting a close time for your tool.' }] : prev);
  };

  return (
    <div className="h-full w-full grid grid-cols-[280px_minmax(0,1fr)_360px] grid-rows-[64px_minmax(0,1fr)]">
      {/* Toolbar */}
      <div className="col-span-3 flex items-center gap-2 px-3 border-b border-hive-border-default bg-hive-background-overlay">
        <Button variant="ghost" onClick={onCancel}>Back</Button>
        <div className="text-sm text-hive-text-tertiary flex-1">HiveLab Studio</div>
        <Button variant="secondary" onClick={() => onPreview(initialComposition || { id: 'temp', name: 'Untitled', description: '', elements: [], connections: [], layout: 'grid' })}>Preview</Button>
        <Button onClick={() => onSave(initialComposition || { id: 'temp', name: 'Untitled', description: '', elements: [], connections: [], layout: 'grid' })}>Save</Button>
      </div>

      {/* Left Palette */}
      <div className="row-start-2 border-r border-hive-border-default p-3 bg-hive-background-secondary overflow-hidden">
        <HiveLabElementPalette onInsert={handleInsert} />
      </div>

      {/* Center Composer */}
      <div className="row-start-2 overflow-hidden">
        <VisualToolComposer
          userId={userId}
          initialComposition={initialComposition}
          onSave={onSave}
          onPreview={onPreview}
          onCancel={onCancel || (() => {})}
        />
      </div>

      {/* Right Inspector/Lint */}
      <div className="row-start-2 border-l border-hive-border-default p-3 bg-hive-background-secondary overflow-hidden">
        <Tabs defaultValue="inspector" className="h-full flex flex-col">
          <TabsList>
            <TabsTrigger value="inspector">Inspector</TabsTrigger>
            <TabsTrigger value="lint">Lint</TabsTrigger>
          </TabsList>
          <div className="mt-3 flex-1 min-h-0">
            <TabsContent value="inspector" className="h-full">
              <HiveLabInspectorPanel selectedName={selectedName} config={selectedConfig} onChange={setSelectedConfig} />
            </TabsContent>
            <TabsContent value="lint" className="h-full">
              <HiveLabLintPanel issues={issues} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}

HiveLabStudio.displayName = 'HiveLabStudio';

