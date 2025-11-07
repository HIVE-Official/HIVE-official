import { withErrors } from "@/lib/middleware";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";

// GET /api/profile/[userId] - public profile
export const GET = withErrors(async (_request, { params }, respond) => {
  const userId = (params?.userId || '').toString();
  if (!userId) {
    return respond.error('Missing userId', 'INVALID_INPUT', { status: 400 });
  }

  try {
    const userRef = dbAdmin.collection('users').doc(userId);
    const snap = await userRef.get();
    if (!snap.exists) {
      return respond.error('Profile not found', 'RESOURCE_NOT_FOUND', { status: 404 });
    }

    const data = snap.data() || {};
    const privacy = data.profileVisibility || data.privacySettings || {};
    const isPublic = (privacy.showToPublic === true) || (privacy.isPublic === true);

    const publicData = {
      id: userId,
      handle: data.handle || null,
      fullName: data.fullName || null,
      avatarUrl: data.avatarUrl || data.profileImageUrl || null,
      bio: isPublic ? data.bio || '' : '',
      major: isPublic ? data.major || '' : '',
      graduationYear: isPublic ? data.graduationYear || null : null,
      interests: isPublic ? (data.interests || []) : [],
      campusId: data.campusId || CURRENT_CAMPUS_ID,
    };

    return respond.success({ profile: publicData });
  } catch (error) {
    logger.error('Failed to fetch public profile', error instanceof Error ? error : new Error(String(error)));
    return respond.error('Failed to fetch profile', 'INTERNAL_ERROR', { status: 500 });
  }
});
