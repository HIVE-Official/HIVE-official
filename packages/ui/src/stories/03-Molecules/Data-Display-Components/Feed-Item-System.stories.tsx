import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Users, MapPin, Clock, Calendar, BookOpen, Pin, Trash2, Edit, ChevronUp, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';

const meta: Meta<typeof React.Fragment> = {
  title: '03-Molecules/Data-Display-Components/Feed Item System',
  component: React.Fragment,
  parameters: {
    docs: {
      description: {
        component: `
# HIVE Feed Item System

A comprehensive feed display system for University at Buffalo campus content. These molecular components handle the display of posts, announcements, events, and study sessions with campus-specific context and social interaction features.

## Campus Integration Features
- **Academic Content** - Study session announcements, course discussions, and academic resource sharing
- **Social Activity** - Campus events, space updates, and community announcements
- **Location Context** - Campus building references, dorm communities, and study location suggestions
- **Time Awareness** - Class schedules, event timing, and academic calendar integration

## Feed Item Types
- **Text Posts** - Simple text updates from students and spaces with engagement features
- **Event Announcements** - Campus events, study sessions, and social gatherings with RSVP
- **Resource Sharing** - Academic materials, study guides, and useful campus information
- **Space Updates** - New member announcements, space activity, and community milestones

## Interactive Elements
- **Engagement Actions** - Like, comment, share, and bookmark with real-time feedback
- **Context Actions** - Join events, save resources, and connect with content creators
- **Moderation Tools** - Report content, pin important posts, and manage space content
- **Quick Responses** - Emoji reactions, quick RSVP, and one-click interactions

## Content Features
- **Rich Media Support** - Text, images, links, and embedded campus resources
- **Smart Previews** - Automatic link previews for campus resources and external content
- **Threaded Comments** - Organized discussion with reply chains and engagement metrics
- **Real-time Updates** - Live engagement counts, new comments, and activity indicators
        `
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Campus Feed Data
const campusFeedData = [
  {
    id: '1',
    type: 'text_post',
    author: {
      name: 'Sarah Chen',
      handle: '@sarahc.cs',
      avatar: '/api/placeholder/40/40',
      major: 'Computer Science',
      year: 'Junior'
    },
    space: {
      name: 'CSE 115 Study Group',
      type: 'Academic'
    },
    content: {
      text: 'Just finished reviewing the binary trees chapter! The visualization exercises really helped me understand the traversal algorithms. Anyone want to practice together before tomorrow\'s quiz? 🌳',
      images: [],
      links: []
    },
    location: 'Lockwood Library',
    timestamp: '2 hours ago',
    engagement: {
      likes: 12,
      comments: 5,
      shares: 2,
      bookmarks: 8
    },
    interactions: {
      hasLiked: false,
      hasBookmarked: true,
      hasShared: false
    },
    isPinned: false,
    tags: ['Study Session', 'CSE 115', 'Data Structures']
  },
  {
    id: '2',
    type: 'event_announcement',
    author: {
      name: 'Marcus Johnson',
      handle: '@marcus.biz',
      avatar: '/api/placeholder/40/40',
      major: 'Business Administration',
      year: 'Senior'
    },
    space: {
      name: 'Entrepreneurship Club',
      type: 'Organization'
    },
    content: {
      text: 'Pitch Night is this Friday! Come present your startup ideas or just listen and network. Pizza and networking afterwards! 🍕',
      images: ['/api/placeholder/500/300'],
      links: [
        {
          url: 'https://ub.edu/entrepreneurship-club',
          title: 'UB Entrepreneurship Club',
          description: 'Official club page with event details and registration'
        }
      ]
    },
    event: {
      title: 'Monthly Pitch Night',
      date: 'Friday, March 15',
      time: '6:00 PM - 8:00 PM',
      location: 'Student Union Room 330',
      rsvpCount: 23,
      hasRSVP: false
    },
    timestamp: '5 hours ago',
    engagement: {
      likes: 34,
      comments: 12,
      shares: 8,
      bookmarks: 15
    },
    interactions: {
      hasLiked: true,
      hasBookmarked: false,
      hasShared: false
    },
    isPinned: true,
    tags: ['Event', 'Entrepreneurship', 'Networking']
  },
  {
    id: '3',
    type: 'resource_share',
    author: {
      name: 'Emily Rodriguez',
      handle: '@emily.psych',
      avatar: '/api/placeholder/40/40',
      major: 'Psychology',
      year: 'Sophomore'
    },
    space: {
      name: 'Psychology Research Group',
      type: 'Academic'
    },
    content: {
      text: 'Found this amazing research paper on cognitive behavioral therapy applications in college settings. Really relevant for our upcoming project discussion! 📚',
      images: [],
      links: [
        {
          url: 'https://psycnet.apa.org/record/2024-12345-001',
          title: 'CBT Applications in University Mental Health Services',
          description: 'Recent research on implementing CBT techniques in campus counseling centers'
        }
      ]
    },
    timestamp: '1 day ago',
    engagement: {
      likes: 18,
      comments: 7,
      shares: 12,
      bookmarks: 24
    },
    interactions: {
      hasLiked: false,
      hasBookmarked: true,
      hasShared: true
    },
    isPinned: false,
    tags: ['Research', 'Psychology', 'Mental Health']
  },
  {
    id: '4',
    type: 'space_update',
    author: {
      name: 'Alex Rivera',
      handle: '@alex.floor3',
      avatar: '/api/placeholder/40/40',
      major: 'Undecided',
      year: 'Freshman'
    },
    space: {
      name: 'Ellicott Floor 3',
      type: 'Residential'
    },
    content: {
      text: 'Floor movie night is happening tonight! We\'re watching The Social Network in the common room. Popcorn and snacks provided! Who\'s in? 🍿',
      images: [],
      links: []
    },
    location: 'Ellicott Complex Floor 3 Common Room',
    timestamp: '30 minutes ago',
    engagement: {
      likes: 8,
      comments: 14,
      shares: 1,
      bookmarks: 3
    },
    interactions: {
      hasLiked: true,
      hasBookmarked: false,
      hasShared: false
    },
    isPinned: false,
    tags: ['Dorm Life', 'Social Event', 'Movie Night']
  }
];

// Text Post Feed Items Story
export const TextPostFeedItems: Story = {
  render: () => {
    const [feedItems, setFeedItems] = React.useState(campusFeedData.filter(item => item.type === 'text_post' || item.type === 'space_update'));
    const [expandedComments, setExpandedComments] = React.useState<Record<string, boolean>>({});

    const handleLike = (itemId: string) => {
      setFeedItems(prev => prev.map(item => 
        item.id === itemId 
          ? {
              ...item,
              interactions: { ...item.interactions, hasLiked: !item.interactions.hasLiked },
              engagement: { 
                ...item.engagement, 
                likes: item.interactions.hasLiked ? item.engagement.likes - 1 : item.engagement.likes + 1 
              }
            }
          : item
      ));
    };

    const handleBookmark = (itemId: string) => {
      setFeedItems(prev => prev.map(item => 
        item.id === itemId 
          ? {
              ...item,
              interactions: { ...item.interactions, hasBookmarked: !item.interactions.hasBookmarked },
              engagement: { 
                ...item.engagement, 
                bookmarks: item.interactions.hasBookmarked ? item.engagement.bookmarks - 1 : item.engagement.bookmarks + 1 
              }
            }
          : item
      ));
    };

    return (
      <div className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Campus Feed - Text Posts</h2>
          <p className="text-lg text-gray-600">Student updates and community discussions</p>
        </div>

        <div className="space-y-6">
          {feedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              {/* Post Header */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.author.avatar} alt={item.author.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {item.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{item.author.name}</h3>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{item.timestamp}</span>
                        {item.isPinned && (
                          <Pin className="h-4 w-4 text-blue-600" />
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.author.major} • {item.author.year}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {item.space.name}
                        </Badge>
                        {item.location && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="h-3 w-3" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Post Content */}
              <CardContent className="pt-0">
                <div className="mb-4">
                  <p className="text-gray-900 leading-relaxed">{item.content.text}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Engagement Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => handleLike(item.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        item.interactions.hasLiked 
                          ? 'text-red-600 hover:text-red-700' 
                          : 'text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${item.interactions.hasLiked ? 'fill-current' : ''}`} />
                      <span>{item.engagement.likes}</span>
                    </button>
                    
                    <button 
                      onClick={() => setExpandedComments(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{item.engagement.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span>{item.engagement.shares}</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => handleBookmark(item.id)}
                    className={`p-1 transition-colors ${
                      item.interactions.hasBookmarked 
                        ? 'text-yellow-600 hover:text-yellow-700' 
                        : 'text-gray-600 hover:text-yellow-600'
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${item.interactions.hasBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Comments Section */}
                {expandedComments[item.id] && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                            MJ
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="font-medium text-sm text-gray-900">Mike Johnson</div>
                            <div className="text-sm text-gray-700">Count me in! I need to review that chapter too.</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">1 hour ago</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                            ER
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="font-medium text-sm text-gray-900">Emma Roberts</div>
                            <div className="text-sm text-gray-700">Same! Let's meet at 3pm in the study room?</div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">45 minutes ago</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
};

// Event Announcement Feed Items Story
export const EventAnnouncementFeedItems: Story = {
  render: () => {
    const [feedItems, setFeedItems] = React.useState(campusFeedData.filter(item => item.type === 'event_announcement'));

    const handleRSVP = (itemId: string) => {
      setFeedItems(prev => prev.map(item => 
        item.id === itemId && item.event
          ? {
              ...item,
              event: {
                ...item.event,
                hasRSVP: !item.event.hasRSVP,
                rsvpCount: item.event.hasRSVP ? item.event.rsvpCount - 1 : item.event.rsvpCount + 1
              }
            }
          : item
      ));
    };

    return (
      <div className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Campus Events Feed</h2>
          <p className="text-lg text-gray-600">Upcoming events and announcements</p>
        </div>

        <div className="space-y-6">
          {feedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              {/* Pinned Badge */}
              {item.isPinned && (
                <div className="bg-blue-600 text-white px-4 py-2 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Pin className="h-4 w-4" />
                    <span>Pinned Event</span>
                  </div>
                </div>
              )}

              {/* Post Header */}
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.author.avatar} alt={item.author.name} />
                      <AvatarFallback className="bg-green-100 text-green-600 font-semibold">
                        {item.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{item.author.name}</h3>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{item.timestamp}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.author.major} • {item.author.year}
                      </div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.space.name}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Post Content */}
              <CardContent className="pt-0">
                <div className="mb-4">
                  <p className="text-gray-900 leading-relaxed">{item.content.text}</p>
                </div>

                {/* Event Image */}
                {item.content.images.length > 0 && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={item.content.images[0]} 
                      alt="Event banner"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Event Details Card */}
                {item.event && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border border-blue-200">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.event.title}</h4>
                        <div className="space-y-1 mt-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>{item.event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{item.event.time}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span>{item.event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">RSVPs</div>
                        <div className="text-xl font-bold text-blue-600">{item.event.rsvpCount}</div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleRSVP(item.id)}
                      className={`w-full ${
                        item.event.hasRSVP 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      }`}
                    >
                      {item.event.hasRSVP ? 'Going ✓' : 'RSVP'}
                    </Button>
                  </div>
                )}

                {/* Link Previews */}
                {item.content.links.map((link, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 mb-4 hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium text-gray-900 text-sm">{link.title}</div>
                    <div className="text-sm text-gray-600 mt-1">{link.description}</div>
                    <div className="text-xs text-blue-600 mt-2">{link.url}</div>
                  </div>
                ))}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Engagement Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <button className={`flex items-center gap-2 text-sm transition-colors ${
                      item.interactions.hasLiked 
                        ? 'text-red-600 hover:text-red-700' 
                        : 'text-gray-600 hover:text-red-600'
                    }`}>
                      <Heart className={`h-4 w-4 ${item.interactions.hasLiked ? 'fill-current' : ''}`} />
                      <span>{item.engagement.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{item.engagement.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span>{item.engagement.shares}</span>
                    </button>
                  </div>

                  <button className={`p-1 transition-colors ${
                    item.interactions.hasBookmarked 
                      ? 'text-yellow-600 hover:text-yellow-700' 
                      : 'text-gray-600 hover:text-yellow-600'
                  }`}>
                    <Bookmark className={`h-4 w-4 ${item.interactions.hasBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
};

// Interactive Feed Demo Story
export const InteractiveFeedDemo: Story = {
  render: () => {
    const [feedItems, setFeedItems] = React.useState(campusFeedData);
    const [filter, setFilter] = React.useState('all');
    const [sortBy, setSortBy] = React.useState('recent');

    const handleLike = (itemId: string) => {
      setFeedItems(prev => prev.map(item => 
        item.id === itemId 
          ? {
              ...item,
              interactions: { ...item.interactions, hasLiked: !item.interactions.hasLiked },
              engagement: { 
                ...item.engagement, 
                likes: item.interactions.hasLiked ? item.engagement.likes - 1 : item.engagement.likes + 1 
              }
            }
          : item
      ));
    };

    const handleBookmark = (itemId: string) => {
      setFeedItems(prev => prev.map(item => 
        item.id === itemId 
          ? {
              ...item,
              interactions: { ...item.interactions, hasBookmarked: !item.interactions.hasBookmarked }
            }
          : item
      ));
    };

    const filteredItems = feedItems.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'academic') return item.space.type === 'Academic';
      if (filter === 'social') return item.space.type === 'Organization' || item.space.type === 'Residential';
      if (filter === 'events') return item.type === 'event_announcement';
      return true;
    });

    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortBy === 'recent') return 0; // Keep original order
      if (sortBy === 'popular') return b.engagement.likes - a.engagement.likes;
      if (sortBy === 'comments') return b.engagement.comments - a.engagement.comments;
      return 0;
    });

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Campus Feed</h2>
          <p className="text-lg text-gray-600">Filter, sort, and interact with campus content</p>
        </div>

        {/* Feed Controls */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border border-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Filter:</span>
              <div className="flex gap-1">
                {[
                  { value: 'all', label: 'All' },
                  { value: 'academic', label: 'Academic' },
                  { value: 'social', label: 'Social' },
                  { value: 'events', label: 'Events' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      filter === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <div className="flex gap-1">
                {[
                  { value: 'recent', label: 'Recent' },
                  { value: 'popular', label: 'Popular' },
                  { value: 'comments', label: 'Most Discussed' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      sortBy === option.value
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Feed Items */}
        <div className="space-y-6">
          {sortedItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.author.avatar} alt={item.author.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                        {item.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{item.author.name}</h3>
                        <span className="text-gray-500">•</span>
                        <span className="text-sm text-gray-600">{item.timestamp}</span>
                        {item.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.author.major} • {item.author.year}
                      </div>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.space.name}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-900 leading-relaxed mb-4">{item.content.text}</p>

                {/* Event Details */}
                {item.event && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.event.title}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{item.event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{item.event.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        {item.event.rsvpCount} people going
                      </div>
                      <Button size="sm" variant={item.event.hasRSVP ? 'default' : 'outline'}>
                        {item.event.hasRSVP ? 'Going' : 'RSVP'}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Engagement Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => handleLike(item.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        item.interactions.hasLiked 
                          ? 'text-red-600 hover:text-red-700' 
                          : 'text-gray-600 hover:text-red-600'
                      }`}
                    >
                      <Heart className={`h-4 w-4 ${item.interactions.hasLiked ? 'fill-current' : ''}`} />
                      <span>{item.engagement.likes}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{item.engagement.comments}</span>
                    </button>
                    
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span>{item.engagement.shares}</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => handleBookmark(item.id)}
                    className={`p-1 transition-colors ${
                      item.interactions.hasBookmarked 
                        ? 'text-yellow-600 hover:text-yellow-700' 
                        : 'text-gray-600 hover:text-yellow-600'
                    }`}
                  >
                    <Bookmark className={`h-4 w-4 ${item.interactions.hasBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h4 className="font-semibold text-indigo-900 mb-2">Feed System Features</h4>
          <ul className="text-sm text-indigo-800 space-y-1">
            <li>• Real-time interaction feedback with like, comment, and bookmark actions</li>
            <li>• Smart filtering by content type and campus community categories</li>
            <li>• Dynamic sorting by recency, popularity, and engagement metrics</li>
            <li>• Event integration with RSVP functionality and calendar context</li>
          </ul>
        </div>
      </div>
    );
  }
};
