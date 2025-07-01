import { redirect } from 'next/navigation';

export default function LandingPage() {
  // Next.js redirect() throws internally - this is normal and expected
  // We don't need to wrap it in try-catch as it's not an error
  redirect('/welcome');
}
