// Bounded Context Owner: Identity & Access Management Guild
import { describe, expect, it } from "vitest";
import {
  createInitialProfileState,
  profileReducer
} from "../state/profile.state";
import { createInMemoryProfileClient } from "../services/profileClient";
import {
  CampusEmailFactory,
  ProfileAggregate,
  ProfileHandleFactory,
  type ProfileProps
} from "@core";
import type { ProfileBundle, ProfileConnection } from "../../../profile/profile.contract";

const toProfileProps = (bundle: ProfileBundle): ProfileProps => {
  const emailResult = CampusEmailFactory.create(bundle.profile.identity.email);
  if (!emailResult.ok) {
    throw new Error(emailResult.error);
  }

  const handleResult = ProfileHandleFactory.create(bundle.profile.identity.handle);
  if (!handleResult.ok) {
    throw new Error(handleResult.error);
  }

  return {
    profileId: { value: bundle.profile.identity.id },
    email: emailResult.value,
    userType: bundle.profile.identity.userType,
    campusId: bundle.profile.identity.campusId,
    handle: handleResult.value,
    personalInfo: bundle.profile.identity.personalInfo,
    academicInfo: bundle.profile.identity.academicInfo,
    socialInfo: bundle.profile.identity.socialInfo,
    affiliation: bundle.profile.identity.affiliation,
    interests: [...bundle.profile.identity.interests],
    clubs: [...bundle.profile.identity.clubs],
    residentialSelection: bundle.profile.identity.residentialSelection,
    isOnboarded: bundle.profile.identity.onboarding.isComplete,
    onboardingCompletedAt: bundle.profile.identity.onboarding.completedAt ?? undefined,
    consentGrantedAt: bundle.profile.identity.onboarding.consentGrantedAt ?? undefined,
    isVerified: bundle.profile.identity.isVerified,
    isActive: bundle.profile.identity.isActive
  };
};

describe("profileReducer", () => {
  it("hydrates profile state with derived metrics on load", async () => {
    const client = createInMemoryProfileClient();
    const bundle = await client.getProfile("profile-jwrhineh");
    const initial = createInitialProfileState();

    const state = profileReducer(initial, {
      type: "LOAD_SUCCESS",
      payload: { bundle }
    });

    expect(state.status).toBe("ready");
    expect(state.profile?.identity.handle).toBe(bundle.profile.identity.handle);
    expect(state.connections?.accepted.length).toBe(bundle.connections.accepted.length);

    const props = toProfileProps(bundle);
    const expectedCompletion = ProfileAggregate.fromPersistence(props).getCompletionPercentage();
    expect(state.profile?.stats.completion).toBe(expectedCompletion);
    expect(state.profile?.stats.connectionCount).toBe(bundle.connections.accepted.length);
  });

  it("adds new connections and updates metrics", async () => {
    const client = createInMemoryProfileClient();
    const bundle = await client.getProfile("profile-jwrhineh");
    const populated = profileReducer(createInitialProfileState(), {
      type: "LOAD_SUCCESS",
      payload: { bundle }
    });

    const startingCount = populated.profile?.stats.connectionCount ?? 0;

    const newConnection: ProfileConnection = {
      summary: {
        profileId: "profile-new",
        handle: "newbuilder",
        displayName: "New Builder",
        userType: "student",
        campusId: "ub-buffalo",
        mutualSpaces: 1,
        mutualConnections: 0,
        lastActiveAt: new Date()
      },
      connectedAt: new Date(),
      tags: ["project"]
    };

    const nextState = profileReducer(populated, {
      type: "CONNECTION_ADDED",
      payload: { connection: newConnection }
    });

    expect(nextState.connections?.accepted[0].summary.profileId).toBe("profile-new");
    expect(nextState.profile?.stats.connectionCount).toBe(startingCount + 1);
  });
});
