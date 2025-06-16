// Enhanced forwardRef with displayName support
export function forwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
): React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> & {
  displayName?: string;
} {
  const component = ((props: P & { ref?: React.Ref<T> }) => {
    const { ref, ...restProps } = props;
    return render(restProps as P, ref);
  }) as React.ForwardRefExoticComponent<React.PropsWithoutRef<P> & React.RefAttributes<T>> & {
    displayName?: string;
  };
  
  // Allow displayName to be set
  Object.defineProperty(component, 'displayName', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: undefined
  });
  
  return component;
}

// Enhanced createContext with better default values
export function createContext<T>(defaultValue: T): React.Context<T> {
  const context = {
    Provider: ({ children, value }: { children: React.ReactNode; value: T }) => children,
    Consumer: ({ children }: { children: (value: T) => React.ReactNode }) => children(defaultValue),
    displayName: undefined as string | undefined,
  };
  return context as React.Context<T>;
}

// Enhanced useContext that returns meaningful values
export function useContext<T>(context: React.Context<T>): T {
  // Return context-specific default values for common contexts
  if ((context as any).displayName === 'TabsContext') {
    return {
      value: '',
      onValueChange: () => {},
    } as T;
  }
  
  if ((context as any).displayName === 'AlertDialogContext') {
    return {
      isOpen: false,
      setIsOpen: () => {},
    } as T;
  }
  
  if ((context as any).displayName === 'DropdownMenuContext') {
    return {
      isOpen: false,
      setIsOpen: () => {},
    } as T;
  }
  
  // Return a reasonable default for unknown contexts
  return {} as T;
}

export interface KeyboardEvent<T = Element> {
  key: string;
  code: string;
  altKey: boolean;
  ctrlKey: boolean;
  metaKey: boolean;
  shiftKey: boolean;
  repeat: boolean;
  target: T;
  currentTarget: T;
  preventDefault: () => void;
  stopPropagation: () => void;
} 