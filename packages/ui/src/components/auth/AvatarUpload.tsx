'use client';

import * as React from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc, getFirestore } from 'firebase/firestore';
import { useUser } from '@/hooks/useUser';
import { useToast } from '../toast/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const storage = getStorage();
const db = getFirestore();

export function AvatarUpload({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { user, userProfile } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    setIsLoading(true);

    try {
      // 1. Upload to Firebase Storage
      const filePath = `avatars/${user.uid}/${file.name}`;
      const storageRef = ref(storage, filePath);
      const uploadTask = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);

      // 2. Update user document in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { avatarUrl: downloadURL });

      toast({ title: 'Avatar Updated!' });
    } catch (error: any) {
      console.error(error);
      toast({ title: 'Error', description: 'Failed to upload avatar.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn('relative', className)} {...props}>
      <button onClick={() => fileInputRef.current?.click()} disabled={isLoading}>
        <Image
          src={userProfile?.avatarUrl || '/default-avatar.png'} // Provide a default avatar
          alt="User Avatar"
          width={128}
          height={128}
          className="rounded-full object-cover"
        />
        {isLoading && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full">...</div>}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
} 