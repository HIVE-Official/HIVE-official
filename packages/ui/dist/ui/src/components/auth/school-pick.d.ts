import React from 'react';
import type { School } from '@hive/core';
interface SchoolPickProps {
    schools: School[];
    onSchoolSelect: (school: School) => void;
    className?: string;
    userEmail?: string;
    isLoading?: boolean;
}
export declare const SchoolPick: React.FC<SchoolPickProps>;
export {};
//# sourceMappingURL=school-pick.d.ts.map