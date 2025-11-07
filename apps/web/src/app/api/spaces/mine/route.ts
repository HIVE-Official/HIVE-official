import { withAuthAndErrors, type AuthenticatedRequest, getUserId } from '@/lib/middleware';
import { dbAdmin } from '@/lib/firebase-admin';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

// GET /api/spaces/mine?roles=builder,admin
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, _context, respond) => {
  const userId = getUserId(request);
  const { searchParams } = new URL(request.url);
  const rolesParam = searchParams.get('roles');
  const roles = (rolesParam ? rolesParam.split(',') : ['builder', 'admin']).map(r => r.trim());

  // Query membership records for this user at current campus
  const membershipSnapshot = await dbAdmin
    .collection('spaceMembers')
    .where('userId', '==', userId)
    .where('campusId', '==', CURRENT_CAMPUS_ID)
    .get();

  const allowed = membershipSnapshot.docs
    .map(d => ({ id: d.id, ...(d.data() as any) }))
    .filter(m => roles.includes((m.role || '').toLowerCase()));

  // Fetch spaces for allowed memberships
  const spaces: Array<{ id: string; name: string; role: string }> = [];
  for (const m of allowed) {
    const spaceId = (m as any).spaceId;
    if (!spaceId) continue;
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
    if (!spaceDoc.exists) continue;
    const spaceData = spaceDoc.data() as any;
    if (spaceData?.campusId && spaceData.campusId !== CURRENT_CAMPUS_ID) continue;
    spaces.push({ id: spaceDoc.id, name: spaceData?.name || 'Space', role: (m as any).role || 'member' });
  }

  return respond.success({ spaces, count: spaces.length });
});

