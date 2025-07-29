import type { StoryObj } from '@storybook/react';
import { EnhancedNavigationBar } from '../../components/navigation/enhanced-navigation-bar';
declare const meta: {
    title: string;
    component: typeof EnhancedNavigationBar;
    parameters: {
        layout: string;
        docs: {
            description: {
                component: string;
            };
        };
    };
    argTypes: {
        showGlobalSearch: {
            control: "boolean";
            description: string;
        };
        showNotifications: {
            control: "boolean";
            description: string;
        };
        unreadNotificationCount: {
            control: "number";
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const StudentUser: Story;
export declare const FacultyUser: Story;
export declare const WithManyNotifications: Story;
export declare const NoSearchNoNotifications: Story;
export declare const LoggedOut: Story;
export declare const InteractivePlayground: Story;
//# sourceMappingURL=enhanced-navigation-bar.stories.d.ts.map