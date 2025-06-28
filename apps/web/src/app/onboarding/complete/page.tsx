"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@hive/auth-logic";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { logger } from "@hive/core";
import { Button } from "@hive/ui";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { OnboardingCompleteStep } from '@/components/onboarding/steps/complete-step';

export default function OnboardingCompletePage() {
  return <OnboardingCompleteStep />;
}
