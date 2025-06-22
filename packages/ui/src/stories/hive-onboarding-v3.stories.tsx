"use client";

import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Button,
  Card,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@hive/ui";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { HiveLogo } from "@hive/ui";
// import { getMajorNames } from "@hive/core/constants/majors"; // Removed due to import issues

// BRAND-COMPLIANT TRANSITIONS - CORRECTED TIMING
const transitions = {
  micro: { duration: 0.09, ease: "easeOut" }, // 90ms for micro-interactions
  content: { duration: 0.22, ease: "easeOut" }, // 220ms for content
};

const hiveWords = ["campus", "community", "network", "home"];

// --- Progress Bar Component ---
function ProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
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
  currentStep: number;
  totalSteps: number;
  title: string;
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
function OnboardingCanvas({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 font-sans">
      <Card className="w-full max-w-md bg-[#111111] border-[#2A2A2A] shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-10">{children}</div>
      </Card>
    </div>
  );
}

// --- Step 1: Opening ---
function StepOpening({ onNext }: { onNext: () => void }) {
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

// --- Step 2: Gateway (Email) ---
function StepGateway({
  onNext,
  onBack,
}: {
  onNext: (email: string) => void;
  onBack: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "typing" | "validating" | "valid" | "invalid"
  >("idle");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setEmail(value);
    setStatus("typing");
    if (!value.includes("@") || !value.includes(".edu")) {
      setStatus("invalid");
    } else {
      setStatus("valid");
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-center space-y-8 min-h-[360px]">
      <h2 className="font-display text-2xl font-light text-white">
        Welcome to campus
      </h2>
      <p className="text-sm text-[#6B7280] max-w-xs">
        Enter your .edu email to verify your identity and join your
        university&apos;s private network.
      </p>

      <div className="w-full max-w-sm space-y-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="your.name@university.edu"
            value={email}
            onChange={handleEmailChange}
            className={`w-full text-center text-base bg-[#111111] border-[#2A2A2A] text-white placeholder:text-[#6B7280] h-12 transition-colors duration-[90ms] ${
              status === "valid" ? "border-[#FFD700]" : ""
            }`}
            autoFocus
          />
        </div>

        <div className="h-14">
          <AnimatePresence>
            {status === "valid" && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={transitions.content}
              >
                <Button
                  onClick={() => onNext(email)}
                  size="lg"
                  variant="secondary"
                  className="w-full border border-[#FFD700] text-[#FFD700] bg-transparent hover:bg-[#FFD700] hover:text-[#0A0A0A] font-medium"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// --- Step 3: Name Collection ---
function StepNameCollection({
  onNext,
  onBack,
  email,
}: {
  onNext: (data: { fullName: string; preferredName: string }) => void;
  onBack: () => void;
  email: string;
}) {
  // Auto-generate full name from email
  const generateFullNameFromEmail = (email: string): string => {
    const localPart = email.split("@")[0];
    // Handle common email patterns like jane.doe, j.doe, jane_doe
    const nameParts = localPart
      .replace(/[._]/g, " ")
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .filter((part) => part.length > 1); // Filter out single letters

    return nameParts.join(" ");
  };

  const [fullName, setFullName] = useState(generateFullNameFromEmail(email));
  const [preferredName, setPreferredName] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(fullName.trim().length >= 2);
  }, [fullName]);

  const handleNext = () => {
    if (isValid) {
      onNext({
        fullName: fullName.trim(),
        preferredName: preferredName.trim(),
      });
    }
  };

  return (
    <div className="space-y-8 min-h-[360px]">
      <StepHeader
        currentStep={3}
        totalSteps={9}
        title="What should we call you?"
      />

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFullName(e.target.value)
            }
            className="w-full text-base bg-[#111111] border-[#2A2A2A] text-white placeholder:text-[#6B7280] h-12 transition-colors duration-[90ms] focus:border-[#FFD700]"
            placeholder="Jane Doe"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Preferred Name <span className="text-[#6B7280]">(optional)</span>
          </label>
          <Input
            type="text"
            value={preferredName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPreferredName(e.target.value)
            }
            className="w-full text-base bg-[#111111] border-[#2A2A2A] text-white placeholder:text-[#6B7280] h-12 transition-colors duration-[90ms] focus:border-[#FFD700]"
            placeholder="What should we call you?"
          />
          <p className="text-sm text-[#6B7280] mt-2">
            This is how you&apos;ll appear to other students
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#2A2A2A] text-[#6B7280] hover:border-[#FFD700] hover:text-[#FFD700]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className={`flex-1 transition-all duration-200 ${
            isValid
              ? "bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFD700]/90"
              : "bg-[#2A2A2A] text-[#6B7280] cursor-not-allowed"
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// --- Step 4: Academic Information ---
function StepAcademics({
  onNext,
  onBack,
}: {
  onNext: (data: { major: string; gradYear: number }) => void;
  onBack: () => void;
}) {
  const [major, setMajor] = useState("");
  const [gradYear, setGradYear] = useState<number | null>(null);
  const [majorSuggestions, setMajorSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isValid, setIsValid] = useState(false);

  // Comprehensive University at Buffalo majors database
  const commonMajors = [
    // Undergraduate (Bachelor's) Programs - ~90 programs
    "Accounting",
    "Acting",
    "Aerospace Engineering",
    "African American Studies",
    "American Studies",
    "Anthropology",
    "Architecture",
    "Art",
    "Art History",
    "Asian Studies",
    "Biochemistry",
    "Bioinformatics & Computational Biology",
    "Biological Sciences",
    "Biomedical Engineering",
    "Biomedical Sciences",
    "Biotechnology",
    "Business Administration",
    "Chemical Engineering",
    "Chemistry",
    "Civil Engineering",
    "Classics",
    "Cognitive Science",
    "Communication",
    "Computational Linguistics",
    "Computational Physics",
    "Computer Engineering",
    "Computer Science",
    "Criminology",
    "Dance",
    "Economics",
    "Electrical Engineering",
    "Engineering Physics",
    "Engineering Science",
    "English",
    "Environmental Design",
    "Environmental Engineering",
    "Environmental Science",
    "Environmental Studies",
    "Environmental Sustainability",
    "Exercise Science",
    "Film Studies",
    "French",
    "Geographic Information Science",
    "Geography",
    "Geological Sciences",
    "German",
    "Global Affairs",
    "Global Gender Studies",
    "Health and Human Services",
    "History",
    "Indigenous Studies",
    "Industrial Engineering",
    "Information Technology and Management",
    "International Studies",
    "International Trade",
    "Italian",
    "Jewish Studies",
    "Law",
    "Legal Studies",
    "Linguistics",
    "Materials Science and Engineering",
    "Mathematics",
    "Mechanical Engineering",
    "Media Study",
    "Medical Laboratory Science",
    "Music",
    "Music Theatre",
    "Neuroscience",
    "Nuclear Medicine Technology",
    "Nursing",
    "Nursing (RN-to-BS)",
    "Nutrition Science",
    "Occupational Therapy",
    "Pharmaceutical Sciences",
    "Pharmacology & Toxicology",
    "Pharmacy",
    "Philosophy",
    "Philosophy, Politics & Economics",
    "Physics",
    "Political Science",
    "Psychology",
    "Public Health",
    "Sociology",
    "Spanish",
    "Special Studies",
    "Speech & Hearing Science",
    "Statistics",
    "Theatre",
    "Theatre Design/Technology",
    "Urban & Public Policy Studies",

    // Master's Programs - 184 programs (key ones)
    "Accounting (MS)",
    "Aerospace Engineering (MS)",
    "American Studies (MA)",
    "Anthropology (MA)",
    "Architecture (MArch)",
    "Arts Management (MA)",
    "Athletic Training (MS)",
    "Biochemistry (MS)",
    "Bioinformatics & Biostatistics (MS)",
    "Biological Sciences (MS)",
    "Biomedical Engineering (MS)",
    "Biomedical Informatics (MS)",
    "Biomedical Sciences (MS)",
    "Biostatistics (MS)",
    "Biotechnology (MS)",
    "Business Administration (MBA)",
    "Business Analytics (MS)",
    "Cancer Sciences (MS)",
    "Chemical Engineering (MS)",
    "Chemistry (MS)",
    "Childhood Education (MS)",
    "Civil Engineering (MS)",
    "Clinical & Translational Therapeutics (MS)",
    "Clinical Nutrition (MS)",
    "Communication (MA)",
    "Communicative Disorders & Sciences (MA)",
    "Community Health & Health Behavior (MPH)",
    "Comparative Literature (MA)",
    "Computational & Applied Mathematics (MS)",
    "Computational Cell Biology, Anatomy & Pathology (MS)",
    "Computational Earth Science (MS)",
    "Computational Linguistics (MA)",
    "Computer Science & Engineering (MS)",
    "Criminology (MA)",
    "Critical Museum Studies (MA)",
    "Dance (MFA)",
    "Data Analytics in the Social Sciences (MA)",
    "Data Sciences & Applications (MPS)",
    "Drugs, Health & Society (MA)",
    "Econometrics & Quantitative Economics (MS)",
    "Economics (MA)",
    "Educational Data Science (MS)",
    "Electrical Engineering (MS)",
    "Engineering Management (MS)",
    "Engineering Science (MS)",
    "English (MA)",
    "Environmental & Water Resources Engineering (MS)",
    "Environmental Health Sciences (MPH)",
    "Epidemiology (MPH)",
    "Evolution, Ecology & Behavior (MS)",
    "Exercise Science (MS)",
    "Finance (MS)",
    "Fine Arts (MFA)",
    "French Language & Literature (MA)",
    "Genetic Counseling (MS)",
    "Genetics, Genomics & Bioinformatics (MS)",
    "Geographic Information Science (MS)",
    "Geography (MA)",
    "Geological Sciences (MS)",
    "Global Affairs (MA)",
    "Global Gender Studies (MA)",
    "Higher Education & Student Affairs (MA)",
    "Humanities Interdisciplinary (MA)",
    "Industrial Engineering (MS)",
    "Information & Library Science (MS)",
    "International Development & Global Health (MA)",
    "International Trade (MA)",
    "Jewish Thought (MA)",
    "Linguistics (MA)",
    "Management (MS)",
    "Management Science (MBA)",
    "Materials Design & Innovation (MS)",
    "Mathematics (MS)",
    "Mechanical Engineering (MS)",
    "Media Arts & Sciences (MS)",
    "Media Arts Production (MFA)",
    "Medical Anatomy & Experimental Pathology (MS)",
    "Medical Physics (MS)",
    "Medicinal Chemistry (MS)",
    "Microbiology & Immunology (MS)",
    "Music Composition (MM)",
    "Music History (MA)",
    "Music Performance (MM)",
    "Music Theory (MA)",
    "Neuroscience (MS)",
    "Nutrition (MS)",
    "Online Professional MBA",
    "Oral Sciences (MS)",
    "Orthodontics (MS)",
    "Pharmaceutical Sciences (MS)",
    "Pharmacology (MS)",
    "Pharmacometrics & Personalized Pharmacotherapy (MS)",
    "Physics Education (MS)",
    "Public Health (MPH)",
    "Real Estate Development (MS)",
    "Rehabilitation Counseling (MS)",
    "Rehabilitation Science (MS)",
    "School Counseling (MS)",
    "School Librarianship (MS)",
    "Social Science–Interdisciplinary (MA)",
    "Social Work (MSW)",
    "Spanish Language & Literature (MA)",
    "Structural Biology (MS)",
    "Supply Chain Management (MS)",
    "Sustainability Leadership (MS)",
    "Sustainable Transportation & Logistics (MS)",
    "Teaching English to Speakers of Other Languages (MA)",
    "Theatre Performance (MFA)",
    "Urban Planning (MUP)",

    // PhD Programs - 99 programs (key ones)
    "Aerospace Engineering (PhD)",
    "American Studies (PhD)",
    "Anthropology (PhD)",
    "Biochemistry (PhD)",
    "Biological Sciences (PhD)",
    "Biomedical Engineering (PhD)",
    "Biomedical Informatics (PhD)",
    "Biostatistics (PhD)",
    "Cancer Sciences (PhD)",
    "Chemical Engineering (PhD)",
    "Chemistry (PhD)",
    "Civil Engineering (PhD)",
    "Classics (PhD)",
    "Communication (PhD)",
    "Communicative Disorders & Sciences (PhD)",
    "Community Health & Health Behavior (PhD)",
    "Comparative Literature (PhD)",
    "Computational & Data-Enabled Sciences (PhD)",
    "Computational Cell Biology, Anatomy & Pathology (PhD)",
    "Computer Science & Engineering (PhD)",
    "Counseling/School Psychology (PhD)",
    "Curriculum, Instruction & the Science of Learning (PhD)",
    "Economics (PhD)",
    "Educational Administration (PhD)",
    "Educational Culture, Policy & Society (PhD)",
    "Educational Data Science (PhD)",
    "Electrical Engineering (PhD)",
    "Engineering Education (PhD)",
    "English (PhD)",
    "Environmental & Water Resources Engineering (PhD)",
    "Epidemiology (PhD)",
    "Evolution, Ecology & Behavior (PhD)",
    "Exercise Science (PhD)",
    "Genetics, Genomics & Bioinformatics (PhD)",
    "Geography (PhD)",
    "Geological Sciences (PhD)",
    "Global Gender Studies (PhD)",
    "Higher Education (PhD)",
    "Historical Musicology & Music Theory (PhD)",
    "History (PhD)",
    "Industrial Engineering (PhD)",
    "Information Science (PhD)",
    "Language Education & Multilingualism (PhD)",
    "Linguistics (PhD)",
    "Management - Accounting (PhD)",
    "Management - Finance (PhD)",
    "Management - Management Science & Systems (PhD)",
    "Management - Marketing (PhD)",
    "Management - Operations Management & Strategy (PhD)",
    "Materials Design & Innovation (PhD)",
    "Mathematics (PhD)",
    "Mechanical Engineering (PhD)",
    "Media Study (PhD)",
    "Medicinal Chemistry (PhD)",
    "Microbiology & Immunology (PhD)",
    "Music Composition (PhD)",
    "Neuroscience (PhD)",
    "Nursing (PhD)",
    "Nutrition Science (PhD)",
    "Oral Biology (PhD)",
    "Pharmaceutical Sciences (PhD)",
    "Pharmacology (PhD)",
    "Philosophy (PhD)",
    "Physics (PhD)",
    "Physiology (PhD)",
    "Political Science (PhD)",
    "Psychology - Behavioral Neuroscience (PhD)",
    "Psychology - Clinical (PhD)",
    "Psychology - Cognitive (PhD)",
    "Psychology - Social-Personality (PhD)",
    "Rehabilitation Science (PhD)",
    "Social Welfare (PhD)",
    "Sociology (PhD)",
    "Spanish Language & Literature (PhD)",
    "Structural Biology (PhD)",
    "Theatre Performance (PhD)",
    "Urban & Regional Planning (PhD)",
  ];

  // Generate graduation years (current year + 6 years)
  const currentYear = new Date().getFullYear();
  const graduationYears = Array.from({ length: 7 }, (_, i) => currentYear + i);

  useEffect(() => {
    setIsValid(major.trim().length >= 2 && gradYear !== null);
  }, [major, gradYear]);

  const handleMajorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMajor(value);

    if (value.length >= 1) {
      const filtered = commonMajors
        .filter((m) => m.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setMajorSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const selectMajor = (selectedMajor: string) => {
    setMajor(selectedMajor);
    setShowSuggestions(false);
  };

  const handleNext = () => {
    if (isValid && gradYear) {
      onNext({ major: major.trim(), gradYear });
    }
  };

  return (
    <div className="space-y-8 min-h-[360px]">
      <StepHeader
        currentStep={4}
        totalSteps={9}
        title="Tell us about your studies"
      />

      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-white mb-2">
            Major *
          </label>
          <Input
            type="text"
            value={major}
            onChange={handleMajorChange}
            onFocus={() => {
              if (major.length >= 1 && majorSuggestions.length > 0) {
                setShowSuggestions(true);
              }
            }}
            onBlur={() => {
              // Delay hiding suggestions to allow clicking
              setTimeout(() => setShowSuggestions(false), 150);
            }}
            className="w-full text-base bg-[#111111] border-[#2A2A2A] text-white placeholder:text-[#6B7280] h-12 transition-colors duration-[90ms] focus:border-[#FFD700]"
            placeholder="Computer Science, Psychology, etc."
            autoFocus
          />

          {showSuggestions && majorSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-[#111111] border border-[#2A2A2A] rounded-md shadow-lg max-h-40 overflow-y-auto">
              {majorSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors duration-90"
                  onMouseDown={(e) => {
                    e.preventDefault(); // Prevent input blur
                    selectMajor(suggestion);
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Expected Graduation *
          </label>
          <Select
            onValueChange={(value: string) => setGradYear(parseInt(value))}
          >
            <SelectTrigger className="w-full h-12 bg-[#111111] border-[#2A2A2A] text-white focus:border-[#FFD700]">
              <SelectValue placeholder="Select graduation year" />
            </SelectTrigger>
            <SelectContent className="bg-[#111111] border-[#2A2A2A]">
              {graduationYears.map((year) => (
                <SelectItem
                  key={year}
                  value={year.toString()}
                  className="text-white hover:bg-[#2A2A2A] focus:bg-[#2A2A2A]"
                >
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#2A2A2A] text-[#6B7280] hover:border-[#FFD700] hover:text-[#FFD700]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className={`flex-1 transition-all duration-200 ${
            isValid
              ? "bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFD700]/90"
              : "bg-[#2A2A2A] text-[#6B7280] cursor-not-allowed"
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// --- Step 5: Builder Role ---
function StepBuilderRole({
  onNext,
  onBack,
}: {
  onNext: (data: { isBuilder: boolean; builderRole?: string }) => void;
  onBack: () => void;
}) {
  const [isBuilder, setIsBuilder] = useState<boolean | null>(null);
  const [builderRole, setBuilderRole] = useState("");
  const [isValid, setIsValid] = useState(false);

  const builderRoles = [
    "Resident Assistant (RA)",
    "Club Officer",
    "Greek Life Leader",
    "Student Government",
    "Orientation Leader",
    "Teaching Assistant",
    "Research Assistant",
    "Campus Tour Guide",
    "Peer Mentor",
    "Event Coordinator",
    "Other Leadership Role",
  ];

  useEffect(() => {
    if (isBuilder === false) {
      setIsValid(true);
    } else if (isBuilder === true && builderRole.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isBuilder, builderRole]);

  const handleNext = () => {
    if (isValid) {
      onNext({
        isBuilder: isBuilder!,
        builderRole: isBuilder ? builderRole : undefined,
      });
    }
  };

  return (
    <div className="space-y-8 min-h-[360px]">
      <StepHeader currentStep={5} totalSteps={9} title="Are you a Builder?" />

      <div className="space-y-6">
        <div className="text-center space-y-3">
          <p className="text-[#6B7280] text-sm">
            Builders help shape campus life and unlock special tools in HIVE
          </p>
        </div>

        {/* Yes/No Selection */}
        <div className="space-y-3">
          <button
            onClick={() => {
              setIsBuilder(true);
              setBuilderRole("");
            }}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              isBuilder === true
                ? "border-[#FFD700] bg-[#FFD700]/10"
                : "border-[#2A2A2A] hover:border-[#FFD700]/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Yes, I'm a Builder</div>
                <div className="text-[#6B7280] text-sm">
                  I have a leadership role on campus
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                  isBuilder === true
                    ? "border-[#FFD700] bg-[#FFD700]"
                    : "border-[#2A2A2A]"
                }`}
              >
                {isBuilder === true && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#0A0A0A] rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              setIsBuilder(false);
              setBuilderRole("");
            }}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              isBuilder === false
                ? "border-[#FFD700] bg-[#FFD700]/10"
                : "border-[#2A2A2A] hover:border-[#FFD700]/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">No, I'm a Student</div>
                <div className="text-[#6B7280] text-sm">
                  I'm here to discover and participate
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-200 ${
                  isBuilder === false
                    ? "border-[#FFD700] bg-[#FFD700]"
                    : "border-[#2A2A2A]"
                }`}
              >
                {isBuilder === false && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-[#0A0A0A] rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>

        {/* Builder Role Selection */}
        {isBuilder === true && (
          <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
            <label className="block text-sm font-medium text-white">
              What's your leadership role? *
            </label>
            <Select onValueChange={(value: string) => setBuilderRole(value)}>
              <SelectTrigger className="w-full h-12 bg-[#111111] border-[#2A2A2A] text-white focus:border-[#FFD700]">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent className="bg-[#111111] border-[#2A2A2A]">
                {builderRoles.map((role) => (
                  <SelectItem
                    key={role}
                    value={role}
                    className="text-white hover:bg-[#2A2A2A] focus:bg-[#2A2A2A]"
                  >
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-[#6B7280]">
              This helps us unlock the right tools and permissions for you
            </p>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#2A2A2A] text-[#6B7280] hover:border-[#FFD700] hover:text-[#FFD700]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className={`flex-1 transition-all duration-200 ${
            isValid
              ? "bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFD700]/90"
              : "bg-[#2A2A2A] text-[#6B7280] cursor-not-allowed"
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// --- Step 6: Handle Selection ---
function StepHandle({
  onNext,
  onBack,
}: {
  onNext: (data: { handle: string }) => void;
  onBack: () => void;
}) {
  const [handle, setHandle] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const validHandle = /^[a-zA-Z0-9_]{3,20}$/.test(handle);
    setIsValid(validHandle && handle.length >= 3);
  }, [handle]);

  const handleNext = () => {
    if (isValid) {
      setIsChecking(true);
      // Simulate handle availability check
      setTimeout(() => {
        setIsChecking(false);
        onNext({ handle });
      }, 1000);
    }
  };

  return (
    <div className="space-y-8 min-h-[360px]">
      <StepHeader currentStep={6} totalSteps={9} title="Choose Your Handle" />

      <div className="space-y-6">
        <div className="text-center space-y-3">
          <p className="text-[#6B7280] text-sm">
            This is your unique identifier in HIVE (not visible to other
            students yet)
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Handle *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]">
                @
              </span>
              <Input
                value={handle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setHandle(e.target.value)
                }
                placeholder="yourhandle"
                className="pl-8 h-12 bg-[#111111] border-[#2A2A2A] text-white focus:border-[#FFD700]"
                maxLength={20}
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <p className="text-xs text-[#6B7280]">
                {handle.length}/20 characters
              </p>
              {handle.length > 0 && (
                <p
                  className={`text-xs ${
                    /^[a-zA-Z0-9_]{3,20}$/.test(handle)
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {/^[a-zA-Z0-9_]{3,20}$/.test(handle)
                    ? "✓ Valid format"
                    : "Only letters, numbers, and underscores"}
                </p>
              )}
            </div>
          </div>

          <div className="bg-[#0F0F0F] rounded-lg p-4 border border-[#2A2A2A]">
            <h4 className="text-white font-medium mb-2">Handle Guidelines:</h4>
            <ul className="text-sm text-[#6B7280] space-y-1">
              <li>• 3-20 characters long</li>
              <li>• Letters, numbers, and underscores only</li>
              <li>• Must be unique across all students</li>
              <li>• Cannot be changed later</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#2A2A2A] text-[#6B7280] hover:border-[#FFD700] hover:text-[#FFD700]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid || isChecking}
          className={`flex-1 transition-all duration-200 ${
            isValid && !isChecking
              ? "bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFD700]/90"
              : "bg-[#2A2A2A] text-[#6B7280] cursor-not-allowed"
          }`}
        >
          {isChecking ? (
            <>
              <div className="w-4 h-4 border-2 border-[#0A0A0A] border-t-transparent rounded-full animate-spin mr-2" />
              Checking...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// --- Step 7: Interests Selection ---
function StepInterests({
  onNext,
  onBack,
}: {
  onNext: (data: { interests: string[] }) => void;
  onBack: () => void;
}) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(false);

  const interestCategories = {
    Academic: [
      "Computer Science",
      "Engineering",
      "Business",
      "Arts & Humanities",
      "Sciences",
      "Social Sciences",
      "Pre-Med",
      "Pre-Law",
    ],
    Activities: [
      "Sports & Athletics",
      "Music & Performing Arts",
      "Visual Arts",
      "Debate & Public Speaking",
      "Journalism & Media",
      "Photography",
    ],
    Social: [
      "Greek Life",
      "Student Government",
      "Cultural Organizations",
      "Religious Groups",
      "LGBTQ+ Organizations",
      "International Students",
    ],
    Professional: [
      "Entrepreneurship",
      "Networking",
      "Career Development",
      "Research",
      "Internships",
      "Study Abroad",
    ],
    Wellness: [
      "Mental Health",
      "Fitness & Nutrition",
      "Mindfulness",
      "Outdoor Activities",
      "Community Service",
      "Environmental",
    ],
  };

  useEffect(() => {
    setIsValid(selectedInterests.length >= 3 && selectedInterests.length <= 8);
  }, [selectedInterests]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleNext = () => {
    if (isValid) {
      onNext({ interests: selectedInterests });
    }
  };

  return (
    <div className="space-y-8 min-h-[360px]">
      <StepHeader currentStep={7} totalSteps={9} title="What interests you?" />

      <div className="space-y-6">
        <div className="text-center space-y-3">
          <p className="text-[#6B7280] text-sm">
            Select 3-8 interests to help us personalize your experience
          </p>
          <p className="text-xs text-[#6B7280]">
            {selectedInterests.length}/8 selected
          </p>
        </div>

        <div className="space-y-6 max-h-[400px] overflow-y-auto">
          {Object.entries(interestCategories).map(([category, interests]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-white font-medium text-sm">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                      selectedInterests.includes(interest)
                        ? "border-[#FFD700] bg-[#FFD700]/10"
                        : "border-[#2A2A2A] hover:border-[#FFD700]/50"
                    }`}
                  >
                    <div className="text-sm font-medium text-white">
                      {interest}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#2A2A2A] text-[#6B7280] hover:border-[#FFD700] hover:text-[#FFD700]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className={`flex-1 transition-all duration-200 ${
            isValid
              ? "bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFD700]/90"
              : "bg-[#2A2A2A] text-[#6B7280] cursor-not-allowed"
          }`}
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// --- Step 8: Profile Photo ---
function StepProfilePhoto({
  onNext,
  onBack,
}: {
  onNext: (data: { profilePhoto?: string }) => void;
  onBack: () => void;
}) {
  const [photoUrl, setPhotoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      // Simulate photo upload
      const reader = new FileReader();
      reader.onload = (event) => {
        setTimeout(() => {
          setPhotoUrl(event.target?.result as string);
          setIsUploading(false);
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkip = () => {
    onNext({});
  };

  const handleContinue = () => {
    onNext({ profilePhoto: photoUrl });
  };

  return (
    <div className="space-y-8 min-h-[360px]">
      <StepHeader currentStep={8} totalSteps={9} title="Add a Profile Photo" />

      <div className="space-y-6">
        <div className="text-center space-y-3">
          <p className="text-[#6B7280] text-sm">
            Help other students recognize you (optional)
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          {/* Photo Preview */}
          <div className="relative">
            <div
              className={`w-32 h-32 rounded-full border-4 overflow-hidden ${
                photoUrl ? "border-[#FFD700]" : "border-[#2A2A2A]"
              }`}
            >
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#2A2A2A] flex items-center justify-center">
                  <div className="text-[#6B7280] text-4xl">👤</div>
                </div>
              )}
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
              disabled={isUploading}
            />
            <label
              htmlFor="photo-upload"
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isUploading
                  ? "border-[#2A2A2A] text-[#6B7280] cursor-not-allowed"
                  : "border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0A0A0A]"
              }`}
            >
              {isUploading ? "Uploading..." : "Choose Photo"}
            </label>
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs text-[#6B7280]">JPG, PNG, or GIF • Max 5MB</p>
            <p className="text-xs text-[#6B7280]">
              We'll automatically crop it to fit
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#2A2A2A] text-[#6B7280] hover:border-[#FFD700] hover:text-[#FFD700]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2 flex-1">
          <Button
            onClick={handleSkip}
            variant="outline"
            className="flex-1 border-[#2A2A2A] text-[#6B7280] hover:border-[#FFD700] hover:text-[#FFD700]"
          >
            Skip
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!photoUrl}
            className={`flex-1 transition-all duration-200 ${
              photoUrl
                ? "bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFD700]/90"
                : "bg-[#2A2A2A] text-[#6B7280] cursor-not-allowed"
            }`}
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- Step 9: Final Welcome/Summary ---
function StepFinalWelcome({
  onBack,
  formData,
}: {
  onBack: () => void;
  formData: any;
}) {
  const handleComplete = () => {
    console.log("🎉 Onboarding Complete!", formData);
    alert("Welcome to HIVE! Check the console for your complete profile data.");
  };

  return (
    <div className="space-y-8 min-h-[360px]">
      <StepHeader currentStep={9} totalSteps={9} title="Welcome to HIVE!" />

      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-[#FFD700] rounded-full flex items-center justify-center">
            <div className="text-[#0A0A0A] text-3xl">🎉</div>
          </div>
          <h2 className="text-2xl font-display text-white">You're all set!</h2>
          <p className="text-[#6B7280] text-sm">
            Your profile is complete and ready to explore campus life
          </p>
        </div>

        <div className="space-y-4 bg-[#0F0F0F] rounded-lg p-4 border border-[#2A2A2A]">
          <h3 className="text-white font-medium text-sm mb-3">
            Your Profile Summary:
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[#6B7280]">Name:</span>
              <div className="text-white font-medium">{formData.fullName}</div>
              {formData.preferredName && (
                <div className="text-[#FFD700] text-xs">
                  "{formData.preferredName}"
                </div>
              )}
            </div>
            <div>
              <span className="text-[#6B7280]">Handle:</span>
              <div className="text-white font-medium">@{formData.handle}</div>
            </div>
            <div>
              <span className="text-[#6B7280]">Major:</span>
              <div className="text-white font-medium">{formData.major}</div>
            </div>
            <div>
              <span className="text-[#6B7280]">Graduation:</span>
              <div className="text-white font-medium">{formData.gradYear}</div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#2A2A2A]">
            <span className="text-[#6B7280] text-sm">Role:</span>
            <div className="text-white font-medium">
              {formData.isBuilder ? (
                <div>
                  <span className="text-[#FFD700]">✨ Builder</span> -{" "}
                  {formData.builderRole}
                </div>
              ) : (
                "Student"
              )}
            </div>
          </div>

          {formData.interests && formData.interests.length > 0 && (
            <div className="pt-2 border-t border-[#2A2A2A]">
              <span className="text-[#6B7280] text-sm">Interests:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.interests.slice(0, 3).map((interest: string) => (
                  <span
                    key={interest}
                    className="px-2 py-1 bg-[#2A2A2A] rounded text-xs text-white"
                  >
                    {interest}
                  </span>
                ))}
                {formData.interests.length > 3 && (
                  <span className="px-2 py-1 bg-[#2A2A2A] rounded text-xs text-[#6B7280]">
                    +{formData.interests.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="text-center space-y-3">
          <p className="text-[#6B7280] text-sm">
            {formData.isBuilder
              ? "You'll have access to Builder tools and can create experiences for your campus!"
              : "You can discover events, join spaces, and connect with your campus community!"}
          </p>
          <p className="text-xs text-[#6B7280]">
            We'll send you a welcome email with next steps
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onBack}
          variant="outline"
          className="flex-1 border-[#2A2A2A] text-[#6B7280] hover:border-[#FFD700] hover:text-[#FFD700]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button
          onClick={handleComplete}
          className="flex-1 bg-[#FFD700] text-[#0A0A0A] hover:bg-[#FFD700]/90"
        >
          Enter HIVE
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// --- The Main Component ---
export function HiveOnboardingV3() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    preferredName: "",
    major: "",
    gradYear: 0,
    isBuilder: false,
    builderRole: "",
    handle: "",
    interests: [] as string[],
    profilePhoto: "",
  });

  const handleNext = (data?: any) => {
    if (data) {
      setFormData((prev) => ({ ...prev, ...data }));
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(0, prev - 1));
  };

  const handleGatewayNext = (email: string) => {
    setFormData((prev) => ({ ...prev, email }));
    setStep((prev) => prev + 1);
  };

  const handleNameNext = (data: {
    fullName: string;
    preferredName: string;
  }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleAcademicsNext = (data: { major: string; gradYear: number }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBuilderNext = (data: {
    isBuilder: boolean;
    builderRole?: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      ...data,
      builderRole: data.builderRole || "",
    }));
    setStep((prev) => prev + 1);
  };

  const handleHandleNext = (data: { handle: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleInterestsNext = (data: { interests: string[] }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handlePhotoNext = (data: { profilePhoto?: string }) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const steps = [
    <StepOpening key="opening" onNext={handleNext} />,
    <StepGateway
      key="gateway"
      onNext={handleGatewayNext}
      onBack={handleBack}
    />,
    <StepNameCollection
      key="names"
      onNext={handleNameNext}
      onBack={handleBack}
      email={formData.email}
    />,
    <StepAcademics
      key="academics"
      onNext={handleAcademicsNext}
      onBack={handleBack}
    />,
    <StepBuilderRole
      key="builder"
      onNext={handleBuilderNext}
      onBack={handleBack}
    />,
    <StepHandle key="handle" onNext={handleHandleNext} onBack={handleBack} />,
    <StepInterests
      key="interests"
      onNext={handleInterestsNext}
      onBack={handleBack}
    />,
    <StepProfilePhoto
      key="photo"
      onNext={handlePhotoNext}
      onBack={handleBack}
    />,
    <StepFinalWelcome key="welcome" onBack={handleBack} formData={formData} />,
    // Add more steps here in the future
  ];

  return (
    <OnboardingCanvas>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          transition={transitions.content}
        >
          {steps[step] || <StepOpening key="fallback" onNext={handleNext} />}
        </motion.div>
      </AnimatePresence>
    </OnboardingCanvas>
  );
}

// --- Storybook Meta ---
const meta: Meta<typeof HiveOnboardingV3> = {
  title: "Onboarding/HIVE v3.0",
  component: HiveOnboardingV3,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof HiveOnboardingV3>;

export const Default: Story = {
  name: "Complete Flow v3",
};
