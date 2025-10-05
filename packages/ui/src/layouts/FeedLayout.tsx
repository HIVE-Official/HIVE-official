import React from 'react';

/**
 * Feed Layout Component
 * Asymmetric grid inspired by Discord + TikTok
 */

export const FeedLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="text-[var(--hive-brand-secondary)] font-black text-xl">HIVE</div>
            <button className="text-white/60 hover:text-white">≡</button>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <input
              type="search"
              placeholder="Search everything..."
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-white/60 hover:text-[var(--hive-brand-secondary)]">🔔</button>
            <div className="w-8 h-8 bg-[var(--hive-brand-secondary)] rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="flex pt-16">
        {/* Quick Jump Sidebar (Desktop) */}
        <aside className="hidden lg:block w-20 fixed left-0 top-16 bottom-0 bg-black border-r border-white/10 py-8">
          <nav className="flex flex-col items-center gap-6">
            <NavItem active icon="◉" label="Feed" />
            <NavItem icon="○" label="Space" />
            <NavItem icon="○" label="Lab" />
            <NavItem icon="○" label="You" />
          </nav>
        </aside>

        {/* Main Feed Area */}
        <main className="flex-1 lg:ml-20 lg:mr-80">
          <div className="max-w-4xl mx-auto p-4 lg:p-8">
            {/* Hero Post */}
            <HeroPost />

            {/* Asymmetric Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mt-6">
              <div className="lg:col-span-6">
                <PostCard size="large" />
              </div>
              <div className="lg:col-span-4">
                <PostCard size="small" />
              </div>
              <div className="lg:col-span-4">
                <PostCard size="small" />
              </div>
              <div className="lg:col-span-6">
                <PostCard size="large" />
              </div>
              <div className="lg:col-span-10">
                <RitualCard />
              </div>
            </div>

            {children}
          </div>
        </main>

        {/* Context Panel (Desktop) */}
        <aside className="hidden xl:block w-80 fixed right-0 top-16 bottom-0 bg-black border-l border-white/10 p-6">
          <ContextPanel />
        </aside>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-white/10">
        <div className="flex justify-around py-3">
          <MobileNavItem icon="🏠" active />
          <MobileNavItem icon="🔍" />
          <MobileNavItem icon="➕" primary />
          <MobileNavItem icon="💬" />
          <MobileNavItem icon="👤" />
        </div>
      </nav>
    </div>
  );
};

// Sub-components
const NavItem: React.FC<{ icon: string; label: string; active?: boolean }> = ({
  icon, label, active
}) => (
  <button className={`flex flex-col items-center gap-1 group ${active ? 'text-[var(--hive-brand-secondary)]' : 'text-white/40 hover:text-white'}`}>
    <span className="text-2xl">{icon}</span>
    <span className="text-xs">{label}</span>
  </button>
);

const MobileNavItem: React.FC<{ icon: string; active?: boolean; primary?: boolean }> = ({
  icon, active, primary
}) => (
  <button className={`
    p-3 rounded-lg transition-all
    ${primary ? 'bg-[var(--hive-brand-secondary)] text-black scale-110' : ''}
    ${active ? 'text-[var(--hive-brand-secondary)]' : 'text-white/60'}
  `}>
    <span className="text-xl">{icon}</span>
  </button>
);

const HeroPost = () => (
  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-[var(--hive-brand-secondary)]/30 transition-all">
    <div className="flex items-start gap-3 mb-4">
      <div className="w-12 h-12 bg-[var(--hive-brand-secondary)]/20 rounded-full" />
      <div>
        <div className="font-semibold text-white">Space Name</div>
        <div className="text-white/60 text-sm">2 hours ago • 📍 Trending</div>
      </div>
    </div>
    <h2 className="text-2xl font-bold text-white mb-3">
      This is a hero post that gets extra attention
    </h2>
    <p className="text-white/80 mb-4">
      The asymmetric layout makes important content stand out naturally...
    </p>
    <div className="flex items-center gap-6 text-white/60">
      <button className="hover:text-[var(--hive-brand-secondary)]">💛 234</button>
      <button className="hover:text-[var(--hive-brand-secondary)]">💬 45</button>
      <button className="hover:text-[var(--hive-brand-secondary)]">📤 12</button>
    </div>
  </div>
);

const PostCard: React.FC<{ size: 'small' | 'large' }> = ({ size }) => (
  <div className={`
    bg-white/5 border border-white/10 rounded-xl p-4
    hover:border-white/20 transition-all group
    ${size === 'large' ? 'h-48' : 'h-40'}
  `}>
    <div className="text-white/80">
      {size === 'large' ? 'Large post area' : 'Compact post'}
    </div>
  </div>
);

const RitualCard = () => (
  <div className="bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 to-transparent border border-[var(--hive-brand-secondary)]/30 rounded-xl p-6">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold text-white">First Light Ritual</h3>
      <span className="text-[var(--hive-brand-secondary)] text-sm">72% Complete</span>
    </div>
    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)] w-[72%]" />
    </div>
    <p className="text-white/60 text-sm mt-3">
      Complete 3 more actions to unlock Rich Text posting
    </p>
  </div>
);

const ContextPanel = () => (
  <div className="space-y-6">
    <section>
      <h3 className="text-white font-semibold mb-3">Trending Now</h3>
      <div className="space-y-2">
        <TrendingItem tag="#midterms" count="1.2k" />
        <TrendingItem tag="#halloween" count="847" />
        <TrendingItem tag="#studygroup" count="623" />
      </div>
    </section>

    <section>
      <h3 className="text-white font-semibold mb-3">Active Rituals</h3>
      <div className="space-y-2">
        <ActiveRitual name="Space Wars" progress={45} />
        <ActiveRitual name="Torch Pass" progress={80} />
      </div>
    </section>
  </div>
);

const TrendingItem: React.FC<{ tag: string; count: string }> = ({ tag, count }) => (
  <button className="flex items-center justify-between w-full p-2 rounded hover:bg-white/5">
    <span className="text-[var(--hive-brand-secondary)]">{tag}</span>
    <span className="text-white/40 text-sm">{count} posts</span>
  </button>
);

const ActiveRitual: React.FC<{ name: string; progress: number }> = ({ name, progress }) => (
  <div className="p-3 bg-white/5 rounded-lg">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-white">{name}</span>
      <span className="text-[var(--hive-brand-secondary)]">{progress}%</span>
    </div>
    <div className="w-full bg-white/10 rounded-full h-1">
      <div
        className="h-full bg-[var(--hive-brand-secondary)] rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

export default FeedLayout;