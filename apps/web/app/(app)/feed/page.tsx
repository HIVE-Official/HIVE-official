'use client';

import { useFeed } from '@hive/hooks';
import { FeedCard } from '@hive/ui';

const FeedSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-card p-4 rounded-lg shadow h-24">
                <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
        ))}
    </div>
);

export default function FeedPage() {
    const { feed, loading, error, refetch } = useFeed();

    return (
        <div className="p-4 lg:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-primary">Feed</h1>
                <button onClick={() => refetch()} disabled={loading}>Refresh</button>
            </div>

            {loading && <FeedSkeleton />}
            {error && <p className="text-destructive">Error: {error}</p>}

            {!loading && !error && (
                <div className="space-y-4">
                    {feed.map(card => (
                        <FeedCard key={card.id} card={card} />
                    ))}
                </div>
            )}
        </div>
    );
} 
 