import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "../../atomic/atoms/alert";

const meta = {
  title: "11-Shared/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
    backgrounds: { default: 'dark', values: [{ name: 'dark', value: '#000000' }] },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the cli.</AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <Alert>
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>This is a default informational alert with neutral styling.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your profile has been updated successfully. Changes are now live.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Your session has expired. Please login again to continue.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <Alert>
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>New features are now available in your dashboard.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <AlertTitle>Verified</AlertTitle>
        <AlertDescription>Your email has been verified. You now have full access to all features.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * HIVE Pattern: Email verification alert (auth flow)
 */
export const EmailVerification: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      {/* Pending verification */}
      <Alert className="border-yellow-500/50 bg-yellow-500/10 transition-all duration-smooth ease-liquid">
        <svg className="h-4 w-4 text-yellow-500" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <AlertTitle className="text-yellow-500">Check your email</AlertTitle>
        <AlertDescription>
          We sent a verification link to <strong>sarah@buffalo.edu</strong>. Click the link to continue.
        </AlertDescription>
      </Alert>

      {/* Email not authorized */}
      <Alert variant="destructive" className="transition-all duration-smooth ease-liquid">
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <AlertTitle>Email not authorized</AlertTitle>
        <AlertDescription>
          This email is not associated with University at Buffalo. Please use your @buffalo.edu email address.
        </AlertDescription>
      </Alert>

      {/* Email verified success */}
      <Alert className="border-green-500/50 bg-green-500/10 transition-all duration-smooth ease-liquid">
        <svg className="h-4 w-4 text-green-500" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <AlertTitle className="text-green-500">Email verified!</AlertTitle>
        <AlertDescription>
          Your account is now active. Complete your profile to start connecting with students.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: { layout: "padded" },
};

/**
 * HIVE Pattern: Profile completion nudge (gamification)
 */
export const ProfileCompletion: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      <Alert variant="success">
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <AlertTitle>Complete your profile</AlertTitle>
        <AlertDescription>
          Your profile is <strong>75% complete</strong>. Add social links and verify your email to unlock all features.
        </AlertDescription>
      </Alert>

      <Alert>
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <AlertTitle>Add your interests</AlertTitle>
        <AlertDescription>
          Select <strong>3-6 interests</strong> to help us recommend spaces and connections tailored to you.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: { layout: "padded" },
};

/**
 * HIVE Pattern: Space notifications
 */
export const SpaceAlerts: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      {/* Space invitation */}
      <Alert variant="success">
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        <AlertTitle>You've been invited to CS Study Group</AlertTitle>
        <AlertDescription>
          <strong>Alex Morgan</strong> invited you to join. This space has 87 active members.
        </AlertDescription>
      </Alert>

      {/* Space goal reached */}
      <Alert className="border-green-500/50 bg-green-500/10 text-green-500 [&>svg]:text-green-500">
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        <AlertTitle className="text-green-500">Milestone reached!</AlertTitle>
        <AlertDescription className="text-green-500/80">
          <strong>Engineering Social</strong> just hit 100 members! You're part of something special.
        </AlertDescription>
      </Alert>

      {/* Space requires action */}
      <Alert className="border-yellow-500/50 bg-yellow-500/10 text-yellow-500 [&>svg]:text-yellow-500">
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <AlertTitle className="text-yellow-500">Action required</AlertTitle>
        <AlertDescription className="text-yellow-500/80">
          As a space leader, you need to review 3 pending join requests for <strong>Study Buddies</strong>.
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: { layout: "padded" },
};

/**
 * HIVE Pattern: Ritual streak warnings
 */
export const RitualStreaks: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4">
      {/* Streak in danger */}
      <Alert className="border-yellow-500/50 bg-yellow-500/10 text-yellow-500 [&>svg]:text-yellow-500">
        <span className="absolute left-4 top-4 text-xl">🔥</span>
        <AlertTitle className="text-yellow-500 pl-7">Don't lose your streak!</AlertTitle>
        <AlertDescription className="pl-7 text-yellow-500/80">
          Your <strong>12-day gym check-in streak</strong> expires in 6 hours. Check in now to keep it alive!
        </AlertDescription>
      </Alert>

      {/* Streak milestone */}
      <Alert variant="success">
        <span className="absolute left-4 top-4 text-xl">🎉</span>
        <AlertTitle className="pl-7">Streak milestone!</AlertTitle>
        <AlertDescription className="pl-7">
          You've maintained your <strong>study ritual for 30 days straight</strong>. You earned the "Dedicated Student" badge!
        </AlertDescription>
      </Alert>

      {/* Streak broken */}
      <Alert className="border-white/10 bg-white/5">
        <span className="absolute left-4 top-4 text-xl opacity-50">💔</span>
        <AlertTitle className="text-white/60 pl-7">Streak ended</AlertTitle>
        <AlertDescription className="pl-7 text-white/50">
          Your 15-day streak ended yesterday. Start a new one today and come back stronger!
        </AlertDescription>
      </Alert>
    </div>
  ),
  parameters: { layout: "padded" },
};

/**
 * HIVE Pattern: Form validation errors (inline)
 */
export const FormValidation: Story = {
  render: () => (
    <div className="flex w-[500px] flex-col gap-4 rounded-lg border border-white/8 bg-[#0c0c0c] p-6">
      <h3 className="text-lg font-semibold text-white">Create Space</h3>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Space Name</label>
        <input
          type="text"
          className="w-full rounded-md border border-red-500 bg-[#0c0c0c] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50"
          value="CS"
          onChange={() => {}}
        />
        <Alert variant="destructive">
          <svg className="h-3 w-3" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <AlertDescription className="text-xs text-red-500/80">
            Space name must be at least 5 characters long
          </AlertDescription>
        </Alert>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">Description</label>
        <textarea
          className="w-full rounded-md border border-yellow-500 bg-[#0c0c0c] px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/50"
          rows={3}
          value=""
          onChange={() => {}}
        />
        <Alert className="border-yellow-500/50 bg-yellow-500/10 text-yellow-500 [&>svg]:text-yellow-500">
          <svg className="h-3 w-3" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <AlertDescription className="text-xs text-yellow-500/80">
            Add a description to help students find your space
          </AlertDescription>
        </Alert>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};

/**
 * Real-world example: System notifications in profile settings
 */
export const RealWorldExample: Story = {
  render: () => (
    <div className="flex w-[600px] flex-col gap-6 rounded-lg border border-white/8 bg-[#0c0c0c] p-6">
      <h3 className="text-lg font-semibold text-white">Profile Settings</h3>

      <Alert variant="success">
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <AlertTitle>Profile updated</AlertTitle>
        <AlertDescription>Your changes have been saved and are now visible to other students.</AlertDescription>
      </Alert>

      <Alert>
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <AlertTitle>Profile visibility</AlertTitle>
        <AlertDescription>Your profile is visible to all UB students. You can change this in privacy settings.</AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <svg className="h-4 w-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <AlertTitle>Email verification required</AlertTitle>
        <AlertDescription>You must verify your @buffalo.edu email to access all features. Check your inbox.</AlertDescription>
      </Alert>
    </div>
  ),
  parameters: { layout: "padded" },
};
