import React from 'react';
import { type SpaceType } from '@hive/core';
interface SpaceRequestFormProps {
    onSubmit: (data: {
        spaceId: string;
        spaceName: string;
        spaceType: SpaceType;
        claimReason: string;
        userRole: 'student' | 'faculty';
    }) => void;
    onBack: () => void;
    isSubmitting: boolean;
    error?: string | null;
}
export declare const SpaceRequestForm: React.FC<SpaceRequestFormProps>;
export {};
//# sourceMappingURL=space-request-form.d.ts.map