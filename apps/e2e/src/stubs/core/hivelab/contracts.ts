export type ElementDefinition = {
  id: string;
  name: string;
  category: string;
  summary?: string;
};

export type ElementCategory = {
  id: string;
  label: string;
};

export type HiveLabCanvasShellPayload = {
  elements: ElementDefinition[];
};

