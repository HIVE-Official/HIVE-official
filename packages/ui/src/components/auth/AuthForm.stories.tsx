import type { Meta, StoryObj } from "@storybook/react";
import { AuthForm } from "./AuthForm";

const meta: Meta<typeof AuthForm> = {
  title: "Auth/AuthForm",
  component: AuthForm,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    schoolName: { control: "text" },
    schoolDomain: { control: "text" },
    email: { control: "text" },
    onEmailChange: { action: "onEmailChange" },
    onSubmit: { action: "onSubmit" },
    isLoading: { control: "boolean" },
    error: { control: "text" },
    validationError: { control: "text" },
    isSubmitDisabled: { control: "boolean" },
    backLinkHref: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof AuthForm>;

export const Default: Story = {
  args: {
    schoolName: "University at Buffalo",
    schoolDomain: "buffalo.edu",
    email: "",
    isLoading: false,
    error: null,
    validationError: null,
    isSubmitDisabled: true,
    backLinkHref: "/",
  },
};

export const WithEmail: Story = {
  args: {
    ...Default.args,
    email: "test@buffalo.edu",
    isSubmitDisabled: false,
  },
};

export const Loading: Story = {
  args: {
    ...WithEmail.args,
    isLoading: true,
    isSubmitDisabled: true,
  },
};

export const ValidationError: Story = {
  args: {
    ...Default.args,
    email: "test@gmail.com",
    validationError: "Please use your University at Buffalo email address",
    isSubmitDisabled: true,
  },
};

export const SubmissionError: Story = {
  args: {
    ...WithEmail.args,
    error: "Something went wrong. Please try again.",
  },
};
