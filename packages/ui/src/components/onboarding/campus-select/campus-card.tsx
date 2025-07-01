import { cn } from '@/lib/utils';
import { Badge } from '@/components/badge';

export interface CampusCardProps {
  id: string;
  name: string;
  domain: string;
  status: 'active' | 'coming_soon';
  remainingSpots?: number;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CampusCard = ({
  name,
  domain,
  status,
  remainingSpots,
  selected,
  onClick,
  className
}: CampusCardProps) => {
  const isActive = status === 'active';
  
  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={cn(
        'group relative w-full rounded-xl border p-4 transition-all',
        'hover:border-gold/50 hover:shadow-md',
        selected && 'border-gold bg-gold/5',
        !isActive && 'cursor-not-allowed opacity-50',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <p className="text-sm text-gray-400">{domain}</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {status === 'coming_soon' ? (
            <Badge variant="outline" className="border-yellow-600/50 text-yellow-500">
              Coming Soon
            </Badge>
          ) : remainingSpots !== undefined ? (
            <Badge variant="outline" className="border-emerald-600/50 text-emerald-500">
              {remainingSpots} spots left
            </Badge>
          ) : null}
        </div>
      </div>
    </button>
  );
}; 