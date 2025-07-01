import type { BaseAnalyticsEvent } from './base-types';
import type { 
  LandingPageViewEvent, 
  CTAClickEvent, 
  ScrollDepthEvent, 
  AnimationViewEvent, 
  FormInteractionEvent, 
  ConversionEvent, 
  PerformanceEvent, 
  ErrorEvent 
} from './event-types';
import type { PerformanceReport } from './report-types';

export interface LandingAnalyticsService {
  trackPageView(event: LandingPageViewEvent): Promise<void>;
  trackCTAClick(event: CTAClickEvent): Promise<void>;
  trackScrollDepth(event: ScrollDepthEvent): Promise<void>;
  trackAnimation(event: AnimationViewEvent): Promise<void>;
  trackFormInteraction(event: FormInteractionEvent): Promise<void>;
  trackConversion(event: ConversionEvent): Promise<void>;
  trackPerformance(event: PerformanceEvent): Promise<void>;
  trackError(event: ErrorEvent): Promise<void>;

  // Batch operations
  trackBatch(events: BaseAnalyticsEvent[]): Promise<void>;

  // Query operations
  getConversionFunnel(timeRange: DateRange): Promise<FunnelAnalysis>;
  getPerformanceMetrics(timeRange: DateRange): Promise<PerformanceReport>;
  getABTestResults(experimentId: string): Promise<ABTestResults>;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface FunnelAnalysis {
  steps: FunnelStep[];
  totalConversions: number;
  conversionRate: number;
  dropOffPoints: DropOffPoint[];
}

export interface FunnelStep {
  step: number;
  name: string;
  users: number;
  conversionRate: number;
  averageTime: number;
}

export interface DropOffPoint {
  step: number;
  dropOffRate: number;
  commonExitPages: string[];
  reasons: string[];
}

export interface ABTestResults {
  experimentId: string;
  name: string;
  status: "running" | "completed" | "paused";
  variants: ABTestVariantResults[];
  statisticalSignificance: number;
  winner?: string;
  recommendation: string;
}

export interface ABTestVariantResults {
  variant: string;
  users: number;
  conversions: number;
  conversionRate: number;
  confidence: number;
  lift: number;
} 