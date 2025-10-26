"use client";

import { useEffect, useState, useTransition } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, Button, Textarea, Badge } from "@hive/ui";
import { toast } from "@hive/ui";

type Item = {
  id: string;
  contentType: string;
  contentId: string;
  reason?: string;
  priority?: string;
  createdAt?: string | null;
};

export function ModerationPreviewSheet({ id, onClose }: { id?: string | null; onClose: () => void }) {
  const [item, setItem] = useState<Item | null>(null);
  const [note, setNote] = useState("");
  const [isPending, start] = useTransition();
  const [lastActionId, setLastActionId] = useState<string | null>(null);
  const [undoUntil, setUndoUntil] = useState<Date | null>(null);

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/moderation/open?limit=1&status=open&contentId=${encodeURIComponent(id)}`).catch(() => null);
        if (!res || !res.ok) return;
        const json = await res.json();
        if (!active) return;
        setItem(json?.data?.items?.[0] || { id, contentType: "unknown", contentId: id });
      } catch {}
    };
    load();
    return () => { active = false; };
  }, [id]);

  const act = (action: "approve" | "remove" | "warn") => {
    if (!id) return;
    if (!note.trim()) {
      toast({ title: "Note required", description: "Please add a brief note for audit.", variant: "destructive" });
      return;
    }
    start(async () => {
      try {
        const res = await fetch(`/api/moderation/${encodeURIComponent(id)}/action`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ action, note })
        });
        const json = await res.json();
        if (!res.ok || json?.success !== true) throw new Error(json?.error?.message || "Action failed");
        setLastActionId(json?.data?.actionId || null);
        setUndoUntil(json?.data?.undoUntil ? new Date(json.data.undoUntil) : null);
        toast({ title: "Action applied", description: `${action} recorded` });
      } catch (e: any) {
        toast({ title: "Action failed", description: String(e?.message || e), variant: "destructive" });
      }
    });
  };

  const undo = () => {
    if (!lastActionId) return;
    start(async () => {
      try {
        const res = await fetch(`/api/moderation/actions/${encodeURIComponent(lastActionId)}/undo`, { method: "POST" });
        const json = await res.json();
        if (!res.ok || json?.success !== true) throw new Error(json?.error?.message || "Undo failed");
        toast({ title: "Undone", description: "Action reversed" });
        setLastActionId(null);
        setUndoUntil(null);
      } catch (e: any) {
        toast({ title: "Undo failed", description: String(e?.message || e), variant: "destructive" });
      }
    });
  };

  return (
    <Sheet open={!!id} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="right" className="w-[480px]">
        <SheetHeader>
          <SheetTitle>Moderation Preview</SheetTitle>
        </SheetHeader>
        {!item ? (
          <div className="p-4 text-muted-foreground">Loading…</div>
        ) : (
          <div className="p-4 space-y-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Content</div>
              <div className="text-body-sm font-medium">{item.contentType}</div>
              <div className="text-caption text-muted-foreground truncate">{item.contentId}</div>
            </div>
            <div className="flex gap-2 items-center">
              <Badge variant="secondary">{item.priority ?? "normal"}</Badge>
              {item.reason ? <Badge variant="outline">{item.reason}</Badge> : null}
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Note (required)</div>
              <Textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Why this decision?" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={isPending} onClick={() => act("approve")}>Approve</Button>
              <Button size="sm" variant="destructive" disabled={isPending} onClick={() => act("remove")}>Remove</Button>
              <Button size="sm" variant="secondary" disabled={isPending} onClick={() => act("warn")}>Warn</Button>
            </div>
            {undoUntil && lastActionId ? (
              <div className="pt-2 border-t">
                <div className="text-caption text-muted-foreground mb-2">Undo available until {new Intl.DateTimeFormat(undefined, { hour: '2-digit', minute: '2-digit' }).format(undoUntil)}</div>
                <Button size="sm" variant="outline" onClick={undo}>Undo last action</Button>
              </div>
            ) : null}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
