import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function OnboardingPage() {
  // Redirect to first onboarding step
  redirect(ROUTES.ONBOARDING.STEP_1);
}
