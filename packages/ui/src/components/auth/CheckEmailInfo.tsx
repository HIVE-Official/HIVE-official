"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import { Mail, Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface CheckEmailInfoProps {
  email?: string | null;
  backLinkHref: string;
}

export function CheckEmailInfo({ email, backLinkHref }: CheckEmailInfoProps) {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent" />
      <Card className="w-full max-w-md bg-zinc-900/95 border-zinc-800 backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-6 ring-2 ring-yellow-500/20">
            <Mail className="w-8 h-8 text-yellow-500" />
          </div>
          <CardTitle className="text-white text-xl">Check your inbox</CardTitle>
          <CardDescription className="text-zinc-400">
            We&apos;ve sent a secure sign-in link to
            <br />
            <span className="text-white font-medium">
              {email || "your email address"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-500 text-xs font-bold">1</span>
              </div>
              <div className="text-zinc-300">
                Check your email inbox (and spam folder)
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-500 text-xs font-bold">2</span>
              </div>
              <div className="text-zinc-300">Click the secure sign-in link</div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-zinc-800/50 rounded-lg">
            <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
            <p className="text-xs text-zinc-400">
              The link is secure and will expire in{" "}
              <span className="text-white font-medium">10 minutes</span>.
            </p>
          </div>
          <div className="text-center text-xs text-zinc-500">
            Wrong email?{" "}
            <Link
              href={backLinkHref}
              className="text-yellow-500 hover:underline"
            >
              Go back and try again
            </Link>
            .
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
