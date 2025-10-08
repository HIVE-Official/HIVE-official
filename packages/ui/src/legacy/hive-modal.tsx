"use client";

import * as React from "react";
import type { DialogProps } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogHeader as ShadDialogHeader,
  DialogFooter as ShadDialogFooter,
  DialogTitle as ShadDialogTitle,
  DialogDescription as ShadDialogDescription,
} from "../atomic/atoms/dialog";
import { cn } from "../lib/utils";

type HiveModalProps = DialogProps & {
  className?: string;
};

export const HiveModal: React.FC<HiveModalProps> = ({ children, className: _className, ...props }) => {
  return <Dialog {...props}>{children}</Dialog>;
};

export const HiveModalContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, ...props }, ref) => (
  <DialogContent
    ref={ref}
    className={cn(
      "bg-[#0F0F10] text-white border border-white/10/\[0.6\] shadow-xl shadow-black/20 backdrop-blur-xl",
      "sm:max-w-xl",
      className
    )}
    {...props}
  />
));
HiveModalContent.displayName = "HiveModalContent";

export const HiveModalHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <ShadDialogHeader
    className={cn("space-y-2 border-b border-white/10 pb-4 text-left", className)}
    {...props}
  />
);

export const HiveModalFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <ShadDialogFooter
    className={cn("flex-col-reverse gap-2 pt-4 sm:flex-row sm:justify-end", className)}
    {...props}
  />
);

export const HiveModalTitle = React.forwardRef<
  React.ElementRef<typeof ShadDialogTitle>,
  React.ComponentPropsWithoutRef<typeof ShadDialogTitle>
>(({ className, ...props }, ref) => (
  <ShadDialogTitle
    ref={ref}
    className={cn("text-lg font-semibold tracking-tight", className)}
    {...props}
  />
));
HiveModalTitle.displayName = "HiveModalTitle";

export const HiveModalDescription = React.forwardRef<
  React.ElementRef<typeof ShadDialogDescription>,
  React.ComponentPropsWithoutRef<typeof ShadDialogDescription>
>(({ className, ...props }, ref) => (
  <ShadDialogDescription
    ref={ref}
    className={cn("text-sm text-white/70", className)}
    {...props}
  />
));
HiveModalDescription.displayName = "HiveModalDescription";
