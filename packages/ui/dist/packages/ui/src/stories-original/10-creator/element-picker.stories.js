import { ElementPicker } from '../../components/creator/ElementPicker';
const meta = {
    title: '10-Creator/Element Picker',
    component: ElementPicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {
        onElementSelect: (elementId) => {
            console.log('Selected element:', elementId);
        },
    },
};
export const Loading = {
    args: {
        isLoading: true,
        onElementSelect: (elementId) => {
            console.log('Selected element:', elementId);
        },
    },
};
export const WithCustomClass = {
    args: {
        className: 'border-2 border-yellow-400',
        onElementSelect: (elementId) => {
            console.log('Selected element:', elementId);
        },
    },
};
export const Interactive = {
    args: {
        onElementSelect: (elementId) => {
            alert(`You selected: ${elementId}`);
        },
    },
};
//# sourceMappingURL=element-picker.stories.js.map