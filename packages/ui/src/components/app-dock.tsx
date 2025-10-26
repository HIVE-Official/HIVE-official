"use client";

import * as React from "react";
import { cn } from "@/utils/cn";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/molecules/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import "./app-dock.css";

type DockTab = "chat" | "context" | "widgets";

export type AppDockProps = {
  /** Current route for per-route tab persistence */
  pathname?: string;
  /** Start open on mount */
  defaultOpen?: boolean;
  className?: string;
};

type DockContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  tab: DockTab;
  setTab: (t: DockTab) => void;
  width: number;
  setWidth: (px: number) => void;
};

const DockContext = React.createContext<DockContextValue | null>(null);
export function useDock(): DockContextValue {
  const ctx = React.useContext(DockContext);
  if (!ctx) throw new Error("useDock must be used within <AppDock>");
  return ctx;
}

export function AppDock({ pathname = "/", defaultOpen = false, className }: AppDockProps): JSX.Element {
  const isMobile = useIsMobile();
  const storageKey = `dock:${pathname}`;

  const [open, setOpen] = React.useState(defaultOpen);
  const [tab, setTab] = React.useState<DockTab>(() => {
    if (typeof window === "undefined") return "chat";
    const saved = window.localStorage.getItem(storageKey);
    return (saved as DockTab) || "chat";
  });
  const [width, setWidth] = React.useState<number>(() => {
    if (typeof window === "undefined") return 384;
    const saved = parseInt(window.localStorage.getItem("dock:w") || "384", 10);
    return Number.isFinite(saved) ? saved : 384;
  });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(storageKey, tab);
  }, [tab, storageKey]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const clamped = Math.max(320, Math.min(480, width));
    document.documentElement.style.setProperty("--dock-w", `${clamped}px`);
    window.localStorage.setItem("dock:w", String(clamped));
  }, [width]);

  // Hotkeys
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      // Toggle dock
      if (meta && e.key === ".") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // Shift+. → Chat tab and open
      if (meta && e.shiftKey && e.key === ".") {
        e.preventDefault();
        setTab("chat");
        setOpen(true);
        return;
      }
      // Resize: Alt [ / Alt ]
      if (e.altKey && (e.key === "[" || e.key === "]")) {
        e.preventDefault();
        setWidth((w) => {
          const step = e.key === "]" ? 16 : -16;
          return Math.max(320, Math.min(480, w + step));
        });
        return;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Drag to resize (desktop only)
  const onResizerMouseDown = React.useCallback((e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    const startX = e.clientX;
    const startW = width;
    const onMove = (ev: MouseEvent) => {
      const delta = startX - ev.clientX;
      const next = Math.max(320, Math.min(480, startW + delta));
      setWidth(next);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [isMobile, width]);

  const ctx: DockContextValue = React.useMemo(() => ({ open, setOpen, tab, setTab, width, setWidth }), [open, tab, width]);

  if (isMobile) {
    return (
      <DockContext.Provider value={ctx}>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-[88vw] glass-float p-0" aria-label="Assistant and Context">
            <SheetHeader className="sr-only">
              <SheetTitle>Dock</SheetTitle>
            </SheetHeader>
            <Tabs value={tab} onValueChange={(v) => setTab(v as DockTab)} className="flex h-full flex-col">
              <TabsList className="sticky top-0 z-10 border-b border-border/60 bg-background/60 backdrop-blur">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="context">Context</TabsTrigger>
                <TabsTrigger value="widgets">Widgets</TabsTrigger>
              </TabsList>
              <TabsContent value="chat" className="flex-1 overflow-y-auto p-4">Coming soon — Assistant</TabsContent>
              <TabsContent value="context" className="flex-1 overflow-y-auto p-4">Route context</TabsContent>
              <TabsContent value="widgets" className="flex-1 overflow-y-auto p-4">Glance widgets</TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      </DockContext.Provider>
    );
  }

  return (
    <DockContext.Provider value={ctx}>
      <div className={cn("dock-root pointer-events-none fixed inset-y-0 right-0 z-30")}
        style={{
          // SSR-safe initial
          // @ts-expect-error custom var ok
          "--dock-w": `${width}px`
        }}
      >
        <aside
          aria-label="Assistant and Context"
          data-state={open ? "open" : "closed"}
          className={cn("dock-panel glass-float pointer-events-auto h-full border-l border-border shadow-level2", className)}
          style={{ width }}
        >
          <div className="dock-resizer" onMouseDown={onResizerMouseDown} aria-hidden="true" />
          <Tabs value={tab} onValueChange={(v) => setTab(v as DockTab)} className="flex h-full flex-col">
            <TabsList className="sticky top-0 z-10 border-b border-border/60 bg-background/60 backdrop-blur">
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="context">Context</TabsTrigger>
              <TabsTrigger value="widgets">Widgets</TabsTrigger>
            </TabsList>
            <TabsContent value="chat" className="flex-1 overflow-y-auto p-4">Coming soon — Assistant</TabsContent>
            <TabsContent value="context" className="flex-1 overflow-y-auto p-4">Route context</TabsContent>
            <TabsContent value="widgets" className="flex-1 overflow-y-auto p-4">Glance widgets</TabsContent>
          </Tabs>
        </aside>
      </div>
    </DockContext.Provider>
  );
}

export default AppDock;

