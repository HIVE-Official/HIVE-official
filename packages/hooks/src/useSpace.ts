import { useQuery } from '@tanstack/react-query';
import { getSpaceById } from '@hive/api-client';
import type { Space } from '@hive/core';

export function useSpace(spaceId?: string) {
  return useQuery<Space>({
    queryKey: ['space', spaceId],
    queryFn: () => getSpaceById(spaceId!),
    enabled: !!spaceId,
  });
} 