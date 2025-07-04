"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckEmailInfo, PageLoader } from "@hive/ui";
import { ROUTES } from '@/lib/routes';

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return <CheckEmailInfo email={email} backLinkHref={ROUTES.AUTH.SCHOOL_SELECT} />;
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <CheckEmailContent />
    </Suspense>
  );
}
