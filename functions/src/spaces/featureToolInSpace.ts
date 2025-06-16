import * as functions from 'firebase-functions';
import { assertIsBuilder } from '../lib/guards';

export const featureToolInSpace = functions.https.onCall(async (data, context) => {
  const { spaceId, toolId } = data;

  // Validate arguments
  if (!spaceId || typeof spaceId !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a valid "spaceId" argument.',
    );
  }
  if (!toolId || typeof toolId !== 'string') {
    throw new functions.https.HttpsError(
      'invalid-argument',
      'The function must be called with a valid "toolId" argument.',
    );
  }

  // Assert builder role
  const uid = context.auth?.uid;
  await assertIsBuilder(uid, spaceId);

  // Log the attempt
  functions.logger.info(`Builder ${uid} attempted to feature tool ${toolId} in space ${spaceId}. This feature is not yet implemented.`);

  // Return "not implemented" error
  throw new functions.https.HttpsError(
    'unimplemented',
    'Featuring tools is not yet available. This functionality is planned for a future update.',
  );
}); 