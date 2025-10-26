// Adapter for shadcn blocks to use the shared mobile breakpoint hook.
// Our canonical hook already exposes a `useIsMobile` helper, so simply re-export it
// to avoid duplicate breakpoint logic inside the registry shim.
export { useIsMobile } from "../../hooks/use-mobile";
