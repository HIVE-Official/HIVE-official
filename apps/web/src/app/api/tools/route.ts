import { z } from "zod";
import { dbAdmin as adminDb } from "@/lib/firebase-admin";
import { logger } from "@/lib/structured-logger";
import { withAuthAndErrors, withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";

// Define tool schemas locally (not in core package)
const CreateToolSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category: z.string().optional(),
  type: z.enum(['template', 'visual', 'code', 'wizard']).default('visual'),
  status: z.enum(['draft', 'preview', 'published']).default('draft'),
  config: z.any().optional(),
});

const createToolDefaults = {
  status: 'draft' as const,
  type: 'visual' as const,
  config: {},
};

// Rate limiting: 10 tool creations per hour per user
// // const createToolLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 10, // 10 requests per hour
// });

// GET /api/tools - List user's tools
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);

  const { searchParams } = new URL(request.url);
  const spaceId = searchParams.get("spaceId");
  const status = searchParams.get("status");
  const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);
  const offset = parseInt(searchParams.get("offset") || "0");

  // Build query
  let query = adminDb
    .collection("tools")
    .where("ownerId", "==", userId)
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
    const countQuery = adminDb.collection("tools").where("ownerId", "==", userId);
    const countSnapshot = await countQuery.count().get();
    const total = countSnapshot.data().count;

    return respond.success({
      tools,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      }
    });
  }
);

// Enhanced schema to support template-based creation
const EnhancedCreateToolSchema = CreateToolSchema.extend({
  templateId: z.string().optional(),
  type: z.enum(['template', 'visual', 'code', 'wizard']).default('visual'),
  config: z.any().optional(), // Allow any config for flexibility
  elements: z.array(z.any()).optional(), // Add elements support
});

// POST /api/tools - Create new tool (supports templates)
export const POST = withAuthValidationAndErrors(
  EnhancedCreateToolSchema,
  async (request: AuthenticatedRequest, context, validatedData: any, respond) => {
    const userId = getUserId(request);

    // Rate limiting
    try {
      // await createToolLimiter.check(); // Check rate limit for this user
    } catch {
      return respond.error("Too many tool creations. Please try again later.", "UNKNOWN_ERROR", { status: 429 });
    }

    logger.info('🔨 Creating tool for user', { userUid: userId, endpoint: '/api/tools'  });

    // If creating a space tool, verify user has builder permissions
    if (validatedData.isSpaceTool && validatedData.spaceId) {
      const spaceDoc = await adminDb
        .collection("spaces")
        .doc(validatedData.spaceId)
        .get();
      if (!spaceDoc.exists) {
        return respond.error("Space not found", "RESOURCE_NOT_FOUND", { status: 404 });
      }

      const spaceData = spaceDoc.data();
      const userRole = spaceData?.members?.[userId]?.role;

      if (!["builder", "admin"].includes(userRole)) {
        return respond.error("Insufficient permissions to create tools in this space", "FORBIDDEN", { status: 403 });
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
        logger.warn(
      `Failed to load template at /api/tools`,
      error instanceof Error ? error : new Error(String(error))
    );
        // Continue without template
      }
    }

    // Create tool document
    const toolData = createToolDefaults(userId, validatedData);
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
      createdBy: userId,
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
          createdBy: userId,
          createdAt: now,
          type: validatedData.type,
          status: 'draft'
        });
      } catch (error) {
        logger.warn(
      `Failed to add tool to space collection at /api/tools`,
      error instanceof Error ? error : new Error(String(error))
    );
        // Don't fail the whole operation
      }
    }

    // Update user's tool count
    try {
      const userRef = adminDb.collection('users').doc(userId);
      const userDoc = await userRef.get();
      const currentStats = userDoc.data()?.stats || {};
      
      await userRef.update({
        'stats.toolsCreated': (currentStats.toolsCreated || 0) + 1,
        updatedAt: now
      });
    } catch (error) {
      logger.warn(
      `Failed to update user stats at /api/tools`,
      error instanceof Error ? error : new Error(String(error))
    );
    }

    // Track analytics event
    await adminDb.collection("analytics_events").add({
      eventType: "tool_created",
      userId: userId,
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
      } });

    const createdTool = {
      ...validatedTool,
      id: toolRef.id,
    };

    logger.info('✅ Successfully created tool', { toolRefId: toolRef.id, endpoint: '/api/tools'  });

    return respond.success({
      tool: createdTool,
      message: `Tool "${validatedData.name}" created successfully`,
    }, { status: 201 });
  }
);

// Schema for tool update requests
const UpdateToolSchema = z.object({
  toolId: z.string().min(1, 'Tool ID is required'),
}).extend(EnhancedCreateToolSchema.partial().shape);

// PUT /api/tools - Update existing tool
export const PUT = withAuthValidationAndErrors(
  UpdateToolSchema,
  async (request: AuthenticatedRequest, context, validatedData: any, respond) => {
    const userId = getUserId(request);
    const { toolId, ...updateData } = validatedData;

    logger.info('🔨 Updating tool for user', { toolId, userId, endpoint: '/api/tools' });

    // Get existing tool
    const toolDoc = await adminDb.collection("tools").doc(toolId).get();
    if (!toolDoc.exists) {
      return respond.error("Tool not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    const existingTool = toolDoc.data();

    // Check ownership
    if (existingTool?.ownerId !== userId) {
      return respond.error("Not authorized to update this tool", "FORBIDDEN", { status: 403 });
    }

    const now = new Date();
    const updatedTool = {
      ...existingTool,
      ...updateData,
      updatedAt: now,
    };

    // Update the tool
    await adminDb.collection("tools").doc(toolId).update(updatedTool);

    // Create new version if elements changed
    if (updateData.elements && JSON.stringify(updateData.elements) !== JSON.stringify(existingTool?.elements)) {
      const versionNumber = `1.${Date.now()}`;
      const newVersion = {
        version: versionNumber,
        changelog: "Tool updated via builder",
        createdAt: now,
        createdBy: userId,
        isStable: false,
      };

      await adminDb.collection("tools").doc(toolId).collection("versions").doc(versionNumber).set(newVersion);
    }

    // Track analytics event
    await adminDb.collection("analytics_events").add({
      eventType: "tool_updated",
      userId: userId,
      toolId: toolId,
      timestamp: now,
      metadata: {
        fieldsUpdated: Object.keys(updateData),
        hasElementsChange: !!updateData.elements,
      } });

    const result = {
      ...updatedTool,
      id: toolId,
    };

    logger.info('✅ Successfully updated tool', { toolId, endpoint: '/api/tools' });

    return respond.success({
      tool: result,
      message: `Tool "${updatedTool.name}" updated successfully`
    });
  }
);
