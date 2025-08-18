/**
 * Interest categories and options for user onboarding
 */
export declare const INTEREST_CATEGORIES: {
    readonly "Academic & Research": readonly ["Research", "Study Groups", "Tutoring", "Academic Competitions", "Honor Societies", "Library & Resources"];
    readonly "Creative & Arts": readonly ["Art & Design", "Music", "Theater & Drama", "Writing & Literature", "Photography", "Film & Video", "Crafts & DIY"];
    readonly "Technology & Innovation": readonly ["Programming", "Web Development", "Mobile Apps", "AI & Machine Learning", "Cybersecurity", "Gaming", "Robotics"];
    readonly "Sports & Fitness": readonly ["Intramural Sports", "Fitness & Gym", "Outdoor Activities", "Martial Arts", "Dance", "Yoga & Wellness", "Running & Athletics"];
    readonly "Social & Community": readonly ["Volunteering", "Community Service", "Cultural Events", "Social Justice", "Environmental", "Religious & Spiritual", "International Students"];
    readonly "Career & Professional": readonly ["Entrepreneurship", "Business", "Networking", "Leadership", "Public Speaking", "Internships", "Career Development"];
    readonly "Lifestyle & Wellness": readonly ["Food & Cooking", "Travel", "Fashion", "Health & Nutrition", "Mindfulness", "Sustainability", "Personal Development"];
    readonly "Entertainment & Media": readonly ["Movies & TV", "Books & Reading", "Podcasts", "Comedy", "Concerts & Events", "Board Games", "Pop Culture"];
};
export declare const getAllInterests: () => string[];
export declare const getInterestsByCategory: (category: keyof typeof INTEREST_CATEGORIES) => readonly string[];
export declare const getAllInterestsByCategory: () => {
    readonly "Academic & Research": readonly ["Research", "Study Groups", "Tutoring", "Academic Competitions", "Honor Societies", "Library & Resources"];
    readonly "Creative & Arts": readonly ["Art & Design", "Music", "Theater & Drama", "Writing & Literature", "Photography", "Film & Video", "Crafts & DIY"];
    readonly "Technology & Innovation": readonly ["Programming", "Web Development", "Mobile Apps", "AI & Machine Learning", "Cybersecurity", "Gaming", "Robotics"];
    readonly "Sports & Fitness": readonly ["Intramural Sports", "Fitness & Gym", "Outdoor Activities", "Martial Arts", "Dance", "Yoga & Wellness", "Running & Athletics"];
    readonly "Social & Community": readonly ["Volunteering", "Community Service", "Cultural Events", "Social Justice", "Environmental", "Religious & Spiritual", "International Students"];
    readonly "Career & Professional": readonly ["Entrepreneurship", "Business", "Networking", "Leadership", "Public Speaking", "Internships", "Career Development"];
    readonly "Lifestyle & Wellness": readonly ["Food & Cooking", "Travel", "Fashion", "Health & Nutrition", "Mindfulness", "Sustainability", "Personal Development"];
    readonly "Entertainment & Media": readonly ["Movies & TV", "Books & Reading", "Podcasts", "Comedy", "Concerts & Events", "Board Games", "Pop Culture"];
};
//# sourceMappingURL=interests.d.ts.map