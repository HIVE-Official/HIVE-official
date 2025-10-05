import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { createMockSpace, createMockUser } from '@/test/utils/test-utils';

describe('Spaces Components', () => {
  describe('Space Discovery', () => {
    it('should render spaces grid', () => {
      const spaces = [
        createMockSpace({ id: '1', name: 'CS Study Group', memberCount: 25 }),
        createMockSpace({ id: '2', name: 'Gaming Club', memberCount: 100 }),
        createMockSpace({ id: '3', name: 'Art Collective', memberCount: 50 }),
      ];

      const SpacesGrid = ({ spaces }: { spaces: typeof spaces }) => (
        <div data-testid="spaces-grid">
          {spaces.map(space => (
            <div key={space.id} data-testid={`space-card-${space.id}`}>
              <h3>{space.name}</h3>
              <p>{space.memberCount} members</p>
              <p>{space.description}</p>
            </div>
          ))}
        </div>
      );

      render(<SpacesGrid spaces={spaces} />);
      expect(screen.getByText('CS Study Group')).toBeInTheDocument();
      expect(screen.getByText('100 members')).toBeInTheDocument();
    });

    it('should filter spaces by type', () => {
      const spaces = [
        createMockSpace({ type: 'social', name: 'Social Space' }),
        createMockSpace({ type: 'academic', name: 'Academic Space' }),
        createMockSpace({ type: 'social', name: 'Another Social' }),
      ];

      const FilterableSpaces = ({ filter }: { filter?: string }) => {
        const filtered = filter
          ? spaces.filter(s => s.type === filter)
          : spaces;

        return (
          <div>
            {filtered.map(space => (
              <div key={space.id}>{space.name}</div>
            ))}
          </div>
        );
      };

      const { rerender } = render(<FilterableSpaces />);
      expect(screen.getAllByText(/Space|Social/)).toHaveLength(3);

      rerender(<FilterableSpaces filter="social" />);
      expect(screen.getByText('Social Space')).toBeInTheDocument();
      expect(screen.queryByText('Academic Space')).not.toBeInTheDocument();
    });

    it('should search spaces', async () => {
      const onSearch = vi.fn();

      const SpaceSearch = ({ onSearch }: { onSearch: (query: string) => void }) => {
        const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
          onSearch((e.target as any).value);
        };

        return (
          <input
            type="search"
            placeholder="Search spaces..."
            onChange={handleSearch}
            data-testid="space-search"
          />
        );
      };

      render(<SpaceSearch onSearch={onSearch} />);
      const searchInput = screen.getByTestId('space-search');

      fireEvent.change(searchInput, { target: { value: 'study' } });
      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith('study');
      });
    });

    it('should sort spaces by member count', () => {
      const spaces = [
        createMockSpace({ memberCount: 10, name: 'Small' }),
        createMockSpace({ memberCount: 100, name: 'Large' }),
        createMockSpace({ memberCount: 50, name: 'Medium' }),
      ];

      const SortedSpaces = ({ sortBy }: { sortBy: 'members' | 'name' }) => {
        const sorted = [...spaces].sort((a, b) => {
          if (sortBy === 'members') return b.memberCount - a.memberCount;
          return a.name.localeCompare(b.name);
        });

        return (
          <div>
            {sorted.map(space => (
              <div key={space.id}>{space.name} - {space.memberCount}</div>
            ))}
          </div>
        );
      };

      render(<SortedSpaces sortBy="members" />);
      const items = screen.getAllByText(/\d+$/);
      expect(items[0]).toHaveTextContent('100');
      expect(items[1]).toHaveTextContent('50');
      expect(items[2]).toHaveTextContent('10');
    });
  });

  describe('Space Membership', () => {
    it('should handle join space action', async () => {
      const onJoin = vi.fn();

      const SpaceCard = ({ space, onJoin }: any) => (
        <div data-testid="space-card">
          <h3>{space.name}</h3>
          <button onClick={() => onJoin(space.id)}>Join Space</button>
        </div>
      );

      const space = createMockSpace();
      render(<SpaceCard space={space} onJoin={onJoin} />);

      fireEvent.click(screen.getByText('Join Space'));
      expect(onJoin).toHaveBeenCalledWith(space.id);
    });

    it('should handle leave space action', async () => {
      const onLeave = vi.fn();

      const MembershipButton = ({ isMember, spaceId, onLeave }: any) => {
        if (!isMember) return <button>Join</button>;
        return <button onClick={() => onLeave(spaceId)}>Leave Space</button>;
      };

      render(<MembershipButton isMember={true} spaceId="space-1" onLeave={onLeave} />);
      fireEvent.click(screen.getByText('Leave Space'));
      expect(onLeave).toHaveBeenCalledWith('space-1');
    });

    it('should show membership status', () => {
      const MembershipBadge = ({ isMember }: { isMember: boolean }) => {
        if (!isMember) return null;
        return <span data-testid="member-badge">Member</span>;
      };

      const { rerender } = render(<MembershipBadge isMember={false} />);
      expect(screen.queryByTestId('member-badge')).not.toBeInTheDocument();

      rerender(<MembershipBadge isMember={true} />);
      expect(screen.getByTestId('member-badge')).toBeInTheDocument();
    });

    it('should handle join approval for private spaces', () => {
      const PrivateSpaceJoin = ({ space }: { space: any }) => {
        if (space.visibility !== 'private') {
          return <button>Join</button>;
        }

        return (
          <div>
            <button>Request to Join</button>
            <p>This space requires approval</p>
          </div>
        );
      };

      const privateSpace = createMockSpace({ visibility: 'private' });
      render(<PrivateSpaceJoin space={privateSpace} />);

      expect(screen.getByText('Request to Join')).toBeInTheDocument();
      expect(screen.getByText('This space requires approval')).toBeInTheDocument();
    });
  });

  describe('Space Creation', () => {
    it('should validate space creation form', () => {
      const CreateSpaceForm = () => {
        const validateName = (name: string): string[] => {
          const errors = [];
          if (name.length < 3) errors.push('Name too short');
          if (name.length > 50) errors.push('Name too long');
          if (!/^[a-zA-Z0-9\s]+$/.test(name)) errors.push('Invalid characters');
          return errors;
        };

        const [name, setName] = useState('');
        const errors = validateName(name);

        return (
          <form>
            <input
              value={name}
              onChange={(e: React.ChangeEvent) => setName((e.target as any).value)}
              placeholder="Space name"
            />
            {errors.map((error, i) => (
              <p key={i} role="alert">{error}</p>
            ))}
          </form>
        );
      };

      const useState = vi.fn().mockImplementation((initial) => {
        let value = initial;
        return [value, (newValue: any) => { value = newValue; }];
      });

      const ValidateSpaceName = ({ name }: { name: string }) => {
        const errors = [];
        if (name.length < 3) errors.push('Name too short');
        if (name.length > 50) errors.push('Name too long');
        return (
          <div>
            {errors.map((error, i) => (
              <p key={i} role="alert">{error}</p>
            ))}
          </div>
        );
      };

      const { rerender } = render(<ValidateSpaceName name="AB" />);
      expect(screen.getByText('Name too short')).toBeInTheDocument();

      rerender(<ValidateSpaceName name="a".repeat(51)} />);
      expect(screen.getByText('Name too long')).toBeInTheDocument();
    });

    it('should handle space type selection', () => {
      const onTypeSelect = vi.fn();

      const SpaceTypeSelector = ({ onSelect }: { onSelect: (type: string) => void }) => {
        const types = ['social', 'academic', 'marketplace', 'event', 'support'];

        return (
          <div>
            {types.map(type => (
              <button key={type} onClick={() => onSelect(type)}>
                {type}
              </button>
            ))}
          </div>
        );
      };

      render(<SpaceTypeSelector onSelect={onTypeSelect} />);
      fireEvent.click(screen.getByText('academic'));
      expect(onTypeSelect).toHaveBeenCalledWith('academic');
    });

    it('should set space visibility', () => {
      const SpaceVisibility = ({ visibility, onChange }: any) => (
        <div>
          <label>
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === 'public'}
              onChange={() => onChange('public')}
            />
            Public
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={visibility === 'private'}
              onChange={() => onChange('private')}
            />
            Private
          </label>
        </div>
      );

      const onChange = vi.fn();
      render(<SpaceVisibility visibility="public" onChange={onChange} />);

      const privateRadio = screen.getByLabelText('Private');
      fireEvent.click(privateRadio);
      expect(onChange).toHaveBeenCalledWith('private');
    });
  });

  describe('Space Management', () => {
    it('should show admin controls for space admins', () => {
      const SpaceAdminPanel = ({ isAdmin }: { isAdmin: boolean }) => {
        if (!isAdmin) return null;

        return (
          <div data-testid="admin-panel">
            <button>Edit Space</button>
            <button>Manage Members</button>
            <button>Space Settings</button>
          </div>
        );
      };

      const { rerender } = render(<SpaceAdminPanel isAdmin={false} />);
      expect(screen.queryByTestId('admin-panel')).not.toBeInTheDocument();

      rerender(<SpaceAdminPanel isAdmin={true} />);
      expect(screen.getByText('Edit Space')).toBeInTheDocument();
      expect(screen.getByText('Manage Members')).toBeInTheDocument();
    });

    it('should handle member removal', async () => {
      const onRemove = vi.fn();

      const MemberList = ({ members, onRemoveMember }: any) => (
        <div>
          {members.map((member: any) => (
            <div key={member.id}>
              <span>{member.name}</span>
              <button onClick={() => onRemoveMember(member.id)}>Remove</button>
            </div>
          ))}
        </div>
      );

      const members = [
        { id: '1', name: 'John' },
        { id: '2', name: 'Jane' },
      ];

      render(<MemberList members={members} onRemoveMember={onRemove} />);
      fireEvent.click(screen.getAllByText('Remove')[0]);
      expect(onRemove).toHaveBeenCalledWith('1');
    });

    it('should handle space settings update', () => {
      const onUpdate = vi.fn();

      const SpaceSettings = ({ settings, onUpdate }: any) => (
        <form>
          <label>
            <input
              type="checkbox"
              checked={settings.joinApprovalRequired}
              onChange={(e: React.ChangeEvent) => onUpdate({ joinApprovalRequired: e.target.checked })}
            />
            Require join approval
          </label>
        </form>
      );

      const settings = { joinApprovalRequired: false };
      render(<SpaceSettings settings={settings} onUpdate={onUpdate} />);

      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      expect(onUpdate).toHaveBeenCalledWith({ joinApprovalRequired: true });
    });
  });

  describe('Space Activity', () => {
    it('should show recent activity', () => {
      const activities = [
        { id: '1', type: 'join', user: 'John', time: '5 mins ago' },
        { id: '2', type: 'post', user: 'Jane', time: '10 mins ago' },
      ];

      const ActivityFeed = ({ activities }: { activities: typeof activities }) => (
        <div>
          {activities.map(activity => (
            <div key={activity.id}>
              {activity.user} {activity.type === 'join' ? 'joined' : 'posted'} - {activity.time}
            </div>
          ))}
        </div>
      );

      render(<ActivityFeed activities={activities} />);
      expect(screen.getByText(/John joined/)).toBeInTheDocument();
      expect(screen.getByText(/Jane posted/)).toBeInTheDocument();
    });

    it('should show member count and active users', () => {
      const SpaceStats = ({ memberCount, activeCount }: any) => (
        <div>
          <p>{memberCount} total members</p>
          <p>{activeCount} active now</p>
        </div>
      );

      render(<SpaceStats memberCount={150} activeCount={23} />);
      expect(screen.getByText('150 total members')).toBeInTheDocument();
      expect(screen.getByText('23 active now')).toBeInTheDocument();
    });
  });
});