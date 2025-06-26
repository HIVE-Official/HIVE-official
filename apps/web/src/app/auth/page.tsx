import { redirect } from 'next/navigation';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to HIVE",
};

export default function AuthPage() {
  // Redirect to the new focused auth flow
  redirect('/auth/choose');
}
