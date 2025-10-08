import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "../../atomic/atoms/radio-group";
import { Label } from "../../atomic/atoms/label";

/**
 * # Radio Group
 *
 * Select a single option from a set of mutually exclusive choices.
 * Built on @radix-ui/react-radio-group with HIVE design integration.
 *
 * ## Usage
 * ```tsx
 * <RadioGroup defaultValue="option1">
 *   <div className="flex items-center space-x-2">
 *     <RadioGroupItem value="option1" id="r1" />
 *     <Label htmlFor="r1">Option 1</Label>
 *   </div>
 * </RadioGroup>
 * ```
 */
const meta = {
  title: "10-Forms/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default radio group with three options
 */
export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * With descriptions for each option
 */
export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup defaultValue="card" className="gap-4">
      <div className="flex items-start space-x-3 rounded-lg border border-border p-3 transition-smooth ease-liquid hover:border-primary/50">
        <RadioGroupItem value="card" id="payment-card" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="payment-card" className="text-sm font-medium">
            Credit Card
          </Label>
          <p className="text-sm text-muted-foreground">
            Pay with Visa, Mastercard, or Amex
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg border border-border p-3 transition-smooth ease-liquid hover:border-primary/50">
        <RadioGroupItem value="paypal" id="payment-paypal" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="payment-paypal" className="text-sm font-medium">
            PayPal
          </Label>
          <p className="text-sm text-muted-foreground">
            Fast and secure PayPal checkout
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-3 rounded-lg border border-border p-3 transition-smooth ease-liquid hover:border-primary/50">
        <RadioGroupItem value="crypto" id="payment-crypto" className="mt-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="payment-crypto" className="text-sm font-medium">
            Cryptocurrency
          </Label>
          <p className="text-sm text-muted-foreground">
            Pay with Bitcoin, Ethereum, or USDC
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2 opacity-50">
        <RadioGroupItem value="option-two" id="option-two" disabled />
        <Label htmlFor="option-two">Option Two (Disabled)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Horizontal layout
 */
export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="yes" className="flex gap-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="yes" id="h-yes" />
        <Label htmlFor="h-yes">Yes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="no" id="h-no" />
        <Label htmlFor="h-no">No</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="maybe" id="h-maybe" />
        <Label htmlFor="h-maybe">Maybe</Label>
      </div>
    </RadioGroup>
  ),
};

/**
 * Card-style options
 */
export const CardStyle: Story = {
  render: () => (
    <RadioGroup defaultValue="pro" className="grid gap-3">
      {[
        { value: "free", label: "Free", price: "$0", features: "Basic features" },
        { value: "pro", label: "Pro", price: "$19", features: "Advanced features" },
        { value: "enterprise", label: "Enterprise", price: "$99", features: "All features + support" },
      ].map((plan) => (
        <label
          key={plan.value}
          className="relative flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-smooth ease-liquid hover:border-primary/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
        >
          <RadioGroupItem value={plan.value} id={plan.value} />
          <div className="flex flex-1 items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium text-foreground">{plan.label}</div>
              <div className="text-xs text-muted-foreground">{plan.features}</div>
            </div>
            <div className="text-lg font-semibold text-foreground">{plan.price}/mo</div>
          </div>
        </label>
      ))}
    </RadioGroup>
  ),
};

/**
 * Production showcase: Shipping options
 */
export const ProductionShowcase: Story = {
  render: () => (
    <div className="w-[400px] space-y-4 rounded-lg border border-border bg-card p-6">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">
          Select Shipping Method
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose how you'd like to receive your order
        </p>
      </div>

      <RadioGroup defaultValue="standard" className="grid gap-3">
        {[
          {
            value: "express",
            label: "Express Shipping",
            time: "1-2 business days",
            price: "$15.99",
            icon: (
              <svg className="h-5 w-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            ),
          },
          {
            value: "standard",
            label: "Standard Shipping",
            time: "3-5 business days",
            price: "$5.99",
            icon: (
              <svg className="h-5 w-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
          {
            value: "economy",
            label: "Economy Shipping",
            time: "5-7 business days",
            price: "Free",
            icon: (
              <svg className="h-5 w-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ),
          },
        ].map((option) => (
          <label
            key={option.value}
            className="group relative flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-background p-4 transition-smooth ease-liquid hover:border-primary/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
          >
            <RadioGroupItem value={option.value} id={option.value} />
            <div className="flex flex-1 items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-smooth ease-liquid group-has-[[data-state=checked]]:bg-primary/10 group-has-[[data-state=checked]]:text-primary">
                {option.icon}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{option.label}</span>
                  <span className="text-sm font-semibold text-foreground">{option.price}</span>
                </div>
                <p className="text-xs text-muted-foreground">{option.time}</p>
              </div>
            </div>
          </label>
        ))}
      </RadioGroup>

      <button className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-smooth ease-liquid hover:bg-primary/90">
        Continue to Payment
      </button>
    </div>
  ),
  parameters: {
    layout: "padded",
  },
};
