/**
 * Handle Generation Utilities
 * Automatically generates unique handles from display names
 */

export function generateBaseHandle(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "") // Remove non-alphanumeric characters
    .slice(0, 15); // Limit to 15 characters
}

export function generateHandleVariants(baseHandle: string): string[] {
  const variants = [baseHandle];

  // Add numbered variants
  for (let i = 1; i <= 99; i++) {
    const variant = `${baseHandle}${i}`;
    if (variant.length <= 15) {
      variants.push(variant);
    }
  }

  // Add random suffix variants if base is short enough
  if (baseHandle.length <= 11) {
    for (let i = 0; i < 10; i++) {
      const randomSuffix = Math.floor(Math.random() * 9999)
        .toString()
        .padStart(4, "0");
      variants.push(`${baseHandle}${randomSuffix}`);
    }
  }

  return variants;
}

export async function findAvailableHandle(
  displayName: string,
  checkAvailability: (handle: string) => Promise<boolean>
): Promise<string> {
  const baseHandle = generateBaseHandle(displayName);

  if (!baseHandle) {
    // Fallback for names with no alphanumeric characters
    const fallbackBase = "user";
    const variants = generateHandleVariants(fallbackBase);

    for (const variant of variants) {
      if (await checkAvailability(variant)) {
        return variant;
      }
    }

    throw new Error("Unable to generate available handle");
  }

  const variants = generateHandleVariants(baseHandle);

  for (const variant of variants) {
    if (await checkAvailability(variant)) {
      return variant;
    }
  }

  throw new Error("Unable to generate available handle");
}

export function validateHandle(handle: string): {
  valid: boolean;
  error?: string;
} {
  if (!handle) {
    return { valid: false, error: "Handle is required" };
  }

  if (handle.length < 3) {
    return { valid: false, error: "Handle must be at least 3 characters" };
  }

  if (handle.length > 15) {
    return { valid: false, error: "Handle must be 15 characters or less" };
  }

  if (!/^[a-z0-9]+$/.test(handle)) {
    return {
      valid: false,
      error: "Handle can only contain lowercase letters and numbers",
    };
  }

  // Reserved handles
  const reserved = [
    "admin",
    "hive",
    "api",
    "www",
    "app",
    "mail",
    "support",
    "help",
    "about",
    "terms",
    "privacy",
    "contact",
    "team",
    "staff",
    "mod",
    "moderator",
    "system",
    "bot",
    "test",
    "demo",
    "null",
    "undefined",
  ];

  if (reserved.includes(handle)) {
    return { valid: false, error: "Handle is reserved" };
  }

  return { valid: true };
}
