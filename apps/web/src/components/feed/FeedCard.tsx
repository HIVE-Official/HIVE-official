import { FeedCard as FeedCardData } from "@hive/validation";
import { AppNewsCard } from './cards/AppNewsCard';
import { UpcomingEventCard } from './cards/UpcomingEventCard';

interface FeedCardProps {
    card: FeedCardData;
}

export function FeedCard({ card }: FeedCardProps) {
    switch (card.type) {
        case "app_news":
            return <AppNewsCard card={card} />;
        case "upcoming_event":
            return <UpcomingEventCard card={card} />;
        // Add other card types here as they are created
        // case "featured_spaces":
        //     return <FeaturedSpacesCard card={card} />;
        default:
            return (
                <div className="bg-card p-4 rounded-lg border">
                    <h2 className="font-bold text-lg text-destructive">Unknown Card Type: {card.type}</h2>
                    <pre className="text-xs bg-muted/50 p-2 rounded-md mt-2">
                        {JSON.stringify(card.content, null, 2)}
                    </pre>
                </div>
            );
    }
} 
 