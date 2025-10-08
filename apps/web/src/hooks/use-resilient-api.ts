import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import {
  ResilientHiveApiClient,
  createResilientApiClient,
} from "@/lib/api-client-resilient";
import {
  ErrorCategory,
  ErrorSeverity,
  HiveError,
} from "@/lib/error-resilience-system";

const isHiveError = (value: unknown): value is HiveError => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<HiveError>;
  return (
    typeof candidate.id === "string" &&
    candidate.category !== undefined &&
    candidate.severity !== undefined &&
    typeof candidate.message === "string"
  );
};

const isAbortError = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const { name } = error as { name?: unknown };
  return typeof name === "string" && name === "AbortError";
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "Request failed";
};

// Enhanced state interface with error resilience
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: HiveError | null;
  retryCount: number;
  lastFetch: Date | null;
  isStale: boolean;
  hasOfflineData: boolean;
  fromCache: boolean;
}

interface ApiOptions {
  immediate?: boolean;
  staleTime?: number; // ms before data is considered stale
  cacheKey?: string;
  offlineSupport?: boolean;
}

// Generic resilient API hook
export function useResilientApi<T>(
  apiCall: (client: ResilientHiveApiClient) => Promise<T>,
  options: ApiOptions = {}
): ApiState<T> & {
  refetch: () => Promise<void>;
  reset: () => void;
  retry: () => Promise<void>;
} {
  const {
    immediate = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheKey,
    offlineSupport = false,
  } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
    retryCount: 0,
    lastFetch: null,
    isStale: false,
    hasOfflineData: false,
    fromCache: false,
  });

  const clientRef = useRef<ResilientHiveApiClient>();
  const abortControllerRef = useRef<AbortController>();

  // Initialize API client
  useEffect(() => {
    clientRef.current = createResilientApiClient();
  }, []);

  // Check if data is stale
  const isDataStale = useCallback(() => {
    if (!state.lastFetch) return true;
    return Date.now() - state.lastFetch.getTime() > staleTime;
  }, [state.lastFetch, staleTime]);

  // Load from cache
  const loadFromCache = useCallback((): T | null => {
    if (!cacheKey || typeof window === "undefined") return null;

    try {
      const cached = localStorage.getItem(`hive_api_${cacheKey}`);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;

        if (age < staleTime * 2) {
          // Allow cache to be twice as old for offline support
          setState((prev) => ({ ...prev, hasOfflineData: true, fromCache: true }));
          return data;
        }
      }
    } catch (error) {
      console.warn("Failed to load from cache:", error);
    }

    return null;
  }, [cacheKey, staleTime]);

  // Save to cache
  const saveToCache = useCallback(
    (data: T) => {
      if (!cacheKey || typeof window === "undefined") return;

      try {
        localStorage.setItem(
          `hive_api_${cacheKey}`,
          JSON.stringify({
            data,
            timestamp: Date.now(),
          })
        );
      } catch (error) {
        console.warn("Failed to save to cache:", error);
      }
    },
    [cacheKey]
  );

  // Execute API call
  const execute = useCallback(
    async (isRetry = false) => {
      if (!clientRef.current) return;

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
        retryCount: isRetry ? prev.retryCount + 1 : 0,
      }));

      try {
        const data = await apiCall(clientRef.current);

        setState((prev) => ({
          ...prev,
          data,
          loading: false,
          error: null,
          lastFetch: new Date(),
          isStale: false,
          hasOfflineData: false,
          fromCache: false,
        }));

        // Save to cache
        if (cacheKey) {
          saveToCache(data);
        }
      } catch (error) {
        // Check if request was aborted
        if (isAbortError(error)) return;

        const hiveError: HiveError = isHiveError(error)
          ? error
          : {
              id: `hook_${Date.now()}`,
              category: ErrorCategory._UNKNOWN,
              severity: ErrorSeverity._MEDIUM,
              message: getErrorMessage(error),
              timestamp: new Date(),
              retryable: true,
            };

        setState((prev) => {
          const newState = {
            ...prev,
            loading: false,
            error: hiveError,
          };

          // Try to load from cache if offline support is enabled
          if (offlineSupport && prev.data === null) {
            const cachedData = loadFromCache();
            if (cachedData !== null) {
              return {
                ...newState,
                data: cachedData,
                hasOfflineData: true,
                fromCache: true,
              };
            }
          }

          return newState;
        });
      }
    },
    [apiCall, cacheKey, saveToCache, offlineSupport, loadFromCache]
  );

  // Initial fetch
  useEffect(() => {
    if (immediate) {
      // Try to load from cache first for immediate display
      if (cacheKey) {
        const cachedData = loadFromCache();
        if (cachedData !== null) {
          setState((prev) => ({
            ...prev,
            data: cachedData,
            hasOfflineData: true,
            isStale: isDataStale(),
            fromCache: true,
          }));
        }
      }

      execute();
    }
  }, [immediate, execute, cacheKey, loadFromCache, isDataStale]);

  // Update stale status
  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => ({
        ...prev,
        isStale: isDataStale(),
      }));
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [isDataStale]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const refetch = useCallback(() => execute(false), [execute]);
  const retry = useCallback(() => execute(true), [execute]);
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
      retryCount: 0,
      lastFetch: null,
      isStale: false,
      hasOfflineData: false,
      fromCache: false,
    });
  }, []);

  return {
    ...state,
    refetch,
    reset,
    retry,
  };
}

// Specialized hooks for common API patterns
export function useSpaces(_params: { limit?: number; offset?: number } = {}) {
  return useResilientApi((client) => client.getSpacesWithOfflineSupport(), {
    cacheKey: "spaces",
    offlineSupport: true,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useSpace(spaceId: string) {
  return useResilientApi((client) => client.getSpace(spaceId), {
    cacheKey: `space_${spaceId}`,
    immediate: !!spaceId,
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useFeed(
  _params: {
    limit?: number;
    offset?: number;
    spaceId?: string;
    type?: string;
  } = {}
) {
  return useResilientApi((client) => client.getFeedWithOfflineSupport(), {
    cacheKey: "feed",
    offlineSupport: true,
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useTools(
  params: {
    limit?: number;
    offset?: number;
    category?: string;
    verified?: boolean;
  } = {}
) {
  return useResilientApi((client) => client.getTools(params), {
    cacheKey: "tools",
    offlineSupport: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useTool(toolId: string) {
  return useResilientApi((client) => client.getTool(toolId), {
    cacheKey: `tool_${toolId}`,
    immediate: !!toolId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useProfile(userId?: string) {
  return useResilientApi((client) => client.getProfile(userId), {
    cacheKey: userId ? `profile_${userId}` : "profile",
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useSpaceMembers(
  spaceId: string,
  params: { limit?: number; offset?: number } = {}
) {
  return useResilientApi((client) => client.getSpaceMembers(spaceId, params), {
    cacheKey: `space_members_${spaceId}`,
    immediate: !!spaceId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useSpaceEvents(
  spaceId: string,
  params: { limit?: number; upcoming?: boolean } = {}
) {
  return useResilientApi((client) => client.getSpaceEvents(spaceId, params), {
    cacheKey: `space_events_${spaceId}`,
    immediate: !!spaceId,
    staleTime: 60 * 1000, // 1 minute
  });
}

export function useSpaceTools(
  spaceId: string,
  params: { limit?: number; category?: string } = {}
) {
  return useResilientApi((client) => client.getSpaceTools(spaceId, params), {
    cacheKey: `space_tools_${spaceId}`,
    immediate: !!spaceId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Hook for mutations with optimistic updates
export function useResilientMutation<TData, TVariables>(
  mutationFn: (
    client: ResilientHiveApiClient,
    variables: TVariables
  ) => Promise<TData>,
  options: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?: (error: HiveError, variables: TVariables) => void;
    optimisticUpdate?: (variables: TVariables) => TData;
  } = {}
) {
  const [state, setState] = useState<{
    data: TData | null;
    loading: boolean;
    error: HiveError | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const clientRef = useRef<ResilientHiveApiClient>();

  useEffect(() => {
    clientRef.current = createResilientApiClient();
  }, []);

  const mutate = useCallback(
    async (variables: TVariables) => {
      if (!clientRef.current) return;

      setState({
        data: options.optimisticUpdate
          ? options.optimisticUpdate(variables)
          : null,
        loading: true,
        error: null,
      });

      try {
        const data = await mutationFn(clientRef.current, variables);

        setState({
          data,
          loading: false,
          error: null,
        });

        options.onSuccess?.(data, variables);
        return data;
      } catch (error) {
        const hiveError: HiveError = isHiveError(error)
          ? error
          : {
              id: `mutation_${Date.now()}`,
              category: ErrorCategory._UNKNOWN,
              severity: ErrorSeverity._MEDIUM,
              message: getErrorMessage(error),
              timestamp: new Date(),
              retryable: false,
            };

        setState({
          data: null,
          loading: false,
          error: hiveError,
        });

        options.onError?.(hiveError, variables);
        throw hiveError;
      }
    },
    [mutationFn, options]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    mutate,
    reset,
  };
}

// Search hooks with debouncing and caching
type SearchFilterMap = Record<string, unknown>;

export function useSearch<TData, TFilters extends SearchFilterMap = SearchFilterMap>(
  searchFn: (
    client: ResilientHiveApiClient,
    query: string,
    filters: TFilters
  ) => Promise<TData>,
  query: string,
  filters?: TFilters,
  debounceMs = 300
) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const resolvedFilters = useMemo<TFilters>(
    () => (filters ?? ({} as TFilters)),
    [filters]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  return useResilientApi(
    (client) => searchFn(client, debouncedQuery, resolvedFilters),
    {
      immediate: debouncedQuery.length > 0,
      cacheKey: `search_${debouncedQuery}_${JSON.stringify(resolvedFilters)}`,
      staleTime: 30 * 1000, // 30 seconds
    }
  );
}

export function useSpaceSearch<TFilters extends SearchFilterMap = SearchFilterMap>(
  query: string,
  filters?: TFilters
) {
  return useSearch(
    (client, q, f) => client.searchSpaces(q, f),
    query,
    filters
  );
}

export function useToolSearch<TFilters extends SearchFilterMap = SearchFilterMap>(
  query: string,
  filters?: TFilters
) {
  return useSearch(
    (client, q, f) => client.searchTools(q, f),
    query,
    filters
  );
}

export function useFeedSearch<TFilters extends SearchFilterMap = SearchFilterMap>(
  query: string,
  filters?: TFilters
) {
  return useSearch(
    (client, q, f) => client.searchFeed(q, f),
    query,
    filters
  );
}

export function useUserSearch<TFilters extends SearchFilterMap = SearchFilterMap>(
  query: string,
  filters?: TFilters
) {
  return useSearch(
    (client, q, f) => client.searchUsers(q, f),
    query,
    filters
  );
}
