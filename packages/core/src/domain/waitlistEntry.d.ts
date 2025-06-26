import type { Timestamp } from "firebase/firestore";
/**
 * Represents an entry in the waitlist for a specific school.
 * Stored in the `/schools/{schoolId}/waitlist_entries` sub-collection.
 */
export interface WaitlistEntry {
    /**
     * The email address of the user who joined the waitlist.
     * This serves as the primary identifier for the entry.
     */
    email: string;
    /**
     * The timestamp when the user joined the waitlist.
     */
    joinedAt: Timestamp;
}
//# sourceMappingURL=waitlistEntry.d.ts.map