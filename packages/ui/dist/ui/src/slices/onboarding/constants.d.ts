/**
 * Onboarding Constants & Configuration
 *
 * Constants, configuration, and reference data for the
 * HIVE onboarding process and user setup flows.
 */
import type { OnboardingStep } from './types';
export declare const ONBOARDING_STEPS: OnboardingStep[];
export declare const SCHOOL_DOMAINS: {
    readonly 'buffalo.edu': {
        readonly id: "ub";
        readonly name: "University at Buffalo";
        readonly fullName: "State University of New York at Buffalo";
        readonly city: "Buffalo";
        readonly state: "NY";
        readonly domain: "buffalo.edu";
        readonly isActive: true;
        readonly studentCount: 32000;
        readonly logoUrl: "/schools/ub-logo.png";
    };
    readonly 'stonybrook.edu': {
        readonly id: "sbu";
        readonly name: "Stony Brook University";
        readonly fullName: "State University of New York at Stony Brook";
        readonly city: "Stony Brook";
        readonly state: "NY";
        readonly domain: "stonybrook.edu";
        readonly isActive: true;
        readonly studentCount: 27000;
        readonly logoUrl: "/schools/sbu-logo.png";
    };
    readonly 'binghamton.edu': {
        readonly id: "bing";
        readonly name: "Binghamton University";
        readonly fullName: "State University of New York at Binghamton";
        readonly city: "Binghamton";
        readonly state: "NY";
        readonly domain: "binghamton.edu";
        readonly isActive: true;
        readonly studentCount: 18000;
        readonly logoUrl: "/schools/bing-logo.png";
    };
};
export declare const USER_TYPES: readonly [{
    readonly id: "student";
    readonly label: "Student";
    readonly description: "Undergraduate or graduate student";
}, {
    readonly id: "faculty";
    readonly label: "Faculty";
    readonly description: "Professor, instructor, or researcher";
}, {
    readonly id: "staff";
    readonly label: "Staff";
    readonly description: "University staff member";
}, {
    readonly id: "alumni";
    readonly label: "Alumni";
    readonly description: "Graduate of the institution";
}];
export declare const ACADEMIC_YEARS: readonly [{
    readonly id: "freshman";
    readonly label: "Freshman";
    readonly description: "1st year undergraduate";
}, {
    readonly id: "sophomore";
    readonly label: "Sophomore";
    readonly description: "2nd year undergraduate";
}, {
    readonly id: "junior";
    readonly label: "Junior";
    readonly description: "3rd year undergraduate";
}, {
    readonly id: "senior";
    readonly label: "Senior";
    readonly description: "4th+ year undergraduate";
}, {
    readonly id: "graduate";
    readonly label: "Graduate Student";
    readonly description: "Masters or PhD student";
}, {
    readonly id: "other";
    readonly label: "Other";
    readonly description: "Non-traditional student";
}];
export declare const GRADUATION_YEARS: number[];
export declare const COMMON_MAJORS: readonly ["Computer Science", "Engineering", "Business Administration", "Biology", "Psychology", "Mathematics", "English", "Political Science", "Economics", "Chemistry", "Physics", "Art", "Music", "History", "Philosophy", "Sociology", "Anthropology", "Communications", "Marketing", "Finance", "Accounting", "Nursing", "Medicine", "Law", "Education", "Other"];
export declare const INTEREST_CATEGORIES: readonly ["Technology", "Entrepreneurship", "Research", "Arts & Design", "Social Impact", "Sports & Recreation", "Music & Performance", "Academic Success", "Career Development", "Campus Life", "Sustainability", "Health & Wellness"];
export declare const ONBOARDING_CONFIG: {
    readonly maxStepTime: 30;
    readonly autoSaveInterval: 30;
    readonly validationDelay: 500;
    readonly photoUploadMaxSize: number;
    readonly handleMinLength: 3;
    readonly handleMaxLength: 30;
    readonly nameMaxLength: 50;
};
export declare const VALIDATION_PATTERNS: {
    readonly handle: RegExp;
    readonly email: RegExp;
    readonly name: RegExp;
};
export declare const ERROR_MESSAGES: {
    readonly required: "This field is required";
    readonly invalidEmail: "Please enter a valid email address";
    readonly invalidHandle: "Handle can only contain letters, numbers, underscores, and hyphens";
    readonly handleTaken: "This handle is already taken";
    readonly handleTooShort: "Handle must be at least 3 characters";
    readonly handleTooLong: "Handle cannot exceed 30 characters";
    readonly nameTooLong: "Name cannot exceed 50 characters";
    readonly photoTooLarge: `Photo must be smaller than ${number}MB`;
    readonly networkError: "Network error. Please check your connection and try again.";
    readonly serverError: "Server error. Please try again later.";
    readonly validationFailed: "Please fix the errors above before continuing";
};
//# sourceMappingURL=constants.d.ts.map