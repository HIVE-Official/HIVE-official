import { PersonalToolsCard } from '../../../../../apps/web/src/components/profile/personal-tools-card';
const meta = {
    title: 'Profile/PersonalToolsCard',
    component: PersonalToolsCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Personal Tools Card component for managing and launching user tools'
            }
        }
    },
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['desktop', 'mobile'],
            description: 'Card variant for different screen sizes'
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes'
        }
    }
};
export default meta;
export const Desktop = {
    args: {
        variant: 'desktop',
        className: 'w-96 h-80'
    }
};
export const Mobile = {
    args: {
        variant: 'mobile',
        className: 'w-80 h-96'
    }
};
export const WithCallbacks = {
    args: {
        variant: 'desktop',
        className: 'w-96 h-80',
        onToolClick: (toolId) => {
            console.log('Tool clicked:', toolId);
            alert(`Launching tool: ${toolId}`);
        },
        onManageTools: () => {
            console.log('Manage tools clicked');
            alert('Opening tool management interface');
        },
        onAddTools: () => {
            console.log('Add tools clicked');
            alert('Opening tool marketplace');
        }
    }
};
//# sourceMappingURL=personal-tools-card.stories.js.map