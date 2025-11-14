'use client';

// Force dynamic rendering to avoid SSG issues
export const dynamic = 'force-dynamic';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@hive/auth-logic';
import { Skeleton } from '@hive/ui';
import type { ToolComposition } from '@hive/ui';
import { apiClient } from '@/lib/api-client';
import { DeployModalProvider } from './DeployModalProvider';
import { logger } from '@/lib/logger';

export default function HiveLabPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [saving, setSaving] = useState(false);
  const [isMobileBlocked, setIsMobileBlocked] = useState(false);

  // Get initial mode from URL query param (e.g., /hivelab?mode=visual)
  const initialMode = useMemo(() => {
    const mode = searchParams.get('mode');
    if (mode && ['overview', 'visual', 'template', 'wizard', 'marketplace', 'analytics', 'code'].includes(mode)) {
      return mode as HiveLabView;
    }
    return 'overview';
  }, [searchParams]);

  // Guard: Visual builder is desktop-first. If small viewport, fallback to overview and notify.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isSmall = window.matchMedia('(max-width: 768px)').matches;
    if (isSmall && initialMode === 'visual') {
      setIsMobileBlocked(true);
      // Fire toast event if ToastProvider is mounted
      window.dispatchEvent(
        new CustomEvent('hive:toast', {
          detail: {
            title: 'Open on desktop for best experience',
            description: 'HiveLab visual builder is optimized for larger screens. Showing overview instead.',
            type: 'info',
            duration: 4500,
          },
        })
      );
    } else {
      setIsMobileBlocked(false);
    }
  }, [initialMode]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      logger.warn('HiveLab: User not authenticated, redirecting to login');
      router.push('/auth/login?redirect=/hivelab');
    }
  }, [user, authLoading, router]);

  // Handle tool save with real Firebase integration
  const handleToolSave = useCallback(async (composition: ToolComposition) => {
    if (!user) {
      logger.error('HiveLab: Cannot save tool - user not authenticated');
      alert('Please sign in to save tools');
      return;
    }

    setSaving(true);
    try {
      logger.info('HiveLab: Saving tool', { toolName: composition.name, userId: user.uid });

      // Map composition to API payload (EnhancedCreateToolSchema)
      const payload = {
        name: composition.name,
        description: composition.description || '',
        type: 'visual' as const,
        status: 'draft' as const,
        // Persist placed elements directly
        elements: composition.elements || [],
        // Store full composition under config for future restores
        config: { composition },
        // Future: spaceId when deploying directly to a space
        // campus is derived server-side from session
      };

      const response = await apiClient.post('/api/tools', payload);

      if (response.ok) {
        const data = await response.json();
        logger.info('HiveLab: Tool saved successfully', { toolId: data?.tool?.id || data.id });
        // Toast success (ToastProvider bridge)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('hive:toast', {
              detail: {
                title: 'Tool saved',
                description: `"${composition.name}" saved to your tools`,
                type: 'success',
                duration: 3500,
              },
            })
          );
        }

        // Optionally redirect to tool detail page
        // router.push(`/tools/${data.id}`);
      } else {
        throw new Error('Failed to save tool');
      }
    } catch (error) {
      logger.error('HiveLab: Failed to save tool', { error });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('hive:toast', {
            detail: {
              title: 'Save failed',
              description: 'Something went wrong. Please try again.',
              type: 'error',
              duration: 4500,
            },
          })
        );
      }
    } finally {
      setSaving(false);
    }
  }, [user, router]);

  // Handle tool preview with analytics tracking
  const handleToolPreview = useCallback((composition: ToolComposition) => {
    logger.info('HiveLab: Tool preview', {
      toolName: composition.name,
      elementCount: composition.elements?.length || 0,
      userId: user?.uid,
    });

    // TODO: Track preview event in analytics
    // trackEvent('hivelab_tool_preview', { toolName: composition.name });
  }, [user]);

  // Handle mode change with URL updates
  const handleModeChange = useCallback((mode: HiveLabView) => {
    logger.info('HiveLab: Mode changed', { mode, userId: user?.uid });

    // Update URL query param without full page reload
    const params = new URLSearchParams(searchParams.toString());
    if (mode === 'overview') {
      params.delete('mode');
    } else {
      params.set('mode', mode);
    }
    const newUrl = params.toString() ? `/hivelab?${params.toString()}` : '/hivelab';
    router.replace(newUrl, { scroll: false });

    // TODO: Track mode change in analytics
    // trackEvent('hivelab_mode_change', { mode });
  }, [router, searchParams, user]);

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-hive-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-96 w-full max-w-4xl mx-auto" />
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect in useEffect)
  if (!user) {
    return null;
  }

  const currentToolId = searchParams.get('toolId') || undefined;

  return (
    <DeployModalProvider toolId={currentToolId}>
      <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)] flex items-center justify-center px-4">
        <div className="max-w-xl space-y-6 text-center">
          <h1 className="text-3xl font-semibold">HiveLab is coming online</h1>
          <p className="text-sm text-[var(--hive-text-secondary)]">
            The visual tool composer is being wired to the new campus tools APIs. You can still
            access tools you&apos;ve already installed from the Tools tab.
          </p>
        </div>
      </div>
    </DeployModalProvider>
  );
}
