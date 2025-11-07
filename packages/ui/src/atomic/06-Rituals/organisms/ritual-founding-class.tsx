'use client';

import * as React from 'react';
import { Card } from '../atoms/card';

export interface FoundingMember {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface RitualFoundingClassProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  members: FoundingMember[];
}

export const RitualFoundingClass: React.FC<RitualFoundingClassProps> = ({
  title = 'Founding Class',
  members,
  ...props
}) => {
  return (
    <Card className="border-white/10 bg-white/5 p-5" {...props}>
      <h3 className="mb-3 text-lg font-semibold text-white">{title}</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {members.map((m) => (
          <div key={m.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="h-8 w-8 shrink-0 rounded-full bg-white/10" aria-hidden />
            <div className="truncate text-sm text-white/80">{m.name}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

