// Bounded Context Owner: HiveLab Guild
// Canonical lint engine for ToolDefinition authoring per spec:
// - docs/design/hivelab/HIVELAB_V1_PRODUCT_IA_SPEC.md §6
// - docs/design/hivelab/LAB_SPACES_INTEGRATION_CONTRACT.md

import type { LintIssue, ToolDefinition } from "./contracts";
import {
  type ElementCatalogLookup,
  MAX_TOOL_FIELDS,
  countFieldsUsed
} from "./authoring-utils";

interface DefinitionAnalysis {
  fieldsCount: number;
  hasPII: boolean;
  hasTime: boolean;
  hasEventExtends: boolean;
  attachedEventId: string | null;
}

const analyzeDefinition = (
  definition: ToolDefinition,
  lookup: ElementCatalogLookup
): DefinitionAnalysis => {
  const matches = definition.elements
    .map((element) => lookup(element.id))
    .filter(Boolean);

  const hasPII = matches.some((match) => match?.pii === true);
  const hasTime = Boolean(definition.time?.finishBy);
  const hasEventExtends = matches.some((match) => match?.extends === "events");
  const attachedEventId =
    definition.elements.find((element) => element.attachedEventId)?.attachedEventId ?? null;

  return {
    fieldsCount: countFieldsUsed(definition, lookup),
    hasPII,
    hasTime,
    hasEventExtends,
    attachedEventId
  };
};

export const lintToolDefinition = (
  definition: ToolDefinition,
  lookup: ElementCatalogLookup
): LintIssue[] => {
  const issues: LintIssue[] = [];
  const analysis = analyzeDefinition(definition, lookup);

  if (analysis.fieldsCount > MAX_TOOL_FIELDS) {
    issues.push({
      id: "fields_exceeded",
      severity: "block",
      message: `Tools support up to ${MAX_TOOL_FIELDS} fields.`,
      autofix: { label: "Remove last added field", action: "fields.remove_last" }
    });
  }

  if (analysis.hasPII && definition.settings.anonymous === true) {
    issues.push({
      id: "pii_anonymous_conflict",
      severity: "block",
      message: "PII elements block anonymous responses.",
      autofix: { label: "Disable anonymous", action: "settings.set_anonymous", payload: { value: false } }
    });
  }

  const ttlRequired = definition.elements.some((element) => {
    const id = element.id.toLowerCase();
    if (id.includes("heads_up") || id.includes("announcement")) {
      return true;
    }
    const catalog = lookup(element.id);
    return Boolean(catalog?.guardrails?.some((entry) => /ttl/i.test(entry)));
  });

  if (ttlRequired && !definition.time?.finishBy) {
    issues.push({
      id: "ttl_missing",
      severity: "block",
      message: "Announcements need a Finish by window.",
      autofix: { label: "Set Finish by", action: "time.set_finish_by" }
    });
  }

  const requiresAttach = definition.elements.some((element) => lookup(element.id)?.extends === "events");
  if (requiresAttach && !analysis.attachedEventId) {
    issues.push({
      id: "event_attach_missing",
      severity: "warn",
      message: "Attach to an upcoming Event or skip.",
      autofix: { label: "Open attach picker", action: "event.attach" }
    });
  }

  if (definition.settings.overflow === "state") {
    issues.push({
      id: "digest_bundling_recommended",
      severity: "warn",
      message: "Enable digest bundling to avoid extra board bumps.",
      autofix: { label: "Attach under latest item", action: "settings.set_overflow", payload: { value: "attach_under_latest" } }
    });
  }

  const needsLiveArea = definition.elements.some((element) => {
    const catalog = lookup(element.id);
    return catalog?.slots?.includes("event_during") || catalog?.slots?.includes("post");
  });
  if (!definition.placement.live && needsLiveArea) {
    issues.push({
      id: "live_area_disabled",
      severity: "warn",
      message: "Live area is off but elements need a live surface.",
      autofix: { label: "Turn on Live area", action: "placement.enable_live" }
    });
  }

  const requiresAltText = definition.elements.some((element) => {
    const id = element.id.toLowerCase();
    if (id.includes("photo") || id.includes("gallery")) return true;
    const config = element.config as { allowImages?: boolean; requireAltText?: boolean };
    return config?.allowImages === true;
  });

  if (requiresAltText) {
    const missingAltText = definition.elements.some((element) => {
      const config = element.config as { allowImages?: boolean; requireAltText?: boolean };
      return config && config.allowImages === true && config.requireAltText !== true;
    });
    if (missingAltText) {
      issues.push({
        id: "alt_text_required",
        severity: "warn",
        message: "Image uploads should require alt text.",
        autofix: { label: "Require alt text", action: "element.require_alt_text" }
      });
    }
  }

  const pollElements = definition.elements.filter((element) => {
    const id = element.id.toLowerCase();
    return id.includes("poll") || id.includes("rank");
  });
  for (const element of pollElements) {
    const config = element.config as { editable?: boolean; allowRevote?: boolean };
    if (config?.editable || config?.allowRevote) {
      issues.push({
        id: "poll_options_lock",
        severity: "warn",
        message: "Lock poll options after launch to keep results stable.",
        autofix: { label: "Lock poll", action: "element.lock_poll", payload: { elementId: element.id } }
      });
      break;
    }
  }

  return issues;
};
