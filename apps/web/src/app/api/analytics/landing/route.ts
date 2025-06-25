import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@hive/core";

// Event schemas for landing page analytics
const pageViewEventSchema = z.object({
  sessionId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  variant: z.enum(["default", "animated", "minimal", "bold"]),
  loadTime: z.number().min(0),
  viewport: z.object({
    width: z.number().min(0),
    height: z.number().min(0),
  }),
  referrer: z.string().optional(),
});

const ctaClickEventSchema = z.object({
  sessionId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  ctaText: z.string(),
  ctaVariant: z.enum(["primary", "secondary", "outline", "ghost"]),
  position: z.enum(["hero", "section", "footer"]),
  timeFromLoad: z.number().min(0),
  destination: z.string(),
});

const scrollDepthEventSchema = z.object({
  sessionId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  depth: z.number().min(0).max(100),
  timeToDepth: z.number().min(0),
  section: z.string(),
});

// Rate limiting
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 50; // 50 requests per minute

  const current = rateLimitStore.get(sessionId);

  if (!current || now > current.resetTime) {
    rateLimitStore.set(sessionId, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
}

// Process analytics event
async function processAnalyticsEvent(
  eventType: string,
  eventData: Record<string, unknown>
): Promise<void> {
  try {
    logger.info("📊 Analytics Event:", {
      type: eventType,
      sessionId: eventData.sessionId,
      timestamp: new Date().toISOString(),
      data: eventData,
    });

    // In production: send to analytics service, store in database, etc.
  } catch (error) {
    logger.error("❌ Failed to process analytics event:", error);
  }
}

interface AnalyticsRequestData {
  event: string;
  timestamp: number;
  sessionId: string;
  // Add other properties as needed
}

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as AnalyticsRequestData;
    const eventType = request.nextUrl.searchParams.get("type");

    if (!eventType || !data) {
      return NextResponse.json(
        { error: "Missing event type or body" },
        { status: 400 }
      );
    }

    const sessionId = data.sessionId;
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    if (!checkRateLimit(sessionId)) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429 }
      );
    }

    // Process different event types
    switch (eventType) {
      case "page_view": {
        const validatedData = pageViewEventSchema.parse(data);
        await processAnalyticsEvent("landing_page_view", validatedData);
        break;
      }

      case "cta_click": {
        const validatedData = ctaClickEventSchema.parse(data);
        await processAnalyticsEvent("landing_cta_click", validatedData);
        break;
      }

      case "scroll_depth": {
        const validatedData = scrollDepthEventSchema.parse(data);
        await processAnalyticsEvent("landing_scroll_depth", validatedData);
        break;
      }

      default:
        return NextResponse.json(
          { error: "Unknown event type" },
          { status: 400 }
        );
    }

    return NextResponse.json(
      { success: true, timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Analytics error:", error.message);
    } else {
      logger.error("Unknown analytics error:", error);
    }
    return NextResponse.json({ error: "Analytics error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    events: ["page_view", "cta_click", "scroll_depth"],
  });
}
