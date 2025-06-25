"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  BarChart3,
  Calendar,
  FileText,
  Zap,
  ArrowRight,
  Clock,
} from "lucide-react";

interface ToolTemplate {
  id: "poll" | "rsvp" | "simple_form";
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  estimatedTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  useCases: string[];
  features: string[];
  isPopular?: boolean;
  isNew?: boolean;
}

interface TemplateSelectorProps {
  templates: ToolTemplate[];
  onSelectTemplate?: (templateId: string) => void;
  className?: string;
}

const difficultyColors = {
  beginner: "bg-green-500",
  intermediate: "bg-yellow-500",
  advanced: "bg-red-500",
};

const difficultyLabels = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

const defaultTemplates: ToolTemplate[] = [
  {
    id: "poll",
    name: "Poll",
    description:
      "Create interactive polls to gather opinions and make decisions with your campus community.",
    icon: BarChart3,
    estimatedTime: "5-10 min",
    difficulty: "beginner",
    useCases: [
      "Student government voting",
      "Event planning decisions",
      "Academic feedback",
      "Campus opinion surveys",
    ],
    features: [
      "Multiple choice options",
      "Real-time results",
      "Anonymous voting",
      "Time-limited polls",
    ],
    isPopular: true,
  },
  {
    id: "rsvp",
    name: "RSVP",
    description:
      "Organize events and track attendance with built-in RSVP management and capacity controls.",
    icon: Calendar,
    estimatedTime: "8-15 min",
    difficulty: "beginner",
    useCases: [
      "Club meetings",
      "Study groups",
      "Social events",
      "Workshop registration",
    ],
    features: [
      "Capacity management",
      "Waitlist support",
      "Calendar integration",
      "Attendee tracking",
    ],
  },
  {
    id: "simple_form",
    name: "Simple Form",
    description:
      "Build custom forms to collect information, feedback, and applications from students.",
    icon: FileText,
    estimatedTime: "10-20 min",
    difficulty: "intermediate",
    useCases: [
      "Club applications",
      "Feedback collection",
      "Contact forms",
      "Survey research",
    ],
    features: [
      "Drag & drop builder",
      "Multiple field types",
      "Response validation",
      "Data export",
    ],
    isNew: true,
  },
];

export const TemplateSelector = React.forwardRef<
  HTMLDivElement,
  TemplateSelectorProps
>(
  (
    { templates = defaultTemplates, onSelectTemplate, className, ...props },
    ref
  ) => {
    const handleSelectTemplate = (templateId: string) => {
      onSelectTemplate?.(templateId);
    };

    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary font-display mb-2">
            Choose a Tool Template
          </h2>
          <p className="text-text-secondary">
            Start with a proven template and customize it for your campus
            community
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {templates.map((template) => {
            const IconComponent = template.icon;

            return (
              <Card
                key={template.id}
                className={cn(
                  "relative cursor-pointer transition-all duration-200",
                  "hover:shadow-lg hover:scale-105 hover:border-yellow-500",
                  "group"
                )}
                onClick={() => handleSelectTemplate(template.id)}
              >
                {/* Badges */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {template.isPopular && (
                    <Badge className="bg-yellow-500 text-black text-xs">
                      Popular
                    </Badge>
                  )}
                  {template.isNew && (
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-surface-02 rounded-lg group-hover:bg-yellow-500 group-hover:text-black transition-colors">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-display">
                        {template.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs text-white",
                            difficultyColors[template.difficulty]
                          )}
                        >
                          {difficultyLabels[template.difficulty]}
                        </Badge>
                        <span className="text-xs text-text-secondary flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {template.estimatedTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Description */}
                  <p className="text-sm text-text-secondary line-clamp-3">
                    {template.description}
                  </p>

                  {/* Use Cases */}
                  <div>
                    <h4 className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">
                      Perfect For
                    </h4>
                    <div className="space-y-1">
                      {template.useCases.slice(0, 3).map((useCase, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-xs text-text-secondary"
                        >
                          <div className="w-1 h-1 bg-yellow-500 rounded-full" />
                          {useCase}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-xs font-medium text-text-secondary mb-2 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{template.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Create Button */}
                  <Button
                    className="w-full mt-4 group-hover:bg-yellow-500 group-hover:text-black transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate(template.id);
                    }}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Create {template.name}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="text-center p-4 bg-surface-02 rounded-lg">
          <p className="text-sm text-text-secondary">
            Need help choosing? Start with a <strong>Poll</strong> - it&apos;s
            the most versatile and beginner-friendly option.
          </p>
        </div>
      </div>
    );
  }
);

TemplateSelector.displayName = "TemplateSelector";

export type { ToolTemplate, TemplateSelectorProps };
