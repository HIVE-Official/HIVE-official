// Auth hooks
export { useAuth } from "./use-auth";

// Analytics hooks
export { useAnalytics } from "./use-analytics";
export { useCreationAnalytics } from "./use-creation-analytics";

// Onboarding analytics
export { useOnboardingAnalytics } from "./use-onboarding-analytics";

// Data fetching hooks
export { useSpaces } from "./use-spaces";
export {
  useCreatePost,
  usePosts,
  usePostEditor,
  usePostInteractions,
} from "./use-posts";
export {
  useSpaceDiscovery,
  useSpaceJoining,
  useCompleteSpaceDiscovery,
} from "./use-space-discovery";

// Utility hooks
export { useDebounce } from "./use-debounce";

// Motion & accessibility hooks
export {
  usePrefersReducedMotion,
  useAnimationDuration,
  getAnimationDuration,
} from "./use-reduced-motion";
