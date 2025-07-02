export interface School {
  id: string;
  name: string;
  domain: string;
  status: 'open' | 'waitlist' | 'coming-soon';
  studentsUntilOpen: number;
  waitlistCount: number;
} 