declare module "@hive/ui" {
  // Minimal shim to keep sandbox typechecking lightweight.
  // At runtime, Next resolves the real package via PNPM workspace.
  const mod: any;
  export = mod;
}

// Allow developing before installing local deps
declare module "zustand" {
  // Generic-friendly create signature to allow typed selectors without installing types.
  export function create<TState>(initializer: any): any;
}

// Deep import shim for design system internals used in this sandbox
declare module "@hive/ui/src/*" {
  const mod: any;
  export = mod;
}
