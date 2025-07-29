"use client";

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { cn } from '../lib/utils';
import { 
  liquidMetalOrchestrator, 
  magneticInteractions, 
  liquidFlow,
  liquidMetalUtils,
  liquidMetalPerformance,
  liquidTiming
} from '../motion/hive-liquid-metal';

// 🧲 Enhanced Magnetic Hover Component
interface MagneticHoverProps {
  children: ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'strong' | 'extreme';
  disabled?: boolean;
  onMagneticEnter?: () => void;
  onMagneticLeave?: () => void;
  magneticId?: string;
}

export const HiveMagneticHover: React.FC<MagneticHoverProps> = ({
  children,
  className,
  intensity = 'medium',
  disabled = false,
  onMagneticEnter,
  onMagneticLeave,
  magneticId
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isInMagneticField, setIsInMagneticField] = useState(false);
  
  // Motion values for smooth magnetic tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Transform mouse position to subtle element movement
  const rotateX = useTransform(mouseY, [-100, 100], [2, -2]);
  const rotateY = useTransform(mouseX, [-100, 100], [-2, 2]);
  
  // Intensity mappings
  const intensityMap = {
    subtle: { scale: 1.005, y: -1, tilt: 0.5 },
    medium: { scale: 1.02, y: -3, tilt: 1 },
    strong: { scale: 1.03, y: -5, tilt: 1.5 },
    extreme: { scale: 1.05, y: -8, tilt: 2 },
  };
  
  const config = intensityMap[intensity];
  
  useEffect(() => {
    if (magneticId) {
      liquidMetalOrchestrator.register(magneticId, controls);
      return () => liquidMetalOrchestrator.unregister(magneticId);
    }
  }, [magneticId, controls]);
  
  // Enhanced mouse move handler with magnetic field calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Calculate magnetic field strength
    const magneticStrength = liquidMetalUtils.calculateMagneticStrength(distance);
    
    // Update motion values for subtle following
    mouseX.set(deltaX * 0.1);
    mouseY.set(deltaY * 0.1);
    
    // Enter magnetic field
    if (!isInMagneticField && magneticStrength > 0.7) {
      setIsInMagneticField(true);
      onMagneticEnter?.();
    }
  };
  
  const handleMouseEnter = () => {
    if (disabled) return;
    
    controls.start({
      ...magneticInteractions.hover.magnetic,
      scale: config.scale,
      y: config.y,
      rotateX: config.tilt,
      rotateY: config.tilt * 0.5,
    });
  };
  
  const handleMouseLeave = () => {
    if (disabled) return;
    
    controls.start(magneticInteractions.hover.rest);
    mouseX.set(0);
    mouseY.set(0);
    
    if (isInMagneticField) {
      setIsInMagneticField(false);
      onMagneticLeave?.();
    }
  };
  
  const handleMouseDown = () => {
    if (disabled) return;
    controls.start(magneticInteractions.hover.pressed);
  };
  
  const handleMouseUp = () => {
    if (disabled) return;
    controls.start({
      ...magneticInteractions.hover.magnetic,
      scale: config.scale,
      y: config.y,
    });
  };
  
  return (
    <motion.div
      ref={ref}
      className={cn('cursor-pointer', className)}
      animate={controls}
      style={{
        ...liquidMetalPerformance.gpuLayer,
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      initial={magneticInteractions.hover.rest}
    >
      {children}
    </motion.div>
  );
};

// 🔗 Magnetic Snap Component for Tool Assembly
interface MagneticSnapProps {
  children: ReactNode;
  className?: string;
  snapTarget?: string;
  snapId: string;
  onSnap?: (targetId: string) => void;
  onRelease?: () => void;
  disabled?: boolean;
}

export const HiveMagneticSnap: React.FC<MagneticSnapProps> = ({
  children,
  className,
  snapTarget,
  snapId,
  onSnap,
  onRelease,
  disabled = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isSnapped, setIsSnapped] = useState(false);
  const [isApproaching, setIsApproaching] = useState(false);
  
  useEffect(() => {
    liquidMetalOrchestrator.register(snapId, controls);
    return () => liquidMetalOrchestrator.unregister(snapId);
  }, [snapId, controls]);
  
  // Check distance to snap targets
  const checkSnapDistance = (e: MouseEvent) => {
    if (disabled || !ref.current || !snapTarget) return;
    
    const snapTargetElement = document.getElementById(snapTarget);
    if (!snapTargetElement) return;
    
    const rect1 = ref.current.getBoundingClientRect();
    const rect2 = snapTargetElement.getBoundingClientRect();
    
    const distance = liquidMetalUtils.calculateMagneticStrength(
      Math.sqrt(
        Math.pow(rect1.x - rect2.x, 2) + 
        Math.pow(rect1.y - rect2.y, 2)
      )
    );
    
    // Handle magnetic zones
    if (liquidMetalUtils.isInMagneticZone(distance, 'snap') && !isSnapped) {
      setIsSnapped(true);
      controls.start(magneticInteractions.toolSnap.snapped);
      onSnap?.(snapTarget);
    } else if (liquidMetalUtils.isInMagneticZone(distance, 'attraction') && !isApproaching) {
      setIsApproaching(true);
      controls.start(magneticInteractions.toolSnap.approaching);
    } else if (liquidMetalUtils.isInMagneticZone(distance, 'release') && isSnapped) {
      setIsSnapped(false);
      setIsApproaching(false);
      controls.start(magneticInteractions.toolSnap.floating);
      onRelease?.();
    }
  };
  
  useEffect(() => {
    if (disabled) return;
    
    document.addEventListener('mousemove', checkSnapDistance);
    return () => document.removeEventListener('mousemove', checkSnapDistance);
  }, [disabled, snapTarget, isSnapped, isApproaching]);
  
  return (
    <motion.div
      ref={ref}
      id={snapId}
      className={cn('relative', className)}
      animate={controls}
      initial={magneticInteractions.toolSnap.floating}
      style={liquidMetalPerformance.gpuLayer}
      drag={!disabled && !isSnapped}
      dragMomentum={false}
      dragElastic={0.1}
      whileDrag={disabled ? {} : {
        scale: 1.05,
        rotate: 2,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25,
        }
      }}
    >
      {children}
      
      {/* Magnetic field visualization when approaching */}
      {isApproaching && !isSnapped && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-yellow-400/30"
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: [0.23, 1, 0.32, 1],
          }}
        />
      )}
    </motion.div>
  );
};

// 🌊 Liquid Ripple Component for Space Activation
interface LiquidRippleProps {
  children: ReactNode;
  className?: string;
  rippleColor?: string;
  intensity?: 'subtle' | 'medium' | 'strong';
  disabled?: boolean;
  onRippleComplete?: () => void;
}

export const HiveLiquidRipple: React.FC<LiquidRippleProps> = ({
  children,
  className,
  rippleColor = 'var(--hive-brand-secondary)',
  intensity = 'medium',
  disabled = false,
  onRippleComplete
}) => {
  const [ripples, setRipples] = useState<Array<{
    id: number;
    x: number;
    y: number;
    timestamp: number;
  }>>([]);
  
  const intensityMap = {
    subtle: { scale: 4, opacity: 0.3, duration: 0.8 },
    medium: { scale: 6, opacity: 0.5, duration: 1.0 },
    strong: { scale: 8, opacity: 0.7, duration: 1.2 },
  };
  
  const config = intensityMap[intensity];
  
  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      timestamp: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    // Clean up ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      onRippleComplete?.();
    }, config.duration * 1000);
  };
  
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onClick={createRipple}
      style={{ isolation: 'isolate' }}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.div
          key={ripple.id}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
            background: `radial-gradient(circle, ${rippleColor} 0%, transparent 70%)`,
          }}
          initial={{
            scale: 0,
            opacity: config.opacity
          }}
          animate={{
            scale: config.scale,
            opacity: 0
          }}
          transition={{
            duration: config.duration,
            ease: [0.25, 0.46, 0.45, 0.94], // magnetic easing
          }}
        />
      ))}
    </div>
  );
};

// 🔄 Liquid Transform Component for Layout Changes
interface LiquidTransformProps {
  children: ReactNode;
  className?: string;
  transformKey: string | number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
}

export const HiveLiquidTransform: React.FC<LiquidTransformProps> = ({
  children,
  className,
  transformKey,
  direction = 'up'
}) => {
  const directionVariants = {
    up: { y: 20, opacity: 0 },
    down: { y: -20, opacity: 0 },
    left: { x: 20, opacity: 0 },
    right: { x: -20, opacity: 0 },
    scale: { scale: 0.9, opacity: 0 }
  };
  
  return (
    <motion.div
      key={transformKey}
      className={className}
      variants={liquidFlow}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={liquidMetalPerformance.gpuLayer}
      layout
    >
      {children}
    </motion.div>
  );
};

// 🎯 Magnetic Target Zone Component
interface MagneticTargetProps {
  children: ReactNode;
  className?: string;
  targetId: string;
  onElementEnterZone?: (elementId: string) => void;
  onElementLeaveZone?: (elementId: string) => void;
  visualizeZone?: boolean;
}

export const HiveMagneticTarget: React.FC<MagneticTargetProps> = ({
  children,
  className,
  targetId,
  onElementEnterZone,
  onElementLeaveZone,
  visualizeZone = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementsInZone, setElementsInZone] = useState<string[]>([]);
  
  return (
    <div
      ref={ref}
      id={targetId}
      className={cn('relative', className)}
    >
      {children}
      
      {/* Magnetic zone visualization */}
      {visualizeZone && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent) 0%, transparent 70%)',
            border: '0.5 dashed color-mix(in_srgb,var(--hive-brand-secondary)_30%,transparent)',
            borderRadius: '50%',
          }}
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: [0.23, 1, 0.32, 1],
          }}
        />
      )}
      
      {/* Zone activity indicator */}
      {elementsInZone.length > 0 && (
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 25,
          }}
        />
      )}
    </div>
  );
};