// Bounded Context Owner: Design System Guild
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { FormField, FormFieldControl, FieldText, Button, HiveLogo } from "../index";
import { Send } from "lucide-react";

const meta: Meta = {
  title: "Molecules/FieldText",
};
export default meta;
type Story = StoryObj;

export const ChatComposer: Story = {
  render: () => {
    const [text, setText] = useState("");
    return (
      <div className="max-w-3xl space-y-6">
        <FormField label="Message" description="Shift+Enter for newline; Enter to send">
          <FormFieldControl>
            <FieldText
              placeholder="Message…"
              value={text}
              onChange={(e) => setText(e.target.value)}
              multiline
              minRows={1}
              maxRows={6}
              sendOnEnter
              onSubmit={() => setText("")}
              leading={<HiveLogo variant="white" size={18} className="opacity-90" aria-hidden />}
              trailing={
                <Button size="sm" className="h-8 gap-1">
                  <Send className="h-4 w-4" /> Send
                </Button>
              }
              leadingClassName="pl-0.5"
              trailingClassName="pr-1"
            />
          </FormFieldControl>
        </FormField>
      </div>
    );
  }
};

export const Singleline: Story = {
  render: () => (
    <div className="max-w-xl">
      <FormField label="Quick note">
        <FormFieldControl>
          <FieldText multiline={false} placeholder="Type something" />
        </FormFieldControl>
      </FormField>
    </div>
  )
};

export const Compact: Story = {
  render: () => (
    <div className="max-w-xl">
      <FormField label="Quick DM">
        <FormFieldControl>
          <FieldText multiline={false} size="sm" placeholder="Message…" />
        </FormFieldControl>
      </FormField>
    </div>
  )
};
