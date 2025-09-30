"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Link2,
  Image,
  Video,
  Download,
  Upload,
  Search,
  Filter,
  Star,
  Archive,
  Eye,
  MoreVertical,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Calendar,
  User,
  File,
  Folder
} from 'lucide-react';
import {
  HiveButton,
  HiveCard,
  HiveInput,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Progress
} from '@hive/ui';
import { api } from '@/lib/api-client';

interface Resource {
  id: string;
  title: string;
  description?: string;
  type: 'document' | 'link' | 'media' | 'form';
  fileType?: string;
  url: string;
  thumbnailUrl?: string;
  size?: number;
  isPinned: boolean;
  isArchived: boolean;
  downloadCount: number;
  viewCount: number;
  createdBy: string;
  creatorName: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  versions?: {
    id: string;
    version: number;
    createdAt: Date;
    createdBy: string;
    changeNote?: string;
  }[];
}

interface ResourcesPanelProps {
  spaceId: string;
  userRole: 'owner' | 'leader' | 'moderator' | 'member' | 'guest';
  canUpload: boolean;
  isLeader: boolean;
}

export function ResourcesPanel({ spaceId, userRole, canUpload, isLeader }: ResourcesPanelProps) {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'documents' | 'links' | 'media' | 'forms'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'popular' | 'alphabetical' | 'size'>('recent');
  const [showArchived, setShowArchived] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    loadResources();
  }, [spaceId, typeFilter, sortBy, showArchived]);

  const loadResources = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/spaces/${spaceId}/resources`, {
        params: {
          type: typeFilter !== 'all' ? typeFilter : undefined,
          sort: sortBy,
          includeArchived: showArchived,
          includeStats: true
        }
      });
      setResources(response.resources || []);
    } catch (error) {
      console.error('Failed to load resources:', error);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = useCallback(async (files: FileList) => {
    if (!files.length || !canUpload) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name.split('.')[0]);
        formData.append('type', getFileType(file.type));

        await api.post(`/api/spaces/${spaceId}/resources`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              ((i / files.length) + (progressEvent.loaded / progressEvent.total!) / files.length) * 100
            );
            setUploadProgress(progress);
          }
        });
      }

      loadResources();
    } catch (error) {
      console.error('Failed to upload files:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  }, [spaceId, canUpload]);

  const getFileType = (mimeType: string): Resource['type'] => {
    if (mimeType.startsWith('image/') || mimeType.startsWith('video/')) return 'media';
    if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'document';
    return 'document';
  };

  const handlePinResource = async (resourceId: string, isPinned: boolean) => {
    try {
      await api.patch(`/api/spaces/${spaceId}/resources/${resourceId}`, { isPinned });
      setResources(resources.map(r => r.id === resourceId ? { ...r, isPinned } : r));
    } catch (error) {
      console.error('Failed to pin resource:', error);
    }
  };

  const handleArchiveResource = async (resourceId: string, isArchived: boolean) => {
    try {
      await api.patch(`/api/spaces/${spaceId}/resources/${resourceId}`, { isArchived });
      setResources(resources.map(r => r.id === resourceId ? { ...r, isArchived } : r));
    } catch (error) {
      console.error('Failed to archive resource:', error);
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    if (!confirm('Delete this resource permanently?')) return;

    try {
      await api.delete(`/api/spaces/${spaceId}/resources/${resourceId}`);
      setResources(resources.filter(r => r.id !== resourceId));
    } catch (error) {
      console.error('Failed to delete resource:', error);
    }
  };

  const filteredResources = resources.filter(resource => {
    if (!showArchived && resource.isArchived) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description?.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const pinnedResources = filteredResources.filter(r => r.isPinned && !r.isArchived);
  const regularResources = filteredResources.filter(r => !r.isPinned);

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  const getFileIcon = (type: string, fileType?: string) => {
    switch (type) {
      case 'document':
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'link':
        return <Link2 className="w-5 h-5 text-green-400" />;
      case 'media':
        return fileType?.startsWith('video/')
          ? <Video className="w-5 h-5 text-purple-400" />
          : <Image className="w-5 h-5 text-pink-400" />;
      case 'form':
        return <File className="w-5 h-5 text-orange-400" />;
      default:
        return <File className="w-5 h-5 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-800 rounded-lg" />
              <div className="flex-1">
                <div className="h-4 bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Resources</h3>
          {canUpload && (
            <HiveButton
              size="sm"
              onClick={() => document.getElementById('file-upload')?.click()}
              disabled={uploading}
              className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add
            </HiveButton>
          )}
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-400">Uploading...</span>
              <span className="text-[var(--hive-brand-primary)]">{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <HiveInput
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-700"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-4">
          <Tabs value={typeFilter} onValueChange={(v) => setTypeFilter(v as any)}>
            <TabsList className="bg-gray-800 border-gray-700">
              <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
              <TabsTrigger value="documents" className="text-xs">Docs</TabsTrigger>
              <TabsTrigger value="links" className="text-xs">Links</TabsTrigger>
              <TabsTrigger value="media" className="text-xs">Media</TabsTrigger>
            </TabsList>
          </Tabs>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
          >
            <option value="recent">Recent</option>
            <option value="popular">Popular</option>
            <option value="alphabetical">A-Z</option>
            <option value="size">Size</option>
          </select>
        </div>

        {/* Toggle Archive */}
        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(e) => setShowArchived(e.target.checked)}
            className="rounded"
          />
          Show archived
        </label>

        {/* Hidden file input */}
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.png,.gif,.mp4,.mp3"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Pinned Resources */}
        {pinnedResources.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-[var(--hive-brand-primary)] mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Pinned
            </h4>
            <div className="space-y-2">
              {pinnedResources.map(resource => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isLeader={isLeader}
                  onPin={handlePinResource}
                  onArchive={handleArchiveResource}
                  onDelete={handleDeleteResource}
                />
              ))}
            </div>
          </div>
        )}

        {/* Regular Resources */}
        <div>
          <h4 className="text-sm font-medium text-white mb-3">
            {typeFilter === 'all' ? 'All Resources' : typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
            ({regularResources.length})
          </h4>
          <div className="space-y-2">
            {regularResources.length > 0 ? (
              regularResources.map(resource => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  isLeader={isLeader}
                  onPin={handlePinResource}
                  onArchive={handleArchiveResource}
                  onDelete={handleDeleteResource}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <Folder className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">
                  {searchQuery ? `No resources found for "${searchQuery}"` : 'No resources yet'}
                </p>
                {canUpload && !searchQuery && (
                  <HiveButton
                    size="sm"
                    variant="outline"
                    className="mt-3"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    Add First Resource
                  </HiveButton>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({
  resource,
  isLeader,
  onPin,
  onArchive,
  onDelete
}: {
  resource: Resource;
  isLeader: boolean;
  onPin: (id: string, isPinned: boolean) => void;
  onArchive: (id: string, isArchived: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const handleDownload = async () => {
    try {
      const response = await api.get(resource.url, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = resource.title;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download resource:', error);
    }
  };

  const isOwnResource = resource.createdBy === 'current-user-id'; // TODO: get from auth context

  return (
    <HiveCard className={`p-3 border-gray-800 hover:border-gray-700 transition-colors ${
      resource.isPinned ? 'border-[var(--hive-brand-primary)]/30 bg-[var(--hive-brand-primary)]/5' : 'bg-gray-900/50'
    } ${resource.isArchived ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        {/* File Icon/Thumbnail */}
        <div className="flex-shrink-0">
          {resource.thumbnailUrl ? (
            <img
              src={resource.thumbnailUrl}
              alt=""
              className="w-12 h-12 object-cover rounded-lg"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
              {getFileIcon(resource.type, resource.fileType)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h5 className="font-medium text-white text-sm mb-1 flex items-center gap-2">
                {resource.title}
                {resource.isPinned && <Star className="w-3 h-3 text-[var(--hive-brand-primary)]" />}
                {resource.isArchived && <Archive className="w-3 h-3 text-gray-500" />}
              </h5>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>by {resource.creatorName}</span>
                <span>{new Date(resource.createdAt).toLocaleDateString()}</span>
                {resource.size && <span>{formatFileSize(resource.size)}</span>}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <HiveButton size="sm" variant="ghost">
                  <MoreVertical className="w-4 h-4" />
                </HiveButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                {resource.type === 'link' ? (
                  <DropdownMenuItem asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Link
                    </a>
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                )}
                {isLeader && (
                  <>
                    <DropdownMenuItem
                      onClick={() => onPin(resource.id, !resource.isPinned)}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      {resource.isPinned ? 'Unpin' : 'Pin'}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onArchive(resource.id, !resource.isArchived)}
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      {resource.isArchived ? 'Unarchive' : 'Archive'}
                    </DropdownMenuItem>
                  </>
                )}
                {(isLeader || isOwnResource) && (
                  <DropdownMenuItem
                    onClick={() => onDelete(resource.id)}
                    className="text-red-400 focus:text-red-400"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {resource.description && (
            <p className="text-xs text-gray-400 mb-2 line-clamp-2">
              {resource.description}
            </p>
          )}

          {/* Tags */}
          {resource.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {resource.tags.slice(0, 3).map(tag => (
                <Badge
                  key={tag}
                  className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-300"
                >
                  {tag}
                </Badge>
              ))}
              {resource.tags.length > 3 && (
                <Badge className="text-xs px-1.5 py-0.5 bg-gray-800 text-gray-300">
                  +{resource.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {resource.viewCount}
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {resource.downloadCount}
            </div>
            {resource.versions && resource.versions.length > 1 && (
              <div>v{resource.versions.length}</div>
            )}
          </div>
        </div>
      </div>
    </HiveCard>
  );
}