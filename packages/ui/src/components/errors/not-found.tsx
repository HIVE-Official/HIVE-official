import * as React from "react";
import { Button } from "../ui/button";

export interface NotFoundProps {
  /**
   * Destination for the primary call-to-action.
   * Logged-in users usually go to "/feed"; guests go to "/".
   */
  ctaHref: string;
  /**
   * Optional override for CTA label. Defaults to "Go Home".
   */
  ctaLabel?: string;
  /**
   * Destination for the tertiary "Report a bug" link.
   * Defaults to "/support?from=404".
   */
  reportHref?: string;
}

/**
 * Full-viewport 404 error display. Pure presentational component –
 * no framework-specific routing and no global state dependencies.
 */
export const NotFound: React.FC<NotFoundProps> = ({
  ctaHref,
  ctaLabel = "Go Home",
  reportHref = "/support?from=404",
}) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 py-12 text-center">
      {/* Giant 404 heading with subtle honey-gold glow */}
      <h1
        className="text-[9rem] md:text-[12rem] font-extrabold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-yellow-400/90 to-yellow-500/90 [mask-image:radial-gradient(circle_at_center,white,transparent)]"
        aria-label="404 – Page not found"
      >
        404
      </h1>

      <p className="mt-6 text-lg text-zinc-400 max-w-md">
        We couldn't find that page.
        <span className="sr-only"> …must've wandered out of the hive 🐝</span>
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Button asChild>
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
        <a
          href={reportHref}
          className="text-sm text-zinc-500 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-md"
        >
          Report a bug
        </a>
      </div>
    </section>
  );
};

NotFound.displayName = "NotFound";
