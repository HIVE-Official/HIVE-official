import React from 'react';

/**
 * Profile Bento Grid Layout
 * Spotify-inspired asymmetric grid system
 */

export const ProfileBentoLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-4 lg:p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)] p-1">
                <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                  <span className="text-5xl font-black text-[var(--hive-brand-secondary)]">JD</span>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-black text-white">John Doe</h1>
                <p className="text-[var(--hive-brand-secondary)] text-lg">@johndoe</p>
              </div>
              <p className="text-white/70 max-w-2xl">
                CS Major • Class of 2026 • Building the future at HIVE. Passionate about AI,
                web3, and making campus life better through technology.
              </p>
              <div className="flex gap-3">
                <button className="px-6 py-2 bg-[var(--hive-brand-secondary)] text-black font-semibold rounded-lg hover:bg-[var(--hive-brand-secondary-hover)] transition-colors">
                  Edit Profile
                </button>
                <button className="px-6 py-2 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
                  Share
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 lg:flex lg:flex-col lg:gap-6">
              <StatItem label="Spaces" value="12" />
              <StatItem label="Tools" value="5" />
              <StatItem label="XP" value="2.4k" />
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 auto-rows-[120px]">
          {/* Spaces Grid - Large */}
          <BentoCard
            className="lg:col-span-5 lg:row-span-3"
            title="My Spaces"
            gradient="from-blue-500/10"
          >
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[1, 2, 3, 4].map(i => (
                <SpaceThumbnail key={i} />
              ))}
            </div>
          </BentoCard>

          {/* Tools List - Medium */}
          <BentoCard
            className="lg:col-span-4 lg:row-span-2"
            title="Created Tools"
            gradient="from-purple-500/10"
          >
            <div className="space-y-2 mt-3">
              <ToolItem name="Study Scheduler" uses={234} />
              <ToolItem name="Grade Calculator" uses={189} />
              <ToolItem name="Roommate Finder" uses={92} />
            </div>
          </BentoCard>

          {/* Activity Timeline - Tall */}
          <BentoCard
            className="lg:col-span-3 lg:row-span-4"
            title="Recent Activity"
            gradient="from-green-500/10"
          >
            <div className="space-y-3 mt-4">
              <ActivityItem type="post" time="2h ago" />
              <ActivityItem type="tool" time="5h ago" />
              <ActivityItem type="space" time="1d ago" />
              <ActivityItem type="achievement" time="2d ago" />
            </div>
          </BentoCard>

          {/* Achievements - Wide */}
          <BentoCard
            className="lg:col-span-4 lg:row-span-2"
            title="Achievements"
            gradient="from-[var(--hive-brand-secondary)]/10"
          >
            <div className="flex gap-3 mt-4">
              <Badge icon="🏆" name="Early Adopter" />
              <Badge icon="💡" name="Tool Creator" />
              <Badge icon="🔥" name="Torch Bearer" />
            </div>
          </BentoCard>

          {/* Rituals Progress - Small */}
          <BentoCard
            className="lg:col-span-5 lg:row-span-1"
            title="Active Rituals"
            gradient="from-red-500/10"
          >
            <div className="flex items-center justify-between mt-2">
              <span className="text-white/70 text-sm">First Light Progress</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-white/20 rounded-full h-2">
                  <div className="h-full bg-[var(--hive-brand-secondary)] rounded-full w-[72%]" />
                </div>
                <span className="text-[var(--hive-brand-secondary)] text-sm font-semibold">72%</span>
              </div>
            </div>
          </BentoCard>

          {/* Connections - Medium */}
          <BentoCard
            className="lg:col-span-4 lg:row-span-2"
            title="Connections"
            gradient="from-indigo-500/10"
          >
            <div className="flex -space-x-2 mt-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-black" />
              ))}
              <div className="w-10 h-10 rounded-full bg-white/10 border-2 border-black flex items-center justify-center">
                <span className="text-white/60 text-xs">+47</span>
              </div>
            </div>
            <p className="text-white/60 text-sm mt-3">52 connections across campus</p>
          </BentoCard>
        </div>
      </div>
    </div>
  );
};

// Bento Card Component
const BentoCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  title: string;
  gradient?: string;
}> = ({ children, className, title, gradient = "from-white/10" }) => (
  <div className={`
    bg-gradient-to-br ${gradient} to-transparent
    border border-white/10 rounded-xl p-4
    hover:border-white/20 transition-all group
    ${className}
  `}>
    <h3 className="text-white font-semibold group-hover:text-[var(--hive-brand-secondary)] transition-colors">
      {title}
    </h3>
    {children}
  </div>
);

// Sub-components
const StatItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="text-center lg:text-left">
    <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">{value}</div>
    <div className="text-white/60 text-sm">{label}</div>
  </div>
);

const SpaceThumbnail = () => (
  <div className="aspect-square bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer" />
);

const ToolItem: React.FC<{ name: string; uses: number }> = ({ name, uses }) => (
  <div className="flex items-center justify-between p-2 rounded hover:bg-white/5">
    <span className="text-white/80 text-sm">{name}</span>
    <span className="text-[var(--hive-brand-secondary)] text-xs">{uses} uses</span>
  </div>
);

const ActivityItem: React.FC<{ type: string; time: string }> = ({ type, time }) => {
  const icons = {
    post: '📝',
    tool: '🔧',
    space: '🏛️',
    achievement: '🏆'
  };

  return (
    <div className="flex items-start gap-2">
      <span className="text-lg">{icons[type as keyof typeof icons]}</span>
      <div className="flex-1">
        <p className="text-white/70 text-sm">Action taken</p>
        <p className="text-white/40 text-xs">{time}</p>
      </div>
    </div>
  );
};

const Badge: React.FC<{ icon: string; name: string }> = ({ icon, name }) => (
  <div className="flex flex-col items-center p-2">
    <span className="text-2xl">{icon}</span>
    <span className="text-white/60 text-xs mt-1">{name}</span>
  </div>
);

export default ProfileBentoLayout;