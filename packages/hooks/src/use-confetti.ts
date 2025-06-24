import { useCallback } from "react";
import confetti from "canvas-confetti";

interface UseConfettiReturn {
  fire: (options?: confetti.Options) => void;
}

const defaultOptions: confetti.Options = {
  particleCount: 150,
  spread: 70,
  origin: { y: 0.6 },
  colors: ["#FFD700", "#FFC700", "#FFFFFF", "#F0F0F0"],
};

/**
 * A hook to provide a simple interface for triggering a confetti animation.
 *
 * @returns An object with a `fire` function to trigger the confetti.
 */
export function useConfetti(): UseConfettiReturn {
  const fire = useCallback((options?: confetti.Options) => {
    confetti({ ...defaultOptions, ...options });
  }, []);

  return { fire };
}
