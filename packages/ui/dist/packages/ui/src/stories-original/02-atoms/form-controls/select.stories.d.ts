import type { Meta, StoryObj } from '@storybook/react';
declare const SelectDemo: ({ placeholder, items, defaultValue, disabled }: {
    placeholder?: string;
    items: {
        value: string;
        label: string;
        disabled?: boolean;
    }[];
    defaultValue?: string;
    disabled?: boolean;
}) => import("react/jsx-runtime").JSX.Element;
declare const meta: Meta<typeof SelectDemo>;
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithDefaultValue: Story;
export declare const Disabled: Story;
export declare const DisabledOptions: Story;
export declare const WithLabel: Story;
export declare const GroupedOptions: Story;
export declare const LongList: Story;
export declare const FormExample: Story;
export declare const SizeVariations: Story;
export declare const AccessibilityDemo: Story;
//# sourceMappingURL=select.stories.d.ts.map