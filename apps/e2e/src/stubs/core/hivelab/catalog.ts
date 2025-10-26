import type { ElementDefinition, ElementCategory } from "./contracts";

export const elementCategories: ElementCategory[] = [
  { id: "surface", label: "Surfaces" },
  { id: "motion", label: "Motion" },
  { id: "component", label: "Components" }
];

export const elementCatalog: ElementDefinition[] = [
  {
    id: "card.standard",
    name: "Standard Card",
    category: "component",
    summary: "Base surface used for feed tiles and detail panels."
  },
  {
    id: "card.glass",
    name: "Glass Card",
    category: "surface",
    summary: "Frosted glass shell matching Spaces dock visuals."
  },
  {
    id: "anim.fade-up",
    name: "Fade Up",
    category: "motion",
    summary: "Entrance choreography aligned with --motion-duration-smooth."
  }
];

