// Bounded Context Owner: HiveLab Guild
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { brand } from "@/brand/classnames";
import { Button } from "@/atoms/button";
import { BuilderCanvas } from "./builder-canvas";
import type { BuilderCanvasProps } from "./builder-canvas";
import { FlowCanvas } from "./flow-canvas";
import type { FlowCanvasProps } from "./flow-canvas";
import { ToolHeader } from "./tool-header";
import type { ToolHeaderProps } from "./tool-header";
import { PropertiesPanel } from "./properties-panel";
import type { PropertiesPanelProps } from "./properties-panel";
import { EditorRail } from "./editor-rail";
import type { EditorRailProps } from "./editor-rail";

export interface ToolEditorCanvasConfig {
  readonly canvasProps?: Omit<BuilderCanvasProps, "children" | "overlay">;
  readonly overlay?: ReactNode;
  readonly children?: ReactNode;
  readonly emptyState?: ReactNode;
  readonly statusBar?: ReactNode;
  readonly flow?: Omit<FlowCanvasProps, "className">;
}

export interface ToolEditorProps extends HTMLAttributes<HTMLDivElement> {
  readonly headerProps: ToolHeaderProps;
  readonly toolbar?: ReactNode;
  readonly leftRail?: ReactNode;
  readonly canvas: ToolEditorCanvasConfig;
  readonly propertiesPanelProps?: PropertiesPanelProps;
  readonly propertiesPanel?: ReactNode;
  readonly railProps?: EditorRailProps;
  readonly footer?: ReactNode;
  readonly layout?: "default" | "condensed";
  readonly onAddBlock?: () => void;
  readonly presentation?: "split" | "overlay"; // overlay keeps canvas full-bleed with rail/header floating
}

export function ToolEditor({
  headerProps,
  toolbar,
  leftRail,
  canvas,
  propertiesPanelProps,
  propertiesPanel,
  railProps,
  footer,
  className,
  layout = "default",
  onAddBlock,
  presentation = "split",
  ...props
}: ToolEditorProps) {
  const isCondensed = layout === "condensed";
  const mergedHeaderProps: ToolHeaderProps = {
    ...headerProps,
    variant: isCondensed ? "condensed" : headerProps.variant,
    showInlineActions: headerProps.showInlineActions ?? !isCondensed,
  };
  const { dirty, saving, onPreview, onSave, onPublish, onShare, status } = headerProps;
  const sidePanel = railProps
    ? <EditorRail {...railProps} />
    : propertiesPanel ?? (propertiesPanelProps ? <PropertiesPanel {...propertiesPanelProps} /> : null);
  const defaultStatusBar = (
    <>
      <span className="text-body-sm font-body-sm text-muted-foreground/80">
        {saving ? "Saving changes…" : dirty ? "Unsaved changes — publish when ready." : "Build your automation by adding the first block."}
      </span>
      {onAddBlock ? (
        <Button variant="outline" size="sm" onClick={onAddBlock}>
          Add block
        </Button>
      ) : null}
    </>
  );
  const statusBarContent =
    canvas.statusBar !== undefined ? canvas.statusBar : isCondensed ? defaultStatusBar : undefined;
  const showStatusBar = Boolean(statusBarContent);
  const showActionBar = isCondensed && (dirty || saving || onPreview || onSave || onPublish || onShare);
  const actionStateLabel = saving ? "Saving…" : dirty ? "Unsaved changes" : "All changes saved";

  return (
    <div
      className={cn("flex flex-col", isCondensed ? "gap-5" : "gap-6", className)}
      {...props}
    >
      <ToolHeader {...mergedHeaderProps} />

      <div className={cn(presentation === "split" ? "flex flex-col lg:flex-row" : "relative", isCondensed ? "gap-5" : "gap-6")}>
        {presentation === "split" && leftRail ? (
          <aside className="lg:w-[280px] lg:shrink-0">
            <div className="sticky top-6 space-y-4">{leftRail}</div>
          </aside>
        ) : null}

        <div className={cn("flex min-w-0 flex-1 flex-col", isCondensed ? "gap-3" : "gap-4")}> 
          {toolbar ? (
            <div
              className={cn(
                brand.surface.bento({ preview: !isCondensed }),
                "rounded-3xl border border-[hsl(var(--border)/0.45)] px-4 py-3",
                isCondensed ? "bg-[hsl(var(--background)/0.92)] shadow-sm" : "bg-[hsl(var(--background)/0.85)] shadow-sm"
              )}
            >
              {toolbar}
            </div>
          ) : null}

          <div
            className={cn(
              brand.surface.bento(isCondensed ? undefined : { preview: true }),
              "relative flex-1 overflow-hidden rounded-3xl border border-[hsl(var(--border)/0.45)]",
              isCondensed ? "min-h-[520px] bg-[hsl(var(--background)/0.96)] shadow-lg" : "min-h-[640px] bg-[hsl(var(--background))] shadow-xl"
            )}
          >
            {canvas.flow ? (
              <FlowCanvas {...canvas.flow} />
            ) : canvas.children ? (
              <BuilderCanvas {...canvas.canvasProps} overlay={canvas.overlay}>
                {canvas.children}
              </BuilderCanvas>
            ) : (
              canvas.emptyState ?? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground/75">
                  <p className="text-body-sm font-body-sm">Drop blocks into the canvas to start shaping your tool.</p>
                </div>
              )
            )}
          </div>

          {showStatusBar ? (
            <div
              className={cn(
                "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[hsl(var(--border)/0.35)] px-4 py-3",
                isCondensed
                  ? "bg-[hsl(var(--background)/0.92)] text-body-sm font-body-sm text-muted-foreground/80"
                  : "bg-[hsl(var(--background)/0.85)] text-body-sm font-body-sm text-muted-foreground/80"
              )}
            >
              {statusBarContent}
            </div>
          ) : null}
        </div>
        {presentation === "split" ? (
          sidePanel ? (
            <aside className="w-full max-w-[380px] shrink-0 lg:w-[360px]">
              <div className="sticky top-6">{sidePanel}</div>
            </aside>
          ) : null
        ) : null}

        {presentation === "overlay" && sidePanel ? (
          <div className="pointer-events-none absolute inset-0">
            <aside className="pointer-events-auto absolute right-0 top-0 m-4 w-[360px] max-w-[90vw]">
              <div className="rounded-3xl border border-[hsl(var(--border)/0.45)] bg-[hsl(var(--background)/0.95)] p-2 shadow-2xl backdrop-blur-md">
                {sidePanel}
              </div>
            </aside>
          </div>
        ) : null}
      </div>

      {showActionBar ? (
        <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[hsl(var(--border)/0.3)] bg-[hsl(var(--background)/0.97)] px-4 py-3 shadow-lg backdrop-blur">
          <span className="text-body-sm font-body-sm text-muted-foreground/85">{actionStateLabel}</span>
          <div className="flex flex-wrap items-center gap-2">
            {onPreview ? (
              <Button variant="ghost" size="sm" onClick={onPreview}>
                Preview
              </Button>
            ) : null}
            {onSave ? (
              <Button variant="outline" size="sm" onClick={onSave} disabled={saving}>
                Save draft
              </Button>
            ) : null}
            {onPublish ? (
              <Button size="sm" onClick={onPublish}>
                Publish
              </Button>
            ) : null}
            {onShare && status === "live" ? (
              <Button variant="ghost" size="sm" onClick={onShare}>
                Share
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      {footer ? (
        <div className={cn(brand.surface.bento({ preview: true }), "rounded-3xl border border-[hsl(var(--border)/0.4)] bg-[hsl(var(--background)/0.85)] px-4 py-3")}>
          {footer}
        </div>
      ) : null}
    </div>
  );
}
