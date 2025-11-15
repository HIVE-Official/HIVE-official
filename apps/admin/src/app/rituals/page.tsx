'use client';

/**
 * Rituals Management Dashboard
 *
 * Admin view for managing all rituals across phases.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Badge, useToast } from '@hive/ui';
import { Plus, Play, Pause, StopCircle, Eye, Edit2, Trash2 } from 'lucide-react';
import type { RitualUnion } from '@hive/core';

export default function RitualsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [rituals, setRituals] = useState<RitualUnion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhase, setSelectedPhase] = useState<string>('all');

  useEffect(() => {
    fetchRituals();
  }, [selectedPhase]);

  const fetchRituals = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (selectedPhase !== 'all') {
        params.append('phase', selectedPhase);
      }
      const res = await fetch(`/api/admin/rituals?${params}`);
      if (!res.ok) throw new Error('Failed to fetch rituals');
      const { data } = await res.json();
      setRituals(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        message: 'Failed to load rituals',
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhaseChange = async (ritualId: string, newPhase: string) => {
    try {
      const res = await fetch(`/api/admin/rituals/${ritualId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phase: newPhase }),
      });
      if (!res.ok) throw new Error('Failed to update ritual');
      toast({
        title: 'Success',
        message: `Ritual phase updated to ${newPhase}`,
        type: 'success',
      });
      fetchRituals();
    } catch (error) {
      toast({
        title: 'Error',
        message: 'Failed to update ritual phase',
        type: 'error',
      });
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'draft':
        return 'secondary';
      case 'announced':
        return 'outline';
      case 'active':
        return 'default';
      case 'cooldown':
        return 'outline';
      case 'ended':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'active':
        return '🔥';
      case 'announced':
        return '⏰';
      case 'ended':
        return '✅';
      default:
        return '📝';
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Rituals</h1>
            <p className="mt-2 text-white/60">Manage campus-wide events and campaigns</p>
          </div>
          <Button onClick={() => router.push('/rituals/create')}>
            <Plus className="mr-2 h-4 w-4" />
            Create Ritual
          </Button>
        </div>

        {/* Phase Filter */}
        <div className="mb-6 flex gap-2">
          {['all', 'draft', 'announced', 'active', 'cooldown', 'ended'].map((phase) => (
            <Button
              key={phase}
              variant={selectedPhase === phase ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPhase(phase)}
            >
              {phase.charAt(0).toUpperCase() + phase.slice(1)}
            </Button>
          ))}
        </div>

        {/* Rituals List */}
        {isLoading ? (
          <div className="text-center text-white/50">Loading rituals...</div>
        ) : rituals.length === 0 ? (
          <Card className="border-white/10 bg-white/5 p-12 text-center">
            <div className="mb-4 text-4xl">🎭</div>
            <h3 className="mb-2 text-lg font-semibold text-white">No Rituals Yet</h3>
            <p className="mb-4 text-sm text-white/60">
              Create your first ritual to start engaging students
            </p>
            <Button onClick={() => router.push('/rituals/create')}>
              <Plus className="mr-2 h-4 w-4" />
              Create First Ritual
            </Button>
          </Card>
        ) : (
          <div className="grid gap-4">
            {rituals.map((ritual) => (
              <Card key={ritual.id} className="border-white/10 bg-white/5 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <span className="text-2xl">{ritual.presentation?.icon || '🎯'}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{ritual.title}</h3>
                        <p className="text-sm text-white/60">{ritual.subtitle}</p>
                      </div>
                    </div>
                    <p className="mb-3 text-sm text-white/70">{ritual.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPhaseColor(ritual.phase)}>
                        {getPhaseIcon(ritual.phase)} {ritual.phase}
                      </Badge>
                      <Badge variant="outline">{ritual.archetype}</Badge>
                      {ritual.metrics?.participants !== undefined && (
                        <Badge variant="outline">
                          {ritual.metrics.participants} participants
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {ritual.phase === 'draft' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePhaseChange(ritual.id, 'announced')}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    {ritual.phase === 'active' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePhaseChange(ritual.id, 'cooldown')}
                      >
                        <Pause className="h-4 w-4" />
                      </Button>
                    )}
                    {['announced', 'active', 'cooldown'].includes(ritual.phase) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePhaseChange(ritual.id, 'ended')}
                      >
                        <StopCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => router.push(`/rituals/${ritual.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
