import React from 'react';
import { LucideIcon } from 'lucide-react';
export interface IconProps extends React.SVGProps<SVGSVGElement> {
    icon: LucideIcon | React.ComponentType<any>;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    color?: 'primary' | 'secondary' | 'muted' | 'gold' | 'ruby' | 'emerald' | 'sapphire';
    variant?: 'default' | 'outlined' | 'filled';
}
export declare const Icon: React.FC<IconProps>;
//# sourceMappingURL=icon.d.ts.map