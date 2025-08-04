/**
 * HIVE Slice-Based Architecture Entry Point
 *
 * Minimal slice exports for production use.
 */
export { Button } from '../atomic/atoms/button';
export { Avatar } from '../atomic/atoms/avatar';
export { Badge } from '../atomic/atoms/badge';
export { Card } from '../atomic/molecules/card';
export { HiveOnboardingWizard } from '../components/onboarding/hive-onboarding-wizard';
export { HiveAuthFlow } from '../components/auth/hive-auth-flow';
export type { OnboardingData, AuthUser } from './types';
export { useOnboardingFlow } from './hooks/use-onboarding-flow';
export { useAuthProvider } from './hooks/use-auth';
export { ONBOARDING_STEPS, MAGIC_LINK_CONFIG } from './constants';
//# sourceMappingURL=index.d.ts.map