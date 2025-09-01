/**
 * HIVE Interest Categories
 * Comprehensive list of interests organized by category for onboarding
 */

export const INTEREST_CATEGORIES = {
  "Academic & Research": [
    "Computer Science",
    "Engineering", 
    "Biology",
    "Chemistry",
    "Physics",
    "Mathematics",
    "Psychology", 
    "Economics",
    "Political Science",
    "History",
    "Philosophy",
    "Literature",
    "Linguistics",
    "Anthropology",
    "Sociology"
  ],
  "Creative & Arts": [
    "Graphic Design",
    "Photography", 
    "Digital Art",
    "Drawing & Painting",
    "Sculpture",
    "Creative Writing",
    "Poetry",
    "Film & Video",
    "Animation",
    "Music Production",
    "Music Performance",
    "Theater",
    "Dance",
    "Fashion Design"
  ],
  "Technology & Innovation": [
    "Software Development",
    "Web Development", 
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cybersecurity",
    "Blockchain",
    "Game Development",
    "UX/UI Design",
    "Robotics",
    "3D Printing",
    "Virtual Reality",
    "Cryptocurrency"
  ],
  "Business & Entrepreneurship": [
    "Startups",
    "Entrepreneurship",
    "Marketing",
    "Finance", 
    "Consulting",
    "Real Estate",
    "E-commerce",
    "Product Management",
    "Project Management",
    "Leadership",
    "Investing",
    "Business Strategy",
    "Sales",
    "Public Relations"
  ],
  "Sports & Fitness": [
    "Basketball",
    "Soccer",
    "Tennis",
    "Swimming",
    "Running",
    "Cycling",
    "Yoga",
    "Weightlifting",
    "Rock Climbing",
    "Hiking",
    "Skiing",
    "Surfing",
    "Martial Arts",
    "Team Sports"
  ],
  "Entertainment & Media": [
    "Gaming",
    "Esports",
    "Streaming",
    "Podcasting",
    "YouTube",
    "Social Media",
    "Movies & TV",
    "Stand-up Comedy",
    "Board Games",
    "Anime & Manga",
    "Comic Books",
    "Music Discovery",
    "Concert Going"
  ],
  "Lifestyle & Wellness": [
    "Cooking",
    "Baking",
    "Food & Dining",
    "Travel",
    "Fashion",
    "Beauty & Skincare",
    "Mental Health",
    "Meditation",
    "Sustainability",
    "Volunteering",
    "Community Service",
    "Personal Development",
    "Reading",
    "Learning Languages"
  ],
  "Hobbies & Crafts": [
    "DIY Projects",
    "Woodworking",
    "Gardening",
    "Knitting & Sewing",
    "Jewelry Making",
    "Pottery",
    "Model Building",
    "Collecting",
    "Calligraphy",
    "Origami",
    "Puzzles",
    "Magic & Illusion",
    "Astronomy",
    "Chess"
  ]
} as const;

// Flat list for easy searching
export const ALL_INTERESTS = Object.values(INTEREST_CATEGORIES).flat();

// Interest category keys
export type InterestCategory = keyof typeof INTEREST_CATEGORIES;
export type Interest = typeof ALL_INTERESTS[number];