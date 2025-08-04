/**
 * HIVE Tool Permissions Manager
 * Comprehensive interface for managing tool permissions and access control
 */
import React from 'react';
import { Tool } from '@hive/core';
type PermissionAction = 'view' | 'use' | 'manage' | 'edit' | 'delete' | 'share';
interface UserPermission {
    userId: string;
    userName: string;
    userHandle: string;
    avatar?: string;
    permissions: PermissionAction[];
    grantedBy: string;
    grantedAt: string;
    expiresAt?: string;
}
interface RolePermission {
    role: 'admin' | 'moderator' | 'member';
    permissions: PermissionAction[];
    restrictions?: {
        timeLimit?: number;
        usageLimit?: number;
        requireApproval?: boolean;
    };
}
interface ToolPermissionConfig {
    toolId: string;
    spaceId: string;
    isPublic: boolean;
    defaultPermissions: PermissionAction[];
    rolePermissions: RolePermission[];
    userPermissions: UserPermission[];
    restrictions: {
        maxConcurrentUsers?: number;
        allowAnonymous?: boolean;
        requireApproval?: boolean;
        allowSharing?: boolean;
        trackUsage: boolean;
    };
    schedule?: {
        enabled: boolean;
        allowedHours?: {
            start: string;
            end: string;
        };
        allowedDays?: string[];
        timezone?: string;
    };
}
interface ToolPermissionsManagerProps {
    tool: Tool;
    currentConfig: ToolPermissionConfig;
    spaceMembers: Array<{
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        role: 'admin' | 'moderator' | 'member';
        joinedAt: string;
    }>;
    onConfigChange: (config: ToolPermissionConfig) => void;
    onSave: (config: ToolPermissionConfig) => Promise<void>;
    userRole: 'admin' | 'moderator' | 'member';
    isLoading?: boolean;
}
export declare const ToolPermissionsManager: React.FC<ToolPermissionsManagerProps>;
export {};
//# sourceMappingURL=tool-permissions-manager.d.ts.map