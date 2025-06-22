/**
 * Comprehensive University at Buffalo Majors Database
 *
 * This file contains all undergraduate, master's, and PhD programs
 * organized by degree level for use across the HIVE application.
 */

export type DegreeType =
  | "BS"
  | "BA"
  | "MS"
  | "MA"
  | "MBA"
  | "MFA"
  | "MPH"
  | "MPS"
  | "MUP"
  | "MSW"
  | "PhD"
  | "MArch"
  | "MM"
  | "EdM"
  | "BFA"
  | "BM";

export interface Major {
  name: string;
  degree: DegreeType;
  level: "undergraduate" | "graduate" | "doctoral";
  category?: string;
}

// Undergraduate (Bachelor's) Programs - ~90 programs
export const UNDERGRADUATE_MAJORS: Major[] = [
  {
    name: "Accounting",
    degree: "BS",
    level: "undergraduate",
    category: "Business",
  },
  { name: "Acting", degree: "BFA", level: "undergraduate", category: "Arts" },
  {
    name: "Aerospace Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "African American Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "American Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Anthropology",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Architecture",
    degree: "BS",
    level: "undergraduate",
    category: "Architecture",
  },
  { name: "Art", degree: "BA", level: "undergraduate", category: "Arts" },
  {
    name: "Art History",
    degree: "BA",
    level: "undergraduate",
    category: "Arts",
  },
  {
    name: "Asian Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Biochemistry",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Bioinformatics & Computational Biology",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Biological Sciences",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Biomedical Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Biomedical Sciences",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Biotechnology",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Business Administration",
    degree: "BS",
    level: "undergraduate",
    category: "Business",
  },
  {
    name: "Chemical Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Chemistry",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Civil Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Classics",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Cognitive Science",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Communication",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Computational Linguistics",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Computational Physics",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Computer Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Computer Science",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Criminology",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  { name: "Dance", degree: "BFA", level: "undergraduate", category: "Arts" },
  {
    name: "Economics",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Electrical Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Engineering Physics",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Engineering Science",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "English",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Environmental Design",
    degree: "BS",
    level: "undergraduate",
    category: "Architecture",
  },
  {
    name: "Environmental Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Environmental Science",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Environmental Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Environmental Sustainability",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Exercise Science",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  {
    name: "Film Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Arts",
  },
  {
    name: "French",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Geographic Information Science",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Geography",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Geological Sciences",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "German",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Global Affairs",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Global Gender Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Health and Human Services",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  {
    name: "History",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Indigenous Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Industrial Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Information Technology and Management",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "International Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "International Trade",
    degree: "BS",
    level: "undergraduate",
    category: "Business",
  },
  {
    name: "Italian",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Jewish Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Law",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Legal Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Linguistics",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Materials Science and Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Mathematics",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Mechanical Engineering",
    degree: "BS",
    level: "undergraduate",
    category: "Engineering",
  },
  {
    name: "Media Study",
    degree: "BA",
    level: "undergraduate",
    category: "Arts",
  },
  {
    name: "Medical Laboratory Science",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  { name: "Music", degree: "BM", level: "undergraduate", category: "Arts" },
  {
    name: "Music Theatre",
    degree: "BFA",
    level: "undergraduate",
    category: "Arts",
  },
  {
    name: "Neuroscience",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Nuclear Medicine Technology",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  { name: "Nursing", degree: "BS", level: "undergraduate", category: "Health" },
  {
    name: "Nursing (RN-to-BS)",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  {
    name: "Nutrition Science",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  {
    name: "Occupational Therapy",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  {
    name: "Pharmaceutical Sciences",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  {
    name: "Pharmacology & Toxicology",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  {
    name: "Pharmacy",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  {
    name: "Philosophy",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Philosophy, Politics & Economics",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Physics",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  {
    name: "Political Science",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Psychology",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Sociology",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
  {
    name: "Spanish",
    degree: "BA",
    level: "undergraduate",
    category: "Humanities",
  },
  {
    name: "Special Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Interdisciplinary",
  },
  {
    name: "Speech & Hearing Science",
    degree: "BS",
    level: "undergraduate",
    category: "Health",
  },
  {
    name: "Statistics",
    degree: "BS",
    level: "undergraduate",
    category: "Sciences",
  },
  { name: "Theatre", degree: "BA", level: "undergraduate", category: "Arts" },
  {
    name: "Theatre Design/Technology",
    degree: "BFA",
    level: "undergraduate",
    category: "Arts",
  },
  {
    name: "Urban & Public Policy Studies",
    degree: "BA",
    level: "undergraduate",
    category: "Social Sciences",
  },
];

// Master's Programs - 184 programs (key ones)
export const MASTERS_MAJORS: Major[] = [
  { name: "Accounting", degree: "MS", level: "graduate", category: "Business" },
  {
    name: "Aerospace Engineering",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "American Studies",
    degree: "MA",
    level: "graduate",
    category: "Humanities",
  },
  {
    name: "Anthropology",
    degree: "MA",
    level: "graduate",
    category: "Social Sciences",
  },
  {
    name: "Architecture",
    degree: "MArch",
    level: "graduate",
    category: "Architecture",
  },
  {
    name: "Arts Management",
    degree: "MA",
    level: "graduate",
    category: "Arts",
  },
  {
    name: "Athletic Training",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Biochemistry",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Bioinformatics & Biostatistics",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Biological Sciences",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Biomedical Engineering",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Biomedical Informatics",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Biomedical Sciences",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Biostatistics",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Biotechnology",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Business Administration",
    degree: "MBA",
    level: "graduate",
    category: "Business",
  },
  {
    name: "Business Analytics",
    degree: "MS",
    level: "graduate",
    category: "Business",
  },
  {
    name: "Cancer Sciences",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Chemical Engineering",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  { name: "Chemistry", degree: "MS", level: "graduate", category: "Sciences" },
  {
    name: "Childhood Education",
    degree: "MS",
    level: "graduate",
    category: "Education",
  },
  {
    name: "Civil Engineering",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Clinical & Translational Therapeutics",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Clinical Nutrition",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Communication",
    degree: "MA",
    level: "graduate",
    category: "Social Sciences",
  },
  {
    name: "Communicative Disorders & Sciences",
    degree: "MA",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Community Health & Health Behavior",
    degree: "MPH",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Comparative Literature",
    degree: "MA",
    level: "graduate",
    category: "Humanities",
  },
  {
    name: "Computational & Applied Mathematics",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Computational Cell Biology, Anatomy & Pathology",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Computational Earth Science",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Computational Linguistics",
    degree: "MA",
    level: "graduate",
    category: "Humanities",
  },
  {
    name: "Computer Science & Engineering",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Criminology",
    degree: "MA",
    level: "graduate",
    category: "Social Sciences",
  },
  {
    name: "Critical Museum Studies",
    degree: "MA",
    level: "graduate",
    category: "Arts",
  },
  { name: "Dance", degree: "MFA", level: "graduate", category: "Arts" },
  {
    name: "Data Analytics in the Social Sciences",
    degree: "MA",
    level: "graduate",
    category: "Social Sciences",
  },
  {
    name: "Data Sciences & Applications",
    degree: "MPS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Drugs, Health & Society",
    degree: "MA",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Econometrics & Quantitative Economics",
    degree: "MS",
    level: "graduate",
    category: "Social Sciences",
  },
  {
    name: "Economics",
    degree: "MA",
    level: "graduate",
    category: "Social Sciences",
  },
  {
    name: "Educational Data Science",
    degree: "MS",
    level: "graduate",
    category: "Education",
  },
  {
    name: "Electrical Engineering",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Engineering Management",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Engineering Science",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  { name: "English", degree: "MA", level: "graduate", category: "Humanities" },
  {
    name: "Environmental & Water Resources Engineering",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Environmental Health Sciences",
    degree: "MPH",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Epidemiology",
    degree: "MPH",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Evolution, Ecology & Behavior",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Exercise Science",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  { name: "Finance", degree: "MS", level: "graduate", category: "Business" },
  { name: "Fine Arts", degree: "MFA", level: "graduate", category: "Arts" },
  {
    name: "French Language & Literature",
    degree: "MA",
    level: "graduate",
    category: "Humanities",
  },
  {
    name: "Genetic Counseling",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Genetics, Genomics & Bioinformatics",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Geographic Information Science",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Geography",
    degree: "MA",
    level: "graduate",
    category: "Social Sciences",
  },
  {
    name: "Geological Sciences",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Global Affairs",
    degree: "MA",
    level: "graduate",
    category: "Social Sciences",
  },
  {
    name: "Global Gender Studies",
    degree: "MA",
    level: "graduate",
    category: "Humanities",
  },
  {
    name: "Higher Education & Student Affairs",
    degree: "MA",
    level: "graduate",
    category: "Education",
  },
  {
    name: "Humanities Interdisciplinary",
    degree: "MA",
    level: "graduate",
    category: "Humanities",
  },
  {
    name: "Industrial Engineering",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Information & Library Science",
    degree: "MS",
    level: "graduate",
    category: "Information",
  },
  {
    name: "International Development & Global Health",
    degree: "MA",
    level: "graduate",
    category: "Social Sciences",
  },
  {
    name: "International Trade",
    degree: "MA",
    level: "graduate",
    category: "Business",
  },
  {
    name: "Jewish Thought",
    degree: "MA",
    level: "graduate",
    category: "Humanities",
  },
  {
    name: "Linguistics",
    degree: "MA",
    level: "graduate",
    category: "Humanities",
  },
  { name: "Management", degree: "MS", level: "graduate", category: "Business" },
  {
    name: "Management Science",
    degree: "MBA",
    level: "graduate",
    category: "Business",
  },
  {
    name: "Materials Design & Innovation",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Mathematics",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Mechanical Engineering",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Media Arts & Sciences",
    degree: "MS",
    level: "graduate",
    category: "Arts",
  },
  {
    name: "Media Arts Production",
    degree: "MFA",
    level: "graduate",
    category: "Arts",
  },
  {
    name: "Medical Anatomy & Experimental Pathology",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Medical Physics",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Medicinal Chemistry",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Microbiology & Immunology",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Music Composition",
    degree: "MM",
    level: "graduate",
    category: "Arts",
  },
  { name: "Music History", degree: "MA", level: "graduate", category: "Arts" },
  {
    name: "Music Performance",
    degree: "MM",
    level: "graduate",
    category: "Arts",
  },
  { name: "Music Theory", degree: "MA", level: "graduate", category: "Arts" },
  {
    name: "Neuroscience",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  { name: "Nutrition", degree: "MS", level: "graduate", category: "Health" },
  {
    name: "Online Professional MBA",
    degree: "MBA",
    level: "graduate",
    category: "Business",
  },
  {
    name: "Oral Sciences",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  { name: "Orthodontics", degree: "MS", level: "graduate", category: "Health" },
  {
    name: "Pharmaceutical Sciences",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  { name: "Pharmacology", degree: "MS", level: "graduate", category: "Health" },
  {
    name: "Pharmacometrics & Personalized Pharmacotherapy",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Physics Education",
    degree: "MS",
    level: "graduate",
    category: "Education",
  },
  {
    name: "Public Health",
    degree: "BS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Real Estate Development",
    degree: "MS",
    level: "graduate",
    category: "Business",
  },
  {
    name: "Rehabilitation Counseling",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "Rehabilitation Science",
    degree: "MS",
    level: "graduate",
    category: "Health",
  },
  {
    name: "School Counseling",
    degree: "MS",
    level: "graduate",
    category: "Education",
  },
  {
    name: "School Librarianship",
    degree: "MS",
    level: "graduate",
    category: "Education",
  },
  {
    name: "Social Science–Interdisciplinary",
    degree: "MA",
    level: "graduate",
    category: "Social Sciences",
  },
  { name: "Social Work", degree: "MSW", level: "graduate", category: "Health" },
  {
    name: "Spanish Language & Literature",
    degree: "MA",
    level: "graduate",
    category: "Humanities",
  },
  {
    name: "Structural Biology",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Supply Chain Management",
    degree: "MS",
    level: "graduate",
    category: "Business",
  },
  {
    name: "Sustainability Leadership",
    degree: "MS",
    level: "graduate",
    category: "Sciences",
  },
  {
    name: "Sustainable Transportation & Logistics",
    degree: "MS",
    level: "graduate",
    category: "Engineering",
  },
  {
    name: "Teaching English to Speakers of Other Languages",
    degree: "MA",
    level: "graduate",
    category: "Education",
  },
  {
    name: "Theatre Performance",
    degree: "MFA",
    level: "graduate",
    category: "Arts",
  },
  {
    name: "Urban Planning",
    degree: "MUP",
    level: "graduate",
    category: "Architecture",
  },
];

// PhD Programs - 99 programs (key ones)
export const PHD_MAJORS: Major[] = [
  {
    name: "Aerospace Engineering",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  {
    name: "American Studies",
    degree: "PhD",
    level: "doctoral",
    category: "Humanities",
  },
  {
    name: "Anthropology",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Biochemistry",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Biological Sciences",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Biomedical Engineering",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  {
    name: "Biomedical Informatics",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Biostatistics",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Cancer Sciences",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Chemical Engineering",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  { name: "Chemistry", degree: "PhD", level: "doctoral", category: "Sciences" },
  {
    name: "Civil Engineering",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  {
    name: "Classics",
    degree: "PhD",
    level: "doctoral",
    category: "Humanities",
  },
  {
    name: "Communication",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Communicative Disorders & Sciences",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Community Health & Health Behavior",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Comparative Literature",
    degree: "PhD",
    level: "doctoral",
    category: "Humanities",
  },
  {
    name: "Computational & Data-Enabled Sciences",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Computational Cell Biology, Anatomy & Pathology",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Computer Science & Engineering",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  {
    name: "Counseling/School Psychology",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Curriculum, Instruction & the Science of Learning",
    degree: "PhD",
    level: "doctoral",
    category: "Education",
  },
  {
    name: "Economics",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Educational Administration",
    degree: "PhD",
    level: "doctoral",
    category: "Education",
  },
  {
    name: "Educational Culture, Policy & Society",
    degree: "PhD",
    level: "doctoral",
    category: "Education",
  },
  {
    name: "Educational Data Science",
    degree: "PhD",
    level: "doctoral",
    category: "Education",
  },
  {
    name: "Electrical Engineering",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  {
    name: "Engineering Education",
    degree: "PhD",
    level: "doctoral",
    category: "Education",
  },
  { name: "English", degree: "PhD", level: "doctoral", category: "Humanities" },
  {
    name: "Environmental & Water Resources Engineering",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  {
    name: "Epidemiology",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Evolution, Ecology & Behavior",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Exercise Science",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Genetics, Genomics & Bioinformatics",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Geography",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Geological Sciences",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Global Gender Studies",
    degree: "PhD",
    level: "doctoral",
    category: "Humanities",
  },
  {
    name: "Higher Education",
    degree: "PhD",
    level: "doctoral",
    category: "Education",
  },
  {
    name: "Historical Musicology & Music Theory",
    degree: "PhD",
    level: "doctoral",
    category: "Arts",
  },
  { name: "History", degree: "PhD", level: "doctoral", category: "Humanities" },
  {
    name: "Industrial Engineering",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  {
    name: "Information Science",
    degree: "PhD",
    level: "doctoral",
    category: "Information",
  },
  {
    name: "Language Education & Multilingualism",
    degree: "PhD",
    level: "doctoral",
    category: "Education",
  },
  {
    name: "Linguistics",
    degree: "PhD",
    level: "doctoral",
    category: "Humanities",
  },
  {
    name: "Management - Accounting",
    degree: "PhD",
    level: "doctoral",
    category: "Business",
  },
  {
    name: "Management - Finance",
    degree: "PhD",
    level: "doctoral",
    category: "Business",
  },
  {
    name: "Management - Management Science & Systems",
    degree: "PhD",
    level: "doctoral",
    category: "Business",
  },
  {
    name: "Management - Marketing",
    degree: "PhD",
    level: "doctoral",
    category: "Business",
  },
  {
    name: "Management - Operations Management & Strategy",
    degree: "PhD",
    level: "doctoral",
    category: "Business",
  },
  {
    name: "Materials Design & Innovation",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  {
    name: "Mathematics",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Mechanical Engineering",
    degree: "PhD",
    level: "doctoral",
    category: "Engineering",
  },
  { name: "Media Study", degree: "PhD", level: "doctoral", category: "Arts" },
  {
    name: "Medicinal Chemistry",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Microbiology & Immunology",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Music Composition",
    degree: "PhD",
    level: "doctoral",
    category: "Arts",
  },
  {
    name: "Neuroscience",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  { name: "Nursing", degree: "PhD", level: "doctoral", category: "Health" },
  {
    name: "Nutrition Science",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Oral Biology",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Pharmaceutical Sciences",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Pharmacology",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Philosophy",
    degree: "PhD",
    level: "doctoral",
    category: "Humanities",
  },
  { name: "Physics", degree: "PhD", level: "doctoral", category: "Sciences" },
  { name: "Physiology", degree: "PhD", level: "doctoral", category: "Health" },
  {
    name: "Political Science",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Psychology - Behavioral Neuroscience",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Psychology - Clinical",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Psychology - Cognitive",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Psychology - Social-Personality",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Rehabilitation Science",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Social Welfare",
    degree: "PhD",
    level: "doctoral",
    category: "Health",
  },
  {
    name: "Sociology",
    degree: "PhD",
    level: "doctoral",
    category: "Social Sciences",
  },
  {
    name: "Spanish Language & Literature",
    degree: "PhD",
    level: "doctoral",
    category: "Humanities",
  },
  {
    name: "Structural Biology",
    degree: "PhD",
    level: "doctoral",
    category: "Sciences",
  },
  {
    name: "Theatre Performance",
    degree: "PhD",
    level: "doctoral",
    category: "Arts",
  },
  {
    name: "Urban & Regional Planning",
    degree: "PhD",
    level: "doctoral",
    category: "Architecture",
  },
];

// Combined array of all majors
export const ALL_MAJORS: Major[] = [
  ...UNDERGRADUATE_MAJORS,
  ...MASTERS_MAJORS,
  ...PHD_MAJORS,
];

// Helper functions
export const getMajorsByLevel = (level: Major["level"]) => {
  return ALL_MAJORS.filter((major) => major.level === level);
};

export const getMajorsByCategory = (category: string) => {
  return ALL_MAJORS.filter((major) => major.category === category);
};

export const searchMajors = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return ALL_MAJORS.filter((major) =>
    major.name.toLowerCase().includes(lowercaseQuery)
  );
};

export const getMajorNames = () => {
  return ALL_MAJORS.map((major) => major.name);
};

// Categories for filtering
export const MAJOR_CATEGORIES = [
  "Arts",
  "Architecture",
  "Business",
  "Education",
  "Engineering",
  "Health",
  "Humanities",
  "Information",
  "Interdisciplinary",
  "Sciences",
  "Social Sciences",
] as const;

export type MajorCategory = (typeof MAJOR_CATEGORIES)[number];
