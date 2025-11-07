export type Campus = {
  id: string;
  name: string;
  short: string;
  domain: string;
  available?: boolean;
};

export const CAMPUSES: Campus[] = [
  { id: "ub", name: "University at Buffalo", short: "UB", domain: "buffalo.edu", available: true },
  { id: "buffstate", name: "Buffalo State", short: "Buff State", domain: "buffalostate.edu", available: false },
  { id: "cornell", name: "Cornell", short: "Cornell", domain: "cornell.edu", available: false },
  { id: "rit", name: "RIT", short: "RIT", domain: "rit.edu", available: false },
];

const STORAGE_KEYS = {
  campus: "start.campus",
  email: "start.email",
  otp: "start.otp",
} as const;

export function saveSelectedCampus(campus: Campus) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEYS.campus, JSON.stringify(campus));
}

export function loadSelectedCampus(): Campus | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEYS.campus);
    return raw ? (JSON.parse(raw) as Campus) : null;
  } catch {
    return null;
  }
}

export function saveEmail(email: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEYS.email, email);
}

export function loadEmail(): string | null {
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(STORAGE_KEYS.email);
}

export type OtpRecord = {
  code: string; // 6 digits
  sentAt: number; // ms
  expiresAt: number; // ms
  resendAvailableAt: number; // ms
  email: string;
};

export function saveOtp(rec: OtpRecord) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEYS.otp, JSON.stringify(rec));
}

export function loadOtp(): OtpRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEYS.otp);
    return raw ? (JSON.parse(raw) as OtpRecord) : null;
  } catch {
    return null;
  }
}

export function generateOtp(): string {
  const n = Math.floor((typeof crypto !== "undefined" && "getRandomValues" in crypto ? crypto.getRandomValues(new Uint32Array(1))[0] : Math.random() * 1_000_000) % 1_000_000);
  return String(n).padStart(6, "0");
}
