/**
 * Onboarding Constants & Configuration
 *
 * Constants, configuration, and reference data for the
 * HIVE onboarding process and user setup flows.
 */
export const ONBOARDING_STEPS = [
    {
        id: 'welcome',
        title: 'Welcome to HIVE',
        description: 'Learn about the platform and get started',
        component: 'HiveWelcomeStep',
        isRequired: true,
        isCompleted: false,
        order: 0
    },
    {
        id: 'name',
        title: 'Your Name',
        description: 'Tell us what to call you',
        component: 'HiveNameStep',
        isRequired: true,
        isCompleted: false,
        order: 1
    },
    {
        id: 'handle',
        title: 'Choose Handle',
        description: 'Pick your unique HIVE handle',
        component: 'HiveHandleStep',
        isRequired: true,
        isCompleted: false,
        order: 2
    },
    {
        id: 'photo',
        title: 'Profile Photo',
        description: 'Add a photo to personalize your profile',
        component: 'HivePhotoStep',
        isRequired: false,
        isCompleted: false,
        order: 3
    },
    {
        id: 'user-type',
        title: 'User Type',
        description: 'Tell us your role at your institution',
        component: 'HiveUserTypeStep',
        isRequired: true,
        isCompleted: false,
        order: 4
    },
    {
        id: 'academics',
        title: 'Academic Info',
        description: 'Share your academic details',
        component: 'HiveAcademicsStep',
        isRequired: true,
        isCompleted: false,
        order: 5
    },
    {
        id: 'faculty-info',
        title: 'Faculty Information',
        description: 'Additional details for faculty members',
        component: 'HiveFacultyInfoStep',
        isRequired: false, // Only for faculty
        isCompleted: false,
        order: 6
    },
    {
        id: 'builder',
        title: 'Builder Profile',
        description: 'Are you interested in building tools?',
        component: 'HiveBuilderStep',
        isRequired: false,
        isCompleted: false,
        order: 7
    },
    {
        id: 'legal',
        title: 'Terms & Privacy',
        description: 'Review and accept our terms',
        component: 'HiveLegalStep',
        isRequired: true,
        isCompleted: false,
        order: 8
    }
];
export const SCHOOL_DOMAINS = {
    'buffalo.edu': {
        id: 'ub',
        name: 'University at Buffalo',
        fullName: 'State University of New York at Buffalo',
        city: 'Buffalo',
        state: 'NY',
        domain: 'buffalo.edu',
        isActive: true,
        studentCount: 32000,
        logoUrl: '/schools/ub-logo.png'
    },
    'stonybrook.edu': {
        id: 'sbu',
        name: 'Stony Brook University',
        fullName: 'State University of New York at Stony Brook',
        city: 'Stony Brook',
        state: 'NY',
        domain: 'stonybrook.edu',
        isActive: true,
        studentCount: 27000,
        logoUrl: '/schools/sbu-logo.png'
    },
    'binghamton.edu': {
        id: 'bing',
        name: 'Binghamton University',
        fullName: 'State University of New York at Binghamton',
        city: 'Binghamton',
        state: 'NY',
        domain: 'binghamton.edu',
        isActive: true,
        studentCount: 18000,
        logoUrl: '/schools/bing-logo.png'
    }
};
export const USER_TYPES = [
    { id: 'student', label: 'Student', description: 'Undergraduate or graduate student' },
    { id: 'faculty', label: 'Faculty', description: 'Professor, instructor, or researcher' },
    { id: 'staff', label: 'Staff', description: 'University staff member' },
    { id: 'alumni', label: 'Alumni', description: 'Graduate of the institution' }
];
export const ACADEMIC_YEARS = [
    { id: 'freshman', label: 'Freshman', description: '1st year undergraduate' },
    { id: 'sophomore', label: 'Sophomore', description: '2nd year undergraduate' },
    { id: 'junior', label: 'Junior', description: '3rd year undergraduate' },
    { id: 'senior', label: 'Senior', description: '4th+ year undergraduate' },
    { id: 'graduate', label: 'Graduate Student', description: 'Masters or PhD student' },
    { id: 'other', label: 'Other', description: 'Non-traditional student' }
];
export const GRADUATION_YEARS = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i - 2);
export const COMMON_MAJORS = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Biology',
    'Psychology',
    'Mathematics',
    'English',
    'Political Science',
    'Economics',
    'Chemistry',
    'Physics',
    'Art',
    'Music',
    'History',
    'Philosophy',
    'Sociology',
    'Anthropology',
    'Communications',
    'Marketing',
    'Finance',
    'Accounting',
    'Nursing',
    'Medicine',
    'Law',
    'Education',
    'Other'
];
export const INTEREST_CATEGORIES = [
    'Technology',
    'Entrepreneurship',
    'Research',
    'Arts & Design',
    'Social Impact',
    'Sports & Recreation',
    'Music & Performance',
    'Academic Success',
    'Career Development',
    'Campus Life',
    'Sustainability',
    'Health & Wellness'
];
export const ONBOARDING_CONFIG = {
    maxStepTime: 30, // minutes before timeout warning
    autoSaveInterval: 30, // seconds between auto-saves
    validationDelay: 500, // ms delay before validation
    photoUploadMaxSize: 5 * 1024 * 1024, // 5MB
    handleMinLength: 3,
    handleMaxLength: 30,
    nameMaxLength: 50
};
export const VALIDATION_PATTERNS = {
    handle: /^[a-zA-Z0-9_-]+$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    name: /^[a-zA-Z\s'-]+$/
};
export const ERROR_MESSAGES = {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidHandle: 'Handle can only contain letters, numbers, underscores, and hyphens',
    handleTaken: 'This handle is already taken',
    handleTooShort: `Handle must be at least ${ONBOARDING_CONFIG.handleMinLength} characters`,
    handleTooLong: `Handle cannot exceed ${ONBOARDING_CONFIG.handleMaxLength} characters`,
    nameTooLong: `Name cannot exceed ${ONBOARDING_CONFIG.nameMaxLength} characters`,
    photoTooLarge: `Photo must be smaller than ${ONBOARDING_CONFIG.photoUploadMaxSize / 1024 / 1024}MB`,
    networkError: 'Network error. Please check your connection and try again.',
    serverError: 'Server error. Please try again later.',
    validationFailed: 'Please fix the errors above before continuing'
};
//# sourceMappingURL=constants.js.map