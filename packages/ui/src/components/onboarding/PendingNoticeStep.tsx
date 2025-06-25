import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import { CheckCircle } from "lucide-react";

export interface PendingNoticeStepProps {
  spaceName: string;
  onNext: (step: number) => void;
}

export function PendingNoticeStep({
  spaceName,
  onNext,
}: PendingNoticeStepProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
        <CardHeader>
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-gold-500" />
          </div>
          <CardTitle className="text-center">Request Submitted</CardTitle>
          <CardDescription className="text-center">
            Your request to lead {spaceName} is being reviewed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-zinc-400">
            We&apos;ll notify you once your request has been approved. In the
            meantime, let&apos;s continue setting up your profile.
          </p>
          <Button onClick={() => onNext(5)} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
