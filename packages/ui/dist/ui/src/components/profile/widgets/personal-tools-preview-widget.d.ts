import React from 'react';
import { BaseWidgetProps } from '../bento-grid/types';
interface PersonalToolsPreviewWidgetProps extends BaseWidgetProps {
    isV1Unlocked?: boolean;
    onJoinWaitlist: () => void;
    onViewToolCategory: (category: string) => void;
}
export declare const PersonalToolsPreviewWidget: React.FC<PersonalToolsPreviewWidgetProps>;
export {};
//# sourceMappingURL=personal-tools-preview-widget.d.ts.map