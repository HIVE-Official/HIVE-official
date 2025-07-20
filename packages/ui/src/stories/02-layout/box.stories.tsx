import React from 'react';
import { Box } from '../../components/Box';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from 'framer-motion';
import { गति } from '../../lib/motion-utils';
import { Stack } from '../../components/Stack';
import { Button } from '../../components/ui/button';

const meta: Meta<typeof Box> = {
    title: '02-Layout/Box',
    component: Box,
    tags: ['autodocs'],
    };

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
    args: {
        children: 'This is a Box component.',
        className: 'p-4 bg-bg-card rounded-lg',
    },
};

const AnimatedBox = () => {
    const [animation, setAnimation] = React.useState('fadeIn');
    const [isVisible, setIsVisible] = React.useState(true);

    const handleAnimation = (anim: string) => {
        setIsVisible(false);
        setTimeout(() => {
            setAnimation(anim);
            setIsVisible(true);
        }, 300);
    }

    return (
        <Stack>
            <Stack direction="row" gap={4} className='mb-4'>
                <Button onClick={() => handleAnimation('fadeIn')}>Fade In</Button>
                <Button onClick={() => handleAnimation('slideIn')}>Slide In</Button>
                <Button onClick={() => handleAnimation('scaleIn')}>Scale In</Button>
            </Stack>
            <AnimatePresence>
            {isVisible && (
                <motion.div
                    variants={गति[animation as keyof typeof गति]}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    <Box className="p-4 bg-bg-card rounded-lg w-48 text-center">
                        An animated box
                    </Box>
                </motion.div>
            )}
            </AnimatePresence>
        </Stack>
    )
}

export const Animated: Story = {
    render: () => <AnimatedBox />,
} 
