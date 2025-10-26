// Bounded Context Owner: Identity & Access Management Guild
export type CtaPayload = {
  id: string;
  href?: string;
  surface?: string;
  pos?: string;
  meta?: Record<string, unknown>;
};

function getCid(): string {
  try {
    const key = "hive.cid";
    let v = localStorage.getItem(key);
    if (!v) {
      v = crypto.randomUUID?.() ?? String(Math.random()).slice(2) + Date.now().toString(36);
      localStorage.setItem(key, v);
    }
    return v;
  } catch {
    return "anon";
  }
}

export function trackCtaClick(payload: CtaPayload): void {
  try {
    const body = {
      ...payload,
      cid: getCid(),
      path: typeof window !== "undefined" ? window.location.pathname : undefined,
      ts: Date.now()
    };
    const url = "/api/telemetry/cta";
    if (typeof navigator !== "undefined" && typeof (navigator as any).sendBeacon === "function") {
      const blob = new Blob([JSON.stringify(body)], { type: "application/json" });
      (navigator as any).sendBeacon(url, blob);
      return;
    }
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // keepalive helps when navigating away after click
      keepalive: true
    });
  } catch {
    // ignore
  }
}

export function trackNavClick(id: string, href: string, meta?: Record<string, unknown>): void {
  trackCtaClick({ id: `nav_${id}`, href, surface: "global_nav", pos: "sidebar", meta });
}
