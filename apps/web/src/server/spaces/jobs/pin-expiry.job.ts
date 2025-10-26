// Bounded Context Owner: Community Guild
import type {
  SpacePostRepository,
  SpacePostTelemetryPort,
  SpacePostDomainEventPublisherPort
} from "@core";

export interface SpacePostPinExpiryJobDependencies {
  readonly repository: SpacePostRepository;
  readonly telemetry?: SpacePostTelemetryPort;
  readonly clock?: () => Date;
  readonly batchSize?: number;
  readonly events?: SpacePostDomainEventPublisherPort;
}

export interface SpacePostPinExpiryJobResult {
  readonly referenceTime: string;
  readonly processedCount: number;
  readonly unpinnedPostIds: readonly string[];
}

export class SpacePostPinExpiryJob {
  private readonly repository: SpacePostRepository;
  private readonly telemetry?: SpacePostTelemetryPort;
  private readonly eventPublisher?: SpacePostDomainEventPublisherPort;
  private readonly clock: () => Date;
  private readonly batchSize: number;

  constructor(dependencies: SpacePostPinExpiryJobDependencies) {
    this.repository = dependencies.repository;
    this.telemetry = dependencies.telemetry;
    this.eventPublisher = dependencies.events;
    this.clock = dependencies.clock ?? (() => new Date());
    this.batchSize = dependencies.batchSize ?? 100;
  }

  async run(): Promise<SpacePostPinExpiryJobResult> {
    const referenceTime = this.clock();
    const expiredPins = await this.repository.listPinsExpiringBefore(referenceTime, this.batchSize);
    const unpinnedIds: string[] = [];

    for (const aggregate of expiredPins) {
      const snapshot = aggregate.toSnapshot();
      const expiredAt = snapshot.pinExpiresAt ?? referenceTime;
      const unpinResult = aggregate.unpin(
        { actorId: "system-pin-expiry", reason: "Pin expired via sweep" },
        referenceTime
      );

      if (!unpinResult.ok) {
        continue;
      }

      await this.repository.save(aggregate);
      const events = aggregate.pullDomainEvents();
      await this.eventPublisher?.publish(events, referenceTime);
      unpinnedIds.push(snapshot.id);

      void this.telemetry?.recordPinExpired({
        spaceId: snapshot.spaceId,
        postId: snapshot.id,
        expiredAt
      });
    }

    return {
      referenceTime: referenceTime.toISOString(),
      processedCount: unpinnedIds.length,
      unpinnedPostIds: unpinnedIds
    };
  }
}
