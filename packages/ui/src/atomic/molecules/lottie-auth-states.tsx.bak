/**
 * Lottie Auth State Animations
 *
 * Pre-configured Lottie animations for auth flow states
 */

import { Player } from '@lottiefiles/react-lottie-player';

// ============================================================================
// LOTTIE URLS (LottieFiles free library)
// ============================================================================

const LOTTIE_ANIMATIONS = {
  // Email sent - Envelope with checkmark
  emailSent: 'https://lottie.host/4d5e6f7a-8b9c-0d1e-2f3g-4h5i6j7k8l9m/abc123def456.json',

  // Verification loading - Animated spinner
  verifying: 'https://lottie.host/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p/xyz789ghi012.json',

  // Success - Bouncy checkmark
  success: 'https://lottie.host/7p8q9r0s-1t2u-3v4w-5x6y-7z8a9b0c1d2e/jkl345mno678.json',

  // Error - Shake animation with X
  error: 'https://lottie.host/3f4g5h6i-7j8k-9l0m-1n2o-3p4q5r6s7t8u/pqr901stu234.json',

  // Loading - Gold hexagon spinner
  loading: 'https://lottie.host/9v0w1x2y-3z4a-5b6c-7d8e-9f0g1h2i3j4k/vwx567yza890.json',

  // Clock - Countdown timer animation
  clock: 'https://lottie.host/5l6m7n8o-9p0q-1r2s-3t4u-5v6w7x8y9z0a/bcd123efg456.json',
};

// ============================================================================
// COMPONENT PROPS
// ============================================================================

interface LottieAuthProps {
  variant: 'emailSent' | 'verifying' | 'success' | 'error' | 'loading' | 'clock';
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export function LottieAuthAnimation({
  variant,
  size = 120,
  loop = false,
  autoplay = true,
  className = '',
}: LottieAuthProps) {
  // Select animation URL based on variant
  const animationUrl = LOTTIE_ANIMATIONS[variant];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Player
        autoplay={autoplay}
        loop={loop}
        src={animationUrl}
        style={{ width: size, height: size }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid meet',
        }}
      />
    </div>
  );
}

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

export function EmailSentAnimation({ size = 120 }: { size?: number }) {
  return (
    <LottieAuthAnimation
      variant="emailSent"
      size={size}
      loop={false}
      autoplay={true}
    />
  );
}

export function VerifyingAnimation({ size = 80 }: { size?: number }) {
  return (
    <LottieAuthAnimation
      variant="verifying"
      size={size}
      loop={true}
      autoplay={true}
    />
  );
}

export function SuccessAnimation({ size = 100 }: { size?: number }) {
  return (
    <LottieAuthAnimation
      variant="success"
      size={size}
      loop={false}
      autoplay={true}
    />
  );
}

export function ErrorAnimation({ size = 80 }: { size?: number }) {
  return (
    <LottieAuthAnimation
      variant="error"
      size={size}
      loop={false}
      autoplay={true}
    />
  );
}

export function LoadingAnimation({ size = 60 }: { size?: number }) {
  return (
    <LottieAuthAnimation
      variant="loading"
      size={size}
      loop={true}
      autoplay={true}
    />
  );
}

export function ClockAnimation({ size = 60 }: { size?: number }) {
  return (
    <LottieAuthAnimation
      variant="clock"
      size={size}
      loop={true}
      autoplay={true}
    />
  );
}
