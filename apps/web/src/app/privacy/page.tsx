// Bounded Context Owner: Identity & Access Management Guild
export const metadata = {
  title: "HIVE — Privacy (Early Access)",
  description: "Privacy placeholder. Early Access — full policy forthcoming."
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold">Privacy</h1>
      <p className="mt-3 text-sm text-muted-foreground">Early Access — full policy forthcoming.</p>
      <section className="mt-6 space-y-4 text-sm leading-6 text-foreground/90">
        <p>We’re rolling out in pilots. We collect only what’s needed to run core features like verified sign‑in, Spaces membership, events, and moderation. We do not sell personal data.</p>
        <p>Questions? Contact us via your campus lead or <a className="underline" href="/schools">request your campus</a> to get in touch.</p>
      </section>
    </main>
  );
}

