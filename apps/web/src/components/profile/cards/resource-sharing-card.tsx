"use client";

import React, { useState } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  Package,
  BookOpen,
  Car,
  Home,
  Utensils,
  Laptop,
  Camera,
  Headphones,
  Calculator,
  FileText,
  DollarSign,
  Share2,
  Plus,
  Search,
  TrendingUp,
  Clock,
  MapPin,
  User,
  Star,
  CheckCircle,
  AlertCircle,
  Heart,
  MessageCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Resource {
  id: string;
  type: 'textbook' | 'equipment' | 'ride' | 'housing' | 'meal' | 'notes' | 'tutoring';
  title: string;
  description: string;
  owner: {
    name: string;
    avatar?: string;
    rating: number;
    verified: boolean;
  };
  price?: number;
  condition?: 'new' | 'like-new' | 'good' | 'fair';
  availability: string;
  location?: string;
  tags: string[];
  saves: number;
  views: number;
  isUrgent?: boolean;
  isFeatured?: boolean;
}

interface ResourceRequest {
  id: string;
  type: string;
  title: string;
  requester: string;
  urgency: 'low' | 'medium' | 'high';
  budget?: number;
  deadline?: Date;
  responses: number;
}

interface ResourceSharingCardProps {
  className?: string;
  userResources?: Resource[];
  userRequests?: ResourceRequest[];
}

export function ResourceSharingCard({ 
  className,
  userResources = [],
  userRequests = []
}: ResourceSharingCardProps) {
  const router = useRouter();
  const [view, setView] = useState<'browse' | 'share' | 'requests'>('browse');
  const [filterType, setFilterType] = useState<string>('all');
  
  // Mock data for available resources
  const availableResources: Resource[] = [
    {
      id: '1',
      type: 'textbook',
      title: 'Calculus: Early Transcendentals',
      description: 'Stewart 8th Edition - Great condition, minimal highlighting',
      owner: {
        name: 'Sarah Chen',
        rating: 4.9,
        verified: true
      },
      price: 45,
      condition: 'good',
      availability: 'Available now',
      location: 'North Campus',
      tags: ['MTH 241', 'Fall 2024'],
      saves: 12,
      views: 67,
      isFeatured: true
    },
    {
      id: '2',
      type: 'ride',
      title: 'Daily Ride to South Campus',
      description: 'Leaving North Campus at 8:30am Mon-Fri, 3 seats available',
      owner: {
        name: 'Mike Johnson',
        rating: 4.7,
        verified: true
      },
      availability: 'Weekdays',
      location: 'Ellicott Complex',
      tags: ['morning', 'south-campus'],
      saves: 8,
      views: 34,
      isUrgent: false
    },
    {
      id: '3',
      type: 'equipment',
      title: 'TI-84 Plus Calculator',
      description: 'Perfect for stats and calc classes, includes cable',
      owner: {
        name: 'Emily Rodriguez',
        rating: 5.0,
        verified: false
      },
      price: 25,
      condition: 'like-new',
      availability: 'Available for semester',
      location: 'Capen Library',
      tags: ['calculator', 'math', 'statistics'],
      saves: 5,
      views: 23
    },
    {
      id: '4',
      type: 'notes',
      title: 'CSE 250 Complete Notes + Practice Exams',
      description: 'Comprehensive notes from Fall 2023, includes all practice exams with solutions',
      owner: {
        name: 'Alex Park',
        rating: 4.8,
        verified: true
      },
      price: 0,
      availability: 'Digital download',
      tags: ['CSE 250', 'data-structures', 'free'],
      saves: 34,
      views: 189,
      isFeatured: true
    },
    {
      id: '5',
      type: 'meal',
      title: 'Meal Swipe Exchange',
      description: 'Have extra dining dollars, looking to trade for meal swipes',
      owner: {
        name: 'Lisa Wang',
        rating: 4.6,
        verified: true
      },
      availability: 'This week',
      location: 'Student Union',
      tags: ['dining', 'trade'],
      saves: 3,
      views: 15
    }
  ];
  
  // Mock data for resource requests
  const activeRequests: ResourceRequest[] = [
    {
      id: '1',
      type: 'textbook',
      title: 'Need: Organic Chemistry textbook',
      requester: 'James Liu',
      urgency: 'high',
      budget: 60,
      deadline: new Date(Date.now() + 86400000 * 3),
      responses: 2
    },
    {
      id: '2',
      type: 'ride',
      title: 'Looking for ride to airport Friday',
      requester: 'Maria Garcia',
      urgency: 'medium',
      budget: 20,
      deadline: new Date(Date.now() + 86400000 * 5),
      responses: 1
    },
    {
      id: '3',
      type: 'tutoring',
      title: 'Physics 107 tutor needed ASAP',
      requester: 'David Kim',
      urgency: 'high',
      budget: 25,
      responses: 4
    }
  ];
  
  // Filter resources by type
  const filteredResources = filterType === 'all' 
    ? availableResources 
    : availableResources.filter(r => r.type === filterType);
  
  // Get resource type icon
  const getResourceIcon = (type: string) => {
    switch(type) {
      case 'textbook': return BookOpen;
      case 'equipment': return Laptop;
      case 'ride': return Car;
      case 'housing': return Home;
      case 'meal': return Utensils;
      case 'notes': return FileText;
      case 'tutoring': return User;
      default: return Package;
    }
  };
  
  // Get resource type color
  const getResourceColor = (type: string) => {
    switch(type) {
      case 'textbook': return 'text-blue-400 bg-blue-500/10';
      case 'equipment': return 'text-[var(--hive-gold)] bg-[var(--hive-gold)]/10';
      case 'ride': return 'text-green-400 bg-green-500/10';
      case 'housing': return 'text-[var(--hive-gold)] bg-[var(--hive-gold)]/10';
      case 'meal': return 'text-pink-400 bg-pink-500/10';
      case 'notes': return 'text-[var(--hive-gold)] bg-[var(--hive-gold)]/10';
      case 'tutoring': return 'text-indigo-400 bg-indigo-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Package className="h-5 w-5 text-green-400" />
          <h3 className="font-semibold text-foreground">Resource Network</h3>
        </div>
        <Button
          onClick={() => router.push('/resources')}
          variant="ghost"
          size="sm"
          className="text-xs"
        >
          View All
        </Button>
      </div>
      
      {/* Stats Bar */}
      <div className="mb-4 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">247</div>
            <div className="text-[10px] text-muted-foreground">Resources</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-400">$3.2k</div>
            <div className="text-[10px] text-muted-foreground">Saved/Month</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--hive-gold)]">89%</div>
            <div className="text-[10px] text-muted-foreground">Success Rate</div>
          </div>
        </div>
      </div>
      
      {/* View Tabs */}
      <div className="flex items-center gap-1 mb-4">
        <button
          onClick={() => setView('browse')}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
            view === 'browse' 
              ? 'bg-green-500 text-[var(--hive-text-primary)]' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          Browse
        </button>
        <button
          onClick={() => setView('share')}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
            view === 'share' 
              ? 'bg-green-500 text-[var(--hive-text-primary)]' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          Share
        </button>
        <button
          onClick={() => setView('requests')}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors relative ${
            view === 'requests' 
              ? 'bg-green-500 text-[var(--hive-text-primary)]' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          Requests
          {activeRequests.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-[var(--hive-text-primary)] text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              {activeRequests.length}
            </span>
          )}
        </button>
      </div>
      
      {/* Browse Resources */}
      {view === 'browse' && (
        <div>
          {/* Filter Pills */}
          <div className="flex items-center gap-1 mb-3 flex-wrap">
            <button
              onClick={() => setFilterType('all')}
              className={`text-[10px] px-2 py-1 rounded-full transition-colors ${
                filterType === 'all' 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {['textbook', 'notes', 'equipment', 'ride', 'meal'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`text-[10px] px-2 py-1 rounded-full transition-colors ${
                  filterType === type 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}s
              </button>
            ))}
          </div>
          
          {/* Resources List */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {filteredResources.map((resource) => {
              const Icon = getResourceIcon(resource.type);
              return (
                <div
                  key={resource.id}
                  className="p-3 border border-border/50 rounded-lg hover:border-green-500/50 transition-all cursor-pointer group"
                  onClick={() => router.push(`/resources/${resource.id}`)}
                >
                  <div className="flex items-start gap-3">
                    {/* Resource Type Icon */}
                    <div className={`p-2 rounded-lg ${getResourceColor(resource.type)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    
                    {/* Resource Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className="font-medium text-sm text-foreground">
                            {resource.title}
                          </h4>
                          {resource.isFeatured && (
                            <Badge variant="default" className="text-[10px] bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] ml-2">
                              Featured
                            </Badge>
                          )}
                        </div>
                        {resource.price !== undefined && (
                          <div className="text-sm font-bold text-green-400">
                            {resource.price === 0 ? 'FREE' : `$${resource.price}`}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                        {resource.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex items-center gap-1 mb-2">
                        {resource.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-muted rounded">
                            {tag}
                          </span>
                        ))}
                        {resource.condition && (
                          <span className="text-[10px] px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded">
                            {resource.condition}
                          </span>
                        )}
                      </div>
                      
                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {resource.owner.name}
                            {resource.owner.verified && (
                              <CheckCircle className="h-3 w-3 text-blue-400" />
                            )}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 text-[var(--hive-gold)] fill-[var(--hive-gold)]" />
                            {resource.owner.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            {resource.saves}
                          </span>
                          <span>{resource.views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Action (shows on hover) */}
                  <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" className="flex-1 text-xs">
                      Claim
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Share Resources */}
      {view === 'share' && (
        <div className="space-y-4">
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <h4 className="font-medium text-sm text-foreground mb-2">Share Your Resources</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Help your campus community by sharing resources you no longer need.
            </p>
            
            <div className="grid grid-cols-2 gap-2">
              {[
                { type: 'textbook', label: 'Textbook', icon: BookOpen },
                { type: 'notes', label: 'Notes', icon: FileText },
                { type: 'equipment', label: 'Equipment', icon: Laptop },
                { type: 'ride', label: 'Ride Share', icon: Car },
                { type: 'meal', label: 'Meal Swipe', icon: Utensils },
                { type: 'other', label: 'Other', icon: Package }
              ].map(item => (
                <button
                  key={item.type}
                  onClick={() => router.push(`/resources/share?type=${item.type}`)}
                  className="p-3 border border-border/50 rounded-lg hover:border-green-500/50 transition-all text-left"
                >
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-green-400" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Your Active Shares */}
          {userResources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Your Active Shares</h4>
              <div className="space-y-2">
                {userResources.slice(0, 2).map(resource => (
                  <div key={resource.id} className="p-2 bg-muted/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{resource.title}</span>
                      <span className="text-xs text-green-400">{resource.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Resource Requests */}
      {view === 'requests' && (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {activeRequests.map((request) => (
            <div
              key={request.id}
              className="p-3 border border-border/50 rounded-lg hover:border-[var(--hive-gold)]/50 transition-all cursor-pointer"
              onClick={() => router.push(`/resources/requests/${request.id}`)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-sm text-foreground">
                    {request.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    by {request.requester}
                  </p>
                </div>
                <Badge 
                  variant={request.urgency === 'high' ? 'destructive' : 'secondary'}
                  className="text-[10px]"
                >
                  {request.urgency}
                </Badge>
              </div>
              
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {request.budget && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    Budget: ${request.budget}
                  </span>
                )}
                {request.deadline && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {Math.ceil((request.deadline.getTime() - Date.now()) / 86400000)}d left
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {request.responses} responses
                </span>
              </div>
              
              <div className="mt-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Offer to Help
                </Button>
              </div>
            </div>
          ))}
          
          {activeRequests.length === 0 && (
            <div className="text-center py-8">
              <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No active requests</p>
              <p className="text-xs text-muted-foreground mt-1">
                Check back later or browse available resources
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Impact Metrics */}
      <div className="mt-4 p-3 bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-500/20 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-foreground">Community Impact</span>
          <TrendingUp className="h-4 w-4 text-green-400" />
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3 text-green-400" />
            <span className="text-muted-foreground">Given: 12 resources</span>
          </div>
          <div className="flex items-center gap-1">
            <ArrowDownRight className="h-3 w-3 text-blue-400" />
            <span className="text-muted-foreground">Received: 8 resources</span>
          </div>
        </div>
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-green-400 to-blue-400" style={{width: '75%'}} />
        </div>
      </div>
    </Card>
  );
}