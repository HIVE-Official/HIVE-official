// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import {
  CampusRegistry,
  type CampusRecord
} from "../../../config/campus-registry";
import { err, ok, type Result } from "../../../shared/result";

const emailSchema = z
  .string({ invalid_type_error: "Email is required" })
  .min(1, "Email is required")
  .max(254, "Email must be 254 characters or fewer")
  .email("Invalid email format");

export interface CampusEmail {
  readonly value: string;
  readonly campus: CampusRecord;
}

export const CampusEmailFactory = {
  create(emailRaw: string): Result<CampusEmail> {
    const parsedResult = emailSchema.safeParse(emailRaw?.toLowerCase().trim());
    if (!parsedResult.success) {
      const message =
        parsedResult.error.issues[0]?.message ?? "Invalid email format";
      return err(message);
    }

    const value = parsedResult.data;
    const domain = value.split("@")[1] ?? "";

    const campus = CampusRegistry.findByDomain(domain);
    if (!campus) {
      return err("Only approved campus emails (e.g., @buffalo.edu) are allowed");
    }

    return ok({
      value,
      campus
    });
  }
};

export type CampusEmailFactoryType = typeof CampusEmailFactory;
