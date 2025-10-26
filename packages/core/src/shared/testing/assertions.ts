// Bounded Context Owner: Identity & Access Management Guild
import { expect } from "vitest";
import type { Result } from "../result";

export function assertOk<T, E = string>(result: Result<T, E>): asserts result is { ok: true; value: T } {
  expect(result.ok).toBe(true);
}

export function assertErr<T, E = string>(result: Result<T, E>): asserts result is { ok: false; error: E } {
  expect(result.ok).toBe(false);
}
