export const ALLOWED_SCHOOL_DOMAINS = {
  'buffalo.edu': 'University at Buffalo',
  'buffalostate.edu': 'Buffalo State University',
  'binghamton.edu': 'Binghamton University',
  'stonybrook.edu': 'Stony Brook University',
  'sbu.edu': 'St. Bonaventure University',
};

export const isDomainAllowed = (email: string): boolean => {
  const domain = email.split('@')[1];
  return domain in ALLOWED_SCHOOL_DOMAINS;
}; 