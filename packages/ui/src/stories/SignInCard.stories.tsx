// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SignInCard, type UserTypeOption } from "../organisms/auth/sign-in-card";

const meta = {
  title: "Organisms/SignInCard",
  component: SignInCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campus-focused sign-in card with magic link flow. Demonstrates Hive branding (gold accents, Hive logo) and conversational radios.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SignInCard>;

export default meta;

type Story = StoryObj<typeof meta>;

type ControlledProps = {
  initialEmail?: string;
  initialUserType?: UserTypeOption;
  awaitingVerification?: boolean;
  errorMessage?: string | null;
};

const Controlled = ({
  initialEmail = "",
  initialUserType = "student",
  awaitingVerification,
  errorMessage,
}: ControlledProps) => {
  const [email, setEmail] = useState(initialEmail);
  const [userType, setUserType] = useState<UserTypeOption>(initialUserType);

  return (
    <SignInCard
      email={email}
      userType={userType}
      onEmailChange={setEmail}
      onUserTypeChange={setUserType}
      onSubmit={() => console.log("Submit", { email, userType })}
      awaitingVerification={awaitingVerification}
      errorMessage={errorMessage}
      schoolName="University at Hive"
    />
  );
};

export const Default: Story = {
  render: () => <Controlled />,
};

export const AwaitingVerification: Story = {
  render: () => <Controlled initialEmail="ava@hive.edu" awaitingVerification />,
  parameters: {
    docs: {
      description: {
        story: "Banner indicating that the magic link email has been sent.",
      },
    },
  },
};

export const WithError: Story = {
  render: () => (
    <Controlled
      initialEmail="ava@hive.edu"
      errorMessage="We couldn’t send the magic link. Please try again later."
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Error banner example for failed link delivery.",
      },
    },
  },
};
