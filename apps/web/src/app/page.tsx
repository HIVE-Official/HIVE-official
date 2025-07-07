"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { HiveLogo, Button, Countdown, MotionDiv } from '@hive/ui';
import { ArrowRight, X, Check, Lock } from 'lucide-react';
import { ROUTES } from '@/lib/routes';

function HomePageContent() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleWhatsComing = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
        <MotionDiv
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
            <MotionDiv
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
            </MotionDiv>
            
            <MotionDiv
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
            </MotionDiv>
          </div>

          {/* Countdown */}
          <MotionDiv
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
          </MotionDiv>

          {/* Buttons */}
          <MotionDiv
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.18, 
              ease: [0.33, 0.65, 0, 1],
              delay: 1.4 
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <MotionDiv
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
                className="group h-12 sm:h-14 bg-transparent cursor-not-allowed px-6 sm:px-8 text-base sm:text-lg font-medium text-muted border border-[#2A2A2A]/50 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
                disabled
              >
                <Lock className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Locked
              </Button>
            </MotionDiv>
            
            <MotionDiv
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
            </MotionDiv>
          </MotionDiv>

          {/* Social Proof */}
          <MotionDiv
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
              🛠️ Campus Tools · Launching July 31st, 2025
            </p>
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* What's Coming Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: [0.33, 0.65, 0, 1] }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={closeModal}
            />
            
            {/* Modal */}
            <MotionDiv
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
                    Campus utility tools launching July 31st. Early access starts throughout July.
                  </p>
                  
                  {/* Core Features List */}
                  <div className="space-y-4 mb-6">
                    {[
                      { text: "Profile", icon: "👤", description: "Your campus command center" },
                      { text: "Spaces", icon: "🏛️", description: "Pre-mapped campus containers" },
                      { text: "Tools", icon: "🛠️", description: "Build campus utilities" },
                      { text: "Rituals", icon: "⚡", description: "Campus-wide moments" }
                    ].map((item, index) => (
                      <MotionDiv
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.1,
                          ease: [0.33, 0.65, 0, 1]
                        }}
                        className="flex items-center space-x-3 p-3 rounded-lg bg-surface/30 border border-[#2A2A2A]/50"
                      >
                        <div className="w-8 h-8 bg-[#2A2A2A] rounded-lg flex items-center justify-center">
                          <span className="text-lg">{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground font-sans">
                            {item.text}
                          </p>
                          <p className="text-xs text-muted">
                            {item.description}
                          </p>
                        </div>
                        <Lock className="w-4 h-4 text-muted" />
                      </MotionDiv>
                    ))}
                  </div>
                  
                  {/* Launch Info */}
                  <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg p-4 mb-4">
                    <p className="text-foreground font-sans text-sm font-medium mb-1">
                      🛠️ Campus Tools Launch July 31st
                    </p>
                    <p className="text-muted font-sans text-xs">
                      Early access begins throughout July. Build the tools your campus actually needs.
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
            </MotionDiv>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  return <HomePageContent />;
}