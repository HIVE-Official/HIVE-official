"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../card";
import { Button } from "../button";
import Link from "next/link";

interface CheckEmailInfoProps {
  email: string | null;
  backLinkHref: string;
}

export const CheckEmailInfo = ({
  email,
  backLinkHref,
}: CheckEmailInfoProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Check your inbox</CardTitle>
          <CardDescription>
            We&apos;ve sent a magic link to{" "}
            <span className="font-semibold text-foreground">{email || "your email address"}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted">
            Click the link in the email to sign in or create your account.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href={backLinkHref}>Back to Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}; 