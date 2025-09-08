import * as React from 'react';
export interface StudyGroupMember {
    id: string;
    name: string;
    avatar?: string;
    major: string;
    year: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';
    gpa?: number;
    availability: string[];
    studyPreferences: string[];
    location: string;
    bio?: string;
    sharedCourses?: string[];
    studyStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
    goals: string[];
    rating?: number;
    joinedGroups: number;
}
export interface StudyGroup {
    id: string;
    name: string;
    course: string;
    description: string;
    members: StudyGroupMember[];
    maxMembers: number;
    schedule: string[];
    location: string;
    studyType: 'exam-prep' | 'homework' | 'project' | 'ongoing' | 'review';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    tags: string[];
    created: Date;
    isPublic: boolean;
    requirements?: string[];
}
export interface StudyGroupMatcherProps extends React.HTMLAttributes<HTMLDivElement> {
    currentUser?: StudyGroupMember;
    availableMembers?: StudyGroupMember[];
    existingGroups?: StudyGroup[];
    userCourses?: string[];
    onCreateGroup?: (group: Partial<StudyGroup>) => void;
    onJoinGroup?: (groupId: string) => void;
    onConnectMember?: (memberId: string) => void;
    onSendMessage?: (memberId: string, message: string) => void;
    showMatchScore?: boolean;
    maxSuggestions?: number;
    loading?: boolean;
    error?: string;
}
declare const StudyGroupMatcher: React.ForwardRefExoticComponent<StudyGroupMatcherProps & React.RefAttributes<HTMLDivElement>>;
export { StudyGroupMatcher };
//# sourceMappingURL=study-group-matcher.d.ts.map