/**
 * HIVE Test Data Fixtures
 * Provides consistent test data for e2e testing
 */

export const testUsers = {
  student: {
    email: 'test.student@buffalo.edu',
    handle: 'teststudent',
    firstName: 'Test',
    lastName: 'Student',
    major: 'Computer Science',
    year: 'Junior',
    interests: ['AI/ML', 'Web Development', 'Entrepreneurship']
  },
  faculty: {
    email: 'test.faculty@buffalo.edu',
    handle: 'testfaculty',
    firstName: 'Test',
    lastName: 'Faculty',
    department: 'Computer Science',
    title: 'Associate Professor'
  },
  alumni: {
    email: 'test.alumni@buffalo.edu',
    handle: 'testalumni',
    firstName: 'Test',
    lastName: 'Alumni',
    graduationYear: '2020',
    major: 'Business Administration'
  }
};

export const testSpaces = {
  academic: {
    name: 'CS Study Group',
    description: 'Collaborative space for computer science students',
    category: 'Academic',
    tags: ['study', 'CS', 'collaboration'],
    isPublic: true
  },
  social: {
    name: 'Campus Events',
    description: 'Stay updated with campus events and activities',
    category: 'Social',
    tags: ['events', 'social', 'campus'],
    isPublic: true
  },
  residential: {
    name: 'Ellicott Complex',
    description: 'Community space for Ellicott residents',
    category: 'Residential',
    tags: ['dorm', 'community', 'residential'],
    isPublic: false
  }
};

export const testPosts = {
  announcement: {
    title: 'Midterm Study Session',
    content: 'Join us for a collaborative study session this Friday!',
    type: 'announcement'
  },
  discussion: {
    title: 'Best study spots on campus?',
    content: 'Looking for quiet places to study. Any recommendations?',
    type: 'discussion'
  },
  resource: {
    title: 'Calculus II Study Guide',
    content: 'Comprehensive study guide for upcoming exam',
    type: 'resource',
    attachmentUrl: '/test-resources/calc-guide.pdf'
  }
};

export const testTools = {
  studyTimer: {
    name: 'Pomodoro Study Timer',
    description: 'Stay focused with timed study sessions',
    category: 'Productivity',
    config: {
      studyDuration: 25,
      breakDuration: 5,
      longBreakDuration: 15
    }
  },
  gradeCalculator: {
    name: 'GPA Calculator',
    description: 'Calculate your semester and cumulative GPA',
    category: 'Academic',
    config: {
      gradeScale: '4.0',
      includeCredits: true
    }
  }
};

export const testEvents = {
  studySession: {
    title: 'Data Structures Review',
    description: 'Weekly review session for CSE 250',
    date: new Date(Date.now() + 86400000), // Tomorrow
    duration: 90,
    location: 'Davis Hall 101',
    maxAttendees: 20
  },
  social: {
    title: 'Game Night',
    description: 'Board games and pizza in the lounge',
    date: new Date(Date.now() + 172800000), // 2 days from now
    duration: 120,
    location: 'Student Union',
    maxAttendees: 50
  }
};