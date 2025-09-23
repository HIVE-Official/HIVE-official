'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { UnifiedSpaceInterface } from '@/components/spaces/unified-space-interface';
import type { Space, User } from '@hive/core';
import { api } from '@/lib/api-client';

// Simplified interface - UnifiedSpaceInterface handles all the complexity

export default function SpacePage() {
  const params = useParams();
  const spaceId = params.spaceId as string;

  return <UnifiedSpaceInterface spaceId={spaceId} />;
}