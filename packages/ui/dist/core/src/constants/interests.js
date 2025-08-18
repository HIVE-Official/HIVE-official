/**
 * Interest categories and options for user onboarding
 */
export const INTEREST_CATEGORIES = {
    "Academic & Research": [
        "Research",
        "Study Groups",
        "Tutoring",
        "Academic Competitions",
        "Honor Societies",
        "Library & Resources",
    ],
    "Creative & Arts": [
        "Art & Design",
        "Music",
        "Theater & Drama",
        "Writing & Literature",
        "Photography",
        "Film & Video",
        "Crafts & DIY",
    ],
    "Technology & Innovation": [
        "Programming",
        "Web Development",
        "Mobile Apps",
        "AI & Machine Learning",
        "Cybersecurity",
        "Gaming",
        "Robotics",
    ],
    "Sports & Fitness": [
        "Intramural Sports",
        "Fitness & Gym",
        "Outdoor Activities",
        "Martial Arts",
        "Dance",
        "Yoga & Wellness",
        "Running & Athletics",
    ],
    "Social & Community": [
        "Volunteering",
        "Community Service",
        "Cultural Events",
        "Social Justice",
        "Environmental",
        "Religious & Spiritual",
        "International Students",
    ],
    "Career & Professional": [
        "Entrepreneurship",
        "Business",
        "Networking",
        "Leadership",
        "Public Speaking",
        "Internships",
        "Career Development",
    ],
    "Lifestyle & Wellness": [
        "Food & Cooking",
        "Travel",
        "Fashion",
        "Health & Nutrition",
        "Mindfulness",
        "Sustainability",
        "Personal Development",
    ],
    "Entertainment & Media": [
        "Movies & TV",
        "Books & Reading",
        "Podcasts",
        "Comedy",
        "Concerts & Events",
        "Board Games",
        "Pop Culture",
    ],
};
export const getAllInterests = () => {
    return Object.values(INTEREST_CATEGORIES).flat();
};
export const getInterestsByCategory = (category) => {
    return INTEREST_CATEGORIES[category];
};
export const getAllInterestsByCategory = () => {
    return INTEREST_CATEGORIES;
};
//# sourceMappingURL=interests.js.map