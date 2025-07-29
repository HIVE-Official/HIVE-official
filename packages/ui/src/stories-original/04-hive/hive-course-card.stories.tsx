import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiveCourseCard, Course, CourseInstructor, CourseSchedule, CourseMetadata } from '../../components';

const meta: Meta<typeof HiveCourseCard> = {
  title: '04-HIVE/Course Card',
  component: HiveCourseCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Campus-focused course card built on the unified card system. Designed for academic program display, course enrollment, and educational resource management.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['open', 'waitlist', 'closed', 'enrolled', 'completed'],
    },
    difficulty: {
      control: 'select',
      options: ['beginner', 'intermediate', 'advanced', 'expert'],
    },
    courseType: {
      control: 'select',
      options: ['lecture', 'seminar', 'lab', 'project', 'independent'],
    },
    showFullDetails: {
      control: 'boolean',
    },
    showPrerequisites: {
      control: 'boolean',
    },
    showInstructor: {
      control: 'boolean',
    },
    showSchedule: {
      control: 'boolean',
    },
    showEnrollment: {
      control: 'boolean',
    },
    showRating: {
      control: 'boolean',
    },
    showActions: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample instructors
const sampleInstructors: CourseInstructor[] = [
  {
    id: 'prof-smith',
    name: 'Dr. Sarah Smith',
    title: 'Professor of Computer Science',
    email: 'sarah.smith@university.edu',
    rating: 4.8,
    departmentId: 'cs-dept',
  },
  {
    id: 'prof-johnson',
    name: 'Prof. Michael Johnson',
    title: 'Assistant Professor of Mathematics',
    email: 'michael.johnson@university.edu',
    rating: 4.2,
    departmentId: 'math-dept',
  },
  {
    id: 'prof-davis',
    name: 'Dr. Emma Davis',
    title: 'Associate Professor of Physics',
    email: 'emma.davis@university.edu',
    rating: 4.9,
    departmentId: 'physics-dept',
  },
  {
    id: 'prof-wilson',
    name: 'Prof. James Wilson',
    title: 'Senior Lecturer in Business',
    email: 'james.wilson@university.edu',
    rating: 4.5,
    departmentId: 'business-dept',
  },
];

// Sample courses
const sampleCourses: Course[] = [
  {
    id: 'cs-101',
    code: 'CS 101',
    title: 'Introduction to Computer Science',
    description: 'Fundamental concepts of programming, problem-solving, and computational thinking. Students will learn basic programming constructs and develop algorithmic thinking skills.',
    status: 'open',
    difficulty: 'beginner',
    courseType: 'lecture',
    instructor: sampleInstructors[0],
    schedule: {
      days: ['Mon', 'Wed', 'Fri'],
      startTime: '10:00 AM',
      endTime: '11:00 AM',
      location: 'Science Building 101',
      building: 'Science Building',
      room: '101',
    },
    prerequisites: [],
    metadata: {
      credits: 3,
      department: 'Computer Science',
      school: 'School of Engineering',
      semester: 'Fall',
      year: 2024,
      capacity: 30,
      enrolled: 25,
      rating: 4.6,
      reviews: 89,
      lastUpdated: new Date(),
    },
    tags: ['Programming', 'Logic', 'Problem Solving'],
    spaceId: 'cs-lounge',
    collaborationLevel: 'pair',
  },
  {
    id: 'cs-201',
    code: 'CS 201',
    title: 'Data Structures and Algorithms',
    description: 'Advanced study of data structures, algorithm design, and analysis. Topics include trees, graphs, sorting, searching, and complexity analysis.',
    status: 'waitlist',
    difficulty: 'intermediate',
    courseType: 'lecture',
    instructor: sampleInstructors[0],
    schedule: {
      days: ['Tue', 'Thu'],
      startTime: '2:00 PM',
      endTime: '3:30 PM',
      location: 'Engineering Hall 205',
      building: 'Engineering Hall',
      room: '205',
    },
    prerequisites: [
      {
        id: 'cs-101',
        code: 'CS 101',
        title: 'Introduction to Computer Science',
        required: true,
      },
      {
        id: 'math-151',
        code: 'MATH 151',
        title: 'Calculus I',
        required: true,
      },
    ],
    metadata: {
      credits: 4,
      department: 'Computer Science',
      school: 'School of Engineering',
      semester: 'Fall',
      year: 2024,
      capacity: 25,
      enrolled: 25,
      waitlist: 8,
      rating: 4.3,
      reviews: 67,
      lastUpdated: new Date(),
    },
    tags: ['Data Structures', 'Algorithms', 'Complexity Analysis'],
    spaceId: 'cs-lounge',
    collaborationLevel: 'individual',
  },
  {
    id: 'cs-401',
    code: 'CS 401',
    title: 'Advanced Machine Learning',
    description: 'Deep dive into machine learning algorithms, neural networks, and artificial intelligence. Students will work on real-world projects and research.',
    status: 'enrolled',
    difficulty: 'advanced',
    courseType: 'project',
    instructor: sampleInstructors[0],
    schedule: {
      days: ['Mon', 'Wed'],
      startTime: '1:00 PM',
      endTime: '2:30 PM',
      location: 'AI Lab 312',
      building: 'Research Center',
      room: '312',
    },
    prerequisites: [
      {
        id: 'cs-201',
        code: 'CS 201',
        title: 'Data Structures and Algorithms',
        required: true,
      },
      {
        id: 'cs-301',
        code: 'CS 301',
        title: 'Statistics for Computer Science',
        required: true,
      },
      {
        id: 'math-201',
        code: 'MATH 201',
        title: 'Linear Algebra',
        required: false,
      },
    ],
    metadata: {
      credits: 4,
      department: 'Computer Science',
      school: 'School of Engineering',
      semester: 'Fall',
      year: 2024,
      capacity: 15,
      enrolled: 12,
      rating: 4.9,
      reviews: 23,
      lastUpdated: new Date(),
    },
    tags: ['Machine Learning', 'AI', 'Neural Networks', 'Research'],
    spaceId: 'ai-lab',
    projectBased: true,
    collaborationLevel: 'team',
  },
  {
    id: 'math-101',
    code: 'MATH 101',
    title: 'College Algebra',
    description: 'Fundamental algebraic concepts including functions, graphs, and equations. Essential preparation for calculus and higher mathematics.',
    status: 'closed',
    difficulty: 'beginner',
    courseType: 'lecture',
    instructor: sampleInstructors[1],
    schedule: {
      days: ['Mon', 'Wed', 'Fri'],
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      location: 'Math Building 150',
      building: 'Math Building',
      room: '150',
    },
    prerequisites: [],
    metadata: {
      credits: 3,
      department: 'Mathematics',
      school: 'School of Arts and Sciences',
      semester: 'Fall',
      year: 2024,
      capacity: 40,
      enrolled: 40,
      rating: 4.1,
      reviews: 156,
      lastUpdated: new Date(),
    },
    tags: ['Algebra', 'Functions', 'Graphs'],
    collaborationLevel: 'individual',
  },
  {
    id: 'phys-301',
    code: 'PHYS 301',
    title: 'Quantum Mechanics',
    description: 'Introduction to quantum mechanics including wave functions, operators, and quantum systems. Laboratory component included.',
    status: 'completed',
    difficulty: 'expert',
    courseType: 'lab',
    instructor: sampleInstructors[2],
    schedule: {
      days: ['Tue', 'Thu'],
      startTime: '11:00 AM',
      endTime: '12:30 PM',
      location: 'Physics Lab 401',
      building: 'Physics Building',
      room: '401',
    },
    prerequisites: [
      {
        id: 'phys-201',
        code: 'PHYS 201',
        title: 'Classical Mechanics',
        required: true,
      },
      {
        id: 'math-301',
        code: 'MATH 301',
        title: 'Differential Equations',
        required: true,
      },
    ],
    metadata: {
      credits: 4,
      department: 'Physics',
      school: 'School of Arts and Sciences',
      semester: 'Spring',
      year: 2024,
      capacity: 20,
      enrolled: 18,
      rating: 4.7,
      reviews: 34,
      lastUpdated: new Date(),
    },
    tags: ['Quantum Mechanics', 'Laboratory', 'Advanced Physics'],
    spaceId: 'physics-lab',
    collaborationLevel: 'pair',
  },
  {
    id: 'bus-201',
    code: 'BUS 201',
    title: 'Entrepreneurship Workshop',
    description: 'Hands-on workshop for developing business ideas, creating business plans, and launching startups. Students will pitch their ideas to real investors.',
    status: 'open',
    difficulty: 'intermediate',
    courseType: 'seminar',
    instructor: sampleInstructors[3],
    schedule: {
      days: ['Wed'],
      startTime: '6:00 PM',
      endTime: '9:00 PM',
      location: 'Innovation Hub',
      building: 'Student Center',
      room: 'Innovation Hub',
    },
    prerequisites: [
      {
        id: 'bus-101',
        code: 'BUS 101',
        title: 'Introduction to Business',
        required: false,
      },
    ],
    metadata: {
      credits: 2,
      department: 'Business',
      school: 'School of Business',
      semester: 'Fall',
      year: 2024,
      capacity: 12,
      enrolled: 8,
      rating: 4.8,
      reviews: 45,
      lastUpdated: new Date(),
    },
    tags: ['Entrepreneurship', 'Startup', 'Business Plan', 'Innovation'],
    spaceId: 'innovation-hub',
    projectBased: true,
    collaborationLevel: 'team',
  },
];

// Basic Course Card
export const Default: Story = {
  render: () => {
    const [favorited, setFavorited] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    
    return (
      <div className="w-96 p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <HiveCourseCard
          course={sampleCourses[0]}
          isFavorited={favorited}
          isBookmarked={bookmarked}
          onFavorite={() => setFavorited(!favorited)}
          onBookmark={() => setBookmarked(!bookmarked)}
          onEnroll={(id) => console.log('Enroll in:', id)}
          onViewDetails={(id) => console.log('View details:', id)}
        />
      </div>
    );
  },
};

// Course Status Variations
export const StatusVariations: Story = {
  render: () => {
    const statusCourses = sampleCourses.slice(0, 5);
    
    return (
      <div className="max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-6">Course Status Variations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statusCourses.map((course) => (
            <HiveCourseCard
              key={course.id}
              course={course}
              onEnroll={(id) => console.log('Enroll in:', id)}
              onDrop={(id) => console.log('Drop:', id)}
              onWaitlist={(id) => console.log('Join waitlist:', id)}
              onViewDetails={(id) => console.log('View details:', id)}
              isEnrolled={course.status === 'enrolled'}
            />
          ))}
        </div>
      </div>
    );
  },
};

// Difficulty Levels
export const DifficultyLevels: Story = {
  render: () => {
    const difficultyCourses = [
      { ...sampleCourses[0], difficulty: 'beginner' as const },
      { ...sampleCourses[1], difficulty: 'intermediate' as const },
      { ...sampleCourses[2], difficulty: 'advanced' as const },
      { ...sampleCourses[4], difficulty: 'expert' as const },
    ];
    
    return (
      <div className="max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-6">Difficulty Levels</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {difficultyCourses.map((course) => (
            <HiveCourseCard
              key={course.id}
              course={course}
              onEnroll={(id) => console.log('Enroll in:', id)}
              onViewDetails={(id) => console.log('View details:', id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// Course Types
export const CourseTypes: Story = {
  render: () => {
    const typeCourses = [
      { ...sampleCourses[0], courseType: 'lecture' as const },
      { ...sampleCourses[5], courseType: 'seminar' as const },
      { ...sampleCourses[4], courseType: 'lab' as const },
      { ...sampleCourses[2], courseType: 'project' as const },
    ];
    
    return (
      <div className="max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-6">Course Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {typeCourses.map((course) => (
            <HiveCourseCard
              key={course.id}
              course={course}
              onEnroll={(id) => console.log('Enroll in:', id)}
              onViewDetails={(id) => console.log('View details:', id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// Enrollment Dashboard
export const EnrollmentDashboard: Story = {
  render: () => {
    const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['cs-401']);
    const [favoritedCourses, setFavoritedCourses] = useState<string[]>(['cs-201', 'phys-301']);
    const [bookmarkedCourses, setBookmarkedCourses] = useState<string[]>(['bus-201']);
    
    const handleEnroll = (courseId: string) => {
      setEnrolledCourses([...enrolledCourses, courseId]);
    };
    
    const handleDrop = (courseId: string) => {
      setEnrolledCourses(enrolledCourses.filter(id => id !== courseId));
    };
    
    const handleFavorite = (courseId: string) => {
      setFavoritedCourses(
        favoritedCourses.includes(courseId)
          ? favoritedCourses.filter(id => id !== courseId)
          : [...favoritedCourses, courseId]
      );
    };
    
    const handleBookmark = (courseId: string) => {
      setBookmarkedCourses(
        bookmarkedCourses.includes(courseId)
          ? bookmarkedCourses.filter(id => id !== courseId)
          : [...bookmarkedCourses, courseId]
      );
    };
    
    return (
      <div className="max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-2">Course Enrollment Dashboard</h2>
          <p className="text-gray-400">Manage your course selections and track enrollment</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCourses.map((course) => (
            <HiveCourseCard
              key={course.id}
              course={course}
              isEnrolled={enrolledCourses.includes(course.id)}
              isFavorited={favoritedCourses.includes(course.id)}
              isBookmarked={bookmarkedCourses.includes(course.id)}
              onEnroll={handleEnroll}
              onDrop={handleDrop}
              onWaitlist={(id) => console.log('Join waitlist:', id)}
              onFavorite={handleFavorite}
              onBookmark={handleBookmark}
              onShare={(id) => console.log('Share:', id)}
              onViewDetails={(id) => console.log('View details:', id)}
              onContactInstructor={(id) => console.log('Contact instructor:', id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// Compact Display
export const CompactDisplay: Story = {
  render: () => {
    return (
      <div className="max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-6">Compact Course Display</h3>
        <div className="space-y-4">
          {sampleCourses.slice(0, 3).map((course) => (
            <HiveCourseCard
              key={course.id}
              course={course}
              size="sm"
              showPrerequisites={false}
              showFullDetails={false}
              onEnroll={(id) => console.log('Enroll in:', id)}
              onViewDetails={(id) => console.log('View details:', id)}
            />
          ))}
        </div>
      </div>
    );
  },
};

// Detailed View
export const DetailedView: Story = {
  render: () => {
    return (
      <div className="max-w-2xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-6">Detailed Course View</h3>
        <HiveCourseCard
          course={sampleCourses[2]}
          size="lg"
          showFullDetails={true}
          showPrerequisites={true}
          showInstructor={true}
          showSchedule={true}
          showEnrollment={true}
          showRating={true}
          showActions={true}
          isEnrolled={true}
          onDrop={(id) => console.log('Drop:', id)}
          onViewDetails={(id) => console.log('View details:', id)}
          onViewPrerequisite={(id) => console.log('View prerequisite:', id)}
          onContactInstructor={(id) => console.log('Contact instructor:', id)}
        />
      </div>
    );
  },
};

// Interactive Features
export const InteractiveFeatures: Story = {
  render: () => {
    const [interactions, setInteractions] = useState<string[]>([]);
    
    const addInteraction = (action: string, id: string) => {
      setInteractions([...interactions, `${action}: ${id}`]);
    };
    
    return (
      <div className="max-w-4xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-6">Interactive Features</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <HiveCourseCard
            course={sampleCourses[0]}
            onEnroll={(id) => addInteraction('Enroll', id)}
            onViewDetails={(id) => addInteraction('View Details', id)}
            onFavorite={(id) => addInteraction('Favorite', id)}
            onBookmark={(id) => addInteraction('Bookmark', id)}
            onShare={(id) => addInteraction('Share', id)}
            onContactInstructor={(id) => addInteraction('Contact Instructor', id)}
          />
          
          <HiveCourseCard
            course={sampleCourses[1]}
            onWaitlist={(id) => addInteraction('Join Waitlist', id)}
            onViewDetails={(id) => addInteraction('View Details', id)}
            onViewPrerequisite={(id) => addInteraction('View Prerequisite', id)}
            onFavorite={(id) => addInteraction('Favorite', id)}
            onBookmark={(id) => addInteraction('Bookmark', id)}
            onShare={(id) => addInteraction('Share', id)}
          />
        </div>
        
        <div className="bg-[var(--hive-background-primary)]/20 rounded-lg p-4 border border-white/10">
          <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">Interaction Log</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {interactions.length === 0 ? (
              <p className="text-xs text-gray-400">No interactions yet</p>
            ) : (
              interactions.map((interaction, index) => (
                <div key={index} className="text-xs text-gray-300">
                  {interaction}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
};

// States and Edge Cases
export const StatesAndEdgeCases: Story = {
  render: () => {
    const edgeCases = [
      {
        ...sampleCourses[0],
        title: 'Course with Very Long Title That Should Truncate Properly',
        description: 'This is a very long description that should demonstrate how the card handles extensive content. It includes multiple sentences and detailed information about the course content, objectives, and requirements. The card should handle this gracefully with proper truncation and spacing.',
        prerequisites: [],
        tags: ['Very Long Tag Name', 'Another Long Tag', 'Short'],
      },
      {
        ...sampleCourses[1],
        metadata: {
          ...sampleCourses[1].metadata,
          enrolled: 0,
          capacity: 50,
        },
        prerequisites: [],
      },
      {
        ...sampleCourses[2],
        instructor: {
          ...sampleCourses[2].instructor,
          rating: undefined,
        },
        metadata: {
          ...sampleCourses[2].metadata,
          rating: undefined,
          reviews: 0,
        },
        prerequisites: [],
      },
    ];
    
    return (
      <div className="max-w-6xl p-6 bg-[var(--hive-background-primary)] rounded-lg">
        <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-6">States & Edge Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {edgeCases.map((course, index) => (
            <HiveCourseCard
              key={index}
              course={course}
              onEnroll={(id) => console.log('Enroll in:', id)}
              onViewDetails={(id) => console.log('View details:', id)}
            />
          ))}
        </div>
      </div>
    );
  },
};