'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button-enhanced';
import { Avatar, AvatarImage, AvatarFallback } from '../atoms/avatar';
import { SearchInput } from '../atoms/input-enhanced';
import { Alert, AlertDescription } from '../atoms/alert';
import { Select } from '../atoms/select-enhanced';

// HIVE Study Group Matcher Molecule - Campus Social Utility Component
// Designed for connecting students with shared academic needs

export interface StudyGroupMember {
  id: string;
  name: string;
  avatar?: string;
  major: string;
  year: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';
  gpa?: number;
  availability: string[];
  studyPreferences: string[];
  location: string;
  bio?: string;
  sharedCourses?: string[];
  studyStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading' | 'mixed';
  goals: string[];
  rating?: number;
  joinedGroups: number;
}

export interface StudyGroup {
  id: string;
  name: string;
  course: string;
  description: string;
  members: StudyGroupMember[];
  maxMembers: number;
  schedule: string[];
  location: string;
  studyType: 'exam-prep' | 'homework' | 'project' | 'ongoing' | 'review';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  created: Date;
  isPublic: boolean;
  requirements?: string[];
}

export interface StudyGroupMatcherProps extends React.HTMLAttributes<HTMLDivElement> {
  currentUser?: StudyGroupMember;
  availableMembers?: StudyGroupMember[];
  existingGroups?: StudyGroup[];
  userCourses?: string[];
  onCreateGroup?: (group: Partial<StudyGroup>) => void;
  onJoinGroup?: (groupId: string) => void;
  onConnectMember?: (memberId: string) => void;
  onSendMessage?: (memberId: string, message: string) => void;
  showMatchScore?: boolean;
  maxSuggestions?: number;
  loading?: boolean;
  error?: string;
}

const StudyGroupMatcher = React.forwardRef<HTMLDivElement, StudyGroupMatcherProps>(
  ({
    currentUser,
    availableMembers = [],
    existingGroups = [],
    userCourses = [],
    onCreateGroup,
    onJoinGroup,
    onConnectMember,
    onSendMessage,
    showMatchScore = true,
    maxSuggestions = 6,
    loading = false,
    error,
    className,
    ...props
  }, ref) => {
    const [activeTab, setActiveTab] = React.useState<'discover' | 'groups' | 'create'>('discover');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCourse, setSelectedCourse] = React.useState<string>('');
    const [studyTypeFilter, setStudyTypeFilter] = React.useState<string>('');

    // Calculate compatibility score between current user and potential member
    const calculateMatchScore = (member: StudyGroupMember): number => {
      if (!currentUser) return 0;
      
      let score = 0;
      const maxScore = 100;

      // Shared courses (40% weight)
      const sharedCourses = member.sharedCourses?.filter(course => 
        userCourses.includes(course)
      ) || [];
      score += (sharedCourses.length / Math.max(userCourses.length, 1)) * 40;

      // Study preferences alignment (25% weight)
      const sharedPreferences = member.studyPreferences.filter(pref =>
        currentUser.studyPreferences.includes(pref)
      );
      score += (sharedPreferences.length / Math.max(currentUser.studyPreferences.length, 1)) * 25;

      // Availability overlap (20% weight)
      const sharedAvailability = member.availability.filter(time =>
        currentUser.availability.includes(time)
      );
      score += (sharedAvailability.length / Math.max(currentUser.availability.length, 1)) * 20;

      // Study style compatibility (15% weight)
      if (member.studyStyle === currentUser.studyStyle || member.studyStyle === 'mixed' || currentUser.studyStyle === 'mixed') {
        score += 15;
      }

      return Math.min(Math.round(score), maxScore);
    };

    // Filter and sort members by compatibility
    const filteredMembers = React.useMemo(() => {
      let filtered = availableMembers.filter(member => {
        const matchesSearch = !searchTerm || 
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.major.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCourse = !selectedCourse || 
          member.sharedCourses?.includes(selectedCourse);

        return matchesSearch && matchesCourse && member.id !== currentUser?.id;
      });

      // Sort by match score if enabled
      if (showMatchScore && currentUser) {
        filtered = filtered.sort((a, b) => calculateMatchScore(b) - calculateMatchScore(a));
      }

      return filtered.slice(0, maxSuggestions);
    }, [availableMembers, searchTerm, selectedCourse, currentUser, showMatchScore, maxSuggestions]);

    const filteredGroups = React.useMemo(() => {
      return existingGroups.filter(group => {
        const matchesSearch = !searchTerm ||
          group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          group.course.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCourse = !selectedCourse || group.course === selectedCourse;
        const matchesType = !studyTypeFilter || group.studyType === studyTypeFilter;

        return matchesSearch && matchesCourse && matchesType && group.members.length < group.maxMembers;
      });
    }, [existingGroups, searchTerm, selectedCourse, studyTypeFilter]);

    const getMatchColor = (score: number) => {
      if (score >= 80) return 'text-[var(--hive-status-success)]';
      if (score >= 60) return 'text-[var(--hive-status-warning)]';
      return 'text-[var(--hive-text-secondary)]';
    };

    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--hive-background-primary)] border border-[var(--hive-border-primary)] rounded-xl p-6 space-y-6',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
            Study Group Matcher
          </h3>
          <p className="text-sm text-[var(--hive-text-secondary)]">
            Find study partners and groups that match your academic needs and schedule
          </p>
          
          {error && (
            <Alert variant="error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[var(--hive-border-primary)]">
          {[
            { id: 'discover', label: 'Discover Partners' },
            { id: 'groups', label: 'Study Groups' },
            { id: 'create', label: 'Create Group' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors relative',
                activeTab === tab.id
                  ? 'text-[var(--hive-brand-primary)] border-b-2 border-[var(--hive-brand-primary)]'
                  : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <SearchInput
            placeholder="Search by name, major, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
          />

          <div className="flex gap-4">
            <Select
              options={[
                { value: '', label: 'All Courses' },
                ...userCourses.map(course => ({ value: course, label: course }))
              ]}
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              placeholder="Filter by course"
              className="flex-1"
            />
            
            {activeTab === 'groups' && (
              <Select
                options={[
                  { value: '', label: 'All Types' },
                  { value: 'exam-prep', label: 'Exam Prep' },
                  { value: 'homework', label: 'Homework' },
                  { value: 'project', label: 'Project' },
                  { value: 'ongoing', label: 'Ongoing Study' },
                  { value: 'review', label: 'Review Session' }
                ]}
                value={studyTypeFilter}
                onChange={(e) => setStudyTypeFilter(e.target.value)}
                placeholder="Study type"
                className="flex-1"
              />
            )}
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'discover' && (
          <DiscoverTab
            members={filteredMembers}
            currentUser={currentUser}
            calculateMatchScore={calculateMatchScore}
            showMatchScore={showMatchScore}
            onConnectMember={onConnectMember}
            onSendMessage={onSendMessage}
            loading={loading}
          />
        )}

        {activeTab === 'groups' && (
          <GroupsTab
            groups={filteredGroups}
            onJoinGroup={onJoinGroup}
            loading={loading}
          />
        )}

        {activeTab === 'create' && (
          <CreateGroupTab
            userCourses={userCourses}
            onCreateGroup={onCreateGroup}
          />
        )}
      </div>
    );
  }
);
StudyGroupMatcher.displayName = 'StudyGroupMatcher';

// Discover Tab Component
interface DiscoverTabProps {
  members: StudyGroupMember[];
  currentUser?: StudyGroupMember;
  calculateMatchScore: (member: StudyGroupMember) => number;
  showMatchScore: boolean;
  onConnectMember?: (memberId: string) => void;
  onSendMessage?: (memberId: string, message: string) => void;
  loading: boolean;
}

const DiscoverTab: React.FC<DiscoverTabProps> = ({
  members,
  currentUser,
  calculateMatchScore,
  showMatchScore,
  onConnectMember,
  onSendMessage,
  loading
}) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--hive-text-secondary)]">
        No study partners found. Try adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {members.map(member => {
        const matchScore = showMatchScore && currentUser ? calculateMatchScore(member) : 0;
        
        return (
          <MemberCard
            key={member.id}
            member={member}
            matchScore={matchScore}
            showMatchScore={showMatchScore}
            onConnect={() => onConnectMember?.(member.id)}
            onMessage={() => onSendMessage?.(member.id, '')}
          />
        );
      })}
    </div>
  );
};

// Groups Tab Component
interface GroupsTabProps {
  groups: StudyGroup[];
  onJoinGroup?: (groupId: string) => void;
  loading: boolean;
}

const GroupsTab: React.FC<GroupsTabProps> = ({ groups, onJoinGroup, loading }) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (groups.length === 0) {
    return (
      <div className="text-center py-8 text-[var(--hive-text-secondary)]">
        No study groups found. Try creating one or adjusting your search criteria.
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {groups.map(group => (
        <GroupCard
          key={group.id}
          group={group}
          onJoin={() => onJoinGroup?.(group.id)}
        />
      ))}
    </div>
  );
};

// Create Group Tab Component
interface CreateGroupTabProps {
  userCourses: string[];
  onCreateGroup?: (group: Partial<StudyGroup>) => void;
}

const CreateGroupTab: React.FC<CreateGroupTabProps> = ({ userCourses, onCreateGroup }) => {
  const [groupName, setGroupName] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [studyType, setStudyType] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupName || !selectedCourse || !description || !studyType) return;
    
    onCreateGroup?.({
      name: groupName,
      course: selectedCourse,
      description,
      studyType: studyType as StudyGroup['studyType'],
      maxMembers: 6,
      isPublic: true,
      tags: [],
      schedule: [],
      location: '',
      difficulty: 'intermediate'
    });
    
    // Reset form
    setGroupName('');
    setSelectedCourse('');
    setDescription('');
    setStudyType('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Group Name *
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="e.g., CSE 115 Study Squad"
            className="w-full rounded-lg border border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
            Course *
          </label>
          <Select
            options={userCourses.map(course => ({ value: course, label: course }))}
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            placeholder="Select course"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
          Study Type *
        </label>
        <Select
          options={[
            { value: 'exam-prep', label: 'Exam Preparation' },
            { value: 'homework', label: 'Homework Help' },
            { value: 'project', label: 'Project Collaboration' },
            { value: 'ongoing', label: 'Ongoing Study Sessions' },
            { value: 'review', label: 'Review Sessions' }
          ]}
          value={studyType}
          onChange={(e) => setStudyType(e.target.value)}
          placeholder="Select study type"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--hive-text-primary)] mb-2">
          Description *
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what your group will focus on..."
          className="w-full rounded-lg border border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] px-3 py-2 text-sm text-[var(--hive-text-primary)] placeholder:text-[var(--hive-text-tertiary)] min-h-24"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Create Study Group
      </Button>
    </form>
  );
};

// Member Card Component
interface MemberCardProps {
  member: StudyGroupMember;
  matchScore: number;
  showMatchScore: boolean;
  onConnect: () => void;
  onMessage: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  matchScore,
  showMatchScore,
  onConnect,
  onMessage
}) => (
  <div className="border border-[var(--hive-border-primary)] rounded-lg p-4 bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
    <div className="flex items-start gap-3">
      <Avatar>
        <AvatarImage src={member.avatar} alt={member.name} />
        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-[var(--hive-text-primary)] truncate">
            {member.name}
          </h4>
          {showMatchScore && (
            <Badge variant="secondary" className={cn('text-xs', getMatchColor(matchScore))}>
              {matchScore}% match
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-[var(--hive-text-secondary)]">
          {member.major} • {member.year}
        </p>
        
        {member.sharedCourses && member.sharedCourses.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {member.sharedCourses.slice(0, 3).map(course => (
              <Badge key={course} size="sm" variant="secondary">
                {course}
              </Badge>
            ))}
            {member.sharedCourses.length > 3 && (
              <Badge size="sm" variant="secondary">
                +{member.sharedCourses.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={onConnect}>
            Connect
          </Button>
          <Button size="sm" variant="ghost" onClick={onMessage}>
            Message
          </Button>
        </div>
      </div>
    </div>
  </div>
);

// Group Card Component
interface GroupCardProps {
  group: StudyGroup;
  onJoin: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onJoin }) => (
  <div className="border border-[var(--hive-border-primary)] rounded-lg p-4 bg-[var(--hive-background-secondary)]">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-[var(--hive-text-primary)]">
            {group.name}
          </h4>
          <Badge size="sm" variant="secondary">
            {group.course}
          </Badge>
          <Badge size="sm" variant="secondary">
            {group.studyType}
          </Badge>
        </div>
        
        <p className="text-sm text-[var(--hive-text-secondary)] mt-1">
          {group.description}
        </p>
        
        <div className="flex items-center gap-4 mt-3 text-xs text-[var(--hive-text-tertiary)]">
          <span>{group.members.length}/{group.maxMembers} members</span>
          <span>Created {group.created.toLocaleDateString()}</span>
          {group.location && <span>{group.location}</span>}
        </div>
      </div>
      
      <Button size="sm" onClick={onJoin}>
        Join Group
      </Button>
    </div>
  </div>
);

// Loading Skeleton
const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[1, 2, 3].map(i => (
      <div key={i} className="animate-pulse border border-[var(--hive-border-primary)] rounded-lg p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--hive-background-tertiary)] rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-[var(--hive-background-tertiary)] rounded w-3/4 mb-2" />
            <div className="h-3 bg-[var(--hive-background-tertiary)] rounded w-1/2" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const getMatchColor = (score: number) => {
  if (score >= 80) return 'text-[var(--hive-status-success)]';
  if (score >= 60) return 'text-[var(--hive-status-warning)]';
  return 'text-[var(--hive-text-secondary)]';
};

export { StudyGroupMatcher };

