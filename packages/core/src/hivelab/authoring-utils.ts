// Bounded Context Owner: HiveLab Guild
// Shared helpers for authoring and runtime policies.
import type { ElementDefinition, ToolDefinition } from "./contracts";

export type ElementCatalogLookup = (_id: string) => ElementDefinition | undefined;

export const MAX_TOOL_FIELDS = 8;

export const countFieldsUsed = (
  input: ToolDefinition,
  lookup: ElementCatalogLookup
): number => {
  return input.elements.reduce((total, element) => {
    const config = element.config as { fieldsUsed?: number; fields?: unknown[] };
    if (typeof config?.fieldsUsed === "number" && Number.isFinite(config.fieldsUsed)) {
      return total + Math.max(0, config.fieldsUsed);
    }

    if (Array.isArray(config?.fields)) {
      return total + config.fields.length;
    }

    const definition = lookup(element.id);
    if (definition?.maxFields && Number.isFinite(definition.maxFields)) {
      return total + definition.maxFields;
    }

    return total + 1;
  }, 0);
};
