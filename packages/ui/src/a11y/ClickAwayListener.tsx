import * as React from "react";

export interface ClickAwayListenerProps {
  /**
   * Single child element to monitor for outside clicks.
   */
  children: React.ReactElement;
  /**
   * Handler fired when a pointer event occurs outside the child element.
   */
  onClickAway: (event: MouseEvent | TouchEvent | PointerEvent) => void;
  /**
   * Disable the listener. Useful when the overlay is closed.
   */
  active?: boolean;
}

function assignRef<T>(ref: React.Ref<T> | undefined, value: T) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    (ref as React.MutableRefObject<T>).current = value;
  }
}

/**
 * ClickAwayListener detects pointer interactions that happen outside the provided child.
 * Useful for menus, popovers, or any surface that should dismiss on outside click.
 */
export function ClickAwayListener({ children, onClickAway, active = true }: ClickAwayListenerProps) {
  const nodeRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!active) return;

    const handlePointerDown = (event: PointerEvent | MouseEvent | TouchEvent) => {
      const node = nodeRef.current;
      if (!node) return;
      const target = event.target as Node | null;
      if (target && !node.contains(target)) {
        onClickAway(event as MouseEvent | TouchEvent | PointerEvent);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("touchstart", handlePointerDown as EventListener, true);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("touchstart", handlePointerDown as EventListener, true);
    };
  }, [active, onClickAway]);

  const child = React.Children.only(children);
  const { ref: childRef } = child as { ref?: React.Ref<HTMLElement> };

  const setRef = React.useCallback(
    (node: HTMLElement | null) => {
      nodeRef.current = node;
      assignRef(childRef, node);
    },
    [childRef],
  );

  return React.cloneElement(child, { ref: setRef });
}

