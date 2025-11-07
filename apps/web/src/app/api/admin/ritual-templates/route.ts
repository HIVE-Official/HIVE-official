import { NextResponse } from 'next/server';
import { withAdminCampusIsolation } from '@/lib/middleware';
import { getRitualTemplate } from '@/lib/ritual-templates';
import * as templates from '@/lib/ritual-templates';

export const dynamic = 'force-dynamic';

// GET /api/admin/ritual-templates
// Returns all available ritual templates (names + meta) for admin composer
export const GET = withAdminCampusIsolation(async () => {
  // Collect exported template keys except helper functions
  const all = Object.keys(templates)
    .filter((k) => k.endsWith('Ritual') || k.endsWith('Template'))
    .map((key) => ({ key }));

  return NextResponse.json({ templates: all });
});

