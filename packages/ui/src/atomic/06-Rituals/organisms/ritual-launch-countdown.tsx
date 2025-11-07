'use client';

import * as React from 'react';
import { Card } from '../atoms/card';

export interface RitualLaunchCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  targetTime: string | Date;
}

export const RitualLaunchCountdown: React.FC<RitualLaunchCountdownProps> = ({
  title = 'Launch Countdown',
  targetTime,
  ...props
}) => {
  const [label, setLabel] = React.useState('');
  React.useEffect(() => {
    const target = new Date(targetTime).getTime();
    const tick = () => {
      const now = Date.now();
      const ms = Math.max(0, target - now);
      const m = Math.round(ms / 60000);
      const h = Math.floor(m / 60);
      const mm = m % 60;
      setLabel(h > 0 ? `${h}h ${mm}m` : `${mm}m`);
    };
    const id = setInterval(tick, 30_000);
    tick();
    return () => clearInterval(id);
  }, [targetTime]);

  return (
    <Card className="border-white/10 bg-white/5 p-5" {...props}>
      <div className="text-xs uppercase tracking-widest text-white/50">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-white">{label}</div>
    </Card>
  );
};

