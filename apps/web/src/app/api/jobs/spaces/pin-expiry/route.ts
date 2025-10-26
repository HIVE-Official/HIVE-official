// Bounded Context Owner: Community Guild
import { NextResponse } from "next/server";
import { SpacePostPinExpiryJob } from "../../../../../server/spaces/jobs/pin-expiry.job";
import { FirestoreSpacePostRepository } from "../../../../../server/spaces/firestore-space-post.repository";
import { getSpacePostTelemetry } from "../../../../../server/spaces/telemetry";
import { getSpacePostEventPublisher } from "../../../../../server/spaces/get-space-post-event-publisher";

const schedulerSecret = process.env.SCHEDULER_SHARED_SECRET;

const createJob = () => {
  const telemetry = getSpacePostTelemetry();
  const events = getSpacePostEventPublisher();
  return new SpacePostPinExpiryJob({
    repository: new FirestoreSpacePostRepository(),
    telemetry,
    events
  });
};

const isAuthorizedSchedulerRequest = (request: Request): boolean => {
  if (!schedulerSecret) {
    return true;
  }

  const authorizationHeader = request.headers.get("authorization");
  if (!authorizationHeader) {
    return false;
  }

  const expected = `Bearer ${schedulerSecret}`;
  return authorizationHeader === expected;
};

export async function POST(request: Request): Promise<NextResponse> {
  if (!isAuthorizedSchedulerRequest(request)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UNAUTHORIZED",
          message: "Scheduler secret mismatch"
        }
      },
      { status: 401 }
    );
  }

  try {
    const job = createJob();
    const result = await job.run();

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown failure";
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "PIN_EXPIRY_FAILED",
          message
        }
      },
      { status: 500 }
    );
  }
}
