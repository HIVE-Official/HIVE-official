// Bounded Context Owner: Identity & Access Management Guild
// Landing page for the student web app (marketing-lite, production-safe)
// - Uses @hive/ui tokens/components only
// - Reduced‑motion safe; a11y visible focus; mobile‑first sizing

import * as UI from "@hive/ui";
import LandingHero from "./_components/LandingHero";

export default function LandingPage(): JSX.Element {
  return (
    <main className="page px-page py-section">
      <LandingHero />

      <section className="container-page mx-auto section-y max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UI.Card className="focus-within:neutral-border group">
            <UI.CardHeader>
              <UI.CardTitle className="text-h4 font-h4">Spaces</UI.CardTitle>
              <UI.CardDescription>Student‑run communities with verified roles and clear policies.</UI.CardDescription>
            </UI.CardHeader>
            <UI.CardFooter className="px-6 pb-6">
              <UI.Button asChild variant="link" className="focus-ring px-0">
                <a href="/spaces">Open Spaces</a>
              </UI.Button>
            </UI.CardFooter>
          </UI.Card>

          <UI.Card className="focus-within:neutral-border group">
            <UI.CardHeader>
              <UI.CardTitle className="text-h4 font-h4">Events</UI.CardTitle>
              <UI.CardDescription>Calm, tokenized motion with no layout shift; RSVP in one tap.</UI.CardDescription>
            </UI.CardHeader>
            <UI.CardFooter className="px-6 pb-6">
              <UI.Button asChild variant="link" className="focus-ring px-0">
                <a href="/spaces">See what’s on</a>
              </UI.Button>
            </UI.CardFooter>
          </UI.Card>

          <UI.Card className="focus-within:neutral-border group">
            <UI.CardHeader>
              <UI.CardTitle className="text-h4 font-h4">Trust‑Visible</UI.CardTitle>
              <UI.CardDescription>Transparent moderation, reversible actions, and visible roles by default.</UI.CardDescription>
            </UI.CardHeader>
            <UI.CardFooter className="px-6 pb-6">
              <UI.Button asChild variant="link" className="focus-ring px-0">
                <a href="/privacy">Learn how we keep it safe</a>
              </UI.Button>
            </UI.CardFooter>
          </UI.Card>
        </div>
      </section>
    </main>
  );
}
