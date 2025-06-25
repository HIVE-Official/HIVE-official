import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui";
import { useState } from "react";

export interface Space {
  id: string;
  name: string;
  description?: string;
}

export interface ClaimSpaceStepProps {
  existingSpaces: Space[];
  onNext: (step: number) => void;
  onClaim: (spaceId: string | null, newSpaceName?: string) => void;
}

export function ClaimSpaceStep({
  existingSpaces,
  onNext,
  onClaim,
}: ClaimSpaceStepProps) {
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const [newSpaceName, setNewSpaceName] = useState("");
  const [isRequestingNew, setIsRequestingNew] = useState(false);

  const handleContinue = () => {
    if (isRequestingNew) {
      onClaim(null, newSpaceName);
    } else if (selectedSpaceId) {
      onClaim(selectedSpaceId);
    }
    onNext(4); // Go to pending notice
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Claim Your Space</CardTitle>
          <CardDescription>
            Choose an existing space to lead or request a new one.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isRequestingNew && (
            <div className="space-y-4">
              <Label>Select an existing space</Label>
              <Select onValueChange={(value) => setSelectedSpaceId(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a space..." />
                </SelectTrigger>
                <SelectContent>
                  {existingSpaces.map((space) => (
                    <SelectItem key={space.id} value={space.id}>
                      {space.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsRequestingNew(true)}
                  className="text-gold-500 hover:text-gold-400 text-sm"
                >
                  Or request a new space
                </button>
              </div>
            </div>
          )}

          {isRequestingNew && (
            <div className="space-y-4">
              <Label>New space name</Label>
              <Input
                value={newSpaceName}
                onChange={(e) => setNewSpaceName(e.target.value)}
                placeholder="Enter space name..."
              />

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsRequestingNew(false)}
                  className="text-gold-500 hover:text-gold-400 text-sm"
                >
                  Back to existing spaces
                </button>
              </div>
            </div>
          )}

          <Button
            onClick={handleContinue}
            disabled={!selectedSpaceId && !newSpaceName}
            className="w-full"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
