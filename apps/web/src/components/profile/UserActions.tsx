'use client';

import { useState } from 'react';
import { useFollow } from '@/hooks/useFollow';
import { useMute } from '@/hooks/useMute';
import { useReport } from '@/hooks/useReport';
import { Button } from '@/components/ui/button';
import { ReportDialog } from './ReportDialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';

interface UserActionsProps {
    profileId: string;
    initialFollowing: boolean;
    initialFollowersCount: number;
    initialMuted: boolean;
}

export function UserActions({ 
    profileId, 
    initialFollowing, 
    initialFollowersCount,
    initialMuted 
}: UserActionsProps) {
    const { isFollowing, followersCount, loading: followLoading, toggleFollow } = useFollow(profileId, initialFollowing, initialFollowersCount);
    const { isMuted, loading: muteLoading, toggleMute } = useMute(profileId, initialMuted);
    const { status: reportStatus } = useReport();
    const [isReportDialogOpen, setReportDialogOpen] = useState(false);

    return (
        <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
                <Button onClick={toggleFollow} disabled={followLoading} variant={isFollowing ? 'secondary' : 'default'} className="w-32">
                    {followLoading ? '...' : isFollowing ? 'Following' : 'Follow'}
                </Button>
                <p className="text-sm text-muted-foreground mt-1">{followersCount} Followers</p>
            </div>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={toggleMute} disabled={muteLoading}>
                        {muteLoading ? '...' : isMuted ? 'Unmute' : 'Mute'}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                        onClick={() => setReportDialogOpen(true)} 
                        disabled={reportStatus === 'loading' || reportStatus === 'success'}
                    >
                        {reportStatus === 'success' ? 'Reported' : 'Report'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {isReportDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-card rounded-lg shadow-xl w-full max-w-md">
                        <ReportDialog profileId={profileId} onClose={() => setReportDialogOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
} 