// Bounded Context Owner: Spaces Domain Guild
import React from "react";

export interface AboutPoliciesSummaryProps {
  postingPolicy: "members" | "leaders_only";
  allowPublicPosts: boolean;
  joinPolicy?: "open" | "request" | "invite_only";
}

export const AboutPoliciesSummary: React.FC<AboutPoliciesSummaryProps> = ({ postingPolicy, allowPublicPosts, joinPolicy = "open" }) => (
  <div className="space-y-2 text-muted-foreground text-body-sm">
    <div><span className="text-foreground font-semibold">Posting policy:</span> {postingPolicy === "leaders_only" ? "Leaders only" : "Members"}</div>
    <div><span className="text-foreground font-semibold">Campus sharing:</span> {allowPublicPosts ? "Allowed when permitted" : "Disabled by default"}</div>
    <div><span className="text-foreground font-semibold">Join policy:</span> {joinPolicy.replace("_", " ")}</div>
  </div>
);

export const AboutContacts: React.FC<{ contacts: { name: string; role: string }[]; campusScoped?: boolean }> = ({ contacts, campusScoped = true }) => (
  <div className="space-y-2">
    {contacts.length === 0 ? (
      <p className="text-caption text-muted-foreground">No contacts listed.</p>
    ) : (
      <ul className="space-y-1">
        {contacts.map((c) => (
          <li key={`${c.name}-${c.role}`} className="text-body-sm text-muted-foreground"><span className="text-foreground font-medium">{c.name}</span> — {c.role}{campusScoped ? " (UB only)" : ""}</li>
        ))}
      </ul>
    )}
  </div>
);

