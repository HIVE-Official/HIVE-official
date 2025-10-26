"use client";
import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "./use-reduced-motion";

export type TextAnimateVariant = "fade" | "fadeUp" | "blurUp";
export type TextAnimateSplit = "characters" | "words";

const PRESET_VARIANTS: Record<TextAnimateVariant, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    }
  },
  fadeUp: {
    hidden: { opacity: 0, y: "0.6em" },
    visible: {
      opacity: 1,
      y: "0em"
    }
  },
  blurUp: {
    hidden: { opacity: 0, y: "0.4em", filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: "0em",
      filter: "blur(0px)"
    }
  }
};

const normalizeText = (text?: string | number | null): string => {
  if (text === null || text === undefined) return "";
  return typeof text === "number" ? String(text) : text;
};

const splitContent = (content: string, splitBy: TextAnimateSplit): string[] => {
  if (!content) return [];
  if (splitBy === "words") {
    return content.split(/(\s+)/); // keep whitespace tokens so spacing is preserved
  }
  return Array.from(content); // characters (includes whitespace)
};

export interface TextAnimateProps extends Omit<React.ComponentProps<typeof motion.span>, "children"> {
  text?: string | number;
  splitBy?: TextAnimateSplit;
  animation?: TextAnimateVariant;
  stagger?: number;
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  once?: boolean;
  viewportAmount?: number;
  className?: string;
  children?: React.ReactNode;
}

export function TextAnimate({
  text,
  children,
  splitBy = "characters",
  animation = "fadeUp",
  stagger = 0.05,
  duration = 0.3,
  delay = 0,
  startOnView = false,
  once = true,
  viewportAmount = 0.6,
  className,
  ...rest
}: TextAnimateProps) {
  const reducedMotion = useReducedMotion();
  const content = React.useMemo(() => {
    if (text !== undefined && text !== null) return normalizeText(text);
    if (typeof children === "string" || typeof children === "number") {
      return normalizeText(children);
    }
    if (React.Children.count(children) === 1) {
      const only = React.Children.only(children);
      if (typeof only === "string" || typeof only === "number") {
        return normalizeText(only);
      }
    }
    return "";
  }, [text, children]);
  // Compute segments eagerly to avoid conditional hook calls
  const segments = React.useMemo(() => (content ? splitContent(content, splitBy) : []), [content, splitBy]);

  const preset = PRESET_VARIANTS[animation];

  const itemVariants: Variants = {
    hidden: preset.hidden,
    visible: {
      ...preset.visible,
      transition: {
        duration,
      },
    },
  };

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: stagger
      }
    }
  };

  const motionProps = startOnView
    ? { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once, amount: viewportAmount } }
    : { initial: "hidden" as const, animate: "visible" as const };

  if (!content) {
    return null;
  }

  if (reducedMotion) {
    return (
      <span className={className}>
        {content}
      </span>
    );
  }

  return (
    <motion.span
      className={cn("inline-flex flex-wrap align-baseline", className)}
      aria-label={content}
      role="text"
      variants={containerVariants}
      {...motionProps}
      {...rest}
    >
      {segments.map((segment, index) => (
        <motion.span
          aria-hidden="true"
          className="inline-block"
          key={`${segment}-${index}`}
          variants={itemVariants}
        >
          {segment === " " ? "\u00A0" : segment}
        </motion.span>
      ))}
    </motion.span>
  );
}
