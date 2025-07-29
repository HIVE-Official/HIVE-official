import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { CreateToolSchema, ToolSchema, createToolDefaults } from "@hive/core";
import { dbAdmin as adminDb } from "@/lib/firebase-admin";
import { getCurrentUser } from "../../../lib/auth-server";

// Rate limiting: 10 tool creations per hour per user
// // const createToolLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 10, // 10 requests per hour
// });

// GET /api/tools - List user's tools
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get("spaceId");
    const status = searchParams.get("status");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
    const offset = parseInt(searchParams.get("offset") || "0");

    // Build query
    let query = adminDb
      .collection("tools")
      .where("ownerId", "==", user.uid)
      .orderBy("updatedAt", "desc");

    // Filter by space if provided
    if (spaceId) {
      query = query.where("spaceId", "==", spaceId);
    }

    // Filter by status if provided
    if (status && ["draft", "preview", "published"].includes(status)) {
      query = query.where("status", "==", status);
    }

    // Apply pagination
    query = query.limit(limit).offset(offset);

    const snapshot = await query.get();
    const tools = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get total count for pagination
    const countQuery = adminDb.collection("tools").where("ownerId", "==", user.uid);
    const countSnapshot = await countQuery.count().get();
    const total = countSnapshot.data().count;

    return NextResponse.json({
      tools,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error fetching tools:", error);
    return NextResponse.json(
      { error: "Failed to fetch tools" },
      { status: 500 }
    );
  }
}

// Enhanced schema to support template-based creation
const EnhancedCreateToolSchema = CreateToolSchema.extend({
  templateId: z.string().optional(),
  type: z.enum(['template', 'visual', 'code', 'wizard']).default('visual'),
  config: z.any().optional(), // Allow any config for flexibility
});

// POST /api/tools - Create new tool (supports templates)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Rate limiting
    try {
      // await createToolLimiter.check(); // Check rate limit for this user
    } catch {
      return NextResponse.json(
        { error: "Too many tool creations. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    console.log(`🔨 Creating tool for user ${user.uid}`);

    // Validate request body with enhanced schema
    const validatedData = EnhancedCreateToolSchema.parse(body);

    // If creating a space tool, verify user has builder permissions
    if (validatedData.isSpaceTool && validatedData.spaceId) {
      const spaceDoc = await adminDb
        .collection("spaces")
        .doc(validatedData.spaceId)
        .get();
      if (!spaceDoc.exists) {
        return NextResponse.json({ error: "Space not found" }, { status: 404 });
      }

      const spaceData = spaceDoc.data();
      const userRole = spaceData?.members?.[user.uid]?.role;

      if (!["builder", "admin"].includes(userRole)) {
        return NextResponse.json(
          { error: "Insufficient permissions to create tools in this space" },
          { status: 403 }
        );
      }
    }

    // Handle template-based creation
    let templateElements = [];
    let templateConfig = {};
    if (validatedData.templateId) {
      try {
        const templateDoc = await adminDb
          .collection("tool_templates")
          .doc(validatedData.templateId)
          .get();
        
        if (templateDoc.exists) {
          const templateData = templateDoc.data();
          templateElements = templateData?.elements || [];
          templateConfig = templateData?.config || {};
        }
      } catch (error) {
        console.warn("Failed to load template:", error);
        // Continue without template
      }
    }

    // Create tool document
    const toolData = createToolDefaults(user.uid, validatedData);
    const now = new Date();

    const tool = {
      ...toolData,
      elements: templateElements, // Use template elements if available
      config: { ...toolData.config, ...templateConfig, ...validatedData.config }, // Merge configs
      metadata: {
        ...toolData.metadata,
        templateId: validatedData.templateId,
        toolType: validatedData.type,
      },
      createdAt: now,
      updatedAt: now,
    };

    // Validate the complete tool object
    const validatedTool = ToolSchema.parse(tool);

    // Save to Firestore
    const toolRef = await adminDb.collection("tools").add(validatedTool);

    // Create initial version
    const initialVersion = {
      version: "1.0.0",
      changelog: validatedData.templateId ? `Created from template ${validatedData.templateId}` : "Initial version",
      createdAt: now,
      createdBy: user.uid,
      isStable: false,
    };

    await toolRef.collection("versions").doc("1.0.0").set(initialVersion);

    // If this is for a specific space, also add to space's tools collection
    if (validatedData.spaceId && validatedData.spaceId !== 'personal') {
      try {
        const spaceToolRef = adminDb
          .collection('spaces')
          .doc(validatedData.spaceId)
          .collection('tools')
          .doc(toolRef.id);
          
        await spaceToolRef.set({
          toolId: toolRef.id,
          name: validatedData.name,
          description: validatedData.description,
          createdBy: user.uid,
          createdAt: now,
          type: validatedData.type,
          status: 'draft'
        });
      } catch (error) {
        console.warn('Failed to add tool to space collection:', error);
        // Don't fail the whole operation
      }
    }

    // Update user's tool count
    try {
      const userRef = adminDb.collection('users').doc(user.uid);
      const userDoc = await userRef.get();
      const currentStats = userDoc.data()?.stats || {};
      
      await userRef.update({
        'stats.toolsCreated': (currentStats.toolsCreated || 0) + 1,
        updatedAt: now
      });
    } catch (error) {
      console.warn('Failed to update user stats:', error);
    }

    // Track analytics event
    await adminDb.collection("analytics_events").add({
      eventType: "tool_created",
      userId: user.uid,
      toolId: toolRef.id,
      spaceId: validatedData.spaceId || null,
      isSpaceTool: validatedData.isSpaceTool,
      timestamp: now,
      metadata: {
        toolName: validatedData.name,
        toolType: validatedData.type,
        hasDescription: !!validatedData.description,
        hasTemplate: !!validatedData.templateId,
        templateId: validatedData.templateId,
      },
    });

    const createdTool = {
      ...validatedTool,
      id: toolRef.id,
    };

    console.log(`✅ Successfully created tool ${toolRef.id}`);

    return NextResponse.json({
      success: true,
      tool: createdTool,
      message: `Tool "${validatedData.name}" created successfully`,
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating tool:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid tool data",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create tool" },
      { status: 500 }
    );
  }
}

// PUT /api/tools - Update existing tool
export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { toolId, ...updateData } = body;

    if (!toolId) {
      return NextResponse.json({ error: "Tool ID is required" }, { status: 400 });
    }

    console.log(`🔨 Updating tool ${toolId} for user ${user.uid}`);

    // Get existing tool
    const toolDoc = await adminDb.collection("tools").doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    const existingTool = toolDoc.data();
    
    // Check ownership
    if (existingTool?.ownerId !== user.uid) {
      return NextResponse.json({ error: "Not authorized to update this tool" }, { status: 403 });
    }

    // Validate the update data
    const validatedData = EnhancedCreateToolSchema.partial().parse(updateData);

    const now = new Date();
    const updatedTool = {
      ...existingTool,
      ...validatedData,
      updatedAt: now,
    };

    // Update the tool
    await adminDb.collection("tools").doc(toolId).update(updatedTool);

    // Create new version if elements changed
    if (validatedData.elements && JSON.stringify(validatedData.elements) !== JSON.stringify(existingTool.elements)) {
      const versionNumber = `1.${Date.now()}`;
      const newVersion = {
        version: versionNumber,
        changelog: "Tool updated via builder",
        createdAt: now,
        createdBy: user.uid,
        isStable: false,
      };

      await adminDb.collection("tools").doc(toolId).collection("versions").doc(versionNumber).set(newVersion);
    }

    // Track analytics event
    await adminDb.collection("analytics_events").add({
      eventType: "tool_updated",
      userId: user.uid,
      toolId: toolId,
      timestamp: now,
      metadata: {
        fieldsUpdated: Object.keys(validatedData),
        hasElementsChange: !!validatedData.elements,
      },
    });

    const result = {
      ...updatedTool,
      id: toolId,
    };

    console.log(`✅ Successfully updated tool ${toolId}`);

    return NextResponse.json({
      success: true,
      tool: result,
      message: `Tool "${updatedTool.name}" updated successfully`,
    });
  } catch (error) {
    console.error("Error updating tool:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid tool data",
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update tool" },
      { status: 500 }
    );
  }
}
