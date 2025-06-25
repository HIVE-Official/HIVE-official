"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { CheckEmailInfo } from "@hive/ui/components/auth/CheckEmailInfo";

function CheckEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return <CheckEmailInfo email={email} backLinkHref="/auth" />;
}

export default function CheckEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckEmailContent />
    </Suspense>
  );
}
