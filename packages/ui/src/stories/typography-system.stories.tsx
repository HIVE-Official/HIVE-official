import type { Meta, StoryObj } from "@storybook/react";

const TypographyShowcase = () => {
  return (
    <div className="space-y-8 p-8 bg-[#0A0A0A] text-white min-h-screen">
      {/* Display Typography - General Sans Variable */}
      <section>
        <h2 className="text-lg font-medium text-[#FFD700] mb-4 font-sans">
          Display Typography (General Sans Variable)
        </h2>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold font-display">
            Welcome to HIVE at UB
          </h1>
          <h2 className="text-3xl font-bold font-display">
            Join the UB founding community
          </h2>
          <h3 className="text-2xl font-semibold font-display">
            UB Founding Launch
          </h3>
          <h4 className="text-xl font-semibold font-display">
            Your UB Invite Link
          </h4>
          <div className="text-lg font-medium font-display">
            Invite Your Friends
          </div>
        </div>
      </section>

      {/* Body Typography - Inter Variable */}
      <section>
        <h2 className="text-lg font-medium text-[#FFD700] mb-4 font-sans">
          Body Typography (Inter Variable)
        </h2>
        <div className="space-y-4">
          <p className="text-base font-sans">
            The exclusive social platform launching at University at Buffalo
          </p>
          <p className="text-sm font-sans text-zinc-400">
            Be among the first UB students to shape HIVE from day one
          </p>
          <p className="text-xs font-sans text-zinc-500">
            By joining, you'll be among the first UB students to experience HIVE
            when we launch.
          </p>
          <div className="text-sm font-medium font-sans">Progress</div>
          <div className="text-xs font-medium font-sans text-[#FFD700]">
            What's Next?
          </div>
        </div>
      </section>

      {/* Monospace Typography - JetBrains Mono */}
      <section>
        <h2 className="text-lg font-medium text-[#FFD700] mb-4 font-sans">
          Monospace Typography (JetBrains Mono)
        </h2>
        <div className="space-y-4">
          <code className="text-sm font-mono text-zinc-300 bg-zinc-800/50 p-2 rounded">
            https://hive.com/campus?ref=ub-student&utm_source=friend_invite
          </code>
          <div className="text-xs font-mono text-zinc-400">
            console.log('HIVE typography system loaded');
          </div>
        </div>
      </section>

      {/* Brand Color Examples */}
      <section>
        <h2 className="text-lg font-medium text-[#FFD700] mb-4 font-sans">
          Brand Colors
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg">
            <div className="text-sm font-medium font-display text-[#FFD700]">
              Gold Accent (#FFD700)
            </div>
            <div className="text-xs font-sans text-zinc-400 mt-1">
              Used for highlights and CTAs
            </div>
          </div>
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <div className="text-sm font-medium font-display text-white">
              Dark Background (#0A0A0A)
            </div>
            <div className="text-xs font-sans text-zinc-400 mt-1">
              Primary canvas color
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Elements */}
      <section>
        <h2 className="text-lg font-medium text-[#FFD700] mb-4 font-sans">
          Interactive Elements
        </h2>
        <div className="space-y-4">
          <button className="bg-[#FFD700] hover:bg-[#FFE255] text-black font-semibold font-display px-6 py-3 rounded-lg transition-colors duration-200">
            Join the UB founding community
          </button>
          <button className="border border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-sans px-4 py-2 rounded-lg transition-colors duration-200">
            Copy Message
          </button>
        </div>
      </section>
    </div>
  );
};

const meta: Meta<typeof TypographyShowcase> = {
  title: "Design System/Typography",
  component: TypographyShowcase,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographySystem: Story = {};

export const DisplayFonts: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-[#0A0A0A] text-white">
      <h1 className="text-5xl font-bold font-display">Display Extra Large</h1>
      <h1 className="text-4xl font-bold font-display">Display Large</h1>
      <h2 className="text-3xl font-bold font-display">Display Medium</h2>
      <h3 className="text-2xl font-semibold font-display">Display Small</h3>
      <h4 className="text-xl font-semibold font-display">Display XS</h4>
    </div>
  ),
};

export const BodyFonts: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-[#0A0A0A] text-white">
      <p className="text-lg font-sans">Body Large - Inter Variable</p>
      <p className="text-base font-sans">Body Medium - Inter Variable</p>
      <p className="text-sm font-sans">Body Small - Inter Variable</p>
      <p className="text-xs font-sans">Body XS - Inter Variable</p>
      <p className="text-lg font-medium font-sans">Body Large Medium</p>
      <p className="text-base font-medium font-sans">Body Medium Medium</p>
      <p className="text-sm font-medium font-sans">Body Small Medium</p>
    </div>
  ),
};

export const MonoFonts: Story = {
  render: () => (
    <div className="space-y-4 p-8 bg-[#0A0A0A] text-white">
      <code className="text-lg font-mono">Code Large - JetBrains Mono</code>
      <br />
      <code className="text-base font-mono">Code Medium - JetBrains Mono</code>
      <br />
      <code className="text-sm font-mono">Code Small - JetBrains Mono</code>
      <br />
      <code className="text-xs font-mono">Code XS - JetBrains Mono</code>
    </div>
  ),
};
