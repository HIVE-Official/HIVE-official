// Bounded Context Owner: HiveLab Guild
import type { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";
import { brand } from "@/brand/classnames";
import { Input } from "@/atoms/input";
import { Textarea } from "@/atoms/textarea";
import { Switch } from "@/atoms/switch";
import { Button } from "@/atoms/button";

export interface ElementEditorField {
  readonly id: string;
  readonly label: string;
  readonly type: "text" | "textarea" | "boolean";
  readonly required?: boolean;
  readonly placeholder?: string;
}

export interface ElementEditorProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  readonly elementName: string;
  readonly version?: string;
  readonly fields: readonly ElementEditorField[];
  readonly values?: Record<string, unknown>;
  readonly onValueChange?: (id: string, value: unknown) => void;
  readonly onTest?: () => void;
}

export function ElementEditor({ elementName, version = "1.0.0", fields, values = {}, onValueChange, onTest, className, ...props }: ElementEditorProps) {
  return (
    <div className={cn(brand.surface.bento(), "rounded-3xl border border-[hsl(var(--border)/0.45)] bg-[hsl(var(--background)/0.95)] p-4 shadow-xl", className)} {...props}>
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-title-sm font-title-sm text-foreground">{elementName}</h3>
        <span className="rounded-full border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.7)] px-2 py-0.5 text-body-xs font-body-xs text-muted-foreground/75">v{version}</span>
      </header>
      <div className="space-y-3">
        {fields.map((f) => (
          <div key={f.id} className="space-y-1">
            <label className="text-body-xs font-medium text-muted-foreground/80">
              {f.label} {f.required ? <span className="text-warning">*</span> : null}
            </label>
            {f.type === "text" ? (
              <Input defaultValue={(values[f.id] as string) ?? ""} placeholder={f.placeholder} onChange={(e) => onValueChange?.(f.id, e.target.value)} />
            ) : f.type === "textarea" ? (
              <Textarea defaultValue={(values[f.id] as string) ?? ""} placeholder={f.placeholder} onChange={(e) => onValueChange?.(f.id, e.target.value)} />
            ) : (
              <div className="flex items-center gap-2">
                <Switch defaultChecked={Boolean(values[f.id])} onCheckedChange={(v) => onValueChange?.(f.id, v)} />
                <span className="text-body-xs font-body-xs text-muted-foreground/75">Enabled</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <footer className="mt-4 flex items-center justify-between">
        <span className="text-body-xs font-body-xs text-muted-foreground/70">Run test with current values</span>
        <Button size="sm" variant="outline" onClick={onTest}>Run test</Button>
      </footer>
    </div>
  );
}
