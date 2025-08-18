"use client";

import { Button, Card } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { BookOpen, ExternalLink, Video, FileText, Code, Users, Star, Download } from 'lucide-react';

export default function ResourcesPage() {
  return (
    <PageContainer
      title="Resources"
      subtitle="Guides, tutorials, and documentation to help you build better"
      breadcrumbs={[
        { label: "Resources", icon: BookOpen }
      ]}
      maxWidth="xl"
    >
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <Card 
          className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group"
          onClick={() => window.open('https://docs.hive.university/api', '_blank')}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Code className="h-4 w-4 text-[var(--hive-background-primary)]" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white group-hover:text-[var(--hive-brand-secondary)] transition-colors">API Docs</h3>
              <p className="text-xs text-[var(--hive-text-muted)]">Technical reference</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group"
          onClick={() => window.open('https://university.hive.com/tutorials', '_blank')}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Video className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white group-hover:text-[var(--hive-brand-secondary)] transition-colors">Tutorials</h3>
              <p className="text-xs text-[var(--hive-text-muted)]">Step-by-step guides</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group"
          onClick={() => window.open('https://discord.gg/hive-university', '_blank')}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white group-hover:text-[var(--hive-brand-secondary)] transition-colors">Community</h3>
              <p className="text-xs text-[var(--hive-text-muted)]">Get help & share</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group"
          onClick={() => window.location.href = '/build?tab=templates'}
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-[rgba(255,255,255,0.1)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Download className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-white group-hover:text-[var(--hive-brand-secondary)] transition-colors">Templates</h3>
              <p className="text-xs text-[var(--hive-text-muted)]">Ready-to-use tools</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Getting Started */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Star className="h-5 w-5 mr-2 text-[var(--hive-brand-secondary)]" />
            Getting Started
          </h2>
          <div className="space-y-4">
            <Card 
              className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group"
              onClick={() => window.location.href = '/build?tutorial=first-tool'}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2 group-hover:text-[var(--hive-brand-secondary)] transition-colors">Your First Tool</h3>
                  <p className="text-[var(--hive-text-muted)] text-sm mb-3">
                    Learn how to create your first tool using HiveLab&apos;s visual builder.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[var(--hive-text-muted)]">
                    <Video className="h-3 w-3" />
                    <span>10 min video</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-[var(--hive-text-muted)] group-hover:text-[var(--hive-brand-secondary)] flex-shrink-0 ml-4 transition-colors" />
              </div>
            </Card>

            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">Space Management</h3>
                  <p className="text-[var(--hive-text-muted)] text-sm mb-3">
                    Best practices for managing your space and building community.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[var(--hive-text-muted)]">
                    <FileText className="h-3 w-3" />
                    <span>5 min read</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-[var(--hive-text-muted)] flex-shrink-0 ml-4" />
              </div>
            </Card>

            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">Design Guidelines</h3>
                  <p className="text-[var(--hive-text-muted)] text-sm mb-3">
                    Design principles to create tools that users love.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[var(--hive-text-muted)]">
                    <FileText className="h-3 w-3" />
                    <span>8 min read</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-[var(--hive-text-muted)] flex-shrink-0 ml-4" />
              </div>
            </Card>
          </div>
        </div>

        {/* Advanced Topics */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <Code className="h-5 w-5 mr-2" />
            Advanced Topics
          </h2>
          <div className="space-y-4">
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">Custom Components</h3>
                  <p className="text-[var(--hive-text-muted)] text-sm mb-3">
                    Build custom components for advanced functionality.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[var(--hive-text-muted)]">
                    <Code className="h-3 w-3" />
                    <span>Technical guide</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-[var(--hive-text-muted)] flex-shrink-0 ml-4" />
              </div>
            </Card>

            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">API Integration</h3>
                  <p className="text-[var(--hive-text-muted)] text-sm mb-3">
                    Connect your tools to external services and APIs.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[var(--hive-text-muted)]">
                    <Code className="h-3 w-3" />
                    <span>Technical guide</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-[var(--hive-text-muted)] flex-shrink-0 ml-4" />
              </div>
            </Card>

            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-white font-medium mb-2">Performance Tips</h3>
                  <p className="text-[var(--hive-text-muted)] text-sm mb-3">
                    Optimize your tools for speed and reliability.
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-[var(--hive-text-muted)]">
                    <FileText className="h-3 w-3" />
                    <span>12 min read</span>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-[var(--hive-text-muted)] flex-shrink-0 ml-4" />
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Popular Templates */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
          <Download className="h-5 w-5 mr-2" />
          Popular Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "GPA Calculator", downloads: "2.1k", category: "Academic" },
            { name: "Study Group Finder", downloads: "1.8k", category: "Social" },
            { name: "Schedule Optimizer", downloads: "1.5k", category: "Productivity" },
            { name: "Grade Predictor", downloads: "1.3k", category: "Academic" },
            { name: "Room Finder", downloads: "1.1k", category: "Campus" },
            { name: "Event Planner", downloads: "950", category: "Social" },
          ].map((template, i) => (
            <Card 
              key={i} 
              className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-colors cursor-pointer group"
              onClick={() => window.location.href = `/build?template=${template.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-[rgba(255,215,0,0.1)] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-3 text-xs hover:bg-[var(--hive-brand-secondary)] hover:text-[var(--hive-background-primary)]"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.location.href = `/build?template=${template.name.toLowerCase().replace(/\s+/g, '-')}`;
                  }}
                >
                  Use Template
                </Button>
              </div>
              <h3 className="text-white font-medium mb-2 group-hover:text-[var(--hive-brand-secondary)] transition-colors">{template.name}</h3>
              <div className="flex items-center justify-between text-xs text-[var(--hive-text-muted)]">
                <span>{template.category}</span>
                <span>{template.downloads} downloads</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-12">
        <Card className="p-8 bg-gradient-to-r from-[rgba(255,215,0,0.1)] to-[rgba(255,215,0,0.05)] border-[rgba(255,215,0,0.2)] text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need more help?</h2>
          <p className="text-[var(--hive-text-muted)] mb-6 max-w-md mx-auto">
            Join our community Discord or schedule office hours with the HIVE team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[#FFE255]"
              onClick={() => window.open('https://discord.gg/hive-university', '_blank')}
            >
              <Users className="h-4 w-4 mr-2" />
              Join Discord
            </Button>
            <Button 
              variant="outline" 
              className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
              onClick={() => window.open('https://calendly.com/hive-university/office-hours', '_blank')}
            >
              Schedule Office Hours
            </Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}