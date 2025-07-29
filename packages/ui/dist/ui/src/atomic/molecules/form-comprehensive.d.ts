import React from 'react';
export interface UniversityEmailFieldProps {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    university?: string;
    className?: string;
}
export declare const UniversityEmailFieldMolecule: React.FC<UniversityEmailFieldProps>;
export interface StudentIDFieldProps {
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    error?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}
export declare const StudentIDFieldMolecule: React.FC<StudentIDFieldProps>;
export interface MajorSelectionFieldProps {
    major?: string;
    year?: string;
    onMajorChange?: (value: string) => void;
    onYearChange?: (value: string) => void;
    majorError?: string;
    yearError?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}
export declare const MajorSelectionFieldMolecule: React.FC<MajorSelectionFieldProps>;
export interface DormSelectionFieldProps {
    dormBuilding?: string;
    roomNumber?: string;
    onDormChange?: (value: string) => void;
    onRoomChange?: (value: string) => void;
    dormError?: string;
    roomError?: string;
    required?: boolean;
    disabled?: boolean;
    className?: string;
}
export declare const DormSelectionFieldMolecule: React.FC<DormSelectionFieldProps>;
export interface GreekAffiliationFieldProps {
    organization?: string;
    position?: string;
    onOrganizationChange?: (value: string) => void;
    onPositionChange?: (value: string) => void;
    organizationError?: string;
    positionError?: string;
    disabled?: boolean;
    className?: string;
}
export declare const GreekAffiliationFieldMolecule: React.FC<GreekAffiliationFieldProps>;
export interface CalendarConnectionFieldProps {
    googleCalendar?: boolean;
    outlookCalendar?: boolean;
    appleCalendar?: boolean;
    onGoogleChange?: (enabled: boolean) => void;
    onOutlookChange?: (enabled: boolean) => void;
    onAppleChange?: (enabled: boolean) => void;
    error?: string;
    disabled?: boolean;
    className?: string;
}
export declare const CalendarConnectionFieldMolecule: React.FC<CalendarConnectionFieldProps>;
export interface PrivacyLevelFieldProps {
    value?: 'public' | 'friends' | 'ghost';
    onChange?: (value: 'public' | 'friends' | 'ghost') => void;
    error?: string;
    disabled?: boolean;
    className?: string;
}
export declare const PrivacyLevelFieldMolecule: React.FC<PrivacyLevelFieldProps>;
export interface BuilderVerificationFieldProps {
    portfolioUrl?: string;
    githubUrl?: string;
    experience?: string;
    onPortfolioChange?: (value: string) => void;
    onGithubChange?: (value: string) => void;
    onExperienceChange?: (value: string) => void;
    portfolioError?: string;
    githubError?: string;
    experienceError?: string;
    disabled?: boolean;
    className?: string;
}
export declare const BuilderVerificationFieldMolecule: React.FC<BuilderVerificationFieldProps>;
export interface SpaceActivationFieldProps {
    spaceName?: string;
    spaceType?: string;
    description?: string;
    expectedMembers?: string;
    onSpaceNameChange?: (value: string) => void;
    onSpaceTypeChange?: (value: string) => void;
    onDescriptionChange?: (value: string) => void;
    onExpectedMembersChange?: (value: string) => void;
    spaceNameError?: string;
    spaceTypeError?: string;
    descriptionError?: string;
    disabled?: boolean;
    className?: string;
}
export declare const SpaceActivationFieldMolecule: React.FC<SpaceActivationFieldProps>;
export interface ToolPublishingFieldProps {
    toolName?: string;
    toolDescription?: string;
    toolCategory?: string;
    repositoryUrl?: string;
    onToolNameChange?: (value: string) => void;
    onToolDescriptionChange?: (value: string) => void;
    onToolCategoryChange?: (value: string) => void;
    onRepositoryUrlChange?: (value: string) => void;
    toolNameError?: string;
    toolDescriptionError?: string;
    toolCategoryError?: string;
    repositoryError?: string;
    disabled?: boolean;
    className?: string;
}
export declare const ToolPublishingFieldMolecule: React.FC<ToolPublishingFieldProps>;
//# sourceMappingURL=form-comprehensive.d.ts.map