import React from 'react';
export interface HiveMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    items?: Array<{
        label: string;
        value: string;
        onClick?: () => void;
    }>;
}
export declare const HiveMenu: React.FC<HiveMenuProps>;
export declare const hiveMenuVariants: {};
//# sourceMappingURL=hive-menu.d.ts.map