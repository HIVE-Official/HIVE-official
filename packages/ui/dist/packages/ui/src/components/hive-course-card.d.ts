/**
 * HIVE Course Card Component
 *
 * Campus-focused course card built on the unified card system,
 * designed for academic program display, course enrollment, and
 * educational resource management.
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { HiveCardBaseProps } from './card-system/hive-card-system';
declare const hiveCourseCardVariants: (props?: {
    status?: "open" | "closed" | "waitlist" | "enrolled" | "completed";
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert";
    courseType?: "project" | "lecture" | "seminar" | "lab" | "independent";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface CourseSchedule {
    days: string[];
    startTime: string;
    endTime: string;
    location: string;
    building?: string;
    room?: string;
}
export interface CoursePrerequisite {
    id: string;
    code: string;
    title: string;
    required: boolean;
}
export interface CourseInstructor {
    id: string;
    name: string;
    title: string;
    email?: string;
    avatar?: string;
    departmentId?: string;
}
export interface CourseMetadata {
    credits: number;
    department: string;
    school?: string;
    semester: string;
    year: number;
    capacity: number;
    enrolled: number;
    waitlist?: number;
    reviews?: number;
    lastUpdated?: Date;
}
export interface Course {
    id: string;
    code: string;
    title: string;
    description: string;
    status: 'open' | 'waitlist' | 'closed' | 'enrolled' | 'completed';
    difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    courseType: 'lecture' | 'seminar' | 'lab' | 'project' | 'independent';
    instructor: CourseInstructor;
    schedule: CourseSchedule;
    prerequisites: CoursePrerequisite[];
    metadata: CourseMetadata;
    image?: string;
    color?: string;
    tags?: string[];
    spaceId?: string;
    toolsRequired?: string[];
    projectBased?: boolean;
    collaborationLevel?: 'individual' | 'pair' | 'team' | 'mixed';
}
export interface HiveCourseCardProps extends Omit<HiveCardBaseProps, 'variant' | 'onDrop'>, VariantProps<typeof hiveCourseCardVariants> {
    course: Course;
    showFullDetails?: boolean;
    showPrerequisites?: boolean;
    showInstructor?: boolean;
    showSchedule?: boolean;
    showEnrollment?: boolean;
    showActions?: boolean;
    onEnroll?: (courseId: string) => void;
    onDrop?: (courseId: string) => void;
    onWaitlist?: (courseId: string) => void;
    onViewDetails?: (courseId: string) => void;
    onContactInstructor?: (instructorId: string) => void;
    onFavorite?: (courseId: string) => void;
    onShare?: (courseId: string) => void;
    onBookmark?: (courseId: string) => void;
    onViewSpace?: (spaceId: string) => void;
    onViewPrerequisite?: (prerequisiteId: string) => void;
    isFavorited?: boolean;
    isBookmarked?: boolean;
    isEnrolled?: boolean;
    userRole?: 'student' | 'instructor' | 'admin';
}
declare const HiveCourseCard: React.ForwardRefExoticComponent<HiveCourseCardProps & React.RefAttributes<HTMLDivElement>>;
export { HiveCourseCard, hiveCourseCardVariants };
//# sourceMappingURL=hive-course-card.d.ts.map