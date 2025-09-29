import { Timestamp } from 'firebase/firestore';
import { Mapper } from '../../application/shared/Mapper.base';
import { ProfileDTO } from '../../application/identity/dtos/profile.dto';
/**
 * Firestore Profile Document Schema
 */
export interface FirestoreProfileDocument {
    id: string;
    email: string;
    handle: string;
    firstName: string;
    lastName: string;
    bio: string;
    major: string;
    graduationYear: number | null;
    dormLocation: string;
    interests: string[];
    connections: string[];
    isOnboarded: boolean;
    campusId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
export declare class ProfileFirebaseMapper extends Mapper<ProfileDTO, FirestoreProfileDocument> {
    toDTO(dto: ProfileDTO): FirestoreProfileDocument;
    toDomain(firestoreDoc: FirestoreProfileDocument): ProfileDTO;
}
//# sourceMappingURL=profile.firebase-mapper.d.ts.map