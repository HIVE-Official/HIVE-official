import * as React from 'react';
import { cn } from '@/lib/utils';
import { type Space } from '@hive/core/src/domain/firestore/space';
import { Users, Building, Eye, EyeOff, Pause } from 'lucide-react';

interface SpaceCardProps {
  space: Space;
  href: string;
  className?: string;
  onClick?: (space: Space) => void;
}

const statusConfig = {
  activated: {
    icon: null,
    label: 'Active',
    className: 'bg-green-500/20 text-green-400',
  },
  dormant: {
    icon: Pause,
    label: 'Coming Soon',
    className: 'bg-yellow-500/20 text-yellow-400',
  },
  frozen: {
    icon: EyeOff,
    label: 'View Only',
    className: 'bg-red-500/20 text-red-400',
  },
} as const;

export function SpaceCard({ space, href, className, onClick }: SpaceCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick(space);
    }
  };

  const statusInfo = statusConfig[space.status];
  const StatusIcon = statusInfo.icon;

  return (
    <a 
      href={href} 
      className={cn("group block", className)}
      onClick={handleClick}
      aria-label={`Visit ${space.name} space`}
    >
      <div className="relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/[0.06] transition-all duration-200 ease-out group-hover:scale-[1.02] group-hover:shadow-lg group-hover:shadow-yellow-500/10 group-hover:border-white/[0.12] group-focus-visible:outline-none group-focus-visible:ring-2 group-focus-visible:ring-yellow-500/50">
        {/* Banner Section */}
        <div className="relative h-32 w-full overflow-hidden">
          {space.bannerUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={space.bannerUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-neutral-800/50" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Status Badge */}
          {space.status !== 'activated' && (
            <div className={cn(
              "absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
              statusInfo.className
            )}>
              {StatusIcon && <StatusIcon className="w-3 h-3" />}
              {statusInfo.label}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5">
          <h3 className="truncate text-lg font-semibold text-white transition-colors duration-200 group-hover:text-yellow-400">
            {space.name}
          </h3>
          
          {space.description && (
            <p className="mt-2 line-clamp-2 text-sm text-neutral-400 leading-relaxed">
              {space.description}
            </p>
          )}
          
          {/* Metadata */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-4 text-xs text-neutral-500">
              <div className="flex items-center">
                <Users className="mr-1.5 h-4 w-4" />
                <span>{space.memberCount.toLocaleString()} {space.memberCount === 1 ? 'Member' : 'Members'}</span>
              </div>
              <div className="flex items-center">
                <Building className="mr-1.5 h-4 w-4" />
                <span className="capitalize">{space.type}</span>
              </div>
            </div>
            
            {/* Join Indicator */}
            <div className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <div className="flex items-center text-xs text-yellow-400 font-medium">
                <span>Enter →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
} 