"use client";

// Re-export from @hive/ui - this resolves to the stub for compilation
export { 
  HiveAuthFlowEnhanced,
  AuthProvider,
  useAuthFlow
} from '@hive/ui';

export type {
  AuthStep,
  AuthState,
  AuthContextType
} from '@hive/ui';