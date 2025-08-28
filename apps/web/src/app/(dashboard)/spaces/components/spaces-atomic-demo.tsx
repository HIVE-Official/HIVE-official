'use client';

import React from 'react';
import {
  // Level 1 Atoms
  Display,
  Heading,
  Typography,
  Button,
  Avatar,
  HiveText,
  
  // Level 2 Molecules
  SearchBar,
  UserItem,
  FormField,
  
  // Legacy Components
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@hive/ui';

// HIVE Spaces Demo using Atomic Design System
// This demonstrates the new atomic components in a real application context

export function SpacesAtomicDemo() {
  const [searchValue, setSearchValue] = React.useState('');
  
  // Mock space data
  const spaces = [
    {
      id: '1',
      name: 'CS Study Group',
      description: 'Computer Science students collaborative study sessions',
      memberCount: 45,
      type: 'Academic',
      isActive: true,
    },
    {
      id: '2', 
      name: 'North Campus Residents',
      description: 'Students living in North Campus residence halls',
      memberCount: 234,
      type: 'Campus Living',
      isActive: true,
    },
    {
      id: '3',
      name: 'UB Engineers',
      description: 'School of Engineering and Applied Sciences community',
      memberCount: 567,
      type: 'Academic',
      isActive: true,
    },
  ];
  
  // Mock user data for UserItem demonstration
  const mockUsers = [
    {
      id: '1',
      name: 'Sarah Chen',
      handle: 'sarahc',
      role: 'CS Major',
      year: '2025',
      isOnline: true,
      isBuilder: true,
      avatar: undefined,
    },
    {
      id: '2',
      name: 'Mike Rodriguez', 
      handle: 'mikerod',
      role: 'Engineering',
      year: '2024',
      isOnline: false,
      isBuilder: false,
      avatar: undefined,
    },
  ];
  
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header using Level 1 Atoms */}
      <div className="text-center space-y-4">
        <Display size="large">
          HIVE Spaces
        </Display>
        <Typography size="large" color="medium">
          Discover and join campus communities at University at Buffalo
        </Typography>
      </div>
      
      {/* Search using Level 2 Molecule */}
      <div className="max-w-2xl mx-auto">
        <SearchBar
          placeholder="Search spaces, communities, and groups..."
          value={searchValue}
          onValueChange={setSearchValue}
          onSearch={(query) => console.log('Searching for:', query)}
        />
      </div>
      
      {/* Typography Showcase */}
      <Card className="bg-black/20 border-white/12">
        <CardHeader>
          <CardTitle>
            <Heading level={2}>Typography System Demo</Heading>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <HiveText.DisplayLarge>Display Large (40px)</HiveText.DisplayLarge>
            <HiveText.DisplayMedium>Display Medium (32px)</HiveText.DisplayMedium>
            <HiveText.DisplaySmall>Display Small (28px)</HiveText.DisplaySmall>
          </div>
          
          <div className="space-y-2">
            <HiveText.H1>Heading 1 (26px)</HiveText.H1>
            <HiveText.H2>Heading 2 (22px)</HiveText.H2>
            <HiveText.H3>Heading 3 (18px)</HiveText.H3>
            <HiveText.H4>Heading 4 (16px)</HiveText.H4>
          </div>
          
          <div className="space-y-2">
            <HiveText.BodyLarge>Body Large (18px) - For important content and introductory text</HiveText.BodyLarge>
            <HiveText.BodyRegular>Body Regular (16px) - Standard body text for most content</HiveText.BodyRegular>
            <HiveText.BodySmall>Body Small (14px) - Secondary information and captions</HiveText.BodySmall>
            <HiveText.BodyMicro>Body Micro (12px) - Minimal text and metadata</HiveText.BodyMicro>
          </div>
          
          <div className="space-y-2">
            <HiveText.Caption>Caption text (12px/16px, Medium weight, Low contrast)</HiveText.Caption>
            <Typography as="div" size="small" color="medium" className="uppercase tracking-wider">
              Overline text (10px, uppercase, low contrast)
            </Typography>
            <HiveText.CodeInline>Code inline (14px, mono)</HiveText.CodeInline>
            <HiveText.Link href="#">Link text (16px, Gold primary with underline)</HiveText.Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Button Showcase */}
      <Card className="bg-black/20 border-white/12">
        <CardHeader>
          <CardTitle>
            <Heading level={2}>Button System Demo</Heading>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <Typography weight="medium">Primary Buttons (Gold)</Typography>
              <div className="space-y-2">
                <Button variant="primary" size="large">Large Primary</Button>
                <Button variant="primary" size="medium">Medium Primary</Button>
                <Button variant="primary" size="small">Small Primary</Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Typography weight="medium">Secondary Buttons (White)</Typography>
              <div className="space-y-2">
                <Button variant="secondary" size="large">Large Secondary</Button>
                <Button variant="secondary" size="medium">Medium Secondary</Button>
                <Button variant="secondary" size="small">Small Secondary</Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <Typography weight="medium">Action Buttons</Typography>
              <div className="space-y-2">
                <Button variant="ghost" size="medium">Ghost Button</Button>
                <Button variant="destructive" size="medium">Destructive</Button>
                <Button variant="accent" size="medium">Accent</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Form Field Showcase */}
      <Card className="bg-black/20 border-white/12">
        <CardHeader>
          <CardTitle>
            <Heading level={2}>Form Field Molecules</Heading>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField
                label="Email Address"
                type="email"
                placeholder="your.email@buffalo.edu"
                helperText="Use your UB email for campus verification"
                required
              />
              
              <FormField
                label="Display Name"
                placeholder="How you'd like to be known on campus"
                showOptional
              />
              
              <FormField
                label="Error Example"
                value="invalid-email"
                errorMessage="Please enter a valid UB email address"
              />
            </div>
            
            <div className="space-y-4">
              <FormField
                label="Success Example"
                value="sarah@buffalo.edu"
                success
              />
              
              <FormField
                label="Disabled Field"
                value="Cannot edit this field"
                disabled
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* User Item Showcase */}
      <Card className="bg-black/20 border-white/12">
        <CardHeader>
          <CardTitle>
            <Heading level={2}>User Item Molecules</Heading>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Typography weight="medium">Campus Community Members</Typography>
            {mockUsers.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                variant="default"
                showStatus
                actionButton={{
                  label: 'Connect',
                  onClick: (user) => console.log('Connecting to:', user.name),
                  variant: 'primary',
                }}
                onUserClick={(user) => console.log('Viewing profile:', user.name)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => (
          <Card key={space.id} className="bg-black/20 border-white/12 hover:bg-white/5 transition-colors">
            <CardHeader>
              <CardTitle>
                <Heading level={3}>{space.name}</Heading>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Typography color="medium">
                {space.description}
              </Typography>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Typography size="small" color="brand">
                    {space.memberCount} members
                  </Typography>
                  <span className="text-white/30">•</span>
                  <Typography size="small" color="medium">
                    {space.type}
                  </Typography>
                </div>
                
                <Button variant="primary" size="small">
                  Join Space
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Action Bar */}
      <div className="flex justify-center pt-8">
        <Button variant="primary" size="large">
          Explore More Spaces
        </Button>
      </div>
    </div>
  );
}