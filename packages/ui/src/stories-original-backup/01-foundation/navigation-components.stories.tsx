import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, Calendar, Settings, ChevronLeft, ChevronRight, Check } from 'lucide-react';

const meta: Meta = {
  title: '01-Foundation/Navigation Components',
  parameters: {
    docs: {
      description: {
        component: 'HIVE Navigation Components - Bottom Tab Bar, Step Indicator, and Pagination with dark luxury aesthetic',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Bottom Tab Bar Component
const BottomTabBar = ({ 
  items, 
  activeIndex, 
  onTabChange 
}: { 
  items: Array<{icon: React.ReactNode, label: string, badge?: number}>
  activeIndex: number
  onTabChange: (index: number) => void
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--hive-background-primary)]/95 backdrop-blur-md border-t border-white/5">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {items.map((item, index) => (
          <motion.button
            key={index}
            onClick={() => onTabChange(index)}
            className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ${
              activeIndex === index 
                ? 'text-[var(--hive-brand-secondary)]' 
                : 'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Active indicator */}
            {activeIndex === index && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[var(--hive-brand-secondary)]/10 rounded-lg border border-[var(--hive-brand-secondary)]/20"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {/* Icon with badge */}
            <div className="relative mb-1">
              {item.icon}
              {item.badge && item.badge > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 min-w-4 h-4 bg-[var(--hive-status-error)] rounded-full flex items-center justify-center px-1"
                >
                  <span className="text-xs font-medium text-[var(--hive-text-primary)]">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                </motion.div>
              )}
            </div>
            
            {/* Label */}
            <span className="text-xs font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// Step Indicator Component
const StepIndicator = ({ 
  steps, 
  currentStep, 
  completedSteps 
}: { 
  steps: string[]
  currentStep: number
  completedSteps: Set<number>
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <motion.div
                className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  completedSteps.has(index)
                    ? 'bg-[var(--hive-brand-secondary)] border-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]'
                    : currentStep === index
                    ? 'bg-[var(--hive-background-tertiary)] border-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]'
                    : 'bg-[var(--hive-background-secondary)] border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)]'
                }`}
                whileHover={{ scale: 1.05 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {completedSteps.has(index) ? (
                  <Check size={20} />
                ) : (
                  <span className="font-semibold">{index + 1}</span>
                )}
              </motion.div>
              
              {/* Step Label */}
              <span className={`mt-3 text-sm font-medium text-center max-w-[30] transition-colors duration-300 ${
                currentStep === index 
                  ? 'text-[var(--hive-brand-secondary)]' 
                  : completedSteps.has(index)
                  ? 'text-[var(--hive-text-secondary)]'
                  : 'text-[var(--hive-text-tertiary)]'
              }`}>
                {step}
              </span>
            </div>
            
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4 mt-6 relative">
                <div className="absolute inset-0 bg-[var(--hive-border-default)] rounded-full" />
                <motion.div
                  className="absolute inset-0 bg-[var(--hive-brand-secondary)] rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: completedSteps.has(index) ? 1 : currentStep > index ? 1 : 0 
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showFirstLast = true,
  showPrevNext = true 
}: { 
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showFirstLast?: boolean
  showPrevNext?: boolean
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* First Page */}
      {showFirstLast && currentPage > 1 && (
        <motion.button
          onClick={() => onPageChange(1)}
          className="px-3 py-2 text-sm font-medium text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          First
        </motion.button>
      )}

      {/* Previous */}
      {showPrevNext && currentPage > 1 && (
        <motion.button
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] hover:border-[var(--hive-brand-secondary)]/20 transition-all duration-200"
          whileHover={{ scale: 1.05, backgroundColor: 'var(--hive-background-tertiary)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronLeft size={16} />
        </motion.button>
      )}

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-[var(--hive-text-tertiary)]">...</span>
          ) : (
            <motion.button
              onClick={() => onPageChange(page as number)}
              className={`flex items-center justify-center w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentPage === page
                  ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] border-[var(--hive-brand-secondary)]'
                  : 'bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] hover:border-[var(--hive-brand-secondary)]/20'
              }`}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: currentPage === page ? 'var(--hive-brand-secondary)' : 'var(--hive-background-tertiary)' 
              }}
              whileTap={{ scale: 0.95 }}
            >
              {page}
            </motion.button>
          )}
        </React.Fragment>
      ))}

      {/* Next */}
      {showPrevNext && currentPage < totalPages && (
        <motion.button
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] hover:border-[var(--hive-brand-secondary)]/20 transition-all duration-200"
          whileHover={{ scale: 1.05, backgroundColor: 'var(--hive-background-tertiary)' }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRight size={16} />
        </motion.button>
      )}

      {/* Last Page */}
      {showFirstLast && currentPage < totalPages && (
        <motion.button
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-2 text-sm font-medium text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Last
        </motion.button>
      )}
    </div>
  );
};

// Stories
export const BottomTabBarStory: Story = {
  name: 'Bottom Tab Bar',
  render: () => {
    const [activeTab, setActiveTab] = React.useState(0);
    
    const tabItems = [
      { icon: <Home size={20} />, label: 'Home', badge: 0 },
      { icon: <Users size={20} />, label: 'Spaces', badge: 3 },
      { icon: <Calendar size={20} />, label: 'Events', badge: 12 },
      { icon: <Settings size={20} />, label: 'Settings', badge: 0 },
    ];

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen pb-20 p-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-8">Bottom Tab Bar</h2>
        <p className="text-[var(--hive-text-secondary)] mb-8">
          Mobile-first navigation with badges, active states, and liquid metal animations.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="text-[var(--hive-text-secondary)]">Current Tab: <span className="text-[var(--hive-brand-secondary)]">{tabItems[activeTab].label}</span></div>
        </div>
        
        <BottomTabBar 
          items={tabItems}
          activeIndex={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    );
  },
};

export const StepIndicatorStory: Story = {
  name: 'Step Indicator',
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set([0]));
    
    const steps = [
      'Account Setup',
      'University Verification', 
      'Profile Creation',
      'Space Discovery',
      'Welcome Complete'
    ];

    const handleNextStep = () => {
      if (currentStep < steps.length - 1) {
        setCompletedSteps(prev => new Set([...prev, currentStep]));
        setCurrentStep(currentStep + 1);
      }
    };

    const handlePrevStep = () => {
      if (currentStep > 0) {
        setCompletedSteps(prev => {
          const newSet = new Set(prev);
          newSet.delete(currentStep);
          return newSet;
        });
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen p-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-8">Step Indicator</h2>
        <p className="text-[var(--hive-text-secondary)] mb-12">
          Onboarding flow progress with completed states and smooth transitions.
        </p>
        
        <StepIndicator 
          steps={steps}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
        
        <div className="flex justify-center space-x-4 mt-12">
          <motion.button
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] text-[var(--hive-text-secondary)] rounded-lg disabled:opacity-50 hover:border-[var(--hive-brand-secondary)]/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Previous
          </motion.button>
          <motion.button
            onClick={handleNextStep}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-lg font-medium disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Step
          </motion.button>
        </div>
      </div>
    );
  },
};

export const PaginationStory: Story = {
  name: 'Pagination',
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(5);
    const totalPages = 25;

    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen p-8">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-8">Pagination</h2>
        <p className="text-[var(--hive-text-secondary)] mb-12">
          Smart pagination with ellipsis, hover states, and HIVE brand aesthetic.
        </p>
        
        <div className="space-y-8">
          {/* Main Pagination */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Full Pagination</h3>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showFirstLast={true}
              showPrevNext={true}
            />
          </div>
          
          {/* Minimal Pagination */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Minimal Pagination</h3>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showFirstLast={false}
              showPrevNext={true}
            />
          </div>
          
          {/* Numbers Only */}
          <div>
            <h3 className="text-lg font-medium text-[var(--hive-text-secondary)] mb-4">Numbers Only</h3>
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showFirstLast={false}
              showPrevNext={false}
            />
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="text-[var(--hive-text-secondary)]">
            Page <span className="text-[var(--hive-brand-secondary)] font-medium">{currentPage}</span> of {totalPages}
          </div>
        </div>
      </div>
    );
  },
};