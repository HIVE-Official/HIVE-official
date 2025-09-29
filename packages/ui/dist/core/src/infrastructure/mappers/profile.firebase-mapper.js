import { Timestamp } from 'firebase/firestore';
import { Mapper } from '../../application/shared/Mapper.base';
export class ProfileFirebaseMapper extends Mapper {
    // Convert from domain (ProfileDTO) to persistence (FirestoreProfileDocument)
    toDTO(dto) {
        return {
            id: dto.id,
            email: dto.email,
            handle: dto.handle,
            firstName: dto.personalInfo.firstName,
            lastName: dto.personalInfo.lastName,
            bio: dto.personalInfo.bio,
            major: dto.personalInfo.major,
            graduationYear: dto.personalInfo.graduationYear,
            dormLocation: dto.personalInfo.dorm,
            interests: dto.interests,
            connections: dto.connections,
            isOnboarded: dto.isOnboarded,
            campusId: 'ub-buffalo', // Hard-coded for v1
            createdAt: Timestamp.fromDate(dto.createdAt),
            updatedAt: Timestamp.fromDate(dto.updatedAt)
        };
    }
    // Convert from persistence (FirestoreProfileDocument) to domain (ProfileDTO)
    toDomain(firestoreDoc) {
        return {
            id: firestoreDoc.id,
            email: firestoreDoc.email,
            handle: firestoreDoc.handle,
            personalInfo: {
                firstName: firestoreDoc.firstName,
                lastName: firestoreDoc.lastName,
                bio: firestoreDoc.bio,
                major: firestoreDoc.major,
                graduationYear: firestoreDoc.graduationYear,
                dorm: firestoreDoc.dormLocation
            },
            interests: firestoreDoc.interests,
            connections: firestoreDoc.connections,
            isOnboarded: firestoreDoc.isOnboarded,
            createdAt: firestoreDoc.createdAt.toDate(),
            updatedAt: firestoreDoc.updatedAt.toDate()
        };
    }
}
//# sourceMappingURL=profile.firebase-mapper.js.map