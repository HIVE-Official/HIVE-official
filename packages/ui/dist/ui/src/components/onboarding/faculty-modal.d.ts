import React from 'react';
interface FacultyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: (data: {
        firstName: string;
        lastName: string;
        role: string;
        selectedSpaceId: string;
    }) => void;
    schoolName: string;
    userEmail: string;
}
export declare const FacultyModal: React.FC<FacultyModalProps>;
export {};
//# sourceMappingURL=faculty-modal.d.ts.map