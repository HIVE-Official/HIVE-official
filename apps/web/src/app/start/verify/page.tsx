"use client";

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@hive/ui";
import { loadOtp, saveOtp, generateOtp, loadEmail } from "@/lib/start-flow";

export default function StartVerifyPage(): JSX.Element {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const otp = loadOtp();
  const email = loadEmail();

  useEffect(() => {
    if (!otp || !email) router.replace("/start");
  }, [otp, email, router]);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const expiresIn = Math.max(0, (otp?.expiresAt ?? 0) - now);
  const resendIn = Math.max(0, (otp?.resendAvailableAt ?? 0) - now);
  const mm = String(Math.floor(expiresIn / 60_000)).padStart(2, "0");
  const ss = String(Math.floor((expiresIn % 60_000) / 1000)).padStart(2, "0");

  function handleVerify() {
    if (!otp) return;
    if (code.length !== 6) {
      setError("Enter the full 6-digit code.");
      return;
    }
    if (expiresIn === 0) {
      setError("This code expired. Resend and try again.");
      return;
    }
    if (code !== otp.code) {
      setError("Code incorrect. Try again.");
      return;
    }
    setError(null);
    router.push("/start/done");
  }

  function handleResend() {
    if (!otp) return;
    if (resendIn > 0) return;
    const next = generateOtp();
    const nowMs = Date.now();
    saveOtp({ ...otp, code: next, sentAt: nowMs, expiresAt: nowMs + 5 * 60_000, resendAvailableAt: nowMs + 30_000 });
    setError(null);
  }

  return (
    <main className="space-y-8">
      <div className="space-y-3">
        <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
          Step 3 of 4
        </span>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold leading-tight">Check your email</h1>
          <p className="text-white/70">
            Enter the 6-digit code we sent to <span className="font-semibold text-white">{email}</span>. This keeps your account secure.
          </p>
        </div>
      </div>

      <section className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
          <InputOTP
            value={code}
            onChange={(value) => {
              const nextValue = value.replace(/\D+/g, "").slice(0, 6);
              setCode(nextValue);
              setError(null);
            }}
            maxLength={6}
            inputMode="numeric"
            autoComplete="one-time-code"
            containerClassName="w-full"
            className="w-full"
            data-testid="start-otp"
          >
            <InputOTPGroup className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/30 px-6 py-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <Fragment key={index}>
                  <InputOTPSlot
                    index={index}
                    className="h-14 w-12 rounded-xl border border-white/15 bg-[#0B0B0F] text-center text-xl font-semibold text-white transition focus:border-white/40"
                  />
                  {index === 1 || index === 3 ? (
                    <InputOTPSeparator className="h-14 w-[1px] bg-white/10" />
                  ) : null}
                </Fragment>
              ))}
            </InputOTPGroup>
          </InputOTP>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-white/70" aria-live="polite">
            <div className="font-medium text-white">
              Expires in {mm}:{ss}
            </div>
            {resendIn > 0 ? (
              <div className="text-xs uppercase tracking-[0.2em] text-white/50">Resend in {Math.ceil(resendIn / 1000)}s</div>
            ) : (
              <button type="button" onClick={handleResend} className="text-sm text-white underline underline-offset-2">
                Didn’t get it? Resend
              </button>
            )}
          </div>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="status" aria-live="polite">
            {error}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/65">
            Tip: Codes expire after five minutes for security. Resend any time.
          </div>
        )}
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button type="button" onClick={() => router.push("/start/email")} className="text-sm text-white/70 underline underline-offset-2 hover:text-white">
          Use a different email
        </button>
        <Button size="lg" variant="primary" onClick={handleVerify} data-testid="start-verify">
          Verify
        </Button>
      </div>
    </main>
  );
}
