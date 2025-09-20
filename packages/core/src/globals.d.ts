/* eslint-disable no-var */
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_FIREBASE_API_KEY?: string;
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN?: string;
      NEXT_PUBLIC_FIREBASE_PROJECT_ID?: string;
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET?: string;
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID?: string;
      NEXT_PUBLIC_FIREBASE_APP_ID?: string;
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID?: string;
      FIREBASE_SERVICE_ACCOUNT_KEY?: string;
      NEXT_PUBLIC_APP_URL?: string;
      NEXT_PUBLIC_IOS_BUNDLE_ID?: string;
      NEXT_PUBLIC_ANDROID_PACKAGE_NAME?: string;
    }
  }

  var process: {
    env: NodeJS.ProcessEnv;
  };

  var Buffer: {
    from(str: string, encoding?: string): Buffer;
  };

  interface Buffer {
    toString(encoding?: string): string;
  }

  var btoa: (str: string) => string;
  var atob: (str: string) => string;
  var crypto: {
    randomUUID(): string;
    getRandomValues(array: Uint8Array): Uint8Array;
  };
}

export {}; 