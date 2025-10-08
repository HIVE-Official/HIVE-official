/**
 * Space Creation Preview Component
 * 
 * Shows users what spaces will be created and joined during onboarding
 * based on their academic selections (year, major, school).
 */

"use client";

import React, { useEffect, useState } from 'react';
import { Users, GraduationCap, Building2, Sparkles, BookOpen } from 'lucide-react';
import type { AutoSpaceConfig } from '../../lib/auto-space-creation';

interface SpacePreview {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'social' | 'career' | 'general';
  category: string;
  autoJoin: boolean;
  isRecommended: boolean;
  membershipType: 'open' | 'invite-only' | 'application';
}

interface SpaceCreationPreviewProps {
  config: AutoSpaceConfig;
  onConfirm?: () => void;
  onSkip?: () => void;
  isLoading?: boolean;
}

const typeIcons = {
  academic: BookOpen,
  social: Users,
  career: GraduationCap,
  general: Building2
};

const typeColors = {
  academic: 'text-blue-600 bg-blue-50',
  social: 'text-green-600 bg-green-50',
  career: 'text-purple-600 bg-purple-50',
  general: 'text-gray-600 bg-gray-50'
};

export function SpaceCreationPreview({ 
  config, 
  onConfirm, 
  onSkip, 
  isLoading = false 
}: SpaceCreationPreviewProps) {
  const [spaces, setSpaces] = useState<SpacePreview[]>([]);
  const [previewLoading, setPreviewLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch space preview
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        setPreviewLoading(true);
        setError(null);

        const params = new URLSearchParams({
          schoolId: config.schoolId,
          graduationYear: config.graduationYear.toString(),
          major: config.major,
          year: config.year,
          userType: config.userType
        });

        const response = await fetch(`/api/spaces/auto-create?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to load space preview');
        }

        const data = await response.json();
        setSpaces(data.spaces || []);

      } catch (err) {
        console.error('Error fetching space preview:', err);
        setError(err instanceof Error ? err.message : 'Failed to load preview');
      } finally {
        setPreviewLoading(false);
      }
    };

    if (config.schoolId && config.major) {
      fetchPreview();
    }
  }, [config]);

  const autoJoinSpaces = spaces.filter(s => s.autoJoin);
  const recommendedSpaces = spaces.filter(s => s.isRecommended && !s.autoJoin);

  if (previewLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
        <div className="text-center text-red-600">
          <p>Error loading space preview: {error}</p>
          <button 
            onClick={onSkip}
            className="mt-4 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Continue without spaces
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--hive-brand-primary)] rounded-full mb-4">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">
          Your Campus Communities
        </h2>
        <p className="text-[var(--hive-text-muted)]">
          Based on your academic info, we'll set up these personalized spaces for you
        </p>
      </div>

      {/* Auto-join spaces */}
      {autoJoinSpaces.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-3 flex items-center">
            <Users className="w-5 h-5 mr-2 text-[var(--hive-brand-primary)]" />
            Auto-joined Communities ({autoJoinSpaces.length})
          </h3>
          <div className="space-y-3">
            {autoJoinSpaces.map((space) => {
              const IconComponent = typeIcons[space.type];
              const colorClass = typeColors[space.type];
              
              return (
                <div key={space.id} className="flex items-start p-4 bg-[var(--hive-background-secondary)] rounded-lg border">
                  <div className={`p-2 rounded-lg ${colorClass} mr-3 mt-1`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-[var(--hive-text-primary)]">
                        {space.name}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                        Auto-join
                      </span>
                    </div>
                    <p className="text-sm text-[var(--hive-text-muted)] leading-relaxed">
                      {space.description}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-[var(--hive-text-muted)]">
                      <span className="capitalize">{space.type}</span>
                      <span className="mx-2">•</span>
                      <span>{space.category}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{space.membershipType.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended spaces */}
      {recommendedSpaces.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-3 flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-[var(--hive-brand-secondary)]" />
            Recommended for You ({recommendedSpaces.length})
          </h3>
          <div className="space-y-3">
            {recommendedSpaces.map((space) => {
              const IconComponent = typeIcons[space.type];
              const colorClass = typeColors[space.type];
              
              return (
                <div key={space.id} className="flex items-start p-4 border border-dashed border-gray-300 rounded-lg">
                  <div className={`p-2 rounded-lg ${colorClass} mr-3 mt-1`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-[var(--hive-text-primary)]">
                        {space.name}
                      </h4>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                        Recommended
                      </span>
                    </div>
                    <p className="text-sm text-[var(--hive-text-muted)] leading-relaxed">
                      {space.description}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-[var(--hive-text-muted)]">
                      <span className="capitalize">{space.type}</span>
                      <span className="mx-2">•</span>
                      <span>{space.category}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 You can join these spaces later from your dashboard or discovery page
            </p>
          </div>
        </div>
      )}

      {spaces.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">
            No automatic spaces found
          </h3>
          <p className="text-[var(--hive-text-muted)]">
            You can discover and join spaces manually from your dashboard
          </p>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <button
          onClick={onSkip}
          className="px-4 py-2 text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors"
          disabled={isLoading}
        >
          Skip for now
        </button>
        
        <button
          onClick={onConfirm}
          disabled={isLoading || spaces.length === 0}
          className="px-6 py-3 bg-[var(--hive-brand-primary)] text-white rounded-lg font-medium hover:bg-[var(--hive-brand-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Creating spaces...
            </>
          ) : (
            spaces.length > 0 ? `Join ${autoJoinSpaces.length} Communities` : 'Continue'
          )}
        </button>
      </div>
    </div>
  );
}