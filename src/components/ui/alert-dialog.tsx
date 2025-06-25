import * as React from "react";

// Create a proper alert dialog context
const AlertDialogContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

AlertDialogContext.displayName = "AlertDialogContext";

const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  ({ children, open, onOpenChange, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isOpen = open !== undefined ? open : internalOpen;
    const setIsOpen = onOpenChange || setInternalOpen;

    return (
      <AlertDialogContext.Provider value={{ isOpen, setIsOpen }}>
        <div ref={ref} {...props}>
          {children}
        </div>
      </AlertDialogContext.Provider>
    );
  }
);
AlertDialog.displayName = "AlertDialog";
