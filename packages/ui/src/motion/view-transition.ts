// Safe wrapper around document.startViewTransition
export function startViewTransition(update: () => void): Promise<void> | void {
  // @ts-ignore
  const api = (document as any).startViewTransition as undefined | ((cb: () => void) => { finished: Promise<void> });
  if (typeof api === 'function') {
    // @ts-ignore
    return api(() => update()).finished;
  }
  update();
}

