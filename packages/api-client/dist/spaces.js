import { getFunctions, httpsCallable } from 'firebase/functions';
const functions = getFunctions();
/**
 * Calls the `leaveSpace` Cloud Function.
 * @param {string} spaceId The ID of the space to leave.
 */
export const leaveSpace = async (spaceId) => {
    const leaveSpaceCallable = httpsCallable(functions, 'leaveSpace');
    await leaveSpaceCallable({ spaceId });
};
/**
 * Calls the `requestBuilderRole` Cloud Function.
 * @param {string} spaceId The ID of the space for which to request the role.
 */
export const requestBuilderRole = async (spaceId) => {
    const requestBuilderRoleCallable = httpsCallable(functions, 'requestBuilderRole');
    await requestBuilderRoleCallable({ spaceId });
};
//# sourceMappingURL=spaces.js.map