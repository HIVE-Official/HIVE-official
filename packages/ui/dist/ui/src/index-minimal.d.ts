import React from 'react';
export { cn } from './lib/utils';
export { HiveAuthProvider, useHiveAuth, type HiveUser } from './contexts/hive-auth-context';
export { useHiveAuth as useAuth } from './contexts/hive-auth-context';
export { EmailGate } from './components/auth/email-gate';
export { CheckEmailInfo } from './components/auth/CheckEmailInfo';
export { SchoolPick } from './components/auth/school-pick';
export { LoadingOrchestrator as PageLoader } from './components/loading/LoadingOrchestrator';
export { ButtonEnhanced as Button } from './atomic/atoms/button-enhanced';
export { HiveInput as Input } from './components/hive-input';
export { HiveCard as Card, HiveCard } from './components/hive-card';
export { HiveBadge as Badge, HiveBadge } from './components/hive-badge';
export { HiveModal } from './components/hive-modal';
export { HiveLogo } from './components/hive-logo';
export { FormField } from './atomic/molecules/form-field';
export { hiveVariants } from './lib/motion';
export declare const Checkbox: React.FC<any>;
export declare const PageContainer: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const CardContent: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const CardHeader: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const CardTitle: React.FC<{
    children: React.ReactNode;
    className?: string;
}>;
export declare const Label: React.FC<{
    children: React.ReactNode;
    htmlFor?: string;
    className?: string;
}>;
//# sourceMappingURL=index-minimal.d.ts.map