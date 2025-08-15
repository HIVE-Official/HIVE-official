import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Timer,
  Calculator,
  Vote,
  Users,
  ChevronDown,
  Plus,
  Minus,
  Check
} from 'lucide-react';

const meta: Meta = {
  title: '10-Creator/Tool Interaction Standards',
  parameters: {
    docs: {
      description: {
        component: 'HIVE Tool Interaction Standards - Unified patterns for tool interfaces, clicking behaviors, and user interactions across all tools',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Base Tool Container
const ToolContainer = ({ 
  children, 
  title, 
  category,
  isActive = false,
  onActivate,
  className = ""
}: {
  children: React.ReactNode
  title: string
  category: string
  isActive?: boolean
  onActivate?: () => void
  className?: string
}) => {
  return (
    <motion.div
      className={`
        relative bg-[var(--hive-background-secondary)] border rounded-xl overflow-hidden transition-all duration-300
        ${isActive 
          ? 'border-[var(--hive-brand-secondary)]/50 shadow-[0_0_20px_color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)]' 
          : 'border-[var(--hive-border-default)] hover:border-[var(--hive-brand-secondary)]/20'
        }
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      onClick={onActivate}
      layout
    >
      {/* Tool Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--hive-border-default)]">
        <div>
          <h3 className="text-[var(--hive-text-primary)] font-semibold">{title}</h3>
          <p className="text-[var(--hive-text-tertiary)] text-sm">{category}</p>
        </div>
        <motion.div
          className={`w-3 h-3 rounded-full ${isActive ? 'bg-[var(--hive-brand-secondary)]' : 'bg-[var(--hive-border-default)]'}`}
          animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
          transition={{ repeat: isActive ? Infinity : 0, duration: 2 }}
        />
      </div>
      
      {/* Tool Content */}
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
};

// Standard Tool Actions
const ToolActions = ({ 
  onLike, 
  onComment, 
  onShare, 
  onBookmark,
  likes = 0,
  comments = 0,
  isLiked = false,
  isBookmarked = false
}: {
  onLike: () => void
  onComment: () => void
  onShare: () => void
  onBookmark: () => void
  likes?: number
  comments?: number
  isLiked?: boolean
  isBookmarked?: boolean
}) => {
  return (
    <div className="flex items-center justify-between pt-4 mt-4 border-t border-[var(--hive-border-default)]">
      <div className="flex items-center space-x-4">
        {/* Like Button */}
        <motion.button
          onClick={onLike}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
            isLiked 
              ? 'text-[#FF4757] bg-[#FF4757]/10' 
              : 'text-[var(--hive-text-tertiary)] hover:text-[#FF4757] hover:bg-[#FF4757]/5'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          {likes > 0 && <span className="text-sm font-medium">{likes}</span>}
        </motion.button>

        {/* Comment Button */}
        <motion.button
          onClick={onComment}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-[var(--hive-text-tertiary)] hover:text-[#6366F1] hover:bg-[#6366F1]/5 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={16} />
          {comments > 0 && <span className="text-sm font-medium">{comments}</span>}
        </motion.button>

        {/* Share Button */}
        <motion.button
          onClick={onShare}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg text-[var(--hive-text-tertiary)] hover:text-[var(--hive-status-success)] hover:bg-[var(--hive-status-success)]/5 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Share2 size={16} />
        </motion.button>
      </div>

      {/* Bookmark Button */}
      <motion.button
        onClick={onBookmark}
        className={`p-2 rounded-lg transition-all ${
          isBookmarked 
            ? 'text-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/10' 
            : 'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/5'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Bookmark size={16} fill={isBookmarked ? 'currentColor' : 'none'} />
      </motion.button>
    </div>
  );
};

// Tool Settings Panel
const ToolSettings = ({ 
  isOpen, 
  onClose, 
  children 
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 z-10 mt-2 bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg p-4 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[var(--hive-text-primary)] font-medium">Tool Settings</h4>
            <motion.button
              onClick={onClose}
              className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-secondary)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Timer Tool Example
const TimerTool = () => {
  const [time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [likes, setLikes] = React.useState(5);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ToolContainer 
      title="Focus Timer" 
      category="Productivity Tool"
      className="relative"
    >
      {/* Timer Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-[var(--hive-brand-secondary)] mb-2 font-mono">
          {formatTime(time)}
        </div>
        <div className="text-[var(--hive-text-tertiary)] text-sm">Focus Session</div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center space-x-4 mb-4">
        <motion.button
          onClick={() => setIsRunning(!isRunning)}
          className="flex items-center justify-center w-12 h-12 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </motion.button>

        <motion.button
          onClick={() => {
            setTime(0);
            setIsRunning(false);
          }}
          className="flex items-center justify-center w-10 h-10 bg-[var(--hive-border-default)] text-[var(--hive-text-secondary)] rounded-full hover:bg-[#3A3A3D]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={16} />
        </motion.button>

        <motion.button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center justify-center w-10 h-10 bg-[var(--hive-border-default)] text-[var(--hive-text-secondary)] rounded-full hover:bg-[#3A3A3D]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings size={16} />
        </motion.button>
      </div>

      {/* Tool Settings */}
      <ToolSettings isOpen={showSettings} onClose={() => setShowSettings(false)}>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-[var(--hive-text-secondary)] text-sm">Sound Alerts</label>
            <motion.button
              className="w-10 h-6 bg-[var(--hive-brand-secondary)] rounded-full flex items-center px-1"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-4 h-4 bg-[var(--hive-background-primary)] rounded-full ml-auto" />
            </motion.button>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-[var(--hive-text-secondary)] text-sm">Auto-start breaks</label>
            <motion.button
              className="w-10 h-6 bg-[var(--hive-border-default)] rounded-full flex items-center px-1"
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-4 h-4 bg-[var(--hive-text-tertiary)] rounded-full" />
            </motion.button>
          </div>
        </div>
      </ToolSettings>

      {/* Tool Actions */}
      <ToolActions
        onLike={() => {
          setIsLiked(!isLiked);
          setLikes(prev => isLiked ? prev - 1 : prev + 1);
        }}
        onComment={() => console.log('Comment')}
        onShare={() => console.log('Share')}
        onBookmark={() => setIsBookmarked(!isBookmarked)}
        likes={likes}
        comments={2}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
      />
    </ToolContainer>
  );
};

// GPA Calculator Tool Example
const GPACalculatorTool = () => {
  const [courses, setCourses] = React.useState([
    { name: 'Calculus II', credits: 4, grade: 'A' },
    { name: 'Physics I', credits: 3, grade: 'B+' },
    { name: 'Chemistry', credits: 3, grade: 'A-' },
  ]);
  const [showSettings, setShowSettings] = React.useState(false);
  const [likes, setLikes] = React.useState(12);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(true);

  const gradePoints = {
    'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  const calculateGPA = () => {
    const totalPoints = courses.reduce((sum, course) => 
      sum + (gradePoints[course.grade as keyof typeof gradePoints] * course.credits), 0
    );
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };

  return (
    <ToolContainer 
      title="GPA Calculator" 
      category="Academic Tool"
      className="relative"
    >
      {/* GPA Display */}
      <div className="text-center mb-6">
        <div className="text-3xl font-bold text-[var(--hive-brand-secondary)] mb-1">
          {calculateGPA()}
        </div>
        <div className="text-[var(--hive-text-tertiary)] text-sm">Current GPA</div>
      </div>

      {/* Course List */}
      <div className="space-y-3 mb-4">
        {courses.map((course, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between p-3 bg-[var(--hive-background-tertiary)] rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex-1">
              <div className="text-[var(--hive-text-primary)] text-sm font-medium">{course.name}</div>
              <div className="text-[var(--hive-text-tertiary)] text-xs">{course.credits} credits</div>
            </div>
            <div className="text-[var(--hive-brand-secondary)] font-bold text-lg">
              {course.grade}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Course Button */}
      <motion.button
        className="w-full p-3 border-2 border-dashed border-[var(--hive-border-default)] rounded-lg text-[var(--hive-text-tertiary)] hover:border-[var(--hive-brand-secondary)]/30 hover:text-[var(--hive-brand-secondary)] transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Plus size={20} className="mx-auto mb-1" />
        Add Course
      </motion.button>

      {/* Tool Actions */}
      <ToolActions
        onLike={() => {
          setIsLiked(!isLiked);
          setLikes(prev => isLiked ? prev - 1 : prev + 1);
        }}
        onComment={() => console.log('Comment')}
        onShare={() => console.log('Share')}
        onBookmark={() => setIsBookmarked(!isBookmarked)}
        likes={likes}
        comments={4}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
      />
    </ToolContainer>
  );
};

// Poll Tool Example
const PollTool = () => {
  const [poll] = React.useState({
    question: "Which programming language should we learn next?",
    options: [
      { text: "Python", votes: 23 },
      { text: "JavaScript", votes: 18 },
      { text: "Rust", votes: 12 },
      { text: "Go", votes: 8 }
    ]
  });
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [hasVoted, setHasVoted] = React.useState(false);
  const [likes, setLikes] = React.useState(8);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  const handleVote = () => {
    if (selectedOption !== null && !hasVoted) {
      setHasVoted(true);
    }
  };

  return (
    <ToolContainer 
      title="Quick Poll" 
      category="Engagement Tool"
    >
      {/* Question */}
      <div className="mb-6">
        <h3 className="text-[var(--hive-text-primary)] font-medium text-lg mb-2">{poll.question}</h3>
        <div className="text-[var(--hive-text-tertiary)] text-sm">{totalVotes} votes</div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {poll.options.map((option, index) => {
          const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
          const isSelected = selectedOption === index;
          
          return (
            <motion.button
              key={index}
              onClick={() => !hasVoted && setSelectedOption(index)}
              className={`
                relative w-full p-3 rounded-lg border text-left transition-all overflow-hidden
                ${hasVoted 
                  ? 'cursor-default border-[var(--hive-border-default)]' 
                  : isSelected
                    ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5'
                    : 'border-[var(--hive-border-default)] hover:border-[var(--hive-brand-secondary)]/30'
                }
              `}
              whileHover={!hasVoted ? { scale: 1.02 } : {}}
              whileTap={!hasVoted ? { scale: 0.98 } : {}}
              disabled={hasVoted}
            >
              {/* Background bar for results */}
              {hasVoted && (
                <motion.div
                  className="absolute inset-0 bg-[var(--hive-brand-secondary)]/10 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: percentage / 100 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
              )}
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-4 h-4 rounded-full border-2 flex items-center justify-center
                    ${hasVoted
                      ? 'border-[var(--hive-brand-secondary)]'
                      : isSelected 
                        ? 'border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]' 
                        : 'border-[var(--hive-border-default)]'
                    }
                  `}>
                    {(hasVoted || isSelected) && (
                      <motion.div
                        className="w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      />
                    )}
                  </div>
                  <span className="text-[var(--hive-text-primary)]">{option.text}</span>
                </div>
                
                {hasVoted && (
                  <div className="flex items-center space-x-2">
                    <span className="text-[var(--hive-brand-secondary)] font-medium">{Math.round(percentage)}%</span>
                    <span className="text-[var(--hive-text-tertiary)] text-sm">({option.votes})</span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Vote Button */}
      {!hasVoted && (
        <motion.button
          onClick={handleVote}
          disabled={selectedOption === null}
          className="w-full p-3 bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: selectedOption !== null ? 1.02 : 1 }}
          whileTap={{ scale: selectedOption !== null ? 0.98 : 1 }}
        >
          Submit Vote
        </motion.button>
      )}

      {/* Tool Actions */}
      <ToolActions
        onLike={() => {
          setIsLiked(!isLiked);
          setLikes(prev => isLiked ? prev - 1 : prev + 1);
        }}
        onComment={() => console.log('Comment')}
        onShare={() => console.log('Share')}
        onBookmark={() => setIsBookmarked(!isBookmarked)}
        likes={likes}
        comments={6}
        isLiked={isLiked}
        isBookmarked={isBookmarked}
      />
    </ToolContainer>
  );
};

// Stories
export const ToolInteractionStandards: Story = {
  name: 'Tool Interaction Standards',
  render: () => {
    return (
      <div className="bg-[var(--hive-background-primary)] min-h-screen p-8">
        <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-4">HIVE Tool Interaction Standards</h1>
        <p className="text-[var(--hive-text-secondary)] mb-12 max-w-3xl">
          Unified interaction patterns and design standards for all HIVE tools. Every tool follows these 
          consistent patterns for container design, action buttons, settings panels, and user feedback.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <TimerTool />
          <GPACalculatorTool />
          <PollTool />
        </div>

        {/* Interaction Guidelines */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-[var(--hive-text-primary)]">Interaction Guidelines</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Container Standards */}
            <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[var(--hive-brand-secondary)] mb-4">Container Standards</h3>
              <ul className="space-y-2 text-[var(--hive-text-secondary)]">
                <li>• Dark glass morphism aesthetic</li>
                <li>• Golden active state indicators</li>
                <li>• Liquid metal hover animations</li>
                <li>• Consistent header with title & category</li>
                <li>• Status indicator (active/inactive)</li>
              </ul>
            </div>

            {/* Action Patterns */}
            <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[var(--hive-brand-secondary)] mb-4">Action Patterns</h3>
              <ul className="space-y-2 text-[var(--hive-text-secondary)]">
                <li>• Like (red heart) with count display</li>
                <li>• Comment (blue) with count display</li>
                <li>• Share (green) for distribution</li>
                <li>• Bookmark (gold) for saving</li>
                <li>• Settings gear for configuration</li>
              </ul>
            </div>

            {/* Click Behaviors */}
            <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[var(--hive-brand-secondary)] mb-4">Click Behaviors</h3>
              <ul className="space-y-2 text-[var(--hive-text-secondary)]">
                <li>• Spring physics on tap (scale 0.95)</li>
                <li>• Gentle hover elevation (scale 1.05)</li>
                <li>• Magnetic snap for precise interactions</li>
                <li>• Liquid metal transitions (0.3s easing)</li>
                <li>• Tactile feedback with visual confirmation</li>
              </ul>
            </div>

            {/* State Management */}
            <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6">
              <h3 className="text-xl font-semibold text-[var(--hive-brand-secondary)] mb-4">State Management</h3>
              <ul className="space-y-2 text-[var(--hive-text-secondary)]">
                <li>• Clear active/inactive visual states</li>
                <li>• Progressive disclosure for settings</li>
                <li>• Persistent state across sessions</li>
                <li>• Real-time updates with animations</li>
                <li>• Error states with recovery options</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};