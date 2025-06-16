"use client";

import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface DropdownMenuProps {
  children: React.ReactNode;
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

interface DropdownMenuContentProps {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

interface DropdownMenuSeparatorProps {
  className?: string;
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  );
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const { setIsOpen } = React.useContext(DropdownMenuContext);

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

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  children,
  className,
  align = "center",
}) => {
  const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      <div
        className={cn(
          "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
          align === "start" && "left-0",
          align === "center" && "left-1/2 -translate-x-1/2",
          align === "end" && "right-0",
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  children,
  onClick,
  className,
}) => {
  const { setIsOpen } = React.useContext(DropdownMenuContext);

  const handleClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  return (
    <button
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 w-full text-left",
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export const DropdownMenuSeparator: React.FC<DropdownMenuSeparatorProps> = ({
  className,
}) => {
  return <div className={cn("-mx-1 my-1 h-px bg-muted", className)} />;
};
