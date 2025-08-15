import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from '../../atomic/molecules/search-bar';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  User,
  MapPin,
  Star,
  Filter,
  TrendingUp
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof SearchBar> = {
  title: '02-Molecules/Search Bar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE search bar molecule component for enabling search functionality with loading states, clear action, and customizable appearance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    value: {
      control: 'text',
      description: 'Controlled value of the search input',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when there is text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Search bar size',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'filled'],
      description: 'Visual variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic examples
export const Default: Story = {
  args: {
    placeholder: 'Search...',
    clearable: true,
    loading: false,
    size: 'md',
    variant: 'default',
  },
};

export const Loading: Story = {
  args: {
    placeholder: 'Searching...',
    value: 'computer science',
    loading: true,
    clearable: true,
    size: 'md',
    variant: 'default',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search campus...',
    value: 'study group',
    clearable: true,
    loading: false,
    size: 'md',
    variant: 'default',
  },
};

export const NotClearable: Story = {
  args: {
    placeholder: 'Search...',
    value: 'example query',
    clearable: false,
    loading: false,
    size: 'md',
    variant: 'default',
  },
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-lg">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-3">Small Size</h4>
        <SearchBar
          size="sm"
          placeholder="Search spaces..."
          value="cs study"
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-3">Medium Size (Default)</h4>
        <SearchBar
          size="md"
          placeholder="Search tools and spaces..."
          value="gpa calculator"
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-3">Large Size</h4>
        <SearchBar
          size="lg"
          placeholder="Search the entire campus community..."
          value="engineering study group"
        />
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 p-6 max-w-lg">
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-3">Default Variant</h4>
        <SearchBar
          variant="default"
          placeholder="Search students and spaces..."
          value="marcus johnson"
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-3">Ghost Variant</h4>
        <SearchBar
          variant="ghost"
          placeholder="Search quietly..."
          value="study sessions"
        />
      </div>
      
      <div>
        <h4 className="font-semibold text-hive-text-primary mb-3">Filled Variant</h4>
        <SearchBar
          variant="filled"
          placeholder="Search campus tools..."
          value="schedule planner"
        />
      </div>
    </div>
  ),
};

// Campus search scenarios
export const CampusSearchScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-6xl">
      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Global Campus Search</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-hive-text-primary">Find anything on campus</h4>
            <button className="flex items-center space-x-2 text-hive-text-secondary hover:text-hive-text-primary transition-colors">
              <Filter className="h-4 w-4" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
          
          <SearchBar
            placeholder="Search students, spaces, tools, events..."
            size="lg"
            variant="filled"
            onSearch={(query) => alert(`Search for: ${query}`)}
            onChange={(value) => console.log('Search changed:', value)}
          />
          
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              'Study Groups',
              'CS Tools',
              'Engineering Spaces',
              'Academic Events',
              'Student Leaders',
              'Campus Resources'
            ].map((suggestion) => (
              <button
                key={suggestion}
                className="px-3 py-1 text-sm bg-hive-background-tertiary text-hive-text-secondary rounded-full hover:bg-hive-interactive-hover hover:text-hive-text-primary transition-colors"
                onClick={() => alert(`Suggested search: ${suggestion}`)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Contextual Search Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-hive-gold/20 rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-hive-gold" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Find Study Spaces</h4>
                <p className="text-sm text-hive-text-secondary">Discover study groups and academic communities</p>
              </div>
            </div>
            
            <SearchBar
              placeholder="Search study spaces by subject, course, or keyword..."
              size="md"
              variant="default"
              onSearch={(query) => alert(`Searching spaces: ${query}`)}
            />
            
            <div className="mt-3 flex flex-wrap gap-2">
              {['CS 101', 'Physics Study', 'Math Tutoring', 'Engineering'].map((tag) => (
                <span key={tag} className="px-2 py-1 text-xs bg-hive-gold/10 text-hive-gold rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-hive-emerald/20 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-hive-emerald" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Browse Campus Tools</h4>
                <p className="text-sm text-hive-text-secondary">Find tools created by students for students</p>
              </div>
            </div>
            
            <SearchBar
              placeholder="Search tools by name, category, or function..."
              size="md"
              variant="default"
              onSearch={(query) => alert(`Searching tools: ${query}`)}
            />
            
            <div className="mt-3 flex flex-wrap gap-2">
              {['GPA Calculator', 'Schedule Planner', 'Group Finder', 'Campus Map'].map((tool) => (
                <span key={tool} className="px-2 py-1 text-xs bg-hive-emerald/10 text-hive-emerald rounded">
                  {tool}
                </span>
              ))}
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-hive-sapphire/20 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-hive-sapphire" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Connect with Students</h4>
                <p className="text-sm text-hive-text-secondary">Find classmates and build your network</p>
              </div>
            </div>
            
            <SearchBar
              placeholder="Search by name, major, or interests..."
              size="md"
              variant="default"
              onSearch={(query) => alert(`Searching students: ${query}`)}
            />
            
            <div className="mt-3 flex flex-wrap gap-2">
              {['Computer Science', 'Class of 2025', 'Study Partners', 'Research'].map((filter) => (
                <span key={filter} className="px-2 py-1 text-xs bg-hive-sapphire/10 text-hive-sapphire rounded">
                  {filter}
                </span>
              ))}
            </div>
          </div>
          
          <div className="border border-hive-border-subtle rounded-lg p-4 bg-hive-background-secondary">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-hive-text-primary">Discover Events</h4>
                <p className="text-sm text-hive-text-secondary">Find campus events and activities</p>
              </div>
            </div>
            
            <SearchBar
              placeholder="Search events by type, date, or organizer..."
              size="md"
              variant="default"
              onSearch={(query) => alert(`Searching events: ${query}`)}
            />
            
            <div className="mt-3 flex flex-wrap gap-2">
              {['Study Sessions', 'Social Events', 'Workshops', 'Club Meetings'].map((event) => (
                <span key={event} className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded">
                  {event}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-hive-text-primary mb-6">Search with Results Preview</h3>
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <SearchBar
            placeholder="Search for students, spaces, or tools..."
            size="lg"
            variant="default"
            value="computer science"
            onSearch={(query) => alert(`Full search for: ${query}`)}
          />
          
          <div className="mt-6 space-y-4">
            <div className="text-sm text-hive-text-secondary mb-3">
              Showing results for "computer science"
            </div>
            
            <div className="space-y-3">
              {[
                {
                  type: 'Space',
                  title: 'CS 101 Study Group',
                  description: 'Weekly study sessions for Computer Science fundamentals',
                  members: '24 members',
                  icon: Users,
                  color: 'text-hive-gold'
                },
                {
                  type: 'Tool',
                  title: 'Code Snippet Manager',
                  description: 'Organize and share your programming code snippets',
                  users: '1.2k users',
                  icon: BookOpen,
                  color: 'text-hive-emerald'
                },
                {
                  type: 'Student',
                  title: 'Sarah Chen',
                  description: 'Computer Science Senior • Tool Builder',
                  info: 'Available for tutoring',
                  icon: User,
                  color: 'text-hive-sapphire'
                }
              ].map((result, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 bg-hive-background-tertiary rounded-lg hover:bg-hive-interactive-hover transition-colors cursor-pointer">
                  <div className={`w-10 h-10 ${result.color === 'text-hive-gold' ? 'bg-hive-gold/20' : result.color === 'text-hive-emerald' ? 'bg-hive-emerald/20' : 'bg-hive-sapphire/20'} rounded-lg flex items-center justify-center`}>
                    <result.icon className={`h-5 w-5 ${result.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h5 className="font-semibold text-hive-text-primary">{result.title}</h5>
                      <span className="px-2 py-1 text-xs bg-hive-background-primary text-hive-text-secondary rounded">
                        {result.type}
                      </span>
                    </div>
                    <p className="text-sm text-hive-text-secondary">{result.description}</p>
                    <p className="text-xs text-hive-text-tertiary mt-1">
                      {result.members || result.users || result.info}
                    </p>
                  </div>
                  <button className="p-2 text-hive-text-secondary hover:text-hive-gold transition-colors">
                    <Star className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive search examples
export const InteractiveSearchExamples: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>(['computer science', 'study groups', 'gpa calculator']);
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);

    const mockSearch = async (query: string) => {
      if (!query.trim()) return;
      
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const mockResults = [
          'Computer Science Study Group',
          'CS 101 Help Sessions',
          'Computer Programming Tools',
          'Science Lab Equipment',
          'Computational Math Tutoring'
        ].filter(result => 
          result.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(mockResults);
        setIsLoading(false);
        
        // Add to search history
        if (!searchHistory.includes(query)) {
          setSearchHistory(prev => [query, ...prev.slice(0, 4)]);
        }
      }, 1000);
    };

    const handleSearch = (query: string) => {
      mockSearch(query);
    };

    const handleClear = () => {
      setSearchValue('');
      setResults([]);
    };

    return (
      <div className="space-y-6 p-6 max-w-4xl bg-hive-background-primary">
        <div>
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Interactive Search Demo</h3>
          <p className="text-hive-text-secondary mb-6">Try searching for campus content with real-time feedback</p>
        </div>
        
        <div className="border border-hive-border-subtle rounded-lg p-6 bg-hive-background-secondary">
          <SearchBar
            placeholder="Search for anything on campus..."
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            onClear={handleClear}
            loading={isLoading}
            size="lg"
            variant="filled"
          />
          
          {searchHistory.length > 0 && !searchValue && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-hive-text-primary mb-2">Recent Searches</h4>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchValue(search);
                      mockSearch(search);
                    }}
                    className="px-3 py-1 text-sm bg-hive-background-tertiary text-hive-text-secondary rounded-full hover:bg-hive-interactive-hover hover:text-hive-text-primary transition-colors"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {isLoading && (
            <div className="mt-4 flex items-center justify-center py-8">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-hive-gold border-t-transparent"></div>
                <span className="text-hive-text-secondary">Searching campus...</span>
              </div>
            </div>
          )}
          
          {results.length > 0 && !isLoading && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-hive-text-primary mb-3">
                Search Results ({results.length})
              </h4>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-hive-background-tertiary rounded-lg hover:bg-hive-interactive-hover transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-hive-gold/20 rounded-lg flex items-center justify-center">
                        <Users className="h-4 w-4 text-hive-gold" />
                      </div>
                      <span className="text-hive-text-primary">{result}</span>
                    </div>
                    <button className="text-hive-text-secondary hover:text-hive-gold transition-colors">
                      <TrendingUp className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {!isLoading && searchValue && results.length === 0 && (
            <div className="mt-6 text-center py-8">
              <p className="text-hive-text-secondary">No results found for "{searchValue}"</p>
              <p className="text-sm text-hive-text-tertiary mt-2">
                Try searching for students, study spaces, or campus tools
              </p>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <h4 className="font-semibold text-hive-text-primary mb-2">Quick Search</h4>
            <SearchBar
              placeholder="Quick search..."
              size="sm"
              variant="ghost"
              onSearch={(query) => alert(`Quick search: ${query}`)}
            />
          </div>
          
          <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <h4 className="font-semibold text-hive-text-primary mb-2">Tool Search</h4>
            <SearchBar
              placeholder="Find tools..."
              size="sm"
              variant="default"
              onSearch={(query) => alert(`Tool search: ${query}`)}
            />
          </div>
          
          <div className="p-4 bg-hive-background-secondary rounded-lg border border-hive-border-subtle">
            <h4 className="font-semibold text-hive-text-primary mb-2">Space Search</h4>
            <SearchBar
              placeholder="Find spaces..."
              size="sm"
              variant="filled"
              onSearch={(query) => alert(`Space search: ${query}`)}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    placeholder: 'Search campus community...',
    clearable: true,
    loading: false,
    size: 'md',
    variant: 'default',
    onSearch: (query: string) => alert(`Searching for: ${query}`),
    onChange: (value: string) => console.log('Search value:', value),
  },
};