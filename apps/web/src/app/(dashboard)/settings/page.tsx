"use client";

import { useState } from 'react';
import { Button, Card, NavigationPreferences, useShell } from "@hive/ui";
import { PageContainer } from "@/components/temp-stubs";
import { Settings, User, Bell, Shield, Palette, Globe, Smartphone, LogOut, Download, Trash2, Navigation } from 'lucide-react';
import { useSession } from '../../../hooks/use-session';

export default function SettingsPage() {
  const { user, logout } = useSession();
  const { navigationPreference, setNavigationPreference, navigationLayout } = useShell();
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    handle: user?.handle || '',
    bio: ''
  });

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      // Mock API call - in real app would update user profile
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Profile updated successfully!');
    } catch (_error) {
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownloadData = async () => {
    setIsDownloading(true);
    try {
      // Mock data download - in real app would generate and download user data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock download
      const userData = {
        profile: user,
        spaces: ['CS Study Group', 'Math Tutoring'],
        tools: ['GPA Calculator', 'Study Planner'],
        exportDate: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hive-data-${user?.handle || 'user'}-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Your data has been downloaded successfully!');
    } catch (_error) {
      alert('Failed to download data. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Mock account deletion - in real app would delete user account
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Account deletion initiated. You will receive an email confirmation.');
      setShowDeleteConfirm(false);
    } catch (_error) {
      alert('Failed to delete account. Please try again.');
    }
  };

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
                { icon: Navigation, label: "Navigation" },
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
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] rounded-lg text-white placeholder:text-[#A1A1AA] focus:border-[#FFD700] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Handle</label>
                  <input 
                    type="text" 
                    value={formData.handle}
                    onChange={(e) => setFormData(prev => ({ ...prev, handle: e.target.value }))}
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
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] rounded-lg text-white placeholder:text-[#A1A1AA] focus:border-[#FFD700] focus:outline-none"
                  placeholder="Tell others about yourself..."
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFE255] disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </Card>

          {/* Navigation Preferences */}
          <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
            <h3 className="text-lg font-semibold text-white mb-6">Navigation Preferences</h3>
            <div className="space-y-6">
              <NavigationPreferences
                value={navigationPreference}
                onChange={setNavigationPreference}
              />
              
              {/* Current Status */}
              <div className="p-4 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.08)]">
                <h4 className="text-sm font-medium text-white mb-2">Current Layout</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#A1A1AA]">Mode: {navigationLayout.resolvedMode}</span>
                  <span className="text-[#FFD700] font-medium">
                    {navigationLayout.resolvedMode === 'bottom-tabs' && 'Bottom Tabs'}
                    {navigationLayout.resolvedMode === 'topbar' && 'Top Navigation'}
                    {navigationLayout.resolvedMode === 'sidebar' && 'Sidebar'}
                    {navigationLayout.resolvedMode === 'drawer' && 'Drawer'}
                  </span>
                </div>
                <div className="mt-2 text-xs text-[#A1A1AA]">
                  {navigationLayout.canUsePreference 
                    ? 'User preference active' 
                    : navigationLayout.reasons.join(', ')
                  }
                </div>
              </div>
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
                  <p className="text-[#A1A1AA] text-xs mt-1">Let others see when you&apos;re active on HIVE</p>
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
                <Button 
                  variant="outline" 
                  onClick={handleDownloadData}
                  disabled={isDownloading}
                  className="border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)] disabled:opacity-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isDownloading ? 'Downloading...' : 'Download My Data'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
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

      {/* Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-md mx-4 bg-[rgba(0,0,0,0.9)] border-red-500/30">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                <Trash2 className="h-8 w-8 text-red-400" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Delete Account</h3>
                <p className="text-[#A1A1AA] text-sm">
                  This action cannot be undone. This will permanently delete your account and remove all your data from HIVE.
                </p>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-white mb-4">Type &quot;DELETE&quot; to confirm:</p>
                <input 
                  type="text" 
                  placeholder="Type DELETE"
                  className="w-full p-3 bg-[rgba(255,255,255,0.05)] border border-red-500/30 rounded-lg text-white placeholder:text-[#A1A1AA] focus:outline-none focus:border-red-500"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 border-[rgba(255,255,255,0.2)] text-white hover:bg-[rgba(255,255,255,0.1)]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDeleteAccount}
                  className="flex-1 bg-red-500 text-white hover:bg-red-600"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </PageContainer>
  );
}