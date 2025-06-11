'use client';

import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';

export default function SettingsPage() {
    const router = useRouter();

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            Cookies.remove('firebaseIdToken');
            router.push('/auth/login');
        } catch (error) {
            console.error("Error signing out: ", error);
            // Optionally, show an error message to the user
        }
    };

    const handleDeleteAccount = () => {
        // This would trigger a modal with a confirmation step
        // that calls a backend function to delete the user's data.
        alert("Account deletion flow not yet implemented.");
    };

    return (
        <div className="p-4 lg:p-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-8">Settings</h1>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold text-primary mb-2">Account</h2>
                    <div className="bg-card p-4 rounded-lg border border-border">
                        <div className="flex justify-between items-center">
                            <p>Logout</p>
                            <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-destructive mb-2">Danger Zone</h2>
                     <div className="bg-card p-4 rounded-lg border border-destructive/50">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Delete Account</p>
                                <p className="text-sm text-muted">Permanently delete your account and all associated data. This action cannot be undone.</p>
                            </div>
                            <Button variant="destructive" onClick={handleDeleteAccount}>Delete</Button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
} 
 