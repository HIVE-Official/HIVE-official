// Bounded Context Owner: Design System Guild
// Motion tokens and helper utilities for consistent choreography

export type MotionDuration =
  | "instant"
  | "rapid"
  | "swift"
  | "smooth"
  | "deliberate"
  | "linger";

export type MotionEase =
  | "standard"
  | "entrance"
  | "exit"
  | "emphasized";

export type MotionSet = {
  duration?: MotionDuration;
  ease?: MotionEase;
};

// Canonical transition class names mapped to the tokenized Tailwind preset
export const motionSets = {
  interactive: "transition duration-swift ease-standard",
  micro: "transition duration-rapid ease-standard",
  ambient: "transition duration-smooth ease-standard",
  deliberate: "transition duration-deliberate ease-emphasized",
} as const;

export function motionClass(set: keyof typeof motionSets): string {
  return motionSets[set];
}

export function customMotion({ duration = "swift", ease = "standard" }: MotionSet): string {
  return `transition duration-${duration} ease-${ease}`;
}

// Icon motion types for hover interactions
export type IconMotion = "auto" | "push" | "pop" | "rotate" | "bounce" | "none";

export const iconMotionClass: Record<Exclude<IconMotion, "auto">, string> = {
  push: "", // handled by parent hover on leading/trailing axis
  pop: "icon-motion-pop",
  rotate: "icon-motion-rotate",
  bounce: "icon-motion-bounce",
  none: "",
};
