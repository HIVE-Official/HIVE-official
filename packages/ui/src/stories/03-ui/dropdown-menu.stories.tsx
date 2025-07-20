import type { Meta, StoryObj } from '@storybook/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  Button
} from '../../components';
import { 
  User, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Share, 
  Copy,
  MoreHorizontal,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof DropdownMenu> = {
  title: '03-UI/Dropdown Menu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown menu component with comprehensive item types, shortcuts, and nested menus.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Basic: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          New
          <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
          <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy
          <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxes: Story = {
  render: () => {
    const [showBookmarks, setShowBookmarks] = useState(true);
    const [showURLs, setShowURLs] = useState(false);
    const [showPerson, setShowPerson] = useState(false);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">View Options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            checked={showBookmarks}
            onCheckedChange={setShowBookmarks}
          >
            Show Bookmarks Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showURLs}
            onCheckedChange={setShowURLs}
          >
            Show Full URLs
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPerson}
            onCheckedChange={setShowPerson}
          >
            Show People Names
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const [position, setPosition] = useState('bottom');

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Panel Position</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};

export const WithSubmenus: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">More Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Plus className="mr-2 h-4 w-4" />
          New Item
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Share className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Message</DropdownMenuItem>
            <DropdownMenuItem>Copy Link</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>More Options</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const KitchenSink: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(true);
    const [theme, setTheme] = useState('dark');

    return (
      <div className="flex gap-4">
        {/* Basic Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Basic</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Action 1</DropdownMenuItem>
            <DropdownMenuItem>Action 2</DropdownMenuItem>
            <DropdownMenuItem disabled>Disabled Action</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Complex Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Kitchen Sink</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Regular items */}
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            
            {/* Checkbox item */}
            <DropdownMenuCheckboxItem
              checked={notifications}
              onCheckedChange={setNotifications}
            >
              Enable notifications
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            
            {/* Radio group */}
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            
            <DropdownMenuSeparator />
            
            {/* Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Settings className="mr-2 h-4 w-4" />
                Advanced
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Privacy</DropdownMenuItem>
                <DropdownMenuItem>Security</DropdownMenuItem>
                <DropdownMenuItem>Integrations</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSeparator />
            
            {/* Destructive action */}
            <DropdownMenuItem className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};