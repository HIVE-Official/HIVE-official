"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, 
  Badge,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger  } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { 
  User, 
  Grid,
  Layout,
  Save,
  X,
  RotateCcw,
  Smartphone,
  Monitor,
  Tablet,
  Move,
  Plus,
  Settings,
  Palette,
  Zap,
  Users,
  Calendar,
  BarChart3,
  Shield,
  Wrench,
  Activity
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ErrorBoundary } from '../../../../components/error-boundary';
import { CardCustomizationModal } from '../../../../components/profile/card-customization-modal';
import { useSession } from '../../../../hooks/use-session';

interface CardConfig {
  id: string;
  name: string;
  description: string;
  category: 'identity' | 'academic' | 'community' | 'platform' | 'privacy';
  icon: LucideIcon;
  size: '1x1' | '2x1' | '1x2' | '2x2';
  isVisible: boolean;
  position: { x: number; y: number };
  isRequired?: boolean;
  builderOnly?: boolean;
}

interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  targetUser: string;
  cards: Partial<CardConfig>[];
}

const DEFAULT_CARDS: CardConfig[] = [
  {
    id: 'avatar',
    name: 'Avatar Card',
    description: 'Basic identity and profile photo',
    category: 'identity',
    icon: User,
    size: '1x1',
    isVisible: true,
    position: { x: 0, y: 0 },
    isRequired: true
  },
  {
    id: 'calendar',
    name: 'Calendar Card',
    description: 'Unified schedule from all sources',
    category: 'academic',
    icon: Calendar,
    size: '2x1',
    isVisible: true,
    position: { x: 1, y: 0 }
  },
  {
    id: 'tools',
    name: 'Your Tools Card',
    description: 'Personal productivity tool grid',
    category: 'platform',
    icon: Zap,
    size: '1x2',
    isVisible: true,
    position: { x: 3, y: 0 }
  },
  {
    id: 'spaces',
    name: 'Your Spaces Card',
    description: 'Joined communities and activity',
    category: 'community',
    icon: Users,
    size: '1x2',
    isVisible: true,
    position: { x: 0, y: 1 }
  },
  {
    id: 'activity',
    name: 'Activity Log Card',
    description: 'Personal platform engagement history',
    category: 'community',
    icon: Activity,
    size: '2x1',
    isVisible: true,
    position: { x: 1, y: 1 }
  },
  {
    id: 'hivelab',
    name: 'HiveLAB Card',
    description: 'Tool creation access (Builders only)',
    category: 'platform',
    icon: Wrench,
    size: '1x1',
    isVisible: false,
    position: { x: 3, y: 1 },
    builderOnly: true
  },
  {
    id: 'privacy',
    name: 'Ghost Mode Card',
    description: 'Privacy controls and visibility',
    category: 'privacy',
    icon: Shield,
    size: '1x1',
    isVisible: false,
    position: { x: 0, y: 2 }
  },
  {
    id: 'analytics',
    name: 'Platform Stats Card',
    description: 'Usage analytics and insights',
    category: 'platform',
    icon: BarChart3,
    size: '2x1',
    isVisible: false,
    position: { x: 1, y: 2 }
  }
];

const LAYOUT_TEMPLATES: LayoutTemplate[] = [
  {
    id: 'default',
    name: 'Balanced Campus Life',
    description: 'Perfect mix of academics, community, and tools',
    targetUser: 'Most students',
    cards: [
      { id: 'avatar', isVisible: true, position: { x: 0, y: 0 } },
      { id: 'calendar', isVisible: true, position: { x: 1, y: 0 } },
      { id: 'tools', isVisible: true, position: { x: 3, y: 0 } },
      { id: 'spaces', isVisible: true, position: { x: 0, y: 1 } },
      { id: 'activity', isVisible: true, position: { x: 1, y: 1 } }
    ]
  },
  {
    id: 'academic-focused',
    name: 'Academic Excellence',
    description: 'Optimized for serious academic achievement',
    targetUser: 'Academic-focused students',
    cards: [
      { id: 'avatar', isVisible: true, position: { x: 0, y: 0 } },
      { id: 'calendar', isVisible: true, position: { x: 1, y: 0 } },
      { id: 'tools', isVisible: true, position: { x: 3, y: 0 } },
      { id: 'analytics', isVisible: true, position: { x: 0, y: 1 } }
    ]
  },
  {
    id: 'community-leader',
    name: 'Community Leader',
    description: 'Built for student organization leaders',
    targetUser: 'Student leaders',
    cards: [
      { id: 'avatar', isVisible: true, position: { x: 0, y: 0 } },
      { id: 'spaces', isVisible: true, position: { x: 1, y: 0 } },
      { id: 'activity', isVisible: true, position: { x: 3, y: 0 } },
      { id: 'calendar', isVisible: true, position: { x: 0, y: 1 } }
    ]
  },
  {
    id: 'builder',
    name: 'HIVE Builder',
    description: 'Everything a tool creator needs',
    targetUser: 'Builder program members',
    cards: [
      { id: 'avatar', isVisible: true, position: { x: 0, y: 0 } },
      { id: 'hivelab', isVisible: true, position: { x: 1, y: 0 } },
      { id: 'tools', isVisible: true, position: { x: 2, y: 0 } },
      { id: 'analytics', isVisible: true, position: { x: 0, y: 1 } }
    ]
  }
];

export default function ProfileCustomizePage() {
  const router = useRouter();
  const { user } = useSession();
  
  const [cards, setCards] = useState<CardConfig[]>(DEFAULT_CARDS);
  // Future card selection functionality - currently unused
   
  const [_selectedCard, _setSelectedCard] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [hasChanges, setHasChanges] = useState(false);
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [showCardModal, setShowCardModal] = useState(false);
  const [editingCard, setEditingCard] = useState<CardConfig | null>(null);

  // Load saved layout
  useEffect(() => {
    // TODO: Load user's saved layout from API
    // For now, use defaults
  }, [user]);

  const handleCardToggle = useCallback((cardId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, isVisible: !card.isVisible }
        : card
    ));
    setHasChanges(true);
  }, []);

  // Future drag-and-drop functionality - currently unused
   
  const _handleCardMove = useCallback((cardId: string, newPosition: { x: number; y: number }) => {
    setCards(prev => prev.map(card => 
      card.id === cardId 
        ? { ...card, position: newPosition }
        : card
    ));
    setHasChanges(true);
  }, []);

  const applyTemplate = useCallback((template: LayoutTemplate) => {
    setCards(prev => prev.map(card => {
      const templateCard = template.cards.find(tc => tc.id === card.id);
      if (templateCard) {
        return {
          ...card,
          isVisible: templateCard.isVisible ?? false,
          position: templateCard.position ?? card.position
        };
      }
      return { ...card, isVisible: false };
    }));
    setHasChanges(true);
  }, []);

  const resetToDefault = useCallback(() => {
    setCards(DEFAULT_CARDS);
    setHasChanges(true);
  }, []);

  const handleCardConfigSave = (config: {
    size: '1x1' | '2x1' | '1x2' | '2x2';
    isVisible: boolean;
    position: { x: number; y: number };
  }) => {
    if (!editingCard) return;
    
    setCards(prev => prev.map(card => 
      card.id === editingCard.id 
        ? { 
            ...card, 
            size: config.size,
            isVisible: config.isVisible,
            position: config.position
          }
        : card
    ));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      // TODO: Save layout to API
      console.log('Saving layout:', cards);
      setHasChanges(false);
      router.push('/profile');
    } catch (error) {
      console.error('Failed to save layout:', error);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        router.push('/profile');
      }
    } else {
      router.push('/profile');
    }
  };

  const getCardsByCategory = (category: CardConfig['category']) => {
    return cards.filter(card => card.category === category);
  };

  const visibleCards = cards.filter(card => card.isVisible);

  return (
    <ErrorBoundary>
      <PageContainer
        title="Customize Your Profile"
        subtitle="Design your personal campus command center"
        breadcrumbs={[
          { label: "Profile", icon: User, href: "/profile" },
          { label: "Customize" }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              onClick={handleCancel}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!hasChanges}
              className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Layout
            </Button>
          </div>
        }
        maxWidth="xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Customization Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* View Mode Controls */}
            <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Monitor className="h-5 w-5 mr-2" />
                Preview Mode
              </h3>
              <div className="flex flex-col space-y-2">
                <Button
                  variant={viewMode === 'desktop' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('desktop')}
                  className="justify-start"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  Desktop
                </Button>
                <Button
                  variant={viewMode === 'tablet' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('tablet')}
                  className="justify-start"
                >
                  <Tablet className="h-4 w-4 mr-2" />
                  Tablet
                </Button>
                <Button
                  variant={viewMode === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('mobile')}
                  className="justify-start"
                >
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile
                </Button>
              </div>
              
              <div className="mt-4 pt-4 border-t border-hive-border-default">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm">Show Grid</span>
                  <Switch
                    checked={isGridVisible}
                    onCheckedChange={setIsGridVisible}
                  />
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetToDefault}
                  className="w-full justify-start"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Default
                </Button>
              </div>
            </Card>

            {/* Templates */}
            <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Layout className="h-5 w-5 mr-2" />
                Layout Templates
              </h3>
              <div className="space-y-3">
                {LAYOUT_TEMPLATES.map((template) => (
                  <div key={template.id} className="p-3 rounded-lg bg-hive-background-tertiary">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white text-sm">{template.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => applyTemplate(template)}
                        className="text-hive-gold hover:bg-hive-gold/10"
                      >
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-hive-text-mutedLight mb-1">{template.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {template.targetUser}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Main Customization Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Layout Preview */}
            <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Grid className="h-5 w-5 mr-2" />
                  Layout Preview
                </h3>
                <Badge variant="outline">
                  {visibleCards.length} cards visible
                </Badge>
              </div>
              
              {/* Preview Grid */}
              <div className={`
                grid gap-4 p-4 rounded-lg
                ${isGridVisible ? 'bg-gray-900 bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]' : 'bg-hive-background-tertiary'}
                ${viewMode === 'desktop' ? 'grid-cols-4' : 
                  viewMode === 'tablet' ? 'grid-cols-2' : 'grid-cols-1'}
              `}>
                {visibleCards.map((card) => {
                  const IconComponent = card.icon;
                  return (
                    <div
                      key={card.id}
                      className={`
                        p-4 rounded-lg bg-hive-background-overlay border-hive-border-default
                        hover:bg-hive-background-interactive transition-colors cursor-pointer
                        ${_selectedCard === card.id ? 'ring-2 ring-hive-gold' : ''}
                        ${card.size === '2x1' && viewMode === 'desktop' ? 'col-span-2' : ''}
                        ${card.size === '1x2' && viewMode === 'desktop' ? 'row-span-2' : ''}
                        ${card.size === '2x2' && viewMode === 'desktop' ? 'col-span-2 row-span-2' : ''}
                      `}
                      onClick={() => {
                        setEditingCard(card);
                        setShowCardModal(true);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <IconComponent className="h-5 w-5 text-hive-gold" />
                        <Move className="h-4 w-4 text-hive-text-mutedLight" />
                      </div>
                      <h4 className="font-medium text-white text-sm mb-1">{card.name}</h4>
                      <p className="text-xs text-hive-text-mutedLight">{card.description}</p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Card Library */}
            <Card className="p-6 bg-hive-background-overlay border-hive-border-default">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Card Library
              </h3>
              
              <Tabs defaultValue="identity" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="identity">Identity</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                  <TabsTrigger value="platform">Platform</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>

                {(['identity', 'academic', 'community', 'platform', 'privacy'] as const).map((category) => (
                  <TabsContent key={category} value={category} className="space-y-3">
                    {getCardsByCategory(category).map((card) => {
                      const IconComponent = card.icon;
                      const isBuilder = user?.builderOptIn || false;
                      const isDisabled = card.builderOnly && !isBuilder;
                      
                      return (
                        <div 
                          key={card.id}
                          className={`
                            flex items-center justify-between p-3 rounded-lg
                            ${isDisabled ? 'bg-hive-background-tertiary opacity-50' : 'bg-hive-background-tertiary hover:bg-hive-background-interactive'}
                            transition-colors
                          `}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-hive-gold" />
                            <div>
                              <h4 className="font-medium text-white text-sm">{card.name}</h4>
                              <p className="text-xs text-hive-text-mutedLight">{card.description}</p>
                              {card.builderOnly && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  Builder Only
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {card.size}
                            </Badge>
                            {card.isRequired ? (
                              <Badge variant="secondary" className="text-xs">Required</Badge>
                            ) : (
                              <Switch
                                checked={card.isVisible}
                                onCheckedChange={() => !isDisabled && handleCardToggle(card.id)}
                                disabled={isDisabled}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </TabsContent>
                ))}
              </Tabs>
            </Card>
          </div>
        </div>

        {/* Changes indicator */}
        {hasChanges && (
          <div className="fixed bottom-6 right-6 bg-hive-gold text-hive-obsidian px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg">
            <Palette className="h-4 w-4" />
            <span className="text-sm font-medium">Layout changes pending</span>
          </div>
        )}

        {/* Card Customization Modal */}
        {editingCard && (
          <CardCustomizationModal
            isOpen={showCardModal}
            onClose={() => {
              setShowCardModal(false);
              setEditingCard(null);
            }}
            onSave={handleCardConfigSave}
            card={{
              id: editingCard.id,
              name: editingCard.name,
              description: editingCard.description,
              icon: editingCard.icon,
              category: editingCard.category,
              currentSize: editingCard.size,
              currentPosition: editingCard.position,
              isVisible: editingCard.isVisible,
              isRequired: editingCard.isRequired
            }}
          />
        )}
      </PageContainer>
    </ErrorBoundary>
  );
}