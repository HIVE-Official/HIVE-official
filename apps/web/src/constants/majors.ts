/**
 * HIVE Major Categories  
 * Comprehensive list of academic majors organized by school/college
 */

export const MAJOR_CATEGORIES = {
  "School of Engineering & Applied Sciences": [
    "Aerospace Engineering",
    "Biomedical Engineering", 
    "Chemical Engineering",
    "Civil Engineering",
    "Computer Engineering",
    "Computer Science",
    "Electrical Engineering",
    "Environmental Engineering",
    "Industrial Engineering",
    "Materials Design & Innovation",
    "Mechanical Engineering"
  ],
  "College of Arts & Sciences": [
    "Anthropology",
    "Art History", 
    "Biological Sciences",
    "Chemistry",
    "Classics",
    "Communication",
    "Economics",
    "English",
    "Environmental Studies",
    "French",
    "Geography",
    "Geology",
    "German",
    "History",
    "International Trade",
    "Linguistics",
    "Mathematics",
    "Philosophy",
    "Physics",
    "Political Science",
    "Psychology",
    "Sociology",
    "Spanish",
    "Studio Art",
    "Theatre Arts"
  ],
  "School of Management": [
    "Accounting",
    "Business Administration",
    "Finance", 
    "International Business",
    "Management Information Systems",
    "Marketing",
    "Operations Management",
    "Supply Chain Management"
  ],
  "School of Medicine & Biomedical Sciences": [
    "Biomedical Sciences",
    "Exercise Science",
    "Nuclear Medicine Technology",
    "Occupational Therapy",
    "Pharmacy",
    "Physical Therapy",
    "Physician Assistant"
  ],
  "School of Architecture & Planning": [
    "Architecture",
    "Urban Planning",
    "Environmental Design"
  ],
  "Graduate School of Education": [
    "Art Education",
    "Childhood Education",
    "Educational Leadership",
    "Elementary Education",
    "English Education", 
    "Mathematics Education",
    "Music Education",
    "Science Education",
    "Social Studies Education",
    "Special Education"
  ],
  "School of Social Work": [
    "Social Work"
  ],
  "School of Nursing": [
    "Nursing"
  ],
  "School of Public Health": [
    "Biostatistics",
    "Environmental Health",
    "Epidemiology", 
    "Health Services Administration",
    "Public Health"
  ],
  "Jacobs School of Medicine": [
    "Medicine"
  ],
  "School of Dental Medicine": [
    "Dental Medicine"
  ],
  "Roswell Park Graduate Division": [
    "Biomedical Sciences",
    "Cancer Research"
  ]
} as const;

// Flat list for easy searching
export const ALL_MAJORS = Object.values(MAJOR_CATEGORIES).flat();

// Major category keys  
export type MajorCategory = keyof typeof MAJOR_CATEGORIES;
export type Major = typeof ALL_MAJORS[number];

// Legacy support - keeping UB_MAJORS for backward compatibility
export const UB_MAJORS = ALL_MAJORS.map(name => ({
  name,
  school: Object.keys(MAJOR_CATEGORIES).find(school => 
    MAJOR_CATEGORIES[school as MajorCategory].includes(name)
  ) || "Other"
}));