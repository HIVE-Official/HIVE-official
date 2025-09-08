"use client";

import React, { useState, useMemo } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  Users,
  BookOpen,
  Clock,
  MapPin,
  Star,
  TrendingUp,
  Calendar,
  ChevronRight,
  Search,
  Filter,
  Sparkles,
  Target,
  Brain,
  Coffee,
  Moon,
  Sun,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/use-session';

interface StudyGroup {
  id: string;
  course: string;
  courseCode: string;
  members: number;
  maxMembers: number;
  meetingTime: string;
  location: string;
  studyStyle: 'intensive' | 'casual' | 'structured' | 'flexible';
  nextSession: Date;
  matchScore: number;
  tags: string[];
  leader: {
    name: string;
    avatar?: string;
    rating: number;
  };
}

interface StudyPartner {
  id: string;
  name: string;
  avatar?: string;
  courses: string[];
  studyStyle: string;
  availability: string[];
  matchScore: number;
  gpa?: number;
  strengths: string[];
  lookingFor: string[];
  verified: boolean;
}

interface StudyGroupMatcherCardProps {
  userCourses?: string[];
  userSchedule?: any;
  preferredStudyStyle?: string;
  className?: string;
}

export function StudyGroupMatcherCard({ 
  userCourses = [], 
  userSchedule,
  preferredStudyStyle = 'flexible',
  className 
}: StudyGroupMatcherCardProps) {
  const router = useRouter();
  const { user } = useSession();
  const [view, setView] = useState<'groups' | 'partners' | 'create'>('groups');
  const [filterCourse, setFilterCourse] = useState<string>('all');
  
  // Get current time context
  const currentHour = new Date().getHours();
  const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : currentHour < 21 ? 'evening' : 'night';
  
  // Mock data - would be fetched from Firebase
  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      course: 'Calculus III',
      courseCode: 'MTH 241',
      members: 3,
      maxMembers: 6,
      meetingTime: 'Mon/Wed 7-9pm',
      location: 'Lockwood Library',
      studyStyle: 'intensive',
      nextSession: new Date(Date.now() + 86400000),
      matchScore: 95,
      tags: ['midterm-prep', 'problem-sets'],
      leader: {
        name: 'Alex Chen',
        rating: 4.8
      }
    },
    {
      id: '2',
      course: 'Data Structures',
      courseCode: 'CSE 250',
      members: 5,
      maxMembers: 8,
      meetingTime: 'Tue/Thu 6-8pm',
      location: 'Davis Hall 101',
      studyStyle: 'structured',
      nextSession: new Date(Date.now() + 172800000),
      matchScore: 88,
      tags: ['coding', 'algorithms'],
      leader: {
        name: 'Sarah Johnson',
        rating: 4.9
      }
    },
    {
      id: '3',
      course: 'Organic Chemistry',
      courseCode: 'CHE 203',
      members: 4,
      maxMembers: 5,
      meetingTime: 'Daily 8-10pm',
      location: 'NSC Building',
      studyStyle: 'intensive',
      nextSession: new Date(Date.now() + 7200000),
      matchScore: 92,
      tags: ['finals-prep', 'lab-review'],
      leader: {
        name: 'Mike Thompson',
        rating: 4.7
      }
    }
  ];
  
  const studyPartners: StudyPartner[] = [
    {
      id: '1',
      name: 'Emily Rodriguez',
      courses: ['MTH 241', 'PHY 107'],
      studyStyle: 'Morning Sessions',
      availability: ['Mon 9-11am', 'Wed 9-11am', 'Fri 10am-12pm'],
      matchScore: 94,
      gpa: 3.8,
      strengths: ['Problem Solving', 'Explaining Concepts'],
      lookingFor: ['Practice Problems', 'Exam Prep'],
      verified: true
    },
    {
      id: '2',
      name: 'James Park',
      courses: ['CSE 250', 'CSE 220'],
      studyStyle: 'Late Night Grind',
      availability: ['Daily 10pm-2am'],
      matchScore: 87,
      strengths: ['Algorithms', 'Debugging'],
      lookingFor: ['Project Partner', 'Code Review'],
      verified: true
    },
    {
      id: '3',
      name: 'Lisa Wang',
      courses: ['CHE 203', 'BIO 200'],
      studyStyle: 'Structured Study',
      availability: ['Tue/Thu 3-5pm', 'Sat 2-6pm'],
      matchScore: 91,
      gpa: 3.9,
      strengths: ['Note Taking', 'Memorization'],
      lookingFor: ['Study Buddy', 'Quiz Practice'],
      verified: false
    }
  ];
  
  // Filter groups based on selected course
  const filteredGroups = useMemo(() => {
    if (filterCourse === 'all') return studyGroups;
    return studyGroups.filter(group => group.courseCode === filterCourse);
  }, [filterCourse]);
  
  // Get unique courses for filter
  const uniqueCourses = Array.from(new Set(studyGroups.map(g => g.courseCode)));
  
  // Smart recommendations based on context
  const getRecommendation = () => {
    const hour = new Date().getHours();
    const day = new Date().getDay();
    
    if (hour >= 20 && hour <= 24) {
      return { text: "Late night study sessions starting soon", icon: Moon };
    }
    if (hour >= 6 && hour < 12) {
      return { text: "Morning study groups are most productive", icon: Coffee };
    }
    if (day === 0 || day === 6) {
      return { text: "Weekend marathon sessions available", icon: Target };
    }
    return { text: "Find your perfect study match", icon: Brain };
  };
  
  const recommendation = getRecommendation();

  return (
    <Card className={`p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-400" />
          <h3 className="font-semibold text-foreground">Study Group Matcher</h3>
        </div>
        <Button
          onClick={() => router.push('/study-groups/browse')}
          variant="ghost"
          size="sm"
          className="text-xs"
        >
          View All
          <ChevronRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
      
      {/* Smart Recommendation Banner */}
      <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/10 to-[var(--hive-gold)]/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <recommendation.icon className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium text-foreground">{recommendation.text}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-3 w-3 text-accent" />
          <span className="text-xs text-muted-foreground">
            {studyGroups.length} active groups • {studyPartners.length} potential partners
          </span>
        </div>
      </div>
      
      {/* View Tabs */}
      <div className="flex items-center gap-1 mb-4">
        <button
          onClick={() => setView('groups')}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
            view === 'groups' 
              ? 'bg-blue-500 text-[var(--hive-text-primary)]' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          Study Groups
        </button>
        <button
          onClick={() => setView('partners')}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
            view === 'partners' 
              ? 'bg-blue-500 text-[var(--hive-text-primary)]' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          Study Partners
        </button>
        <button
          onClick={() => setView('create')}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
            view === 'create' 
              ? 'bg-blue-500 text-[var(--hive-text-primary)]' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          Create Group
        </button>
      </div>
      
      {/* Course Filter (for groups view) */}
      {view === 'groups' && (
        <div className="mb-4 flex items-center gap-2">
          <Filter className="h-3 w-3 text-muted-foreground" />
          <select
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            className="text-xs bg-background border border-border rounded-md px-2 py-1"
          >
            <option value="all">All Courses</option>
            {uniqueCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      )}
      
      {/* Study Groups List */}
      {view === 'groups' && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="p-3 border border-border/50 rounded-lg hover:border-blue-500/50 transition-all cursor-pointer group"
              onClick={() => router.push(`/study-groups/${group.id}`)}
            >
              {/* Match Score Badge */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm text-foreground">{group.course}</h4>
                    <Badge variant="secondary" className="text-[10px]">
                      {group.courseCode}
                    </Badge>
                    {group.matchScore >= 90 && (
                      <Badge variant="default" className="text-[10px] bg-green-500/20 text-green-400">
                        {group.matchScore}% Match
                      </Badge>
                    )}
                  </div>
                  
                  {/* Group Details */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {group.members}/{group.maxMembers}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {group.meetingTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {group.location}
                    </span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex items-center gap-1 mb-2">
                    {group.tags.map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-muted rounded-full">
                        {tag}
                      </span>
                    ))}
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      group.studyStyle === 'intensive' ? 'bg-red-500/20 text-red-400' :
                      group.studyStyle === 'structured' ? 'bg-blue-500/20 text-blue-400' :
                      group.studyStyle === 'casual' ? 'bg-green-500/20 text-green-400' :
                      'bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]'
                    }`}>
                      {group.studyStyle}
                    </span>
                  </div>
                  
                  {/* Leader Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-[var(--hive-gold)]" />
                      <span className="text-xs text-muted-foreground">Led by {group.leader.name}</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 text-[var(--hive-gold)] fill-[var(--hive-gold)]" />
                        <span className="text-xs text-[var(--hive-gold)]">{group.leader.rating}</span>
                      </div>
                    </div>
                    
                    {/* Next Session */}
                    <div className="text-xs text-accent">
                      Next: {group.nextSession.toLocaleDateString()} 
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Join Button (shows on hover) */}
              <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" className="w-full text-xs">
                  Request to Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Study Partners List */}
      {view === 'partners' && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {studyPartners.map((partner) => (
            <div
              key={partner.id}
              className="p-3 border border-border/50 rounded-lg hover:border-[var(--hive-gold)]/50 transition-all cursor-pointer"
              onClick={() => router.push(`/profile/${partner.id}`)}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--hive-gold)] to-pink-400 flex-shrink-0" />
                
                {/* Partner Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm text-foreground">{partner.name}</h4>
                    {partner.verified && (
                      <CheckCircle className="h-3 w-3 text-blue-400" />
                    )}
                    <Badge variant="default" className="text-[10px] bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]">
                      {partner.matchScore}% Match
                    </Badge>
                  </div>
                  
                  {/* Courses */}
                  <div className="flex items-center gap-1 mb-2">
                    {partner.courses.map(course => (
                      <Badge key={course} variant="secondary" className="text-[10px]">
                        {course}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Study Style & Availability */}
                  <div className="text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      {partner.studyStyle === 'Morning Sessions' && <Sun className="h-3 w-3" />}
                      {partner.studyStyle === 'Late Night Grind' && <Moon className="h-3 w-3" />}
                      {partner.studyStyle === 'Structured Study' && <Target className="h-3 w-3" />}
                      <span>{partner.studyStyle}</span>
                    </div>
                  </div>
                  
                  {/* Strengths & Looking For */}
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="text-green-400">Strong in:</span>
                    {partner.strengths.slice(0, 2).map(s => (
                      <span key={s} className="px-1.5 py-0.5 bg-green-500/10 text-green-400 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Connect Button */}
              <div className="mt-2">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Send Study Request
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Create Group View */}
      {view === 'create' && (
        <div className="space-y-4">
          <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
            <h4 className="font-medium text-sm text-foreground mb-2">Start Your Own Study Group</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Can't find the perfect group? Create your own and let others join you!
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground">Course</label>
                <select className="w-full mt-1 text-sm bg-background border border-border rounded-md px-3 py-2">
                  <option>Select a course...</option>
                  <option>MTH 241 - Calculus III</option>
                  <option>CSE 250 - Data Structures</option>
                  <option>CHE 203 - Organic Chemistry</option>
                </select>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground">Study Style</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <button className="text-xs px-3 py-2 border border-border rounded-md hover:bg-muted/50">
                    🎯 Intensive
                  </button>
                  <button className="text-xs px-3 py-2 border border-border rounded-md hover:bg-muted/50">
                    📚 Structured
                  </button>
                  <button className="text-xs px-3 py-2 border border-border rounded-md hover:bg-muted/50">
                    ☕ Casual
                  </button>
                  <button className="text-xs px-3 py-2 border border-border rounded-md hover:bg-muted/50">
                    🔄 Flexible
                  </button>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground">Preferred Meeting Times</label>
                <input 
                  type="text" 
                  placeholder="e.g., Mon/Wed 7-9pm"
                  className="w-full mt-1 text-sm bg-background border border-border rounded-md px-3 py-2"
                />
              </div>
              
              <Button className="w-full" size="sm">
                Create Study Group
              </Button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-muted/20 rounded-lg">
              <div className="text-lg font-bold text-blue-400">247</div>
              <div className="text-[10px] text-muted-foreground">Active Groups</div>
            </div>
            <div className="text-center p-2 bg-muted/20 rounded-lg">
              <div className="text-lg font-bold text-[var(--hive-gold)]">1.2k</div>
              <div className="text-[10px] text-muted-foreground">Study Partners</div>
            </div>
            <div className="text-center p-2 bg-muted/20 rounded-lg">
              <div className="text-lg font-bold text-green-400">89%</div>
              <div className="text-[10px] text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Smart Tips */}
      <div className="mt-4 p-3 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-start gap-2">
          <Brain className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs text-accent font-medium mb-1">
              Study Tip
            </p>
            <p className="text-xs text-accent/80">
              {view === 'groups' && "Groups with 4-6 members have the highest success rates."}
              {view === 'partners' && "Partners with similar GPAs tend to have better study compatibility."}
              {view === 'create' && "Set clear expectations and meeting times to attract committed members."}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}