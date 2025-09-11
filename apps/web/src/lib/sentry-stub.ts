// Sentry stub for when @sentry/nextjs is not available
export const captureException = (error: any) => {console.error('Sentry not available, logging error: ', error);
  };

export const captureMessage = (message: string) => {console.warn('Sentry not available, logging message: ', message);
  };

export const withSentry = (fn: any) => fn;



