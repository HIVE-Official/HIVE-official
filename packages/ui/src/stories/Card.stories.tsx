// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../index";

const meta: Meta = {
  title: "Atoms/Card",
  parameters: { layout: "padded" }
};

export default meta;
type Story = StoryObj;

export const Static: Story = {
  render: () => (
    <div className="max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Static card</CardTitle>
          <CardDescription>Neutral surface, minimal shadow.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm font-body-sm text-muted-foreground">
            Cards use token borders and a subtle ambient shadow. No hover effects unless interactive.
          </p>
        </CardContent>
      </Card>
    </div>
  )
};

export const Interactive: Story = {
  render: () => (
    <div className="max-w-md">
      <Card tabIndex={0} interactive>
        <CardHeader>
          <CardTitle>Interactive card</CardTitle>
          <CardDescription>Hover expands slightly (slow), focus shows ring.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-body-sm font-body-sm text-muted-foreground">
            Keyboard focus reveals a ring for a11y. Hover uses a subtle growth motion instead of heavy shadows.
          </p>
        </CardContent>
      </Card>
    </div>
  )
};
