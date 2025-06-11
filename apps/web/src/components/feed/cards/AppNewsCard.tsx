import Image from 'next/image';
import { Heart } from 'lucide-react';
import { useLike } from '@/hooks/useLike';
import { FeedCard } from '@hive/validation';
import { cn } from '@/lib/utils';

interface AppNewsCardProps {
    card: FeedCard;
}

export function AppNewsCard({ card }: AppNewsCardProps) {
    const { content, interactionData, id } = card;
    const { likes, liked, toggleLike, loading } = useLike(interactionData.likes, false, id);

    return (
        <div className="bg-card rounded-lg border overflow-hidden">
            {content.imageUrl && (
                <div className="relative h-48 w-full">
                    <Image src={content.imageUrl} alt={content.title} layout="fill" objectFit="cover" />
                </div>
            )}
            <div className="p-4">
                <h3 className="font-bold text-lg text-primary mb-2">{content.title}</h3>
                <p className="text-muted">{content.body}</p>
            </div>
            <div className="p-4 border-t border-border flex items-center justify-end">
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
 