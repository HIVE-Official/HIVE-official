'use client';

import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { UserProfile } from '@hive/validation';
import Image from 'next/image';
import { User, Edit } from 'lucide-react';
import { EditProfileModal } from '@/components/profile/EditProfileModal';

// A simple loading skeleton component
const ProfileSkeleton = () => (
    <div className="p-4 lg:p-8 animate-pulse">
        <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4"></div>
        <div className="h-8 bg-muted rounded w-1/2 mx-auto mb-2"></div>
        <div className="h-6 bg-muted rounded w-1/4 mx-auto mb-6"></div>
        <div className="h-10 bg-muted rounded w-full"></div>
    </div>
);

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const auth = getAuth();
            const user = auth.currentUser;
            if (user) {
                const db = getFirestore();
                const userRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data() as UserProfile);
                }
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    const handleProfileUpdate = (updatedData: Partial<UserProfile>) => {
        setProfile((prev) => prev ? { ...prev, ...updatedData } : null);
    };

    if (loading) {
        return <ProfileSkeleton />;
    }

    if (!profile) {
        return <div className="p-8 text-center text-destructive">Could not load profile.</div>;
    }

    return (
        <div className="p-4 lg:p-8 max-w-4xl mx-auto">
            <header className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                    {profile.avatarUrl ? (
                        <Image src={profile.avatarUrl} alt={profile.preferredName || profile.fullName} width={128} height={128} className="rounded-full" />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-card flex items-center justify-center border">
                            <User className="w-16 h-16 text-muted" />
                        </div>
                    )}
                     <button 
                        onClick={() => setIsModalOpen(true)}
                        className="absolute bottom-0 right-0 bg-accent-gold text-background p-2 rounded-full hover:bg-accent-gold-hover"
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                </div>
                <h1 className="text-3xl font-bold text-primary">{profile.preferredName || profile.fullName}</h1>
                <p className="text-lg text-muted">@{profile.handle}</p>
                <p className="text-sm text-muted mt-2">{profile.major} • {profile.gradYear}</p>
            </header>
            
            {/* Tabs for Activity and Tools will go here */}
            <div className="border-t border-border pt-4">
                 <p className="text-center text-muted">Activity feed coming soon...</p>
            </div>

            <EditProfileModal
                profile={profile}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProfileUpdate={handleProfileUpdate}
            />
        </div>
    );
} 
 