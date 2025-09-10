/**
 * HIVE Slice-Based Architecture Entry Point
 *
 * Minimal slice exports for production use.
 */
// Basic exports for immediate use
export { ButtonEnhanced as Button } from '../atomic/atoms/button-enhanced.js';
export { Avatar } from '../atomic/atoms/avatar.js';
export { Badge } from '../atomic/atoms/badge.js';
export { Card } from '../atomic/molecules/card.js';
// Core hooks
export { useOnboardingFlow } from './hooks/use-onboarding-flow.js';
export { useAuthProvider } from './hooks/use-auth.js';
// Re-export commonly used utilities
export { ONBOARDING_STEPS, MAGIC_LINK_CONFIG } from './constants.js';
//# sourceMappingURL=index.js.map