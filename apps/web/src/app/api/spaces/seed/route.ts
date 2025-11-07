import { withErrors } from "@/lib/middleware";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { addSecureCampusMetadata } from "@/lib/secure-firebase-queries";

/**
 * Seed sample spaces for development
 * POST /api/spaces/seed
 *
 * - Development-only endpoint to quickly populate demo spaces
 * - No UI work required; safe to call from Admin tools
 */
export const POST = withErrors(async (_request, _context, respond) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return respond.error('Seeding is disabled in production', 'FORBIDDEN', { status: 403 });
    }

    const sampleSpaces = [
      {
        id: 'ub-computer-science',
        name: 'UB Computer Science',
        description: 'Connect with CS majors, share projects, get study tips, and network with fellow programmers at UB. From algorithms to internships, we cover it all.',
        type: 'student_organizations',
        isPrivate: false,
        tags: ['cs', 'programming', 'study-group']
      },
      {
        id: 'ub-engineering-hub',
        name: 'UB Engineering Hub',
        description: 'All engineering disciplines unite! Share resources, discuss projects, find lab partners, and get career advice from fellow UB engineers.',
        type: 'student_organizations',
        isPrivate: false,
        tags: ['engineering', 'stem', 'projects']
      },
      {
        id: 'governors-residence-hall',
        name: 'Governors Residence Hall',
        description: 'For residents of Governors! Plan floor events, coordinate study sessions, share dining hall reviews, and stay connected with your neighbors.',
        type: 'residential_spaces',
        isPrivate: false,
        tags: ['dorms', 'governors', 'residence-life']
      },
      {
        id: 'ub-pre-med-society',
        name: 'UB Pre-Med Society',
        description: 'Future doctors assemble! Study together for the MCAT, share volunteer opportunities, discuss med school applications, and support each other.',
        type: 'student_organizations',
        isPrivate: false,
        tags: ['pre-med', 'mcat', 'healthcare']
      },
      {
        id: 'ub-business-network',
        name: 'UB Business Network',
        description: 'Business majors and entrepreneurs unite! Share internship opportunities, discuss case studies, network for future careers, and collaborate on ventures.',
        type: 'student_organizations',
        isPrivate: false,
        tags: ['business', 'networking', 'internships']
      },
      {
        id: 'ub-gaming-community',
        name: 'UB Gaming Community',
        description: 'Gamers of UB unite! Organize tournaments, find teammates, discuss new releases, and plan LAN parties. All games and skill levels welcome.',
        type: 'student_organizations',
        isPrivate: false,
        tags: ['gaming', 'esports', 'tournaments']
      }
    ];

    const batch = dbAdmin.batch();
    let created = 0;

    for (const space of sampleSpaces) {
      const ref = dbAdmin.collection('spaces').doc(space.id);
      const snap = await ref.get();
      if (!snap.exists) {
        batch.set(
          ref,
          addSecureCampusMetadata({
            name: space.name,
            name_lowercase: space.name.toLowerCase(),
            description: space.description,
            type: space.type,
            subType: null,
            status: 'active',
            isActive: true,
            isPrivate: space.isPrivate,
            tags: space.tags.map((t) => ({ sub_type: t })),
            createdBy: 'system',
            metrics: {
              memberCount: Math.floor(Math.random() * 150) + 10,
              postCount: Math.floor(Math.random() * 25) + 2,
              eventCount: Math.floor(Math.random() * 8) + 1,
              toolCount: Math.floor(Math.random() * 3) + 1,
              activeMembers: Math.floor(Math.random() * 40) + 5,
            },
            bannerUrl: null,
          })
        );
        created += 1;
      }
    }

    if (created > 0) {
      await batch.commit();
    }

    logger.info('Seeded spaces', { created });
    return respond.success({ created }, { message: `Seeded ${created} spaces` });
  } catch (error) {
    logger.error('Error seeding spaces', { error });
    return respond.error('Failed to seed spaces', 'INTERNAL_ERROR', { status: 500 });
  }
});

