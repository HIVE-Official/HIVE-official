// Bounded Context Owner: Identity & Access Management Guild
export const metadata = {
  title: "HIVE — Terms (Early Access)",
  description: "Terms placeholder. Early Access — full terms forthcoming."
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Terms</h1>
      <p className="mt-3 text-sm text-muted-foreground">Early Access — full terms forthcoming.</p>
      <section className="mt-6 space-y-4 text-sm leading-6 text-foreground/90">
        <p>By using HIVE during Early Access, you agree to follow campus policies and HIVE community standards. Content moderation is transparent and reversible where technically feasible.</p>
        <p>Leaders are responsible for Space‑level norms and membership. Universities retain safety rails via campus policies. We’ll update these terms before general availability.</p>
      </section>
    </main>
  );
}

