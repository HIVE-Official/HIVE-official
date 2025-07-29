import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
declare const hiveEventsSurfaceVariants: (props?: {
    mode?: "view" | "builder" | "edit";
} & import("class-variance-authority/dist/types").ClassProp) => string;
declare const eventTypes: {
    readonly academic: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Academic";
        readonly color: "text-[var(--hive-status-info)]";
        readonly description: "Study sessions, lectures, workshops";
    };
    readonly social: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Social";
        readonly color: "text-[var(--hive-status-success)]";
        readonly description: "Meetups, parties, hangouts";
    };
    readonly recreational: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Recreational";
        readonly color: "text-purple-400";
        readonly description: "Games, sports, activities";
    };
    readonly cultural: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Cultural";
        readonly color: "text-orange-400";
        readonly description: "Performances, exhibitions, arts";
    };
    readonly meeting: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Meeting";
        readonly color: "text-gray-400";
        readonly description: "Official meetings, committees";
    };
    readonly virtual: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Virtual";
        readonly color: "text-cyan-400";
        readonly description: "Online events, webinars";
    };
};
declare const rsvpStatuses: {
    readonly going: {
        readonly label: "Going";
        readonly color: "text-green-400";
        readonly bg: "bg-green-500/20";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    readonly maybe: {
        readonly label: "Maybe";
        readonly color: "text-yellow-400";
        readonly bg: "bg-yellow-500/20";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    readonly not_going: {
        readonly label: "Not Going";
        readonly color: "text-red-400";
        readonly bg: "bg-red-500/20";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
};
export interface Event {
    id: string;
    title: string;
    description: string;
    type: keyof typeof eventTypes;
    startDate: Date;
    endDate: Date;
    location?: string;
    virtualLink?: string;
    organizerId: string;
    organizerName: string;
    organizerAvatar?: string;
    maxAttendees?: number;
    currentAttendees: number;
    rsvpDeadline?: Date;
    isRecurring?: boolean;
    recurrenceRule?: string;
    tags: string[];
    imageUrl?: string;
    isFeatured: boolean;
    isPrivate: boolean;
    requiredRSVP: boolean;
    cost?: number;
    currency?: string;
}
export interface HiveEventsSurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveEventsSurfaceVariants> {
    space: Space;
    events?: Event[];
    userRSVPs?: Record<string, keyof typeof rsvpStatuses>;
    isBuilder?: boolean;
    canCreateEvents?: boolean;
    canModerate?: boolean;
    onCreateEvent?: () => void;
    onRSVPEvent?: (eventId: string, status: keyof typeof rsvpStatuses) => void;
    onEditEvent?: (eventId: string) => void;
    onDeleteEvent?: (eventId: string) => void;
    onShareEvent?: (eventId: string) => void;
    onViewEvent?: (eventId: string) => void;
    viewMode?: 'list' | 'calendar' | 'grid';
    showFilters?: boolean;
    maxEvents?: number;
}
export declare const HiveEventsSurface: React.ForwardRefExoticComponent<HiveEventsSurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { hiveEventsSurfaceVariants, eventTypes, rsvpStatuses };
//# sourceMappingURL=hive-events-surface.d.ts.map