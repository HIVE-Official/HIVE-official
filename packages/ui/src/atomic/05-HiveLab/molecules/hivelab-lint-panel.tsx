import * as React from 'react';
import { Card, CardContent, Badge } from '../../00-Global/atoms';

export interface LintIssue { level: 'warning' | 'error'; message: string }
export interface HiveLabLintPanelProps { issues?: LintIssue[] }

export function HiveLabLintPanel({ issues = [] }: HiveLabLintPanelProps) {
  return (
    <div className="h-full flex flex-col gap-3">
      <div className="text-sm font-semibold text-white">Lint</div>
      <Card className="bg-hive-background-tertiary border-hive-border-default flex-1">
        <CardContent className="p-3 space-y-2 overflow-auto">
          {issues.length === 0 && (
            <div className="text-sm text-hive-text-tertiary">No issues found.</div>
          )}
          {issues.map((it, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <Badge tone={it.level === 'error' ? 'contrast' : 'muted'} variant="pill">{it.level}</Badge>
              <div className="text-hive-text-secondary">{it.message}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

HiveLabLintPanel.displayName = 'HiveLabLintPanel';

