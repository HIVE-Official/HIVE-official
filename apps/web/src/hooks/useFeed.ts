'use client';

import { useState, useEffect, useCallback } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { FeedCard } from '@hive/validation';

const getFeed = httpsCallable(getFunctions(), 'feed-getFeed');

export function useFeed() {
    const [feed, setFeed] = useState<FeedCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFeed = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await getFeed();
            const { feed: newFeed } = result.data as { feed: FeedCard[] };
            
            // The timestamp objects from Firestore need to be converted to JS Date objects
            const formattedFeed = newFeed.map(card => ({
                ...card,
                timestamp: (card.timestamp as any).toDate(),
                expiresAt: card.expiresAt ? (card.expiresAt as any).toDate() : null,
            }));

            setFeed(formattedFeed);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchFeed();
    }, [fetchFeed]);

    return { feed, loading, error, refetch: fetchFeed };
} 
 