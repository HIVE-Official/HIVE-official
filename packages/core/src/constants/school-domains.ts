import type { School } from '../domain/school';

export const SCHOOLS: School[] = [
  {
    id: 'buffalo',
    name: 'University at Buffalo',
    domain: 'buffalo.edu',
    status: 'active',
    waitlistCount: 0,
  },
  {
    id: 'buffalostate',
    name: 'Buffalo State University',
    domain: 'buffalostate.edu',
    status: 'waitlist',
    waitlistCount: 350,
  },
  {
    id: 'binghamton',
    name: 'Binghamton University',
    domain: 'binghamton.edu',
    status: 'waitlist',
    waitlistCount: 350,
  },
  {
    id: 'stonybrook',
    name: 'Stony Brook University',
    domain: 'stonybrook.edu',
    status: 'waitlist',
    waitlistCount: 350,
  },
  {
    id: 'sbu',
    name: 'St. Bonaventure University',
    domain: 'sbu.edu',
    status: 'waitlist',
    waitlistCount: 350,
  },
  {
    id: 'cornell',
    name: 'Cornell University',
    domain: 'cornell.edu',
    status: 'waitlist',
    waitlistCount: 350,
  },
  {
    id: 'syracuse',
    name: 'Syracuse University',
    domain: 'syracuse.edu',
    status: 'waitlist',
    waitlistCount: 350,
  },
  {
    id: 'rit',
    name: 'Rochester Institute of Technology',
    domain: 'rit.edu',
    status: 'waitlist',
    waitlistCount: 350,
  },
  {
    id: 'rochester',
    name: 'University of Rochester',
    domain: 'rochester.edu',
    status: 'waitlist',
    waitlistCount: 350,
  },
  {
    id: 'rpi',
    name: 'Rensselaer Polytechnic Institute',
    domain: 'rpi.edu',
    status: 'waitlist',
    waitlistCount: 350,
  }
];

export const findSchoolByDomain = (domain: string): School | undefined => {
  return SCHOOLS.find(school => school.domain === domain);
};

export const findSchoolById = (id: string): School | undefined => {
  return SCHOOLS.find(school => school.id === id);
};