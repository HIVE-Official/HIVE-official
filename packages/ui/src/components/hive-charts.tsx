"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity, 
  Zap,
  Users,
  DollarSign,
  ArrowUp,
  ArrowDown,
  Minus,
  MoreHorizontal,
  Maximize2,
  Download,
  Share,
  Eye,
  EyeOff
} from 'lucide-react';

// HIVE Charts System - Data Visualization with Liquid Metal Motion
// Sophisticated chart components with magnetic interactions and smooth animations

const hiveChartVariants = cva(
  // Base chart styles - matte obsidian glass
  "relative w-full bg-[var(--hive-background-secondary)]/20 backdrop-blur-xl border border-[var(--hive-border-glass)] rounded-2xl overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        premium: "border-yellow-500/20 bg-yellow-500/5",
        minimal: "border-white/5 bg-transparent",
      },
      
      size: {
        sm: "h-32",
        default: "h-64",
        lg: "h-80",
        xl: "h-96",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Chart data types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, any>;
}

export interface TimeSeriesDataPoint {
  timestamp: string | number;
  value: number;
  label?: string;
  color?: string;
}

export interface MetricData {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: React.ReactNode;
  color?: string;
  subtitle?: string;
}

// Base Chart Props
export interface BaseChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof hiveChartVariants> {
  title?: string;
  subtitle?: string;
  loading?: boolean;
  error?: string;
  empty?: React.ReactNode;
  actions?: React.ReactNode;
  showLegend?: boolean;
  showTooltip?: boolean;
  animated?: boolean;
}

// Chart container with header
const ChartContainer: React.FC<BaseChartProps & { children: React.ReactNode }> = ({
  className,
  variant,
  size,
  title,
  subtitle,
  loading,
  error,
  empty,
  actions,
  children,
  ...props
}) => {
  return (
    <div className={cn(hiveChartVariants({ variant, size, className }))} {...props}>
      {/* Header */}
      {(title || subtitle || actions) && (
        <div className="p-6 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              {title && (
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              )}
              {subtitle && (
                <p className="text-sm text-white/60">{subtitle}</p>
              )}
            </div>
            
            {actions && (
              <div className="flex items-center space-x-2">
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="relative flex-1 p-6">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-white/60">
              <motion.div
                className="w-5 h-5 border-2 border-white/20 border-t-yellow-400 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Loading chart...</span>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-red-400">
              <div className="text-4xl mb-2">⚠️</div>
              <div>{error}</div>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

// Metric Card Component
export interface HiveMetricCardProps extends BaseChartProps {
  data: MetricData;
  trend?: 'up' | 'down' | 'neutral';
  sparklineData?: number[];
}

export const HiveMetricCard: React.FC<HiveMetricCardProps> = ({
  className,
  variant = "default",
  data,
  trend,
  sparklineData,
  actions,
  ...props
}) => {
  const getTrendIcon = () => {
    switch (data.changeType || trend) {
      case 'increase':
        return <ArrowUp size={16} className="text-green-400" />;
      case 'decrease':
        return <ArrowDown size={16} className="text-red-400" />;
      default:
        return <Minus size={16} className="text-white/40" />;
    }
  };
  
  const getTrendColor = () => {
    switch (data.changeType || trend) {
      case 'increase':
        return 'text-green-400';
      case 'decrease':
        return 'text-red-400';
      default:
        return 'text-white/60';
    }
  };
  
  return (
    <ChartContainer 
      className={className} 
      variant={variant} 
      size="sm" 
      actions={actions}
      {...props}
    >
      <div className="flex items-start justify-between h-full">
        <div className="space-y-3 flex-1">
          <div className="flex items-center space-x-2">
            {data.icon && (
              <div className={cn("text-white/60", data.color)}>
                {data.icon}
              </div>
            )}
            <span className="text-sm font-medium text-white/80">{data.label}</span>
          </div>
          
          <div className="space-y-1">
            <motion.div 
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionDurations.smooth, ease: liquidMetal.easing as any }}
            >
              {data.value}
            </motion.div>
            
            {data.subtitle && (
              <div className="text-xs text-white/50">{data.subtitle}</div>
            )}
            
            {data.change !== undefined && (
              <motion.div 
                className={cn("flex items-center space-x-1 text-sm", getTrendColor())}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: motionDurations.smooth, delay: 0.1 }}
              >
                {getTrendIcon()}
                <span>{Math.abs(data.change)}%</span>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Mini Sparkline */}
        {sparklineData && sparklineData.length > 0 && (
          <div className="w-16 h-8">
            <MiniSparkline data={sparklineData} trend={data.changeType === 'increase' ? 'up' : data.changeType === 'decrease' ? 'down' : trend} />
          </div>
        )}
      </div>
    </ChartContainer>
  );
};

// Mini Sparkline Component
const MiniSparkline: React.FC<{
  data: number[];
  trend?: 'up' | 'down' | 'neutral';
}> = ({ data, trend }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  const pathData = useMemo(() => {
    if (data.length < 2) return '';
    
    const width = 64;
    const height = 32;
    const padding = 2;
    
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    
    const points = data.map((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((value - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  }, [data]);
  
  const trendColor = trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280';
  
  return (
    <svg ref={svgRef} width="64" height="32" className="overflow-visible">
      <motion.path
        d={pathData}
        fill="none"
        stroke={trendColor}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: liquidMetal.easing as any }}
      />
    </svg>
  );
};

// Bar Chart Component
export interface HiveBarChartProps extends BaseChartProps {
  data: ChartDataPoint[];
  horizontal?: boolean;
  showValues?: boolean;
  colorScheme?: string[];
}

export const HiveBarChart: React.FC<HiveBarChartProps> = ({
  className,
  variant = "default",
  data,
  horizontal = false,
  showValues = true,
  showLegend = false,
  colorScheme = ['#fbbf24', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'],
  animated = true,
  ...props
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <ChartContainer className={className} variant={variant} {...props}>
      <div className={cn(
        "space-y-3",
        horizontal ? "space-y-2" : "h-full flex flex-col"
      )}>
        {!horizontal && (
          <div className="flex items-end justify-between space-x-2 flex-1">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                <div className="relative w-full flex items-end justify-center" style={{ height: '160px' }}>
                  <motion.div
                    className="w-full rounded-t-lg relative overflow-hidden"
                    style={{ 
                      backgroundColor: item.color || colorScheme[index % colorScheme.length],
                      opacity: 0.8,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: animated ? `${(item.value / maxValue) * 160}px` : `${(item.value / maxValue) * 160}px` }}
                    transition={{ 
                      duration: animated ? motionDurations.smooth : 0,
                      delay: animated ? index * 0.1 : 0,
                      ease: liquidMetal.easing as any 
                    }}
                    whileHover={{ 
                      opacity: 1,
                      scale: 1.02,
                      transition: { duration: motionDurations.quick }
                    }}
                  >
                    {showValues && (
                      <motion.div
                        className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: motionDurations.smooth,
                          delay: animated ? index * 0.1 + 0.3 : 0 
                        }}
                      >
                        {item.value}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
                <div className="text-xs text-white/60 text-center truncate w-full">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {horizontal && (
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80 truncate">{item.label}</span>
                  {showValues && (
                    <span className="text-sm font-medium text-white">{item.value}</span>
                  )}
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ 
                      backgroundColor: item.color || colorScheme[index % colorScheme.length] 
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / maxValue) * 100}%` }}
                    transition={{ 
                      duration: animated ? motionDurations.smooth : 0,
                      delay: animated ? index * 0.1 : 0,
                      ease: liquidMetal.easing as any 
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: motionDurations.quick }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        
        {showLegend && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || colorScheme[index % colorScheme.length] }}
                />
                <span className="text-xs text-white/60">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ChartContainer>
  );
};

// Donut Chart Component
export interface HiveDonutChartProps extends BaseChartProps {
  data: ChartDataPoint[];
  innerRadius?: number;
  colorScheme?: string[];
}

export const HiveDonutChart: React.FC<HiveDonutChartProps> = ({
  className,
  variant = "default",
  data,
  innerRadius = 0.6,
  showLegend = true,
  colorScheme = ['#fbbf24', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6'],
  animated = true,
  ...props
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const size = 200;
  const radius = size / 2 - 20;
  const innerRadiusValue = radius * innerRadius;
  
  let currentAngle = -90; // Start from top
  
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const angle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    currentAngle += angle;
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const x1 = size / 2 + radius * Math.cos(startAngleRad);
    const y1 = size / 2 + radius * Math.sin(startAngleRad);
    const x2 = size / 2 + radius * Math.cos(endAngleRad);
    const y2 = size / 2 + radius * Math.sin(endAngleRad);
    
    const x3 = size / 2 + innerRadiusValue * Math.cos(endAngleRad);
    const y3 = size / 2 + innerRadiusValue * Math.sin(endAngleRad);
    const x4 = size / 2 + innerRadiusValue * Math.cos(startAngleRad);
    const y4 = size / 2 + innerRadiusValue * Math.sin(startAngleRad);
    
    const pathData = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${innerRadiusValue} ${innerRadiusValue} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
      'Z'
    ].join(' ');
    
    return {
      ...item,
      pathData,
      percentage,
      color: item.color || colorScheme[index % colorScheme.length],
    };
  });
  
  return (
    <ChartContainer className={className} variant={variant} {...props}>
      <div className="flex items-center justify-center space-x-8">
        {/* Chart */}
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {segments.map((segment, index) => (
              <motion.path
                key={index}
                d={segment.pathData}
                fill={segment.color}
                stroke="rgba(0,0,0,0.1)"
                strokeWidth={1}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ 
                  duration: animated ? motionDurations.smooth : 0,
                  delay: animated ? index * 0.1 : 0,
                  ease: liquidMetal.easing as any 
                }}
                whileHover={{ 
                  opacity: 1,
                  scale: 1.05,
                  transition: { duration: motionDurations.quick }
                }}
              />
            ))}
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <motion.div 
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: motionDurations.smooth, delay: 0.5 }}
              >
                {total}
              </motion.div>
              <div className="text-xs text-white/60">Total</div>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        {showLegend && (
          <div className="space-y-3">
            {segments.map((segment, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: motionDurations.smooth,
                  delay: animated ? index * 0.1 + 0.3 : 0 
                }}
              >
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <div className="space-y-1">
                  <div className="text-sm text-white/80">{segment.label}</div>
                  <div className="text-xs text-white/60">
                    {segment.value} ({segment.percentage.toFixed(1)}%)
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ChartContainer>
  );
};

// Line Chart Component
export interface HiveLineChartProps extends BaseChartProps {
  data: TimeSeriesDataPoint[];
  smooth?: boolean;
  area?: boolean;
  gradient?: boolean;
  color?: string;
}

export const HiveLineChart: React.FC<HiveLineChartProps> = ({
  className,
  variant = "default",
  data,
  smooth = true,
  area = false,
  gradient = true,
  color = '#fbbf24',
  animated = true,
  ...props
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  const { pathData, areaData, points } = useMemo(() => {
    if (data.length < 2) return { pathData: '', areaData: '', points: [] };
    
    const width = 400;
    const height = 200;
    const padding = 20;
    
    const values = data.map(d => d.value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const range = maxValue - minValue || 1;
    
    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((point.value - minValue) / range) * (height - padding * 2);
      return { x, y, value: point.value };
    });
    
    const pathCommands = points.map((point, index) => {
      if (index === 0) return `M ${point.x},${point.y}`;
      
      if (smooth && index > 0) {
        const prevPoint = points[index - 1];
        const cpx1 = prevPoint.x + (point.x - prevPoint.x) * 0.5;
        const cpy1 = prevPoint.y;
        const cpx2 = prevPoint.x + (point.x - prevPoint.x) * 0.5;
        const cpy2 = point.y;
        return `C ${cpx1},${cpy1} ${cpx2},${cpy2} ${point.x},${point.y}`;
      }
      
      return `L ${point.x},${point.y}`;
    });
    
    const pathData = pathCommands.join(' ');
    
    const areaData = area ? 
      pathData + ` L ${points[points.length - 1].x},${height - padding} L ${padding},${height - padding} Z` : 
      '';
    
    return { pathData, areaData, points };
  }, [data, smooth, area]);
  
  return (
    <ChartContainer className={className} variant={variant} {...props}>
      <div className="w-full h-full flex items-center justify-center">
        <svg width="400" height="200" className="overflow-visible">
          <defs>
            {gradient && (
              <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
                <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
              </linearGradient>
            )}
          </defs>
          
          {/* Area */}
          {area && areaData && (
            <motion.path
              d={areaData}
              fill={gradient ? "url(#areaGradient)" : color}
              fillOpacity={gradient ? 1 : 0.2}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: animated ? motionDurations.smooth : 0, delay: 0.2 }}
            />
          )}
          
          {/* Line */}
          <motion.path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: animated ? motionDurations.smooth * 1.5 : 0,
              ease: liquidMetal.easing as any 
            }}
          />
          
          {/* Data Points */}
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={4}
              fill={color}
              stroke="rgba(0,0,0,0.2)"
              strokeWidth={2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: animated ? motionDurations.quick : 0,
                delay: animated ? index * 0.05 + 0.5 : 0 
              }}
              whileHover={{ 
                scale: 1.5,
                transition: { duration: motionDurations.quick }
              }}
            />
          ))}
        </svg>
      </div>
    </ChartContainer>
  );
};

// Chart Actions
export const ChartActions: React.FC<{
  onMaximize?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
  onToggleVisibility?: () => void;
  visible?: boolean;
}> = ({ 
  onMaximize, 
  onDownload, 
  onShare, 
  onToggleVisibility, 
  visible = true 
}) => (
  <div className="flex items-center space-x-2">
    {onToggleVisibility && (
      <motion.button
        className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
        onClick={onToggleVisibility}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {visible ? <Eye size={14} /> : <EyeOff size={14} />}
      </motion.button>
    )}
    
    {onMaximize && (
      <motion.button
        className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
        onClick={onMaximize}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Maximize2 size={14} />
      </motion.button>
    )}
    
    {onDownload && (
      <motion.button
        className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
        onClick={onDownload}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Download size={14} />
      </motion.button>
    )}
    
    {onShare && (
      <motion.button
        className="p-2 text-white/60 hover:text-white/80 hover:bg-white/10 rounded-lg transition-colors"
        onClick={onShare}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share size={14} />
      </motion.button>
    )}
  </div>
);

// Main HiveCharts component for Storybook
export interface HiveChartsProps extends BaseChartProps {
  type: 'metric' | 'bar' | 'donut' | 'line' | 'engagement' | 'activity' | 'pie';
  data?: any;
  interactive?: boolean;
  onDataPointClick?: (data: any) => void;
  onDataPointHover?: (data: any) => void;
  emptyStateAction?: string;
}

export const HiveCharts: React.FC<HiveChartsProps> = ({
  type,
  data = [],
  interactive,
  onDataPointClick,
  onDataPointHover,
  emptyStateAction,
  ...props
}) => {
  // Sample data for different chart types
  const sampleMetricData: MetricData = {
    label: "Active Tools",
    value: 42,
    change: 12.5,
    changeType: 'increase',
    icon: <Zap size={20} />,
    subtitle: "This week"
  };

  const sampleBarData: ChartDataPoint[] = [
    { label: "Mon", value: 65 },
    { label: "Tue", value: 78 },
    { label: "Wed", value: 90 },
    { label: "Thu", value: 81 },
    { label: "Fri", value: 95 }
  ];

  const sampleDonutData: ChartDataPoint[] = [
    { label: "Tools", value: 45 },
    { label: "Spaces", value: 30 },
    { label: "Elements", value: 25 }
  ];

  const sampleLineData: TimeSeriesDataPoint[] = [
    { timestamp: "Jan", value: 20 },
    { timestamp: "Feb", value: 35 },
    { timestamp: "Mar", value: 45 },
    { timestamp: "Apr", value: 55 },
    { timestamp: "May", value: 70 }
  ];

  const renderChart = () => {
    const chartData = data.length > 0 ? data : null;

    switch (type) {
      case 'metric':
        return (
          <HiveMetricCard 
            data={chartData || sampleMetricData}
            {...props}
          />
        );
      
      case 'bar':
        return (
          <HiveBarChart 
            data={chartData || sampleBarData}
            {...props}
          />
        );
      
      case 'donut':
      case 'pie':
        return (
          <HiveDonutChart 
            data={chartData || sampleDonutData}
            {...props}
          />
        );
      
      case 'line':
      case 'activity':
        return (
          <HiveLineChart 
            data={chartData || sampleLineData}
            {...props}
          />
        );
      
      case 'engagement':
        return (
          <div className="grid grid-cols-2 gap-4">
            <HiveMetricCard 
              data={{ label: "Tools Created", value: 24, change: 12, changeType: 'increase', icon: <BarChart3 size={16} /> }}
            />
            <HiveMetricCard 
              data={{ label: "Spaces Active", value: 8, change: 3, changeType: 'increase', icon: <Users size={16} /> }}
            />
            <HiveBarChart 
              data={chartData || sampleBarData}
              title="Weekly Activity"
              className="col-span-2"
            />
          </div>
        );
      
      default:
        return (
          <HiveBarChart 
            data={chartData || sampleBarData}
            {...props}
          />
        );
    }
  };

  if (data.length === 0 && emptyStateAction) {
    return (
      <ChartContainer {...props}>
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="text-6xl opacity-30">📊</div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-white/80">No Data Available</h3>
            <p className="text-sm text-white/60">Start building tools to see analytics</p>
          </div>
          <button className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors">
            {emptyStateAction}
          </button>
        </div>
      </ChartContainer>
    );
  }

  return renderChart();
};

export { 
  ChartContainer,
  hiveChartVariants
};