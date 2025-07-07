"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiveLogo, Button, Countdown } from '@hive/ui';
import { ArrowRight, X, Check } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

function HomePageContent() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    // Platform is locked - show modal instead
    setShowModal(true);
    setCheckedItems(new Set());
    // Start checking items with staggered animation
    setTimeout(() => {
      const items = [0, 1, 2, 3];
      items.forEach((item, index) => {
        setTimeout(() => {
          setCheckedItems(prev => new Set([...prev, item]));
        }, index * 600);
      });
    }, 1000);
  };

  const handleWhatsComing = () => {
    setShowModal(true);
    setCheckedItems(new Set());
    // Start checking items with staggered animation
    setTimeout(() => {
      const items = [0, 1, 2, 3];
      items.forEach((item, index) => {
        setTimeout(() => {
          setCheckedItems(prev => new Set([...prev, item]));
        }, index * 600);
      });
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
    setCheckedItems(new Set());
  };

  // Set launch date to July 31st 8 AM 2025
  const launchDate = new Date('2025-07-31T08:00:00');
  const targetDate = launchDate.toISOString();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-24 h-24 bg-surface rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-foreground overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#111111,transparent_50%)]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.24, 
            ease: [0.33, 0.65, 0, 1],
            delay: 0.1 
          }}
          className="max-w-4xl space-y-8 sm:space-y-12 md:space-y-16"
        >
          {/* Logo and Title */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.33, 0.65, 0, 1],
                delay: 0.3 
              }}
            >
              <HiveLogo 
                variant="white" 
                size="2xl" 
                className="drop-shadow-2xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32"
              />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.33, 0.65, 0, 1],
                delay: 0.9 
              }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-foreground font-display"
            >
              HIVE
            </motion.h1>
          </div>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.24, 
              ease: [0.33, 0.65, 0, 1],
              delay: 0.8 
            }}
            className="py-4 sm:py-6 md:py-8"
          >
            <Countdown targetDate={targetDate} />
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.18, 
              ease: [0.33, 0.65, 0, 1],
              delay: 1.4 
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                y: -1,
              }}
              whileTap={{ 
                scale: 0.98, 
                y: 0,
              }}
              transition={{ 
                duration: 0.18, 
                ease: [0.33, 0.65, 0, 1] 
              }}
            >
              <Button
                size="lg"
                className="group h-12 sm:h-14 bg-transparent hover:bg-surface px-6 sm:px-8 text-base sm:text-lg font-medium text-muted border border-[#2A2A2A]/50 hover:border-[#FFD700]/30 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                onClick={handleGetStarted}
              >
                Coming Soon
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ 
                scale: 1.02, 
                y: -1,
              }}
              whileTap={{ 
                scale: 0.98, 
                y: 0,
              }}
              transition={{ 
                duration: 0.18, 
                ease: [0.33, 0.65, 0, 1] 
              }}
            >
              <Button
                size="lg"
                className="group h-12 sm:h-14 bg-transparent hover:bg-surface px-6 sm:px-8 text-base sm:text-lg font-medium text-foreground border border-[#2A2A2A] hover:border-[#FFD700]/50 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#0A0A0A]"
                onClick={handleWhatsComing}
              >
                See What's Coming
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.18, 
              ease: [0.33, 0.65, 0, 1],
              delay: 1.2 
            }}
            className="pt-4 sm:pt-6 md:pt-8"
          >
            <p className="font-mono text-xs sm:text-sm text-muted/80">
              🔒 Platform Locked · Launching July 31st, 2025
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* What's Coming Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative bg-[#111111] border border-[#FFD700]/30 rounded-lg p-6 sm:p-8 max-w-lg w-full shadow-xl max-h-[90vh] overflow-y-auto">
                {/* Gold accent line */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#FFD700] rounded-t-lg" />
                
                {/* Close button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-muted hover:text-[#FFD700] transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-[#111111] rounded-sm"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Content */}
                <div className="pr-8">
                  <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                    HIVE is Currently Locked
                  </h2>
                  <p className="text-muted font-sans leading-relaxed mb-6 text-sm">
                    We're putting the finishing touches on your future campus experience. Here's what Jacob is building for you:
                  </p>
                  
                  {/* Jacob's Todo List */}
                  <div className="space-y-4 mb-6">
                    {[
                      { text: "🎨 Profile creation flow", category: "Foundation" },
                      { text: "🏠 Campus spaces discovery", category: "Community" },
                      { text: "📊 Personal dashboard", category: "Experience" },
                      { text: "⚡ Daily rituals system", category: "Habits" }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1,
                          ease: [0.33, 0.65, 0, 1]
                        }}
                        className="flex items-start space-x-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: checkedItems.has(index) ? 1 : 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.6 + 1.0,
                            ease: [0.33, 0.65, 0, 1]
                          }}
                          className="mt-0.5"
                        >
                          <div className="w-4 h-4 bg-[#FFD700] rounded-sm flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#0A0A0A]" />
                          </div>
                        </motion.div>
                        <div className="flex-1">
                          <p className={`text-sm font-sans transition-colors duration-300 ${
                            checkedItems.has(index) ? 'text-foreground line-through' : 'text-muted'
                          }`}>
                            {item.text}
                          </p>
                          <p className="text-xs text-muted/60 font-mono">
                            {item.category}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Launch Info */}
                  <div className="bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg p-4 mb-4">
                    <p className="text-[#FFD700] font-sans text-sm font-medium mb-1">
                      🔒 Platform Locked Until July 31st, 2025
                    </p>
                    <p className="text-muted font-sans text-xs">
                      No access available until launch. The platform will open all at once for the best campus experience.
                    </p>
                  </div>
                  
                  {/* CTA Button */}
                  <Button
                    size="lg"
                    className="w-full bg-transparent hover:bg-transparent text-muted/50 border border-[#2A2A2A]/50 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] cursor-not-allowed"
                    disabled
                  >
                    Launching Soon
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  return <HomePageContent />;
}