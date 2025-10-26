// Bounded Context Owner: Identity & Access Management Guild
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import type { Firestore } from "firebase-admin/firestore";
import { FirestoreProfileRepository } from "../auth/repositories/firestore-profile.repository";
import { getSpaceCalendar } from "../spaces/service";

export type ProfileCalendarItem = {
  id: string;
  spaceId: string;
  spaceName?: string;
  title: string;
  location: string;
  startAt: string; // ISO
  endAt: string; // ISO
  source: "event" | "ritual";
};

export type ProfileCalendarResponse = {
  items: ProfileCalendarItem[];
  generatedAt: string; // ISO
};

export type ProfileCalendarQuery = {
  profileId: string;
  start?: Date;
  end?: Date;
  limit?: number;
};

const db = (): Firestore => {
  if (!isFirebaseConfigured()) {
    throw new Error("Firestore unavailable; configure Firebase to use profile calendar");
  }
  return firebaseFirestore();
};

// vBETA: Profile calendar explicitly excludes Rituals (see TODO.md). Only Space Events are returned.
export async function getProfileCalendar(query: ProfileCalendarQuery): Promise<ProfileCalendarResponse> {
  if (!isFirebaseConfigured()) return { items: [], generatedAt: new Date().toISOString() };

  const firestore = db();
  const repo = new FirestoreProfileRepository(firestore);
  const aggregate = await repo.findById(query.profileId);
  if (!aggregate) return { items: [], generatedAt: new Date().toISOString() };

  const props = aggregate.getProps();
  const joinedSpaces = (props.clubs ?? []) as string[];
  if (joinedSpaces.length === 0) return { items: [], generatedAt: new Date().toISOString() };

  const startMs = (query.start ?? new Date()).getTime();
  const endMs = query.end ? query.end.getTime() : undefined;
  const limit = query.limit ?? 25;

  // Fetch a small set of spaces for performance (can expand with indexes later)
  const spaceIds = joinedSpaces.slice(0, 8);

  // Fetch names in parallel for display
  const nameMap = new Map<string, string>();
  const nameSnaps = await Promise.all(
    spaceIds.map((id) => firestore.collection("spaces").doc(id).get().catch(() => null))
  );
  nameSnaps.forEach((snap, idx) => {
    const id = spaceIds[idx];
    const name = snap && snap.exists ? String((snap.data() as any)?.name ?? "") : "";
    if (name) nameMap.set(id, name);
  });

  const perSpaceCalendars = await Promise.all(spaceIds.map((id) => getSpaceCalendar(id)));
  const items = perSpaceCalendars
    .flatMap((cal) => cal.events)
    .filter((ev) => {
      const s = new Date(ev.startAt).getTime();
      const e = new Date(ev.endAt).getTime();
      if (e < startMs) return false;
      if (endMs !== undefined && s > endMs) return false;
      return true;
    })
    .map<ProfileCalendarItem>((ev) => ({
      id: ev.id,
      spaceId: ev.spaceId,
      spaceName: nameMap.get(ev.spaceId),
      title: ev.title,
      location: ev.location,
      startAt: ev.startAt,
      endAt: ev.endAt,
      source: "event",
    }))
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
    .slice(0, limit);

  return { items, generatedAt: new Date().toISOString() };
}
