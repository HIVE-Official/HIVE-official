"use client";

import { useState } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";

interface User {
  id: string;
  email: string;
  handle: string;
  firstName: string;
  lastName: string;
  major: string;
  classYear: string;
  isActive: boolean;
  isSuspended: boolean;
  role: string;
  createdAt: string;
  lastActiveAt: string;
  spaceMemberships: number;
  toolsCreated: number;
}

interface UserSearchResult {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export function UserManagementDashboard() {
  const { admin } = useAdminAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserSearchResult | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchUsers = async () => {
    if (!searchTerm.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin?.id || 'test-token'}`,
        },
        body: JSON.stringify({
          action: 'search',
          query: searchTerm,
          limit: 20,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to search users');
      }

      const data = await response.json();
      setSearchResults(data.users || { users: [], total: 0, page: 1, limit: 20 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (action: string, userId: string) => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} user`);
      }

      // Refresh search results
      await searchUsers();
      
      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  const grantRole = async (userId: string, role: string) => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/grant-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          userId,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to grant ${role} role`);
      }

      // Refresh search results
      await searchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Role grant failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-white">User Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by email, handle, or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
              className="flex-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <Button 
              onClick={searchUsers}
              disabled={loading || !searchTerm.trim()}
              className="bg-amber-500 hover:bg-amber-600"
            >
              {loading ? 'Searching...' : 'Search'}
            </Button>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults && (
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white">
              Search Results ({searchResults.total} users found)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.users.map((user) => (
                <div 
                  key={user.id}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold text-white">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-400">
                          @{user.handle} • {user.email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.major} • Class of {user.classYear}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant={user.isActive ? "secondary" : "secondary"}>
                          {user.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        {user.isSuspended && (
                          <Badge variant="destructive">Suspended</Badge>
                        )}
                        {user.role !== 'user' && (
                          <Badge variant="outline">{user.role}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedUser(user)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      View Details
                    </Button>
                    {user.isSuspended ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUserAction('unsuspend', user.id)}
                        className="border-green-600 text-green-400 hover:bg-green-600/10"
                      >
                        Unsuspend
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUserAction('suspend', user.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600/10"
                      >
                        Suspend
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">User Details</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-white"
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Profile Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Name: </span>
                    <span className="text-white">{selectedUser.firstName} {selectedUser.lastName}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Email: </span>
                    <span className="text-white">{selectedUser.email}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Handle: </span>
                    <span className="text-white">@{selectedUser.handle}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Major: </span>
                    <span className="text-white">{selectedUser.major}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Class Year: </span>
                    <span className="text-white">{selectedUser.classYear}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Role: </span>
                    <span className="text-white">{selectedUser.role}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Activity & Stats</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Joined: </span>
                    <span className="text-white">{new Date(selectedUser.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Active: </span>
                    <span className="text-white">{new Date(selectedUser.lastActiveAt).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Space Memberships: </span>
                    <span className="text-white">{selectedUser.spaceMemberships}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Tools Created: </span>
                    <span className="text-white">{selectedUser.toolsCreated}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <h4 className="font-semibold text-white mb-3">Admin Actions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedUser.role === 'user' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => grantRole(selectedUser.id, 'builder')}
                    className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
                  >
                    Grant Builder Role
                  </Button>
                )}
                {selectedUser.role === 'user' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => grantRole(selectedUser.id, 'moderator')}
                    className="border-purple-600 text-purple-400 hover:bg-purple-600/10"
                  >
                    Grant Moderator Role
                  </Button>
                )}
                {selectedUser.isSuspended ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUserAction('unsuspend', selectedUser.id)}
                    className="border-green-600 text-green-400 hover:bg-green-600/10"
                  >
                    Unsuspend User
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUserAction('suspend', selectedUser.id)}
                    className="border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    Suspend User
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
