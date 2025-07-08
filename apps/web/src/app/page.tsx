import { HeroSection } from '@hive/ui';

export default function HomePage() {
  const handleGetStarted = () => {
    window.location.href = '/auth/school-select';
  };

  const handleLearnMore = () => {
    // Scroll to features section or show modal
    const modal = document.getElementById('features-modal');
    if (modal) {
      modal.classList.remove('hidden');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--surface)),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--surface)),transparent_50%)]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <HeroSection 
          onGetStarted={handleGetStarted}
          onLearnMore={handleLearnMore}
        />
      </div>

      {/* Features Modal */}
      <div id="features-modal" className="hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#111111] border border-[#FFD700]/30 rounded-lg p-8 max-w-lg w-full relative">
          <button
            onClick={() => document.getElementById('features-modal')?.classList.add('hidden')}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-4">HIVE Platform</h2>
          <p className="text-gray-300 mb-6">
            The programmable campus layer where students find their people, make decisions together, and build tools that spread.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xl">👤</span>
              <span className="text-white">Profile - Your campus identity</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🏛️</span>
              <span className="text-white">Spaces - Where communities live</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">🛠️</span>
              <span className="text-white">Tools - Build utilities that solve problems</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xl">⚡</span>
              <span className="text-white">Rituals - Campus-wide moments</span>
            </div>
          </div>
          
          <button
            onClick={() => document.getElementById('features-modal')?.classList.add('hidden')}
            className="w-full px-6 py-3 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFD700]/90 transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}