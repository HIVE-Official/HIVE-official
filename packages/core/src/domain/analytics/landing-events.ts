import { z } from "zod";

// Base Analytics Event Types
export interface BaseAnalyticsEvent {
  id: string;
  timestamp: Date;
  sessionId: string;
  userId?: string;
  event: string;
  category: EventCategory;
  properties: Record<string, unknown>;
  context: EventContext;
  metadata: EventMetadata;
}

export type EventCategory =
  | "page_view"
  | "user_interaction"
  | "conversion"
  | "engagement"
  | "performance"
  | "error"
  | "system";

export interface EventContext {
  page: PageContext;
  user: UserContext;
  device: DeviceContext;
  campaign: CampaignContext;
  experiment: ExperimentContext;
}

export interface PageContext {
  url: string;
  path: string;
  title: string;
  referrer?: string;
  loadTime: number;
  scrollDepth: number;
  timeOnPage: number;
  exitPage: boolean;
}

export interface UserContext {
  isAuthenticated: boolean;
  userType: "guest" | "new" | "returning" | "verified";
  campus?: string;
  cohort?: string;
  abTestVariants: Record<string, string>;
}

export interface DeviceContext {
  type: "desktop" | "mobile" | "tablet";
  os: string;
  browser: string;
  viewport: {
    width: number;
    height: number;
  };
  connection: {
    type: "wifi" | "cellular" | "ethernet" | "unknown";
    speed: "slow" | "medium" | "fast";
  };
}

export interface CampaignContext {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  gclid?: string;
}

export interface ExperimentContext {
  experiments: ExperimentVariant[];
}

export interface ExperimentVariant {
  id: string;
  name: string;
  variant: string;
  startDate: Date;
}

export interface EventMetadata {
  version: string;
  environment: "development" | "staging" | "production";
  buildId: string;
  region: string;
  processed: boolean;
  errors?: string[];
}

// Landing Page Specific Events
export interface LandingPageViewEvent extends BaseAnalyticsEvent {
  event: "landing_page_view";
  category: "page_view";
  properties: {
    variant: "default" | "animated" | "minimal" | "bold";
    heroVersion: string;
    loadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
    abTestVariant?: string;
  };
}

export interface HeroInteractionEvent extends BaseAnalyticsEvent {
  event: "hero_interaction";
  category: "user_interaction";
  properties: {
    interactionType: "hover" | "click" | "scroll" | "focus";
    element: "headline" | "cta" | "background" | "animation";
    position: {
      x: number;
      y: number;
    };
    timeFromLoad: number;
    scrollPosition: number;
  };
}

export interface CTAClickEvent extends BaseAnalyticsEvent {
  event: "cta_click";
  category: "conversion";
  properties: {
    ctaText: string;
    ctaVariant: "primary" | "secondary" | "outline" | "ghost";
    ctaSize: "sm" | "md" | "lg" | "xl";
    position: "hero" | "section" | "footer";
    timeFromLoad: number;
    scrollPosition: number;
    clickPosition: {
      x: number;
      y: number;
    };
    destination: string;
  };
}

export interface ScrollDepthEvent extends BaseAnalyticsEvent {
  event: "scroll_depth";
  category: "engagement";
  properties: {
    depth: number; // percentage
    maxDepth: number;
    timeToDepth: number;
    section: string;
    totalPageHeight: number;
    viewportHeight: number;
  };
}

export interface AnimationViewEvent extends BaseAnalyticsEvent {
  event: "animation_view";
  category: "engagement";
  properties: {
    animationType: "gradient_flow" | "scale_in" | "slide_up" | "fade_in";
    element: "headline" | "cta" | "background" | "section";
    duration: number;
    completed: boolean;
    interrupted: boolean;
    reducedMotion: boolean;
  };
}

export interface FormInteractionEvent extends BaseAnalyticsEvent {
  event: "form_interaction";
  category: "user_interaction";
  properties: {
    formType: "email_capture" | "waitlist" | "contact" | "newsletter";
    action: "focus" | "input" | "submit" | "error" | "success";
    field?: string;
    errorType?: string;
    timeToComplete?: number;
    attempts?: number;
  };
}

export interface ConversionEvent extends BaseAnalyticsEvent {
  event: "conversion";
  category: "conversion";
  properties: {
    conversionType:
      | "email_capture"
      | "signup_start"
      | "signup_complete"
      | "campus_select";
    value?: number;
    currency?: string;
    funnel: {
      step: number;
      totalSteps: number;
      stepName: string;
    };
    timeToConvert: number;
    touchpoints: TouchPoint[];
  };
}

export interface TouchPoint {
  timestamp: Date;
  event: string;
  source: string;
  medium: string;
}

export interface PerformanceEvent extends BaseAnalyticsEvent {
  event: "performance_metric";
  category: "performance";
  properties: {
    metricType: "web_vital" | "custom" | "network" | "rendering";
    name: string;
    value: number;
    unit: string;
    threshold?: {
      good: number;
      poor: number;
    };
    rating: "good" | "needs-improvement" | "poor";
  };
}

export interface ErrorEvent extends BaseAnalyticsEvent {
  event: "error";
  category: "error";
  properties: {
    errorType: "javascript" | "network" | "rendering" | "validation";
    message: string;
    stack?: string;
    source: string;
    line?: number;
    column?: number;
    severity: "low" | "medium" | "high" | "critical";
    recoverable: boolean;
  };
}

// Zod Validation Schemas
export const eventContextSchema = z.object({
  page: z.object({
    url: z.string().url(),
    path: z.string(),
    title: z.string(),
    referrer: z.string().url().optional(),
    loadTime: z.number().min(0),
    scrollDepth: z.number().min(0).max(100),
    timeOnPage: z.number().min(0),
    exitPage: z.boolean(),
  }),
  user: z.object({
    isAuthenticated: z.boolean(),
    userType: z.enum(["guest", "new", "returning", "verified"]),
    campus: z.string().optional(),
    cohort: z.string().optional(),
    abTestVariants: z.record(z.string()),
  }),
  device: z.object({
    type: z.enum(["desktop", "mobile", "tablet"]),
    os: z.string(),
    browser: z.string(),
    viewport: z.object({
      width: z.number().min(0),
      height: z.number().min(0),
    }),
    connection: z.object({
      type: z.enum(["wifi", "cellular", "ethernet", "unknown"]),
      speed: z.enum(["slow", "medium", "fast"]),
    }),
  }),
  campaign: z.object({
    source: z.string().optional(),
    medium: z.string().optional(),
    campaign: z.string().optional(),
    term: z.string().optional(),
    content: z.string().optional(),
    gclid: z.string().optional(),
  }),
  experiment: z.object({
    experiments: z.array(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
        variant: z.string(),
        startDate: z.date(),
      })
    ),
  }),
});

export const baseAnalyticsEventSchema = z.object({
  id: z.string().uuid(),
  timestamp: z.date(),
  sessionId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  event: z.string(),
  category: z.enum([
    "page_view",
    "user_interaction",
    "conversion",
    "engagement",
    "performance",
    "error",
    "system",
  ]),
  properties: z.record(z.any()),
  context: eventContextSchema,
  metadata: z.object({
    version: z.string().regex(/^\d+\.\d+\.\d+$/),
    environment: z.enum(["development", "staging", "production"]),
    buildId: z.string(),
    region: z.string(),
    processed: z.boolean(),
    errors: z.array(z.string()).optional(),
  }),
});

export const landingPageViewEventSchema = baseAnalyticsEventSchema.extend({
  event: z.literal("landing_page_view"),
  category: z.literal("page_view"),
  properties: z.object({
    variant: z.enum(["default", "animated", "minimal", "bold"]),
    heroVersion: z.string(),
    loadTime: z.number().min(0),
    firstContentfulPaint: z.number().min(0),
    largestContentfulPaint: z.number().min(0),
    cumulativeLayoutShift: z.number().min(0),
    firstInputDelay: z.number().min(0),
    abTestVariant: z.string().optional(),
  }),
});

export const ctaClickEventSchema = baseAnalyticsEventSchema.extend({
  event: z.literal("cta_click"),
  category: z.literal("conversion"),
  properties: z.object({
    ctaText: z.string(),
    ctaVariant: z.enum(["primary", "secondary", "outline", "ghost"]),
    ctaSize: z.enum(["sm", "md", "lg", "xl"]),
    position: z.enum(["hero", "section", "footer"]),
    timeFromLoad: z.number().min(0),
    scrollPosition: z.number().min(0),
    clickPosition: z.object({
      x: z.number(),
      y: z.number(),
    }),
    destination: z.string(),
  }),
});

export const conversionEventSchema = baseAnalyticsEventSchema.extend({
  event: z.literal("conversion"),
  category: z.literal("conversion"),
  properties: z.object({
    conversionType: z.enum([
      "email_capture",
      "signup_start",
      "signup_complete",
      "campus_select",
    ]),
    value: z.number().optional(),
    currency: z.string().length(3).optional(),
    funnel: z.object({
      step: z.number().min(1),
      totalSteps: z.number().min(1),
      stepName: z.string(),
    }),
    timeToConvert: z.number().min(0),
    touchpoints: z.array(
      z.object({
        timestamp: z.date(),
        event: z.string(),
        source: z.string(),
        medium: z.string(),
      })
    ),
  }),
});

// Event Validation Functions
export function validateAnalyticsEvent(event: unknown): BaseAnalyticsEvent {
  return baseAnalyticsEventSchema.parse(event);
}

export function isValidAnalyticsEvent(
  event: unknown
): event is BaseAnalyticsEvent {
  return baseAnalyticsEventSchema.safeParse(event).success;
}

// Event Factory Functions
export function createLandingPageViewEvent(
  sessionId: string,
  properties: LandingPageViewEvent["properties"],
  context: EventContext
): LandingPageViewEvent {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    sessionId,
    event: "landing_page_view",
    category: "page_view",
    properties,
    context,
    metadata: {
      version: "1.0.0",
      environment: "production",
      buildId: process.env.BUILD_ID || "unknown",
      region: "us-east-1",
      processed: false,
    },
  };
}

export function createCTAClickEvent(
  sessionId: string,
  properties: CTAClickEvent["properties"],
  context: EventContext,
  userId?: string
): CTAClickEvent {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    sessionId,
    userId,
    event: "cta_click",
    category: "conversion",
    properties,
    context,
    metadata: {
      version: "1.0.0",
      environment: "production",
      buildId: process.env.BUILD_ID || "unknown",
      region: "us-east-1",
      processed: false,
    },
  };
}

export function createScrollDepthEvent(
  sessionId: string,
  properties: ScrollDepthEvent["properties"],
  context: EventContext,
  userId?: string
): ScrollDepthEvent {
  return {
    id: crypto.randomUUID(),
    timestamp: new Date(),
    sessionId,
    userId,
    event: "scroll_depth",
    category: "engagement",
    properties,
    context,
    metadata: {
      version: "1.0.0",
      environment: "production",
      buildId: process.env.BUILD_ID || "unknown",
      region: "us-east-1",
      processed: false,
    },
  };
}

// Analytics Service Interface
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

export interface PerformanceReport {
  webVitals: WebVitalsReport;
  loadTimes: LoadTimeReport;
  errorRates: ErrorRateReport;
  userExperience: UserExperienceReport;
}

export interface WebVitalsReport {
  firstContentfulPaint: MetricSummary;
  largestContentfulPaint: MetricSummary;
  firstInputDelay: MetricSummary;
  cumulativeLayoutShift: MetricSummary;
  timeToInteractive: MetricSummary;
}

export interface MetricSummary {
  p50: number;
  p75: number;
  p90: number;
  p95: number;
  p99: number;
  average: number;
  count: number;
}

export interface LoadTimeReport {
  pageLoad: MetricSummary;
  domReady: MetricSummary;
  firstByte: MetricSummary;
  resourceLoad: MetricSummary;
}

export interface ErrorRateReport {
  javascript: number;
  network: number;
  rendering: number;
  total: number;
  byPage: Record<string, number>;
}

export interface UserExperienceReport {
  bounceRate: number;
  averageSessionDuration: number;
  pagesPerSession: number;
  conversionRate: number;
  userSatisfactionScore: number;
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

// Event Aggregation Types
export interface EventAggregation {
  timeframe: "hour" | "day" | "week" | "month";
  metrics: AggregatedMetric[];
  dimensions: string[];
  filters: EventFilter[];
}

export interface AggregatedMetric {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  previousValue: number;
}

export interface EventFilter {
  field: string;
  operator:
    | "equals"
    | "not_equals"
    | "contains"
    | "greater_than"
    | "less_than"
    | "in"
    | "not_in";
  value: unknown;
}

// All types are already exported with their interface declarations above
