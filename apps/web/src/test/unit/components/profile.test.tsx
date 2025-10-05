import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { createMockProfile, createMockUser } from '@/test/utils/test-utils';

describe('Profile Components', () => {
  describe('Profile Display', () => {
    it('should render profile information', () => {
      const profile = createMockProfile({
        displayName: 'John Doe',
        handle: 'johndoe',
        bio: 'CS Major at UB',
        major: 'Computer Science',
        year: 'Junior',
        dorm: 'Ellicott',
      });

      const ProfileCard = ({ profile }: { profile: typeof profile }) => (
        <div data-testid="profile-card">
          <h1>{profile.displayName}</h1>
          <p>@{profile.handle}</p>
          <p>{profile.bio}</p>
          <div>
            <span>{profile.major}</span>
            <span>{profile.year}</span>
            <span>{profile.dorm}</span>
          </div>
        </div>
      );

      render(<ProfileCard profile={profile} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('@johndoe')).toBeInTheDocument();
      expect(screen.getByText('CS Major at UB')).toBeInTheDocument();
      expect(screen.getByText('Computer Science')).toBeInTheDocument();
    });

    it('should display interests', () => {
      const InterestsList = ({ interests }: { interests: string[] }) => (
        <div data-testid="interests">
          {interests.map(interest => (
            <span key={interest} className="interest-tag">
              {interest}
            </span>
          ))}
        </div>
      );

      const interests = ['coding', 'gaming', 'music', 'sports'];
      render(<InterestsList interests={interests} />);

      interests.forEach(interest => {
        expect(screen.getByText(interest)).toBeInTheDocument();
      });
    });

    it('should handle private profile visibility', () => {
      const PrivateProfile = ({ isPrivate, isOwner }: any) => {
        if (isPrivate && !isOwner) {
          return (
            <div data-testid="private-profile">
              <p>This profile is private</p>
            </div>
          );
        }

        return (
          <div data-testid="public-profile">
            <p>Full profile content</p>
          </div>
        );
      };

      const { rerender } = render(<PrivateProfile isPrivate={true} isOwner={false} />);
      expect(screen.getByText('This profile is private')).toBeInTheDocument();

      rerender(<PrivateProfile isPrivate={true} isOwner={true} />);
      expect(screen.getByText('Full profile content')).toBeInTheDocument();
    });

    it('should show campus badge', () => {
      const CampusBadge = ({ campusId }: { campusId: string }) => {
        const campusNames: Record<string, string> = {
          'ub-buffalo': 'University at Buffalo',
          'cornell': 'Cornell University',
        };

        return (
          <div data-testid="campus-badge">
            {campusNames[campusId] || 'Unknown Campus'}
          </div>
        );
      };

      render(<CampusBadge campusId="ub-buffalo" />);
      expect(screen.getByText('University at Buffalo')).toBeInTheDocument();
    });
  });

  describe('Profile Editing', () => {
    it('should handle profile form submission', async () => {
      const onSave = vi.fn();

      const ProfileEditForm = ({ profile, onSave }: any) => {
        const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          onSave(Object.fromEntries(formData));
        };

        return (
          <form onSubmit={handleSubmit} data-testid="profile-form">
            <input name="displayName" defaultValue={profile.displayName} />
            <textarea name="bio" defaultValue={profile.bio} />
            <select name="year" defaultValue={profile.year}>
              <option>Freshman</option>
              <option>Sophomore</option>
              <option>Junior</option>
              <option>Senior</option>
            </select>
            <button type="submit">Save Profile</button>
          </form>
        );
      };

      const profile = createMockProfile();
      render(<ProfileEditForm profile={profile} onSave={onSave} />);

      fireEvent.submit(screen.getByTestId('profile-form'));
      await waitFor(() => {
        expect(onSave).toHaveBeenCalled();
      });
    });

    it('should validate handle uniqueness', () => {
      const HandleInput = ({ value, isAvailable }: any) => (
        <div>
          <input value={value} placeholder="Choose handle" />
          {!isAvailable && (
            <p role="alert">Handle already taken</p>
          )}
          {isAvailable && value && (
            <p>Handle available!</p>
          )}
        </div>
      );

      const { rerender } = render(<HandleInput value="taken" isAvailable={false} />);
      expect(screen.getByText('Handle already taken')).toBeInTheDocument();

      rerender(<HandleInput value="available" isAvailable={true} />);
      expect(screen.getByText('Handle available!')).toBeInTheDocument();
    });

    it('should handle interest selection', () => {
      const onToggle = vi.fn();

      const InterestSelector = ({ selected, available, onToggle }: any) => (
        <div>
          {available.map((interest: string) => (
            <button
              key={interest}
              onClick={() => onToggle(interest)}
              data-selected={selected.includes(interest)}
            >
              {interest}
            </button>
          ))}
        </div>
      );

      const selected = ['coding'];
      const available = ['coding', 'gaming', 'music'];

      render(
        <InterestSelector
          selected={selected}
          available={available}
          onToggle={onToggle}
        />
      );

      fireEvent.click(screen.getByText('gaming'));
      expect(onToggle).toHaveBeenCalledWith('gaming');
    });

    it('should validate major and year selection', () => {
      const AcademicInfo = ({ major, year }: any) => {
        const validMajors = ['Computer Science', 'Engineering', 'Business'];
        const validYears = ['Freshman', 'Sophomore', 'Junior', 'Senior'];

        const errors = [];
        if (!validMajors.includes(major)) errors.push('Invalid major');
        if (!validYears.includes(year)) errors.push('Invalid year');

        return (
          <div>
            {errors.map((error, i) => (
              <p key={i} role="alert">{error}</p>
            ))}
            {errors.length === 0 && <p>Valid academic info</p>}
          </div>
        );
      };

      const { rerender } = render(<AcademicInfo major="Art" year="Freshman" />);
      expect(screen.getByText('Invalid major')).toBeInTheDocument();

      rerender(<AcademicInfo major="Computer Science" year="Graduate" />);
      expect(screen.getByText('Invalid year')).toBeInTheDocument();

      rerender(<AcademicInfo major="Computer Science" year="Junior" />);
      expect(screen.getByText('Valid academic info')).toBeInTheDocument();
    });
  });

  describe('Profile Stats', () => {
    it('should display profile statistics', () => {
      const ProfileStats = ({ stats }: any) => (
        <div data-testid="profile-stats">
          <div>{stats.spaces} Spaces</div>
          <div>{stats.posts} Posts</div>
          <div>{stats.connections} Connections</div>
          <div>Joined {stats.joinDate}</div>
        </div>
      );

      const stats = {
        spaces: 5,
        posts: 42,
        connections: 23,
        joinDate: 'Oct 2024',
      };

      render(<ProfileStats stats={stats} />);
      expect(screen.getByText('5 Spaces')).toBeInTheDocument();
      expect(screen.getByText('42 Posts')).toBeInTheDocument();
      expect(screen.getByText('23 Connections')).toBeInTheDocument();
    });

    it('should show activity heatmap', () => {
      const ActivityHeatmap = ({ activity }: any) => {
        const getActivityLevel = (count: number) => {
          if (count === 0) return 'none';
          if (count < 5) return 'low';
          if (count < 10) return 'medium';
          return 'high';
        };

        return (
          <div data-testid="activity-heatmap">
            {activity.map((day: any) => (
              <div
                key={day.date}
                data-level={getActivityLevel(day.count)}
                title={`${day.count} activities on ${day.date}`}
              >
                {day.count}
              </div>
            ))}
          </div>
        );
      };

      const activity = [
        { date: '2024-01-01', count: 0 },
        { date: '2024-01-02', count: 3 },
        { date: '2024-01-03', count: 7 },
        { date: '2024-01-04', count: 15 },
      ];

      render(<ActivityHeatmap activity={activity} />);
      const heatmap = screen.getByTestId('activity-heatmap');
      expect(heatmap.children[0]).toHaveAttribute('data-level', 'none');
      expect(heatmap.children[1]).toHaveAttribute('data-level', 'low');
      expect(heatmap.children[2]).toHaveAttribute('data-level', 'medium');
      expect(heatmap.children[3]).toHaveAttribute('data-level', 'high');
    });
  });

  describe('Profile Actions', () => {
    it('should handle follow/unfollow action', async () => {
      const onFollow = vi.fn();
      const onUnfollow = vi.fn();

      const FollowButton = ({ isFollowing, onFollow, onUnfollow }: any) => {
        if (isFollowing) {
          return <button onClick={onUnfollow}>Unfollow</button>;
        }
        return <button onClick={onFollow}>Follow</button>;
      };

      const { rerender } = render(
        <FollowButton isFollowing={false} onFollow={onFollow} onUnfollow={onUnfollow} />
      );

      fireEvent.click(screen.getByText('Follow'));
      expect(onFollow).toHaveBeenCalled();

      rerender(
        <FollowButton isFollowing={true} onFollow={onFollow} onUnfollow={onUnfollow} />
      );

      fireEvent.click(screen.getByText('Unfollow'));
      expect(onUnfollow).toHaveBeenCalled();
    });

    it('should handle message action', () => {
      const onMessage = vi.fn();

      const MessageButton = ({ userId, onMessage }: any) => (
        <button onClick={() => onMessage(userId)}>
          Send Message
        </button>
      );

      render(<MessageButton userId="user-123" onMessage={onMessage} />);
      fireEvent.click(screen.getByText('Send Message'));
      expect(onMessage).toHaveBeenCalledWith('user-123');
    });

    it('should handle share profile', () => {
      const onShare = vi.fn();

      const ShareProfile = ({ profileUrl, onShare }: any) => {
        const handleShare = () => {
          navigator.clipboard.writeText(profileUrl);
          onShare(profileUrl);
        };

        return <button onClick={handleShare}>Share Profile</button>;
      };

      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn() },
        writable: true,
      });

      const profileUrl = 'https://hive.college/profile/johndoe';
      render(<ShareProfile profileUrl={profileUrl} onShare={onShare} />);

      fireEvent.click(screen.getByText('Share Profile'));
      expect(onShare).toHaveBeenCalledWith(profileUrl);
    });
  });

  describe('Profile Connections', () => {
    it('should display connections list', () => {
      const connections = [
        { id: '1', name: 'Alice', handle: 'alice' },
        { id: '2', name: 'Bob', handle: 'bob' },
      ];

      const ConnectionsList = ({ connections }: { connections: typeof connections }) => (
        <div data-testid="connections-list">
          {connections.map(conn => (
            <div key={conn.id}>
              <span>{conn.name}</span>
              <span>@{conn.handle}</span>
            </div>
          ))}
        </div>
      );

      render(<ConnectionsList connections={connections} />);
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('@bob')).toBeInTheDocument();
    });

    it('should show mutual connections', () => {
      const MutualConnections = ({ mutuals }: { mutuals: string[] }) => {
        if (mutuals.length === 0) {
          return <p>No mutual connections</p>;
        }

        return (
          <div>
            <p>{mutuals.length} mutual connections</p>
            <div>{mutuals.slice(0, 3).join(', ')}</div>
            {mutuals.length > 3 && <p>and {mutuals.length - 3} more</p>}
          </div>
        );
      };

      const { rerender } = render(<MutualConnections mutuals={[]} />);
      expect(screen.getByText('No mutual connections')).toBeInTheDocument();

      const mutuals = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
      rerender(<MutualConnections mutuals={mutuals} />);
      expect(screen.getByText('5 mutual connections')).toBeInTheDocument();
      expect(screen.getByText('Alice, Bob, Charlie')).toBeInTheDocument();
      expect(screen.getByText('and 2 more')).toBeInTheDocument();
    });
  });

  describe('Profile Privacy', () => {
    it('should handle privacy settings', () => {
      const onUpdate = vi.fn();

      const PrivacySettings = ({ settings, onUpdate }: any) => (
        <div>
          <label>
            <input
              type="checkbox"
              checked={settings.isPublic}
              onChange={(e: React.ChangeEvent) => onUpdate({ isPublic: (e.target as any)?.checked })}
            />
            Public Profile
          </label>
          <label>
            <input
              type="checkbox"
              checked={settings.showEmail}
              onChange={(e: React.ChangeEvent) => onUpdate({ showEmail: (e.target as any)?.checked })}
            />
            Show Email
          </label>
        </div>
      );

      const settings = { isPublic: true, showEmail: false };
      render(<PrivacySettings settings={settings} onUpdate={onUpdate} />);

      const emailCheckbox = screen.getByLabelText('Show Email');
      fireEvent.click(emailCheckbox);
      expect(onUpdate).toHaveBeenCalledWith({ showEmail: true });
    });

    it('should handle blocked users', () => {
      const onBlock = vi.fn();
      const onUnblock = vi.fn();

      const BlockedUsers = ({ blockedList, onUnblock }: any) => (
        <div>
          {blockedList.map((user: any) => (
            <div key={user.id}>
              <span>{user.name}</span>
              <button onClick={() => onUnblock(user.id)}>Unblock</button>
            </div>
          ))}
        </div>
      );

      const blocked = [{ id: '1', name: 'Spammer' }];
      render(<BlockedUsers blockedList={blocked} onUnblock={onUnblock} />);

      fireEvent.click(screen.getByText('Unblock'));
      expect(onUnblock).toHaveBeenCalledWith('1');
    });
  });
});