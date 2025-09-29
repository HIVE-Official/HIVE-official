'use client';

import React from 'react';

/**
 * Tech-Sleek Component Showcase
 * Demonstrates the Gold + Black + White branding system
 */

export const TechSleekButton: React.FC<{
  variant?: 'gold' | 'ghost' | 'black';
  children: React.ReactNode;
  onClick?: () => void;
}> = ({ variant = 'gold', children, onClick }) => {
  const variants = {
    gold: 'bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)] text-black border border-[var(--hive-brand-secondary)] shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:-translate-y-0.5',
    ghost: 'bg-transparent text-white border border-white/20 hover:border-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]',
    black: 'bg-black text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 hover:border-[var(--hive-brand-secondary)]/60'
  };

  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 rounded-lg font-semibold
        transition-all duration-200 ease-out
        ${variants[variant]}
      `}
    >
      {children}
    </button>
  );
};

export const TechSleekCard: React.FC<{
  title: string;
  description: string;
  metric?: string;
  active?: boolean;
}> = ({ title, description, metric, active }) => {
  return (
    <div
      className={`
        bg-black p-6 rounded-xl
        border transition-all duration-300
        ${active
          ? 'border-[var(--hive-brand-secondary)]/40 shadow-2xl shadow-yellow-500/10'
          : 'border-white/5 hover:border-white/10'
        }
        hover:transform hover:-translate-y-1
        group
      `}
    >
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-white/60 text-sm mb-4">{description}</p>
      {metric && (
        <div className={`text-2xl font-bold ${active ? 'text-[var(--hive-brand-secondary)]' : 'text-white'}`}>
          {metric}
        </div>
      )}
      {active && (
        <div className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)] to-transparent opacity-50" />
      )}
    </div>
  );
};

export const TechSleekInput: React.FC<{
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ placeholder, value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full px-4 py-3 rounded-lg
          bg-white/5 border border-white/10
          text-white placeholder-white/30
          focus:outline-none focus:border-[var(--hive-brand-secondary)]/50
          focus:shadow-[0_0_20px_color-mix(in srgb, var(--hive-brand-secondary) 10%, transparent)]
          transition-all duration-200
        "
      />
      <div className="absolute inset-0 rounded-lg pointer-events-none">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)]/0 to-transparent group-focus-within:via-[var(--hive-brand-secondary)]/10 transition-all duration-500" />
      </div>
    </div>
  );
};

export const TechSleekBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'gold' | 'white' | 'black';
}> = ({ children, variant = 'gold' }) => {
  const variants = {
    gold: 'bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)] text-black',
    white: 'bg-white text-black',
    black: 'bg-black text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30'
  };

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
        ${variants[variant]}
        shadow-lg
      `}
    >
      {children}
    </span>
  );
};

export const TechSleekToggle: React.FC<{
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}> = ({ checked = false, onChange, label }) => {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div
          className={`
            w-12 h-6 rounded-full transition-all duration-300
            ${checked ? 'bg-[var(--hive-brand-secondary)]' : 'bg-white/20'}
          `}
        >
          <div
            className={`
              absolute top-0.5 left-0.5 w-5 h-5 rounded-full
              transition-all duration-300
              ${checked
                ? 'translate-x-6 bg-black'
                : 'translate-x-0 bg-white'
              }
              shadow-lg
            `}
          />
        </div>
      </div>
      {label && <span className="text-white/80 text-sm">{label}</span>}
    </label>
  );
};

export const TechSleekProgress: React.FC<{
  value: number;
  max?: number;
}> = ({ value, max = 100 }) => {
  const percentage = (value / max) * 100;

  return (
    <div className="relative">
      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary-hover)] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        >
          <div className="h-full bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
        </div>
      </div>
      {/* Glow effect */}
      <div
        className="absolute top-0 h-1 bg-[var(--hive-brand-secondary)] blur-md opacity-50 transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export const TechSleekDivider: React.FC<{
  variant?: 'solid' | 'gradient' | 'glow';
}> = ({ variant = 'gradient' }) => {
  const variants = {
    solid: 'h-px bg-white/10',
    gradient: 'h-px bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)]/30 to-transparent',
    glow: 'relative h-px bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)] to-transparent'
  };

  if (variant === 'glow') {
    return (
      <div className="relative">
        <div className={variants[variant]} />
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-[var(--hive-brand-secondary)] to-transparent blur-md" />
      </div>
    );
  }

  return <div className={variants[variant]} />;
};

export const TechSleekLogo: React.FC<{
  size?: 'sm' | 'md' | 'lg';
}> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  return (
    <div className={`${sizes[size]} font-black tracking-tight`}>
      <span className="text-[var(--hive-brand-secondary)] relative">
        HIVE
        <span className="absolute inset-0 blur-xl text-[var(--hive-brand-secondary)]/30 animate-pulse">
          HIVE
        </span>
      </span>
    </div>
  );
};

// Showcase component demonstrating all elements
export const TechSleekShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <TechSleekLogo size="lg" />
          <p className="text-white/60 mt-4">Tech-Sleek Design System</p>
          <TechSleekDivider variant="glow" />
        </div>

        {/* Buttons */}
        <section>
          <h2 className="text-white text-2xl font-bold mb-4">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <TechSleekButton variant="gold">Join Space</TechSleekButton>
            <TechSleekButton variant="ghost">Learn More</TechSleekButton>
            <TechSleekButton variant="black">Settings</TechSleekButton>
          </div>
        </section>

        <TechSleekDivider />

        {/* Cards */}
        <section>
          <h2 className="text-white text-2xl font-bold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TechSleekCard
              title="Active Spaces"
              description="Communities you're engaged with"
              metric="24"
              active
            />
            <TechSleekCard
              title="Tools Created"
              description="Your contributions to HIVE"
              metric="7"
            />
            <TechSleekCard
              title="Connections"
              description="Your campus network"
              metric="142"
            />
          </div>
        </section>

        <TechSleekDivider />

        {/* Form Elements */}
        <section>
          <h2 className="text-white text-2xl font-bold mb-4">Form Elements</h2>
          <div className="space-y-4 max-w-md">
            <TechSleekInput placeholder="Search for spaces..." />
            <div className="flex items-center justify-between">
              <TechSleekToggle label="Enable notifications" />
              <TechSleekBadge>PRO</TechSleekBadge>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/60">Profile Completion</span>
                <span className="text-[var(--hive-brand-secondary)]">85%</span>
              </div>
              <TechSleekProgress value={85} />
            </div>
          </div>
        </section>

        <TechSleekDivider variant="gradient" />

        {/* Typography */}
        <section>
          <h2 className="text-white text-2xl font-bold mb-4">Typography</h2>
          <div className="space-y-2">
            <h1 className="text-white text-5xl font-bold">Display Heading</h1>
            <h2 className="text-[var(--hive-brand-secondary)] text-3xl font-semibold">Gold Accent Header</h2>
            <p className="text-white/87 text-lg">Primary body text for main content</p>
            <p className="text-white/60 text-base">Secondary text for descriptions</p>
            <p className="text-white/40 text-sm">Muted text for captions and hints</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TechSleekShowcase;