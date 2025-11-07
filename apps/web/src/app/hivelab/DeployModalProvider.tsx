"use client";

import * as React from 'react';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@hive/auth-logic';
import { useRouter } from 'next/navigation';
import { ToolDeployModal } from '../../../../packages/ui/src/components/hivelab/ToolDeployModal';

type Target = { id: string; name: string; type: 'profile' | 'space'; description?: string };

export function DeployModalProvider({ toolId, children }: { toolId?: string; children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [targets, setTargets] = React.useState<Target[]>([]);
  const [toolName, setToolName] = React.useState<string>('');

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiClient.get('/api/spaces/mine?roles=builder,admin');
        const base: Target[] = user?.uid ? [{ id: user.uid, name: 'My Profile', type: 'profile', description: 'Deploy to your personal profile' }] : [];
        if (res.ok) {
          const data = await res.json();
          const spaces: Target[] = (data.spaces || []).map((s: any) => ({ id: s.id, name: s.name, type: 'space', description: `Deploy to ${s.name}` }));
          if (!cancelled) setTargets([...base, ...spaces]);
        } else {
          if (!cancelled) setTargets(base);
        }
      } catch {
        setTargets(user?.uid ? [{ id: user.uid, name: 'My Profile', type: 'profile' }] : []);
      }
    })();
    return () => { cancelled = true; };
  }, [user?.uid]);

  React.useEffect(() => {
    if (!toolId) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await apiClient.get(`/api/tools/${toolId}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setToolName(data?.name || 'Tool');
        }
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [toolId]);

  const handleDeploy = async (config: any) => {
    if (!toolId) {
      setOpen(false);
      router.push('/tools');
      return;
    }
    const res = await apiClient.post('/api/tools/deploy', {
      toolId,
      deployTo: config.targetType,
      targetId: config.targetId,
      surface: config.surface,
      permissions: config.permissions,
      settings: config.settings,
    });
    if (res.ok) {
      setOpen(false);
      router.push(`/tools/${toolId}/analytics`);
    }
  };

  return (
    <div className="relative">
      {children}
      {/* Floating launch button when a toolId is present; otherwise route to /tools */}
      <button
        type="button"
        onClick={() => (toolId ? setOpen(true) : router.push('/tools'))}
        className="fixed bottom-6 right-6 z-50 rounded-full px-5 py-3 bg-[var(--hive-brand-primary)] text-hive-brand-on-gold shadow-lg hover:bg-hive-brand-hover"
        aria-label="Launch on campus"
      >
        Launch on campus
      </button>

      <ToolDeployModal
        open={open}
        onOpenChange={setOpen}
        toolName={toolName || 'Tool'}
        availableTargets={targets}
        onDeploy={handleDeploy}
      />
    </div>
  );
}
