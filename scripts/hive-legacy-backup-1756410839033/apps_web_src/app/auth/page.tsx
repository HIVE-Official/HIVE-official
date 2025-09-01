import type { Metadata } from "next";
import AuthPageClient from './AuthPageClient';

export const metadata: Metadata = {
  title: "Welcome to HIVE",
};

export default function AuthPage() {
  return <AuthPageClient />;
}
