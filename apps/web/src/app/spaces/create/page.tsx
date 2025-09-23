'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CreateSpaceModal } from '@/components/spaces/create-space-modal';
import { HiveButton, HiveCard } from '@hive/ui';
import { ArrowLeft, Sparkles, Rocket, Users, BookOpen, Trophy } from 'lucide-react';
import { api } from '@/lib/api-client';

// Space type preview cards for the landing page
const SPACE_PREVIEWS = [
  {
    icon: BookOpen,
    title: 'Academic Spaces',
    description: 'Study groups, research teams, and course collaboration',
    examples: ['CS Study Squad', 'Physics Lab Team', 'Writing Workshop'],
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Users,
    title: 'Social Communities',
    description: 'Clubs, organizations, and interest groups',
    examples: ['Gaming Guild', 'Photography Club', 'Startup Network'],
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Trophy,
    title: 'Campus Living',
    description: 'Dorms, floors, and residential communities',
    examples: ['Ellicott 3rd Floor', 'South Campus Squad', 'RA Network'],
    color: 'from-green-500 to-green-600'
  }
];

export default function CreateSpacePage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-open modal when page loads
  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleCreateSpace = async (spaceData: any) => {
    setIsCreating(true);
    setError(null);

    try {
      // Map the modal data to API format
      const apiData = {
        name: spaceData.name,
        description: spaceData.description,
        type: mapSpaceType(spaceData.type),
        isPrivate: spaceData.visibility !== 'public',
        tags: spaceData.customizations?.tags || []
      };

      const response = await api.spaces.create(apiData);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to create space' }));
        throw new Error(errorData.error || 'Failed to create space');
      }

      const data = await response.json();

      if (data.success) {
        // Navigate to the new space
        router.push(`/spaces/${data.data.space.id}`);
      } else {
        throw new Error(data.error || 'Failed to create space');
      }
    } catch (error: any) {
      console.error('Failed to create space:', error);
      setError(error.message || 'Something went wrong. Please try again.');
      setIsCreating(false);
    }
  };

  const handleModalClose = () => {
    if (!isCreating) {
      setShowModal(false);
      router.push('/spaces');
    }
  };

  // Map modal space types to API space types
  const mapSpaceType = (modalType: string): string => {
    const mapping: Record<string, string> = {
      'academic': 'student_organizations',
      'residential': 'campus_living',
      'professional': 'university_organizations',
      'recreational': 'student_organizations',
      'project': 'hive_exclusive'
    };
    return mapping[modalType] || 'student_organizations';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Modal for space creation */}
      <CreateSpaceModal
        isOpen={showModal}
        onClose={handleModalClose}
        onCreateSpace={handleCreateSpace}
        isLoading={isCreating}
        error={error}
      />

      {/* Background Landing Page */}
      <div className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <HiveButton
              variant="ghost"
              size="sm"
              onClick={() => router.push('/spaces')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Spaces
            </HiveButton>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-hive-gold" />
              Create Your Space
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-hive-gold/20 rounded-full mb-6">
            <Rocket className="w-10 h-10 text-hive-gold" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Launch Your Community
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every great campus movement starts with a space. Whether it's a study group,
            a club, or just your floor's group chat replacement - make it official.
          </p>
          <HiveButton
            onClick={() => setShowModal(true)}
            className="mt-8 bg-hive-gold text-black hover:bg-yellow-400 font-semibold text-lg px-8 py-3"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Creating
          </HiveButton>
        </div>

        {/* Space Type Examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {SPACE_PREVIEWS.map((preview, index) => {
            const Icon = preview.icon;
            return (
              <HiveCard
                key={index}
                className="bg-gray-900/50 border-gray-800 p-6 hover:border-hive-gold/50 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${preview.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {preview.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {preview.description}
                </p>
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 font-semibold">Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {preview.examples.map((example, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </HiveCard>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">
            What You Get With Every Space
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '💬', title: 'Real-time Chat', description: 'Discord-style messaging' },
              { icon: '📅', title: 'Event Calendar', description: 'Schedule and RSVP' },
              { icon: '🛠️', title: 'Custom Tools', description: 'Build your own features' },
              { icon: '📊', title: 'Analytics', description: 'Track engagement' },
              { icon: '🔔', title: 'Notifications', description: 'Never miss updates' },
              { icon: '👥', title: 'Member Roles', description: 'Organize your team' },
              { icon: '📱', title: 'Mobile Ready', description: 'Works everywhere' },
              { icon: '🔒', title: 'Privacy Controls', description: 'You decide who joins' }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-lg p-4">
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-gray-500 text-xs">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center py-12 border-t border-gray-800">
          <p className="text-gray-400 mb-6">
            Ready to bring your community together?
          </p>
          <HiveButton
            onClick={() => setShowModal(true)}
            className="bg-hive-gold text-black hover:bg-yellow-400 font-semibold"
            size="lg"
          >
            Create Your Space Now
          </HiveButton>
          <p className="text-gray-500 text-sm mt-4">
            Takes less than 2 minutes • No approval needed • Go live instantly
          </p>
        </div>
      </div>
    </div>
  );
}