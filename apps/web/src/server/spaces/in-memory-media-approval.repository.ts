// Bounded Context Owner: Community Guild
import type {
  SpaceMediaApprovalRepository,
  SpaceMediaApproval,
  SpaceMediaApprovalEnqueueInput,
  SpaceMediaApprovalStatus,
  SpaceMediaApprovalUpdate
} from "@core";

export class InMemorySpaceMediaApprovalRepository implements SpaceMediaApprovalRepository {
  private readonly store = new Map<string, Map<string, SpaceMediaApproval>>();

  async enqueue(inputs: readonly SpaceMediaApprovalEnqueueInput[]): Promise<void> {
    for (const entry of inputs) {
      const approvals = this.ensureSpace(entry.spaceId);
      approvals.set(entry.id, {
        id: entry.id,
        spaceId: entry.spaceId,
        postId: entry.postId,
        attachment: entry.attachment,
        status: "pending",
        requestedBy: entry.requestedBy,
        requestedAt: entry.requestedAt,
        resolvedBy: null,
        resolvedAt: null,
        resolutionReason: null
      });
    }
  }

  async listBySpace(spaceId: string, status: SpaceMediaApprovalStatus = "pending") {
    const approvals = this.store.get(spaceId);
    if (!approvals) {
      return [];
    }
    return Array.from(approvals.values()).filter((approval) => approval.status === status);
  }

  async findById(spaceId: string, approvalId: string) {
    return this.store.get(spaceId)?.get(approvalId) ?? null;
  }

  async updateStatus(spaceId: string, approvalId: string, update: SpaceMediaApprovalUpdate) {
    const approvals = this.store.get(spaceId);
    if (!approvals) {
      return null;
    }
    const existing = approvals.get(approvalId);
    if (!existing) {
      return null;
    }
    const updated: SpaceMediaApproval = {
      ...existing,
      status: update.status,
      resolvedBy: update.resolvedBy,
      resolvedAt: update.resolvedAt,
      resolutionReason: update.resolutionReason ?? null
    };
    approvals.set(approvalId, updated);
    return updated;
  }

  private ensureSpace(spaceId: string) {
    let approvals = this.store.get(spaceId);
    if (!approvals) {
      approvals = new Map();
      this.store.set(spaceId, approvals);
    }
    return approvals;
  }
}
