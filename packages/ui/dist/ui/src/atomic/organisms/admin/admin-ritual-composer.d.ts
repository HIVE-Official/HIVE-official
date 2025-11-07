import * as React from 'react';
import { type RitualComposerInput } from '@hive/core';
export interface AdminRitualComposerProps {
    initialValue?: Partial<RitualComposerInput>;
    onSubmit: (payload: RitualComposerInput) => Promise<void> | void;
    onCancel?: () => void;
    isSubmitting?: boolean;
}
export declare const AdminRitualComposer: React.FC<AdminRitualComposerProps>;
//# sourceMappingURL=admin-ritual-composer.d.ts.map