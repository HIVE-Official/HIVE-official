"use strict";
/**
 * Cohort Space Generation Utilities
 *
 * Generates cohort spaces for academic majors and graduation years
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCohortSpaces = generateCohortSpaces;
exports.createMajorAbbreviation = createMajorAbbreviation;
exports.getCohortSpaceId = getCohortSpaceId;
exports.isCohortSpace = isCohortSpace;
exports.parseCohortSpaceId = parseCohortSpaceId;
/**
 * Generate cohort space identifiers and metadata
 */
function generateCohortSpaces(config) {
    const { major, graduationYear, majorShortName } = config;
    // Create short year format (e.g., 2025 -> '25)
    const shortYear = `'${graduationYear.toString().slice(-2)}`;
    // Create major abbreviation if not provided
    const majorAbbrev = majorShortName || createMajorAbbreviation(major);
    const spaces = [
        // Major-specific space (all years)
        {
            id: `ub-major-${major.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
            name: `UB ${major}`,
            description: `Connect with University at Buffalo ${major} students across all graduation years for academic support and career networking`,
            type: 'cohort',
            tags: [
                {
                    type: 'cohort',
                    sub_type: 'major'
                }
            ],
            cohortData: {
                major,
                graduationYear: null, // All years
                cohortType: 'major',
                university: 'University at Buffalo'
            }
        },
        // Year-specific space (all majors)  
        {
            id: `ub-class-${graduationYear}`,
            name: `UB Class of ${shortYear}`,
            description: `University at Buffalo students graduating in ${graduationYear}. Connect with your class across all majors for networking and lifelong friendships`,
            type: 'cohort',
            tags: [
                {
                    type: 'cohort',
                    sub_type: 'graduation_year'
                }
            ],
            cohortData: {
                major: null, // All majors
                graduationYear,
                cohortType: 'graduation_year',
                university: 'University at Buffalo'
            }
        },
        // Major + Year specific space
        {
            id: `ub-cohort-${major.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${graduationYear}`,
            name: `UB ${majorAbbrev} ${shortYear}`,
            description: `University at Buffalo ${major} students graduating in ${graduationYear}. Your core academic cohort for study groups and career networking`,
            type: 'cohort',
            tags: [
                {
                    type: 'cohort',
                    sub_type: 'major_year'
                }
            ],
            cohortData: {
                major,
                graduationYear,
                cohortType: 'major_year',
                university: 'University at Buffalo'
            }
        }
    ];
    return spaces;
}
/**
 * Create a major abbreviation from the full major name
 */
function createMajorAbbreviation(major) {
    // Handle common major patterns
    const majorMappings = {
        'Computer Science': 'CS',
        'Computer Engineering': 'CE',
        'Electrical Engineering': 'EE',
        'Mechanical Engineering': 'ME',
        'Civil Engineering': 'CivE',
        'Chemical Engineering': 'ChemE',
        'Business Administration': 'BusAd',
        'Business': 'Bus',
        'Psychology': 'Psych',
        'Biology': 'Bio',
        'Chemistry': 'Chem',
        'Physics': 'Phys',
        'Mathematics': 'Math',
        'English': 'Eng',
        'Political Science': 'PoliSci',
        'International Relations': 'IR',
        'Communications': 'Comm',
        'Economics': 'Econ'
    };
    // Check for exact match first
    if (majorMappings[major]) {
        return majorMappings[major];
    }
    // Generate abbreviation from first letters of each word
    const words = major.split(' ').filter(word => word.length > 0);
    if (words.length === 1) {
        // Single word - take first 3-4 letters
        return words[0].slice(0, Math.min(4, words[0].length));
    }
    // Multiple words - take first letter of each word, max 4 characters
    const abbreviation = words
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .slice(0, 4);
    return abbreviation;
}
/**
 * Generate space ID from cohort data
 */
function getCohortSpaceId(major, graduationYear) {
    if (major && graduationYear) {
        return `ub-cohort-${major.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${graduationYear}`;
    }
    else if (major) {
        return `ub-major-${major.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    }
    else if (graduationYear) {
        return `ub-class-${graduationYear}`;
    }
    throw new Error('Either major or graduationYear must be provided');
}
/**
 * Check if a space is a cohort space
 */
function isCohortSpace(spaceId) {
    return spaceId.startsWith('ub-cohort-') || spaceId.startsWith('ub-major-') || spaceId.startsWith('ub-class-') ||
        spaceId.startsWith('cohort-') || spaceId.startsWith('major-') || spaceId.startsWith('class-');
}
/**
 * Parse cohort data from space ID
 */
function parseCohortSpaceId(spaceId) {
    if (spaceId.startsWith('ub-cohort-')) {
        // Format: ub-cohort-major-name-year
        const parts = spaceId.split('-');
        const year = parseInt(parts[parts.length - 1]);
        const majorParts = parts.slice(2, -1); // Skip 'ub' and 'cohort'
        const major = majorParts.join(' ').replace(/-/g, ' ');
        return {
            major,
            graduationYear: year,
            cohortType: 'major_year'
        };
    }
    else if (spaceId.startsWith('ub-major-')) {
        // Format: ub-major-name
        const major = spaceId.substring(9).replace(/-/g, ' '); // Skip 'ub-major-'
        return {
            major,
            cohortType: 'major'
        };
    }
    else if (spaceId.startsWith('ub-class-')) {
        // Format: ub-class-year
        const year = parseInt(spaceId.substring(9)); // Skip 'ub-class-'
        return {
            graduationYear: year,
            cohortType: 'graduation_year'
        };
    }
    else if (spaceId.startsWith('cohort-')) {
        // Legacy format: cohort-major-name-year
        const parts = spaceId.split('-');
        const year = parseInt(parts[parts.length - 1]);
        const majorParts = parts.slice(1, -1);
        const major = majorParts.join(' ').replace(/-/g, ' ');
        return {
            major,
            graduationYear: year,
            cohortType: 'major_year'
        };
    }
    else if (spaceId.startsWith('major-')) {
        // Legacy format: major-name
        const major = spaceId.substring(6).replace(/-/g, ' ');
        return {
            major,
            cohortType: 'major'
        };
    }
    else if (spaceId.startsWith('class-')) {
        // Legacy format: class-year
        const year = parseInt(spaceId.substring(6));
        return {
            graduationYear: year,
            cohortType: 'graduation_year'
        };
    }
    return null;
}
//# sourceMappingURL=cohort-spaces.js.map