/**
 * Mock Sentry implementation for when @sentry/nextjs is not available
 */

export const sentryMock = {init: () => {  },
  getCurrentHub: () => ({withScope: (callback: any) => callback({ setUser: () => {  },
      setTag: () => { },
      setContext: () => { },
      setLevel: () => { },
      setExtra: () => { },
      setFingerprint: () => { },
    }),
    captureException: () => 'mock event-id',
    captureMessage: () => 'mock event-id',
    addBreadcrumb: () => { },
  }),
  captureException: () => 'mock event-id',
  captureMessage: () => 'mock event-id',
};



