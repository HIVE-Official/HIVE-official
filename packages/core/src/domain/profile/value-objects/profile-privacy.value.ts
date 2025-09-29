/**
 * ProfilePrivacy Value Object
 * Represents privacy settings for a profile
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

export enum PrivacyLevel {
  PUBLIC = 'public',
  CAMPUS_ONLY = 'campus_only',
  CONNECTIONS_ONLY = 'connections_only',
  PRIVATE = 'private'
}

interface ProfilePrivacyProps {
  level: PrivacyLevel;
  showEmail: boolean;
  showPhone: boolean;
  showDorm: boolean;
  showSchedule: boolean;
  showActivity: boolean;
}

export class ProfilePrivacy extends ValueObject<ProfilePrivacyProps> {
  get level(): PrivacyLevel {
    return this.props.level;
  }

  get showEmail(): boolean {
    return this.props.showEmail;
  }

  get showPhone(): boolean {
    return this.props.showPhone;
  }

  get showDorm(): boolean {
    return this.props.showDorm;
  }

  get showSchedule(): boolean {
    return this.props.showSchedule;
  }

  get showActivity(): boolean {
    return this.props.showActivity;
  }

  private constructor(props: ProfilePrivacyProps) {
    super(props);
  }

  public static create(props: Partial<ProfilePrivacyProps>): Result<ProfilePrivacy> {
    const defaultProps: ProfilePrivacyProps = {
      level: PrivacyLevel.CAMPUS_ONLY,
      showEmail: false,
      showPhone: false,
      showDorm: true,
      showSchedule: false,
      showActivity: true,
      ...props
    };

    return Result.ok<ProfilePrivacy>(new ProfilePrivacy(defaultProps));
  }

  public static createDefault(): Result<ProfilePrivacy> {
    return ProfilePrivacy.create({});
  }

  public static createPublic(): Result<ProfilePrivacy> {
    return ProfilePrivacy.create({
      level: PrivacyLevel.PUBLIC,
      showEmail: false,
      showPhone: false,
      showDorm: true,
      showSchedule: true,
      showActivity: true
    });
  }

  public static createPrivate(): Result<ProfilePrivacy> {
    return ProfilePrivacy.create({
      level: PrivacyLevel.PRIVATE,
      showEmail: false,
      showPhone: false,
      showDorm: false,
      showSchedule: false,
      showActivity: false
    });
  }

  public canViewProfile(viewerType: 'public' | 'campus' | 'connection'): boolean {
    switch (this.props.level) {
      case PrivacyLevel.PUBLIC:
        return true;
      case PrivacyLevel.CAMPUS_ONLY:
        return viewerType === 'campus' || viewerType === 'connection';
      case PrivacyLevel.CONNECTIONS_ONLY:
        return viewerType === 'connection';
      case PrivacyLevel.PRIVATE:
        return false;
      default:
        return false;
    }
  }
}