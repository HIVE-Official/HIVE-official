"use client";

import { useCallback, useEffect, useState } from 'react';
import { secureApiFetch } from '@/lib/secure-auth-utils';

export interface Space {
  id: string;
  name: string;
  description?: string;
  memberCount?: number;
}

export function useSpace(spaceId?: string) {
  const [space, setSpace] = useState<Space | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!spaceId) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await secureApiFetch(`/api/spaces/${spaceId}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      setSpace({ id: data.id || spaceId, name: data.name, description: data.description, memberCount: data.memberCount });
      const role = data.membership?.role || data.membershipRole;
      const status = data.membership?.status || data.membershipStatus;
      setIsMember(Boolean(data.isMember || data.membership?.isActive || ['active', 'joined'].includes((status || '').toLowerCase())));
      setIsLeader(Boolean(['owner', 'leader', 'admin'].includes((role || '').toLowerCase()) || data.membership?.isLeader));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load space');
    } finally {
      setIsLoading(false);
    }
  }, [spaceId]);

  const joinSpace = useCallback(async () => {
    if (!spaceId) return false;
    const res = await secureApiFetch('/api/spaces/join', { method: 'POST', body: JSON.stringify({ spaceId }) });
    if (res.ok) await load();
    return res.ok;
  }, [spaceId, load]);

  const leaveSpace = useCallback(async () => {
    if (!spaceId) return false;
    const res = await secureApiFetch('/api/spaces/leave', { method: 'POST', body: JSON.stringify({ spaceId }) });
    if (res.ok) await load();
    return res.ok;
  }, [spaceId, load]);

  useEffect(() => { void load(); }, [load]);

  return { space, isMember, isLeader, joinSpace, leaveSpace, isLoading, error };
}

