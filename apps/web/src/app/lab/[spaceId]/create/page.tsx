"use client";
// Bounded Context Owner: HiveLab Guild
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LabCreateToolPage({ params }: { params: { spaceId: string } }): JSX.Element {
  const { spaceId } = params;
  const search = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const templateId = search.get("templateId") ?? undefined;
    const name = search.get("name") ?? undefined;
    const description = search.get("description") ?? undefined;

    const run = async () => {
      try {
        const res = await fetch("/api/tools", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name ?? (templateId ? `Copy of ${templateId}` : "New Tool"),
            description: description ?? (templateId ? "Created from template" : "Untitled draft"),
            campusId: "ub-buffalo",
            createdBy: "profile-jwrhineh",
            spaceId,
            templateId
          })
        });
        if (!res.ok) throw new Error(`Create failed (${res.status})`);
        const json: unknown = await res.json();
        const ok = (v: unknown): v is { success: true; data?: { id?: unknown } } =>
          typeof v === "object" && v !== null && (v as { success?: unknown }).success === true;
        if (!ok(json)) throw new Error(((json as { error?: { message?: unknown } })?.error?.message as string | undefined) ?? "Create failed");
        const toolId = typeof json.data?.id === "string" ? json.data.id : "";
        router.replace(`/lab/${spaceId}/tools/${toolId}/edit`);
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : "Failed to create tool");
      }
    };
    void run();
  }, [router, search, spaceId]);

  return (
    <div className="mx-auto max-w-lg p-8 text-center">
      <h1 className="text-xl font-semibold">Preparing your tool…</h1>
      <p className="mt-2 text-muted-foreground">We’ll send you to the editor in a moment.</p>
      {error ? (
        <p className="mt-4 text-red-500">{error}</p>
      ) : null}
    </div>
  );
}
