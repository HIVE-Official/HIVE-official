// Bounded Context Owner: Design System Guild
// Motion & Depth tokens for Framer Motion and TS consumers

import { motion as motionTokens } from "@hive/tokens/tokens";

const parseMs = (value: string): number => Number.parseFloat(value.replace("ms", ""));

const parseBezier = (value: string): [number, number, number, number] => {
  const match = value.match(/cubic-bezier\(([^)]+)\)/i);
  if (!match) return [0.2, 0, 0, 1];
  const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
    return [0.2, 0, 0, 1];
  }
  return [parts[0], parts[1], parts[2], parts[3]] as [number, number, number, number];
};

const duration = motionTokens.duration;

export const DUR = {
  xs: parseMs(duration.micro),
  sm: parseMs(duration.rapid),
  md: parseMs(duration.swift),
  lg: parseMs(duration.smooth),
  xl: parseMs(duration.deliberate),
  instant: parseMs(duration.instant),
  micro: parseMs(duration.micro),
  rapid: parseMs(duration.rapid),
  swift: parseMs(duration.swift),
  smooth: parseMs(duration.smooth),
  deliberate: parseMs(duration.deliberate),
  linger: parseMs(duration.linger),
  textItem: parseMs(duration.textItem)
} as const;

export const EASE = {
  standard: parseBezier(motionTokens.easing.standard),
  decel: parseBezier(motionTokens.easing.decel),
  accel: parseBezier(motionTokens.easing.accel),
  entrance: parseBezier(motionTokens.easing.entrance),
  exit: parseBezier(motionTokens.easing.exit),
  emphasized: parseBezier(motionTokens.easing.emphasized)
} as const;

export const SPRING = motionTokens.spring;

export type EaseName = keyof typeof EASE;
export type SpringName = keyof typeof SPRING;
