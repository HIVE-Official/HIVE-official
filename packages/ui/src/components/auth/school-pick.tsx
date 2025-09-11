import React from 'react';
import { Card } from '../../atomic/ui/card';
import { ButtonEnhanced } from '../../atomic/atoms/button-enhanced';

export interface School {
  id: string;
  name: string;
  domain: string;
  logo?: string;
  studentCount?: number;
}

export interface SchoolPickProps {
  schools: School[];
  onSchoolSelect: (school: School) => void;
  isLoading?: boolean;
}

export const SchoolPick: React.FC<SchoolPickProps> = ({ schools, onSchoolSelect, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {schools.map((school) => (
        <Card 
          key={school.id}
          className="p-6 hover:border-[var(--hive-gold)] transition-all cursor-pointer"
          onClick={() => !isLoading && onSchoolSelect(school)}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">{school.name}</h3>
              <p className="text-sm text-gray-400">{school.domain}</p>
              {school.studentCount && (
                <p className="text-xs text-gray-500 mt-1">
                  {school.studentCount.toLocaleString()} students
                </p>
              )}
            </div>
            <ButtonEnhanced
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="border-[var(--hive-gold)] text-[var(--hive-gold)] hover:bg-[var(--hive-gold)] hover:text-black"
            >
              Select
            </ButtonEnhanced>
          </div>
        </Card>
      ))}
    </div>
  );
};