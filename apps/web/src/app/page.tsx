import { redirect } from 'next/navigation';

export default function LandingPage() {
  // Redirect to the new welcome page
  redirect('/welcome');
}
