import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function OnboardingPage() {
  redirect(ROUTES.ONBOARDING.STEP_1);
}
