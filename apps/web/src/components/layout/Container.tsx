// Bounded Context Owner: Identity & Access Management Guild
"use client";
import { cn } from "@hive/ui";
import type { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  readonly className?: string;
}

export const Container = ({ children, className }: ContainerProps): JSX.Element => (
  <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
);
