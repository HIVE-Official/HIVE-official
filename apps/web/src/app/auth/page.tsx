import { redirect } from 'next/navigation';
import type { Metadata } from "next";
import { ROUTES } from '@/lib/routes';

export const metadata: Metadata = {
  title: "Welcome to HIVE",
};

export default function AuthPage() {
  // Platform is locked - redirect to home
  redirect(ROUTES.HOME);
}
