"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/lib/stores/onboarding";
import { ButtonEnhanced, Card, InputEnhanced, Label, Alert } from "@hive/ui";
import { CheckCircle, AlertCircle, ArrowRight, Building2 } from "lucide-react";

export default function FacultyVerifyPage() {
  const router = useRouter();
  const { data: onboardingData, update } = useOnboardingStore();
  const [department, setDepartment] = useState("");
  const [title, setTitle] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "error">("pending");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set faculty role in onboarding data
    update({ userType: "faculty" as const });
  }, [update]);

  const handleVerification = async () => {
    if (!department.trim() || !title.trim()) {
      setVerificationStatus("error");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Update onboarding data with faculty-specific information
      update({
        userType: "faculty",
        major: department, // Use major field for department for faculty
        academicLevel: title, // Use academicLevel field for faculty title
        facultyVerified: true,
        department: department,
        title: title
      });

      setVerificationStatus("verified");
      
      // Continue to next onboarding step after verification
      setTimeout(() => {
        router.push("/onboarding/2"); // Continue to profile creation step
      }, 1500);
      
    } catch (error) {
      console.error("Faculty verification error:", error);
      setVerificationStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (verificationStatus === "verified") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Faculty Verification Complete</h2>
          <p className="text-muted-foreground mb-4">
            Welcome to HIVE! Continuing to complete your profile setup.
          </p>
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Faculty Verification</h1>
          <p className="text-muted-foreground">
            Please provide your academic information to complete faculty verification
          </p>
        </div>

        {verificationStatus === "error" && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <div>
              <h3 className="font-medium">Verification Required</h3>
              <p className="text-sm">Please complete all required fields to continue.</p>
            </div>
          </Alert>
        )}

        <div className="space-y-6">
          <div>
            <Label htmlFor="department" className="text-base font-medium">
              Department / School *
            </Label>
            <InputEnhanced
              id="department"
              type="text"
              placeholder="e.g., Computer Science, Business, Psychology"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-2"
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Enter your academic department or school at the university
            </p>
          </div>

          <div>
            <Label htmlFor="title" className="text-base font-medium">
              Academic Title / Position *
            </Label>
            <InputEnhanced
              id="title"
              type="text"
              placeholder="e.g., Professor, Assistant Professor, Lecturer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2"
              disabled={isSubmitting}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Enter your current academic title or position
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <ButtonEnhanced
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="flex-1"
          >
            Back
          </ButtonEnhanced>
          <ButtonEnhanced
            onClick={handleVerification}
            disabled={isSubmitting || !department.trim() || !title.trim()}
            className="flex-1"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <ArrowRight className="w-4 h-4 mr-2" />
            )}
            Continue Setup
          </ButtonEnhanced>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-2">Why do we need this information?</h3>
          <p className="text-sm text-muted-foreground">
            Faculty verification helps us provide appropriate permissions and features for educators. 
            Your information is used to verify your academic status and provide access to faculty-specific tools.
          </p>
        </div>
      </Card>
    </div>
  );
}