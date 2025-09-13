/**
 * Next.js instrumentation file for error monitoring initialization
 * This runs on both server and client side during app startup
 */

export async function register() {
  // Only initialize in Node.js environment (server-side)
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Initialize error monitoring
    const { errorMonitoring } = await import('./src/lib/error-monitoring');
    errorMonitoring.initialize();
  }
}

// For edge runtime
export async function onRequestError(error: Error, request: Request) {
  const { captureError } = await import('./src/lib/error-monitoring');
  
  await captureError(error, {
    userAgent: request.headers.get('user-agent') || undefined,
    ip: request.headers.get('x-forwarded-for') || 
        request.headers.get('x-real-ip') || undefined,
    tags: {
      runtime: 'edge',
      source: 'request_error',
      path: new URL(request.url).pathname,
      method: request.method
    },
    extra: {
      url: request.url,
      headers: Object.fromEntries(request.headers.entries())
    }
  });
}