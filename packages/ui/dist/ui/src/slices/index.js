/**
 * HIVE Slice-Based Architecture Entry Point
 *
 * Minimal slice exports for production use.
 */
// Basic exports for immediate use
export { Button } from '../atomic/atoms/button';
export { Avatar } from '../atomic/atoms/avatar';
export { Badge } from '../atomic/atoms/badge';
export { Card } from '../atomic/molecules/card';
export { HiveOnboardingWizard } from '../components/onboarding/hive-onboarding-wizard';
export { HiveAuthFlow } from '../components/auth/hive-auth-flow';
// Core hooks
export { useOnboardingFlow } from './hooks/use-onboarding-flow';
export { useAuthProvider } from './hooks/use-auth';
// Re-export commonly used utilities
export { ONBOARDING_STEPS, MAGIC_LINK_CONFIG } from './constants';
//# sourceMappingURL=index.js.map