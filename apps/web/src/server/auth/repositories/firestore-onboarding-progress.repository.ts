// Bounded Context Owner: Identity & Access Management Guild
import type { Firestore, Timestamp } from "firebase-admin/firestore";
import type {
  OnboardingProgressRepository,
  OnboardingProgressSnapshot
} from "@core";

const COLLECTION = "onboarding_progress";

interface ProgressRecord {
  readonly profileId: string;
  readonly stepsCompleted: readonly string[];
  readonly partialSubmission: OnboardingProgressSnapshot["partialSubmission"];
  readonly lastUpdated: Date | Timestamp;
}

export class FirestoreOnboardingProgressRepository
  implements OnboardingProgressRepository
{
  constructor(private readonly firestore: Firestore) {}

  async save(snapshot: OnboardingProgressSnapshot): Promise<void> {
    await this.firestore.collection(COLLECTION).doc(snapshot.profileId).set(
      {
        profileId: snapshot.profileId,
        stepsCompleted: snapshot.stepsCompleted,
        partialSubmission: snapshot.partialSubmission,
        lastUpdated: snapshot.lastUpdated,
        updatedAt: new Date()
      },
      { merge: true }
    );
  }

  async findByProfileId(
    profileId: string
  ): Promise<OnboardingProgressSnapshot | null> {
    const doc = await this.firestore.collection(COLLECTION).doc(profileId).get();
    if (!doc.exists) {
      return null;
    }

    const data = doc.data() as ProgressRecord;
    return {
      profileId: data.profileId,
      stepsCompleted: data.stepsCompleted ?? [],
      partialSubmission: data.partialSubmission ?? {},
      lastUpdated: this.toDate(data.lastUpdated) ?? new Date()
    };
  }

  async delete(profileId: string): Promise<void> {
    await this.firestore.collection(COLLECTION).doc(profileId).delete();
  }

  private toDate(value: Date | Timestamp | undefined): Date | undefined {
    if (!value) {
      return undefined;
    }

    if (value instanceof Date) {
      return value;
    }

    if (typeof value.toDate === "function") {
      return value.toDate();
    }

    return new Date(value as unknown as string);
  }
}
