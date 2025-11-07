export default function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center text-white/70">
        <div className="w-10 h-10 mx-auto mb-3 border-4 border-[var(--hive-brand-primary)] border-t-transparent rounded-full animate-spin" />
        <p>Loading space…</p>
      </div>
    </div>
  );
}

