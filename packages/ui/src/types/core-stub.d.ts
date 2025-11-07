declare module '@hive/core' {
  const Core: any;
  export = Core;
}

declare module '@hive/core/*' {
  const AnyCore: any;
  export = AnyCore;
}

