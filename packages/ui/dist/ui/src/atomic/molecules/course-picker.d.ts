import * as React from 'react';
export interface CourseInfo {
    id: string;
    code: string;
    title: string;
    credits: number;
    department: string;
    instructor?: string;
    schedule?: string;
    location?: string;
    description?: string;
    prerequisites?: string[];
    seats: {
        available: number;
        total: number;
    };
    status: 'open' | 'waitlist' | 'closed';
    semester: string;
}
export interface CoursePickerProps extends React.HTMLAttributes<HTMLDivElement> {
    courses: CourseInfo[];
    selectedCourses?: CourseInfo[];
    onCourseSelect?: (course: CourseInfo) => void;
    onCourseRemove?: (course: CourseInfo) => void;
    maxCourses?: number;
    searchable?: boolean;
    showPrerequisites?: boolean;
    showScheduleConflicts?: boolean;
    semester?: string;
    departments?: string[];
    onDepartmentFilter?: (department: string | null) => void;
    loading?: boolean;
    error?: string;
}
declare const CoursePicker: React.ForwardRefExoticComponent<CoursePickerProps & React.RefAttributes<HTMLDivElement>>;
export { CoursePicker };
//# sourceMappingURL=course-picker.d.ts.map