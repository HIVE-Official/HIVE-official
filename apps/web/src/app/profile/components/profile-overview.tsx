'use client'

import { Card, CardContent, CardHeader, CardTitle, Button } from '@hive/ui'
import { Users, Wrench, Calendar, Activity, Plus, ArrowRight } from 'lucide-react'
import type { User } from '@hive/core'

interface ProfileOverviewProps {
  user: User
}

export const ProfileOverview = ({ user }: ProfileOverviewProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Now Tile - Manual Status */}
      <Card className="border-gold/20 bg-gray-900/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gold">
            <Activity className="h-5 w-5" />
            Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-300">
              {user.currentStatus || 'Set your current status...'}
            </p>
            <Button variant="outline" size="sm" className="w-full">
              Update Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My Spaces - Placeholder for Team 2 Integration */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-white">
            <Users className="h-5 w-5" />
            My Spaces
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg border border-dashed border-gray-600 p-4 text-center">
              <p className="text-sm text-gray-400">
                Your joined Spaces will appear here
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Integration with Team 2 pending
              </p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Explore Spaces
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* My Tools - Placeholder for Team 3 Integration */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-white">
            <Wrench className="h-5 w-5" />
            My Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg border border-dashed border-gray-600 p-4 text-center">
              <p className="text-sm text-gray-400">
                Your created Tools will appear here
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Integration with Team 3 pending
              </p>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Create Tool
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="border-gray-700 bg-gray-900/50 md:col-span-2 lg:col-span-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-white">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">0</div>
              <div className="text-sm text-gray-400">Spaces Joined</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">0</div>
              <div className="text-sm text-gray-400">Tools Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">0</div>
              <div className="text-sm text-gray-400">Posts Made</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gold">
                {user.isBuilder ? 'Yes' : 'No'}
              </div>
              <div className="text-sm text-gray-400">Builder Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity - Stub */}
      <Card className="border-gray-700 bg-gray-900/50 md:col-span-2 lg:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" className="text-gold hover:text-gold/80">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg border border-dashed border-gray-600 p-6 text-center">
              <Calendar className="mx-auto h-8 w-8 text-gray-500" />
              <p className="mt-2 text-sm text-gray-400">
                Your recent activity will appear here
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Start by joining Spaces or creating Tools
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 