"use client";
import * as React from "react";
import { cn } from "@/utils/cn";

export interface MeteorShowerProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  minDelay?: number;
  maxDelay?: number;
  minDuration?: number;
  maxDuration?: number;
}

const randomInRange = (min: number, max: number): number => Math.random() * (max - min) + min;

type CSSVarStyle = React.CSSProperties & Record<string, string | number>;

export function MeteorShower({
  count = 6,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 6,
  className,
  children,
  ...rest
}: MeteorShowerProps) {
  const meteors = React.useMemo(() => {
    return Array.from({ length: count }).map((_, index) => ({
      delay: randomInRange(minDelay, maxDelay),
      duration: randomInRange(minDuration, maxDuration),
      offsetY: randomInRange(0, 100),
      key: `meteor-${index}-${Math.round(Math.random() * 9999)}`
    }));
  }, [count, minDelay, maxDelay, minDuration, maxDuration]);

  return (
    <div className={cn("meteor-field", className)} {...rest}>
      {meteors.map(({ delay, duration, offsetY, key }) => {
        const style: CSSVarStyle = {
          top: `${offsetY}%`,
          right: `${randomInRange(-10, 10)}%`
        };
        style["--meteor-delay"] = `${delay}s`;
        style["--meteor-duration"] = `${duration}s`;
        return <div key={key} className="meteor" style={style} />;
      })}
      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
}
