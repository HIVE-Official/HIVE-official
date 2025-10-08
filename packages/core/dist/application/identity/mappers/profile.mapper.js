"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileMapper = void 0;
const Mapper_base_1 = require("../../shared/Mapper.base");
const profile_aggregate_1 = require("../../../domain/profile/aggregates/profile.aggregate");
const ub_email_value_1 = require("../../../domain/profile/value-objects/ub-email.value");
const profile_handle_value_1 = require("../../../domain/profile/value-objects/profile-handle.value");
const temporary_types_1 = require("../../shared/temporary-types");
class ProfileMapper extends Mapper_base_1.Mapper {
    toDTO(profile) {
        return {
            id: profile.id,
            email: profile.email.value,
            handle: profile.handle.value,
            personalInfo: {
                firstName: profile.personalInfo.firstName,
                lastName: profile.personalInfo.lastName,
                bio: profile.personalInfo.bio || '',
                major: profile.personalInfo.major || '',
                graduationYear: profile.personalInfo.graduationYear ?? null,
                dorm: profile.personalInfo.dorm || ''
            },
            interests: profile.interests,
            connections: profile.connections,
            isOnboarded: profile.isOnboarded,
            createdAt: profile.createdAt,
            updatedAt: profile.updatedAt
        };
    }
    toDomain(dto) {
        // Create value objects
        const emailResult = ub_email_value_1.UBEmail.create(dto.email);
        if (emailResult.isFailure) {
            throw new Error(`Invalid email: ${emailResult.error}`);
        }
        const handleResult = profile_handle_value_1.ProfileHandle.create(dto.handle);
        if (handleResult.isFailure) {
            throw new Error(`Invalid handle: ${handleResult.error}`);
        }
        const profileIdResult = temporary_types_1.ProfileId.create(dto.id);
        if (profileIdResult.isFailure) {
            throw new Error(`Invalid profile ID: ${profileIdResult.error}`);
        }
        // Create profile with new signature
        const profileResult = profile_aggregate_1.Profile.create({
            profileId: profileIdResult.getValue(),
            email: emailResult.getValue(),
            handle: handleResult.getValue(),
            personalInfo: {
                firstName: dto.personalInfo.firstName,
                lastName: dto.personalInfo.lastName,
                bio: dto.personalInfo.bio,
                major: dto.personalInfo.major,
                graduationYear: dto.personalInfo.graduationYear || undefined,
                dorm: dto.personalInfo.dorm
            }
        });
        if (profileResult.isFailure) {
            throw new Error(`Failed to create profile: ${profileResult.error}`);
        }
        const profile = profileResult.getValue();
        // Update profile with additional data
        // Note: updateInterests is not available on Profile aggregate
        // Interests are set during profile creation and onboarding
        dto.connections.forEach(connectionId => {
            profile.addConnection(connectionId);
        });
        if (dto.isOnboarded) {
            // Note: completeOnboarding expects AcademicInfo, not PersonalInfo
            // For now, skip this step - onboarding should be completed through proper service layer
            // profile.completeOnboarding(...);
        }
        return profile;
    }
}
exports.ProfileMapper = ProfileMapper;
//# sourceMappingURL=profile.mapper.js.map