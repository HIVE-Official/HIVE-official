"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-07-31T08:00:00');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());
    return () => clearInterval(timer);
  }, []);

  const handleEnterPlatform = () => {
    router.push('/auth');
  };

  const handleWhatsComing = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Minimal Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.03),transparent_70%)]" />
      </div>

      {/* Page Layout */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full space-y-20">
          {/* HIVE Branding */}
          <div className="flex items-center justify-center gap-6">
            <div className="w-10 h-10 relative">
              <Image
                src="/assets/whitelogo.svg"
                alt="HIVE Logo"
                width={40}
                height={40}
                className="w-full h-full"
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-sans font-bold text-foreground tracking-tight">HIVE</h1>
          </div>

          {/* Coming Soon */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground">
              Coming Soon
            </h2>
          </div>

          {/* Countdown */}
          <div className="flex justify-center gap-6">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' },
              { value: timeLeft.seconds, label: 'Seconds' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="rounded-lg p-4 w-20 h-20 flex items-center justify-center transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:scale-[1.02]"
                  style={{
                    border: '1px solid rgba(255, 215, 0, 0.15)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.15)';
                  }}
                >
                  <span className="text-2xl font-mono font-bold text-foreground">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="mt-2 text-xs font-sans font-semibold uppercase tracking-wider text-muted">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleEnterPlatform}
              className="px-12 py-5 font-sans font-bold rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background text-foreground text-lg"
              style={{
                border: '1px solid rgba(255, 215, 0, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.15)';
              }}
            >
              Enter HIVE
            </button>
            
            <button
              onClick={handleWhatsComing}
              className="px-12 py-5 font-sans font-bold rounded-lg transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background text-foreground text-lg"
              style={{
                border: '1px solid rgba(255, 215, 0, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.15)';
              }}
            >
              See What's Coming
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div 
            className="bg-surface-02 rounded-xl p-8 max-w-lg w-full relative transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] shadow-2xl border border-muted/20"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9)',
            }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-muted hover:text-foreground text-2xl transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] focus:outline-none"
            >
              ×
            </button>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 relative">
                <Image
                  src="/assets/whitelogo.svg"
                  alt="HIVE Logo"
                  width={40}
                  height={40}
                  className="w-full h-full"
                />
              </div>
              <h2 className="text-2xl font-sans font-bold text-foreground">HIVE Platform</h2>
            </div>
            
            <p className="text-muted mb-6 leading-relaxed font-sans">
              The programmable campus layer where students find their people, make decisions together, and build tools that spread.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl">👤</span>
                <span className="text-foreground font-sans">Profile - Your campus identity</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🏛️</span>
                <span className="text-foreground font-sans">Spaces - Where communities live</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🛠️</span>
                <span className="text-foreground font-sans">Tools - Build utilities that solve problems</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">⚡</span>
                <span className="text-foreground font-sans">Rituals - Campus-wide moments</span>
              </div>
            </div>
            
            <button
              onClick={closeModal}
              className="w-full px-6 py-3 font-sans font-bold rounded-xl transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] hover:scale-[1.02] focus:outline-none text-foreground"
              style={{
                border: '1px solid rgba(255, 215, 0, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.15)';
              }}
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}