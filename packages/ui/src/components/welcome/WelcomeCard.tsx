import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Card';
import { cn } from '@/lib/utils';
import { SchoolSearchInput } from './SchoolSearchInput';

interface WelcomeCardProps {
  className?: string;
}

// A placeholder for the HIVE logomark.
// The final implementation will use an <Image> component with the actual asset.
const HiveLogoPlaceholder = () => (
  <div
    className="bg-accent-gold w-8 h-8 md:w-10 md:h-10"
    aria-label="HIVE logomark"
    role="img"
  />
);

const WelcomeCard = React.forwardRef<HTMLDivElement, WelcomeCardProps>(
  ({ className, ...props }, ref) => {
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.33, 0.65, 0, 1],
        },
      },
    };

    const logoVariants = {
      hidden: { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.25,
          ease: [0.33, 0.65, 0, 1], // swiftInOut as per spec (custom-bezier)
          delay: 0.2,
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        <Card
          className={cn(
            'w-full max-w-md mx-auto',
            className
          )}
          ref={ref}
          {...props}
        >
          <CardHeader className="items-center text-center">
            <motion.div variants={logoVariants} className="mb-4">
               <HiveLogoPlaceholder />
            </motion.div>
            <CardTitle className="font-display text-h1">
              Choose your campus
            </CardTitle>
            <CardDescription className="text-muted !mt-3 max-w-xs">
              Pick your university to step inside HIVE. Don't see it? Tap Join
              waitlist and we'll bring the hive to you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SchoolSearchInput onSchoolSelect={(id) => console.log('Selected school:', id)} />
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

WelcomeCard.displayName = 'WelcomeCard';

export { WelcomeCard }; 