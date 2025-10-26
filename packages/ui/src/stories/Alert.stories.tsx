// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "../index";
import { AlertTriangle, CheckCircle2, Info, ShieldAlert, Sparkles, XCircle } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "Atoms/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Hive-branded alert surface with gold edge lighting, tuned icon framing, and variants for info, success, warning, destructive, and muted states."
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Alert>;

const renderDescription = () => (
  <AlertDescription>
    Keep students in the loop with concise context. Avoid paragraphs; use alerts for high-signal actions or outcomes.
  </AlertDescription>
);

export const Gold: Story = {
  render: () => (
    <Alert variant="gold">
      <AlertTitle>New feature highlighted</AlertTitle>
      {renderDescription()}
    </Alert>
  )
};

export const InfoVariant: Story = {
  render: () => (
    <Alert variant="info" icon={<Info />}>
      <AlertTitle>Campus update</AlertTitle>
      {renderDescription()}
    </Alert>
  )
};

export const SuccessVariant: Story = {
  render: () => (
    <Alert variant="success" icon={<CheckCircle2 />}>
      <AlertTitle>RSVP confirmed</AlertTitle>
      {renderDescription()}
    </Alert>
  )
};

export const WarningVariant: Story = {
  render: () => (
    <Alert variant="warning" icon={<AlertTriangle />}>
      <AlertTitle>Verify details</AlertTitle>
      {renderDescription()}
    </Alert>
  )
};

export const DestructiveVariant: Story = {
  render: () => (
    <Alert variant="destructive" icon={<ShieldAlert />}>
      <AlertTitle>Escalated to moderators</AlertTitle>
      {renderDescription()}
    </Alert>
  )
};

export const MutedVariant: Story = {
  render: () => (
    <Alert variant="muted">
      <AlertTitle>Heads-up</AlertTitle>
      {renderDescription()}
    </Alert>
  )
};

export const WithCustomIcon: Story = {
  render: () => (
    <Alert variant="gold" icon={<Sparkles />}>
      <AlertTitle>Custom icon example</AlertTitle>
      {renderDescription()}
    </Alert>
  )
};
