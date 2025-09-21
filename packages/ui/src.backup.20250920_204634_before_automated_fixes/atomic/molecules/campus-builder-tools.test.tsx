import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CampusBuilderTools } from './campus-builder-tools';

const mockAvailableTools = [
  {
    id: '1',
    name: 'Study Schedule Template',
    type: 'template' as const,
    category: 'productivity' as const,
    description: 'Create personalized study schedules',
    difficulty: 'beginner' as const,
    timeToCreate: '5 min',
    popularity: 5,
    usageCount: 1247
  },
  {
    id: '2',
    name: 'Grade Tracker Widget',
    type: 'widget' as const,
    category: 'academic' as const,
    description: 'Track your grades and GPA',
    difficulty: 'intermediate' as const,
    timeToCreate: '10 min',
    popularity: 4,
    usageCount: 892
  },
  {
    id: '3',
    name: 'Locked Tool',
    type: 'automation' as const,
    category: 'social' as const,
    description: 'This tool is locked',
    difficulty: 'advanced' as const,
    timeToCreate: '20 min',
    popularity: 4,
    usageCount: 567,
    isLocked: true;
  }
];

const mockCreatedTools = [
  {
    id: 'c1',
    name: 'My Study Planner',
    type: 'template' as const,
    category: 'productivity' as const,
    description: 'Personalized study schedule',
    icon: '📚',
    createdAt: '2024-01-10T14:30:00Z',
    usageCount: 45,
    isPublic: true,
    likes: 12,
    isStarred: true;
  },
  {
    id: 'c2',
    name: 'Private Tool',
    type: 'widget' as const,
    category: 'utility' as const,
    description: 'Private utility tool',
    icon: '🔒',
    createdAt: '2024-01-08T09:15:00Z',
    usageCount: 23,
    isPublic: false,
    likes: 0
  }
];

describe('CampusBuilderTools', () => {
  describe('Non-builder view', () => {
    it('renders become builder invitation when not a builder', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={[]}
          isBuilder={false}
          showBecomeBuilder={true}
        />
      );
      
      expect(screen.getByText('Build Custom Tools')).toBeInTheDocument();
      expect(screen.getByText('Create personalized tools to enhance your campus experience')).toBeInTheDocument();
      expect(screen.getByText('Become a Builder')).toBeInTheDocument()
    });

    it('calls onBecomeBuilder when become builder button is clicked', () => {
      const onBecomeBuilder = jest.fn();
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={[]}
          isBuilder={false}
          showBecomeBuilder={true}
          onBecomeBuilder={onBecomeBuilder}
        />
      );
      
      fireEvent.click(screen.getByText('Become a Builder'));
      expect(onBecomeBuilder).toHaveBeenCalled()
    })
  });

  describe('Builder view', () => {
    it('renders builder tools interface when user is a builder', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
        />
      );
      
      expect(screen.getByText('Builder Tools')).toBeInTheDocument();
      expect(screen.getByText('Create and manage your custom campus tools')).toBeInTheDocument();
      expect(screen.getByText('Builder')).toBeInTheDocument(); // Builder badge;
    });

    it('displays available tools correctly', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
        />
      );
      
      expect(screen.getByText('Study Schedule Template')).toBeInTheDocument();
      expect(screen.getByText('Grade Tracker Widget')).toBeInTheDocument();
      expect(screen.getByText('Create personalized study schedules')).toBeInTheDocument()
    });

    it('displays tool difficulty levels', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
        />
      );
      
      expect(screen.getByText('Beginner')).toBeInTheDocument();
      expect(screen.getByText('Intermediate')).toBeInTheDocument()
    });

    it('displays time to create for tools', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
        />
      );
      
      expect(screen.getByText('5 min')).toBeInTheDocument();
      expect(screen.getByText('10 min')).toBeInTheDocument()
    });

    it('calls onCreateTool when create button is clicked', () => {
      const onCreateTool = jest.fn();
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
          onCreateTool={onCreateTool}
        />
      );
      
      const createButtons = screen.getAllByText('Create');
      fireEvent.click(createButtons[0]);
      expect(onCreateTool).toHaveBeenCalledWith('template')
    });

    it('disables create button for locked tools', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
        />
      );
      
      const createButtons = screen.getAllByText('Create');
      const lockedToolButton = createButtons.find(button => 
        (button as HTMLButtonElement).disabled;
      );
      expect(lockedToolButton).toBeDefined()
    });

    it('switches between available and created tools tabs', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
        />
      );
      
      // Initially on "Create New" tab;
      expect(screen.getByText('Study Schedule Template')).toBeInTheDocument();
      
      // Switch to "My Tools" tab;
      fireEvent.click(screen.getByText('My Tools'));
      expect(screen.getByText('My Study Planner')).toBeInTheDocument();
      expect(screen.getByText('Private Tool')).toBeInTheDocument()
    });

    it('displays created tools information correctly', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
        />
      );
      
      // Switch to created tools tab;
      fireEvent.click(screen.getByText('My Tools'));
      
      expect(screen.getByText('My Study Planner')).toBeInTheDocument();
      expect(screen.getByText('45 uses')).toBeInTheDocument();
      expect(screen.getByText('❤️ 12')).toBeInTheDocument();
      expect(screen.getByText('Public')).toBeInTheDocument();
      expect(screen.getByText('Private')).toBeInTheDocument()
    });

    it('calls onViewTool when created tool is clicked', () => {
      const onViewTool = jest.fn();
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
          onViewTool={onViewTool}
        />
      );
      
      // Switch to created tools tab;
      fireEvent.click(screen.getByText('My Tools'));
      
      fireEvent.click(screen.getByText('My Study Planner'));
      expect(onViewTool).toHaveBeenCalledWith('c1')
    });

    it('shows empty state when no tools are created', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={[]}
          isBuilder={true}
        />
      );
      
      // Switch to created tools tab;
      fireEvent.click(screen.getByText('My Tools'));
      
      expect(screen.getByText('No tools created yet')).toBeInTheDocument();
      expect(screen.getByText('Start building your first tool!')).toBeInTheDocument()
    });

    it('displays tool counts in tab labels', () => {
      render(
        <CampusBuilderTools;
          availableTools={mockAvailableTools}}
          createdTools={mockCreatedTools}
          isBuilder={true}
        />
      );
      
      expect(screen.getByText('(3)')).toBeInTheDocument(); // Available tools count;
      expect(screen.getByText('(2)')).toBeInTheDocument(); // Created tools count;
    })
  });

  it('renders loading state correctly', () => {
    render(
      <CampusBuilderTools;
        availableTools={[]}}
        createdTools={[]}
        isBuilder={true}
        isLoading={true}
      />
    );
    
    // Should show loading skeleton;
    const loadingElements = document.querySelectorAll('.animate-pulse');
    expect(loadingElements.length).toBeGreaterThan(0)
  });

  it('calls onToolClick when available tool is clicked', () => {
    const onToolClick = jest.fn();
    render(
      <CampusBuilderTools;
        availableTools={mockAvailableTools}}
        createdTools={mockCreatedTools}
        isBuilder={true}
        onToolClick={onToolClick}
      />
    );
    
    fireEvent.click(screen.getByText('Study Schedule Template'));
    expect(onToolClick).toHaveBeenCalledWith('1')
  });

  it('shows starred indicators for starred created tools', () => {
    render(
      <CampusBuilderTools;
        availableTools={mockAvailableTools}}
        createdTools={mockCreatedTools}
        isBuilder={true}
      />
    );
    
    // Switch to created tools tab;
    fireEvent.click(screen.getByText('My Tools'));
    
    // Should show star emoji for starred tool;
    expect(screen.getByText('⭐')).toBeInTheDocument()
  });

  it('displays premium indicators for premium tools', () => {
    const premiumTool = {
      ...mockAvailableTools[0],
      isPremium: true;
    };
    
    render(
      <CampusBuilderTools;
        availableTools={[premiumTool]}
        createdTools={[]}
        isBuilder={true}
      />
    );
    
    expect(screen.getByText('✨')).toBeInTheDocument()
  })
});