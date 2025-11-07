import React from 'react';
import type { HiveButtonProps } from '../atoms/hive-button';
import type { HiveLabMode } from './hivelab-overview';
export interface HiveLabModeAction extends Pick<HiveButtonProps, 'variant' | 'size'> {
    label: string;
    onClick?: () => void;
}
export interface HiveLabModePlaceholderProps {
    mode: Exclude<HiveLabMode, 'visual'>;
    badge?: string;
    title: string;
    description: string;
    helper?: string;
    primaryAction?: HiveLabModeAction;
    secondaryAction?: HiveLabModeAction;
    className?: string;
    containerClassName?: string;
}
export declare const HiveLabModePlaceholder: React.FC<HiveLabModePlaceholderProps>;
//# sourceMappingURL=hivelab-mode-placeholder.d.ts.map