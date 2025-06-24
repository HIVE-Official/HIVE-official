"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowRight,
  ArrowLeft,
  Upload,
  User,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import { HiveLogo } from "../brand/hive-logo";

// TODO: Replace with import from @hive/core/constants/majors when circular dependency is resolved
const majors = [
  { name: "Accounting", category: "Business", level: "undergraduate" },
  { name: "Acting", category: "Arts", level: "undergraduate" },
  {
    name: "Aerospace Engineering",
    category: "Engineering",
    level: "undergraduate",
  },
  {
    name: "African American Studies",
    category: "Humanities",
    level: "undergraduate",
  },
  { name: "Anthropology", category: "Social Sciences", level: "undergraduate" },
  { name: "Architecture", category: "Arts", level: "undergraduate" },
  { name: "Art History", category: "Arts", level: "undergraduate" },
  { name: "Biochemistry", category: "Sciences", level: "undergraduate" },
  { name: "Bioengineering", category: "Engineering", level: "undergraduate" },
  { name: "Biology", category: "Sciences", level: "undergraduate" },
  {
    name: "Biomedical Engineering",
    category: "Engineering",
    level: "undergraduate",
  },
  {
    name: "Business Administration",
    category: "Business",
    level: "undergraduate",
  },
  {
    name: "Chemical Engineering",
    category: "Engineering",
    level: "undergraduate",
  },
  { name: "Chemistry", category: "Sciences", level: "undergraduate" },
  {
    name: "Civil Engineering",
    category: "Engineering",
    level: "undergraduate",
  },
  { name: "Classical Studies", category: "Humanities", level: "undergraduate" },
  {
    name: "Cognitive Science",
    category: "Social Sciences",
    level: "undergraduate",
  },
  {
    name: "Communication",
    category: "Social Sciences",
    level: "undergraduate",
  },
  {
    name: "Computer Engineering",
    category: "Engineering",
    level: "undergraduate",
  },
  { name: "Computer Science", category: "Engineering", level: "undergraduate" },
  { name: "Creative Writing", category: "Arts", level: "undergraduate" },
  { name: "Criminology", category: "Social Sciences", level: "undergraduate" },
  { name: "Dance", category: "Arts", level: "undergraduate" },
  { name: "Data Science", category: "Engineering", level: "undergraduate" },
  { name: "Design", category: "Arts", level: "undergraduate" },
  { name: "Economics", category: "Social Sciences", level: "undergraduate" },
  { name: "Education", category: "Social Sciences", level: "undergraduate" },
  {
    name: "Electrical Engineering",
    category: "Engineering",
    level: "undergraduate",
  },
  { name: "English", category: "Humanities", level: "undergraduate" },
  {
    name: "Environmental Science",
    category: "Sciences",
    level: "undergraduate",
  },
  { name: "Film Studies", category: "Arts", level: "undergraduate" },
  { name: "Finance", category: "Business", level: "undergraduate" },
  { name: "Fine Arts", category: "Arts", level: "undergraduate" },
  { name: "French", category: "Humanities", level: "undergraduate" },
  { name: "Gender Studies", category: "Humanities", level: "undergraduate" },
  { name: "Geography", category: "Social Sciences", level: "undergraduate" },
  { name: "Geology", category: "Sciences", level: "undergraduate" },
  { name: "German", category: "Humanities", level: "undergraduate" },
  { name: "Graphic Design", category: "Arts", level: "undergraduate" },
  { name: "Health Sciences", category: "Sciences", level: "undergraduate" },
  { name: "History", category: "Humanities", level: "undergraduate" },
  { name: "Human Resources", category: "Business", level: "undergraduate" },
  {
    name: "Industrial Engineering",
    category: "Engineering",
    level: "undergraduate",
  },
  { name: "Information Systems", category: "Business", level: "undergraduate" },
  {
    name: "International Relations",
    category: "Social Sciences",
    level: "undergraduate",
  },
  { name: "Italian", category: "Humanities", level: "undergraduate" },
  { name: "Japanese", category: "Humanities", level: "undergraduate" },
  { name: "Journalism", category: "Humanities", level: "undergraduate" },
  { name: "Kinesiology", category: "Sciences", level: "undergraduate" },
  { name: "Linguistics", category: "Humanities", level: "undergraduate" },
  { name: "Management", category: "Business", level: "undergraduate" },
  { name: "Marketing", category: "Business", level: "undergraduate" },
  {
    name: "Materials Science",
    category: "Engineering",
    level: "undergraduate",
  },
  { name: "Mathematics", category: "Sciences", level: "undergraduate" },
  {
    name: "Mechanical Engineering",
    category: "Engineering",
    level: "undergraduate",
  },
  {
    name: "Media Studies",
    category: "Social Sciences",
    level: "undergraduate",
  },
  { name: "Microbiology", category: "Sciences", level: "undergraduate" },
  { name: "Music", category: "Arts", level: "undergraduate" },
  { name: "Neuroscience", category: "Sciences", level: "undergraduate" },
  { name: "Nursing", category: "Sciences", level: "undergraduate" },
  { name: "Nutrition", category: "Sciences", level: "undergraduate" },
  { name: "Philosophy", category: "Humanities", level: "undergraduate" },
  { name: "Photography", category: "Arts", level: "undergraduate" },
  { name: "Physics", category: "Sciences", level: "undergraduate" },
  {
    name: "Political Science",
    category: "Social Sciences",
    level: "undergraduate",
  },
  { name: "Psychology", category: "Social Sciences", level: "undergraduate" },
  { name: "Public Health", category: "Sciences", level: "undergraduate" },
  {
    name: "Public Relations",
    category: "Social Sciences",
    level: "undergraduate",
  },
  { name: "Religious Studies", category: "Humanities", level: "undergraduate" },
  { name: "Social Work", category: "Social Sciences", level: "undergraduate" },
  { name: "Sociology", category: "Social Sciences", level: "undergraduate" },
  { name: "Spanish", category: "Humanities", level: "undergraduate" },
  { name: "Statistics", category: "Sciences", level: "undergraduate" },
  { name: "Theatre Arts", category: "Arts", level: "undergraduate" },
  {
    name: "Urban Planning",
    category: "Social Sciences",
    level: "undergraduate",
  },
  { name: "Undeclared", category: "Other", level: "undergraduate" },
];

// BRAND-COMPLIANT TRANSITIONS - CORRECTED TIMING
const transitions = {
  micro: { duration: 0.09, ease: "easeOut" }, // 90ms for micro-interactions
  content: { duration: 0.22, ease: "easeOut" }, // 220ms for content
};

const hiveWords = ["campus", "community", "network", "home"];

// --- TYPES ---
export interface OnboardingData {
  readonly email: string;
  readonly fullName: string;
  readonly preferredName: string;
  readonly major: string;
  readonly gradYear: number;
  readonly handle: string;
  readonly isBuilder: boolean;
  readonly builderRole?: string;
  readonly interests: readonly string[];
  readonly avatarUrl: string;
  readonly legalAccepted: boolean;
}

export interface OnboardingProps {
  readonly onComplete: (data: OnboardingData) => void;
  readonly onStepChange?: (step: number) => void;
  readonly initialData: Partial<OnboardingData>;
  // Example of a function prop to check handle availability
  readonly isHandleAvailable?: (handle: string) => Promise<boolean>;
}

// --- Progress Bar Component ---
function ProgressBar({
  currentStep,
  totalSteps,
}: {
  readonly currentStep: number;
  readonly totalSteps: number;
}) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-[#2A2A2A] h-1 rounded-full overflow-hidden mb-6">
      <motion.div
        className="h-full bg-[#FFD700] rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={transitions.content}
      />
    </div>
  );
}

// --- Step Header Component ---
function StepHeader({
  currentStep,
  totalSteps,
  title,
}: {
  readonly currentStep: number;
  readonly totalSteps: number;
  readonly title: string;
}) {
  return (
    <div className="text-center mb-8">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <div className="text-sm text-[#6B7280] mb-2">
        Step {currentStep} of {totalSteps}
      </div>
      <h2 className="font-display text-2xl font-light text-white">{title}</h2>
    </div>
  );
}

// --- Canvas: The Main Container ---
function OnboardingCanvas({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-md bg-[#111111] border-[#2A2A2A] shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-10">{children}</div>
      </Card>
    </div>
  );
}

// --- Step 1: Opening ---
function StepOpening({ onNext }: { readonly onNext: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % hiveWords.length);
    }, 2200);
    const buttonTimer = setTimeout(() => setShowButton(true), 1500);
    return () => {
      clearInterval(wordTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transitions.content}
      className="text-center flex flex-col items-center justify-center space-y-10 min-h-[360px]"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ ...transitions.content, delay: 0.1 }}
      >
        <HiveLogo variant="white" size="lg" />
      </motion.div>

      <div className="space-y-3">
        <h1 className="font-display text-4xl font-light text-white tracking-tight">
          HIVE
        </h1>
        <div className="font-sans text-lg text-[#6B7280] h-8 flex items-center justify-center">
          Finally, your&nbsp;
          <div className="relative w-[120px] text-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={transitions.content}
                className="absolute inset-0 text-[#FFD700] font-medium text-left"
              >
                {hiveWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="h-14">
        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...transitions.content, delay: 0.2 }}
            >
              <Button
                onClick={onNext}
                size="lg"
                variant="outline"
                className="border border-[#FFD700] text-[#FFD700] bg-transparent hover:bg-[#FFD700] hover:text-[#0A0A0A] font-medium"
              >
                Enter HIVE
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// --- Step 2: Name Collection ---
function StepNameCollection({
  onNext,
  onBack,
  initialData,
}: {
  readonly onNext: (data: { fullName: string; preferredName: string }) => void;
  readonly onBack: () => void;
  readonly initialData: Partial<OnboardingData>;
}) {
  const generateFullNameFromEmail = (email: string): string => {
    if (!email) return "";
    const localPart = email.split("@")[0];
    return localPart
      .replace(/[._-]/g, " ")
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1))
      .join(" ");
  };

  const [fullName, setFullName] = useState(
    initialData.fullName || generateFullNameFromEmail(initialData.email || "")
  );
  const [preferredName, setPreferredName] = useState(
    initialData.preferredName || ""
  );

  const handleNext = () => {
    if (fullName.trim()) {
      onNext({
        fullName,
        preferredName: preferredName || fullName.split(" ")[0],
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={transitions.content}
      className="flex flex-col space-y-8 min-h-[360px]"
    >
      <StepHeader
        currentStep={1}
        totalSteps={6}
        title="What should we call you?"
      />

      <div className="space-y-4">
        <div>
          <Label
            htmlFor="fullName"
            className="text-sm font-medium text-[#A1A1AA]"
          >
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            placeholder="e.g., Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1"
            autoFocus
          />
        </div>
        <div>
          <Label
            htmlFor="preferredName"
            className="text-sm font-medium text-[#A1A1AA]"
          >
            Preferred Name (Optional)
          </Label>
          <Input
            id="preferredName"
            type="text"
            placeholder="e.g., Janey"
            value={preferredName}
            onChange={(e) => setPreferredName(e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex-grow" />

      <div className="flex space-x-4">
        <Button onClick={onBack} variant="outline" size="lg" className="w-1/3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          className="w-2/3"
          disabled={!fullName.trim()}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- Step 3: Academics ---
function StepAcademics({
  onNext,
  onBack,
}: {
  readonly onNext: (data: { major: string; gradYear: number }) => void;
  readonly onBack: () => void;
}) {
  const [major, setMajor] = useState("");
  const [gradYear, setGradYear] = useState<number | undefined>(undefined);
  const [filteredMajors, setFilteredMajors] = useState<typeof majors>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const currentYear = new Date().getFullYear();
  const gradYears = Array.from({ length: 8 }, (_, i) => currentYear + i - 2);

  const handleMajorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMajor(value);
    if (value) {
      setFilteredMajors(
        majors.filter((m) => m.name.toLowerCase().includes(value.toLowerCase()))
      );
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectMajor = (selectedMajor: string) => {
    setMajor(selectedMajor);
    setShowSuggestions(false);
  };

  const handleNext = () => {
    if (major && gradYear) {
      onNext({ major, gradYear });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={transitions.content}
      className="flex flex-col space-y-8 min-h-[360px]"
    >
      <StepHeader
        currentStep={2}
        totalSteps={6}
        title="Tell us about your studies"
      />

      <div className="space-y-4">
        <div className="relative">
          <Label htmlFor="major" className="text-sm font-medium text-[#A1A1AA]">
            Major
          </Label>
          <Input
            id="major"
            type="text"
            placeholder="e.g., Computer Science"
            value={major}
            onChange={handleMajorChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="mt-1"
          />
          {showSuggestions && filteredMajors.length > 0 && (
            <Card className="absolute z-10 w-full mt-1 bg-[#1A1A1A] border-[#2A2A2A] max-h-48 overflow-y-auto">
              {filteredMajors.slice(0, 5).map((m) => (
                <div
                  key={m.name}
                  className="p-2 text-white hover:bg-[#2A2A2A] cursor-pointer"
                  onMouseDown={() => selectMajor(m.name)}
                >
                  {m.name}
                </div>
              ))}
            </Card>
          )}
        </div>

        <div>
          <Label
            htmlFor="gradYear"
            className="text-sm font-medium text-[#A1A1AA]"
          >
            Graduation Year
          </Label>
          <Select
            onValueChange={(val: string) => setGradYear(Number(val))}
            defaultValue={gradYear?.toString()}
          >
            <SelectTrigger id="gradYear" className="mt-2">
              <SelectValue placeholder="Select year..." />
            </SelectTrigger>
            <SelectContent>
              {gradYears.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex-grow" />

      <div className="flex space-x-4">
        <Button onClick={onBack} variant="outline" size="lg" className="w-1/3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          className="w-2/3"
          disabled={!major || !gradYear}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- Step 4: Builder Role ---
function StepBuilderRole({
  onNext,
  onBack,
}: {
  readonly onNext: (data: { isBuilder: boolean; builderRole?: string }) => void;
  readonly onBack: () => void;
}) {
  const [isBuilder, setIsBuilder] = useState(false);
  const [builderRole, setBuilderRole] = useState("");

  const handleNext = () => {
    onNext({ isBuilder, builderRole: isBuilder ? builderRole : undefined });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={transitions.content}
      className="flex flex-col space-y-8 min-h-[360px]"
    >
      <StepHeader currentStep={3} totalSteps={6} title="Are you a builder?" />

      <div className="space-y-4">
        <p className="text-sm text-[#A1A1AA] text-center">
          Builders get access to exclusive tools and communities. Are you a
          creator, founder, engineer, or designer?
        </p>
        <div className="flex space-x-4">
          <Button
            onClick={() => setIsBuilder(true)}
            variant={isBuilder ? "default" : "outline"}
            className="flex-1"
          >
            Yes, I'm a builder
          </Button>
          <Button
            onClick={() => setIsBuilder(false)}
            variant={!isBuilder ? "default" : "outline"}
            className="flex-1"
          >
            No, not right now
          </Button>
        </div>

        <AnimatePresence>
          {isBuilder && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="mt-4">
                <Label
                  htmlFor="builderRole"
                  className="text-sm font-medium text-[#A1A1AA]"
                >
                  What kind of builder are you? (Optional)
                </Label>
                <Input
                  id="builderRole"
                  type="text"
                  placeholder="e.g., Founder, iOS Developer, UI/UX Designer"
                  value={builderRole}
                  onChange={(e) => setBuilderRole(e.target.value)}
                  className="mt-1"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-grow" />

      <div className="flex space-x-4">
        <Button onClick={onBack} variant="outline" size="lg" className="w-1/3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext} size="lg" className="w-2/3">
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- Step 5: Handle ---
function StepHandle({
  onNext,
  onBack,
  isHandleAvailable,
}: {
  readonly onNext: (data: { handle: string }) => void;
  readonly onBack: () => void;
  readonly isHandleAvailable?: (handle: string) => Promise<boolean>;
}) {
  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState<
    "idle" | "typing" | "checking" | "available" | "unavailable"
  >("idle");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const checkAvailability = useCallback(
    async (h: string) => {
      if (!isHandleAvailable) {
        setStatus("available"); // Default to available if no checker is provided
        return;
      }
      setStatus("checking");
      const available = await isHandleAvailable(h);
      setStatus(available ? "available" : "unavailable");
    },
    [isHandleAvailable]
  );

  const handleHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setHandle(value);
    setStatus("typing");

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (value.length > 2) {
      debounceTimeout.current = setTimeout(() => {
        void checkAvailability(value);
      }, 500);
    }
  };

  const handleNext = () => {
    if (handle && status === "available") {
      onNext({ handle });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={transitions.content}
      className="flex flex-col space-y-8 min-h-[360px]"
    >
      <StepHeader currentStep={4} totalSteps={6} title="Claim your handle" />

      <div className="space-y-1">
        <div className="relative">
          <Input
            id="handle"
            type="text"
            placeholder="your_handle"
            value={handle}
            onChange={handleHandleChange}
            className={`pr-10 ${
              status === "available" ? "border-green-500" : ""
            } ${status === "unavailable" ? "border-red-500" : ""}`}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {status === "checking" && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            )}
            {status === "available" && (
              <Check className="h-5 w-5 text-green-500" />
            )}
            {status === "unavailable" && (
              <span className="text-red-500">!</span>
            )}
          </div>
        </div>
        <p className="text-xs text-[#A1A1AA] px-1">
          {status === "unavailable"
            ? "This handle is taken."
            : "Unique handles help people find you."}
        </p>
      </div>

      <div className="flex-grow" />

      <div className="flex space-x-4">
        <Button onClick={onBack} variant="outline" size="lg" className="w-1/3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          className="w-2/3"
          disabled={status !== "available"}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- Step 6: Interests ---
function StepInterests({
  onNext,
  onBack,
}: {
  readonly onNext: (data: { interests: readonly string[] }) => void;
  readonly onBack: () => void;
}) {
  const allInterests = [
    "Technology",
    "Startups",
    "Design",
    "Art",
    "Music",
    "Gaming",
    "Writing",
    "Reading",
    "Photography",
    "Film",
    "Fashion",
    "Sports",
    "Fitness",
    "Cooking",
    "Travel",
    "Science",
    "History",
    "Politics",
  ];
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    onNext({ interests: selectedInterests });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={transitions.content}
      className="flex flex-col space-y-8 min-h-[360px]"
    >
      <StepHeader currentStep={5} totalSteps={6} title="What are you into?" />

      <div className="flex flex-wrap gap-2">
        {allInterests.map((interest) => (
          <Button
            key={interest}
            variant={
              selectedInterests.includes(interest) ? "default" : "outline"
            }
            onClick={() => toggleInterest(interest)}
            size="sm"
          >
            {interest}
          </Button>
        ))}
      </div>

      <div className="flex-grow" />

      <div className="flex space-x-4">
        <Button onClick={onBack} variant="outline" size="lg" className="w-1/3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          size="lg"
          className="w-2/3"
          disabled={selectedInterests.length < 3}
        >
          Continue (Pick {Math.max(0, 3 - selectedInterests.length)} more)
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- Step 7: Profile Photo ---
function StepProfilePhoto({
  onNext,
  onBack,
}: {
  readonly onNext: (data: { avatarUrl: string }) => void;
  readonly onBack: () => void;
}) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this file and get a URL.
      // For now, we'll just use a local object URL.
      const url = URL.createObjectURL(file);
      setAvatarUrl(url);
    }
  };

  const handleSkip = () => {
    onNext({ avatarUrl: "" });
  };

  const handleContinue = () => {
    onNext({ avatarUrl });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={transitions.content}
      className="flex flex-col space-y-8 min-h-[360px] items-center"
    >
      <StepHeader currentStep={6} totalSteps={6} title="Add a profile photo" />

      <div
        className="relative w-32 h-32 rounded-full bg-[#2A2A2A] flex items-center justify-center cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Avatar className="w-full h-full">
          <AvatarImage src={avatarUrl} alt="Profile Photo" />
          <AvatarFallback>
            <User className="w-12 h-12 text-[#6B7280]" />
          </AvatarFallback>
        </Avatar>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 hover:opacity-100 transition-opacity">
          <Upload className="w-8 h-8 text-white" />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoUpload}
        />
      </div>

      <div className="flex-grow" />

      <div className="w-full flex space-x-4">
        <Button onClick={onBack} variant="outline" size="lg" className="w-1/3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="w-2/3 flex space-x-4">
          <Button
            onClick={handleSkip}
            variant="link"
            size="lg"
            className="flex-1"
          >
            Skip for now
          </Button>
          <Button
            onClick={handleContinue}
            size="lg"
            className="flex-1"
            disabled={!avatarUrl}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Final Step: Welcome & Legal ---
function StepFinalWelcome({
  onComplete,
  onBack,
}: {
  readonly onComplete: (data: { legalAccepted: boolean }) => void;
  readonly onBack: () => void;
}) {
  const [legalAccepted, setLegalAccepted] = useState(false);

  const handleComplete = () => {
    if (legalAccepted) {
      onComplete({ legalAccepted });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={transitions.content}
      className="flex flex-col items-center space-y-8 min-h-[360px] text-center"
    >
      <Sparkles className="w-12 h-12 text-[#FFD700]" />
      <h2 className="font-display text-3xl font-light text-white">
        You're all set!
      </h2>
      <p className="text-[#A1A1AA] max-w-sm">
        One last step. Please review and accept our terms to officially join the
        Hive.
      </p>

      <div className="flex items-center space-x-2 pt-4">
        <Checkbox
          checked={legalAccepted}
          onCheckedChange={(checked) => setLegalAccepted(Boolean(checked))}
        />
        <Label htmlFor="legal" className="text-sm text-white">
          I agree to the{" "}
          <a
            href="/legal/terms"
            target="_blank"
            className="underline text-[#FFD700]"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/legal/privacy"
            target="_blank"
            className="underline text-[#FFD700]"
          >
            Privacy Policy
          </a>
          .
        </Label>
      </div>

      <div className="flex-grow" />

      <div className="w-full flex space-x-4">
        <Button onClick={onBack} variant="outline" size="lg" className="w-1/3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleComplete}
          size="lg"
          className="w-2/3 bg-green-600 hover:bg-green-700"
          disabled={!legalAccepted}
        >
          Complete Onboarding
          <Check className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
}

// --- MAIN ONBOARDING COMPONENT ---
export function HiveOnboardingV3({
  onComplete,
  onStepChange,
  initialData,
  isHandleAvailable,
}: OnboardingProps) {
  const [step, setStep] = useState(0); // 0 is the opening screen
  const [formData, setFormData] = useState<Partial<OnboardingData>>(
    initialData || {}
  );

  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  const handleNext = (data = {}) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const handleCompleteOnboarding = (data = {}) => {
    const finalData = { ...formData, ...data } as OnboardingData;
    onComplete(finalData);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepOpening onNext={() => setStep(1)} />;
      case 1:
        return (
          <StepNameCollection
            onNext={handleNext}
            onBack={handleBack}
            initialData={formData}
          />
        );
      case 2:
        return <StepAcademics onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepBuilderRole onNext={handleNext} onBack={handleBack} />;
      case 4:
        return (
          <StepHandle
            onNext={handleNext}
            onBack={handleBack}
            isHandleAvailable={isHandleAvailable}
          />
        );
      case 5:
        return <StepInterests onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <StepProfilePhoto onNext={handleNext} onBack={handleBack} />;
      case 7:
        return (
          <StepFinalWelcome
            onComplete={handleCompleteOnboarding}
            onBack={handleBack}
          />
        );
      default:
        return <StepOpening onNext={() => setStep(1)} />;
    }
  };

  return (
    <OnboardingCanvas>
      <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
    </OnboardingCanvas>
  );
}
