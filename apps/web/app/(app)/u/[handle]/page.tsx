'use client';

import { useState, useEffect } from 'react';
import { getFirestore, collection, query, where, getDocs, limit, doc, getDoc } from 'firebase/firestore';
import { UserProfile } from '@hive/validation';
import Image from 'next/image';
import { User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { UserActions } from '@/components/profile/UserActions';

const ProfileSkeleton = () => (
    <div className="p-8 animate-pulse max-w-2xl mx-auto">
        <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4"></div>
        <div className="h-7 bg-muted rounded w-1/2 mx-auto mb-2"></div>
        <div className="h-5 bg-muted rounded w-1/3 mx-auto"></div>
    </div>
);

const NotFound = () => (
    <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-primary">Profile Not Found</h1>
        <p className="text-muted">This user may not exist or may have a private profile.</p>
    </div>
)

export default function PublicProfilePage({ params }: { params: { handle: string } }) {
    const { user: currentUser } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [profileId, setProfileId] = useState<string | null>(null);
    const [initialFollowing, setInitialFollowing] = useState(false);
    const [initialMuted, setInitialMuted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!params.handle) return;
            setLoading(true);
            
            const db = getFirestore();
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("handle", "==", params.handle), where("isPublic", "==", true), limit(1));
            
            try {
                const querySnapshot = await getDocs(q);
                if (querySnapshot.empty) {
                    setNotFound(true);
                } else {
                    const userDoc = querySnapshot.docs[0];
                    const userProfile = userDoc.data() as UserProfile;
                    setProfile(userProfile);
                    setProfileId(userDoc.id);

                    if (currentUser && currentUser.uid !== userDoc.id) {
                        const followDocRef = doc(db, 'users', currentUser.uid, 'follows', userDoc.id);
                        const followDoc = await getDoc(followDocRef);
                        setInitialFollowing(followDoc.exists());

                        const muteDocRef = doc(db, 'users', currentUser.uid, 'mutes', userDoc.id);
                        const muteDoc = await getDoc(muteDocRef);
                        setInitialMuted(muteDoc.exists());
                    }
                }
            } catch (error) {
                console.error("Error fetching public profile:", error);
                setNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [params.handle, currentUser]);

    if (loading) return <ProfileSkeleton />;
    if (notFound) return <NotFound />;
    if (!profile || !profileId) return <NotFound />;

    const isOwnProfile = currentUser?.uid === profileId;

    return (
        <div className="p-8 max-w-2xl mx-auto text-center">
             <header className="flex flex-col items-center text-center mb-8">
                <div className="relative mb-4">
                    {profile.avatarUrl ? (
                        <Image src={profile.avatarUrl} alt={profile.preferredName || profile.fullName} width={96} height={96} className="rounded-full" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center border">
                            <User className="w-12 h-12 text-muted" />
                        </div>
                    )}
                </div>
                <h1 className="text-2xl font-bold text-primary">{profile.preferredName || profile.fullName}</h1>
                <p className="text-md text-muted">@{profile.handle}</p>
            </header>

            {!isOwnProfile && (
                <div className="mt-4">
                    <UserActions
                        profileId={profileId}
                        initialFollowing={initialFollowing}
                        initialFollowersCount={profile.followersCount || 0}
                        initialMuted={initialMuted}
                    />
                </div>
            )}
            
            {/* Public activity feed could go here */}
        </div>
    );
} 