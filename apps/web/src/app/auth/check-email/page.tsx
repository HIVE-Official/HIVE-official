"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckEmailInfo } from "@hive/ui";

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
