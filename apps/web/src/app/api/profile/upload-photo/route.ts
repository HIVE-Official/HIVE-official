import { NextRequest, NextResponse } from 'next/server';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase-admin/auth';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];
    
    // Verify the token
    const decodedToken = await getAuth().verifyIdToken(token);
    const userId = decodedToken.uid;

    const formData = await request.formData();
    const file = formData.get('photo') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No photo file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Upload to Firebase Storage
    const storage = getStorage();
    const fileName = `profile-photos/${userId}/${Date.now()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    
    const arrayBuffer = await file.arrayBuffer();
    const uploadResult = await uploadBytes(storageRef, arrayBuffer, {
      contentType: file.type,
    });

    // Get download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);

    // Update user document with new avatar URL
    const db = getFirestore();
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      avatarUrl: downloadURL,
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({
      success: true,
      avatarUrl: downloadURL,
      message: 'Profile photo updated successfully'
    });

  } catch (error) {
    console.error('Photo upload error:', error);
    
    if (error instanceof Error && error.message.includes('auth/id-token-expired')) {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}