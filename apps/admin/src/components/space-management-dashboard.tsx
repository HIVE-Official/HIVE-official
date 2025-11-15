"use client";

import { useState, useEffect } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";

interface Space {
  id: string;
  name: string;
  type: 'campus_living' | 'fraternity_and_sorority' | 'hive_exclusive' | 'student_organizations' | 'university_organizations';
  description: string;
  memberCount: number;
  status: 'dormant' | 'activated' | 'frozen';
  hasBuilders: boolean;
  createdAt: string;
  activatedAt?: string;
  surfaces: {
    pinned: boolean;
    posts: boolean;
    events: boolean;
    tools: boolean;
    chat: boolean;
    members: boolean;
  };
}

interface SpaceSearchResult {
  spaces: Space[];
  total: number;
  page: number;
  limit: number;
}

export function SpaceManagementDashboard() {
  const { admin } = useAdminAuth();
  const [spaces, setSpaces] = useState<SpaceSearchResult | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const spaceTypes = [
    { value: 'campus_living', label: 'Campus Living' },
    { value: 'fraternity_and_sorority', label: 'Greek Life' },
    { value: 'hive_exclusive', label: 'HIVE Exclusive' },
    { value: 'student_organizations', label: 'Student Orgs' },
    { value: 'university_organizations', label: 'University Orgs' },
  ];

  const searchSpaces = async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action: 'search',
          query: searchTerm,
          type: selectedType !== 'all' ? selectedType : undefined,
          status: selectedStatus !== 'all' ? selectedStatus : undefined,
          limit: 50,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to search spaces');
      }

      const data = await response.json();
      setSpaces(data.spaces || { spaces: [], total: 0, page: 1, limit: 50 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSpaceAction = async (action: string, spaceId: string) => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action,
          spaceId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} space`);
      }

      // Refresh search results
      await searchSpaces();
      
      if (selectedSpace?.id === spaceId) {
        setSelectedSpace(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setLoading(false);
    }
  };

  const seedSpaces = async () => {
    if (!admin) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/spaces/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          universityId: 'buffalo',
          force: false,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to seed spaces');
      }

      // Refresh search results
      await searchSpaces();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Seeding failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchSpaces();
  }, [admin, selectedType, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activated': return 'bg-green-500';
      case 'dormant': return 'bg-gray-500';
      case 'frozen': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'campus_living': return 'text-blue-400';
      case 'fraternity_and_sorority': return 'text-purple-400';
      case 'hive_exclusive': return 'text-amber-400';
      case 'student_organizations': return 'text-green-400';
      case 'university_organizations': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-white">Space Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search spaces by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchSpaces()}
                className="flex-1 rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <Button 
                onClick={searchSpaces}
                disabled={loading}
                className="bg-amber-500 hover:bg-amber-600"
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>

            <div className="flex gap-4">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="all">All Types</option>
                {spaceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                <option value="all">All Statuses</option>
                <option value="activated">Activated</option>
                <option value="dormant">Dormant</option>
                <option value="frozen">Frozen</option>
              </select>

              <Button
                onClick={seedSpaces}
                disabled={loading}
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-600/10"
              >
                Seed Spaces
              </Button>
            </div>
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-400">{error}</p>
          )}
        </CardContent>
      </Card>

      {/* Space Results */}
      {spaces && (
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-white">
              Spaces ({spaces.total} found)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spaces.spaces.map((space) => (
                <div 
                  key={space.id}
                  className="flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(space.status)}`}></div>
                      <div>
                        <h3 className="font-semibold text-white">{space.name}</h3>
                        <p className="text-sm text-gray-400">{space.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className={`text-sm ${getTypeColor(space.type)}`}>
                            {spaceTypes.find(t => t.value === space.type)?.label}
                          </span>
                          <span className="text-sm text-gray-500">
                            {(space.memberCount || 0)} members
                          </span>
                          {space.hasBuilders && (
                            <Badge variant="secondary" className="text-xs">
                              Has Builders
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedSpace(space)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      View Details
                    </Button>
                    {space.status === 'activated' ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSpaceAction('deactivate', space.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600/10"
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSpaceAction('activate', space.id)}
                        className="border-green-600 text-green-400 hover:bg-green-600/10"
                      >
                        Activate
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Space Details Modal */}
      {selectedSpace && (
        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Space Details</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSpace(null)}
                className="text-gray-400 hover:text-white"
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-white mb-3">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-400">Name: </span>
                    <span className="text-white">{selectedSpace.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Type: </span>
                    <span className={getTypeColor(selectedSpace.type)}>
                      {spaceTypes.find(t => t.value === selectedSpace.type)?.label}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Status: </span>
                    <div className="inline-flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedSpace.status)}`}></div>
                      <span className="text-white capitalize">{selectedSpace.status}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Members: </span>
                    <span className="text-white">{(selectedSpace.memberCount || 0)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Has Builders: </span>
                    <span className="text-white">{selectedSpace.hasBuilders ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-3">Surface Status</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(selectedSpace.surfaces).map(([surface, enabled]) => (
                    <div key={surface} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{surface}: </span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${enabled ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        <span className="text-white">{enabled ? 'Enabled' : 'Disabled'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <h4 className="font-semibold text-white mb-3">Admin Actions</h4>
              <div className="flex flex-wrap gap-2">
                {selectedSpace.status === 'activated' ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSpaceAction('deactivate', selectedSpace.id)}
                    className="border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    Deactivate Space
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSpaceAction('activate', selectedSpace.id)}
                    className="border-green-600 text-green-400 hover:bg-green-600/10"
                  >
                    Activate Space
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSpaceAction('freeze', selectedSpace.id)}
                  className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
                >
                  Freeze Space
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSpaceAction('archive', selectedSpace.id)}
                  className="border-gray-600 text-gray-400 hover:bg-gray-600/10"
                >
                  Archive Space
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
