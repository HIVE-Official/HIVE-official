import React from 'react';
import type { School } from '@hive/core';
export interface MagicLinkSentProps {
    email: string;
    school: School;
    onBack: () => void;
    onResend: () => Promise<boolean>;
    className?: string;
}
export declare const MagicLinkSent: React.FC<MagicLinkSentProps>;
//# sourceMappingURL=magic-link-sent.d.ts.map