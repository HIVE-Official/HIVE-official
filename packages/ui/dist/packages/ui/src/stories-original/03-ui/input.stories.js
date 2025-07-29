import { Input } from '../../components';
const meta = {
    title: '03-UI/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
        },
    },
};
export default meta;
export const Default = {
    args: {
        placeholder: 'Enter your email...',
    },
};
export const Disabled = {
    args: {
        ...Default.args,
        disabled: true,
    },
};
//# sourceMappingURL=input.stories.js.map