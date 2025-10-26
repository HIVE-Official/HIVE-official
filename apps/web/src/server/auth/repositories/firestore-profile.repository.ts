// Bounded Context Owner: Identity & Access Management Guild
import type { Firestore, Timestamp } from "firebase-admin/firestore";
import {
  CampusEmailFactory,
  ProfileAggregate,
  ProfileHandleFactory,
  type ProfileRepository,
  type ProfileProps,
  type PersonalInterest,
  type ResidentialSelection,
  type PersonalInfo,
  type AcademicInfo,
  type SocialInfo,
  type AffiliationInfo,
  type LeadershipInfo
} from "@core";

const COLLECTION = "profiles";

interface ProfileRecord {
  profileId: string;
  email: string;
  userType: string;
  campusId: string;
  handle?: string | null;
  handleLowercase?: string | null;
  personalInfo?: PersonalInfo | null;
  academicInfo?: AcademicInfo | null;
  socialInfo?: SocialInfo | null;
  affiliation?: AffiliationInfo | null;
  interests?: PersonalInterest[] | ReadonlyArray<PersonalInterest>;
  clubs?: string[] | ReadonlyArray<string>;
  residentialSelection?: ResidentialSelection | null;
  leadership?: LeadershipInfo | null;
  isOnboarded: boolean;
  isVerified: boolean;
  isActive: boolean;
  onboardingCompletedAt?: Date | Timestamp | null;
  consentGrantedAt?: Date | Timestamp | null;
  createdAt?: Date | Timestamp;
  updatedAt?: Date | Timestamp;
  emailLowercase: string;
}

export class FirestoreProfileRepository implements ProfileRepository {
  constructor(private readonly firestore: Firestore) {}

  async findByEmail(email: string): Promise<ProfileAggregate | null> {
    const snapshot = await this.firestore
      .collection(COLLECTION)
      .where("emailLowercase", "==", email.toLowerCase())
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const profile = this.toAggregate(snapshot.docs[0].data() as ProfileRecord);
    return profile;
  }

  async findByHandle(handle: string): Promise<ProfileAggregate | null> {
    const snapshot = await this.firestore
      .collection(COLLECTION)
      .where("handleLowercase", "==", handle.toLowerCase())
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    return this.toAggregate(snapshot.docs[0].data() as ProfileRecord);
  }

  async findById(profileId: string): Promise<ProfileAggregate | null> {
    const doc = await this.firestore.collection(COLLECTION).doc(profileId).get();
    if (!doc.exists) {
      return null;
    }

    return this.toAggregate(doc.data() as ProfileRecord);
  }

  async save(profile: ProfileAggregate): Promise<void> {
    const props = profile.getProps();
    const docRef = this.firestore.collection(COLLECTION).doc(props.profileId.value);
    const existing = await docRef.get();
    const createdAt = existing.exists
      ? this.toDate((existing.data() as ProfileRecord | undefined)?.createdAt) ?? new Date()
      : new Date();

    const record = this.toRecord(props);

    await docRef.set(
      {
        ...record,
        emailLowercase: record.email.toLowerCase(),
        handleLowercase: record.handle ? record.handle.toLowerCase() : null,
        createdAt,
        updatedAt: new Date()
      },
      { merge: true }
    );
  }

  toPersistence(profile: ProfileAggregate): ProfileProps {
    return profile.getProps();
  }

  fromPersistence(props: ProfileProps): ProfileAggregate {
    return ProfileAggregate.fromPersistence(props);
  }

  private toRecord(props: ProfileProps) {
    const serializeObject = <T extends Record<string, unknown>>(value?: T): T | null => {
      if (!value) return null;
      const entries = Object.entries(value).filter(([, v]) => v !== undefined);
      if (entries.length === 0) return null;
      return entries.reduce((acc, [key, val]) => {
        if (val !== undefined) {
          (acc as Record<string, unknown>)[key] = val;
        }
        return acc;
      }, {} as T);
    };

    const serializeLeadership = (leadership?: LeadershipInfo): LeadershipInfo | null => {
      if (!leadership) return null;
      const spaces = (leadership.spaces ?? []).map((space) => ({
        id: space.id,
        name: space.name,
        ...(space.campusId ? { campusId: space.campusId } : {})
      }));
      const classCodes = (leadership.classCodes ?? []).filter((code) => code != null);
      if (!leadership.isLeader && spaces.length === 0 && classCodes.length === 0) {
        return null;
      }
      return {
        isLeader: Boolean(leadership.isLeader),
        spaces,
        classCodes
      };
    };

    return {
      profileId: props.profileId.value,
      email: props.email.value,
      userType: props.userType,
      campusId: props.campusId,
      handle: props.handle?.value ?? null,
      personalInfo: serializeObject(props.personalInfo) ?? null,
      academicInfo: serializeObject(props.academicInfo) ?? null,
      socialInfo: serializeObject(props.socialInfo) ?? null,
      affiliation: serializeObject(props.affiliation) ?? null,
      interests: props.interests ?? [],
      clubs: props.clubs ?? [],
      residentialSelection: props.residentialSelection ?? null,
      leadership: serializeLeadership(props.leadership),
      isOnboarded: props.isOnboarded,
      isVerified: props.isVerified,
      isActive: props.isActive,
      onboardingCompletedAt: props.onboardingCompletedAt ?? null,
      consentGrantedAt: props.consentGrantedAt ?? null
    } satisfies Omit<ProfileRecord, "emailLowercase" | "createdAt" | "updatedAt">;
  }

  private toAggregate(record: ProfileRecord): ProfileAggregate {
    const emailResult = CampusEmailFactory.create(record.email);
    if (!emailResult.ok) {
      throw new Error(`Stored email is invalid: ${record.email}`);
    }

    let handle: ProfileProps["handle"] | undefined;
    if (record.handle) {
      const handleResult = ProfileHandleFactory.create(record.handle);
      if (!handleResult.ok) {
        throw new Error(`Stored handle is invalid: ${record.handle}`);
      }
      handle = handleResult.value;
    }

    const props: ProfileProps = {
      profileId: { value: record.profileId },
      email: emailResult.value,
      userType: record.userType as ProfileProps["userType"],
      campusId: record.campusId,
      handle,
      personalInfo: record.personalInfo ?? undefined,
      academicInfo: record.academicInfo ?? undefined,
      socialInfo: record.socialInfo ?? undefined,
      affiliation: record.affiliation ?? undefined,
      interests: record.interests ? [...record.interests] : [],
      clubs: record.clubs ? [...record.clubs] : [],
      residentialSelection: record.residentialSelection ?? undefined,
      leadership: record.leadership
        ? {
            isLeader: Boolean(record.leadership.isLeader),
            spaces: (record.leadership.spaces ?? []).map((space) => ({
              id: space.id,
              name: space.name,
              ...(space.campusId ? { campusId: space.campusId } : {})
            })),
            classCodes: record.leadership.classCodes ? [...record.leadership.classCodes] : []
          }
        : undefined,
      isOnboarded: record.isOnboarded,
      isVerified: record.isVerified,
      isActive: record.isActive,
      onboardingCompletedAt: this.toDate(record.onboardingCompletedAt),
      consentGrantedAt: this.toDate(record.consentGrantedAt)
    };

    return ProfileAggregate.fromPersistence(props);
  }

  private toDate(value: Date | Timestamp | null | undefined): Date | undefined {
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
