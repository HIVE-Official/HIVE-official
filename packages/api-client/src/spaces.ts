import { getFunctions, httpsCallable } from 'firebase/functions';
import type { Space } from '@hive/core';

const functions = getFunctions();

/**
 * Gets a space by its ID.
 * @param {string} spaceId The ID of the space to get.
 * @returns {Promise<Space>} The space data.
 */
export const getSpaceById = async (spaceId: string): Promise<Space> => {
  const getSpaceCallable = httpsCallable<{ spaceId: string }, Space>(functions, 'getSpace');
  const result = await getSpaceCallable({ spaceId });
  return result.data;
};

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