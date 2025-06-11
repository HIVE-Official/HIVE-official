'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserProfileSchema, UserProfile } from '@hive/validation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getFunctions, httpsCallable } from 'firebase/functions';

const updateUserProfile = httpsCallable(getFunctions(), 'profile-updateUserProfile');

const EditProfileFormSchema = UserProfileSchema.pick({
    preferredName: true,
    major: true,
});

type EditProfileFormData = Pick<UserProfile, 'preferredName' | 'major'>;

interface EditProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onProfileUpdate: (updatedData: EditProfileFormData) => void;
}

export function EditProfileModal({ profile, isOpen, onClose, onProfileUpdate }: EditProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      preferredName: profile.preferredName || '',
      major: profile.major || '',
    },
  });

  const onSubmit: SubmitHandler<EditProfileFormData> = async (data) => {
    setLoading(true);
    setError(null);
    try {
      await updateUserProfile(data);
      onProfileUpdate(data);
      onClose();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="preferredName">Preferred Name</label>
                <Input id="preferredName" {...register('preferredName')} />
                {errors.preferredName && <p className="text-destructive text-sm mt-1">{errors.preferredName.message}</p>}
            </div>
            <div>
                <label htmlFor="major">Major</label>
                <Input id="major" {...register('major')} />
                {errors.major && <p className="text-destructive text-sm mt-1">{errors.major.message}</p>}
            </div>
             {error && <p className="text-destructive text-sm mt-1">{error}</p>}
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline" disabled={loading}>Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 
 