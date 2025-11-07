declare module 'input-otp' {
  export const OTPInput: any;
  export const OTPInputContext: any;
}

declare module '@hive/core' {
  const anyCore: any;
  export = anyCore;
}

declare module '@hive/core/*' {
  const anyCore: any;
  export = anyCore;
}

declare module '*.woff2?url' {
  const src: string;
  export default src;
}
