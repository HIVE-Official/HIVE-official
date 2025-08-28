import { Metadata } from 'next';
import { ProfileDashboardClient } from './profile-dashboard-client';

export const metadata: Metadata = {
  title: 'Profile Dashboard | HIVE',
  description: 'Your personalized campus command center - manage your profile, calendar, spaces, and campus life all in one place.',
};

export default function ProfileDashboardPage() {
  return <ProfileDashboardClient />;
}