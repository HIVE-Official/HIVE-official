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

export type FlowTone = "primary" | "neutral" | "warning";

export interface FlowNodeView {
  readonly id: string;
  readonly x: number; // world coords
  readonly y: number; // world coords
  readonly label: string;
  readonly description?: string;
  readonly tone?: FlowTone;
}

export interface FlowEdgeView {
  readonly id: string;
  readonly from: string; // node id
  readonly to: string; // node id
  readonly label?: string;
}

export interface FlowCanvasTransform {
  readonly scale: number;
  readonly translateX: number;
  readonly translateY: number;
}

export interface FlowCanvasProps extends HTMLAttributes<HTMLDivElement> {
  readonly nodes: readonly FlowNodeView[];
  readonly edges?: readonly FlowEdgeView[];
  readonly selectedId?: string | null;
  readonly onSelectNode?: (id: string | null) => void;
  readonly onMoveNode?: (id: string, x: number, y: number) => void;
  readonly onConnectEdge?: (fromId: string, toId: string) => void;
  readonly onTransformChange?: (t: FlowCanvasTransform) => void;
  readonly readOnly?: boolean;
  readonly gridSize?: number;
  readonly palette?: "default" | "noir";
  readonly layout?: "grid" | "swimlanes";
  readonly lanes?: readonly { id: string; label: string; order: number }[];
  readonly snapToGrid?: boolean;
  readonly minimap?: boolean;
  readonly overlay?: ReactNode;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

export function FlowCanvas({
  nodes,
  edges = [],
  selectedId = null,
  onSelectNode,
  onMoveNode,
  onConnectEdge,
  onTransformChange,
  readOnly = false,
  gridSize = 96,
  palette = "default",
  layout = "grid",
  lanes = [
    { id: "trigger", label: "Trigger", order: 0 },
    { id: "logic", label: "Logic", order: 1 },
    { id: "output", label: "Output", order: 2 },
  ],
  snapToGrid = true,
  minimap = true,
  overlay,
  className,
  ...props
}: FlowCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.9);
  const [translation, setTranslation] = useState({ x: 480, y: 320 });
  const [isPanning, setIsPanning] = useState(false);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [pendingDrag, setPendingDrag] = useState<{ id: string; startX: number; startY: number } | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [pointerWorld, setPointerWorld] = useState<{ x: number; y: number } | null>(null);
  const [guideX, setGuideX] = useState<number | null>(null);
  const [guideY, setGuideY] = useState<number | null>(null);
  const [hudVisible, setHudVisible] = useState(false);
  const hudTimer = useRef<number | null>(null);

  const pointerState = useRef<{
    readonly id: number;
    readonly startX: number;
    readonly startY: number;
    readonly originX: number;
    readonly originY: number;
    readonly nodeWorldX?: number;
    readonly nodeWorldY?: number;
  } | null>(null);

  useEffect(() => {
    onTransformChange?.({ scale, translateX: translation.x, translateY: translation.y });
    // HUD visibility timer
    if (hudTimer.current) window.clearTimeout(hudTimer.current);
    setHudVisible(true);
    hudTimer.current = window.setTimeout(() => setHudVisible(false), 900);
  }, [onTransformChange, scale, translation.x, translation.y]);

  const clientToWorld = useCallback((clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const x = (clientX - rect.left - translation.x) / scale;
    const y = (clientY - rect.top - translation.y) / scale;
    return { x, y };
  }, [scale, translation.x, translation.y]);

  const handleBackgroundPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.button !== 1) return;
    const target = e.currentTarget;
    pointerState.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: translation.x,
      originY: translation.y,
    };
    setIsPanning(true);
    onSelectNode?.(null);
    target.setPointerCapture(e.pointerId);
  }, [onSelectNode, translation.x, translation.y]);

  const handleBackgroundPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerState.current || pointerState.current.id !== e.pointerId || !isPanning) return;
    e.preventDefault();
    const dx = e.clientX - pointerState.current.startX;
    const dy = e.clientY - pointerState.current.startY;
    setTranslation({ x: pointerState.current.originX + dx, y: pointerState.current.originY + dy });
    setPointerWorld(clientToWorld(e.clientX, e.clientY));
  }, [clientToWorld, isPanning]);

  const endPan = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!pointerState.current || pointerState.current.id !== e.pointerId) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    pointerState.current = null;
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback((e: ReactWheelEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const next = clamp(scale * (e.deltaY > 0 ? 1 / 1.08 : 1.08), 0.35, 2.2);
      const rect = containerRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const worldX = (offsetX - translation.x) / scale;
      const worldY = (offsetY - translation.y) / scale;
      setScale(next);
      setTranslation({ x: offsetX - worldX * next, y: offsetY - worldY * next });
      return;
    }
    setTranslation({ x: translation.x - e.deltaX, y: translation.y - e.deltaY });
    setPointerWorld(clientToWorld(e.clientX, e.clientY));
  }, [clientToWorld, scale, translation.x, translation.y]);

  const onNodePointerDown = useCallback((e: ReactPointerEvent<HTMLButtonElement>, id: string, nodeX: number, nodeY: number) => {
    e.stopPropagation();
    onSelectNode?.(id);
    if (readOnly) return;
    const target = e.currentTarget;
    const worldX = nodeX;
    const worldY = nodeY;
    pointerState.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: translation.x,
      originY: translation.y,
      nodeWorldX: worldX,
      nodeWorldY: worldY,
    };
    setPendingDrag({ id, startX: e.clientX, startY: e.clientY });
    target.setPointerCapture(e.pointerId);
  }, [onSelectNode, readOnly, translation.x, translation.y]);

  const onNodePointerMove = useCallback((e: ReactPointerEvent<HTMLButtonElement>, id: string) => {
    if (!pointerState.current || pointerState.current.id !== e.pointerId) return;
    // Start threshold to avoid accidental drags
    if (pendingDrag && pendingDrag.id === id && !draggingId) {
      const th = Math.hypot(e.clientX - pendingDrag.startX, e.clientY - pendingDrag.startY);
      if (th < 4) return; // not enough movement
      setDraggingId(id);
      setPendingDrag(null);
    }
    if (draggingId !== id) return;
    e.preventDefault();
    const dx = (e.clientX - pointerState.current.startX) / scale;
    const dy = (e.clientY - pointerState.current.startY) / scale;
    let x = (pointerState.current.nodeWorldX ?? 0) + dx;
    let y = (pointerState.current.nodeWorldY ?? 0) + dy;
    // Snap to grid
    if (snapToGrid) {
      const g = 8;
      x = Math.round(x / g) * g;
      y = Math.round(y / g) * g;
    }
    // Snap to swimlane centers when layout is swimlanes
    if (layout === "swimlanes") {
      const laneHeight = 160; // tokenized visual lane height
      const nearest = Math.round(y / laneHeight) * laneHeight;
      if (Math.abs(nearest - y) <= 12) y = nearest;
    }
    // Simple guide detection against other node centers
    let gx: number | null = null;
    let gy: number | null = null;
    for (const n of nodes) {
      if (n.id === id) continue;
      if (Math.abs(n.x - x) <= 8) gx = n.x;
      if (Math.abs(n.y - y) <= 8) gy = n.y;
    }
    setGuideX(gx);
    setGuideY(gy);

    onMoveNode?.(id, gx ?? x, gy ?? y);
    setPointerWorld(clientToWorld(e.clientX, e.clientY));
  }, [clientToWorld, draggingId, layout, nodes, onMoveNode, pendingDrag, scale, snapToGrid]);

  const onNodePointerUp = useCallback((e: ReactPointerEvent<HTMLButtonElement>) => {
    if (!pointerState.current || pointerState.current.id !== e.pointerId) return;
    e.currentTarget.releasePointerCapture(e.pointerId);
    setDraggingId(null);
    setPendingDrag(null);
    setGuideX(null);
    setGuideY(null);
    pointerState.current = null;
  }, []);

  const gridStyles = useMemo<CSSProperties>(() => {
    const s = Math.max(gridSize * scale, 8);
    const gridColor = palette === "noir" ? "hsl(var(--muted-foreground) / 0.08)" : "hsl(var(--border) / 0.35)";
    const boldColor = palette === "noir" ? "hsl(var(--muted-foreground) / 0.18)" : "hsl(var(--border) / 0.45)";
    return {
      backgroundImage: [
        `linear-gradient(to right, ${gridColor} 1px, transparent 1px)`,
        `linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
        `linear-gradient(to right, ${boldColor} 1px, transparent 1px)`,
        `linear-gradient(to bottom, ${boldColor} 1px, transparent 1px)`,
      ].join(", "),
      backgroundSize: `${s}px ${s}px, ${s}px ${s}px, ${s * 4}px ${s * 4}px, ${s * 4}px ${s * 4}px`,
      backgroundPosition: `${translation.x}px ${translation.y}px, ${translation.x}px ${translation.y}px, ${translation.x}px ${translation.y}px, ${translation.x}px ${translation.y}px`,
    };
  }, [gridSize, palette, scale, translation.x, translation.y]);

  const worldToView = useCallback((x: number, y: number) => {
    return { left: translation.x + x * scale, top: translation.y + y * scale };
  }, [scale, translation.x, translation.y]);

  const toneClass: Record<FlowTone, string> = {
    primary: "border-primary/40 bg-gradient-to-br from-primary/25 via-primary/8 to-background/70 shadow-[0_18px_48px_-28px_hsl(var(--primary)/0.45)]",
    neutral: "border-border/35 bg-gradient-to-br from-border/20 via-border/8 to-background/70 shadow-[0_18px_48px_-28px_hsl(var(--muted-foreground)/0.35)]",
    warning: "border-warning/45 bg-gradient-to-br from-warning/25 via-warning/10 to-background/70 shadow-[0_18px_48px_-28px_hsl(var(--warning)/0.45)]",
  };

  const nodeContent = (node: FlowNodeView) => (
    <div
      className={cn(
        "flex w-72 flex-col gap-3 rounded-3xl border px-5 py-4 text-left backdrop-blur",
        toneClass[node.tone ?? "neutral"],
        selectedId === node.id ? "ring-2 ring-[hsl(var(--primary)/0.6)]" : undefined
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-title-sm font-title-sm text-foreground">{node.label}</h3>
        <span className="rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.6)] px-2 py-0.5 text-body-xs font-body-xs text-muted-foreground/70">
          Step
        </span>
      </div>
      {node.description ? (
        <p className="text-body-sm font-body-sm text-muted-foreground/85">{node.description}</p>
      ) : null}
      {/* Connect handles */}
      <div className="pointer-events-auto absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="block h-3 w-3 rounded-full border border-border/50 bg-background/80 shadow" />
      </div>
      <div
        className="pointer-events-auto absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
        onPointerDown={(e) => { e.stopPropagation(); setConnectingFrom(node.id); setPointerWorld(clientToWorld(e.clientX, e.clientY)); }}
      >
        <span className="block h-3 w-3 rounded-full border border-primary/50 bg-primary/20 shadow" />
      </div>
    </div>
  );

  const contentTransform = useMemo(() => ({
    transform: `translate(${translation.x}px, ${translation.y}px) scale(${scale})`,
    transformOrigin: "0 0",
  }), [scale, translation.x, translation.y]);

  const nodeById = useMemo(() => Object.fromEntries(nodes.map(n => [n.id, n])), [nodes]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative isolate flex h-full w-full touch-none select-none overflow-hidden text-foreground",
        palette === "noir" ? "bg-[hsl(var(--background))]" : "bg-[hsl(var(--background))]",
        isPanning ? "cursor-grabbing" : draggingId ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onPointerDown={handleBackgroundPointerDown}
      onPointerMove={handleBackgroundPointerMove}
      onPointerUp={endPan}
      onPointerLeave={endPan}
      onWheel={handleWheel}
      tabIndex={0}
      onKeyDown={(e) => {
        const meta = e.metaKey || e.ctrlKey;
        if (meta && e.key === '0') {
          // fit to nodes
          const rect = containerRef.current?.getBoundingClientRect();
          if (!rect || nodes.length === 0) return;
          const minX = Math.min(...nodes.map(n => n.x)) - 200;
          const minY = Math.min(...nodes.map(n => n.y)) - 200;
          const maxX = Math.max(...nodes.map(n => n.x)) + 200;
          const maxY = Math.max(...nodes.map(n => n.y)) + 200;
          const w = maxX - minX; const h = maxY - minY;
          const s = clamp(Math.min(rect.width / w, rect.height / h), 0.35, 2.2);
          setScale(s);
          setTranslation({ x: rect.width / 2 - (minX + w / 2) * s, y: rect.height / 2 - (minY + h / 2) * s });
          e.preventDefault();
        }
        if (meta && e.key === '1') {
          // 100%
          const rect = containerRef.current?.getBoundingClientRect(); if (!rect) return;
          setScale(1);
          setTranslation({ x: rect.width / 2, y: rect.height / 2 });
          e.preventDefault();
        }
        if (e.shiftKey && e.key === '2' && selectedId) {
          // zoom to selection
          const rect = containerRef.current?.getBoundingClientRect(); if (!rect) return;
          const n = nodes.find(n => n.id === selectedId); if (!n) return;
          const s = 1.2; setScale(s);
          setTranslation({ x: rect.width / 2 - n.x * s, y: rect.height / 2 - n.y * s });
          e.preventDefault();
        }
      }}
      role="region"
      aria-label="HiveLab flow canvas"
      {...props}
    >
      {/* Swimlanes */}
      {layout === "swimlanes" ? (
        <div className="absolute inset-0">
          {lanes.map((lane, idx) => {
            const laneHeight = 160;
            const top = idx * laneHeight + translation.y;
            return (
              <div key={lane.id} className="absolute left-0 w-full" style={{ top, height: laneHeight }} aria-label={`Lane ${lane.label}`}>
                <div className="absolute inset-0 border-y border-dashed border-[hsl(var(--border)/0.25)] bg-[hsl(var(--muted)/0.06)]" />
                <div className="absolute left-4 top-2 inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.8)] px-2.5 py-0.5 text-body-xs font-body-xs text-muted-foreground/75">
                  {lane.label}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
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

      {/* Edges */}
      <svg className="pointer-events-none absolute left-0 top-0 h-0 w-0" style={{ overflow: "visible" }} aria-hidden>
        <defs>
          <marker id="flow-arrow" viewBox="0 0 2 2" refX="1.55" refY="1" markerUnits="strokeWidth" markerWidth="4" markerHeight="3" orient="auto">
            <path d="M 0 0 L 2 1 L 0 2 z" fill="hsl(var(--primary) / 0.8)" />
          </marker>
        </defs>
        {edges.map((edge) => {
          const from = nodeById[edge.from];
          const to = nodeById[edge.to];
          if (!from || !to) return null;
          const fromPoint = worldToView(from.x + 144, from.y + 56);
          const toPoint = worldToView(to.x, to.y + 48);
          const c1 = worldToView(from.x + 240, from.y + 48);
          const c2 = worldToView(to.x - 120, to.y + 32);
          return (
            <g key={edge.id}>
              <path
                d={`M ${fromPoint.left} ${fromPoint.top} C ${c1.left} ${c1.top}, ${c2.left} ${c2.top}, ${toPoint.left} ${toPoint.top}`}
                fill="none"
                stroke="hsl(var(--primary) / 0.45)"
                strokeWidth={2}
                markerEnd="url(#flow-arrow)"
              />
              {edge.label ? (
                <text x={(fromPoint.left + toPoint.left) / 2} y={(fromPoint.top + toPoint.top) / 2} fill="hsl(var(--foreground) / 0.7)" className="text-[11px]">
                  {edge.label}
                </text>
              ) : null}
            </g>
          );
        })}
        {/* Temporary edge while connecting */}
        {connectingFrom && pointerWorld ? (
          <path
            d={`M ${worldToView((nodeById[connectingFrom]?.x ?? 0) + 144, (nodeById[connectingFrom]?.y ?? 0) + 56).left} ${worldToView((nodeById[connectingFrom]?.x ?? 0) + 144, (nodeById[connectingFrom]?.y ?? 0) + 56).top}
            C ${worldToView((nodeById[connectingFrom]?.x ?? 0) + 240, (nodeById[connectingFrom]?.y ?? 0) + 48).left} ${worldToView((nodeById[connectingFrom]?.x ?? 0) + 240, (nodeById[connectingFrom]?.y ?? 0) + 48).top},
              ${worldToView(pointerWorld.x - 120, pointerWorld.y + 32).left} ${worldToView(pointerWorld.x - 120, pointerWorld.y + 32).top},
              ${worldToView(pointerWorld.x, pointerWorld.y).left} ${worldToView(pointerWorld.x, pointerWorld.y).top}`}
            fill="none"
            stroke="hsl(var(--primary) / 0.35)"
            strokeWidth={2}
          />
        ) : null}
      </svg>

      {/* Nodes */}
      <div className="absolute left-0 top-0 h-full w-full" style={contentTransform}
           onPointerMove={(e) => { if (connectingFrom) { setPointerWorld(clientToWorld(e.clientX, e.clientY)); } }}
           onPointerUp={(e) => {
             if (!connectingFrom) return;
             const world = clientToWorld(e.clientX, e.clientY);
             // naive nearest target detection
             let targetId: string | null = null;
             let minD = Infinity;
             for (const n of nodes) {
               const d = Math.hypot(world.x - n.x, world.y - n.y);
               if (d < minD) { minD = d; targetId = n.id; }
             }
             if (targetId && targetId !== connectingFrom && minD < 120) {
               // finalize
               onConnectEdge?.(connectingFrom, targetId);
             }
             setConnectingFrom(null);
             setPointerWorld(null);
           }}
      >
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onPointerDown={(e) => onNodePointerDown(e, node.id, node.x, node.y)}
            onPointerMove={(e) => onNodePointerMove(e, node.id)}
            onPointerUp={onNodePointerUp}
            onClick={(e) => { e.stopPropagation(); onSelectNode?.(node.id); }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-3xl focus:outline-none"
            style={{ left: node.x, top: node.y }}
            aria-pressed={selectedId === node.id}
          >
            {nodeContent(node)}
          </button>
        ))}

        {/* Guides */}
        {draggingId && (guideX !== null || guideY !== null) ? (
          <div className="pointer-events-none absolute inset-0">
            {guideX !== null ? (
              <div className="absolute top-[-4000px] h-[8000px] w-px bg-[hsl(var(--primary)/0.25)]" style={{ left: guideX }} />
            ) : null}
            {guideY !== null ? (
              <div className="absolute left-[-4000px] w-[8000px] border-t border-[hsl(var(--primary)/0.25)]" style={{ top: guideY }} />
            ) : null}
          </div>
        ) : null}
      </div>

      {/* Minimap */}
      {minimap ? (
        <div className="pointer-events-none absolute bottom-3 right-3 rounded-xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.8)] p-2 text-[10px] text-muted-foreground/80 shadow">
          <span className="opacity-70">Minimap</span>
        </div>
      ) : null}

      {/* HUD */}
      {hudVisible ? (
        <div className="pointer-events-none absolute right-3 top-3 rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.85)] px-3 py-1.5 text-[11px] text-muted-foreground/85 shadow">
          {scale.toFixed(2)}× · X {Math.round(translation.x)} · Y {Math.round(translation.y)}
        </div>
      ) : null}

      {overlay ? <div className="pointer-events-none absolute inset-0">{overlay}</div> : null}
    </div>
  );
}
