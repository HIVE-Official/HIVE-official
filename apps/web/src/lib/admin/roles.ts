/**
 * Centralized admin role helpers
 * Single source of truth for admin emails and checks.
 */

export function getAdminEmails(): string[] {
  const fromEnv = process.env.NEXT_PUBLIC_ADMIN_EMAILS || process.env.ADMIN_EMAILS;
  if (fromEnv && fromEnv.trim().length > 0) {
    return fromEnv
      .split(',')
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean);
  }

  // Fallback defaults (development-safe)
  return [
    'jwrhineh@buffalo.edu',
    'noahowsh@gmail.com',
    'jacob@buffalo.edu',
    'admin@buffalo.edu',
  ];
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const list = getAdminEmails();
  return list.includes(email.toLowerCase());
}

