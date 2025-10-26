"use client";
// Bounded Context Owner: HiveLab Guild
import type {
  CSSProperties,
  HTMLAttributes,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  WheelEvent as ReactWheelEvent,
} from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/utils/cn";

export interface BuilderCanvasTransform {
  readonly scale: number;
  readonly translateX: number;
  readonly translateY: number;
}

export interface BuilderCanvasProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Initial scale applied to the canvas content.
   * Defaults to 1.
   */
  readonly initialScale?: number;
  /**
   * Minimum scale allowed when zooming.
   * Defaults to 0.25.
   */
  readonly minScale?: number;
  /**
   * Maximum scale allowed when zooming.
   * Defaults to 3.
   */
  readonly maxScale?: number;
  /**
   * Size of the grid in canvas units (pixels before scale multiplier).
   * Defaults to 96.
   */
  readonly gridSize?: number;
  /**
   * Sets the initial translate offset (in pixels).
   * Defaults to { x: 0, y: 0 }.
   */
  readonly initialTranslate?: { readonly x: number; readonly y: number };
  /**
   * Center the canvas on mount based on the container dimensions.
   * Useful when rendering full screen canvases.
   */
  readonly centerOnMount?: boolean;
  /**
   * Renders an overlay above the canvas content (e.g. HUD, rulers).
   */
  readonly overlay?: ReactNode;
  /**
   * Called whenever the transform changes due to pan/zoom.
   */
  readonly onTransformChange?: (transform: BuilderCanvasTransform) => void;
  /**
   * Display crosshair indicators for the canvas origin.
   */
  readonly showOrigin?: boolean;
  /**
   * Visual theme for the canvas background.
   * Defaults to "noir" which uses a pitch-black gradient treatment.
   */
  readonly palette?: "default" | "noir";
  /**
   * Children are rendered inside the canvas plane and inherit transforms.
   */
  readonly children?: ReactNode;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function BuilderCanvas({
  initialScale = 1,
  minScale = 0.25,
  maxScale = 3,
  gridSize = 96,
  initialTranslate = { x: 0, y: 0 },
  centerOnMount = true,
  overlay,
  onTransformChange,
  showOrigin = true,
  palette = "default",
  className,
  children,
  ...props
}: BuilderCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(initialScale);
  const [translation, setTranslation] = useState(() => ({
    x: initialTranslate.x,
    y: initialTranslate.y,
  }));
  const [isPanning, setIsPanning] = useState(false);
  const pointerState = useRef<{
    readonly id: number;
    readonly startX: number;
    readonly startY: number;
    readonly originX: number;
    readonly originY: number;
  } | null>(null);

  useEffect(() => {
    if (!centerOnMount || !containerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    setTranslation((current) => ({
      x: current.x + rect.width / 2,
      y: current.y + rect.height / 2,
    }));
  }, [centerOnMount]);

  useEffect(() => {
    onTransformChange?.({ scale, translateX: translation.x, translateY: translation.y });
  }, [onTransformChange, scale, translation.x, translation.y]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.button !== 1) {
      return;
    }
    const target = event.currentTarget;
    pointerState.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: translation.x,
      originY: translation.y,
    };
    setIsPanning(true);
    target.setPointerCapture(event.pointerId);
  }, [translation.x, translation.y]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerState.current || pointerState.current.id !== event.pointerId) {
      return;
    }
    event.preventDefault();
    const deltaX = event.clientX - pointerState.current.startX;
    const deltaY = event.clientY - pointerState.current.startY;
    setTranslation({
      x: pointerState.current.originX + deltaX,
      y: pointerState.current.originY + deltaY,
    });
  }, []);

  const endPan = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerState.current || pointerState.current.id !== event.pointerId) {
      return;
    }
    event.currentTarget.releasePointerCapture(event.pointerId);
    pointerState.current = null;
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback((event: ReactWheelEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      const zoomIntensity = event.deltaY > 0 ? 1 / 1.08 : 1.08;
      const prospectiveScale = clamp(scale * zoomIntensity, minScale, maxScale);
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;
      const worldX = (offsetX - translation.x) / scale;
      const worldY = (offsetY - translation.y) / scale;
      setScale(prospectiveScale);
      setTranslation({
        x: offsetX - worldX * prospectiveScale,
        y: offsetY - worldY * prospectiveScale,
      });
      return;
    }

    const nextTranslation = {
      x: translation.x - event.deltaX,
      y: translation.y - event.deltaY,
    };
    setTranslation(nextTranslation);
  }, [maxScale, minScale, scale, translation.x, translation.y]);

  const gridStyles = useMemo<CSSProperties>(() => {
    const scaledGridSize = Math.max(gridSize * scale, 8);
    const gridColor =
      palette === "noir" ? "hsl(var(--muted-foreground) / 0.08)" : "hsl(var(--border) / 0.35)";
    const boldGridColor =
      palette === "noir" ? "hsl(var(--muted-foreground) / 0.18)" : "hsl(var(--border) / 0.45)";
    return {
      backgroundImage: [
        `linear-gradient(to right, ${gridColor} 1px, transparent 1px)`,
        `linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
        `linear-gradient(to right, ${boldGridColor} 1px, transparent 1px)`,
        `linear-gradient(to bottom, ${boldGridColor} 1px, transparent 1px)`,
      ].join(", "),
      backgroundSize: `${scaledGridSize}px ${scaledGridSize}px, ${scaledGridSize}px ${scaledGridSize}px, ${scaledGridSize * 4}px ${scaledGridSize * 4}px, ${scaledGridSize * 4}px ${scaledGridSize * 4}px`,
      backgroundPosition: `${translation.x}px ${translation.y}px, ${translation.x}px ${translation.y}px, ${translation.x}px ${translation.y}px, ${translation.x}px ${translation.y}px`,
    };
  }, [gridSize, palette, scale, translation.x, translation.y]);

  const contentTransform = useMemo(() => ({
    transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`,
    transformOrigin: "0 0",
  }), [scale, translation.x, translation.y]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate flex h-full w-full touch-none select-none overflow-hidden text-foreground",
        palette === "noir"
          ? "bg-[hsl(var(--background)/0.9)] text-foreground"
          : "bg-[hsl(var(--background))]",
        isPanning ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endPan}
      onPointerLeave={endPan}
      onWheel={handleWheel}
      role="region"
      aria-label="HiveLab builder canvas"
      {...props}
    >
      <div className="absolute inset-0" style={gridStyles} />

      {palette === "noir" ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(1200px at 40% 35%, hsl(var(--primary) / 0.12), transparent 60%), radial-gradient(900px at 80% 20%, hsl(var(--muted-foreground) / 0.12), transparent 65%)",
          }}
          aria-hidden
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            palette === "noir"
              ? "radial-gradient(circle at center, hsl(var(--primary) / 0.08) 0, transparent 45%)"
              : "radial-gradient(circle at center, hsl(var(--primary) / 0.08) 0, transparent 45%)",
        }}
        aria-hidden
      />

      {showOrigin ? (
        <div
          className="pointer-events-none absolute left-0 top-0"
          style={contentTransform}
          aria-hidden
        >
          <div
            className={cn(
              "absolute left-[-4000px] top-0 h-px w-[8000px]",
              palette === "noir" ? "bg-[hsl(var(--primary) / 0.18)]" : "bg-[hsl(var(--primary) / 0.18)]"
            )}
          />
          <div
            className={cn(
              "absolute left-0 top-[-4000px] h-[8000px] w-px",
              palette === "noir" ? "bg-[hsl(var(--primary) / 0.18)]" : "bg-[hsl(var(--primary) / 0.18)]"
            )}
          />
          <div
            className={cn(
              "absolute left-[-2px] top-[-2px] h-4 w-4 rounded-full border shadow-[0_0_0_1px_hsl(var(--primary)/0.3)]",
              palette === "noir"
                ? "border-[hsl(var(--primary) / 0.45)] bg-[hsl(var(--background)/0.85)]"
                : "border-[hsl(var(--primary) / 0.45)] bg-[hsl(var(--background))]"
            )}
          />
        </div>
      ) : null}

      <div
        className="absolute left-0 top-0 h-full w-full"
        style={contentTransform}
      >
        <div className="pointer-events-auto relative">
          {children}
        </div>
      </div>

      {overlay ? (
        <div className="pointer-events-none absolute inset-0">{overlay}</div>
      ) : null}
    </div>
  );
}
