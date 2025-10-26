"use client";
import * as React from "react";
import { Card } from "@/atoms/card";
import { Button } from "@/atoms/button";
import { Progress } from "@/atoms/progress";
import { Badge } from "@/atoms/badge";
import { maskEmail } from "@/fixtures/campuses";
import { cn } from "@/utils/cn";
import { motionClass } from "@/utils/motion";
import { CheckCircle2, Mail } from "lucide-react";

export interface AwaitChecklistCardProps extends React.HTMLAttributes<HTMLDivElement> {
  email: string;
  cooldownSeconds?: number; // e.g., 60
  onResend?: () => void;
  onChangeEmail?: () => void;
}

export function AwaitChecklistCard({
  email,
  cooldownSeconds = 60,
  onResend,
  onChangeEmail,
  className,
  ...rest
}: AwaitChecklistCardProps) {
  const [secondsLeft, setSecondsLeft] = React.useState<number>(cooldownSeconds);
  const enabled = secondsLeft <= 0;
  const pct = Math.max(0, Math.min(100, 100 - (secondsLeft / cooldownSeconds) * 100));

  React.useEffect(() => {
    if (secondsLeft <= 0) return; 
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  return (
    <Card className={cn("surface-glass", className)} {...rest}>
      <div className={cn("space-y-4 p-6", motionClass("ambient"), "enter-fade")}> 
        <div className="flex items-center gap-2">
          <Mail className="size-5 text-muted-foreground" aria-hidden />
          <h3 className="text-h3 font-h3">Check your email</h3>
        </div>

        <div className="flex items-center gap-2 text-body text-muted-foreground">
          <Badge variant="outline">{maskEmail(email)}</Badge>
        </div>

        <ol className="space-y-2 text-body">
          <li className="flex items-center gap-2 text-foreground">
            <CheckCircle2 className="size-4 text-success" aria-hidden />
            <span>Link sent</span>
          </li>
          <li className="flex items-center gap-2 text-foreground">
            <CheckCircle2 className="size-4 text-success" aria-hidden />
            <span>
              Open your email app
              <span className="ml-2 text-caption text-muted-foreground">Gmail / Outlook / Apple Mail</span>
            </span>
          </li>
          <li className="flex items-center gap-2 text-muted-foreground">
            <span className="size-4 rounded-full border border-muted" aria-hidden />
            <span>Tap "Sign in to HIVE"</span>
          </li>
        </ol>

        <div className="space-y-2" role="group" aria-live="polite" aria-atomic="true">
          <Progress value={pct} aria-label="Resend cooldown" />
          <div className="flex items-center justify-between">
            <span className="text-caption text-muted-foreground">
              {enabled ? "Resend available" : `Resend in 0:${String(secondsLeft).padStart(2, "0")}`}
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onChangeEmail}>Change email</Button>
              <Button disabled={!enabled} onClick={onResend}>
                Resend
              </Button>
            </div>
          </div>
        </div>

        <p className="text-caption text-muted-foreground">Didn’t get it? Check spam or try again.</p>
      </div>
    </Card>
  );
}
