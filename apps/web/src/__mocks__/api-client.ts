// Mock API client for Team 1 development
// This will be replaced with real API integration in Phase 3

export const mockApiClient = {
  // Auth endpoints
  auth: {
    sendMagicLink: async (email: string) => {
      await new Promise(resolve => setTimeout(resolve, 500)) // Simulate network delay
      
      if (!email.includes('@')) {
        throw new Error('Invalid email format')
      }
      
      if (!email.endsWith('.edu')) {
        throw new Error('Please use your university email address')
      }
      
      return { success: true, message: 'Magic link sent' }
    },
    
    verifyMagicLink: async (token: string) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      if (token === 'expired-token') {
        throw new Error('Magic link has expired')
      }
      
      return {
        user: {
          id: 'mock-user-id',
          email: 'jane.doe@buffalo.edu',
          schoolId: 'university-at-buffalo',
          schoolName: 'University at Buffalo'
        },
        token: 'mock-auth-token'
      }
    },
    
    checkHandle: async (handle: string) => {
      await new Promise(resolve => setTimeout(resolve, 800)) // Simulate validation delay
      
      if (handle.length < 3) {
        throw new Error('Handle must be at least 3 characters')
      }
      
      if (!/^[a-zA-Z0-9_]+$/.test(handle)) {
        throw new Error('Handle can only contain letters, numbers, and underscores')
      }
      
      // Mock taken handles
      const takenHandles = ['admin', 'test', 'user', 'janedoe', 'johndoe']
      
      if (takenHandles.includes(handle.toLowerCase())) {
        return {
          available: false,
          suggestions: [`${handle}2024`, `${handle}_24`, `${handle}25`]
        }
      }
      
      return { available: true }
    },
    
    completeOnboarding: async (userData: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate random network failures for testing
      if (Math.random() < 0.1) { // 10% failure rate
        throw new Error('Network error during onboarding')
      }
      
      return {
        user: {
          id: 'mock-user-id',
          ...userData,
          onboardingCompleted: true,
          createdAt: new Date().toISOString()
        }
      }
    }
  },
  
  // Schools endpoints
  schools: {
    getAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 200))
      
      return {
        schools: [
          {
            id: 'university-at-buffalo',
            name: 'University at Buffalo',
            domain: 'buffalo.edu',
            majors: [
              'Computer Science',
              'Business Administration',
              'Psychology',
              'Engineering',
              'Biology',
              'Mathematics',
              'English',
              'History'
            ]
          },
          {
            id: 'cornell-university',
            name: 'Cornell University',
            domain: 'cornell.edu',
            majors: [
              'Computer Science',
              'Engineering',
              'Business',
              'Agriculture',
              'Veterinary Medicine'
            ]
          }
        ]
      }
    },
    
    getByDomain: async (domain: string) => {
      const { schools } = await mockApiClient.schools.getAll()
      const school = schools.find(s => s.domain === domain)
      
      if (!school) {
        throw new Error('University not supported')
      }
      
      return { school }
    }
  },
  
  // Spaces endpoints (placeholder for Team 2)
  spaces: {
    getAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 300))
      
      return {
        spaces: [
          {
            id: 'cs-majors',
            name: 'Computer Science Majors',
            description: 'Connect with fellow CS students',
            memberCount: 234,
            isPublic: true
          },
          {
            id: 'study-groups',
            name: 'Study Groups',
            description: 'Find study partners and groups',
            memberCount: 156,
            isPublic: true
          }
        ]
      }
    },
    
    join: async (spaceId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { success: true }
    },
    
    leave: async (spaceId: string) => {
      await new Promise(resolve => setTimeout(resolve, 500))
      return { success: true }
    }
  },
  
  // Tools endpoints (placeholder for Team 3)
  tools: {
    getAll: async () => {
      await new Promise(resolve => setTimeout(resolve, 400))
      
      return {
        tools: [
          {
            id: 'study-planner',
            name: 'Study Planner',
            description: 'Plan your study sessions',
            createdBy: 'mock-user-id',
            usageCount: 45
          },
          {
            id: 'grade-calculator',
            name: 'Grade Calculator',
            description: 'Calculate your GPA',
            createdBy: 'another-user-id',
            usageCount: 123
          }
        ]
      }
    },
    
    create: async (toolData: any) => {
      await new Promise(resolve => setTimeout(resolve, 800))
      
      return {
        tool: {
          id: `tool-${Date.now()}`,
          ...toolData,
          createdBy: 'mock-user-id',
          createdAt: new Date().toISOString(),
          usageCount: 0
        }
      }
    }
  },
  
  // Analytics endpoints
  analytics: {
    track: async (event: any) => {
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('📊 Analytics Event:', event)
      }
      
      return { success: true }
    },
    
    getMetrics: async () => {
      await new Promise(resolve => setTimeout(resolve, 600))
      
      return {
        totalUsers: 1247,
        conversionRate: 68.5,
        onboardingDropOff: 23.2,
        activeBuilders: 89,
        flaggedContent: 12,
        lastUpdated: new Date().toISOString()
      }
    }
  },
  
  // Admin endpoints
  admin: {
    lookupUser: async (query: string) => {
      await new Promise(resolve => setTimeout(resolve, 400))
      
      // Mock user search results
      return {
        users: [
          {
            id: 'user-1',
            fullName: 'Jane Doe',
            handle: 'janedoe2024',
            email: 'jane.doe@buffalo.edu',
            isBuilder: true,
            createdAt: '2025-01-10T10:00:00Z'
          },
          {
            id: 'user-2',
            fullName: 'John Smith',
            handle: 'johnsmith',
            email: 'john.smith@buffalo.edu',
            isBuilder: false,
            createdAt: '2025-01-12T14:30:00Z'
          }
        ].filter(user => 
          user.fullName.toLowerCase().includes(query.toLowerCase()) ||
          user.handle.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        )
      }
    },
    
    approveBuilder: async (userId: string) => {
      await new Promise(resolve => setTimeout(resolve, 300))
      return { success: true }
    },
    
    getFlaggedContent: async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      
      return {
        flags: [
          {
            id: 'flag-1',
            contentType: 'post',
            contentId: 'post-123',
            reason: 'inappropriate',
            reportedBy: 'user-456',
            createdAt: '2025-01-14T16:20:00Z',
            status: 'pending'
          },
          {
            id: 'flag-2',
            contentType: 'tool',
            contentId: 'tool-789',
            reason: 'spam',
            reportedBy: 'user-789',
            createdAt: '2025-01-14T12:15:00Z',
            status: 'pending'
          }
        ]
      }
    }
  }
}

// Export individual modules for easier importing
export const authApi = mockApiClient.auth
export const schoolsApi = mockApiClient.schools
export const spacesApi = mockApiClient.spaces
export const toolsApi = mockApiClient.tools
export const analyticsApi = mockApiClient.analytics
export const adminApi = mockApiClient.admin 