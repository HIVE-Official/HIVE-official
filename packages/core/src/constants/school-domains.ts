import type { School } from '../domain/school';
import { Timestamp } from 'firebase/firestore';

const now = Timestamp.now();

export const SCHOOLS: School[] = [
  {
    id: 'buffalo',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'open',
    studentsUntilOpen: 0,
    waitlistCount: 0,
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'buffalostate',
    name: 'Buffalo State University',
    domain: 'buffalostate.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0,
    city: 'Buffalo',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'binghamton',
    name: 'Binghamton University',
    domain: 'binghamton.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0,
    city: 'Binghamton',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'stonybrook',
    name: 'Stony Brook University',
    domain: 'stonybrook.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0,
    city: 'Stony Brook',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'sbu',
    name: 'St. Bonaventure University',
    domain: 'sbu.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0,
    city: 'St. Bonaventure',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0,
    city: 'Ithaca',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'syracuse',
    name: 'Syracuse University',
    domain: 'syracuse.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0,
    city: 'Syracuse',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'rit',
    name: 'Rochester Institute of Technology',
    domain: 'rit.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0,
    city: 'Rochester',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'rochester',
    name: 'University of Rochester',
    domain: 'rochester.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0,
    city: 'Rochester',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
  },
  {
    id: 'albany',
    name: 'University at Albany',
    domain: 'albany.edu',
    status: 'waitlist',
    studentsUntilOpen: 350,
    waitlistCount: 0,
    city: 'Albany',
    state: 'NY',
    country: 'US',
    timezone: 'America/New_York',
    majors: [],
    academicCalendar: 'semester',
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: now,
    updatedAt: now
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