// Bounded Context Owner: Identity & Access Management Guild
import { z } from "zod";
import { err, ok, type Result } from "./result";

export type ValidationError = {
  code: "INVALID_BODY";
  message: string;
  details?: unknown;
};

/**
 * Safely parse a JSON request body using a Zod schema. Returns a Result
 * rather than throwing to keep API route handlers straightforward.
 */
export async function parseJson<T>(
  request: Request,
  schema: z.ZodSchema<T>
): Promise<Result<T, ValidationError>> {
  let raw: unknown;
  try {
    raw = (await request.json()) as unknown;
  } catch {
    return err({ code: "INVALID_BODY", message: "Body is not valid JSON" });
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return err({
      code: "INVALID_BODY",
      message: parsed.error.issues.map((i) => i.message).join(", "),
      details: parsed.error.issues
    });
  }
  return ok(parsed.data);
}

