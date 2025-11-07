/**
 * Ritual Templates Library
 *
 * Pre-configured ritual templates for rapid admin deployment.
 * Each template provides smart defaults for a specific archetype,
 * allowing < 30 second ritual creation.
 */
import { RitualArchetype } from '../archetypes';
import type { FoundingClassRitual, LaunchCountdownRitual, BetaLotteryRitual, UnlockChallengeRitual, SurvivalRitual, LeakRitual, TournamentRitual, FeatureDropRitual, RuleInversionRitual } from '../archetypes';
export interface RitualTemplateMetadata {
    id: string;
    name: string;
    archetype: RitualArchetype;
    description: string;
    category: 'cold_start' | 'scale';
    minUsers: number;
    difficulty: 'easy' | 'medium' | 'hard';
    duration: string;
    tags: string[];
}
export interface RitualTemplate<T = any> {
    metadata: RitualTemplateMetadata;
    defaults: Partial<T>;
}
export declare const FOUNDING_CLASS_TEMPLATE: RitualTemplate<FoundingClassRitual>;
export declare const LAUNCH_COUNTDOWN_TEMPLATE: RitualTemplate<LaunchCountdownRitual>;
export declare const BETA_LOTTERY_TEMPLATE: RitualTemplate<BetaLotteryRitual>;
export declare const UNLOCK_CHALLENGE_TEMPLATE: RitualTemplate<UnlockChallengeRitual>;
export declare const SURVIVAL_TEMPLATE: RitualTemplate<SurvivalRitual>;
export declare const LEAK_TEMPLATE: RitualTemplate<LeakRitual>;
export declare const CAMPUS_MADNESS_TEMPLATE: RitualTemplate<TournamentRitual>;
export declare const MAJOR_WARS_TEMPLATE: RitualTemplate<TournamentRitual>;
export declare const DORM_WARS_TEMPLATE: RitualTemplate<TournamentRitual>;
export declare const DM_GAME_TEMPLATE: RitualTemplate<FeatureDropRitual>;
export declare const BANG_ANONYMOUS_TEMPLATE: RitualTemplate<RuleInversionRitual>;
export declare const RITUAL_TEMPLATES: {
    readonly FOUNDING_CLASS: RitualTemplate<FoundingClassRitual>;
    readonly LAUNCH_COUNTDOWN: RitualTemplate<LaunchCountdownRitual>;
    readonly BETA_LOTTERY: RitualTemplate<BetaLotteryRitual>;
    readonly UNLOCK_CHALLENGE: RitualTemplate<UnlockChallengeRitual>;
    readonly SURVIVAL: RitualTemplate<SurvivalRitual>;
    readonly LEAK: RitualTemplate<LeakRitual>;
    readonly CAMPUS_MADNESS: RitualTemplate<TournamentRitual>;
    readonly MAJOR_WARS: RitualTemplate<TournamentRitual>;
    readonly DORM_WARS: RitualTemplate<TournamentRitual>;
    readonly DM_GAME: RitualTemplate<FeatureDropRitual>;
    readonly BANG_ANONYMOUS: RitualTemplate<RuleInversionRitual>;
};
export type RitualTemplateId = keyof typeof RITUAL_TEMPLATES;
export declare function getAvailableTemplates(currentUsers: number): RitualTemplate[];
export declare function getTemplate(id: RitualTemplateId): RitualTemplate | undefined;
export declare function getTemplatesByCategory(category: 'cold_start' | 'scale'): RitualTemplate[];
export declare function getTemplatesByArchetype(archetype: RitualArchetype): RitualTemplate[];
//# sourceMappingURL=index.d.ts.map