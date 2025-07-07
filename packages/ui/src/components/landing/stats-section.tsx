import React from 'react';

export interface Stat {
  value: string;
  label: string;
  description?: string;
}

export interface StatsSectionProps {
  stats?: Stat[];
  className?: string;
}

const defaultStats: Stat[] = [
  {
    value: "10+",
    label: "Partner Schools",
    description: "Universities and colleges across the region",
  },
  {
    value: "50+",
    label: "Student Communities",
    description: "Interest-based spaces for every passion",
  },
  {
    value: "100%",
    label: "Student Built",
    description: "Designed by students, for students",
  },
  {
    value: "24/7",
    label: "Campus Connection",
    description: "Real-time engagement around the clock",
  },
];

export const StatsSection: React.FC<StatsSectionProps> = ({
  stats = defaultStats,
  className = "",
}) => {
  return (
    <section className={`py-16 px-6 bg-surface ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black font-display text-foreground mb-4">
            Campus energy in
            <span className="text-accent"> real numbers</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Building the future of campus community, one connection at a time.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-lg bg-background border border-border hover:border-accent/30 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
            >
              <div className="mb-3">
                <span className="text-4xl font-black font-display text-accent">
                  {stat.value}
                </span>
              </div>
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                {stat.label}
              </h3>
              {stat.description && (
                <p className="text-sm text-muted">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};