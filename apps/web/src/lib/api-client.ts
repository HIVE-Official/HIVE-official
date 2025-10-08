/**
 * Authenticated API Client
 * Handles all API calls with proper authentication tokens
 */

import { auth } from "./firebase";

// RequestInit is a standard Web API type
type RequestInitType = globalThis.RequestInit;

type RequestParams = Record<string, string | number | boolean | undefined | null>;

type ResponseType = "json" | "text" | "blob" | "raw";

interface ApiOptions extends Omit<RequestInitType, "body"> {
  skipAuth?: boolean;
  params?: RequestParams;
  onUploadProgress?: (progress: { loaded: number; total?: number }) => void;
  responseType?: ResponseType;
}

class HttpError<TData = unknown> extends Error {
  readonly status: number;
  readonly data?: TData;
  readonly response: Response;

  constructor(message: string, response: Response, data?: TData) {
    super(message || "Request failed");
    this.name = "HttpError";
    this.status = response.status;
    this.data = data;
    this.response = response;
  }
}

class ApiClient {
  private baseUrl = "";

  /**
   * Get the current user's auth token
   * Returns dev token in development mode when using test session
   */
  private async getAuthToken(): Promise<string | null> {
    try {
      // Check for dev mode first
      if (typeof window !== "undefined") {
        const devAuthMode = window.localStorage.getItem("dev_auth_mode");
        const devUser = window.localStorage.getItem("dev_user");

        if (devAuthMode === "true" && devUser) {
          try {
            const userData = JSON.parse(devUser);
            // Return dev token format that backend expects
            return `dev_token_${userData.id || userData.id || "debug-user"}`;
          } catch (e) {
            console.error("Failed to parse dev user data:", e);
          }
        }

        // Check for test session (from debug-auth page)
        const sessionJson = window.localStorage.getItem("hive_session");
        if (sessionJson) {
          try {
            const session = JSON.parse(sessionJson);
            if (session.userId) {
              return `dev_token_${session.userId}`;
            }
          } catch (e) {
            console.error("Failed to parse session data:", e);
          }
        }
      }

      // Try to get real Firebase token
      if (auth.currentUser) {
        return await auth.currentUser.getIdToken();
      }

      return null;
    } catch (error) {
      console.error("Failed to get auth token:", error);
      return null;
    }
  }

  private buildUrl(url: string, params?: RequestParams): string {
    if (!params) return url;

    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      searchParams.append(key, String(value));
    }

    const query = searchParams.toString();
    if (!query) return url;

    return url.includes("?") ? `${url}&${query}` : `${url}?${query}`;
  }

  /**
   * Core request helper used by all HTTP methods
   */
  private async request<TResponse = unknown>(
    url: string,
    options: ApiOptions = {},
    body?: any
  ): Promise<TResponse> {
    const {
      skipAuth = false,
      params,
      headers = {},
      onUploadProgress,
      responseType = "json",
      ...restOptions
    } = options;

    if (onUploadProgress) {
      console.warn("Upload progress tracking is not supported in the fetch-based API client.");
    }

    const finalUrl = this.buildUrl(url, params);
    const requestHeaders = new Headers(headers as Record<string, string>);

    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
    const isStringBody = typeof body === "string";
    const isBodyProvided = body !== undefined && body !== null;

    if (isBodyProvided && !isFormData && !isStringBody && !requestHeaders.has("Content-Type")) {
      requestHeaders.set("Content-Type", "application/json");
    }

    if (!skipAuth) {
      const token = await this.getAuthToken();
      if (token) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
      } else {
        console.warn("No auth token available for API request:", finalUrl);
      }
    }

    const init: RequestInitType = {
      ...restOptions,
      headers: requestHeaders,
    };

    if (isBodyProvided) {
      if (isFormData) {
        requestHeaders.delete("Content-Type");
        init.body = body;
      } else if (isStringBody) {
        init.body = body;
      } else {
        init.body = JSON.stringify(body);
      }
    }

    const response = await fetch(finalUrl, init);

    if (!response.ok) {
      let errorPayload: unknown = null;
      const cloned = response.clone();
      const contentType = cloned.headers.get("content-type") || "";

      try {
        if (contentType.includes("application/json")) {
          errorPayload = await cloned.json();
        } else if (contentType.includes("text/")) {
          errorPayload = await cloned.text();
        }
      } catch (parseError) {
        console.warn("Failed to parse error response", parseError);
      }

      const errorMessage =
        (typeof errorPayload === "object" && errorPayload !== null && "message" in errorPayload
          ? (errorPayload as { message?: string }).message || response.statusText
          : response.statusText) || "Request failed";

      throw new HttpError(errorMessage, response, errorPayload);
    }

    if (responseType === "raw") {
      return response as unknown as TResponse;
    }

    if (responseType === "text") {
      const text = await response.text();
      return text as unknown as TResponse;
    }

    if (responseType === "blob") {
      const blob = await response.blob();
      return blob as unknown as TResponse;
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return null as unknown as TResponse;
    }

    const data = await response.json();

    if (data && typeof data === "object" && "success" in data) {
      const typed = data as { success: boolean; data?: unknown; error?: string; message?: string; meta?: unknown };

      if (!typed.success) {
        throw new HttpError(typed.error || typed.message || response.statusText, response, data);
      }

      if (typeof typed.data !== "undefined") {
        const payload = (typed.data ?? null) as TResponse;

        if (payload && typeof payload === "object") {
          Object.defineProperty(payload, "__meta", {
            value: {
              message: typed.message,
              meta: typed.meta,
            },
            enumerable: false,
            writable: false,
          });
        }

        return payload;
      }

      const { success: _success, data: _data, error: _error, message, meta, ...rest } = typed;

      if (Object.keys(rest).length === 0) {
        return { message, meta } as TResponse;
      }

      const payload = rest as TResponse & { __meta?: unknown };

      Object.defineProperty(payload, "__meta", {
        value: {
          message,
          meta,
        },
        enumerable: false,
        writable: false,
      });

      return payload;
    }

    return data as TResponse;
  }

  /**
   * Make an authenticated API request
   */
  async fetch<TResponse = unknown>(url: string, options: ApiOptions = {}): Promise<TResponse> {
    return this.request<TResponse>(url, options);
  }

  /**
   * GET request
   */
  async get<TResponse = unknown>(url: string, options?: ApiOptions): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: "GET" });
  }

  /**
   * POST request
   */
  async post<TResponse = unknown>(url: string, body?: any, options?: ApiOptions): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: "POST" }, body);
  }

  /**
   * PUT request
   */
  async put<TResponse = unknown>(url: string, body?: any, options?: ApiOptions): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: "PUT" }, body);
  }

  /**
   * PATCH request
   */
  async patch<TResponse = unknown>(url: string, body?: any, options?: ApiOptions): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: "PATCH" }, body);
  }

  /**
   * DELETE request
   */
  async delete<TResponse = unknown>(url: string, options?: ApiOptions): Promise<TResponse> {
    return this.request<TResponse>(url, { ...options, method: "DELETE" });
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export convenience methods for common operations
export const api = {
  get: <TResponse = unknown>(url: string, options?: ApiOptions) =>
    apiClient.get<TResponse>(url, options),
  post: <TResponse = unknown>(url: string, body?: any, options?: ApiOptions) =>
    apiClient.post<TResponse>(url, body, options),
  put: <TResponse = unknown>(url: string, body?: any, options?: ApiOptions) =>
    apiClient.put<TResponse>(url, body, options),
  patch: <TResponse = unknown>(url: string, body?: any, options?: ApiOptions) =>
    apiClient.patch<TResponse>(url, body, options),
  delete: <TResponse = unknown>(url: string, options?: ApiOptions) =>
    apiClient.delete<TResponse>(url, options),
  spaces: {
    list: <TResponse = unknown>(params?: URLSearchParams) =>
      apiClient.get<TResponse>(`/api/spaces${params ? `?${params}` : ""}`),

    create: <TResponse = unknown>(data: any) =>
      apiClient.post<TResponse>("/api/spaces", data),

    get: <TResponse = unknown>(id: string) =>
      apiClient.get<TResponse>(`/api/spaces/${id}`),

    join: <TResponse = unknown>(spaceId: string) =>
      apiClient.post<TResponse>("/api/spaces/join", { spaceId }),

    leave: <TResponse = unknown>(spaceId: string) =>
      apiClient.post<TResponse>("/api/spaces/leave", { spaceId }),

    posts: {
      list: <TResponse = unknown>(spaceId: string) =>
        apiClient.get<TResponse>(`/api/spaces/${spaceId}/posts`),

      create: <TResponse = unknown>(spaceId: string, content: string, parentId?: string) =>
        apiClient.post<TResponse>(`/api/spaces/${spaceId}/posts`, { content, parentId }),
    },

    browse: <TResponse = unknown>(params: Record<string, string | number | boolean | undefined> = {}) =>
      apiClient.get<TResponse>("/api/spaces/browse", { params }),

    checkHandle: <TResponse = unknown>(handle: string) =>
      apiClient.get<TResponse>("/api/auth/check-handle", { params: { handle } }),

    installDefaultTools: async (spaceId: string, tools: any[]) => {
      await Promise.all(
        tools.map(tool =>
          apiClient.post(`/api/spaces/${spaceId}/tools`, tool)
        )
      );
      return { success: true };
    },

    setupRssFeed: <TResponse = unknown>(spaceId: string, rssUrl: string) =>
      apiClient.post<TResponse>(`/api/spaces/${spaceId}/seed-rss`, { rssUrl }),

    members: {
      list: <TResponse = unknown>(spaceId: string) =>
        apiClient.get<TResponse>(`/api/spaces/${spaceId}/members`),

      remove: <TResponse = unknown>(spaceId: string, memberId: string) =>
        apiClient.delete<TResponse>(`/api/spaces/${spaceId}/members/${memberId}`),

      updateRole: <TResponse = unknown>(spaceId: string, memberId: string, role: string) =>
        apiClient.patch<TResponse>(`/api/spaces/${spaceId}/members/${memberId}`, { role }),
    },

    membership: {
      get: <TResponse = unknown>(spaceId: string) =>
        apiClient.get<TResponse>(`/api/spaces/${spaceId}/membership?limit=1`),
    },

    tools: {
      list: <TResponse = unknown>(spaceId: string) =>
        apiClient.get<TResponse>(`/api/spaces/${spaceId}/tools`),
      install: <TResponse = unknown>(spaceId: string, toolData: any) =>
        apiClient.post<TResponse>(`/api/spaces/${spaceId}/tools`, toolData),
      configure: <TResponse = unknown>(spaceId: string, toolId: string, config: any) =>
        apiClient.put<TResponse>(`/api/spaces/${spaceId}/tools/${toolId}`, config),
      remove: <TResponse = unknown>(spaceId: string, toolId: string) =>
        apiClient.delete<TResponse>(`/api/spaces/${spaceId}/tools/${toolId}`),
    }
  },

  profile: {
    get: <TResponse = unknown>() => apiClient.get<TResponse>("/api/profile"),
    update: <TResponse = unknown>(data: any) => apiClient.put<TResponse>("/api/profile", data),
  },

  feed: {
    get: <TResponse = unknown>() => apiClient.get<TResponse>("/api/feed"),
  }
};

export { HttpError };
