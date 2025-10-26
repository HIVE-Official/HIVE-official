// Bounded Context Owner: Design System Guild
"use client";

import { Children, isValidElement, cloneElement } from "react";
import { motion, type Variants } from "framer-motion";
import { DUR, EASE } from "@hive/ui";

type StaggerProps = {
  readonly children: React.ReactNode;
  readonly delay?: number; // per-child
  readonly y?: number;
  readonly once?: boolean;
  readonly disabled?: boolean;
  readonly className?: string;
};

export function Stagger({ children, delay = 0.06, y = 12, once = true, disabled, className }: StaggerProps): JSX.Element {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: delay }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DUR.xl / 1000, ease: EASE.decel as any }
    }
  };

  const wrapped = Children.toArray(children).map((child, index) => {
    if (isValidElement(child)) {
      return (
        <motion.div key={index} variants={disabled ? undefined : item}>
          {cloneElement(child as any)}
        </motion.div>
      );
    }
    return (
      <motion.div key={index} variants={disabled ? undefined : item}>
        {child}
      </motion.div>
    );
  });

  return (
    <motion.div className={className} initial={disabled ? false : "hidden"} whileInView={disabled ? undefined : "visible"} viewport={disabled ? undefined : { once, margin: "-12% 0px -10% 0px" }} variants={disabled ? undefined : container}>
      {wrapped}
    </motion.div>
  );
}
