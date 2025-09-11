"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@hive/ui';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { ElementRendererProps } from '../types';

export function TimerRenderer({
  element,
  elementDef,
  onChange,
  onAction,
  isPreview,
  isBuilder
}: ElementRendererProps) {
  const config = element.config;
  const type = config.type || 'countdown';
  const duration = config.duration || 60;
  const autoStart = config.autoStart || false;

  const [time, setTime] = useState(type === 'countdown' ? duration : 0);
  const [isRunning, setIsRunning] = useState(autoStart && !isPreview);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && !isPreview) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = type === 'countdown' 
            ? Math.max(0, prevTime - 1)
            : prevTime + 1;
          
          // Fire events
          if (onChange) {
            onChange(element.instanceId, newTime);
          }
          
          if (onAction) {
            onAction(element.instanceId, 'onTick', newTime);
            
            if (type === 'countdown' && newTime === 0) {
              onAction(element.instanceId, 'onComplete');
              setIsRunning(false);
            }
          }
          
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, type, element.instanceId, onChange, onAction, isPreview]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(type === 'countdown' ? duration : 0);
    if (onChange) {
      onChange(element.instanceId, type === 'countdown' ? duration : 0);
    }
  };

  if (isBuilder) {
    return (
      <div className="p-3 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {type === 'countdown' ? 'Countdown' : 'Stopwatch'}
        </div>
        <div className="font-medium">{formatTime(duration)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-3xl font-mono font-bold text-center">
        {formatTime(time)}
      </div>
      
      {!isPreview && (
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={handleToggle}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-1" />
                Start
              </>
            )}
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={handleReset}
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        </div>
      )}
      
      {type === 'countdown' && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-full rounded-full transition-all duration-1000"
            style={{ width: `${(time / duration) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
}