import React from 'react';
import type { ChoiceSelectConfigSchema } from '@hive/core';
import { z } from 'zod';
type ChoiceSelectConfig = z.infer<typeof ChoiceSelectConfigSchema>;
interface ChoiceSelectProps {
    config: ChoiceSelectConfig;
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    disabled?: boolean;
    error?: string;
    className?: string;
}
export declare const ChoiceSelect: React.FC<ChoiceSelectProps>;
export default ChoiceSelect;
//# sourceMappingURL=choice-select.d.ts.map