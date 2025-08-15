import type { Meta, StoryObj } from '@storybook/react';
import { HiveTable } from '../../components/hive-table';

const meta: Meta<typeof HiveTable> = {
  title: '04-Hive/HiveTable',
  component: HiveTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'HIVE Table component for displaying structured campus data including courses, grades, and student information.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    hoverable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Course schedule table
export const CourseSchedule: Story = {
  args: {
    headers: ['Course', 'Time', 'Location', 'Professor', 'Credits'],
    data: [
      ['CS 101 - Intro to Programming', 'MWF 9:00-10:00 AM', 'Tech Building 101', 'Dr. Smith', '3'],
      ['MATH 201 - Calculus II', 'TTh 11:00-12:30 PM', 'Math Building 205', 'Prof. Johnson', '4'],
      ['ENG 102 - Composition', 'MWF 2:00-3:00 PM', 'Liberal Arts 150', 'Dr. Davis', '3'],
      ['PHYS 151 - Physics I', 'TTh 1:00-2:30 PM', 'Science Hall 301', 'Prof. Wilson', '4'],
      ['HIST 100 - World History', 'MWF 10:00-11:00 AM', 'Humanities 200', 'Dr. Brown', '3'],
    ],
  },
};

// Grade report table
export const GradeReport: Story = {
  args: {
    variant: 'striped',
    headers: ['Course', 'Assignment', 'Score', 'Grade', 'Weight'],
    data: [
      ['CS 101', 'Midterm Exam', '92/100', 'A-', '25%'],
      ['CS 101', 'Project 1', '88/100', 'B+', '20%'],
      ['CS 101', 'Quiz 1', '95/100', 'A', '10%'],
      ['MATH 201', 'Homework 3', '87/100', 'B+', '15%'],
      ['MATH 201', 'Test 2', '91/100', 'A-', '30%'],
      ['ENG 102', 'Essay 1', '89/100', 'B+', '40%'],
    ],
    hoverable: true,
  },
};

// Student directory table
export const StudentDirectory: Story = {
  args: {
    variant: 'bordered',
    size: 'sm',
    headers: ['Name', 'Major', 'Year', 'Email', 'Status'],
    data: [
      ['Alex Chen', 'Computer Science', 'Junior', 'alex.chen@university.edu', '🟢 Active'],
      ['Maria Garcia', 'Biology', 'Senior', 'maria.garcia@university.edu', '🟢 Active'],
      ['Jordan Taylor', 'Engineering', 'Sophomore', 'jordan.taylor@university.edu', '🟡 On Leave'],
      ['Sam Kim', 'Psychology', 'Freshman', 'sam.kim@university.edu', '🟢 Active'],
      ['Casey Johnson', 'Art History', 'Graduate', 'casey.johnson@university.edu', '🟢 Active'],
    ],
  },
};

// Campus events table
export const CampusEvents: Story = {
  args: {
    headers: ['Event', 'Date', 'Time', 'Location', 'RSVP'],
    data: [
      ['Study Group - CS 101', 'Today', '7:00 PM', 'Library Room 204', '12/15'],
      ['Career Fair', 'March 15', '10:00 AM - 4:00 PM', 'Student Union', '284/300'],
      ['Pizza Social', 'March 18', '6:00 PM', 'Dorm Common Room', '8/20'],
      ['Guest Lecture', 'March 22', '2:00 PM', 'Auditorium', '45/100'],
      ['Club Meeting', 'March 25', '5:30 PM', 'Engineering Hall 102', '7/25'],
    ],
    hoverable: true,
  },
};

// Academic calendar table
export const AcademicCalendar: Story = {
  args: {
    variant: 'striped',
    size: 'lg',
    headers: ['Date', 'Event', 'Type', 'Description'],
    data: [
      ['March 11-15', 'Spring Break', 'Holiday', 'No classes scheduled'],
      ['March 20', 'Registration Opens', 'Academic', 'Fall 2024 course registration begins'],
      ['April 15', 'Midterm Grades Due', 'Academic', 'Faculty deadline for midterm submissions'],
      ['May 1', 'Last Day to Withdraw', 'Academic', 'Final deadline for course withdrawal'],
      ['May 15-22', 'Final Exams', 'Academic', 'Final examination period'],
      ['May 25', 'Commencement', 'Ceremony', 'Graduation ceremony'],
    ],
  },
};

// Different sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Small Table</h3>
        <HiveTable
          size="sm"
          headers={['Course', 'Time', 'Room']}
          data={[
            ['CS 101', '9:00 AM', 'Tech 101'],
            ['MATH 201', '11:00 AM', 'Math 205'],
          ]}
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Medium Table (Default)</h3>
        <HiveTable
          size="md"
          headers={['Course', 'Time', 'Room']}
          data={[
            ['CS 101', '9:00 AM', 'Tech 101'],
            ['MATH 201', '11:00 AM', 'Math 205'],
          ]}
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Large Table</h3>
        <HiveTable
          size="lg"
          headers={['Course', 'Time', 'Room']}
          data={[
            ['CS 101', '9:00 AM', 'Tech 101'],
            ['MATH 201', '11:00 AM', 'Math 205'],
          ]}
        />
      </div>
    </div>
  ),
};

// Different variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Default Variant</h3>
        <HiveTable
          variant="default"
          headers={['Student', 'GPA', 'Status']}
          data={[
            ['Alex Chen', '3.8', 'Good Standing'],
            ['Maria Garcia', '3.6', 'Good Standing'],
            ['Jordan Taylor', '2.9', 'Academic Warning'],
          ]}
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Striped Variant</h3>
        <HiveTable
          variant="striped"
          headers={['Student', 'GPA', 'Status']}
          data={[
            ['Alex Chen', '3.8', 'Good Standing'],
            ['Maria Garcia', '3.6', 'Good Standing'],
            ['Jordan Taylor', '2.9', 'Academic Warning'],
          ]}
        />
      </div>
      
      <div>
        <h3 className="font-semibold mb-4">Bordered Variant</h3>
        <HiveTable
          variant="bordered"
          headers={['Student', 'GPA', 'Status']}
          data={[
            ['Alex Chen', '3.8', 'Good Standing'],
            ['Maria Garcia', '3.6', 'Good Standing'],
            ['Jordan Taylor', '2.9', 'Academic Warning'],
          ]}
        />
      </div>
    </div>
  ),
};

// Interactive features
export const Interactive: Story = {
  args: {
    variant: 'default',
    hoverable: true,
    headers: ['Course', 'Instructor', 'Enrollment', 'Action'],
    data: [
      ['CS 101', 'Dr. Smith', '25/30', '📝 Enroll'],
      ['CS 201', 'Prof. Johnson', '30/30', '⏳ Waitlist'],
      ['CS 301', 'Dr. Davis', '18/25', '📝 Enroll'],
      ['CS 401', 'Prof. Wilson', '22/20', '❌ Full'],
    ],
  },
};

// Campus analytics table
export const CampusAnalytics: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4 text-hive-neutral-800">
          📊 Campus Activity Summary
        </h3>
        <HiveTable
          variant="striped"
          hoverable
          headers={['Metric', 'This Week', 'Last Week', 'Change']}
          data={[
            ['Active Users', '2,847', '2,631', '🟢 +8.2%'],
            ['Study Groups Created', '127', '98', '🟢 +29.6%'],
            ['Tool Deployments', '45', '52', '🔴 -13.5%'],
            ['Event RSVPs', '834', '721', '🟢 +15.7%'],
            ['Library Check-ins', '1,205', '1,089', '🟢 +10.7%'],
          ]}
        />
      </div>
    </div>
  ),
};