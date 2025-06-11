'use client';

import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Step6LegalProps {
  formData: {
    agreedToTerms: boolean;
  };
  updateFormData: (field: string, value: boolean) => void;
}

export function Step6Legal({ formData, updateFormData }: Step6LegalProps) {
  return (
    <div className="text-center space-y-4 p-4">
        <h2 className="text-xl font-bold">One last thing...</h2>
        <p className="text-muted max-w-xs mx-auto">
            Please review and agree to our legal terms to continue.
        </p>
      
      <div className="flex items-center justify-center space-x-2 pt-4">
        <Checkbox
          id="terms"
          checked={formData.agreedToTerms}
          onCheckedChange={(checked) => updateFormData('agreedToTerms', !!checked)}
        />
        <Label htmlFor="terms" className="text-sm text-muted">
            I agree to the{" "}
            <Link href="/terms-of-service" target="_blank" className="underline text-primary hover:text-accent-gold">
                Terms of Service
            </Link>
            {" "}and{" "}
            <Link href="/privacy-policy" target="_blank" className="underline text-primary hover:text-accent-gold">
                Privacy Policy
            </Link>
            .
        </Label>
      </div>
    </div>
  );
} 