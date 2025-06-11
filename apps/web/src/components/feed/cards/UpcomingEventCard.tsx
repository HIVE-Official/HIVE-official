import { Calendar, MapPin, Heart } from 'lucide-react';
import { useLike } from '@/hooks/useLike';
import { FeedCard } from '@hive/validation';
import { cn } from '@/lib/utils';

interface UpcomingEventCardProps {
    card: FeedCard;
}

export function UpcomingEventCard({ card }: UpcomingEventCardProps) {
    const { content, interactionData, id } = card;
    const { likes, liked, toggleLike, loading } = useLike(interactionData.likes, false, id);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    }).format(content.startTime);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    }).format(content.startTime);

    return (
        <div className="bg-card rounded-lg border p-4">
            <p className="text-sm font-semibold text-accent-gold mb-1">{content.spaceName}</p>
            <h3 className="font-bold text-lg text-primary mb-2">{content.title}</h3>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-muted">
                    <div className="flex items-center space-x-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate} at {formattedTime}</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{content.location}</span>
                    </div>
                </div>
                 <button 
                    onClick={toggleLike}
                    disabled={loading}
                    className="flex items-center space-x-1.5 text-muted hover:text-destructive"
                >
                    <Heart className={cn("w-5 h-5", liked && "text-destructive fill-current")} />
                    <span className="text-sm font-semibold">{likes}</span>
                </button>
            </div>
        </div>
    );
}

 