// Bounded Context Owner: Identity & Access Management Guild
import { appendFile, stat, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { v4 as uuid } from "uuid";
import { firebaseFirestore } from "@hive/firebase";
import type {
  MagicLinkPayload,
  MagicLinkResult,
  MagicLinkSender
} from "@core";

const OUTBOX = resolve(process.cwd(), "temp", "outbox.log");

export class ConsoleMagicLinkSender implements MagicLinkSender {
  constructor(private readonly ttlMinutes: number = 15) {}

  async send(payload: MagicLinkPayload): Promise<MagicLinkResult> {
    const expiresAt = new Date(Date.now() + this.ttlMinutes * 60 * 1000);
    const messageId = uuid();
    const continueBase = process.env.FIREBASE_MAGIC_LINK_CONTINUE_URL ?? "http://localhost:3000/api/auth/verify";

    let link = continueBase;
    try {
      const url = new URL(continueBase);
      url.searchParams.set("token", messageId);
      link = url.toString();
    } catch {
      // If continueBase isn't a full URL, fall back to simple concatenation
      link = `${continueBase}?token=${messageId}`;
    }

    // Best-effort: persist magic link token for verify route in Firestore
    try {
      const firestore = firebaseFirestore();
      await firestore.collection("auth_magic_links").doc(messageId).set({
        email: payload.email,
        profileId: payload.profileId,
        campusId: payload.campusId,
        userType: payload.userType,
        magicLink: link,
        expiresAt,
        createdAt: new Date(),
        consumed: false
      });
    } catch (error) {
      console.warn("console-magic-link.firestore_unavailable", error);
    }

    await ensureFilePath(OUTBOX);
    await appendFile(
      OUTBOX,
      `${new Date().toISOString()}\t${payload.email}\t${link}\n`
    );

    console.info("Magic link", { email: payload.email, link, expiresAt });

    return {
      messageId,
      expiresAt
    };
  }
}

const ensureFilePath = async (filePath: string) => {
  const dir = dirname(filePath);
  try {
    await stat(dir);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await mkdir(dir, { recursive: true });
    } else if ((error as NodeJS.ErrnoException).code !== "EEXIST") {
      throw error;
    }
  }
};
