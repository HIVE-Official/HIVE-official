import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  hiveVariants, 
  hivePresets, 
  hiveTransitions,
} from '../lib/motion';
import { 
  useAdaptiveMotion,
  type StudentEnergyState,
  type CampusContext,
} from '../lib/adaptive-motion';

const meta: Meta = {
  title: 'HIVE/Motion System',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE brand motion system showcasing keyframes, Framer Motion utilities, and adaptive animations based on student energy states.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Demo components
const DemoCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-surface border border-border rounded-lg p-6 ${className}`}>
    {children}
  </div>
);

const _DemoButton = ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
  <button
    className="bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium"
    {...props}
  >
    {children}
  </button>
);

// CSS Keyframes Stories
export const CSSKeyframes: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 max-w-4xl">
      <div className="space-y-4">
        <h3 className="text-h3 font-display">Entrance Animations</h3>
        <DemoCard className="animate-hive-fade-in">Fade In</DemoCard>
        <DemoCard className="animate-hive-slide-up">Slide Up</DemoCard>
        <DemoCard className="animate-hive-slide-down">Slide Down</DemoCard>
        <DemoCard className="animate-hive-scale-in">Scale In</DemoCard>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-h3 font-display">Special Effects</h3>
        <DemoCard className="animate-hive-gold-pulse">Gold Pulse</DemoCard>
        <DemoCard className="animate-hive-gold-glow">Gold Glow</DemoCard>
        <DemoCard className="animate-hive-surface-rise">Surface Rise</DemoCard>
        <DemoCard className="animate-hive-emboss-reveal">Emboss Reveal</DemoCard>
      </div>
      
      <div className="col-span-2 space-y-4">
        <h3 className="text-h3 font-display">HIVE Moments</h3>
        <div className="grid grid-cols-2 gap-4">
          <DemoCard className="animate-hive-ritual-burst">Ritual Burst</DemoCard>
          <DemoCard className="animate-hive-space-join">Space Join</DemoCard>
        </div>
      </div>
    </div>
  ),
};

// Framer Motion Variants
export const FramerMotionVariants: Story = {
  render: () => {
    const [trigger, setTrigger] = useState(0);
    
    return (
      <div className="space-y-8 max-w-2xl">
        <button
          onClick={() => setTrigger(prev => prev + 1)}
          className="bg-accent text-accent-foreground px-4 py-2 rounded-md"
        >
          Replay Animations
        </button>
        
        <div className="grid grid-cols-2 gap-6">
          <motion.div
            key={`fadeIn-${trigger}`}
            variants={hiveVariants.fadeIn}
            initial="hidden"
            animate="visible"
          >
            <DemoCard>Fade In Variant</DemoCard>
          </motion.div>
          
          <motion.div
            key={`slideUp-${trigger}`}
            variants={hiveVariants.slideUp}
            initial="hidden"
            animate="visible"
          >
            <DemoCard>Slide Up Variant</DemoCard>
          </motion.div>
          
          <motion.div
            key={`scaleIn-${trigger}`}
            variants={hiveVariants.scaleIn}
            initial="hidden"
            animate="visible"
          >
            <DemoCard>Scale In Variant</DemoCard>
          </motion.div>
          
          <motion.div
            variants={hiveVariants.hover}
            initial="rest"
            whileHover="hover"
            className="cursor-pointer"
          >
            <DemoCard>Hover Me</DemoCard>
          </motion.div>
        </div>
      </div>
    );
  },
};

// Interactive Elements
export const InteractiveElements: Story = {
  render: () => (
    <div className="space-y-8 max-w-lg">
      <h3 className="text-h3 font-display">Interactive Components</h3>
      
      <div className="space-y-4">
        <motion.div {...hivePresets.cardHover}>
          <DemoCard className="cursor-pointer">
            Card with Hover Effect
          </DemoCard>
        </motion.div>
        
        <motion.button
          {...hivePresets.button}
          className="w-full bg-accent text-accent-foreground px-4 py-3 rounded-md font-medium"
        >
          Interactive Button
        </motion.button>
        
        <motion.div
          variants={hiveVariants.goldPulse}
          animate="pulse"
          className="border border-accent rounded-lg p-4 text-center"
        >
          Gold Pulse Animation
        </motion.div>
      </div>
    </div>
  ),
};

// Staggered Animations
export const StaggeredAnimations: Story = {
  render: () => {
    const [trigger, setTrigger] = useState(0);
    const items = ['First Item', 'Second Item', 'Third Item', 'Fourth Item'];
    
    return (
      <div className="space-y-6 max-w-md">
        <button
          onClick={() => setTrigger(prev => prev + 1)}
          className="bg-accent text-accent-foreground px-4 py-2 rounded-md"
        >
          Replay Stagger
        </button>
        
        <motion.div
          key={trigger}
          variants={hiveVariants.container}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={hiveVariants.item}
            >
              <DemoCard>{item}</DemoCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  },
};

// Adaptive Motion System
export const AdaptiveMotion: Story = {
  render: () => {
    const [energyState, setEnergyState] = useState<StudentEnergyState>('evening');
    const [context, setContext] = useState<CampusContext>('navigation');
    const [trigger, setTrigger] = useState(0);
    
    const { variants, config } = useAdaptiveMotion(context, energyState);
    
    return (
      <div className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <h3 className="text-h3 font-display">Adaptive Motion System</h3>
          <p className="text-body text-muted-foreground">
            Animations adapt based on student energy states and campus context
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-body-sm font-medium mb-2">Energy State</label>
              <select
                value={energyState}
                onChange={(e) => setEnergyState(e.target.value as StudentEnergyState)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2"
              >
                <option value="high-energy">High Energy (8-11am, 1-3pm)</option>
                <option value="transition">Transition (meals/breaks)</option>
                <option value="evening">Evening (5-9pm)</option>
                <option value="late-night">Late Night (9pm+)</option>
                <option value="reduced-motion">Reduced Motion</option>
              </select>
            </div>
            
            <div>
              <label className="block text-body-sm font-medium mb-2">Campus Context</label>
              <select
                value={context}
                onChange={(e) => setContext(e.target.value as CampusContext)}
                className="w-full bg-surface border border-border rounded-md px-3 py-2"
              >
                <option value="academic">Academic</option>
                <option value="social">Social</option>
                <option value="ritual">Ritual</option>
                <option value="navigation">Navigation</option>
              </select>
            </div>
          </div>
          
          <button
            onClick={() => setTrigger(prev => prev + 1)}
            className="bg-accent text-accent-foreground px-4 py-2 rounded-md"
          >
            Test Adaptive Animation
          </button>
        </div>
        
        <div className="bg-surface-01 rounded-lg p-4">
          <h4 className="text-h4 font-display mb-2">Current Configuration</h4>
          <pre className="text-code text-muted-foreground text-sm">
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            key={`adaptive-fade-${trigger}`}
            variants={variants.fadeIn}
            initial="hidden"
            animate="visible"
          >
            <DemoCard>Adaptive Fade In</DemoCard>
          </motion.div>
          
          <motion.div
            key={`adaptive-slide-${trigger}`}
            variants={variants.slideUp}
            initial="hidden"
            animate="visible"
          >
            <DemoCard>Adaptive Slide Up</DemoCard>
          </motion.div>
          
          <motion.div
            variants={variants.hover}
            initial="rest"
            whileHover="hover"
            className="cursor-pointer"
          >
            <DemoCard>Adaptive Hover</DemoCard>
          </motion.div>
          
          <motion.div
            variants={variants.ritual}
            initial="rest"
            whileHover="active"
            className="cursor-pointer"
          >
            <DemoCard>Ritual Animation</DemoCard>
          </motion.div>
        </div>
      </div>
    );
  },
};

// Timing Demonstrations
export const TimingDemonstration: Story = {
  render: () => {
    const [activeDemo, setActiveDemo] = useState<string | null>(null);
    
    const timings = [
      { name: 'Instant', duration: 'instant', ms: '50ms' },
      { name: 'Fast', duration: 'fast', ms: '120ms' },
      { name: 'Base', duration: 'base', ms: '180ms' },
      { name: 'Slow', duration: 'slow', ms: '280ms' },
      { name: 'Ritual', duration: 'ritual', ms: '400ms' },
    ] as const;
    
    return (
      <div className="space-y-6 max-w-lg">
        <h3 className="text-h3 font-display">HIVE Timing System</h3>
        
        <div className="space-y-3">
          {timings.map(({ name, duration, ms }) => (
            <div key={name} className="flex items-center gap-4">
              <div className="w-20 text-body-sm">{ms}</div>
              <motion.button
                onClick={() => setActiveDemo(duration)}
                animate={{
                  scale: activeDemo === duration ? 1.05 : 1,
                  opacity: activeDemo === duration ? 0.8 : 1,
                }}
                transition={hiveTransitions[duration as keyof typeof hiveTransitions]}
                className="flex-1 bg-surface border border-border rounded-md px-4 py-2 text-left"
              >
                {name} ({ms})
              </motion.button>
            </div>
          ))}
        </div>
        
        <div className="text-body-sm text-muted-foreground">
          Click any timing to see the HIVE curve in action
        </div>
      </div>
    );
  },
};