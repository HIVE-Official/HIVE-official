// Bounded Context Owner: Design System Guild
import type { HTMLAttributes, PropsWithChildren } from "react";

type ElementTag = "span" | "div" | "label";

export function VisuallyHidden({ as, children, ...rest }: PropsWithChildren<{ as?: ElementTag } & HTMLAttributes<HTMLElement>>): JSX.Element {
  const Tag = (as ?? "span") as ElementTag;
  return (
    <Tag className="sr-only" {...rest}>
      {children}
    </Tag>
  );
}

VisuallyHidden.displayName = "VisuallyHidden";
