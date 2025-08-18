import React from "react";
import type { School } from '@hive/core';
export type AuthStep = "school-pick" | "email-gate" | "magic-link-sent";
interface AuthFlowProps {
    schools: School[];
    onSchoolSelect: (school: School) => void;
    onEmailSubmit: (email: string) => Promise<void>;
    onCreateSchool?: () => void;
    className?: string;
}
export declare const AuthFlow: React.FC<AuthFlowProps>;
export {};
//# sourceMappingURL=auth-flow.d.ts.map