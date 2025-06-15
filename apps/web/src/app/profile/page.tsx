import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@hive/ui'
import { ProfileHeader } from './components/profile-header'
import { ProfileOverview } from './components/profile-overview'
import { ProfileActivity } from './components/profile-activity'
import { ProfileSettings } from './components/profile-settings'
import { getCurrentUser } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Profile | HIVE',
  description: 'Manage your HIVE profile and settings.',
}

export default async function ProfilePage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Profile Header */}
        <ProfileHeader user={user} />

        {/* Profile Tabs */}
        <div className="mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-900/50">
              <TabsTrigger 
                value="overview"
                className="data-[state=active]:bg-gold data-[state=active]:text-black"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="activity"
                className="data-[state=active]:bg-gold data-[state=active]:text-black"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger 
                value="settings"
                className="data-[state=active]:bg-gold data-[state=active]:text-black"
              >
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <ProfileOverview user={user} />
            </TabsContent>

            <TabsContent value="activity" className="mt-6">
              <ProfileActivity user={user} />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <ProfileSettings user={user} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 