import { type Metadata } from "next";
import { redirect } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

interface OnboardingStepPageProps {
  params: Promise<{
    step: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "HIVE | Coming Soon",
  description: "HIVE platform is currently locked",
};

export default async function OnboardingStepPage({ params }: OnboardingStepPageProps) {
  // Platform is locked - redirect to home
  redirect(ROUTES.HOME);
}