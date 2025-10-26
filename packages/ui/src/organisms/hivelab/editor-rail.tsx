// Bounded Context Owner: HiveLab Guild
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { brand } from "@/brand/classnames";
import { Button } from "@/atoms/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/molecules/tabs";
import { PropertiesPanel } from "./properties-panel";
import type { PropertiesPanelProps } from "./properties-panel";
import type { ElementDefinition } from "./element-registry";

export type EditorElementTone = "primary" | "neutral" | "warning";

export interface EditorElementDescriptor {
  readonly id: string;
  readonly label: string;
  readonly description?: string;
  readonly tone?: EditorElementTone;
}

export interface EditorRailProps extends HTMLAttributes<HTMLDivElement> {
  readonly defaultTab?: "elements" | "properties" | "history";
  readonly elements?: readonly EditorElementDescriptor[];
  readonly onAddElement?: (id: string) => void;
  readonly propertiesPanelProps?: PropertiesPanelProps;
  readonly showHistory?: boolean;
  readonly recommendedElementIds?: readonly string[];
  readonly elementDefinitions?: readonly ElementDefinition[]; // optional override for registry-based rendering
}

const TONE_CLASS: Record<EditorElementTone, string> = {
  primary: "border-primary/40 bg-primary/10",
  neutral: "border-border/40 bg-muted/20",
  warning: "border-warning/40 bg-warning/12",
};

export function EditorRail({
  defaultTab = "elements",
  elements = [],
  onAddElement,
  propertiesPanelProps,
  showHistory = false,
  recommendedElementIds = [],
  elementDefinitions,
  className,
  ...props
}: EditorRailProps) {
  const hasProperties = Boolean(propertiesPanelProps);
  const recommended = new Set(recommendedElementIds);

  return (
    <aside className={cn("w-full max-w-[420px] shrink-0", className)} {...props}>
      <div className={cn(brand.surface.bento(), "rounded-3xl border border-[hsl(var(--border)/0.45)] bg-[hsl(var(--background)/0.95)] p-2 shadow-xl")}
           role="region" aria-label="Tool editor rail">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="elements">Elements</TabsTrigger>
            {hasProperties ? <TabsTrigger value="properties">Properties</TabsTrigger> : null}
            {showHistory ? <TabsTrigger value="history">History</TabsTrigger> : null}
          </TabsList>

          <TabsContent value="elements" className="mt-3 space-y-3">
            {elements.length === 0 && !elementDefinitions ? (
              <div className="rounded-2xl border border-dashed border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.8)] p-6 text-center text-muted-foreground/75">
                No elements available.
              </div>
            ) : (
              <div className="space-y-6">
                {elementDefinitions ? (
                  <div className="space-y-3">
                    {recommended.size > 0 ? (
                      <div>
                        <div className="mb-2 text-body-xs font-body-xs uppercase tracking-[0.18em] text-muted-foreground/70">Recommended</div>
                        <ul className="space-y-2">
                          {elementDefinitions.filter(d => recommended.has(d.id)).map(def => (
                            <li key={def.id} className={cn("flex items-center justify-between gap-3 rounded-2xl border px-4 py-3", TONE_CLASS[(def.tone ?? "neutral") as EditorElementTone]) }>
                              <div>
                                <div className="text-body-sm font-medium text-foreground">{def.name}</div>
                                <div className="text-body-xs font-body-xs text-muted-foreground/75">{def.description}</div>
                              </div>
                              {onAddElement ? <Button size="sm" variant="outline" onClick={() => onAddElement(def.id)}>Add</Button> : null}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    <div>
                      <div className="mb-2 text-body-xs font-body-xs uppercase tracking-[0.18em] text-muted-foreground/70">All elements</div>
                      <ul className="space-y-2">
                        {elementDefinitions.filter(d => !recommended.has(d.id)).map(def => (
                          <li key={def.id} className={cn("flex items-center justify-between gap-3 rounded-2xl border px-4 py-3", TONE_CLASS[(def.tone ?? "neutral") as EditorElementTone]) }>
                            <div>
                              <div className="text-body-sm font-medium text-foreground">{def.name}</div>
                              <div className="text-body-xs font-body-xs text-muted-foreground/75">{def.description}</div>
                            </div>
                            {onAddElement ? <Button size="sm" variant="outline" onClick={() => onAddElement(def.id)}>Add</Button> : null}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {elements.map((el) => (
                      <li key={el.id} className={cn("flex items-center justify-between gap-3 rounded-2xl border px-4 py-3", TONE_CLASS[el.tone ?? "neutral"]) }>
                        <div>
                          <div className="text-body-sm font-medium text-foreground">{el.label}</div>
                          {el.description ? (
                            <div className="text-body-xs font-body-xs text-muted-foreground/75">{el.description}</div>
                          ) : null}
                        </div>
                        {onAddElement ? (
                          <Button size="sm" variant="outline" onClick={() => onAddElement(el.id)}>
                            Add
                          </Button>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </TabsContent>

          {hasProperties ? (
            <TabsContent value="properties" className="mt-3">
              <PropertiesPanel {...(propertiesPanelProps as PropertiesPanelProps)} />
            </TabsContent>
          ) : null}

          {showHistory ? (
            <TabsContent value="history" className="mt-3">
              <div className="rounded-2xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.9)] p-4 text-body-sm font-body-sm text-muted-foreground/80">
                Version history coming soon.
              </div>
            </TabsContent>
          ) : null}
        </Tabs>
      </div>
    </aside>
  );
}
