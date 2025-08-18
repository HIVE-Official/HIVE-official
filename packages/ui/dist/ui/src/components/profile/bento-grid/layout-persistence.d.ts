import React from 'react';
import { LayoutConfiguration, WidgetConfiguration } from './types';
interface LayoutPersistenceProps {
    currentLayout: WidgetConfiguration[];
    deviceType: 'desktop' | 'tablet' | 'mobile';
    onLayoutLoad: (widgets: WidgetConfiguration[]) => void;
    onLayoutSave?: (layout: LayoutConfiguration) => Promise<void>;
    onLayoutConflict?: (localLayout: LayoutConfiguration, remoteLayout: LayoutConfiguration) => LayoutConfiguration;
}
export declare const LayoutPersistence: React.FC<LayoutPersistenceProps>;
export {};
//# sourceMappingURL=layout-persistence.d.ts.map