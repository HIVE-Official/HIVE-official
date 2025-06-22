import type { Meta, StoryObj } from "@storybook/react";

// Simple test component
const TestComponent = ({ message }: { message: string }) => (
  <div style={{ 
    padding: '32px', 
    backgroundColor: '#0A0A0A', 
    color: '#FFD700',
    fontFamily: 'system-ui',
    border: '1px solid #FFD700',
    borderRadius: '8px',
    textAlign: 'center'
  }}>
    <h2 style={{ margin: 0 }}>{message}</h2>
  </div>
);

const meta: Meta<typeof TestComponent> = {
  title: "Test/Working",
  component: TestComponent,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0A0A0A" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: "🎉 Storybook is Working! 🎉"
  },
}; 