import * as React from "react"
import { cn } from "@/lib/utils"

// Create a proper dropdown menu context
const DropdownMenuContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

DropdownMenuContext.displayName = 'DropdownMenuContext';

const DropdownMenu = React.forwardRef<
  HTMLDivElement,
  DropdownMenuProps
>(({ children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  )
})
DropdownMenu.displayName = "DropdownMenu" 