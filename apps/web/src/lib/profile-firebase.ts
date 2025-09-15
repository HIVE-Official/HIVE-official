/**
 * Firebase Profile Management Utilities
 * 
 * This module handles all Firebase operations related to user profiles,
 * including photo uploads, profile data management, and privacy settings.
 * It provides a clean interface between the UI components and Firebase services.
 */

import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL,
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase/client/firebase-client';

/**
 * Upload a profile photo to Firebase Storage
 * 
 * @param userId - The user's unique identifier
 * @param file - The image file to upload
 * @param context - Array of contexts where this photo is used (e.g., ['profile', 'avatar'])
 * @returns The download URL of the uploaded photo
 */
export async function uploadProfilePhoto(
  userId: string, 
  file: File, 
  context: string[] = ['profile']
): Promise<string> {
  if (!userId) {
    throw new Error('User ID is required for photo upload');
  }

  // Create a unique filename with timestamp
  const timestamp = Date.now();
  const filename = `${userId}_${timestamp}_${file.name}`;
  const storagePath = `profiles/${userId}/photos/${filename}`;
  
  // Create storage reference
  const storageRef = ref(storage, storagePath);
  
  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type,
      customMetadata: {
        userId,
        context: context.join(','),
        uploadedAt: new Date().toISOString()
      }
    });
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    // Store photo metadata in Firestore
    await savePhotoMetadata(userId, {
      url: downloadURL,
      storagePath,
      filename,
      context,
      size: file.size,
      type: file.type,
      uploadedAt: serverTimestamp()
    });
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile photo:', error);
    throw new Error('Failed to upload profile photo');
  }
}

/**
 * Save photo metadata to Firestore
 */
async function savePhotoMetadata(userId: string, metadata: any) {
  const photoId = `photo_${Date.now()}`;
  const photoRef = doc(db, 'users', userId, 'photos', photoId);
  
  await setDoc(photoRef, {
    ...metadata,
    id: photoId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
}

/**
 * Get user profile data from Firestore
 */
export async function getUserProfile(userId: string): Promise<DocumentData | null> {
  if (!userId) return null;
  
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (userDoc.exists()) {
      return {
        id: userDoc.id,
        ...userDoc.data()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

/**
 * Update user profile data in Firestore
 */
export async function updateUserProfile(
  userId: string, 
  updates: Partial<UserProfile>
): Promise<void> {
  if (!userId) {
    throw new Error('User ID is required');
  }
  
  try {
    const userRef = doc(db, 'users', userId);
    
    await updateDoc(userRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update profile');
  }
}

/**
 * Delete a profile photo from Firebase Storage
 */
export async function deleteProfilePhoto(
  userId: string, 
  photoUrl: string
): Promise<void> {
  if (!userId || !photoUrl) {
    throw new Error('User ID and photo URL are required');
  }
  
  try {
    // Extract storage path from URL or use a stored reference
    const storageRef = ref(storage, photoUrl);
    await deleteObject(storageRef);
    
    // Also remove from Firestore metadata
    const photosQuery = query(
      collection(db, 'users', userId, 'photos'),
      where('url', '==', photoUrl)
    );
    
    const snapshot = await getDocs(photosQuery);
    const deletePromises = snapshot.docs.map(doc => 
      updateDoc(doc.ref, { deleted: true, deletedAt: serverTimestamp() })
    );
    
    await Promise.all(deletePromises);
  } catch (error) {
    console.error('Error deleting profile photo:', error);
    throw new Error('Failed to delete photo');
  }
}

/**
 * Get all photos for a user
 */
export async function getUserPhotos(userId: string): Promise<Photo[]> {
  if (!userId) return [];
  
  try {
    const photosRef = collection(db, 'users', userId, 'photos');
    const photosQuery = query(photosRef, where('deleted', '!=', true));
    const snapshot = await getDocs(photosQuery);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Photo));
  } catch (error) {
    console.error('Error fetching user photos:', error);
    return [];
  }
}

// Type definitions
export interface UserProfile {
  displayName?: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  interests?: string[];
  photoURL?: string;
  privacySettings?: PrivacySettings;
  updatedAt?: Timestamp | ReturnType<typeof serverTimestamp>;
}

export interface PrivacySettings {
  profileVisibility: 'public' | 'campus' | 'connections' | 'private';
  showEmail: boolean;
  showLocation: boolean;
  showActivity: boolean;
}

export interface Photo {
  id: string;
  url: string;
  context: string[];
  privacy: 'public' | 'private' | 'connections';
  order: number;
  caption?: string;
  storagePath?: string;
  uploadedAt?: Timestamp;
}