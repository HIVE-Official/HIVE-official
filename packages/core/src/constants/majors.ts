/**
 * University at Buffalo (SUNY Buffalo) Academic Majors
 * Organized by school/college for better UX
 */

export interface Major {
  name: string;
  code?: string;
  school: string;
}

export const UB_MAJORS: Major[] = [
  // School of Architecture and Planning
  { name: 'Architecture', school: 'Architecture and Planning' },
  { name: 'Urban and Regional Planning', school: 'Architecture and Planning' },

  // School of Arts and Sciences
  { name: 'Anthropology', school: 'Arts and Sciences' },
  { name: 'Art', school: 'Arts and Sciences' },
  { name: 'Art History', school: 'Arts and Sciences' },
  { name: 'Biological Sciences', school: 'Arts and Sciences' },
  { name: 'Chemistry', school: 'Arts and Sciences' },
  { name: 'Classics', school: 'Arts and Sciences' },
  { name: 'Communication', school: 'Arts and Sciences' },
  { name: 'Computer Science', school: 'Arts and Sciences' },
  { name: 'Dance', school: 'Arts and Sciences' },
  { name: 'Economics', school: 'Arts and Sciences' },
  { name: 'English', school: 'Arts and Sciences' },
  { name: 'Environmental Geosciences', school: 'Arts and Sciences' },
  { name: 'French', school: 'Arts and Sciences' },
  { name: 'Geography', school: 'Arts and Sciences' },
  { name: 'Geological Sciences', school: 'Arts and Sciences' },
  { name: 'German', school: 'Arts and Sciences' },
  { name: 'History', school: 'Arts and Sciences' },
  { name: 'International Trade', school: 'Arts and Sciences' },
  { name: 'Italian', school: 'Arts and Sciences' },
  { name: 'Linguistics', school: 'Arts and Sciences' },
  { name: 'Mathematics', school: 'Arts and Sciences' },
  { name: 'Media Study', school: 'Arts and Sciences' },
  { name: 'Music', school: 'Arts and Sciences' },
  { name: 'Philosophy', school: 'Arts and Sciences' },
  { name: 'Physics', school: 'Arts and Sciences' },
  { name: 'Political Science', school: 'Arts and Sciences' },
  { name: 'Psychology', school: 'Arts and Sciences' },
  { name: 'Sociology', school: 'Arts and Sciences' },
  { name: 'Spanish', school: 'Arts and Sciences' },
  { name: 'Theatre', school: 'Arts and Sciences' },

  // School of Engineering and Applied Sciences
  { name: 'Aerospace Engineering', school: 'Engineering and Applied Sciences' },
  { name: 'Biomedical Engineering', school: 'Engineering and Applied Sciences' },
  { name: 'Chemical Engineering', school: 'Engineering and Applied Sciences' },
  { name: 'Civil Engineering', school: 'Engineering and Applied Sciences' },
  { name: 'Computer Engineering', school: 'Engineering and Applied Sciences' },
  { name: 'Electrical Engineering', school: 'Engineering and Applied Sciences' },
  { name: 'Engineering Physics', school: 'Engineering and Applied Sciences' },
  { name: 'Environmental Engineering', school: 'Engineering and Applied Sciences' },
  { name: 'Industrial Engineering', school: 'Engineering and Applied Sciences' },
  { name: 'Mechanical Engineering', school: 'Engineering and Applied Sciences' },

  // School of Management
  { name: 'Accounting', school: 'Management' },
  { name: 'Business Administration', school: 'Management' },
  { name: 'Finance', school: 'Management' },
  { name: 'Management Information Systems', school: 'Management' },
  { name: 'Marketing', school: 'Management' },
  { name: 'Operations Management', school: 'Management' },

  // School of Medicine and Biomedical Sciences
  { name: 'Biotechnology', school: 'Medicine and Biomedical Sciences' },
  { name: 'Exercise Science', school: 'Medicine and Biomedical Sciences' },
  { name: 'Nuclear Medicine Technology', school: 'Medicine and Biomedical Sciences' },
  { name: 'Occupational Therapy', school: 'Medicine and Biomedical Sciences' },
  { name: 'Pharmacy', school: 'Medicine and Biomedical Sciences' },
  { name: 'Physical Therapy', school: 'Medicine and Biomedical Sciences' },

  // Graduate School of Education
  { name: 'Art Education', school: 'Education' },
  { name: 'Counseling', school: 'Education' },
  { name: 'Educational Leadership', school: 'Education' },
  { name: 'Elementary Education', school: 'Education' },
  { name: 'English Education', school: 'Education' },
  { name: 'Mathematics Education', school: 'Education' },
  { name: 'Music Education', school: 'Education' },
  { name: 'Science Education', school: 'Education' },
  { name: 'Social Studies Education', school: 'Education' },
  { name: 'Special Education', school: 'Education' },

  // School of Law
  { name: 'Law', school: 'Law' },

  // School of Nursing
  { name: 'Nursing', school: 'Nursing' },

  // School of Public Health and Health Professions
  { name: 'Athletic Training', school: 'Public Health and Health Professions' },
  { name: 'Health Services Administration', school: 'Public Health and Health Professions' },
  { name: 'Nutrition Science', school: 'Public Health and Health Professions' },
  { name: 'Public Health', school: 'Public Health and Health Professions' },
  { name: 'Rehabilitation Science', school: 'Public Health and Health Professions' },

  // School of Social Work
  { name: 'Social Work', school: 'Social Work' },

  // Interdisciplinary Programs
  { name: 'American Studies', school: 'Interdisciplinary' },
  { name: 'Environmental Studies', school: 'Interdisciplinary' },
  { name: 'Global Gender and Sexuality Studies', school: 'Interdisciplinary' },
  { name: 'Undeclared', school: 'Undeclared' },
];

/**
 * Get majors grouped by school
 */
export function getMajorsBySchool(): Record<string, Major[]> {
  return UB_MAJORS.reduce((acc, major) => {
    if (!acc[major.school]) {
      acc[major.school] = [];
    }
    acc[major.school].push(major);
    return acc;
  }, {} as Record<string, Major[]>);
}

/**
 * Get all unique school names
 */
export function getSchoolNames(): string[] {
  return [...new Set(UB_MAJORS.map(major => major.school))].sort();
}

/**
 * Search majors by name
 */
export function searchMajors(query: string): Major[] {
  const lowercaseQuery = query.toLowerCase();
  return UB_MAJORS.filter(major =>
    major.name.toLowerCase().includes(lowercaseQuery)
  );
} 