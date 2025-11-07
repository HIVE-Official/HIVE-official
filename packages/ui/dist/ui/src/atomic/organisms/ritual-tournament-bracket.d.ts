import * as React from 'react';
export interface TournamentMatchup {
    id: string;
    round: number;
    a: string;
    b: string;
    votesA?: number;
    votesB?: number;
}
export interface RitualTournamentBracketProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    matchups: TournamentMatchup[];
    currentRound?: number;
    onVote?: (matchupId: string, choice: 'a' | 'b') => void;
}
export declare const RitualTournamentBracket: React.FC<RitualTournamentBracketProps>;
//# sourceMappingURL=ritual-tournament-bracket.d.ts.map