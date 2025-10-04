/**
 * ProfilePrivacy Value Object
 * Represents privacy settings for a profile
 */

import { Result } from '../../shared/base/Result';
import { ValueObject } from '../../shared/base/ValueObject.base';

type ProfileVisibility = 'public' | 'private' | 'connections';

interface ProfilePrivacyProps {
  profileVisibility: ProfileVisibility;
  showEmail: boolean;
  showConnections: boolean;
  allowConnectionRequests: boolean;
}

export class ProfilePrivacy extends ValueObject<ProfilePrivacyProps> {
  get profileVisibility(): string {
    return this.props.profileVisibility;
  }

  get visibility(): string {
    return this.props.profileVisibility;
  }

  get showEmail(): boolean {
    return this.props.showEmail;
  }

  get showConnections(): boolean {
    return this.props.showConnections;
  }

  get allowConnectionRequests(): boolean {
    return this.props.allowConnectionRequests;
  }

  private constructor(props: ProfilePrivacyProps) {
    super(props);
  }

  public isPublic(): boolean {
    return this.props.profileVisibility === 'public';
  }

  public isPrivate(): boolean {
    return this.props.profileVisibility === 'private';
  }

  public isConnectionsOnly(): boolean {
    return this.props.profileVisibility === 'connections';
  }

  public static create(props: Partial<ProfilePrivacyProps>): Result<ProfilePrivacy> {
    // Validate visibility if provided
    if (props.profileVisibility) {
      const validVisibilities: ProfileVisibility[] = ['public', 'private', 'connections'];
      if (!validVisibilities.includes(props.profileVisibility as ProfileVisibility)) {
        return Result.fail<ProfilePrivacy>('Invalid profile visibility');
      }
    }

    const defaultProps: ProfilePrivacyProps = {
      profileVisibility: 'public',
      showEmail: false,
      showConnections: true,
      allowConnectionRequests: true,
      ...props
    };

    return Result.ok<ProfilePrivacy>(new ProfilePrivacy(defaultProps));
  }

  public static createDefault(): Result<ProfilePrivacy> {
    return ProfilePrivacy.create({});
  }

  public static createPublic(): Result<ProfilePrivacy> {
    return ProfilePrivacy.create({
      profileVisibility: 'public',
      showEmail: true,
      showConnections: true,
      allowConnectionRequests: true
    });
  }

  public static createPrivate(): Result<ProfilePrivacy> {
    return ProfilePrivacy.create({
      profileVisibility: 'private',
      showEmail: false,
      showConnections: false,
      allowConnectionRequests: false
    });
  }

  public static createConnectionsOnly(): Result<ProfilePrivacy> {
    return ProfilePrivacy.create({
      profileVisibility: 'connections',
      showEmail: false,
      showConnections: true,
      allowConnectionRequests: true
    });
  }

  public canViewProfile(viewerType: 'public' | 'campus' | 'connection'): boolean {
    switch (this.props.profileVisibility) {
      case 'public':
        return true;
      case 'connections':
        return viewerType === 'connection';
      case 'private':
        return false;
      default:
        return false;
    }
  }
}
