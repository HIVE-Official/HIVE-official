import React from 'react';
import type { Tool } from '@hive/core';
interface CompleteHIVEToolsSystemProps {
    userId: string;
    userProfile?: {
        name: string;
        handle: string;
        avatar?: string;
        builderLevel?: 'novice' | 'apprentice' | 'journeyman' | 'expert' | 'master';
    };
    spaceId?: string;
    initialTab?: 'marketplace' | 'personal' | 'hivelab';
    onToolInstall?: (toolId: string) => void;
    onToolCreate?: (tool: Tool) => void;
    onToolDeploy?: (toolId: string, spaceId: string) => void;
}
export declare const CompleteHIVEToolsSystem: React.FC<CompleteHIVEToolsSystemProps>;
export {};
//# sourceMappingURL=complete-hive-tools-system.d.ts.map