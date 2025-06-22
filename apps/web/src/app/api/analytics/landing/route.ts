import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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
  eventData: any
): Promise<void> {
  try {
    console.log("📊 Analytics Event:", {
      type: eventType,
      sessionId: eventData.sessionId,
      timestamp: new Date().toISOString(),
      data: eventData,
    });

    // In production: send to analytics service, store in database, etc.
  } catch (error) {
    console.error("❌ Failed to process analytics event:", error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const eventType = request.nextUrl.searchParams.get("type");

    if (!eventType || !body) {
      return NextResponse.json(
        { error: "Missing event type or body" },
        { status: 400 }
      );
    }

    const sessionId = body.sessionId;
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
        const validatedData = pageViewEventSchema.parse(body);
        await processAnalyticsEvent("landing_page_view", validatedData);
        break;
      }

      case "cta_click": {
        const validatedData = ctaClickEventSchema.parse(body);
        await processAnalyticsEvent("landing_cta_click", validatedData);
        break;
      }

      case "scroll_depth": {
        const validatedData = scrollDepthEventSchema.parse(body);
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
  } catch (error) {
    console.error("❌ Analytics API error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    events: ["page_view", "cta_click", "scroll_depth"],
  });
}
