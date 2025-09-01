import React from 'react';
import { AuthProvider } from './hive-auth-flow-enhanced';
import { OnboardingProvider } from '../onboarding/hive-onboarding-wizard-enhanced';
/**
 * # HIVE Auth & Onboarding Integration
 *
 * Production-ready component that seamlessly integrates authentication and onboarding
 * using the UnifiedAuth context from @hive/ui. This component handles the complete
 * user journey from first visit to onboarded HIVE member.
 *
 * ## Features:
 * - Works with existing UnifiedAuth context
 * - Seamless auth-to-onboarding transition
 * - UB-specific flows and validation
 * - Mobile-optimized design
 * - Error handling and loading states
 */
interface AuthOnboardingIntegrationProps {
    onAuthComplete?: (user: any) => void;
    onOnboardingComplete?: (userData: any) => void;
    schoolId?: string;
    schoolName?: string;
    schoolDomain?: string;
    mockMode?: boolean;
    initialPhase?: 'auth' | 'onboarding';
    skipAuth?: boolean;
}
export declare function HiveAuthOnboardingIntegration({ onAuthComplete, onOnboardingComplete, schoolId, schoolName, schoolDomain, mockMode, initialPhase, skipAuth }: AuthOnboardingIntegrationProps): import("react/jsx-runtime").JSX.Element;
/**
 * Bridge component that integrates with UnifiedAuth context from @hive/ui
 * This allows the enhanced components to work with the existing auth system.
 */
interface UnifiedAuthBridgeProps {
    children: React.ReactNode;
    unifiedAuth?: any;
}
export declare function UnifiedAuthBridge({ children, unifiedAuth }: UnifiedAuthBridgeProps): import("react/jsx-runtime").JSX.Element;
export { AuthProvider, OnboardingProvider };
//# sourceMappingURL=hive-auth-onboarding-integration.d.ts.map