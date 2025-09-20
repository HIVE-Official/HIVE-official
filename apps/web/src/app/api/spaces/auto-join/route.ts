import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import * as admin from "firebase-admin/firestore";
import { getCohortSpaceId, generateCohortSpaces } from "@hive/core";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

const autoJoinSchema = z.object({
  userId: z.string().min(1, "User ID is required") });

/**
 * Auto-join a user to default/popular spaces after onboarding
 * POST /api/spaces/auto-join
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = (await request.json()) as unknown;
    const { userId } = autoJoinSchema.parse(body);

    // Get user data to understand their profile
    const userDoc = await dbAdmin.collection("users").doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("User not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const userData = userDoc.data();
    const userMajor = userData?.major;
    const userGraduationYear = userData?.graduationYear;

    // Define default spaces to auto-join new users
    // Start with essential HIVE spaces
    const defaultSpaces = [
      // HIVE Exclusive - always join
      { type: "hive_exclusive", id: "general-discussion" },
      { type: "hive_exclusive", id: "announcements" },
      
      // Campus Living - common residential options
      { type: "campus_living", id: "off-campus-housing" },
      { type: "campus_living", id: "roommate-finder" },
      
      // Student Organizations - general interest
      { type: "student_organizations", id: "study-groups" },
      { type: "student_organizations", id: "tutoring-exchange" },
    ];

    // Add HIVE Exclusive cohort spaces based on user profile
    const cohortSpaces: Array<{ type: string; id: string; name?: string }> = [];
    
    if (userMajor && userGraduationYear) {
      // Generate all three cohort spaces for this user
      const cohortConfig = {
        major: userMajor,
        graduationYear: userGraduationYear
      };
      
      const generatedSpaces = generateCohortSpaces(cohortConfig);
      
      // Add all cohort spaces to auto-join list as HIVE Exclusive
      cohortSpaces.push(
        ...generatedSpaces.map(space => ({
          type: "hive_exclusive",
          id: space.id,
          name: space.name
        }))
      );
    } else if (userMajor) {
      // Only major available - join major-specific space
      const majorSpaceId = getCohortSpaceId(userMajor, null);
      cohortSpaces.push({
        type: "hive_exclusive",
        id: majorSpaceId,
        name: `UB ${userMajor}`
      });
    } else if (userGraduationYear) {
      // Only graduation year available - join year-specific space
      const yearSpaceId = getCohortSpaceId(null, userGraduationYear);
      const shortYear = `'${userGraduationYear.toString().slice(-2)}`;
      cohortSpaces.push({
        type: "hive_exclusive",
        id: yearSpaceId,
        name: `UB Class of ${shortYear}`
      });
    }

    // Combine default and cohort spaces
    const allSpacesToJoin = [...defaultSpaces, ...cohortSpaces];

    const joinResults = [];
    const errors = [];

    // Attempt to join each space
    for (const spaceToJoin of allSpacesToJoin) {
      const { type, id, name } = spaceToJoin as { type: string; id: string; name?: string };
      try {
        // Check if space exists
        const spaceRef = dbAdmin.collection("spaces").doc(type).collection("spaces").doc(id);
        const spaceDoc = await spaceRef.get();
        
        if (!spaceDoc.exists) {
          // For HIVE Exclusive cohort spaces, create them if they don't exist
          if (type === "hive_exclusive" && userMajor && userGraduationYear) {
            logger.info('Cohort space not found, creating it...', { id, endpoint: '/api/spaces/auto-join' });
            
            // Find the matching cohort space config
            const cohortConfig = { major: userMajor, graduationYear: userGraduationYear };
            const generatedSpaces = generateCohortSpaces(cohortConfig);
            const matchingSpace = generatedSpaces.find(space => space.id === id);
            
            if (matchingSpace) {
              // Create the cohort space
              await spaceRef.set({
                ...matchingSpace,
                status: 'activated',
                memberCount: 0,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                name_lowercase: matchingSpace.name.toLowerCase(),
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
              
              logger.info('Created cohort space:( )', { matchingSpace, id, endpoint: '/api/spaces/auto-join' });
            } else {
              logger.info('Could not find matching cohort config for , skipping', { id, endpoint: '/api/spaces/auto-join' });
              continue;
            }
          } else {
            logger.info('Space/ not found, skipping', { type, id, endpoint: '/api/spaces/auto-join' });
            continue;
          }
        }

        // Check if user is already a member
        const memberRef = spaceRef.collection("members").doc(userId);
        const memberDoc = await memberRef.get();
        
        if (memberDoc.exists) {
          logger.info('User already member of/ , skipping', {  type, id, endpoint: '/api/spaces/auto-join'  });
          continue;
        }

        // Join the space using a batch operation
        const batch = dbAdmin.batch();

        // Add user to members sub-collection
        const newMember = {
          uid: userId,
          role: "member",
          joinedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        batch.set(memberRef, newMember);

        // Increment the space's member count
        batch.update(spaceRef, {
          memberCount: admin.firestore.FieldValue.increment(1),
          updatedAt: admin.firestore.FieldValue.serverTimestamp() });

        // Execute the batch
        await batch.commit();

        joinResults.push({
          spaceType: type,
          spaceId: id,
          spaceName: spaceDoc.data()?.name || name || id,
          joined: true });

        logger.info('Successfully auto-joined user to space', { userId, id, spaceName: spaceDoc.data()?.name || name, endpoint: '/api/spaces/auto-join'    });
        
      } catch (spaceError) {
        logger.error('Failed to auto-join space', { type, id, error: spaceError, endpoint: '/api/spaces/auto-join' });
        errors.push({
          spaceType: type,
          spaceId: id,
          error: spaceError instanceof Error ? spaceError.message : "Unknown error" });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Auto-joined user to ${joinResults.length} spaces${cohortSpaces.length > 0 ? ` (including ${cohortSpaces.length} cohort spaces)` : ''}`,
      joined: joinResults,
      cohortSpacesJoined: cohortSpaces.length,
      errors: errors.length > 0 ? errors : undefined,
      userId,
      userProfile: {
        major: userMajor,
        graduationYear: userGraduationYear
      }
    });

  } catch (error) {
    logger.error('Auto-join error', { error: error, endpoint: '/api/spaces/auto-join' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to process auto-join request", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
