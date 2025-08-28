/**
 * Calls the `leaveSpace` Cloud Function.
 * @param {string} spaceId The ID of the space to leave.
 */
export declare const leaveSpace: (spaceId: string) => Promise<void>;
/**
 * Calls the `requestBuilderRole` Cloud Function.
 * @param {string} spaceId The ID of the space for which to request the role.
 */
export declare const requestBuilderRole: (spaceId: string) => Promise<void>;
/**
 * Gets a space by ID
 * TODO: Implement proper API call for vBETA
 */
export declare const getSpaceById: (spaceId: string) => Promise<any>;
//# sourceMappingURL=spaces.d.ts.map