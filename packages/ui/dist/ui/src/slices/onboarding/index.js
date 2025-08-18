/**
 * Onboarding Slice - User Registration & Welcome Experience
 *
 * This slice handles all user onboarding flows, welcome experiences,
 * and initial setup processes for new HIVE users.
 */
// Core onboarding components
export { HiveOnboardingWizard } from '../../components/onboarding/hive-onboarding-wizard.js';
// Welcome experience components  
export { WelcomeMat } from '../../components/welcome/welcome-mat.js';
export { WelcomeCard } from '../../components/welcome/welcome-card.js';
export { SchoolSearchInput } from '../../components/welcome/school-search-input.js';
// Waitlist and school selection
export { WaitlistForm } from '../../components/waitlist-form.js';
// Hooks for onboarding state
export { useOnboardingFlow } from './hooks/use-onboarding-flow.js';
// Constants and configuration
export { ONBOARDING_STEPS, SCHOOL_DOMAINS } from './constants.js';
//# sourceMappingURL=index.js.map