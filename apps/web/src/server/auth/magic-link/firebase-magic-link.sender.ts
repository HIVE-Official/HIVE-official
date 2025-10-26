// Bounded Context Owner: Identity & Access Management Guild
import { v4 as uuid } from "uuid";
import { firebaseAuth, firebaseFirestore } from "@hive/firebase";
import type {
  MagicLinkPayload,
  MagicLinkResult,
  MagicLinkSender
} from "@core";

export interface FirebaseMagicLinkConfig {
  readonly actionCodeSettings: {
    readonly url: string;
    readonly handleCodeInApp: boolean;
    readonly iOS?: { readonly bundleId: string };
    readonly android?: { readonly packageName: string; readonly installApp?: boolean };
    readonly dynamicLinkDomain?: string;
  };
  readonly ttlMinutes?: number;
  readonly collection?: string;
}

export class FirebaseMagicLinkSender implements MagicLinkSender {
  private readonly ttlMinutes: number;
  private readonly collection: string;

  constructor(private readonly config: FirebaseMagicLinkConfig) {
    this.ttlMinutes = config.ttlMinutes ?? 15;
    this.collection = config.collection ?? "auth_magic_links";
  }

  async send(payload: MagicLinkPayload): Promise<MagicLinkResult> {
    const auth = firebaseAuth();
    const firestore = firebaseFirestore();

    const messageId = uuid();
    const expiresAt = new Date(Date.now() + this.ttlMinutes * 60 * 1000);

    const actionCodeSettings = this.buildActionCodeSettings(
      this.config.actionCodeSettings,
      messageId
    );

    const magicLink = await auth.generateSignInWithEmailLink(
      payload.email,
      actionCodeSettings
    );

    await firestore.collection(this.collection).doc(messageId).set({
      email: payload.email,
      profileId: payload.profileId,
      campusId: payload.campusId,
      userType: payload.userType,
      magicLink,
      expiresAt,
      createdAt: new Date(),
      consumed: false
    });

    return {
      messageId,
      expiresAt
    };
  }
  private buildActionCodeSettings(
    base: FirebaseMagicLinkConfig["actionCodeSettings"],
    messageId: string
  ) {
    try {
      const url = new URL(base.url);
      url.searchParams.set("token", messageId);
      return {
        ...base,
        url: url.toString()
      };
    } catch {
      return base;
    }
  }
}
