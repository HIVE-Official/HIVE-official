import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import("react").FC<import("../../components/profile").ProfileSystemProps>;
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const CompleteProfile: Story;
export declare const NewStudent: Story;
export declare const HeavyUser: Story;
export declare const PrivateProfile: Story;
export declare const InternationalStudent: Story;
export declare const GraduatingStudent: Story;
export declare const ErrorStates: Story;
export declare const LoadingStates: Story;
export declare const MobileView: Story;
export declare const TabletView: Story;
//# sourceMappingURL=profile-system.stories.d.ts.map