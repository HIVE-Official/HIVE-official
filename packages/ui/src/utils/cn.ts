// Bounded Context Owner: Identity & Access Management Guild
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...classes: ClassValue[]): string => twMerge(clsx(...classes));
