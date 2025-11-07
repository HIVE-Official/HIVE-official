import * as React from 'react';
import { Card, CardContent, Label, Input, Button } from '../../00-Global/atoms';

export interface HiveLabInspectorPanelProps {
  selectedName?: string;
  config?: Record<string, any>;
  onChange?: (next: Record<string, any>) => void;
}

export function HiveLabInspectorPanel({ selectedName, config, onChange }: HiveLabInspectorPanelProps) {
  const entries = React.useMemo(() => Object.entries(config || {}), [config]);
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="text-sm font-semibold text-white">Inspector</div>
      {!selectedName && (
        <div className="text-sm text-hive-text-tertiary">Select an element to edit its properties.</div>
      )}
      {selectedName && (
        <Card className="bg-hive-background-tertiary border-hive-border-default">
          <CardContent className="p-3 space-y-3">
            <div className="text-sm text-white">{selectedName}</div>
            {entries.map(([k, v]) => (
              <div key={k} className="space-y-1">
                <Label className="text-xs uppercase tracking-wide text-hive-text-tertiary">{k}</Label>
                <Input value={String(v)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.({ ...(config || {}), [k]: e.target.value })} />
              </div>
            ))}
            {entries.length === 0 && (
              <div className="text-xs text-hive-text-tertiary">No configurable properties.</div>
            )}
          </CardContent>
        </Card>
      )}
      <div className="mt-auto" />
      <Button size="sm" variant="secondary">Documentation</Button>
    </div>
  );
}

HiveLabInspectorPanel.displayName = 'HiveLabInspectorPanel';

