'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { useForm } from 'react-hook-form';

import { Step1Profile } from './wizard/Step1Profile';
import { Step2Campus } from './wizard/Step2Campus';
import { Step3Handle } from './wizard/Step3Handle';
import { Step4Avatar } from './wizard/Step4Avatar';
import { Step5Builder } from './wizard/Step5Builder';
import { Step6Legal } from './wizard/Step6Legal';
import { Step1Welcome } from './wizard/Step1Welcome';
// We will create these step components next
// ... etc

const steps = [
  { id: 1, component: Step1Profile, title: 'Create your profile' },
  { id: 2, component: Step2Campus, title: 'Campus details' },
  { id: 3, component: Step3Handle, title: 'Choose your handle' },
  { id: 4, component: Step4Avatar, title: 'Add a photo' },
  { id: 5, component: Step5Builder, title: 'Become a Builder?' },
  { id: 6, component: Step6Legal, title: 'Legal & Finish' },
  // ... etc
];

const completeOnboarding = httpsCallable(getFunctions(), 'completeOnboarding');
const updateUserAvatar = httpsCallable(getFunctions(), 'updateUserAvatar');

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({});

  const { control, handleSubmit, watch } = useForm<OnboardingData>({
    defaultValues: {
      fullName: '',
      major: '',
      gradYear: '',
      handle: '',
      avatar: null,
      isBuilder: false,
      avatarUrl: '',
      wantsToBeBuilder: false,
    },
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateFormData = (field: string, value: any) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  const handleFinalSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
        const { avatar, ...profileData } = formData;
        
        const result = await completeOnboarding(profileData);

        if (result.data.success) {
            if (avatar) {
                const auth = getAuth();
                const user = auth.currentUser;
                if (user) {
                    const storage = getStorage();
                    const avatarRef = ref(storage, `avatars/${user.uid}/${avatar.name}`);
                    const snapshot = await uploadBytes(avatarRef, avatar);
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    await updateUserAvatar({ avatarUrl: downloadURL });
                }
            }
            router.push('/feed'); // Redirect to the main app feed
        } else {
            // @ts-ignore
            setError(result.data.message || "An unexpected error occurred.");
        }
    } catch (err: any) {
        console.error("Onboarding submission failed:", err);
        setError(err.message || "An unexpected error occurred.");
    } finally {
        setIsLoading(false);
    }
  }
  
  const CurrentStepComponent = () => {
    const StepComponent = steps.find(s => s.id === currentStep)?.component;
    if (StepComponent) {
      // @ts-ignore
      return <StepComponent formData={formData} updateFormData={updateFormData} />;
    }
    // Placeholder for steps not yet created
    return (
        <div className="p-4 border rounded-md min-h-[200px]">
            <h2 className="text-xl font-bold mb-4">Step {currentStep}</h2>
            <p>This is a placeholder for the next step.</p>
        </div>
    )
  };

  const slideTransition = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  };

  return (
    <div className="w-full max-w-md">
      {/* Progress Dots */}
      <div className="flex justify-center space-x-2 mb-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i + 1}
            className={`h-2 w-2 rounded-full transition-colors ${
              currentStep >= i + 1 ? 'bg-accent-gold' : 'bg-border'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentStep} {...slideTransition}>
          <CurrentStepComponent />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
            onClick={prevStep}
            disabled={currentStep === 1 || isLoading}
            className="text-muted hover:text-primary disabled:opacity-50"
        >
            Back
        </button>
        {currentStep < steps.length ? (
            <button
                onClick={nextStep}
                className="bg-accent-gold text-background font-semibold px-6 py-2 rounded-md hover:bg-accent-gold-hover"
                // Add validation logic here later
            >
                Continue
            </button>
        ) : (
            <button
                onClick={handleFinalSubmit}
                disabled={!formData.wantsToBeBuilder || isLoading}
                className="bg-accent-gold text-background font-semibold px-6 py-2 rounded-md hover:bg-accent-gold-hover disabled:bg-muted disabled:cursor-not-allowed flex items-center justify-center"
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enter HIVE
            </button>
        )}
      </div>
      {error && <p className="text-xs text-destructive mt-2 text-center">{error}</p>}
    </div>
  );
} 