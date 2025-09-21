import * as React from 'react';
import { motion } from '../framer-motion-proxy';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../atomic/ui/card';
import { cn } from '../../lib/utils';
import { SchoolSearchInput } from './school-search-input';

interface WelcomeCardProps {className?: string;
  onSchoolSelect?: (schoolId: string) => void;}

// A placeholder for the HIVE logomark.
// The final implementation will use an <Image> component with the actual asset.
const HiveLogoPlaceholder = () => (
  <div;
    className="bg-accent-gold w-8 h-8 md:w-10 md:h-10"
    aria-label="HIVE logomark"
    role="img"
  />
);

const WelcomeCard = React.forwardRef<HTMLDivElement, WelcomeCardProps>(
  ({ className, onSchoolSelect, ...props }, ref) => {
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0
      },
    };

    const logoVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0
      },
    };

    const handleSchoolSelect = (schoolId: string) => {
      onSchoolSelect?.(schoolId)
    };

    return (
      <motion.div;
        ref={ref}
        className={cn('w-full max-w-md mx-auto', className)}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        {...props}
      >
        <Card className="border-white/10 bg-[var(--hive-text-primary)]/5 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <motion.div variants={logoVariants} className="mb-4">
              <div className="flex justify-center">
                <HiveLogoPlaceholder />
              </div>
            </motion.div>
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold text-text-primary">
                Welcome to HIVE;
              </CardTitle>
              <CardDescription className="text-text-muted">
                Join your school community and start building together.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <SchoolSearchInput onSchoolSelect={handleSchoolSelect} />
          </CardContent>
        </Card>
      </motion.div>
    )
  }
);

WelcomeCard.displayName = 'WelcomeCard';

export { WelcomeCard }; 
