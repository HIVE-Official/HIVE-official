export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <div className="mb-4 h-7 w-48 animate-pulse rounded-md bg-[color:var(--hive-border-subtle)]/40" />
      <div className="h-[420px] animate-pulse rounded-xl border border-[color:var(--hive-border-subtle)]/60 bg-[color:var(--hive-background-tertiary)]/50" />
    </div>
  );
}

