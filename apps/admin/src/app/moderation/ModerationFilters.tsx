"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from "@hive/ui";

export function ModerationFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  const status = sp.get("status") || "open";
  const contentType = sp.get("contentType") || "";
  const campusId = sp.get("campusId") || "";

  const update = useCallback((patch: Record<string, string>) => {
    const params = new URLSearchParams(sp.toString());
    for (const [k, v] of Object.entries(patch)) {
      if (v) params.set(k, v); else params.delete(k);
    }
    router.push(`?${params.toString()}`);
  }, [router, sp]);

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select value={status} onValueChange={(v) => update({ status: v })}>
        <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="closed">Closed</SelectItem>
        </SelectContent>
      </Select>
      <Select value={contentType} onValueChange={(v) => update({ contentType: v })}>
        <SelectTrigger className="w-[160px]"><SelectValue placeholder="All types" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="">All</SelectItem>
          <SelectItem value="post">Post</SelectItem>
          <SelectItem value="comment">Comment</SelectItem>
          <SelectItem value="media">Media</SelectItem>
        </SelectContent>
      </Select>
      <Input className="w-[200px]" placeholder="Campus ID" defaultValue={campusId} onKeyDown={(e) => {
        if (e.key === 'Enter') update({ campusId: (e.target as HTMLInputElement).value });
      }} />
      <Button variant="outline" onClick={() => update({ campusId: "" })}>Clear</Button>
    </div>
  );
}
