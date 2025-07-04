import type { School } from '../domain/school';

export const SCHOOLS: School[] = [
  {
    id: 'buffalo',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open',
    studentsUntilOpen: 0,
    waitlistCount: 0
  },
  {
    id: 'buffalostate',
    name: 'Buffalo State University',
    domain: 'buffalostate.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0
  },
  {
    id: 'binghamton',
    name: 'Binghamton University',
    domain: 'binghamton.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0
  },
  {
    id: 'stonybrook',
    name: 'Stony Brook University',
    domain: 'stonybrook.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0
  },
  {
    id: 'sbu',
    name: 'St. Bonaventure University',
    domain: 'sbu.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0
  },
  {
    id: 'syracuse',
    name: 'Syracuse University',
    domain: 'syracuse.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0
  },
  {
    id: 'rit',
    name: 'Rochester Institute of Technology',
    domain: 'rit.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0
  },
  {
    id: 'rochester',
    name: 'University of Rochester',
    domain: 'rochester.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0
  },
  {
    id: 'albany',
    name: 'University at Albany',
    domain: 'albany.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0
  }
];

export const ALLOWED_SCHOOL_DOMAINS = SCHOOLS.reduce((acc, school) => {
  acc[school.domain] = school.name;
  return acc;
}, {} as Record<string, string>);

export const getSchoolByDomain = (domain: string): School | undefined => {
  return SCHOOLS.find(school => school.domain === domain);
};

export const getSchoolById = (id: string): School | undefined => {
  return SCHOOLS.find(school => school.id === id);
};

export const isDomainAllowed = (email: string): boolean => {
  const domain = email.split('@')[1];
  return domain in ALLOWED_SCHOOL_DOMAINS;
};

export const searchSchools = (query: string): School[] => {
  const lowerQuery = query.toLowerCase();
  return SCHOOLS.filter(school => 
    school.name.toLowerCase().includes(lowerQuery) ||
    school.domain.toLowerCase().includes(lowerQuery)
  );
}; 