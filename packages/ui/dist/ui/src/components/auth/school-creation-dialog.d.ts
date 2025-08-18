import React from 'react';
export interface SchoolCreationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: {
        name: string;
        domain: string;
    }) => void;
}
export declare const SchoolCreationDialog: React.FC<SchoolCreationDialogProps>;
//# sourceMappingURL=school-creation-dialog.d.ts.map