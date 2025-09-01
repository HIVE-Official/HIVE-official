import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-server';
import { dbAdmin } from '@/lib/firebase-admin';
import { generateCohortSpaces, type CohortSpaceConfig } from '@hive/core';
import { z } from 'zod';
import { logger } from "@/lib/logger";
import { ApiResponseHelper as _ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

const createCohortSpacesSchema = z.object({
  major: z.string().min(1),
  graduationYear: z.number().int().min(2020).max(2040),
  majorShortName: z.string().optional()
});

/**
 * Auto-create cohort spaces for a user's major and graduation year
 * This endpoint is called during onboarding completion
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const user = await requireAuth(request);
    
    // Parse request body
    const body = await request.json();
    const { major, graduationYear, majorShortName } = createCohortSpacesSchema.parse(body);
    
    
    
    // Generate cohort space configurations
    const cohortConfig: CohortSpaceConfig = {
      major,
      graduationYear,
      majorShortName
    };
    
    const cohortSpaces = generateCohortSpaces(cohortConfig);
    const createdSpaces: string[] = [];
    const joinedSpaces: string[] = [];
    
    // Create or verify each cohort space exists
    for (const spaceConfig of cohortSpaces) {
      try {
        const spaceRef = dbAdmin.collection('spaces')
          .doc('hive_exclusive')
          .collection('spaces')
          .doc(spaceConfig.id);
          
        const spaceDoc = await spaceRef.get();
        
        if (!spaceDoc.exists) {
          // Create the space
          await spaceRef.set({
            ...spaceConfig,
            type: 'hive_exclusive', // Explicitly set as HIVE Exclusive
            status: 'activated',
            memberCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            name_lowercase: spaceConfig.name.toLowerCase(),
            schoolId: 'university-at-buffalo',
            university: 'University at Buffalo',
            universityShort: 'UB',
            pinnedPostId: null,
            bannerUrl: null,
            metrics: {
              memberCount: 0,
              postCount: 0,
              activeUserCount: 0
            }
          });
          
          createdSpaces.push(spaceConfig.id);
          logger.info('✅ Created cohort space:( )', { spaceConfig: spaceConfig.id, endpoint: '/api/spaces/cohort/auto-create' });
        } else {
          logger.info('📋 Cohort space already exists:( )', { spaceConfig: spaceConfig.id, endpoint: '/api/spaces/cohort/auto-create' });
        }
        
        // Auto-join user to the cohort space
        const memberRef = spaceRef.collection('members').doc(user.uid);
        const memberDoc = await memberRef.get();
        
        if (!memberDoc.exists) {
          await memberRef.set({
            userId: user.uid,
            role: 'member',
            joinedAt: new Date(),
            lastActiveAt: new Date(),
            notifications: {
              posts: true,
              mentions: true,
              events: true
            }
          });
          
          // Increment member count
          await spaceRef.update({
            memberCount: (spaceDoc.exists ? spaceDoc.data()?.memberCount || 0 : 0) + 1,
            'metrics.memberCount': (spaceDoc.exists ? spaceDoc.data()?.metrics?.memberCount || 0 : 0) + 1,
            updatedAt: new Date()
          });
          
          joinedSpaces.push(spaceConfig.id);
          logger.info('👥 Auto-joined user to space', { userId: user.uid, spaceName: spaceConfig.name, endpoint: '/api/spaces/cohort/auto-create' });
        } else {
          logger.info('📌 User already member of space', { userId: user.uid, spaceName: spaceConfig.name, endpoint: '/api/spaces/cohort/auto-create' });
        }
        
      } catch (error) {
        logger.error('❌ Error creating/joining cohort space', { spaceConfigId: spaceConfig.id, error: error, endpoint: '/api/spaces/cohort/auto-create'  });
        // Continue with other spaces even if one fails
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Cohort spaces processed for ${major} '${graduationYear.toString().slice(-2)}`,
      spacesCreated: createdSpaces.length,
      spacesJoined: joinedSpaces.length,
      spaces: cohortSpaces.map(s => ({
        id: s.id,
        name: s.name,
        description: s.description
      }))
    });
    
  } catch (error: any) {
    logger.error('Cohort space creation error', { error: error, endpoint: '/api/spaces/cohort/auto-create' });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create cohort spaces', details: error.message },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}