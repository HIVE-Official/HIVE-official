/**
 * HIVE Entry Page
 * Using inline styles to ensure consistent rendering
 */

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EntryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      style={{ 
        minHeight: '100vh',
        backgroundColor: '#0A0A0A',
        color: 'white',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
      }}
    >
      {/* Main Container */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '0 16px',
          position: 'relative'
        }}
      >
        
        {/* Logo Section - Inline SVG */}
        <div 
          style={{
            marginBottom: '32px',
            transition: 'transform 0.5s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <div style={{ width: '96px', height: '96px', position: 'relative' }}>
            <svg 
              viewBox="0 0 1500 1500" 
              style={{ width: '100%', height: '100%' }}
              fill="white"
            >
              <path d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"/>
            </svg>
          </div>
        </div>

        {/* Brand Title */}
        <h1 
          style={{ 
            fontSize: '60px',
            fontWeight: '900',
            letterSpacing: '-2px',
            marginBottom: '16px',
            opacity: mounted ? 1 : 0.8,
            transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out'
          }}
        >
          HIVE
        </h1>

        {/* Tagline */}
        <p 
          style={{ 
            fontSize: '20px',
            opacity: mounted ? 0.6 : 0.4,
            marginBottom: '48px',
            transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.1s'
          }}
        >
          Your Campus, Connected
        </p>

        {/* CTA Buttons */}
        <div 
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            width: '100%',
            maxWidth: '400px',
            opacity: mounted ? 1 : 0.8,
            transform: mounted ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.6s ease-out 0.2s'
          }}
        >
          {/* Primary Button */}
          <Link href="/schools" style={{ flex: 1, textDecoration: 'none' }}>
            <button 
              style={{ 
                width: '100%',
                padding: '16px 32px',
                backgroundColor: '#FFD700',
                color: '#0A0A0A',
                fontSize: '18px',
                fontWeight: '700',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255, 215, 0, 0.3)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F5C500';
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFD700';
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 215, 0, 0.3)';
              }}
              aria-label="Get started with HIVE"
            >
              Get Started
            </button>
          </Link>

          {/* Secondary Button */}
          <Link href="/auth/login" style={{ flex: 1, textDecoration: 'none' }}>
            <button 
              style={{ 
                width: '100%',
                padding: '16px 32px',
                backgroundColor: 'transparent',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                borderRadius: '12px',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = '#FFD700';
                e.currentTarget.style.color = '#FFD700';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.color = 'white';
              }}
              aria-label="Sign in to your account"
            >
              Sign In
            </button>
          </Link>
        </div>

        {/* University Badge */}
        <div 
          style={{ 
            marginTop: '64px',
            textAlign: 'center',
            opacity: mounted ? 0.6 : 0.4,
            transition: 'all 0.6s ease-out 0.3s'
          }}
        >
          <p style={{ fontSize: '14px', opacity: 0.6, marginBottom: '8px' }}>
            Built for students at
          </p>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#FFD700' }}>
            University at Buffalo
          </p>
        </div>

        {/* Background Effects */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            overflow: 'hidden',
            pointerEvents: 'none'
          }}
        >
          {/* Gradient Orb */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '1000px',
              height: '1000px',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.03) 0%, transparent 70%)',
              borderRadius: '50%'
            }}
          />
          
          {/* Animated Particles */}
          {mounted && (
            <>
              <div 
                style={{
                  position: 'absolute',
                  top: '80px',
                  left: '10%',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#FFD700',
                  borderRadius: '50%',
                  opacity: 0.2,
                  animation: 'pulse 3s ease-in-out infinite'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '120px',
                  right: '15%',
                  width: '16px',
                  height: '16px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  opacity: 0.1,
                  animation: 'pulse 3s ease-in-out infinite 1s'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  top: '33%',
                  right: '20%',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#FFD700',
                  borderRadius: '50%',
                  opacity: 0.15,
                  animation: 'pulse 3s ease-in-out infinite 2s'
                }}
              />
            </>
          )}
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.3;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}