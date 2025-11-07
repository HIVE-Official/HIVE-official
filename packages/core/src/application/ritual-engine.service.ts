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

import {
  BaseRitual,
  RitualArchetype,
  RitualPhase,
  RitualUnion,
} from '../domain/rituals/archetypes';

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
    customMetric?: { key: string; value: number };
  };
}

export class RitualEngineService {
  private subscribers: RitualEventSubscriber[] = [];

  constructor() {}

  /**
   * Subscribe to ritual lifecycle events
   * Used by feed service, notification service, analytics
   */
  public subscribe(subscriber: RitualEventSubscriber): void {
    this.subscribers.push(subscriber);
  }

  /**
   * Unsubscribe from ritual lifecycle events
   */
  public unsubscribe(subscriber: RitualEventSubscriber): void {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber);
  }

  /**
   * Emit phase transition event to all subscribers
   */
  private async emitPhaseTransition(event: PhaseTransitionEvent): Promise<void> {
    await Promise.all(
      this.subscribers.map((subscriber) =>
        subscriber.onPhaseTransition(event).catch((error) => {
          console.error('Subscriber error on phase transition:', error);
        })
      )
    );
  }

  /**
   * Check if ritual should auto-start based on time
   */
  public shouldAutoStart(ritual: RitualUnion): boolean {
    if (ritual.phase !== 'announced') return false;

    const now = new Date();
    const startTime = new Date(ritual.startsAt);

    return now >= startTime;
  }

  /**
   * Check if ritual should auto-end based on time
   */
  public shouldAutoEnd(ritual: RitualUnion): boolean {
    if (ritual.phase !== 'active' && ritual.phase !== 'cooldown') return false;

    const now = new Date();
    const endTime = new Date(ritual.endsAt);

    return now >= endTime;
  }

  /**
   * Check if threshold triggers met (e.g., participant count)
   */
  public checkThresholdTriggers(
    ritual: RitualUnion,
    config?: RitualLifecycleConfig
  ): boolean {
    if (!config?.thresholdTriggers) return false;

    const { thresholdTriggers } = config;

    // Check participant count threshold
    if (
      thresholdTriggers.participantCount &&
      ritual.metrics?.participants &&
      ritual.metrics.participants >= thresholdTriggers.participantCount
    ) {
      return true;
    }

    // Check submission count threshold
    if (
      thresholdTriggers.submissionCount &&
      ritual.metrics?.submissions &&
      ritual.metrics.submissions >= thresholdTriggers.submissionCount
    ) {
      return true;
    }

    // Check custom metric threshold
    if (
      thresholdTriggers.customMetric &&
      ritual.metrics &&
      (ritual.metrics as any)[thresholdTriggers.customMetric.key] >=
        thresholdTriggers.customMetric.value
    ) {
      return true;
    }

    return false;
  }

  /**
   * Transition ritual to next phase
   * Returns updated ritual object with new phase
   */
  public async transitionPhase(
    ritual: RitualUnion,
    targetPhase: RitualPhase,
    triggeredBy: 'auto' | 'manual' | 'threshold' = 'manual',
    metadata?: Record<string, unknown>
  ): Promise<RitualUnion> {
    const fromPhase = ritual.phase;

    // Validate phase transition
    const validationResult = this.validatePhaseTransition(fromPhase, targetPhase);
    if (!validationResult.valid) {
      throw new Error(
        `Invalid phase transition: ${fromPhase} → ${targetPhase}. ${validationResult.reason}`
      );
    }

    // Create updated ritual object
    const updatedRitual: RitualUnion = {
      ...ritual,
      phase: targetPhase,
      updatedAt: new Date().toISOString(),
    };

    // Emit event to subscribers
    const event: PhaseTransitionEvent = {
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
  private validatePhaseTransition(
    fromPhase: RitualPhase,
    toPhase: RitualPhase
  ): { valid: boolean; reason?: string } {
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
  public async processAutoTransitions(
    ritual: RitualUnion,
    config: RitualLifecycleConfig
  ): Promise<RitualUnion | null> {
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
  public async pauseRitual(ritual: RitualUnion): Promise<RitualUnion> {
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
  public async resumeRitual(ritual: RitualUnion): Promise<RitualUnion> {
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
  public async endRitualEarly(ritual: RitualUnion): Promise<RitualUnion> {
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
  public async launchRitual(ritual: RitualUnion): Promise<RitualUnion> {
    if (ritual.phase !== 'announced') {
      throw new Error(
        `Cannot launch ritual in phase: ${ritual.phase}. Must be announced.`
      );
    }

    return await this.transitionPhase(ritual, 'active', 'manual', {
      reason: 'admin_manual_launch',
    });
  }

  /**
   * Get ritual state summary
   */
  public getRitualState(ritual: RitualUnion): {
    phase: RitualPhase;
    isActive: boolean;
    canJoin: boolean;
    canParticipate: boolean;
    timeUntilStart?: number;
    timeUntilEnd?: number;
    daysRemaining?: number;
  } {
    const now = new Date();
    const startTime = new Date(ritual.startsAt);
    const endTime = new Date(ritual.endsAt);

    const timeUntilStart =
      startTime > now ? startTime.getTime() - now.getTime() : undefined;
    const timeUntilEnd =
      endTime > now ? endTime.getTime() - now.getTime() : undefined;
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
  public validateArchetypeRules(
    ritual: RitualUnion,
    targetPhase: RitualPhase
  ): { valid: boolean; reason?: string } {
    // Founding Class: Must have participant limit set
    if (
      ritual.archetype === RitualArchetype.FoundingClass &&
      targetPhase === 'active'
    ) {
      const config = ritual.config as any;
      if (!config.founding?.limit || config.founding.limit <= 0) {
        return {
          valid: false,
          reason: 'Founding Class rituals require a participant limit',
        };
      }
    }

    // Tournament: Must have participants configured
    if (
      ritual.archetype === RitualArchetype.Tournament &&
      targetPhase === 'active'
    ) {
      const config = ritual.config as any;
      if (
        !config.tournament?.participants?.count ||
        config.tournament.participants.count < 2
      ) {
        return {
          valid: false,
          reason: 'Tournament rituals require at least 2 participants',
        };
      }
    }

    // Rule Inversion: Must have inversions configured
    if (
      ritual.archetype === RitualArchetype.RuleInversion &&
      targetPhase === 'active'
    ) {
      const config = ritual.config as any;
      if (
        !config.ruleInversion?.inversions ||
        config.ruleInversion.inversions.length === 0
      ) {
        return {
          valid: false,
          reason: 'Rule Inversion rituals require at least one rule inversion',
        };
      }
    }

    // Beta Lottery: Must have slots and drawing date
    if (
      ritual.archetype === RitualArchetype.BetaLottery &&
      targetPhase === 'active'
    ) {
      const config = ritual.config as any;
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

// Singleton instance for application-wide use
export const ritualEngine = new RitualEngineService();
