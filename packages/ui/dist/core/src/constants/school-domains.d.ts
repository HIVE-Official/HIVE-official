import type { School } from '../domain/school';
export declare const SCHOOLS: School[];
export declare const ALLOWED_SCHOOL_DOMAINS: Record<string, string>;
export declare const getSchoolByDomain: (domain: string) => School | undefined;
export declare const getSchoolById: (id: string) => School | undefined;
export declare const isDomainAllowed: (email: string) => boolean;
export declare const searchSchools: (query: string) => School[];
//# sourceMappingURL=school-domains.d.ts.map