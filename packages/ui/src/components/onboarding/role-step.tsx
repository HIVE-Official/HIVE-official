"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Briefcase, AlertCircle } from 'lucide-react';
import { Button } from '../button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../card';
import { Alert } from '../alert';
import { cn } from '../../lib/utils';

interface RoleOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  comingSoon?: boolean;
}

interface RoleStepProps {
  onRoleSelect: (roleId: string) => void;
  onContinue: () => void;
  selectedRole?: string;
  className?: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'undergraduate',
    title: 'Undergraduate Student',
    description: 'Currently pursuing a bachelor\'s degree',
    icon: <GraduationCap className="w-6 h-6" />,
    isActive: true
  },
  {
    id: 'graduate',
    title: 'Graduate Student',
    description: 'Pursuing master\'s, PhD, or professional degree',
    icon: <BookOpen className="w-6 h-6" />,
    isActive: true
  },
  {
    id: 'faculty',
    title: 'Faculty & Staff',
    description: 'University employees, professors, and staff',
    icon: <Briefcase className="w-6 h-6" />,
    isActive: false,
    comingSoon: true
  },
  {
    id: 'alumni',
    title: 'Alumni',
    description: 'Graduated from this university',
    icon: <Users className="w-6 h-6" />,
    isActive: false,
    comingSoon: true
  }
];

export const RoleStep: React.FC<RoleStepProps> = ({
  onRoleSelect,
  onContinue,
  selectedRole,
  className
}) => {
  const [localSelectedRole, setLocalSelectedRole] = useState(selectedRole || '');

  const handleRoleClick = (roleId: string, isActive: boolean) => {
    if (!isActive) return;
    
    setLocalSelectedRole(roleId);
    onRoleSelect(roleId);
  };

  const canContinue = localSelectedRole && ROLE_OPTIONS.find(r => r.id === localSelectedRole)?.isActive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("w-full max-w-2xl mx-auto", className)}
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-3">What's your role?</h1>
        <p className="text-lg text-muted">
          Help us customize your HIVE experience for your campus life
        </p>
      </div>

      <div className="space-y-6">
        {/* Role Options */}
        <div className="grid gap-4">
          {ROLE_OPTIONS.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                variant={localSelectedRole === role.id ? "accent" : role.isActive ? "interactive" : "default"}
                padding="md"
                className={cn(
                  "transition-all duration-200",
                  role.isActive ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handleRoleClick(role.id, role.isActive)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "p-3 rounded-lg flex-shrink-0",
                      role.isActive 
                        ? localSelectedRole === role.id 
                          ? "bg-accent/20 text-accent" 
                          : "bg-surface text-white"
                        : "bg-surface/50 text-muted"
                    )}>
                      {role.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={cn(
                          "font-semibold",
                          role.isActive ? "text-white" : "text-muted"
                        )}>
                          {role.title}
                        </h3>
                        {localSelectedRole === role.id && role.isActive && (
                          <div className="w-2 h-2 bg-accent rounded-full" />
                        )}
                        {role.comingSoon && (
                          <span className="text-xs bg-surface/50 text-muted px-2 py-1 rounded">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className={cn(
                        "text-sm",
                        role.isActive ? "text-muted" : "text-muted/70"
                      )}>
                        {role.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Info Alert */}
        <Alert variant="info">
          <AlertCircle className="w-4 h-4" />
          <div>
            <p className="font-medium">Student-focused launch</p>
            <p className="text-sm">
              HIVE is currently optimized for student experiences. Faculty and alumni access will be available soon.
            </p>
          </div>
        </Alert>

        {/* Continue Button */}
        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onContinue}
            disabled={!canContinue}
            className="min-w-[140px]"
          >
            Continue
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center text-sm text-muted">
          Your role helps us show you relevant spaces and content for your campus experience.
        </div>
      </div>
    </motion.div>
  );
};