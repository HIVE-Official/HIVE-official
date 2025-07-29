import { Badge } from '../../components';
const meta = {
    title: '03-UI/Badge',
    component: Badge,
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {
        children: 'Badge',
    },
};
export const Accent = {
    args: {
        ...Default.args,
        variant: 'accent',
        children: 'Accent',
    },
};
export const Secondary = {
    args: {
        ...Default.args,
        variant: 'secondary',
        children: 'Secondary',
    },
};
export const Destructive = {
    args: {
        ...Default.args,
        variant: 'destructive',
        children: 'Destructive',
    },
};
export const Outline = {
    args: {
        ...Default.args,
        variant: 'outline',
        children: 'Outline',
    },
};
//# sourceMappingURL=badge.stories.js.map