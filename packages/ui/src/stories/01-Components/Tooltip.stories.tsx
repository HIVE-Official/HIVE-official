import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/tooltip';
import { Button } from '../../components/button';
import { Avatar } from '../../components/avatar';
import { Badge } from '../../components/badge';
import { 
  Info, 
  HelpCircle, 
  Settings, 
  Star, 
  Users, 
  Calendar, 
  BookOpen, 
  MessageCircle, 
  Heart,
  Share,
  Copy,
  Download,
  Edit,
  Trash2,
  Plus,
  Search,
  Bell,
  Shield
} from 'lucide-react';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
# HIVE Tooltip System

Clean, accessible tooltips for tech social platform with minimal gold usage.

## Design Principles:
- **Tech Social Feel**: Clean, modern tooltip styling
- **Minimal Gold**: Gold only for accent variant and special highlights
- **Instant Feedback**: Quick hover responses with proper delays
- **Accessible**: Full keyboard navigation and screen reader support

## Variants:
- **Default**: Standard tooltip with dark background
- **Accent**: Gold background for special highlights
- **Minimal**: Subtle styling with reduced opacity
- **Destructive**: Error or warning tooltips

## Use Cases:
- Icon explanations
- Feature descriptions
- Status indicators
- Help text
- Quick previews
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story: any) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">
          <Info className="w-4 h-4 mr-2" />
          Hover for info
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a helpful tooltip with campus information</p>
      </TooltipContent>
    </Tooltip>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-white">HIVE Tooltip System</h1>
          <p className="text-white/60">Instant contextual help for campus interactions</p>
        </div>

        {/* Basic Variants */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Tooltip Variants</h2>
            <div className="flex flex-wrap items-center gap-6">
              
              {/* Default */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Default Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent variant="primary">
                  Standard campus tooltip styling
                </TooltipContent>
              </Tooltip>

              {/* Accent */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Accent Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent variant="secondary">
                  Gold highlight for special features
                </TooltipContent>
              </Tooltip>

              {/* Minimal */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost">Minimal Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent variant="minimal">
                  Subtle styling for secondary info
                </TooltipContent>
              </Tooltip>

              {/* Destructive */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive">Warning Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent variant="destructive">
                  Important warning or error message
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Size Variants */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Size Variants</h2>
            <div className="flex flex-wrap items-center gap-6">
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="sm">Small</Button>
                </TooltipTrigger>
                <TooltipContent size="sm">
                  Compact
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Medium</Button>
                </TooltipTrigger>
                <TooltipContent size="md">
                  Standard size tooltip
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="lg">Large</Button>
                </TooltipTrigger>
                <TooltipContent size="lg">
                  Extended tooltip with more detailed information that can span multiple lines for complex explanations
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Campus Use Cases */}
        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-white">Campus Use Cases</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Icon Tooltips */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Icon Explanations</h3>
              <div className="flex flex-wrap gap-3">
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Users className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    View space members (47 students)
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Schedule study session
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <BookOpen className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Browse shared resources
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent variant="secondary">
                    Add to favorites
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Share with campus
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Campus settings
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Status Indicators</h3>
              <div className="space-y-3">
                
                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-3 h-3 bg-accent rounded-full cursor-help"></div>
                    </TooltipTrigger>
                    <TooltipContent variant="secondary">
                      High campus energy (87%)
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-white/80 text-sm">Campus Energy</span>
                </div>

                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-3 h-3 bg-green-500 rounded-full cursor-help"></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Space is active (24 online)
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-white/80 text-sm">Space Status</span>
                </div>

                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-3 h-3 bg-blue-500 rounded-full cursor-help"></div>
                    </TooltipTrigger>
                    <TooltipContent>
                      Study session in progress
                    </TooltipContent>
                  </Tooltip>
                  <span className="text-white/80 text-sm">Session Status</span>
                </div>

                <div className="flex items-center gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="cursor-help">
                        Verified
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent variant="secondary">
                      Verified student account
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* User Interactions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">User Previews</h3>
              <div className="space-y-3">
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Avatar className="w-6 h-6" />
                      <span className="text-white/80 text-sm">Alex Chen</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent size="lg">
                    <div className="text-center">
                      <div className="font-medium">Alex Chen</div>
                      <div className="text-xs text-white/60">CS Senior • Active 2h ago</div>
                      <div className="text-xs text-white/60 mt-1">3 shared spaces</div>
                    </div>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Avatar className="w-6 h-6" />
                      <span className="text-white/80 text-sm">Sarah Kim</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent size="lg">
                    <div className="text-center">
                      <div className="font-medium">Sarah Kim</div>
                      <div className="text-xs text-white/60">Math Junior • Library</div>
                      <div className="text-xs text-white/60 mt-1">Study group leader</div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Action Tooltips */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Action Helpers</h3>
              <div className="space-y-3">
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Create
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent variant="secondary">
                    Start a new study group or post
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="secondary" size="sm">
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Find students, spaces, or resources
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="w-4 h-4" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    3 new campus notifications
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Context Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Context Actions</h3>
              <div className="space-y-3">
                
                <div className="bg-white/5 border border-white/10 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-sm">Study Notes.pdf</span>
                    <div className="flex gap-1">
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Copy share link
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Download className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Download file (2.3 MB)
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Edit file details
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent variant="destructive">
                          Delete file (cannot be undone)
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help & Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Help & Information</h3>
              <div className="space-y-3">
                
                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm">Campus Energy</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-white/40 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent size="lg">
                      Campus Energy measures the overall activity and engagement level across your campus. Higher energy means more active students, events, and interactions.
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm">Space Verification</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Shield className="w-4 h-4 text-accent cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent variant="secondary">
                      This space is verified by campus administration
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-white/80 text-sm">Ritual Participation</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-white/40 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent size="lg">
                      Campus Rituals are weekly activities that bring the entire campus together. Participation helps build community spirit and unlocks special features.
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Positioning Examples */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Smart Positioning</h2>
          <p className="text-white/60 text-sm">Tooltips automatically adjust position to stay in viewport</p>
          
          <div className="grid grid-cols-4 gap-8 py-12">
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Top</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Appears above trigger
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Right</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Appears to the right
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Bottom</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  Appears below trigger
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="text-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary">Left</Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  Appears to the left
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-white">Interactive Campus Elements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Space Card with Tooltips */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-white">ML Study Group</h4>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="cursor-help">
                        Verified
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent variant="secondary">
                      Verified by CS Department
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Add to favorites
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Share className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      Share this space
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-white/60">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help">
                      <Users className="w-4 h-4" />
                      <span>47 members</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    24 active this week, 47 total members
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help">
                      <MessageCircle className="w-4 h-4" />
                      <span>12 posts</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    12 posts this week, very active
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            {/* Event Card with Tooltips */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Neural Networks Workshop</h4>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-3 h-3 bg-accent rounded-full cursor-help"></div>
                  </TooltipTrigger>
                  <TooltipContent variant="secondary">
                    Event starts in 2 hours
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-white/60">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help">
                      <Calendar className="w-4 h-4" />
                      <span>Today 7:00 PM</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Friday, March 15 at 7:00 PM PST
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-1 cursor-help">
                      <Users className="w-4 h-4" />
                      <span>23 registered</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    23 students registered, 12 spots remaining
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};