import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/card'
import { Alert } from '../../components/alert'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/tabs'

const meta: Meta = {
  title: '🧱 Components/Overview',
  parameters: {
    docs: {
      description: {
        component: 'Complete overview of the HIVE component library with strategic gold usage.'
      }
    }
  }
}

export default meta
type Story = StoryObj

export const ComponentShowcase: Story = {
  render: () => (
    <div className="bg-background p-8 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">🐝 HIVE Component Library</h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          A complete set of components built for campus social platforms with strategic gold accents and HIVE motion.
        </p>
      </div>

      {/* Buttons Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Buttons</h2>
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <CardTitle>Interactive Actions</CardTitle>
            <CardDescription>
              Buttons with strategic gold borders on hover and focus states
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="accent">Gold Accent</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="secondary">Outlined</Button>
              <Button variant="primary">Ritual Moment</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Inputs Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Form Inputs</h2>
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <CardTitle>User Input Fields</CardTitle>
            <CardDescription>
              Input components with gold focus rings and hover hints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Default input" variant="primary" />
              <Input placeholder="Search spaces..." variant="search" />
              <Input placeholder="Filled variant" variant="filled" />
              <Input placeholder="Minimal style" variant="minimal" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Cards Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Cards & Containers</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="primary" padding="md">
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Standard container for content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">
                Clean design with subtle borders and hover effects.
              </p>
            </CardContent>
          </Card>

          <Card variant="interactive" padding="md">
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>Clickable with scale animation</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">
                Hover to see the gold border and scale effect.
              </p>
            </CardContent>
          </Card>

          <Card variant="accent" padding="md">
            <CardHeader>
              <CardTitle>Accent Card</CardTitle>
              <CardDescription>Special content with gold border</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted">
                Permanent gold accent for important content.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Alerts Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Alerts & Feedback</h2>
        <div className="space-y-4">
          <Alert variant="info">
            <div>
              <h4 className="font-medium mb-1">New space available</h4>
              <p className="text-sm">CS Study Group is now accepting new members.</p>
            </div>
          </Alert>
          
          <Alert variant="success">
            <div>
              <h4 className="font-medium mb-1">Achievement unlocked!</h4>
              <p className="text-sm">You've completed your first ritual participation.</p>
            </div>
          </Alert>
          
          <Alert variant="warning">
            <div>
              <h4 className="font-medium mb-1">Space activity low</h4>
              <p className="text-sm">Your Engineering space hasn't had posts in 3 days.</p>
            </div>
          </Alert>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Navigation & Tabs</h2>
        <Card variant="elevated" padding="lg">
          <CardHeader>
            <CardTitle>Campus Dashboard</CardTitle>
            <CardDescription>
              Tab navigation with gold active states
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="feed" variant="underline">
              <TabsList>
                <TabsTrigger value="feed">Feed</TabsTrigger>
                <TabsTrigger value="spaces">My Spaces</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              
              <TabsContent value="feed" className="mt-6">
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-sm font-semibold text-black">
                        M
                      </div>
                      <div>
                        <div className="font-medium text-white">Maya from CS Study Group</div>
                        <p className="text-sm text-muted mt-1">
                          Just shared new algorithm practice problems for next week's session! 
                        </p>
                        <div className="text-xs text-muted mt-2">2 hours ago • CS Study Group</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="spaces" className="mt-6">
                <div className="grid gap-3">
                  {['CS Study Group', 'Engineering Lounge', 'Dorm Floor 3'].map((space) => (
                    <div key={space} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div>
                        <div className="font-medium text-white">{space}</div>
                        <div className="text-xs text-muted">Active • 47 members</div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="tools" className="mt-6">
                <div className="text-center py-8">
                  <p className="text-muted">No tools created yet</p>
                  <Button variant="accent" size="sm" className="mt-4">
                    Create Your First Tool
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="mt-6">
                <div className="space-y-3">
                  <div className="border border-accent rounded-lg p-4 bg-accent/5">
                    <div className="font-medium text-white">Study Session Tonight</div>
                    <div className="text-sm text-muted">CS Study Group • 7:00 PM • Library</div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Design Principles */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">Design Principles</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card variant="primary" padding="lg">
            <CardHeader>
              <CardTitle>Strategic Gold Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Gold borders appear on hover and focus states</li>
                <li>• Achievement moments use gold accents</li>
                <li>• Active states in navigation get gold indicators</li>
                <li>• Success alerts feature gold borders</li>
              </ul>
            </CardContent>
          </Card>

          <Card variant="primary" padding="lg">
            <CardHeader>
              <CardTitle>HIVE Motion System</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted">
                <li>• 180ms duration for all interactions</li>
                <li>• Cubic-bezier curve feels organic</li>
                <li>• Scale effects on interactive elements</li>
                <li>• Smooth transitions maintain continuity</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}