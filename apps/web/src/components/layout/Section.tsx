// Bounded Context Owner: Identity & Access Management Guild
"use client";
import { cn } from "@hive/ui";
import type { PropsWithChildren } from "react";

interface SectionProps extends PropsWithChildren {
  readonly className?: string;
  readonly id?: string;
}

export const Section = ({ children, className, id }: SectionProps): JSX.Element => (
  <section id={id} className={cn("py-12 sm:py-16 lg:py-20", className)}>
    {children}
  </section>
);
