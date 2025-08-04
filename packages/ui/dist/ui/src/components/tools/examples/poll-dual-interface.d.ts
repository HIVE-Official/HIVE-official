interface PollOption {
    id: string;
    text: string;
    votes: number;
    voters: string[];
}
interface PollData {
    id: string;
    question: string;
    options: PollOption[];
    isActive: boolean;
    allowMultiple: boolean;
    isAnonymous: boolean;
    endDate?: Date;
    createdBy: string;
    createdAt: Date;
    totalVotes: number;
    totalVoters: number;
}
interface PollDualInterfaceProps {
    poll: PollData;
    userRole: 'leader' | 'member' | 'guest';
    userId: string;
    onUpdatePoll?: (updates: Partial<PollData>) => Promise<void>;
    onVote?: (optionIds: string[]) => Promise<void>;
    onDeletePoll?: () => Promise<void>;
    showInterface?: boolean;
}
export declare function PollDualInterface({ poll, userRole, userId, onUpdatePoll, onVote, onDeletePoll, showInterface }: PollDualInterfaceProps): import("react/jsx-runtime").JSX.Element;
export default PollDualInterface;
//# sourceMappingURL=poll-dual-interface.d.ts.map