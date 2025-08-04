"use client";

import { useState, useEffect } from "react";
import { Card, Button, Badge, HiveModal } from "@hive/ui";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Wrench, 
  FileText, 
  BookOpen, 
  Laptop, 
  Monitor, 
  Projector, 
  Coffee, 
  Wifi, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle, 
  AlertCircle, 
  Search,
  Filter,
  Download,
  Share2,
  BookmarkPlus
} from "lucide-react";

interface Resource {
  id: string;
  name: string;
  type: 'room' | 'equipment' | 'document' | 'tool' | 'digital';
  description: string;
  location?: string;
  capacity?: number;
  availability: 'available' | 'busy' | 'maintenance' | 'reserved';
  owner: {
    id: string;
    name: string;
    handle: string;
  };
  bookings: {
    id: string;
    eventId?: string;
    toolId?: string;
    userId: string;
    userName: string;
    startTime: string;
    endTime: string;
    purpose: string;
  }[];
  tags: string[];
  requirements?: string[];
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

interface SpaceResourceManagerProps {
  spaceId: string;
  spaceName: string;
  userRole: 'admin' | 'moderator' | 'member';
  onCreateEvent?: (resourceId: string) => void;
  onBookResource?: (resourceId: string) => void;
}

export function SpaceResourceManager({ 
  spaceId, 
  spaceName, 
  userRole, 
  onCreateEvent, 
  onBookResource 
}: SpaceResourceManagerProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedType, setSelectedType] = useState<'all' | Resource['type']>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, [spaceId]);

  const fetchResources = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockResources: Resource[] = [
      {
        id: '1',
        name: 'Study Room A',
        type: 'room',
        description: 'Quiet study room with whiteboard and projector',
        location: 'Library 2nd Floor',
        capacity: 8,
        availability: 'available',
        owner: { id: '1', name: 'CS Department', handle: 'cs_dept' },
        bookings: [
          {
            id: '1',
            eventId: 'evt_1',
            userId: '2',
            userName: 'Sarah Chen',
            startTime: '2024-02-15T14:00:00Z',
            endTime: '2024-02-15T16:00:00Z',
            purpose: 'Algorithm Study Session'
          }
        ],
        tags: ['quiet', 'whiteboard', 'projector'],
        features: ['Whiteboard', 'Projector', 'WiFi', '8 seats'],
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-02-01T14:30:00Z'
      },
      {
        id: '2',
        name: 'MacBook Pro (Development)',
        type: 'equipment',
        description: 'MacBook Pro for development work and presentations',
        availability: 'available',
        owner: { id: '1', name: 'Tech Club', handle: 'tech_club' },
        bookings: [],
        tags: ['development', 'presentations', 'portable'],
        features: ['M2 Chip', '16GB RAM', '512GB SSD', 'Development Tools'],
        createdAt: '2024-01-20T09:00:00Z',
        updatedAt: '2024-01-25T11:30:00Z'
      },
      {
        id: '3',
        name: 'Data Structures Cheat Sheet',
        type: 'document',
        description: 'Comprehensive cheat sheet for common data structures',
        availability: 'available',
        owner: { id: '3', name: 'Marcus Johnson', handle: 'marcusj' },
        bookings: [],
        tags: ['study-materials', 'data-structures', 'reference'],
        features: ['PDF Format', 'Printable', 'Examples Included'],
        createdAt: '2024-01-10T15:00:00Z',
        updatedAt: '2024-01-12T09:00:00Z'
      },
      {
        id: '4',
        name: 'Code Review Tool',
        type: 'digital',
        description: 'Collaborative code review and feedback platform',
        availability: 'available',
        owner: { id: '4', name: 'Emma Davis', handle: 'emmad' },
        bookings: [
          {
            id: '2',
            toolId: 'tool_1',
            userId: '5',
            userName: 'Alex Kim',
            startTime: '2024-02-16T10:00:00Z',
            endTime: '2024-02-16T12:00:00Z',
            purpose: 'Project Code Review Session'
          }
        ],
        tags: ['collaboration', 'code-review', 'development'],
        features: ['Real-time Collaboration', 'Comment System', 'Version Control'],
        createdAt: '2024-01-25T14:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z'
      }
    ];

    setResources(mockResources);
    setIsLoading(false);
  };

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    const matchesSearch = searchTerm === '' || 
      resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesSearch;
  });

  const getResourceIcon = (type: Resource['type']) => {
    switch (type) {
      case 'room': return MapPin;
      case 'equipment': return Wrench;
      case 'document': return FileText;
      case 'tool': return Monitor;
      case 'digital': return Laptop;
      default: return BookOpen;
    }
  };

  const getAvailabilityColor = (availability: Resource['availability']) => {
    switch (availability) {
      case 'available': return 'text-green-400';
      case 'busy': return 'text-red-400';
      case 'maintenance': return 'text-hive-gold';
      case 'reserved': return 'text-blue-400';
      default: return 'text-zinc-400';
    }
  };

  const handleBookResource = (resource: Resource) => {
    if (resource.type === 'room' || resource.type === 'equipment') {
      // For physical resources, create an event
      onCreateEvent?.(resource.id);
    } else {
      // For digital resources, handle booking
      onBookResource?.(resource.id);
    }
    setShowBookingModal(true);
    setSelectedResource(resource);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="p-6 bg-zinc-800/50 border-zinc-700">
            <div className="animate-pulse">
              <div className="h-4 bg-zinc-700 rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-6 bg-zinc-700 rounded"></div>
                <div className="h-4 bg-zinc-700 rounded w-2/3"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Resource Management</h2>
          <p className="text-zinc-400">Manage shared resources, equipment, and tools for {spaceName}</p>
        </div>
        {(userRole === 'admin' || userRole === 'moderator') && (
          <Button 
            onClick={() => setShowCreateModal(true)}
            className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search resources, tags, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-hive-gold focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-zinc-400" />
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="bg-zinc-800/50 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:border-hive-gold focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="room">Rooms</option>
            <option value="equipment">Equipment</option>
            <option value="document">Documents</option>
            <option value="tool">Tools</option>
            <option value="digital">Digital</option>
          </select>
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const Icon = getResourceIcon(resource.type);
          return (
            <Card key={resource.id} className="p-6 bg-zinc-800/50 border-zinc-700 hover:border-zinc-600 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-hive-gold/20 rounded-lg flex items-center justify-center">
                    <Icon className="h-5 w-5 text-hive-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{resource.name}</h3>
                    <p className="text-sm text-zinc-400 capitalize">{resource.type}</p>
                  </div>
                </div>
                <Badge 
                  variant="skill-tag" 
                  className={`capitalize ${getAvailabilityColor(resource.availability)}`}
                >
                  {resource.availability}
                </Badge>
              </div>

              <p className="text-sm text-zinc-300 mb-4 line-clamp-2">{resource.description}</p>

              {/* Resource Details */}
              <div className="space-y-2 mb-4">
                {resource.location && (
                  <div className="flex items-center text-sm text-zinc-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {resource.location}
                  </div>
                )}
                {resource.capacity && (
                  <div className="flex items-center text-sm text-zinc-400">
                    <Users className="h-4 w-4 mr-2" />
                    Capacity: {resource.capacity} people
                  </div>
                )}
                <div className="flex items-center text-sm text-zinc-400">
                  <Clock className="h-4 w-4 mr-2" />
                  {resource.bookings.length} booking{resource.bookings.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Tags */}
              {resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {resource.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="skill-tag" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {resource.tags.length > 3 && (
                    <Badge variant="skill-tag" className="text-xs">
                      +{resource.tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedResource(resource)}
                  className="border-zinc-600 text-zinc-400 hover:text-white"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {resource.availability === 'available' && (
                  <Button
                    size="sm"
                    onClick={() => handleBookResource(resource)}
                    className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                  >
                    {resource.type === 'room' || resource.type === 'equipment' ? 'Book' : 'Use'}
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredResources.length === 0 && (
        <Card className="p-12 text-center bg-zinc-800/50 border-zinc-700">
          <BookOpen className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Resources Found</h3>
          <p className="text-zinc-400 mb-6">
            {searchTerm ? 
              `No resources match "${searchTerm}". Try different keywords.` :
              "No resources available for this filter. Try selecting a different type."
            }
          </p>
          {(userRole === 'admin' || userRole === 'moderator') && (
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Resource
            </Button>
          )}
        </Card>
      )}

      {/* Resource Details Modal */}
      <HiveModal
        isOpen={!!selectedResource}
        onClose={() => setSelectedResource(null)}
        title={selectedResource?.name || ''}
        size="lg"
      >
        {selectedResource && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-hive-gold/20 rounded-lg flex items-center justify-center">
                  {(() => {
                    const Icon = getResourceIcon(selectedResource.type);
                    return <Icon className="h-6 w-6 text-hive-gold" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{selectedResource.name}</h3>
                  <p className="text-zinc-400 capitalize">{selectedResource.type}</p>
                </div>
              </div>
              <Badge 
                variant="skill-tag" 
                className={`capitalize ${getAvailabilityColor(selectedResource.availability)}`}
              >
                {selectedResource.availability}
              </Badge>
            </div>

            <div>
              <h4 className="font-medium text-white mb-2">Description</h4>
              <p className="text-zinc-300">{selectedResource.description}</p>
            </div>

            {selectedResource.features && selectedResource.features.length > 0 && (
              <div>
                <h4 className="font-medium text-white mb-2">Features</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedResource.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-zinc-300">
                      <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedResource.bookings.length > 0 && (
              <div>
                <h4 className="font-medium text-white mb-2">Current Bookings</h4>
                <div className="space-y-2">
                  {selectedResource.bookings.map((booking) => (
                    <div key={booking.id} className="p-3 bg-zinc-800/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{booking.userName}</div>
                          <div className="text-sm text-zinc-400">{booking.purpose}</div>
                        </div>
                        <div className="text-right text-sm text-zinc-400">
                          <div>{new Date(booking.startTime).toLocaleDateString()}</div>
                          <div>
                            {new Date(booking.startTime).toLocaleTimeString()} - {new Date(booking.endTime).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setSelectedResource(null)}>
                Close
              </Button>
              {selectedResource.availability === 'available' && (
                <Button
                  onClick={() => handleBookResource(selectedResource)}
                  className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
                >
                  {selectedResource.type === 'room' || selectedResource.type === 'equipment' ? 'Book Resource' : 'Use Resource'}
                </Button>
              )}
            </div>
          </div>
        )}
      </HiveModal>

      {/* Create Resource Modal */}
      <HiveModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Add New Resource"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-zinc-400">Add a new resource to help your space members collaborate better.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Resource Name</label>
              <input
                type="text"
                placeholder="Study Room A, MacBook Pro, etc."
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-hive-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Type</label>
              <select className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:border-hive-gold focus:outline-none">
                <option value="room">Room</option>
                <option value="equipment">Equipment</option>
                <option value="document">Document</option>
                <option value="tool">Tool</option>
                <option value="digital">Digital</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white mb-2">Description</label>
            <textarea
              placeholder="Describe what this resource is and how it can be used..."
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-400 focus:border-hive-gold focus:outline-none resize-none"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne">
              Create Resource
            </Button>
          </div>
        </div>
      </HiveModal>
    </div>
  );
}