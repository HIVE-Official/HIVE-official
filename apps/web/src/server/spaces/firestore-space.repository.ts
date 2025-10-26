// Bounded Context Owner: Community Guild
import { SpaceAggregate, type SpaceRepository, type SpaceSnapshot, type SpaceMemberRole } from "@core";
import { firebaseFirestore } from "@hive/firebase";
import type { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";

const spacesCollection = () => firebaseFirestore().collection("spaces");
const membersCollection = (spaceId: string) => spacesCollection().doc(spaceId).collection("members");

const toDate = (value: unknown): Date => {
  if (!value) return new Date();
  if (value instanceof Date) return value;
  const ts = value as { toDate?: () => Date };
  if (typeof ts?.toDate === "function") return ts.toDate();
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? new Date() : d;
};

const parseLegacyMembers = (value: unknown): SpaceSnapshot["members"] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((member) => {
    const m = member as Record<string, unknown>;
    const joinedAt = toDate(m.joinedAt);
    return {
      profileId: typeof m.profileId === "string" ? m.profileId : "",
      role: (typeof m.role === "string" ? m.role : "member") as SpaceMemberRole,
      joinedAt
    };
  });
};

const memberDocToSnapshot = (doc: QueryDocumentSnapshot<DocumentData>): SpaceSnapshot["members"][number] => {
  const data = (doc.data() as Record<string, unknown>) ?? {};
  return {
    profileId: typeof data.profileId === "string" ? data.profileId : doc.id,
    role: (typeof data.role === "string" ? data.role : "member") as SpaceMemberRole,
    joinedAt: toDate(data.joinedAt)
  };
};

const snapshotToAggregate = async (data: Record<string, unknown>, id: string): Promise<SpaceAggregate> => {
  const membersSnap = await membersCollection(id).orderBy("joinedAt", "asc").get();
  const members =
    membersSnap.size > 0 ? membersSnap.docs.map(memberDocToSnapshot) : parseLegacyMembers((data as any).members);

  const snapshot: SpaceSnapshot = {
    id,
    campusId: typeof data.campusId === "string" ? data.campusId : "",
    name: typeof data.name === "string" ? data.name : id,
    description: typeof data.description === "string" ? data.description : "",
    type: (typeof data.type === "string" ? data.type : "student_organization") as SpaceSnapshot["type"],
    visibility: (typeof data.visibility === "string" ? data.visibility : "public") as SpaceSnapshot["visibility"],
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    isActive: typeof data.isActive === "boolean" ? data.isActive : true,
    createdAt: toDate((data as { createdAt?: unknown }).createdAt),
    updatedAt: toDate((data as { updatedAt?: unknown }).updatedAt),
    leaderId: typeof data.leaderId === "string" ? data.leaderId : "",
    settings: {
      maxMembers: (data.settings as Record<string, unknown> | undefined)?.maxMembers as number | undefined,
      isInviteOnly: Boolean((data.settings as Record<string, unknown> | undefined)?.isInviteOnly ?? false),
      postingPolicy: ((data.settings as Record<string, unknown> | undefined)?.postingPolicy ?? "members") as SpaceSnapshot["settings"]["postingPolicy"],
      joinPolicy: ((data.settings as Record<string, unknown> | undefined)?.joinPolicy ?? ((data.settings as Record<string, unknown> | undefined)?.isInviteOnly ? "invite_only" : "open")) as SpaceSnapshot["settings"]["joinPolicy"],
      mediaApprovalPolicy: ((data.settings as Record<string, unknown> | undefined)?.mediaApprovalPolicy ?? "leaders_only") as SpaceSnapshot["settings"]["mediaApprovalPolicy"]
    },
    members
  };

  return SpaceAggregate.rehydrate(snapshot);
};

export class FirestoreSpaceRepository implements SpaceRepository {
  async findById(spaceId: string) {
    const doc = await spacesCollection().doc(spaceId).get();
    if (!doc.exists) {
      return null;
    }
    return snapshotToAggregate(doc.data() as Record<string, unknown>, doc.id);
  }

  async listByCampus(campusId: string) {
    const query = await spacesCollection().where("campusId", "==", campusId).get();
    return Promise.all(query.docs.map((doc) => snapshotToAggregate(doc.data() as Record<string, unknown>, doc.id)));
  }

  async save(space: SpaceAggregate) {
    const snapshot = space.toSnapshot();
    const memberRoles = snapshot.members.reduce<Record<string, SpaceMemberRole>>((acc, member) => {
      acc[member.profileId] = member.role;
      return acc;
    }, {});

    const firestore = firebaseFirestore();
    const spaceRef = spacesCollection().doc(snapshot.id);
    await firestore.runTransaction(async (tx) => {
      const membersRef = membersCollection(snapshot.id);
      const existingMembersSnap = await tx.get(membersRef);
      const existingMembers = new Map(
        existingMembersSnap.docs.map((doc) => [
          doc.id,
          { role: (doc.data().role ?? "member") as SpaceMemberRole, joinedAt: toDate(doc.data().joinedAt) }
        ])
      );

      const desiredIds = new Set<string>();
      for (const member of snapshot.members) {
        desiredIds.add(member.profileId);
        const memberRef = membersRef.doc(member.profileId);
        const current = existingMembers.get(member.profileId);
        const needsWrite =
          !current ||
          current.role !== member.role ||
          (current.joinedAt?.getTime() ?? 0) !== member.joinedAt.getTime();
        if (needsWrite) {
          tx.set(memberRef, {
            profileId: member.profileId,
            role: member.role,
            joinedAt: member.joinedAt
          });
        }
      }

      for (const existingId of existingMembers.keys()) {
        if (!desiredIds.has(existingId)) {
          tx.delete(membersRef.doc(existingId));
        }
      }

      tx.set(
        spaceRef,
        {
          campusId: snapshot.campusId,
          name: snapshot.name,
          description: snapshot.description,
          type: snapshot.type,
          visibility: snapshot.visibility,
          tags: snapshot.tags,
          isActive: snapshot.isActive,
          createdAt: snapshot.createdAt,
          updatedAt: snapshot.updatedAt,
          leaderId: snapshot.leaderId,
          settings: snapshot.settings,
          memberRoles,
          memberCount: snapshot.members.length
        },
        { merge: true }
      );
    });
  }
}
