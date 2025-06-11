'use client';

import { useState, useEffect } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuth } from '@/hooks/useAuth';

const followUserCallable = httpsCallable(getFunctions(), 'feed-followUser');
const unfollowUserCallable = httpsCallable(getFunctions(), 'feed-unfollowUser');

export function useFollow(userIdToFollow: string, initialFollowing: boolean, initialFollowersCount: number) {
    const { user } = useAuth();
    const [isFollowing, setIsFollowing] = useState(initialFollowing);
    const [followersCount, setFollowersCount] = useState(initialFollowersCount);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const follow = async () => {
        if (!user) {
            setError("User must be logged in to follow.");
            return;
        }

        if (user.uid === userIdToFollow) {
            setError("User cannot follow themselves.");
            return;
        }

        setLoading(true);

        const previousFollowing = isFollowing;
        const previousFollowersCount = followersCount;

        // Optimistic UI update
        setIsFollowing(!previousFollowing);
        setFollowersCount(previousFollowersCount + (!previousFollowing ? 1 : -1));

        try {
            await followUserCallable({ userIdToFollow });
        } catch (err: any) {
            setError(err.message || 'Failed to follow user.');
            // Revert optimistic update on error
            setIsFollowing(previousFollowing);
            setFollowersCount(previousFollowersCount);
        } finally {
            setLoading(false);
        }
    };

    const unfollow = async () => {
        setLoading(true);
        setError(null);
        try {
            await unfollowUserCallable({ userIdToUnfollow: userIdToFollow });
        } catch (err: any) {
            setError(err.message || 'Failed to unfollow user.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // If you need to fetch initial follow status, do it here.
        // For now, we assume it's managed by a parent component or another hook.
    }, [userIdToFollow]);

    return { isFollowing, followersCount, loading, error, follow, unfollow };
} 
 