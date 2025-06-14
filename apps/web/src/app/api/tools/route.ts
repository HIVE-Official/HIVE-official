import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import { getFirestore } from 'firebase-admin/firestore'
import { z } from 'zod'
import { CreateToolSchema, ToolSchema, createToolDefaults } from '@hive/core/domain/creation/tool'
import { rateLimit } from '@/lib/rate-limit'

const db = getFirestore()

// Rate limiting: 10 tool creations per hour per user
const createToolLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
})

// GET /api/tools - List user's tools
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await getAuth().verifyIdToken(token)
    const userId = decodedToken.uid

    const { searchParams } = new URL(request.url)
    const spaceId = searchParams.get('spaceId')
    const status = searchParams.get('status')
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const offset = parseInt(searchParams.get('offset') || '0')

    // Build query
    let query = db.collection('tools')
      .where('ownerId', '==', userId)
      .orderBy('updatedAt', 'desc')

    // Filter by space if provided
    if (spaceId) {
      query = query.where('spaceId', '==', spaceId)
    }

    // Filter by status if provided
    if (status && ['draft', 'preview', 'published'].includes(status)) {
      query = query.where('status', '==', status)
    }

    // Apply pagination
    query = query.limit(limit).offset(offset)

    const snapshot = await query.get()
    const tools = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    // Get total count for pagination
    const countQuery = db.collection('tools').where('ownerId', '==', userId)
    const countSnapshot = await countQuery.count().get()
    const total = countSnapshot.data().count

    return NextResponse.json({
      tools,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      }
    })

  } catch (error) {
    console.error('Error fetching tools:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tools' },
      { status: 500 }
    )
  }
}

// POST /api/tools - Create new tool
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await getAuth().verifyIdToken(token)
    const userId = decodedToken.uid

    // Rate limiting
    try {
      await createToolLimiter.check(10, userId) // 10 requests per hour
    } catch {
      return NextResponse.json(
        { error: 'Too many tool creations. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Validate request body
    const validatedData = CreateToolSchema.parse(body)

    // If creating a space tool, verify user has builder permissions
    if (validatedData.isSpaceTool && validatedData.spaceId) {
      const spaceDoc = await db.collection('spaces').doc(validatedData.spaceId).get()
      if (!spaceDoc.exists) {
        return NextResponse.json(
          { error: 'Space not found' },
          { status: 404 }
        )
      }

      const spaceData = spaceDoc.data()
      const userRole = spaceData?.members?.[userId]?.role

      if (!['builder', 'admin'].includes(userRole)) {
        return NextResponse.json(
          { error: 'Insufficient permissions to create tools in this space' },
          { status: 403 }
        )
      }
    }

    // Create tool document
    const toolData = createToolDefaults(userId, validatedData)
    const now = new Date()
    
    const tool = {
      ...toolData,
      createdAt: now,
      updatedAt: now,
    }

    // Validate the complete tool object
    const validatedTool = ToolSchema.parse(tool)

    // Save to Firestore
    const toolRef = await db.collection('tools').add(validatedTool)
    
    // Create initial version
    const initialVersion = {
      version: '1.0.0',
      changelog: 'Initial version',
      createdAt: now,
      createdBy: userId,
      isStable: false,
    }

    await toolRef.collection('versions').doc('1.0.0').set(initialVersion)

    // Track analytics event
    await db.collection('analytics_events').add({
      eventType: 'tool_created',
      userId: userId,
      toolId: toolRef.id,
      spaceId: validatedData.spaceId || null,
      isSpaceTool: validatedData.isSpaceTool,
      timestamp: now,
      metadata: {
        toolName: validatedData.name,
        hasDescription: !!validatedData.description,
      }
    })

    const createdTool = {
      id: toolRef.id,
      ...validatedTool
    }

    return NextResponse.json(createdTool, { status: 201 })

  } catch (error) {
    console.error('Error creating tool:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Invalid tool data',
          details: error.errors
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create tool' },
      { status: 500 }
    )
  }
} 