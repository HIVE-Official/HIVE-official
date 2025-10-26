// Bounded Context Owner: Community Guild
import type {
  SpaceMediaApproval,
  SpaceMediaApprovalEnqueueInput,
  SpaceMediaApprovalStatus,
  SpaceMediaApprovalUpdate
} from "./media-approval.types";

export interface SpaceMediaApprovalRepository {
  enqueue(_inputs: readonly SpaceMediaApprovalEnqueueInput[]): Promise<void>;
  listBySpace(_spaceId: string, _status?: SpaceMediaApprovalStatus): Promise<SpaceMediaApproval[]>;
  findById(_spaceId: string, _approvalId: string): Promise<SpaceMediaApproval | null>;
  updateStatus(
    _spaceId: string,
    _approvalId: string,
    _update: SpaceMediaApprovalUpdate
  ): Promise<SpaceMediaApproval | null>;
  deleteForPost?(_spaceId: string, _postId: string): Promise<void>;
}
