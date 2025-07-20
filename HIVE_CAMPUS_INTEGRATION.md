# HIVE Campus Integration Specifications

## **Campus Integration Philosophy**

HIVE components are designed to seamlessly integrate with campus life, connecting students, courses, spaces, and tools in a cohesive ecosystem. Every component should understand its place in the broader campus context and facilitate meaningful connections.

---

## **🏫 Campus Entity System**

### **Core Campus Entities**
```typescript
// Primary campus entities
type CampusEntityType = 
  | 'user'        // Students, instructors, staff
  | 'course'      // Academic courses and programs
  | 'space'       // Physical and virtual spaces
  | 'tool'        // Campus tools and applications
  | 'project'     // Student projects and initiatives
  | 'event'       // Campus events and activities
  | 'resource'    // Academic and support resources
  | 'organization'; // Student organizations and clubs
```

### **Campus Entity Interface**
```typescript
interface CampusEntity {
  id: string;
  type: CampusEntityType;
  name: string;
  description?: string;
  imageUrl?: string;
  
  // Status and metadata
  status: 'active' | 'inactive' | 'pending' | 'archived';
  visibility: 'public' | 'private' | 'restricted';
  metadata: Record<string, any>;
  
  // Relationships
  parentId?: string;
  childIds?: string[];
  relatedEntityIds?: string[];
  
  // Campus-specific data
  campusId?: string;
  departmentId?: string;
  schoolId?: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt?: Date;
}
```

---

## **👤 User System**

### **User Types and Roles**
```typescript
interface CampusUser extends CampusEntity {
  type: 'user';
  
  // Identity
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  displayName: string;
  
  // Campus role
  role: 'student' | 'instructor' | 'staff' | 'admin' | 'guest';
  
  // Academic information
  studentId?: string;
  employeeId?: string;
  graduationYear?: number;
  major?: string;
  department?: string;
  
  // Profile
  avatar?: string;
  bio?: string;
  interests: string[];
  skills: string[];
  
  // Campus engagement
  enrolledCourses: string[];
  activeSpaces: string[];
  createdTools: string[];
  collaborationScore: number;
  
  // Preferences
  preferences: {
    notifications: boolean;
    privacy: 'public' | 'friends' | 'private';
    discoverability: boolean;
  };
}
```

### **User Context Provider**
```typescript
interface CampusUserContext {
  user: CampusUser | null;
  isAuthenticated: boolean;
  permissions: string[];
  
  // Current session
  currentCourse?: string;
  currentSpace?: string;
  currentTool?: string;
  
  // Navigation state
  lastVisitedSpaces: string[];
  recentlyUsedTools: string[];
  bookmarkedContent: string[];
  
  // Real-time features
  onlineStatus: 'online' | 'away' | 'offline';
  currentCollaborators: string[];
}
```

---

## **📚 Course System**

### **Course Entity Structure**
```typescript
interface CampusCourse extends CampusEntity {
  type: 'course';
  
  // Course identification
  code: string;
  title: string;
  description: string;
  
  // Academic details
  credits: number;
  department: string;
  school: string;
  level: 'undergraduate' | 'graduate' | 'professional';
  
  // Enrollment
  capacity: number;
  enrolled: number;
  waitlisted: number;
  
  // Scheduling
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
    timezone: string;
    location: string;
    building?: string;
    room?: string;
  };
  
  // Course structure
  prerequisites: {
    required: string[];
    recommended: string[];
  };
  
  // People
  instructor: {
    id: string;
    name: string;
    email: string;
    officeHours?: string;
    officeLocation?: string;
  };
  
  // Campus integration
  linkedSpaces: string[];
  requiredTools: string[];
  recommendedResources: string[];
  
  // Assessment
  gradingScale: 'letter' | 'pass-fail' | 'numeric';
  assessmentMethods: string[];
  
  // Engagement
  rating?: number;
  reviews?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}
```

---

## **🏢 Space System**

### **Space Entity Structure**
```typescript
interface CampusSpace extends CampusEntity {
  type: 'space';
  
  // Space identification
  name: string;
  description: string;
  spaceType: 'physical' | 'virtual' | 'hybrid';
  
  // Classification
  category: 'academic' | 'social' | 'residential' | 'administrative' | 'recreational';
  subcategory?: string;
  
  // Physical properties (for physical spaces)
  building?: string;
  room?: string;
  floor?: string;
  address?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  
  // Capacity and availability
  capacity?: number;
  currentOccupancy?: number;
  availability: {
    schedule: string; // Cron-like schedule
    reservable: boolean;
    publicAccess: boolean;
  };
  
  // Features and amenities
  features: string[];
  amenities: string[];
  accessibility: string[];
  
  // Campus integration
  relatedCourses: string[];
  regularUsers: string[];
  moderators: string[];
  
  // Space activity
  activityLevel: 'low' | 'medium' | 'high';
  peakHours: string[];
  
  // Virtual space properties
  virtualUrl?: string;
  virtualPlatform?: string;
  accessInstructions?: string;
}
```

---

## **🛠️ Tool System**

### **Tool Entity Structure**
```typescript
interface CampusTool extends CampusEntity {
  type: 'tool';
  
  // Tool identification
  name: string;
  description: string;
  category: 'academic' | 'productivity' | 'collaboration' | 'creative' | 'utility';
  
  // Access
  accessUrl: string;
  accessType: 'web' | 'mobile' | 'desktop' | 'api';
  authentication: 'campus-sso' | 'account-required' | 'public';
  
  // Integration
  integrations: {
    canvas?: boolean;
    zoom?: boolean;
    github?: boolean;
    gsuite?: boolean;
  };
  
  // Tool properties
  supportedPlatforms: string[];
  pricing: 'free' | 'premium' | 'institutional';
  
  // Campus context
  supportedCourses: string[];
  recommendedSpaces: string[];
  userCount: number;
  
  // Tool metadata
  version: string;
  lastUpdated: Date;
  status: 'active' | 'maintenance' | 'deprecated';
  
  // Support
  documentation?: string;
  support?: {
    email?: string;
    chat?: string;
    forum?: string;
  };
}
```

---

## **🔗 Entity Relationships**

### **Relationship Types**
```typescript
interface CampusRelationship {
  id: string;
  fromEntityId: string;
  toEntityId: string;
  relationshipType: 
    | 'enrollment'      // User -> Course
    | 'membership'      // User -> Space
    | 'usage'          // User -> Tool
    | 'prerequisite'   // Course -> Course
    | 'recommendation' // Course -> Tool
    | 'location'       // Course -> Space
    | 'collaboration'  // User -> User
    | 'mentorship'     // User -> User
    | 'ownership'      // User -> Project
    | 'participation'; // User -> Event
  
  metadata: {
    strength: number;      // 0-1 relationship strength
    frequency: number;     // Usage frequency
    duration?: number;     // Relationship duration in days
    lastInteraction: Date;
  };
  
  status: 'active' | 'inactive' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}
```

---

## **🎯 Component Integration Patterns**

### **Campus Context Hook**
```typescript
// Custom hook for campus context
const useCampusContext = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampusContext must be used within CampusProvider');
  }
  return context;
};

// Usage in components
const MyComponent = () => {
  const { user, currentCourse, currentSpace } = useCampusContext();
  
  // Component logic using campus context
  return (
    <div>
      {/* Component content */}
    </div>
  );
};
```

### **Entity Linking Pattern**
```typescript
// Component props for entity linking
interface EntityLinkingProps {
  // Navigation handlers
  onUserClick?: (userId: string) => void;
  onCourseClick?: (courseId: string) => void;
  onSpaceClick?: (spaceId: string) => void;
  onToolClick?: (toolId: string) => void;
  
  // Context-aware actions
  onEnrollInCourse?: (courseId: string) => void;
  onJoinSpace?: (spaceId: string) => void;
  onUseTool?: (toolId: string) => void;
  
  // Relationship actions
  onFollow?: (userId: string) => void;
  onBookmark?: (entityId: string) => void;
  onShare?: (entityId: string) => void;
}

// Implementation example
const CourseCard = ({ course, onEnrollInCourse, onSpaceClick }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Course content */}
        {course.linkedSpaces.map(spaceId => (
          <Button 
            key={spaceId}
            onClick={() => onSpaceClick?.(spaceId)}
            variant="link"
          >
            View Space
          </Button>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={() => onEnrollInCourse?.(course.id)}>
          Enroll
        </Button>
      </CardFooter>
    </Card>
  );
};
```

---

## **🚀 Real-time Features**

### **Live Collaboration**
```typescript
// Real-time collaboration hooks
const useCollaboration = (entityId: string) => {
  const [collaborators, setCollaborators] = useState<CollaborativeUser[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // Connect to real-time collaboration service
    const connection = connectToCollaboration(entityId);
    
    connection.on('user-joined', (user) => {
      setCollaborators(prev => [...prev, user]);
    });
    
    connection.on('user-left', (userId) => {
      setCollaborators(prev => prev.filter(u => u.id !== userId));
    });
    
    connection.on('cursor-move', (userId, position) => {
      setCollaborators(prev => 
        prev.map(u => u.id === userId ? { ...u, cursor: position } : u)
      );
    });
    
    return () => connection.disconnect();
  }, [entityId]);
  
  return { collaborators, isConnected };
};
```

### **Activity Streams**
```typescript
// Activity tracking
interface CampusActivity {
  id: string;
  userId: string;
  entityId: string;
  entityType: CampusEntityType;
  activityType: 'view' | 'edit' | 'create' | 'join' | 'leave' | 'comment';
  metadata: Record<string, any>;
  timestamp: Date;
}

// Activity feed hook
const useActivityFeed = (entityId: string) => {
  const [activities, setActivities] = useState<CampusActivity[]>([]);
  
  useEffect(() => {
    // Subscribe to activity feed
    const subscription = subscribeToActivityFeed(entityId, (activity) => {
      setActivities(prev => [activity, ...prev].slice(0, 50));
    });
    
    return () => subscription.unsubscribe();
  }, [entityId]);
  
  return activities;
};
```

---

## **🔐 Permission System**

### **Permission Model**
```typescript
interface CampusPermission {
  id: string;
  name: string;
  description: string;
  scope: 'global' | 'course' | 'space' | 'tool' | 'project';
  actions: string[];
}

interface UserPermissions {
  userId: string;
  globalPermissions: string[];
  contextPermissions: {
    [entityId: string]: string[];
  };
}

// Permission checking
const usePermissions = () => {
  const { user } = useCampusContext();
  
  const hasPermission = (permission: string, entityId?: string) => {
    if (!user) return false;
    
    // Check global permissions
    if (user.permissions.includes(permission)) return true;
    
    // Check context-specific permissions
    if (entityId && user.contextPermissions[entityId]?.includes(permission)) {
      return true;
    }
    
    return false;
  };
  
  return { hasPermission };
};
```

---

## **📊 Analytics Integration**

### **Campus Analytics Events**
```typescript
interface CampusAnalyticsEvent {
  eventType: 'page-view' | 'interaction' | 'completion' | 'error';
  entityType: CampusEntityType;
  entityId: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  metadata: {
    duration?: number;
    success?: boolean;
    errorMessage?: string;
    customData?: Record<string, any>;
  };
}

// Analytics hook
const useAnalytics = () => {
  const trackEvent = (event: Partial<CampusAnalyticsEvent>) => {
    // Send to analytics service
    sendAnalyticsEvent({
      ...event,
      timestamp: new Date(),
      sessionId: getSessionId(),
    });
  };
  
  return { trackEvent };
};
```

---

## **🌐 API Integration Patterns**

### **Campus API Client**
```typescript
class CampusApiClient {
  // Entity operations
  async getEntity(id: string): Promise<CampusEntity> {
    return this.request(`/entities/${id}`);
  }
  
  async searchEntities(query: string, type?: CampusEntityType): Promise<CampusEntity[]> {
    return this.request('/entities/search', { query, type });
  }
  
  // Relationship operations
  async getRelationships(entityId: string): Promise<CampusRelationship[]> {
    return this.request(`/entities/${entityId}/relationships`);
  }
  
  async createRelationship(relationship: Partial<CampusRelationship>): Promise<CampusRelationship> {
    return this.request('/relationships', { method: 'POST', body: relationship });
  }
  
  // User operations
  async getCurrentUser(): Promise<CampusUser> {
    return this.request('/users/me');
  }
  
  async getUserCourses(userId: string): Promise<CampusCourse[]> {
    return this.request(`/users/${userId}/courses`);
  }
  
  async getUserSpaces(userId: string): Promise<CampusSpace[]> {
    return this.request(`/users/${userId}/spaces`);
  }
  
  // Course operations
  async enrollInCourse(courseId: string): Promise<void> {
    return this.request(`/courses/${courseId}/enroll`, { method: 'POST' });
  }
  
  async dropCourse(courseId: string): Promise<void> {
    return this.request(`/courses/${courseId}/drop`, { method: 'POST' });
  }
  
  // Space operations
  async joinSpace(spaceId: string): Promise<void> {
    return this.request(`/spaces/${spaceId}/join`, { method: 'POST' });
  }
  
  async leaveSpace(spaceId: string): Promise<void> {
    return this.request(`/spaces/${spaceId}/leave`, { method: 'POST' });
  }
  
  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.getToken()}`,
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }
    
    return response.json();
  }
}
```

---

## **🔄 Data Synchronization**

### **Campus Data Sync**
```typescript
// Real-time data synchronization
const useCampusSync = (entityId: string) => {
  const [entity, setEntity] = useState<CampusEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    let subscription: Subscription;
    
    const setupSync = async () => {
      try {
        // Initial data fetch
        const initialData = await campusApi.getEntity(entityId);
        setEntity(initialData);
        
        // Subscribe to real-time updates
        subscription = campusSync.subscribe(entityId, (update) => {
          setEntity(prev => prev ? { ...prev, ...update } : null);
        });
        
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to sync data');
        setIsLoading(false);
      }
    };
    
    setupSync();
    
    return () => {
      subscription?.unsubscribe();
    };
  }, [entityId]);
  
  return { entity, isLoading, error };
};
```

---

## **📱 Component Integration Examples**

### **Course Card with Campus Integration**
```typescript
const HiveCourseCard = ({ 
  course, 
  campusContext,
  onEnroll,
  onViewSpace,
  onContactInstructor 
}: HiveCourseCardProps) => {
  const { user } = useCampusContext();
  const { hasPermission } = usePermissions();
  const { trackEvent } = useAnalytics();
  
  const canEnroll = hasPermission('course.enroll', course.id);
  const isEnrolled = user?.enrolledCourses.includes(course.id);
  
  const handleEnroll = async () => {
    if (!canEnroll) return;
    
    try {
      await campusApi.enrollInCourse(course.id);
      trackEvent({
        eventType: 'interaction',
        entityType: 'course',
        entityId: course.id,
        metadata: { action: 'enroll' },
      });
      onEnroll?.(course.id);
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <HiveCard variant="academic">
      <HiveCardHeader>
        <HiveCardTitle>{course.title}</HiveCardTitle>
        <HiveCardDescription>{course.description}</HiveCardDescription>
      </HiveCardHeader>
      
      <HiveCardContent>
        {/* Course details */}
        <div className="space-y-2">
          <div>Instructor: {course.instructor.name}</div>
          <div>Schedule: {course.schedule.days.join(', ')}</div>
          <div>Capacity: {course.enrolled}/{course.capacity}</div>
        </div>
        
        {/* Linked spaces */}
        {course.linkedSpaces.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Related Spaces</h4>
            <div className="flex flex-wrap gap-2">
              {course.linkedSpaces.map(spaceId => (
                <Button
                  key={spaceId}
                  variant="outline"
                  size="sm"
                  onClick={() => onViewSpace?.(spaceId)}
                >
                  View Space
                </Button>
              ))}
            </div>
          </div>
        )}
      </HiveCardContent>
      
      <HiveCardFooter>
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => onContactInstructor?.(course.instructor.id)}
          >
            Contact Instructor
          </Button>
          
          {isEnrolled ? (
            <Button variant="outline" disabled>
              Enrolled
            </Button>
          ) : (
            <Button 
              onClick={handleEnroll}
              disabled={!canEnroll}
            >
              Enroll
            </Button>
          )}
        </div>
      </HiveCardFooter>
    </HiveCard>
  );
};
```

---

## **🎯 Integration Checklist**

### **Component Campus Integration Requirements**
- [ ] **Campus Context** - Uses `useCampusContext()` hook
- [ ] **Entity Linking** - Supports navigation to related entities
- [ ] **Permission Checks** - Respects user permissions
- [ ] **Analytics Tracking** - Tracks user interactions
- [ ] **Real-time Updates** - Subscribes to relevant data changes
- [ ] **API Integration** - Uses campus API client
- [ ] **Error Handling** - Handles campus API errors gracefully
- [ ] **Loading States** - Shows loading states for async operations
- [ ] **Accessibility** - Maintains accessibility with campus features

### **Testing Campus Integration**
- [ ] **Mock Campus Context** - Test with different user roles
- [ ] **Permission Testing** - Test with different permission levels
- [ ] **API Mocking** - Mock campus API responses
- [ ] **Real-time Testing** - Test real-time update handling
- [ ] **Error Scenarios** - Test API failure scenarios
- [ ] **Performance Testing** - Test with large datasets

---

**This campus integration system ensures that every HIVE component understands its place in the broader campus ecosystem and facilitates meaningful connections between students, courses, spaces, and tools.**