"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Grid } from "@hive/ui";
import { 
  ArrowLeft, 
  CheckCircle, 
  Settings, 
  Zap, 
  Users as _Users, 
  MessageSquare, 
  Calendar, 
  BarChart3, 
  Palette, 
  Shield,
  Globe,
  Star as _Star,
  Crown as _Crown,
  Loader
} from "lucide-react";
import { useFeatureFlags } from "@hive/hooks";

interface SpaceFeature {
  id: string;
  name: string;
  description: string;
  category: 'communication' | 'organization' | 'engagement' | 'analytics' | 'customization';
  requiredPlan: 'free' | 'plus' | 'pro';
  dependencies?: string[];
  configurable: boolean;
}

interface SpaceActivationData {
  space: {
    id: string;
    name: string;
    status: string;
    plan: string;
    features: string[];
  };
  availableFeatures: SpaceFeature[];
  recommendedFeatures: string[];
  currentPlan: string;
}

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  posts: <MessageSquare className="h-5 w-5" />,
  events: <Calendar className="h-5 w-5" />,
  tools: <Zap className="h-5 w-5" />,
  polls: <BarChart3 className="h-5 w-5" />,
  announcements: <Globe className="h-5 w-5" />,
  private_channels: <Shield className="h-5 w-5" />,
  advanced_analytics: <BarChart3 className="h-5 w-5" />,
  custom_branding: <Palette className="h-5 w-5" />,
  api_access: <Settings className="h-5 w-5" />
};

const PLAN_COLORS = {
  free: 'text-green-400 border-green-400/30 bg-green-400/10',
  plus: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  pro: 'text-purple-400 border-purple-400/30 bg-purple-400/10'
};

const FeatureCard = ({ 
  feature, 
  isSelected, 
  isRecommended, 
  onToggle, 
  disabled = false 
}: {
  feature: SpaceFeature;
  isSelected: boolean;
  isRecommended: boolean;
  onToggle: (_featureId: string) => void;
  disabled?: boolean;
}) => {
  const icon = FEATURE_ICONS[feature.id] || <Zap className="h-5 w-5" />;
  
  return (
    <Card
      className={`p-4 cursor-pointer transition-all border ${
        isSelected 
          ? 'bg-hive-gold/10 border-hive-gold/30' 
          : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && onToggle(feature.id)}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${
            isSelected 
              ? 'bg-hive-gold/20 text-hive-gold' 
              : 'bg-white/[0.05] text-neutral-400'
          }`}>
            {icon}
          </div>
          <div>
            <h3 className={`font-semibold text-sm ${isSelected ? 'text-hive-gold' : 'text-[var(--hive-text-inverse)]'}`}>
              {feature.name}
            </h3>
            {isRecommended && (
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                Recommended
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full border ${PLAN_COLORS[feature.requiredPlan]}`}>
            {feature.requiredPlan}
          </span>
          {isSelected && <CheckCircle className="h-4 w-4 text-hive-gold" />}
        </div>
      </div>
      
      <p className="text-sm text-neutral-400 mb-3">{feature.description}</p>
      
      {feature.dependencies && (
        <div className="text-xs text-neutral-400">
          Requires: {feature.dependencies.join(', ')}
        </div>
      )}
    </Card>
  );
};

export default function SpaceActivationPage() {
  const params = useParams();
  const router = useRouter();
  const spaceId = params.spaceId as string;
  const [activationData, setActivationData] = useState<SpaceActivationData | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isActivating, setIsActivating] = useState(false);
  const [activationComplete, setActivationComplete] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const flags = useFeatureFlags();

  const fetchActivationData = useCallback(async () => {
    try {
      const response = await fetch(`/api/spaces/activate?spaceId=${spaceId}`);
      if (!response.ok) throw new Error('Failed to fetch activation data');
      
      const data = await response.json();
      setActivationData(data);
      setSelectedFeatures(data.recommendedFeatures);
      
      flags.trackEvent('spaces', 'view', { page: 'activation', spaceId });
    } catch (err) {
      setError('Failed to load space activation data');
    } finally {
      setLoading(false);
    }
  }, [spaceId, flags]);

  useEffect(() => {
    fetchActivationData();
  }, [fetchActivationData]);

  const handleFeatureToggle = (featureId: string) => {
    if (selectedFeatures.includes(featureId)) {
      setSelectedFeatures(prev => prev.filter(id => id !== featureId));
    } else {
      setSelectedFeatures(prev => [...prev, featureId]);
    }
  };

  const handleActivateSpace = async () => {
    if (!activationData || selectedFeatures.length === 0) return;
    
    setIsActivating(true);
    
    try {
      const response = await fetch('/api/spaces/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spaceId,
          features: selectedFeatures,
          settings: {
            allowGuestAccess: true,
            moderationLevel: 'medium',
            autoApproveMembers: true
          }
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        if (result.upgradeRequired) {
          setError('Some features require a plan upgrade. Please upgrade your plan to continue.');
          return;
        }
        throw new Error(result.error || 'Activation failed');
      }

      flags.trackEvent('spaces', 'interact', { 
        action: 'activate', 
        spaceId, 
        featuresCount: selectedFeatures.length 
      });
      
      setActivationComplete(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push(`/spaces/${spaceId}`);
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Activation failed');
    } finally {
      setIsActivating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
          <p className="text-[var(--hive-text-inverse)]">Loading space activation...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center">
        <Card className="p-8 text-center border-red-500/20 bg-red-500/5">
          <h2 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-2">Activation Error</h2>
          <p className="text-neutral-400 mb-4">{error}</p>
          <Button onClick={() => router.back()} className="bg-hive-gold text-hive-obsidian">
            Go Back
          </Button>
        </Card>
      </div>
    );
  }

  if (!activationData) return null;

  if (activationComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 flex items-center justify-center">
        <Card className="p-12 text-center bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20 max-w-md">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-4">Space Activated!</h2>
          <p className="text-neutral-400 mb-6">
            {activationData.space.name} has been successfully activated with {selectedFeatures.length} features.
          </p>
          <div className="flex items-center justify-center text-sm text-neutral-400">
            <Loader className="h-4 w-4 mr-2 animate-spin" />
            Redirecting to your space...
          </div>
        </Card>
      </div>
    );
  }

  const groupedFeatures = activationData.availableFeatures.reduce((groups, feature) => {
    if (!groups[feature.category]) {
      groups[feature.category] = [];
    }
    groups[feature.category].push(feature);
    return groups;
  }, {} as Record<string, SpaceFeature[]>);

  const categoryLabels = {
    communication: 'Communication',
    organization: 'Organization',
    engagement: 'Engagement',
    analytics: 'Analytics',
    customization: 'Customization'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.back()}
                className="text-neutral-400 hover:text-[var(--hive-text-inverse)]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-[var(--hive-text-inverse)]">
                  Activate {activationData.space.name}
                </h1>
                <p className="text-sm text-neutral-400">
                  Configure features and settings for your space
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`text-sm px-3 py-1.5 rounded-full border font-medium ${PLAN_COLORS[activationData.currentPlan as keyof typeof PLAN_COLORS]}`}>
                {activationData.currentPlan.toUpperCase()} Plan
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)]">Choose Features</h2>
            <span className="text-sm text-neutral-400">
              {selectedFeatures.length} features selected
            </span>
          </div>
          <div className="w-full bg-white/[0.05] rounded-full h-2">
            <div 
              className="bg-hive-gold h-2 rounded-full transition-all duration-500"
              style={{ width: selectedFeatures.length > 0 ? '50%' : '10%' }}
            />
          </div>
        </div>

        {/* Feature Categories */}
        <div className="space-y-8">
          {Object.entries(groupedFeatures).map(([category, features]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">
                {categoryLabels[category as keyof typeof categoryLabels]}
              </h3>
              <Grid cols={2} gap="md">
                {features.map((feature: any) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    isSelected={selectedFeatures.includes(feature.id)}
                    isRecommended={activationData.recommendedFeatures.includes(feature.id)}
                    onToggle={handleFeatureToggle}
                    disabled={feature.requiredPlan === 'pro' && activationData.currentPlan !== 'pro'}
                  />
                ))}
              </Grid>
            </div>
          ))}
        </div>

        {/* Activation Summary */}
        {selectedFeatures.length > 0 && (
          <Card className="mt-8 p-6 bg-gradient-to-r from-hive-gold/[0.05] to-hive-gold/[0.02] border-hive-gold/10">
            <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Activation Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-neutral-400 mb-2">Selected Features</h4>
                <div className="space-y-2">
                  {selectedFeatures.map(featureId => {
                    const feature = activationData.availableFeatures.find(f => f.id === featureId);
                    return feature ? (
                      <div key={featureId} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-hive-gold" />
                        <span className="text-[var(--hive-text-inverse)]">{feature.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-neutral-400 mb-2">What happens next?</h4>
                <ul className="text-sm text-[var(--hive-text-inverse)] space-y-1">
                  <li>• Features will be configured automatically</li>
                  <li>• Members can start using the space immediately</li>
                  <li>• You can modify settings anytime</li>
                  <li>• Setup takes approximately 2-3 minutes</li>
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end mt-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-white/20 text-[var(--hive-text-inverse)] hover:bg-white/10"
            disabled={isActivating}
          >
            Cancel
          </Button>
          <Button
            onClick={handleActivateSpace}
            disabled={selectedFeatures.length === 0 || isActivating}
            className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne min-w-[140px]"
          >
            {isActivating ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Activating...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Activate Space
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}