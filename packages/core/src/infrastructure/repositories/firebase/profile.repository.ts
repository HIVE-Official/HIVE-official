/**
 * Firebase Profile Repository Implementation
 * Handles profile persistence with Firebase
 */

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit as firestoreLimit,
  Timestamp
} from 'firebase/firestore';
import { db } from '@hive/firebase';
import { IProfileRepository } from '../interfaces';
import { Result } from '../../../domain/shared/base/Result';
import { Profile } from '../../../domain/profile/aggregates/profile.aggregate';
import { ProfileId } from '../../../domain/profile/value-objects/profile-id.value';
import { UBEmail } from '../../../domain/profile/value-objects';
import { ProfileHandle } from '../../../domain/profile/value-objects/profile-handle.value';
import { CampusId } from '../../../domain/profile/value-objects/campus-id.value';
import { UserType } from '../../../domain/profile/value-objects/user-type.value';
import { ProfilePrivacy } from '../../../domain/profile/value-objects/profile-privacy.value';
import { isFeatureEnabled } from '../../feature-flags';

export class FirebaseProfileRepository implements IProfileRepository {
  private readonly collectionName = 'users';
  private readonly connectionsCollection = 'connections';

  async findById(id: ProfileId | any): Promise<Result<Profile>> {
    try {
      const profileId = typeof id === 'string' ? id : id.id;
      const docRef = doc(db, this.collectionName, profileId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return Result.fail<Profile>('Profile not found');
      }

      const data = docSnap.data();
      return this.toDomain(profileId, data);
    } catch (error) {
      return Result.fail<Profile>(`Failed to find profile: ${error}`);
    }
  }

  async findByEmail(email: string): Promise<Result<Profile>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('email', '==', email),
        firestoreLimit(1)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return Result.fail<Profile>('Profile not found');
      }

      const doc = snapshot.docs[0];
      return this.toDomain(doc.id, doc.data());
    } catch (error) {
      return Result.fail<Profile>(`Failed to find profile: ${error}`);
    }
  }

  async findByHandle(handle: string): Promise<Result<Profile>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('handle', '==', handle.toLowerCase()),
        firestoreLimit(1)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return Result.fail<Profile>('Profile not found');
      }

      const doc = snapshot.docs[0];
      return this.toDomain(doc.id, doc.data());
    } catch (error) {
      return Result.fail<Profile>(`Failed to find profile: ${error}`);
    }
  }

  async findByCampus(campusId: string, limitCount: number = 50): Promise<Result<Profile[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const profiles: Profile[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          profiles.push(result.getValue());
        }
      }

      return Result.ok<Profile[]>(profiles);
    } catch (error) {
      return Result.fail<Profile[]>(`Failed to find profiles: ${error}`);
    }
  }

  async exists(handle: string): Promise<boolean> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('handle', '==', handle.toLowerCase()),
        firestoreLimit(1)
      );
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch {
      return false;
    }
  }

  async searchByName(searchQuery: string, campusId: string): Promise<Result<Profile[]>> {
    try {
      // Firebase doesn't support full-text search natively
      // For MVP, we'll do a simple prefix search on firstName and lastName
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('isActive', '==', true),
        orderBy('firstName'),
        firestoreLimit(20)
      );

      const snapshot = await getDocs(q);
      const profiles: Profile[] = [];
      const searchLower = searchQuery.toLowerCase();

      for (const doc of snapshot.docs) {
        const data = doc.data();
        const fullName = `${data.firstName} ${data.lastName}`.toLowerCase();
        const handle = data.handle?.toLowerCase() || '';

        if (fullName.includes(searchLower) || handle.includes(searchLower)) {
          const result = await this.toDomain(doc.id, data);
          if (result.isSuccess) {
            profiles.push(result.getValue());
          }
        }
      }

      return Result.ok<Profile[]>(profiles);
    } catch (error) {
      return Result.fail<Profile[]>(`Search failed: ${error}`);
    }
  }

  async save(profile: Profile): Promise<Result<void>> {
    try {
      const data = this.toPersistence(profile);
      const docRef = doc(db, this.collectionName, profile.id);

      if (profile.createdAt) {
        // Update existing
        await updateDoc(docRef, {
          ...data,
          updatedAt: Timestamp.now()
        });
      } else {
        // Create new
        await setDoc(docRef, {
          ...data,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to save profile: ${error}`);
    }
  }

  async delete(id: ProfileId | any): Promise<Result<void>> {
    try {
      const profileId = typeof id === 'string' ? id : id.id;
      const docRef = doc(db, this.collectionName, profileId);
      await deleteDoc(docRef);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(`Failed to delete profile: ${error}`);
    }
  }

  // Helper methods for domain mapping
  private async toDomain(id: string, data: any): Promise<Result<Profile>> {
    try {
      // Handle legacy profiles without enhanced features
      if (!isFeatureEnabled('PROFILE_CAMPUS_ISOLATION') || !data.campusId) {
        data.campusId = 'ub-buffalo'; // Default for legacy profiles
      }

      const profileData = {
        id,
        email: data.email,
        handle: data.handle,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        major: data.major,
        graduationYear: data.graduationYear,
        interests: data.interests || [],
        photos: data.photos || [],
        isActive: data.isActive !== false,
        isVerified: data.isVerified || false,
        userType: data.userType || 'student',
        campusId: data.campusId,
        privacy: data.privacy || {},
        badges: data.badges || [],
        blockedUsers: data.blockedUsers || [],
        lastSeen: data.lastSeen?.toDate(),
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        onboardingCompleted: data.onboardingCompleted || false,
        activityScore: data.activityScore || 0,
        followerCount: data.followerCount || 0,
        followingCount: data.followingCount || 0,
        connectionCount: data.connectionCount || 0
      };

      // Create value objects
      const emailResult = UBEmail.create(profileData.email);
      if (emailResult.isFailure) {
        return Result.fail<Profile>(emailResult.error!);
      }

      const handleResult = ProfileHandle.create(profileData.handle);
      if (handleResult.isFailure) {
        return Result.fail<Profile>(handleResult.error!);
      }

      const campusIdResult = CampusId.create(profileData.campusId);
      if (campusIdResult.isFailure) {
        return Result.fail<Profile>(campusIdResult.error!);
      }

      const userTypeResult = UserType.create(profileData.userType);
      if (userTypeResult.isFailure) {
        return Result.fail<Profile>(userTypeResult.error!);
      }

      // Create profile
      const profile = Profile.create({
        profileId: ProfileId.create(id).getValue(),
        email: emailResult.getValue(),
        handle: handleResult.getValue(),
        userType: userTypeResult.getValue(),
        campusId: campusIdResult.getValue(),
        personalInfo: {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          bio: profileData.bio,
          major: profileData.major,
          graduationYear: profileData.graduationYear,
          profilePhoto: (profileData as any).profilePhoto || profileData.photos?.[0],
          coverPhoto: (profileData as any).coverPhoto || profileData.photos?.[1]
        },
        socialInfo: {
          interests: profileData.interests || [],
          clubs: (profileData as any).clubs || [],
          sports: (profileData as any).sports || []
        }
      });

      if (profile.isFailure) {
        return Result.fail<Profile>(profile.error!);
      }

      const enhancedProfile = profile.getValue();

      // Set additional properties using setter methods where needed
      if (profileData.isVerified !== undefined) {
        enhancedProfile.setIsVerified(profileData.isVerified);
      }
      if (profileData.activityScore !== undefined) {
        enhancedProfile.setActivityScore(profileData.activityScore);
      }

      // Set privacy settings
      if (profileData.privacy && isFeatureEnabled('PROFILE_PRIVACY_CONTROLS')) {
        const privacyResult = ProfilePrivacy.create(profileData.privacy);
        if (privacyResult.isSuccess) {
          enhancedProfile.setPrivacy(privacyResult.getValue());
        }
      }

      return Result.ok<Profile>(enhancedProfile);
    } catch (error) {
      return Result.fail<Profile>(`Failed to map to domain: ${error}`);
    }
  }

  private toPersistence(profile: Profile): any {
    return {
      email: profile.email.value,
      handle: profile.handle.value.toLowerCase(),
      firstName: profile.firstName,
      lastName: profile.lastName,
      bio: profile.bio,
      major: profile.major,
      graduationYear: profile.graduationYear,
      interests: profile.interests,
      photos: profile.photos,
      isActive: profile.isActive,
      isVerified: profile.isVerified,
      userType: profile.userType.value,
      campusId: profile.campusId.id,
      privacy: profile.privacy ? {
        profileVisibility: profile.privacy.profileVisibility,
        showEmail: profile.privacy.showEmail,
        showConnections: profile.privacy.showConnections,
        allowConnectionRequests: profile.privacy.allowConnectionRequests
      } : {},
      badges: profile.badges,
      blockedUsers: profile.blockedUsers,
      lastSeen: profile.lastSeen ? Timestamp.fromDate(profile.lastSeen) : null,
      onboardingCompleted: profile.onboardingCompleted,
      activityScore: profile.activityScore,
      followerCount: profile.followerCount,
      followingCount: profile.followingCount,
      connectionCount: profile.connectionCount
    };
  }

  // Additional methods required by interface
  async findOnboardedProfiles(maxCount: number = 100): Promise<Result<Profile[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('onboardingCompleted', '==', true),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
        firestoreLimit(maxCount)
      );
      const snapshot = await getDocs(q);

      const profiles: Profile[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          profiles.push(result.getValue());
        }
      }

      return Result.ok<Profile[]>(profiles);
    } catch (error) {
      return Result.fail<Profile[]>(`Failed to find onboarded profiles: ${error}`);
    }
  }

  async findByInterest(interest: string, limitCount: number = 50): Promise<Result<Profile[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('interests', 'array-contains', interest),
        where('isActive', '==', true),
        orderBy('activityScore', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const profiles: Profile[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          profiles.push(result.getValue());
        }
      }

      return Result.ok<Profile[]>(profiles);
    } catch (error) {
      return Result.fail<Profile[]>(`Failed to find profiles by interest: ${error}`);
    }
  }

  async findByMajor(major: string, limitCount: number = 50): Promise<Result<Profile[]>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('major', '==', major),
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
        firestoreLimit(limitCount)
      );
      const snapshot = await getDocs(q);

      const profiles: Profile[] = [];
      for (const doc of snapshot.docs) {
        const result = await this.toDomain(doc.id, doc.data());
        if (result.isSuccess) {
          profiles.push(result.getValue());
        }
      }

      return Result.ok<Profile[]>(profiles);
    } catch (error) {
      return Result.fail<Profile[]>(`Failed to find profiles by major: ${error}`);
    }
  }

  async findConnectionsOf(profileId: string): Promise<Result<Profile[]>> {
    try {
      // Find all connections for this profile
      const q1 = query(
        collection(db, this.connectionsCollection),
        where('fromProfileId', '==', profileId),
        where('status', '==', 'accepted')
      );

      const q2 = query(
        collection(db, this.connectionsCollection),
        where('toProfileId', '==', profileId),
        where('status', '==', 'accepted')
      );

      const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

      // Collect all connected profile IDs
      const connectedProfileIds = new Set<string>();
      snapshot1.docs.forEach(doc => {
        const data = doc.data();
        connectedProfileIds.add(data.toProfileId);
      });
      snapshot2.docs.forEach(doc => {
        const data = doc.data();
        connectedProfileIds.add(data.fromProfileId);
      });

      // Fetch all connected profiles
      const profiles: Profile[] = [];
      for (const connectedId of Array.from(connectedProfileIds)) {
        const result = await this.findById(connectedId);
        if (result.isSuccess) {
          profiles.push(result.getValue());
        }
      }

      return Result.ok<Profile[]>(profiles);
    } catch (error) {
      return Result.fail<Profile[]>(`Failed to find connections: ${error}`);
    }
  }

  async getTotalCampusUsers(campusId: string): Promise<Result<number>> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('campusId', '==', campusId),
        where('isActive', '==', true)
      );
      const snapshot = await getDocs(q);
      return Result.ok<number>(snapshot.size);
    } catch (error) {
      return Result.fail<number>(`Failed to count campus users: ${error}`);
    }
  }
}