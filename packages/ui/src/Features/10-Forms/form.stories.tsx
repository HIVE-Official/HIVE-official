import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../atomic/atoms/form";
import { Input } from "../../atomic/atoms/input";
import { Button } from "../../atomic/atoms/button";
import { useForm } from "react-hook-form";

const meta = {
  title: "10-Forms/Form",
  component: Form,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const form = useForm();
    return (
      <div className="w-[400px] rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-smooth ease-liquid hover:shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Submit</Button>
          </form>
        </Form>
      </div>
    );
  },
};

export const ProductionShowcase: Story = {
  render: () => {
    const form = useForm();
    return (
      <div className="w-[400px] rounded-lg border border-border bg-card p-6">
        <div className="mb-6 space-y-1">
          <h3 className="text-lg font-semibold">Create Account</h3>
          <p className="text-sm text-muted-foreground">Enter your details to get started</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => console.log(data))} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>Must be at least 8 characters</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Create Account</Button>
          </form>
        </Form>
      </div>
    );
  },
  parameters: { layout: "padded" },
};
