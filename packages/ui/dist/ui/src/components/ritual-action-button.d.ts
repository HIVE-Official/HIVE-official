export interface RitualActionButtonProps {
    ritualType: 'initialize' | 'discover' | 'connect' | 'launch';
    actionType: 'start' | 'continue' | 'complete' | 'retry';
    progress?: number;
    isDisabled?: boolean;
    isLoading?: boolean;
    estimatedTime?: number;
    participantCount?: number;
    onClick?: () => void;
    className?: string;
}
export declare function RitualActionButton({ ritualType, actionType, progress, isDisabled, isLoading, estimatedTime, participantCount, onClick, className }: RitualActionButtonProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ritual-action-button.d.ts.map