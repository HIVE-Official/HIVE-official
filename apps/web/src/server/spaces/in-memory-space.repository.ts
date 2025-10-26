// Bounded Context Owner: Community Guild
import {
  SpaceAggregate,
  type SpaceRepository,
  type SpaceSnapshot
} from "@core";

const cloneSnapshot = (snapshot: SpaceSnapshot): SpaceSnapshot => ({
  ...snapshot,
  tags: [...snapshot.tags],
  members: snapshot.members.map((member) => ({ ...member }))
});

export class InMemorySpaceRepository implements SpaceRepository {
  private readonly store = new Map<string, SpaceSnapshot>();

  constructor(initialSpaces: readonly SpaceSnapshot[] = []) {
    initialSpaces.forEach((space) => {
      this.store.set(space.id, cloneSnapshot(space));
    });
  }

  async findById(spaceId: string): Promise<SpaceAggregate | null> {
    const snapshot = this.store.get(spaceId);
    if (!snapshot) {
      return null;
    }
    return SpaceAggregate.rehydrate(cloneSnapshot(snapshot));
  }

  async listByCampus(campusId: string): Promise<SpaceAggregate[]> {
    return Array.from(this.store.values())
      .filter((snapshot) => snapshot.campusId === campusId)
      .map((snapshot) => SpaceAggregate.rehydrate(cloneSnapshot(snapshot)));
  }

  async save(space: SpaceAggregate): Promise<void> {
    this.store.set(space.getId(), cloneSnapshot(space.toSnapshot()));
  }
}

