"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@hive/ui";
import { Button } from "@hive/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@hive/ui";
import { Badge } from "@hive/ui";
import { useDebounce } from "@hive/hooks";
import { 
  Search, 
  Users, 
  Sparkles, 
  Crown, 
  Calendar, 
  GraduationCap, 
  Building, 
  Coffee, 
  Briefcase,
  MapPin,
  Clock,
  Loader2
} from "lucide-react";

// Space categories with proper HIVE branding
const SPACE_CATEGORIES = [
  { value: "all", label: "All Spaces", icon: Users },
  { value: "academic", label: "Academic", icon: GraduationCap },
  { value: "residential", label: "Residential", icon: Building },
  { value: "social", label: "Social", icon: Coffee },
  { value: "professional", label: "Professional", icon: Briefcase },
  { value: "preview", label: "Preview Mode", icon: Crown },
];

// Mock data for spaces - this would come from your API
const MOCK_SPACES = [
  {
    id: "cs-majors",
    name: "CS Majors",
    category: "academic",
    description: "Connect with fellow Computer Science students, share resources, and build together",
    potentialMembers: 1247,
    isPreviewMode: true,
    rssEvents: [
      { title: "CS Department Info Session", date: "2025-01-15", source: "CS Department" },
      { title: "Tech Career Fair", date: "2025-01-20", source: "Career Services" },
      { title: "Algorithm Study Group", date: "2025-01-18", source: "CS Department" },
    ],
    lastActivity: "2025-01-10",
    tags: ["Computer Science", "STEM", "Academic"]
  },
  {
    id: "ellicott-complex",
    name: "Ellicott Complex",
    category: "residential",
    description: "For students living in Ellicott Complex - events, study groups, and community building",
    potentialMembers: 892,
    isPreviewMode: true,
    rssEvents: [
      { title: "Ellicott Hall Meeting", date: "2025-01-16", source: "Residential Life" },
      { title: "Floor Social Event", date: "2025-01-22", source: "Residential Life" },
    ],
    lastActivity: "2025-01-08",
    tags: ["Residential", "Community", "Campus Life"]
  },
  {
    id: "debate-club",
    name: "Debate Club",
    category: "social",
    description: "Competitive debate, public speaking, and intellectual discourse",
    potentialMembers: 156,
    isPreviewMode: true,
    rssEvents: [
      { title: "Weekly Debate Practice", date: "2025-01-17", source: "Student Activities" },
      { title: "Inter-University Debate", date: "2025-01-25", source: "Student Activities" },
    ],
    lastActivity: "2025-01-09",
    tags: ["Debate", "Public Speaking", "Competition"]
  },
  {
    id: "startup-founders",
    name: "Startup Founders",
    category: "professional",
    description: "Entrepreneurial students building the next generation of companies",
    potentialMembers: 423,
    isPreviewMode: false,
    memberCount: 89,
    leader: "Sarah Chen",
    lastActivity: "2025-01-11",
    tags: ["Entrepreneurship", "Business", "Innovation"]
  },
];

export default function SpacesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [spaces, setSpaces] = useState(MOCK_SPACES);
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter spaces based on search and category
  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = !debouncedSearch || 
      space.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      space.description.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      space.tags.some(tag => tag.toLowerCase().includes(debouncedSearch.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || 
      (selectedCategory === "preview" && space.isPreviewMode) ||
      (selectedCategory !== "preview" && space.category === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const previewSpaces = filteredSpaces.filter(space => space.isPreviewMode);
  const activeSpaces = filteredSpaces.filter(space => !space.isPreviewMode);

  const handleRequestActivation = (spaceId: string) => {
    // Navigate to activation request form
    window.location.href = `/spaces/${spaceId}/request-activation`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Campus Spaces
              </h1>
              <p className="text-muted-foreground mt-1">
                Discover and activate communities that match your interests
              </p>
            </div>
            
            {/* Preview Mode CTA */}
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-3 py-1 text-accent border-accent/30">
                <Crown className="w-4 h-4 mr-1" />
                {previewSpaces.length} spaces awaiting leaders
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spaces..."
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {SPACE_CATEGORIES.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.value)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Preview Mode Spaces - Prominent Section */}
        {(selectedCategory === "all" || selectedCategory === "preview") && previewSpaces.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-display font-semibold text-foreground">
                  Preview Mode - Ready for Activation
                </h2>
              </div>
              <Badge variant="accent" className="px-2 py-1">
                Student Leader Needed
              </Badge>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {previewSpaces.map((space) => (
                <Card key={space.id} className="bg-surface border-border hover:border-accent/50 transition-all duration-180">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-display text-foreground mb-1">
                          {space.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs text-accent border-accent/30">
                            <Crown className="w-3 h-3 mr-1" />
                            Preview Mode
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {space.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {space.description}
                    </p>
                    
                    {/* Potential Members */}
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {space.potentialMembers.toLocaleString()} potential members
                      </span>
                    </div>
                    
                    {/* Upcoming Events */}
                    {space.rssEvents.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">
                            Upcoming Events
                          </span>
                        </div>
                        <div className="space-y-1">
                          {space.rssEvents.slice(0, 2).map((event, idx) => (
                            <div key={idx} className="text-xs text-muted-foreground">
                              • {event.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Action Button */}
                    <Button 
                      onClick={() => handleRequestActivation(space.id)}
                      className="w-full bg-accent hover:bg-accent/90 text-background font-medium transition-all duration-180"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Request to Lead This Space
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Active Spaces */}
        {activeSpaces.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-display font-semibold text-foreground">
                Active Spaces
              </h2>
              <Badge variant="secondary" className="px-2 py-1">
                {activeSpaces.length} spaces
              </Badge>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeSpaces.map((space) => (
                <Card key={space.id} className="bg-surface border-border hover:border-accent/50 transition-all duration-180">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-display text-foreground mb-1">
                          {space.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="default" className="text-xs">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {space.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4">
                      {space.description}
                    </p>
                    
                    {/* Member Count and Leader */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">
                          {space.memberCount} members
                        </span>
                      </div>
                      {space.leader && (
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-accent" />
                          <span className="text-sm text-foreground">
                            Led by {space.leader}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Action Button */}
                    <Button 
                      onClick={() => window.location.href = `/spaces/${space.id}`}
                      variant="outline"
                      className="w-full transition-all duration-180"
                    >
                      View Space
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredSpaces.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-display font-semibold text-foreground mb-2">
              No spaces found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or browse different categories
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              variant="outline"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}