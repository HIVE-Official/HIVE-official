import React, { useState, useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AuthForm } from "../../components/auth/AuthForm";
import { CheckEmailInfo } from "../../components/auth/CheckEmailInfo";

const meta: Meta = {
  title: "Flows/Authentication",
  component: AuthForm,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const schoolName = "University at Buffalo";
const schoolDomain = "buffalo.edu";

export const FullFlow: StoryObj = {
  render: () => {
    const [step, setStep] = useState("auth-form");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const validation = useMemo(() => {
      if (!email) return { isValid: false, error: null };
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return { isValid: false, error: "Please enter a valid email address" };
      }
      const domain = email.split("@")[1];
      if (domain.toLowerCase() !== schoolDomain) {
        return {
          isValid: false,
          error: `Please use your ${schoolName} email address`,
        };
      }
      return { isValid: true, error: null };
    }, [email]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!validation.isValid) return;

      setIsLoading(true);
      setError(null);

      setTimeout(() => {
        // Simulate a successful API call
        if (email === `fail@${schoolDomain}`) {
          setError("This email address is blocked. Please contact support.");
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setStep("check-email");
        }
      }, 1500);
    };

    if (step === "check-email") {
      return <CheckEmailInfo email={email} backLinkHref="#" />;
      // In a real story, we'd make the back link work with an action
    }

    return (
      <AuthForm
        schoolName={schoolName}
        schoolDomain={schoolDomain}
        email={email}
        onEmailChange={setEmail}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        validationError={validation.error}
        isSubmitDisabled={!validation.isValid}
        backLinkHref="#"
      />
    );
  },
};
