import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function OnboardingPage() {
  // Platform is locked - redirect to home
  redirect(ROUTES.HOME);
}
