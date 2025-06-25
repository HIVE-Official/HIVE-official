import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui";
import { useState } from "react";

export interface LeaderQuestionStepProps {
  onNext: (step: number) => void;
  onAnswer: (isLeader: boolean) => void;
}

export function LeaderQuestionStep({
  onNext,
  onAnswer,
}: LeaderQuestionStepProps) {
  const [isLeader, setIsLeader] = useState<boolean | null>(null);

  const handleContinue = () => {
    if (isLeader === null) return;
    onAnswer(isLeader);
    onNext(isLeader ? 3 : 4); // If leader, go to claim space, else skip to academic card
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">
            Are you a student leader?
          </CardTitle>
          <CardDescription className="text-zinc-400">
            Student leaders can claim and manage official Spaces for their
            organizations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Button
              variant={isLeader === true ? "default" : "outline"}
              onClick={() => setIsLeader(true)}
              className={
                isLeader === true
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }
            >
              Yes, I lead an organization
            </Button>
            <Button
              variant={isLeader === false ? "default" : "outline"}
              onClick={() => setIsLeader(false)}
              className={
                isLeader === false
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }
            >
              No, not right now
            </Button>
          </div>
          <Button
            onClick={handleContinue}
            disabled={isLeader === null}
            className="w-full bg-yellow-500 text-black hover:bg-yellow-600 disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
