import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiveButton, 
  HiveCard, 
  HiveBadge,
  HiveSpaceCard 
} from '../../components';
import { 
  HiveMagneticHover,
  HiveLiquidRipple,
  HiveMagneticSnap,
  HiveMagneticTarget,
  HiveLiquidTransform
} from '../../components/hive-magnetic-interactions';
import { 
  liquidMetalOrchestrator,
  spaceActivation,
  milestoneSequences,
  liquidFlow
} from '../../motion/hive-liquid-metal';
import { Star, Zap, Plus, Target, Magnet, Waves } from 'lucide-react';

// Wrapper component for the motion system showcase
const LiquidMetalShowcase = () => null;

const meta: Meta<typeof LiquidMetalShowcase> = {
  title: '04-HIVE/Liquid Metal Motion System',
  component: LiquidMetalShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive showcase of HIVE\'s Liquid Metal Motion System - Premium 60fps animations with magnetic interactions, orchestrated timing, and space activation sequences.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive Motion System Demo
export const MotionSystemOverview: Story = {
  render: () => {
    const [activeDemo, setActiveDemo] = useState<string>('magnetic');
    const [spaceActivated, setSpaceActivated] = useState(false);
    const [toolsCreated, setToolsCreated] = useState(0);
    
    return (
      <div className="bg-[#0A0A0B] min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            variants={liquidFlow}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-5xl font-bold text-[#E5E5E7] mb-4">
              Liquid Metal Motion System
            </h1>
            <p className="text-xl text-[#C1C1C4] max-w-3xl mx-auto mb-8">
              Premium 60fps animations with magnetic interactions, orchestrated timing, 
              and physics-based space activation sequences.
            </p>
            
            {/* Demo Navigation */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { id: 'magnetic', label: 'Magnetic Interactions', icon: Magnet },
                { id: 'orchestrated', label: 'Orchestrated Sequences', icon: Waves },
                { id: 'space', label: 'Space Activation', icon: Target },
                { id: 'tools', label: 'Tool Assembly', icon: Plus }
              ].map(({ id, label, icon: Icon }) => (
                <HiveButton
                  key={id}
                  variant={activeDemo === id ? 'premium' : 'outline'}
                  size="sm"
                  onClick={() => setActiveDemo(id)}
                  magneticHover={true}
                  magneticIntensity="medium"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </HiveButton>
              ))}
            </div>
          </motion.div>
          
          {/* Demo Content */}
          <AnimatePresence mode="wait">
            <HiveLiquidTransform
              key={activeDemo}
              transformKey={activeDemo}
              direction="up"
              className="space-y-8"
            >
              {activeDemo === 'magnetic' && <MagneticInteractionsDemo />}
              {activeDemo === 'orchestrated' && <OrchestratedSequenceDemo />}
              {activeDemo === 'space' && <SpaceActivationDemo />}
              {activeDemo === 'tools' && <ToolAssemblyDemo />}
            </HiveLiquidTransform>
          </AnimatePresence>
        </div>
      </div>
    );
  },
};

// Magnetic Interactions Demo
const MagneticInteractionsDemo = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <HiveCard variant="gold-featured" size="xl" animateEntrance={true}>
      <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-6">
        Magnetic Hover Effects
      </h3>
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <HiveButton variant="premium" magneticIntensity="subtle">
            Subtle Magnetic
          </HiveButton>
          <HiveButton variant="premium" magneticIntensity="medium">
            Medium Magnetic
          </HiveButton>
          <HiveButton variant="premium" magneticIntensity="strong">
            Strong Magnetic
          </HiveButton>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <HiveCard 
            variant="gold-accent" 
            interactive={true}
            magneticIntensity="medium"
            className="p-4 text-center"
          >
            <Star className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
            <p className="text-[#E5E5E7]">Interactive Card</p>
          </HiveCard>
          
          <HiveCard 
            variant="builder" 
            interactive={true}
            magneticIntensity="strong"
            className="p-4 text-center"
          >
            <Zap className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
            <p className="text-[#E5E5E7]">Builder Card</p>
          </HiveCard>
        </div>
      </div>
    </HiveCard>
    
    <HiveCard variant="elevated" size="xl" animateEntrance={true} cascadeIndex={1}>
      <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-6">
        Ripple Effects
      </h3>
      <div className="space-y-6">
        <HiveLiquidRipple intensity="medium" className="p-8 border border-[#FFD700]/30 rounded-2xl">
          <div className="text-center">
            <p className="text-[#C1C1C4] mb-4">Click anywhere for ripple effect</p>
            <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full mx-auto flex items-center justify-center">
              <Waves className="w-8 h-8 text-[#FFD700]" />
            </div>
          </div>
        </HiveLiquidRipple>
        
        <div className="grid grid-cols-3 gap-3">
          {['Subtle', 'Medium', 'Strong'].map((intensity, index) => (
            <HiveLiquidRipple 
              key={intensity}
              intensity={intensity.toLowerCase() as 'subtle' | 'medium' | 'strong'}
              className="p-4 bg-[#111113] border border-[#2A2A2D] rounded-xl text-center"
            >
              <p className="text-[#C1C1C4] text-sm">{intensity}</p>
            </HiveLiquidRipple>
          ))}
        </div>
      </div>
    </HiveCard>
  </div>
);

// Orchestrated Sequence Demo
const OrchestratedSequenceDemo = () => {
  const [triggerSequence, setTriggerSequence] = useState<string | null>(null);
  
  const handleSequenceTrigger = (sequenceType: string) => {
    setTriggerSequence(sequenceType);
    setTimeout(() => setTriggerSequence(null), 2000);
  };
  
  return (
    <div className="space-y-8">
      <HiveCard variant="gold-featured" size="xl">
        <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-6">
          Orchestrated Animation Sequences
        </h3>
        <div className="flex gap-4 mb-8">
          <HiveButton 
            variant="premium"
            onClick={() => handleSequenceTrigger('tool')}
            magneticHover={true}
          >
            Tool Creation
          </HiveButton>
          <HiveButton 
            variant="premium"
            onClick={() => handleSequenceTrigger('space')}
            magneticHover={true}
          >
            Space Activation
          </HiveButton>
          <HiveButton 
            variant="premium"
            onClick={() => handleSequenceTrigger('achievement')}
            magneticHover={true}
          >
            Achievement
          </HiveButton>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              variants={triggerSequence ? milestoneSequences[triggerSequence as keyof typeof milestoneSequences] : {}}
              initial="initial"
              animate={triggerSequence ? "animate" : "initial"}
            >
              <HiveCard 
                variant="default" 
                className="p-6 text-center"
                animateEntrance={true}
                cascadeIndex={index}
              >
                <div className="w-12 h-12 bg-[#FFD700]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-[#FFD700] font-bold">{index + 1}</span>
                </div>
                <p className="text-[#C1C1C4]">Sequence Element</p>
              </HiveCard>
            </motion.div>
          ))}
        </div>
      </HiveCard>
    </div>
  );
};

// Space Activation Demo
const SpaceActivationDemo = () => {
  const [isActivated, setIsActivated] = useState(false);
  
  return (
    <div className="space-y-8">
      <HiveCard variant="space" size="xl">
        <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-6">
          Space Activation System
        </h3>
        
        <div className="text-center mb-8">
          <motion.div
            variants={spaceActivation}
            animate={isActivated ? "activated" : "dormant"}
            className="inline-block"
          >
            <HiveButton
              variant="premium"
              size="lg"
              onClick={() => setIsActivated(!isActivated)}
              magneticHover={true}
              magneticIntensity="strong"
            >
              <Target className="w-5 h-5 mr-2" />
              {isActivated ? 'Deactivate Space' : 'Activate Space'}
            </HiveButton>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              variants={spaceActivation}
              animate={isActivated ? "awakening" : "dormant"}
              transition={{ delay: index * 0.1 }}
            >
              <HiveSpaceCard
                title={`Space ${index + 1}`}
                memberCount={Math.floor(Math.random() * 200) + 50}
                isActive={isActivated}
                category="Academic"
              />
            </motion.div>
          ))}
        </div>
      </HiveCard>
    </div>
  );
};

// Tool Assembly Demo
const ToolAssemblyDemo = () => {
  const [assembledTools, setAssembledTools] = useState<string[]>([]);
  
  const handleToolSnap = (targetId: string) => {
    if (!assembledTools.includes(targetId)) {
      setAssembledTools(prev => [...prev, targetId]);
    }
  };
  
  const handleToolRelease = (toolId: string) => {
    setAssembledTools(prev => prev.filter(id => id !== toolId));
  };
  
  return (
    <div className="space-y-8">
      <HiveCard variant="tool" size="xl">
        <h3 className="text-2xl font-semibold text-[#E5E5E7] mb-6">
          Magnetic Tool Assembly
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tool Elements */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-[#E5E5E7] mb-4">Drag Tools to Assembly Zone</h4>
            <div className="flex flex-wrap gap-4">
              {['timer', 'counter', 'poll', 'form'].map((tool) => (
                <HiveMagneticSnap
                  key={tool}
                  snapId={tool}
                  snapTarget="assembly-zone"
                  onSnap={handleToolSnap}
                  onRelease={() => handleToolRelease(tool)}
                  className="cursor-move"
                >
                  <HiveCard 
                    variant="minimal" 
                    size="sm"
                    className="p-4 text-center min-w-[100px]"
                  >
                    <div className="w-8 h-8 bg-[#FFD700]/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Plus className="w-4 h-4 text-[#FFD700]" />
                    </div>
                    <p className="text-[#C1C1C4] text-sm capitalize">{tool}</p>
                  </HiveCard>
                </HiveMagneticSnap>
              ))}
            </div>
          </div>
          
          {/* Assembly Zone */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-[#E5E5E7] mb-4">Assembly Zone</h4>
            <HiveMagneticTarget
              targetId="assembly-zone"
              visualizeZone={true}
              className="h-64 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Target className="w-8 h-8 text-[#FFD700]" />
                </div>
                <p className="text-[#C1C1C4]">
                  {assembledTools.length > 0 
                    ? `${assembledTools.length} tools assembled`
                    : 'Drop tools here'}
                </p>
                {assembledTools.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {assembledTools.map((tool) => (
                      <HiveBadge key={tool} variant="tool-builder">
                        {tool}
                      </HiveBadge>
                    ))}
                  </div>
                )}
              </div>
            </HiveMagneticTarget>
          </div>
        </div>
      </HiveCard>
    </div>
  );
};

// Performance Showcase
export const MotionPerformance: Story = {
  render: () => (
    <div className="bg-[#0A0A0B] min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={liquidFlow}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-[#E5E5E7] mb-4">
            Motion Performance Test
          </h2>
          <p className="text-[#C1C1C4] mb-8">
            60fps animations with GPU acceleration and reduced motion support
          </p>
        </motion.div>
        
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
          {Array.from({ length: 32 }, (_, i) => (
            <HiveCard
              key={i}
              variant={i % 4 === 0 ? 'gold-accent' : 'default'}
              interactive={true}
              magneticHover={true}
              magneticIntensity="subtle"
              animateEntrance={true}
              cascadeIndex={i}
              className="aspect-square flex items-center justify-center"
            >
              <span className="text-[#FFD700] font-bold">{i + 1}</span>
            </HiveCard>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-[#9B9B9F] text-sm">
            All animations respect prefers-reduced-motion settings and maintain 60fps performance
          </p>
        </div>
      </div>
    </div>
  ),
};