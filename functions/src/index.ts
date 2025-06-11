/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";

// Initialize Firebase Admin SDK
admin.initializeApp();

// Import verification functions
import * as emailVerification from './verification/email-verification';
import * as roleClaims from './verification/role-claims';

// Import event state management functions
import * as eventStateTransitions from './events/state-transitions';

// Import new space denormalization functions
import * as spaceDenormalization from './spaces/denormalization';
import * as autoJoin from './spaces/autoJoin';
import * as claim from './spaces/claim';
import * as pagination from './spaces/pagination';
import * as membership from './spaces/membership';

// Import profile functions
import * as updateUserProfile from './profile/updateUserProfile';

// Import feed functions
import * as getFeed from './feed/getFeed';
import * as interactions from './feed/interactions';
import * as follow from './feed/follow';
import * as mute from './feed/mute';
import * as report from './feed/report';
import * as sayHello from './feed/sayHello';

// Export notification functions
export * from "./notifications";

// Re-export events sync functions
export * from "./events_sync";

// Export user engagement tracking functions
export * from "./user_engagement";

// Export recommendation engine functions
export * from "./recommendations";

// Export analytics functions
export * from "./analytics";

// Export content moderation functions
export * from "./moderation";

// Export social graph analysis functions
export * from "./social_graph";

// Export a simple health check function
export const healthCheck = functions.https.onRequest((request, response) => {
  logger.info("Health check request received");
  response.status(200).send("Firebase Functions for HIVE UI are running");
});

// Export all functions
export const verification = {
  // Email verification functions
  processEmailVerification: emailVerification.processEmailVerification,
  submitVerificationCode: emailVerification.submitVerificationCode,
  cleanupExpiredVerifications: emailVerification.cleanupExpiredVerifications,
  
  // Role claims functions
  updateUserRoleClaims: roleClaims.updateUserRoleClaims,
  processVerificationStatusChange: roleClaims.processVerificationStatusChange,
  requestVerifiedPlusClaim: roleClaims.requestVerifiedPlusClaim,
  approveVerifiedPlusClaim: roleClaims.approveVerifiedPlusClaim
};

export const events = {
  // Event state management functions
  handleEventStateTransitions: eventStateTransitions.handleEventStateTransitions
};

export const spaces = {
  // Space denormalization functions
  updateSpaceMemberCount: spaceDenormalization.updateSpaceMemberCount,
  autoJoinSpaces: autoJoin.autoJoinSpaces,
  claimSpace: claim.claimSpace,
  getSpaceContent: pagination.getSpaceContent,
  joinSpace: membership.joinSpace,
  leaveSpace: membership.leaveSpace
};

export const profile = {
    updateUserProfile: updateUserProfile.updateUserProfile
};

export const feed = {
    getFeed: getFeed.getFeed,
    likeCard: interactions.likeCard,
    followUser: follow.followUser,
    unfollowUser: follow.unfollowUser,
    muteUser: mute.muteUser,
    unmuteUser: mute.unmuteUser,
    reportContent: report.reportContent,
    sayHello: sayHello.sayHello,
};

export * from "./auth/sendMagicLink";
export * from "./auth/verifyMagicLink";
export * from "./auth/checkHandleUniqueness";
export * from "./auth/completeOnboarding";
export * from "./auth/updateUserAvatar";
