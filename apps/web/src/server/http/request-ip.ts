// Bounded Context Owner: Identity & Access Management Guild
import type { NextRequest } from "next/server";

export const extractClientIp = (request: Request | NextRequest): string => {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) {
      return ip;
    }
  }

  if ("ip" in request && typeof request.ip === "string" && request.ip.length > 0) {
    return request.ip;
  }

  return "127.0.0.1";
};
