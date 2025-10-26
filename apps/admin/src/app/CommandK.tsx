"use client";

import { useEffect, useState } from "react";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@hive/ui";
import { useRouter } from "next/navigation";
import { toast } from "@hive/ui";

type SearchResult = {
  users: { id: string; name: string; email: string }[];
  spaces: { id: string; name: string }[];
  flags: { key: string; label?: string; enabled: boolean }[];
};

export function CommandK() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [res, setRes] = useState<SearchResult>({ users: [], spaces: [], flags: [] });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const id = setTimeout(async () => {
      if (!open) return;
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { cache: "no-store" });
        const j = await r.json();
        if (r.ok && j?.success) setRes(j.data);
      } catch {}
    }, 200);
    return () => clearTimeout(id);
  }, [q, open]);

  const toggleFlag = async (key: string, enabled: boolean) => {
    try {
      const res = await fetch(`/api/features/${encodeURIComponent(key)}/toggle`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ enabled })
      });
      const j = await res.json();
      if (!res.ok || j?.success !== true) throw new Error(j?.error?.message || "Toggle failed");
      toast({ title: "Flag toggled", description: `${key} → ${enabled ? "on" : "off"}` });
    } catch (e: any) {
      toast({ title: "Toggle failed", description: String(e?.message || e), variant: "destructive" });
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search users, spaces, flags…" value={q} onValueChange={setQ} />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {res.users.length > 0 && (
          <CommandGroup heading="Users">
            {res.users.map((u) => (
              <CommandItem key={u.id} onSelect={() => router.push(`/users?q=${encodeURIComponent(u.email || u.name)}`)}>
                {u.name} <span className="ml-2 text-muted-foreground">{u.email}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {res.spaces.length > 0 && (
          <CommandGroup heading="Spaces">
            {res.spaces.map((s) => (
              <CommandItem key={s.id} onSelect={() => router.push(`/spaces?q=${encodeURIComponent(s.name)}`)}>
                {s.name}
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        {res.flags.length > 0 && (
          <>
            <CommandSeparator />
            <CommandGroup heading="Flags">
              {res.flags.map((f) => (
                <CommandItem key={f.key} onSelect={() => toggleFlag(f.key, !f.enabled)}>
                  {f.label || f.key} <span className="ml-2 text-muted-foreground">toggle</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
