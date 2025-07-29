import { PostCard } from '../../components/feed/post-card';
const meta = {
    title: '08-Feed/Post Card',
    component: PostCard,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: 'Card component for displaying individual posts in the feed.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
const samplePost = {
    id: '1',
    author: {
        name: 'John Doe',
        handle: '@johndoe',
        avatar: 'https://github.com/vercel.png',
    },
    content: 'Just finished working on an amazing project! Really excited to share what we\'ve built. #hive #development',
    timestamp: '2 hours ago',
    likes: 24,
    comments: 8,
    shares: 3,
};
export const Default = {
    args: {
        post: samplePost,
    },
};
export const WithImage = {
    args: {
        post: {
            ...samplePost,
            image: 'https://picsum.photos/600/300',
            content: 'Check out this beautiful sunset from today\'s hike! 🌅',
        },
    },
};
export const WithMultipleImages = {
    args: {
        post: {
            ...samplePost,
            images: [
                'https://picsum.photos/300/200?random=1',
                'https://picsum.photos/300/200?random=2',
                'https://picsum.photos/300/200?random=3',
            ],
            content: 'Album from today\'s team building event! Had such a great time.',
        },
    },
};
export const LongContent = {
    args: {
        post: {
            ...samplePost,
            content: `This is a much longer post that demonstrates how the post card handles extended content. It should gracefully truncate or expand based on the design requirements. 

Here's another paragraph to make it even longer. The post card should handle this content appropriately, perhaps with a "read more" functionality or proper text wrapping.

Sometimes users write really detailed posts with lots of information, and we need to make sure our UI can handle that gracefully.`,
        },
    },
};
export const Interactive = {
    args: {
        post: samplePost,
        onLike: () => console.log('Liked!'),
        onComment: () => console.log('Comment!'),
        onShare: () => console.log('Shared!'),
    },
};
//# sourceMappingURL=post-card.stories.js.map