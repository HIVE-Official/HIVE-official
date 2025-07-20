"use client";

import { PageContainer, Button, Card } from '@hive/ui';
import { Settings, User, Bell, Shield, Palette, Globe, Smartphone, LogOut } from 'lucide-react';
import { useSession } from '../../../hooks/use-session';

export default function SettingsPage() {
  const { user, logout } = useSession();

  return (
    <PageContainer
      title="Settings"
      subtitle="Manage your account preferences and privacy settings"
      breadcrumbs={[
        { label: "Settings", icon: Settings }
      ]}
      maxWidth="xl"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
            <h2 className="text-lg font-semibold text-white mb-4">Settings</h2>
            <nav className="space-y-2">
              {[
                { icon: User, label: "Profile", active: true },
                { icon: Bell, label: "Notifications" },
                { icon: Shield, label: "Privacy & Security" },
                { icon: Palette, label: "Appearance" },
                { icon: Globe, label: "Language & Region" },
                { icon: Smartphone, label: "Mobile" },
              ].map((item, i) => (
                <button
                  key={i}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    item.active 
                      ? 'bg-[rgba(255,215,0,0.1)] text-[#FFD700]' 
                      : 'text-[#A1A1AA] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
            <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={user?.fullName || ''}
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] rounded-lg text-white placeholder:text-[#A1A1AA] focus:border-[#FFD700] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Handle</label>
                  <input 
                    type="text" 
                    defaultValue={user?.handle || ''}
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] rounded-lg text-white placeholder:text-[#A1A1AA] focus:border-[#FFD700] focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Email</label>
                <input 
                  type="email" 
                  defaultValue={user?.email || ''}
                  disabled
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg text-[#A1A1AA] cursor-not-allowed"
                />
                <p className="text-xs text-[#A1A1AA] mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">Bio</label>
                <textarea 
                  rows={3}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] rounded-lg text-white placeholder:text-[#A1A1AA] focus:border-[#FFD700] focus:outline-none"
                  placeholder="Tell others about yourself..."
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255]">
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Notification Preferences */}
          <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
            <h3 className="text-lg font-semibold text-white mb-6">Notification Preferences</h3>
            <div className="space-y-4">
              {[
                { label: "Comments on my tools", description: "Get notified when someone comments on your tools" },
                { label: "New followers", description: "Get notified when someone starts following you" },
                { label: "Space invitations", description: "Get notified when you're invited to join a space" },
                { label: "Event reminders", description: "Get reminders about upcoming events you're attending" },
                { label: "Weekly digest", description: "Get a weekly summary of activity in your spaces" },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between py-3">
                  <div className="flex-1">
                    <h4 className="text-white text-sm font-medium">{item.label}</h4>
                    <p className="text-[#A1A1AA] text-xs mt-1">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer ml-4">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD700]"></div>
                  </label>
                </div>
              ))}
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
            <h3 className="text-lg font-semibold text-white mb-6">Privacy & Security</h3>
            <div className="space-y-4">
              <div className="flex items-start justify-between py-3">
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium">Profile visibility</h4>
                  <p className="text-[#A1A1AA] text-xs mt-1">Make your profile visible to other HIVE users</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD700]"></div>
                </label>
              </div>
              <div className="flex items-start justify-between py-3">
                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium">Show online status</h4>
                  <p className="text-[#A1A1AA] text-xs mt-1">Let others see when you're active on HIVE</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[rgba(255,255,255,0.1)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD700]"></div>
                </label>
              </div>
            </div>
            <div className="border-t border-[rgba(255,255,255,0.06)] pt-4 mt-6">
              <h4 className="text-white text-sm font-medium mb-4">Data Management</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]">
                  Download My Data
                </Button>
                <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>

          {/* Sign Out */}
          <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">Sign Out</h3>
                <p className="text-[#A1A1AA] text-sm">Sign out of your HIVE account on this device</p>
              </div>
              <Button 
                variant="outline" 
                className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                onClick={logout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}