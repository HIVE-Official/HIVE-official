// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";

export const userTypeSchema = z.enum(["student", "alumni", "faculty"]);
export type UserType = z.infer<typeof userTypeSchema>;

export interface ProfileId {
  readonly value: string;
}

export interface PersonalInterest {
  readonly id: string;
  readonly label: string;
  readonly category?: string;
}

export interface ResidentialSelection {
  readonly spaceId: string;
  readonly name: string;
}

export interface LeadershipSpace {
  readonly id: string;
  readonly name: string;
  readonly campusId?: string;
}

export interface LeadershipInfo {
  readonly isLeader: boolean;
  readonly spaces: readonly LeadershipSpace[];
  readonly classCodes: readonly string[];
}
