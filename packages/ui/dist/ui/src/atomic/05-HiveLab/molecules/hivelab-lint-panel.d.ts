export interface LintIssue {
    level: 'warning' | 'error';
    message: string;
}
export interface HiveLabLintPanelProps {
    issues?: LintIssue[];
}
export declare function HiveLabLintPanel({ issues }: HiveLabLintPanelProps): import("react/jsx-runtime").JSX.Element;
export declare namespace HiveLabLintPanel {
    var displayName: string;
}
//# sourceMappingURL=hivelab-lint-panel.d.ts.map