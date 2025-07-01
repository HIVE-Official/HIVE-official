"use client";

import React, { useState, useMemo } from "react";
import { Button } from "../button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Badge } from "../badge";
import { Loader2, Search, Users, Plus, Sparkles, GraduationCap, BookOpen, Coffee, Code } from "lucide-react";
import { StepProps } from "./types";

// Space categories for better organization
const SPACE_CATEGORIES = [
  { value: "academic", label: "Academic", icon: GraduationCap, color: "text-blue-400" },
  { value: "study", label: "Study Groups", icon: BookOpen, color: "text-green-400" },
  { value: "social", label: "Social", icon: Coffee, color: "text-purple-400" },
  { value: "project", label: "Projects", icon: Code, color: "text-amber-400" },
];

// Popular space suggestions based on category
const POPULAR_SPACES = {
  academic: [
    { name: "CS 161: Computer Security", members: 247, description: "Study group for algorithms and data structures", verified: true },
    { name: "Psychology 101", members: 156, description: "Introduction to Psychology study group", verified: true },
    { name: "Engineering Physics", members: 89, description: "Collaborative problem solving", verified: false },
  ],
  study: [
    { name: "Finals Prep Squad", members: 312, description: "Cross-campus study sessions", verified: false },
    { name: "Library Study Group", members: 178, description: "Quiet study meetups", verified: false },
    { name: "Coffee & Cramming", members: 234, description: "Casual study cafe meetups", verified: false },
  ],
  social: [
    { name: "Campus Gamers", members: 445, description: "Gaming and esports community", verified: false },
    { name: "International Students", members: 567, description: "Global community on campus", verified: true },
    { name: "Music Lovers", members: 289, description: "Share and discover music together", verified: false },
  ],
  project: [
    { name: "Startup Founders", members: 123, description: "Build the next big thing", verified: false },
    { name: "Open Source Club", members: 167, description: "Contribute to open source projects", verified: true },
    { name: "Design Collective", members: 198, description: "UI/UX and graphic design projects", verified: false },
  ],
};

export interface SpaceSelectionStepProps extends StepProps {
  initialData?: {
    spaceCategory?: string;
    selectedSpace?: string;
    customSpaceName?: string;
    customSpaceDescription?: string;
  };
}

export const SpaceSelectionStep: React.FC<SpaceSelectionStepProps> = ({
  initialData = {},
  onSubmit,
  onSkip,
}) => {
  const [mode, setMode] = useState<"browse" | "create">("browse");
  const [selectedCategory, setSelectedCategory] = useState(initialData.spaceCategory || "academic");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpace, setSelectedSpace] = useState<string | null>(initialData.selectedSpace || null);
  const [customSpaceName, setCustomSpaceName] = useState(initialData.customSpaceName || "");
  const [customSpaceDescription, setCustomSpaceDescription] = useState(initialData.customSpaceDescription || "");
  const [isLoading, setIsLoading] = useState(false);

  // Filter spaces based on search query
  const filteredSpaces = useMemo(() => {
    const categorySpaces = POPULAR_SPACES[selectedCategory as keyof typeof POPULAR_SPACES] || [];
    if (!searchQuery) return categorySpaces;
    
    return categorySpaces.filter(space => 
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (mode === "browse" && selectedSpace) {
        await onSubmit({
          mode: "join",
          spaceCategory: selectedCategory,
          selectedSpace,
        });
      } else if (mode === "create" && customSpaceName && customSpaceDescription) {
        await onSubmit({
          mode: "create",
          spaceCategory: selectedCategory,
          customSpaceName,
          customSpaceDescription,
        });
      }
    } catch (error) {
      console.error("Failed to submit space selection", error);
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  return (
    <Card className="w-full max-w-2xl bg-card border-border">
      <CardHeader className="text-center space-y-2">
        <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
          <Users className="w-6 h-6 text-accent" />
        </div>
        <CardTitle className="text-xl font-display text-card-foreground">
          Find Your Community
        </CardTitle>
        <CardDescription className="text-muted-foreground font-sans">
          Join existing spaces or create your own to connect with like-minded students
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Mode Selection */}
        <div className="flex gap-2 p-1 bg-surface-01 rounded-lg">
          <Button
            type="button"
            variant={mode === "browse" ? "default" : "surface"}
            onClick={() => setMode("browse")}
            className="flex-1"
          >
            <Search className="w-4 h-4 mr-2" />
            Browse Spaces
          </Button>
          <Button
            type="button"
            variant={mode === "create" ? "default" : "surface"}
            onClick={() => setMode("create")}
            className="flex-1"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </Button>
        </div>

        {mode === "browse" ? (
          <>
            {/* Category Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">Category</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {SPACE_CATEGORIES.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.value}
                      type="button"
                      variant={selectedCategory === category.value ? "accent" : "outline"}
                      onClick={() => setSelectedCategory(category.value)}
                      className="h-16 flex flex-col gap-1"
                    >
                      <Icon className={`w-5 h-5 ${selectedCategory === category.value ? 'text-background' : category.color}`} />
                      <span className="text-xs">{category.label}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Search */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-card-foreground">Search Spaces</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or description..."
                  className="pl-10"
                />
              </div>
            </div>

            {/* Space Results */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-card-foreground">Available Spaces</Label>
                <span className="text-xs text-muted-foreground">
                  {filteredSpaces.length} spaces found
                </span>
              </div>
              
              <div className="grid gap-3 max-h-64 overflow-y-auto">
                {filteredSpaces.map((space) => (
                  <div
                    key={space.name}
                    onClick={() => setSelectedSpace(space.name)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedSpace === space.name
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50 hover:bg-accent/5"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-card-foreground">{space.name}</h4>
                          {space.verified && (
                            <Badge variant="accent" className="text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Official
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{space.description}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{space.members.toLocaleString()} members</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredSpaces.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No spaces found matching your search.</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setMode("create")}
                    className="mt-2"
                  >
                    Create a new space instead
                  </Button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Create New Space */}
            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-medium text-card-foreground">Space Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPACE_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-card-foreground">Space Name</Label>
                <Input
                  value={customSpaceName}
                  onChange={(e) => setCustomSpaceName(e.target.value)}
                  placeholder="e.g., CS 161 Study Group"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-card-foreground">Description</Label>
                <Textarea
                  value={customSpaceDescription}
                  onChange={(e) => setCustomSpaceDescription(e.target.value)}
                  placeholder="What's this space about? What will members do together?"
                  rows={3}
                />
              </div>
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleSkip}
            className="flex-1"
          >
            Skip for now
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            className="flex-1"
            disabled={
              isLoading ||
              (mode === "browse" && !selectedSpace) ||
              (mode === "create" && (!customSpaceName || !customSpaceDescription))
            }
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "browse" ? "Joining..." : "Creating..."}
              </>
            ) : (
              mode === "browse" ? "Join Space" : "Create Space"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 