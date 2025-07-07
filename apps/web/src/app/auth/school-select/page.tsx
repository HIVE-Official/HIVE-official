"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function SchoolSelectPage() {
  const router = useRouter();

  // Platform is locked - redirect to home
  useEffect(() => {
    router.replace(ROUTES.HOME);
  }, [router]);

  // Return null while redirecting
  return null;
} 