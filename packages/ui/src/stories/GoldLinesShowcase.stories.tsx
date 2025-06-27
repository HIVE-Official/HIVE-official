import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/button'
import { Badge } from '@/components/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/card'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { Sparkles, ArrowRight, Star, User, Settings, Bell } from 'lucide-react'

const meta: Meta = {
  title: 'Showcase/Gold Lines Design System',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'HIVE design system embracing #FFD700 gold borders/lines as the primary visual language, creating a premium Vercel-inspired aesthetic.',
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>;

export const GoldLines: Story = {
  render: () => (
    <div className="bg-background p-8 space-y-12">
      {/* Button Showcase */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Button Variants</h2>
          <p className="text-muted-foreground">Gold borders create premium interaction states</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Gold Border */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg text-white">Default (Gold Border)</h3>
            <div className="flex flex-col gap-2">
              <Button variant="default" size="sm">Get Started</Button>
              <Button variant="default">Continue</Button>
              <Button variant="default" size="lg">Join the Community</Button>
            </div>
          </div>

          {/* Accent Treatment */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg text-white">Accent (Premium)</h3>
            <div className="flex flex-col gap-2">
              <Button variant="accent" size="sm"><Sparkles className="w-4 h-4 mr-2" />Featured</Button>
              <Button variant="accent">Upgrade Plan <ArrowRight className="w-4 h-4 ml-2" /></Button>
              <Button variant="accent" size="lg">Premium Access</Button>
            </div>
          </div>

          {/* Ritual (Gold Fill) */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg text-white">Ritual (Special Moments)</h3>
            <div className="flex flex-col gap-2">
              <Button variant="ritual" size="sm">Complete</Button>
              <Button variant="ritual">Launch Project</Button>
              <Button variant="ritual" size="lg">Create Your Legacy</Button>
            </div>
          </div>

          {/* Outline & Ghost */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg text-white">Subtle Variants</h3>
            <div className="flex flex-col gap-2">
              <Button variant="outline" size="sm">Learn More</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="surface" size="lg">Save Draft</Button>
            </div>
          </div>

          {/* States */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg text-white">States</h3>
            <div className="flex flex-col gap-2">
              <Button variant="default" loading>Processing...</Button>
              <Button variant="default" disabled>Disabled</Button>
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Badge Showcase */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Badge System</h2>
          <p className="text-muted-foreground">Gold outlines for status and categorization</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Primary Badges */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg text-white">Default & Accent</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Featured</Badge>
              <Badge variant="accent">Premium</Badge>
              <Badge variant="ritual">Legendary</Badge>
            </div>
          </div>

          {/* Status Badges */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg text-white">Status</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="positive">Online</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="negative">Offline</Badge>
              <Badge variant="info">Beta</Badge>
            </div>
          </div>

          {/* Interactive */}
          <div className="space-y-3">
            <h3 className="font-medium text-lg text-white">Interactive</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="interactive">@username</Badge>
              <Badge variant="mention">@hive</Badge>
              <Badge variant="hashtag">#design</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Card Showcase */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Card Variants</h2>
          <p className="text-muted-foreground">Elevation with gold accent states</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Default Card */}
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard card with gold hover states</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Content goes here with proper spacing and typography.</p>
            </CardContent>
          </Card>

          {/* Accent Card */}
          <Card className="border-accent">
            <CardHeader>
              <CardTitle>Accent Card</CardTitle>
              <CardDescription>Featured content with gold borders</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="accent" className="mb-2">Featured</Badge>
              <p className="text-sm text-muted-foreground">Premium content showcase.</p>
            </CardContent>
          </Card>

          {/* Interactive Card */}
          <Card className="cursor-pointer hover:border-accent transition-colors">
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Clickable with hover animations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Hover to see elevation and gold accent effects.</p>
            </CardContent>
            <CardFooter>
              <Button variant="default" size="sm">
                <ArrowRight className="w-4 h-4 mr-2" />
                Explore
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Form Showcase */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Form Elements</h2>
          <p className="text-muted-foreground">Gold focus states for enhanced interaction</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Variants */}
          <Card>
            <CardHeader>
              <CardTitle>Input Variants</CardTitle>
              <CardDescription>Different input styles with gold focus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Input</Label>
                <Input placeholder="Enter your email..." />
              </div>
              
              <div className="space-y-2">
                <Label>Accent Input</Label>
                <Input className="focus-visible:ring-accent" placeholder="Featured field..." />
              </div>
              
              <div className="space-y-2">
                <Label>Disabled</Label>
                <Input placeholder="Disabled" disabled />
              </div>
            </CardContent>
          </Card>

          {/* Combination */}
          <Card>
            <CardHeader>
              <CardTitle>Login Form</CardTitle>
              <CardDescription>A typical form structure.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="user@hive.university" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="accent" className="w-full">Sign In</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Menu / Nav Showcase */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Menus & Navigation</h2>
          <p className="text-muted-foreground">Consistent gold accents for navigation elements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile Dropdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-56 rounded-md border bg-background p-1">
                <div className="px-2 py-1.5 text-sm font-semibold text-white">Laney Fraass</div>
                <div className="px-2 py-1.5 text-xs text-muted-foreground">laney@hive.university</div>
                <div className="my-1 h-px bg-border" />
                <a href="#" className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-muted focus:outline-none focus:ring-1 focus:ring-accent">
                  <User className="w-4 h-4 mr-2" /> Profile
                </a>
                <a href="#" className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-muted focus:outline-none focus:ring-1 focus:ring-accent">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </a>
                <a href="#" className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm hover:bg-muted focus:outline-none focus:ring-1 focus:ring-accent">
                  <Bell className="w-4 h-4 mr-2" /> Notifications
                </a>
                <div className="my-1 h-px bg-border" />
                <a href="#" className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm text-destructive hover:bg-muted focus:outline-none focus:ring-1 focus:ring-accent">
                  Log out
                </a>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sidebar Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="space-y-1">
                <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-muted text-accent">
                  <Sparkles className="h-4 w-4" /> Home
                </a>
                <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-muted">
                  <User className="h-4 w-4" /> Profile
                </a>
                <a href="#" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-muted">
                  <Settings className="h-4 w-4" /> Settings
                </a>
              </nav>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  ),
} 