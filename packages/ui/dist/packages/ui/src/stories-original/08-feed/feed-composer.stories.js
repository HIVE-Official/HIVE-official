import { FeedComposer } from '../../components/feed/feed-composer';
const meta = {
    title: '08-Feed/Feed Composer',
    component: FeedComposer,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Component for creating new posts and content in the feed.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {
        placeholder: "What's happening in your space?",
    },
};
export const WithAvatar = {
    args: {
        placeholder: "Share your thoughts...",
        showAvatar: true,
        userAvatar: "https://github.com/vercel.png",
    },
};
export const WithAttachments = {
    args: {
        placeholder: "What's on your mind?",
        allowAttachments: true,
        maxAttachments: 5,
    },
};
export const Expanded = {
    args: {
        placeholder: "Write your post...",
        expanded: true,
        showFormatting: true,
    },
};
//# sourceMappingURL=feed-composer.stories.js.map