'use client';

import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { Loader2, Check, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { getFunctions, httpsCallable } from "firebase/functions";

interface Step3HandleProps {
  formData: {
    handle: string;
  };
  updateFormData: (field: string, value: string) => void;
  // We'll add this later to control the "Continue" button
  // setStepValid: (isValid: boolean) => void;
}

const checkHandle = httpsCallable(getFunctions(), 'checkHandleUniqueness');

export function Step3Handle({ formData, updateFormData }: Step3HandleProps) {
    const [handle, setHandle] = useState(formData.handle);
    const [debouncedHandle] = useDebounce(handle, 500);
    const [status, setStatus] = useState<"idle" | "loading" | "valid" | "invalid">("idle");
    const [error, setError] = useState<string | null>(null);

    const validateAndCheckUniqueness = useCallback(async (h: string) => {
        setError(null);
        if (!h) {
            setStatus("idle");
            return;
        }

        const regex = /^[a-z0-9]{4,15}$/;
        if (!regex.test(h)) {
            setStatus("invalid");
            setError("Must be 4-15 lowercase letters and numbers.");
            return;
        }

        setStatus("loading");
        
        try {
            const result = await checkHandle({ handle: h });
            const { isUnique } = result.data as { isUnique: boolean };

            if (isUnique) {
                setStatus("valid");
                updateFormData('handle', h);
            } else {
                setStatus("invalid");
                setError("This handle is already taken.");
            }
        } catch (err) {
            console.error("Handle check failed:", err);
            setStatus("invalid");
            setError("Could not verify handle. Please try again.");
        }
    }, [updateFormData]);

    useEffect(() => {
        validateAndCheckUniqueness(debouncedHandle);
    }, [debouncedHandle, validateAndCheckUniqueness]);

    const getStatusIcon = () => {
        switch (status) {
            case "loading":
                return <Loader2 className="h-4 w-4 animate-spin text-muted" />;
            case "valid":
                return <Check className="h-4 w-4 text-green-500" />;
            case "invalid":
                 return <X className="h-4 w-4 text-destructive" />;
            default:
                return null;
        }
    }

  return (
    <div className="space-y-2 text-left">
        <label htmlFor="handle" className="block text-sm font-medium text-muted mb-1">
            Choose your handle
        </label>
        <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">@</span>
            <Input
                id="handle"
                name="handle"
                type="text"
                placeholder="youruniquehandle"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value.toLowerCase())}
                className="pl-7 pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {getStatusIcon()}
            </div>
        </div>
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
} 