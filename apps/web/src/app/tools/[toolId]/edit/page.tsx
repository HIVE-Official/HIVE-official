"use client";

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ToolEditPage } from '../../../../../../../packages/ui/src/pages/hivelab/ToolEditPage';
import type { ToolComposition } from '@/lib/element-system';
import { apiClient } from '@/lib/api-client';
import { useAuth } from '@hive/auth-logic';
import { useFeatureFlags } from '@hive/hooks';
import { ToolNavigation } from '@/lib/tool-navigation';

// Starter composition (replace with fetch for existing tools)
const STARTER_COMPOSITION: ToolComposition = {
  id: 'new-tool',
  name: 'Untitled Tool',
  description: '',
  elements: [],
  connections: [],
  layout: 'grid',
};

export default function ToolEditRoutePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const flags = useFeatureFlags();

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tool-editor', toolId: params.toolId });
  }, [flags, params.toolId]);

  const initialComposition = useMemo(() => STARTER_COMPOSITION, []);

  const handleSave = async (composition: ToolComposition) => {
    flags.trackEvent('tools', 'interact', { action: 'save_tool', toolId: params.toolId });
    try {
      const res = await apiClient.put('/api/tools', {
        toolId: params.toolId,
        type: 'visual',
        status: 'draft',
        elements: composition.elements,
        config: { composition },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || `Failed to save tool (${res.status})`);
      }
    } catch (e) {
      // Swallow error for now; in-app toasts handled elsewhere
    }
  };

  const handlePreview = (composition: ToolComposition) => {
    flags.trackEvent('tools', 'interact', { action: 'preview_tool', toolId: params.toolId });
    router.push(`/tools/${composition.id}/preview`);
  };

  const handleCancel = () => {
    ToolNavigation.goBack('marketplace');
  };

  if (!user) return null;

  return (
    <ToolEditPage
      userId={user.uid}
      initialComposition={initialComposition}
      onSave={handleSave}
      onPreview={handlePreview}
      onCancel={handleCancel}
    />
  );
}
