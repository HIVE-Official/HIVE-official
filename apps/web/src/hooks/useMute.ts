'use client';

import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '@/hooks/useAuth';

const muteUserCallable = httpsCallable(getFunctions(), 'feed-muteUser');
const unmuteUserCallable = httpsCallable(getFunctions(), 'feed-unmuteUser');

export function useMute(userIdToMute: string, initialMuted: boolean) {
    const { user } = useAuth();
    const [isMuted, setIsMuted] = useState(initialMuted);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const toggleMute = async () => {
        if (!user) {
            return;
        }
        
        if (user.uid === userIdToMute) {
            return;
        }

        setLoading(true);
        setError(null);

        const previousMuted = isMuted;
        setIsMuted(!previousMuted); // Optimistic update

        try {
            if (!previousMuted) {
                await muteUserCallable({ userIdToMute });
            } else {
                await unmuteUserCallable({ userIdToUnmute: userIdToMute });
            }
        } catch (err: any) {
            setError(err.message || 'Failed to toggle mute.');
            setIsMuted(previousMuted); // Revert on error
        } finally {
            setLoading(false);
        }
    };

    return { isMuted, loading, error, toggleMute };
} 