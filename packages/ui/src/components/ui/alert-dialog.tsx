import React from "react";
import { cn } from "../../lib/utils";
interface AlertDialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

interface AlertDialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

// AlertDialogContentProps is handled by React.HTMLAttributes<HTMLDivElement>

interface AlertDialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

interface AlertDialogActionProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

interface AlertDialogCancelProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const AlertDialogContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export const AlertDialog: React.FC<AlertDialogProps> = ({
  children,
  open,
  onOpenChange,
  className,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setIsOpen = React.useCallback(
    (newOpen: boolean) => {
      if (isControlled) {
        onOpenChange?.(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
    },
    [isControlled, onOpenChange]
  );

  if (!isOpen) return null;

  return (
    <AlertDialogContext.Provider value={{ isOpen, setIsOpen }}>
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-[var(--hive-background-primary)]/50",
          className
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpen(false);
          }
        }}
      >
        {children}
      </div>
    </AlertDialogContext.Provider>
  );
};

export const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const { setIsOpen } = React.useContext(AlertDialogContext);

  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onClick: () => setIsOpen(true),
    });
  }

  return (
    <button
      className={cn("inline-flex items-center justify-center", className)}
      onClick={() => setIsOpen(true)}
    >
      {children}
    </button>
  );
};

export const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-50 grid w-full max-w-lg gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
      className
    )}
    {...props}
  />
));
AlertDialogContent.displayName = "AlertDialogContent";

export const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 text-center sm:text-left",
        className
      )}
    >
      {children}
    </div>
  );
};

export const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({
  children,
  className,
}) => {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
};

export const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};

export const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export const AlertDialogAction: React.FC<AlertDialogActionProps> = ({
  children,
  onClick,
  disabled = false,
  className,
}) => {
  const { setIsOpen } = React.useContext(AlertDialogContext);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setIsOpen(false);
  };

  return (
    <button
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export const AlertDialogCancel: React.FC<AlertDialogCancelProps> = ({
  children,
  onClick,
  disabled = false,
  className,
}) => {
  const { setIsOpen } = React.useContext(AlertDialogContext);

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setIsOpen(false);
  };

  return (
    <button
      className={cn(
        "mt-2 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-semibold ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:mt-0",
        className
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
