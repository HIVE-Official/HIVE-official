'use client';

import { useState } from "react";
import { Mail, Loader2 } from "lucide-react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, Input } from "@hive/ui";

export function LoginForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      if (!email.endsWith(".edu")) {
        throw new Error("Please enter a valid .edu email address.");
      }
      
      const functions = getFunctions();
      const sendMagicLink = httpsCallable(functions, 'sendMagicLink');
      await sendMagicLink({ email });
      setStatus("success");

    } catch (err: any) {
      console.error("Failed to send magic link:", err);
      setStatus("error");
      setError(err.message || "An unknown error occurred.");
    } finally {
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center animate-fade-in">
        <div className="mb-4 text-2xl">✅</div>
        <h2 className="text-xl font-semibold">Check your inbox!</h2>
        <p className="text-muted">
          We sent a secure sign-in link to <span className="font-medium text-primary">{email}</span>
        </p>
        <Button variant="outline" className="mt-6 w-full" disabled>
          Resend link (60s)
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your .edu address"
            required
            className={`pl-10 ${status === 'error' ? 'border-destructive' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
          />
        </div>
        {status === "error" && error && (
          <p className="mt-2 text-sm text-destructive">{error}</p>
        )}
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send magic link →"
        )}
      </Button>
    </form>
  );
} 