// Bounded Context Owner: Rituals Guild
import { z } from "zod";
import {
  InMemoryRitualRepository,
  RitualApplicationService,
  type RitualSnapshot,
  type RitualCadence
} from "@core";

const seed: RitualSnapshot[] = [
  {
    id: "ritual-morning-breathe",
    campusId: "ub-buffalo",
    spaceId: "space-panic-relief",
    creatorId: "profile-kai",
    name: "7:30 Breathe Together",
    description: "Two minutes to calm down before class.",
    schedule: { cadence: "daily", timeOfDay: "07:30" },
    participants: [
      { profileId: "profile-kai", joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5) },
      { profileId: "profile-jwrhineh", joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 2) }
    ],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: "ritual-night-checkin",
    campusId: "ub-buffalo",
    spaceId: "space-dorm-richmond",
    creatorId: "profile-jordan",
    name: "Nightly hall check-in",
    description: "Share wins and needs for tomorrow.",
    schedule: { cadence: "weekly", timeOfDay: "22:00", daysOfWeek: [0, 2, 4] },
    participants: [{ profileId: "profile-jwrhineh", joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24) }],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 6)
  }
];

const allowDevSeeds = process.env.ENABLE_DEV_SEEDS === "true";

if (!allowDevSeeds) {
  console.warn(
    "Ritual seeds disabled. Configure a persistent ritual repository or set ENABLE_DEV_SEEDS=true to restore sample data."
  );
}

const repository = new InMemoryRitualRepository(allowDevSeeds ? seed : []);
export const ritualService = new RitualApplicationService({ repository });

export const CreateRitualCommandSchema = z.object({
  ritualId: z.string().min(3),
  campusId: z.string().min(1),
  spaceId: z.string().optional(),
  creatorId: z.string().min(1),
  name: z.string().min(2),
  description: z.string().min(1),
  cadence: z.custom<RitualCadence>().transform((v) => v as RitualCadence),
  timeOfDay: z.string().regex(/^\d{2}:\d{2}$/),
  daysOfWeek: z.array(z.number().int().min(0).max(6)).optional()
});

export async function listRitualsForProfile(profileId: string) {
  const results = await ritualService.listForProfile(profileId);
  return results.map(serializeRitualWithWindow);
}

export async function getRitualById(ritualId: string) {
  const results = await ritualService.listForProfile("");
  const found = results.find((r) => r.id === ritualId) ?? null;
  return found ? serializeRitualWithWindow(found) : null;
}

export async function joinRitual(ritualId: string, profileId: string) {
  const result = await ritualService.join(ritualId, profileId);
  if (!result.ok) return { ok: false as const, error: result.error };
  return { ok: true as const, ritual: serializeRitualWithWindow(result.value) };
}

function parseTimeOfDay(time: string): { h: number; m: number } | null {
  const m = time.match(/^(\d{2}):(\d{2})$/);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h < 0 || h > 23 || min < 0 || min > 59) return null;
  return { h, m: min };
}

function nextOccurrence(schedule: RitualSnapshot["schedule"], now = new Date()): Date {
  const t = parseTimeOfDay(schedule.timeOfDay) ?? { h: 9, m: 0 };
  const base = new Date(now);
  base.setSeconds(0, 0);

  const candidate = new Date(base);
  candidate.setHours(t.h, t.m, 0, 0);

  if (schedule.cadence === "daily") {
    if (candidate.getTime() <= now.getTime()) candidate.setDate(candidate.getDate() + 1);
    return candidate;
  }

  // weekly cadence
  const days = schedule.daysOfWeek && schedule.daysOfWeek.length > 0 ? schedule.daysOfWeek : [base.getDay()];
  let best: Date | null = null;
  for (let i = 0; i < 14; i++) {
    const d = new Date(candidate);
    d.setDate(base.getDate() + i);
    if (days.includes(d.getDay())) {
      if (d.getTime() > now.getTime()) {
        best = d; break;
      }
    }
  }
  return best ?? candidate;
}

function isActiveWindow(schedule: RitualSnapshot["schedule"], now = new Date()): boolean {
  const t = parseTimeOfDay(schedule.timeOfDay) ?? { h: 9, m: 0 };
  const start = new Date(now);
  start.setHours(t.h, t.m, 0, 0);
  const end = new Date(start.getTime() + 30 * 60 * 1000); // 30-minute window
  return now >= start && now <= end && (schedule.cadence === "daily" || (schedule.daysOfWeek ?? []).includes(now.getDay()));
}

export function serializeRitualWithWindow(ritual: RitualSnapshot) {
  const now = new Date();
  const active = isActiveWindow(ritual.schedule, now);
  const nextAt = nextOccurrence(ritual.schedule, now);
  return {
    id: ritual.id,
    name: ritual.name,
    description: ritual.description,
    cadence: ritual.schedule.cadence,
    timeOfDay: ritual.schedule.timeOfDay,
    daysOfWeek: ritual.schedule.daysOfWeek ?? [],
    participants: ritual.participants.length,
    isActive: active,
    nextAt: nextAt.toISOString()
  };
}
