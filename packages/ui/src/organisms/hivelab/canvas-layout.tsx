"use client";
// Bounded Context Owner: HiveLab Guild
// Canvas layout that reserves safe insets when rails are shown so content never overlaps.
import React, { useEffect, useMemo, useState } from "react";
import { BrandCanvas } from "./brand-canvas";
import { CanvasRail, type CanvasRailProps } from "./canvas-rail";

const pickResponsiveRailWidth = (vw: number): number => {
  if (vw >= 1536) return 304; // xl+
  if (vw >= 1280) return 272; // lg
  if (vw >= 1140) return 248; // mid
  return 232; // compact
};

export function useRailWidth(): number {
  const [vw, setVw] = useState<number>(typeof window === "undefined" ? 1440 : window.innerWidth);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return useMemo(() => pickResponsiveRailWidth(vw), [vw]);
}

export interface CanvasLayoutProps {
  readonly showLeft?: boolean;
  readonly showRight?: boolean;
  readonly leftRail?: Omit<CanvasRailProps, "side">;
  readonly rightRail?: Omit<CanvasRailProps, "side">;
  readonly leftSlot?: React.ReactNode; // custom rail node (overrides leftRail props)
  readonly rightSlot?: React.ReactNode; // custom rail node (overrides rightRail props)
  readonly children?: React.ReactNode;
  readonly contentGutter?: number; // extra px buffer between rail and content
}

export function CanvasLayout({
  showLeft = false,
  showRight = false,
  leftRail,
  rightRail,
  leftSlot,
  rightSlot,
  children,
  contentGutter = 16
}: CanvasLayoutProps) {
  const railWidth = useRailWidth();
  const padLeft = showLeft ? railWidth + contentGutter : 0;
  const padRight = showRight ? railWidth + contentGutter : 0;

  return (
    <BrandCanvas>
      {showLeft ? (
        leftSlot ? (
          <>{leftSlot}</>
        ) : (
          <CanvasRail side="left" title={leftRail?.title} className={leftRail?.className}>
            {leftRail?.children}
          </CanvasRail>
        )
      ) : null}

      {showRight ? (
        rightSlot ? (
          <>{rightSlot}</>
        ) : (
          <CanvasRail side="right" title={rightRail?.title} className={rightRail?.className}>
            {rightRail?.children}
          </CanvasRail>
        )
      ) : null}

      <div
        style={{ paddingLeft: `${padLeft}px`, paddingRight: `${padRight}px` }}
        className="relative z-[5] flex min-h-[560px] flex-col gap-6"
      >
        {children}
      </div>
    </BrandCanvas>
  );
}
