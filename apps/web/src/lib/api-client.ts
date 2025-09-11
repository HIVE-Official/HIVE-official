const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Re-export authenticatedFetch from auth-utils
export { authenticatedFetch } from './auth-utils';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Spaces
  async getSpaces() {
    return this.request('/spaces');
  }

  async getSpace(id: string) {
    return this.request(`/spaces/${id}`);
  }

  async createSpace(data: any) {
    return this.request('/spaces', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Posts
  async getPosts(spaceId: string) {
    return this.request(`/spaces/${spaceId}/posts`);
  }

  async createPost(spaceId: string, data: any) {
    return this.request(`/spaces/${spaceId}/posts`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Users
  async getProfile() {
    return this.request('/profile');
  }

  async updateProfile(data: any) {
    return this.request('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // Tools
  async getTools() {
    return this.request('/tools');
  }

  async createTool(data: any) {
    return this.request('/tools', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();