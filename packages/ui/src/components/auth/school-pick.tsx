import React from 'react';

export interface SchoolPickProps {
  onSelect?: (schoolId: string) => void;
}

export const SchoolPick: React.FC<SchoolPickProps> = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Select your school</h2>
    </div>
  );
};