import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { motion } from '../../components/framer-motion-proxy';
import { Play, Pause, Volume2, VolumeX, Maximize, FileText, Download, Share2, BookmarkPlus, Eye, Heart, MessageSquare, MoreHorizontal, ChevronLeft, ChevronRight, ZoomIn, File, Video, Music, Image, Calendar, MapPin, Users, Clock } from 'lucide-react';

// HIVE Media Molecules - Campus Content Handling
const meta: Meta = {
  title: 'Molecules/🎬 Media Content',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**HIVE Media Molecules** - Campus content handling with dense responsive layouts

Brand-compliant media display patterns using strict HIVE color palette: Gold (var(--hive-brand-secondary)), Obsidian (#0A0A0B), and Platinum (#E5E5E7) variants only. Dense, efficient layouts that handle campus media content across all screen sizes.

## Brand Compliance
- **Gold Only**: HIVE Gold (var(--hive-brand-secondary)) for media controls and highlights
- **Black Variants**: Obsidian (var(--hive-background-primary)), Charcoal (#111113) for media backgrounds
- **White Variants**: Platinum (#E5E5E7), Silver (var(--hive-text-secondary)) for media text
- **Zero Non-Brand Colors**: No blues, greens, reds for media interfaces

## Dense Media Patterns
- **Compact Players**: Maximum functionality in minimal space
- **Touch-Friendly**: Media controls optimized for mobile interaction
- **Campus Context**: Media types relevant to university content
- **Quick Actions**: Frequently used media actions prominently placed

## Campus Media Types
- Lecture recordings and academic videos
- Campus event photos and galleries
- Student-created content and portfolios
- Study materials and document sharing
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Video Player - Lecture and Campus Content
const CampusVideoPlayer: React.FC<{
  title?: string;
  duration?: string;
  currentTime?: string;
  isPlaying?: boolean;
  isMuted?: boolean;
  views?: number;
  likes?: number;
  thumbnail?: string;
  course?: string;
  professor?: string;
  onPlay?: () => void;
  onMute?: () => void;
  onFullscreen?: () => void;
}> = ({ 
  title = 'CS 106B: Recursion and Backtracking - Lecture 15',
  duration = '1:23:45',
  currentTime = '18:32',
  isPlaying = false,
  isMuted = false,
  views = 234,
  likes = 67,
  thumbnail = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop',
  course = 'CS 106B',
  professor = 'Prof. Roberts',
  onPlay = () => {},
  onMute = () => {},
  onFullscreen = () => {}
}) => {
  const progress = 23; // Mock progress percentage

  return (
    <div className="bg-charcoal border border-steel rounded-lg overflow-hidden">
      {/* Video Thumbnail/Player */}
      <div className="relative aspect-video bg-obsidian group">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-obsidian/60 flex items-center justify-center group-hover:bg-obsidian/40 transition-colors">
          <button
            onClick={onPlay}
            className="w-16 h-16 bg-gold/90 hover:bg-gold rounded-full flex items-center justify-center transition-all hover:scale-105"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-obsidian ml-0" />
            ) : (
              <Play className="h-8 w-8 text-obsidian ml-1" />
            )}
          </button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-obsidian/80 text-platinum text-xs px-2 py-1 rounded">
          {duration}
        </div>

        {/* Course Badge */}
        <div className="absolute top-2 left-2 bg-gold text-obsidian text-xs font-semibold px-2 py-1 rounded">
          {course}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-steel">
        <div 
          className="h-full bg-gold transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <button onClick={onPlay} className="text-gold hover:text-champagne">
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={onMute} className="text-silver hover:text-platinum">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <span className="text-sm text-silver">
              {currentTime} / {duration}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="text-silver hover:text-gold">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="text-silver hover:text-gold">
              <BookmarkPlus className="h-4 w-4" />
            </button>
            <button onClick={onFullscreen} className="text-silver hover:text-platinum">
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-platinum line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs text-silver">
            <span>{professor}</span>
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{views}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{likes}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Document Viewer - Study Materials and Resources  
const CampusDocumentViewer: React.FC<{
  title?: string;
  type?: 'pdf' | 'doc' | 'slides';
  pages?: number;
  currentPage?: number;
  size?: string;
  uploadedBy?: string;
  downloadCount?: number;
  course?: string;
  onDownload?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}> = ({ 
  title = 'CS 106B Assignment 4: Recursion Problems',
  type = 'pdf',
  pages = 12,
  currentPage = 1,
  size = '2.4 MB',
  uploadedBy = 'Prof. Roberts',
  downloadCount = 89,
  course = 'CS 106B',
  onDownload = () => {},
  onShare = () => {},
  onBookmark = () => {}
}) => {
  const getTypeIcon = () => {
    switch (type) {
      case 'pdf': return FileText;
      case 'doc': return File;
      case 'slides': return Image;
      default: return FileText;
    }
  };

  const TypeIcon = getTypeIcon();

  return (
    <div className="bg-charcoal border border-steel rounded-lg overflow-hidden">
      {/* Document Preview */}
      <div className="aspect-[3/4] bg-graphite flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-3 bg-obsidian border-b border-steel">
          <div className="flex items-center space-x-2">
            <button className="p-1 rounded hover:bg-charcoal">
              <ChevronLeft className="h-4 w-4 text-silver" />
            </button>
            <span className="text-xs text-silver">
              {currentPage} / {pages}
            </span>
            <button className="p-1 rounded hover:bg-charcoal">
              <ChevronRight className="h-4 w-4 text-silver" />
            </button>
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="p-1 rounded hover:bg-charcoal">
              <ZoomIn className="h-4 w-4 text-silver" />
            </button>
            <button className="p-1 rounded hover:bg-charcoal">
              <MoreHorizontal className="h-4 w-4 text-silver" />
            </button>
          </div>
        </div>

        {/* Document Content Preview */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <TypeIcon className="h-16 w-16 text-gold mx-auto mb-4" />
            <div className="text-sm text-platinum font-medium mb-1">
              {type.toUpperCase()} Document
            </div>
            <div className="text-xs text-silver">
              Click to view full document
            </div>
          </div>
        </div>
      </div>

      {/* Document Info */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-platinum line-clamp-2 mb-1">
              {title}
            </h3>
            <div className="text-xs text-silver">
              {uploadedBy} • {size} • {pages} pages
            </div>
          </div>
          
          <div className="bg-gold text-obsidian text-xs font-semibold px-2 py-1 rounded ml-2">
            {course}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={onDownload}
              className="flex items-center space-x-1 text-gold hover:text-champagne"
            >
              <Download className="h-4 w-4" />
              <span className="text-xs font-medium">{downloadCount}</span>
            </button>
            <button
              onClick={onShare}
              className="text-silver hover:text-platinum"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={onBookmark}
              className="text-silver hover:text-gold"
            >
              <BookmarkPlus className="h-4 w-4" />
            </button>
          </div>
          
          <button className="bg-gold text-obsidian text-xs font-semibold px-3 py-1 rounded hover:bg-champagne transition-colors">
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

// Image Gallery - Campus Events and Photos
const CampusImageGallery: React.FC<{
  images?: Array<{
    id: string;
    url: string;
    caption: string;
    likes: number;
    comments: number;
  }>;
  event?: string;
  date?: string;
  location?: string;
  photographer?: string;
  totalImages?: number;
}> = ({ 
  images = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
      caption: 'HCI Club Design Thinking Workshop',
      likes: 23,
      comments: 5
    },
    {
      id: '2', 
      url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop',
      caption: 'Students collaborating on UI mockups',
      likes: 18,
      comments: 3
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      caption: 'Final presentation and demos',
      likes: 31,
      comments: 8
    }
  ],
  event = 'HCI Club Design Thinking Workshop',
  date = '2 days ago',
  location = 'd.school',
  photographer = 'Sarah Kim',
  totalImages = 24
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div className="bg-charcoal border border-steel rounded-lg overflow-hidden">
      {/* Main Image Display */}
      <div className="relative aspect-[4/3] bg-obsidian">
        <img
          src={images[currentIndex]?.url}
          alt={images[currentIndex]?.caption}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-obsidian/70 hover:bg-obsidian/90 rounded-full flex items-center justify-center transition-colors"
              disabled={currentIndex === 0}
            >
              <ChevronLeft className={`h-5 w-5 ${currentIndex === 0 ? 'text-pewter' : 'text-platinum'}`} />
            </button>
            <button
              onClick={() => setCurrentIndex(Math.min(images.length - 1, currentIndex + 1))}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-obsidian/70 hover:bg-obsidian/90 rounded-full flex items-center justify-center transition-colors"
              disabled={currentIndex === images.length - 1}
            >
              <ChevronRight className={`h-5 w-5 ${currentIndex === images.length - 1 ? 'text-pewter' : 'text-platinum'}`} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-obsidian/80 text-platinum text-xs px-2 py-1 rounded">
          {currentIndex + 1} / {totalImages}
        </div>

        {/* Event Badge */}
        <div className="absolute top-2 left-2 bg-gold text-obsidian text-xs font-semibold px-2 py-1 rounded">
          Event
        </div>
      </div>

      {/* Image Info */}
      <div className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-platinum mb-1">
              {event}
            </h3>
            <p className="text-xs text-silver line-clamp-2">
              {images[currentIndex]?.caption}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-silver">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{location}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{date}</span>
              </span>
            </div>
            <span>by {photographer}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-1 text-silver hover:text-gold">
                <Heart className="h-4 w-4" />
                <span className="text-xs">{images[currentIndex]?.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-silver hover:text-platinum">
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs">{images[currentIndex]?.comments}</span>
              </button>
              <button className="text-silver hover:text-platinum">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            <button className="text-xs text-gold hover:text-champagne font-medium">
              View All {totalImages}
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="border-t border-steel p-2">
          <div className="flex space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-colors ${
                  index === currentIndex ? 'border-gold' : 'border-steel hover:border-silver'
                }`}
              >
                <img
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Audio Player - Podcast and Lecture Audio
const CampusAudioPlayer: React.FC<{
  title?: string;
  artist?: string;
  duration?: string;
  currentTime?: string;
  isPlaying?: boolean;
  course?: string;
  episode?: string;
  onPlay?: () => void;
  onSkipBack?: () => void;
  onSkipForward?: () => void;
}> = ({ 
  title = 'CS 106B: Understanding Recursion',
  artist = 'Prof. Roberts',
  duration = '45:32',
  currentTime = '12:18',
  isPlaying = false,
  course = 'CS 106B',
  episode = 'Lecture 15 Audio',
  onPlay = () => {},
  onSkipBack = () => {},
  onSkipForward = () => {}
}) => {
  const progress = 27; // Mock progress percentage

  return (
    <div className="bg-charcoal border border-steel rounded-lg p-4">
      <div className="flex items-center space-x-4">
        {/* Album Art / Course Icon */}
        <div className="w-16 h-16 bg-graphite rounded-lg flex items-center justify-center flex-shrink-0">
          <Music className="h-8 w-8 text-gold" />
        </div>

        {/* Audio Info and Controls */}
        <div className="flex-1 min-w-0">
          <div className="space-y-2">
            <div>
              <h3 className="text-sm font-semibold text-platinum truncate">
                {title}
              </h3>
              <div className="flex items-center justify-between text-xs text-silver">
                <span>{artist} • {episode}</span>
                <span className="bg-gold text-obsidian px-2 py-0.5 rounded font-semibold">
                  {course}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-steel rounded-full h-1">
                <div 
                  className="bg-gold h-1 rounded-full transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-silver">
                <span>{currentTime}</span>
                <span>{duration}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={onSkipBack}
                className="text-silver hover:text-platinum"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={onPlay}
                className="w-10 h-10 bg-gold hover:bg-champagne rounded-full flex items-center justify-center transition-colors"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5 text-obsidian" />
                ) : (
                  <Play className="h-5 w-5 text-obsidian ml-0.5" />
                )}
              </button>
              
              <button
                onClick={onSkipForward}
                className="text-silver hover:text-platinum"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Media Grid - Campus Content Overview
const CampusMediaGrid: React.FC<{
  mediaItems?: Array<{
    id: string;
    type: 'video' | 'image' | 'audio' | 'document';
    title: string;
    thumbnail: string;
    duration?: string;
    course: string;
    views: number;
    date: string;
  }>;
}> = ({ 
  mediaItems = [
    {
      id: '1',
      type: 'video',
      title: 'CS 106B Lecture 15: Recursion',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop',
      duration: '1:23:45',
      course: 'CS 106B',
      views: 234,
      date: '2 days ago'
    },
    {
      id: '2',
      type: 'document',
      title: 'Assignment 4: Recursion Problems',
      thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&h=200&fit=crop',
      course: 'CS 106B',
      views: 89,
      date: '1 week ago'
    },
    {
      id: '3',
      type: 'image',
      title: 'HCI Workshop Photos',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop',
      course: 'HCI Club',
      views: 156,
      date: '3 days ago'
    },
    {
      id: '4',
      type: 'audio',
      title: 'Study Tips Podcast',
      thumbnail: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=300&h=200&fit=crop',
      duration: '32:18',
      course: 'Study Tips',
      views: 67,
      date: '5 days ago'
    }
  ]
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Music;
      case 'document': return FileText;
      case 'image': return Image;
      default: return File;
    }
  };

  return (
    <div className="bg-charcoal border border-steel rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-platinum">Campus Media</h3>
        <button className="text-xs text-gold hover:text-champagne font-medium">
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mediaItems.map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          
          return (
            <div key={item.id} className="bg-graphite rounded-lg overflow-hidden hover:bg-slate transition-colors cursor-pointer">
              <div className="relative aspect-video">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Type Icon */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-obsidian/80 rounded flex items-center justify-center">
                  <TypeIcon className="h-3 w-3 text-gold" />
                </div>

                {/* Duration */}
                {item.duration && (
                  <div className="absolute bottom-2 right-2 bg-obsidian/80 text-platinum text-xs px-1 py-0.5 rounded">
                    {item.duration}
                  </div>
                )}

                {/* Course Badge */}
                <div className="absolute top-2 right-2 bg-gold text-obsidian text-xs font-semibold px-1 py-0.5 rounded">
                  {item.course}
                </div>
              </div>

              <div className="p-2">
                <h4 className="text-xs font-medium text-platinum line-clamp-2 mb-1">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-silver">
                  <span>{item.views} views</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Stories

export const CampusLectureVideo: Story = {
  name: '🎥 Campus Lecture Video',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-md mx-auto">
        <CampusVideoPlayer />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <Video className="h-8 w-8 text-gold mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Lecture Recordings</h3>
          <p className="text-sm text-silver">
            Campus video player optimized for academic content with course branding and engagement metrics
          </p>
        </div>
      </div>
    </div>
  )
};

export const StudyMaterialDocuments: Story = {
  name: '📄 Study Material Viewer',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-md mx-auto">
        <CampusDocumentViewer />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <FileText className="h-8 w-8 text-gold mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Academic Documents</h3>
          <p className="text-sm text-silver">
            Document viewer for assignments, handouts, and study materials with download tracking
          </p>
        </div>
      </div>
    </div>
  )
};

export const CampusEventGallery: Story = {
  name: '📸 Campus Event Gallery',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-md mx-auto">
        <CampusImageGallery />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <Image className="h-8 w-8 text-gold mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Event Photos</h3>
          <p className="text-sm text-silver">
            Interactive image gallery for campus events with engagement metrics and thumbnail navigation
          </p>
        </div>
      </div>
    </div>
  )
};

export const LectureAudioPlayer: Story = {
  name: '🎵 Lecture Audio Player',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-md mx-auto">
        <CampusAudioPlayer />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <Music className="h-8 w-8 text-gold mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Audio Content</h3>
          <p className="text-sm text-silver">
            Compact audio player for lecture recordings and educational podcasts with course branding
          </p>
        </div>
      </div>
    </div>
  )
};

export const CampusMediaOverview: Story = {
  name: '📱 Campus Media Grid',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-md mx-auto">
        <CampusMediaGrid />
        <div className="mt-6 bg-charcoal rounded-lg p-4 text-center">
          <File className="h-8 w-8 text-gold mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Media Library</h3>
          <p className="text-sm text-silver">
            Dense grid layout for browsing campus media content across different types and courses
          </p>
        </div>
      </div>
    </div>
  )
};

export const DenseMobileMediaHub: Story = {
  name: '📱 Dense Mobile Media Hub',
  render: () => (
    <div className="bg-obsidian p-4 min-h-screen">
      <div className="max-w-sm mx-auto space-y-4">
        <CampusVideoPlayer />
        <CampusAudioPlayer />
        <CampusMediaGrid />
        
        <div className="bg-charcoal rounded-lg p-4 text-center">
          <Video className="h-8 w-8 text-gold mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-platinum mb-2">Complete Media System</h3>
          <p className="text-sm text-silver">
            Dense mobile layout showcasing all campus media types in a compact, touch-friendly interface
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile2' }
  }
};

export const ResponsiveMediaGrid: Story = {
  name: '📐 Responsive Media Layout',
  render: () => (
    <div className="bg-obsidian p-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CampusVideoPlayer />
          <CampusDocumentViewer />
          <CampusImageGallery />
          <div className="md:col-span-2 lg:col-span-1">
            <CampusAudioPlayer />
          </div>
          <div className="md:col-span-2">
            <CampusMediaGrid />
          </div>
        </div>
        
        <div className="mt-8 bg-charcoal rounded-lg p-6 text-center">
          <Video className="h-12 w-12 text-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-platinum mb-4">Campus Media Ecosystem</h2>
          <p className="text-silver max-w-2xl mx-auto">
            Comprehensive responsive media system that adapts from single-column mobile to 
            three-column desktop, maintaining media clarity and interaction design across all screen sizes
          </p>
        </div>
      </div>
    </div>
  )
};