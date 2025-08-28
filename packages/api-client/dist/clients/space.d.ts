import type { Space } from '@hive/core';
export declare function getSpaceById(spaceId: string): Promise<Space>;
export declare function getSpacesByType(type: string): Promise<Space[]>;
export declare function verifySpaceLeadership(spaceId: string, emails: string[]): Promise<void>;
//# sourceMappingURL=space.d.ts.map