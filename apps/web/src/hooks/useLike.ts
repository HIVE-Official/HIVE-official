'use client';

import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '@/hooks/useAuth'; // We will create this hook next

const likeCard = httpsCallable(getFunctions(), 'feed-likeCard');
const unlikeCard = httpsCallable(getFunctions(), 'feed-unlikeCard');

export function useLike(initialLikes: number, initialLiked: boolean, cardId: string) {
    const { user } = useAuth();
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialLiked);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const like = async () => {
        if (!user) {
            // Or trigger a login modal
            console.error("User must be logged in to like a card.");
            return;
        }

        setIsLoading(true);

        // Optimistic UI update
        const previousLiked = liked;
        const previousLikes = likes;
        setLiked(!previousLiked);
        setLikes(previousLikes + (!previousLiked ? 1 : -1));

        try {
            await likeCard({ cardId });
            // Optionally update local state
        } catch (err: any) {
            setError(err.message || 'Failed to like card.');
        } finally {
            setIsLoading(false);
        }
    };

    const unlike = async () => {
        setIsLoading(true);
        setError(null);
        try {
            await unlikeCard({ cardId });
            // Optionally update local state
        } catch (err: any) {
            setError(err.message || 'Failed to unlike card.');
        } finally {
            setIsLoading(false);
        }
    };

    return { like, unlike, isLoading, error };
} 
 