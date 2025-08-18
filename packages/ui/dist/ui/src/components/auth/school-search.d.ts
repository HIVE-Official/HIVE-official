import React from 'react';
interface School {
    id: string;
    name: string;
    location: string;
    domain: string;
    studentCount?: string;
    isActive?: boolean;
    isPending?: boolean;
}
interface SchoolSearchProps {
    onSchoolSelect: (school: School) => void;
    onRequestSchool?: (schoolName: string) => void;
    className?: string;
    initialSearch?: string;
}
export declare const SchoolSearch: React.FC<SchoolSearchProps>;
export {};
//# sourceMappingURL=school-search.d.ts.map