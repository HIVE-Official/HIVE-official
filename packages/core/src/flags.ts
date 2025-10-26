// Bounded Context Owner: Platform Services Guild

export type FlagSegments = { campuses?: string[]; roles?: string[] };
export type FlagDefinition = {
  key: string;
  enabled?: boolean;
  rolloutPercentage?: number; // 0..100
  segments?: FlagSegments | null;
};

export type FlagContext = { campusId?: string; role?: string; random?: number };

/**
 * Evaluate a feature flag client-side.
 * - enabled === false => off
 * - rolloutPercentage gates by [0,100] bucket using stable random if provided
 * - segments: any match (campus or role) enables; if provided and no match, treated as off
 */
export function isFlagEnabled(flag: FlagDefinition, ctx: FlagContext = {}): boolean {
  if (flag.enabled === false) return false;
  if (flag.enabled === true && !flag.rolloutPercentage && !flag.segments) return true;

  const rnd = typeof ctx.random === 'number' ? ctx.random : Math.random();
  if (typeof flag.rolloutPercentage === 'number') {
    const pct = Math.max(0, Math.min(100, flag.rolloutPercentage));
    if ((rnd * 100) > pct) return false;
  }

  const seg = flag.segments || undefined;
  if (seg && (seg.campuses?.length || seg.roles?.length)) {
    const campusOk = seg.campuses && ctx.campusId ? seg.campuses.includes(ctx.campusId) : false;
    const roleOk = seg.roles && ctx.role ? seg.roles.includes(ctx.role) : false;
    if (!campusOk && !roleOk) return false;
  }

  return true;
}

