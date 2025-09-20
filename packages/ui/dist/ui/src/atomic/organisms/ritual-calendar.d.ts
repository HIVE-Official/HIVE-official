export interface RitualInstance {
    id: string;
    ritualId: string;
    ritual: {
        name: string;
        title: string;
        description: string;
        type: 'onboarding' | 'seasonal' | 'achievement' | 'community' | 'creative' | 'emergency' | 'legacy';
        participationType: string;
        maxParticipants?: number;
        currentParticipants: number;
    };
    startTime: string;
    endTime?: string;
    status: 'scheduled' | 'active' | 'completed' | 'cancelled';
    location?: string;
    isUserParticipating: boolean;
    isUserEligible: boolean;
    participationStatus?: 'invited' | 'joined' | 'active' | 'completed';
    reminderSet: boolean;
    tags: string[];
}
export interface RitualCalendarProps {
    ritualInstances: RitualInstance[];
    onJoinRitual?: (ritualId: string, instanceId: string) => Promise<void>;
    onSetReminder?: (instanceId: string) => Promise<void>;
    onViewDetails?: (ritualId: string, instanceId: string) => void;
    className?: string;
    view?: 'month' | 'week' | 'day' | 'list';
    filterType?: string[];
    showPastEvents?: boolean;
    compactMode?: boolean;
}
export declare function RitualCalendar({ ritualInstances, onJoinRitual, onSetReminder, onViewDetails, className, view: initialView, filterType, showPastEvents, compactMode: _compactMode }: RitualCalendarProps): any;
//# sourceMappingURL=ritual-calendar.d.ts.map