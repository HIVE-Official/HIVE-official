"use strict";
/**
 * Interest categories and options for user onboarding
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInterestsByCategory = exports.getInterestsByCategory = exports.getAllInterests = exports.INTEREST_CATEGORIES = void 0;
exports.INTEREST_CATEGORIES = {
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
const getAllInterests = () => {
    return Object.values(exports.INTEREST_CATEGORIES).flat();
};
exports.getAllInterests = getAllInterests;
const getInterestsByCategory = (category) => {
    return exports.INTEREST_CATEGORIES[category];
};
exports.getInterestsByCategory = getInterestsByCategory;
const getAllInterestsByCategory = () => {
    return exports.INTEREST_CATEGORIES;
};
exports.getAllInterestsByCategory = getAllInterestsByCategory;
//# sourceMappingURL=interests.js.map