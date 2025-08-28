import { getFunctions, httpsCallable } from 'firebase/functions';

const functions = getFunctions();

/**
 * Calls the `leaveSpace` Cloud Function.
 * @param {string} spaceId The ID of the space to leave.
 */
export const leaveSpace = async (spaceId: string): Promise<void> => {
  const leaveSpaceCallable = httpsCallable(functions, 'leaveSpace');
  await leaveSpaceCallable({ spaceId });
};

/**
 * Calls the `requestBuilderRole` Cloud Function.
 * @param {string} spaceId The ID of the space for which to request the role.
 */
export const requestBuilderRole = async (spaceId: string): Promise<void> => {
  const requestBuilderRoleCallable = httpsCallable(functions, 'requestBuilderRole');
  await requestBuilderRoleCallable({ spaceId });
};

/**
 * Gets a space by ID
 * TODO: Implement proper API call for vBETA
 */
export const getSpaceById = async (spaceId: string): Promise<any> => {
  // Stub implementation for vBETA
  throw new Error(`getSpaceById not implemented yet for space: ${spaceId}`);
}; 