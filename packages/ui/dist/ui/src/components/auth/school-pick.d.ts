import React from 'react';
export interface School {
    id: string;
    name: string;
    domain: string;
    logo?: string;
    studentCount?: number;
}
export interface SchoolPickProps {
    schools: School[];
    onSchoolSelect: (school: School) => void;
    isLoading?: boolean;
}
export declare const SchoolPick: React.FC<SchoolPickProps>;
//# sourceMappingURL=school-pick.d.ts.map