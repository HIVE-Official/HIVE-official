/**
 * HIVE Enhanced User Identity - Campus Command Center Identity
 * Brand-consistent user identity with HIVE's gold/black design system
 * Built for University at Buffalo students with social utility focus
 */
import * as React from 'react';
export interface EnhancedUserIdentityProps {
    name: string;
    handle?: string;
    avatar?: string;
    bio?: string;
    major?: string;
    graduationYear?: number;
    dorm?: string;
    status?: 'online' | 'away' | 'offline' | 'studying';
    role?: 'student' | 'admin' | 'leader';
    verified?: boolean;
    isBuilder?: boolean;
    completionPercentage?: number;
    showCompletionPrompt?: boolean;
    size?: 'small' | 'base' | 'large';
    layout?: 'horizontal' | 'vertical';
    showHandle?: boolean;
    showBio?: boolean;
    showCampusInfo?: boolean;
    onEditProfile?: () => void;
    className?: string;
}
export declare const EnhancedUserIdentity: React.ForwardRefExoticComponent<EnhancedUserIdentityProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=enhanced-user-identity.d.ts.map