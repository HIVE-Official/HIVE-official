import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Star, Heart, Code, Music, Palette, Book, Camera, Coffee } from 'lucide-react'
import { Badge, ChipGroup, InteractiveChip, FilterChip } from '../components/badge'

const meta: Meta<typeof Badge> = {
  title: '2025 AI/Modern Chips',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Modern chip-style badges with interactive states, selections, and 2025 AI feel.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['chip', 'pill', 'accent', 'ritual', 'interactive', 'removable', 'selectable', 'floating'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const ChipVariants: Story = {
  render: () => (
    <ChipGroup spacing="default">
      <Badge variant="chip">Chip Style</Badge>
      <Badge variant="pill">Pill Style</Badge>
      <Badge variant="accent" icon={<Star className="w-3 h-3" />}>Accent</Badge>
      <Badge variant="ritual" icon={<Heart className="w-3 h-3" />}>Ritual</Badge>
      <Badge variant="floating">Floating</Badge>
    </ChipGroup>
  ),
}

export const InteractiveChips: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['react'])
    
    const skills = [
      { value: 'react', label: 'React', icon: <Code className="w-3 h-3" /> },
      { value: 'typescript', label: 'TypeScript', icon: <Code className="w-3 h-3" /> },
      { value: 'design', label: 'Design', icon: <Palette className="w-3 h-3" /> },
      { value: 'music', label: 'Music', icon: <Music className="w-3 h-3" /> },
    ]
    
    const handleToggle = (value: string, isSelected: boolean) => {
      setSelected(prev => 
        isSelected 
          ? [...prev, value]
          : prev.filter(item => item !== value)
      )
    }
    
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted">Select your skills:</h3>
        <ChipGroup>
          {skills.map(skill => (
            <InteractiveChip
              key={skill.value}
              value={skill.value}
              selected={selected.includes(skill.value)}
              onToggle={handleToggle}
              icon={skill.icon}
            >
              {skill.label}
            </InteractiveChip>
          ))}
          <InteractiveChip 
            value="add"
            addable
            onToggle={() => console.log('Add new skill')}
          >
            Add Skill
          </InteractiveChip>
        </ChipGroup>
        <div className="text-xs text-muted">
          Selected: {selected.join(', ') || 'None'}
        </div>
      </div>
    )
  },
}

export const RemovableChips: Story = {
  render: () => {
    const [tags, setTags] = useState(['JavaScript', 'React', 'TypeScript', 'Design'])
    
    const removeTag = (tagToRemove: string) => {
      setTags(prev => prev.filter(tag => tag !== tagToRemove))
    }
    
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted">Current tags:</h3>
        <ChipGroup>
          {tags.map(tag => (
            <Badge
              key={tag}
              removable
              onRemove={() => removeTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </ChipGroup>
      </div>
    )
  },
}

export const FilterChips: Story = {
  render: () => {
    const [activeFilters, setActiveFilters] = useState<string[]>(['all'])
    
    const filters = [
      { id: 'all', label: 'All', count: 24 },
      { id: 'images', label: 'Images', count: 12 },
      { id: 'videos', label: 'Videos', count: 8 },
      { id: 'docs', label: 'Documents', count: 4 },
    ]
    
    const toggleFilter = (filterId: string) => {
      setActiveFilters(prev => 
        prev.includes(filterId)
          ? prev.filter(id => id !== filterId)
          : [...prev, filterId]
      )
    }
    
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted">Filter by type:</h3>
        <ChipGroup>
          {filters.map(filter => (
            <FilterChip
              key={filter.id}
              active={activeFilters.includes(filter.id)}
              count={filter.count}
              onToggle={() => toggleFilter(filter.id)}
            >
              {filter.label}
            </FilterChip>
          ))}
        </ChipGroup>
      </div>
    )
  },
}

export const StatusChips: Story = {
  render: () => (
    <ChipGroup spacing="default">
      <Badge variant="online" icon={<div className="w-2 h-2 rounded-full bg-green-500" />}>
        Online
      </Badge>
      <Badge variant="busy" icon={<div className="w-2 h-2 rounded-full bg-accent" />}>
        Busy
      </Badge>
      <Badge variant="away" icon={<div className="w-2 h-2 rounded-full bg-amber-500" />}>
        Away
      </Badge>
    </ChipGroup>
  ),
}

export const ChipSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <ChipGroup>
        <Badge size="xs">Extra Small</Badge>
        <Badge size="sm">Small</Badge>
        <Badge size="default">Default</Badge>
        <Badge size="lg">Large</Badge>
        <Badge size="xl">Extra Large</Badge>
      </ChipGroup>
      
      <ChipGroup>
        <Badge variant="accent" size="xs" icon={<Star className="w-2 h-2" />}>XS</Badge>
        <Badge variant="accent" size="sm" icon={<Star className="w-3 h-3" />}>SM</Badge>
        <Badge variant="accent" size="default" icon={<Star className="w-3 h-3" />}>Default</Badge>
        <Badge variant="accent" size="lg" icon={<Star className="w-4 h-4" />}>Large</Badge>
        <Badge variant="accent" size="xl" icon={<Star className="w-4 h-4" />}>XL</Badge>
      </ChipGroup>
    </div>
  ),
}

export const InterestTags: Story = {
  render: () => {
    const [interests, setInterests] = useState(['Photography', 'Coffee'])
    
    const availableInterests = [
      { value: 'photography', label: 'Photography', icon: <Camera className="w-3 h-3" /> },
      { value: 'coffee', label: 'Coffee', icon: <Coffee className="w-3 h-3" /> },
      { value: 'reading', label: 'Reading', icon: <Book className="w-3 h-3" /> },
      { value: 'music', label: 'Music', icon: <Music className="w-3 h-3" /> },
      { value: 'art', label: 'Art', icon: <Palette className="w-3 h-3" /> },
      { value: 'coding', label: 'Coding', icon: <Code className="w-3 h-3" /> },
    ]
    
    const handleToggle = (value: string, isSelected: boolean) => {
      const label = availableInterests.find(i => i.value === value)?.label || value
      setInterests(prev => 
        isSelected 
          ? [...prev, label]
          : prev.filter(item => item !== label)
      )
    }
    
    const removeInterest = (interest: string) => {
      setInterests(prev => prev.filter(item => item !== interest))
    }
    
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-sm font-medium text-muted mb-3">Your interests:</h3>
          <ChipGroup>
            {interests.map(interest => (
              <Badge
                key={interest}
                variant="accent"
                removable
                onRemove={() => removeInterest(interest)}
              >
                {interest}
              </Badge>
            ))}
            {interests.length === 0 && (
              <span className="text-xs text-muted italic">No interests selected</span>
            )}
          </ChipGroup>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-muted mb-3">Add interests:</h3>
          <ChipGroup>
            {availableInterests.map(interest => (
              <InteractiveChip
                key={interest.value}
                value={interest.value}
                selected={interests.includes(interest.label)}
                onToggle={handleToggle}
                icon={interest.icon}
                size="sm"
              >
                {interest.label}
              </InteractiveChip>
            ))}
          </ChipGroup>
        </div>
      </div>
    )
  },
}

export const ChipLayouts: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-sm font-medium text-muted mb-3">Horizontal (default):</h3>
        <ChipGroup orientation="horizontal">
          <Badge variant="chip">Design</Badge>
          <Badge variant="chip">Development</Badge>
          <Badge variant="chip">Strategy</Badge>
        </ChipGroup>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-muted mb-3">Vertical:</h3>
        <ChipGroup orientation="vertical">
          <Badge variant="chip">Option 1</Badge>
          <Badge variant="chip">Option 2</Badge>
          <Badge variant="chip">Option 3</Badge>
        </ChipGroup>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-muted mb-3">Different spacing:</h3>
        <div className="space-y-2">
          <ChipGroup spacing="sm">
            <Badge size="sm">Tight</Badge>
            <Badge size="sm">Spacing</Badge>
            <Badge size="sm">Small</Badge>
          </ChipGroup>
          <ChipGroup spacing="lg">
            <Badge>Loose</Badge>
            <Badge>Spacing</Badge>
            <Badge>Large</Badge>
          </ChipGroup>
        </div>
      </div>
    </div>
  ),
}