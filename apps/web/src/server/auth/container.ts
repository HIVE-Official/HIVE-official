// Bounded Context Owner: Identity & Access Management Guild
import { ConsoleAuthTelemetry } from "./telemetry/console-auth-telemetry";
import { FirestoreAuthTelemetry } from "./telemetry/firestore-auth-telemetry";
import { ConsoleMagicLinkSender } from "./magic-link/console-magic-link.sender";
import { FirebaseMagicLinkSender } from "./magic-link/firebase-magic-link.sender";
import { firebaseFirestore, isFirebaseConfigured } from "@hive/firebase";
import { FirestoreProfileRepository } from "./repositories/firestore-profile.repository";
import { FirestoreOnboardingProgressRepository } from "./repositories/firestore-onboarding-progress.repository";
import { FirestoreSessionRepository } from "./repositories/firestore-session.repository";
import { SpaceAutoJoinService, type SpaceAutoJoinDependencies } from "./services/space-auto-join.service";
import {
  InMemoryOnboardingProgressRepository,
  InMemoryProfileRepository,
  InMemorySessionRepository,
  OnboardingProgressService,
  ProfileOnboardingService,
  SignUpService,
  SessionService,
  type ProfileRepository,
  type OnboardingProgressRepository,
  type SessionRepository
} from "@core";
import { err, type SpaceSnapshot } from "@core";
import { UuidGenerator } from "@core/infrastructure/id/uuid-generator";

const ALLOW_DEV_SEEDS = process.env.ENABLE_DEV_SEEDS === "true";

export interface AuthContainer {
  readonly profileRepository: ProfileRepository;
  readonly onboardingProgressRepository: OnboardingProgressRepository;
  readonly sessionRepository: SessionRepository;
  readonly signUpService: SignUpService;
  readonly progressService: OnboardingProgressService;
  readonly profileOnboardingService: ProfileOnboardingService;
  readonly sessionService: SessionService;
  readonly spaceAutoJoinService: SpaceAutoJoinService;
}

export const createAuthContainer = (): AuthContainer => {
  const { profileRepository, progressRepository, sessionRepository } =
    createRepositories();

  const telemetry = createTelemetry();
  const magicLinkSender = createMagicLinkSender();

  const signUpService = new SignUpService({
    profileRepository,
    idGenerator: new UuidGenerator(),
    magicLinkSender,
    telemetry
  });

  const progressService = new OnboardingProgressService(progressRepository);
  const profileOnboardingService = new ProfileOnboardingService({
    profileRepository,
    telemetry
  });

  const sessionService = new SessionService(
    sessionRepository,
    new UuidGenerator()
  );

  const spaceAutoJoinService = createSpaceAutoJoinService();

  return {
    profileRepository,
    onboardingProgressRepository: progressRepository,
    sessionRepository,
    signUpService,
    progressService,
    profileOnboardingService,
    sessionService,
    spaceAutoJoinService
  };
};

let cachedContainer: AuthContainer | null = null;

export const getAuthContainer = (): AuthContainer => {
  if (!cachedContainer) {
    cachedContainer = createAuthContainer();
  }
  return cachedContainer;
};

const createTelemetry = () => {
  try {
    // Ensure credentials are configured before returning the Firestore-backed telemetry.
    firebaseFirestore();
    return new FirestoreAuthTelemetry();
  } catch (error) {
    if (!ALLOW_DEV_SEEDS) {
      throw new Error(
        "FirestoreAuthTelemetry unavailable and ENABLE_DEV_SEEDS is not set. Configure Firebase credentials or allow dev seeds explicitly."
      );
    }
    console.warn("Falling back to ConsoleAuthTelemetry", error);
    return new ConsoleAuthTelemetry();
  }
};

const createSpaceAutoJoinService = (): SpaceAutoJoinService => {
  let dependencies: SpaceAutoJoinDependencies;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- lazy import avoids loading spaces service when Firebase is unavailable
    const { spaceService } = require("../spaces/service") as typeof import("../spaces/service");
    dependencies = {
      joinSpace: (input) => spaceService.joinSpace(input),
      logger: globalThis.console
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "test") {
      console.warn("space.auto_join.disabled", error);
    }
    dependencies = {
      joinSpace: async () => err<SpaceSnapshot>("space-service-unavailable"),
      logger: globalThis.console
    };
  }

  return new SpaceAutoJoinService(dependencies);
};

const createMagicLinkSender = () => {
  const continueUrl = process.env.FIREBASE_MAGIC_LINK_CONTINUE_URL;
  const allowDevSeeds = process.env.ENABLE_DEV_SEEDS === "true";

  // In dev or when Firebase Admin is not configured, use console sender to avoid 502s
  if (allowDevSeeds || !isFirebaseConfigured()) {
    if (!continueUrl) {
      console.warn("Using console magic link sender without FIREBASE_MAGIC_LINK_CONTINUE_URL; falling back to default verify URL.");
    }
    return new ConsoleMagicLinkSender();
  }

  if (!continueUrl) {
    console.warn("FIREBASE_MAGIC_LINK_CONTINUE_URL is not set; using console magic link sender.");
    return new ConsoleMagicLinkSender();
  }

  try {
    return new FirebaseMagicLinkSender({
      actionCodeSettings: {
        url: continueUrl,
        handleCodeInApp: true,
        dynamicLinkDomain: process.env.FIREBASE_DYNAMIC_LINK_DOMAIN ?? undefined,
        android: process.env.FIREBASE_ANDROID_PACKAGE
          ? { packageName: process.env.FIREBASE_ANDROID_PACKAGE, installApp: true }
          : undefined,
        iOS: process.env.FIREBASE_IOS_BUNDLE_ID
          ? { bundleId: process.env.FIREBASE_IOS_BUNDLE_ID }
          : undefined
      },
      ttlMinutes: Number(process.env.MAGIC_LINK_TTL_MINUTES ?? "15")
    });
  } catch (error) {
    console.warn("Failed to initialize FirebaseMagicLinkSender, using console sender.", error);
    return new ConsoleMagicLinkSender();
  }
};

// Note: profile repository factory logic is handled inside createRepositories()

const createRepositories = () => {
  try {
    const firestore = firebaseFirestore();
    return {
      profileRepository: new FirestoreProfileRepository(firestore),
      progressRepository: new FirestoreOnboardingProgressRepository(firestore),
      sessionRepository: new FirestoreSessionRepository(firestore)
    };
  } catch (error) {
    if (!ALLOW_DEV_SEEDS) {
      throw new Error(
        "Firebase unavailable for auth repositories and ENABLE_DEV_SEEDS is not set. Provide Firebase credentials or allow dev seeds explicitly."
      );
    }
    console.warn("Firebase unavailable, using in-memory repositories", error);
    return {
      profileRepository: new InMemoryProfileRepository(),
      progressRepository: new InMemoryOnboardingProgressRepository(),
      sessionRepository: new InMemorySessionRepository()
    };
  }
};
