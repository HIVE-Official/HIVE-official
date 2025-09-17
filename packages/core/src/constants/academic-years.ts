export type AcademicYear = {
  name: string;
  value: string;
  level: "undergraduate" | "graduate" | "doctoral";
};

export const ACADEMIC_YEARS: AcademicYear[] = [
  // Undergraduate
  { name: "Freshman", value: "freshman", level: "undergraduate" },
  { name: "Sophomore", value: "sophomore", level: "undergraduate" },
  { name: "Junior", value: "junior", level: "undergraduate" },
  { name: "Senior", value: "senior", level: "undergraduate" },
  
  // Graduate
  { name: "Master's - First Year", value: "masters_1", level: "graduate" },
  { name: "Master's - Second Year", value: "masters_2", level: "graduate" },
  { name: "Master's - Third Year", value: "masters_3", level: "graduate" },
  
  // Doctoral
  { name: "PhD - First Year", value: "phd_1", level: "doctoral" },
  { name: "PhD - Second Year", value: "phd_2", level: "doctoral" },
  { name: "PhD - Third Year", value: "phd_3", level: "doctoral" },
  { name: "PhD - Fourth Year", value: "phd_4", level: "doctoral" },
  { name: "PhD - Fifth Year", value: "phd_5", level: "doctoral" },
  { name: "PhD - Sixth Year", value: "phd_6", level: "doctoral" },
  { name: "PhD - Seventh Year", value: "phd_7", level: "doctoral" },
  { name: "PhD - Eighth Year", value: "phd_8", level: "doctoral" }
]; 