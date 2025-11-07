"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ritualEngine = exports.RitualEngineService = void 0;
const archetypes_1 = require("../domain/rituals/archetypes");
class RitualEngineService {
    constructor() {
        this.subscribers = [];
    }
    /**
     * Subscribe to ritual lifecycle events
     * Used by feed service, notification service, analytics
     */
    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    }
    /**
     * Unsubscribe from ritual lifecycle events
     */
    unsubscribe(subscriber) {
        this.subscribers = this.subscribers.filter((s) => s !== subscriber);
    }
    /**
     * Emit phase transition event to all subscribers
     */
    async emitPhaseTransition(event) {
        await Promise.all(this.subscribers.map((subscriber) => subscriber.onPhaseTransition(event).catch((error) => {
            console.error('Subscriber error on phase transition:', error);
        })));
    }
    /**
     * Check if ritual should auto-start based on time
     */
    shouldAutoStart(ritual) {
        if (ritual.phase !== 'announced')
            return false;
        const now = new Date();
        const startTime = new Date(ritual.startsAt);
        return now >= startTime;
    }
    /**
     * Check if ritual should auto-end based on time
     */
    shouldAutoEnd(ritual) {
        if (ritual.phase !== 'active' && ritual.phase !== 'cooldown')
            return false;
        const now = new Date();
        const endTime = new Date(ritual.endsAt);
        return now >= endTime;
    }
    /**
     * Check if threshold triggers met (e.g., participant count)
     */
    checkThresholdTriggers(ritual, config) {
        if (!config?.thresholdTriggers)
            return false;
        const { thresholdTriggers } = config;
        // Check participant count threshold
        if (thresholdTriggers.participantCount &&
            ritual.metrics?.participants &&
            ritual.metrics.participants >= thresholdTriggers.participantCount) {
            return true;
        }
        // Check submission count threshold
        if (thresholdTriggers.submissionCount &&
            ritual.metrics?.submissions &&
            ritual.metrics.submissions >= thresholdTriggers.submissionCount) {
            return true;
        }
        // Check custom metric threshold
        if (thresholdTriggers.customMetric &&
            ritual.metrics &&
            ritual.metrics[thresholdTriggers.customMetric.key] >=
                thresholdTriggers.customMetric.value) {
            return true;
        }
        return false;
    }
    /**
     * Transition ritual to next phase
     * Returns updated ritual object with new phase
     */
    async transitionPhase(ritual, targetPhase, triggeredBy = 'manual', metadata) {
        const fromPhase = ritual.phase;
        // Validate phase transition
        const validationResult = this.validatePhaseTransition(fromPhase, targetPhase);
        if (!validationResult.valid) {
            throw new Error(`Invalid phase transition: ${fromPhase} → ${targetPhase}. ${validationResult.reason}`);
        }
        // Create updated ritual object
        const updatedRitual = {
            ...ritual,
            phase: targetPhase,
            updatedAt: new Date().toISOString(),
        };
        // Emit event to subscribers
        const event = {
            ritualId: ritual.id,
            campusId: ritual.campusId,
            fromPhase,
            toPhase: targetPhase,
            timestamp: new Date().toISOString(),
            triggeredBy,
            metadata,
        };
        await this.emitPhaseTransition(event);
        return updatedRitual;
    }
    /**
     * Validate that a phase transition is allowed
     */
    validatePhaseTransition(fromPhase, toPhase) {
        // Draft can go to announced or ended (cancelled)
        if (fromPhase === 'draft') {
            if (toPhase === 'announced' || toPhase === 'ended') {
                return { valid: true };
            }
            return {
                valid: false,
                reason: 'Draft can only transition to announced or ended',
            };
        }
        // Announced can go to active or ended (cancelled)
        if (fromPhase === 'announced') {
            if (toPhase === 'active' || toPhase === 'ended') {
                return { valid: true };
            }
            return {
                valid: false,
                reason: 'Announced can only transition to active or ended',
            };
        }
        // Active can go to cooldown or ended
        if (fromPhase === 'active') {
            if (toPhase === 'cooldown' || toPhase === 'ended') {
                return { valid: true };
            }
            return {
                valid: false,
                reason: 'Active can only transition to cooldown or ended',
            };
        }
        // Cooldown can only go to ended
        if (fromPhase === 'cooldown') {
            if (toPhase === 'ended') {
                return { valid: true };
            }
            return {
                valid: false,
                reason: 'Cooldown can only transition to ended',
            };
        }
        // Ended is terminal
        if (fromPhase === 'ended') {
            return { valid: false, reason: 'Ended is a terminal phase' };
        }
        return { valid: false, reason: 'Unknown phase transition' };
    }
    /**
     * Process automatic phase transitions for a ritual
     * Called by scheduled job (e.g., every 30 seconds)
     */
    async processAutoTransitions(ritual, config) {
        // Check if auto-start is enabled and conditions met
        if (config.autoStartEnabled && this.shouldAutoStart(ritual)) {
            return await this.transitionPhase(ritual, 'active', 'auto', {
                reason: 'auto_start_time_reached',
            });
        }
        // Check if auto-end is enabled and conditions met
        if (config.autoEndEnabled && this.shouldAutoEnd(ritual)) {
            return await this.transitionPhase(ritual, 'ended', 'auto', {
                reason: 'auto_end_time_reached',
            });
        }
        // Check if threshold triggers are met
        if (this.checkThresholdTriggers(ritual, config)) {
            // Determine target phase based on current phase
            if (ritual.phase === 'announced') {
                return await this.transitionPhase(ritual, 'active', 'threshold', {
                    reason: 'participant_threshold_met',
                });
            }
        }
        // No transitions needed
        return null;
    }
    /**
     * Manually pause a ritual (admin action)
     */
    async pauseRitual(ritual) {
        if (ritual.phase !== 'active') {
            throw new Error('Can only pause active rituals');
        }
        return await this.transitionPhase(ritual, 'cooldown', 'manual', {
            reason: 'admin_pause',
        });
    }
    /**
     * Manually resume a paused ritual (admin action)
     */
    async resumeRitual(ritual) {
        if (ritual.phase !== 'cooldown') {
            throw new Error('Can only resume paused (cooldown) rituals');
        }
        return await this.transitionPhase(ritual, 'active', 'manual', {
            reason: 'admin_resume',
        });
    }
    /**
     * Manually end a ritual early (admin action)
     */
    async endRitualEarly(ritual) {
        if (ritual.phase === 'ended') {
            throw new Error('Ritual is already ended');
        }
        return await this.transitionPhase(ritual, 'ended', 'manual', {
            reason: 'admin_end_early',
        });
    }
    /**
     * Launch a ritual (announced → active)
     */
    async launchRitual(ritual) {
        if (ritual.phase !== 'announced') {
            throw new Error(`Cannot launch ritual in phase: ${ritual.phase}. Must be announced.`);
        }
        return await this.transitionPhase(ritual, 'active', 'manual', {
            reason: 'admin_manual_launch',
        });
    }
    /**
     * Get ritual state summary
     */
    getRitualState(ritual) {
        const now = new Date();
        const startTime = new Date(ritual.startsAt);
        const endTime = new Date(ritual.endsAt);
        const timeUntilStart = startTime > now ? startTime.getTime() - now.getTime() : undefined;
        const timeUntilEnd = endTime > now ? endTime.getTime() - now.getTime() : undefined;
        const daysRemaining = timeUntilEnd
            ? Math.ceil(timeUntilEnd / (1000 * 60 * 60 * 24))
            : undefined;
        return {
            phase: ritual.phase,
            isActive: ritual.phase === 'active',
            canJoin: ritual.phase === 'announced' || ritual.phase === 'active',
            canParticipate: ritual.phase === 'active',
            timeUntilStart,
            timeUntilEnd,
            daysRemaining,
        };
    }
    /**
     * Validate ritual archetype-specific rules
     * Each archetype may have specific phase transition requirements
     */
    validateArchetypeRules(ritual, targetPhase) {
        // Founding Class: Must have participant limit set
        if (ritual.archetype === archetypes_1.RitualArchetype.FoundingClass &&
            targetPhase === 'active') {
            const config = ritual.config;
            if (!config.founding?.limit || config.founding.limit <= 0) {
                return {
                    valid: false,
                    reason: 'Founding Class rituals require a participant limit',
                };
            }
        }
        // Tournament: Must have participants configured
        if (ritual.archetype === archetypes_1.RitualArchetype.Tournament &&
            targetPhase === 'active') {
            const config = ritual.config;
            if (!config.tournament?.participants?.count ||
                config.tournament.participants.count < 2) {
                return {
                    valid: false,
                    reason: 'Tournament rituals require at least 2 participants',
                };
            }
        }
        // Rule Inversion: Must have inversions configured
        if (ritual.archetype === archetypes_1.RitualArchetype.RuleInversion &&
            targetPhase === 'active') {
            const config = ritual.config;
            if (!config.ruleInversion?.inversions ||
                config.ruleInversion.inversions.length === 0) {
                return {
                    valid: false,
                    reason: 'Rule Inversion rituals require at least one rule inversion',
                };
            }
        }
        // Beta Lottery: Must have slots and drawing date
        if (ritual.archetype === archetypes_1.RitualArchetype.BetaLottery &&
            targetPhase === 'active') {
            const config = ritual.config;
            if (!config.lottery?.slots || config.lottery.slots <= 0) {
                return {
                    valid: false,
                    reason: 'Beta Lottery rituals require positive slot count',
                };
            }
            if (!config.lottery?.drawing?.date) {
                return {
                    valid: false,
                    reason: 'Beta Lottery rituals require drawing date',
                };
            }
        }
        return { valid: true };
    }
}
exports.RitualEngineService = RitualEngineService;
// Singleton instance for application-wide use
exports.ritualEngine = new RitualEngineService();
//# sourceMappingURL=ritual-engine.service.js.map