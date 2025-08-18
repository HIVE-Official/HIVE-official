// Enhanced LabelPrimitive with Root property
export const LabelPrimitive = {
  Root: React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
    ({ className, ...props }, ref) => (
      React.createElement('label', { ref, className, ...props })
    )
  )
};

// Add displayName to LabelPrimitive.Root
LabelPrimitive.Root.displayName = 'LabelPrimitive.Root';

// Enhanced Slot component with proper forwardRef
export const Slot = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => {
    if (React.isValidElement(children)) {
      return React.cloneElement(children, { ...props, ref });
    }
    return React.createElement('div', { ref, ...props }, children);
  }
);

Slot.displayName = 'Slot';

// Enhanced ThemeProvider with proper props handling
export function ThemeProvider({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return React.createElement('div', { 'data-theme-provider': true, ...props }, children);
}

// Enhanced AnimatePresence with proper props handling
export function AnimatePresence({ children, mode, ...props }: { children: React.ReactNode; mode?: string; [key: string]: any }) {
  return React.createElement('div', { 'data-animate-presence': true, ...props }, children);
}

// Enhanced DndProvider with backend support
export function DndProvider({ children, backend, ...props }: { children: React.ReactNode; backend?: any; [key: string]: any }) {
  return React.createElement('div', { 'data-dnd-provider': true, ...props }, children);
}

// Enhanced React Query stubs
export function useQuery() {
  return {
    data: undefined,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
}

export function useInfiniteQuery() {
  return {
    data: undefined,
    isLoading: false,
    error: null,
    fetchNextPage: () => Promise.resolve(),
    hasNextPage: false,
    isFetchingNextPage: false,
    refetch: () => Promise.resolve(),
  };
}

export function useMutation() {
  return {
    mutate: (variables?: any, options?: { onSuccess?: () => void; onError?: (error: any) => void }) => {
      // Simulate async operation
      setTimeout(() => {
        if (options?.onSuccess) {
          options.onSuccess();
        }
      }, 0);
    },
    isLoading: false,
    error: null,
  };
}

export function useQueryClient() {
  return {
    setQueryData: (key: any, updater: any) => {},
    invalidateQueries: (key: any) => Promise.resolve(),
    getQueryData: (key: any) => undefined,
  };
} 