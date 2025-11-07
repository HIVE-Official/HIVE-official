/**
 * Ritual Engine Service
 *
 * Orchestrates ritual lifecycle for V2.0 configuration-driven system.
 * Handles phase transitions, auto-triggers, and event emission.
 *
 * Philosophy:
 * - Rituals are JSON configs, not code
 * - Phase transitions can be time-based or manual
 * - Events broadcast changes to subscribers (feed, notifications)
 * - Campus isolation enforced at service layer
 */
import { RitualPhase, RitualUnion } from '../domain/rituals/archetypes';
export interface PhaseTransitionEvent {
    ritualId: string;
    campusId: string;
    fromPhase: RitualPhase;
    toPhase: RitualPhase;
    timestamp: string;
    triggeredBy: 'auto' | 'manual' | 'threshold';
    metadata?: Record<string, unknown>;
}
export interface RitualEventSubscriber {
    onPhaseTransition(event: PhaseTransitionEvent): Promise<void>;
}
export interface RitualLifecycleConfig {
    autoStartEnabled: boolean;
    autoEndEnabled: boolean;
    thresholdTriggers?: {
        participantCount?: number;
        submissionCount?: number;
        customMetric?: {
            key: string;
            value: number;
        };
    };
}
export declare class RitualEngineService {
    private subscribers;
    constructor();
    /**
     * Subscribe to ritual lifecycle events
     * Used by feed service, notification service, analytics
     */
    subscribe(subscriber: RitualEventSubscriber): void;
    /**
     * Unsubscribe from ritual lifecycle events
     */
    unsubscribe(subscriber: RitualEventSubscriber): void;
    /**
     * Emit phase transition event to all subscribers
     */
    private emitPhaseTransition;
    /**
     * Check if ritual should auto-start based on time
     */
    shouldAutoStart(ritual: RitualUnion): boolean;
    /**
     * Check if ritual should auto-end based on time
     */
    shouldAutoEnd(ritual: RitualUnion): boolean;
    /**
     * Check if threshold triggers met (e.g., participant count)
     */
    checkThresholdTriggers(ritual: RitualUnion, config?: RitualLifecycleConfig): boolean;
    /**
     * Transition ritual to next phase
     * Returns updated ritual object with new phase
     */
    transitionPhase(ritual: RitualUnion, targetPhase: RitualPhase, triggeredBy?: 'auto' | 'manual' | 'threshold', metadata?: Record<string, unknown>): Promise<RitualUnion>;
    /**
     * Validate that a phase transition is allowed
     */
    private validatePhaseTransition;
    /**
     * Process automatic phase transitions for a ritual
     * Called by scheduled job (e.g., every 30 seconds)
     */
    processAutoTransitions(ritual: RitualUnion, config: RitualLifecycleConfig): Promise<RitualUnion | null>;
    /**
     * Manually pause a ritual (admin action)
     */
    pauseRitual(ritual: RitualUnion): Promise<RitualUnion>;
    /**
     * Manually resume a paused ritual (admin action)
     */
    resumeRitual(ritual: RitualUnion): Promise<RitualUnion>;
    /**
     * Manually end a ritual early (admin action)
     */
    endRitualEarly(ritual: RitualUnion): Promise<RitualUnion>;
    /**
     * Launch a ritual (announced → active)
     */
    launchRitual(ritual: RitualUnion): Promise<RitualUnion>;
    /**
     * Get ritual state summary
     */
    getRitualState(ritual: RitualUnion): {
        phase: RitualPhase;
        isActive: boolean;
        canJoin: boolean;
        canParticipate: boolean;
        timeUntilStart?: number;
        timeUntilEnd?: number;
        daysRemaining?: number;
    };
    /**
     * Validate ritual archetype-specific rules
     * Each archetype may have specific phase transition requirements
     */
    validateArchetypeRules(ritual: RitualUnion, targetPhase: RitualPhase): {
        valid: boolean;
        reason?: string;
    };
}
export declare const ritualEngine: RitualEngineService;
//# sourceMappingURL=ritual-engine.service.d.ts.map