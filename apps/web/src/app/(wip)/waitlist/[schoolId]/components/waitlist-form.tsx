"use client";
import React from "react";
// import { ... } from "@hive/ui";
// import { Input } from "@hive/ui";
// import { Label } from "@hive/ui";
// import { Button } from "@hive/ui";
// import { Alert, AlertDescription } from "@hive/ui";

interface WaitlistFormProps {
  schoolDomain: string;
  schoolId: string;
  schoolName: string;
}

export function WaitlistForm({ schoolDomain, schoolId, schoolName }: WaitlistFormProps) {
  // TODO: Implement form state, validation, and submission logic
  return (
    <div>
      <h2>Waitlist Form for {schoolName}</h2>
      <p>Domain: {schoolDomain}</p>
      <p>ID: {schoolId}</p>
    </div>
  );
}
